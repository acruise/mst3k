<?php
/**
 * router.php — PHP backend for Memetic Subspace Twitter 3017
 * Drop-in replacement for server.js + corpus.js + llm.js
 *
 * Point your document root at public/ and route /api/* and /t/* here
 * via .htaccess (included) or nginx rewrite rules.
 *
 * Config via .env in the project root (one directory up from public/).
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);
header('Content-Type: application/json; charset=utf-8');


// ═══════════════════════════════════════════════════════════════════════
// Logging (structured JSON to file or error_log)
// ═══════════════════════════════════════════════════════════════════════

function mst3k_log($level, $message, $context = []) {
    static $logFile = null;
    static $minLevel = null;

    if ($logFile === null) {
        $logFile = getenv('LOG_FILE') ?: (__DIR__ . '/../logs/mst3k.log');
        $minLevel = getenv('LOG_LEVEL') ?: 'info';
    }

    $levels = ['debug' => 0, 'info' => 1, 'warn' => 2, 'error' => 3];
    $numLevel = isset($levels[$level]) ? $levels[$level] : 1;
    $numMin   = isset($levels[$minLevel]) ? $levels[$minLevel] : 1;
    if ($numLevel < $numMin) return;

    $entry = array_merge([
        'time'  => date('c'),
        'level' => $level,
        'msg'   => $message,
    ], $context);

    $line = json_encode($entry, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n";

    $dir = dirname($logFile);
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    @file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX);
}

// ═══════════════════════════════════════════════════════════════════════
// .env
// ═══════════════════════════════════════════════════════════════════════

$envPath = __DIR__ . '/../.env';
if (file_exists($envPath)) {
    foreach (file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') continue;
        $eq = strpos($line, '=');
        if ($eq === false) continue;
        $key = trim(substr($line, 0, $eq));
        $val = trim(substr($line, $eq + 1));
        if (getenv($key) === false) putenv("$key=$val");
    }
}

// ═══════════════════════════════════════════════════════════════════════
// Config
// ═══════════════════════════════════════════════════════════════════════

$BACKEND = getenv('BACKEND') ?: 'anthropic';
$CORPUS_DIR = getenv('CORPUS_DIR') ?: (__DIR__ . '/../corpus');
$LLM_CONFIG = [];

if ($BACKEND === 'ollama') {
    $LLM_CONFIG = [
        'model'   => getenv('OLLAMA_MODEL') ?: 'qwen3:14b',
        'baseUrl' => getenv('OLLAMA_BASE_URL') ?: 'http://localhost:11434',
    ];
} elseif ($BACKEND === 'anthropic') {
    $LLM_CONFIG = [
        'model'  => getenv('ANTHROPIC_MODEL') ?: 'claude-sonnet-4-6',
        'apiKey' => getenv('ANTHROPIC_API_KEY') ?: '',
    ];
}

// ═══════════════════════════════════════════════════════════════════════
// Routing
// ═══════════════════════════════════════════════════════════════════════

$method = $_SERVER['REQUEST_METHOD'];
$path   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$_reqStart = microtime(true);

$body = null;
if ($method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);
}

if (strpos($path, '/api/') === 0) {
    register_shutdown_function(function () use ($method, $path, $_reqStart) {
        mst3k_log('info', $method . ' ' . $path, [
            'method'     => $method,
            'path'       => $path,
            'status'     => http_response_code(),
            'elapsed_ms' => round((microtime(true) - $_reqStart) * 1000),
        ]);
    });
}

// ── GET /api/status ──
if ($method === 'GET' && $path === '/api/status') {
    $index = loadOrBuildIndex($CORPUS_DIR);
    respond([
        'backend'              => $BACKEND,
        'corpus_size'          => $index['counts']['tweets'],
        'corpus_with_replies'  => $index['counts']['tweets_with_replies'],
    ]);
}

// ── GET /api/tweet/:id ──
if ($method === 'GET' && preg_match('#^/api/tweet/([A-Za-z0-9][A-Za-z0-9_-]{0,63})$#', $path, $m)) {
    $index = loadOrBuildIndex($CORPUS_DIR);
    $doc = getCorpusEntry($CORPUS_DIR, $index, $m[1]);
    if (!$doc) respondError(404, 'Not found');
    respond($doc);
}

// ── GET /api/tweets ──
if ($method === 'GET' && $path === '/api/tweets') {
    $items = listTweets($CORPUS_DIR);
    respond(['tweets' => $items, 'count' => count($items)]);
}

// ── POST /api/save ──
if ($method === 'POST' && $path === '/api/save') {
    $tweet = isset($body['tweet']) ? $body['tweet'] : null;
    if (!$tweet || !isset($tweet['tweet'])) respondError(400, 'Missing tweet');

    $model = isset($LLM_CONFIG['model']) ? $LLM_CONFIG['model'] : null;
    $recordedTemp = null;
    if (acceptsSamplingParams($model)) {
        $recordedTemp = isset($body['temperature']) ? $body['temperature'] : 0.9;
    }
    $meta = [
        'backend'     => $BACKEND,
        'model'       => $model,
        'temperature' => $recordedTemp,
        'summon'      => isset($body['summon']) ? $body['summon'] : null,
        'incite'      => isset($body['incite']) ? $body['incite'] : null,
    ];
    $index = loadOrBuildIndex($CORPUS_DIR);
    $saved = saveTweet($CORPUS_DIR, $index, $tweet, $meta);
    respond(['id' => $saved['id']]);
}

// ── POST /api/save-replies ──
if ($method === 'POST' && $path === '/api/save-replies') {
    $id      = isset($body['id']) ? $body['id'] : null;
    $replies = isset($body['replies']) ? $body['replies'] : null;
    if (!isValidId($id))      respondError(400, 'Invalid id');
    if (!is_array($replies))  respondError(400, 'replies must be array');

    $index = loadOrBuildIndex($CORPUS_DIR);
    $doc = saveReplies($CORPUS_DIR, $index, $id, $replies);
    if (!$doc) respondError(404, 'Tweet not found');
    respond(['ok' => true]);
}

// ── POST /api/generate ──
if ($method === 'POST' && $path === '/api/generate') {
    if ($BACKEND === 'offline') {
        $entries = allEntries($CORPUS_DIR);
        if (empty($entries)) respondError(503, 'No corpus files in ' . $CORPUS_DIR);
        $entry = $entries[array_rand($entries)];
        $tweet = $entry['tweet'];
        $tweet['id'] = $entry['id'];
        $tweet['_has_replies'] = !empty($entry['replies']);
        respond(['text' => json_encode($tweet, JSON_UNESCAPED_UNICODE)]);
    }

    if (!$body || !isset($body['system']) || !isset($body['content'])) {
        respondError(400, 'Missing system or content');
    }
    $maxTokens   = isset($body['max_tokens']) ? (int)$body['max_tokens'] : 1000;
    $temperature = isset($body['temperature']) ? (float)$body['temperature'] : 0.9;
    $result = callLLM($BACKEND, $LLM_CONFIG, $body['system'], $body['content'], $maxTokens, $temperature);
    if ($result['error']) respondError(502, $result['error']);
    respond(['text' => $result['text']]);
}

// ── POST /api/replies ──
if ($method === 'POST' && $path === '/api/replies') {
    if ($BACKEND === 'offline') {
        $id = isset($body['id']) ? $body['id'] : null;
        if (!$id) respondError(400, 'Missing id');
        $index = loadOrBuildIndex($CORPUS_DIR);
        $doc = getCorpusEntry($CORPUS_DIR, $index, $id);
        if (!$doc) respondError(404, 'Tweet not found');
        respond(['replies' => isset($doc['replies']) ? $doc['replies'] : []]);
    }

    if (!$body || !isset($body['system']) || !isset($body['content'])) {
        respondError(400, 'Missing system or content');
    }
    $maxTokens   = isset($body['max_tokens']) ? (int)$body['max_tokens'] : 1000;
    $temperature = isset($body['temperature']) ? (float)$body['temperature'] : 0.9;
    $result = callLLM($BACKEND, $LLM_CONFIG, $body['system'], $body['content'], $maxTokens, $temperature);
    if ($result['error']) respondError(502, $result['error']);
    respond(['text' => $result['text']]);
}

// ── Permalink routes: /t/ and /t/:id serve the SPA ──
if ($method === 'GET' && preg_match('#^/t(/[A-Za-z0-9_-]*)?$#', $path)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile(__DIR__ . '/index.html');
    exit;
}

respondError(404, 'Not found');


// ═══════════════════════════════════════════════════════════════════════
// Response helpers
// ═══════════════════════════════════════════════════════════════════════

function respond($data) {
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function respondError($code, $msg) {
    http_response_code($code);
    echo json_encode(['error' => $msg]);
    exit;
}


// ═══════════════════════════════════════════════════════════════════════
// Corpus functions
// ═══════════════════════════════════════════════════════════════════════

define('INDEX_FILE', '_index.json');
define('INDEX_VERSION', 2);

function isValidId($id) {
    return is_string($id) && preg_match('/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/', $id);
}

function makeId() {
    return (string)round(microtime(true) * 1000)
         . '-' . substr(str_shuffle('abcdefghijklmnopqrstuvwxyz0123456789'), 0, 4);
}

function corpusFiles($corpusDir) {
    if (!is_dir($corpusDir)) return [];
    $files = [];
    foreach (scandir($corpusDir) as $f) {
        if (substr($f, -5) === '.json' && $f[0] !== '_') {
            $files[] = $f;
        }
    }
    sort($files);
    return $files;
}

function readCorpusFile($corpusDir, $filename) {
    $filepath = $corpusDir . '/' . $filename;
    if (!file_exists($filepath)) return null;
    $doc = json_decode(file_get_contents($filepath), true);
    if (!$doc) return null;
    if (!isset($doc['id'])) {
        $doc['id'] = preg_replace('/\.json$/', '', $filename);
    }
    return $doc;
}

function corpusFingerprint($corpusDir) {
    $files = corpusFiles($corpusDir);
    return [
        'count'  => count($files),
        'oldest' => !empty($files) ? $files[0] : null,
        'newest' => !empty($files) ? $files[count($files) - 1] : null,
    ];
}

function buildIndex($corpusDir) {
    $files = corpusFiles($corpusDir);
    $index = [
        'version'      => INDEX_VERSION,
        'built_at'     => date('c'),
        'file_count'   => count($files),
        'oldest_file'  => !empty($files) ? $files[0] : null,
        'newest_file'  => !empty($files) ? $files[count($files) - 1] : null,
        'by_id'        => new \stdClass(),
        'by_handle'    => new \stdClass(),
        'by_summon'    => new \stdClass(),
        'by_incite'    => new \stdClass(),
        'counts'       => [
            'tweets'              => 0,
            'replies'             => 0,
            'tweets_with_replies' => 0,
            'by_backend'          => new \stdClass(),
            'by_summon'           => new \stdClass(),
            'by_incite'           => new \stdClass(),
        ],
    ];

    foreach ($files as $f) {
        $doc = readCorpusFile($corpusDir, $f);
        if (!$doc || !isset($doc['tweet'])) continue;
        $id = $doc['id'];
        $index['by_id']->$id = $f;
        $index['counts']['tweets']++;

        if (!empty($doc['replies'])) {
            $index['counts']['tweets_with_replies']++;
            $index['counts']['replies'] += count($doc['replies']);
        }

        $handle = strtolower(isset($doc['tweet']['handle']) ? $doc['tweet']['handle'] : '');
        if ($handle) {
            if (!isset($index['by_handle']->$handle)) $index['by_handle']->$handle = [];
            $index['by_handle']->{$handle}[] = $id;
        }

        $b = isset($doc['backend']) ? $doc['backend'] : 'unknown';
        if (!isset($index['counts']['by_backend']->$b)) $index['counts']['by_backend']->$b = 0;
        $index['counts']['by_backend']->$b++;

        if (!empty($doc['summon'])) {
            $s = strtolower($doc['summon']);
            if (!isset($index['counts']['by_summon']->$s)) $index['counts']['by_summon']->$s = 0;
            $index['counts']['by_summon']->$s++;
        }
        if (!empty($doc['incite'])) {
            $inc = strtolower($doc['incite']);
            if (!isset($index['counts']['by_incite']->$inc)) $index['counts']['by_incite']->$inc = 0;
            $index['counts']['by_incite']->$inc++;
        }
    }

    return $index;
}

function writeIndex($corpusDir, $index) {
    if (!is_dir($corpusDir)) mkdir($corpusDir, 0755, true);
    @file_put_contents(
        $corpusDir . '/' . INDEX_FILE,
        json_encode($index, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
    );
}

function loadOrBuildIndex($corpusDir) {
    $indexPath = $corpusDir . '/' . INDEX_FILE;
    $fp = corpusFingerprint($corpusDir);
    $index = null;

    if (file_exists($indexPath)) {
        $index = json_decode(file_get_contents($indexPath), true);
    }

    if ($index
        && isset($index['version']) && $index['version'] === INDEX_VERSION
        && isset($index['file_count']) && $index['file_count'] === $fp['count']
        && isset($index['oldest_file']) && $index['oldest_file'] === $fp['oldest']
        && isset($index['newest_file']) && $index['newest_file'] === $fp['newest']
    ) {
        return $index;
    }

    $index = buildIndex($corpusDir);
    writeIndex($corpusDir, $index);
    return $index;
}

function saveTweet($corpusDir, &$index, $tweet, $meta) {
    if (!is_dir($corpusDir)) mkdir($corpusDir, 0755, true);
    $id       = makeId();
    $filename = $id . '.json';
    $doc = [
        'id'           => $id,
        'tweet'        => $tweet,
        'replies'      => null,
        'generated_at' => date('c'),
        'backend'      => isset($meta['backend']) ? $meta['backend'] : null,
        'model'        => isset($meta['model']) ? $meta['model'] : null,
        'temperature'  => isset($meta['temperature']) ? $meta['temperature'] : null,
        'summon'       => isset($meta['summon']) ? $meta['summon'] : null,
        'incite'       => isset($meta['incite']) ? $meta['incite'] : null,
    ];
    file_put_contents(
        $corpusDir . '/' . $filename,
        json_encode($doc, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
    );

    if (!is_array($index['by_id'])) $index['by_id'] = [];
    $index['by_id'][$id] = $filename;
    $index['counts']['tweets']++;
    $index['file_count']++;
    $index['newest_file'] = $filename;
    if (!$index['oldest_file']) $index['oldest_file'] = $filename;

    $b = isset($doc['backend']) ? $doc['backend'] : 'unknown';
    if (!isset($index['counts']['by_backend'][$b])) $index['counts']['by_backend'][$b] = 0;
    $index['counts']['by_backend'][$b]++;

    writeIndex($corpusDir, $index);
    return ['id' => $id, 'filename' => $filename, 'doc' => $doc];
}

function saveReplies($corpusDir, &$index, $id, $replies) {
    if (!isValidId($id)) return null;
    $byId = is_array($index['by_id']) ? $index['by_id'] : (array)$index['by_id'];
    $filename = isset($byId[$id]) ? $byId[$id] : ($id . '.json');
    $filepath = $corpusDir . '/' . $filename;
    if (!file_exists($filepath)) return null;

    $doc = json_decode(file_get_contents($filepath), true);
    if (!$doc) return null;

    $hadRepliesBefore = !empty($doc['replies']);
    $doc['replies'] = $replies;
    file_put_contents($filepath, json_encode($doc, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    if (!$hadRepliesBefore && !empty($replies)) {
        $index['counts']['tweets_with_replies']++;
    }
    writeIndex($corpusDir, $index);
    return $doc;
}

function getCorpusEntry($corpusDir, $index, $id) {
    if (!isValidId($id)) return null;
    $byId = is_array($index['by_id']) ? $index['by_id'] : (array)$index['by_id'];
    $filename = isset($byId[$id]) ? $byId[$id] : ($id . '.json');
    if (!file_exists($corpusDir . '/' . $filename)) return null;
    return readCorpusFile($corpusDir, $filename);
}

function allEntries($corpusDir) {
    $files = corpusFiles($corpusDir);
    $docs = [];
    foreach ($files as $f) {
        $doc = readCorpusFile($corpusDir, $f);
        if ($doc && isset($doc['tweet'])) $docs[] = $doc;
    }
    return $docs;
}

function listTweets($corpusDir) {
    $files = corpusFiles($corpusDir);
    $items = [];
    foreach ($files as $f) {
        $doc = readCorpusFile($corpusDir, $f);
        if (!$doc || !isset($doc['tweet'])) continue;
        $items[] = [
            'id'           => $doc['id'],
            'tweet'        => $doc['tweet'],
            'has_replies'  => !empty($doc['replies']),
            'generated_at' => isset($doc['generated_at']) ? $doc['generated_at'] : null,
            'backend'      => isset($doc['backend']) ? $doc['backend'] : null,
            'model'        => isset($doc['model']) ? $doc['model'] : null,
            'summon'       => isset($doc['summon']) ? $doc['summon'] : null,
            'incite'       => isset($doc['incite']) ? $doc['incite'] : null,
        ];
    }
    return $items;
}


// ═══════════════════════════════════════════════════════════════════════
// LLM functions
// ═══════════════════════════════════════════════════════════════════════

function acceptsSamplingParams($model) {
    return strpos(strtolower((string)$model), 'opus-4-7') === false;
}

function callLLM($backend, $config, $system, $content, $maxTokens = 1000, $temperature = 0.9) {
    $model = isset($config['model']) ? $config['model'] : 'unknown';
    $start = microtime(true);

    mst3k_log('info', 'LLM request', [
        'event'       => 'llm_request',
        'backend'     => $backend,
        'model'       => $model,
        'system_len'  => strlen($system),
        'content_len' => strlen($content),
        'max_tokens'  => $maxTokens,
        'temperature' => $temperature,
    ]);

    $result = ($backend === 'ollama')
        ? callOllama($config, $system, $content, $maxTokens, $temperature)
        : callAnthropic($config, $system, $content, $maxTokens, $temperature);

    $elapsed = round((microtime(true) - $start) * 1000);

    if ($result['error']) {
        mst3k_log('error', 'LLM error', [
            'event'      => 'llm_error',
            'backend'    => $backend,
            'model'      => $model,
            'elapsed_ms' => $elapsed,
            'error'      => $result['error'],
        ]);
    } else {
        mst3k_log('info', 'LLM response', [
            'event'        => 'llm_response',
            'backend'      => $backend,
            'model'        => $model,
            'response_len' => strlen($result['text']),
            'elapsed_ms'   => $elapsed,
            'preview'      => substr($result['text'], 0, 200),
        ]);
    }

    return $result;
}

function callAnthropic($config, $system, $content, $maxTokens, $temperature) {
    $model = isset($config['model']) ? $config['model'] : 'claude-sonnet-4-6';
    $reqBody = [
        'model'      => $model,
        'max_tokens' => $maxTokens,
        'system'     => $system,
        'messages'   => [['role' => 'user', 'content' => $content]],
    ];
    if (acceptsSamplingParams($model)) {
        $reqBody['temperature'] = $temperature;
    }
    $payload = json_encode($reqBody, JSON_UNESCAPED_UNICODE);

    $ch = curl_init('https://api.anthropic.com/v1/messages');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'x-api-key: ' . (isset($config['apiKey']) ? $config['apiKey'] : ''),
            'anthropic-version: 2023-06-01',
        ],
        CURLOPT_TIMEOUT => 120,
    ]);
    $raw      = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err      = curl_error($ch);
    curl_close($ch);

    if ($err) return ['text' => null, 'error' => 'Anthropic curl error: ' . $err];
    if ($httpCode !== 200) return ['text' => null, 'error' => 'Anthropic ' . $httpCode . ': ' . substr($raw, 0, 500)];

    $data = json_decode($raw, true);
    $text = '';
    if (isset($data['content']) && is_array($data['content'])) {
        foreach ($data['content'] as $block) {
            if (isset($block['type']) && $block['type'] === 'text') {
                $text .= $block['text'];
            }
        }
    }
    return ['text' => $text, 'error' => null];
}

function callOllama($config, $system, $content, $maxTokens, $temperature) {
    $baseUrl = isset($config['baseUrl']) ? $config['baseUrl'] : 'http://localhost:11434';
    $model   = isset($config['model']) ? $config['model'] : 'qwen3:14b';

    $payload = json_encode([
        'model'           => $model,
        'max_tokens'      => $maxTokens,
        'temperature'     => $temperature,
        'stream'          => false,
        'response_format' => ['type' => 'json_object'],
        'messages'        => [
            ['role' => 'system', 'content' => $system],
            ['role' => 'user',   'content' => $content],
        ],
    ], JSON_UNESCAPED_UNICODE);

    $ch = curl_init(rtrim($baseUrl, '/') . '/v1/chat/completions');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_TIMEOUT        => 300,
    ]);
    $raw      = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err      = curl_error($ch);
    curl_close($ch);

    if ($err) return ['text' => null, 'error' => 'Ollama curl error: ' . $err];
    if ($httpCode !== 200) return ['text' => null, 'error' => 'Ollama ' . $httpCode . ': ' . substr($raw, 0, 500)];

    $data = json_decode($raw, true);
    $text = '';
    if (isset($data['choices'][0]['message']['content'])) {
        $text = $data['choices'][0]['message']['content'];
    }
    return ['text' => $text, 'error' => null];
}

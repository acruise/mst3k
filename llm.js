// llm.js — shared LLM client for server and CLI
// Node 16 compatible (CommonJS, no optional chaining)

var https = require("https");
var http = require("http");
var pino = require("pino");

var log = pino({ name: "llm", level: process.env.LOG_LEVEL || "info" });

// Opus 4.7 rejects the sampling parameters (`temperature`, `top_p`, `top_k`)
// with HTTP 400 — per Anthropic's migration guide, guide the model via prompting
// instead. Sonnet/Haiku 4.x and earlier Opus models still accept them normally.
function acceptsSamplingParams(model) {
  model = String(model || "").toLowerCase();
  if (model.indexOf("opus-4-7") >= 0) return false;
  return true;
}

function callLLM(backend, config, system, content, maxTokens, temperature) {
  maxTokens = maxTokens || 1000;
  temperature = temperature || 0.9;

  var start = Date.now();
  log.info({
    event: "llm_request",
    backend: backend,
    model: config.model,
    system_len: system.length,
    content_len: content.length,
    max_tokens: maxTokens,
    temperature: temperature,
  }, "LLM request");

  var promise = backend === "ollama"
    ? callOllama(config, system, content, maxTokens, temperature)
    : callAnthropic(config, system, content, maxTokens, temperature);

  return promise.then(function (text) {
    log.info({
      event: "llm_response",
      backend: backend,
      model: config.model,
      response_len: text.length,
      elapsed_ms: Date.now() - start,
      preview: text.slice(0, 200),
    }, "LLM response");
    return text;
  }).catch(function (err) {
    log.error({
      event: "llm_error",
      backend: backend,
      model: config.model,
      elapsed_ms: Date.now() - start,
      error: err.message,
    }, "LLM error");
    throw err;
  });
}

function callAnthropic(config, system, content, maxTokens, temperature) {
  return new Promise(function (resolve, reject) {
    var model = config.model || "claude-sonnet-4-6";
    var body = {
      model: model,
      max_tokens: maxTokens,
      system: system,
      messages: [{ role: "user", content: content }],
    };
    if (acceptsSamplingParams(model)) body.temperature = temperature;
    var payload = JSON.stringify(body);

    var options = {
      hostname: "api.anthropic.com",
      port: 443,
      path: "/v1/messages",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.apiKey || "",
        "anthropic-version": "2023-06-01",
        "Content-Length": Buffer.byteLength(payload),
      },
    };

    var req = https.request(options, function (res) {
      var chunks = [];
      res.on("data", function (c) { chunks.push(c); });
      res.on("end", function () {
        var raw = Buffer.concat(chunks).toString();
        try {
          var data = JSON.parse(raw);
          if (res.statusCode !== 200) {
            return reject(new Error("Anthropic " + res.statusCode + ": " + raw));
          }
          var text = "";
          if (data.content && Array.isArray(data.content)) {
            data.content.forEach(function (b) {
              if (b.type === "text") text += b.text;
            });
          }
          resolve(text);
        } catch (e) {
          reject(new Error("Bad response from Anthropic: " + raw.slice(0, 200)));
        }
      });
    });

    req.on("error", function (e) { reject(e); });
    req.write(payload);
    req.end();
  });
}

function callOllama(config, system, content, maxTokens, temperature) {
  return new Promise(function (resolve, reject) {
    var parsed = new URL(config.baseUrl || "http://localhost:11434");

    var payload = JSON.stringify({
      model: config.model || "qwen3:14b",
      max_tokens: maxTokens,
      temperature: temperature,
      stream: false,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: content },
      ],
    });

    var transport = parsed.protocol === "https:" ? https : http;

    var options = {
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === "https:" ? 443 : 80),
      path: "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload),
      },
    };

    var req = transport.request(options, function (res) {
      var chunks = [];
      res.on("data", function (c) { chunks.push(c); });
      res.on("end", function () {
        var raw = Buffer.concat(chunks).toString();
        try {
          var data = JSON.parse(raw);
          if (res.statusCode !== 200) {
            return reject(new Error("Ollama " + res.statusCode + ": " + raw));
          }
          var text = "";
          if (data.choices && data.choices[0] && data.choices[0].message) {
            text = data.choices[0].message.content || "";
          }
          resolve(text);
        } catch (e) {
          reject(new Error("Bad response from Ollama: " + raw.slice(0, 200)));
        }
      });
    });

    req.on("error", function (e) { reject(e); });
    req.write(payload);
    req.end();
  });
}

// Parse raw LLM text into JSON, stripping markdown fences and thinking blocks
function parseResponse(text) {
  var cleaned = text
    .replace(/<think>[\s\S]*?<\/think>/g, "")
    .replace(/```json|```/g, "")
    .trim();
  return JSON.parse(cleaned);
}

module.exports = {
  callLLM: callLLM,
  parseResponse: parseResponse,
  acceptsSamplingParams: acceptsSamplingParams,
};

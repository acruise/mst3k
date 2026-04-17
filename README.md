# Memetic Subspace Twitter 3017

> Intercepting transmissions from the subspace feed, circa 3026 CE

A tweet generator replicating mid-era Twitter (2012–2019) set 1000 years in the future. No build step. Node 16+.

## Quick Start

```bash
npm install
cp .env.example .env    # edit with your backend config
npm start               # http://localhost:3017
```

## Backends

### Anthropic (default)

```env
BACKEND=anthropic
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Ollama (local)

```env
BACKEND=ollama
OLLAMA_MODEL=llama3.1:70b
```

### Offline (no LLM needed)

Pre-generate a corpus, then serve it without any LLM connection:

```bash
# Step 1: Generate corpus (requires LLM connection)
node generate.js --count 50 --replies

# Step 2: Serve offline
BACKEND=offline npm start
```

## CLI: Corpus Generator

```bash
node generate.js [options]

Options:
  --count N         Number of tweets to generate (default: 10)
  --replies         Also generate reply threads for each tweet
  --corpus-dir DIR  Output directory (default: ./corpus)
  --help            Show help
```

Each tweet is saved as a separate JSON file in the corpus directory:

```json
{
  "tweet": {
    "display_name": "void_prophet",
    "handle": "@entropy_420",
    "tweet": "the sun is doing something weird and nobody is talking about it",
    "metrics": { "retweets": 4200, "likes": 89000, "replies": 12000, "quote_tweets": 3400 },
    "verified": 0,
    "is_ratio": false,
    "pfpColor": "hsl(220, 55%, 35%)",
    "pfpGlyph": "◉",
    "timestamp": "4h"
  },
  "replies": [ ... ],
  "generated_at": "2026-04-15T..."
}
```

## Architecture

```
mst3k/
├── server.js              # Express server (online + offline modes)
├── generate.js            # CLI corpus generator
├── llm.js                 # Shared LLM client (Anthropic + Ollama)
├── corpus/                # Pre-generated tweet files (git-ignored)
├── public/
│   ├── index.html         # Vanilla HTML + JS frontend
│   └── data/
│       ├── meme-formats.json      (233 formats)
│       ├── reply-archetypes.json  (88 archetypes)
│       ├── handles.json
│       ├── system-prompt.txt
│       └── replies-prompt.txt
├── package.json
└── .env.example
```

Node 16 compatible. No build step, no React, no bundler.

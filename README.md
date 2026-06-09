<div align="center">

```
  ██████╗██╗      ██████╗ ███████╗███████╗ ██████╗██╗      █████╗ ██╗    ██╗
 ██╔════╝██║     ██╔═══██╗██╔════╝██╔════╝██╔════╝██║     ██╔══██╗██║    ██║
 ██║     ██║     ██║   ██║███████╗█████╗  ██║     ██║     ███████║██║ █╗ ██║
 ██║     ██║     ██║   ██║╚════██║██╔══╝  ██║     ██║     ██╔══██║██║███╗██║
 ╚██████╗███████╗╚██████╔╝███████║███████╗╚██████╗███████╗██║  ██║╚███╔███╔╝
  ╚═════╝╚══════╝ ╚═════╝ ╚══════╝╚══════╝ ╚═════╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝
```

**AI-Powered Telegram Bot Commander**

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Telegram](https://img.shields.io/badge/Telegram_Bot_API-21.6-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://python-telegram-bot.org)
[![io.net](https://img.shields.io/badge/io.net-Cloud_AI-FF6B35?style=for-the-badge&logo=lightning&logoColor=white)](https://cloud.io.net)
[![Ollama](https://img.shields.io/badge/Ollama-Local_AI-000000?style=for-the-badge&logo=ollama&logoColor=white)](https://ollama.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

*Control your Linux server, spawn AI-powered bots, and route tasks intelligently — all from Telegram.*

</div>

---

## ✨ What is CloseCLAW?

**CloseCLAW** is a master Telegram bot that gives you full control over your Linux server through a natural-language interface. It intelligently routes tasks between two AI layers:

- 🔒 **Local AI (Ollama)** — for sensitive OS-level commands that stay on your machine
- ☁️ **Cloud AI (io.net)** — for complex reasoning, code generation, and creative tasks

It can also **spawn, manage, and kill child bots** — making it a true Bot Commander.

---

## 🏗 Architecture

```
Telegram User
      │
      ▼
┌─────────────────────────────────────────────┐
│              CloseCLAW Master Bot           │
│                                             │
│  ┌──────────┐   ┌──────────┐   ┌─────────┐ │
│  │  Router  │──▶│  Cloud   │   │  Local  │ │
│  │ (Smart)  │   │  io.net  │   │  Ollama │ │
│  └──────────┘   └──────────┘   └─────────┘ │
│                                             │
│  ┌──────────┐   ┌──────────┐   ┌─────────┐ │
│  │   Shell  │   │   Bot    │   │  Token  │ │
│  │ Executor │   │ Factory  │   │  Store  │ │
│  └──────────┘   └──────────┘   └─────────┘ │
└─────────────────────────────────────────────┘
          │               │
          ▼               ▼
    Linux Server    Child TG Bots
```

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🖥 **Shell Execution** | Run any Linux command via `/run` with live output |
| 🧠 **Smart Routing** | Auto-detects if a task needs local or cloud AI |
| ☁️ **Cloud AI** | Full io.net API integration (Llama 3.3 70B and more) |
| 🔒 **Local AI** | Private Ollama integration — sensitive data never leaves your server |
| 🤖 **Bot Factory** | Generate and deploy new Telegram bots via AI in seconds |
| 🔐 **Token Store** | AES-256 encrypted storage for child bot tokens |
| 📊 **Dashboard** | Web UI for visual monitoring |
| 📡 **Status Monitor** | Real-time CPU, RAM, disk, and bot status |
| 🛡 **Whitelist** | Only your Telegram IDs can interact with the bot |

---

## ⚡ Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/Future-Web2/Close-Claw.git
cd Close-Claw
```

### 2. Set up environment

```bash
# Create virtual environment
python -m venv .venv

# Activate it
source .venv/bin/activate        # Linux/Mac
.venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt
```

### 3. Configure `.env`

```bash
cp .env.example .env
nano .env   # Fill in your keys
```

| Variable | Where to get it |
|---|---|
| `TELEGRAM_BOT_TOKEN` | [@BotFather](https://t.me/BotFather) → `/newbot` |
| `IO_NET_API_KEY` | [cloud.io.net](https://cloud.io.net) → API Keys |
| `ALLOWED_USER_IDS` | [@userinfobot](https://t.me/userinfobot) |
| `TOKEN_STORE_PASSWORD` | Any strong password you choose |

### 4. (Optional) Start Ollama

```bash
# Install from https://ollama.com
ollama run llama3.2
```

### 5. Launch the bot

```bash
python bot.py
```

---

## 📟 Bot Commands

```
/start          — Welcome message & command list
/status         — System health (CPU, RAM, disk, running bots)
/run <cmd>      — Execute shell command on the server
/ai <prompt>    — Ask cloud AI (io.net)
/local <prompt> — Ask local AI (Ollama) — stays private
/createbot <desc> — Generate & launch a new Telegram bot via AI
/bots           — List all running child bots
/stopbot <name> — Stop a child bot
/tokens         — List stored bot tokens
/addtoken <name> <token> — Store a token (AES-256 encrypted)
/removetoken <name>      — Delete a stored token
```

> 💡 **Smart mode:** Just type anything without a command — the router decides where to send it automatically.

---

## 📁 Project Structure

```
CloseCLAW/
├── bot.py                  # Master bot entry point
├── requirements.txt        # Python dependencies
├── .env.example            # Config template (copy to .env)
├── .gitignore
│
├── brain/                  # Core AI & execution logic
│   ├── router.py           # Smart task router (local vs cloud)
│   ├── ionet_client.py     # io.net API client
│   ├── ollama_client.py    # Ollama local AI client
│   ├── executor.py         # Shell command executor
│   └── bot_factory.py      # AI-powered bot generator
│
├── token_store/            # Encrypted token vault
│   └── token_manager.py    # AES-256 token management
│
└── dashboard/              # Web monitoring UI
    └── index.html          # Open in browser
```

---

## 🔒 Security Notes

- **`.env` is gitignored** — your API keys are never committed
- **Token Store** uses AES-256 encryption with a salted key derived from your password
- **Whitelist** — only Telegram user IDs listed in `ALLOWED_USER_IDS` can use the bot
- **Local AI** — Ollama processes sensitive tasks locally; data never leaves your machine

---

## 🛠 Requirements

- Python 3.10+
- Linux server (for shell execution features)
- Telegram Bot Token
- io.net API key (for cloud AI)
- [Ollama](https://ollama.com) (optional, for local AI)

---

## 📄 License

MIT License — feel free to use, fork, and build on top of this.

---

<div align="center">

Built with 🤖 by [Future-Web2](https://github.com/Future-Web2)

*CloseCLAW — Because your server deserves a brain.*

</div>

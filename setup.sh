#!/bin/bash
# CloseCLAW — Linux Setup & Deploy Script
# Run with: chmod +x setup.sh && ./setup.sh

set -e

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${CYAN}"
echo "  ██████╗██╗      ██████╗ ███████╗███████╗ ██████╗██╗      █████╗ ██╗    ██╗"
echo " ██╔════╝██║     ██╔═══██╗██╔════╝██╔════╝██╔════╝██║     ██╔══██╗██║    ██║"
echo " ██║     ██║     ██║   ██║███████╗█████╗  ██║     ██║     ███████║██║ █╗ ██║"
echo " ██║     ██║     ██║   ██║╚════██║██╔══╝  ██║     ██║     ██╔══██║██║███╗██║"
echo " ╚██████╗███████╗╚██████╔╝███████║███████╗╚██████╗███████╗██║  ██║╚███╔███╔╝"
echo "  ╚═════╝╚══════╝ ╚═════╝ ╚══════╝╚══════╝ ╚═════╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝"
echo -e "${NC}"
echo -e "${GREEN}AI-Powered Telegram Bot Commander — Setup Script${NC}"
echo ""

# ─── System update ────────────────────────────────────────────────────────────
echo -e "${CYAN}[1/7] Updating system packages...${NC}"
sudo apt update -qq && sudo apt upgrade -y -qq

# ─── Python ───────────────────────────────────────────────────────────────────
echo -e "${CYAN}[2/7] Installing Python 3.11+...${NC}"
sudo apt install -y python3 python3-pip python3-venv python3-full -qq

# ─── Node.js ──────────────────────────────────────────────────────────────────
echo -e "${CYAN}[3/7] Installing Node.js 20 LTS...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs -qq
fi
echo -e "${GREEN}  Node.js: $(node --version)${NC}"
echo -e "${GREEN}  npm: $(npm --version)${NC}"

# ─── pm2 ──────────────────────────────────────────────────────────────────────
echo -e "${CYAN}[4/7] Installing pm2...${NC}"
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2 -q
    pm2 startup
fi
echo -e "${GREEN}  pm2: $(pm2 --version)${NC}"

# ─── Ollama ───────────────────────────────────────────────────────────────────
echo -e "${CYAN}[5/7] Installing Ollama...${NC}"
if ! command -v ollama &> /dev/null; then
    curl -fsSL https://ollama.com/install.sh | sh
fi
echo -e "${GREEN}  Ollama installed!${NC}"

# Start ollama service
sudo systemctl enable ollama 2>/dev/null || true
sudo systemctl start ollama 2>/dev/null || ollama serve &
sleep 3

# Pull default model
OLLAMA_MODEL=${OLLAMA_MODEL:-llama3.2}
echo -e "${YELLOW}  Pulling Ollama model: ${OLLAMA_MODEL}...${NC}"
echo -e "${YELLOW}  (This may take a few minutes on first run)${NC}"
ollama pull $OLLAMA_MODEL

# ─── Python venv + deps ───────────────────────────────────────────────────────
echo -e "${CYAN}[6/7] Setting up Python virtual environment...${NC}"
python3 -m venv .venv
source .venv/bin/activate
pip install -q --upgrade pip
pip install -q -r requirements.txt
echo -e "${GREEN}  Python dependencies installed!${NC}"

# ─── Create directories ───────────────────────────────────────────────────────
mkdir -p bots token_store
echo -e "${GREEN}  Directories created!${NC}"

# ─── .env check ───────────────────────────────────────────────────────────────
echo -e "${CYAN}[7/7] Checking configuration...${NC}"
if [ ! -f .env ] || grep -q "your_master_bot_token_here" .env; then
    echo -e "${RED}"
    echo "  ⚠️  Please configure your .env file before starting!"
    echo "  Edit: nano .env"
    echo "  Set: TELEGRAM_BOT_TOKEN, IO_NET_API_KEY, ALLOWED_USER_IDS"
    echo -e "${NC}"
else
    echo -e "${GREEN}  .env configuration found!${NC}"
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  ✅ Setup Complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "  To start CloseCLAW:"
echo ""
echo "  1. Configure:  nano .env"
echo "  2. Activate:   source .venv/bin/activate"
echo "  3. Start:      python bot.py"
echo ""
echo "  Or use pm2 for production:"
echo "  pm2 start 'python bot.py' --name closeclaw --interpreter .venv/bin/python"
echo "  pm2 save"
echo ""
echo "  Dashboard: python -m http.server 3000 --directory dashboard"
echo ""

"""
Bot Factory — generates, saves, installs and launches Node.js Telegram bots.
Uses io.net AI to write the bot code, then pm2 to run it.
"""
import os
import re
import json
import asyncio
import logging
import aiofiles
from brain.ionet_client import IoNetClient
from brain.executor import ShellExecutor
from token_store.token_manager import TokenManager

logger = logging.getLogger(__name__)

BOTS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "bots")


def _sanitize_name(text: str) -> str:
    """Convert description to a safe directory name."""
    name = re.sub(r"[^\w\s-]", "", text.lower())
    name = re.sub(r"[\s-]+", "_", name).strip("_")
    return name[:30] or "bot"


class BotFactory:
    def __init__(self):
        self.ionet = IoNetClient()
        self.executor = ShellExecutor()
        self.token_mgr = TokenManager()
        os.makedirs(BOTS_DIR, exist_ok=True)

    async def create_bot(self, description: str, update=None, msg=None) -> str:
        """Full pipeline: generate code → create dir → install → launch via pm2."""
        bot_name = _sanitize_name(description)
        bot_dir = os.path.join(BOTS_DIR, bot_name)

        # Avoid overwriting existing bot
        if os.path.exists(bot_dir):
            bot_name = bot_name + "_2"
            bot_dir = os.path.join(BOTS_DIR, bot_name)

        # Step 1: Generate code
        if msg:
            await msg.edit_text(f"☁️ *Generating code for:* _{description}_...", parse_mode="Markdown")

        code = await self.ionet.generate_bot_code(description)

        # Strip markdown code fences if present
        code = re.sub(r"^```[\w]*\n?", "", code, flags=re.MULTILINE)
        code = re.sub(r"\n?```$", "", code, flags=re.MULTILINE)

        if not code or "require(" not in code:
            return f"❌ AI did not generate valid Node.js code. Try rephrasing your description."

        # Step 2: Create directory
        os.makedirs(bot_dir, exist_ok=True)

        # Step 3: Write index.js
        async with aiofiles.open(os.path.join(bot_dir, "index.js"), "w") as f:
            await f.write(code)

        # Step 4: Create package.json
        pkg = {
            "name": bot_name,
            "version": "1.0.0",
            "main": "index.js",
            "scripts": {"start": "node index.js"},
            "dependencies": {
                "node-telegram-bot-api": "^0.66.0",
                "dotenv": "^16.4.5",
                "axios": "^1.7.2"
            }
        }
        async with aiofiles.open(os.path.join(bot_dir, "package.json"), "w") as f:
            await f.write(json.dumps(pkg, indent=2))

        # Step 5: Create .env for the bot
        # Try to find a stored token with matching name, else use placeholder
        tokens = self.token_mgr.list_tokens(raw=True)
        bot_token = tokens.get(bot_name) or tokens.get(list(tokens.keys())[0]) if tokens else "YOUR_BOT_TOKEN_HERE"

        async with aiofiles.open(os.path.join(bot_dir, ".env"), "w") as f:
            await f.write(f"BOT_TOKEN={bot_token}\n")

        # Step 6: npm install
        if msg:
            await msg.edit_text(f"📦 *Installing dependencies...*", parse_mode="Markdown")

        stdout, stderr, code_exit = await self.executor.run_in_dir(
            "npm install", bot_dir, timeout=120
        )
        if code_exit != 0:
            return f"❌ npm install failed:\n```\n{stderr[:500]}\n```"

        # Step 7: pm2 start
        if msg:
            await msg.edit_text(f"🚀 *Launching bot with pm2...*", parse_mode="Markdown")

        pm2_name = f"closeclaw_{bot_name}"
        stdout, stderr, code_exit = await self.executor.run_in_dir(
            f"pm2 start index.js --name {pm2_name} --update-env",
            bot_dir
        )

        if code_exit != 0:
            # pm2 might not be installed
            return (
                f"⚠️ Bot code created at `bots/{bot_name}/` but pm2 launch failed.\n\n"
                f"To run manually:\n"
                f"```bash\ncd bots/{bot_name} && node index.js\n```\n\n"
                f"Install pm2: `npm install -g pm2`"
            )

        await self.executor.run("pm2 save")

        return (
            f"✅ *Bot Created & Launched!*\n\n"
            f"📁 Directory: `bots/{bot_name}/`\n"
            f"⚙️ pm2 name: `{pm2_name}`\n\n"
            f"⚠️ *Don't forget to set the real BOT token:*\n"
            f"`nano bots/{bot_name}/.env`\n"
            f"Then restart: `pm2 restart {pm2_name}`"
        )

    async def list_bots(self) -> str:
        """List all bots and their pm2 status."""
        stdout, stderr, _ = await self.executor.run("pm2 jlist")
        
        try:
            procs = json.loads(stdout)
            claw_bots = [p for p in procs if p.get("name", "").startswith("closeclaw_")]
        except Exception:
            claw_bots = []

        if not claw_bots:
            dirs = [d for d in os.listdir(BOTS_DIR) if os.path.isdir(os.path.join(BOTS_DIR, d))]
            if not dirs:
                return "🤖 No bots created yet.\n\nUse `/createbot <description>` to create one!"
            return (
                "📁 *Bot directories (not yet started with pm2):*\n" +
                "\n".join(f"• `{d}`" for d in dirs) +
                "\n\n💡 Start with: `/run pm2 start bots/<name>/index.js --name <name>`"
            )

        lines = ["🤖 *Running Bots:*\n"]
        for bot in claw_bots:
            name = bot.get("name", "?")
            status = bot.get("pm2_env", {}).get("status", "?")
            emoji = "🟢" if status == "online" else "🔴"
            pid = bot.get("pid", "?")
            lines.append(f"{emoji} `{name}` — {status} (PID: {pid})")

        return "\n".join(lines)

    async def stop_bot(self, name: str) -> str:
        """Stop a bot by name."""
        pm2_name = f"closeclaw_{name}" if not name.startswith("closeclaw_") else name
        stdout, stderr, code = await self.executor.run(f"pm2 stop {pm2_name}")
        if code == 0:
            return f"⏹ Bot `{pm2_name}` stopped."
        return f"❌ Could not stop `{pm2_name}`:\n```\n{stderr[:300]}\n```"

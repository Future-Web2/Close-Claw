"""
CloseCLAW — AI-Powered Telegram Bot Commander
Master bot entry point
"""
import os
import asyncio
import logging
from dotenv import load_dotenv
from telegram import Update, BotCommand
from telegram.ext import (
    Application, CommandHandler, MessageHandler,
    filters, ContextTypes
)
from brain.router import TaskRouter
from brain.executor import ShellExecutor
from brain.bot_factory import BotFactory
from token_store.token_manager import TokenManager

load_dotenv()

logging.basicConfig(
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    level=logging.INFO
)
logger = logging.getLogger("CloseCLAW")

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
ALLOWED_IDS = set(int(x.strip()) for x in os.getenv("ALLOWED_USER_IDS", "").split(",") if x.strip())

router = TaskRouter()
executor = ShellExecutor()
factory = BotFactory()
token_mgr = TokenManager()


def whitelist(func):
    """Decorator: block non-whitelisted users."""
    async def wrapper(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
        uid = update.effective_user.id
        if ALLOWED_IDS and uid not in ALLOWED_IDS:
            await update.message.reply_text("⛔ Access denied.")
            logger.warning(f"Blocked user {uid}")
            return
        return await func(update, ctx)
    wrapper.__name__ = func.__name__
    return wrapper


# ─── /start ───────────────────────────────────────────────────────────────────
@whitelist
async def cmd_start(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "🤖 *CloseCLAW — AI Bot Commander*\n\n"
        "I can execute commands, create Telegram bots, and manage everything on your Linux server.\n\n"
        "*Commands:*\n"
        "`/run <cmd>` — Execute shell command\n"
        "`/ai <prompt>` — Cloud AI (io.net)\n"
        "`/local <prompt>` — Local AI (Ollama, private)\n"
        "`/createbot <description>` — Generate + launch new TG bot\n"
        "`/bots` — List running bots\n"
        "`/stopbot <name>` — Stop a bot\n"
        "`/tokens` — Manage bot tokens\n"
        "`/addtoken <name> <token>` — Store a token\n"
        "`/removetoken <name>` — Delete a token\n"
        "`/status` — System health\n\n"
        "Or just type anything — smart auto-routing will handle it!\n\n"
        "🔒 *OS tasks stay local. Code tasks go to cloud AI.*"
    )
    await update.message.reply_text(text, parse_mode="Markdown")


# ─── /status ──────────────────────────────────────────────────────────────────
@whitelist
async def cmd_status(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    import psutil, subprocess
    cpu = psutil.cpu_percent(interval=1)
    ram = psutil.virtual_memory()
    disk = psutil.disk_usage("/")

    try:
        pm2_out = subprocess.check_output(
            ["pm2", "jlist"], text=True, timeout=5
        )
        import json
        pm2_list = json.loads(pm2_out)
        bots_running = sum(1 for p in pm2_list if p.get("pm2_env", {}).get("status") == "online")
    except Exception:
        bots_running = "N/A (pm2 not found)"

    text = (
        f"📊 *System Status*\n\n"
        f"🖥 CPU: `{cpu}%`\n"
        f"💾 RAM: `{ram.percent}%` ({ram.used//1024//1024}MB / {ram.total//1024//1024}MB)\n"
        f"💿 Disk: `{disk.percent}%` ({disk.used//1024//1024//1024}GB / {disk.total//1024//1024//1024}GB)\n"
        f"🤖 Running bots: `{bots_running}`\n"
        f"🔒 Ollama: `{os.getenv('OLLAMA_BASE_URL')}`\n"
        f"☁️ io.net model: `{os.getenv('IONET_MODEL')}`"
    )
    await update.message.reply_text(text, parse_mode="Markdown")


# ─── /run ─────────────────────────────────────────────────────────────────────
@whitelist
async def cmd_run(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    if not ctx.args:
        await update.message.reply_text("Usage: `/run <shell command>`", parse_mode="Markdown")
        return
    command = " ".join(ctx.args)
    msg = await update.message.reply_text(f"⚙️ Running: `{command}`...", parse_mode="Markdown")
    stdout, stderr, code = await executor.run(command)
    output = stdout or stderr or "(no output)"
    if len(output) > 3800:
        output = output[:3800] + "\n...(truncated)"
    result = f"```\n{output}\n```\nExit code: `{code}`"
    await msg.edit_text(result, parse_mode="Markdown")


# ─── /ai ──────────────────────────────────────────────────────────────────────
@whitelist
async def cmd_ai(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    if not ctx.args:
        await update.message.reply_text("Usage: `/ai <your prompt>`", parse_mode="Markdown")
        return
    prompt = " ".join(ctx.args)
    msg = await update.message.reply_text("☁️ Asking io.net AI...")
    try:
        result = await router.ask_cloud(prompt)
        if len(result) > 4000:
            for i in range(0, len(result), 4000):
                await update.message.reply_text(result[i:i+4000])
            await msg.delete()
        else:
            await msg.edit_text(result)
    except Exception as e:
        await msg.edit_text(f"❌ io.net error: {e}")


# ─── /local ───────────────────────────────────────────────────────────────────
@whitelist
async def cmd_local(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    if not ctx.args:
        await update.message.reply_text("Usage: `/local <your prompt>`", parse_mode="Markdown")
        return
    prompt = " ".join(ctx.args)
    msg = await update.message.reply_text("🔒 Asking local Ollama AI...")
    try:
        result = await router.ask_local(prompt)
        if len(result) > 4000:
            for i in range(0, len(result), 4000):
                await update.message.reply_text(result[i:i+4000])
            await msg.delete()
        else:
            await msg.edit_text(result)
    except Exception as e:
        await msg.edit_text(f"❌ Ollama error: {e}")


# ─── /createbot ───────────────────────────────────────────────────────────────
@whitelist
async def cmd_createbot(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    if not ctx.args:
        await update.message.reply_text(
            "Usage: `/createbot <description>`\n\n"
            "Example: `/createbot A bot that tells random jokes`",
            parse_mode="Markdown"
        )
        return
    description = " ".join(ctx.args)
    msg = await update.message.reply_text(
        f"🏗 Creating bot: _{description}_\n\nThis may take 30-60 seconds...",
        parse_mode="Markdown"
    )
    try:
        result = await factory.create_bot(description, update, msg)
        await msg.edit_text(result, parse_mode="Markdown")
    except Exception as e:
        await msg.edit_text(f"❌ Bot creation failed: {e}")


# ─── /bots ────────────────────────────────────────────────────────────────────
@whitelist
async def cmd_bots(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    result = await factory.list_bots()
    await update.message.reply_text(result, parse_mode="Markdown")


# ─── /stopbot ─────────────────────────────────────────────────────────────────
@whitelist
async def cmd_stopbot(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    if not ctx.args:
        await update.message.reply_text("Usage: `/stopbot <name>`", parse_mode="Markdown")
        return
    name = ctx.args[0]
    result = await factory.stop_bot(name)
    await update.message.reply_text(result, parse_mode="Markdown")


# ─── /tokens ──────────────────────────────────────────────────────────────────
@whitelist
async def cmd_tokens(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    tokens = token_mgr.list_tokens()
    if not tokens:
        await update.message.reply_text("🔐 No tokens stored yet.\n\nUse `/addtoken <name> <token>`", parse_mode="Markdown")
        return
    lines = ["🔐 *Stored Bot Tokens:*\n"]
    for name, masked in tokens.items():
        lines.append(f"• `{name}` → `{masked}`")
    await update.message.reply_text("\n".join(lines), parse_mode="Markdown")


# ─── /addtoken ────────────────────────────────────────────────────────────────
@whitelist
async def cmd_addtoken(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    if len(ctx.args) < 2:
        await update.message.reply_text("Usage: `/addtoken <name> <token>`", parse_mode="Markdown")
        return
    name, token = ctx.args[0], ctx.args[1]
    token_mgr.add_token(name, token)
    await update.message.reply_text(
        f"🔐 Token `{name}` stored securely (AES-256 encrypted).",
        parse_mode="Markdown"
    )


# ─── /removetoken ─────────────────────────────────────────────────────────────
@whitelist
async def cmd_removetoken(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    if not ctx.args:
        await update.message.reply_text("Usage: `/removetoken <name>`", parse_mode="Markdown")
        return
    name = ctx.args[0]
    if token_mgr.remove_token(name):
        await update.message.reply_text(f"✅ Token `{name}` removed.", parse_mode="Markdown")
    else:
        await update.message.reply_text(f"❌ Token `{name}` not found.", parse_mode="Markdown")


# ─── Smart auto-routing ───────────────────────────────────────────────────────
@whitelist
async def handle_message(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = update.message.text.strip()
    msg = await update.message.reply_text("🧠 Analyzing your request...")

    try:
        route, response = await router.route(text)
        prefix = "🔒 *Local AI:*\n" if route == "local" else "☁️ *Cloud AI:*\n"
        full = prefix + response
        if len(full) > 4000:
            await msg.edit_text(prefix + "_(response is long, sending in parts)_", parse_mode="Markdown")
            for i in range(0, len(response), 4000):
                await update.message.reply_text(response[i:i+4000])
        else:
            await msg.edit_text(full, parse_mode="Markdown")
    except Exception as e:
        await msg.edit_text(f"❌ Error: {e}")


# ─── Main ─────────────────────────────────────────────────────────────────────
async def post_init(app: Application):
    await app.bot.set_my_commands([
        BotCommand("start", "Welcome & help"),
        BotCommand("run", "Execute shell command"),
        BotCommand("ai", "Ask cloud AI (io.net)"),
        BotCommand("local", "Ask local AI (Ollama)"),
        BotCommand("createbot", "Generate & launch new TG bot"),
        BotCommand("bots", "List all running bots"),
        BotCommand("stopbot", "Stop a running bot"),
        BotCommand("tokens", "List stored bot tokens"),
        BotCommand("addtoken", "Add a bot token"),
        BotCommand("removetoken", "Remove a bot token"),
        BotCommand("status", "System health check"),
    ])
    logger.info("✅ CloseCLAW is online!")


def main():
    if not TOKEN:
        raise ValueError("TELEGRAM_BOT_TOKEN not set in .env")
    
    app = (
        Application.builder()
        .token(TOKEN)
        .post_init(post_init)
        .build()
    )

    app.add_handler(CommandHandler("start", cmd_start))
    app.add_handler(CommandHandler("status", cmd_status))
    app.add_handler(CommandHandler("run", cmd_run))
    app.add_handler(CommandHandler("ai", cmd_ai))
    app.add_handler(CommandHandler("local", cmd_local))
    app.add_handler(CommandHandler("createbot", cmd_createbot))
    app.add_handler(CommandHandler("bots", cmd_bots))
    app.add_handler(CommandHandler("stopbot", cmd_stopbot))
    app.add_handler(CommandHandler("tokens", cmd_tokens))
    app.add_handler(CommandHandler("addtoken", cmd_addtoken))
    app.add_handler(CommandHandler("removetoken", cmd_removetoken))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    logger.info("🚀 Starting CloseCLAW...")
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
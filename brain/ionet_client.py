"""io.net Intelligence API client — OpenAI-compatible, for cloud AI tasks."""
import os
import logging
from openai import AsyncOpenAI

logger = logging.getLogger(__name__)

IONET_API_KEY = os.getenv("IO_NET_API_KEY", "")
IONET_BASE_URL = os.getenv("IONET_BASE_URL", "https://api.intelligence.io.solutions/api/v1")
IONET_MODEL = os.getenv("IONET_MODEL", "meta-llama/Llama-3.3-70B-Instruct")

SYSTEM_PROMPT = (
    "You are CloseCLAW, a powerful AI coding assistant and bot creator. "
    "You specialize in generating complete, working Node.js Telegram bots, "
    "writing scripts, and solving complex programming challenges. "
    "Always produce production-quality code. When asked to create a Telegram bot, "
    "generate ONLY the complete index.js code using the 'node-telegram-bot-api' package."
)


class IoNetClient:
    def __init__(self):
        self._client = None

    def _get_client(self) -> AsyncOpenAI:
        if not self._client:
            if not IONET_API_KEY:
                raise ValueError("IO_NET_API_KEY not set in .env")
            self._client = AsyncOpenAI(
                api_key=IONET_API_KEY,
                base_url=IONET_BASE_URL,
            )
        return self._client

    async def chat(self, prompt: str, system: str = SYSTEM_PROMPT) -> str:
        try:
            client = self._get_client()
            response = await client.chat.completions.create(
                model=IONET_MODEL,
                messages=[
                    {"role": "system", "content": system},
                    {"role": "user", "content": prompt},
                ],
                max_tokens=4096,
                temperature=0.7,
            )
            return response.choices[0].message.content.strip()
        except ValueError as e:
            return f"❌ Configuration error: {e}"
        except Exception as e:
            logger.error(f"io.net error: {e}")
            return f"❌ io.net AI error: {e}"

    async def generate_bot_code(self, description: str, bot_token_placeholder: str = "BOT_TOKEN") -> str:
        """Generate complete Node.js Telegram bot code for a given description."""
        prompt = (
            f"Create a complete, working Node.js Telegram bot with the following description:\n\n"
            f"{description}\n\n"
            f"Requirements:\n"
            f"- Use 'node-telegram-bot-api' package (require('node-telegram-bot-api'))\n"
            f"- Load the token from process.env.BOT_TOKEN\n"
            f"- Use require('dotenv').config() at the top\n"
            f"- Include proper error handling\n"
            f"- Include a /start command with a description of what the bot does\n"
            f"- Include a /help command\n"
            f"- Make the bot fully functional and production ready\n"
            f"- Output ONLY the JavaScript code, no explanations\n"
        )
        return await self.chat(prompt, system=(
            "You are an expert Node.js developer specializing in Telegram bots. "
            "Generate ONLY clean JavaScript code. No markdown, no explanations. "
            "Start directly with require() statements."
        ))

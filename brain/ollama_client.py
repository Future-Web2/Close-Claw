"""Ollama local AI client — all data stays on your machine."""
import os
import asyncio
import logging
import aiohttp
import json

logger = logging.getLogger(__name__)

OLLAMA_BASE = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")

SYSTEM_PROMPT = (
    "You are CloseCLAW, an AI assistant running on a Linux server. "
    "You help with shell commands, file operations, system administration, "
    "and answering technical questions. Be concise, accurate, and practical. "
    "For shell commands, always wrap them in code blocks."
)


class OllamaClient:
    async def chat(self, prompt: str, system: str = SYSTEM_PROMPT) -> str:
        payload = {
            "model": OLLAMA_MODEL,
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": prompt},
            ],
            "stream": False,
        }
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{OLLAMA_BASE}/api/chat",
                    json=payload,
                    timeout=aiohttp.ClientTimeout(total=120),
                ) as resp:
                    if resp.status != 200:
                        text = await resp.text()
                        raise Exception(f"Ollama HTTP {resp.status}: {text}")
                    data = await resp.json()
                    return data["message"]["content"].strip()
        except aiohttp.ClientConnectorError:
            return (
                "❌ Cannot connect to Ollama.\n"
                "Make sure Ollama is running:\n"
                "`ollama serve`\n"
                f"And model is pulled:\n`ollama pull {OLLAMA_MODEL}`"
            )
        except Exception as e:
            logger.error(f"Ollama error: {e}")
            return f"❌ Ollama error: {e}"

    async def is_available(self) -> bool:
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    f"{OLLAMA_BASE}/api/tags",
                    timeout=aiohttp.ClientTimeout(total=5)
                ) as resp:
                    return resp.status == 200
        except Exception:
            return False

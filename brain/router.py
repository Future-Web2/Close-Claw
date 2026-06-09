"""
Task Router — decides whether to use local Ollama or cloud io.net AI.
All classification happens locally so nothing leaks to the cloud.
"""
import os
import logging
from brain.ollama_client import OllamaClient
from brain.ionet_client import IoNetClient

logger = logging.getLogger(__name__)

# Keywords that signal OS/local tasks
LOCAL_KEYWORDS = [
    "file", "folder", "directory", "ls", "cat", "grep", "chmod", "chown",
    "rm", "mv", "cp", "mkdir", "touch", "nano", "vim", "disk", "memory",
    "cpu", "process", "service", "systemctl", "cron", "log", "nginx",
    "apache", "python", "pip", "docker", "ssh", "network", "ip", "port",
    "firewall", "iptables", "ufw", "install", "apt", "yum", "dnf",
    "secret", "password", "env", "config", "private", "key", "certificate",
]

CLOUD_KEYWORDS = [
    "write a bot", "create a bot", "generate", "code", "script", "program",
    "function", "class", "api", "implement", "build", "develop", "design",
    "algorithm", "explain", "what is", "how to", "database", "sql", "html",
    "css", "javascript", "node", "react", "flask", "django", "fastapi",
]


class TaskRouter:
    def __init__(self):
        self.ollama = OllamaClient()
        self.ionet = IoNetClient()

    def _classify(self, text: str) -> str:
        """Simple keyword-based classifier that runs locally (no API calls)."""
        lower = text.lower()
        local_score = sum(1 for kw in LOCAL_KEYWORDS if kw in lower)
        cloud_score = sum(1 for kw in CLOUD_KEYWORDS if kw in lower)
        
        if local_score > cloud_score:
            return "local"
        elif cloud_score > 0:
            return "cloud"
        else:
            # Default: local for safety/privacy
            return "local"

    async def route(self, text: str) -> tuple[str, str]:
        """Auto-route message to best AI backend. Returns (route, response)."""
        route = self._classify(text)
        logger.info(f"Routing '{text[:50]}...' → {route}")

        if route == "local":
            response = await self.ollama.chat(text)
        else:
            response = await self.ionet.chat(text)

        return route, response

    async def ask_cloud(self, prompt: str) -> str:
        """Explicitly ask io.net cloud AI."""
        return await self.ionet.chat(prompt)

    async def ask_local(self, prompt: str) -> str:
        """Explicitly ask local Ollama AI."""
        return await self.ollama.chat(prompt)

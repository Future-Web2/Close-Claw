"""AES-256 encrypted token manager for Telegram bot tokens."""
import os
import json
import base64
import logging
from pathlib import Path
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

logger = logging.getLogger(__name__)

STORE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "token_store")
TOKENS_FILE = os.path.join(STORE_DIR, "tokens.enc")
SALT_FILE = os.path.join(STORE_DIR, ".salt")


def _derive_key(password: str, salt: bytes) -> bytes:
    """Derive AES key from password using PBKDF2."""
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=480000,
    )
    return base64.urlsafe_b64encode(kdf.derive(password.encode()))


class TokenManager:
    def __init__(self):
        os.makedirs(STORE_DIR, exist_ok=True)
        self._password = os.getenv("TOKEN_STORE_PASSWORD", "changeme")
        self._fernet = None
        self._init_crypto()

    def _init_crypto(self):
        """Initialize or load the crypto salt."""
        if not os.path.exists(SALT_FILE):
            salt = os.urandom(32)
            with open(SALT_FILE, "wb") as f:
                f.write(salt)
        else:
            with open(SALT_FILE, "rb") as f:
                salt = f.read()
        
        key = _derive_key(self._password, salt)
        self._fernet = Fernet(key)

    def _load(self) -> dict:
        """Load and decrypt token store."""
        if not os.path.exists(TOKENS_FILE):
            return {}
        try:
            with open(TOKENS_FILE, "rb") as f:
                encrypted = f.read()
            decrypted = self._fernet.decrypt(encrypted)
            return json.loads(decrypted.decode())
        except Exception as e:
            logger.error(f"Failed to load tokens: {e}")
            return {}

    def _save(self, data: dict):
        """Encrypt and save token store."""
        try:
            plaintext = json.dumps(data).encode()
            encrypted = self._fernet.encrypt(plaintext)
            with open(TOKENS_FILE, "wb") as f:
                f.write(encrypted)
        except Exception as e:
            logger.error(f"Failed to save tokens: {e}")

    def add_token(self, name: str, token: str):
        data = self._load()
        data[name] = token
        self._save(data)
        logger.info(f"Token '{name}' stored (encrypted)")

    def get_token(self, name: str) -> str | None:
        return self._load().get(name)

    def remove_token(self, name: str) -> bool:
        data = self._load()
        if name in data:
            del data[name]
            self._save(data)
            return True
        return False

    def list_tokens(self, raw: bool = False) -> dict:
        """
        List tokens. If raw=False, returns masked versions (safe to display).
        If raw=True, returns actual tokens (for internal use only).
        """
        data = self._load()
        if raw:
            return data
        # Mask tokens for display
        masked = {}
        for name, token in data.items():
            if len(token) > 10:
                masked[name] = token[:6] + "..." + token[-4:]
            else:
                masked[name] = "***"
        return masked

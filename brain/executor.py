"""
Safe shell command executor.
Blocks dangerous commands and runs everything in async subprocess.
"""
import asyncio
import logging
import shlex

logger = logging.getLogger(__name__)

# Commands that require explicit confirmation (not blocked, just flagged)
DANGEROUS_PATTERNS = [
    "rm -rf /",
    "rm -rf /*",
    "dd if=/dev/zero",
    "mkfs",
    ":(){:|:&};:",  # fork bomb
    "wget | sh",
    "curl | sh",
    "curl | bash",
]

# Hard-blocked - will never execute
BLOCKED_COMMANDS = [
    "rm -rf /",
    "rm -rf /*",
    ":(){:|:&};:",
]


class ShellExecutor:
    async def run(self, command: str, timeout: int = 30) -> tuple[str, str, int]:
        """
        Run a shell command asynchronously.
        Returns: (stdout, stderr, exit_code)
        """
        # Safety check
        for blocked in BLOCKED_COMMANDS:
            if blocked in command:
                return "", f"🚫 Command blocked for safety: contains '{blocked}'", 1

        # Warn about dangerous patterns but still allow
        for pattern in DANGEROUS_PATTERNS:
            if pattern in command and pattern not in BLOCKED_COMMANDS:
                logger.warning(f"Potentially dangerous command: {command}")

        try:
            proc = await asyncio.create_subprocess_shell(
                command,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            stdout, stderr = await asyncio.wait_for(
                proc.communicate(), timeout=timeout
            )
            return (
                stdout.decode("utf-8", errors="replace").strip(),
                stderr.decode("utf-8", errors="replace").strip(),
                proc.returncode or 0,
            )
        except asyncio.TimeoutError:
            try:
                proc.kill()
            except Exception:
                pass
            return "", f"⏱ Command timed out after {timeout}s", 124
        except FileNotFoundError:
            return "", "❌ Command not found", 127
        except Exception as e:
            logger.error(f"Executor error: {e}")
            return "", f"❌ Execution error: {e}", 1

    async def run_in_dir(self, command: str, cwd: str, timeout: int = 120) -> tuple[str, str, int]:
        """Run a command in a specific directory."""
        try:
            proc = await asyncio.create_subprocess_shell(
                command,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                cwd=cwd,
            )
            stdout, stderr = await asyncio.wait_for(
                proc.communicate(), timeout=timeout
            )
            return (
                stdout.decode("utf-8", errors="replace").strip(),
                stderr.decode("utf-8", errors="replace").strip(),
                proc.returncode or 0,
            )
        except asyncio.TimeoutError:
            try:
                proc.kill()
            except Exception:
                pass
            return "", f"⏱ Command timed out after {timeout}s", 124
        except Exception as e:
            return "", f"❌ Error: {e}", 1

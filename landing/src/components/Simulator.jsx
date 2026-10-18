import { useState, useRef, useEffect } from 'react'

const SIMULATED_RESPONSES = {
  '/start': {
    ru: `🤖 *CloseCLAW — AI Bot Commander v2.0*

Я автономный командир вашего Linux-сервера. Я выполняю команды, управляю дочерними ботами и безопасно работаю с двумя уровнями ИИ.

*Доступные команды:*
• \`/status\` — Мониторинг CPU, RAM, диска и ботов
• \`/run <команда>\` — Выполнить shell-команду на сервере
• \`/ai <вопрос>\` — Облачный ИИ (Llama-3.3-70B через io.net)
• \`/local <вопрос>\` — Локальный ИИ (Ollama, 100% приватно)
• \`/createbot <описание>\` — Сгенерировать и запустить бота
• \`/bots\` — Список работающих дочерних ботов
• \`/stopbot <имя>\` — Остановить бота
• \`/tokens\` — Управление ключами в AES-256 хранилище
• \`/addtoken <имя> <токен>\` — Сохранить токен

💡 *Или просто напишите любой вопрос:* умный роутер сам решит, куда его направить!`,
    en: `🤖 *CloseCLAW — AI Bot Commander v2.0*

I am your autonomous Linux server commander. I execute shell commands, supervise child bots, and route tasks between local and cloud AI.

*Available commands:*
• \`/status\` — Monitor CPU, RAM, disk & child bots
• \`/run <cmd>\` — Execute shell command on host server
• \`/ai <prompt>\` — Cloud AI (Llama-3.3-70B via io.net)
• \`/local <prompt>\` — Local AI (Ollama, 100% confidential)
• \`/createbot <desc>\` — Generate & deploy child bot
• \`/bots\` — List running child bots
• \`/stopbot <name>\` — Stop running bot
• \`/tokens\` — View AES-256 encrypted vault tokens
• \`/addtoken <name> <token>\` — Store bot token

💡 *Or just ask anything in natural language:* the smart router will decide automatically!`,
  },
  '/status': {
    ru: `📊 *Состояние системы CloseCLAW:*

🖥 *CPU:* \`12.4%\` (AMD EPYC 8-Core)
💾 *RAM:* \`34.8%\` (1,426 MB / 4,096 MB)
💿 *Диск:* \`41.2%\` (32.8 GB / 80.0 GB)
🤖 *Активных ботов (PM2):* \`3 online\`
🔒 *Локальный ИИ:* \`Ollama (llama3.2:3b) — ONLINE\`
☁️ *Облачный ИИ:* \`io.net (Llama-3.3-70B-Instruct) — READY\`
🔐 *Хранилище токенов:* \`AES-256 Vault — UNLOCKED\`
⏱ *Uptime сервера:* \`18 дней 4 часа 22 мин\``,
    en: `📊 *CloseCLAW System Status:*

🖥 *CPU:* \`12.4%\` (AMD EPYC 8-Core)
💾 *RAM:* \`34.8%\` (1,426 MB / 4,096 MB)
💿 *Disk:* \`41.2%\` (32.8 GB / 80.0 GB)
🤖 *Running Child Bots (PM2):* \`3 online\`
🔒 *Local AI:* \`Ollama (llama3.2:3b) — ONLINE\`
☁️ *Cloud AI:* \`io.net (Llama-3.3-70B-Instruct) — READY\`
🔐 *Token Vault:* \`AES-256 Vault — UNLOCKED\`
⏱ *Server Uptime:* \`18 days 4 hours 22 mins\``,
  },
  '/run free -h': {
    ru: `⚙️ *Выполнение shell команды:* \`free -h\`

\`\`\`
               total        used        free      shared  buff/cache   available
Mem:           3.8Gi       1.3Gi       1.1Gi        42Mi       1.4Gi       2.4Gi
Swap:          2.0Gi        84Mi       1.9Gi
\`\`\`
*Exit code:* \`0\` ✅ *(Выполнено за 14ms)*`,
    en: `⚙️ *Executing shell command:* \`free -h\`

\`\`\`
               total        used        free      shared  buff/cache   available
Mem:           3.8Gi       1.3Gi       1.1Gi        42Mi       1.4Gi       2.4Gi
Swap:          2.0Gi        84Mi       1.9Gi
\`\`\`
*Exit code:* \`0\` ✅ *(Execution time: 14ms)*`,
  },
  '/ai Напиши bash-скрипт бэкапа': {
    ru: `☁️ *io.net Cloud AI (Llama-3.3-70B):*

Вот готовый production-скрипт резервного копирования с ротацией за 7 дней:

\`\`\`bash
#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="/var/backups/closeclaw"
SOURCE_DIR="/var/www/data"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ARCHIVE="$BACKUP_DIR/backup_$TIMESTAMP.tar.gz"

mkdir -p "$BACKUP_DIR"
tar -czf "$ARCHIVE" "$SOURCE_DIR"
find "$BACKUP_DIR" -type f -name "*.tar.gz" -mtime +7 -delete

echo "✅ Backup created: $ARCHIVE"
\`\`\`
Сохраните в \`/usr/local/bin/backup.sh\` и добавьте в cron:
\`0 3 * * * /usr/local/bin/backup.sh\``,
    en: `☁️ *io.net Cloud AI (Llama-3.3-70B):*

Here is a production-ready backup script with 7-day retention rotation:

\`\`\`bash
#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="/var/backups/closeclaw"
SOURCE_DIR="/var/www/data"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ARCHIVE="$BACKUP_DIR/backup_$TIMESTAMP.tar.gz"

mkdir -p "$BACKUP_DIR"
tar -czf "$ARCHIVE" "$SOURCE_DIR"
find "$BACKUP_DIR" -type f -name "*.tar.gz" -mtime +7 -delete

echo "✅ Backup created: $ARCHIVE"
\`\`\`
Save to \`/usr/local/bin/backup.sh\` and schedule in crontab:
\`0 3 * * * /usr/local/bin/backup.sh\``,
  },
  '/local Проверь открытые порты': {
    ru: `🔒 *Локальный Ollama AI (llama3.2 — Приватно):*

Выполнен локальный аудит сетевых интерфейсов через \`ss -tulpn\`:

• \`0.0.0.0:22\` (SSH) — Рекомендуется сменить порт на нестандартный и отключить PasswordAuthentication.
• \`127.0.0.1:11434\` (Ollama) — Привязан строго к localhost, извне недоступен ✅
• \`0.0.0.0:80 / 443\` (Nginx) — Активны, SSL-сертификаты валидны ✅
• \`127.0.0.1:3000\` (Dashboard) — Привязан локально ✅

_Все данные проанализированы локально на сервере, в интернет ничего не передавалось._`,
    en: `🔒 *Local Ollama AI (llama3.2 — 100% Confidential):*

Local network interfaces audited via \`ss -tulpn\`:

• \`0.0.0.0:22\` (SSH) — Recommend custom port & PasswordAuthentication no.
• \`127.0.0.1:11434\` (Ollama) — Bound strictly to localhost, safe ✅
• \`0.0.0.0:80 / 443\` (Nginx) — Active, SSL certificates valid ✅
• \`127.0.0.1:3000\` (Dashboard) — Bound locally ✅

_All data analyzed locally on host machine. Zero cloud transit._`,
  },
  '/createbot CryptoAlertBot': {
    ru: `🏗 *AI Bot Factory:*
Генерирую дочернего бота *CryptoAlertBot*...

1. 📝 *Сгенерирован код:* \`bots/crypto_alert_bot.py\` (поддержка BTC, ETH, SOL через CoinGecko API)
2. 📦 *Зависимости:* \`aiohttp\`, \`python-telegram-bot\` проверены
3. 🔐 *Токен:* привязан из зашифрованного хранилища
4. 🚀 *Деплой:* запущен под управлением PM2 (Process ID: \`5194\`)

✅ *Бот онлайн!* Для управления используйте \`/bots\` или \`/stopbot CryptoAlertBot\`.`,
    en: `🏗 *AI Bot Factory:*
Generating child bot *CryptoAlertBot*...

1. 📝 *Code generated:* \`bots/crypto_alert_bot.py\` (BTC, ETH, SOL tracking via CoinGecko)
2. 📦 *Dependencies:* \`aiohttp\`, \`python-telegram-bot\` satisfied
3. 🔐 *Token:* linked from encrypted vault
4. 🚀 *Deploy:* launched under PM2 supervisor (Process ID: \`5194\`)

✅ *Child bot is online!* Manage with \`/bots\` or \`/stopbot CryptoAlertBot\`.`,
  },
  '/tokens': {
    ru: `🔐 *Хранилище токенов CloseCLAW (AES-256 Vault):*

• \`WeatherBot\` ➔ \`7194...8a1f\` (зашифрован)
• \`CryptoAlertBot\` ➔ \`7482...c09d\` (зашифрован)
• \`NotifierBot\` ➔ \`8102...e3bb\` (зашифрован)

💡 Чтобы добавить новый токен: \`/addtoken <имя> <токен>\`
Все токены зашифрованы с использованием Fernet и мастер-пароля.`,
    en: `🔐 *CloseCLAW Token Vault (AES-256 Encrypted):*

• \`WeatherBot\` ➔ \`7194...8a1f\` (encrypted)
• \`CryptoAlertBot\` ➔ \`7482...c09d\` (encrypted)
• \`NotifierBot\` ➔ \`8102...e3bb\` (encrypted)

💡 To add a new token: \`/addtoken <name> <token>\`
All tokens are encrypted using Fernet with PBKDF2 salted derivation.`,
  },
}

export default function Simulator({ lang, t }) {
  const [activeMode, setActiveMode] = useState('tg') // 'tg' | 'term'
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: SIMULATED_RESPONSES['/start'][lang],
      time: '12:00',
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'cmd', text: 'python bot.py' },
    { type: 'log', text: '2026-10-18 23:40:12 | INFO | CloseCLAW | Initializing Master Bot...' },
    { type: 'log', text: '2026-10-18 23:40:13 | INFO | CloseCLAW | Token Store unlocked with AES-256 salt' },
    { type: 'log', text: '2026-10-18 23:40:13 | INFO | CloseCLAW | Connecting to Telegram Bot API...' },
    { type: 'success', text: '2026-10-18 23:40:14 | INFO | CloseCLAW | ✅ CloseCLAW is online!' },
    { type: 'success', text: '2026-10-18 23:40:14 | INFO | CloseCLAW | 🚀 Starting CloseCLAW polling...' },
  ])
  const messagesEndRef = useRef(null)

  // Update initial message when language changes if only 1 message exists
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].sender === 'bot') {
        return [
          {
            sender: 'bot',
            text: SIMULATED_RESPONSES['/start'][lang],
            time: '12:00',
          },
        ]
      }
      return prev
    })
  }, [lang])

  useEffect(() => {
    if (activeMode === 'tg') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping, activeMode])

  const sendCommand = (cmdText) => {
    if (isTyping) return
    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: cmdText, time: timeStr }])
    setIsTyping(true)

    setTimeout(() => {
      let botAnswer = ''
      // Exact match or prefix match
      if (SIMULATED_RESPONSES[cmdText]) {
        botAnswer = SIMULATED_RESPONSES[cmdText][lang]
      } else if (cmdText.startsWith('/run')) {
        botAnswer =
          lang === 'ru'
            ? `⚙️ *Выполнение:* \`${cmdText.replace('/run ', '')}\`\n\`\`\`\nDone successfully.\n\`\`\`\nExit code: \`0\``
            : `⚙️ *Executing:* \`${cmdText.replace('/run ', '')}\`\n\`\`\`\nDone successfully.\n\`\`\`\nExit code: \`0\``
      } else {
        botAnswer =
          lang === 'ru'
            ? `🧠 *Умный роутер CloseCLAW:*\nЗапрос направлен в ИИ для анализа.\n\nОтвет: Ваша команда \`${cmdText}\` обработана успешно. Все системы работают в штатном режиме.`
            : `🧠 *CloseCLAW Smart Router:*\nRouted request to AI layer.\n\nResponse: Your command \`${cmdText}\` was processed successfully. All host systems are operational.`
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botAnswer,
          time: timeStr,
        },
      ])
      setIsTyping(false)
    }, 700)
  }

  const handleInputSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    const cmd = inputValue.trim()
    setInputValue('')
    sendCommand(cmd)
  }

  const runTermCommand = (cmd) => {
    if (cmd === 'clear') {
      setTerminalHistory([])
      return
    }
    const newItems = [{ type: 'cmd', text: cmd }]
    if (cmd === 'python bot.py') {
      newItems.push({ type: 'log', text: 'Initializing CloseCLAW Master...' })
      newItems.push({ type: 'success', text: '✅ CloseCLAW is online! Polling active.' })
    } else if (cmd === 'pm2 list') {
      newItems.push({
        type: 'log',
        text: '┌─────┬──────────────────┬─────────────┬─────────┬───────────┐\n│ id  │ name             │ mode        │ status  │ cpu/mem   │\n├─────┼──────────────────┼─────────────┼─────────┼───────────┤\n│ 0   │ closeclaw-master │ fork        │ online  │ 0.1% 32MB │\n│ 1   │ WeatherBot       │ fork        │ online  │ 0.0% 24MB │\n│ 2   │ CryptoAlert      │ fork        │ online  │ 0.0% 28MB │\n└─────┴──────────────────┴─────────────┴─────────┴───────────┘',
      })
    } else if (cmd === 'ollama list') {
      newItems.push({
        type: 'log',
        text: 'NAME             ID           SIZE      MODIFIED\nllama3.2:latest  a80c4f17acd5 2.0 GB    2 hours ago\nqwen2.5-coder    b49c719e8124 1.9 GB    3 days ago',
      })
    } else if (cmd === 'df -h') {
      newItems.push({
        type: 'log',
        text: 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        80G   33G   44G  42% /\ntmpfs           1.9G     0  1.9G   0% /dev/shm',
      })
    }
    setTerminalHistory((prev) => [...prev, ...newItems])
  }

  return (
    <section className="simulator section" id="simulator">
      <div className="container">
        <div className="section__header">
          <span className="section__label">{t.simulator.label}</span>
          <h2 className="section__title">{t.simulator.title}</h2>
          <p className="section__subtitle">{t.simulator.subtitle}</p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="sim-mode-toggle">
          <button
            type="button"
            className={`sim-mode-btn ${activeMode === 'tg' ? 'sim-mode-btn--active' : ''}`}
            onClick={() => setActiveMode('tg')}
          >
            {t.simulator.modeTg}
          </button>
          <button
            type="button"
            className={`sim-mode-btn ${activeMode === 'term' ? 'sim-mode-btn--active' : ''}`}
            onClick={() => setActiveMode('term')}
          >
            {t.simulator.modeTerm}
          </button>
        </div>

        {/* Mode 1: Telegram UI Simulator */}
        {activeMode === 'tg' && (
          <div className="tg-simulator">
            {/* Telegram Header */}
            <div className="tg-header">
              <div className="tg-avatar">🤖</div>
              <div className="tg-info">
                <div className="tg-name">
                  {t.simulator.botName}
                  <span className="tg-verified" title="Verified Bot">✓</span>
                </div>
                <div className="tg-status">
                  <span className="tg-status-dot" />
                  {t.simulator.botStatus}
                </div>
              </div>
              <div className="tg-menu-dots">⋮</div>
            </div>

            {/* Chat Body */}
            <div className="tg-body">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`tg-bubble ${m.sender === 'user' ? 'tg-bubble--user' : 'tg-bubble--bot'}`}
                >
                  <div className="tg-bubble-content">
                    <pre className="tg-markdown">{m.text}</pre>
                  </div>
                  <span className="tg-time">{m.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="tg-bubble tg-bubble--bot tg-typing-bubble">
                  <span className="tg-typing-text">CloseCLAW печатает</span>
                  <span className="tg-typing-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Command Chips */}
            <div className="tg-chips-area">
              <span className="tg-chips-hint">{t.simulator.typeHint}</span>
              <div className="tg-chips-list">
                {t.simulator.chips.map((chip) => (
                  <button
                    key={chip.cmd}
                    type="button"
                    className="tg-chip-btn"
                    onClick={() => sendCommand(chip.cmd)}
                    disabled={isTyping}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input Bar */}
            <form className="tg-input-bar" onSubmit={handleInputSubmit}>
              <input
                type="text"
                className="tg-input"
                placeholder={lang === 'ru' ? 'Напишите команду или вопрос...' : 'Type a command or query...'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="tg-send-btn"
                disabled={!inputValue.trim() || isTyping}
                title="Send"
              >
                ➤
              </button>
            </form>
          </div>
        )}

        {/* Mode 2: Server Terminal Simulator */}
        {activeMode === 'term' && (
          <div className="term-simulator">
            <div className="term-header">
              <div className="term-dots">
                <span className="term-dot term-dot--red" />
                <span className="term-dot term-dot--yellow" />
                <span className="term-dot term-dot--green" />
              </div>
              <span className="term-title">root@claw-vps:~#</span>
              <button
                type="button"
                className="term-clear-btn"
                onClick={() => runTermCommand('clear')}
              >
                Clear
              </button>
            </div>

            <div className="term-body">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className={`term-line term-line--${item.type}`}>
                  {item.type === 'cmd' ? (
                    <>
                      <span className="term-prompt">root@claw-vps:~#</span>
                      <span className="term-cmd-text">{item.text}</span>
                    </>
                  ) : (
                    <pre className="term-output-text">{item.text}</pre>
                  )}
                </div>
              ))}
              <div className="term-line">
                <span className="term-prompt">root@claw-vps:~#</span>
                <span className="term-cursor" />
              </div>
            </div>

            {/* Quick terminal actions */}
            <div className="term-quick-bar">
              <span className="term-quick-label">Команды сервера:</span>
              <button
                type="button"
                className="term-quick-btn"
                onClick={() => runTermCommand('python bot.py')}
              >
                python bot.py
              </button>
              <button
                type="button"
                className="term-quick-btn"
                onClick={() => runTermCommand('pm2 list')}
              >
                pm2 list
              </button>
              <button
                type="button"
                className="term-quick-btn"
                onClick={() => runTermCommand('ollama list')}
              >
                ollama list
              </button>
              <button
                type="button"
                className="term-quick-btn"
                onClick={() => runTermCommand('df -h')}
              >
                df -h
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

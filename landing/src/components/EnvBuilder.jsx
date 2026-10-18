import { useState } from 'react'

export default function EnvBuilder({ t }) {
  const [tgToken, setTgToken] = useState('7123456789:AAHxxxxxxxxxxxxxxxxxxxxxx')
  const [allowedIds, setAllowedIds] = useState('123456789')
  const [ioKey, setIoKey] = useState('sk-io-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  const [tokenPass, setTokenPass] = useState('my_super_secure_vault_pass_2026')
  const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434')
  const [ollamaModel, setOllamaModel] = useState('llama3.2')
  const [ioNetUrl, setIoNetUrl] = useState('https://api.intelligence.io.solutions/api/v1')
  const [ioNetModel, setIoNetModel] = useState('meta-llama/Llama-3.3-70B-Instruct')
  const [dashPort, setDashPort] = useState('3000')
  const [copied, setCopied] = useState(false)

  const generatedEnv = `# ══════════════════════════════════════════════════════════════════
# CloseCLAW — Master Bot Configuration (.env)
# Generated via CloseCLAW Web Configurator
# ══════════════════════════════════════════════════════════════════

# ── TELEGRAM CREDENTIALS ──────────────────────────────────────────
# Obtained from @BotFather in Telegram
TELEGRAM_BOT_TOKEN=${tgToken || 'your_telegram_bot_token_here'}

# Telegram User IDs allowed to access bot commands (comma-separated)
# Obtained from @userinfobot in Telegram
ALLOWED_USER_IDS=${allowedIds || '123456789'}

# ── CLOUD AI (io.net) ─────────────────────────────────────────────
# API Key from https://cloud.io.net -> API Keys
IO_NET_API_KEY=${ioKey || 'your_ionet_api_key_here'}
IONET_BASE_URL=${ioNetUrl || 'https://api.intelligence.io.solutions/api/v1'}
IONET_MODEL=${ioNetModel || 'meta-llama/Llama-3.3-70B-Instruct'}

# ── LOCAL AI (Ollama) ─────────────────────────────────────────────
# Local Ollama instance (https://ollama.com)
OLLAMA_BASE_URL=${ollamaUrl || 'http://localhost:11434'}
OLLAMA_MODEL=${ollamaModel || 'llama3.2'}

# ── SECURITY & ENCRYPTION ─────────────────────────────────────────
# Salted AES-256 password to encrypt child bot tokens in tokens.enc
TOKEN_STORE_PASSWORD=${tokenPass || 'change_this_to_strong_password'}

# ── DASHBOARD ─────────────────────────────────────────────────────
DASHBOARD_PORT=${dashPort || '3000'}
`

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEnv)
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const handleDownload = () => {
    const blob = new Blob([generatedEnv], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '.env'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setTgToken('')
    setAllowedIds('')
    setIoKey('')
    setTokenPass('')
    setOllamaUrl('http://localhost:11434')
    setOllamaModel('llama3.2')
    setIoNetUrl('https://api.intelligence.io.solutions/api/v1')
    setIoNetModel('meta-llama/Llama-3.3-70B-Instruct')
    setDashPort('3000')
  }

  return (
    <section className="env-builder section" id="env-builder">
      <div className="container">
        <div className="section__header">
          <span className="section__label">{t.envBuilder.label}</span>
          <h2 className="section__title">{t.envBuilder.title}</h2>
          <p className="section__subtitle">{t.envBuilder.subtitle}</p>
        </div>

        <div className="env-builder__grid">
          {/* Form Side */}
          <div className="env-builder__form-card">
            <h3 className="env-builder__form-title">Параметры конфигурации</h3>

            <div className="env-field">
              <label className="env-label">
                {t.envBuilder.tgToken} <span className="text-red">*</span>
              </label>
              <input
                type="text"
                className="env-input"
                placeholder="7123456789:AAH..."
                value={tgToken}
                onChange={(e) => setTgToken(e.target.value)}
              />
            </div>

            <div className="env-field">
              <label className="env-label">
                {t.envBuilder.allowedIds} <span className="text-red">*</span>
              </label>
              <input
                type="text"
                className="env-input"
                placeholder="123456789,987654321"
                value={allowedIds}
                onChange={(e) => setAllowedIds(e.target.value)}
              />
              <span className="env-hint">Разделите запятой для нескольких админов</span>
            </div>

            <div className="env-field">
              <label className="env-label">
                {t.envBuilder.ioNetKey} <span className="text-red">*</span>
              </label>
              <input
                type="text"
                className="env-input"
                placeholder="sk-io-..."
                value={ioKey}
                onChange={(e) => setIoKey(e.target.value)}
              />
            </div>

            <div className="env-field">
              <label className="env-label">
                {t.envBuilder.storePass} <span className="text-red">*</span>
              </label>
              <input
                type="text"
                className="env-input"
                placeholder="SecretVaultPassword"
                value={tokenPass}
                onChange={(e) => setTokenPass(e.target.value)}
              />
              <span className="env-hint">Используется для AES-256 шифрования tokens.enc</span>
            </div>

            <div className="env-field-row">
              <div className="env-field">
                <label className="env-label">{t.envBuilder.ollamaModel}</label>
                <input
                  type="text"
                  className="env-input"
                  value={ollamaModel}
                  onChange={(e) => setOllamaModel(e.target.value)}
                />
              </div>
              <div className="env-field">
                <label className="env-label">{t.envBuilder.dashPort}</label>
                <input
                  type="text"
                  className="env-input"
                  value={dashPort}
                  onChange={(e) => setDashPort(e.target.value)}
                />
              </div>
            </div>

            <div className="env-builder__form-actions">
              <button
                type="button"
                className="btn btn--glass btn--sm"
                onClick={handleReset}
              >
                {t.envBuilder.resetBtn}
              </button>
            </div>
          </div>

          {/* Preview Side */}
          <div className="env-builder__preview-card">
            <div className="env-preview-header">
              <div className="env-preview-file">
                <span className="file-icon">📄</span>
                <span className="file-name">.env</span>
              </div>
              <div className="env-preview-actions">
                <button
                  type="button"
                  className="btn btn--primary btn--sm"
                  onClick={handleCopy}
                >
                  {copied ? t.envBuilder.copiedAlert : t.envBuilder.copyBtn}
                </button>
                <button
                  type="button"
                  className="btn btn--glass btn--sm"
                  onClick={handleDownload}
                >
                  {t.envBuilder.downloadBtn}
                </button>
              </div>
            </div>

            <pre className="env-preview-code">
              <code>{generatedEnv}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

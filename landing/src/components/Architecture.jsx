export default function Architecture({ t, bgRef }) {
  return (
    <section className="architecture section" id="architecture">
      {/* Background image */}
      <div className="architecture__bg" ref={bgRef}>
        <img src="./images/arch-bg.png" alt="" className="architecture__bg-img" />
        <div className="architecture__bg-overlay" />
      </div>

      <div className="container">
        <div className="section__header">
          <span className="section__label">{t.architecture.label}</span>
          <h2 className="section__title">{t.architecture.title}</h2>
          <p className="section__subtitle">{t.architecture.subtitle}</p>
        </div>

        {/* Visual Architecture Diagram */}
        <div className="arch-diagram">
          <div className="arch-layers">
            {/* Layer 1: Telegram User */}
            <div className="arch-layer">
              <div className="arch-node arch-node--user">
                <span className="arch-node__icon">👤</span>
                <div className="arch-node__title">Telegram Admin</div>
                <div className="arch-node__subtitle">Allowed User IDs (Whitelist)</div>
              </div>
            </div>

            <div className="arch-arrow">
              <span className="arch-arrow__icon">▼</span>
              <span className="arch-arrow__text">TLS Encrypted Bot API</span>
            </div>

            {/* Layer 2: Master Bot */}
            <div className="arch-layer">
              <div className="arch-node arch-node--master">
                <span className="arch-node__icon">🤖</span>
                <div className="arch-node__title">CloseCLAW Master (bot.py)</div>
                <div className="arch-node__subtitle">TaskRouter + ShellExecutor + BotFactory</div>
              </div>
            </div>

            <div className="arch-arrow">
              <span className="arch-arrow__icon">▼</span>
              <span className="arch-arrow__text">Smart Semantic Routing</span>
            </div>

            {/* Layer 3: Modules */}
            <div className="arch-layer arch-layer--modules">
              <div className="arch-node arch-node--cloud">
                <span className="arch-node__icon">☁️</span>
                <div className="arch-node__title">io.net Cloud AI</div>
                <div className="arch-node__subtitle">Llama 3.3 70B (Complex Tasks)</div>
              </div>
              <div className="arch-node arch-node--local">
                <span className="arch-node__icon">🔒</span>
                <div className="arch-node__title">Ollama Local AI</div>
                <div className="arch-node__subtitle">llama3.2 (Private OS Tasks)</div>
              </div>
              <div className="arch-node arch-node--shell">
                <span className="arch-node__icon">🖥️</span>
                <div className="arch-node__title">Shell Executor</div>
                <div className="arch-node__subtitle">Subprocess Async Runner</div>
              </div>
              <div className="arch-node arch-node--factory">
                <span className="arch-node__icon">🏭</span>
                <div className="arch-node__title">Bot Factory</div>
                <div className="arch-node__subtitle">Child Bot Generator</div>
              </div>
            </div>

            <div className="arch-arrow">
              <span className="arch-arrow__icon">▼</span>
              <span className="arch-arrow__text">Execution & Supervision</span>
            </div>

            {/* Layer 4: Outputs */}
            <div className="arch-layer">
              <div className="arch-node arch-node--output">
                <span className="arch-node__icon">🐧</span>
                <div className="arch-node__title">Linux Host Server</div>
                <div className="arch-node__subtitle">Filesystem, Ports, Logs, PM2</div>
              </div>
              <div className="arch-node arch-node--output">
                <span className="arch-node__icon">🔐</span>
                <div className="arch-node__title">AES-256 Vault</div>
                <div className="arch-node__subtitle">tokens.enc + PBKDF2 Salt</div>
              </div>
              <div className="arch-node arch-node--output">
                <span className="arch-node__icon">🤖</span>
                <div className="arch-node__title">Deployed Child Bots</div>
                <div className="arch-node__subtitle">Independent PM2 Processes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Pillars Cards */}
        <div className="arch-pillars-grid">
          {t.architecture.pillars.map((p, idx) => (
            <div key={idx} className="pillar-card">
              <div className="pillar-icon">{p.icon}</div>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

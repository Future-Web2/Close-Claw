import { useState } from 'react'

export default function GuideSection({ lang, t }) {
  const [activeTab, setActiveTab] = useState('steps')
  const [cmdSearch, setCmdSearch] = useState('')
  const [cmdCategory, setCmdCategory] = useState('all')
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null)
  const [faqOpenIdx, setFaqOpenIdx] = useState(null)

  const copySnippet = (text, idx) => {
    navigator.clipboard.writeText(text)
    setCopiedCodeIdx(idx)
    setTimeout(() => setCopiedCodeIdx(null), 2000)
  }

  const toggleFaq = (idx) => {
    setFaqOpenIdx(faqOpenIdx === idx ? null : idx)
  }

  // Filter commands
  const filteredCommands = t.commands.items.filter((item) => {
    const matchesCat = cmdCategory === 'all' || item.cat === cmdCategory
    const q = cmdSearch.toLowerCase().trim()
    const matchesSearch =
      !q ||
      item.cmd.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.syntax.toLowerCase().includes(q)
    return matchesCat && matchesSearch
  })

  return (
    <section className="guide section" id="guide">
      <div className="container">
        <div className="section__header">
          <span className="section__label">{t.guide.label}</span>
          <h2 className="section__title">{t.guide.title}</h2>
          <p className="section__subtitle">{t.guide.subtitle}</p>
        </div>

        {/* Guide Navigation Tabs */}
        <div className="guide-tabs">
          <button
            type="button"
            className={`guide-tab-btn ${activeTab === 'steps' ? 'guide-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('steps')}
          >
            {t.guide.tabs.steps}
          </button>
          <button
            type="button"
            className={`guide-tab-btn ${activeTab === 'keys' ? 'guide-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('keys')}
          >
            {t.guide.tabs.keys}
          </button>
          <button
            type="button"
            className={`guide-tab-btn ${activeTab === 'commands' ? 'guide-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('commands')}
          >
            {t.guide.tabs.commands}
          </button>
          <button
            type="button"
            className={`guide-tab-btn ${activeTab === 'deployment' ? 'guide-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('deployment')}
          >
            {t.guide.tabs.deployment}
          </button>
          <button
            type="button"
            className={`guide-tab-btn ${activeTab === 'troubleshooting' ? 'guide-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('troubleshooting')}
          >
            {t.guide.tabs.troubleshooting}
          </button>
        </div>

        {/* Tab 1: Step-by-Step Setup */}
        {activeTab === 'steps' && (
          <div className="guide-steps-grid">
            {t.guide.stepsList.map((st, i) => (
              <div key={st.step} className="guide-step-card">
                <div className="guide-step-header">
                  <span className="guide-step-num">{st.step}</span>
                  <h3 className="guide-step-title">{st.title}</h3>
                </div>
                <p className="guide-step-desc">{st.desc}</p>

                <div className="code-box">
                  <div className="code-box-header">
                    <span className="code-lang">BASH</span>
                    <button
                      type="button"
                      className="code-copy-btn"
                      onClick={() => copySnippet(st.code, `step-${i}`)}
                    >
                      {copiedCodeIdx === `step-${i}` ? '✅ Copied' : '📋 Copy'}
                    </button>
                  </div>
                  <pre className="code-pre">
                    <code>{st.code}</code>
                  </pre>
                </div>

                <div className="guide-step-note">
                  <span className="note-icon">💡</span>
                  <span>{st.note}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: API Keys Guide */}
        {activeTab === 'keys' && (
          <div className="guide-keys-grid">
            {t.guide.apiKeys.map((k) => (
              <div key={k.name} className="guide-key-card">
                <div className="guide-key-top">
                  <span className="guide-key-name">{k.name}</span>
                  <span className="guide-key-status">{k.status}</span>
                </div>
                <div className="guide-key-source">
                  Источник: <strong>{k.source}</strong>{' '}
                  {k.sourceUrl && (
                    <a
                      href={k.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="guide-key-link"
                    >
                      (Перейти ↗)
                    </a>
                  )}
                </div>
                <div className="guide-key-instruction">
                  <pre>{k.instruction}</pre>
                </div>
                <div className="guide-key-example">
                  <span className="example-label">Пример значения:</span>
                  <code className="example-code">{k.example}</code>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Bot Commands Reference */}
        {activeTab === 'commands' && (
          <div className="guide-commands-wrapper" id="commands">
            {/* Filter and Search Bar */}
            <div className="commands-filter-bar">
              <input
                type="text"
                className="commands-search-input"
                placeholder={t.commands.searchPlaceholder}
                value={cmdSearch}
                onChange={(e) => setCmdSearch(e.target.value)}
              />
              <div className="commands-cat-buttons">
                <button
                  type="button"
                  className={`cat-btn ${cmdCategory === 'all' ? 'cat-btn--active' : ''}`}
                  onClick={() => setCmdCategory('all')}
                >
                  {t.commands.filterAll}
                </button>
                <button
                  type="button"
                  className={`cat-btn ${cmdCategory === 'system' ? 'cat-btn--active' : ''}`}
                  onClick={() => setCmdCategory('system')}
                >
                  {t.commands.filterSystem}
                </button>
                <button
                  type="button"
                  className={`cat-btn ${cmdCategory === 'ai' ? 'cat-btn--active' : ''}`}
                  onClick={() => setCmdCategory('ai')}
                >
                  {t.commands.filterAi}
                </button>
                <button
                  type="button"
                  className={`cat-btn ${cmdCategory === 'bots' ? 'cat-btn--active' : ''}`}
                  onClick={() => setCmdCategory('bots')}
                >
                  {t.commands.filterBots}
                </button>
                <button
                  type="button"
                  className={`cat-btn ${cmdCategory === 'security' ? 'cat-btn--active' : ''}`}
                  onClick={() => setCmdCategory('security')}
                >
                  {t.commands.filterSecurity}
                </button>
              </div>
            </div>

            {/* Commands List */}
            <div className="commands-list">
              {filteredCommands.length === 0 ? (
                <div className="commands-empty">
                  {lang === 'ru' ? 'Команды не найдены' : 'No commands matched your query.'}
                </div>
              ) : (
                filteredCommands.map((c, idx) => (
                  <div key={c.cmd} className="command-card">
                    <div className="command-card-header">
                      <div className="command-syntax-wrapper">
                        <span className="command-cmd-pill">{c.cmd}</span>
                        <code className="command-syntax">{c.syntax}</code>
                      </div>
                      <span className={`command-cat-badge command-cat-badge--${c.cat}`}>
                        {c.cat.toUpperCase()}
                      </span>
                    </div>

                    <p className="command-desc">{c.desc}</p>

                    <div className="command-example-box">
                      <div className="command-example-top">
                        <span className="example-tag">Пример:</span>
                        <button
                          type="button"
                          className="example-copy-btn"
                          onClick={() => copySnippet(c.example, `cmd-${idx}`)}
                        >
                          {copiedCodeIdx === `cmd-${idx}` ? '✅ Copied' : '📋 Copy'}
                        </button>
                      </div>
                      <code className="command-example-code">{c.example}</code>
                    </div>

                    <div className="command-response-preview">
                      <span className="preview-label">Ответ CloseCLAW:</span>
                      <pre className="preview-text">{c.response}</pre>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Production Deployment */}
        {activeTab === 'deployment' && (
          <div className="guide-deploy-grid">
            {t.guide.deployment.map((dep, i) => (
              <div key={dep.method} className="guide-deploy-card">
                <h3 className="deploy-method-title">{dep.method}</h3>
                <p className="deploy-method-desc">{dep.desc}</p>
                <div className="code-box">
                  <div className="code-box-header">
                    <span className="code-lang">CONFIG</span>
                    <button
                      type="button"
                      className="code-copy-btn"
                      onClick={() => copySnippet(dep.code, `dep-${i}`)}
                    >
                      {copiedCodeIdx === `dep-${i}` ? '✅ Copied' : '📋 Copy'}
                    </button>
                  </div>
                  <pre className="code-pre">
                    <code>{dep.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Troubleshooting / FAQ */}
        {activeTab === 'troubleshooting' && (
          <div className="guide-faq-list" id="faq">
            {t.guide.troubleshooting.map((item, idx) => (
              <div
                key={idx}
                className={`faq-item ${faqOpenIdx === idx ? 'faq-item--open' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question">
                  <span>{item.q}</span>
                  <span className="faq-toggle-icon">{faqOpenIdx === idx ? '−' : '+'}</span>
                </div>
                {faqOpenIdx === idx && (
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

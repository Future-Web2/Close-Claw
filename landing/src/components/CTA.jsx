export default function CTA({ t, bgRef }) {
  return (
    <section className="cta section" id="cta">
      <div className="container">
        <div className="cta__card">
          {/* CTA Background image */}
          <div className="cta__bg" ref={bgRef}>
            <img src="./images/cta-bg.png" alt="" className="cta__bg-img" />
            <div className="cta__bg-overlay" />
          </div>

          <h2 className="cta__title">{t.cta.title}</h2>
          <p className="cta__desc">{t.cta.desc}</p>

          <div className="cta__actions">
            <a
              href="https://github.com/Future-Web2/Close-Claw"
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-github-btn"
            >
              {t.cta.btnGithub}
            </a>
            <a
              href="./docs/guide.html"
              className="btn btn--glass"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-docs-btn"
            >
              {t.cta.btnDocs}
            </a>
            <a href="#env-builder" className="btn btn--glass">
              ⚙️ .env Builder
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

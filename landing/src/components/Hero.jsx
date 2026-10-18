import { useState } from 'react'

export default function Hero({ t, bgRef, contentRef }) {
  const [copied, setCopied] = useState(false)
  const cloneCmd = 'git clone https://github.com/Future-Web2/Close-Claw.git && cd Close-Claw'

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section className="hero" id="hero">
      {/* Background image with parallax */}
      <div className="hero__bg" ref={bgRef}>
        <img src="./images/hero-bg.png" alt="" className="hero__bg-img" />
        <div className="hero__bg-overlay" />
      </div>

      {/* Floating glass shards */}
      <div className="hero__shards" aria-hidden="true">
        <div className="hero__shard hero__shard--1" />
        <div className="hero__shard hero__shard--2" />
        <div className="hero__shard hero__shard--3" />
        <div className="hero__shard hero__shard--4" />
      </div>

      <div className="hero__inner" ref={contentRef}>
        {/* Logo showcase */}
        <div className="hero__logo-wrapper">
          <img src="./image.png" alt="CloseCLAW Logo" className="hero__logo" />
        </div>

        <div className="hero__badge">
          <span className="hero__badge-dot" />
          <span>{t.hero.badge}</span>
        </div>

        <h1 className="hero__title">
          {t.hero.titleLine1}<br />
          {t.hero.titleLine2}
          <span className="hero__title-gradient">{t.hero.titleGradient}</span>
        </h1>

        <p className="hero__subtitle">{t.hero.subtitle}</p>

        {/* Quick action buttons */}
        <div className="hero__actions">
          <a href="#guide" className="btn btn--primary" id="hero-quickstart-btn">
            {t.hero.ctaQuickStart}
          </a>
          <a href="#simulator" className="btn btn--glass" id="hero-simulator-btn">
            {t.hero.ctaSimulator}
          </a>
          <a
            href="./docs/guide.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--glass btn--slides"
            id="hero-slides-btn"
          >
            📺 12 Slides Guide
          </a>
        </div>

        {/* 1-click clone bar */}
        <div className="hero__quick-clone">
          <span className="hero__quick-clone-label">{t.hero.cloneHint}</span>
          <div className="hero__quick-clone-box">
            <span className="hero__quick-clone-prompt">$</span>
            <code className="hero__quick-clone-code">{cloneCmd}</code>
            <button
              type="button"
              className="hero__quick-clone-btn"
              onClick={handleCopy}
              title="Copy to clipboard"
            >
              {copied ? '✅ Copied!' : '📋 Copy'}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll-indicator">
          <div className="hero__scroll-mouse">
            <div className="hero__scroll-wheel" />
          </div>
          <span className="hero__scroll-text">{t.hero.scrollText}</span>
        </div>
      </div>
    </section>
  )
}

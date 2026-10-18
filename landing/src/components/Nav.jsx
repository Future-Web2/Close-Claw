import { useState, useEffect } from 'react'

export default function Nav({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    const nextLang = lang === 'ru' ? 'en' : 'ru'
    setLang(nextLang)
    try {
      localStorage.setItem('closeclaw_lang', nextLang)
    } catch {}
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} id="nav-bar">
      <a href="#" className="nav__logo" onClick={closeMobile}>
        <img src="./image.png" alt="CloseCLAW Logo" className="nav__logo-img" />
        <span className="nav__logo-text">
          Close<span className="text-gradient">CLAW</span>
        </span>
        <span className="nav__version-pill">v2.0</span>
      </a>

      <div className={`nav__links ${mobileOpen ? 'nav__links--open' : ''}`}>
        <a href="#features" className="nav__link" onClick={closeMobile}>
          {t.nav.features}
        </a>
        <a href="#simulator" className="nav__link" onClick={closeMobile}>
          {t.nav.simulator}
        </a>
        <a href="#guide" className="nav__link" onClick={closeMobile}>
          {t.nav.guide}
        </a>
        <a href="#commands" className="nav__link" onClick={closeMobile}>
          {t.nav.commands}
        </a>
        <a href="#env-builder" className="nav__link" onClick={closeMobile}>
          {t.nav.envBuilder}
        </a>
        <a href="#architecture" className="nav__link" onClick={closeMobile}>
          {t.nav.architecture}
        </a>
        <a href="#faq" className="nav__link" onClick={closeMobile}>
          {t.nav.faq}
        </a>
        <a
          href="./docs/guide.html"
          target="_blank"
          rel="noopener noreferrer"
          className="nav__link nav__link--slides"
          onClick={closeMobile}
          title="Open interactive 12-slide walkthrough"
        >
          {t.nav.presentation}
        </a>
      </div>

      <div className="nav__actions">
        <button
          type="button"
          className="nav__lang-toggle"
          onClick={toggleLanguage}
          title="Switch language (RU / EN)"
          aria-label="Switch language"
        >
          <span className="lang-flag">{lang === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN'}</span>
        </button>

        <a
          href="https://github.com/Future-Web2/Close-Claw"
          className="nav__cta"
          target="_blank"
          rel="noopener noreferrer"
          id="nav-github-btn"
        >
          {t.nav.github}
        </a>

        <button
          type="button"
          className="nav__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

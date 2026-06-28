import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ─── Data ─── */
const FEATURES = [
  {
    icon: '🖥',
    title: 'Shell Execution',
    desc: 'Run any Linux command via /run with live streaming output — full terminal power from Telegram.',
    color: '',
  },
  {
    icon: '🧠',
    title: 'Smart AI Routing',
    desc: 'Auto-detects whether a task needs local privacy or cloud power. The right AI every time.',
    color: 'purple',
  },
  {
    icon: '☁️',
    title: 'Cloud AI (io.net)',
    desc: 'Full integration with Llama 3.3 70B and more via io.net — complex reasoning on demand.',
    color: 'pink',
  },
  {
    icon: '🔒',
    title: 'Local AI (Ollama)',
    desc: 'Sensitive data never leaves your server. Private Ollama-powered inference stays local.',
    color: 'green',
  },
  {
    icon: '🤖',
    title: 'Bot Factory',
    desc: 'Generate and deploy new Telegram bots via AI in seconds — describe what you need, get a bot.',
    color: 'orange',
  },
  {
    icon: '🔐',
    title: 'AES-256 Token Vault',
    desc: 'Military-grade encrypted storage for all child bot tokens. Security is non-negotiable.',
    color: 'blue',
  },
]

const STEPS = [
  {
    number: '01',
    icon: '📦',
    title: 'Clone & Install',
    desc: 'Clone the repo, set up your virtual environment, and install dependencies in under a minute.',
    code: 'git clone …/Close-Claw.git',
  },
  {
    number: '02',
    icon: '⚙️',
    title: 'Configure',
    desc: 'Set your Telegram bot token, io.net API key, and choose your AI preferences in the .env file.',
    code: 'cp .env.example .env',
  },
  {
    number: '03',
    icon: '🚀',
    title: 'Launch',
    desc: 'Start the master bot and take full command of your server from Telegram with AI superpowers.',
    code: 'python bot.py',
  },
]

const TERMINAL_LINES = [
  { type: 'command', text: 'python bot.py' },
  { type: 'output', text: '⚡ CloseCLAW v1.0 starting...', variant: 'accent' },
  { type: 'output', text: '✓ Telegram Bot connected', variant: 'success' },
  { type: 'output', text: '✓ Ollama (llama3.2) ready', variant: 'success' },
  { type: 'output', text: '✓ io.net Cloud AI linked', variant: 'success' },
  { type: 'output', text: '✓ Token Store unlocked (AES-256)', variant: 'success' },
  { type: 'output', text: '✓ Dashboard running on :8080', variant: 'success' },
  { type: 'output', text: '🚀 Master Bot is LIVE. Awaiting commands...' },
]

const STATS = [
  { number: '2', label: 'AI Layers', icon: '🧠' },
  { number: 'AES-256', label: 'Encryption', icon: '🔐' },
  { number: '∞', label: 'Child Bots', icon: '🤖' },
  { number: 'MIT', label: 'License', icon: '📄' },
]

const ARCH_DATA = {
  user: { icon: '👤', title: 'Telegram User', subtitle: 'Your messages' },
  master: { icon: '🧠', title: 'CloseCLAW Master', subtitle: 'Smart Router' },
  modules: [
    { icon: '☁️', title: 'Cloud AI', subtitle: 'io.net' },
    { icon: '🔒', title: 'Local AI', subtitle: 'Ollama' },
    { icon: '🖥', title: 'Shell', subtitle: 'Executor' },
    { icon: '🤖', title: 'Bot Factory', subtitle: 'Generator' },
  ],
  outputs: [
    { icon: '🖥', title: 'Linux Server', subtitle: 'Your machine' },
    { icon: '🤖', title: 'Child Bots', subtitle: 'Deployed TG bots' },
  ],
}

/* ─── Intersection Observer Hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, visible]
}

/* ─── Parallax Hook ─── */
function useParallax(speed = 0.3) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect()
          const windowH = window.innerHeight
          // Only apply parallax when element is somewhat visible
          if (rect.top < windowH && rect.bottom > 0) {
            const scrolled = (windowH - rect.top) / (windowH + rect.height)
            const offset = (scrolled - 0.5) * speed * 200
            el.style.transform = `translate3d(0, ${offset}px, 0)`
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return ref
}

/* ─── Mouse Follow Glow ─── */
function useMouseGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const isTouchDevice = 'ontouchstart' in window
    if (isTouchDevice) {
      el.style.display = 'none'
      return
    }

    let rafId = null
    const handleMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`
        el.style.opacity = '1'
      })
    }

    const handleLeave = () => {
      el.style.opacity = '0'
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return ref
}

/* ─── Components ─── */

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} id="nav-bar">
      <a href="#" className="nav__logo">
        <img src="/image.png" alt="CloseCLAW" className="nav__logo-img" />
        <span className="nav__logo-text">CloseCLAW</span>
      </a>
      <div className="nav__links">
        <a href="#features" className="nav__link">Features</a>
        <a href="#how-it-works" className="nav__link">Setup</a>
        <a href="#architecture" className="nav__link">Architecture</a>
        <a href="#demo" className="nav__link">Demo</a>
      </div>
      <a
        href="https://github.com/Future-Web2/Close-Claw"
        className="nav__cta"
        target="_blank"
        rel="noopener noreferrer"
        id="nav-github-btn"
      >
        GitHub →
      </a>
    </nav>
  )
}

function Hero() {
  const bgRef = useParallax(0.4)
  const contentRef = useParallax(-0.15)

  return (
    <section className="hero" id="hero">
      {/* Background image with parallax */}
      <div className="hero__bg" ref={bgRef}>
        <img src="/images/hero-bg.png" alt="" className="hero__bg-img" />
        <div className="hero__bg-overlay" />
      </div>

      {/* Floating glass shards with parallax */}
      <div className="hero__shards" aria-hidden="true">
        <div className="hero__shard hero__shard--1" />
        <div className="hero__shard hero__shard--2" />
        <div className="hero__shard hero__shard--3" />
        <div className="hero__shard hero__shard--4" />
      </div>

      <div className="hero__inner" ref={contentRef}>
        {/* Logo showcase */}
        <div className="hero__logo-wrapper">
          <img src="/image.png" alt="CloseCLAW" className="hero__logo" />
        </div>

        <div className="hero__badge">
          <span className="hero__badge-dot" />
          <span>Open Source · MIT License</span>
        </div>
        <h1 className="hero__title">
          Your Server<br />
          Deserves a{' '}
          <span className="hero__title-gradient">Brain</span>
        </h1>
        <p className="hero__subtitle">
          CloseCLAW is an AI-powered Telegram bot that gives you full control
          over your Linux server — with smart routing between local and cloud AI,
          a bot factory, and military-grade security.
        </p>
        <div className="hero__actions">
          <a
            href="https://github.com/Future-Web2/Close-Claw"
            className="btn btn--primary"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-github-btn"
          >
            ⚡ Get Started
          </a>
          <a href="#features" className="btn btn--glass" id="hero-features-btn">
            Explore Features
          </a>
        </div>
        {/* Scroll indicator */}
        <div className="hero__scroll-indicator">
          <div className="hero__scroll-mouse">
            <div className="hero__scroll-wheel" />
          </div>
          <span className="hero__scroll-text">Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, desc, color, index }) {
  const [ref, visible] = useReveal(0.1)
  return (
    <div
      ref={ref}
      className="feature-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      }}
      id={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className={`feature-card__icon ${color ? `feature-card__icon--${color}` : ''}`}>
        {icon}
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__desc">{desc}</p>
    </div>
  )
}

function Features() {
  const bgRef = useParallax(0.2)
  return (
    <section className="features section" id="features">
      {/* Background image with parallax */}
      <div className="features__bg" ref={bgRef}>
        <img src="/images/features-bg.png" alt="" className="features__bg-img" />
        <div className="features__bg-overlay" />
      </div>

      <div className="container">
        <div className="section__header">
          <span className="section__label">Features</span>
          <h2 className="section__title">Everything You Need to Command</h2>
          <p className="section__subtitle">
            Six powerful modules working together to give you AI-powered server control.
          </p>
        </div>
        <div className="features__grid">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ number, icon, title, desc, code, index }) {
  const [ref, visible] = useReveal(0.1)
  return (
    <div
      ref={ref}
      className="step-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
      }}
      id={`step-${number}`}
    >
      <div className="step-card__number">{number}</div>
      <span className="step-card__icon">{icon}</span>
      <h3 className="step-card__title">{title}</h3>
      <p className="step-card__desc">{desc}</p>
      <code className="step-card__code">{code}</code>
    </div>
  )
}

function HowItWorks() {
  return (
    <section className="how-it-works section" id="how-it-works">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Quick Start</span>
          <h2 className="section__title">Up and Running in 3 Steps</h2>
          <p className="section__subtitle">
            From zero to AI-powered server control in under five minutes.
          </p>
        </div>
        <div className="steps">
          {/* Connecting animated line */}
          <div className="steps__connector" aria-hidden="true">
            <div className="steps__connector-line" />
            <div className="steps__connector-pulse" />
          </div>
          {STEPS.map((s, i) => (
            <StepCard key={s.number} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Architecture() {
  const [ref, visible] = useReveal(0.1)
  const bgRef = useParallax(0.25)

  return (
    <section className="architecture section" id="architecture">
      {/* Background image */}
      <div className="architecture__bg" ref={bgRef}>
        <img src="/images/arch-bg.png" alt="" className="architecture__bg-img" />
        <div className="architecture__bg-overlay" />
      </div>

      <div className="container" ref={ref}>
        <div className="section__header">
          <span className="section__label">Architecture</span>
          <h2 className="section__title">How It All Connects</h2>
          <p className="section__subtitle">
            A smart routing layer that connects your Telegram to AI engines, shell, and bot factory.
          </p>
        </div>
        <div
          className="arch-diagram"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div className="arch-layers">
            {/* User Layer */}
            <div className="arch-layer">
              <div className="arch-node arch-node--user">
                <span className="arch-node__icon">{ARCH_DATA.user.icon}</span>
                <div className="arch-node__title">{ARCH_DATA.user.title}</div>
                <div className="arch-node__subtitle">{ARCH_DATA.user.subtitle}</div>
              </div>
            </div>

            <div className="arch-arrow">
              <span className="arch-arrow__icon">▼</span>
            </div>

            {/* Master Bot */}
            <div className="arch-layer">
              <div className="arch-node arch-node--master">
                <span className="arch-node__icon">{ARCH_DATA.master.icon}</span>
                <div className="arch-node__title">{ARCH_DATA.master.title}</div>
                <div className="arch-node__subtitle">{ARCH_DATA.master.subtitle}</div>
              </div>
            </div>

            <div className="arch-arrow">
              <span className="arch-arrow__icon">▼</span>
            </div>

            {/* Modules Layer */}
            <div className="arch-layer arch-layer--modules">
              {ARCH_DATA.modules.map((m) => (
                <div className="arch-node" key={m.title}>
                  <span className="arch-node__icon">{m.icon}</span>
                  <div className="arch-node__title">{m.title}</div>
                  <div className="arch-node__subtitle">{m.subtitle}</div>
                </div>
              ))}
            </div>

            <div className="arch-arrow">
              <span className="arch-arrow__icon">▼</span>
            </div>

            {/* Output Layer */}
            <div className="arch-layer">
              {ARCH_DATA.outputs.map((o) => (
                <div className="arch-node" key={o.title}>
                  <span className="arch-node__icon">{o.icon}</span>
                  <div className="arch-node__title">{o.title}</div>
                  <div className="arch-node__subtitle">{o.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [ref, visible] = useReveal(0.3)

  useEffect(() => {
    if (!visible) return
    let i = 0
    const timer = setInterval(() => {
      i++
      setVisibleLines(i)
      if (i >= TERMINAL_LINES.length) clearInterval(timer)
    }, 300)
    return () => clearInterval(timer)
  }, [visible])

  return (
    <section className="demo section" id="demo" ref={ref}>
      <div className="container">
        <div className="section__header">
          <span className="section__label">Live Demo</span>
          <h2 className="section__title">See It in Action</h2>
          <p className="section__subtitle">
            Watch CloseCLAW boot up and connect to all its AI engines in real time.
          </p>
        </div>
        <div className="terminal">
          <div className="terminal__header">
            <span className="terminal__dot terminal__dot--red" />
            <span className="terminal__dot terminal__dot--yellow" />
            <span className="terminal__dot terminal__dot--green" />
            <span className="terminal__title">closeclaw@server:~</span>
          </div>
          <div className="terminal__body">
            {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
              <div className="terminal__line" key={i}>
                {line.type === 'command' ? (
                  <>
                    <span className="terminal__prompt">$</span>
                    <span className="terminal__command">{line.text}</span>
                  </>
                ) : (
                  <span
                    className={`terminal__output ${
                      line.variant ? `terminal__output--${line.variant}` : ''
                    }`}
                  >
                    {line.text}
                  </span>
                )}
              </div>
            ))}
            {visibleLines >= TERMINAL_LINES.length && (
              <div className="terminal__line">
                <span className="terminal__prompt">$</span>
                <span className="terminal__cursor" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const [ref, visible] = useReveal(0.2)
  return (
    <section className="stats section" id="stats" ref={ref}>
      <div className="container">
        <div
          className="stats__grid"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {STATS.map((s) => (
            <div className="stat-card" key={s.label} id={`stat-${s.label.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="stat-card__icon-wrapper">{s.icon}</div>
              <div className="stat-card__number">{s.number}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  const [ref, visible] = useReveal(0.15)
  const bgRef = useParallax(0.2)
  return (
    <section className="cta section" ref={ref}>
      <div className="container">
        <div
          className="cta__card"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {/* CTA Background image */}
          <div className="cta__bg" ref={bgRef}>
            <img src="/images/cta-bg.png" alt="" className="cta__bg-img" />
            <div className="cta__bg-overlay" />
          </div>

          <h2 className="cta__title">Ready to Take Control?</h2>
          <p className="cta__desc">
            Clone the repo, set your tokens, and launch — your AI-powered server
            commander is minutes away.
          </p>
          <div className="cta__actions">
            <a
              href="https://github.com/Future-Web2/Close-Claw"
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-github-btn"
            >
              ⚡ Clone on GitHub
            </a>
            <a
              href="https://github.com/Future-Web2/Close-Claw#-quick-start"
              className="btn btn--glass"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-docs-btn"
            >
              📖 Read the Docs
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Built with <span className="footer__heart">♥</span> by{' '}
        <a
          href="https://github.com/Future-Web2"
          className="footer__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Future-Web2
        </a>{' '}
        · CloseCLAW © {new Date().getFullYear()}
      </p>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  const glowRef = useMouseGlow()

  return (
    <div className="app">
      {/* Mouse-follow glow */}
      <div className="mouse-glow" ref={glowRef} aria-hidden="true" />

      {/* Ambient background */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-orb ambient-orb--1" />
        <div className="ambient-orb ambient-orb--2" />
        <div className="ambient-orb ambient-orb--3" />
        <div className="ambient-orb ambient-orb--4" />
        <div className="ambient-grid" />
        <div className="ambient-particles">
          <div className="ambient-particle" />
          <div className="ambient-particle" />
          <div className="ambient-particle" />
          <div className="ambient-particle" />
          <div className="ambient-particle" />
          <div className="ambient-particle" />
          <div className="ambient-particle" />
          <div className="ambient-particle" />
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <Nav />
        <Hero />
        <Features />
        <HowItWorks />
        <Architecture />
        <Terminal />
        <Stats />
        <CTA />
        <Footer />
      </div>
    </div>
  )
}

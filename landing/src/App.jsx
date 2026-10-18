import { useState, useEffect, useRef } from 'react'
import './App.css'
import { CONTENT } from './data/content.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Features from './components/Features.jsx'
import Simulator from './components/Simulator.jsx'
import GuideSection from './components/GuideSection.jsx'
import EnvBuilder from './components/EnvBuilder.jsx'
import Architecture from './components/Architecture.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'

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

export default function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('closeclaw_lang') || 'ru'
    } catch {
      return 'ru'
    }
  })

  const t = CONTENT[lang] || CONTENT.ru

  const glowRef = useMouseGlow()
  const heroBgRef = useParallax(0.35)
  const heroContentRef = useParallax(-0.1)
  const featuresBgRef = useParallax(0.2)
  const archBgRef = useParallax(0.2)
  const ctaBgRef = useParallax(0.25)

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

      {/* Content wrapper */}
      <div className="content">
        <Nav lang={lang} setLang={setLang} t={t} />
        <Hero t={t} bgRef={heroBgRef} contentRef={heroContentRef} />
        <Stats t={t} />
        <Features t={t} bgRef={featuresBgRef} />
        <Simulator lang={lang} t={t} />
        <GuideSection lang={lang} t={t} />
        <EnvBuilder t={t} />
        <Architecture t={t} bgRef={archBgRef} />
        <CTA t={t} bgRef={ctaBgRef} />
        <Footer t={t} />
      </div>
    </div>
  )
}

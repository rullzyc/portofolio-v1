import { useEffect, useRef, useState } from 'react'
import ParticleCanvas from './ParticleCanvas'

const words = ['Back-End Developer', 'UI/UX Enthusiast', 'Problem Solver']

export default function Hero() {
  const [display, setDisplay] = useState('')
  const stateRef = useRef({ wordIdx: 0, deleting: false, text: '' })

  // Typewriter — use ref-based state to avoid StrictMode double-fire
  useEffect(() => {
    let timer
    const tick = () => {
      const s = stateRef.current
      const word = words[s.wordIdx]
      if (!s.deleting) {
        s.text = word.slice(0, s.text.length + 1)
        setDisplay(s.text)
        if (s.text === word) {
          timer = setTimeout(() => { s.deleting = true; tick() }, 1800)
          return
        }
      } else {
        s.text = word.slice(0, s.text.length - 1)
        setDisplay(s.text)
        if (s.text === '') {
          s.deleting = false
          s.wordIdx = (s.wordIdx + 1) % words.length
        }
      }
      timer = setTimeout(tick, s.deleting ? 45 : 95)
    }
    timer = setTimeout(tick, 300)
    return () => clearTimeout(timer)
  }, [])

  // Count-up stats
  const [counts, setCounts] = useState({ projects: 0, years: 0, clients: 0 })
  const statsRef = useRef(null)
  const animated = useRef(false)
  useEffect(() => {
    const targets = { projects: 0, years: 0, clients: 0 }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !animated.current) {
        animated.current = true
        Object.keys(targets).forEach(key => {
          let c = 0
          const step = () => {
            c++
            setCounts(prev => ({ ...prev, [key]: c }))
            if (c < targets[key]) setTimeout(step, 70)
          }
          step()
        })
      }
    }, { threshold: 0.5 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      document.body.style.setProperty('--scroll-progress', pct + '%')
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero" id="home">


      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Available for work
        </div>
        <h1 className="hero-title">
          Hi, I'm <span className="gradient-text glitch-name">Arul</span>
          <br />
          <span className="typed-wrapper">
            <span className="typed-text">{display}</span>
            <span className="typed-cursor">|</span>
          </span>
        </h1>
        <p className="hero-desc">
          Saya seorang web developer pemula yang fokus pada <strong>pengembangan website</strong> dan terus belajar untuk meningkatkan kemampuan saya. Saya senang <strong>mencoba hal baru</strong> dan membangun proyek sebagai sarana belajar dan berkembang.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            <span>Lihat Proyek</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <a href="#contact" className="btn btn-outline">Hubungi Saya</a>
        </div>
        <div className="hero-stats" ref={statsRef}>
          <div className="stat">
            <span className="stat-num">{counts.projects}+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">{counts.years}+</span>
            <span className="stat-label">Years Exp</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">{counts.clients}+</span>
            <span className="stat-label">Clients</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="avatar-container">
          <div className="avatar-ring ring-1" />
          <div className="avatar-ring ring-2" />
          <div className="avatar-ring ring-3" />
          <div className="avatar-img">
            <img src="/img/me.jpg" alt="Arul" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="tech-badge tb-1">⚛️ React</div>
          <div className="tech-badge tb-2">🐘 PHP</div>
          <div className="tech-badge tb-3">🚀 Laravel</div>
          <div className="tech-badge tb-4">🎨 UI/UX</div>
        </div>
      </div>
    </section>
  )
}

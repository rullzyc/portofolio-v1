import { useState, useRef, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const projects = [
  { id: 1, category: 'web', featured: true,  tags: ['Html', 'Css'],  title: 'Curriculum Vitae', image: '/img/portofolio.png', desc: 'Website Portofolio pribadi yang menampilkan informasi tentang diri saya, keahlian, dan proyek-proyek yang pernah saya kerjakan.', visual: 'p1', type: 'lines',   demo: 'https://rullzyc.github.io/curriculum-vitae/', github: 'https://github.com/rullzyc/curriculum-vitae' },
  // { id: 2, category: 'web', featured: false, tags: ['Vue.js','Laravel'],           title: 'Task Management App',    image: '', desc: 'Aplikasi manajemen tugas dengan kolaborasi real-time, drag-and-drop, dan notifikasi pintar.',             visual: 'p2', type: 'circles', demo: '', github: '' },
  // { id: 3, category: 'mobile', featured: false, tags: ['React Native','Firebase'], title: 'Fitness Tracker App',    image: '', desc: 'Aplikasi mobile tracking kesehatan dengan AI recommendation dan progress visualization.',                visual: 'p3', type: 'phone',   demo: '', github: '' },
  // { id: 4, category: 'design', featured: false, tags: ['Figma','UI/UX'],           title: 'Banking App Design',     image: '', desc: 'Desain UI/UX aplikasi perbankan modern dengan fokus pada kemudahan pengguna dan keamanan.',               visual: 'p4', type: 'grid',    demo: '', github: '' },
  // { id: 5, category: 'web', featured: false, tags: ['Next.js','Python','AI'],      title: 'AI Analytics Dashboard', image: '', desc: 'Dashboard analitik berbasis AI dengan prediksi tren dan visualisasi data interaktif.',                   visual: 'p5', type: 'chart',   demo: '', github: '' },
  // { id: 6, category: 'web', featured: false, tags: ['Next.js','Python','AI'],      title: 'AI Analytics Dashboard', image: '', desc: 'Dashboard analitik berbasis AI dengan prediksi tren dan visualisasi data interaktif.',                   visual: 'p6', type: 'chart',   demo: '', github: '' },
  // { id: 7, category: 'web', featured: false, tags: ['Next.js','Python','AI'],      title: 'AI Analytics Dashboard', image: '', desc: 'Dashboard analitik berbasis AI dengan prediksi tren dan visualisasi data interaktif.',                   visual: 'p7', type: 'chart',   demo: '', github: '' },
  // { id: 8, category: 'web', featured: false, tags: ['Next.js','Python','AI'],      title: 'AI Analytics Dashboard', image: '', desc: 'Dashboard analitik berbasis AI dengan prediksi tren dan visualisasi data interaktif.',                   visual: 'p8', type: 'chart',   demo: '', github: '' },
]

const filters = ['all', 'web', 'mobile', 'design']

const Visual = ({ type, cls }) => {
  if (type === 'lines')   return <div className={`project-placeholder ${cls}`}><div className="pp-window"><span/><span/><span/></div><div className="pp-lines">{[80,60,90,50].map((w,i)=><div key={i} className="pp-line" style={{width:`${w}%`}}/>)}</div></div>
  if (type === 'circles') return <div className={`project-placeholder ${cls}`}><div className="pp-circles"><div className="pp-circle"/><div className="pp-circle sm"/></div></div>
  if (type === 'phone')   return <div className={`project-placeholder ${cls}`}><div className="pp-phone"><div className="pp-screen"/></div></div>
  if (type === 'grid')    return <div className={`project-placeholder ${cls}`}><div className="pp-design-grid"><div className="pp-box"/><div className="pp-box accent"/><div className="pp-box accent"/><div className="pp-box"/></div></div>
  if (type === 'chart')   return <div className={`project-placeholder ${cls}`}><div className="pp-chart">{[60,85,45,70,90].map((h,i)=><div key={i} className="pp-bar" style={{height:`${h}%`}}/>)}</div></div>
  return null
}

function TiltCard({ children, className, 'data-reveal': dr, 'data-delay': dd }) {
  const ref = useRef(null)
  const rafRef = useRef(null)
  const onMove = (e) => {
    if (window.innerWidth < 900) return
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale3d(1.02,1.02,1.02)`
    })
  }
  const onLeave = () => { 
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (ref.current) ref.current.style.transform = '' 
  }

  return (
    <div
      ref={ref}
      className={className}
      data-reveal={dr}
      data-delay={dd}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}

const LIMIT = 5

export default function Projects() {
  const [active, setActive] = useState('all')
  const [showAll, setShowAll] = useState(false)
  const ref = useScrollReveal(110)
  const gridRef = useRef(null)
  const filtered = projects.filter(p => active === 'all' || p.category === active)
  const displayed = showAll ? filtered : filtered.slice(0, LIMIT)
  const hasMore = filtered.length > LIMIT

  // Re-trigger card animations whenever filter changes
  useEffect(() => {
    setShowAll(false)
    if (!gridRef.current) return
    const cards = Array.from(gridRef.current.querySelectorAll('[data-reveal]'))
    cards.forEach(el => el.classList.remove('is-visible'))
    cards.forEach((el, i) => {
      const delay = parseInt(el.dataset.delay || i * 110)
      setTimeout(() => el.classList.add('is-visible'), delay + 30)
    })
  }, [active])

  // Reveal newly shown cards when showAll becomes true
  useEffect(() => {
    if (!showAll || !gridRef.current) return
    const cards = Array.from(gridRef.current.querySelectorAll('[data-reveal]'))
    cards.forEach((el, i) => {
      if (!el.classList.contains('is-visible')) {
        setTimeout(() => el.classList.add('is-visible'), i * 80 + 30)
      }
    })
  }, [showAll])

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="container">

        <div className="section-header">
          <span className="section-tag" data-reveal="up" data-delay="0">// my work</span>
          <h2 className="section-title" data-reveal="up" data-delay="80">
            Proyek <span className="gradient-text">Terbaru</span>
          </h2>
        </div>

        <div className="filter-tabs" data-reveal="up" data-delay="160">
          {filters.map(f => (
            <button key={f} className={`filter-btn${active === f ? ' active' : ''}`} onClick={() => setActive(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="projects-grid" ref={gridRef}>
          {displayed.map((p, i) => (
            <TiltCard
              key={p.id}
              className={`project-card${p.featured && active === 'all' ? ' featured' : ''}`}
              data-reveal="up"
              data-delay={String(i * 110)}
            >
              <div className={`project-img ${p.image ? 'has-image' : ''}`}>
                {p.image
                  ? <img src={p.image} alt={p.title} className="p-image" />
                  : <Visual type={p.type} cls={p.visual} />}
              </div>
              <div className="project-info">
                <div className="project-tags">{p.tags.map(t => <span key={t} className="p-tag">{t}</span>)}</div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-links">
                  {p.demo   && <a href={p.demo}   target="_blank" rel="noreferrer" className="p-link">Live Demo →</a>}
                  {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="p-link p-link-ghost">GitHub</a>}
                  {!p.demo && !p.github && <span className="p-link" style={{opacity:0.4,cursor:'default'}}>Coming Soon…</span>}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              className="filter-btn"
              onClick={() => setShowAll(s => !s)}
              style={{ padding: '12px 32px', fontSize: '0.95rem', fontWeight: 600 }}
            >
              {showAll ? '↑ Lihat Lebih Sedikit' : `Lihat Selengkapnya (${filtered.length - LIMIT} lagi) →`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}



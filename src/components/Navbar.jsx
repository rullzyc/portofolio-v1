import { useState, useEffect } from 'react'

const links = ['home', 'about', 'skills', 'projects', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      for (const id of links) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top
          if (top <= 120 && top > -el.offsetHeight + 120) { setActive(id); break }
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-logo">
          <span className="logo-bracket">&lt;</span>Arul<span className="logo-bracket">/&gt;</span>
        </div>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l}>
              <button className={`nav-link${active === l ? ' active' : ''}`} onClick={() => go(l)}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => go('contact')}>Hire Me</button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <ul>
          {links.map(l => (
            <li key={l}><a href={`#${l}`} onClick={() => setMenuOpen(false)}>{l.charAt(0).toUpperCase() + l.slice(1)}</a></li>
          ))}
        </ul>
      </div>
    </>
  )
}

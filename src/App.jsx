import { useState } from 'react'
import './index.css'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ParticleCanvas from './components/ParticleCanvas'

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-logo">
          <span className="logo-bracket">&lt;</span>Arul<span className="logo-bracket">/&gt;</span>
        </div>
        <p className="footer-text">Dibuat dan dikembangkan oleh <strong>Arul.</strong></p>
        <p className="footer-copy">© 2026 Arul. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <div className="noise" />
      <Cursor />
      
      {/* GLOBAL BACKGROUND */}
      <div className="global-bg">
        <div className="grid-lines" />
        <div className="glow glow-1" />
        <div className="glow glow-2" />
        <div className="glow glow-3" />
        <ParticleCanvas />
      </div>

      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity .5s ease .3s' }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

import { useScrollReveal } from '../hooks/useScrollReveal'

export default function About() {
  const ref = useScrollReveal(110)

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">

        <div className="section-header">
          <div data-reveal="up" data-delay="0">
            <span className="section-tag">// about me</span>
          </div>
          <h2 className="section-title" data-reveal="up" data-delay="80">
            <span className="text-clip"><span>Tentang </span></span>
            <span className="gradient-text text-clip"><span>Saya</span></span>
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-card card-main" data-reveal="left" data-delay="0">
            <div className="card-icon">👋</div>
            <h3>Halo, Saya Arul!</h3>
            <p>Saya merupakan mahasiswa <strong>Sistem Informasi</strong> yang memiliki fokus pada pengembangan web, baik dari sisi front-end maupun back-end. Saya tertarik membangun aplikasi yang tidak hanya berfungsi dengan baik, tetapi juga memiliki tampilan yang menarik dan mudah digunakan.</p>
          </div>

          <div className="about-card" data-reveal="up" data-delay="100">
            <div className="card-icon">🎓</div>
            <h3>Pendidikan</h3>
            <p>S1 Sistem Informasi<br /><span className="text-muted">Institut Widya Pratama Pekalongan • 2025–Sekarang</span></p>
          </div>

          <div className="about-card" data-reveal="up" data-delay="200">
            <div className="card-icon">📍</div>
            <h3>Lokasi</h3>
            <p>Indonesia<br /><span className="text-muted">Pekalongan, Jawa Tengah</span></p>
          </div>

          <div className="about-card" data-reveal="up" data-delay="300">
            <div className="card-icon">💼</div>
            <h3>Pengalaman</h3>
            <p>Currently building personal<br /><strong></strong></p>
          </div>

          <div className="about-card card-quote" data-reveal="right" data-delay="150">
            <div className="quote-mark">"</div>
            <p>Code is poetry written in logic. Every line tells a story.</p>
            <span className="quote-author">— Arul</span>
          </div>
        </div>

      </div>
    </section>
  )
}

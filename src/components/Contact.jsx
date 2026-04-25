import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Guestbook from './Guestbook'

const socials = [
  { id: 'linkedin', label: 'LinkedIn',  href: 'https://linkedin.com/',  d: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', text: "Let's Connect", sub: 'on LinkedIn' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/rullzyc/', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z', text: 'Instagram', sub: '@rullzyc' },
  { id: 'github', label: 'GitHub',    href: 'https://github.com/rullzyc',    d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', text: 'Github', sub: '@rullzyc' },
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me//6288239953865', d: 'M20.52 3.48A11.8 11.8 0 0012.06 0C5.5 0 .18 5.32.18 11.88c0 2.09.55 4.14 1.6 5.95L0 24l6.34-1.66a11.83 11.83 0 005.72 1.46h.01c6.56 0 11.88-5.32 11.88-11.88 0-3.17-1.23-6.15-3.43-8.44zM12.07 21.5a9.6 9.6 0 01-4.89-1.35l-.35-.21-3.76.98 1-3.66-.23-.37a9.58 9.58 0 01-1.47-5.02c0-5.31 4.32-9.63 9.64-9.63 2.57 0 4.98 1 6.8 2.82a9.57 9.57 0 012.82 6.81c0 5.31-4.32 9.63-9.64 9.63zm5.28-7.21c-.29-.14-1.72-.85-1.99-.94-.27-.1-.46-.14-.66.14-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.07-.29-.14-1.21-.45-2.3-1.44-.85-.76-1.43-1.7-1.6-1.99-.17-.29-.02-.45.13-.6.14-.14.29-.34.43-.51.14-.17.2-.29.29-.48.1-.2.05-.37-.02-.51-.07-.14-.66-1.6-.91-2.19-.24-.58-.49-.5-.66-.5h-.56c-.2 0-.51.07-.77.37-.27.29-1.01.98-1.01 2.39 0 1.41 1.04 2.78 1.18 2.98.14.2 2.04 3.11 4.94 4.36.69.3 1.23.48 1.65.62.69.22 1.31.19 1.8.12.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.34z', text: 'WhatsApp', sub: '+6288...' },
]

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const ref = useScrollReveal(120)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    // Demo mode — no EmailJS keys
    if (!serviceId || serviceId === 'your_service_id') {
      setStatus('sending')
      await new Promise(r => setTimeout(r, 1200))
      setStatus('success')
      formRef.current?.reset()
      setTimeout(() => setStatus('idle'), 3500)
      return
    }

    setStatus('sending')
    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      setStatus('success')
      formRef.current?.reset()
      setTimeout(() => setStatus('idle'), 3500)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3500)
    }
  }

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container">

        <div className="contact-header">
          <p className="section-sub" data-reveal="up" data-delay="0" style={{ fontSize: '1.1rem', color: 'var(--text)' }}>
            Punya pertanyaan? Kirimi saya pesan, dan saya akan segera membalasnya.
          </p>
        </div>

        <div className="contact-grid-ekizr" data-reveal="up" data-delay="100">
          
          {/* Left: Email Form Card */}
          <div className="ek-card">
            <div className="ek-card-header">
              <h3 className="ek-card-title">Hubungi</h3>
              <button className="ek-share-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              </button>
            </div>
            <p className="ek-card-desc">Ada yang ingin didiskusikan? Kirim saya pesan dan mari kita bicara.</p>
            
            <form ref={formRef} className="ek-form" onSubmit={handleSubmit}>
              <div className="ek-input-group">
                <svg className="ek-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input name="from_name" type="text" placeholder="Nama Anda" required />
              </div>
              
              <div className="ek-input-group">
                <svg className="ek-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input name="reply_to" type="email" placeholder="Email Anda" required />
              </div>

              <div className="ek-input-group ek-textarea-group">
                <svg className="ek-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <textarea name="message" rows="4" placeholder="Pesan Anda" required />
              </div>

              <button type="submit" className={`ek-submit-btn${status === 'success' ? ' success' : ''}`} disabled={status === 'sending'}>
                {status === 'sending' && <span className="btn-spinner"/>}
                {status === 'idle' && <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z"/></svg> 
                  Kirim Pesan
                </>}
                {status === 'success' && 'Terkirim!'}
                {status === 'error' && 'Gagal, Coba Lagi'}
              </button>
            </form>

            <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: '16px', fontWeight: '500' }}>Connect With Me:</p>
              <div className="ek-social-grid">
                {socials.map(s => (
                  <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className={`ek-soc-card${s.full ? ' full' : ''}`}>
                    <div className={`ek-soc-icon ${s.id}`}>
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d={s.d} /></svg>
                    </div>
                    <div className="ek-soc-text">
                      <strong>{s.text}</strong>
                      <span>{s.sub}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Guestbook */}
          <div className="ek-card ek-guestbook-card">
            <Guestbook />
          </div>

        </div>

      </div>
    </section>
  )
}

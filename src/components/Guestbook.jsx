import { useState, useEffect } from 'react'
import { db } from '../lib/firebase'
import {
  collection, addDoc, onSnapshot,
  orderBy, query, serverTimestamp
} from 'firebase/firestore'

const DEMO_COMMENTS = [
  { id: 'd1', name: 'Budi Santoso', message: 'Portofolio yang sangat keren! Desainnya modern banget.', date: '2026-04-20' },
  { id: 'd2', name: 'Siti Rahayu',  message: 'Mantap karyanya, terus berkarya ya!',                   date: '2026-04-22' },
  { id: 'd3', name: 'Dimas Prasetyo',message: 'Coding skillnya top banget. Lanjutkan!',               date: '2026-04-24' },
]

function timeAgo(ts) {
  if (!ts) return 'baru saja'
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  const diff = Math.floor((Date.now() - d) / 1000)
  if (diff < 60)   return 'baru saja'
  if (diff < 3600) return `${Math.floor(diff/60)} menit lalu`
  if (diff < 86400) return `${Math.floor(diff/3600)} jam lalu`
  return `${Math.floor(diff/86400)} hari lalu`
}

function Avatar({ name }) {
  const initials = name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  const hue = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
  return (
    <div className="gc-avatar" style={{ background: `hsl(${hue},55%,30%)` }}>
      {initials}
    </div>
  )
}

export default function Guestbook() {
  const [comments, setComments] = useState(DEMO_COMMENTS)
  const [form, setForm] = useState({ name: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [firebaseReady, setFirebaseReady] = useState(false)

  // Try to connect Firebase
  useEffect(() => {
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
    if (!projectId || projectId === 'your_project_id') return

    setFirebaseReady(true)
    const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, snap => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setComments(docs.length > 0 ? docs : DEMO_COMMENTS)
    }, () => setComments(DEMO_COMMENTS))
    return () => unsub()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) return
    setLoading(true)

    if (firebaseReady) {
      await addDoc(collection(db, 'guestbook'), {
        name: form.name.trim(),
        message: form.message.trim(),
        createdAt: serverTimestamp(),
      })
    } else {
      // Demo mode: add locally
      setComments(prev => [{
        id: Date.now().toString(),
        name: form.name.trim(),
        message: form.message.trim(),
        date: new Date().toLocaleDateString('id-ID'),
      }, ...prev])
    }

    setForm({ name: '', message: '' })
    setLoading(false)
    setSent(true)
    setTimeout(() => setSent(false), 2500)
  }

  return (
    <>
      <div className="gc-title">
        <span className="gc-title-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </span>
        Comments <span className="gc-count">({comments.length})</span>
      </div>

      <form className="gc-form" onSubmit={handleSubmit}>
        <label className="gc-label">Name <span>*</span></label>
        <div className="gc-input-wrap" style={{ marginBottom: '16px' }}>
          <input
            className="gc-input"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            required
            maxLength={40}
          />
        </div>

        <label className="gc-label">Message <span>*</span></label>
        <div className="gc-input-wrap" style={{ marginBottom: '16px' }}>
          <textarea
            className="gc-input gc-textarea"
            placeholder="Write your message here..."
            value={form.message}
            onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            required
            maxLength={280}
            rows={3}
          />
        </div>

        <label className="gc-label" style={{ color: 'var(--text2)', fontWeight: '500' }}>Profile Photo <span style={{color: 'var(--text3)', fontWeight: '400'}}>(optional)</span></label>
        <button type="button" className="gc-profile-upload">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Choose Profile Photo
        </button>
        <span className="gc-upload-note">Max file size: 5MB</span>

        <button type="submit" className={`gc-submit${sent ? ' gc-sent' : ''}`} disabled={loading}>
          {loading ? 'Sending...' : sent ? 'Sent!' : 'Submit'}
        </button>
      </form>

      <div className="gc-list">
        {comments.map(c => (
          <div key={c.id} className="gc-item">
            <Avatar name={c.name} />
            <div className="gc-body">
              <div className="gc-meta">
                <span className="gc-name">{c.name}</span>
                <span className="gc-time">{c.date || timeAgo(c.createdAt)}</span>
              </div>
              <p className="gc-msg">{c.message}</p>
            </div>
          </div>
        ))}
      </div>

      {!firebaseReady && (
        <p className="gc-note">
          💡 Mode demo — hubungkan Firebase untuk menyimpan komentar permanen.
        </p>
      )}
    </>
  )
}

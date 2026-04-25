import { useEffect, useState } from 'react'

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setCount(100)
        setTimeout(() => { setHiding(true); setTimeout(onDone, 700) }, 400)
      } else {
        setCount(current)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`loader${hiding ? ' loader-hide' : ''}`}>
      <div className="loader-inner">
        <div className="loader-logo">
          <span className="loader-bracket">&lt;</span>
          <span className="loader-name">Arul</span>
          <span className="loader-bracket">/&gt;</span>
        </div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" style={{ width: `${count}%` }} />
        </div>
        <span className="loader-count">{count}%</span>
      </div>
    </div>
  )
}

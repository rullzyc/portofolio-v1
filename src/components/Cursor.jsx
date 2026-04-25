import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    let fx = 0, fy = 0, mx = 0, my = 0
    const move = (e) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', move)

    const tick = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px'
        cursorRef.current.style.top = my + 'px'
      }
      fx += (mx - fx) * 0.12
      fy += (my - fy) * 0.12
      if (followerRef.current) {
        followerRef.current.style.left = fx + 'px'
        followerRef.current.style.top = fy + 'px'
      }
      requestAnimationFrame(tick)
    }
    tick()

    // Scale on hover
    const onEnter = () => {
      followerRef.current?.style.setProperty('width', '56px')
      followerRef.current?.style.setProperty('height', '56px')
    }
    const onLeave = () => {
      followerRef.current?.style.setProperty('width', '36px')
      followerRef.current?.style.setProperty('height', '36px')
    }
    document.querySelectorAll('a,button,.project-card,.about-card').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" style={{ transition: 'width .2s, height .2s' }} />
    </>
  )
}

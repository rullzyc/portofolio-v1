import { useEffect, useRef } from 'react'

// Universal hook: animates elements with class "reveal" when they enter viewport
export function useReveal(selector = '.reveal') {
  useEffect(() => {
    const els = document.querySelectorAll(selector)
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('revealed'), e.target.dataset.delay || 0)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// 3D tilt on card hover
export function useTilt(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let rafId = null
    const onMove = (e) => {
      if (window.innerWidth < 900) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rotX = ((y - cy) / cy) * -8
      const rotY = ((x - cx) / cx) * 8
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`
      })
    }
    const onLeave = () => { 
      if (rafId) cancelAnimationFrame(rafId)
      el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)' 
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])
}

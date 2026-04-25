import { useEffect, useRef } from 'react'

/**
 * ekizr-style scroll reveal:
 * - Animates IN when element enters viewport
 * - Resets and re-animates when element leaves + re-enters (replay)
 */
export function useScrollReveal(staggerMs = 100) {
  const ref = useRef(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const items = Array.from(section.querySelectorAll('[data-reveal]'))

    const show = () => {
      items.forEach((el, i) => {
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : i * staggerMs
        setTimeout(() => el.classList.add('is-visible'), delay)
      })
    }

    const hide = () => {
      items.forEach(el => el.classList.remove('is-visible'))
    }

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        show()
      } else {
        hide()
      }
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -60px 0px'
    })

    obs.observe(section)
    return () => obs.disconnect()
  }, [staggerMs])

  return ref
}

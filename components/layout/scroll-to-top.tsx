'use client'

import { IconArrowUp } from '@tabler/icons-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [atFooter, setAtFooter] = useState(false)
  const footerObserverRef = useRef<IntersectionObserver | null>(null)
  const prefersReducedMotion = useReducedMotion()

  // Show button after 400px scroll
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Watch footer visibility
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    footerObserverRef.current = new IntersectionObserver(
      ([entry]) => setAtFooter(entry.isIntersecting),
      { threshold: 0.1 }
    )
    footerObserverRef.current.observe(footer)

    return () => footerObserverRef.current?.disconnect()
  }, [])

  const handleClick = () =>
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'instant' : 'smooth',
    })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key={atFooter ? 'circle' : 'pill'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          layout
          onClick={handleClick}
          aria-label="Scroll to top"
          className={cn(
            'fixed z-50 bottom-6',
            'border border-border bg-background/80 backdrop-blur-sm',
            'shadow-sm transition-all duration-300',
            'flex items-center justify-center',
            'text-muted-foreground hover:bg-muted hover:text-foreground',
            atFooter
              ? 'right-10 h-9 w-9 rounded-full'
              : 'left-1/2 -translate-x-1/2 gap-1.5 rounded-full px-3.5 py-1.5 text-xs'
          )}
        >
          <IconArrowUp size={12} aria-hidden="true" />
          {!atFooter && <span>Back to top</span>}
        </motion.button>
      )}
    </AnimatePresence>
  )
}

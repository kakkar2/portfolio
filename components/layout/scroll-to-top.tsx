'use client'

import { IconArrowUp } from '@tabler/icons-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const RING_SIZE = 20
const RING_STROKE = 2
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS
const BADGE_SIZE = 28

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [atFooter, setAtFooter] = useState(false)
  const [progress, setProgress] = useState(0)
  const footerObserverRef = useRef<IntersectionObserver | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const pathname = usePathname()
  const isBlogPost = pathname?.startsWith('/blog/') && pathname !== '/blog/'

  // Show button after 400px scroll
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track reading progress against the post's own article bounds (blog posts only)
  useEffect(() => {
    if (!isBlogPost) return

    const article = document.getElementById('blog-article')
    if (!article) return

    const onScroll = () => {
      const { top, height } = article.getBoundingClientRect()
      const articleTop = top + window.scrollY
      const scrollable = height - window.innerHeight
      const pct = scrollable > 0 ? ((window.scrollY - articleTop) / scrollable) * 100 : 100
      setProgress(Math.min(100, Math.max(0, pct)))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isBlogPost, pathname])

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

  const showRing = isBlogPost && !atFooter

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={atFooter ? 'circle' : 'pill'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          layout
          className={cn(
            'fixed z-50 bottom-6 flex items-center',
            atFooter ? 'right-10' : 'left-1/2 -translate-x-1/2 gap-2'
          )}
        >
          <button
            onClick={handleClick}
            aria-label={
              isBlogPost ? `Scroll to top, ${Math.round(progress)} percent read` : 'Scroll to top'
            }
            className={cn(
              'border border-border bg-background/80 backdrop-blur-sm',
              'shadow-sm transition-all duration-300',
              'flex items-center justify-center',
              'text-muted-foreground hover:bg-muted hover:text-foreground',
              atFooter ? 'h-9 w-9 rounded-full' : 'gap-1.5 rounded-full px-3.5 py-1.5 text-xs'
            )}
          >
            <IconArrowUp size={12} aria-hidden="true" />
            {!atFooter && <span>Back to top</span>}
          </button>

          {/* Reading-progress ring — detaches from the pill on blog posts only */}
          <AnimatePresence>
            {showRing && (
              <motion.div
                key="progress-ring"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.3, x: -16 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.3, x: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: BADGE_SIZE, height: BADGE_SIZE }}
                className={cn(
                  'flex shrink-0 items-center justify-center rounded-full',
                  'border border-border bg-background/80 backdrop-blur-sm shadow-sm'
                )}
              >
                <svg
                  width={RING_SIZE}
                  height={RING_SIZE}
                  viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
                  className="-rotate-90"
                  aria-hidden="true"
                >
                  <circle
                    cx={RING_SIZE / 2}
                    cy={RING_SIZE / 2}
                    r={RING_RADIUS}
                    fill="none"
                    strokeWidth={RING_STROKE}
                    className="stroke-border"
                  />
                  <motion.circle
                    cx={RING_SIZE / 2}
                    cy={RING_SIZE / 2}
                    r={RING_RADIUS}
                    fill="none"
                    strokeWidth={RING_STROKE}
                    strokeLinecap="round"
                    className="stroke-primary"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    initial={{ strokeDashoffset: RING_CIRCUMFERENCE }}
                    animate={{
                      strokeDashoffset: RING_CIRCUMFERENCE - (RING_CIRCUMFERENCE * progress) / 100,
                    }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: 'linear' }}
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

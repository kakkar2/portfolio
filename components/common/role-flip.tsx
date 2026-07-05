'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const ROLES = [
  'Frontend-Focused Full Stack Engineer',
  'Building things that live on the internet',
  'Obsessed with developer experience',
]

export default function RoleFlip() {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  return (
    <div
      style={{
        perspective: '2000px',
        perspectiveOrigin: 'center center',
      }}
      className="relative overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={ROLES[index]}
          initial={{
            rotateX: -90,
            opacity: 0,
            scale: 0.96,
          }}

          animate={{
            rotateX: 0,
            opacity: 1,
            scale: 1,
          }}

          exit={{
            rotateX: 90,
            opacity: 0,
            scale: 0.96,
          }}

          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transformOrigin: 'center center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          className="shimmer text-sm text-muted-foreground font-semibold sm:text-base"
        >
          {ROLES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

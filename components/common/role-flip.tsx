'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const ROLES = [
  'Full Stack Developer',
  'React & Next.js Developer',
  'building things that live on the internet',
  'obsessed with developer experience',
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
    <div style={{ perspective: '800px' }} className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={ROLES[index]}
          initial={{
            rotateX: -90,
            opacity: 0,
            y: 20,
          }}
          animate={{
            rotateX: 0,
            opacity: 1,
            y: 0,
          }}
          exit={{
            rotateX: 90,
            opacity: 0,
            y: -20,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            transformOrigin: 'center top',
            transformStyle: 'preserve-3d',
          }}
          className="shimmer text-sm text-muted-foreground font-semibold sm:text-base"
        >
          {ROLES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

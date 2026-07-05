'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

import { siteConfig } from '@/config/site'

const draw = (delay: number) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 0.3, ease: 'easeOut' as const },
      opacity: { delay, duration: 0.01 },
    },
  },
})

export function NavbarLogo() {
  const prefersReducedMotion = useReducedMotion()
  const s = prefersReducedMotion ? 0 : 1

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className="group flex items-center gap-2.5"
    >
      <motion.svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        initial="hidden"
        animate="visible"
        className="shrink-0 text-primary"
      >
        {/* Subtle container box — fades in last */}
        <motion.rect
          x="0.75"
          y="0.75"
          width="28.5"
          height="28.5"
          rx="3"
          stroke="currentColor"
          strokeWidth={1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: s * 0.9, duration: 0.4 }}
        />

        {/* L vertical */}
        <motion.path
          d="M 7 8 L 7 22"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
          variants={draw(s * 0)}
        />
        {/* L horizontal */}
        <motion.path
          d="M 7 22 L 13 22"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
          variants={draw(s * 0.2)}
        />

        {/* K vertical */}
        <motion.path
          d="M 17 8 L 17 22"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
          variants={draw(s * 0.35)}
        />
        {/* K upper arm */}
        <motion.path
          d="M 17 15 L 24 8"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
          variants={draw(s * 0.52)}
        />
        {/* K lower arm */}
        <motion.path
          d="M 17 15 L 24 22"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
          variants={draw(s * 0.65)}
        />
      </motion.svg>

      {/* Name — slides in as the box appears */}
      <motion.span
        className="text-sm font-medium tracking-tight text-foreground
                   transition-opacity duration-200 group-hover:opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: s * 0.9, duration: 0.4, ease: 'easeOut' }}
      >
        {siteConfig.name}
      </motion.span>
    </Link>
  )
}

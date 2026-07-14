'use client'

import { Icon } from '@iconify/react'
import { motion, useReducedMotion } from 'framer-motion'

import { stack } from '@/data/stack'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

const reducedRowVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
}

export function StackSection() {
  const prefersReducedMotion = useReducedMotion()
  const resolved = prefersReducedMotion ? reducedRowVariants : rowVariants

  return (
    <section aria-labelledby="stack-heading" className="py-6" id="stack">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Heading row */}
        <motion.h2
          variants={resolved}
          id="stack-heading"
          className="mb-8 text-xl font-semibold tracking-tight"
        >
          Stack
        </motion.h2>

        {/* Category rows */}
        <div
          role="list"
          aria-label="Technology stack by category"
          className="divide-y divide-border border-y border-border"
        >
          {stack.map((category, index) => (
            <motion.div
              key={category.id}
              role="listitem"
              variants={resolved}
              className="flex flex-col gap-4 py-4 sm:flex-row sm:gap-0"
            >
              {/* Left — numbered label */}
              <div className="flex w-44 shrink-0 items-start gap-2 sm:py-0.5">
                <span
                  className="mt-px font-mono text-xs tabular-nums text-muted-foreground/40"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-muted-foreground">{category.label}</span>
              </div>

              {/* Vertical divider — desktop only */}
              <div className="hidden border-l border-border sm:block" aria-hidden="true" />

              {/* Right — tech pills */}
              <ul
                aria-label={`${category.label} technologies`}
                className="flex flex-wrap gap-2 sm:pl-8"
                role="list"
              >
                {category.items.map(({ name, icon }) => (
                  <li key={name}>
                    <span
                      className={cn(
                        'group inline-flex items-center gap-2 rounded-full',
                        'border border-border bg-muted/50',
                        'px-3 py-1',
                        'font-mono text-xs text-muted-foreground',
                        'grayscale transition-all duration-200',
                        'hover:grayscale-0 hover:border-border/80',
                        'hover:bg-muted hover:text-foreground',
                        'cursor-pointer'
                      )}
                    >
                      {icon && (
                        <span className="flex size-4 shrink-0 items-center justify-center">
                          <Icon icon={icon} className="size-3.5" aria-hidden="true" />
                        </span>
                      )}
                      <span className="leading-none">{name}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

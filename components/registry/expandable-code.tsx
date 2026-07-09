'use client'

import { IconChevronDown } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { cn } from '@/lib/utils'

interface ExpandableCodeProps {
  children: React.ReactNode
  maxHeight?: number
}

export function ExpandableCode({ children, maxHeight = 300 }: ExpandableCodeProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="relative">
      <div
        className={cn('overflow-hidden transition-all duration-300', !expanded && 'relative')}
        style={{ maxHeight: expanded ? 'none' : `${maxHeight}px` }}
      >
        {children}

        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
        )}
      </div>

      <button
        onClick={() => setExpanded((v) => !v)}
        className={cn(
          'mt-2 flex w-full items-center justify-center gap-1.5',
          'rounded-lg border border-border bg-muted/50 py-2',
          'text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
        )}
      >
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <IconChevronDown size={13} aria-hidden="true" />
        </motion.span>
        {expanded ? 'Collapse' : 'Expand'}
      </button>
    </div>
  )
}

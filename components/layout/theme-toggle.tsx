'use client'

import { IconMoon, IconSun } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === 'dark'

  const toggleTheme = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark')
  }, [isDark, setTheme])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === 'd' &&
        !['INPUT', 'TEXTAREA'].includes((document.activeElement?.tagName ?? '').toUpperCase())
      ) {
        e.preventDefault()
        toggleTheme()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleTheme])

  if (!mounted) {
    return (
      <div
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-10 w-10')}
        aria-hidden="true"
      />
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'relative h-10 w-10 cursor-pointer text-muted-foreground transition-colors hover:text-foreground'
          )}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="absolute"
              >
                <IconSun className="size-4.5" aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="absolute"
              >
                <IconMoon className="size-4.5" aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </TooltipTrigger>

      <TooltipContent side="bottom" className="flex items-center gap-3">
        <span>Toggle {isDark ? 'light' : 'dark'} mode</span>
        <Kbd className="pointer-events-none inline-flex h-5 items-center rounded bg-muted px-1.5 text-[10px] font-medium">
          D
        </Kbd>
      </TooltipContent>
    </Tooltip>
  )
}

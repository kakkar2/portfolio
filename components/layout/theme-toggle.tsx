'use client'

import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

import { Kbd } from '../ui/kbd'

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
    // Render a same-size invisible placeholder so layout doesn't shift
    return (
      <div
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9')}
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
            'w-10 h-10 text-muted-foreground transition-colors hover:text-foreground cursor-pointer'
          )}
        >
          {isDark ? (
            <IconSun size={20} aria-hidden="true" />
          ) : (
            <IconMoon size={20} aria-hidden="true" />
          )}
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

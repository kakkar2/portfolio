'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

import { useThemePreset } from '@/components/providers/theme-preset-provider'
import { THEME_PRESETS } from '@/data/theme-presets'
import { cn } from '@/lib/utils'

export function ThemeDock() {
  const { preset, setPreset } = useThemePreset()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'
  const activePreset = THEME_PRESETS.find((p) => p.id === preset) ?? THEME_PRESETS[0]
  const activeColor = isDark ? activePreset.primaryDark : activePreset.primary

  return (
    <div ref={ref} className="relative flex items-center justify-end">
      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'absolute bottom-full right-0 mb-3 z-50',
              'w-44 overflow-hidden rounded-xl',
              'border border-border bg-background/95 backdrop-blur-md shadow-lg'
            )}
          >
            <div className="p-1.5">
              {THEME_PRESETS.map((p, i) => {
                const color = isDark ? p.primaryDark : p.primary
                const isActive = preset === p.id

                return (
                  <motion.button
                    key={p.id}
                    onClick={() => {
                      setPreset(p.id)
                      setOpen(false)
                    }}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: i * 0.04,
                        duration: 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    aria-label={`${p.label} theme`}
                    aria-pressed={isActive}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2',
                      'text-left text-xs transition-colors',
                      isActive
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    )}
                  >
                    {/* Three dot preview */}
                    <div className="flex items-center gap-0.5">
                      {[0.4, 0.65, 1].map((opacity, idx) => (
                        <span
                          key={idx}
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: color, opacity }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <span className="flex-1 font-medium">{p.label}</span>

                    {/* Active dot */}
                    {isActive && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger — active swatch + name */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Change theme"
        aria-expanded={open}
        className={cn(
          'flex items-center gap-2 rounded-lg px-2.5 py-1.5',
          'border border-border/50 bg-muted/30 text-xs',
          'text-muted-foreground transition-all hover:bg-muted hover:text-foreground',
          open && 'bg-muted text-foreground'
        )}
      >
        {/* Three dot preview of active theme */}
        <div className="flex items-center gap-0.5">
          {[0.4, 0.65, 1].map((opacity, idx) => (
            <span
              key={idx}
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: activeColor, opacity }}
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="font-medium">{activePreset.label}</span>
      </button>
    </div>
  )
}

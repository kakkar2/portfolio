'use client'

import { IconCheck, IconPalette } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { useThemePreset } from '@/components/providers/theme-preset-provider'
import { buttonVariants } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { THEME_PRESETS } from '@/data/theme-presets'
import { cn } from '@/lib/utils'

export function ThemePresetSwitcher() {
  const { preset, setPreset } = useThemePreset()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'h-9 w-9 text-muted-foreground'
        )}
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="Change theme preset"
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'h-9 w-9 text-muted-foreground transition-colors hover:text-foreground'
          )}
        >
          <IconPalette size={18} aria-hidden="true" />
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={8} className="w-52 p-3">
        <p className="mb-3 text-xs font-medium text-muted-foreground">Theme</p>

        <div className="grid grid-cols-1 gap-1">
          {THEME_PRESETS.map((p) => {
            const color = isDark ? p.primaryDark : p.primary
            const isActive = preset === p.id

            return (
              <button
                key={p.id}
                onClick={() => setPreset(p.id)}
                aria-pressed={isActive}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-2.5 py-2',
                  'text-left text-sm transition-colors',
                  isActive
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                {/* Swatch */}
                <span
                  className="h-4 w-4 shrink-0 rounded-full border border-border/50"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />

                {/* Label */}
                <span className="flex-1 font-medium">{p.label}</span>

                {/* Active check */}
                {isActive && (
                  <IconCheck size={13} className="shrink-0 text-foreground" aria-hidden="true" />
                )}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

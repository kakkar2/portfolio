'use client'

import { Icon } from '@iconify/react'
import { type ReactNode, useState } from 'react'

import { CopyButton } from '@/components/ui/copy-button'
import { cn } from '@/lib/utils'

const PKG_MANAGERS = [
  { id: 'npm', label: 'npm', icon: 'simple-icons:npm' },
  { id: 'pnpm', label: 'pnpm', icon: 'simple-icons:pnpm' },
  { id: 'yarn', label: 'yarn', icon: 'simple-icons:yarn' },
  { id: 'bun', label: 'bun', icon: 'simple-icons:bun' },
] as const

type PkgManager = (typeof PKG_MANAGERS)[number]['id']

export type Commands = Partial<Record<PkgManager, string>> & { npm: string }

interface PackageManagerTabsProps {
  commands: Commands
  /**
   * Pre-rendered code slots (e.g. from HighlightedCode server component).
   * When provided, replaces the built-in CommandTokens colorizer.
   * Keys must match PKG_MANAGERS ids.
   */
  renderedSlots?: Partial<Record<PkgManager, ReactNode>>
  className?: string
}

export function PackageManagerTabs({
  commands,
  renderedSlots,
  className,
}: PackageManagerTabsProps) {
  const [active, setActive] = useState<PkgManager>('npm')

  const activeManager = PKG_MANAGERS.find((pm) => pm.id === active)!
  const cmd = commands[active] ?? commands.npm
  const activeSlot = renderedSlots?.[active]

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex w-fit items-center rounded-lg border border-border bg-muted/30 p-1">
        <div className="flex w-9 items-center justify-center">
          <Icon icon={activeManager.icon} className="size-4 text-primary" aria-hidden="true" />
        </div>

        <div className="mx-1 h-5 w-px bg-border" />

        <div className="flex gap-1 px-1">
          {PKG_MANAGERS.map((pm) => (
            <button
              key={pm.id}
              onClick={() => setActive(pm.id)}
              aria-pressed={active === pm.id}
              className={cn(
                'h-8 rounded-md px-2.5 text-xs font-semibold transition-colors',
                active === pm.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {pm.label}
            </button>
          ))}
        </div>
      </div>

      {activeSlot ? (
        <div className="relative">
          <div className="absolute right-3 top-3 z-10">
            <CopyButton
              value={cmd}
              size={13}
              className={cn(
                'h-7 w-7 rounded-md border border-border',
                'bg-background/90 backdrop-blur-sm'
              )}
            />
          </div>
          {activeSlot}
        </div>
      ) : (
        <div className="relative flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-5 py-3.5">
          <code className="flex-1 font-mono text-[13px] leading-relaxed">
            <CommandTokens cmd={cmd} />
          </code>
          <CopyButton
            value={cmd}
            size={13}
            className={cn(
              'shrink-0 h-7 w-7 rounded-md border border-border',
              'bg-background/90 backdrop-blur-sm'
            )}
          />
        </div>
      )}
    </div>
  )
}

function CommandTokens({ cmd }: { cmd: string }) {
  const tokens = cmd.split(' ')
  return (
    <>
      {tokens.map((token, i) => {
        const cls =
          i === 0
            ? 'text-primary'
            : token.startsWith('@')
              ? 'text-emerald-500 dark:text-emerald-400'
              : token.startsWith('-')
                ? 'text-muted-foreground'
                : 'text-foreground'
        return (
          <span key={i} className={cls}>
            {token}
            {i < tokens.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </>
  )
}

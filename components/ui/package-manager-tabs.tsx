'use client'

import { Icon } from '@iconify/react'
import { useState } from 'react'

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

type Variant = 'default' | 'glass'

interface PackageManagerTabsProps {
  commands: Commands
  variant?: Variant
  className?: string
}

const styles = {
  default: {
    switcher: 'border border-border bg-muted/30',
    divider: 'bg-border',
    activeBtn: 'bg-background text-foreground shadow-sm',
    inactiveBtn: 'text-muted-foreground hover:text-foreground',
    block: 'border border-border bg-muted/30',
    copyBtn: 'border-border bg-background/90',
  },
  glass: {
    switcher: cn(
      'border backdrop-blur-xl',
      'bg-black/[0.04] border-black/[0.08]',
      'shadow-[0_1px_3px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)]',
      'dark:bg-white/[0.06] dark:border-white/[0.10]',
      'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_1px_3px_rgba(0,0,0,0.3)]'
    ),
    divider: 'bg-black/10 dark:bg-white/10',
    activeBtn: cn(
      'bg-white/90 text-foreground shadow-sm border border-black/[0.06]',
      'dark:bg-white/[0.14] dark:text-foreground dark:border-transparent dark:shadow-none'
    ),
    inactiveBtn: cn(
      'text-foreground/50 transition-colors',
      'hover:text-foreground hover:bg-black/[0.04]',
      'dark:hover:bg-white/[0.06]'
    ),
    block: cn(
      'border backdrop-blur-xl',
      'bg-black/[0.04] border-black/[0.08]',
      'shadow-[0_1px_3px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)]',
      'dark:bg-white/[0.06] dark:border-white/[0.10]',
      'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_1px_3px_rgba(0,0,0,0.3)]'
    ),
    copyBtn: cn(
      'border backdrop-blur-sm',
      'border-black/[0.08] bg-black/[0.04]',
      'dark:border-white/[0.10] dark:bg-white/[0.06]'
    ),
  },
} satisfies Record<Variant, Record<string, string>>

export function PackageManagerTabs({
  commands,
  variant = 'default',
  className,
}: PackageManagerTabsProps) {
  const [active, setActive] = useState<PkgManager>('npm')

  const s = styles[variant]
  const activeManager = PKG_MANAGERS.find((pm) => pm.id === active)!
  const cmd = commands[active] ?? commands.npm

  return (
    <div className={cn('w-full space-y-2', className)}>
      <div className={cn('flex w-fit items-center rounded-lg p-1', s.switcher)}>
        <div className="flex w-9 items-center justify-center">
          <Icon
            icon={activeManager.icon}
            className="size-4 text-foreground/80"
            aria-hidden="true"
          />
        </div>

        <div className={cn('mx-1 h-5 w-px', s.divider)} />

        <div className="flex gap-1 px-1">
          {PKG_MANAGERS.map((pm) => (
            <button
              key={pm.id}
              onClick={() => setActive(pm.id)}
              aria-pressed={active === pm.id}
              className={cn(
                'h-8 rounded-md px-2.5 text-xs font-semibold transition-colors',
                active === pm.id ? s.activeBtn : s.inactiveBtn
              )}
            >
              {pm.label}
            </button>
          ))}
        </div>
      </div>

      <div className={cn('relative flex h-12 w-full items-center gap-3 rounded-xl px-5', s.block)}>
        <code className="flex-1 truncate font-mono text-[13px] leading-relaxed">
          <CommandTokens cmd={cmd} />
        </code>
        <CopyButton
          value={cmd}
          size={13}
          className={cn('shrink-0 h-7 w-7 rounded-md border backdrop-blur-sm', s.copyBtn)}
        />
      </div>
    </div>
  )
}

function CommandTokens({ cmd }: { cmd: string }) {
  return (
    <>
      {cmd.split(' ').map((token, i) => (
        <span
          key={i}
          className={
            i === 0
              ? 'text-primary'
              : token.startsWith('@')
                ? 'text-emerald-500 dark:text-emerald-400'
                : token.startsWith('-')
                  ? 'text-muted-foreground'
                  : 'text-foreground'
          }
        >
          {token}
          {i < cmd.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  )
}

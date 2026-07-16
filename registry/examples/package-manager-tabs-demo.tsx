'use client'

import { useState } from 'react'

import { PackageManagerTabs } from '@/components/ui/package-manager-tabs'
import { cn } from '@/lib/utils'

const COMMANDS = {
  npm: 'npx shadcn@latest add @lalit/copy-button',
  pnpm: 'pnpm dlx shadcn@latest add @lalit/copy-button',
  yarn: 'npx shadcn@latest add @lalit/copy-button',
  bun: 'bunx shadcn@latest add @lalit/copy-button',
} as const

type Variant = 'default' | 'glass'

const VARIANTS: Variant[] = ['default', 'glass']

export default function PackageManagerTabsDemo() {
  const [variant, setVariant] = useState<Variant>('default')

  return (
    <div className="flex w-full flex-col items-center gap-6 px-4">
      <div className="flex items-center rounded-lg border border-border bg-muted/30 p-1">
        {VARIANTS.map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            aria-pressed={variant === v}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors',
              variant === v
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {v}
          </button>
        ))}
      </div>

      <div
        className={cn(
          'w-full rounded-xl p-6 transition-colors duration-300',
          variant === 'glass' ? 'bg-zinc-100 dark:bg-zinc-900' : 'bg-transparent'
        )}
      >
        <PackageManagerTabs variant={variant} commands={COMMANDS} />
      </div>
    </div>
  )
}

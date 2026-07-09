import * as TablerIcons from '@tabler/icons-react'
import type { Icon } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { getRegistry } from '@/data/registry'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Components',
  description: `Open source components built by ${siteConfig.name}. Copy, install via CLI, or use as inspiration.`,
}

function ComponentIcon({ name, size = 16 }: { name: string; size?: number }) {
  const icons = TablerIcons as unknown as Record<string, Icon>
  const Icon = icons[name]
  if (!Icon) return null
  return <Icon size={size} className="shrink-0 text-muted-foreground" aria-hidden="true" />
}

export default function ComponentsPage() {
  const registry = getRegistry()
  return (
    <main className="container mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 pt-24 min-h-screen">
      <div className="mb-12 space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Components</h1>
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
          A growing collection of open-source components. Install via the shadcn CLI or copy the
          code manually — no lock-in, no config.
        </p>
      </div>

      {/* Count */}
      <p className="mb-5 font-mono text-xs text-muted-foreground/50">
        {registry.length} {registry.length === 1 ? 'component' : 'components'}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {registry.map((component) => (
          <Link
            key={component.slug}
            href={`/components/${component.slug}`}
            className={cn(
              'group flex flex-col gap-2 rounded-xl p-4',
              'border border-border/60 bg-card',
              'transition-all duration-200 hover:border-border hover:bg-muted/20'
            )}
          >
            <div className="flex items-center gap-2.5">
              <div className="rounded-md bg-muted/50 p-1.5">
                <ComponentIcon name={component.icon} />
              </div>
              <span className="text-sm font-medium text-foreground transition-colors group-hover:text-foreground/70">
                {component.title}
              </span>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {component.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { registry } from '@/data/registry'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Components',
  description: `Open source components built by ${siteConfig.name}. Copy, install via CLI, or use as inspiration.`,
}

const CATEGORY_LABELS: Record<string, string> = {
  ui: 'UI',
  layout: 'Layout',
  section: 'Sections',
}

export default function ComponentsPage() {
  const categories = [...new Set(registry.map((c) => c.category))]

  return (
    <main className="container mx-auto max-w-3xl px-6 lg:px-8 pt-24 min-h-screen">
      {/* Header */}
      <div className="mb-12 space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Components</h1>
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
          A growing collection of open-source components. Install via the shadcn CLI or copy the
          code manually — no lock-in.
        </p>
        <div className="flex items-center gap-2 pt-1">
          <code className="rounded-lg border border-border bg-muted/50 px-3 py-1.5 font-mono text-xs text-muted-foreground">
            npx shadcn@latest add {siteConfig.url}/r/[component]
          </code>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {categories.map((category) => {
          const items = registry.filter((c) => c.category === category)
          return (
            <section key={category}>
              <h2 className="mb-5 font-mono text-xs uppercase tracking-widest text-muted-foreground/50">
                {CATEGORY_LABELS[category] ?? category} · {items.length}
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {items.map((component) => (
                  <Link
                    key={component.slug}
                    href={`/components/${component.slug}`}
                    className={cn(
                      'group relative flex flex-col gap-3 rounded-xl',
                      'border border-border/60 bg-card p-5',
                      'transition-all duration-200 hover:border-border hover:bg-muted/20'
                    )}
                  >
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-foreground/70">
                        {component.name}
                      </h3>
                      <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {component.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {component.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}

import { IconArrowLeft, IconCheck } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CodeBlock } from '@/components/mdx/code-block'
import { InstallTabs } from '@/components/registry/install-tabs'
import { PreviewWrapper } from '@/components/registry/preview-wrapper'
import { PropsTable } from '@/components/registry/props-table'
import { buttonVariants } from '@/components/ui/button'
import { CopyButton } from '@/components/ui/copy-button'
import { getComponent, registry } from '@/data/registry'
import { cn } from '@/lib/utils'

export async function generateStaticParams() {
  return registry.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const component = getComponent(slug)
  if (!component) return {}
  return {
    title: component.name,
    description: component.description,
  }
}

function ComponentPreview({ slug }: { slug: string }) {
  const component = getComponent(slug)
  if (!component) return null

  if (slug === 'copy-button') {
    return (
      <PreviewWrapper component={component}>
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Default</span>
            <CopyButton value="Hello from lalitkakkar.vercel.app" />
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-2.5">
            <span className="font-mono text-sm">lalitkakkar50@gmail.com</span>
            <CopyButton
              value="lalitkakkar50@gmail.com"
              label="Copy email"
              copiedLabel="Email copied"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Large</span>
            <CopyButton value="Large copy button" size={20} />
          </div>
        </div>
      </PreviewWrapper>
    )
  }

  return null
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const component = getComponent(slug)
  if (!component) notFound()

  return (
    <main className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 pb-24">
      {/* Back */}
      <Link
        href="/components"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          '-ml-3 mb-10 gap-1.5 text-muted-foreground hover:text-foreground'
        )}
      >
        <IconArrowLeft size={14} aria-hidden="true" />
        Components
      </Link>

      {/* Header */}
      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-semibold tracking-tight">{component.name}</h1>
          <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-xs text-muted-foreground">
            {component.category}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground max-w-lg">
          {component.description}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {component.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Preview + Code tabs */}
      <div className="mb-12">
        <ComponentPreview slug={slug} />
      </div>

      {/* Features */}
      {component.features.length > 0 && (
        <div className="mb-12 space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground/50">
            Features
          </h2>
          <ul className="space-y-2.5">
            {component.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <IconCheck
                  size={14}
                  className="mt-0.5 shrink-0 text-emerald-500"
                  aria-hidden="true"
                />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Installation */}
      <div className="mb-12 space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground/50">
          Installation
        </h2>
        <InstallTabs component={component} />
      </div>

      {/* Usage */}
      <div className="mb-12 space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground/50">
          Usage
        </h2>
        <CodeBlock>
          <code>{component.usage}</code>
        </CodeBlock>
      </div>

      {/* Props */}
      {component.props.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground/50">
            API Reference
          </h2>
          <PropsTable props={component.props} />
        </div>
      )}
    </main>
  )
}

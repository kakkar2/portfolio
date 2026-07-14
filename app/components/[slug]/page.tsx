import { IconArrowLeft, IconExternalLink } from '@tabler/icons-react'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ComponentPreview } from '@/components/components/component-preview'
import { HighlightedCode } from '@/components/registry/highlighted-code'
import { PropsTable } from '@/components/registry/props-table'
import { buttonVariants } from '@/components/ui/button'
import { CopyButton } from '@/components/ui/copy-button'
import { componentProps, getComponent, getRegistry } from '@/data/registry'
import type { ComponentContent } from '@/lib/components-content'
import { getComponentContent, getComponentSource } from '@/lib/components-content'
import { cn } from '@/lib/utils'

// Client components below the fold — split into separate JS chunks
const InstallTabs = dynamic(() =>
  import('@/components/registry/install-tabs').then((m) => m.InstallTabs)
)
const ExpandableCode = dynamic(() =>
  import('@/components/registry/expandable-code').then((m) => m.ExpandableCode)
)

export async function generateStaticParams() {
  return getRegistry().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const component = getComponent(slug)
  if (!component) return {}
  return { title: component.title, description: component.description }
}

async function CnSlot() {
  return (
    <HighlightedCode
      code={`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
      lang="ts"
    />
  )
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const component = getComponentContent(slug)
  if (!component) notFound()

  const props = componentProps[slug] ?? []

  return (
    <main className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 pb-24">
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

      <div className="mb-10 space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">{component.title}</h1>
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
          {component.description}
        </p>
      </div>

      <div className="mb-12">
        <ComponentPreview slug={slug} />
      </div>

      {component.features.length > 0 && (
        <div className="mb-12 space-y-4">
          <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground/50">
            Features
          </h2>
          <ul className="list-disc pl-5 space-y-2.5">
            {component.features.map((f) => (
              <li key={f} className="text-sm text-muted-foreground">
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-12 space-y-4">
        <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground/50">
          Installation
        </h2>
        <InstallTabs
          component={component}
          componentSlot={<ComponentSourceSlot component={component} />}
          cnSlot={<CnSlot />}
          cliSlot={<CliSlotsAll component={component} />}
          depsCmd={<DepsSlot component={component} manager="npm" />}
          localDepsSlot={
            component.localDeps?.length ? <LocalDepsSlot component={component} /> : undefined
          }
        />
      </div>

      <div className="mb-12 space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground/50">
          Usage
        </h2>
        <UsageSlot component={component} />
      </div>

      {props.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground/50">
            API Reference
          </h2>
          <PropsTable props={props} />
        </div>
      )}
    </main>
  )
}

async function CliSlotsAll({ component }: { component: ComponentContent }) {
  const base = `@lalit/${component.slug}`
  const cmds: Record<string, string> = {
    npm: `npx shadcn@latest add ${base}`,
    pnpm: `pnpm dlx shadcn@latest add ${base}`,
    yarn: `npx shadcn@latest add ${base}`,
    bun: `bunx shadcn@latest add ${base}`,
  }

  const rendered = await Promise.all(
    Object.entries(cmds).map(async ([pm, cmd]) => ({
      pm,
      cmd,
      html: <HighlightedCode key={pm} code={cmd} lang="bash" />,
    }))
  )

  return (
    <>
      {rendered.map(({ pm, cmd, html }) => (
        <div key={pm} data-pm={pm} className="relative">
          <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
            <CopyButton
              value={cmd}
              label="Copy"
              copiedLabel="Copied"
              size={13}
              className="h-7 w-7 rounded-md border border-border bg-background/90 backdrop-blur-sm"
            />
          </div>
          {html}
        </div>
      ))}
    </>
  )
}

async function DepsSlot({ component, manager }: { component: ComponentContent; manager: string }) {
  if (!component.dependencies?.length) return null
  return (
    <HighlightedCode code={`${manager} install ${component.dependencies.join(' ')}`} lang="bash" />
  )
}

async function ComponentSourceSlot({ component }: { component: ComponentContent }) {
  const code = getComponentSource(component.sourceFile)
  return (
    <ExpandableCode>
      <div className="relative">
        <div className="absolute right-3 top-3 z-10">
          <CopyButton
            value={code}
            label="Copy"
            copiedLabel="Copied"
            size={13}
            className="h-7 w-7 rounded-md border border-border bg-background/90 backdrop-blur-sm"
          />
        </div>
        <HighlightedCode code={code} lang="tsx" />
      </div>
    </ExpandableCode>
  )
}

async function UsageSlot({ component }: { component: ComponentContent }) {
  return (
    <div className="relative">
      <div className="absolute right-3 top-3 z-10">
        <CopyButton
          value={component.usage}
          label="Copy"
          copiedLabel="Copied"
          size={13}
          className="h-7 w-7 rounded-md border border-border bg-background/90 backdrop-blur-sm"
        />
      </div>
      <HighlightedCode code={component.usage} lang="tsx" />
    </div>
  )
}

async function LocalDepsSlot({ component }: { component: ComponentContent }) {
  if (!component.localDeps?.length) return null
  return (
    <ul className="space-y-2">
      {component.localDeps.map((dep) => (
        <li key={dep}>
          <Link
            href={`/components/${dep}`}
            className={cn(
              'inline-flex items-center gap-1.5 text-sm',
              'text-muted-foreground transition-colors hover:text-foreground'
            )}
          >
            <IconExternalLink size={12} className="shrink-0" aria-hidden="true" />
            {dep}
          </Link>
        </li>
      ))}
    </ul>
  )
}

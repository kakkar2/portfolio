import { IconArrowLeft } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ExpandableCode } from '@/components/registry/expandable-code'
import { HighlightedCode } from '@/components/registry/highlighted-code'
import { InstallTabs } from '@/components/registry/install-tabs'
import { PreviewWrapper } from '@/components/registry/preview-wrapper'
import { PropsTable } from '@/components/registry/props-table'
import { buttonVariants } from '@/components/ui/button'
import { CopyButton } from '@/components/ui/copy-button'
import { componentProps, getComponent, getRegistry } from '@/data/registry'
import type { ComponentContent } from '@/lib/components-content'
import { getComponentContent } from '@/lib/components-content'
import { getComponentSource } from '@/lib/mdx'
import { cn } from '@/lib/utils'

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

async function CliSlotsAll({ component }: { component: ComponentContent }) {
  //   const base = `${siteConfig.url}/r/${component.slug}`
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

async function DemoSlot({ component }: { component: ComponentContent }) {
  return (
    <div className="relative">
      <div className="absolute right-3 top-3 z-10">
        <CopyButton
          value={component.demo}
          label="Copy"
          copiedLabel="Copied"
          size={13}
          className="h-7 w-7 rounded-md border border-border bg-background/90 backdrop-blur-sm"
        />
      </div>
      <HighlightedCode code={component.demo} lang="tsx" />
    </div>
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

// ─── Live preview per slug

async function ComponentPreview({ slug }: { slug: string }) {
  const component = getComponentContent(slug)
  if (!component) return null

  const demoSlot = <DemoSlot component={component} />

  if (slug === 'copy-button') {
    return (
      <PreviewWrapper demoSlot={demoSlot}>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-2.5">
          <span className="font-mono text-sm">lalitkakkar50@gmail.com</span>
          <CopyButton
            value="lalitkakkar50@gmail.com"
            label="Copy email"
            copiedLabel="Email copied"
          />
        </div>
      </PreviewWrapper>
    )
  }

  return null
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const component = getComponentContent(slug)
  if (!component) notFound()

  const props = componentProps[slug] ?? []

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
        <h1 className="text-2xl font-semibold tracking-tight">{component.title}</h1>
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
          {component.description}
        </p>
      </div>

      {/* Preview + Code tabs */}
      <div className="mb-12">
        <ComponentPreview slug={slug} />
      </div>

      {/* Features */}
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

      {/* Installation */}
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
        />
      </div>

      {/* Usage */}
      <div className="mb-12 space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground/50">
          Usage
        </h2>
        <UsageSlot component={component} />
      </div>

      {/* Props */}
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

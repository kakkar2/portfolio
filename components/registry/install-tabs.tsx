'use client'

import { useState } from 'react'

import { CodeBlock } from '@/components/mdx/code-block'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { siteConfig } from '@/config/site'
import type { RegistryComponent } from '@/data/registry'
import { cn } from '@/lib/utils'

const PKG_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const
type PkgManager = (typeof PKG_MANAGERS)[number]

function installCmd(pkg: string, manager: PkgManager) {
  const cmds: Record<PkgManager, string> = {
    npm: `npm install ${pkg}`,
    pnpm: `pnpm add ${pkg}`,
    yarn: `yarn add ${pkg}`,
    bun: `bun add ${pkg}`,
  }
  return cmds[manager]
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 font-mono text-xs text-muted-foreground">
        {n}
      </div>
      <div className="flex-1 space-y-3 pt-0.5">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {children}
      </div>
    </div>
  )
}

interface InstallTabsProps {
  component: RegistryComponent
}

export function InstallTabs({ component }: InstallTabsProps) {
  const [pkgManager, setPkgManager] = useState<PkgManager>('npm')

  const cliCommand = `npx shadcn@latest add ${siteConfig.url}/r/${component.slug}`
  const manualCode = component.files[0]?.content ?? ''
  const hasDeps = component.dependencies && component.dependencies.length > 0

  return (
    <Tabs defaultValue="cli" className="w-full">
      <TabsList className="mb-6 h-9 rounded-lg bg-muted p-1">
        <TabsTrigger value="cli" className="rounded-md text-xs">
          CLI
        </TabsTrigger>
        <TabsTrigger value="manual" className="rounded-md text-xs">
          Manual
        </TabsTrigger>
      </TabsList>

      {/* ── CLI ── */}
      <TabsContent value="cli" className="mt-0">
        <div className="space-y-6">
          <Step n={1} title="Run the shadcn CLI command">
            <CodeBlock>
              <code>{cliCommand}</code>
            </CodeBlock>
            <p className="text-xs text-muted-foreground">
              This installs the component directly into your project. Update the import paths to
              match your folder structure.
            </p>
          </Step>
        </div>
      </TabsContent>

      {/* ── Manual ── */}
      <TabsContent value="manual" className="mt-0">
        <div className="space-y-8">
          {/* Step 1 — deps */}
          {hasDeps && (
            <Step n={1} title="Install dependencies">
              {/* Package manager switcher */}
              <div className="mb-2 flex gap-1 rounded-lg border border-border bg-muted/30 p-1 w-fit">
                {PKG_MANAGERS.map((pm) => (
                  <button
                    key={pm}
                    onClick={() => setPkgManager(pm)}
                    className={cn(
                      'rounded-md px-2.5 py-1 font-mono text-xs transition-colors',
                      pkgManager === pm
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {pm}
                  </button>
                ))}
              </div>
              <CodeBlock>
                <code>{installCmd(component.dependencies!.join(' '), pkgManager)}</code>
              </CodeBlock>
            </Step>
          )}

          {/* Step 2 — copy file */}
          <Step n={hasDeps ? 2 : 1} title="Copy the component into your project">
            <p className="font-mono text-xs text-muted-foreground/60 -mb-1">
              {component.files[0]?.path}
            </p>
            <CodeBlock>
              <code>{manualCode}</code>
            </CodeBlock>
          </Step>

          {/* Step 3 — update imports */}
          <Step n={hasDeps ? 3 : 2} title="Update import paths to match your project setup">
            <p className="text-xs text-muted-foreground">
              Make sure{' '}
              <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">@/lib/utils</code>{' '}
              resolves correctly, or replace it with your own{' '}
              <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">cn()</code> utility.
            </p>
          </Step>
        </div>
      </TabsContent>
    </Tabs>
  )
}

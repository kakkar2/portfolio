'use client'

import { IconExternalLink } from '@tabler/icons-react'
import { useState } from 'react'

import { InstallStep } from '@/components/registry/install-step'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import type { RegistryComponent } from '@/data/registry'
import type { ComponentContent } from '@/lib/components-content'
import { cn } from '@/lib/utils'

const PKG_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const
type PkgManager = (typeof PKG_MANAGERS)[number]

interface InstallTabsProps {
  //   component: RegistryComponent
  component: ComponentContent
  componentSlot: React.ReactNode
  cnSlot: React.ReactNode
  cliSlot: React.ReactNode
  depsCmd?: React.ReactNode
}

export function InstallTabs({
  component,
  componentSlot,
  cnSlot,
  cliSlot,
  depsCmd,
}: InstallTabsProps) {
  const [pkgManager, setPkgManager] = useState<PkgManager>('npm')

  const hasDeps = component.dependencies && component.dependencies.length > 0
  const hasShadcnDeps = component.registryDeps && component.registryDeps.length > 0

  return (
    <Tabs defaultValue="cli" className="w-full">
      <TabsList className="mb-6 h-9 w-fit rounded-lg bg-muted p-1">
        <TabsTrigger value="cli" className="rounded-md text-xs">
          CLI
        </TabsTrigger>
        <TabsTrigger value="manual" className="rounded-md text-xs">
          Manual
        </TabsTrigger>
      </TabsList>

      {/* ── CLI ── */}
      <TabsContent value="cli" className="mt-0">
        <InstallStep n={1} title="Run the shadcn CLI command">
          <div className="space-y-2">
            {/* Package manager switcher */}
            <div className="flex gap-1 rounded-lg border border-border bg-muted/30 p-1 w-fit">
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

            {/* Hide/show each pre-rendered slot based on selected pm */}
            <div
              className="[&>div]:hidden"
              style={{}}
              ref={(el) => {
                if (!el) return
                el.querySelectorAll<HTMLDivElement>('[data-pm]').forEach((div) => {
                  div.style.display = div.dataset.pm === pkgManager ? 'block' : 'none'
                })
              }}
            >
              {cliSlot}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            This installs the component directly. Update import paths to match your setup.
          </p>
        </InstallStep>
      </TabsContent>

      {/* ── Manual ── */}
      <TabsContent value="manual" className="mt-0">
        <div className="space-y-8">
          {/* Step 1 — npm deps */}
          {hasDeps && (
            <InstallStep n={1} title="Install the required dependencies">
              <div className="flex gap-1 rounded-lg border border-border bg-muted/30 p-1 w-fit mb-2">
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
              {depsCmd}
            </InstallStep>
          )}

          {/* Step — cn utility */}
          <InstallStep n={hasDeps ? 2 : 1} title="Add a cn helper">
            <div className="rounded-lg border border-border bg-muted/50 px-3 py-2 font-mono text-xs text-muted-foreground">
              lib/utils.ts
            </div>
            {cnSlot}
          </InstallStep>

          {/* Step — shadcn deps */}
          {hasShadcnDeps && (
            <InstallStep n={hasDeps ? 3 : 2} title="Install the required shadcn/ui components">
              <ul className="space-y-1.5">
                {component.registryDeps!.map((dep) => (
                  <li key={dep}>
                    <a
                      href={`https://ui.shadcn.com/docs/components/${dep}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      <IconExternalLink size={12} aria-hidden="true" />
                      {dep}
                    </a>
                  </li>
                ))}
              </ul>
            </InstallStep>
          )}

          {/* Step — copy component */}
          <InstallStep
            n={[hasDeps, true, hasShadcnDeps].filter(Boolean).length + 1}
            title="Copy and paste the following code into your project"
          >
            <div className="rounded-lg border border-border bg-muted/50 px-3 py-2 font-mono text-xs text-muted-foreground">
              {component.installPath}
            </div>
            {componentSlot}
          </InstallStep>

          {/* Step — update imports */}
          <InstallStep
            n={[hasDeps, true, hasShadcnDeps].filter(Boolean).length + 2}
            title="Update the import paths to match your project setup"
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}

'use client'

import { Icon } from '@iconify/react'
import { IconExternalLink, IconManualGearbox, IconTerminal2 } from '@tabler/icons-react'
import { useState } from 'react'

import { InstallStep } from '@/components/registry/install-step'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ComponentContent } from '@/lib/components-content'
import { cn } from '@/lib/utils'

const PKG_MANAGERS = [
  {
    id: 'npm',
    label: 'npm',
    icon: 'simple-icons:npm',
  },
  {
    id: 'pnpm',
    label: 'pnpm',
    icon: 'simple-icons:pnpm',
  },
  {
    id: 'yarn',
    label: 'yarn',
    icon: 'simple-icons:yarn',
  },
  {
    id: 'bun',
    label: 'bun',
    icon: 'simple-icons:bun',
  },
] as const

type PkgManager = (typeof PKG_MANAGERS)[number]['id']

interface InstallTabsProps {
  component: ComponentContent
  componentSlot: React.ReactNode
  cnSlot: React.ReactNode
  cliSlot: React.ReactNode
  depsCmd?: React.ReactNode
  localDepsSlot?: React.ReactNode
}

export function InstallTabs({
  component,
  componentSlot,
  cnSlot,
  cliSlot,
  depsCmd,
  localDepsSlot,
}: InstallTabsProps) {
  const [pkgManager, setPkgManager] = useState<PkgManager>('npm')

  const hasDeps = component.dependencies && component.dependencies.length > 0
  const hasShadcnDeps = component.registryDeps && component.registryDeps.length > 0
  const hasLocalDeps = !!localDepsSlot

  const baseSteps = [hasDeps, true, hasShadcnDeps, hasLocalDeps].filter(Boolean).length

  const activeManager = PKG_MANAGERS.find((pm) => pm.id === pkgManager) ?? PKG_MANAGERS[0]

  return (
    <Tabs defaultValue="cli" className="w-full">
      <TabsList className="mb-6 h-10 w-fit rounded-lg bg-muted p-1">
        <TabsTrigger
          value="cli"
          className="flex items-center gap-1.5 h-8 rounded-md px-4 py-2 text-xs [&[data-state=active]]:bg-background [&[data-state=active]]:shadow-sm"
        >
          <IconTerminal2 size={13} aria-hidden="true" />
          CLI
        </TabsTrigger>
        <TabsTrigger
          value="manual"
          className="flex items-center gap-1.5 h-8 rounded-md px-4 py-2 text-xs [&[data-state=active]]:bg-background [&[data-state=active]]:shadow-sm"
        >
          <IconManualGearbox size={13} aria-hidden="true" />
          Manual
        </TabsTrigger>
      </TabsList>

      <TabsContent value="cli" className="mt-0">
        <InstallStep n={1} title="Run the shadcn CLI command" isLast>
          <div className="space-y-3">
            <div className="flex items-center rounded-lg border border-border bg-muted/30 p-1 w-fit">
              <div className="flex w-10 items-center justify-center">
                <Icon icon={activeManager.icon} className="size-4" />
              </div>

              <div className="h-5 w-px bg-border mr-1" />

              <div className="flex gap-1 px-1">
                {PKG_MANAGERS.map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPkgManager(pm.id)}
                    className={cn(
                      'rounded-md h-8 px-2.5 py-1 text-xs font-semibold transition-colors',
                      pkgManager === pm.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
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

      <TabsContent value="manual" className="mt-0">
        <div className="pt-4">
          {hasDeps && (
            <InstallStep n={1} title="Install the required dependencies">
              <div className="flex gap-1 rounded-lg border border-border bg-muted/30 p-1 w-fit mb-2">
                {PKG_MANAGERS.map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPkgManager(pm.id)}
                    className={cn(
                      'rounded-md px-2.5 py-1 font-mono text-xs transition-colors',
                      pkgManager === pm.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {pm.label}
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

          {/* Step — local registry deps */}
          {hasLocalDeps && (
            <InstallStep
              n={[hasDeps, true, hasShadcnDeps].filter(Boolean).length + 1}
              title="Install the required registry components"
            >
              {localDepsSlot}
            </InstallStep>
          )}

          {/* Step — copy component */}
          <InstallStep
            n={baseSteps + 1}
            title="Copy and paste the following code into your project"
          >
            <div className="rounded-lg border border-border bg-muted/50 px-3 py-2 font-mono text-xs text-muted-foreground">
              {component.installPath}
            </div>
            {componentSlot}
          </InstallStep>

          {/* Step — update imports */}
          <InstallStep
            n={baseSteps + 2}
            title="Update the import paths to match your project setup"
            isLast
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}

'use client'

import { useEffect, useState } from 'react'

import { CodeBlock } from '@/components/mdx/code-block'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { RegistryComponent } from '@/data/registry'
import { cn } from '@/lib/utils'

interface PreviewWrapperProps {
  children: React.ReactNode
  component: RegistryComponent
  minHeight?: string
}

export function PreviewWrapper({ children, component, minHeight = '220px' }: PreviewWrapperProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const code = component.files[0]?.content ?? ''

  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsList className="mb-4 h-9 rounded-lg bg-muted p-1">
        <TabsTrigger value="preview" className="rounded-md text-xs">
          Preview
        </TabsTrigger>
        <TabsTrigger value="code" className="rounded-md text-xs">
          Code
        </TabsTrigger>
      </TabsList>

      <TabsContent value="preview" className="mt-0">
        {mounted ? (
          <div
            className={cn(
              'relative flex items-center justify-center rounded-xl',
              'border border-border bg-background',
              'p-8',
              '[background-image:radial-gradient(hsl(var(--border))_1px,transparent_1px)]',
              '[background-size:20px_20px]'
            )}
            style={{ minHeight }}
          >
            {children}
          </div>
        ) : (
          <div
            className="animate-pulse rounded-xl border border-border bg-muted/30"
            style={{ minHeight }}
          />
        )}
      </TabsContent>

      <TabsContent value="code" className="mt-0">
        <CodeBlock>
          <code>{code}</code>
        </CodeBlock>
      </TabsContent>
    </Tabs>
  )
}

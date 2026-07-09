'use client'

import { IconDeviceImac, IconTerminal2 } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface PreviewWrapperProps {
  children: React.ReactNode
  demoSlot: React.ReactNode
  minHeight?: string
}

export function PreviewWrapper({ children, demoSlot, minHeight = '220px' }: PreviewWrapperProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsList className="mb-1 h-10 w-fit rounded-lg bg-muted p-1">
        <TabsTrigger
          value="preview"
          className="flex items-center gap-1.5 h-8 rounded-md px-4 py-2 text-xs [&[data-state=active]]:bg-background [&[data-state=active]]:shadow-sm"
        >
          <IconDeviceImac size={13} aria-hidden="true" />
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className="flex items-center gap-1.5 h-8 rounded-md px-4 py-2 text-xs [&[data-state=active]]:bg-background [&[data-state=active]]:shadow-sm"
        >
          <IconTerminal2 size={13} aria-hidden="true" />
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
              'bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)]',
              'bg-size-[20px_20px]'
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
        {demoSlot}
      </TabsContent>
    </Tabs>
  )
}

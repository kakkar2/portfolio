'use client'

import { type ComponentProps, useRef } from 'react'

import { CopyButton } from '@/components/ui/copy-button'
import { cn } from '@/lib/utils'

export function CodeBlock({ children, className, ...props }: ComponentProps<'pre'>) {
  const preRef = useRef<HTMLPreElement>(null)

  return (
    <div className="not-prose relative my-6">
      <pre
        ref={preRef}
        className={cn(
          'overflow-x-auto rounded-lg border border-border',
          'bg-muted/50 px-4 py-4 text-sm leading-relaxed',
          className
        )}
        {...props}
      >
        {children}
      </pre>

      {/* <div className="absolute right-2 top-2 z-10"> */}
      <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
        <CopyButton
          getValue={() => preRef.current?.textContent ?? ''}
          label="Copy code"
          copiedLabel="Copied"
          size={13}
          className="h-7 w-7 rounded-md border border-border bg-background/90 backdrop-blur-sm"
        />
      </div>
    </div>
  )
}

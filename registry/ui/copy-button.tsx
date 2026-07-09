'use client'

import { IconCheck, IconCopy } from '@tabler/icons-react'
import { useState } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  value?: string
  getValue?: () => string
  label?: string
  copiedLabel?: string
  duration?: number
  size?: number
  className?: string
}

export function CopyButton({
  value,
  getValue,
  label = 'Copy',
  copiedLabel = 'Copied',
  duration = 2000,
  size = 14,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (copied) return
    const text = getValue ? getValue() : (value ?? '')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), duration)
    } catch {}
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleCopy}
          aria-label={copied ? copiedLabel : label}
          title={copied ? copiedLabel : label}
          className={cn(
            'rounded-md p-1.5 transition-colors cursor-pointer',
            'text-muted-foreground hover:bg-muted hover:text-foreground',
            copied && 'text-emerald-500 hover:text-emerald-500',
            className
          )}
        >
          {copied ? (
            <IconCheck size={size} aria-hidden="true" />
          ) : (
            <IconCopy size={size} aria-hidden="true" />
          )}
        </button>
      </TooltipTrigger>

      {!copied && (
        <TooltipContent side="bottom" className="flex items-center gap-3">
          Copy
        </TooltipContent>
      )}
    </Tooltip>
  )
}

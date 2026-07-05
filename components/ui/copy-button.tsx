'use client'

import { IconCheck, IconCopy } from '@tabler/icons-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

interface CopyButtonProps {
  /** The text value to copy to clipboard */
  value?: string
  /** Accessible label shown before copy. Defaults to "Copy" */
  getValue?: () => string
  /** Dynamic getter — used when value isn't known at render time (e.g. code blocks) */
  label?: string
  /** Accessible label shown after copy. Defaults to "Copied" */
  copiedLabel?: string
  /** How long to show the copied state in ms. Defaults to 2000 */
  duration?: number
  /** Icon size. Defaults to 14 */
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
    } catch {
      // Clipboard API unavailable — silently ignore
    }
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

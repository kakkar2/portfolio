'use client'

import { IconBrandLinkedin, IconBrandX, IconCheck, IconLink, IconShare2 } from '@tabler/icons-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface ShareMenuProps {
  title: string
  url: string
  className?: string
}

type ShareTarget = {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  href: (title: string, url: string) => string
}

const SHARE_TARGETS: ShareTarget[] = [
  {
    id: 'x',
    label: 'Share on X',
    icon: IconBrandX,
    href: (title, url) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    id: 'linkedin',
    label: 'Share on LinkedIn',
    icon: IconBrandLinkedin,
    href: (_, url) => `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
]

const itemCls = cn(
  'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2',
  'text-sm text-muted-foreground transition-colors',
  'hover:bg-accent hover:text-foreground'
)

export function ShareMenu({ title, url, className }: ShareMenuProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Share" className={cn('size-9', className)}>
          <IconShare2 size={16} aria-hidden="true" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={6} className="w-48 p-1.5">
        {/* Social targets */}
        {SHARE_TARGETS.map(({ id, label, icon: Icon, href }) => (
          <a
            key={id}
            href={href(title, url)}
            target="_blank"
            rel="noopener noreferrer"
            className={itemCls}
          >
            <Icon size={15} aria-hidden="true" />
            {label}
          </a>
        ))}

        <Separator className="my-1" />

        {/* Copy link */}
        <button onClick={handleCopy} className={itemCls}>
          {copied ? (
            <IconCheck
              size={15}
              className="text-emerald-500 dark:text-emerald-400"
              aria-hidden="true"
            />
          ) : (
            <IconLink size={15} aria-hidden="true" />
          )}
          <span
            className={cn('transition-colors', copied && 'text-emerald-500 dark:text-emerald-400')}
          >
            {copied ? 'Copied!' : 'Copy link'}
          </span>
        </button>
      </PopoverContent>
    </Popover>
  )
}

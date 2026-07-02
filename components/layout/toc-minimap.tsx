'use client'

import { useMemo, useState } from 'react'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { useActiveHeading } from '@/hooks/use-active-heading'
import { cn } from '@/lib/utils'

export type TOCItemType = {
  title: React.ReactNode
  url: string
  depth: number
  meta?: {
    type: string
    message: string
  }
}

export type TOCMinimapProps = {
  /** @fumadocsHref #tocitemtype */
  items: TOCItemType[]
  className?: string
}

export function TOCMinimap({ items, className }: TOCMinimapProps) {
  const [open, setOpen] = useState(false)
  const itemIds = useMemo(() => items.map((item) => item.url.replace('#', '')), [items])

  const activeHeading = useActiveHeading(itemIds)

  if (!items.length) {
    return null
  }

  return (
    <div
      className={cn(
        'ml-auto flex justify-end transition-[width] duration-300',
        open ? 'w-18' : 'w-52',
        className
      )}
    >
      <HoverCard openDelay={0} closeDelay={0} onOpenChange={setOpen}>
        <HoverCardTrigger asChild>
          <div className="flex max-h-[50dvh] flex-col gap-3 overflow-hidden py-3 pl-6 opacity-100 transition-opacity duration-200 data-popup-open:opacity-0">
            {items.map((item) => (
              <div key={item.url} className="flex items-center justify-end gap-3">
                {item.url === `#${activeHeading}` && item.meta && (
                  <span className="max-w-45 whitespace-nowrap font-mono text-[10px] text-muted-foreground">
                    <span className="font-semibold">{item.meta.type}</span>: {item.meta.message}
                  </span>
                )}

                <div
                  data-depth={item.depth}
                  data-active={item.url === `#${activeHeading}`}
                  className={cn(
                    'h-0.5 w-6 shrink-0 rounded-xs bg-ring/50 transition-all duration-300',
                    'data-[depth=3]:ml-2 data-[depth=3]:w-4',
                    'data-[depth=4]:ml-4 data-[depth=4]:w-2',
                    'data-active:w-10 data-active:bg-foreground'
                  )}
                />
              </div>
            ))}
          </div>
        </HoverCardTrigger>

        <HoverCardContent
          className="w-56 overflow-hidden p-0 duration-200 data-[side=left]:slide-in-from-right-3 data-[side=left]:slide-out-to-right-3 data-open:zoom-in-100 data-closed:zoom-out-100"
          align="start"
          alignOffset={0}
          side="left"
          sideOffset={-60}
        >
          <div className="flex max-h-[50dvh] overflow-y-auto overscroll-contain">
            <ul className="flex size-full flex-col px-6 py-4 text-sm">
              {items.map((item) => (
                <li key={item.url} className="flex py-1">
                  <a
                    href={item.url}
                    data-depth={item.depth}
                    data-active={item.url === `#${activeHeading}`}
                    className={cn(
                      'line-clamp-2 w-full transition-[color] duration-200',
                      'text-muted-foreground hover:text-foreground data-active:text-foreground',
                      'data-[depth=3]:pl-4 data-[depth=4]:pl-8'
                    )}
                    onClick={handleItemClick}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

function handleItemClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  const url = e.currentTarget.getAttribute('href') ?? ''
  scrollToHeading(url)
}

function scrollToHeading(url: string) {
  history.pushState(null, '', url)
  document.getElementById(url.replace('#', ''))?.scrollIntoView({
    behavior: 'smooth',
  })
}

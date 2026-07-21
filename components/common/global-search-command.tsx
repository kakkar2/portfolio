'use client'

import { IconArrowRight, IconFileText, IconLayoutDashboard, IconPuzzle } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

import { Kbd } from '../ui/kbd'

type Category = 'page' | 'component' | 'blog'

export type SearchItem = {
  id: string
  title: string
  description?: string
  href: string
  category: Category
  tags?: string[]
}

const GROUPS: {
  category: Category
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}[] = [
  { category: 'page', label: 'Pages', icon: IconLayoutDashboard },
  { category: 'component', label: 'Components', icon: IconPuzzle },
  { category: 'blog', label: 'Blog', icon: IconFileText },
]

const HINTS = [
  { keys: ['↑', '↓'], label: 'navigate' },
  { keys: ['↵'], label: 'select' },
  { keys: ['esc'], label: 'close' },
]

export function GlobalSearchCommand({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  // Cmd+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((p) => !p)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Navbar trigger
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('lalit:search-open', handler)
    return () => window.removeEventListener('lalit:search-open', handler)
  }, [])

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router]
  )

  return (
    <CommandDialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) setQuery('')
      }}
      className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <Command>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search pages, components, posts..."
        />

        <CommandList>
          <CommandEmpty>No results for &ldquo;{query}&rdquo;</CommandEmpty>

          {GROUPS.map((group, i) => {
            const groupItems = items.filter((item) => item.category === group.category)
            if (!groupItems.length) return null
            const Icon = group.icon

            return (
              <div key={group.category}>
                {i > 0 && <CommandSeparator />}
                <CommandGroup heading={group.label}>
                  {groupItems.map((item) => (
                    <CommandItem
                      key={item.id}
                      // value = what cmdk filters against
                      value={[item.title, item.description, ...(item.tags ?? [])]
                        .filter(Boolean)
                        .join(' ')}
                      onSelect={() => handleSelect(item.href)}
                      className="flex items-center gap-3"
                    >
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-muted/60">
                        <Icon size={13} className="text-muted-foreground" aria-hidden="true" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-medium text-foreground">
                          {item.title}
                        </span>
                        {item.description && (
                          <span className="truncate text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        )}
                      </div>
                      <IconArrowRight
                        size={13}
                        className="shrink-0 text-muted-foreground/30"
                        aria-hidden="true"
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            )
          })}
        </CommandList>

        {/* Keyboard hints */}
        <div className="flex items-center justify-between border-t border-border px-4 py-1.5">
          <div className="flex items-center gap-4">
            {HINTS.filter((hint) => hint.label !== 'close').map(({ keys, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-xs text-muted-foreground/40"
              >
                {keys.map((k) => (
                  <Kbd
                    key={k}
                    className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted/50 px-1 font-mono text-[10px] text-muted-foreground/60"
                  >
                    {k}
                  </Kbd>
                ))}
                {label}
              </span>
            ))}
          </div>

          <span className="flex items-center gap-1.5 text-xs text-muted-foreground/40">
            <Kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted/50 px-1 font-mono text-[10px] text-muted-foreground/60">
              esc
            </Kbd>
            close
          </span>
        </div>
      </Command>
    </CommandDialog>
  )
}

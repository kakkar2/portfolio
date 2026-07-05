export type ComponentCategory = 'ui' | 'layout' | 'section'

export type PropRow = {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

export type RegistryComponent = {
  slug: string
  name: string
  description: string
  category: ComponentCategory
  features: string[]
  dependencies?: string[]
  registryDeps?: string[]
  tags: string[]
  usage: string // usage code snippet
  files: {
    path: string
    content: string
  }[]
  props: PropRow[]
}

export const registry: RegistryComponent[] = [
  {
    slug: 'copy-button',
    name: 'Copy Button',
    description:
      'A minimal button that copies any text to the clipboard with a smooth icon transition.',
    category: 'ui',
    features: [
      'Copies static strings or dynamically reads from a DOM ref at click time.',
      'Smooth icon swap from copy to check with a 2s reset.',
      'Fully accessible — aria-label updates on state change.',
      'Accepts a custom duration, icon size, and className.',
    ],
    dependencies: [],
    registryDeps: [],
    tags: ['button', 'clipboard', 'utility'],
    usage: `import { CopyButton } from "@/components/ui/copy-button"

// Static value
<CopyButton value="Hello world" />

// Dynamic value from a DOM ref
const ref = useRef<HTMLPreElement>(null)
<CopyButton getValue={() => ref.current?.textContent ?? ""} />

// Inside a pill
<div className="flex items-center gap-2 rounded-lg border px-4 py-2.5">
  <span className="font-mono text-sm">lalitkakkar50@gmail.com</span>
  <CopyButton
    value="lalitkakkar50@gmail.com"
    label="Copy email"
    copiedLabel="Email copied"
  />
</div>`,
    files: [
      {
        path: 'components/ui/copy-button.tsx',
        content: `"use client"

import { useState } from "react"
import { IconCopy, IconCheck } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

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
  label = "Copy",
  copiedLabel = "Copied",
  duration = 2000,
  size = 14,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (copied) return
    const text = getValue ? getValue() : (value ?? "")
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), duration)
    } catch {}
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : label}
      title={copied ? copiedLabel : label}
      className={cn(
        "rounded-md p-1.5 transition-colors",
        "text-muted-foreground hover:bg-muted hover:text-foreground",
        copied && "text-emerald-500 hover:text-emerald-500",
        className,
      )}
    >
      {copied
        ? <IconCheck size={size} aria-hidden="true" />
        : <IconCopy  size={size} aria-hidden="true" />
      }
    </button>
  )
}`,
      },
    ],
    props: [
      { name: 'value', type: 'string', description: 'Static text to copy to clipboard.' },
      {
        name: 'getValue',
        type: '() => string',
        description: 'Dynamic getter — called at click time. Useful for DOM refs.',
      },
      {
        name: 'label',
        type: 'string',
        default: '"Copy"',
        description: 'Accessible label before copy.',
      },
      {
        name: 'copiedLabel',
        type: 'string',
        default: '"Copied"',
        description: 'Accessible label after copy.',
      },
      {
        name: 'duration',
        type: 'number',
        default: '2000',
        description: 'How long to show the copied state in ms.',
      },
      { name: 'size', type: 'number', default: '14', description: 'Icon size in px.' },
      {
        name: 'className',
        type: 'string',
        description: 'Additional classes for the button element.',
      },
    ],
  },
]

export function getComponent(slug: string) {
  return registry.find((c) => c.slug === slug) ?? null
}

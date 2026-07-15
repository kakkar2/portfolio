import { getAllComponentMeta, getComponentMeta } from '@/lib/components-content'

export type PropRow = {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

export const componentProps: Record<string, PropRow[]> = {
  'copy-button': [
    { name: 'value', type: 'string', description: 'Static text to copy to clipboard.' },
    {
      name: 'getValue',
      type: '() => string',
      description: 'Dynamic getter — called at click time.',
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
      description: 'How long to show copied state in ms.',
    },
    { name: 'size', type: 'number', default: '14', description: 'Icon size in px.' },
    { name: 'className', type: 'string', description: 'Additional classes for the button.' },
  ],
  'package-manager-tabs': [
    {
      name: 'commands',
      type: 'Commands',
      required: true,
      description: 'Per-package-manager command strings. Keys: npm, pnpm, yarn, bun.',
    },
    {
      name: 'variant',
      type: '"default" | "glass"',
      default: '"default"',
      description:
        'Visual style. "glass" renders a frosted-glass surface with backdrop blur, optimised for both light and dark modes.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional classes for the root wrapper.',
    },
  ],
}

export function getRegistry() {
  return getAllComponentMeta()
}

export function getComponent(slug: string) {
  return getComponentMeta(slug)
}

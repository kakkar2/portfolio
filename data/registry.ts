// export type ComponentCategory = 'ui' | 'layout' | 'section'
// export type PropRow = {
//   name: string
//   type: string
//   default?: string
//   description: string
//   required?: boolean
// }
// export type RegistryComponent = {
//   slug: string
//   name: string
//   description: string
//   icon: string
//   category: ComponentCategory
//   features: string[]
//   dependencies?: string[]
//   registryDeps?: string[]
//   tags: string[]
//   demo: string
//   usage: string
//   sourceFile: string
//   props: PropRow[]
//   installPath: string
// }
// export const registry: RegistryComponent[] = [
//   {
//     slug: 'copy-button',
//     name: 'Copy Button',
//     icon: 'IconCopy',
//     description:
//       'A minimal button that copies any text to the clipboard with a smooth icon transition.',
//     category: 'ui',
//     features: [
//       'Copies static strings or dynamically reads from a DOM ref at click time.',
//       'Smooth icon swap from copy to check with a 2s reset.',
//       'Tooltip confirms the action — disappears after copy.',
//       'Fully accessible — aria-label updates on state change.',
//     ],
//     dependencies: [],
//     registryDeps: ['tooltip'],
//     tags: ['button', 'clipboard', 'utility'],
//     sourceFile: 'registry/ui/copy-button.tsx',
//     installPath: 'components/ui/copy-button.tsx',
//     demo: `import { CopyButton } from "@/components/ui/copy-button"
// export default function CopyButtonDemo() {
//   return (
//     <div className="flex items-center gap-4">
//       <CopyButton value="Hello world" />
//       <div className="flex items-center gap-2 rounded-lg border px-4 py-2.5">
//         <span className="font-mono text-sm">lalitkakkar50@gmail.com</span>
//         <CopyButton
//           value="lalitkakkar50@gmail.com"
//           label="Copy email"
//           copiedLabel="Email copied"
//         />
//       </div>
//     </div>
//   )
// }`,
//     usage: `import { CopyButton } from "@/components/ui/copy-button"
// // Static value
// <CopyButton value="Hello world" />
// // Dynamic value from a DOM ref
// const ref = useRef<HTMLPreElement>(null)
// <CopyButton getValue={() => ref.current?.textContent ?? ""} />`,
//     props: [
//       { name: 'value', type: 'string', description: 'Static text to copy.' },
//       {
//         name: 'getValue',
//         type: '() => string',
//         description: 'Dynamic getter — called at click time.',
//       },
//       {
//         name: 'label',
//         type: 'string',
//         default: '"Copy"',
//         description: 'Accessible label before copy.',
//       },
//       {
//         name: 'copiedLabel',
//         type: 'string',
//         default: '"Copied"',
//         description: 'Accessible label after copy.',
//       },
//       {
//         name: 'duration',
//         type: 'number',
//         default: '2000',
//         description: 'How long to show copied state in ms.',
//       },
//       { name: 'size', type: 'number', default: '14', description: 'Icon size in px.' },
//       { name: 'className', type: 'string', description: 'Additional classes for the button.' },
//     ],
//   },
// ]
// export function getComponent(slug: string) {
//   return registry.find((c) => c.slug === slug) ?? null
// }
import { type ComponentMeta, getAllComponentMeta } from '@/lib/components-content'

export type ComponentCategory = 'ui' | 'layout' | 'section'

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
}

export function getRegistry() {
  return getAllComponentMeta()
}

export function getComponent(slug: string) {
  return getAllComponentMeta().find((c) => c.slug === slug) ?? null
}

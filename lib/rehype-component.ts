import fs from 'fs'
import path from 'path'
import type { Node } from 'unist'
import { u } from 'unist-builder'
import { visit } from 'unist-util-visit'

interface MdxJsxAttribute extends Node {
  name: string
  value: unknown
}

interface MdxJsxNode extends Node {
  name?: string
  attributes?: MdxJsxAttribute[]
  children?: Node[]
}

export function rehypeComponent() {
  return (tree: Node) => {
    visit(tree, (node: MdxJsxNode) => {
      if (node.name !== 'ComponentPreview') return

      const nameProp = node.attributes?.find((a) => a.name === 'name')
      if (!nameProp?.value) return

      const demoPath = path.join(process.cwd(), `registry/examples/${nameProp.value}.tsx`)
      if (!fs.existsSync(demoPath)) return

      const raw = fs.readFileSync(demoPath, 'utf-8')

      node.children = node.children ?? []
      node.children.push(
        u('element', {
          tagName: 'pre',
          properties: {},
          children: [
            u('element', {
              tagName: 'code',
              properties: { className: ['language-tsx'] },
              children: [{ type: 'text', value: raw.trim() }],
            }),
          ],
        })
      )
    })
  }
}

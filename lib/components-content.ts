import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content/components')

export type ComponentMeta = {
  slug: string
  name: string
  title: string
  description: string
  icon: string
  category: string
  tags: string[]
  dependencies: string[]
  registryDeps: string[]
  sourceFile: string
  installPath: string
}

export type ComponentContent = ComponentMeta & {
  features: string[]
  demo: string
  usage: string
  body: string
}

export function getComponentMeta(slug: string): ComponentMeta | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(raw)
  //   return data as ComponentMeta
  return {
    slug,
    ...(data as Omit<ComponentMeta, 'slug'>),
  }
}

export function getComponentContent(slug: string): ComponentContent | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    ...(data as Omit<ComponentMeta, 'slug'>),
    features: extractFeatures(content),
    demo: extractCodeBlock(content, 'Demo'),
    usage: extractCodeBlock(content, 'Usage'),
    body: content,
  }
}

export function getAllComponentMeta(): ComponentMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => getComponentMeta(f.replace(/\.mdx$/, '')))
    .filter(Boolean) as ComponentMeta[]
}

/** Extract bullet points under a ## heading as a string array */
function extractFeatures(content: string): string[] {
  const match = content.match(/## Features\n([\s\S]*?)(?=\n##|$)/)
  if (!match) return []
  return match[1]
    .split('\n')
    .map((l) => l.replace(/^[-*]\s+/, '').trim())
    .filter(Boolean)
    .map((l) => l.replace(/`([^`]+)`/g, '$1')) // strip backtick formatting
}

/** Extract the code block under a ## heading */
function extractCodeBlock(content: string, heading: string): string {
  const pattern = new RegExp(`## ${heading}\\n+\`\`\`(?:tsx|ts|jsx|js|bash)?\\n([\\s\\S]*?)\`\`\``)
  const match = content.match(pattern)
  return match ? match[1].trimEnd() : ''
}

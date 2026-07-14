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
  localDeps: string[]
  sourceFile: string
  installPath: string
}

export type ComponentContent = ComponentMeta & {
  features: string[]
  usage: string
}

export function getComponentMeta(slug: string): ComponentMeta | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(raw)
  return {
    slug,
    ...(data as Omit<ComponentMeta, 'slug'>),
    localDeps: (data.localDeps as string[] | undefined) ?? [],
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
    localDeps: (data.localDeps as string[] | undefined) ?? [],
    features: extractFeatures(content),
    usage: extractCodeBlock(content, 'Usage'),
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

/** Read a registry component source file from disk */
export function getComponentSource(sourceFile: string): string {
  const filePath = path.join(process.cwd(), sourceFile)
  if (!fs.existsSync(filePath)) return ''
  return fs.readFileSync(filePath, 'utf-8')
}

function extractFeatures(content: string): string[] {
  const match = content.match(/## Features\n([\s\S]*?)(?=\n##|$)/)
  if (!match) return []
  return match[1]
    .split('\n')
    .map((l) => l.replace(/^[-*]\s+/, '').trim())
    .filter(Boolean)
    .map((l) => l.replace(/`([^`]+)`/g, '$1'))
}

function extractCodeBlock(content: string, heading: string): string {
  const pattern = new RegExp(`## ${heading}\\n+\`\`\`(?:tsx|ts|jsx|js|bash)?\\n([\\s\\S]*?)\`\`\``)
  const match = content.match(pattern)
  return match ? match[1].trimEnd() : ''
}

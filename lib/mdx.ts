import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

export type BlogPostMeta = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: string
}

export type BlogPost = BlogPostMeta & { content: string }

export function getBlogPosts(): BlogPostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
      const { data } = matter(raw)

      return {
        slug,
        title: data.title ?? '',
        description: data.description ?? '',
        date: data.date ?? '',
        tags: data.tags ?? [],
        readingTime: readingTime(raw).text,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    tags: data.tags ?? [],
    readingTime: readingTime(raw).text,
    content,
  }
}

// export function getComponentSource(sourceFile: string): string {
//   const filePath = path.join(process.cwd(), sourceFile)
//   if (!fs.existsSync(filePath)) return ''
//   return fs.readFileSync(filePath, 'utf-8')
// }

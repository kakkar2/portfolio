import { getAllComponentMeta } from '@/lib/components-content'
import { getBlogPosts } from '@/lib/mdx'

import { GlobalSearchCommand, type SearchItem } from './global-search-command'

const PAGE_ITEMS: SearchItem[] = [
  {
    id: 'page-projects',
    title: 'Projects',
    description: 'Things I have built',
    href: '/projects',
    category: 'page',
  },
  {
    id: 'page-components',
    title: 'Components',
    description: 'Open-source component registry',
    href: '/components',
    category: 'page',
  },
  {
    id: 'page-blog',
    title: 'Blog',
    description: 'Writing on engineering and open source',
    href: '/blog',
    category: 'page',
  },
  {
    id: 'page-resume',
    title: 'Resume',
    description: 'Work history and skills',
    href: '/resume',
    category: 'page',
  },
]

export function GlobalSearch() {
  const components = getAllComponentMeta()
  const posts = getBlogPosts()

  const componentItems: SearchItem[] = components.map((c) => ({
    id: `component-${c.slug}`,
    title: c.title,
    description: c.description,
    href: `/components/${c.slug}`,
    category: 'component',
    tags: c.tags,
  }))

  const blogItems: SearchItem[] = posts.map((p) => ({
    id: `blog-${p.slug}`,
    title: p.title,
    description: p.description,
    href: `/blog/${p.slug}`,
    category: 'blog',
    tags: p.tags,
  }))

  return <GlobalSearchCommand items={[...PAGE_ITEMS, ...componentItems, ...blogItems]} />
}

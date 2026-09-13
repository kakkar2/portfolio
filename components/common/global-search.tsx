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
  const posts = getBlogPosts()

  const blogItems: SearchItem[] = posts.map((p) => ({
    id: `blog-${p.slug}`,
    title: p.title,
    description: p.description,
    href: `/blog/${p.slug}`,
    category: 'blog',
    tags: p.tags,
  }))

  return <GlobalSearchCommand items={[...PAGE_ITEMS, ...blogItems]} />
}

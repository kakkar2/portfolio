import { TOCItemType } from '@/components/layout/toc-minimap'

export const homeTocItems: TOCItemType[] = [
  {
    title: 'Introduction',
    url: '#hero',
    depth: 2,
    meta: { type: 'feat', message: 'introduce myself' },
  },
  {
    title: 'Experience',
    url: '#experience',
    depth: 2,
    meta: { type: 'feat', message: 'build production software' },
  },
  {
    title: 'Projects',
    url: '#projects',
    depth: 2,
    meta: { type: 'feat', message: 'ship developer tools' },
  },
  {
    title: 'Stack',
    url: '#stack',
    depth: 2,
    meta: { type: 'chore', message: 'learn continuously' },
  },
  {
    title: 'Writing',
    url: '#blog',
    depth: 2,
    meta: {
      type: 'docs',
      message: 'write things down',
    },
  },
  {
    title: 'Contact',
    url: '#contact',
    depth: 2,
    meta: { type: 'docs', message: "let's connect" },
  },
]

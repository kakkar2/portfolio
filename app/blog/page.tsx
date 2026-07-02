import { IconRss } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { getBlogPosts } from '@/lib/mdx'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog',
  description: `Writing on open source, developer tooling, and web development by ${siteConfig.name}.`,
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <main className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 min-h-screen">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
          <p className="text-sm text-muted-foreground">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>

        <a
          href="/blog/feed.xml"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="RSS feed"
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'h-9 w-9 text-muted-foreground hover:text-foreground'
          )}
        >
          <IconRss size={16} aria-hidden="true" />
        </a>
      </div>

      {/* Posts list */}
      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No posts yet. Check back soon.</p>
      ) : (
        <div role="list" className="divide-y divide-border">
          {posts.map((post) => (
            <article
              key={post.slug}
              role="listitem"
              className="group relative py-6 first:border-t border-border"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
                aria-label={post.title}
              >
                <span className="sr-only">{post.title}</span>
              </Link>

              {/* Date + read time */}
              <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground/60">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
              </div>

              {/* Title */}
              <h2 className="mb-2 text-base font-medium text-foreground transition-colors group-hover:text-foreground/80">
                {post.title}
              </h2>

              {/* Description */}
              <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>

              {/* Tags */}
              {post.tags.length > 0 && (
                <ul className="flex flex-wrap gap-1.5" role="list">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <span className="relative z-10 inline-flex items-center rounded-md border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

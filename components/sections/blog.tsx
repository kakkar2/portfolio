'use client'

import { IconArrowRight } from '@tabler/icons-react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import type { BlogPostMeta } from '@/lib/mdx'
import { cn } from '@/lib/utils'

// ─── Variants

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const reducedItemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
}

export function BlogSection({ posts }: { posts: BlogPostMeta[] }) {
  const prefersReducedMotion = useReducedMotion()
  const resolved = prefersReducedMotion ? reducedItemVariants : itemVariants

  if (posts.length === 0) return null

  return (
    <section aria-labelledby="blog-heading" id="blog" className="py-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Header */}
        <motion.div variants={resolved} className="mb-8 flex items-center justify-between">
          <h2 id="blog-heading" className="text-xl font-semibold tracking-tight">
            Writing
          </h2>
          <Link
            href="/blog"
            aria-label="View all posts"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'gap-1.5 text-muted-foreground hover:text-foreground'
            )}
          >
            View all
            <IconArrowRight size={14} aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Post list
        <div
          role="list"
          className="divide-y divide-border border-y border-border"
        >
          {posts.map((post) => (
            <motion.article
              key={post.slug}
              role="listitem"
              variants={resolved}
              className="group relative py-5"
            >
              Stretch link
              <Link
                href={`/blog/${post.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
                aria-label={post.title}
              >
                <span className="sr-only">{post.title}</span>
              </Link>

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-foreground/70">
                    {post.title}
                  </h3>
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    {post.description}
                  </p>
                </div>

                <time
                  dateTime={post.date}
                  className="shrink-0 text-xs tabular-nums text-muted-foreground/50"
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>
            </motion.article>
          ))}
        </div> */}
        {/* Post grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <motion.article
              key={post.slug}
              variants={resolved}
              className={cn(
                'group relative flex flex-col gap-3 rounded-xl',
                'border border-border/60 bg-card p-5',
                'transition-all duration-200 hover:border-border hover:bg-muted/20'
              )}
            >
              {/* Stretch link */}
              <Link
                href={`/blog/${post.slug}`}
                className="after:absolute after:inset-0 after:rounded-xl after:content-['']"
                aria-label={post.title}
              >
                <span className="sr-only">{post.title}</span>
              </Link>

              {/* Date + read time */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground/50 tabular-nums">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-foreground/70">
                {post.title}
              </h3>

              {/* Description */}
              <p className="flex-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
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
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

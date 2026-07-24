import { IconArrowLeft } from '@tabler/icons-react'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { mdxComponents } from '@/components/mdx/mdx-components'
import { buttonVariants } from '@/components/ui/button'
import { ShareMenu } from '@/components/ui/share-menu'
import { siteConfig } from '@/config/site'
import { getBlogPost, getBlogPosts } from '@/lib/mdx'
import { cn } from '@/lib/utils'

// Pre-render all known slugs at build time
export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const shareUrl = `${siteConfig.url}/blog/${slug}`

  return (
    <main className="container mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 pt-24 pb-24">
      <div className="flex items-center justify-between mb-10 gap-4">
        <Link
          href="/blog"
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            '-ml-3 gap-1.5 text-muted-foreground hover:text-foreground'
          )}
        >
          <IconArrowLeft size={14} aria-hidden="true" />
          Back to blog
        </Link>

        <ShareMenu
          title={post.title}
          url={shareUrl}
          className="-mr-2 shrink-0 text-muted-foreground hover:text-foreground"
        />
      </div>

      {/* Header */}
      <header className="mb-10 space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground/60">
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

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>

        <p className="text-lg text-muted-foreground leading-relaxed">{post.description}</p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" role="list">
            {post.tags.map((tag) => (
              <li key={tag}>
                <span className="inline-flex items-center rounded-md border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        )}
      </header>

      <hr className="border-border mb-10" />

      {/* MDX content */}
      <article
        className={cn(
          'prose prose-sm sm:prose max-w-none dark:prose-invert',
          'prose-headings:font-semibold prose-headings:tracking-tight',
          'prose-a:text-foreground prose-a:underline-offset-4',
          'prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5',
          'prose-code:text-foreground prose-code:font-mono prose-code:text-[0.85em]',
          'prose-code:before:content-none prose-code:after:content-none'
        )}
      >
        <MDXRemote source={post.content} components={mdxComponents} />
      </article>
    </main>
  )
}

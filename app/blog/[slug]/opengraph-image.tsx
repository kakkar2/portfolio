import { ImageResponse } from '@vercel/og'

import { siteConfig } from '@/config/site'
import { getBlogPost } from '@/lib/mdx'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  return new ImageResponse(
    <div
      style={{
        background: '#09090b',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        fontFamily: 'sans-serif',
      }}
    >
      <p style={{ fontSize: '20px', color: '#52525b', margin: 0 }}>{siteConfig.name} · Blog</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h1
          style={{
            fontSize: post?.title && post.title.length > 50 ? '52px' : '64px',
            fontWeight: 700,
            color: '#fafafa',
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {post?.title ?? 'Blog Post'}
        </h1>
        <p style={{ fontSize: '22px', color: '#71717a', margin: 0 }}>{post?.readingTime ?? ''}</p>
      </div>

      <p style={{ fontSize: '18px', color: '#3f3f46', margin: 0 }}>
        {siteConfig.url.replace('https://', '')}
      </p>
    </div>,
    { ...size }
  )
}

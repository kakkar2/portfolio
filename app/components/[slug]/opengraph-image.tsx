import { ImageResponse } from '@vercel/og'

import { siteConfig } from '@/config/site'
import { getComponentMeta } from '@/lib/components-content'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({ params }: { params: { slug: string } }) {
  const component = getComponentMeta(params.slug)

  const title = component?.title ?? params.slug
  const description = component?.description ?? ''
  const tags = component?.tags?.slice(0, 3) ?? []

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
      {/* Top — label */}
      <p
        style={{
          fontSize: '18px',
          color: '#52525b',
          margin: 0,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {siteConfig.name} · Component
      </p>

      {/* Middle — title + description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h1
          style={{
            fontSize: title.length > 22 ? '56px' : '72px',
            fontWeight: 700,
            color: '#fafafa',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h1>

        {description ? (
          <p
            style={{
              fontSize: '22px',
              color: '#71717a',
              margin: 0,
              lineHeight: 1.5,
              maxWidth: '820px',
            }}
          >
            {description}
          </p>
        ) : null}
      </div>

      {/* Bottom — site url + tags */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: '18px', color: '#3f3f46', margin: 0 }}>
          {siteConfig.url.replace('https://', '')}
        </p>

        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px' }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  background: '#18181b',
                  border: '1px solid #27272a',
                  color: '#52525b',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>,
    { ...size }
  )
}

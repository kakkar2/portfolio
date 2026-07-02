import { ImageResponse } from '@vercel/og'

import { siteConfig } from '@/config/site'

export const runtime = 'edge'
export const alt = siteConfig.name
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
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
      {/* Top — name + role */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p
          style={{
            fontSize: '22px',
            color: '#71717a',
            margin: 0,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {siteConfig.url.replace('https://', '')}
        </p>
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 700,
            color: '#fafafa',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {siteConfig.name}
        </h1>
        <p
          style={{
            fontSize: '28px',
            color: '#a1a1aa',
            margin: 0,
          }}
        >
          {siteConfig.role}
        </p>
      </div>

      {/* Bottom — tech tags */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Open Source'].map((tag) => (
          <span
            key={tag}
            style={{
              padding: '8px 16px',
              background: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '8px',
              fontSize: '16px',
              color: '#71717a',
              fontFamily: 'monospace',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>,
    { ...size }
  )
}

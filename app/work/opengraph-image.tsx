import { ImageResponse } from '@vercel/og'

import { siteConfig } from '@/config/site'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Change this per page
const pageTitle = 'Work'

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
      {/* Top */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ fontSize: '20px', color: '#52525b', margin: 0 }}>{siteConfig.name}</p>
        <h1
          style={{
            fontSize: '80px',
            fontWeight: 700,
            color: '#fafafa',
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          {pageTitle}
        </h1>
      </div>

      {/* Bottom */}
      <p style={{ fontSize: '22px', color: '#52525b', margin: 0 }}>
        {siteConfig.url.replace('https://', '')}
      </p>
    </div>,
    { ...size }
  )
}

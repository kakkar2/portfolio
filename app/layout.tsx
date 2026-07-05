import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'

import { ContentRails } from '@/components/layout/content-rails'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { ScrollToTop } from '@/components/layout/scroll-to-top'
import { ThemePresetProvider } from '@/components/providers/theme-preset-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { schema, siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: `${siteConfig.bio} ${siteConfig.featuredPackage.name} — ${siteConfig.featuredPackage.description}`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  verification: {
    google: 'nIviTjkP_9c6gaLSROd35qIe1sRv_7vMezqgeEbsjWg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.bio,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.bio,
    creator: '@LalitKakkar7',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={siteConfig.name}
          href="/blog/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body
        className={cn(
          spaceGrotesk.variable,
          'min-h-screen bg-background font-sans text-foreground antialiased'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemePresetProvider>
            <TooltipProvider>
              <Navbar />
              <ContentRails />
              {children}
              <Footer />
              <Analytics />
              <SpeedInsights />
              <ScrollToTop />
            </TooltipProvider>
          </ThemePresetProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

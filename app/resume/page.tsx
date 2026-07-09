import { IconDownload } from '@tabler/icons-react'
import type { Metadata } from 'next'

import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Resume',
  description: `Resume of ${siteConfig.name} — Full Stack Developer & Open Source Maintainer.`,
}

export default function ResumePage() {
  // Convert preview URL to download URL for the download button
  const downloadUrl = siteConfig.resumeUrl.replace('/preview', '/view')

  return (
    <main className="container mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 pt-24 pb-16">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Resume</h1>
          <p className="text-sm text-muted-foreground">Last updated · {new Date().getFullYear()}</p>
        </div>

        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open resume in Google Drive"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-2')}
        >
          <IconDownload size={14} aria-hidden="true" />
          Open in Drive
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="overflow-hidden rounded-xl border border-border bg-muted/20">
        <iframe
          src={siteConfig.resumeUrl}
          title={`${siteConfig.name} — Resume`}
          className="h-[80vh] w-full"
          allow="autoplay"
        />
      </div>
    </main>
  )
}

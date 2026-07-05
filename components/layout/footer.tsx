'use client'

import { ThemeDock } from '@/components/layout/theme-dock'
import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <div className="container mx-auto max-w-3xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/50 group">
            Designed and built by{' '}
            <span className="text-muted-foreground group-hover:text-primary transition-colors duration-200">
              {siteConfig.name}
            </span>
            {' · '}
            <a
              href={`${siteConfig.links.github}/portfolio`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-muted-foreground hover:underline"
            >
              Source on GitHub
            </a>
          </p>

          <ThemeDock />
        </div>
      </div>
    </footer>
  )
}

'use client'

import { ThemeDock } from '@/components/layout/theme-dock'
import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-border">
      <div className="container relative mx-auto flex max-w-3xl flex-col justify-between px-5 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
          <p className="text-xs text-muted-foreground/50 group">
            &copy; {new Date().getFullYear()} Built by{' '}
            <span className="text-muted-foreground group-hover:text-primary transition-colors duration-200 cursor-pointer">
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

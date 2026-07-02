import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/50">
            Designed and built by <span className="text-muted-foreground">{siteConfig.name}</span>
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
        </div>
      </div>
    </footer>
  )
}

'use client'

import { IconBrandGithub, IconBrandNpm, IconDownload, IconExternalLink } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import type { Project } from '@/data/projects'
import { cn } from '@/lib/utils'

const TYPE_STYLES: Record<Project['type'], string> = {
  'open-source': 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  personal: 'border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400',
  professional: 'border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400',
}

const TYPE_LABELS: Record<Project['type'], string> = {
  'open-source': 'Open source',
  personal: 'Personal',
  professional: 'Professional',
}

export function ProjectCard({ project }: { project: Project }) {
  const [downloads, setDownloads] = useState<number | null>(null)
  const primaryHref = project.links.live ?? project.links.github ?? project.links.npm

  useEffect(() => {
    if (!project.npmPackage) return
    fetch(`/api/npm-stats?pkg=${project.npmPackage}`)
      .then((r) => r.json())
      .then((d) => setDownloads(d.downloads ?? null))
      .catch(() => {})
  }, [project.npmPackage])

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col gap-4 rounded-xl',
        'border border-border/60 bg-card p-5',
        'transition-all duration-200 hover:border-border hover:bg-muted/20'
      )}
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          {/* Type badge */}
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
              TYPE_STYLES[project.type]
            )}
          >
            {TYPE_LABELS[project.type]}
          </span>

          {/* Title */}
          <h3 className="font-mono text-sm font-semibold text-foreground">
            {primaryHref ? (
              <a
                href={primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} — opens in new tab`}
                className="after:absolute after:inset-0 after:rounded-xl after:content-['']"
              >
                {project.name}
              </a>
            ) : (
              project.name
            )}
          </h3>
        </div>

        {/* Right side — downloads or WIP */}
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {project.wip && (
            <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
              WIP
            </span>
          )}
          {downloads !== null && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground/60 tabular-nums">
              <IconDownload size={11} aria-hidden="true" />
              <span>{downloads.toLocaleString()}/mo</span>
            </div>
          )}
        </div>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

      <div className="flex items-end justify-between gap-3">
        {/* Tech pills */}
        <ul className="flex flex-wrap gap-1.5" role="list" aria-label="Technologies used">
          {project.tech.map((t) => (
            <li key={t}>
              <span className="inline-flex items-center rounded-md border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                {t}
              </span>
            </li>
          ))}
        </ul>

        <div className="relative z-10 flex shrink-0 items-center gap-0.5">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <IconBrandGithub size={15} aria-hidden="true" />
            </a>
          )}
          {project.links.npm && (
            <a
              href={project.links.npm}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on npm`}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <IconBrandNpm size={15} aria-hidden="true" />
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live demo`}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <IconExternalLink size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

'use client'

import { IconBrandGithub } from '@tabler/icons-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { GitHubCalendar } from 'react-github-calendar'

import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { DEFAULT_THEME, THEME_PRESETS } from '@/data/theme-presets'
import { cn } from '@/lib/utils'
import { containerVariants, resolveVariants } from '@/lib/variants'

import { useThemePreset } from '../providers/theme-preset-provider'

export function GithubActivitySection() {
  const { resolvedTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()
  const resolved = resolveVariants(prefersReducedMotion)
  const [mounted, setMounted] = useState(false)
  const { preset } = useThemePreset()
  const activePreset =
    THEME_PRESETS.find((p) => p.id === preset) ?? THEME_PRESETS.find((p) => p.id === DEFAULT_THEME)!

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <section aria-labelledby="github-heading" id="github" className="py-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.div variants={resolved} className="mb-8 flex items-center justify-between">
          <h2 id="github-heading" className="text-xl font-semibold tracking-tight">
            GitHub Activity
          </h2>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View GitHub profile"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'gap-1.5 text-muted-foreground hover:text-foreground'
            )}
          >
            <IconBrandGithub size={14} aria-hidden="true" />
            @kakkar2
          </Link>
        </motion.div>

        {/* Calendar */}
        <motion.div
          variants={resolved}
          className={cn(
            'rounded-xl border border-border bg-muted/20 p-5',
            '[&_.react-activity-calendar]:!font-mono',
            '[&_.react-activity-calendar]:w-full',
            '[&_.react-activity-calendar_svg]:w-full',
            '[&_.react-activity-calendar_svg]:h-auto'
          )}
          //   className={cn(
          //     'overflow-x-auto rounded-xl border border-border bg-muted/20 p-5',
          //     '[&_.react-activity-calendar]:!font-mono'
          //   )}
        >
          {mounted ? (
            <GitHubCalendar
              username="kakkar2"
              colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
              theme={activePreset.calendar}
              blockSize={11}
              blockMargin={4}
              fontSize={11}
              labels={{
                legend: { less: 'Less', more: 'More' },
                totalCount: '{{count}} contributions in the last year',
              }}
            />
          ) : (
            <div className="h-28 w-full animate-pulse rounded-lg bg-muted/50" />
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}

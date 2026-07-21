'use client'

import { IconArrowUpRight } from '@tabler/icons-react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { siteConfig } from '@/config/site'
import { SOCIAL_LINKS } from '@/data/social-links'

import RoleFlip from '../common/role-flip'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const reducedItemVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const resolvedItemVariants = prefersReducedMotion ? reducedItemVariants : itemVariants

  return (
    <section aria-label="Introduction" className="pt-24 pb-10 md:pt-32 relative" id="hero">
      {/* Dashed Top Right Fade Grid */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
        style={{
          backgroundImage: `
      linear-gradient(to right, var(--border) 1px, transparent 1px),
      linear-gradient(to bottom, var(--border) 1px, transparent 1px)
    `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 0',
          maskImage: `
      repeating-linear-gradient(
        to right,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      repeating-linear-gradient(
        to bottom,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)
    `,
          WebkitMaskImage: `
      repeating-linear-gradient(
        to right,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      repeating-linear-gradient(
        to bottom,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)
    `,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />

      <motion.div
        className="flex max-w-3xl flex-col items-start gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={resolvedItemVariants}>
          <Badge variant="secondary" className="gap-2 rounded-full px-3 py-2.5 text-sm font-normal">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to opportunities
          </Badge>
        </motion.div>

        <motion.div variants={resolvedItemVariants} className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {siteConfig.name}
          </h1>
          <RoleFlip />
        </motion.div>

        <motion.p
          variants={resolvedItemVariants}
          className="max-w-xl text-base leading-relaxed text-muted-foreground"
        >
          {siteConfig.bio}
        </motion.p>

        <motion.div variants={resolvedItemVariants} className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/resume">
              View Resume
              <IconArrowUpRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/work">Experience</Link>
          </Button>
        </motion.div>

        <motion.nav
          variants={resolvedItemVariants}
          aria-label="Social links"
          className="-ml-2 flex items-center gap-1"
        >
          {SOCIAL_LINKS.map(({ label, href, icon: Icon, external }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-muted-foreground transition-colors hover:text-foreground group"
                  asChild
                >
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                  >
                    <Icon
                      className="size-4 sm:size-5 group-hover:text-primary transition-colors duration-200"
                      aria-hidden="true"
                    />
                  </a>
                </Button>
              </TooltipTrigger>

              <TooltipContent side="bottom" className="text-xs font-medium">
                {label}
              </TooltipContent>
            </Tooltip>
          ))}
        </motion.nav>
      </motion.div>
    </section>
  )
}

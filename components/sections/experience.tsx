'use client'

import { IconArrowRight } from '@tabler/icons-react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

import { WorkExperience } from '@/components/sections/work-experience'
import { buttonVariants } from '@/components/ui/button'
import { experiences } from '@/data/experience'
import { cn } from '@/lib/utils'

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const reducedVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
}

interface ExperienceSectionProps {
  /** Pass a number to limit entries (home page). Omit to show all (/work page). */
  limit?: number
}

export function ExperienceSection({ limit }: ExperienceSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const resolved = prefersReducedMotion ? reducedVariants : sectionVariants
  const items = limit ? experiences.slice(0, limit) : experiences

  return (
    <section aria-labelledby="experience-heading" className="py-6" id="experience">
      <motion.div
        variants={resolved}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id="experience-heading" className="text-xl font-semibold tracking-tight">
            Experience
          </h2>
          {limit && (
            <Link
              href="/work"
              aria-label="View all work experience"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'gap-1.5 text-muted-foreground hover:text-foreground'
              )}
            >
              View all
              <IconArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
        </div>

        <WorkExperience experiences={items} />
      </motion.div>
    </section>
  )
}

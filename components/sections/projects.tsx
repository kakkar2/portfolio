'use client'

import { IconArrowRight } from '@tabler/icons-react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

import { ProjectCard } from '@/components/cards/project-card'
import { buttonVariants } from '@/components/ui/button'
import { projects } from '@/data/projects'
import { cn } from '@/lib/utils'

// ─── Variants

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const reducedItemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
}

interface ProjectsSectionProps {
  /** true  → home page, shows featured only + "View all" link
   *  false → /projects page, shows everything */
  featured?: boolean
}

export function ProjectsSection({ featured = true }: ProjectsSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const resolved = prefersReducedMotion ? reducedItemVariants : itemVariants
  const items = featured ? projects.filter((p) => p.featured) : projects

  return (
    <section aria-labelledby="projects-heading" className="py-6" id="projects">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Header row */}
        <motion.div variants={resolved} className="mb-8 flex items-center justify-between">
          <h2 id="projects-heading" className="text-xl font-semibold tracking-tight">
            Projects
          </h2>
          {featured && (
            <Link
              href="/projects"
              aria-label="View all projects"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'gap-1.5 text-muted-foreground hover:text-foreground'
              )}
            >
              View all
              <IconArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((project) => (
            <motion.div key={project.id} variants={resolved}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

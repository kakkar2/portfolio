'use client'

import { IconMail, IconPhone } from '@tabler/icons-react'
import { motion, useReducedMotion } from 'framer-motion'

import { siteConfig } from '@/config/site'
import { CONTACT_SOCIAL_LINKS } from '@/data/social-links'
import { cn } from '@/lib/utils'

import { CopyButton } from '../ui/copy-button'

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

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion()
  const resolved = prefersReducedMotion ? reducedItemVariants : itemVariants

  return (
    <section aria-labelledby="contact-heading" className="py-6" id="contact">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="space-y-8"
      >
        <motion.div variants={resolved} className="space-y-3">
          <h2
            id="contact-heading"
            className="flex items-center gap-2.5 text-xl sm:text-2xl font-semibold tracking-tight"
          >
            {/* <IconSend2 size={20} className="text-muted-foreground" aria-hidden="true" /> */}
            Get in touch
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Open to full-time roles, freelance work, and open-source collaboration. My inbox is
            always open.
          </p>
        </motion.div>

        <motion.div variants={resolved}>
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground/50">Contact</p>
          <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-border rounded-xl border border-border bg-muted/30 overflow-hidden hover:bg-secondary/20 transition-colors duration-200">
            {/* Email */}
            <div className="flex items-center gap-2.5 px-4 py-3 group">
              <IconMail
                size={15}
                className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors duration-200"
                aria-hidden="true"
              />
              <a
                href={siteConfig.links.email}
                className="font-mono text-sm text-foreground underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
              <CopyButton
                value={siteConfig.email}
                label="Copy email address"
                copiedLabel="Email copied"
              />
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2.5 px-4 py-3 group">
              <IconPhone
                size={15}
                className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors duration-200"
                aria-hidden="true"
              />
              <a
                href={`tel:${siteConfig.phone}`}
                className="font-mono text-sm text-foreground underline-offset-4 hover:underline"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div variants={resolved}>
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground/50">
            Elsewhere
          </p>
          <nav aria-label="Social links" className="-ml-1.5 flex flex-wrap items-center gap-1">
            {CONTACT_SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 group',
                  'text-xs text-muted-foreground',
                  'border border-transparent transition-all duration-150',
                  'hover:border-border hover:bg-muted/50 hover:text-foreground'
                )}
              >
                <Icon
                  size={14}
                  className="group-hover:text-primary transition-colors duration-200"
                  aria-hidden="true"
                />
                {label}
              </a>
            ))}
          </nav>
        </motion.div>
      </motion.div>
    </section>
  )
}

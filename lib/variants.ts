import type { Variants } from 'framer-motion'

/** Stagger wrapper — use on the parent motion.div */
export const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

/** Hero stagger wrapper — slightly longer stagger with delayChildren */
export const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

/** Fade up — default for all section items */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/** Hero fade up — slightly more pronounced y */
export const heroItemVariants: Variants = {
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

/** Reduced motion — opacity only, no y movement */
export const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

/** Returns correct variant based on reduced motion preference */
export function resolveVariants(prefersReducedMotion: boolean | null): Variants {
  return prefersReducedMotion ? reducedItemVariants : itemVariants
}

export function resolveHeroVariants(prefersReducedMotion: boolean | null): Variants {
  return prefersReducedMotion ? reducedItemVariants : heroItemVariants
}

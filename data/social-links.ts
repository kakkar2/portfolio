import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandNpm,
  IconBrandX,
  IconMail,
  IconPackage,
} from '@tabler/icons-react'

import { siteConfig } from '@/config/site'

export const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: siteConfig.links.github,
    icon: IconBrandGithub,
    external: true,
  },
  {
    label: 'Twitter / X',
    href: siteConfig.links.twitter,
    icon: IconBrandX,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: IconBrandLinkedin,
    external: true,
  },
  {
    label: 'npm',
    href: siteConfig.links.npm,
    icon: IconPackage,
    external: true,
  },
  {
    label: 'Email',
    href: siteConfig.links.email,
    icon: IconMail,
    external: false,
  },
] as const

export const CONTACT_SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: siteConfig.links.github,
    icon: IconBrandGithub,
  },
  {
    label: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: IconBrandLinkedin,
  },
  {
    label: 'Twitter / X',
    href: siteConfig.links.twitter,
    icon: IconBrandX,
  },
  {
    label: 'npm',
    href: siteConfig.links.npm,
    icon: IconBrandNpm,
  },
] as const

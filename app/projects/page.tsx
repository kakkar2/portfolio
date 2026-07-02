import type { Metadata } from 'next'

import { ProjectsSection } from '@/components/sections/projects'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Projects',
  description: `Open-source packages, personal builds, and professional work by ${siteConfig.name}.`,
}

export default function ProjectsPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 min-h-screen">
      <ProjectsSection featured={false} />
    </main>
  )
}

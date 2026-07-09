import type { Metadata } from 'next'

import { ExperienceSection } from '@/components/sections/experience'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Work',
  description: `Full work history and experience of ${siteConfig.name}.`,
}

export default function WorkPage() {
  return (
    <main className="container mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 pt-24">
      <ExperienceSection />
    </main>
  )
}

import { BlogSection } from '@/components/sections/blog'
import { ContactSection } from '@/components/sections/contact'
import { ExperienceSection } from '@/components/sections/experience'
import { Hero } from '@/components/sections/hero'
import { ProjectsSection } from '@/components/sections/projects'
import { StackSection } from '@/components/sections/stack'
import { getBlogPosts } from '@/lib/mdx'

export default function Home() {
  const recentPosts = getBlogPosts().slice(0, 3)

  return (
    <main className="container max-w-3xl mx-auto px-5 sm:px-6">
      <Hero />
      <ExperienceSection limit={2} />
      <ProjectsSection featured />
      <StackSection />
      <BlogSection posts={recentPosts} />
      <ContactSection />
    </main>
  )
}

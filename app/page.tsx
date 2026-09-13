import { BlogSection } from '@/components/sections/blog'
import { ContactSection } from '@/components/sections/contact'
import { ExperienceSection } from '@/components/sections/experience'
import { Hero } from '@/components/sections/hero'
import { ProjectsSection } from '@/components/sections/projects'
import { StackSection } from '@/components/sections/stack'
import { Separator } from '@/components/ui/separator'
import { getBlogPosts } from '@/lib/mdx'

export default function Home() {
  const recentPosts = getBlogPosts().slice(0, 3)

  return (
    <main className="container max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
      <Hero />
      <Separator variant="rail" className="my-1" />
      <ExperienceSection limit={2} />
      <Separator variant="rail" className="my-1" />
      <ProjectsSection featured />
      <Separator variant="rail" className="my-1" />
      <StackSection />
      <BlogSection posts={recentPosts} />
      <Separator variant="rail" className="my-1" />
      <ContactSection />
    </main>
  )
}

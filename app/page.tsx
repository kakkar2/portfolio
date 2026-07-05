import { TOCMinimap } from '@/components/layout/toc-minimap'
import { BlogSection } from '@/components/sections/blog'
import { ContactSection } from '@/components/sections/contact'
import { ExperienceSection } from '@/components/sections/experience'
import { GithubActivitySection } from '@/components/sections/github-activity'
import { Hero } from '@/components/sections/hero'
import { ProjectsSection } from '@/components/sections/projects'
import { StackSection } from '@/components/sections/stack'
import { homeTocItems } from '@/data/toc-items'
import { getBlogPosts } from '@/lib/mdx'

export default function Home() {
  const recentPosts = getBlogPosts().slice(0, 3)

  return (
    <main className="container max-w-3xl mx-auto sm:px-6 lg:px-8">
      <div className="hidden md:block fixed right-6 top-1/2 z-50 -translate-y-1/2">
        <TOCMinimap items={homeTocItems} />
      </div>

      <Hero />
      <ExperienceSection limit={2} />
      <ProjectsSection featured />
      <StackSection />
      <GithubActivitySection />
      <BlogSection posts={recentPosts} />
      <ContactSection />
    </main>
  )
}

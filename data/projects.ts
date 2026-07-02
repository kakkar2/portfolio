export type ProjectType = 'open-source' | 'personal' | 'professional'

export type Project = {
  id: string
  name: string
  description: string
  tech: string[]
  links: {
    github?: string
    npm?: string
    live?: string
  }
  featured: boolean
  type: ProjectType
  npmPackage?: string // for fetching download stats later
  wip?: boolean
}

export const projects: Project[] = [
  {
    id: 'create-prodkit',
    name: 'create-prodkit',
    description:
      'Framework-agnostic DX tooling CLI for JS/TS projects. Sets up Husky, commitlint, release-it, Prettier with import sorting, and an optional cn() utility — invoked via npx create-prodkit init.',
    tech: ['Node.js', 'TypeScript', 'CLI'],
    links: {
      github: 'https://github.com/kakkar2/create-prodkit',
      npm: 'https://www.npmjs.com/package/create-prodkit',
    },
    featured: true,
    type: 'open-source',
    npmPackage: 'create-prodkit',
  },
  {
    id: 'blog-platform',
    name: 'Blog Platform',
    description:
      'Full-stack blogging platform with secure authentication, role-based access control, and interactive commenting. MongoDB Atlas for cloud database, deployed on Vercel.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express.js', 'JWT'],
    links: {
      // github: "https://github.com/kakkar2/blog-platform",
    },
    featured: true,
    type: 'personal',
  },
]

export type StackItem = {
  name: string
  icon?: string
}

export type StackCategory = {
  id: string
  label: string
  items: StackItem[]
}

export const stack: StackCategory[] = [
  {
    id: 'language',
    label: 'Language',
    items: [
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'JavaScript', icon: 'logos:javascript' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'React.js', icon: 'logos:react' },
      { name: 'Next.js', icon: 'logos:nextjs-icon' },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
      { name: 'shadcn/ui', icon: 'simple-icons:shadcnui' },
      { name: 'Framer Motion', icon: 'simple-icons:framer' },
      { name: 'Redux Toolkit', icon: 'logos:redux' },
      { name: 'TanStack Query', icon: 'simple-icons:tanstack' },
      { name: 'React Native', icon: 'logos:react' },
      { name: 'Expo', icon: 'simple-icons:expo' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      { name: 'Node.js', icon: 'logos:nodejs-icon' },
      { name: 'Express.js', icon: 'simple-icons:express' },
      { name: 'NestJS', icon: 'logos:nestjs' },
      { name: 'REST APIs', icon: 'mdi:api' },
      { name: 'JWT', icon: 'simple-icons:jsonwebtokens' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    items: [
      { name: 'MongoDB', icon: 'logos:mongodb-icon' },
      { name: 'PostgreSQL', icon: 'logos:postgresql' },
      { name: 'Firebase', icon: 'logos:firebase' },
      { name: 'Drizzle', icon: 'simple-icons:drizzle' },
      { name: 'Mongoose', icon: 'simple-icons:mongoose' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    items: [
      { name: 'Git', icon: 'logos:git-icon' },
      { name: 'GitHub', icon: 'mdi:github' },
      { name: 'Vercel', icon: 'logos:vercel-icon' },
      { name: 'npm', icon: 'logos:npm-icon' },
      { name: 'Postman', icon: 'logos:postman-icon' },
      { name: 'Cloudinary', icon: 'simple-icons:cloudinary' },
    ],
  },
  {
    id: 'open-source',
    label: 'Open Source',
    items: [
      {
        name: 'create-prodkit',
        icon: 'logos:npm-icon',
      },
    ],
  },
]

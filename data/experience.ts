export type ExperiencePosition = {
  id: string
  title: string
  employmentPeriod: {
    start: string // "MM.YYYY"
    end?: string // omit for Present
  }
  employmentType?: string
  description?: string
  skills?: string[]
  isExpanded?: boolean
}

export type ExperienceItem = {
  id: string
  companyName: string
  companyLogo?: string
  companyWebsite?: string
  positions: ExperiencePosition[]
  isCurrentEmployer?: boolean
}

export const experiences: ExperienceItem[] = [
  {
    id: 'pingmedia',
    companyName: 'PingMedia Tech Solutions',
    // companyWebsite: "https://pingmediatech.com",
    isCurrentEmployer: true,
    positions: [
      {
        id: 'pingmedia-fullstack',
        title: 'Full Stack Developer',
        employmentPeriod: { start: '12.2024' },
        employmentType: 'Full-time',
        isExpanded: true,
        description: `
- Built the frontend of an AI career-counseling platform where users can pause and resume assessments; the same approach was reused across other internal products.
- Led the rollout of role-based access control for 5 user roles, fixing unprotected routes and setting clear permission rules across the platform.
- Designed the role-management API and wrote its documentation, helping the frontend team integrate roles and permissions faster.
- Combined scattered data-fetching code into one reusable layer with automatic token handling, reducing repeated bugs and speeding up feature work.
- Integrated cloud-based image upload and storage using S3, improving media handling.
        `.trim(),
        skills: [
          'React.js',
          'Next.js',
          'TypeScript',
          'Node.js',
          'Express.js',
          'MongoDB',
          'PostgreSQL',
          'JWT',
          'REST APIs',
          'Zustand',
          'Redux Toolkit',
          'TanStack Query',
          'S3 Bucket',
        ],
      },
      {
        id: 'pingmedia-frontend',
        title: 'Frontend Developer',
        employmentPeriod: { start: '06.2024', end: '12.2024' },
        employmentType: 'Full-time',
        description: `
- Improved app loading speed using code splitting, Suspense streaming, and WebP images, raising Lighthouse performance from 23 to ~70.
- Built smooth page transitions and animations for a landing page and 4 supporting pages.
- Built reusable UI components that kept the interface consistent and sped up development across projects.
        `.trim(),
        skills: [
          'React.js',
          'Next.js',
          'TypeScript',
          'TailwindCSS',
          'Framer Motion',
          'Redux Toolkit',
          'REST APIs',
        ],
      },
    ],
  },
  {
    id: 'anands-valley',
    companyName: 'Anands Valley',
    positions: [
      {
        id: 'anands-webdev',
        title: 'Web Developer',
        employmentPeriod: { start: '06.2023', end: '04.2024' },
        employmentType: 'Full-time',
        description: `
- Built and customized client websites to meet business needs, delivering new features and design updates.
- Built responsive website frontends from Figma designs, matching the designs closely across devices.
        `.trim(),
        skills: ['HTML', 'CSS', 'JavaScript', 'Figma'],
      },
    ],
  },
]

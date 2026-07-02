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
- Led frontend development for an AI-based career counseling platform, implementing dynamic user flows, session management, and personalized user journeys.
- Designed a unified frontend architecture enabling seamless switching between multiple internal products while maintaining consistent UI/UX and shared layouts.
- Built reusable components and custom hooks, reducing development time and improving code maintainability across projects.
- Implemented secure authentication and role-based authorization using JWT, protecting sensitive routes and user data.
- Integrated cloud-based image upload and storage solutions (S3 Bucket), improving media handling efficiency.
- Collaborated closely with backend teams for REST API integration, ensuring reliable data flow and consistent application behavior.
        `.trim(),
        skills: [
          'React.js',
          'Node.js',
          'MongoDB',
          'TypeScript',
          'Express.js',
          'JWT',
          'PostgreSQL',
          'S3 Bucket',
          'REST APIs',
          'Redux Toolkit',
          'TanStack Query',
        ],
      },
      {
        id: 'pingmedia-frontend',
        title: 'Frontend Developer',
        employmentPeriod: { start: '06.2024', end: '12.2024' },
        employmentType: 'Full-time',
        description: `
- Developed scalable client-facing applications using React and MongoDB, ensuring responsive UI and high performance across devices.
- Built reusable UI components and optimized performance using code splitting and lazy loading, improving initial load time and user experience.
        `.trim(),
        skills: ['React.js', 'TypeScript', 'TailwindCSS', 'Redux Toolkit', 'REST APIs'],
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
- Designed and customized WordPress websites, including theme modifications tailored to client-specific needs.
- Extended existing websites with dynamic PHP-based features and custom functionality.
- Improved site performance, leading to better page speed scores and increased search visibility.
- Handled website deployment, hosting setups, and troubleshooting to keep projects stable and accessible.
        `.trim(),
        skills: ['WordPress', 'PHP', 'HTML', 'CSS', 'Performance Optimization'],
      },
    ],
  },
]

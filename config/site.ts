export const siteConfig = {
  name: 'Lalit Kakkar',
  role: 'Full Stack Developer',
  bio: 'I build scalable web applications and clean user interfaces. I enjoy crafting good developer experience and occasionally ship side projects.',
  url: 'https://lalitkakkar.vercel.app',
  email: 'lalitkakkar50@gmail.com',
  phone: '+91-8433408211',
  resumeUrl: 'https://drive.google.com/file/d/1d3O0BILXMaeBrF0IuZ5--oqSdeWbrczj/preview',
  links: {
    github: 'https://github.com/kakkar2',
    twitter: 'https://x.com/LalitKakkar7',
    linkedin: 'https://linkedin.com/in/lalit-kakkar50',
    email: 'mailto:lalitkakkar50@gmail.com',
    npm: 'https://www.npmjs.com/package/create-prodkit',
  },
  featuredPackage: {
    name: 'create-prodkit',
    href: 'https://www.npmjs.com/package/create-prodkit',
    description: 'a framework-agnostic DX setup tool for any JS/TS project.',
  },
}

export const schema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  jobTitle: siteConfig.role,
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.twitter,
    siteConfig.links.npm,
  ],
  knowsAbout: [
    'React.js',
    'Next.js',
    'TypeScript',
    'Node.js',
    'MongoDB',
    'Full Stack Development',
    'Open Source',
  ],
}

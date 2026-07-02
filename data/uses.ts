export type UsesItem = {
  name: string
  description: string
  href?: string
  devicon?: string
}

export type UsesCategory = {
  id: string
  label: string
  items: UsesItem[]
}

export const uses: UsesCategory[] = [
  {
    id: 'editor',
    label: 'Editor',
    items: [
      {
        name: 'VS Code',
        description:
          'Main editor. Lightweight enough for quick edits, powerful enough for everything else.',
        href: 'https://code.visualstudio.com',
        devicon: 'devicon-vscode-plain colored',
      },
      {
        name: 'Cursor',
        description: 'AI-native fork of VS Code. Use it for heavier refactoring sessions.',
        href: 'https://cursor.sh',
      },
    ],
  },
  {
    id: 'terminal',
    label: 'Terminal',
    items: [
      {
        name: 'iTerm2',
        description:
          'Better split panes, hotkey window, and profile management than the built-in Terminal.',
        href: 'https://iterm2.com',
      },
      {
        name: 'Zsh',
        description: 'Default shell. Oh My Zsh for plugins and themes.',
        devicon: 'devicon-bash-plain',
      },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [
      {
        name: 'Postman',
        description: 'API testing and documentation.',
        href: 'https://www.postman.com',
        devicon: 'devicon-postman-plain colored',
      },
      {
        name: 'GitHub',
        description: 'All personal and open-source projects. SSH auth only.',
        href: 'https://github.com',
        devicon: 'devicon-github-original',
      },
      {
        name: 'Vercel',
        description: 'Deploys every project. Zero config for Next.js.',
        href: 'https://vercel.com',
        devicon: 'devicon-vercel-plain',
      },
    ],
  },
  {
    id: 'stack',
    label: 'Daily stack',
    items: [
      {
        name: 'Next.js',
        description: 'Default choice for any new web project.',
        devicon: 'devicon-nextjs-plain',
      },
      {
        name: 'TypeScript',
        description: 'Non-negotiable. JS without it feels wrong now.',
        devicon: 'devicon-typescript-plain colored',
      },
      {
        name: 'Tailwind CSS',
        description: 'v4 is a significant upgrade — the new CSS-first config is much cleaner.',
        devicon: 'devicon-tailwindcss-plain colored',
      },
      {
        name: 'MongoDB',
        description: 'Default database for most projects via Mongoose or Drizzle.',
        devicon: 'devicon-mongodb-plain colored',
      },
    ],
  },
]

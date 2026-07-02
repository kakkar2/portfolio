# lalitkakkar.vercel.app

Personal portfolio website built with Next.js 15, TypeScript, and Tailwind CSS v4.

[![Deploy with Vercel](https://vercel.com/button)](https://lalitkakkar.vercel.app)

## Tech Stack

| Layer     | Choice                      |
| --------- | --------------------------- |
| Framework | Next.js 16                  |
| Language  | TypeScript                  |
| Styling   | Tailwind CSS v4 + shadcn/ui |
| Animation | Framer Motion               |
| Content   | MDX via next-mdx-remote     |
| Icons     | Tabler Icons + Devicons     |
| Analytics | Vercel Analytics            |
| Font      | Space Grotesk               |
| Deploy    | Vercel                      |

## Features

- Animated hero with role flip effect
- Work experience timeline with collapsible positions and duration calculation
- Projects grid with type badges and GitHub/npm/live links
- Tech stack table with Devicon brand icons
- MDX blog with code blocks, copy button, and RSS feed
- Resume viewer embedded from Google Drive
- Dynamic OG images per page via `@vercel/og`
- JSON-LD Person schema for Google rich results
- Dark/light mode with `next-themes`
- TOC minimap for in-page navigation
- Animated content rails with scroll progress indicator and section labels
- Sitemap and robots.txt auto-generated

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── blog/               # Blog listing + MDX post pages
│   │   ├── [slug]/         # Dynamic post page
│   │   └── feed.xml/       # RSS feed route handler
│   ├── projects/           # All projects page
│   ├── resume/             # Google Drive resume viewer
│   ├── work/               # Full work experience page
│   ├── layout.tsx          # Root layout, metadata, JSON-LD
│   └── page.tsx            # Home page
├── components/
│   ├── icon/               # Animated custom icons
│   ├── layout/             # Navbar, footer, rails, scroll-to-top
│   ├── mdx/                # MDX code block with copy button
│   ├── providers/          # Theme provider
│   ├── sections/           # Hero, Experience, Projects, Stack, Blog, Contact
│   └── ui/                 # shadcn/ui + custom components
├── config/
│   └── site.ts             # Single source of truth for all site config
├── content/
│   └── blog/               # MDX blog posts
├── data/                   # Typed data files for experience, projects, stack
├── hooks/                  # useActiveHeading
├── lib/
│   ├── mdx.ts              # Blog post reading + frontmatter parsing
│   └── variants.ts         # Shared Framer Motion variants
└── public/                 # Static assets
```

## Getting Started

```bash
# Clone the repo
git clone https://github.com/kakkar2/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

All site-wide config lives in `config/site.ts` — name, bio, links, resume URL.
Blog posts are MDX files in `content/blog/` with frontmatter:

```mdx
---
title: 'Post title'
description: 'Short description'
date: '2026-06-15'
tags: ['tag1', 'tag2']
---
```

Vercel Analytics works without any environment variables.

<!-- ## License

MIT — feel free to use this as inspiration for your own portfolio.
If you do, a credit or a star on the repo is appreciated but not required. -->

---

Built by [Lalit Kakkar](https://lalitkakkar.vercel.app)

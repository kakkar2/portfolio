# AI Engineering Guide for this Repository

## Project Purpose

This repository is a personal portfolio website for a software engineer. It doubles as a content site, project showcase, and a small open-source component registry.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui and Radix UI primitives
- framer-motion
- next-themes
- next-mdx-remote for MDX blog content
- Vercel Edge/Ops utilities (`@vercel/og`, `@vercel/analytics`, `@vercel/speed-insights`)

## Folder Conventions

- `app/` → route-level pages and metadata.
- `components/` → reusable UI, layout, sections, providers, registry preview components.
- `config/` → global site data.
- `data/` → typed static content consumed by pages.
- `content/` → MDX content sources.
- `lib/` → parsers and shared utilities.
- `registry/` → component demo and UI source files.
- `scripts/` → generation scripts.

## Naming Conventions

- Components: PascalCase file names and exported components.
- Files and folders: kebab-case for pages, data files, and MDX slugs.
- Route slugs: `blog/[slug]`, `components/[slug]`.
- CSS variables: `--background`, `--foreground`, `--border`, etc.
- Data arrays and objects: `siteConfig`, `projects`, `stack`, `experience`.

## Architecture Rules

- Prefer server components by default.
- Add `use client` only for browser-dependent rendering, state, or event handlers.
- Keep the root layout minimal and provider-focused.
- Use `@/` aliases for imports.
- Preserve App Router route metadata patterns.

## Component Creation Rules

- Place page sections under `components/sections/`.
- Place layout pieces under `components/layout/`.
- Place UI primitives under `components/ui/`.
- Place text/visual utility components under `components/common/`.
- Use typed props and avoid `any`.
- Use `cn()` for conditional Tailwind classes.
- Use `buttonVariants()` for buttons and follow existing variant definitions.
- Keep presentational components separate from data fetching logic.

## State Management Rules

- Use local React state in interactive client components.
- Do not introduce Redux, Zustand, or other global state unless necessary.
- Use `useEffect` only for client-only side effects such as localStorage and scroll listeners.
- Keep state minimal and isolated.

## Styling Rules

- Use Tailwind utility classes and CSS variables from `globals.css`.
- Prefer `cn()` for dynamic classes.
- Reuse existing component variants rather than creating new custom button styles.
- Avoid inline CSS except in OG image generation or very small layout adjustments.
- Add new theme-safe colors through CSS variables rather than hard-coded values.

## Registry Component Rules

- Add registry metadata as MDX in `content/components/*.mdx`.
- Add demo code under `registry/examples/*-demo.tsx`.
- If a registry component has related UI source, place it in `registry/ui/*.tsx`.
- Run `npm run registry:index` when a registry component or example is added/removed.
- Use `getComponentContent()` and `getComponentMeta()` from `lib/components-content.ts`.
- Keep the registry page data-driven and use `dynamic()` imports for client-heavy presentation.

## Performance Requirements

- Use dynamic imports for heavy client code, especially in page detail routes.
- Use `useReducedMotion()` when animating.
- Avoid unnecessary client hydration in server components.
- Keep JS bundles small by leveraging static rendering and lazy loading.
- Use route handler caching where applicable.

## SEO Requirements

- Every page should export `metadata` when applicable.
- Use `metadataBase` and title templates from `app/layout.tsx`.
- Add `robots.ts` and `sitemap.ts` consistency when adding new top-level pages.
- For new dynamic content, ensure `generateStaticParams()` and `generateMetadata()` are implemented.
- Preserve JSON-LD schema injection in `app/layout.tsx`.

## Accessibility Requirements

- Use semantic HTML and ARIA attributes.
- Ensure all interactive elements have `aria-label` or visible text.
- Use keyboard-accessible controls and focus states.
- Provide reduced-motion support through `useReducedMotion()`.
- Use `sr-only` text where appropriate.

## Testing Expectations

- There is no explicit test suite in the repository.
- Follow existing linting and formatting with ESLint and Prettier.
- Use `npm run lint` and `npm run format` when making changes.
- Keep components easy to inspect and maintain even without formal tests.

## Git Commit Conventions

- The repository uses Conventional Commits via commitlint.
- Use commit messages like:
  - `feat: add blog summary section`
  - `fix: correct project card link`
  - `chore: update Tailwind CSS tokens`
- Release tooling is present via `release-it`.

## Common Pitfalls

- Do not copy generated registry files manually; use `scripts/build-index.ts`.
- Avoid adding `use client` to components that do not require browser-only behavior.
- Do not use unsupported Tailwind v4 classes or utilities outside the current theme tokens.
- Do not assume a global CSS file beyond `app/globals.css`.
- MDX content must have valid frontmatter and expected headings if you rely on `lib/components-content.ts` extraction.

## Existing Patterns That Must Be Followed

- Root layout uses providers in this exact order: `ThemeProvider`, `ThemePresetProvider`, `TooltipProvider`.
- Buttons use `buttonVariants({ variant, size })`.
- Dark mode theme toggling is based on `next-themes` and client-side state.
- Pages use `container mx-auto max-w-3xl px-5 sm:px-6 lg:px-8` for content width.
- Section components use motion variants and `whileInView` when they animate.
- Static content pages are built from typed data files and MDX frontmatter.

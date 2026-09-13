# Claude Code Instructions for this Repository

## Strict Engineering Rules

- Always follow the existing architecture.
- Never introduce unnecessary dependencies.
- Prefer Server Components where possible.
- Use Client Components only when required.
- Optimize for Core Web Vitals.
- Prioritize LCP, INP, and CLS improvements.
- Use dynamic imports for heavy client code.
- Avoid unnecessary re-renders.
- Follow existing naming conventions.
- Follow existing file structure.
- Maintain SEO best practices.
- Preserve accessibility.
- Reuse existing utilities before creating new ones.
- Prefer composition over duplication.
- Generate production-ready code only.
- Keep bundle size minimal.
- Maintain type safety.

## Project-Specific Rules

1. Use the App Router structure in `app/` for pages and routes.
2. Add `metadata` exports on route pages when applicable.
3. Use `@/` alias imports consistently.
4. Use Tailwind CSS v4 utility classes and avoid custom layout CSS unless truly necessary.
5. Use the shared `cn()` helper from `lib/utils.ts` for conditional classes.
6. Use `buttonVariants()` and `cva` patterns from `components/ui/button.tsx` for button styling.
7. Use `next-themes` and custom theme presets; do not bypass the theme provider.
8. Keep `app/layout.tsx` provider order intact: `ThemeProvider`, `ThemePresetProvider`, `TooltipProvider`.
9. Client state should be local and minimal; no global state library.
10. Use dynamic imports for large or interactive client-only UI chunks.
11. Add new reusable components under `components/ui/`, and place page-specific sections under `components/sections/`.
12. Use `getBlogPosts()` / `getBlogPost()` from `lib/mdx.ts` for blog content.
13. For animations, use `framer-motion` with `useReducedMotion()`.
14. Add `aria-label`, `role`, and keyboard-friendly interactions for all new controls.
15. Use `next/link` for internal navigation and `rel="noopener noreferrer"` for external links.
16. Avoid adding stateful logic to server components.
17. Use `suppressHydrationWarning` only where needed on root HTML/body.
18. Avoid modifying `next.config.ts` unless required.
19. Use `@vercel/og` for any new OG image generation when appropriate.

## Implementation Guidance

- If a component must access browser APIs, mark it with `use client` and keep it as small as possible.
- If a page renders only static content, keep it as a server component.
- Use the existing `app/page.tsx` and `components/sections/*` patterns as templates for new pages.
- Keep fonts and typography consistent with `Space_Grotesk` and the existing utility classes.
- Keep color semantics aligned with CSS variables in `app/globals.css` and theme presets.
- Prefer `bg-muted`, `text-muted-foreground`, and `border-border` for new UI surfaces.
- Use `prose` and `prose-sm` classes for rich text and MDX content.
- Do not use non-typed `any` or unsafe DOM access in server code.
- Keep route page `main` containers consistent with existing `container mx-auto max-w-3xl px-...` wrappers.
- This site does not include a component registry or component showcase — do not reintroduce `app/components/`, `registry/`, or related demo/preview infrastructure unless explicitly asked.

## Response Style for Claude

- Be concise and technical.
- Reference existing repository files when suggesting changes.
- Do not invent features that are not present.
- If you cannot verify a detail in the code, say "Not Found in Repository."
- Always offer the minimal safe change set for requested work.

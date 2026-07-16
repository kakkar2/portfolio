# Design System and UI Architecture

## Design Philosophy

The site is designed as a clean developer portfolio with a strong emphasis on readability, accessibility, and lightweight motion. It uses a monochrome-first palette with subtle accent states and dev-centric UI patterns.

Core principles:

- Minimal visual hierarchy with strong typographic scale
- Content-first layout, not decorative complexity
- Accessible interaction states and keyboard-friendly controls
- Reuse of Tailwind utility patterns and shadcn/ui primitives
- Motion only where it enhances clarity, with reduced-motion fallback

## Layout System

The layout is anchored by a centered container pattern across pages:

- `container mx-auto max-w-3xl px-5 sm:px-6 lg:px-8`
- Fixed top navigation via `components/layout/navbar.tsx`
- Decorative `ContentRails` on extra-large screens
- Section spacing uses `py-6`, `mb-10` and other Tailwind spacing utilities
- Page-specific content is wrapped in `main` with `pt-24` to offset the fixed navbar

Layout is intentionally narrow for readability and developer-focused content.

## Typography System

Fonts and typographic scale are defined via `Space_Grotesk` in `app/layout.tsx` and utility classes.

- Base font: `font-sans`
- Code / monospaced text: `font-mono`
- Headings: `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-6xl`
- Text weights: `font-medium`, `font-semibold`
- Paragraph text uses `text-base`, `text-sm`, `leading-relaxed`
- `prose` classes are used in blog post rendering and experience descriptions.

## Color System

Colors are driven by CSS custom properties in `app/globals.css`.

- Base semantic tokens: `--background`, `--foreground`, `--border`, `--muted`, `--card`, `--accent`, `--primary`, `--secondary`, `--destructive`, `--input`, `--ring`
- Dark mode overrides are defined using `.dark { ... }`.
- Theme presets are provided through `data/theme-presets.ts` and `ThemePresetProvider`.
- Colors are expressed using OKLCH for accessible hue and contrast control.

## Theme Architecture

Theme support is composed of two layers:

1. `next-themes` for `light` / `dark` mode switching.
2. Custom theme presets stored in `localStorage` and applied with `data-theme`.

Key files:

- `components/providers/theme-provider.tsx`
- `components/providers/theme-preset-provider.tsx`
- `components/layout/theme-toggle.tsx`
- `components/layout/theme-preset-switcher.tsx`
- `data/theme-presets.ts`

The root layout uses `suppressHydrationWarning` and system theme fallback via `defaultTheme="system"`.

## Component Design Patterns

### Primitives

UI primitives are built as shadcn/Radix wrappers:

- `Button` with `CVA` variants
- `Tabs` with `TabsList`, `TabsTrigger`, `TabsContent`
- `Tooltip` wrappers around Radix Tooltip
- `HoverCard` wrappers around Radix HoverCard
- `Collapsible` wrappers around Radix Collapsible

These primitives expose consistent `className` and variant patterns.

### Reusable Patterns

- `cn()` for class name composition and deduping
- `buttonVariants` for button style consistency
- `PreviewWrapper` for component demo/code split view
- `CopyButton` for clipboard interactions with tooltip state
- Data-driven sections that consume typed static data

## Motion and Animation Guidelines

The repo uses `framer-motion` selectively.

- Enter animations for sections, cards, and hero text
- `useReducedMotion()` is used in every animated component
- `AnimatePresence` is used for rotating hero text and mobile menu transitions
- Motion is applied as an enhancement, not a requirement

Examples:

- `components/sections/hero.tsx`
- `components/sections/projects.tsx`
- `components/sections/blog.tsx`
- `components/layout/navbar.tsx`

## Accessibility Considerations

Accessibility patterns in the codebase:

- `aria-label`, `aria-current`, `aria-pressed`, `role="list"`, `sr-only`
- Keyboard support in `ThemeToggle` with the `D` hotkey
- `button` and `a` interactive elements use visible focus styles via Radix wrapper classes
- Semantic headings and page titles in every route
- `title` and `alt` text for image and link content
- Reduced-motion fallback for animation-heavy components

## Responsive Design Strategy

Responsive behavior is implemented using Tailwind responsive modifiers:

- Mobile-first `sm:`, `lg:`, `xl:` breakpoints
- Mobile nav menu appears on small screens and uses an animated collapsible dialog
- Grid layouts degrade gracefully: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Hidden desktop-only decorative rails on `xl` screens
- `max-w-3xl` container ensures a narrow reading width across devices

## UI Consistency Rules

The project maintains consistency through:

- Shared design tokens in CSS variables
- Reusable utility wrappers and variant systems
- Cohesive spacing and border treatment for cards and panels
- Consistent use of `bg-muted`, `border-border`, `text-muted-foreground`, and `text-foreground`
- Standard component patterns for headers, lists, and cards

## Reusable Component Patterns

### Section components

- Accept data props and optional flags, e.g. `ProjectsSection({ featured })`
- Use motion containers with `whileInView="show"`
- Use `buttonVariants` for links and CTA buttons

### Registry / preview components

- Use `PreviewWrapper` and tabs for preview/code toggling
- Use `HighlightedCode` with Shiki for syntax highlighting
- Use `CopyButton` in code blocks and CLI snippets

### Theme components

- `ThemeToggle` and `ThemePresetSwitcher` use Radix tooltips and accessible buttons.

## Styling Architecture

Everything is styled using Tailwind CSS with custom global tokens:

- `app/globals.css` imports `tailwindcss`, `tw-animate-css`, and `shadcn/tailwind.css`
- Custom theme maps are defined with `@theme inline`
- `@utility` rules define reusable shorthand styles like `link`, `link-underline`, and `prose-ncdai`
- `@layer base` applies global border and typography rules
- `cva` patterns standardize component styling for buttons and tabs

## Tailwind Usage Patterns

- Use `cn` to compose conditional class names
- Prefer Tailwind semantic utility classes over custom CSS when possible
- Keep styles co-located with components via `className`
- Common patterns:
  - `rounded-xl border border-border bg-card` for cards
  - `text-muted-foreground` for secondary text
  - `bg-muted/20` for subtle shading
  - `transition-all duration-200 hover:text-foreground`

## shadcn/ui Integration Details

The project uses shadcn/ui patterns and Radix primitives.

- `components/ui/` contains shadcn-style wrappers.
- `app/globals.css` imports `shadcn/tailwind.css`.
- Registry instructions and component pages reference shadcn CLI install paths.
- `InstallTabs` provides tailored install instructions that match the shadcn workflow.

### Actual shadcn patterns in use

- `buttonVariants` based on `cva`
- Radix `Tooltip`, `Tabs`, `HoverCard`, and `Collapsible`
- `className` composition with `cn()` and data attribute styling
- `theme` token mapping through CSS variables compatible with shadcn's tailwind theme system

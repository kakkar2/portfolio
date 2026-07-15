import { PackageManagerTabs } from '@/components/ui/package-manager-tabs'

export default function PackageManagerTabsDemo() {
  return (
    <PackageManagerTabs
      commands={{
        npm: 'npx shadcn@latest add @lalit/copy-button',
        pnpm: 'pnpm dlx shadcn@latest add @lalit/copy-button',
        yarn: 'npx shadcn@latest add @lalit/copy-button',
        bun: 'bunx shadcn@latest add @lalit/copy-button',
      }}
      variant="glass"
    />
  )
}

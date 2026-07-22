import { ShareMenu } from '@/components/ui/share-menu'

export default function ShareMenuDemo() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-5 py-3.5">
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-sm font-medium text-foreground">
          Ship your own component registry with shadcn
        </p>
        <p className="truncate text-xs text-muted-foreground">lalitkakkar.vercel.app · blog</p>
      </div>
      <ShareMenu
        title="Ship your own component registry with shadcn"
        url="https://lalitkakkar.vercel.app/blog/shadcn-custom-registry"
      />
    </div>
  )
}

import { CopyButton } from '@/components/ui/copy-button'
import { cn } from '@/lib/utils'

export default function CopyButtonDemo() {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg',
        'border border-border bg-muted/30 px-4 py-2.5'
      )}
    >
      <span className="font-mono text-sm text-muted-foreground">lalitkakkar50@gmail.com</span>
      <CopyButton value="lalitkakkar50@gmail.com" label="Copy email" copiedLabel="Email copied" />
    </div>
  )
}

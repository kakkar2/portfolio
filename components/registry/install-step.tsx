import { cn } from '@/lib/utils'

interface InstallStepProps {
  n: number
  title: string
  children?: React.ReactNode
  className?: string
}

export function InstallStep({ n, title, children, className }: InstallStepProps) {
  return (
    <div className={cn('flex gap-4', className)}>
      {/* Number bubble */}
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50 font-mono text-xs text-muted-foreground">
        {n}
      </div>

      <div className="flex-1 space-y-3 pt-0.5">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {children}
      </div>
    </div>
  )
}

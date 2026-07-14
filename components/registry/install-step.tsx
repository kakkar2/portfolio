import { cn } from '@/lib/utils'

interface InstallStepProps {
  n: number
  title: string
  children?: React.ReactNode
  className?: string
  isLast?: boolean
}

export function InstallStep({ n, title, children, className, isLast = false }: InstallStepProps) {
  return (
    <div className={cn('relative flex gap-4', className)}>
      <div className="relative flex flex-col items-center">
        {!isLast && <div className="absolute top-3 -bottom-3 w-px bg-border" />}
        <div className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-xs text-muted-foreground">
          {n}
        </div>
      </div>

      <div className={cn('flex-1 space-y-3 pt-0.5', !isLast && 'pb-8')}>
        <p className="text-sm font-medium text-foreground">{title}</p>
        {children}
      </div>
    </div>
  )
}

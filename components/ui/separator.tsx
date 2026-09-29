'use client'

import { type VariantProps, cva } from 'class-variance-authority'
import { Separator as SeparatorPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/lib/utils'

const separatorVariants = cva('shrink-0', {
  variants: {
    variant: {
      default:
        'bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
      rail: [
        '[--c:color-mix(in_oklab,var(--muted-foreground)_25%,transparent)]',
        'data-horizontal:h-px data-horizontal:w-full',
        'data-horizontal:bg-[linear-gradient(to_right,var(--c)_6px,transparent_0)]',
        'data-horizontal:bg-[length:10px_1px] data-horizontal:bg-repeat-x',
        'data-vertical:w-px data-vertical:self-stretch',
        'data-vertical:bg-[linear-gradient(to_bottom,var(--c)_6px,transparent_0)]',
        'data-vertical:bg-[length:1px_10px] data-vertical:bg-repeat-y',
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & VariantProps<typeof separatorVariants>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      data-variant={variant}
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Separator, separatorVariants }

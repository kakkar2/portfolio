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
      rail: 'border-border/75 data-horizontal:h-0 data-horizontal:w-full data-horizontal:border-t data-horizontal:border-dashed data-vertical:w-0 data-vertical:self-stretch data-vertical:border-l data-vertical:border-dashed',
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

import type { ComponentType } from 'react'

import { PreviewWrapper } from '../registry/preview-wrapper'
import { DemoSlot } from './demo-slot'

type PreviewModule = { Preview: ComponentType }

export async function ComponentPreview({ slug }: { slug: string }) {
  const demoSlot = <DemoSlot slug={slug} />

  /* eslint-disable react-hooks/error-boundaries */
  try {
    const { Preview } = (await import(`@/components/previews/${slug}`)) as PreviewModule

    return (
      <PreviewWrapper demoSlot={demoSlot}>
        <Preview />
      </PreviewWrapper>
    )
  } catch {
    return (
      <PreviewWrapper demoSlot={demoSlot}>
        <p className="text-sm text-muted-foreground">No preview available.</p>
      </PreviewWrapper>
    )
  }
  /* eslint-enable react-hooks/error-boundaries */
}

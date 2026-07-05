import { NextResponse } from 'next/server'

import { siteConfig } from '@/config/site'
import { getComponent } from '@/data/registry'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const component = getComponent(slug)

  if (!component) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 })
  }

  // shadcn registry spec
  const payload = {
    name: component.slug,
    type: 'registry:ui',
    description: component.description,
    dependencies: component.dependencies ?? [],
    registryDependencies: component.registryDeps ?? [],
    files: component.files.map((f) => ({
      path: f.path,
      content: f.content,
      type: 'registry:ui',
      target: f.path,
    })),
  }

  return NextResponse.json(payload, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

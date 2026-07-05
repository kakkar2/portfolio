import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const pkg = searchParams.get('pkg')

  if (!pkg) return NextResponse.json({ error: 'Missing pkg param' }, { status: 400 })

  try {
    const res = await fetch(`https://api.npmjs.org/downloads/point/last-month/${pkg}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) return NextResponse.json({ downloads: null })

    const data = await res.json()
    return NextResponse.json({ downloads: data.downloads ?? null })
  } catch {
    return NextResponse.json({ downloads: null })
  }
}

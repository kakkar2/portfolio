'use client'

import { useEffect, useState } from 'react'

const HALF = '384px'

export function ContentRails() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden xl:block" aria-hidden="true">
      {/* Left Rail */}
      <div
        className="absolute inset-y-0 w-0 border-l border-dashed border-border/75"
        style={{
          left: `calc(50vw - ${HALF})`,
        }}
      />

      {/* Right Rail */}
      <div
        className="absolute inset-y-0 w-0 border-l border-dashed border-border/75"
        style={{
          left: `calc(50vw + ${HALF})`,
        }}
      />
    </div>
  )
}

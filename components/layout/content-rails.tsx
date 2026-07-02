'use client'

import { useEffect, useState } from 'react'

// import { useActiveHeading } from "@/hooks/use-active-heading";

// const SECTION_COMMITS = {
//   hero: {
//     hash: "a7f3c1d",
//     type: "feat",
//     message: "introduce myself",
//   },
//   experience: {
//     hash: "d91a2be",
//     type: "feat",
//     message: "build production software",
//   },
//   projects: {
//     hash: "f4e7a91",
//     type: "feat",
//     message: "ship developer tools",
//   },
//   stack: {
//     hash: "3ba9fd2",
//     type: "chore",
//     message: "learn continuously",
//   },
//   contact: {
//     hash: "91fe2d1",
//     type: "docs",
//     message: "let's connect",
//   },
// } as const;

// const SECTION_IDS = Object.keys(SECTION_COMMITS);
const HALF = '384px'

export function ContentRails() {
  const [mounted, setMounted] = useState(false)

  // const activeId = useActiveHeading(SECTION_IDS);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  // const commit = activeId
  //   ? SECTION_COMMITS[activeId as keyof typeof SECTION_COMMITS]
  //   : SECTION_COMMITS.hero;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden xl:block" aria-hidden="true">
      {/* Left Rail */}
      <div
        className="absolute inset-y-0 w-px bg-border/50"
        style={{
          left: `calc(50vw - ${HALF})`,
          maskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
        }}
      />

      {/* Right Rail */}
      <div
        className="absolute inset-y-0 w-0 border-l border-dashed border-border/40"
        style={{
          left: `calc(50vw + ${HALF})`,
        }}
      />
    </div>
  )
}

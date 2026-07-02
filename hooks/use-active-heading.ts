import { useEffect, useState } from 'react'

export function useActiveHeading(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!itemIds.length) return

    const findActive = () => {
      const scrollY = window.scrollY
      const winHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      // Always force last item when at the bottom
      if (scrollY + winHeight >= docHeight - 50) {
        setActiveId(itemIds[itemIds.length - 1])
        return
      }

      // Walk backwards — find the last heading that has crossed
      // 25% from the top of the viewport. Works for both scroll directions.
      const threshold = winHeight * 0.25
      let found: string | null = null

      for (let i = itemIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(itemIds[i])
        if (!el) continue
        if (el.getBoundingClientRect().top <= threshold) {
          found = itemIds[i]
          break
        }
      }

      setActiveId(found ?? itemIds[0])
    }

    window.addEventListener('scroll', findActive, { passive: true })
    findActive() // set correct item on mount

    return () => window.removeEventListener('scroll', findActive)
  }, [itemIds])

  return activeId
}

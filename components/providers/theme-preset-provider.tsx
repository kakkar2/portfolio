'use client'

import { type ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { DEFAULT_THEME } from '@/data/theme-presets'

const STORAGE_KEY = 'portfolio-theme-preset'

type ThemePresetContextType = {
  preset: string
  setPreset: (id: string) => void
}

const ThemePresetContext = createContext<ThemePresetContextType>({
  preset: DEFAULT_THEME,
  setPreset: () => {},
})

export function ThemePresetProvider({ children }: { children: ReactNode }) {
  const [preset, setPresetState] = useState<string>(DEFAULT_THEME)

  // Load saved preset on mount
  useEffect(() => {
    applyPreset(preset)
  }, [preset])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPresetState(saved)
    }
  }, [])

  const setPreset = (id: string) => {
    setPresetState(id)
    localStorage.setItem(STORAGE_KEY, id)
  }

  return (
    <ThemePresetContext.Provider value={{ preset, setPreset }}>
      {children}
    </ThemePresetContext.Provider>
  )
}

export function useThemePreset() {
  return useContext(ThemePresetContext)
}

function applyPreset(id: string) {
  const html = document.documentElement
  if (id === 'default') {
    html.removeAttribute('data-theme')
  } else {
    html.setAttribute('data-theme', id)
  }
}

export type ThemePreset = {
  id: string
  label: string
  primary: string
  primaryDark: string
  calendar: {
    light: [string, string, string, string, string]
    dark: [string, string, string, string, string]
  }
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'default',
    label: 'Zinc',
    primary: 'hsl(240 5.9% 10%)',
    primaryDark: 'hsl(0 0% 98%)',
    calendar: {
      light: ['#ebedf0', '#c8c8cc', '#9f9fa8', '#6e6e7a', '#18181b'],
      dark: ['#1a1a1f', '#2e2e38', '#46464f', '#7a7a88', '#e4e4e7'],
    },
  },
  {
    id: 'darkmater',
    label: 'Midnight',
    primary: 'oklch(0.6716 0.1368 48.513)',
    primaryDark: 'oklch(0.7214 0.1337 49.9802)',
    calendar: {
      light: ['#f0ede8', '#ddd4c4', '#c9b89a', '#b49a6e', '#8c7355'],
      dark: ['#141210', '#2a2318', '#3d3220', '#6b5335', '#c9944a'],
    },
  },
]

export const DEFAULT_THEME = 'darkmater'

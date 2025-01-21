import { useStorage } from '@vueuse/core'

interface Config {
  mode?: string
  theme?: string
  radius: number
}

export const RADII = [0, 0.25, 0.5, 0.75, 1]

export function useConfigStore() {
  const config = useStorage<Config>('config', {
    mode: 'light',
    theme: 'zinc',
    radius: 0.5,
  })

  function setMode(modeName: Mode['name']) {
    config.value.mode = modeName
  }

  function setTheme(themeName: Theme['name']) {
    config.value.theme = themeName
  }

  function setRadius(newRadius: number) {
    config.value.radius = newRadius
  }

  const mode = computed(() => config.value.mode)
  const theme = computed(() => config.value.theme)
  const radius = computed(() => config.value.radius)

  return { mode, theme, radius, setMode, setTheme, setRadius }
}

export const themes = [
  {
    name: 'zinc',
  },
  {
    name: 'slate',
  },
  {
    name: 'stone',
  },
  {
    name: 'gray',
  },
  {
    name: 'neutral',
  },
  {
    name: 'red',
  },
  {
    name: 'rose',
  },
  {
    name: 'orange',
  },
  {
    name: 'green',
  },
  {
    name: 'blue',
  },
  {
    name: 'yellow',
  },
  {
    name: 'violet',
  },
] as const

export const modes = [
  {
    name: 'light',
  },
  {
    name: 'dark',
  },
] as const

export type Mode = (typeof modes)[number]
export type Theme = (typeof themes)[number]

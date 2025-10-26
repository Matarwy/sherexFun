'use client'

import type { ThemeName } from '@/charting_library/charting_library.js'

export enum AppColorMode {
  GreenUp = 'GreenUp',
  RedUp = 'RedUp'
}
export enum AppTheme {
  Dark = 'dark',
  Light = 'light'
}

export const THEME_NAMES: Record<AppTheme, ThemeName> = {
  [AppTheme.Dark]: 'dark',
  [AppTheme.Light]: 'light'
}

type Theme = {
  [AppColorMode.GreenUp]: ThemeColorBase
  [AppColorMode.RedUp]: ThemeColorBase
}

type ThemeColorBase = {
  layer0: string
  layer1: string
  textPrimary: string
  accent: string
  positive: string
  negative: string
}

const DarkThemeBase: () => ThemeColorBase = () => ({
  layer0: '#050810',
  layer1: '#0D1017',
  textPrimary: '#ECF5FF',
  accent: '#7774FF',
  positive: '#4CDCC1',
  negative: '#FF4272'
})

const LightThemeBase: () => ThemeColorBase = () => ({
  layer0: ' #F5F8FF',
  layer1: ' #EDEDFF',
  textPrimary: ' #0B1022',
  accent: ' #7774FF',
  positive: ' #4CDCC1',
  negative: ' #FF4272'
})

const generateTheme = (themeBase: () => ThemeColorBase): Theme => {
  const themeColors = themeBase()
  return {
    [AppColorMode.GreenUp]: themeColors,
    [AppColorMode.RedUp]: {
      ...themeColors,
      positive: themeColors.negative,
      negative: themeColors.positive
    }
  }
}

export const Themes = {
  [AppTheme.Dark]: generateTheme(DarkThemeBase),
  [AppTheme.Light]: generateTheme(LightThemeBase)
}

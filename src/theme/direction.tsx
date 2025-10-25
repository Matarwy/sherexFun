// src/theme/direction.tsx
import { ChakraProvider, extendTheme, PortalManager } from '@chakra-ui/react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import rtlPlugin from 'stylis-plugin-rtl'

import { theme as baseTheme } from './index' // <-- use your main theme

const cacheLtr = createCache({ key: 'chakra' })
const cacheRtl = createCache({ key: 'chakra-rtl', stylisPlugins: [rtlPlugin] })

const themeBase = extendTheme({ ...baseTheme })
const themeLtr = extendTheme({ ...themeBase, direction: 'ltr' })
const themeRtl = extendTheme({ ...themeBase, direction: 'rtl' })

export function DirectionProviders({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const dir = i18n.dir()
  const cache = dir === 'rtl' ? cacheRtl : cacheLtr
  const theme = dir === 'rtl' ? themeRtl : themeLtr

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir)
  }, [dir])

  return (
    <CacheProvider key={dir} value={cache}>
      <ChakraProvider key={dir} theme={theme}>
        <PortalManager zIndex={1600}>{children}</PortalManager>
      </ChakraProvider>
    </CacheProvider>
  )
}

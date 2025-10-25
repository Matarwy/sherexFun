import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import { theme } from '@/theme'

/**
 * @see https://chakra-ui.com/docs/styled-system/color-mode#for-nextjs
 */
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" suppressHydrationWarning>
        <Head />
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

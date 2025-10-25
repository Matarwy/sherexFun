// src/theme/components/Progress.ts
import { progressAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(progressAnatomy.keys)

/** Base */
const baseStyle = definePartsStyle({
  track: {
    bg: colors.backgroundDark,
    borderRadius: '100vw',
    border: `1px solid ${colors.cardBorder01}`,
    overflow: 'hidden'
  },
  filledTrack: {
    bg: colors.filledProgressBg,
    transition: 'width .25s ease',
    boxShadow: `0 0 0 1px ${colors.cardBorder01} inset`
  }
})

/** Sizes */
const sizes = {
  xs: definePartsStyle({ track: { h: '4px' } }),
  sm: definePartsStyle({ track: { h: '6px' } }),
  md: definePartsStyle({ track: { h: '8px' } }),
  lg: definePartsStyle({ track: { h: '12px' } })
}

/** Variants */
const brand = definePartsStyle({
  track: { bg: colors.backgroundTransparent12, border: `1px solid ${colors.cardBorder01}` },
  filledTrack: { bg: colors.filledProgressBg }
})

const glass = definePartsStyle({
  track: {
    bg: colors.transparentContainerBg,
    border: `1px solid ${colors.cardBorder01}`,
    backdropFilter: 'blur(6px)'
  },
  filledTrack: {
    bg: colors.filledProgressBg,
    boxShadow: colors.panelCardShadow
  }
})

const soft = definePartsStyle({
  track: { bg: colors.backgroundTransparent12, border: 'none' },
  filledTrack: { bg: colors.secondary }
})

const success = definePartsStyle({
  track: { bg: colors.backgroundTransparent12, border: 'none' },
  filledTrack: { bg: colors.semanticSuccess }
})

const warning = definePartsStyle({
  track: { bg: colors.backgroundTransparent12, border: 'none' },
  filledTrack: { bg: colors.semanticWarning }
})

const danger = definePartsStyle({
  track: { bg: colors.backgroundTransparent12, border: 'none' },
  filledTrack: { bg: colors.semanticError }
})

export const Progress = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: { brand, glass, soft, success, warning, danger },
  defaultProps: {
    size: 'md',
    variant: 'brand'
  }
})

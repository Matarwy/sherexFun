// src/theme/components/Slider.ts
import { sliderAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(sliderAnatomy.keys)

/** Base */
const baseStyle = definePartsStyle({
  container: {
    pb: 4
  },
  track: {
    bg: colors.backgroundDark,
    borderRadius: '999px',
    border: `1px solid ${colors.cardBorder01}`
  },
  filledTrack: {
    bg: colors.secondary,
    borderRadius: '999px'
  },
  thumb: {
    bg: colors.secondary,
    boxSize: '24px',
    border: `2px solid ${colors.backgroundLight}`,
    boxShadow: colors.panelCardShadow,
    _hover: { transform: 'scale(1.02)' },
    _active: { transform: 'scale(0.98)' },
    _focusVisible: {
      outline: 'none',
      boxShadow: `0 0 0 4px ${colors.semanticFocusShadow}`
    },
    _disabled: { opacity: 0.5, cursor: 'not-allowed' }
  },
  mark: {
    // for tick background chips
    bg: colors.backgroundTransparent12,
    borderRadius: '4px',
    py: '2px',
    px: '4px',
    transform: 'translateX(var(--tx, 0))'
  },
  markLabel: {
    mt: '16px',
    fontSize: '12px',
    fontWeight: 500,
    color: colors.textSecondary
  }
})

/** Sizes (track height + thumb size tuned together) */
const sizes = {
  sm: definePartsStyle({
    track: { h: '6px' },
    thumb: { boxSize: '16px', borderWidth: '1.5px' }
  }),
  md: definePartsStyle({
    track: { h: '8px' },
    thumb: { boxSize: '20px', borderWidth: '2px' }
  }),
  lg: definePartsStyle({
    track: { h: '12px' },
    thumb: { boxSize: '24px', borderWidth: '2px' }
  })
}

/** Variants */
const brand = definePartsStyle({
  track: { bg: colors.backgroundTransparent12, borderColor: colors.cardBorder01 },
  filledTrack: { bg: colors.filledProgressBg },
  thumb: { bg: colors.secondary }
})

const soft = definePartsStyle({
  track: { bg: colors.backgroundTransparent12, border: 'none' },
  filledTrack: { bg: colors.selectActiveSecondary },
  thumb: { bg: colors.selectActiveSecondary }
})

const glass = definePartsStyle({
  track: {
    bg: colors.transparentContainerBg,
    border: `1px solid ${colors.cardBorder01}`,
    backdropFilter: 'blur(6px)'
  },
  filledTrack: { bg: colors.filledProgressBg },
  thumb: { bg: colors.secondary }
})

const success = definePartsStyle({
  filledTrack: { bg: colors.semanticSuccess },
  thumb: { bg: colors.semanticSuccess }
})

const warning = definePartsStyle({
  filledTrack: { bg: colors.semanticWarning },
  thumb: { bg: colors.semanticWarning }
})

const danger = definePartsStyle({
  filledTrack: { bg: colors.semanticError },
  thumb: { bg: colors.semanticError }
})

export const Slider = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: { brand, soft, glass, success, warning, danger },
  defaultProps: {
    size: 'md',
    variant: 'brand'
  }
})

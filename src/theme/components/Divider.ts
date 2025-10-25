// src/theme/components/Divider.ts
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

import { colors } from '../cssVariables'

/**
 * We use a CSS var `--d-thickness` so sizes can adjust both
 * horizontal (height) and vertical (width) lines consistently.
 * Orientation is handled via data attributes Chakra sets.
 */
const baseStyle = defineStyle({
  border: 'none',
  opacity: 1,
  // default thickness
  '--d-thickness': '1px',
  // default color (used by solid/outline-like variants)
  '--d-color': colors.dividerBg,

  // Horizontal (width 100%, height from thickness)
  '&[data-orientation=horizontal]': {
    w: '100%',
    h: 'var(--d-thickness)'
  },

  // Vertical (height 100%, width from thickness)
  '&[data-orientation=vertical]': {
    h: '100%',
    w: 'var(--d-thickness)',
    alignSelf: 'stretch'
  }
})

/** Variants */
const variantSolid = defineStyle({
  bg: 'var(--d-color)'
})

const variantDash = defineStyle({
  // Uses brand tokenized repeating gradient
  bg: colors.dividerDashGradient
})

const variantBrand = defineStyle({
  // Full brand gradient divider
  bg: colors.brandGradient
})

const variantSubtle = defineStyle({
  '--d-color': colors.dividerBg,
  bg: 'var(--d-color)'
})

const variantStrong = defineStyle({
  '--d-thickness': '2px',
  '--d-color': colors.cardBorder01,
  bg: 'var(--d-color)'
})

const variantDotted = defineStyle({
  // Simulated dotted line with background image
  bg: 'transparent',
  // Horizontal & vertical use different repeating gradients
  '&[data-orientation=horizontal]': {
    backgroundImage: 'repeating-linear-gradient(to right, currentColor 0 2px, transparent 2px 6px)',
    backgroundColor: 'transparent',
    color: colors.textTertiary,
    h: 'var(--d-thickness)'
  },
  '&[data-orientation=vertical]': {
    backgroundImage: 'repeating-linear-gradient(to bottom, currentColor 0 2px, transparent 2px 6px)',
    backgroundColor: 'transparent',
    color: colors.textTertiary,
    w: 'var(--d-thickness)'
  }
})

const variantInset = defineStyle({
  // Inset on the inline-start side; flips in RTL
  ms: 3, // margin-inline-start
  bg: 'var(--d-color)'
})

const variantGlow = defineStyle({
  // Soft glow using brand tones
  bg: 'var(--d-color)',
  boxShadow: '0 0 0 1px rgba(225,120,197,0.18), 0 0 8px rgba(255,142,143,0.18)'
})

/** Sizes: adjusts only thickness & spacing (safe for both orientations) */
const sizes = {
  thin: defineStyle({
    '--d-thickness': '1px',
    my: 2
  }),
  sm: defineStyle({
    '--d-thickness': '1.5px',
    my: 3
  }),
  md: defineStyle({
    '--d-thickness': '2px',
    my: 4
  }),
  lg: defineStyle({
    '--d-thickness': '3px',
    my: 6
  }),
  xl: defineStyle({
    '--d-thickness': '4px',
    my: 8
  })
}

export const dividerTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    // keep your original names
    solid: variantSolid,
    dash: variantDash,
    // new options
    subtle: variantSubtle,
    strong: variantStrong,
    dotted: variantDotted,
    inset: variantInset,
    brand: variantBrand,
    glow: variantGlow
  },
  defaultProps: {
    variant: 'solid',
    size: 'thin'
  }
})

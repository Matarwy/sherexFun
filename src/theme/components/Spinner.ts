// src/theme/components/Spinner.ts
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const baseStyle = defineStyle({
  color: colors.secondary, // ring color
  emptyColor: colors.backgroundTransparent12, // track color
  speed: '0.65s' // spin speed
})

const sizes = {
  xs: defineStyle({ w: '14px', h: '14px', thickness: '2px' }),
  sm: defineStyle({ w: '18px', h: '18px', thickness: '2.5px' }),
  md: defineStyle({ w: '24px', h: '24px', thickness: '3px' }),
  lg: defineStyle({ w: '32px', h: '32px', thickness: '4px' }),
  xl: defineStyle({ w: '48px', h: '48px', thickness: '5px' })
}

const variants = {
  brand: defineStyle({ color: colors.secondary, emptyColor: colors.backgroundTransparent12 }),
  subtle: defineStyle({ color: colors.textSecondary, emptyColor: colors.backgroundTransparent07 }),
  inverted: defineStyle({ color: colors.textRevertPrimary, emptyColor: colors.backgroundTransparent07 }),
  success: defineStyle({ color: colors.semanticSuccess, emptyColor: colors.backgroundTransparent12 }),
  warning: defineStyle({ color: colors.semanticWarning, emptyColor: colors.backgroundTransparent12 }),
  danger: defineStyle({ color: colors.semanticError, emptyColor: colors.backgroundTransparent12 })
}

export const Spinner = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: 'md',
    variant: 'brand'
  }
})

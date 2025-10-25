// src/theme/components/FormLabel.ts
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const baseStyle = defineStyle({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  // keep the original no-spacing contract
  mb: 0,
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  color: colors.textSecondary,
  userSelect: 'none',
  _disabled: { color: colors.textTertiary, opacity: 0.65, cursor: 'not-allowed' }
})

const sizes = {
  sm: defineStyle({ fontSize: '12px' }),
  md: defineStyle({ fontSize: '14px' }),
  lg: defineStyle({ fontSize: '16px' })
}

const variants = {
  subtle: defineStyle({
    color: colors.textTertiary,
    fontWeight: 500
  }),
  strong: defineStyle({
    color: colors.textPrimary,
    fontWeight: 700
  }),
  inverted: defineStyle({
    // for labels on dark-highlighted surfaces (e.g., modals/cards)
    color: colors.textRevertPrimary,
    fontWeight: 600
  })
}

export const FormLabel = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: 'md',
    variant: 'subtle'
  }
})

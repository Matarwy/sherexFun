// src/theme/components/Text.ts
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const baseStyle = defineStyle({
  color: colors.textPrimary,
  lineHeight: 1.4
})

const variants = {
  // === your originals, tuned ===
  dialogTitle: defineStyle({
    fontSize: '20px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    color: colors.textPrimary
  }),
  title: defineStyle({
    fontSize: 'md',
    fontWeight: 600,
    color: colors.textSecondary
  }),
  subTitle: defineStyle({
    fontSize: 'sm',
    fontWeight: 500,
    color: colors.textSecondary
  }),
  label: defineStyle({
    fontSize: 'xs',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: colors.textTertiary
  }),
  error: defineStyle({
    fontSize: 'sm',
    fontWeight: 500,
    color: colors.semanticError
  }),

  // === handy additions ===
  success: defineStyle({ fontSize: 'sm', fontWeight: 500, color: colors.semanticSuccess }),
  warning: defineStyle({ fontSize: 'sm', fontWeight: 500, color: colors.semanticWarning }),
  info: defineStyle({ fontSize: 'sm', fontWeight: 500, color: colors.semanticNeutral }),

  helper: defineStyle({ fontSize: 'xs', color: colors.textTertiary }),
  caption: defineStyle({ fontSize: 'xs', color: colors.textTertiary }),

  mono: defineStyle({
    fontFamily: 'var(--chakra-fonts-mono)',
    letterSpacing: '0.01em',
    color: colors.textSecondary
  }),

  hero: defineStyle({
    fontSize: ['28px', '36px', '42px'],
    fontWeight: 800,
    lineHeight: 1.1,
    background: colors.brandGradient,
    backgroundClip: 'text',
    color: 'transparent'
  }),

  gradient: defineStyle({
    background: colors.brandGradient,
    backgroundClip: 'text',
    color: 'transparent'
  }),

  link: defineStyle({
    color: colors.textLink,
    cursor: 'pointer',
    textDecoration: 'none',
    _hover: { textDecoration: 'underline', opacity: 0.9 },
    _active: { opacity: 0.8 }
  }),

  muted: defineStyle({ color: colors.textTertiary }),

  numeric: defineStyle({
    textAlign: 'end',
    fontVariantNumeric: 'tabular-nums'
  })
}

const sizes = {
  xs: defineStyle({ fontSize: '12px' }),
  sm: defineStyle({ fontSize: '14px' }),
  md: defineStyle({ fontSize: '16px' }),
  lg: defineStyle({ fontSize: '18px' }),
  xl: defineStyle({ fontSize: '20px' })
}

export const Text = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: 'md'
  }
})

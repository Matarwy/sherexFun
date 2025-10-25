import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { colors, shadows } from '../cssVariables'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys)

/** sizes */
const lg = definePartsStyle({
  button: { fontSize: '20px' },
  list: { borderRadius: '12px' },
  divider: { mx: '20px', my: '12px' },
  item: { fontSize: '16px', fontWeight: '400' }
})

// settings panel style
const _3xl = definePartsStyle({
  button: { fontSize: '20px' },
  list: {
    borderRadius: '20px',
    width: 'min(100vw - 40px, 480px)',
    px: ['20px', '32px'],
    py: '24px',
    mx: '20px',
    boxShadow: `${shadows.appMask}, ${shadows.bigCard}`
  },
  divider: { mx: '20px', my: '12px' },
  item: { fontSize: '16px', fontWeight: '400' }
})

/** base */
const baseStyle = definePartsStyle({
  button: {
    textAlign: 'start',
    fontWeight: 600,
    fontSize: '14px',
    py: '11px',
    px: '14px',
    borderRadius: '8px',
    color: colors.textTertiary,
    _hover: { bg: colors.backgroundLight, color: colors.textSecondary },
    _expanded: { bg: colors.backgroundLight, color: colors.textSecondary },
    _focusVisible: {
      outline: 'none',
      boxShadow: `0 0 0 3px ${colors.semanticFocusShadow}`
    }
  },

  list: {
    py: '4px',
    borderRadius: '12px',
    border: colors.panelCardBorder,
    boxShadow: colors.panelCardShadow,
    overflow: 'hidden',
    bg: colors.backgroundLight,
    zIndex: 1050
  },

  divider: {
    borderColor: colors.dividerBg,
    opacity: 1,
    mx: '12px',
    my: '8px'
  },

  item: {
    fontWeight: 600,
    fontSize: '14px',
    color: colors.textSecondary,
    py: '10px',
    px: '20px',
    transition: 'background .15s ease, color .15s ease',
    bg: 'transparent',
    _hover: { color: colors.textSecondary, bg: colors.backgroundMedium },
    _focus: { color: colors.textSecondary, bg: colors.backgroundMedium },
    _active: { bg: colors.backgroundTransparent12 },
    _disabled: {
      opacity: 0.45,
      cursor: 'not-allowed',
      bg: 'transparent'
    },
    // for MenuOptionGroup checked / indeterminate styles
    _checked: {
      bg: colors.backgroundTransparent12,
      color: colors.textPrimary
    }
  },

  groupTitle: {
    px: '20px',
    py: '8px',
    fontSize: '12px',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: colors.textTertiary
  },

  command: {
    ms: 'auto', // push to inline-end (RTL-safe)
    color: colors.textTertiary,
    fontFamily: 'mono',
    fontSize: '12px',
    opacity: 0.8
  }
})

/** variants */
const elevated = definePartsStyle({
  list: {
    border: colors.panelCardBorder,
    boxShadow: colors.panelCardShadow,
    bg: colors.backgroundLight
  }
})

const soft = definePartsStyle({
  list: {
    borderRadius: '12px',
    border: `1px solid ${colors.cardBorder01}`,
    boxShadow: 'none',
    bg: colors.backgroundTransparent12,
    backdropFilter: 'blur(6px)'
  },
  item: {
    _hover: { bg: colors.backgroundTransparent07 },
    _focus: { bg: colors.backgroundTransparent07 }
  }
})

export const Menu = defineMultiStyleConfig({
  baseStyle,
  sizes: { lg, '3xl': _3xl },
  variants: { elevated, soft },
  defaultProps: {
    size: 'lg',
    variant: 'elevated'
  }
})

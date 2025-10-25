// src/theme/components/Input.ts
import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

/** Shared, accessible focus ring */
const focusRing = {
  _focusVisible: {
    outline: 'none',
    boxShadow: `0 0 0 3px ${colors.semanticFocusShadow}`
  }
}

/** Base styles (apply to all variants unless overridden) */
const baseStyle = definePartsStyle({
  // Allow easy width override per instance via CSS var
  root: { '--in-w': '210px' },

  field: {
    w: 'var(--in-w)',
    fontSize: '14px',
    color: colors.textPrimary,
    borderRadius: '12px',
    border: `1px solid ${colors.cardBorder01}`,
    transition: 'background .15s ease, border-color .15s ease, box-shadow .15s ease',
    _placeholder: { color: colors.textTertiary, fontWeight: 500 },
    _invalid: {
      borderColor: colors.semanticError,
      boxShadow: `0 0 0 1px ${colors.semanticError}`
    },
    _disabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
      bg: colors.backgroundTransparent10
    },
    _readOnly: {
      bg: colors.backgroundTransparent10,
      cursor: 'default'
    }
  },

  /** For InputLeft/RightElement (icons, buttons). RTL-safe with logical padding in sizes */
  element: {
    color: colors.textTertiary,
    _disabled: { opacity: 0.5 }
  },

  /** For InputLeft/RightAddon */
  addon: {
    bg: colors.backgroundLight,
    color: colors.textSecondary,
    border: colors.panelCardBorder,
    _first: {
      borderStartRadius: '12px'
    },
    _last: {
      borderEndRadius: '12px'
    }
  }
})

/** Variants */
const filled = definePartsStyle({
  field: {
    bg: colors.backgroundTransparent12,
    borderColor: 'transparent',
    _hover: { bg: colors.backgroundTransparent07 },
    _focus: { bg: colors.backgroundTransparent12, borderColor: colors.selectActive },
    ...focusRing
  }
})

const filledDark = definePartsStyle({
  // “capsule” style
  field: {
    bg: colors.backgroundDark,
    border: '1px solid transparent',
    borderRadius: '999px',
    color: colors.textSecondary,
    _hover: { bg: colors.backgroundDark },
    _focus: { bg: colors.backgroundDark, borderColor: colors.selectActiveSecondary },
    ...focusRing,
    _placeholder: { color: colors.textTertiary, fontWeight: 500 }
  }
})

const clean = definePartsStyle({
  field: {
    fontSize: 'xl',
    fontWeight: 'medium',
    color: colors.textPrimary,
    bg: 'transparent',
    p: 0,
    h: 'auto',
    lineHeight: 'normal',
    boxShadow: 'none',
    borderRadius: 0,
    border: 'none',
    _hover: { bg: 'transparent' },
    _focus: { bg: 'transparent', border: 'none' }
  }
})

const number = definePartsStyle({
  field: {
    bg: colors.backgroundLight,
    borderRadius: '12px',
    border: '1px solid transparent',
    _hover: { bg: colors.backgroundLight },
    _focus: { bg: colors.backgroundLight, borderColor: 'transparent' },
    _focusVisible: { boxShadow: 'none' } // clean numeric entry, no ring
  }
})

/** Sizes — reserve logical padding for left/right elements (RTL-safe) */
const sizes = {
  sm: definePartsStyle({
    field: { h: '32px', ps: '10px', pe: '10px' },
    element: { w: '8', h: 'full' },
    addon: { h: '32px', px: '3' }
  }),
  md: definePartsStyle({
    field: { h: '40px', ps: '14px', pe: '14px' },
    element: { w: '9', h: 'full' },
    addon: { h: '40px', px: '3.5' }
  }),
  lg: definePartsStyle({
    field: { h: '48px', ps: '16px', pe: '16px' },
    element: { w: '10', h: 'full' },
    addon: { h: '48px', px: '4' }
  })
}

export const Input = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: {
    filled,
    filledDark, // capsule
    clean,
    number
  },
  defaultProps: {
    size: 'md',
    variant: 'filled'
  }
})

// src/theme/components/Checkbox.ts
import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const focusRing = {
  _focusVisible: {
    boxShadow: `0 0 0 3px ${colors.semanticFocusShadow}`,
    outline: 'none'
  }
}

const baseStyle = definePartsStyle({
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    _disabled: { cursor: 'not-allowed', opacity: 0.6 }
  },
  control: {
    bg: colors.backgroundTransparent12,
    border: `1px solid ${colors.cardBorder01}`,
    borderRadius: '6px',
    transition: 'background .15s ease, border-color .15s ease, box-shadow .15s ease',
    ...focusRing,

    _hover: { bg: colors.backgroundTransparent07 },

    _checked: {
      bg: colors.primary,
      borderColor: colors.primary,
      _hover: { bg: colors.primary },
      _disabled: {
        bg: 'rgba(225,120,197,0.65)', // softened brand when disabled
        borderColor: 'transparent'
      }
    },

    _indeterminate: {
      bg: colors.primary,
      borderColor: colors.primary,
      _hover: { bg: colors.primary }
    },

    _invalid: {
      borderColor: colors.semanticError,
      boxShadow: `0 0 0 1px ${colors.semanticError}`
    },

    _disabled: {
      bg: colors.backgroundTransparent10,
      borderColor: colors.dividerBg
    }
  },

  icon: {
    color: colors.buttonSolidText // high contrast mark on brand bg
  },

  label: {
    userSelect: 'none',
    color: colors.textSecondary,
    fontSize: '14px',
    lineHeight: '20px',
    _disabled: { color: colors.textTertiary }
  }
})

const sizes = {
  sm: definePartsStyle({
    control: { w: '14px', h: '14px' },
    label: { fontSize: '13px', lineHeight: '18px' }
  }),
  md: definePartsStyle({
    control: { w: '16px', h: '16px' },
    label: { fontSize: '14px', lineHeight: '20px' }
  }),
  lg: definePartsStyle({
    control: { w: '18px', h: '18px' },
    label: { fontSize: '15px', lineHeight: '22px' }
  })
}

export const Checkbox = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: { size: 'md' }
})

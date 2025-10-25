// src/theme/components/NumberInput.ts
import { numberInputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(numberInputAnatomy.keys)

/** Shared focus ring */
const focusRing = {
  _focusVisible: {
    outline: 'none',
    boxShadow: `0 0 0 3px ${colors.semanticFocusShadow}`
  }
}

/** Base (applies to all variants unless overridden) */
const baseStyle = definePartsStyle({
  root: {
    // allow easy width override via CSS var
    '--ni-w': '210px'
  },
  field: {
    w: 'var(--ni-w)',
    fontSize: '14px',
    color: colors.textPrimary,
    bg: colors.backgroundLight,
    borderRadius: '12px',
    border: `1px solid ${colors.cardBorder01}`,
    transition: 'background .15s ease, border-color .15s ease, box-shadow .15s ease',
    _placeholder: { color: colors.textTertiary, fontWeight: 500 },
    _hover: { bg: colors.backgroundTransparent07 },
    _focus: { bg: colors.backgroundTransparent12, borderColor: colors.selectActive },
    ...focusRing,
    _invalid: {
      borderColor: colors.semanticError,
      boxShadow: `0 0 0 1px ${colors.semanticError}`
    },
    _disabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
      bg: colors.backgroundTransparent10
    }
  },
  stepperGroup: {
    insetInlineEnd: '2px', // RTL-aware
    top: '2px',
    bottom: '2px',
    borderInlineStart: `1px solid ${colors.dividerBg}`, // RTL-aware
    borderRadius: '10px',
    overflow: 'hidden'
  },
  stepper: {
    bg: 'transparent',
    color: colors.textSecondary,
    _hover: { bg: colors.backgroundTransparent07 },
    _active: { bg: colors.backgroundTransparent12 },
    _disabled: { opacity: 0.4 }
  }
})

/** Variants */
const filled = definePartsStyle({
  field: {
    bg: colors.backgroundLight,
    border: '1px solid transparent',
    _hover: { bg: colors.backgroundLight },
    _focus: { bg: colors.backgroundLight }
  },
  // hide steppers for a clean pill look (as in your original)
  stepperGroup: { display: 'none' }
})

const filledDark = definePartsStyle({
  field: {
    bg: colors.backgroundDark,
    border: '1px solid transparent',
    color: colors.textSecondary,
    _hover: { bg: colors.backgroundDark },
    _focus: { bg: colors.backgroundDark }
  },
  stepperGroup: { display: 'none' }
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
  },
  stepperGroup: { display: 'none' }
})

const input = definePartsStyle({
  field: {
    bg: colors.backgroundDark,
    borderRadius: '12px',
    border: `1px solid transparent`,
    _hover: { bg: colors.backgroundTransparent07 },
    _focus: { bg: colors.backgroundTransparent12, borderColor: colors.selectActive },
    _placeholder: { color: colors.textTertiary, fontWeight: 500 }
  },
  // show steppers in this variant
  stepperGroup: {
    display: 'flex'
  }
})

/** Sizes: space field padding to avoid steppers overlap */
const sizes = {
  sm: definePartsStyle({
    field: { h: '32px', pe: '36px', ps: '12px' },
    stepperGroup: { w: '7' } // 1.75rem
  }),
  md: definePartsStyle({
    field: { h: '40px', pe: '40px', ps: '14px' },
    stepperGroup: { w: '8' } // 2rem
  }),
  lg: definePartsStyle({
    field: { h: '48px', pe: '44px', ps: '16px' },
    stepperGroup: { w: '9' } // 2.25rem
  })
}

export const NumberInput = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: {
    filled,
    filledDark,
    clean,
    input
  },
  defaultProps: {
    size: 'md',
    variant: 'filled'
  }
})

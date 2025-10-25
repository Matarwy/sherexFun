// src/theme/components/Stepper.ts
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { colors } from '../cssVariables'

// Define parts explicitly (avoids stepperAnatomy import)
const STEPPER_PARTS = ['root', 'steps', 'step', 'container', 'separator', 'indicator', 'number', 'icon', 'title', 'description'] as const

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(STEPPER_PARTS)

const focusRing = {
  _focusVisible: {
    outline: 'none',
    boxShadow: `0 0 0 3px ${colors.semanticFocusShadow}`
  }
}

const baseStyle = definePartsStyle({
  root: { color: colors.textSecondary },
  steps: { gap: 4 },
  step: { _horizontal: { gap: 3 }, _vertical: { gap: 2 } },
  container: { ms: 3 }, // RTL-safe margin-start

  indicator: {
    rounded: 'full',
    bg: colors.backgroundDark,
    color: colors.textSecondary,
    border: `1px solid ${colors.cardBorder01}`,
    transition: 'background .15s ease, color .15s ease, border-color .15s ease, box-shadow .15s ease',
    ...focusRing,
    '&[data-status=incomplete]': {
      bg: colors.backgroundDark,
      color: colors.textSecondary,
      borderColor: colors.cardBorder01
    },
    '&[data-status=active]': {
      bg: colors.secondary,
      color: colors.buttonSolidText,
      borderColor: 'transparent'
    },
    '&[data-status=complete]': {
      bg: colors.secondary,
      color: colors.buttonSolidText,
      borderColor: 'transparent'
    }
  },

  number: { fontWeight: 700 },
  icon: { color: 'currentColor' },

  separator: {
    bg: colors.dividerBg,
    rounded: 'full',
    _horizontal: { h: '2px', my: 'auto' },
    _vertical: { w: '2px', mx: 'auto' }
  },

  title: { color: colors.textPrimary, fontWeight: 600 },
  description: { color: colors.textTertiary, fontWeight: 500 }
})

const sizes = {
  sm: definePartsStyle({
    indicator: { boxSize: '22px', fontSize: 'xs' },
    number: { fontSize: 'xs' },
    title: { fontSize: 'sm' },
    description: { fontSize: 'xs' },
    separator: { _horizontal: { h: '2px' }, _vertical: { w: '2px' } }
  }),
  md: definePartsStyle({
    indicator: { boxSize: '26px', fontSize: 'sm' },
    number: { fontSize: 'sm' },
    title: { fontSize: 'md' },
    description: { fontSize: 'sm' },
    separator: { _horizontal: { h: '3px' }, _vertical: { w: '3px' } }
  }),
  lg: definePartsStyle({
    indicator: { boxSize: '32px', fontSize: 'md' },
    number: { fontSize: 'md' },
    title: { fontSize: 'lg' },
    description: { fontSize: 'md' },
    separator: { _horizontal: { h: '4px' }, _vertical: { w: '4px' } }
  })
}

const brand = definePartsStyle({
  separator: {
    bg: colors.backgroundTransparent12,
    '&[data-status=active], &[data-status=complete]': { bg: colors.secondary }
  }
})
const soft = definePartsStyle({
  indicator: {
    bg: colors.backgroundTransparent12,
    borderColor: 'transparent',
    '&[data-status=active], &[data-status=complete]': {
      bg: colors.selectActiveSecondary,
      color: colors.textPrimary
    }
  },
  separator: { bg: colors.backgroundTransparent12 }
})
const outline = definePartsStyle({
  indicator: {
    bg: 'transparent',
    color: colors.textSecondary,
    borderColor: colors.cardBorder01,
    '&[data-status=active], &[data-status=complete]': {
      bg: 'transparent',
      color: colors.secondary,
      borderColor: colors.secondary
    }
  },
  separator: { bg: colors.cardBorder01 }
})
const success = definePartsStyle({
  indicator: {
    '&[data-status=active], &[data-status=complete]': {
      bg: colors.semanticSuccess,
      color: colors.buttonSolidText,
      borderColor: 'transparent'
    }
  },
  separator: {
    '&[data-status=active], &[data-status=complete]': { bg: colors.semanticSuccess }
  }
})
const warning = definePartsStyle({
  indicator: {
    '&[data-status=active], &[data-status=complete]': {
      bg: colors.semanticWarning,
      color: colors.background01,
      borderColor: 'transparent'
    }
  },
  separator: {
    '&[data-status=active], &[data-status=complete]': { bg: colors.semanticWarning }
  }
})
const danger = definePartsStyle({
  indicator: {
    '&[data-status=active], &[data-status=complete]': {
      bg: colors.semanticError,
      color: colors.buttonSolidText,
      borderColor: 'transparent'
    }
  },
  separator: {
    '&[data-status=active], &[data-status=complete]': { bg: colors.semanticError }
  }
})

export const Stepper = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: { brand, soft, outline, success, warning, danger },
  defaultProps: { size: 'lg', variant: 'brand' }
})

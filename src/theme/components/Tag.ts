// src/theme/components/Tag.ts
import { tagAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys)

const focusRing = {
  _focusVisible: {
    outline: 'none',
    boxShadow: `0 0 0 3px ${colors.semanticFocusShadow}`
  }
}

/* Base (shared) */
const baseStyle = definePartsStyle({
  container: {
    borderRadius: '999px',
    lineHeight: 1,
    border: '1px solid transparent',
    transition: 'background .15s ease, color .15s ease, border-color .15s ease'
  },
  label: { fontWeight: 500 },
  closeButton: {
    ms: '6px',
    borderRadius: 'full',
    _hover: { opacity: 0.85 },
    ...focusRing
  },
  icon: { me: '6px' }
})

/* Variants */
const rounded = definePartsStyle({
  container: {
    bg: colors.backgroundTransparent12,
    color: colors.textSecondary,
    borderRadius: '21px'
  }
})

const parallelogram = definePartsStyle({
  container: {
    width: 'fit-content',
    textTransform: 'none',
    bg: colors.badgePurple,
    py: '2px',
    px: '10px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    fontWeight: '500',
    height: 'fit-content',
    color: colors.textPrimary,
    transform: 'skew(-10deg)'
  }
})

const soft = definePartsStyle({
  container: {
    bg: colors.backgroundTransparent12,
    color: colors.textSecondary,
    borderColor: colors.cardBorder01
  }
})

const solid = definePartsStyle({
  container: {
    bg: colors.solidButtonBg,
    color: colors.textRevertPrimary,
    border: 'none'
  }
})

const outline = definePartsStyle({
  container: {
    bg: 'transparent',
    color: colors.textSecondary,
    borderColor: colors.cardBorder01
  }
})

const gradient = definePartsStyle({
  container: {
    bg: colors.brandGradient,
    color: colors.textRevertPrimary,
    border: 'none'
  }
})

/** Semantic status helpers */
const statusFactory = (bg: string, fg: string, border?: string) =>
  definePartsStyle({
    container: {
      bg,
      color: fg,
      borderColor: border ?? 'transparent'
    }
  })

const status = {
  success: statusFactory(`${colors.semanticSuccess}33`, colors.semanticSuccess, colors.semanticSuccess),
  warning: statusFactory(`${colors.semanticWarning}33`, colors.semanticWarning, colors.semanticWarning),
  danger: statusFactory(`${colors.semanticError}33`, colors.semanticError, colors.semanticError),
  info: statusFactory(`${colors.semanticNeutral}33`, colors.semanticNeutral, colors.semanticNeutral)
}

/* Sizes */
const xs = definePartsStyle({
  container: { px: '6px', py: '2px' },
  label: { fontSize: '11px' },
  closeButton: { w: '14px', h: '14px' }
})

const sm = definePartsStyle({
  container: { px: '8px', py: '3px' },
  label: { fontSize: '12px' },
  closeButton: { w: '16px', h: '16px' }
})

const md = definePartsStyle({
  container: { px: '10px', py: '4px' },
  label: { fontSize: '14px' },
  closeButton: { w: '18px', h: '18px' }
})

const lg = definePartsStyle({
  container: { px: '12px', py: '6px' },
  label: { fontSize: '16px' },
  closeButton: { w: '20px', h: '20px' }
})

export const Tag = defineMultiStyleConfig({
  baseStyle,
  sizes: { xs, sm, md, lg },
  variants: {
    soft,
    solid,
    outline,
    gradient,
    rounded,
    parallelogram,
    ...status // status.success | status.warning | status.danger | status.info
  },
  defaultProps: {
    size: 'sm',
    variant: 'soft'
  }
})

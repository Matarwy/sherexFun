// src/theme/components/Card.ts
import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys)

/** Shared part styles */
const partBase = {
  header: {
    mb: 4,
    color: colors.textPrimary,
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '20px'
  },
  body: {
    color: colors.textSecondary,
    fontSize: '14px',
    lineHeight: '20px'
  },
  footer: {
    pt: 4,
    mt: 4,
    borderTop: `1px solid ${colors.dividerBg}`
  }
}

/** Variants */
const elevated = definePartsStyle({
  container: {
    position: 'relative',
    bg: colors.backgroundLight,
    border: colors.panelCardBorder,
    boxShadow: colors.panelCardShadow,
    borderRadius: '16px',
    px: 8,
    py: 12
  },
  ...partBase
})

const outline = definePartsStyle({
  container: {
    position: 'relative',
    bg: 'transparent',
    border: `1px solid ${colors.cardBorder01}`,
    boxShadow: 'none',
    borderRadius: '16px',
    px: 8,
    py: 12
  },
  ...partBase
})

const subtle = definePartsStyle({
  container: {
    position: 'relative',
    bg: colors.backgroundTransparent12,
    border: `1px solid ${colors.cardBorder01}`,
    boxShadow: 'none',
    borderRadius: '16px',
    px: 8,
    py: 12,
    backdropFilter: 'blur(4px)'
  },
  ...partBase
})

const glass = definePartsStyle({
  container: {
    position: 'relative',
    bg: colors.transparentContainerBg,
    border: `1px solid ${colors.cardBorder01}`,
    boxShadow: colors.panelCardShadow,
    borderRadius: '16px',
    px: 8,
    py: 12,
    backdropFilter: 'blur(10px)'
  },
  ...partBase
})

/** Interactive hover (great for clickable tiles) */
const interactive = definePartsStyle({
  container: {
    position: 'relative',
    bg: colors.backgroundLight,
    border: colors.panelCardBorder,
    boxShadow: colors.panelCardShadow,
    borderRadius: '16px',
    transition: 'transform .15s ease, box-shadow .2s ease',
    px: 8,
    py: 12,
    _hover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 28px rgba(0,0,0,.18), ' + String(colors.panelCardShadow)
    },
    _active: {
      transform: 'translateY(0)'
    }
  },
  ...partBase
})

/** Accent bar on inline-start (auto flips in RTL) */
const accent = definePartsStyle({
  container: {
    position: 'relative',
    bg: colors.backgroundLight,
    border: colors.panelCardBorder,
    boxShadow: colors.panelCardShadow,
    borderRadius: '16px',
    px: 8,
    py: 12,
    _before: {
      content: '""',
      position: 'absolute',
      insetInlineStart: 0,
      top: 0,
      bottom: 0,
      width: '6px',
      background: colors.brandGradient,
      borderTopStartRadius: '16px',
      borderBottomStartRadius: '16px'
    }
  },
  ...partBase
})

/** Base style (keeps spacing tokens consistent even if variant overrides bg) */
const baseStyle = definePartsStyle({
  container: {
    '--card-bg': colors.backgroundLight
  }
})

export const Card = defineMultiStyleConfig({
  baseStyle,
  variants: {
    elevated,
    outline,
    subtle,
    glass,
    interactive,
    accent
  },
  defaultProps: {
    variant: 'elevated'
  }
})

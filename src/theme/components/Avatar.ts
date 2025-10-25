// src/theme/components/Avatar.ts
import { avatarAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(avatarAnatomy.keys)

// Base (applies to all variants)
const baseStyle = definePartsStyle({
  container: {
    bg: colors.backgroundDark,
    color: colors.text02,
    borderRadius: 'full',
    border: `1px solid ${colors.cardBorder01}`,
    boxShadow: '0 1px 0 rgba(0,0,0,.04)',
    overflow: 'hidden',
    _img: { objectFit: 'cover' }
  },
  label: {
    fontWeight: 600,
    letterSpacing: '-0.01em'
  },
  excessLabel: {
    bg: colors.backgroundLight,
    color: colors.textSecondary,
    border: `1px solid ${colors.cardBorder01}`
  },
  badge: {
    border: `2px solid ${colors.backgroundLight}`,
    bg: colors.semanticSuccess
  }
})

// Variants
const brand = definePartsStyle({
  container: {
    bg: colors.solidButtonBg,
    color: colors.buttonSolidText,
    border: 'none',
    boxShadow: '0 0 0 1px rgba(0,0,0,.08)'
  }
})

const soft = definePartsStyle({
  container: {
    bg: colors.tokenAvatarBg,
    color: colors.textPrimary,
    border: `1px solid ${colors.cardBorder01}`,
    boxShadow: colors.panelCardShadow
  }
})

const outline = definePartsStyle({
  container: {
    bg: 'transparent',
    color: colors.textPrimary,
    border: `1px solid ${colors.cardBorder01}`
  }
})

const token = definePartsStyle({
  container: {
    bg: colors.tokenAvatarBg,
    color: colors.textPrimary,
    border: `1px solid ${colors.cardBorder01}`,
    boxShadow: '0 0 0 1px rgba(0,0,0,.06)'
  },
  label: {
    fontWeight: 700
  }
})

// Sizes
const size = (px: number, font: string) =>
  definePartsStyle({
    container: { w: px, h: px, fontSize: font },
    badge: { w: Math.round(px / 3.2), h: Math.round(px / 3.2) }
  })

const sizes = {
  xs: size(24, '10px'),
  sm: size(32, '12px'),
  md: size(40, '14px'),
  lg: size(48, '16px'),
  xl: size(56, '18px'),
  '2xl': size(72, '22px')
}

export const Avatar = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: {
    brand,
    soft,
    outline,
    token
  },
  defaultProps: {
    size: 'sm',
    variant: 'soft'
  }
})

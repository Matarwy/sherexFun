import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

import { colors } from '../cssVariables'

/** base for all badges */
const baseStyle = defineStyle({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '.35em',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  lineHeight: '1.1',
  borderRadius: '8px'
})

/** rounded chip */
const rounded = defineStyle({
  bg: colors.backgroundTransparent12,
  color: colors.textSecondary,
  px: '8px',
  py: '2px',
  borderRadius: '999px',
  border: `1px solid ${colors.cardBorder01}`,
  backdropFilter: 'blur(6px)'
})

/** ok (with dot) */
const ok = defineStyle({
  ...rounded,
  _before: {
    content: '""',
    display: 'inline-block',
    w: '.5em',
    h: '.5em',
    borderRadius: 'full',
    bg: colors.priceFloatingUp,
    transform: 'translateY(5%)',
    me: '.35em' // RTL-aware margin-end
  }
})

/** error (with dot) */
const error = defineStyle({
  ...rounded,
  _before: {
    content: '""',
    display: 'inline-block',
    w: '.5em',
    h: '.5em',
    borderRadius: 'full',
    bg: colors.priceFloatingDown,
    transform: 'translateY(5%)',
    me: '.35em'
  }
})

/** warning (with dot) */
const warning = defineStyle({
  ...rounded,
  _before: {
    content: '""',
    display: 'inline-block',
    w: '.5em',
    h: '.5em',
    borderRadius: 'full',
    bg: colors.semanticWarning,
    transform: 'translateY(5%)',
    me: '.35em'
  }
})

/** diagonal label */
const crooked = defineStyle({
  bg: colors.brandGradient, // SherexFun gradient
  color: colors.buttonSolidText,
  fontSize: '10px',
  fontWeight: 700,
  px: '8px',
  py: '2px',
  borderRadius: '4px',
  transform: 'matrix(1, 0, -0.22, 0.98, 0, 0)',
  boxShadow: '0 6px 14px rgba(0,0,0,.18)',
  border: '1px solid transparent'
})

/** solid brand pill */
const brand = defineStyle({
  bg: colors.solidButtonBg,
  color: colors.buttonSolidText,
  px: '10px',
  py: '3px',
  borderRadius: '999px',
  boxShadow: colors.panelCardShadow,
  border: 'none'
})

/** outline pill */
const outline = defineStyle({
  bg: 'transparent',
  color: colors.textSecondary,
  px: '10px',
  py: '3px',
  borderRadius: '999px',
  border: `1px solid ${colors.cardBorder01}`
})

export const Badge = defineStyleConfig({
  baseStyle,
  variants: {
    rounded,
    ok,
    error,
    warning,
    crooked,
    brand,
    outline
  },
  defaultProps: {
    variant: 'rounded'
  }
})

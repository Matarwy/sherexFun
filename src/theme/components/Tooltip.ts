// src/theme/components/Tooltip.ts
import { defineStyle, defineStyleConfig, Tooltip as _Tooltip } from '@chakra-ui/react'

import { colors } from '../cssVariables'

/** Base tooltip: uses tokenized bg/fg, border, and a soft panel shadow */
const baseStyle = defineStyle({
  bg: colors.tooltipBg,
  color: colors.textSecondary,
  border: '1px solid',
  borderColor: colors.dividerBg,
  borderRadius: '10px',
  px: 3,
  py: 2.5,
  fontSize: '12px',
  lineHeight: '1.25',
  boxShadow: colors.panelCardShadow,
  // make arrow match background and avoid double-shadow
  '--popper-arrow-bg': `${colors.tooltipBg}`,
  '--popper-arrow-shadow-color': 'transparent'
})

/** Card-like tooltip (for richer content) */
const card = defineStyle({
  bg: colors.popoverBg,
  color: colors.textPrimary,
  borderRadius: '12px',
  px: 4,
  py: 3,
  border: '1px solid',
  borderColor: colors.cardBorder01,
  boxShadow: colors.panelCardShadow,
  '--popper-arrow-bg': `${colors.popoverBg}`
})

/** Brand gradient callout */
const brand = defineStyle({
  bg: colors.brandGradient,
  color: colors.textRevertPrimary,
  border: 'none',
  boxShadow: 'none',
  '--popper-arrow-bg': `${colors.brandGradient}`
})

/** Warning callout */
const warning = defineStyle({
  bg: `${colors.semanticWarning}1A`, // ~10% alpha
  color: colors.semanticWarning,
  border: '1px solid',
  borderColor: colors.semanticWarning,
  '--popper-arrow-bg': `${colors.semanticWarning}1A`
})

const sizes = {
  sm: defineStyle({ fontSize: '11px', px: 2.5, py: 2 }),
  md: defineStyle({ fontSize: '12px', px: 3, py: 2.5 }),
  lg: defineStyle({ fontSize: '14px', px: 4, py: 3 })
}

/** sensible defaults */
_Tooltip.defaultProps = {
  hasArrow: true,
  placement: 'top',
  openDelay: 150
}

export const Tooltip = defineStyleConfig({
  baseStyle,
  sizes,
  variants: { card, brand, warning },
  defaultProps: { size: 'md' }
})

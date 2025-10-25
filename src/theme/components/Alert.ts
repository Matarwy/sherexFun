import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    position: 'relative',
    ps: 6, // padding-inline-start (RTL-aware)
    pe: 8, // padding-inline-end   (RTL-aware)
    py: 5,
    bg: colors.backgroundLight,
    border: `1px solid ${colors.cardBorder01}`,
    boxShadow: colors.panelCardShadow,
    borderRadius: '12px',
    // Accent bar on the inline-start edge (LTR: left, RTL: right)
    _before: {
      content: '""',
      position: 'absolute',
      insetInlineStart: 0,
      top: 0,
      bottom: 0,
      width: '6px',
      background: colors.primary,
      borderTopStartRadius: '12px',
      borderBottomStartRadius: '12px'
    }
  },
  title: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '20px',
    color: colors.textPrimary
  },
  description: {
    mt: 3,
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    color: colors.textSenary
  },
  icon: {
    color: colors.primary
  }
})

export const Alert = defineMultiStyleConfig({
  baseStyle
})

// src/theme/components/Drawer.ts
import { drawerAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(drawerAnatomy.keys)

const baseStyle = definePartsStyle({
  overlay: {
    bg: 'rgba(0,0,0,0.55)',
    backdropFilter: 'blur(2px)'
  },
  dialogContainer: {
    // centers by default; variants can override alignment
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: [0, 4]
  },
  dialog: {
    bg: colors.backgroundLight,
    border: colors.panelCardBorder,
    boxShadow: colors.panelCardShadow,
    borderRadius: ['18px', '16px'],
    maxH: '90vh',
    overflow: 'hidden'
  },
  header: {
    px: ['16px', '20px'],
    py: ['12px', '16px'],
    color: colors.textPrimary,
    borderBottom: `1px solid ${colors.dividerBg}`
  },
  closeButton: {
    transform: 'scale(1.1)',
    top: ['12px', '16px'],
    insetInlineEnd: ['12px', '16px'], // RTL-aware
    color: colors.textSecondary,
    _hover: { bg: colors.backgroundTransparent07 },
    _focusVisible: {
      boxShadow: `0 0 0 3px ${colors.semanticFocusShadow}`,
      outline: 'none'
    }
  },
  body: {
    px: ['16px', '20px'],
    py: ['16px', '24px'],
    color: colors.textSecondary
  },
  footer: {
    bg: colors.backgroundTransparent12,
    color: colors.secondary,
    display: 'flex',
    justifyContent: 'center',
    px: ['16px', '20px'],
    py: ['12px', '14px'],
    borderTop: `1px solid ${colors.dividerBg}`
  }
})

/** Edge-to-edge desktop panel, flush on small screens */
const flatScreenEdgePanel = definePartsStyle({
  dialogContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  dialog: {
    my: ['0', '80px'],
    mx: ['0', '40px'],
    borderRadius: ['0px', '16px']
  }
})

/** Bottom sheet: docks to bottom, adds grab handle, removes footer bg */
const popFromBottom = definePartsStyle({
  dialogContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    px: 0
  },
  dialog: {
    w: '100%',
    maxW: 'var(--chakra-sizes-container-lg)',
    borderTopRadius: ['14px', '18px'],
    borderBottomRadius: '0',
    pt: 2,
    _before: {
      content: '""',
      display: 'block',
      w: '44px',
      h: '4px',
      bg: colors.dividerBg,
      borderRadius: '999px',
      mx: 'auto',
      my: 2
    }
  },
  header: {
    borderBottom: 'none',
    pt: 0,
    pb: ['8px', '10px']
  },
  body: {
    py: ['8px', '12px']
  },
  footer: {
    bg: 'transparent',
    borderTop: 'none',
    pt: 0
  }
})

export const Drawer = defineMultiStyleConfig({
  baseStyle,
  variants: {
    flatScreenEdgePanel,
    popFromBottom
  },
  defaultProps: {
    // no forced variant; base works for standard Drawer placements
  }
})

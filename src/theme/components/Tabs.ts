// src/theme/components/Tabs.ts
import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys)

const focusRing = {
  _focusVisible: {
    outline: 'none',
    boxShadow: `0 0 0 3px ${colors.semanticFocusShadow}`
  }
}

const baseStyle = definePartsStyle({
  root: { position: 'relative' },
  tab: {
    position: 'relative',
    color: colors.textSecondary,
    fontWeight: 500,
    px: '10px',
    py: '8px',
    border: 'none !important',
    bg: 'transparent',
    transition: 'color .15s ease, background .15s ease',
    _hover: { color: colors.textPrimary, bg: 'transparent' },
    _selected: { color: colors.textPrimary, bg: 'transparent' },
    _disabled: { opacity: 0.5, cursor: 'not-allowed' },
    ...focusRing
  },
  tablist: {
    position: 'relative',
    border: 'none',
    borderBottom: 'none',
    gap: 1
  },
  tabpanel: {
    px: 0,
    py: 0
  },
  indicator: {
    transitionDuration: '300ms !important',
    bg: colors.textSecondary,
    borderRadius: 'md',
    height: '2px'
  }
})

/* === Variants === */

// soft square highlight behind the selected tab
const square = definePartsStyle({
  tab: {
    color: 'rgba(171,196,255,.65)',
    _selected: { color: colors.textSecondary, fontWeight: 600 },
    zIndex: 2
  },
  indicator: {
    zIndex: 1,
    h: '100%',
    bg: colors.backgroundTransparent12,
    borderRadius: ['6px', 'md']
  }
})

// brand underline (gradient line)
const line = definePartsStyle({
  tab: { _selected: { color: colors.textPrimary } },
  tablist: { border: 'none !important', borderBottom: 'none' },
  indicator: {
    bottom: '1px',
    height: '3px',
    bgGradient: colors.brandGradient,
    borderRadius: 'md'
  }
})

// segmented control on translucent surface
const squarePanel = definePartsStyle({
  root: {
    bg: colors.backgroundTransparent12,
    borderRadius: '8px',
    p: '4px',
    position: 'relative'
  },
  tab: {
    color: colors.textSecondary,
    _selected: { color: colors.textPrimary, fontWeight: 600 },
    zIndex: 2
  },
  indicator: {
    zIndex: 1,
    h: '100%',
    bg: colors.backgroundTransparent12,
    borderRadius: 'md'
  }
})

// segmented control on dark chip
const squarePanelDark = definePartsStyle({
  root: {
    bg: colors.backgroundDark,
    borderRadius: '8px',
    p: '4px',
    position: 'relative'
  },
  tab: {
    color: colors.textSecondary,
    opacity: 0.6,
    _selected: { color: colors.textSecondary, opacity: 1, fontWeight: 600 },
    zIndex: 2
  },
  indicator: {
    zIndex: 1,
    h: '100%',
    bg: colors.backgroundTransparent12,
    borderRadius: 'md'
  }
})

// pill highlight (brand gradient in dark, solid in light)
const rounded = definePartsStyle((props) => {
  const isLight = props.colorMode === 'light'
  return {
    root: {
      bg: colors.backgroundTransparent12,
      borderRadius: '27px',
      p: '4px',
      position: 'relative'
    },
    tab: {
      color: colors.textSecondary,
      _selected: { color: colors.textRevertPrimary, fontWeight: 600 },
      zIndex: 2
    },
    indicator: {
      zIndex: 1,
      h: '100%',
      bg: isLight ? colors.solidButtonBg : colors.brandGradient,
      borderRadius: '27px'
    }
  }
})

// pill on light card
const roundedLight = definePartsStyle({
  root: {
    bg: colors.backgroundLight,
    borderRadius: '8px',
    p: '4px',
    position: 'relative'
  },
  tab: {
    color: colors.secondary,
    px: '8px',
    _selected: { color: colors.secondary, fontWeight: 600 },
    zIndex: 2
  },
  indicator: {
    zIndex: 0,
    h: '100%',
    bg: colors.backgroundDark,
    borderRadius: '8px'
  }
})

// plain rounded group (no indicator fill)
const roundedPlain = definePartsStyle({
  root: {
    bg: colors.backgroundTransparent12,
    borderRadius: '43px',
    p: '4px',
    position: 'relative'
  },
  tab: {
    color: colors.textSecondary,
    opacity: 0.6,
    _selected: { color: colors.textSecondary, opacity: 1, fontWeight: 600 }
  },
  tablist: { px: '8px' }
})

// switch-like pills (uses brand switch color)
const roundedSwitch = definePartsStyle({
  root: {
    bg: colors.backgroundTransparent12,
    borderRadius: '27px',
    p: '4px',
    position: 'relative'
  },
  tab: { color: colors.textSecondary, fontWeight: 500, zIndex: 2 },
  indicator: {
    zIndex: 1,
    h: '100%',
    bg: colors.switchOn,
    borderRadius: '27px'
  }
})

// “folder” style; rewritten with logical insets for RTL
const folder = definePartsStyle({
  tab: {
    color: colors.textSecondary,
    fontWeight: 400,
    bg: 'transparent',
    py: '12px',
    px: '3%',
    mx: '3%',
    _selected: {
      fontWeight: 600,
      color: colors.textPrimary,
      bg: colors.backgroundLight,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        insetInlineStart: '-20px',
        w: '36px',
        bg: 'inherit',
        borderTopStartRadius: '10px',
        transform: 'skewX(-25deg)'
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        insetInlineEnd: '-20px',
        w: '36px',
        bg: 'inherit',
        borderTopEndRadius: '10px',
        transform: 'skewX(25deg)'
      }
    }
  },
  indicator: {
    bottom: '2px',
    bgGradient: colors.brandGradient,
    height: '2px',
    borderRadius: 'md',
    transform: 'scaleX(0.2)'
  },
  tablist: { bg: colors.tabFolderTabListBg }
})

/* === Sizes === */
const sizes = {
  xs: definePartsStyle({ tab: { px: '6px', py: '4px', fontSize: 'xs' } }),
  sm: definePartsStyle({ tab: { px: '10px', py: '6px', fontSize: 'sm' } }),
  md: definePartsStyle({ tab: { px: '16px', py: '8px', fontSize: 'md' } }),
  lg: definePartsStyle({ tab: { px: '16px', py: '10px', fontSize: 'lg' } }),
  xl: definePartsStyle({ tab: { px: '16px', py: '12px', fontSize: 'xl' } })
}

export const Tabs = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: {
    line,
    square,
    squarePanel,
    squarePanelDark,
    rounded,
    roundedLight,
    roundedPlain,
    roundedSwitch,
    folder
  },
  defaultProps: { variant: 'line', size: 'sm' }
})

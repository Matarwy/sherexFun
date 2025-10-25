// src/theme/components/Switch.ts
import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys)

const focusRing = {
  _focusVisible: {
    outline: 'none',
    boxShadow: `0 0 0 3px ${colors.semanticFocusShadow}`
  }
}

/** Base */
const baseStyle = definePartsStyle({
  container: {
    // default (overridden by sizes)
    '--sf-switch-w': '2.25em',
    '--sf-switch-h': '1.25em'
  },

  track: {
    w: 'var(--sf-switch-w)',
    h: 'var(--sf-switch-h)',
    bg: colors.backgroundTransparent12,
    borderRadius: '999px',
    border: `1px solid ${colors.cardBorder01}`,
    transition: 'background .2s ease, border-color .2s ease',
    _checked: {
      bg: colors.selectActiveSecondary,
      borderColor: 'transparent'
    },
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  },

  thumb: {
    bg: colors.switchOff,
    boxShadow: colors.panelCardShadow,
    transition: 'transform .2s ease, background .2s ease',
    _checked: { bg: colors.switchOn },
    _disabled: { opacity: 0.9 },
    ...focusRing
  }
})

/** Sizes (track width/height + thumb size tied together) */
const sizes = {
  sm: definePartsStyle({
    container: { '--sf-switch-w': '1.75em', '--sf-switch-h': '1em' },
    track: { w: 'var(--sf-switch-w)', h: 'var(--sf-switch-h)' },
    thumb: {
      w: 'calc(var(--sf-switch-h) - 6px)',
      h: 'calc(var(--sf-switch-h) - 6px)'
    }
  }),
  md: definePartsStyle({
    container: { '--sf-switch-w': '2.25em', '--sf-switch-h': '1.25em' },
    track: { w: 'var(--sf-switch-w)', h: 'var(--sf-switch-h)' },
    thumb: {
      w: 'calc(var(--sf-switch-h) - 6px)',
      h: 'calc(var(--sf-switch-h) - 6px)'
    }
  }),
  lg: definePartsStyle({
    container: { '--sf-switch-w': '3em', '--sf-switch-h': '1.5em' },
    track: { w: 'var(--sf-switch-w)', h: 'var(--sf-switch-h)' },
    thumb: {
      w: 'calc(var(--sf-switch-h) - 6px)',
      h: 'calc(var(--sf-switch-h) - 6px)'
    }
  })
}

/** Variants */
const brand = definePartsStyle({
  track: {
    bg: colors.backgroundTransparent12,
    _checked: { bg: colors.secondary }
  },
  thumb: {
    _checked: { bg: colors.buttonSolidText } // crisp contrast when on
  }
})

const soft = definePartsStyle({
  track: {
    bg: colors.backgroundTransparent12,
    border: 'none',
    _checked: { bg: colors.selectActiveSecondary }
  },
  thumb: { _checked: { bg: colors.textPrimary } }
})

const glass = definePartsStyle({
  track: {
    bg: colors.transparentContainerBg,
    border: `1px solid ${colors.cardBorder01}`,
    backdropFilter: 'blur(6px)',
    _checked: { bg: colors.filledProgressBg, borderColor: 'transparent' }
  },
  thumb: { _checked: { bg: colors.background01 } }
})

const success = definePartsStyle({
  track: { _checked: { bg: colors.semanticSuccess } },
  thumb: { _checked: { bg: colors.buttonSolidText } }
})

const warning = definePartsStyle({
  track: { _checked: { bg: colors.semanticWarning } },
  thumb: { _checked: { bg: colors.background01 } }
})

const danger = definePartsStyle({
  track: { _checked: { bg: colors.semanticError } },
  thumb: { _checked: { bg: colors.buttonSolidText } }
})

export const Switch = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: { brand, soft, glass, success, warning, danger },
  defaultProps: {
    size: 'md',
    variant: 'brand'
  }
})

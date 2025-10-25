// src/theme/components/Modal.ts
import { modalAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, Modal as _Modal } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(modalAnatomy.keys)

const baseStyle = definePartsStyle({
  overlay: {
    bg: 'rgba(0,0,0,0.55)',
    backdropFilter: 'blur(2px)'
  },
  dialogContainer: {
    // centered by default; keep responsive side paddings
    px: [0, 4]
  },
  dialog: {
    bg: colors.backgroundLight,
    border: colors.panelCardBorder,
    boxShadow: colors.panelCardShadow,
    paddingInline: ['20px', '24px'],
    paddingBlock: '18px',
    borderRadius: ['20px', '12px'],
    maxH: ['95%', '90%'],
    overflow: 'hidden'
  },
  header: {
    px: 0,
    mt: ['4px', '10px'],
    mb: ['16px', '18px'],
    fontSize: ['lg', 'xl'],
    fontWeight: 600,
    color: colors.textPrimary,
    borderBottom: `1px solid ${colors.dividerBg}`,
    pb: 3
  },
  body: {
    p: 0,
    overflow: 'auto',
    color: colors.textSecondary
  },
  footer: {
    p: 0,
    mt: 4
  },
  closeButton: {
    top: ['24px', '28px'],
    insetInlineEnd: ['24px', '32px'], // RTL-aware
    w: '2em',
    h: '2em',
    color: colors.textSecondary,
    _hover: { bg: colors.backgroundTransparent07 },
    _focusVisible: { boxShadow: `0 0 0 3px ${colors.semanticFocusShadow}`, outline: 'none' }
  }
})

/** sizes */
const sm = definePartsStyle({ dialog: { w: 'min(300px, 90vw)' } })
const md = definePartsStyle({ dialog: { w: 'min(464px, 90vw)' } })
const lg = definePartsStyle({ dialog: { w: 'min(674px, 90vw)' } })
const xl = definePartsStyle({
  dialog: { w: 'min(720px, 90vw)', h: ['100%', 'auto'] },
  closeButton: { top: ['24px', '32px'], insetInlineEnd: ['24px', '32px'], transform: 'scale(1.15)' }
})
const _2xl = definePartsStyle({ dialog: { w: 'min(864px, 90vw)' } })
const _3xl = definePartsStyle({ dialog: { w: 'min(960px, 90vw)' } })

/** variants */
const elevated = definePartsStyle({
  dialog: {
    bg: colors.backgroundLight,
    border: colors.panelCardBorder,
    boxShadow: colors.panelCardShadow
  }
})

const glass = definePartsStyle({
  dialog: {
    bg: colors.transparentContainerBg,
    border: `1px solid ${colors.cardBorder01}`,
    boxShadow: colors.panelCardShadow,
    backdropFilter: 'blur(10px)'
  },
  header: { borderBottom: 'none', pb: 2 }
})

/** mobile full page sheet */
const mobileFullPage = definePartsStyle({
  dialog: {
    w: ['100vw', 'min(464px, 90vw)'],
    maxW: 'unset',
    h: ['100%', 'unset'],
    maxH: ['100%', '80%'],
    borderRadius: ['0', '12px'],
    pt: 2
  },
  header: { borderBottom: 'none', mt: 1, mb: 3 },
  overlay: { bg: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }
})

export const Modal = defineMultiStyleConfig({
  baseStyle,
  sizes: { sm, md, lg, xl, '2xl': _2xl, '3xl': _3xl },
  variants: { elevated, glass, mobileFullPage },
  defaultProps: {
    size: 'md',
    variant: 'elevated'
  }
})

// Optional: keep your app default centered behavior
// (Chakra doesn't support `isCentered` via style config)
_Modal.defaultProps = { isCentered: true }

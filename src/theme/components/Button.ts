// src/theme/components/Button.ts
import { colors } from '../cssVariables'

const focusRing = {
  _focusVisible: {
    boxShadow: `0 0 0 3px ${colors.semanticFocusShadow}`,
    outline: 'none'
  }
}
const disabledState = {
  _disabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
    pointerEvents: 'none'
  },
  '&[aria-disabled="true"]': {
    opacity: 0.45,
    cursor: 'not-allowed',
    pointerEvents: 'none'
  }
}

export const Button = {
  baseStyle: {
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: '10px',
    transitionProperty: 'var(--chakra-transition-property-common)',
    transitionDuration: 'var(--chakra-transition-duration-fast)',
    ...focusRing
  },
  sizes: {
    xs: {
      h: '24px',
      px: '8px',
      fontSize: '11px',
      borderRadius: '999px'
    },
    sm: {
      minH: '32px',
      minW: '100px',
      px: '12px',
      fontSize: '12px'
    },
    md: {
      minH: '40px',
      minW: '120px',
      px: '16px',
      fontSize: '14px'
    },
    lg: {
      minH: '48px',
      minW: '140px',
      px: '18px',
      fontSize: '15px'
    }
  },
  variants: {
    solid: {
      bg: colors.solidButtonBg,
      color: colors.buttonSolidText,
      border: 'none',
      _hover: { bg: colors.solidButtonBg, filter: 'brightness(1.02)' },
      _active: { bg: colors.solidButtonBg, filter: 'brightness(0.94)' },
      ...disabledState
    },
    'solid-dark': {
      bg: colors.backgroundDark,
      color: colors.textSecondary,
      border: `1px solid ${colors.cardBorder01}`,
      _hover: { bg: colors.backgroundDark50 },
      _active: { bg: colors.backgroundDark },
      ...disabledState
    },
    soft: {
      // subtle filled brand
      bg: colors.backgroundTransparent12,
      color: colors.textSecondary,
      border: `1px solid ${colors.cardBorder01}`,
      _hover: { bg: colors.backgroundTransparent07 },
      _active: { bg: colors.backgroundTransparent12 },
      ...disabledState
    },
    capsule: {
      bg: colors.backgroundTransparent12,
      color: colors.textTertiary,
      border: '1px solid transparent',
      borderRadius: '999px',
      minW: 'revert',
      minH: 'revert',
      _hover: { bg: colors.backgroundTransparent07 },
      _active: {
        borderColor: `var(--active-border-color, ${colors.selectActive})`,
        color: `var(--active-color, ${colors.textSecondary})`
      },
      ...disabledState
    },
    'capsule-radio': {
      bg: colors.backgroundTransparent12,
      color: colors.textSecondary,
      border: '1px solid transparent',
      borderRadius: '999px',
      minW: 'revert',
      minH: 'revert',
      _hover: { bg: colors.backgroundTransparent07 },
      _active: {
        borderColor: `var(--active-border-color, ${colors.selectActiveSecondary})`,
        color: `var(--active-color, ${colors.textPrimary})`,
        fontWeight: 600
      },
      ...disabledState
    },
    'rect-rounded-radio': {
      bg: colors.backgroundTransparent12,
      color: colors.textTertiary,
      borderRadius: '8px',
      minW: 'revert',
      minH: 'revert',
      _hover: { bg: colors.backgroundTransparent07 },
      _active: { color: colors.textSecondary },
      ...disabledState
    },
    outline: {
      color: colors.secondary,
      border: `1px solid ${colors.secondary}`,
      bg: 'transparent',
      _hover: { bg: colors.outlineButtonBg },
      _active: { bg: colors.outlineButtonBg, filter: 'brightness(0.96)' },
      ...disabledState
    },
    ghost: {
      color: colors.secondary,
      bg: 'transparent',
      minW: 'revert',
      minH: 'revert',
      _hover: { bg: colors.outlineButtonBg },
      _active: { bg: colors.outlineButtonBg, filter: 'brightness(0.96)' },
      ...disabledState
    },
    danger: {
      bg: colors.semanticError,
      color: colors.buttonSolidText,
      _hover: { bg: colors.semanticError, filter: 'brightness(1.02)' },
      _active: { bg: colors.semanticError, filter: 'brightness(0.94)' },
      ...disabledState
    },
    icon: {
      // square icon button
      minW: 'revert',
      minH: 'revert',
      w: '36px',
      h: '36px',
      p: 0,
      borderRadius: '10px',
      bg: colors.backgroundTransparent12,
      color: colors.textSecondary,
      _hover: { bg: colors.backgroundTransparent07 },
      _active: { bg: colors.backgroundTransparent12 },
      ...disabledState
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'solid'
  }
}

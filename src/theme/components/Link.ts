// src/theme/components/Link.ts
import { colors } from '../cssVariables'

export const Link = {
  baseStyle: {
    fontWeight: 600,
    color: colors.textLink,
    display: 'inline',
    textDecoration: 'none',
    transitionProperty: 'color, text-decoration-color, background-color, outline-color',
    transitionDuration: 'var(--chakra-transition-duration-fast)',
    textUnderlineOffset: '3px',
    textDecorationThickness: '2px',
    _hover: {
      textDecoration: 'underline',
      textDecorationColor: 'currentColor'
    },
    _active: {
      opacity: 0.9
    },
    _visited: {
      color: colors.textPurple
    },
    _focusVisible: {
      outline: `3px solid ${colors.semanticFocusShadow}`,
      outlineOffset: '2px'
    },
    _disabled: {
      color: colors.textTertiary,
      cursor: 'not-allowed',
      pointerEvents: 'none',
      textDecoration: 'none'
    }
  },

  variants: {
    // keep existing API
    outline: {
      textDecoration: 'none',
      _hover: { textDecoration: 'none' }
    },
    highlight: {
      color: colors.textSeptenary,
      textDecoration: 'underline',
      textDecorationColor: 'currentColor',
      textUnderlineOffset: '3px',
      textDecorationThickness: '2px'
    },

    // new: softer default link for body copy
    subtle: {
      color: colors.textSecondary,
      _hover: {
        color: colors.textLink,
        textDecoration: 'underline'
      }
    },

    // new: top navigation tabs/links
    nav: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      px: 2,
      py: 1,
      borderRadius: '8px',
      color: colors.textSecondary,
      textDecoration: 'none',
      _hover: { bg: colors.backgroundTransparent07 },
      _active: { bg: colors.backgroundTransparent12 }
    },

    // new: external link with arrow (opt-in)
    external: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      textDecoration: 'underline',
      _after: {
        content: '"↗"',
        fontSize: '0.85em',
        transform: 'translateY(-1px)'
      }
    }
  }
}

// src/theme/components/Popover.ts
import { colors } from '../cssVariables'

export const Popover = {
  baseStyle: {
    popper: {
      // larger zIndex than menus/tooltips
      zIndex: 1200,
      border: 'none',
      '--popper-arrow-size': '12px'
    },
    content: {
      // keep arrow/content perfectly in sync with a local var
      '--sf-popover-bg': colors.popoverBg,
      bg: 'var(--sf-popover-bg)',
      border: colors.panelCardBorder,
      boxShadow: colors.panelCardShadow,
      borderRadius: '12px',
      width: 'fit-content',
      maxWidth: '320px',
      overflow: 'hidden',
      _focusVisible: {
        outline: 'none',
        boxShadow: `0 0 0 3px ${colors.semanticFocusShadow}`
      }
    },
    header: {
      border: 'none',
      px: 4,
      pt: 3,
      pb: 2,
      fontSize: '14px',
      fontWeight: 600,
      color: colors.textPrimary
    },
    body: {
      px: 4,
      pb: 3,
      pt: 0,
      fontSize: '12px',
      color: colors.textSecondary
    },
    footer: {
      px: 4,
      py: 3,
      borderTop: `1px solid ${colors.dividerBg}`
    },
    arrow: {
      boxShadow: 'none !important',
      borderColor: 'var(--sf-popover-bg)',
      bg: 'var(--sf-popover-bg) !important'
    },
    closeButton: {
      insetInlineEnd: 2, // RTL-safe
      insetBlockStart: 2,
      color: colors.textSecondary,
      _hover: { bg: colors.backgroundTransparent07 },
      _focusVisible: {
        outline: 'none',
        boxShadow: `0 0 0 3px ${colors.semanticFocusShadow}`
      }
    }
  },

  variants: {
    // default — card-like surface
    elevated: {
      content: {
        '--sf-popover-bg': colors.popoverBg,
        border: colors.panelCardBorder,
        boxShadow: colors.panelCardShadow
      }
    },

    // frosted sheet
    glass: {
      content: {
        '--sf-popover-bg': colors.transparentContainerBg,
        border: `1px solid ${colors.cardBorder01}`,
        boxShadow: colors.panelCardShadow,
        backdropFilter: 'blur(10px)'
      },
      header: { pb: 1 },
      footer: { borderTop: 'none', pt: 2 }
    },

    // soft, low-contrast surface
    soft: {
      content: {
        '--sf-popover-bg': colors.backgroundTransparent12,
        border: `1px solid ${colors.cardBorder01}`,
        boxShadow: 'none',
        backdropFilter: 'blur(6px)'
      }
    },

    // status tints (nice for warnings/errors/info)
    info: {
      content: { '--sf-popover-bg': colors.infoButtonBg }
    },
    warning: {
      content: { '--sf-popover-bg': colors.warnButtonLightBg }
    },
    danger: {
      content: { '--sf-popover-bg': colors.background03 } // uses your pink-10 surface
    }
  },

  sizes: {
    sm: {
      content: { maxWidth: '260px', borderRadius: '10px' },
      header: { px: 3, pt: 2, pb: 1, fontSize: '13px' },
      body: { px: 3, pb: 2, fontSize: '12px' },
      footer: { px: 3, py: 2 }
    },
    md: {
      // matches base
    },
    lg: {
      content: { maxWidth: '420px', borderRadius: '14px' },
      header: { fontSize: '15px' },
      body: { fontSize: '13px' }
    }
  },

  defaultProps: {
    size: 'md',
    variant: 'elevated'
  }
}

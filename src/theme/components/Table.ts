// src/theme/components/Table.ts
import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

import { colors } from '../cssVariables'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tableAnatomy.keys)

/** Base styles shared by all variants */
const baseStyle = definePartsStyle({
  table: {
    w: 'full',
    borderCollapse: 'separate',
    borderSpacing: 0,
    bg: 'transparent'
  },

  thead: {
    tr: {
      bg: colors.backgroundLight
    },
    th: {
      py: '10px',
      ps: '12px',
      pe: '12px',
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      textTransform: 'none',
      color: colors.textSecondary,
      borderBottom: `1px solid ${colors.cardBorder01}`,

      // rounded header corners
      '&:first-of-type': { borderStartStartRadius: '12px' },
      '&:last-of-type': { borderStartEndRadius: '12px' },

      // numeric alignment support
      '&[data-is-numeric=true]': { textAlign: 'end' }
    }
  },

  tbody: {
    tr: {
      bg: 'transparent',
      transition: 'background .15s ease'
    },
    td: {
      py: '12px',
      ps: '12px',
      pe: '12px',
      fontSize: '14px',
      color: colors.textPrimary,
      borderBottom: `1px solid ${colors.dividerBg}`,
      '&[data-is-numeric=true]': { textAlign: 'end' }
    }
  },

  tfoot: {
    tr: { bg: colors.backgroundLight },
    td: {
      py: '10px',
      ps: '12px',
      pe: '12px',
      fontWeight: 600,
      color: colors.textSecondary,
      borderTop: `1px solid ${colors.cardBorder01}`
    }
  },

  tr: {},
  th: {},
  td: {},

  caption: {
    mt: 2,
    color: colors.textTertiary,
    fontSize: 'sm',
    textAlign: 'start'
  }
})

/** Sizes — tune paddings & font sizes coherently */
const sizes = {
  sm: definePartsStyle({
    thead: { th: { py: '8px', ps: '10px', pe: '10px', fontSize: '11px' } },
    tbody: { td: { py: '10px', ps: '10px', pe: '10px', fontSize: '13px' } },
    tfoot: { td: { py: '8px', ps: '10px', pe: '10px' } }
  }),
  md: definePartsStyle({
    thead: { th: { py: '12px', ps: '14px', pe: '14px', fontSize: '12px' } },
    tbody: { td: { py: '14px', ps: '14px', pe: '14px', fontSize: '14px' } },
    tfoot: { td: { py: '12px', ps: '14px', pe: '14px' } }
  }),
  lg: definePartsStyle({
    thead: { th: { py: '14px', ps: '16px', pe: '16px', fontSize: '13px' } },
    tbody: { td: { py: '16px', ps: '16px', pe: '16px', fontSize: '15px' } },
    tfoot: { td: { py: '14px', ps: '16px', pe: '16px' } }
  })
}

/** Variants */
const subtle = definePartsStyle({
  tbody: {
    tr: {
      _hover: { bg: colors.backgroundTransparent07 }
    }
  }
})

const striped = definePartsStyle({
  tbody: {
    tr: {
      '&:nth-of-type(odd)': { bg: colors.backgroundTransparent07 },
      '&:nth-of-type(even)': { bg: 'transparent' },
      _hover: { bg: colors.backgroundTransparent12 }
    }
  }
})

const outline = definePartsStyle({
  table: {
    border: `1px solid ${colors.cardBorder01}`,
    borderRadius: '12px',
    overflow: 'hidden'
  },
  thead: {
    th: { borderBottom: `1px solid ${colors.cardBorder01}` }
  },
  tbody: {
    td: { borderBottom: `1px solid ${colors.cardBorder01}` },
    tr: { _hover: { bg: colors.backgroundTransparent07 } }
  }
})

const card = definePartsStyle({
  table: {
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: colors.panelCardShadow,
    bg: colors.backgroundLight,
    border: colors.panelCardBorder
  },
  thead: {
    tr: { bg: colors.backgroundLight }
  }
})

/** Sticky header with frosted backdrop (great for long lists) */
const stickyHeader = definePartsStyle({
  thead: {
    tr: { position: 'sticky', top: 0, zIndex: 1 },
    th: {
      bg: colors.backgroundLight,
      _before: {
        content: '""',
        position: 'absolute',
        insetInline: 0,
        bottom: '-1px',
        height: '1px',
        bg: colors.cardBorder01
      }
    }
  }
})

export const Table = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: { subtle, striped, outline, card, stickyHeader },
  defaultProps: {
    size: 'sm',
    variant: 'subtle'
  }
})

// global layout config (plain JS values; not state or CSS vars)

// Keep a numeric constant for easy math + an exported string for CSS usage.
export const CONTENT_WIDTH_PX = 1600
export const contentWidth = `${CONTENT_WIDTH_PX}px`

/**
 * Use with Chakra's px / paddingInline:
 *   <Box px={appLayoutPaddingInline} />
 * Works for both LTR and RTL (symmetric gutters).
 */
export const appLayoutPaddingInline = ['20px', `max((100vw - ${contentWidth}) / 2, 7%)`]

export const appLayoutPaddingX = appLayoutPaddingInline
export const revertAppLayoutPaddingInline = ['20px', `max((100vw - ${contentWidth}) / 2, 7%)`]
export const revertAppLayoutPaddingX = revertAppLayoutPaddingInline

/**
 * Negative inline margin to let full-bleed children extend into the gutters.
 * Example:
 *   <Box mx={appLayoutNegativeMarginInline}> ...full-bleed section... </Box>
 */
export const appLayoutNegativeMarginInline = ['-20px', `min((100vw - ${contentWidth}) / -2, -7%)`]

/** Base window width used for clamp scaling of grid column slots */
const BASE_WINDOW_WIDTH = 1440

const clampSlot = (px: number, fr: number) =>
  `minmax(clamp(${px * 0.8}px, ${((px / BASE_WINDOW_WIDTH) * 100).toFixed(2)}vw, ${px * 1.2}px), ${fr}fr)`

const autoSlot = (fr: number) => `minmax(0, ${fr}fr)`

const getGridSlot = (body: number | 'auto', fr: number) => (body === 'auto' ? autoSlot(fr) : clampSlot(body, fr))

/**
 * 3-column template: [side] [center] [side]
 * - side: number in px or 'auto'
 * - center: number in px
 * Returns a CSS string for grid-template-columns.
 */
export function genCSS3GridTemplateColumns(options: { rightLeft?: number | 'auto'; center: number }) {
  const rl = options.rightLeft ?? 'auto'
  return `${getGridSlot(rl, 1)} ${getGridSlot(options.center, 1.5)} ${getGridSlot(rl, 1)}`
}

/**
 * 2-column template: [side] [center]
 * - side: number in px or 'auto'
 * - center: number in px
 * Returns a CSS string for grid-template-columns.
 */
export function genCSS2GridTemplateColumns(options: { rightLeft?: number | 'auto'; center: number }) {
  const rl = options.rightLeft ?? 'auto'
  return `${getGridSlot(rl, 1)} ${getGridSlot(options.center, 1.5)}`
}

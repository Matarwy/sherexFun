type CSSLengthPoint = [valuePx: number /* px */, contextSizePx: number /* px */]

type AxisUnit = 'vw' | 'vh' | 'vmin' | 'vmax' | 'cqw' | 'cqh'
type OutUnit = 'px' | 'rem'

/** tiny helpers */
const round = (n: number, p = 4) => {
  const v = Number(n.toFixed(p))
  // avoid "-0"
  return Object.is(v, -0) ? 0 : v
}
const toRem = (px: number, base = 16) => `${round(px / base)}rem`
const px = (n: number) => `${round(n)}px`

/**
 * Build a fluid expression between two points: (viewport, value) pairs.
 * p1: [valuePx at contextSizePx], p2: [valuePx at contextSizePx]
 * - unitOverride lets you use vmin/vmax or container units (cqw/cqh)
 * - output 'rem' converts only the constant term + clamp bounds to rem
 */
export function getViewportExpression({
  direction,
  p1,
  p2,
  clamp = false,
  precision = 4,
  unitOverride,
  output = 'px',
  remBase = 16
}: {
  direction: 'w' | 'h'
  p1: CSSLengthPoint
  p2: CSSLengthPoint
  clamp?: boolean
  precision?: number
  unitOverride?: AxisUnit
  output?: OutUnit
  remBase?: number
}) {
  const unit: AxisUnit = unitOverride ?? (direction === 'w' ? 'vw' : 'vh')
  const [v1, c1] = p1
  const [v2, c2] = p2

  if (c1 === c2) {
    throw new Error('getViewportExpression: context sizes must differ')
  }

  const slope = (v2 - v1) / (c2 - c1) // px per px
  const intercept = v1 - slope * c1 // px

  const a = round(slope * 100, precision) // unit part coefficient
  const bPx = round(intercept, precision) // constant (px)
  const b = output === 'rem' ? toRem(bPx, remBase) : px(bPx)

  const preferred = `calc(${a}${unit} + ${b})`
  if (!clamp) return preferred

  const loPx = Math.min(v1, v2)
  const hiPx = Math.max(v1, v2)
  const lo = output === 'rem' ? toRem(loPx, remBase) : px(loPx)
  const hi = output === 'rem' ? toRem(hiPx, remBase) : px(hiPx)

  // IMPORTANT: wrap middle value in calc() for CSS validity
  return `clamp(${lo}, ${preferred}, ${hi})`
}

/** clamp is always true */
export function getVWExpression(p1: CSSLengthPoint, p2: CSSLengthPoint, opts?: { output?: OutUnit; remBase?: number; precision?: number }) {
  return getViewportExpression({
    direction: 'w',
    p1,
    p2,
    clamp: true,
    output: opts?.output,
    remBase: opts?.remBase,
    precision: opts?.precision
  })
}

/** clamp is always true */
export function getVHExpression(p1: CSSLengthPoint, p2: CSSLengthPoint, opts?: { output?: OutUnit; remBase?: number; precision?: number }) {
  return getViewportExpression({
    direction: 'h',
    p1,
    p2,
    clamp: true,
    output: opts?.output,
    remBase: opts?.remBase,
    precision: opts?.precision
  })
}

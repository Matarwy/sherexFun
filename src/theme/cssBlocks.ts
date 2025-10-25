/**
 * Chakra-first CSS blocks using our theme tokens
 * - Uses semantic tokens from the Sherex theme (bg, surface, borderSubtle)
 * - Gradient matches Neon Aurora (brand.500 → cyan.500)
 */

import type { SystemProps } from '@chakra-ui/react'

export const heroGridientColorCSSBlock: SystemProps = {
  // Neon Aurora headline: violet → cyan
  bgGradient: 'linear(to-r, brand.500, cyan.500)',
  bgClip: 'text',
  color: 'transparent',
  fontSize: { base: '3xl', md: '4xl', lg: '5xl' },
  fontWeight: 700
}

export const panelCard: SystemProps = {
  bg: 'surface',
  borderWidth: '1px',
  borderColor: 'borderSubtle',
  boxShadow: 'sm', // keep subtle; swap to 'brandGlow' if you want the neon glow
  borderRadius: { base: '12px', md: '20px' },
  overflow: 'hidden'
}

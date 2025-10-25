// colors.ts — SherexFun Brand Palette (distinct from Raydium)
// Core hues: Rose #E178C5, Coral #FF8E8F, Peach #FFB38E, Butter #FFFDCB
// Dark = inky plum neutrals with warm neon accents
// Light = airy off-whites with warm tints
// Keys preserved so the rest of the app keeps working.

export const darkColors: Record<keyof typeof colors, string> = {
  // brand
  primary: '#E178C5', // SherexFun brand (rose)
  secondary: '#FF8E8F', // warm accent (coral)
  secondary10: 'rgba(255,142,143,0.10)',

  // surfaces (inky neutrals with subtle plum)
  backgroundDark: '#4d122fff', // page
  backgroundDark50: '#4d122e80',
  backgroundMedium: '#46133eff', // base surface
  backgroundLight: '#491212ff', // raised surface
  backgroundLight50: 'rgba(95, 26, 26, 0.7)',
  backgroundLight30: '#611e1e4d',
  backgroundTransparent12: 'rgba(248, 241, 247, 0.12)',
  backgroundTransparent07: 'rgba(248, 241, 247, 0.07)',
  backgroundTransparent10: 'rgba(248, 241, 247, 0.10)',

  // text
  textPrimary: '#F8F5FA',
  textSecondary: '#C8BDCF',
  textTertiary: 'rgba(200,189,207,0.55)',
  textRevertPrimary: '#111123',
  textLink: '#E178C5', // links = brand rose

  // (compat keys)
  textQuaternary: '#D8CFE1',
  textQuinary: '#181833',
  textSenary: 'rgba(200,189,207,0.50)',
  textSeptenary: '#E178C5',
  textPurple: '#B381FF', // supportive violet (not Raydium’s)
  textPink: '#FF6E9E',

  textBirthpadLink: '#E178C5',

  // buttons
  buttonPrimary: '#E178C5',
  buttonPrimary__01: '#E178C5',
  buttonPrimary__02: '#FF8E8F',
  buttonSolidText: '#0A0A12',
  buttonSecondary: '#FF8E8F',

  // switch
  switchOn: '#E178C5',
  switchOff: '#C8BDCF',

  // select
  selectActive: '#C8BDCF',
  selectActiveSecondary: '#E178C5',
  selectInactive: 'rgba(200,189,207,0.12)',

  // charts (warm + brand, no Raydium teal)
  chart01: '#E178C5',
  chart02: '#FF8E8F',
  chart03: '#FFB38E',
  chart04: '#FFFDCB',
  chart05: '#B381FF',
  chart06: '#29D2A0', // success green (unique tone)
  chart07: '#F472B6', // pink
  chart08: '#9CA3AF', // cool gray for contrast
  chart09: '#B381FF33',

  // icons
  iconBg: '#B381FF',
  iconEmptyStroke: '#0A0A12',

  // states
  semanticSuccess: '#29D2A0',
  semanticError: '#FF6E78', // darker coral for clarity on dark
  semanticWarning: '#FFB38E',
  semanticNeutral: '#B3A9BE',
  semanticFocus: '#E178C5',
  semanticFocusShadow: 'rgba(225,120,197,0.32)',

  // tabs & steps
  tabFolderTabListBg: 'rgba(255,255,255,0.04)',
  stepActiveBg: 'var(--background-light)',
  stepHoofBg: 'var(--primary)',

  // price deltas
  priceFloatingUp: '#29D2A0',
  priceFloatingDown: '#FF6E78',
  priceFloatingFlat: '#8A8F9A',

  // overlays
  tooltipBg: '#121228',
  popoverBg: '#171732',

  // misc
  scrollbarThumb: 'rgba(255,255,255,0.18)',

  // badges
  badgePurple: 'rgba(225,120,197,0.40)',
  badgeBlue: 'rgba(255,142,143,0.40)', // still named “Blue” for key compat

  // divider
  dividerBg: 'rgba(248, 241, 247, 0.12)',

  // input
  inputMask: '#0A0A1266',

  // backgrounds / gradients
  backgroundApp: 'linear-gradient(180deg,#0A0A12 0%,#131324 60%,#0A0A12 100%)',
  solidButtonBg: 'linear-gradient(272deg,#E178C5 0%,#FF8E8F 100%)',
  outlineButtonBg: 'linear-gradient(272deg,rgba(225,120,197,0.12) 0%,rgba(255,142,143,0.12) 100%)',
  filledProgressBg: 'linear-gradient(90deg,#E178C5 0%,#FF8E8F 50%,#FFB38E 100%)',
  transparentContainerBg: 'linear-gradient(180deg,rgba(225,120,197,0.12) 0%,rgba(255,142,143,0.08) 100%)',
  cardStackBg: 'linear-gradient(90deg,#2A1B2B 0%,#1B1B2E 50%,#2E1A1F 100%)',
  modalContainerBg: '#FFFFFF12',
  infoButtonBg: 'rgba(255,253,203,0.22)', // butter tint
  warnButtonBg: '#FFB38E33',
  warnButtonLightBg: '#FFB38E1A',
  buttonBg01: 'rgba(242,219,233,0.12)',
  lightPurple: '#E8B5F2',
  background01: '#0A0A12',
  background02: 'rgba(24,24,51,0.50)',
  background03: '#FF8E8F1A',
  cardBorder01: 'rgba(225,120,197,0.32)',
  text01: '#FFFDCB', // accent text for highlights
  text02: '#FFFFFF',
  text03: '#CBBFD1',

  // figma-like tokens
  brandGradient: 'linear-gradient(120deg,#E178C5 0%,#FF8E8F 55%,#FFB38E 100%)',
  dividerDashGradient: 'repeating-linear-gradient(to right,currentColor 0 5px,transparent 5px 10px)',

  tokenAvatarBg: 'linear-gradient(127deg,rgba(248,241,247,0.20) 29%,rgba(248,241,247,0.00) 100%) #0A0A1280',

  // card glow (rose/coral)
  panelCardShadow: '0 0 0 1px rgba(225,120,197,.32), 0 0 24px rgba(255,142,143,.22)',
  panelCardBorder: '1px solid rgba(225,120,197,0.22)',

  positive: '#29D2A0',
  negative: '#FF6E78'
}

export const lightColors: Partial<typeof darkColors> = {
  // brand
  primary: '#E178C5',
  secondary: '#FF8E8F',
  secondary10: 'rgba(255,142,143,0.10)',

  // surfaces (airy, warm-tinted whites)
  backgroundDark: '#f595c6ff', // page
  backgroundDark50: '#f797c580',
  backgroundMedium: '#f79be6ff', // base surface
  backgroundLight: '#f59090ff', // raised surface
  backgroundLight50: '#f79f9fb3',
  backgroundLight30: '#f7aeae4d',
  backgroundTransparent12: 'rgba(11,11,18,0.12)',
  backgroundTransparent07: 'rgba(11,11,18,0.07)',
  backgroundTransparent10: 'rgba(11,11,18,0.10)',

  // text
  textPrimary: '#1B0D17',
  textSecondary: '#5A2F51', // wine
  textTertiary: 'rgba(90,47,81,0.55)',
  textRevertPrimary: '#FFF7FB',
  textLink: '#B84597', // deep rose for AA on light

  textQuaternary: '#6E6B7A',
  textQuinary: '#F4E9F7',
  textSenary: 'rgba(110,107,122,0.50)',
  textSeptenary: '#B84597',
  textPurple: '#8A4BFF',
  textPink: '#CC3E88',

  textBirthpadLink: '#B84597',

  // buttons
  buttonPrimary: '#E178C5',
  buttonPrimary__01: '#E178C5',
  buttonPrimary__02: '#FF8E8F',
  buttonSolidText: '#FFFFFF',
  buttonSecondary: '#FF8E8F',

  // switch
  switchOn: '#E178C5',
  switchOff: 'rgba(184,69,151,0.5)',

  // select
  selectActive: '#E178C5',
  selectActiveSecondary: '#FF8E8F',
  selectInactive: 'rgba(27,13,23,0.10)',

  // charts (mirrors dark, tuned for light)
  chart01: '#E178C5',
  chart02: '#FF8E8F',
  chart03: '#FFB38E',
  chart04: '#8A4BFF',
  chart05: '#B84597',
  chart06: '#1FAE86',
  chart07: '#9C7CFF',
  chart08: '#A3A3A3',
  chart09: '#8A4BFF33',

  // icons
  iconBg: '#E178C5',
  iconEmptyStroke: '#FFF7FB',

  // states
  semanticSuccess: '#1FAE86',
  semanticError: '#D9485A', // darkened coral for contrast
  semanticWarning: '#C07640', // darker peach for readability
  semanticNeutral: '#6B7280',
  semanticFocus: '#B84597',
  semanticFocusShadow: 'rgba(184,69,151,0.30)',

  // tabs & steps
  tabFolderTabListBg: 'var(--background-dark)',
  stepActiveBg: 'var(--background-dark-opacity)',
  stepHoofBg: 'var(--secondary)',

  // price deltas
  priceFloatingUp: '#1FAE86',
  priceFloatingDown: '#D9485A',
  priceFloatingFlat: '#6E7686',

  // overlays
  tooltipBg: '#FFFFFF',
  popoverBg: '#FFFFFF',

  // misc
  scrollbarThumb: 'rgba(11,11,18,0.22)',

  // badges
  badgePurple: 'rgba(225,120,197,0.30)',
  badgeBlue: 'rgba(255,142,143,0.30)',

  // divider
  dividerBg: 'rgba(11,11,18,0.12)',

  // input
  inputMask: '#0000001F',

  // backgrounds / gradients
  backgroundApp: '#FFFFFF',
  solidButtonBg: 'linear-gradient(272deg,#E178C5 0%,#FF8E8F 100%)',
  outlineButtonBg: 'linear-gradient(270deg,rgba(225,120,197,0.12) 0%,rgba(255,142,143,0.12) 100%)',
  filledProgressBg: 'linear-gradient(90deg,#E178C5 0%,#FF8E8F 50%,#FFB38E 100%)',
  transparentContainerBg: '#FFF9FD',
  cardStackBg: 'linear-gradient(90deg,#FFF2F9 0%,#FFF9F2 100%)',
  modalContainerBg: '#0A0A1212',
  infoButtonBg: 'rgba(27,13,23,0.08)',
  warnButtonBg: '#C0764033',
  warnButtonLightBg: '#C076401A',
  buttonBg01: 'rgba(27,13,23,0.08)',
  lightPurple: '#B381FF',
  background01: '#FFFAFE',
  background02: 'rgba(200,189,207,0.20)',
  background03: '#D9485A1A',
  cardBorder01: 'rgba(184,69,151,0.30)',
  text01: '#A2872A', // accent text on light (muted gold)
  text02: '#000000',
  text03: '#5A2F51',

  brandGradient: 'linear-gradient(120deg,#E178C5 0%,#FF8E8F 55%,#FFB38E 100%)',
  dividerDashGradient: 'repeating-linear-gradient(to right,currentColor 0 5px,transparent 5px 10px)',

  tokenAvatarBg: 'linear-gradient(127deg,rgba(11,11,18,0.10) 29%,rgba(11,11,18,0.00) 100%) #FFFE',

  panelCardShadow: 'none',
  panelCardBorder: '1px solid rgba(184,69,151,0.30)',

  positive: '#1FAE86',
  negative: '#D9485A'
}

/**
 * CSS variable mapping (unchanged). Your theme switcher can write the values
 * from darkColors / lightColors into :root as --vars at runtime.
 */
export const colors = {
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  secondary10: 'var(--secondary10)',

  backgroundDark: 'var(--background-dark)',
  backgroundDark50: 'var(--background-dark50)',
  backgroundMedium: 'var(--background-medium)',
  backgroundLight: 'var(--background-light)',
  backgroundLight50: 'var(--background-light50)',
  backgroundLight30: 'var(--background-light30)',
  backgroundTransparent12: 'var(--background-transparent12)',
  backgroundTransparent07: 'var(--background-transparent07)',
  backgroundTransparent10: 'var(--background-transparent10)',

  textPrimary: 'var(--text-primary)',
  textSecondary: 'var(--text-secondary)',
  textTertiary: 'var(--text-tertiary)',
  textRevertPrimary: 'var(--text-revert-primary)',
  textLink: 'var(--text-link)',

  textQuaternary: 'var(--text-quaternary)',
  textQuinary: 'var(--text-quinary)',
  textSenary: 'var(--text-senary)',
  textSeptenary: 'var(--text-septenary)',
  textPurple: 'var(--text-purple)',
  textPink: 'var(--text-pink)',

  textBirthpadLink: 'var(--text-birthpad-link)',

  buttonPrimary: 'var(--button-primary)',
  buttonPrimary__01: 'var(--button-primary__01)',
  buttonPrimary__02: 'var(--button-primary__02)',
  buttonSolidText: 'var(--button-solid-text)',
  buttonSecondary: 'var(--button-secondary)',

  switchOn: 'var(--switch-on)',
  switchOff: 'var(--switch-off)',

  selectActive: 'var(--select-active)',
  selectActiveSecondary: 'var(--select-active-secondary)',
  selectInactive: 'var(--select-inactive)',

  chart01: 'var(--chart01)',
  chart02: 'var(--chart02)',
  chart03: 'var(--chart03)',
  chart04: 'var(--chart04)',
  chart05: 'var(--chart05)',
  chart06: 'var(--chart06)',
  chart07: 'var(--chart07)',
  chart08: 'var(--chart08)',
  chart09: 'var(--chart09)',

  iconBg: 'var(--icon-bg)',
  iconEmptyStroke: 'var(--icon-empty-stroke)',

  semanticSuccess: 'var(--semantic-success)',
  semanticError: 'var(--semantic-error)',
  semanticWarning: 'var(--semantic-warning)',
  semanticNeutral: 'var(--semantic-neutral)',
  semanticFocus: 'var(--semantic-focus)',
  semanticFocusShadow: 'var(--semantic-focus-shadow)',

  tabFolderTabListBg: 'var(--tab-folder-tab-list-bg)',
  stepActiveBg: 'var(--step-active-bg)',
  stepHoofBg: 'var(--step-hoof-bg)',

  priceFloatingUp: 'var(--price-floating-up)',
  priceFloatingDown: 'var(--price-floating-down)',
  priceFloatingFlat: 'var(--price-floating-flat)',

  tooltipBg: 'var(--tooltip-bg)',
  popoverBg: 'var(--popover-bg)',

  scrollbarThumb: 'var(--scrollbar-thumb)',

  badgePurple: 'var(--badge-purple)',
  badgeBlue: 'var(--badge-blue)',

  dividerBg: 'var(--divider-bg)',

  inputMask: 'var(--input-mask)',

  backgroundApp: 'var(--background-app)',
  solidButtonBg: 'var(--solid-button-bg)',
  outlineButtonBg: 'var(--outline-button-bg)',
  filledProgressBg: 'var(--filled-progress-bg)',
  transparentContainerBg: 'var(--transparent-container-bg)',
  cardStackBg: 'var(--card-stack-bg)',
  modalContainerBg: 'var(--modal-container-bg)',
  infoButtonBg: 'var(--info-button-bg)',
  warnButtonBg: 'var(--warn-button-bg)',
  warnButtonLightBg: 'var(--warn-button-light-bg)',
  buttonBg01: 'var(--button-bg-01)',
  lightPurple: 'var(--divider-bg-light-purple)',
  background01: 'var(--background-01)',
  background02: 'var(--background-02)',
  background03: 'var(--background-03)',
  cardBorder01: 'var(--card-border-01)',
  text01: 'var(--text-01)',
  text02: 'var(--text-02)',
  text03: 'var(--text-03)',
  brandGradient: 'var(--brand-gradient)',
  dividerDashGradient: 'var(--divider-dash-gradient)',

  tokenAvatarBg: 'var(--token-avatar-bg)',
  panelCardShadow: 'var(--panel-card-shadow)',
  panelCardBorder: 'var(--panel-card-border)',

  positive: 'var(--positive)',
  negative: 'var(--negative)'
}

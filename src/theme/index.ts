// src/theme/index.ts
import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { m } from '@raydium-io/raydium-sdk-v2/lib/raydium-6fecdc52'

import { Alert } from './components/Alert'
import { Avatar } from './components/Avatar'
import { Badge } from './components/Badge'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Checkbox } from './components/Checkbox'
import { dividerTheme } from './components/Divider'
import { Drawer } from './components/Drawer'
import { FormLabel } from './components/FormLabel'
import { Input } from './components/Input'
import { Link } from './components/Link'
import { Menu } from './components/Menu'
import { Modal } from './components/Modal'
import { NumberInput } from './components/NumberInput'
import { Popover } from './components/Popover'
import { Progress } from './components/Progress'
import { Slider } from './components/Slider'
import { Spinner } from './components/Spinner'
import { Stepper } from './components/Stepper'
import { Switch } from './components/Switch'
import { Table } from './components/Table'
import { Tabs } from './components/Tabs'
import { Tag } from './components/Tag'
import { Text } from './components/Text'
import { Tooltip } from './components/Tooltip'
// ⬇️ import your palettes (camelCase keys) & token readers (var(--...))
import { colors, darkColors, lightColors } from './cssVariables'
import { breakpoints } from './foundations/breakpoints'
import { radii } from './foundations/radii'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

/** turn { backgroundDark: "#0b1022" } into { "--background-dark": "#0b1022" } */
function paletteToCSSVars(palette: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(palette)) {
    const kebab = k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
    out[`--${kebab}`] = v
  }
  return out
}

export const theme = extendTheme({
  config,
  radii,
  breakpoints,

  // inject CSS variables for light/dark so all components using `colors.*` work
  styles: {
    global: (props: import('@chakra-ui/react').StyleFunctionProps) => {
      const isLight = props.colorMode === 'light'
      const vars = paletteToCSSVars(isLight ? (lightColors as Record<string, string>) : darkColors)

      return {
        ':root': vars,

        // app base
        'html, body, #__next': {
          height: '100%',
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)'
        },
        body: {
          background: colors.backgroundApp,
          color: colors.textPrimary,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          margin: 0
        },

        // nicer scrollbars (respects palette)
        '::-webkit-scrollbar': { width: '10px', height: '10px' },
        '::-webkit-scrollbar-thumb': {
          background: colors.scrollbarThumb,
          borderRadius: '8px'
        },
        '::-webkit-scrollbar-track': {
          background: 'transparent'
        },

        // default border color fallback
        '*': {
          borderColor: colors.dividerBg,
          boxSizing: 'border-box'
        }
      }
    }
  },

  components: {
    Divider: dividerTheme,
    Avatar,
    Link,
    Button,
    Modal,
    Drawer,
    Input,
    NumberInput,
    Tabs,
    Checkbox,
    Menu,
    Alert,
    Slider,
    Card,
    Tooltip,
    Switch,
    Stepper,
    FormLabel,
    Progress,
    Table,
    Popover,
    Badge,
    Tag,
    Spinner,
    Text
  }
})

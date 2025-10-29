import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'fun.sherex.mobile',
  appName: 'SherexFun',
  webDir: 'dist', // not used in Phase 1; we’ll load a live URL
  server: {
    url: 'https://sherex.fun', // you can swap to staging later
    cleartext: false,
    allowNavigation: [
      '*.sherex.fun',
      '*.jup.ag',
      '*.helius.xyz',
      '*.phantom.app',
      '*.backpack.app',
      '*.solflare.com',
      '*.okx.com',
      '*.raydium.io',
      '*.solana.com'
    ]
  },
  android: { allowMixedContent: false },
  ios: { limitsNavigationsToAppBoundDomains: true }
}
export default config

import { ColorModeScript, PortalManager, useDisclosure } from '@chakra-ui/react'
// pages/_app.tsx
import { GoogleAnalytics } from '@next/third-parties/google'
import { getCookie } from 'cookies-next'
import Decimal from 'decimal.js'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect, useMemo } from 'react'

// import shallow from 'zustand/shallow'
import { DialogManager } from '@/components/DialogManager'
import { OnboardingDialog } from '@/components/Dialogs/OnboardingDialog'
// import { useAppStore } from '@/store'
import { theme } from '@/theme' // ⬅️ use your main theme for ColorModeScript
import { DirectionProviders } from '@/theme/direction'

import i18n from '../i18n'
import { isClient } from '../utils/common'

import '@/components/Toast/toast.css'
import '@/components/LandingPage/components/tvl.css'
import '@/components/LandingPage/liquidity.css'
import 'react-day-picker/dist/style.css'

const DynamicProviders = dynamic(() => import('@/provider').then((mod) => mod.Providers))
const DynamicContent = dynamic(() => import('@/components/Content'))
const DynamicAppNavLayout = dynamic(() => import('@/components/AppLayout/AppNavLayout'), { ssr: false })

const CONTENT_ONLY_PATH = ['/', '404', '/moonpay']
const OVERFLOW_HIDDEN_PATH = ['/liquidity-pools']

Decimal.set({ precision: 1e3 })

const MyApp = ({ Component, pageProps, ...props }: AppProps) => {
  const { pathname } = useRouter()

  const [onlyContent, overflowHidden] = useMemo(
    () => [CONTENT_ONLY_PATH.includes(pathname), OVERFLOW_HIDDEN_PATH.includes(pathname)],
    [pathname]
  )

  const title = pageProps?.title ? `${pageProps.title} · SherexFun` : 'SherexFun'
  const locale = i18n?.language ?? 'en'
  const ogImage = '/logo.png' // TODO: replace with your hosted OG image
  const siteUrl = 'https://sherex.fun' // TODO: adjust if different
  const handle = '@SherexFun' // TODO: adjust if you have a Twitter/X handle

  // const [setRpcUrlAct] = useAppStore((s) => [s.setRpcUrlAct], shallow)
  // const { onOpen: onLoading, onClose: offLoading } = useDisclosure()

  // useEffect(() => {
  //   const setRpcUrl = async () => {
  //     onLoading()
  //     await setRpcUrlAct(process.env.NEXT_PUBLIC_RPC_URL || '')
  //     offLoading()
  //   }

  //   setRpcUrl().catch(console.error)
  // }, [])

  return (
    <>
      <Script src="/charting_library/charting_library.js" strategy="afterInteractive" onLoad={() => console.log('tv.js loaded')} />
      {/* correct initial color mode before React hydrates */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <GoogleAnalytics gaId="G-DR3V6FTKE3" />

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

        {/* Basic */}
        <title>{title}</title>
        <meta name="description" content="SherexFun — sleek, fast, Solana-native DEX experience." />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:site_name" content="SherexFun" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="SherexFun — sleek, fast, Solana-native DEX experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="SherexFun" />
        <meta property="og:locale" content={locale} />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={handle} />
        <meta name="twitter:creator" content={handle} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content="SherexFun — sleek, fast, Solana-native DEX experience." />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <DirectionProviders>
        <DynamicProviders>
          {/* keep popovers/menus/modals above any transformed parents */}
          <PortalManager zIndex={1600}>
            <DynamicContent {...props}>
              {onlyContent ? (
                <Component {...pageProps} />
              ) : (
                <DynamicAppNavLayout overflowHidden={overflowHidden}>
                  <Component {...pageProps} />
                </DynamicAppNavLayout>
              )}
            </DynamicContent>
            <DialogManager />
            <OnboardingDialog />
          </PortalManager>
        </DynamicProviders>
      </DirectionProviders>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  if (isClient()) return {}
  try {
    const ctx = await App.getInitialProps(appContext)
    let lng = getCookie('i18nextLng', { req: appContext.ctx.req, res: appContext.ctx.res }) as string
    lng = lng || 'en'
    i18n.changeLanguage(lng)
    return ctx
  } catch {
    return {}
  }
}

export default MyApp

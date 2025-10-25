import { useEffect } from 'react'

import { BIRTHPAD_SLIPPAGE_KEY } from '@/constants/storageKeys'
import { SWAP_SLIPPAGE_KEY, useSwapStore } from '@/features/Swap/useSwapStore'
import { changeLang, I18N_CACHE_KEY } from '@/i18n'
import { useBirthpadStore } from '@/store'
import { APR_MODE_KEY, EXPLORER_KEY, FEE_KEY, useAppStore, USER_ADDED_KEY } from '@/store/useAppStore'
import { LIQUIDITY_SLIPPAGE_KEY, useLiquidityStore } from '@/store/useLiquidityStore'
import { getStorageItem } from '@/utils/localStorage'

// const BIRTHPAD_SLIPPAGE_KEY = '_sherex_lau_slp_'

export default function useLoadStorageData() {
  useEffect(() => {
    console.log('load storage data')
    console.log('BIRTHPAD_SLIPPAGE_KEY', BIRTHPAD_SLIPPAGE_KEY)
    console.log('BIRTHPAD_SLIPPAGE_value', getStorageItem(BIRTHPAD_SLIPPAGE_KEY))
    const [explorerUrl, aprMode, userAdded, transactionFee, cacheLang, liquiditySlippage, swapSlippage, birthpadSlippage] = [
      getStorageItem(EXPLORER_KEY),
      getStorageItem(APR_MODE_KEY),
      getStorageItem(USER_ADDED_KEY),
      getStorageItem(FEE_KEY),
      getStorageItem(I18N_CACHE_KEY),
      getStorageItem(LIQUIDITY_SLIPPAGE_KEY),
      getStorageItem(SWAP_SLIPPAGE_KEY),
      getStorageItem(BIRTHPAD_SLIPPAGE_KEY)
    ]

    useAppStore.setState({
      ...(explorerUrl ? { explorerUrl } : {}),
      ...(aprMode ? { aprMode: aprMode as 'M' | 'D' } : {}),
      ...(transactionFee ? { transactionFee } : {}),
      ...(userAdded
        ? {
            displayTokenSettings: {
              ...useAppStore.getState().displayTokenSettings,
              userAdded: userAdded === 'true'
            }
          }
        : {})
    })

    if (liquiditySlippage) {
      useLiquidityStore.setState({
        slippage: Number(liquiditySlippage)
      })
    }
    if (swapSlippage)
      useSwapStore.setState({
        slippage: Number(swapSlippage)
      })

    if (birthpadSlippage)
      useBirthpadStore.setState({
        slippage: Number(birthpadSlippage)
      })
    changeLang(cacheLang || 'en')
  }, [])
}

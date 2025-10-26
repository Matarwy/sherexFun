'use client'

import {
  ALL_PROGRAM_ID, API_URLS, AvailabilityCheckAPI3, DEV_LAUNCHPAD_PROGRAM, JupTokenType, ProgramIdConfig, Raydium, TokenInfo, TxVersion
} from '@raydium-io/raydium-sdk-v2'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import type { Wallet } from '@solana/wallet-adapter-react'
import type { Commitment, EpochInfo } from '@solana/web3.js'
import { Connection, PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js'
import { compare } from 'compare-versions'

import axios from '@/api/axios'
import { toastSubject } from '@/hooks/toast/useGlobalToast'
import { isProdEnv, retry } from '@/utils/common'
import { getStorageItem, setStorageItem } from '@/utils/localStorage'
import { isValidUrl } from '@/utils/url'

import { SHEREX } from './configs/market'
import createStore from './createStore'
import { blackJupMintSet, useTokenStore } from './useTokenStore'

/* ----------------------------- constants -------------------------------- */

export const defaultNetWork = WalletAdapterNetwork.Mainnet
export const defaultEndpoint = 'https://mainnet.helius-rpc.com/?api-key=dda3811c-eff2-4298-94d3-f3f868acbeac'

export const APR_MODE_KEY = '_sherex_apr_'
export const EXPLORER_KEY = '_sherex_explorer_'

export const supportedExplorers = [
  { name: 'Solscan', icon: '/images/explorer-solscan.png', host: 'https://solscan.io' },
  { name: 'Explorer', icon: '/images/explorer-solana.png', host: 'https://explorer.solana.com' },
  { name: 'SolanaFM', icon: '/images/explorer-solanaFM.png', host: 'https://solana.fm' }
]

const RPC_URL_KEY = '_sherex_rpc_dev_'
const RPC_URL_PROD_KEY = '_sherex_rpc_prod_'

export const FEE_KEY = '_sherex_fee_'
export const PRIORITY_LEVEL_KEY = '_sherex_fee_level_'
export const PRIORITY_MODE_KEY = '_sherex_fee_mode_'
export const USER_ADDED_KEY = '_sherex_u_added_'

export enum PriorityLevel {
  Fast,
  Turbo,
  Ultra
}
export enum PriorityMode {
  MaxCap,
  Exact
}

/* ------------------------------- types ---------------------------------- */

interface RpcItem {
  url: string
  ws?: string
  weight: number
  batch: boolean
  name: string
}

type SignAll = <T extends Transaction | VersionedTransaction>(transactions: T[]) => Promise<T[]>

interface InitPayload {
  owner?: PublicKey
  connection?: Connection
  walletAdapter?: any
  signAllTransactions?: SignAll
}

interface AppState {
  raydium: Raydium | null
  connection: Connection | null
  walletAdapter?: any
  signAllTransactions?: SignAll
  publicKey: PublicKey | null

  explorerUrl: string
  isMobile: boolean
  isDesktop: boolean
  aprMode: 'M' | 'D'
  wallet?: Wallet
  initialing: boolean
  connected: boolean
  chainTimeOffset: number
  blockSlotCountForSecond: number
  commitment: Commitment

  rpcNodeUrl?: string
  wsNodeUrl?: string
  rpcs: RpcItem[]
  urlConfigs: typeof API_URLS & { SWAP_HOST: string; SWAP_COMPUTE: string; SWAP_TX: string }
  programIdConfig: { LAUNCHPAD_PROGRAM: PublicKey }

  jupTokenType: JupTokenType
  displayTokenSettings: { official: boolean; jup: boolean; userAdded: boolean }

  featureDisabled: Partial<AvailabilityCheckAPI3>

  epochInfo?: EpochInfo
  txVersion: TxVersion
  tokenAccLoaded: boolean

  appVersion: string
  needRefresh: boolean

  priorityLevel: PriorityLevel
  priorityMode: PriorityMode
  transactionFee?: string
  feeConfig: Partial<Record<PriorityLevel, number>>

  getPriorityFee: () => string | undefined
  getEpochInfo: () => Promise<EpochInfo | undefined>

  initRaydiumAct: (payload?: InitPayload) => Promise<Raydium | void>
  fetchChainTimeAct: () => void
  fetchRpcsAct: () => Promise<void>
  fetchBlockSlotCountAct: () => Promise<void>
  setUrlConfigAct: (urls: any) => void
  setProgramIdConfigAct: (urls: ProgramIdConfig) => void
  setRpcUrlAct: (url: string, skipToast?: boolean, skipError?: boolean) => Promise<boolean>
  setAprModeAct: (mode: 'M' | 'D') => void
  checkAppVersionAct: () => Promise<void>
  fetchPriorityFeeAct: () => Promise<void>

  reset: () => void
}

/* ------------------------- initial app state ---------------------------- */

const appInitState: Omit<
  AppState,
  | 'getPriorityFee'
  | 'getEpochInfo'
  | 'initRaydiumAct'
  | 'fetchChainTimeAct'
  | 'fetchRpcsAct'
  | 'fetchBlockSlotCountAct'
  | 'setUrlConfigAct'
  | 'setProgramIdConfigAct'
  | 'setRpcUrlAct'
  | 'setAprModeAct'
  | 'checkAppVersionAct'
  | 'fetchPriorityFeeAct'
  | 'reset'
> = {
  raydium: null,
  connection: null,
  publicKey: null,

  initialing: false,
  connected: false,
  chainTimeOffset: 0,
  blockSlotCountForSecond: 0,
  explorerUrl: supportedExplorers[0].host,
  isMobile: false,
  isDesktop: false,
  aprMode: 'M',
  rpcs: [
    {
      url: 'https://mainnet.helius-rpc.com/?api-key=dda3811c-eff2-4298-94d3-f3f868acbeac',
      weight: 1,
      batch: true,
      name: 'Helius',
      ws: 'wss://mainnet.helius-rpc.com/?api-key=dda3811c-eff2-4298-94d3-f3f868acbeac'
    }
  ],
  rpcNodeUrl: 'https://mainnet.helius-rpc.com/?api-key=dda3811c-eff2-4298-94d3-f3f868acbeac',
  wsNodeUrl: 'wss://mainnet.helius-rpc.com/?api-key=dda3811c-eff2-4298-94d3-f3f868acbeac',
  urlConfigs: API_URLS,
  programIdConfig: {
    ...ALL_PROGRAM_ID,
    LAUNCHPAD_PROGRAM: new PublicKey(process.env.NEXT_PUBLIC_PLATFORM_ID || DEV_LAUNCHPAD_PROGRAM)
  },
  jupTokenType: JupTokenType.Strict,
  displayTokenSettings: {
    official: true,
    jup: true,
    userAdded: true
  },
  featureDisabled: {},
  txVersion: TxVersion.LEGACY,
  appVersion: 'V3.0.2',
  needRefresh: false,
  tokenAccLoaded: false,
  commitment: 'confirmed',

  priorityLevel: PriorityLevel.Turbo,
  priorityMode: PriorityMode.MaxCap,
  feeConfig: {},
  transactionFee: '0.01'
}

/* --------------------------- local caches ------------------------------- */

let rpcLoading = false
let epochInfoCache = { time: 0, loading: false }
let isRpcValidating = false

/* --------------------------- helper utils ------------------------------- */

function inferClusterFromRpc(url?: string): 'mainnet' | 'devnet' {
  if (!url) return 'mainnet'
  if (url.includes('devnet') || url.includes('api.devnet')) return 'devnet'
  return 'mainnet'
}

/* --------------------------- the zustand store --------------------------- */

export const useAppStore = createStore<AppState>(
  (set, get) => ({
    ...appInitState,

    initRaydiumAct: async (payload: InitPayload = {}) => {
      const action = { type: 'initRaydiumAct' }
      const { initialing, urlConfigs, rpcNodeUrl, jupTokenType, displayTokenSettings } = get()
      if (initialing) return

      // Ensure connection exists
      const connection = payload.connection ?? (rpcNodeUrl ? new Connection(rpcNodeUrl) : null)
      if (!connection) {
        toastSubject.next({ status: 'error', title: 'Init Error', description: 'No RPC connection' })
        return
      }
      if (!get().connection) set({ connection }, false, action)

      set({ initialing: true }, false, action)

      const cluster = inferClusterFromRpc(connection.rpcEndpoint)
      const isDevLocal = typeof window !== 'undefined' && window.location?.host?.startsWith('localhost')

      try {
        const raydium = await Raydium.load({
          connection,
          owner: payload.owner ?? get().publicKey ?? undefined,
          // walletAdapter: payload.walletAdapter ?? get().walletAdapter,
          signAllTransactions: payload.signAllTransactions ?? get().signAllTransactions,
          urlConfigs: {
            ...urlConfigs,
            BASE_HOST: !isProdEnv() ? getStorageItem('_sherex_api_host_') || urlConfigs.BASE_HOST : urlConfigs.BASE_HOST
          },
          jupTokenType,
          logRequests: !isDevLocal,
          disableFeatureCheck: true,
          loopMultiTxStatus: true,
          blockhashCommitment: 'finalized',
          cluster, // 'mainnet' | 'devnet'
          apiRequestTimeout: 20 * 1000
        })

        // Merge extra token(s)
        useTokenStore.getState().extraLoadedTokenList.forEach((t) => {
          const existed = raydium.token.tokenMap.has(t.address)
          if (!existed) {
            raydium.token.tokenList.push(t)
            raydium.token.tokenMap.set(t.address, t)
            raydium.token.mintGroup.official.add(t.address)
          }
        })

        // Clean up blacklisted JUP mints & optionally rewrite logos
        const tokenMap = new Map(Array.from(raydium.token.tokenMap))
        const tokenList = (JSON.parse(JSON.stringify(raydium.token.tokenList)) as TokenInfo[])
          .filter((t) => {
            if (blackJupMintSet.has(t.address)) {
              tokenMap.delete(t.address)
              raydium.token.tokenMap.delete(t.address)
              raydium.token.mintGroup.jup.delete(t.address)
              return false
            }
            return true
          })
          .map((t) => {
            if (t.type === 'jupiter') {
              try {
                const newInfo = { ...t, logoURI: t.logoURI ? t.logoURI : '' }
                tokenMap.set(t.address, newInfo)
                return newInfo
              } catch {
                return t
              }
            }
            return t
          })

        useTokenStore.setState(
          {
            tokenList: [SHEREX, ...tokenList],
            displayTokenList: tokenList
              .filter((token) => {
                return (
                  (displayTokenSettings.official && raydium.token.mintGroup.official.has(token.address)) ||
                  (displayTokenSettings.jup && raydium.token.mintGroup.jup.has(token.address))
                )
              })
              .concat([SHEREX]),
            tokenMap: tokenMap.set(SHEREX.address, SHEREX),
            mintGroup: raydium.token.mintGroup,
            whiteListMap: new Set(Array.from(raydium.token.whiteListMap))
          },
          false,
          action
        )

        set(
          {
            raydium,
            initialing: false,
            connected: !!(payload.owner || get().publicKey)
          },
          false,
          action
        )

        // Availability toggles
        set(
          {
            featureDisabled: {
              swap: raydium.availability.swap === false,
              createConcentratedPosition: raydium.availability.createConcentratedPosition === false,
              addConcentratedPosition: raydium.availability.addConcentratedPosition === false,
              addStandardPosition: raydium.availability.addStandardPosition === false,
              removeConcentratedPosition: raydium.availability.removeConcentratedPosition === false,
              removeStandardPosition: raydium.availability.removeStandardPosition === false,
              addFarm: raydium.availability.addFarm === false,
              removeFarm: raydium.availability.removeFarm === false
            }
          },
          false,
          action
        )

        setTimeout(() => get().fetchChainTimeAct(), 1000)

        console.log('[AppStore] Raydium initialized (cluster:', cluster, ')')
        return raydium
      } catch (e: any) {
        console.error('[AppStore] Raydium init failed:', e)
        set({ initialing: false }, false, action)
        toastSubject.next({ status: 'error', title: 'Raydium init failed', description: e?.message ?? 'Unknown error' })
      }
    },

    fetchChainTimeAct: () => {
      const { urlConfigs } = get()
      axios
        .get<{ offset: number }>(`${urlConfigs.BASE_HOST}${urlConfigs.CHAIN_TIME}`)
        .then((data) => {
          set({ chainTimeOffset: isNaN(data?.data.offset) ? 0 : data.data.offset * 1000 }, false, { type: 'fetchChainTimeAct' })
        })
        .catch(() => set({ chainTimeOffset: 0 }, false, { type: 'fetchChainTimeAct' }))
    },

    fetchBlockSlotCountAct: async () => {
      const { connection } = get()
      if (!connection) return
      const res: {
        id: string
        jsonrpc: string
        result: { numSlots: number; numTransactions: number; samplePeriodSecs: number; slot: number }[]
      } = await axios.post(connection.rpcEndpoint, {
        id: 'getRecentPerformanceSamples',
        jsonrpc: '2.0',
        method: 'getRecentPerformanceSamples',
        params: [4]
      })
      const slotList = res.result.map((d) => d.numSlots)
      set({ blockSlotCountForSecond: slotList.reduce((a, b) => a + b, 0) / slotList.length / 60 }, false, {
        type: 'fetchBlockSlotCountAct'
      })
    },

    setUrlConfigAct: (urls) => {
      set({ urlConfigs: { ...get().urlConfigs, ...urls } }, false, { type: 'setUrlConfigAct' })
    },

    setProgramIdConfigAct: (urls) => {
      set({ programIdConfig: { ...get().programIdConfig, ...urls } }, false, { type: 'setProgramIdConfigAct' })
    },

    fetchRpcsAct: async () => {
      const { urlConfigs, setRpcUrlAct } = get()
      if (rpcLoading) return
      rpcLoading = true
      try {
        const { data } = await axios.get<{ rpcs: RpcItem[] }>(urlConfigs.BASE_HOST + urlConfigs.RPCS)
        const rpcs = data.rpcs || []
        set({ rpcs }, false, { type: 'fetchRpcsAct' })

        const localRpcNode: { rpcNode?: RpcItem; url?: string } = JSON.parse(
          getStorageItem(isProdEnv() ? RPC_URL_PROD_KEY : RPC_URL_KEY) || '{}'
        )

        let i = 0
        const trySet = async () => {
          const ready = [...rpcs]
          if (localRpcNode?.rpcNode) ready.sort((a, b) => (a.name === localRpcNode.rpcNode!.name ? -1 : 1))
          const ok = await setRpcUrlAct(ready[i].url, true, i !== ready.length - 1)
          if (!ok) {
            i++
            if (i < ready.length) trySet()
            else console.error('All RPCs failed.')
          }
        }

        if (localRpcNode && !localRpcNode.rpcNode && isValidUrl(localRpcNode.url)) {
          const ok = await setRpcUrlAct(localRpcNode.url!, true, true)
          if (!ok) trySet()
        } else {
          trySet()
        }
      } finally {
        rpcLoading = false
      }
    },

    setRpcUrlAct: async (url, skipToast, skipError) => {
      if (url === get().rpcNodeUrl) {
        if (!skipToast) {
          toastSubject.next({ status: 'info', title: 'Switch Rpc Node', description: 'Rpc node already in use' })
        }
        return true
      }
      try {
        if (!isValidUrl(url)) throw new Error('invalid url')
        if (isRpcValidating) {
          if (!skipToast) {
            toastSubject.next({ status: 'warning', title: 'Switch Rpc Node', description: 'Validating Rpc node..' })
          }
          return false
        }
        isRpcValidating = true

        await retry<Promise<EpochInfo>>(() => axios.post(url, { method: 'getEpochInfo' }, { skipError: true }), {
          retryCount: 3,
          onError: () => (isRpcValidating = false)
        })

        isRpcValidating = false
        const rpcNode = get().rpcs.find((r) => r.url === url)
        set({ rpcNodeUrl: url, wsNodeUrl: rpcNode?.ws, tokenAccLoaded: false }, false, { type: 'setRpcUrlAct' })

        setStorageItem(
          isProdEnv() ? RPC_URL_PROD_KEY : RPC_URL_KEY,
          JSON.stringify({ rpcNode: rpcNode ? { ...rpcNode, url: '' } : undefined, url })
        )

        if (!skipToast) toastSubject.next({ status: 'success', title: 'Switch Rpc Node Success', description: 'Rpc node switched' })
        return true
      } catch {
        if (!skipError) toastSubject.next({ status: 'error', title: 'Switch Rpc Node error', description: 'Invalid rpc node' })
        return false
      }
    },

    setAprModeAct: (mode) => {
      setStorageItem(APR_MODE_KEY, mode)
      set({ aprMode: mode })
    },

    checkAppVersionAct: async () => {
      const { urlConfigs, appVersion } = get()
      const res = await axios.get<{ latest: string; least: string }>(`${urlConfigs.BASE_HOST}${urlConfigs.VERSION}`)
      set({ needRefresh: compare(appVersion, res.data.latest, '<') })
    },

    fetchPriorityFeeAct: async () => {
      const { urlConfigs } = get()
      const { data } = await axios.get<{ default: { h: number; m: number; vh: number } }>(
        `${urlConfigs.BASE_HOST}${urlConfigs.PRIORITY_FEE}`
      )
      set({
        feeConfig: {
          [PriorityLevel.Fast]: data.default.m / 10 ** 9,
          [PriorityLevel.Turbo]: data.default.h / 10 ** 9,
          [PriorityLevel.Ultra]: data.default.vh / 10 ** 9
        }
      })
    },

    getPriorityFee: () => {
      const { priorityMode, priorityLevel, transactionFee, feeConfig } = get()
      if (priorityMode === PriorityMode.Exact) return transactionFee ? String(transactionFee) : transactionFee
      if (feeConfig[priorityLevel] === undefined || transactionFee === undefined) {
        return String(feeConfig[PriorityLevel.Turbo] ?? 0)
      }
      return String(Math.min(Number(transactionFee), feeConfig[priorityLevel]!))
    },

    getEpochInfo: async () => {
      const connection = get().connection
      const epochInfo = get().epochInfo
      if (!connection) return undefined
      if (epochInfo && Date.now() - epochInfoCache.time <= 30 * 1000) return epochInfo
      if (epochInfoCache.loading) return epochInfo

      epochInfoCache.loading = true
      const newEpochInfo = await retry<Promise<EpochInfo>>(() => connection.getEpochInfo())
      epochInfoCache = { time: Date.now(), loading: false }
      set({ epochInfo: newEpochInfo }, false, { type: 'useAppStore.getEpochInfo' })
      return newEpochInfo
    },

    reset: () => set(appInitState)
  }),
  'useAppStore'
)

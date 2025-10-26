'use client'
import { txToBase64, TxVersion, validateAndParsePublicKey } from '@raydium-io/raydium-sdk-v2'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { parseUserAgent } from 'react-device-detect'
import shallow from 'zustand/shallow'

import { sendWalletEvent } from '@/api/event'
import { extendTxData, validateTxData } from '@/api/txService'
import { toastSubject } from '@/hooks/toast/useGlobalToast'
import usePrevious from '@/hooks/usePrevious'
import { defaultEndpoint, useAppStore } from '@/store/useAppStore'
import { cancelAllRetry, isLocal } from '@/utils/common'
import { getDevOnlyStorage } from '@/utils/localStorage'

/** If you use SSRData elsewhere you can keep it; otherwise make it optional */
export type SSRData = Record<string, unknown>

const localFakePubKey = '_sherex_f_wallet_'
export const WALLET_STORAGE_KEY = 'walletName'

function useInitConnection(props: SSRData = {}) {
  const { connection } = useConnection()
  const { publicKey: _publicKey, signAllTransactions: _signAllTransactions, signTransaction, wallet, connected } = useWallet()

  /** allow local fake pubkey while dev */
  const publicKey = useMemo(() => {
    const localPub = getDevOnlyStorage(localFakePubKey)
    if (isLocal() && localPub) {
      try {
        return validateAndParsePublicKey({ publicKey: localPub })
      } catch {
        /* fall through */
      }
    }
    return _publicKey ?? null
  }, [_publicKey])

  /** normalize signAllTransactions with WC/Android edge-cases + validation */
  const signAllTransactions = useMemo(
    () =>
      _signAllTransactions
        ? async <T extends Transaction | VersionedTransaction>(propsTransactions: T[]) => {
            const isV0Tx = useAppStore.getState().txVersion === TxVersion.V0
            let transactions = [...propsTransactions]
            let unsignedTxData = transactions.map(txToBase64)

            // WalletConnect extension: extend if needed
            if (useAppStore.getState().wallet?.adapter.name?.toLowerCase() === 'walletconnect') {
              const { success, data: extended } = await extendTxData(unsignedTxData)
              if (success) {
                const bufs = extended.map((tx) => Buffer.from(tx, 'base64'))
                transactions = bufs.map((b) =>
                  isV0Tx ? VersionedTransaction.deserialize(b as unknown as Uint8Array) : Transaction.from(b)
                ) as T[]
                unsignedTxData = transactions.map(txToBase64)
              }
            }

            // Coinbase on Android: fallback to per-tx signing
            const deviceInfo = parseUserAgent(window.navigator.userAgent)
            const adapter = useAppStore.getState().wallet?.adapter
            const isAndroidCoinBase = deviceInfo.os.name === 'Android' && adapter?.name === 'Coinbase Wallet'

            const t0 = Date.now()
            let allSigned: T[] = []
            if (isAndroidCoinBase && signTransaction) {
              for (const tx of transactions) allSigned.push(await signTransaction(tx))
            } else {
              allSigned = await _signAllTransactions(transactions)
            }

            const allBase64Tx = allSigned.map(txToBase64)
            const res = await validateTxData({ preData: unsignedTxData, data: allBase64Tx, userSignTime: Date.now() - t0 })
            if (!res.success) throw new Error(res.msg)

            return allSigned
          }
        : undefined,
    [_signAllTransactions, signTransaction]
  )

  const { urlConfigs, fetchRpcsAct, initRaydiumAct, raydium } = useAppStore(
    (s) => ({
      urlConfigs: s.urlConfigs,
      fetchRpcsAct: s.fetchRpcsAct,
      initRaydiumAct: s.initRaydiumAct,
      raydium: s.raydium
    }),
    shallow
  )

  const walletRef = useRef(wallet)
  const prevRpcEndPoint = usePrevious(connection.rpcEndpoint)
  const prevUrlConfigs = usePrevious(urlConfigs)

  const isRpcChanged = !!prevRpcEndPoint && prevRpcEndPoint !== connection.rpcEndpoint
  const isUrlConfigChanged = urlConfigs !== prevUrlConfigs
  const isNeedReload = isRpcChanged || isUrlConfigChanged

  /** toasts */
  const showConnect = useCallback(
    (key: PublicKey) => {
      toastSubject.next({ title: `${wallet?.adapter.name} wallet connected`, description: `Wallet ${key}`, status: 'success' })
    },
    [wallet]
  )
  const showDisconnect = useCallback(() => {
    toastSubject.next({ title: `${wallet?.adapter.name} wallet disconnected`, status: 'warning' })
  }, [wallet])

  /** fetch rpc list once */
  useEffect(() => {
    if (!useAppStore.getState().rpcs?.length) fetchRpcsAct()
  }, [fetchRpcsAct, urlConfigs.BASE_HOST])

  /** wallet connect/disconnect events */
  useEffect(() => {
    wallet?.adapter.once('connect', showConnect)
    wallet?.adapter.once('disconnect', showDisconnect)
    walletRef.current = wallet || walletRef.current
    return () => {
      wallet?.adapter.off('connect', showConnect)
      wallet?.adapter.off('disconnect', showDisconnect)
    }
  }, [wallet, showConnect, showDisconnect])

  /** init Raydium (no walletAdapter passed) */
  useEffect(() => {
    if (!connection) return

    // put connection + signer in store for Raydium.load()
    useAppStore.setState({ connection, signAllTransactions }, false, { type: 'useInitConnection' } as any)

    // if raydium already exists and rpc/url didn’t change, just swap connection
    if (raydium && !isNeedReload) {
      raydium.setConnection(connection)
      // cluster inferred inside init; here we avoid forcing value to prevent mismatch
      return
    }

    // first init or reload (rpc/urls changed)
    const ssrReloadData = isNeedReload ? {} : props
    // IMPORTANT: don't pass walletAdapter (you said it's commented)
    initRaydiumAct({
      connection,
      owner: publicKey ?? undefined,
      // walletAdapter: undefined,
      signAllTransactions
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection?.rpcEndpoint, isNeedReload, publicKey?.toBase58(), signAllTransactions])

  /** keep Raydium owner + signAll in sync */
  useEffect(() => {
    if (raydium) {
      raydium.setOwner(publicKey || undefined)
      raydium.setSignAllTransactions(signAllTransactions)
    }
  }, [raydium, publicKey, signAllTransactions])

  /** mirror wallet/publicKey into app store */
  useEffect(() => {
    useAppStore.setState(
      {
        connected: !!publicKey,
        publicKey: publicKey || null,
        wallet: walletRef.current || undefined
      },
      false,
      { type: 'useInitConnection.setWallet' } as any
    )
  }, [publicKey?.toBase58(), wallet?.adapter.name])

  /** misc cleanups */
  useEffect(() => cancelAllRetry, [connection.rpcEndpoint])
  useEffect(() => {
    if (!wallet) return
    return () => useAppStore.setState({ txVersion: TxVersion.LEGACY })
  }, [wallet?.adapter.name])

  /** analytics */
  useEffect(() => {
    if (connected && publicKey) {
      sendWalletEvent({ type: 'connectWallet', connectStatus: 'success', walletName: wallet?.adapter.name || 'unknown' })
      if (wallet) localStorage.setItem(WALLET_STORAGE_KEY, `"${wallet?.adapter.name}"`)
    }
  }, [publicKey, connected, wallet?.adapter.name])
}

export default useInitConnection

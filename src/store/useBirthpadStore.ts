import {
  ApiV3Token, buyExactInInstruction, FEE_RATE_DENOMINATOR, getATAAddress, getPdaCreatorVault, getPdaLaunchpadAuth, getPdaLaunchpadConfigId,
  getPdaLaunchpadPoolId, getPdaLaunchpadVaultId, getPdaPlatformVault, LAUNCHPAD_PROGRAM, LaunchpadConfig, LaunchpadPoolInfo,
  LaunchpadPoolInitParam, sellExactInInstruction, TxVersion
} from '@raydium-io/raydium-sdk-v2'
import { createSyncNativeInstruction, NATIVE_MINT, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { ComputeBudgetProgram, Keypair, PublicKey, SystemProgram, TransactionMessage, VersionedTransaction } from '@solana/web3.js'
import BN from 'bn.js'
import Decimal from 'decimal.js'

import axios from '@/api/axios'
import { refreshChartSubject } from '@/components/TradingView/TVChart'
import { ConfigInfo, MintInfo } from '@/features/Birthpad/type'
import { LaunchpadConfigInfo } from '@/hooks/birthpad/usePoolRpcInfo'
import { toastSubject } from '@/hooks/toast/useGlobalToast'
import { txStatusSubject } from '@/hooks/toast/useTxStatus'
import { TxCallbackProps } from '@/types/tx'
import { encodeStr } from '@/utils/common'
import ToPublicKey from '@/utils/publicKey'
import { getOrCreateATAInstruction } from '@/utils/token'

import { getTxMeta } from './configs/lauchpad'
import createStore from './createStore'
import { useAppStore } from './useAppStore'
import { useTokenAccountStore } from './useTokenAccountStore'

export const LAUNCHPAD_SLIPPAGE_KEY = '_sherex_lau_slp_'

export interface CreateMintAdvanceConfig {
  supply?: BN
  totalSellA?: BN
  totalFundRaisingB?: BN
  totalLockedAmount?: BN
  cliffPeriod?: BN
  unlockPeriod?: BN
  migrateType?: 'amm' | 'cpmm'
}
export interface LaunchpadState {
  token?: string
  authHost: string
  commentHost: string
  historyHost: string
  mintHost: string
  slippage: number
  platformId: string

  refreshPoolMint?: string
  configInfo: Map<string, LaunchpadConfigInfo>

  createRandomMintAct: (
    data: {
      decimals?: number
      file: File
      name: string
      symbol: string
      website?: string
      twitter?: string
      telegram?: string
      description?: string
      configId: string
    } & CreateMintAdvanceConfig
  ) => Promise<{ mint: string; metadataLink: string } | undefined>

  createMintAct: (
    data: {
      file?: File
      name: string
      symbol: string
      decimals?: number
      description?: string
      cfToken: string
      website?: string
      twitter?: string
      telegram?: string
      configId: string
    } & CreateMintAdvanceConfig
  ) => Promise<string | undefined>

  createAndBuyAct: (
    data: {
      programId?: PublicKey
      mint: string

      name: string
      uri: string
      symbol: string
      decimals?: number
      buyAmount: BN
      minMintAAmount?: BN
      slippage?: BN
      migrateType?: 'amm' | 'cpmm'
      notExecute?: boolean
      shareFeeReceiver?: PublicKey
      configInfo: LaunchpadConfigInfo
      configId: string | PublicKey
      platformFeeRate?: BN
      mintKp: Keypair

      mintBInfo: ApiV3Token

      supply?: BN
      totalSellA?: BN
      totalFundRaisingB?: BN
      totalLockedAmount?: BN
      cliffPeriod?: BN
      unlockPeriod?: BN

      curveType?: number
      createOnly?: boolean
    } & TxCallbackProps
  ) => Promise<{ txId: string; poolInfo?: LaunchpadPoolInfo }>

  buyAct: (
    data: {
      programId?: PublicKey
      mintInfo: MintInfo
      buyAmount: BN
      slippage?: BN
      mintB?: PublicKey
      minMintAAmount?: BN
      symbolB?: string
      mintBDecimals?: number
      shareFeeReceiver?: PublicKey
      configInfo?: LaunchpadConfigInfo
      platformFeeRate?: BN
    } & TxCallbackProps
  ) => Promise<string>

  sellAct: (
    data: {
      programId?: PublicKey
      mintInfo: MintInfo
      sellAmount: BN
      minAmountB?: BN
      slippage?: BN
      mintB?: PublicKey
      symbolB?: string
      mintBDecimals?: number
      shareFeeReceiver?: PublicKey
      configInfo?: LaunchpadConfigInfo
      platformFeeRate?: BN
    } & TxCallbackProps
  ) => Promise<string>

  getConfigInfo: (configId: string | PublicKey) => Promise<LaunchpadConfigInfo | undefined>
}

export const defaultShareFeeRate = new BN(10000)
export const birthpadShareRate = new Decimal(defaultShareFeeRate.toString())
  .div(FEE_RATE_DENOMINATOR.toString())
  .mul(100)
  .toDecimalPlaces(2)
  .toString()

const initialState = {
  authHost: process.env.NEXT_PUBLIC_LAUNCH_AUTH_HOST || 'https://launch-auth-v1.raydium.io',
  commentHost: process.env.NEXT_PUBLIC_LAUNCH_COMMENT_HOST || 'https://launch-forum-v1.raydium.io',
  historyHost: process.env.NEXT_PUBLIC_LAUNCH_HISTORY_HOST || 'https://launch-history-v1.raydium.io',
  mintHost: process.env.NEXT_PUBLIC_LAUNCH_MINT_HOST || 'https://launch-mint-v1.raydium.io',
  // platformId: process.env.NEXT_PUBLIC_PLATFORM_ID || 'FwKALh5mEfqWVPU24e5VXavydtnwb1veUi4Z3ShiYb8g',
  platformId: process.env.NEXT_PUBLIC_PLATFORM_ID || 'FEkF8SrSckk5GkfbmtcCbuuifpTKkw6mrSNowwB8aQe3',
  slippage: 0.025,
  configInfo: new Map()
}

export const useBirthpadStore = createStore<LaunchpadState>((set, get) => ({
  ...initialState,

  createRandomMintAct: async (props) => {
    const token = get().token
    const { publicKey } = useAppStore.getState()
    if (!publicKey || !token) return

    if (props.name.length > 32) {
      toastSubject.next({
        status: 'error',
        title: 'Token name error',
        description: 'can not exceed length 32'
      })
      return
    }

    if (props.symbol.length > 10) {
      toastSubject.next({
        status: 'error',
        title: 'Token symbol error',
        description: 'can not exceed length 10'
      })
      return
    }

    // Create FormData for file upload
    const formData = new FormData()
    formData.append('name', props.name)
    formData.append('ticker', props.symbol) // Changed from 'symbol' to 'ticker'
    formData.append('description', props.description || '')
    formData.append('wallet', publicKey.toBase58())
    formData.append('decimals', (props.decimals ?? LaunchpadPoolInitParam.decimals).toString())
    formData.append('supply', (props.supply ?? LaunchpadPoolInitParam.supply).toString())
    formData.append('totalSellA', props.totalSellA ? props.totalSellA.toString() : LaunchpadPoolInitParam.totalSellA.toString())
    formData.append(
      'totalFundRaisingB',
      props.totalFundRaisingB ? props.totalFundRaisingB.toString() : LaunchpadPoolInitParam.totalFundRaisingB.toString()
    )
    formData.append(
      'totalLockedAmount',
      props.totalLockedAmount ? props.totalLockedAmount.toString() : LaunchpadPoolInitParam.totalLockedAmount.toString()
    )
    formData.append('cliffPeriod', props.cliffPeriod ? props.cliffPeriod.toString() : LaunchpadPoolInitParam.cliffPeriod.toString())
    formData.append('unlockPeriod', props.unlockPeriod ? props.unlockPeriod.toString() : LaunchpadPoolInitParam.unlockPeriod.toString())
    formData.append('platformId', get().platformId)
    formData.append('migrateType', props.migrateType || 'amm')
    formData.append('configId', props.configId)

    // Add optional social links
    if (props.website) formData.append('website', props.website)
    if (props.twitter) formData.append('twitter', props.twitter)
    if (props.telegram) formData.append('telegram', props.telegram)

    // Add file if present
    if (props.file) {
      formData.append('file', props.file)
    }

    const r: {
      id: string
      success: boolean
      data: { mint: string; metadataLink: string }
    } = await axios.postForm(`${get().mintHost}/create/get-random-mint`, formData, {
      headers: {
        'ray-token': token
      },
      skipError: true,
      authTokenCheck: true
    })

    return r.data
  },

  createMintAct: async (props) => {
    const token = get().token
    const { publicKey } = useAppStore.getState()
    if (!publicKey || !token) return

    if (props.name.length > 32) {
      toastSubject.next({
        status: 'error',
        title: 'Token name error',
        description: 'can not exceed length 32'
      })
      return
    }

    if (props.symbol.length > 10) {
      toastSubject.next({
        status: 'error',
        title: 'Token symbol error',
        description: 'can not exceed length 10'
      })
      return
    }

    // Create FormData for file upload
    const formData = new FormData()
    formData.append('name', props.name)
    formData.append('ticker', props.symbol) // Changed from 'symbol' to 'ticker'
    formData.append('description', props.description || '')
    formData.append('wallet', publicKey.toBase58())
    formData.append('decimals', (props.decimals ?? LaunchpadPoolInitParam.decimals).toString())
    formData.append('supply', (props.supply ?? LaunchpadPoolInitParam.supply).toString())
    formData.append('totalSellA', props.totalSellA ? props.totalSellA.toString() : LaunchpadPoolInitParam.totalSellA.toString())
    formData.append(
      'totalFundRaisingB',
      props.totalFundRaisingB ? props.totalFundRaisingB.toString() : LaunchpadPoolInitParam.totalFundRaisingB.toString()
    )
    formData.append(
      'totalLockedAmount',
      props.totalLockedAmount ? props.totalLockedAmount.toString() : LaunchpadPoolInitParam.totalLockedAmount.toString()
    )
    formData.append('cliffPeriod', props.cliffPeriod ? props.cliffPeriod.toString() : LaunchpadPoolInitParam.cliffPeriod.toString())
    formData.append('unlockPeriod', props.unlockPeriod ? props.unlockPeriod.toString() : LaunchpadPoolInitParam.unlockPeriod.toString())
    formData.append('platformId', get().platformId)
    formData.append('migrateType', props.migrateType || 'amm')
    formData.append('cfToken', props.cfToken)
    formData.append('configId', props.configId)

    // Add optional social links
    if (props.website) formData.append('website', props.website)
    if (props.twitter) formData.append('twitter', props.twitter)
    if (props.telegram) formData.append('telegram', props.telegram)

    // Add file if present
    if (props.file) {
      formData.append('file', props.file)
    }

    // Debug: Log the FormData contents
    console.log('FormData contents:')
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value)
    }

    try {
      const r: {
        id: string
        success: boolean
        data: {
          mint: string
        }
      } = await axios.postForm(`${get().mintHost}/create/mint-info`, formData, {
        headers: {
          'ray-token': token
        },
        skipError: false, // Changed to false to get error details
        authTokenCheck: true
      })

      console.log('API Response:', r)
      return r.data.mint
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message)
      console.error('Full error:', error)
      console.error('Error status:', error.response?.status)
      console.error('Error headers:', error.response?.headers)
      throw error
    }
  },

  createAndBuyAct: async ({
    programId = useAppStore.getState().programIdConfig.LAUNCHPAD_PROGRAM,
    mint,
    name,
    symbol,
    uri,
    decimals = 6,
    mintBInfo,
    buyAmount,
    slippage,
    minMintAAmount,
    migrateType = 'amm',
    notExecute,
    shareFeeReceiver,
    configId,
    configInfo,
    platformFeeRate,
    mintKp,
    supply,
    totalSellA,
    totalFundRaisingB,
    totalLockedAmount,
    cliffPeriod,
    unlockPeriod,
    createOnly,
    ...callback
  }) => {
    try {
      console.log('calling createAndBuyAct!!...')
      const { raydium, txVersion } = useAppStore.getState()
      if (!raydium) return { txId: '' }

      if (name.length > 32) {
        toastSubject.next({
          status: 'error',
          title: 'Token name error',
          description: 'can not exceed length 32'
        })
        return { txId: '' }
      }

      if (symbol.length > 10) {
        toastSubject.next({
          status: 'error',
          title: 'Token symbol error',
          description: 'can not exceed length 10'
        })
        return { txId: '' }
      }
      const mintHost = 'https://launch-mint-v1.raydium.io'

      // const pair = Keypair.generate()
      console.log('platformId', get().platformId)

      const configRes: {
        data: {
          data: {
            key: ConfigInfo
            mintInfoB: ApiV3Token
          }[]
        }
      } = await axios.get(`${mintHost}/main/configs`)
      console.log('configRes======>', configRes)

      const configs = configRes.data.data[0].key
      const configInfo: ReturnType<typeof LaunchpadConfig.decode> = {
        index: configs.index,
        mintB: new PublicKey(configs.mintB),
        tradeFeeRate: new BN(configs.tradeFeeRate),
        epoch: new BN(configs.epoch),
        curveType: configs.curveType,
        migrateFee: new BN(configs.migrateFee),
        maxShareFeeRate: new BN(configs.maxShareFeeRate),
        minSupplyA: new BN(configs.minSupplyA),
        maxLockRate: new BN(configs.maxLockRate),
        minSellRateA: new BN(configs.minSellRateA),
        minMigrateRateA: new BN(configs.minMigrateRateA),
        minFundRaisingB: new BN(configs.minFundRaisingB),
        protocolFeeOwner: new PublicKey(configs.protocolFeeOwner),
        migrateFeeOwner: new PublicKey(configs.migrateFeeOwner),
        migrateToAmmWallet: new PublicKey(configs.migrateToAmmWallet),
        migrateToCpmmWallet: new PublicKey(configs.migrateToCpmmWallet)
      }

      const configId = new PublicKey(configRes.data.data[0].key.pubKey)

      const mintBInfo = configRes?.data?.data[0]?.mintInfoB

      console.log('configInfo', configInfo)
      console.log('configId', configId)
      console.log('mintBInfo', mintBInfo)

      const newMintData = {
        wallet: raydium.ownerPubKey.toBase58(),
        configId: configId.toString(),
        decimals: LaunchpadPoolInitParam.decimals,
        supply: LaunchpadPoolInitParam.supply, // or custom set up supply
        totalSellA: LaunchpadPoolInitParam.totalSellA, // or custom set up totalSellA
        totalFundRaisingB: LaunchpadPoolInitParam.totalFundRaisingB,
        totalLockedAmount: LaunchpadPoolInitParam.totalLockedAmount,
        cliffPeriod: LaunchpadPoolInitParam.cliffPeriod,
        unlockPeriod: LaunchpadPoolInitParam.unlockPeriod,
        // set your platform id, current platform: bonk
        platformId: useAppStore.getState().programIdConfig.LAUNCHPAD_PROGRAM,
        migrateType: 'amm', // or cpmm
        description: 'description'
      }
      const mintBDecimals = mintBInfo.decimals

      const { execute, transactions, extInfo } = await raydium.launchpad.createLaunchpad({
        programId: LAUNCHPAD_PROGRAM,
        mintA: mintKp.publicKey, // Use the actual mint keypair instead of generating a new one
        decimals: newMintData.decimals,
        name: name,
        symbol: symbol,
        uri,
        migrateType: 'amm',
        configId,
        configInfo,
        mintBDecimals,

        platformId: new PublicKey('FEkF8SrSckk5GkfbmtcCbuuifpTKkw6mrSNowwB8aQe3'),

        txVersion: TxVersion.V0,
        slippage: slippage || new BN(100), // Use the passed slippage or default to 1%
        buyAmount: buyAmount, // Use the actual buy amount passed to the function
        createOnly, // true means create mint only, false will "create and buy together"

        supply: newMintData.supply, // lauchpad mint supply amount, default: LaunchpadPoolInitParam.supply
        totalSellA: newMintData.totalSellA, // lauchpad mint sell amount, default: LaunchpadPoolInitParam.totalSellA
        totalFundRaisingB: newMintData.totalFundRaisingB, // if mintB = SOL, means 85 SOL, default: LaunchpadPoolInitParam.totalFundRaisingB
        totalLockedAmount: newMintData.totalLockedAmount, // total locked amount, default 0
        cliffPeriod: newMintData.cliffPeriod, // unit: seconds, default 0
        unlockPeriod: newMintData.unlockPeriod, // unit: seconds, default 0
        initV2: true,
        extraSigners: [mintKp] // Add the mint keypair as an extra signer
      })

      console.log('extInfo======>', extInfo)
      const amountA = extInfo.swapInfo.amountA.amount.toString()
      console.log('amountA======>', amountA)
      const amountB = extInfo.swapInfo.amountB.toString()
      console.log('amountB======>', amountB)

      const transaction = transactions[0]
      console.log('tx simulation  ', await raydium.connection.simulateTransaction(transaction))

      // Execute the transaction (this will handle signing and sending)
      try {
        console.log('Executing transaction...')
        // Get the connected wallet's keypair
        const { publicKey } = useAppStore.getState()
        if (!publicKey) {
          throw new Error('No connected wallet')
        }

        // Use the execute function which handles signing properly
        const { signedTxs } = await execute({ notSendToRpc: false, sequentially: true })
        console.log('signedTxs======>', signedTxs)

        // Send the signed transaction
        const signature = await raydium.connection.sendTransaction(signedTxs[0])
        console.log('signature', signature)

        const confirmation = await raydium.connection.confirmTransaction(signature)
        console.log('confirmation', confirmation)

        // Get the transaction ID from the signature
        const txId = signature

        // Update UI and callbacks
        txStatusSubject.next({
          txId,
          ...callback,
          signedTx: transaction as any,
          onConfirmed: () => {
            callback.onConfirmed?.()
            useTokenAccountStore.getState().fetchTokenAccountAct({})
            setTimeout(() => {
              set({ refreshPoolMint: mint })
              refreshChartSubject.next(mint)
            }, 1000)
          }
        })

        return { txId, poolInfo: extInfo.address }
      } catch (error: any) {
        console.error('Transaction failed:', error)
        callback.onError?.()
        toastSubject.next({ status: 'error', description: 'Transaction failed', txError: error })
        return { txId: '' }
      }

      return { txId: '' }
    } catch (err) {
      console.log('er while creating and buying======>', err)
      return { txId: '' }
    }
  },
  buyAct: async ({
    programId = LAUNCHPAD_PROGRAM,
    mintInfo,
    buyAmount,
    minMintAAmount,
    slippage,
    mintB,
    symbolB,
    mintBDecimals = 9,
    shareFeeReceiver,
    configInfo,
    platformFeeRate,
    onSent,
    onConfirmed,
    onError,
    onFinally
  }) => {
    const { raydium, connection, publicKey } = useAppStore.getState()
    if (!raydium || !connection || !publicKey) return ''

    try {
      const instructions: any[] = [
        ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 100_000 }),
        ComputeBudgetProgram.setComputeUnitLimit({ units: 1000_000 })
      ]

      const mintA = new PublicKey(mintInfo.mint)
      const mintBKey = mintB || NATIVE_MINT

      const [{ ataPubkey: userTokenVault, ix: createTokenAccountIx }, { ataPubkey: userWsolVault, ix: createWsolAccountIx }, blockhash] =
        await Promise.all([
          getOrCreateATAInstruction(connection, mintA, publicKey, publicKey, true, TOKEN_PROGRAM_ID),
          getOrCreateATAInstruction(connection, NATIVE_MINT, publicKey, publicKey, true, TOKEN_PROGRAM_ID),
          connection.getLatestBlockhash()
        ])

      createTokenAccountIx && instructions.push(createTokenAccountIx)
      createWsolAccountIx && instructions.push(createWsolAccountIx)

      const maxSolSpendLamports = buyAmount
      const transferSolIx = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: userWsolVault,
        lamports: maxSolSpendLamports.toNumber()
      })

      instructions.push(transferSolIx)
      const syncNativeIx = createSyncNativeInstruction(userWsolVault)
      instructions.push(syncNativeIx)

      const authProgramId = getPdaLaunchpadAuth(programId).publicKey
      const configId = getPdaLaunchpadConfigId(programId, NATIVE_MINT, 0, 0).publicKey

      const poolId = getPdaLaunchpadPoolId(programId, mintA, mintBKey).publicKey

      const vaultA = getPdaLaunchpadVaultId(programId, poolId, mintA).publicKey
      const vaultB = getPdaLaunchpadVaultId(programId, poolId, mintBKey).publicKey

      console.log('Account addresses:')
      console.log('- authProgramId:', authProgramId.toBase58())
      console.log('- configId:', configId.toBase58())
      console.log('- poolId:', poolId.toBase58())
      console.log('- vaultA:', vaultA.toBase58())
      console.log('- vaultB:', vaultB.toBase58())
      console.log('- userTokenAccountA:', userTokenVault.toBase58())
      console.log('- userTokenAccountB:', userWsolVault.toBase58())

      console.log('poolId======>', poolId.toBase58())

      const poolData = await connection.getAccountInfo(poolId, { commitment: 'confirmed' })
      if (!poolData) {
        throw new Error(`Pool not found: ${poolId.toBase58()}. The token may not be listed on the Birthpad yet.`)
      }

      console.log('All critical accounts found, fetching pool info...')
      const poolInfo = await raydium.launchpad.getRpcPoolInfo({ poolId })

      // Check platform and creator vault accounts
      const platformVault = getPdaPlatformVault(programId, poolInfo.platformId, mintBKey).publicKey
      const creatorVault = getPdaCreatorVault(programId, poolInfo.creator, mintBKey).publicKey

      console.log('Platform vault:', platformVault.toBase58())
      console.log('Creator vault:', creatorVault.toBase58())

      const minMintAAmountValue = minMintAAmount || new BN(0)
      // const shareATA = getAssociatedTokenAddressSync(mintBKey, publicKey);
      const shareATA = getATAAddress(publicKey, mintBKey).publicKey

      console.log(
        programId.toBase58(),
        publicKey.toBase58(),
        authProgramId.toBase58(),
        configId.toBase58(),
        useAppStore.getState().programIdConfig.LAUNCHPAD_PROGRAM,
        poolId.toBase58(),
        userTokenVault.toBase58(),
        userWsolVault.toBase58(),
        vaultA.toBase58(),
        vaultB.toBase58(),
        mintA.toBase58(),
        mintBKey.toBase58(),
        TOKEN_PROGRAM_ID.toBase58(),
        TOKEN_PROGRAM_ID.toBase58(),
        platformVault.toBase58(),
        creatorVault.toBase58(),
        buyAmount.toString(),
        minMintAAmountValue.toString(),
        new BN(10000).toString(),
        shareATA
      )

      // Try simulate with each platformId and pick the first that passes simulation
      let platformIds: PublicKey[] = []
      if (mintInfo.mint.endsWith('bonk')) platformIds.push(new PublicKey('FfYek5vEz23cMkWsdJwG2oa6EphsvXSHrGpdALN4g6W1'))
      platformIds.push(new PublicKey('FEkF8SrSckk5GkfbmtcCbuuifpTKkw6mrSNowwB8aQe3'))
      platformIds.push(new PublicKey('8pCtbn9iatQ8493mDQax4xfEUjhoVBpUWYVQoRU18333'))

      const baseInstructions = [...instructions]
      let selectedSignedTx: any | undefined
      let selectedPlatformId: PublicKey | undefined
      for (const pid of platformIds) {
        try {
          const tryInstructions = [...baseInstructions]
          const tryBuyIx = buyExactInInstruction(
            programId,
            publicKey,
            authProgramId,
            configId,
            pid,
            poolId,
            userTokenVault,
            userWsolVault,
            vaultA,
            vaultB,
            mintA,
            mintBKey,
            TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            platformVault,
            creatorVault,
            buyAmount,
            minMintAAmountValue,
            new BN(10000),
            shareATA
          )
          tryInstructions.push(tryBuyIx)

          const messageV0Try = new TransactionMessage({
            payerKey: publicKey,
            recentBlockhash: blockhash.blockhash,
            instructions: tryInstructions
          }).compileToV0Message()
          const txTry = new VersionedTransaction(messageV0Try)

          const signAllTry = raydium.signAllTransactions as unknown as (txs: any[]) => Promise<any[]>
          const signedTxsTry = await signAllTry([txTry as any])
          const signedTxTry = signedTxsTry[0]

          const simResult = await connection.simulateTransaction(signedTxTry as any)
          console.log('Buy simulation result for platformId', pid.toBase58(), simResult.value.err)
          if (!simResult.value.err) {
            selectedSignedTx = signedTxTry
            selectedPlatformId = pid
            break
          }
        } catch (e) {
          console.warn('Buy simulation failed for platformId', pid.toBase58(), e)
        }
      }

      if (!selectedSignedTx) {
        throw new Error('All platformIds failed simulation for buy')
      }

      console.log('Buy using platformId', selectedPlatformId!.toBase58())
      const signature = await connection.sendTransaction(selectedSignedTx as any, {
        skipPreflight: true
      })

      console.log('Transaction signature:', signature)

      const meta = getTxMeta({
        action: 'buy',
        values: {
          amountA: new Decimal(minMintAAmountValue.toString())
            .div(10 ** Number(mintInfo.decimals))
            .toDecimalPlaces(Number(mintInfo.decimals))
            .toString(),
          symbolA: mintInfo.symbol ?? encodeStr(mintInfo.mint, 5),
          amountB: new Decimal(buyAmount.toString())
            .div(10 ** mintBDecimals)
            .toDecimalPlaces(mintBDecimals)
            .toString(),
          symbolB: symbolB ?? 'SOL'
        }
      })

      txStatusSubject.next({
        txId: signature,
        ...meta,
        signedTx: selectedSignedTx as any,
        onSent,
        onError,
        onConfirmed: () => {
          onConfirmed?.()
          useTokenAccountStore.getState().fetchTokenAccountAct({})
        }
      })

      return signature
    } catch (e: any) {
      console.error('Buy token error:', e)
      onError?.()
      toastSubject.next({
        status: 'error',
        title: 'Buy Error',
        description: e.message || 'Buy transaction failed',
        txError: e
      })
      return ''
    } finally {
      onFinally?.()
    }
  },

  sellAct: async ({
    programId = LAUNCHPAD_PROGRAM,
    mintInfo,
    sellAmount,
    minAmountB,
    slippage,
    mintB,
    symbolB,
    mintBDecimals = 9,
    shareFeeReceiver,
    configInfo,
    platformFeeRate,
    onSent,
    onConfirmed,
    onError,
    onFinally
  }) => {
    const { raydium, connection, publicKey } = useAppStore.getState()
    if (!raydium || !connection || !publicKey) return ''

    try {
      const instructions: any[] = [
        ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 100_000 }),
        ComputeBudgetProgram.setComputeUnitLimit({ units: 1000_000 })
      ]
      const mintA = new PublicKey(mintInfo.mint)

      const mintBKey = mintB || NATIVE_MINT

      const [{ ataPubkey: userTokenVault, ix: createTokenAccountIx }, { ataPubkey: userWsolVault, ix: createWsolAccountIx }, blockhash] =
        await Promise.all([
          getOrCreateATAInstruction(connection, mintA, publicKey, publicKey, true, TOKEN_PROGRAM_ID),
          getOrCreateATAInstruction(connection, NATIVE_MINT, publicKey, publicKey, true, TOKEN_PROGRAM_ID),
          connection.getLatestBlockhash()
        ])

      createTokenAccountIx && instructions.push(createTokenAccountIx)

      const authProgramId = getPdaLaunchpadAuth(programId).publicKey
      const configId = getPdaLaunchpadConfigId(programId, NATIVE_MINT, 0, 0).publicKey

      const poolId = getPdaLaunchpadPoolId(programId, mintA, mintBKey).publicKey

      const vaultA = getPdaLaunchpadVaultId(programId, poolId, mintA).publicKey
      const vaultB = getPdaLaunchpadVaultId(programId, poolId, mintBKey).publicKey
      const poolData = await connection.getAccountInfo(poolId, { commitment: 'confirmed' })
      const poolInfo = await raydium.launchpad.getRpcPoolInfo({ poolId })
      const platformVault = getPdaPlatformVault(programId, poolInfo.platformId, mintBKey).publicKey
      const creatorVault = getPdaCreatorVault(programId, poolInfo.creator, mintBKey).publicKey

      const minMintAAmountValue = new BN(0)
      // const shareATA = getAssociatedTokenAddressSync(mintBKey, publicKey);
      const shareATA = getATAAddress(publicKey, mintBKey).publicKey
      console.log(
        programId.toBase58(),
        publicKey.toBase58(),
        authProgramId.toBase58(),
        configId.toBase58(),
        new PublicKey('FEkF8SrSckk5GkfbmtcCbuuifpTKkw6mrSNowwB8aQe3'),
        poolId.toBase58(),
        userTokenVault.toBase58(),
        userWsolVault.toBase58(),
        vaultA.toBase58(),
        vaultB.toBase58(),
        mintA.toBase58(),
        mintBKey.toBase58(),
        TOKEN_PROGRAM_ID.toBase58(),
        TOKEN_PROGRAM_ID.toBase58(),
        getPdaPlatformVault(programId, poolInfo.platformId, mintBKey).publicKey.toBase58(),
        getPdaCreatorVault(programId, poolInfo.creator, mintBKey).publicKey.toBase58(),

        sellAmount.toString(),
        minMintAAmountValue.toString(),
        new BN(10000).toString(),
        shareATA.toBase58()
      )

      let platformIds: PublicKey[] = []
      if (mintInfo.mint.endsWith('bonk')) platformIds.push(new PublicKey('FfYek5vEz23cMkWsdJwG2oa6EphsvXSHrGpdALN4g6W1'))
      platformIds.push(new PublicKey('FEkF8SrSckk5GkfbmtcCbuuifpTKkw6mrSNowwB8aQe3'))
      platformIds.push(new PublicKey('8pCtbn9iatQ8493mDQax4xfEUjhoVBpUWYVQoRU18333'))

      const baseInstructions = [...instructions]
      let selectedSignedTx: any | undefined
      let selectedPlatformId: PublicKey | undefined
      for (const pid of platformIds) {
        try {
          const tryInstructions = [...baseInstructions]
          const trySellIx = sellExactInInstruction(
            programId,
            publicKey,
            authProgramId,
            configId,
            pid,
            poolId,
            userTokenVault,
            userWsolVault,
            vaultA,
            vaultB,
            mintA,
            mintBKey,
            TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            getPdaPlatformVault(programId, poolInfo.platformId, mintBKey).publicKey,
            getPdaCreatorVault(programId, poolInfo.creator, mintBKey).publicKey,
            sellAmount,
            minMintAAmountValue,
            new BN(10000),
            shareATA
          )
          tryInstructions.push(trySellIx)

          const messageV0Try = new TransactionMessage({
            payerKey: publicKey,
            recentBlockhash: blockhash.blockhash,
            instructions: tryInstructions
          }).compileToV0Message()
          const txTry = new VersionedTransaction(messageV0Try)

          const signAllTry = raydium.signAllTransactions as unknown as (txs: any[]) => Promise<any[]>
          const signedTxsTry = await signAllTry([txTry as any])
          const signedTxTry = signedTxsTry[0]

          const simResult = await connection.simulateTransaction(signedTxTry as any)
          console.log('Simulation result for platformId', pid.toBase58(), simResult.value.err)
          if (!simResult.value.err) {
            selectedSignedTx = signedTxTry
            selectedPlatformId = pid
            break
          }
        } catch (e) {
          console.warn('Simulation failed for platformId', pid.toBase58(), e)
        }
      }

      if (!selectedSignedTx) {
        throw new Error('All platformIds failed simulation')
      }

      console.log('Using platformId', selectedPlatformId!.toBase58())
      const signature = await connection.sendTransaction(selectedSignedTx as any, {
        skipPreflight: true
      })

      console.log('Transaction signature:', signature)
      const meta = getTxMeta({
        action: 'sell',
        values: {
          amountA: new Decimal(sellAmount.toString())
            .div(10 ** Number(mintInfo.decimals))
            .toDecimalPlaces(Number(mintInfo.decimals))
            .toString(),
          symbolA: mintInfo.symbol ?? encodeStr(mintInfo.mint, 5),
          amountB: new Decimal(minMintAAmountValue.toString())
            .div(10 ** mintBDecimals)
            .toDecimalPlaces(mintBDecimals)
            .toString(),
          symbolB: symbolB ?? 'SOL'
        }
      })

      txStatusSubject.next({
        txId: signature,
        ...meta,
        signedTx: selectedSignedTx as any,
        onSent,
        onError,
        onConfirmed: () => {
          onConfirmed?.()
          useTokenAccountStore.getState().fetchTokenAccountAct({})
        }
      })
      return signature
    } catch (e: any) {
      console.log('sellAct error======>', e)
      onError?.()
      toastSubject.next({
        status: 'error',
        title: 'Sell Error',
        description: e.message || 'Sell transaction failed',
        txError: e
      })
      return ''
    } finally {
      onFinally?.()
    }
  },
  getConfigInfo: async (configId) => {
    const { connection } = useAppStore.getState()
    const config = get().configInfo.get(configId.toString())
    if (config) return config
    if (!connection) return
    const r = await connection.getAccountInfo(ToPublicKey(configId))
    if (!r) return
    const allConfig = new Map(Array.from(get().configInfo))
    const configData = LaunchpadConfig.decode(r.data)
    allConfig.set(configId.toString(), configData)
    set({
      configInfo: allConfig
    })
    return configData
  }
}))

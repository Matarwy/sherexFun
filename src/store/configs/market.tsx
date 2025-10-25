import { Text } from '@chakra-ui/react'
import { TokenInfo } from '@raydium-io/raydium-sdk-v2'
import { Trans } from 'react-i18next'

import i18n from '@/i18n'
import { colors } from '@/theme/cssVariables/colors'

const MARKET_TX_MSG = {
  create: {
    title: 'create_market.title',
    desc: 'create_market.desc',
    txHistoryTitle: 'create_market.title',
    txHistoryDesc: 'create_market.desc',
    components: { sub: <Text as="span" color={colors.textSecondary} fontWeight="700" /> }
  },
  createPool: {
    title: 'transaction_history.create_pool',
    desc: 'liquidity.create_pool_tx_desc',
    txHistoryTitle: 'transaction_history.create_pool',
    txHistoryDesc: 'liquidity.create_pool_tx_desc',
    components: { sub: <Text as="span" color={colors.textSecondary} fontWeight="700" /> }
  }
}

export const getTxMeta = ({ action, values }: { action: keyof typeof MARKET_TX_MSG; values: Record<string, unknown> }) => {
  const meta = MARKET_TX_MSG[action]
  return {
    title: i18n.t(meta.title, values),
    description: <Trans i18nKey={meta.desc} values={values} components={meta.components} />,
    txHistoryTitle: meta.txHistoryTitle || meta.title,
    txHistoryDesc: meta.txHistoryDesc || meta.desc,
    txValues: values
  }
}

export const SHEREX: TokenInfo = {
  chainId: 101,
  address: 'FWaRpuDUhNbDxKgacKBht4mP85LVaohty6V2WD1XShrX',
  programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  logoURI: 'https://img-v1.raydium.io/icon/FWaRpuDUhNbDxKgacKBht4mP85LVaohty6V2WD1XShrX.png',
  symbol: 'QSHX',
  name: 'Queen Sherex',
  decimals: 9,
  tags: [],
  extensions: {},
  priority: 2
}

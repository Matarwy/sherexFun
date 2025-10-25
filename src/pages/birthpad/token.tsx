import dynamic from 'next/dynamic'
const TokenDetail = dynamic(() => import('@/features/Birthpad/TokenDetail'))

function CoinDetailPage() {
  return <TokenDetail />
}

export default CoinDetailPage

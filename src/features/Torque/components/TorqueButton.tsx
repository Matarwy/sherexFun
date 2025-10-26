import { Badge, Box, Link, useDisclosure } from '@chakra-ui/react'
import { useWallet } from '@solana/wallet-adapter-react'

import Button from '@/components/Button'

import { useTorqueData } from '../hooks/useTorqueData'

import TorqueDrawer from './TorqueDrawer'

export default function TorqueButton() {
  const { wallet } = useWallet()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleClaimOffer, loading, error, activeOffersCount, campaigns } = useTorqueData({ wallet })

  return (
    <>
      {/* <Button variant="ghost" onClick={onOpen} display="flex" alignItems="center" gap={2}> */}
      <Box as="span" bgClip="text">
        <Link
          href="https://t.me/sherexcoin"
          isExternal
          bgGradient="linear-gradient(245.22deg, #FF2FC8 7.97%, #FFB12B 49.17%, #D3D839 92.1%)"
          bgClip="text"
        >
          Rewards
        </Link>
      </Box>
      {/* {activeOffersCount > 0 && <Badge variant="crooked">{activeOffersCount}</Badge>} */}
      {/* </Button> */}

      {/* {isOpen && (
        <TorqueDrawer
          isOpen={isOpen}
          onClose={onClose}
          handleClaimOffer={handleClaimOffer}
          campaignsLoading={loading}
          campaignsError={error}
          campaigns={campaigns}
        />
      )} */}
    </>
  )
}

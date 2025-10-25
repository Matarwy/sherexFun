import { Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Desktop } from '@/components/MobileDesktop'
import PageHeroTitle from '@/components/PageHeroTitle'
import { PositionTabValues } from '@/hooks/portfolio/useAllPositionInfo'

import { AcceleraytorAlertChip } from './AcceleraytorAlertChip'
import SectionAcceleraytor from './components/SectionIdo'
import SectionMyCreatedFarms, { CreateFarmTabValues } from './components/SectionMyFarms'
import SectionMyPositions from './components/SectionMyPositions'
import SectionOverview from './components/SectionOverview'

export type PortfolioPageQuery = {
  section?: 'overview' | 'my-positions' | 'my-created-farm' | 'acceleraytor'
  position_tab?: PositionTabValues
  create_farm_tab?: CreateFarmTabValues
}

export default function Portfolio() {
  const { t } = useTranslation()

  return (
    <Box overflowX="hidden">
      <Desktop>
        <PageHeroTitle title={t('portfolio.hero_title')} />
      </Desktop>
      <AcceleraytorAlertChip />
      {/* <SectionOverview /> */}
      <SectionMyPositions />
      <SectionMyCreatedFarms />
      <SectionAcceleraytor />
      <Box pb={'40px'} />
    </Box>
  )
}

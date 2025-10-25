import {
  Box, Flex, HStack, Menu, MenuButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, SystemStyleObject, Text
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useReferrerQuery } from '@/features/Birthpad/utils'
import { TorqueButton } from '@/features/Torque'
import { useDisclosure } from '@/hooks/useDelayDisclosure'
import ChevronDownIcon from '@/icons/misc/ChevronDownIcon'
import Gear from '@/icons/misc/Gear'
import TagNewIcon from '@/icons/misc/TagNewIcon'
import RaydiumLogo from '@/icons/RaydiumLogo'
import RaydiumLogoOutline from '@/icons/RaydiumLogoOutline'
import { useAppStore } from '@/store'
import { colors } from '@/theme/cssVariables'
import { appLayoutPaddingInline } from '@/theme/detailConfig'

import { Desktop, Mobile } from '../MobileDesktop'
import SolWallet from '../SolWallet'

import AppVersion from './AppVersion'
import { ColorThemeSettingField } from './components/ColorThemeSettingField'
import { DefaultExplorerSettingField } from './components/DefaultExplorerSettingField'
import DisclaimerModal from './components/DisclaimerModal'
import { LanguageSettingField } from './components/LanguageSettingField'
import { NavMoreButtonMenuPanel } from './components/NavMoreButtonMenuPanel'
import { PriorityButton } from './components/PriorityButton'
import { RPCConnectionSettingField } from './components/RPCConnectionSettingField'
import { Divider } from './components/SettingFieldDivider'
import { SlippageToleranceSettingField } from './components/SlippageToleranceSettingField'
import { VersionedTransactionSettingField } from './components/VersionedTransactionSettingField'
import { MobileBottomNavbar } from './MobileBottomNavbar'

export interface NavSettings {
  colorTheme: 'dark' | 'light'
}

function AppNavLayout({
  children,
  overflowHidden
}: {
  children: ReactNode
  /** use screen height */
  overflowHidden?: boolean
}) {
  const { t } = useTranslation()
  const { pathname } = useRouter()
  const queryReferrer = useReferrerQuery('?')
  const publicKey = useAppStore((s) => s.publicKey)
  const referrerQuery = useReferrerQuery('&')

  return (
    <Flex direction="column" id="app-layout" height="full" overflow={overflowHidden ? 'hidden' : 'auto'}>
      <HStack
        className="navbar"
        flex="none"
        height={['64px', '80px']}
        px={['20px', 0, '38px']}
        gap={['4px', 0, 0, 'max(64px, 6.1vw)']}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* logo */}
        <Desktop>
          <Box flex={'none'}>
            <Link href="/swap">
              <RaydiumLogo />
            </Link>
          </Box>
        </Desktop>
        <Mobile>
          <HStack>
            <RaydiumLogoOutline />
            <Text fontSize="xl" fontWeight="medium" color={colors.textSecondary}>
              {pathname === '/swap'
                ? t('swap.title')
                : pathname === '/liquidity-pools'
                ? t('liquidity.title')
                : pathname === '/portfolio'
                ? t('portfolio.title')
                : pathname === '/playground'
                ? t('common.playground')
                : // : pathname === '/staking'
                // ? t('staking.title')
                pathname === '/bridge'
                ? t('bridge.title')
                : ''}
            </Text>
          </HStack>
        </Mobile>

        {/* nav routes */}
        <Desktop>
          <HStack flexGrow={1} justify="start" overflow={['auto', 'visible']} gap={[15, 0, 15]}>
            <RouteLink
              href={`/birthpad${queryReferrer}`}
              isActive={pathname.includes('/birthpad')}
              title={
                // <Box as="span" bgGradient="linear-gradient(245.22deg, #FF2FC8 7.97%, #FFB12B 49.17%, #D3D839 92.1%)" bgClip="text">
                t('birthpad.title')
                // </Box>
              }
              // slotAfter={<TagNewIcon />}
              sx={{
                gap: '0.25rem'
              }}
            />
            <RouteLink href="/swap" isActive={pathname === '/swap'} title={t('swap.title')} />
            <RouteLink href="/liquidity-pools" isActive={pathname.includes('/liquidity')} title={t('liquidity.title')} />
            <RouteLink
              href={`/birthpad/profile?wallet=${publicKey ? publicKey.toBase58() : ''}${referrerQuery.replace('?', '&')}`}
              isActive={pathname === '/portfolio'}
              title={t('portfolio.title')}
            />
            {/* <RouteLink href="https://perps.raydium.io" isActive={false} title={t('perpetuals.title')} /> */}

            <Menu size="lg">
              <MenuButton fontSize={'lg'} px={4} py={2}>
                <Flex
                  align="center"
                  gap={0.5}
                  color={pathname === '/staking' || pathname === '/bridge' ? colors.textSecondary : colors.textTertiary}
                >
                  {pathname === '/staking' ? t('staking.title') : pathname === '/bridge' ? t('bridge.title') : t('common.more')}
                  <ChevronDownIcon width={16} height={16} />
                </Flex>
              </MenuButton>
              <NavMoreButtonMenuPanel />
            </Menu>
          </HStack>
        </Desktop>

        {/* wallet button */}
        <Flex gap={[0.5, 2]} align="center">
          <TorqueButton />
          <PriorityButton />
          <SettingsMenu />
          {/* <EVMWallet />  don't need currently yet*/}
          <SolWallet />
        </Flex>
      </HStack>

      <Box
        px={appLayoutPaddingInline}
        pt={[0, 4]}
        flex={1}
        overflow={overflowHidden ? 'hidden' : 'auto'}
        display="flex"
        flexDirection="column"
        justifyItems={'flex-start'}
        sx={{
          scrollbarGutter: 'stable',
          contain: 'size',
          '& > *': {
            // for flex-col container
            flex: 'none'
          }
        }}
      >
        {children}
      </Box>
      <DisclaimerModal />
      <Mobile>
        <Box className="mobile_bottom_navbar" flex="none">
          <MobileBottomNavbar />
        </Box>
      </Mobile>
    </Flex>
  )
}

function RouteLink({
  href,
  isActive,
  title,
  external = false,
  sx,
  slotAfter
}: {
  href: string
  isActive: boolean
  title: string | React.ReactNode
  external?: boolean
  sx?: SystemStyleObject
  slotAfter?: ReactNode
}) {
  return (
    <Link
      href={href}
      shallow
      {...(external
        ? {
            target: '_blank',
            rel: 'noopener noreferrer'
          }
        : {})}
    >
      <Flex
        textColor={isActive ? colors.textSecondary : colors.textTertiary}
        fontSize={['md', 'md', 'lg']}
        px={4}
        py={2}
        rounded="xl"
        transition="200ms"
        _hover={{ bg: colors.backgroundLight, color: colors.textSecondary }}
        alignItems="center"
        sx={sx}
      >
        {title}
        {slotAfter}
      </Flex>
    </Link>
  )
}

function SettingsMenu() {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const triggerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Box
        w={10}
        h={10}
        p="0"
        onClick={() => onOpen()}
        _hover={{ bg: colors.backgroundLight }}
        rounded="full"
        display="grid"
        placeContent="center"
        cursor="pointer"
        ref={triggerRef}
      >
        <Gear />
      </Box>

      <SettingsMenuModalContent isOpen={isOpen} onClose={onClose} triggerRef={triggerRef} />
    </>
  )
}

type Coords = { top: number; left?: number; right?: number }

function SettingsMenuModalContent(props: { isOpen: boolean; triggerRef: React.RefObject<HTMLDivElement>; onClose: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const { t, i18n } = useTranslation()
  const dir = i18n.dir() // 'ltr' | 'rtl'
  const isMobile = useAppStore((s) => s.isMobile)
  const triggerPanelGap = 8

  const [coords, setCoords] = useState<Coords>({ top: 0 })

  const getTriggerRect = useCallback(() => props.triggerRef.current?.getBoundingClientRect(), [props.triggerRef])

  const updatePosition = useCallback(() => {
    const r = getTriggerRect()
    if (!r) return

    const top = Math.max(8, r.bottom + triggerPanelGap)

    if (isMobile) {
      // mobile: full-width-ish with side gutters
      setCoords({ top, left: 8, right: 8 })
      return
    }

    if (dir === 'rtl') {
      // RTL: pin to the trigger's left edge
      setCoords({ top, left: Math.max(8, r.left) })
    } else {
      // LTR: pin to the trigger's right edge
      const right = Math.max(8, window.innerWidth - r.right)
      setCoords({ top, right })
    }
  }, [dir, isMobile, getTriggerRect])

  // Recompute when opened, when direction changes, or when layout changes
  useLayoutEffect(() => {
    if (props.isOpen) updatePosition()
  }, [props.isOpen, dir, updatePosition])

  useEffect(() => {
    if (!props.isOpen) return
    const onWinChange = () => updatePosition()
    window.addEventListener('resize', onWinChange)
    window.addEventListener('scroll', onWinChange, { passive: true })
    // nudge Popper-like layouts too
    const raf = requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onWinChange)
      window.removeEventListener('scroll', onWinChange)
    }
  }, [props.isOpen, updatePosition])

  // Force a clean remount per direction so Chakra styles/portal context are fresh
  const modalKey = useMemo(() => `settings-modal-${dir}`, [dir])

  return (
    <Modal key={modalKey} size="lg" isOpen={props.isOpen} onClose={props.onClose} isCentered={false}>
      <ModalOverlay />
      <ModalContent
        ref={contentRef}
        position="fixed"
        top={`${coords.top}px`}
        left={coords.left !== undefined ? `${coords.left}px` : undefined}
        right={coords.right !== undefined ? `${coords.right}px` : undefined}
        transform="none"
        m={0}
        maxW="min(480px, 92vw)"
      >
        <ModalHeader>{t('setting_board.panel_title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SlippageToleranceSettingField />
          <Divider />
          <SlippageToleranceSettingField variant="liquidity" />
          <Divider />
          <VersionedTransactionSettingField />
          <Divider />
          <DefaultExplorerSettingField />
          <Divider />
          <LanguageSettingField />
          <Divider />
          <ColorThemeSettingField />
          <Divider />
          <RPCConnectionSettingField />
          <Divider />
          <AppVersion />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AppNavLayout

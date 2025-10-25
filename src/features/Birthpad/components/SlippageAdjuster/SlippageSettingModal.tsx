import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack
} from '@chakra-ui/react'
import Decimal from 'decimal.js'
import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import DecimalInput from '@/components/DecimalInput'
import { QuestionToolTip } from '@/components/QuestionToolTip'
import { BIRTHPAD_SLIPPAGE_KEY } from '@/constants/storageKeys'
import { useEvent } from '@/hooks/useEvent'
import WarningIcon from '@/icons/misc/WarningIcon'
import { useBirthpadStore } from '@/store'
import { colors } from '@/theme/cssVariables'
import { setStorageItem } from '@/utils/localStorage'
import { formatToRawLocaleStr } from '@/utils/numberish/formatter'
import toPercentString from '@/utils/numberish/toPercentString'

// const BIRTHPAD_SLIPPAGE_KEY = '_sherex_lau_slp_'

export function SlippageSettingModal(props: { isOpen: boolean; onClose: () => void }) {
  const { t } = useTranslation()
  const slippage = useBirthpadStore((s) => s.slippage)
  const [currentSlippage, setCurrentSlippage] = useState<string>(new Decimal(slippage).mul(100).toFixed())
  const [isFirstFocused, setIsFirstFocused] = useState(false)
  const handleChange = useEvent((val: string | number) => {
    setIsFirstFocused(false)
    setCurrentSlippage(String(val))
  })
  const handleUpdateSlippage = useEvent((val: string | number) => {
    const setVal = Number(val ?? 0) / 100
    setStorageItem(BIRTHPAD_SLIPPAGE_KEY, setVal)
    useBirthpadStore.setState({ slippage: setVal }, false, { type: 'SlippageToleranceSettingField' })
  })
  const handleBlur = useEvent(() => {
    setIsFirstFocused(false)
    if (!currentSlippage) handleChange(0)
  })
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
    }
  }, [])
  const handleFocus = useEvent(() => {
    setIsFirstFocused(true)
  })

  const handleSaveFee = useEvent(() => {
    handleUpdateSlippage(currentSlippage || 0)
    props.onClose()
  })

  useEffect(() => {
    setCurrentSlippage(new Decimal(slippage).mul(100).toFixed())
  }, [slippage, props.isOpen])

  const slippageDecimal = new Decimal(currentSlippage || 0)
  const isForerun = slippageDecimal.gt('2.5')
  const isFailrun = slippageDecimal.lt('0.5')
  // const isWarn = isForerun || isFailrun
  // const warnText = isForerun ? t('setting_board.slippage_tolerance_forerun') : isFailrun ? t('setting_board.slippage_tolerance_fail') : ''
  const isWarn = false
  const warnText = ''

  return (
    <Modal size={'md'} isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent
        borderRadius="20px"
        border={`1px solid ${colors.backgroundDark}`}
        boxShadow="0px 8px 48px 0px #4F53F31A"
        paddingInline="2rem"
        py="2rem"
      >
        <ModalHeader marginTop={0} marginBottom={'48px'}>
          <HStack spacing="6px">
            <Text>{t('setting_board.slippage_tolerance_birthpad')}</Text>
            <QuestionToolTip label={t('setting_board.slippage_tolerance_tooltip_birthpad')} iconProps={{ color: colors.textSecondary }} />
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={4} alignItems="flex-start">
            <Flex rowGap={2} flexWrap={['wrap', 'unset']} justifyContent="space-between" w="full">
              <Flex gap="2">
                {[1, 2.5, 5].map((v) => (
                  <Button
                    key={v}
                    size={'sm'}
                    isActive={Number(currentSlippage) == v}
                    variant="capsule-radio"
                    onClick={() => {
                      handleChange(v)
                    }}
                  >
                    {formatToRawLocaleStr(toPercentString(v))}
                  </Button>
                ))}
              </Flex>
              <Flex alignItems="center" rounded="full">
                <Text fontSize="xs" whiteSpace={'nowrap'} color={colors.textSecondary}>
                  {t('setting_board.custom')}
                </Text>
                <DecimalInput
                  variant="filledDark"
                  value={isFirstFocused ? '' : currentSlippage}
                  placeholder={currentSlippage}
                  max={50}
                  decimals={2}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={handleFocus}
                  inputSx={{ textAlign: 'right', rounded: '40px', h: '36px', w: '70px', py: 0, px: '3' }}
                />
                <Text fontSize="xs" color={colors.textSecondary}>
                  %
                </Text>
              </Flex>
            </Flex>
            {isWarn ? (
              <Flex
                px={4}
                py={2}
                bg={colors.warnButtonLightBg}
                color={colors.semanticWarning}
                fontSize="sm"
                fontWeight="medium"
                borderRadius="8px"
                w="full"
              >
                <Text pt={0.5}>
                  <WarningIcon />
                </Text>
                <Text pl={2}>{warnText}</Text>
              </Flex>
            ) : null}
            <Button
              w="full"
              rounded="lg"
              background={colors.solidButtonBg}
              isDisabled={Number(currentSlippage) < 0}
              onClick={handleSaveFee}
            >
              <Text fontSize="md" fontWeight="medium" bgClip="text" color={colors.buttonSolidText}>
                {t('button.save')}
              </Text>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

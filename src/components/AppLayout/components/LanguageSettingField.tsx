import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { changeLang } from '../../../i18n'
import { Select } from '../../Select'

import { SettingField } from './SettingField'

const langMap = {
  English: 'en',
  العربية: 'ar',
  繁體中文: 'zh-TW',
  简体中文: 'zh-CN',
  日本語: 'jp',
  Korean: 'ko',
  Español: 'es',
  Français: 'fr',
  Русский: 'ru',
  Português: 'pt',
  Türkçe: 'tr'
}

function getLangValue(langName: string): string | undefined {
  return langMap[langName as keyof typeof langMap] as string | undefined
}
function getLangName(v: string): string | undefined {
  return Object.entries(langMap).find(([, value]) => value === v)?.[0]
}

// normalize i18next codes like "ar-EG" → "ar"
const normalize = (lng?: string) => (lng ? lng.split('-')[0] : 'en')

export function LanguageSettingField() {
  const { i18n, t } = useTranslation()

  const currentCode = normalize(i18n.resolvedLanguage || i18n.language)
  const currentName = getLangName(currentCode) ?? 'English'

  const onChange = (code: string) => changeLang(code || 'en')

  return (
    <SettingField
      fieldName={t('setting_board.language')}
      tooltip={t('setting_board.language_tooltip')}
      renderToggleButton={
        <Select
          variant="roundedFilledDark"
          // value must match an entry in `items` (names), not the code
          value={currentName}
          items={Object.keys(langMap)} // names shown in the list
          onChange={(langName) => onChange(getLangValue(langName) ?? 'en')}
          // trigger renders the selected name directly
          renderTriggerItem={(name) => <Text fontSize="sm">{name}</Text>}
          // if your Select supports setting direction, you can force LTR for Arabic menu too:
          // dir={currentCode === 'ar' ? 'ltr' : undefined}
        />
      }
    />
  )
}

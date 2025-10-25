import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { setStorageItem } from '@/utils/localStorage'

import ar from './ar.json'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import jp from './jp.json'
import ko from './ko.json'
import pt from './pt.json'
import ru from './ru.json'
import tr from './tr.json'
import zhCN from './zh-CN.json'
import zhTW from './zh-TW.json'

export const I18N_CACHE_KEY = 'i18nextLng'

const i18nConfig = {
  detection: {
    order: ['querystring', 'localStorage', 'cookie', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
    caches: ['localStorage', 'cookie']
  },
  resources: {
    en: { translation: en },
    'zh-TW': { translation: zhTW },
    'zh-CN': { translation: zhCN },
    jp: { translation: jp },
    ko: { translation: ko },
    es: { translation: es },
    fr: { translation: fr },
    ru: { translation: ru },
    pt: { translation: pt },
    tr: { translation: tr },
    ar: { translation: ar }
  },
  fallbackLng: 'en',

  // make detection/play nice with region variants (ar-EG → ar, en-US → en)
  supportedLngs: ['en', 'zh-TW', 'zh-CN', 'jp', 'ko', 'es', 'fr', 'ru', 'pt', 'tr', 'ar'],
  nonExplicitSupportedLngs: true
  // load: "languageOnly"
}

i18n.use(LanguageDetector).use(initReactI18next).init(i18nConfig)

// apply initial dir/lang (browser only)
if (typeof document !== 'undefined') {
  const lng = i18n.resolvedLanguage || i18n.language || 'en'
  const dir = i18n.dir(lng) // 'rtl' for ar, 'ltr' otherwise
  document.documentElement.setAttribute('dir', dir)
  document.documentElement.setAttribute('lang', lng)
}

// keep html dir/lang in sync on every change
i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    const dir = i18n.dir(lng)
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lng)
  }
})

const supportLanguage = new Set(Object.keys(i18nConfig.resources))

export const changeLang = async (lang: string, bundle?: any) => {
  if (!supportLanguage.has(lang)) return
  let data = bundle
  if (lang && !i18n.hasResourceBundle(lang, 'translation')) {
    data = bundle ?? (await import(`./${lang}.json`))
    i18n.addResourceBundle(lang, 'translation', data)
  }

  await i18n.changeLanguage(lang)
  setStorageItem(I18N_CACHE_KEY, lang)

  // ensure dir/lang sync immediately after change
  if (typeof document !== 'undefined') {
    const dir = i18n.dir(lang)
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lang)
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
  }

  return data
}

export default i18n

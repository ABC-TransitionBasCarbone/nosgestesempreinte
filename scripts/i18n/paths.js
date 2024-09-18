/*
	Simple module containing all paths implicated to the translation.
*/

import { resolve } from 'path'
import { availableLanguages } from '@incubateur-ademe/nosgestesclimat-scripts/utils'

export const localesDir = resolve('./src/locales')
export const rulesTranslation = resolve('./src/locales/rules-en.yaml')
export const staticAnalysisFrRes = resolve(
  './src/locales/static-analysis-fr.json'
)
export const UI = Object.fromEntries(
  availableLanguages.map((lang) => [
    lang,
    {
      withLock: resolve(`./src/locales/ui/ui-${lang}.yaml`),
      withoutLock: resolve(`./src/locales/ui/ui-${lang}-min.yaml`),
    },
  ])
)

export const FAQ = Object.fromEntries(
  availableLanguages.map((lang) => [
    lang,
    {
      withLock: resolve(`./src/locales/faq/FAQ-${lang}.yaml`),
      withoutLock: resolve(`./src/locales/faq/FAQ-${lang}-min.yaml`),
    },
  ])
)

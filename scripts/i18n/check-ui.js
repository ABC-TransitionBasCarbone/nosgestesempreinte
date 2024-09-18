import { getUiMissingTranslations } from '@incubateur-ademe/nosgestesclimat-scripts/utils'
import { getArgs, printChecksResultTableHeader, printChecksResult } from '@incubateur-ademe/nosgestesclimat-scripts/cli'

import { UI } from './paths'

const { srcLang, destLangs, markdown } = getArgs(
  'Check missing translations for UI texts.',
  { source: true, target: true, markdown: true }
)

printChecksResultTableHeader(markdown)

destLangs.forEach((destLang) => {
  const missingTranslations = getUiMissingTranslations(
    UI[srcLang].withLock,
    UI[destLang].withLock
  )
  const nbMissingTranslations = missingTranslations.length

  printChecksResult(
    nbMissingTranslations,
    missingTranslations,
    'UI texts',
    destLang,
    markdown
  )
})

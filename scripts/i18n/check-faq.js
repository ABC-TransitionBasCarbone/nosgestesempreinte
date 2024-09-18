import { readYAML, LOCK_KEY_EXT } from '@incubateur-ademe/nosgestesclimat-scripts/utils'
import { getArgs, printChecksResultTableHeader, printChecksResult } from '@incubateur-ademe/nosgestesclimat-scripts/cli'

import { FAQ } from './paths'

const { srcLang, destLangs, markdown } = getArgs(
  'Check missing translations for FAQs.',
  { source: true, target: true, markdown: true }
)

const srcYAML = readYAML(FAQ[srcLang].withLock)

const getIndexOfId = (id, targetEntries) => {
  return targetEntries.findIndex((entry) => {
    const res = entry.id === id
    return res
  })
}

const targetEntryIsUpToDate = (src, target) =>
  target !== undefined &&
  Object.entries(src).every(
    ([key, val]) => key === 'id' || val === target[key + LOCK_KEY_EXT]
  )

printChecksResultTableHeader(markdown)

destLangs.forEach((targetLang) => {
  const targetEntries = readYAML(FAQ[targetLang].withLock)

  const missingTranslations = srcYAML.reduce((acc, refEntry) => {
    const isUpToDate = targetEntryIsUpToDate(
      refEntry,
      targetEntries[getIndexOfId(refEntry.id, targetEntries)]
    )
    !isUpToDate && acc.push(refEntry.id)
    return acc
  }, [])

  const nbMissingTranslations = missingTranslations.length

  printChecksResult(
    nbMissingTranslations,
    missingTranslations,
    "FAQ's questions",
    targetLang,
    markdown
  )
})

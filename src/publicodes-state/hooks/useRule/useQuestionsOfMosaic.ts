'use client'

import { DottedName } from '@/publicodes-state/types'
import { useMemo } from 'react'
import useEngine from '../useEngine'

export type Props = {
  options: DottedName[] | undefined
  optionsConditionnelles: DottedName[] | undefined
  everyMosaicChildren: DottedName[]
  everyRules: DottedName[]
}
export default function useQuestionsOfMosaic({
  options,
  optionsConditionnelles,
  everyMosaicChildren,
  everyRules
}: Props): DottedName[] {
  const { engine } = useEngine();

  const questionsOfMosaic = useMemo<DottedName[]>(
    () => {
      if (options?.length) {
        return options.map(
          (mosaicName) =>
            // TODO: we should manage the case where options don't correspond to exisiting rules
             everyMosaicChildren.find((child) => child.endsWith(mosaicName)) ?? ''
        ) ?? [];
      }

      return optionsConditionnelles?.map(
        (mosaicName) => {
          const tmpMosaicName = mosaicName.replace(" . choix . nombre", "");
          // TODO: we should manage the case where options don't correspond to exisiting rules
          const mosaicParent = everyRules.find((child) => child.endsWith(`${tmpMosaicName} . nombre`)) ?? ''
          if (!mosaicParent) return '';

          const parentValue = engine.evaluate(mosaicParent);
          if (parentValue.nodeValue > 0) return everyMosaicChildren.find((child) => child.endsWith(mosaicName)) ?? ''

          return ''
        }
      ).filter(m => !!m) ?? [];
    },
    [everyMosaicChildren, options, engine, optionsConditionnelles, everyRules]
  )

  return questionsOfMosaic
}

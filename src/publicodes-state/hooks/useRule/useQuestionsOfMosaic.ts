'use client'

import { DottedName } from '@/publicodes-state/types'
import { useMemo } from 'react'
import useEngine from '../useEngine'

export type Props = {
  options: DottedName[] | undefined
  optionsSi: DottedName[] | undefined
  everyMosaicChildren: DottedName[]
  everyRules: DottedName[]
}
export default function useQuestionsOfMosaic({
  options,
  optionsSi,
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

      return optionsSi?.map(
        (mosaicName) => {
          console.log("mosaicName", mosaicName);
          const tmpMosaicName = mosaicName.replace(" . si", "");
          // TODO: we should manage the case where options don't correspond to exisiting rules
          const mosaicParent = everyRules.find((child) => child.endsWith(`${tmpMosaicName} . nombre`)) ?? ''
          if (!mosaicParent) return '';

          const parentValue = engine.evaluate(mosaicParent);
          if (parentValue.nodeValue > 0) return everyMosaicChildren.find((child) => child.endsWith(mosaicName)) ?? ''

          return ''
        }
      ).filter(m => !!m) ?? [];
    },
    [everyMosaicChildren, options, engine, optionsSi, everyRules]
  )

  return questionsOfMosaic
}

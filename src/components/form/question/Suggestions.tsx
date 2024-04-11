'use client'

import { questionClickSuggestion } from '@/constants/tracking/question'
import Button from '@/design-system/inputs/Button'
import { useEngine, useRule } from '@/publicodes-state'
import { DottedName, Situation } from '@/publicodes-state/types'
import { capitalizeString } from '@/utils/capitalizeString'
import { trackEvent } from '@/utils/matomo/trackEvent'

type Props = {
  question: DottedName
  setValue: (value: number) => void
}

export default function Suggestions({ question, setValue }: Props) {
  const { suggestions, addFoldedStep } = useRule(question)
  const { updateSituation } = useEngine()

  if (!suggestions?.length) return
  return (
    <div className="mb-4 flex flex-wrap justify-end gap-2 text-sm">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.label}
          data-cypress-id="suggestion"
          size="sm"
          className="ext-xs font-normal md:text-sm"
          onClick={() => {
            trackEvent(
              questionClickSuggestion({ question, answer: suggestion.label })
            )
            if (typeof suggestion.value === 'object') {
              updateSituation(
                Object.keys(suggestion.value).reduce(
                  (accumulator: Situation, currentValue: string) => ({
                    ...accumulator,
                    [question + ' . ' + currentValue]:
                      suggestion.value && suggestion.value[currentValue],
                  }),
                  {}
                )
              )
              addFoldedStep(question)
            } else {
              setValue(suggestion.value)
            }
          }}>
          {capitalizeString(suggestion.label)}
        </Button>
      ))}
    </div>
  )
}

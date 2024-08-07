'use client'

import Button from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { capitalizeString } from '@/utils/capitalizeString'


type Props = {
  question: DottedName
  setValue: (value: number) => void
}

export default function Suggestions({ question, setValue }: Props) {
  const { suggestions } = useRule(question)

  if (!suggestions?.length) return
  return (
    <div className="mb-4 flex flex-wrap justify-end gap-2 text-sm">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.label}
          size="xs"
          className="text-xs font-normal md:text-sm"
          onClick={() => {
            setValue(suggestion.value)
          }}>
          <Emoji className="flex items-center gap-1 leading-none">
            {capitalizeString(suggestion.label)}
          </Emoji>
        </Button>
      ))}
    </div>
  )
}

import Assistance from '@/components/form/question/Assistance'
import BooleanInput from '@/components/form/question/BooleanInput'
import ChoicesInput from '@/components/form/question/ChoicesInput'
import Label from '@/components/form/question/Label'
import Mosaic from '@/components/form/question/Mosaic'
import Notification from '@/components/form/question/Notification'
import NumberInput from '@/components/form/question/NumberInput'
import Suggestions from '@/components/form/question/Suggestions'
import { DEFAULT_FOCUS_ELEMENT_ID } from '@/constants/accessibility'
import { useRule } from '@/publicodes-state'
import { useEffect, useRef } from 'react'
import Warning from './question/Warning'

type Props = {
  question: string
  tempValue?: number | undefined
  setTempValue?: (value: number | undefined) => void
}

export default function Question({ question, tempValue, setTempValue }: Props) {
  const {
    type,
    label,
    description,
    unit,
    value,
    numericValue,
    setValue,
    isMissing,
    choices,
    assistance,
    activeNotifications,
    plancher,
    warning,
  } = useRule(question)

  // It should happen only on mount (the component remount every time the question changes)
  const prevQuestion = useRef('')
  useEffect(() => {
    if (type !== 'number') {
      setTempValue && setTempValue(undefined)
      return
    }

    if (prevQuestion.current !== question) {
      setTempValue && setTempValue(numericValue)
      prevQuestion.current = question
    }
  }, [type, numericValue, setTempValue, question])

  return (
    <>
      <div className="mb-4">
        <Label
          question={question}
          label={label}
          description={description}
          htmlFor={DEFAULT_FOCUS_ELEMENT_ID}
        />
        <Suggestions
          question={question}
          setValue={(value) => {
            if (type === 'number') {
              setTempValue && setTempValue(value)
            }
            setValue(value, question)
          }}
        />
        {type === 'number' && (
          <NumberInput
            unit={unit}
            value={setTempValue ? tempValue : numericValue}
            setValue={(value) => {
              setTempValue && setTempValue(value)
              setValue(value, question)
            }}
            isMissing={isMissing}
            min={0}
            data-cypress-id={question}
            id={DEFAULT_FOCUS_ELEMENT_ID}
          />
        )}
        {type === 'boolean' && (
          <BooleanInput
            value={value}
            setValue={(value) => setValue(value, question)}
            isMissing={isMissing}
            data-cypress-id={question}
            label={label || ''}
            id={DEFAULT_FOCUS_ELEMENT_ID}
          />
        )}
        {type === 'choices' && (
          <ChoicesInput
            question={question}
            choices={choices}
            value={String(value)}
            setValue={(value) => setValue(value, question)}
            isMissing={isMissing}
            data-cypress-id={question}
            label={label || ''}
            id={DEFAULT_FOCUS_ELEMENT_ID}
          />
        )}
        {type === 'mosaic' && <Mosaic question={question} />}
      </div>
      <Warning
        type={type}
        plancher={plancher}
        warning={warning}
        tempValue={tempValue}
      />
      {assistance ? (
        <Assistance question={question} assistance={assistance} />
      ) : null}
      {activeNotifications.map((notification) => (
        <Notification key={notification} notification={notification} />
      ))}
    </>
  )
}

'use client'

import Assistance from '@/components/form/question/Assistance'
import BooleanInput from '@/components/form/question/BooleanInput'
import ChoicesInput from '@/components/form/question/ChoicesInput'
import Label from '@/components/form/question/Label'
import Mosaic from '@/components/form/question/Mosaic'
import Notification from '@/components/form/question/Notification'
import NumberInput from '@/components/form/question/NumberInput'
import Suggestions from '@/components/form/question/Suggestions'
import {
  DEFAULT_FOCUS_ELEMENT_ID,
  QUESTION_DESCRIPTION_BUTTON_ID,
} from '@/constants/accessibility'
import { useRule } from '@/publicodes-state'
import { useEffect, useRef } from 'react'
import Warning from './question/Warning'

type Props = {
  question: string
  tempValue?: number | undefined
  setTempValue?: (value: number | undefined) => void
  showInput?: boolean
}

export default function Question({ question, tempValue, setTempValue, showInput = true }: Props) {
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
      if (setTempValue) setTempValue(undefined)
      return
    }

    if (prevQuestion.current !== question) {
      if (setTempValue) setTempValue(numericValue)
      prevQuestion.current = question
    }
  }, [type, numericValue, setTempValue, question])

  return (
    <>
      <div className="mb-4">
        <Label question={question} label={label} description={description} />

        {showInput && (
          <Suggestions
            question={question}
            setValue={(value) => {
              if (type === 'number') {
                if (setTempValue) setTempValue(value)
              }
              setValue(value, { foldedStep: question })
            }}
          />
        )}

        {type === 'number' && showInput && (
          <NumberInput
            unit={unit}
            value={setTempValue ? tempValue : numericValue}
            setValue={(value) => {
              if (setTempValue) {
                setTempValue(value)
              }
              setValue(value, { foldedStep: question })
            }}
            isMissing={isMissing}
            min={0}
            id={DEFAULT_FOCUS_ELEMENT_ID}
            aria-describedby={QUESTION_DESCRIPTION_BUTTON_ID}
          />
        )}

        {type === 'boolean' && showInput && (
          <BooleanInput
            value={value}
            setValue={(value) => {
              {
                setValue(value, { foldedStep: question })
              }
            }}
            isMissing={isMissing}
            label={label || ''}
            id={DEFAULT_FOCUS_ELEMENT_ID}
            aria-describedby={QUESTION_DESCRIPTION_BUTTON_ID}
          />
        )}

        {type === 'choices' && showInput && (
          <ChoicesInput
            question={question}
            choices={choices}
            value={String(value)}
            setValue={(value) => {
              {
                setValue(value, { foldedStep: question })
              }
            }}
            isMissing={isMissing}
            label={label || ''}
            id={DEFAULT_FOCUS_ELEMENT_ID}
            aria-describedby={QUESTION_DESCRIPTION_BUTTON_ID}
          />
        )}

        {type === 'mosaic' && showInput && (
          <Mosaic
            question={question}
            aria-describedby={QUESTION_DESCRIPTION_BUTTON_ID}
          />
        )}
      </div>

      <Warning
        type={type}
        plancher={plancher}
        warning={warning}
        tempValue={tempValue}
      />

      {assistance ? (
        <Assistance
          question={question}
          assistance={assistance}
          setTempValue={setTempValue}
        />
      ) : null}

      {activeNotifications.map((notification) => (
        <Notification key={notification} notification={notification} />
      ))}
    </>
  )
}

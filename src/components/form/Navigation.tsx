'use client'

import {
  DEFAULT_FOCUS_ELEMENT_ID,
  QUESTION_DESCRIPTION_BUTTON_ID,
} from '@/constants/accessibility'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useMagicKey } from '@/hooks/useMagicKey'
import { useCurrentSimulation, useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'

import { MouseEvent, useCallback } from 'react'

type Props = {
  question: DottedName
  tempValue?: number
  noPrevQuestion: boolean
  noNextQuestion: boolean
  transitionPage?: string
  buttonText?: string
  onComplete?: () => void
  gotoPrevQuestion: () => string | undefined
  gotoNextQuestion: () => string | undefined
}

export default function Navigation({
  question,
  tempValue,
  noPrevQuestion,
  noNextQuestion,
  transitionPage,
  buttonText,
  onComplete = () => '',
  gotoPrevQuestion,
  gotoNextQuestion,
}: Props) {
  const { t } = useClientTranslation()

  const { isMissing, plancher } = useRule(question)

  const { updateCurrentSimulation } = useCurrentSimulation()

  const isNextDisabled =
    tempValue !== undefined && plancher !== undefined && tempValue < plancher

  const handleGoToNextQuestion = useCallback(
    async (e: KeyboardEvent | MouseEvent) => {
      e.preventDefault()

      if (isMissing) {
        updateCurrentSimulation({ foldedStepToAdd: question })
      }

      handleMoveFocus()

      if (noNextQuestion) {
        onComplete()
        return
      }

      gotoNextQuestion()
    },
    [
      question,
      gotoNextQuestion,
      noNextQuestion,
      isMissing,
      onComplete,
      updateCurrentSimulation,
    ]
  )

  useMagicKey({
    gotToNextQuestion: handleGoToNextQuestion,
  })

  const handleMoveFocus = () => {
    // Focus the question title upon question change
    setTimeout(() => {
      const focusedElement =
        // Default : focus the first element focusable in the modified area of the form
        document.getElementById(
          QUESTION_DESCRIPTION_BUTTON_ID
          // Otherwise focus the first input or field button
        ) ??
        document.getElementById(
          DEFAULT_FOCUS_ELEMENT_ID
          // Edge case : mosaics
        ) ??
        document.getElementById(`${DEFAULT_FOCUS_ELEMENT_ID}-0`)

      if (focusedElement) {
        focusedElement?.focus()
      }
    })
  }

  return (
    <div className="flex justify-end  gap-4">
      {!noPrevQuestion ? (
        <Button
          size="md"
          onClick={() => {

            if (!noPrevQuestion) {
              gotoPrevQuestion()
            }

            handleMoveFocus()
          }}
          color="text">
          {'← ' + t('Précédent')}
        </Button>
      ) : null}
      <Button
        color={isMissing ? 'secondary' : 'primary'}
        disabled={isNextDisabled}
        size="md"
        onClick={handleGoToNextQuestion}>
        {buttonText ?
          buttonText
          : noNextQuestion
            ? t('Terminer')
            : isMissing && !transitionPage
              ? t('Je ne sais pas') + ' →'
              : t('Suivant') + ' →'}
      </Button>
    </div>
  )
}

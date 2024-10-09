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

import { MouseEvent, useCallback, useState } from 'react'

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

  const [_data, setData] = useState(null);

  const handleGoToNextQuestion = useCallback(
    async (e: KeyboardEvent | MouseEvent) => {
      e.preventDefault()

      if (isMissing) {
        updateCurrentSimulation({
          situationToAdd: {
            [question]: null
          },
          foldedStepToAdd: question
        })
      }

      handleMoveFocus()

      if (noNextQuestion) {
        const localStorageValue = localStorage.getItem('nosgestesempreinte::v1')
        let value = null
        if (localStorageValue) {
          const JSONValue = JSON.parse(localStorageValue)
          //TODO: Pour l'instant on prend la dernière mais à voir pour la suite
          JSONValue.simulation = JSONValue.simulations.at(-1)
          delete JSONValue.simulations
          value = JSON.stringify(JSONValue)
        }

        fetch('/api/add-row', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: value }),
        })
            .then((res) => {
              if (!res.ok) {
                throw new Error(`Erreur HTTP: ${res.status}`);
              }
              return res.json();
            })
            .then((data) => {
              console.log('Réponse du serveur:', data);
              onComplete();
              setData(data.message);
            })
            .catch((error) => {
              alert("Une erreur s'est produite lors de l'enregistrement de votre sondage. Réessayer dans quelques instants ou contactez xx.xx@xx.com")
              console.error("Erreur lors de l'envoi de la requête:", error);
            });
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

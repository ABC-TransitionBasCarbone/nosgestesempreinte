'use client'

import {
  DEFAULT_FOCUS_ELEMENT_ID,
  QUESTION_DESCRIPTION_BUTTON_ID,
} from '@/constants/accessibility'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useMagicKey } from '@/hooks/useMagicKey'
import { useCurrentSimulation, useEngine, useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'

import { MouseEvent, useCallback, useMemo, useState } from 'react'
import { safeEvaluateHelper } from '@/publicodes-state/helpers/safeEvaluateHelper'

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { engine } = useEngine()

  const { t } = useClientTranslation()

  const { isMissing, plancher, value } = useRule(question)

  const { updateCurrentSimulation } = useCurrentSimulation()

  const isNextDisabled = useMemo(() => {
    return !transitionPage &&
    ((tempValue !== undefined && plancher !== undefined && tempValue < plancher) || value === undefined);
  }, [plancher, tempValue, transitionPage, value]);

  const [_data, setData] = useState(null);

  // Fonction pour préparer les données à envoyer
  const prepareDataToSend = useCallback((JSONValue: any, headers: any[]): Record<string, any>[] => {
    const dataToSend: any[] = [];
    const opinionWayId = JSONValue.simulation.opinionWayId;
    const simulationData = {
      ...JSONValue.simulation.situation,
      ...JSONValue.simulation.suggestions,
    };

    headers.forEach((key) => {
      let value = simulationData[key];

      if (key === 'id opinion way') {
        dataToSend.push(opinionWayId);
        return;
      }
      if (value === null) {
        value = 'je ne sais pas';
      }
      //TODO: patch rapide en attendant de fixer le modele
      else if (value === 'non') {
        value = 'FALSE'
      }
      else if (!key.includes('aide saisie')) {
        value = safeEvaluateHelper(key, engine)?.nodeValue ?? '';
      }
      dataToSend.push(value);
    });

    return dataToSend;
  }, [engine]);

  // Fonction pour envoyer les données au serveur
  const sendDataToServer = useCallback(async (data: any) => {
    const JSONValue = await getLastSimulationFromLocalStorage();
    try {
      const response = await fetch('/api/add-row', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ simulationResults: data, voitures: JSONValue.simulation.voitures }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log('Réponse du serveur:', result);
      onComplete();
      setData(result.message);
    } catch (error) {
      alert(
        "Une erreur s'est produite lors de l'enregistrement de votre sondage. Réessayer dans quelques instants ou contactez xx.xx@xx.com"
      );
      console.error('Erreur lors de l’envoi des données au serveur:', error);
    }
  }, [onComplete]);

  const { type, questionsOfMosaic } = useRule(question)

  const handleGoToNextQuestion = useCallback(
    async () => {
      if (isMissing) {
        if (type === 'mosaic') {
          questionsOfMosaic.forEach((key) => {
            updateCurrentSimulation({
              situationToAdd: {
                [key]: null
              },
              foldedStepToAdd: question
            })
          })
        } else {
          updateCurrentSimulation({
            situationToAdd: {
              [question]: null
            },
            foldedStepToAdd: question
          })
        }

      }

      handleMoveFocus()

      if (noNextQuestion) {
        const JSONValue = await getLastSimulationFromLocalStorage();
        if (!JSONValue) return;

        const headers = await fetchHeaders();
        if (!headers) return;

        const dataToSend = prepareDataToSend(JSONValue, headers);
        await sendDataToServer(dataToSend);
        return;
      }

      gotoNextQuestion()
    },
    [
      question,
      gotoNextQuestion,
      noNextQuestion,
      isMissing,
      updateCurrentSimulation,
      prepareDataToSend,
      sendDataToServer,
      type,
      questionsOfMosaic
    ]
  )

  const handleClick = useCallback(
    async (e: KeyboardEvent | MouseEvent) => {
      try {
        e.preventDefault()
        setIsLoading(true);
        await handleGoToNextQuestion();
        setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        console.log('error');
      } finally {
        setIsLoading(false);
      }
    }, [handleGoToNextQuestion]);


  async function getLastSimulationFromLocalStorage() {
    const localStorageValue = localStorage.getItem('nosgestesempreinte::v1');
    if (!localStorageValue) return null;

    const JSONValue: any = JSON.parse(localStorageValue);
    JSONValue.simulation = JSONValue.simulations.at(-1); // Dernière simulation
    delete JSONValue.simulations;
    return JSONValue;
  }

  async function fetchHeaders(): Promise<any[]> {
    try {
      const response = await fetch('/api/get-headers', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data.headers || [];
    } catch (error) {
      alert(
        "Une erreur s'est produite lors de l'enregistrement de votre sondage. Réessayer dans quelques instants ou contactez xx.xx@xx.com"
      );
      console.error('Erreur lors de la récupération des en-têtes:', error);
      return [];
    }
  }
  

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
    <div className="flex justify-end gap-4 flex-col sm:flex-row">
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
        disabled={isNextDisabled || isLoading}
        size="md"
        onClick={handleClick}>
        {buttonText ?
          buttonText
          : noNextQuestion
            ? t('Terminer')
            : isMissing && !transitionPage && !isNextDisabled
              ? t('Je ne sais pas') + ' →'
              : t('Suivant') + ' →'}
      </Button>
    </div>
  )
}

import { PreventNavigationContext } from '@/app/_components/mainLayoutProviders/PreventNavigationProvider'
import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import questions from '@/components/questions'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useDebug } from '@/hooks/useDebug'
import { useQuestionInQueryParams } from '@/hooks/useQuestionInQueryParams'
import { useCurrentSimulation, useEngine, useForm } from '@/publicodes-state'
import { useContext, useEffect, useMemo, useState } from 'react'
import ColorIndicator from './form/ColorIndicator'
import TransitionPage from '@/app/(layout-with-navigation)/(simulation)/transition/page'
import { TransitionPageKey, transitions } from '@/constants/transitions'
import getNamespace from '@/publicodes-state/helpers/getNamespace'

export default function Form() {
  const isDebug = useDebug()

  const { progression, id } = useCurrentSimulation()

  const {
    transitionPage,
    setTransitionPage,
    remainingQuestions,
    relevantAnsweredQuestions,
    relevantQuestions,
    currentQuestion,
    setCurrentQuestion,
    noPrevQuestion,
    noNextQuestion,
    gotoPrevQuestion,
    gotoNextQuestion,
  } = useForm()

  const { questionInQueryParams, setQuestionInQueryParams } =
    useQuestionInQueryParams()

  const { goToEndPage } = useEndPage()

  const [isInitialized, setIsInitialized] = useState(false)

  const { getNumericValue } = useEngine()

  // When we reach the end of the test (by clicking on the last navigation button),
  // we wait for the progression to be updated before redirecting to the end page
  const [shouldGoToEndPage, setShouldGoToEndPage] = useState(false)

  useEffect(() => {
    if (shouldGoToEndPage && progression === 1) {

      goToEndPage({
        allowedToGoToGroupDashboard: true,
      })
    }
  }, [
    shouldGoToEndPage,
    progression,
    goToEndPage,
    getNumericValue,
    id,
  ])

  const [tempValue, setTempValue] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (!isInitialized) {
      let nextCurrentQuestion;
      if (
        questionInQueryParams &&
        (relevantAnsweredQuestions.includes(questionInQueryParams) || isDebug)
      ) {
        nextCurrentQuestion = questionInQueryParams;
      } else {
        nextCurrentQuestion = remainingQuestions[0];
      }
      if (relevantQuestions?.indexOf(nextCurrentQuestion) === 0) setTransitionPage(getNamespace(relevantQuestions[0]))
      setCurrentQuestion(nextCurrentQuestion);

      setIsInitialized(true)
    }
  }, [isDebug, questionInQueryParams, remainingQuestions, relevantAnsweredQuestions, setCurrentQuestion, isInitialized, relevantQuestions, setTransitionPage])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentQuestion])

  useEffect(() => {
    if (isInitialized && currentQuestion) {
      setQuestionInQueryParams(currentQuestion)
    }
  }, [setQuestionInQueryParams, currentQuestion, isInitialized])

  const { handleUpdateShouldPreventNavigation, shouldPreventNavigation } =
    useContext(PreventNavigationContext)

  const content = useMemo(() => {
      if (transitionPage && Object.keys(transitions).includes(transitionPage)) return transitions[transitionPage as TransitionPageKey];

      return { buttonText: "" };
    }, [transitionPage])

  if (!isInitialized || !currentQuestion) {
    return
  }

  const QuestionComponent = questions[currentQuestion] || Question

  return (
    <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-100 p-4 pl-6">
      <ColorIndicator question={currentQuestion} />
      {
        transitionPage
          ? <TransitionPage transitionPage={transitionPage} />
          : <QuestionComponent
              question={currentQuestion}
              key={currentQuestion}
              tempValue={tempValue}
              setTempValue={setTempValue}
            />
      }
      <Navigation
        buttonText={content.buttonText}
        transitionPage={transitionPage}
        question={currentQuestion}
        tempValue={tempValue}
        onComplete={() => {
          if (shouldPreventNavigation) {
            handleUpdateShouldPreventNavigation(false)
          }

          setShouldGoToEndPage(true)
        }}
        noPrevQuestion={noPrevQuestion}
        noNextQuestion={noNextQuestion}
        gotoPrevQuestion={gotoPrevQuestion}
        gotoNextQuestion={gotoNextQuestion}
      />
    </div>
  )
}

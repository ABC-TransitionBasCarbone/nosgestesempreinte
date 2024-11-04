import getNamespace from '@/publicodes-state/helpers/getNamespace'
import { useMemo, useState } from 'react'

type Props = {
  remainingQuestions: string[]
  relevantQuestions: string[]
  currentQuestion: string | null
  setCurrentQuestion: (question: string | null) => void
}

export default function useNavigation({
  relevantQuestions,
  currentQuestion,
  setCurrentQuestion,
}: Props) {
  const [transitionPage, setTransitionPage] = useState<string | undefined>(undefined);

  const currentQuestionNamespace = useMemo<string | undefined>(
    () => getNamespace(currentQuestion),
    [currentQuestion]
  )

  const currentQuestionIndex = useMemo<number>(
    () => (currentQuestion ? relevantQuestions?.indexOf(currentQuestion) : 0),
    [relevantQuestions, currentQuestion]
  )

  const noPrevQuestion = useMemo<boolean>(
    () => transitionPage === getNamespace(relevantQuestions[0]),
    [relevantQuestions, transitionPage]
  )
  const noNextQuestion = useMemo<boolean>(
    () => !relevantQuestions[currentQuestionIndex + 1],
    [relevantQuestions, currentQuestionIndex]
  )

  const isLastQuestionOfCategory = useMemo<boolean>(
    () =>
      getNamespace(relevantQuestions[currentQuestionIndex + 1]) !==
      currentQuestionNamespace,
    [currentQuestionNamespace, currentQuestionIndex, relevantQuestions]
  )

  const isFirstQuestionOfCategory = useMemo<boolean>(
    () =>
      getNamespace(relevantQuestions[currentQuestionIndex - 1]) !==
      currentQuestionNamespace,
    [currentQuestionNamespace, currentQuestionIndex, relevantQuestions]
  )

  const gotoPrevQuestion = (): string | undefined => {
    if (noPrevQuestion) {
      return undefined
    }

    const newCurrentQuestion = relevantQuestions[currentQuestionIndex - 1]

    const currentCategory = getNamespace(relevantQuestions[currentQuestionIndex]);
    const nextCategory = getNamespace(newCurrentQuestion);

    // Si la catégorie change, redirige vers une page intermédiaire
    if (!transitionPage && currentCategory !== nextCategory && currentCategory !== "services sociétaux") {
      setTransitionPage(currentCategory);
      return;
    }

    if (transitionPage) {
      setTransitionPage(undefined)
    }

    setCurrentQuestion(newCurrentQuestion)

    return newCurrentQuestion
  }
  const gotoNextQuestion = (): string | undefined => {
    if (noNextQuestion) {
      return undefined
    }
    if (transitionPage) {
      setTransitionPage(undefined);
      return;
    }

    const newCurrentQuestion = relevantQuestions[currentQuestionIndex + 1]

    const currentCategory = getNamespace(relevantQuestions[currentQuestionIndex]);
    const nextCategory = getNamespace(newCurrentQuestion);

    // Si la catégorie change, redirige vers une page intermédiaire
    if (!transitionPage && currentCategory !== nextCategory && nextCategory !== "services sociétaux") {
      setTransitionPage(nextCategory);
    }

    setCurrentQuestion(newCurrentQuestion)

    return newCurrentQuestion
  }

  return {
    transitionPage,
    setTransitionPage,
    gotoPrevQuestion,
    gotoNextQuestion,
    noPrevQuestion,
    noNextQuestion,
    isFirstQuestionOfCategory,
    isLastQuestionOfCategory,
  }
}

'use client'

import { useContext } from 'react'
import formContext from '../formProvider/context'
import useNavigation from './useNavigation'

export default function useForm() {
  const {
    categories,
    subcategories,
    relevantQuestions,
    currentQuestion,
    currentCategory,
    setCurrentQuestion,
    setCurrentCategory,
    remainingQuestions,
    relevantAnsweredQuestions,
    progression,
    remainingQuestionsByCategories,
  } = useContext(formContext)

  const {
    gotoPrevQuestion,
    gotoNextQuestion,
    noPrevQuestion,
    noNextQuestion,
    isLastQuestionOfCategory,
  } = useNavigation({
    remainingQuestions,
    relevantQuestions,
    currentQuestion,
    setCurrentQuestion,
  })

  return {
    /**
     * Every relevant categories ordered as needed for the simulation root (default: bilan)
     */
    categories,
    /**
     * Every relevant subcategories sorted by category
     */
    subcategories,
    /**
     * Every questions (answered and missing) that should be displayed in the form
     */
    relevantQuestions,
    /**
     * The question that should currently be displayed in the form
     */
    currentQuestion,
    /**
     * The category of the current question
     */
    currentCategory,
    /**
     * Setter for the current question
     */
    setCurrentQuestion,
    /**
     * Setter for the current category (shouldn't be used: use setCurrentQuestion instead)
     */
    setCurrentCategory,
    /**
     * Go to the previous question as determined by relevantQuestions (and currentQuestion)
     */
    gotoPrevQuestion,
    /**
     * Go to the next question as determined by relevantQuestions (and currentQuestion)
     */
    gotoNextQuestion,
    /**
     * Is true if there is no previous question in the form
     */
    noPrevQuestion,
    /**
     * Is true if there is no next question in the form
     */
    noNextQuestion,
    /**
     * Is true if there is no next question in the current category
     */
    isLastQuestionOfCategory,
    /**
     * Every missing questions needed to complete the form
     */
    remainingQuestions,
    /**
     * Every answered questions that are still relevant and should be displayed in the form (foldedsteps minus questions that are disabled by parents and can't enable themselves)
     */
    relevantAnsweredQuestions,
    /**
     * Progression in the test (betweeen 0 and 1)
     */
    progression,
    /**
     * Every missing questions needed to complete the form sorted by category
     */
    remainingQuestionsByCategories,
  }
}

import { PublicodesExpression } from 'publicodes'
import { useMemo } from 'react'
import getIsMissing from '../../helpers/getIsMissing'
import getQuestionsOfMosaic from '../../helpers/getQuestionsOfMosaic'
import {
  DottedName,
  NGCEvaluatedNode,
  NGCRuleNode,
  Situation,
} from '../../types'

type Props = {
  root: string
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (rule: PublicodesExpression) => NGCEvaluatedNode | null
  categories: string[]
  subcategories: Record<string, string[]>
  situation: Situation
  foldedSteps: string[]
  everyQuestions: string[]
  everyMosaicChildren: string[]
  rawMissingVariables: Record<string, number>
}

/**
 * This is were we get all the questions of the form in the correct order
 */
export default function useQuestions({
  root,
  safeEvaluate,
  safeGetRule,
  categories,
  subcategories,
  situation,
  foldedSteps,
  everyQuestions,
  everyMosaicChildren,
  rawMissingVariables,
}: Props) {
  const missingVariables = useMemo<Record<string, number>>(
    () =>
      Object.fromEntries(
        Object.entries(safeEvaluate(root)?.missingVariables || {}).filter(
          (missingVariable) => everyQuestions.includes(missingVariable[0])
        )
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [safeEvaluate, root, everyQuestions, situation]
  )

  const remainingUnsortedByOrderQuestions = useMemo<string[]>(
    () =>
      // We take every questions
      everyQuestions
        // We remove all that are in mosaics,
        .filter(
          (question) =>
            !everyMosaicChildren.find((mosaic) => mosaic === question)
        )
        // all that are in folded steps
        .filter((question) => foldedSteps.indexOf(question) === -1)
        // and all that are not missing
        .filter((question) =>
          Object.keys(missingVariables).find((missingVariable) =>
            missingVariable.includes(question)
          )
        )
        .sort((a, b) => {
          const aSplittedName = a.split(' . ')
          const bSplittedName = b.split(' . ')

          // We first sort by category
          if (
            categories.indexOf(aSplittedName[0]) >
            categories.indexOf(bSplittedName[0])
          ) {
            return 1
          }
          if (
            categories.indexOf(aSplittedName[0]) <
            categories.indexOf(bSplittedName[0])
          ) {
            return -1
          }

          // then by subcategory
          const categoryOfBothQuestions = aSplittedName[0]
          const aCategoryAndSubcategory =
            aSplittedName[0] + ' . ' + aSplittedName[1]
          const bCategoryAndSubcategory =
            bSplittedName[0] + ' . ' + bSplittedName[1]
          if (
            subcategories[categoryOfBothQuestions].indexOf(
              aCategoryAndSubcategory
            ) >
            subcategories[categoryOfBothQuestions].indexOf(
              bCategoryAndSubcategory
            )
          ) {
            return 1
          }
          if (
            subcategories[categoryOfBothQuestions].indexOf(
              aCategoryAndSubcategory
            ) <
            subcategories[categoryOfBothQuestions].indexOf(
              bCategoryAndSubcategory
            )
          ) {
            return -1
          }

          // then if there is a km or a proprietaire (this is shit)
          if (a.includes('km')) {
            return -1
          }
          if (b.includes('km')) {
            return 1
          }
          if (a.includes('propriétaire')) {
            return -1
          }
          if (b.includes('propriétaire')) {
            return 1
          }

          // then by length
          if (bSplittedName.length > aSplittedName.length) {
            return -1
          }
          if (aSplittedName.length > bSplittedName.length) {
            return 1
          }

          // then by number of missing variables
          return missingVariables[b] - missingVariables[a]
        }),
    [
      foldedSteps,
      categories,
      subcategories,
      missingVariables,
      everyQuestions,
      everyMosaicChildren,
    ]
  )

  const remainingQuestions = useMemo(() => {
    // Regrouper les questions par catégorie (le premier mot avant le premier point)
    const questionsByCategory: { [category: string]: { key: string, ordre: number }[] } = {};

    // Parcourir toutes les questions
    remainingUnsortedByOrderQuestions.forEach((key) => {
      const rule = safeGetRule(key);
      const ordre = rule?.rawNode?.ordre !== undefined ? rule.rawNode.ordre : Infinity;

      // Extraire la catégorie (le premier mot avant le premier point)
      const category = key.split(' . ')[0];

      // Si la catégorie n'existe pas encore, la créer
      if (!questionsByCategory[category]) {
        questionsByCategory[category] = [];
      }

      // Ajouter la question dans la catégorie correspondante
      questionsByCategory[category].push({ key, ordre });
    });

    // Créer un tableau pour stocker le résultat final trié
    const sortedKeys: string[] = [];

    // Parcourir les catégories et trier les questions dans chaque catégorie par ordre
    Object.keys(questionsByCategory).forEach((category) => {
      const questions = questionsByCategory[category];

      // Trier les questions dans chaque catégorie par ordre
      questions.sort((a, b) => a.ordre - b.ordre);

      // Ajouter les clés triées dans le tableau final
      questions.forEach((item) => {
        sortedKeys.push(item.key);
      });
    });

    return sortedKeys
  }, [remainingUnsortedByOrderQuestions, safeGetRule])

  const relevantAnsweredQuestions = useMemo<string[]>(
    () =>
      foldedSteps.filter((foldedStep) => {
        // checks that there is still a question associated to the folded step
        if (!everyQuestions.includes(foldedStep)) {
          return false
        }

        const isApplicable =
          safeEvaluate({ 'est applicable': foldedStep })?.nodeValue === true

        const isInMissingVariables =
          Object.keys(rawMissingVariables).includes(foldedStep)

        // even if the question is disabled, we want to display it if it's a missing variable
        // (this is the case for boolean question whose value is a condition for the parent).
        return isInMissingVariables || isApplicable
      }),
    // We want to recompute this every time the situation changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [situation, foldedSteps, safeEvaluate, everyQuestions, rawMissingVariables]
  )

  const tempRelevantQuestions = useMemo<string[]>(
    () => [
      /**
       * We add every answered questions to display and every not answered
       * questions to display to get every relevant questions
       */
      ...relevantAnsweredQuestions,
      ...remainingQuestions.filter((dottedName: DottedName) =>
        // We check again if the question is missing or not to make sure mosaic
        // are correctly assessed (this is less than ideal)
        getIsMissing({
          dottedName,
          situation,
          // FIXME: we might want to use `useMosaicQuestions` here but we need
          // to have access to the corresponding 'options'
          questionsOfMosaic: getQuestionsOfMosaic({
            dottedName,
            everyMosaicChildren,
          }),
        })
      ),
    ],
    [
      relevantAnsweredQuestions,
      remainingQuestions,
      situation,
      everyMosaicChildren,
    ]
  )

  /**
   * There is a small delay between adding a question to the answered questions
   * and removing it from the missing questions. So we need to check for
   * duplicates
   *
   * (yes, this is shit)
   */
  const relevantQuestions = useMemo<string[]>(
    () =>
      tempRelevantQuestions.filter(
        (question, index) => tempRelevantQuestions.indexOf(question) === index
      ),
    [tempRelevantQuestions]
  )

  const questionsByCategories = useMemo<Record<string, string[]>>(
    () =>
      categories.reduce(
        (accumulator: Record<string, string[]>, currentValue: string) => ({
          ...accumulator,
          [currentValue]: relevantQuestions.filter((question) =>
            question.includes(currentValue)
          ),
        }),
        {}
      ),
    [relevantQuestions, categories]
  )

  return {
    missingVariables,
    remainingQuestions,
    relevantAnsweredQuestions,
    relevantQuestions,
    questionsByCategories,
  }
}

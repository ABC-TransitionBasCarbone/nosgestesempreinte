'use client'

import { useContext, useMemo } from 'react'
import simulationContext from '../simulationProvider/context'
import { NGCEvaluatedNode, NGCRuleNode } from '../types'
import useChoices from './useChoices'
import useContent from './useContent'
import useMosaic from './useMosaic'
import useType from './useType'
import useValue from './useValue'

export default function useRule(dottedName: string = '') {
  const {
    engine,
    safeGetRule,
    safeEvaluate,
    situation,
    updateSituation,
    everyMosaicChildWhoIsReallyInMosaic,
  } = useContext(simulationContext)

  const evaluation = useMemo<NGCEvaluatedNode | null>(
    () => safeEvaluate(dottedName),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dottedName, engine, situation]
  )
  const rule = useMemo<NGCRuleNode | null>(
    () => safeGetRule(dottedName),
    [dottedName, safeGetRule]
  )

  // TODO: add Sentry call
  if (!rule) {
    console.log(dottedName)
  }

  const { type, getType } = useType({
    dottedName,
    rule,
    evaluation,
  })

  const { questionsOfMosaic, shouldDisplayAucun, parent } = useMosaic({
    dottedName,
    rule,
    everyMosaicChildWhoIsReallyInMosaic,
  })

  const {
    category,
    title,
    label,
    description,
    icons,
    unit,
    color,
    assistance,
    isInactive,
    suggestions,
  } = useContent({
    dottedName,
    rule,
    safeGetRule,
  })

  const choices = useChoices({ rule, type })

  const { value, displayValue, isMissing, setValue, setDefaultAsValue } =
    useValue({
      dottedName,
      safeGetRule,
      safeEvaluate,
      evaluation,
      type,
      getType,
      questionsOfMosaic,
      updateSituation,
    })

  return {
    type,
    category,
    title,
    label,
    description,
    icons,
    unit,
    color,
    assistance,
    isInactive,
    suggestions,
    choices,
    questionsOfMosaic,
    parent,
    shouldDisplayAucun,
    value,
    displayValue,
    isMissing,
    setValue,
    setDefaultAsValue,
  }
}

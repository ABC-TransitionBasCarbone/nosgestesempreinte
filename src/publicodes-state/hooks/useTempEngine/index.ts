import { DottedName } from '@/publicodes-state/types'
import { useContext } from 'react'
import simulationContext from '../../providers/simulationProvider/context'

/**
 * This is temporary and should be put to death as soon as possible
 */
export default function useTempEngine() {
  const { safeEvaluate, rules, safeGetRule } =
    useContext(simulationContext) ?? {}

  const getRuleObject = (dottedName: DottedName): any => {
    return { ...safeEvaluate(dottedName), ...safeGetRule(dottedName) }
  }

  return {
    getRuleObject,
    rules,
  }
}

import { SimulationContext } from '@/publicodes-state/providers/simulationProvider/context'
import { useContext } from 'react'

/**
 * A hook that make available some information on the current instanciated simulation.
 */
export default function useSimulation() {
  const {
    categories,
    subcategories,
    everyQuestions,
    everyMosaic,
    everyMosaicChildren,
    everyRules,
    pristineEngine,
    safeEvaluate,
    safeGetRule,
  } = useContext(SimulationContext)

  return {
    categories: [...categories],
    subcategories,
    everyQuestions,
    everyMosaic,
    everyMosaicChildren,
    everyRules,
    pristineEngine,
    safeEvaluate,
    safeGetRule,
  }
}

import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useCurrentSimulation } from '@/publicodes-state'
import { useCallback, useMemo } from 'react'
import { useClientTranslation } from '../useClientTranslation'
import { useEndPage } from './useEndPage'

type GetLinkToSimulateurPageProps = {
  newSimulation?: boolean
}
const getLinkToSimulateurPagePropsDefault = {
  newSimulation: false,
}
export function useSimulateurPage() {
  const { t } = useClientTranslation()

  const { getLinkToEndPage } = useEndPage()

  const { progression } = useCurrentSimulation()

  const getLinkToSimulateurPage = useCallback(
    ({
      newSimulation,
    }: GetLinkToSimulateurPageProps = getLinkToSimulateurPagePropsDefault): string => {
      // If the user has completed the test (and we are not initializing a new one) we return the results page link
      if (progression === 1 && !newSimulation) {
        return getLinkToEndPage()
      }

      return getLinkToSimulateur()
    },
    [progression, getLinkToEndPage]
  )

  const linkToSimulateurPageLabel = useMemo(() => {
    if (progression > 0) {
      return t('Reprendre le questionnaire')
    }
    
    return t('Débuter le questionnaire');
  }, [progression, t])

  return {
    getLinkToSimulateurPage,
    linkToSimulateurPageLabel,
  }
}

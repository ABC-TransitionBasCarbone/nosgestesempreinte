'use client'

import { ReactNode, useEffect } from 'react'

import { i18nConfig } from '@/constants/i18n'
import { useRules } from '@/hooks/useRules'
import { SimulationProvider, useUser } from '@/publicodes-state'
import { useCurrentLocale } from 'next-i18n-router/client'

export default function Providers({ children }: { children: ReactNode }) {
  const {
    user,
    simulations,
    currentSimulation,
    initSimulation,
    updateSituationOfCurrentSimulation,
  } = useUser()

  const lang = useCurrentLocale(i18nConfig)

  const { data: rules, isFetched } = useRules({
    lang: lang || 'fr',
    region: user.region?.code || 'FR',
  })

  useEffect(() => {
    if (!currentSimulation) {
      initSimulation()
    }
  }, [initSimulation, currentSimulation])

  return currentSimulation && isFetched ? (
    <SimulationProvider
      key={currentSimulation}
      rules={rules}
      categoryOrder={[
        'transport',
        'alimentation',
        'logement',
        'divers',
        'services sociétaux',
      ]}
      loader={<div>Loading</div>}
      situation={
        simulations.find(
          (simulation: any) => simulation.id === currentSimulation
        )?.situation || {}
      }
      updateSituation={updateSituationOfCurrentSimulation}>
      {children}
    </SimulationProvider>
  ) : (
    'Initialisation'
  )
}

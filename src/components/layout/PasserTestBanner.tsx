'use client'

import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useUser } from '@/publicodes-state'
import Trans from '../translation/Trans'

export default function PasserTestBanner() {
  const { getCurrentSimulation } = useUser()

  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  const progression = getCurrentSimulation()?.progression

  // Do not show the banner if the user has completed his/her test
  if (progression === 1) return null

  return (
    <Card className="mb-4 flex-row flex-wrap items-baseline justify-between gap-4 border-none bg-gray-100 p-4 sm:flex-nowrap sm:p-6">
      <p className="mb-0">
        <Trans>Calculez votre empreinte sur le climat</Trans>{' '}
        <span className="font-bold text-secondary-700">
          <Trans>en 10 minutes</Trans>
        </span>{' '}
        <Trans>top chrono.</Trans>
      </p>

      <ButtonLink href={getLinkToSimulateurPage()}>
        {linkToSimulateurPageLabel}
      </ButtonLink>
    </Card>
  )
}

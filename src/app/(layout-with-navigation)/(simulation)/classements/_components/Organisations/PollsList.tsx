'use client'

import Trans from '@/components/translation/Trans'
import { usePolls } from '@/hooks/organisations/usePolls'
import { useUser } from '@/publicodes-state'
import { Organisation } from '@/types/organisations'
import { useMemo } from 'react'
import OrganisationItem from './pollList/OrganisationItem'
import PollItem from './pollList/PollItem'

type Props = {
  organisation?: Organisation
}

export default function PollsList({ organisation }: Props) {
  const { simulations } = useUser()

  const pollSlugs = useMemo(
    () =>
      simulations
        .filter((simulation) => simulation.poll)
        .map((simulation) => simulation.poll),
    [simulations]
  )
  const { data: polls } = usePolls({ pollSlugs })

  return (
    <div className="mb-8 flex flex-col gap-3">
      {organisation && (
        <>
          <h3>
            <Trans>Mon organisation</Trans>
          </h3>
          <OrganisationItem organisation={organisation} />
        </>
      )}

      {polls?.map((poll) => <PollItem key={poll.slug} poll={poll} />)}
    </div>
  )
}

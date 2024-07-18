import { getLinkToGroupDashboard } from '@/helpers/navigation/groupPages'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useCurrentSimulation } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

type GoToEndPageProps = {
  isAllowedToSave?: boolean
  allowedToGoToGroupDashboard?: boolean
}
const goToEndPagePropsDefault = {
  isAllowedToSave: true,
  allowedToGoToGroupDashboard: false,
}

type GetLinkToEndPageProps = {
  allowedToGoToGroupDashboard?: boolean
}
const GetLinkToEndPagePropsDefault = {
  allowedToGoToGroupDashboard: false,
}

export function useEndPage() {
  const router = useRouter()

  const currentSimulation = useCurrentSimulation()

  const progression = currentSimulation?.progression

  const { saveSimulation } = useSaveSimulation()

  const [isNavigating, setIsNavigating] = useState(false)

  const goToEndPage = useCallback(
    async ({
      isAllowedToSave = true,
      allowedToGoToGroupDashboard = false,
    }: GoToEndPageProps = goToEndPagePropsDefault) => {
      // If we are already navigating, we don't do anything
      if (isNavigating) {
        return
      }
      setIsNavigating(true)

      // If the simulation is finished and is in a poll or a group, we save it (unless save is false)
      if (
        progression === 1 &&
        isAllowedToSave &&
        (currentSimulation.polls || currentSimulation.groups)
      ) {
        await saveSimulation({ simulation: currentSimulation })
      }

      // if the simulation is in a group and we are allowed to, we redirect to the group results page
      if (currentSimulation.groups && allowedToGoToGroupDashboard) {
        const lastGroupId =
          currentSimulation.groups[currentSimulation.groups.length - 1]

        router.push(getLinkToGroupDashboard({ groupId: lastGroupId }))
        return
      }

      // else we redirect to the results page
      router.push('/fin')
    },
    [currentSimulation, progression, router, saveSimulation, isNavigating]
  )

  const getLinkToEndPage = useCallback(
    ({
      allowedToGoToGroupDashboard = false,
    }: GetLinkToEndPageProps = GetLinkToEndPagePropsDefault): string => {
      // if the simulation is in a group and we are allowed to, we redirect to the group results page
      if (currentSimulation.groups && allowedToGoToGroupDashboard) {
        const lastGroupId =
          currentSimulation.groups[currentSimulation.groups.length - 1]

        return getLinkToGroupDashboard({ groupId: lastGroupId })
      }

      // else we return the results page
      return '/fin'
    },
    [currentSimulation]
  )

  return { goToEndPage, getLinkToEndPage, isNavigating }
}

import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDebug } from '../useDebug'

export function useEndGuard() {
  const router = useRouter()

  const { getCurrentSimulation, tutorials } = useUser()
  const currentSimulation = getCurrentSimulation()

  const isDebug = useDebug()

  const [isGuardInit, setIsGuardInit] = useState(false)
  const [isGuardRedirecting, setIsGuardRedirecting] = useState(false)
  useEffect(() => {
    // we only run the guard at mount
    if (isGuardInit) return
    setIsGuardInit(true)

    if (!currentSimulation) {
      router.push('/404') // TODO: should throw an error
      setIsGuardRedirecting(true)
      return
    }

    // if we are in debug mode we do nothing
    if (isDebug) {
      return
    }

    // if the simulation is finished we do nothing
    if (currentSimulation.progression === 1) {
      return
    }

    // if the user didn't see the tutoriel we redirect him to the tutorial page
    if (!tutorials.testIntro) {
      router.replace('/tutoriel')
      setIsGuardRedirecting(true)
      return
    }

    // we redirect the user to the test page
    router.push('/simulateur/bilan')
    setIsGuardRedirecting(true)
  }, [isGuardInit, currentSimulation, router, tutorials, isDebug])

  return { isGuardInit, isGuardRedirecting }
}

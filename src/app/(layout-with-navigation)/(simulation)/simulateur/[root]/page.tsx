'use client'

import { useSimulateurGuard } from '@/hooks/navigation/useSimulateurGuard'
import Simulateur from './_components/Simulateur'

export default function SimulateurPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useSimulateurGuard()

  if (!isGuardInit || isGuardRedirecting) return null

  return (
    <div className="my-8 mx-auto w-full max-w-4xl">
      <Simulateur />
    </div>
  )
}

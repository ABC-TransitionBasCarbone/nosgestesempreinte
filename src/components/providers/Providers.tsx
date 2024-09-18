'use client'

import Loader from '@/design-system/layout/Loader'
import { useRules } from '@/hooks/useRules'
import { SimulationProvider } from '@/publicodes-state'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
import Error500 from '../layout/500'

type Props = {
  isOptim?: boolean
}

const NO_MODEL_PATHNAME_EXCEPTIONS = ['/organisations']

export default function Providers({
  children,
  isOptim = true,
}: PropsWithChildren<Props>) {
  const pathname = usePathname()

  const { data: rules, isLoading } = useRules({ isOptim })

  // We don't want to display the loader when the user is on the tutorial page
  // or the landing page for organisations
  const shouldAlwaysDisplayChildren =
    NO_MODEL_PATHNAME_EXCEPTIONS.includes(pathname ?? "")
  if (shouldAlwaysDisplayChildren && isLoading) {
    return children
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader color="dark" />
      </div>
    )
  }

  if (!rules) {
    return <Error500 />
  }

  return (
    <SimulationProvider
      rules={rules}
      shouldAlwaysDisplayChildren={shouldAlwaysDisplayChildren}>
      {children}
    </SimulationProvider>
  )
}

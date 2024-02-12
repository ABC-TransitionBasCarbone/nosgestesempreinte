'use client'

import { IframeOptionsProvider } from '@/contexts/IframeOptionsContext'
import useTrackPageView from '@/hooks/useTrackPageView'
import useTrackSplitTesting from '@/hooks/useTrackSplitTesting'
import { UserProvider } from '@/publicodes-state'
import { MigrationType } from '@/publicodes-state/types'
import { PropsWithChildren } from 'react'
import CheckFixedRegion from './mainLayoutProviders/CheckFixedRegion'
import { IframeResizer } from './mainLayoutProviders/IframeResizer'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'
import QueryParamsProvider from './mainLayoutProviders/QueryParamsProvider'
import SimulationFromUrlLoader from './mainLayoutProviders/SimulationFromUrlLoader'

type Props = {
  region: { code: string; name: string }
  migrationInstructions: MigrationType
}
export default function MainLayoutProviders({
  children,
  region,
  migrationInstructions,
}: PropsWithChildren<Props>) {
  // Handles sending split testing data to Matomo
  useTrackSplitTesting()
  useTrackPageView()

  return (
    <QueryParamsProvider>
      <IframeOptionsProvider>
        <QueryClientProviderWrapper>
          <IframeResizer />
          <UserProvider
            initialRegion={region}
            storageKey="nosgestesclimat::v3"
            migrationInstructions={migrationInstructions}>
            <SimulationFromUrlLoader />
            <CheckFixedRegion />
            {children}
          </UserProvider>
        </QueryClientProviderWrapper>
      </IframeOptionsProvider>
    </QueryParamsProvider>
  )
}
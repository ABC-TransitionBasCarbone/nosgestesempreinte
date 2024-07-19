'use client'

import { IframeOptionsProvider } from '@/app/_components/mainLayoutProviders/IframeOptionsContext'
import { UserProvider } from '@/publicodes-state'
import { MigrationType } from '@/publicodes-state/types'
import { PropsWithChildren } from 'react'
import MainHooks from './mainLayoutProviders/MainHooks'
import { PreventNavigationProvider } from './mainLayoutProviders/PreventNavigationProvider'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'
import SimulationSyncProvider from './mainLayoutProviders/SimulationSyncProvider'

type Props = {
  migrationInstructions: MigrationType
}
export default function MainLayoutProviders({
  children,
  migrationInstructions,
}: PropsWithChildren<Props>) {
  return (
    <IframeOptionsProvider>
      <QueryClientProviderWrapper>
        <UserProvider
          storageKey="nosgestesempreinte::v1"
          migrationInstructions={migrationInstructions}>
          <PreventNavigationProvider>
            <SimulationSyncProvider>
              <MainHooks>{children}</MainHooks>
            </SimulationSyncProvider>
          </PreventNavigationProvider>
        </UserProvider>
      </QueryClientProviderWrapper>
    </IframeOptionsProvider>
  )
}

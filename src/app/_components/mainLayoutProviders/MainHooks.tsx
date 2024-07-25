/**
 * This component is used to track split testing data, page views, locale, and region.
 * It needs to be inside UserProvider (because of useTrackRegion).
 * That's why those hooks are in their own component.
 */
'use client'

import { useInitSimulationParam } from '@/hooks/useInitSimulationParam'
import { useUserInfosParams } from '@/hooks/useUserInfosParams'
import { PropsWithChildren } from 'react'

export default function MainHooks({ children }: PropsWithChildren) {
  useUserInfosParams()
  useInitSimulationParam()

  return children
}

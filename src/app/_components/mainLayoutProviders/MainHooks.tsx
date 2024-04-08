/**
 * This component is used to track split testing data, page views, locale, and region.
 * It needs to be inside UserProvider (because of useTrackRegion).
 * That's why those hooks are in their own component.
 */
'use client'

import { useTrackLocale } from '@/hooks/tracking/useTrackLocale'
import { useTrackPageView } from '@/hooks/tracking/useTrackPageView'
import { useTrackRegion } from '@/hooks/tracking/useTrackRegion'
import { useTrackSplitTesting } from '@/hooks/tracking/useTrackSplitTesting'
import { useDebug } from '@/hooks/useDebug'
import { useFixedRegion } from '@/hooks/useFixedRegion'
import { useIframeResizer } from '@/hooks/useIframeResizer'
import { usePRNumber } from '@/hooks/usePRNumber'
import { PropsWithChildren } from 'react'

export default function MainHooks({ children }: PropsWithChildren) {
  useTrackSplitTesting()
  useTrackPageView()
  useTrackLocale()
  useTrackRegion()

  useFixedRegion()
  useDebug()
  usePRNumber()

  useIframeResizer()

  return children
}

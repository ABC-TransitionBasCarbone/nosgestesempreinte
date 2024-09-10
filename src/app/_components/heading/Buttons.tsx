'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useIsClient } from '@/hooks/useIsClient'
import { useCurrentSimulation } from '@/publicodes-state'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Buttons() {
  const { progression } = useCurrentSimulation()

  const isClient = useIsClient()

  const {
    getLinkToSimulateurPage,
    linkToSimulateurPageLabel,
  } = useSimulateurPage()

  const [isHover, setIsHover] = useState(false)
  return (
    <div className="relative">
      <ButtonLink
        size="xl"
        className={`hover:bg-primary-900 transition-all duration-300 ${
          isClient ? 'opacity-100' : 'opacity-0'
        }`}
        href={getLinkToSimulateurPage()}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => {
          if (progression > 0) {
            return
          }
        }}>
        <span
          className={twMerge(
            isHover
              ? 'bg-rainbow animate-rainbow-fast !bg-clip-text !text-transparent duration-1000'
              : '',
            'leading-none'
          )}>
          <Trans>{linkToSimulateurPageLabel}</Trans>
        </span>
      </ButtonLink>
    </div>
  )
}

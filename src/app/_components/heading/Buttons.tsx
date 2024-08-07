'use client'

import Link from '@/components/Link'
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
    goToSimulateurPage,
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
          if (progression === 1) {
            return
          }

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

      {progression ? (
        <Link
          className={`absolute left-1/2 top-full -translate-x-1/2 translate-y-6 whitespace-nowrap transition-all delay-200 duration-300 md:text-lg ${
            isClient ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => {
            goToSimulateurPage({ noNavigation: true, newSimulation: {} })
          }}
          href={getLinkToSimulateurPage({ newSimulation: true })}>
          <Trans>Commencer un nouveau test</Trans>
        </Link>
      ) : null}
    </div>
  )
}

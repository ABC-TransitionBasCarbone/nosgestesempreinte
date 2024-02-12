'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Kicker from '@/design-system/layout/Kicker'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useState } from 'react'
import Background from './organisations/Background'
import Images from './organisations/Images'

export default function Organisations() {
  const { t } = useClientTranslation()

  const [isHover, setIsHover] = useState(false)

  return (
    <div className="relative mb-16 py-12 md:py-24">
      <Background direction={isHover ? 'left' : 'right'} />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col px-4 md:flex-row md:gap-4 md:px-8 lg:gap-10 xl:gap-20">
        <div className=" max-w-lg flex-1 basis-1/2">
          <Kicker>
            <Trans>Pour les organisations</Trans>
          </Kicker>
          <h2 className="font-medium md:text-3xl">
            <Trans>
              Nos Gestes Climat dans votre entreprise, association, école...
            </Trans>
          </h2>
          <p className="max-w-sm md:mb-8 md:text-lg">
            {t(
              'Vous souhaitez diffuser Nos Gestes Climat auprès de votre organisation, découvrez-nous outils pour vous simplifier la vie\u202f!'
            )}
          </p>
          <ButtonLink
            href="https://sondages.nosgestesclimat.fr/"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            <Trans>Découvrir</Trans>
          </ButtonLink>
        </div>
        <div
          className="relative hidden flex-1 md:block"
          data-cypress-id="organisations-link">
          <Images isHover={isHover} />
        </div>
      </div>
    </div>
  )
}
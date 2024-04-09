/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client'

import NewTabSvg from '@/components/icons/NewTabSvg'
import RegionGrid from '@/components/misc/RegionGrid'
import Trans from '@/components/translation/Trans'
import {
  profilClickRegion,
  profilOpenRegions,
} from '@/constants/tracking/pages/profil'
import Card from '@/design-system/layout/Card'
import Loader from '@/design-system/layout/Loader'
import { sortSupportedRegions } from '@/helpers/localisation/sortSupportedRegions'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useUser } from '@/publicodes-state'
import { SuppportedRegions } from '@/types/international'
import { trackEvent } from '@/utils/matomo/trackEvent'

type Props = {
  isOpen?: boolean
  supportedRegions: SuppportedRegions
}

export default function RegionSelector({
  isOpen = false,
  supportedRegions,
}: Props) {
  const locale = useLocale()

  const orderedSupportedRegions = sortSupportedRegions({
    supportedRegions,
    currentLocale: locale,
  })

  const numberOfRegions = Object.entries(orderedSupportedRegions).length

  const { updateRegion, user, tutorials, showTutorial } = useUser()

  const { region } = user

  const { isLoading } = useRules()

  return (
    <>
      <details open={isOpen}>
        <summary
          className={`middle w-auto cursor-pointer rounded-md bg-primary-100 p-4 ${
            isLoading ? 'pointer-events-none opacity-60' : ''
          }`}
          onClick={() => trackEvent(profilOpenRegions)}>
          <span>
            🗺️ <Trans>Choisir une autre région</Trans>{' '}
            <small title={`${numberOfRegions} régions`}>
              ({numberOfRegions} <Trans>disponibles</Trans>)
            </small>
          </span>
          {isLoading && (
            <Loader size="sm" color="dark" className="ml-4 text-right" />
          )}
        </summary>

        <RegionGrid
          supportedRegions={supportedRegions}
          updateCurrentRegion={(code: string) => {
            trackEvent(profilClickRegion(code))

            updateRegion({
              code,
              name: supportedRegions[code][locale]?.nom as unknown as string,
            })
            if (tutorials.localisationBanner) {
              showTutorial('localisationBanner')
            }
          }}
          selectedRegionCode={region?.code}
          className={isLoading ? 'pointer-events-none opacity-60' : ''}
          aria-disabled={isLoading || undefined}
        />
        <Card className="mt-4 flex-row items-center">
          <span
            role="img"
            aria-label="emoji world"
            aria-hidden
            className="mr-2">
            🌐
          </span>
          <p className="mb-0">
            <Trans>Envie de contribuer à une version pour votre région ?</Trans>{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="align-top"
              href="https://github.com/incubateur-ademe/nosgestesclimat/blob/master/INTERNATIONAL.md">
              <Trans>Suivez le guide !</Trans>
              <NewTabSvg className="!-mt-1" />
            </a>
          </p>
        </Card>
      </details>
    </>
  )
}

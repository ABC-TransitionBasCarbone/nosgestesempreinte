'use client'

import Ademe from '@/app/_components/heading/partners/Ademe'
import Marianne from '@/app/_components/heading/partners/Marianne'
import {
  footerClickAmbassadeurs,
  footerClickBlog,
  footerClickDocumentation,
  footerClickInternational,
  footerClickLogo,
  footerClickNouveautes,
  footerClickOrganisations,
  footerClickPlanSite,
  footerClickQuiSommesNous,
} from '@/constants/tracking/layout'
import InlineLink from '@/design-system/inputs/InlineLink'
import Separator from '@/design-system/layout/Separator'
import Emoji from '@/design-system/utils/Emoji'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { twMerge } from 'tailwind-merge'
import Link from '../Link'
import Logo from '../misc/Logo'
import LanguageSwitchButton from '../translation/LanguageSwitchButton'
import Trans from '../translation/Trans'

export default function Footer({ className = '' }) {
  return (
    <footer
      className={twMerge(
        'flex flex-col items-center gap-4 bg-grey-100 p-4 !pb-32 sm:p-8 md:mb-0 lg:pb-24',
        className
      )}>
      <div className="flex w-full items-start gap-12 md:max-w-5xl">
        <Logo
          className="hidden scale-75 lg:block"
          onClick={() => trackEvent(footerClickLogo)}
        />

        <div className="w-full">
          <div className="flex flex-col flex-wrap justify-start gap-6 pt-4 sm:flex-row md:items-center">
            <InlineLink
              href="/nouveautes"
              onClick={() => trackEvent(footerClickNouveautes)}
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Nouveautés</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/a-propos"
              onClick={() => trackEvent(footerClickQuiSommesNous)}
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Qui sommes-nous ?</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/blog"
              onClick={() => trackEvent(footerClickBlog)}
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Blog</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/documentation"
              onClick={() => trackEvent(footerClickDocumentation)}
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Documentation</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/ambassadeurs"
              onClick={() => trackEvent(footerClickAmbassadeurs)}
              className="text-default no-underline hover:underline">
              <strong>
                <Trans>Nos ambassadeurs</Trans>
              </strong>
            </InlineLink>

            <InlineLink
              href="/plan-du-site"
              onClick={() => trackEvent(footerClickPlanSite)}
              className="font-bold text-default no-underline hover:underline">
              <Trans>Plan du site</Trans>
            </InlineLink>
          </div>

          <div className="mt-6 flex w-full flex-wrap items-baseline gap-2 text-default sm:gap-4 md:mt-4">
            <p className="mb-1 text-sm">
              <Trans>Diffuser le test :</Trans>
            </p>
            <div className="flex flex-wrap gap-6">
              <InlineLink
                href="/organisations"
                onClick={() => trackEvent(footerClickOrganisations)}
                className="font-bold text-default no-underline hover:underline">
                <Emoji className="mr-2">🏢</Emoji>
                <Trans>Dans votre organisation</Trans>
              </InlineLink>

              <InlineLink
                href="/international"
                onClick={() => trackEvent(footerClickInternational)}
                className="font-bold text-default no-underline hover:underline">
                <Emoji className="mr-2">🌍</Emoji>
                <Trans>À l'international</Trans>
              </InlineLink>
            </div>
          </div>

          <Separator className="mb-0 mt-6 md:mt-4" />

          <div className="flex flex-wrap justify-between gap-8 md:flex-row md:flex-nowrap">
            <div>
              <div className="mt-6 flex flex-wrap items-start justify-between gap-10">
                <LanguageSwitchButton />
              </div>

              <div className="mt-4 text-xs">
                ▲&nbsp;<Trans>Propulsé par Vercel</Trans>
                <span className="hidden sm:inline"> | </span>
                <br className="md:hidden" />
                <InlineLink
                  href="/accessibilite"
                  className="text-default no-underline hover:underline">
                  <Trans>Accessibilité : partiellement conforme</Trans>
                </InlineLink>
              </div>
            </div>

            <div className="flex gap-4 self-end pb-1">
              <Marianne className="h-auto w-12 md:w-auto" />

              <Link href="https://ademe.fr" target="_blank">
                <Ademe className="h-auto w-10 md:w-auto" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

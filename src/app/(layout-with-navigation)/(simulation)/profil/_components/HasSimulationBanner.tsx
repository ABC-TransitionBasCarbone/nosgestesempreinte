'use client'

import Link from '@/components/Link'
import TransClient from '@/components/translation/TransClient'
import Button from '@/design-system/inputs/Button'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import ProgressCircle from '@/design-system/utils/ProgressCircle'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useForm, useUser } from '@/publicodes-state'
import TutorialLink from './TutorialLink'

export default function HasSimulationBanner() {
  const { t } = useClientTranslation()

  const { progression, remainingQuestions, relevantQuestions } = useForm()

  const { getCurrentSimulation } = useUser()

  const { actionChoices } = getCurrentSimulation()

  const percentFinished = Math.round(progression * 100)

  const answeredQuestionsLength =
    (relevantQuestions || []).length - (remainingQuestions || []).length

  const isSimulationInProgress =
    progression !== undefined && progression > 0 && progression < 1

  if (!progression) return null

  const actionChoicesLength = actionChoices?.length

  return (
    <div className="flex flex-wrap items-start">
      <div className="mt-4 w-[30rem]">
        <Card className="mr-8 flex-col">
          <p className="text-lg">
            {t('publicodes.Profil.recap', {
              percentFinished,
              answeredQuestionsLength,
              actionChoicesLength,
            })}{' '}
          </p>
        </Card>
        <details className="mt-3 max-w-full text-sm">
          <TransClient i18nKey={'publicodes.Profil.locationDonnées'}>
            <summary className="mb-2 cursor-pointer">
              Où sont mes données ?{' '}
            </summary>
            <span className="!text-xs">
              Vos données sont stockées dans votre navigateur, vous avez donc le
              contrôle total sur elles.
            </span>
          </TransClient>

          <Link href="/vie-privee">
            <TransClient>En savoir plus</TransClient>
          </Link>
        </details>
      </div>

      <div className="my-4 flex flex-col">
        {isSimulationInProgress && (
          <ButtonLink color="primary" href="/simulateur/bilan">
            <TransClient>
              <ProgressCircle white className="mr-2" /> Finir mon test
            </TransClient>
          </ButtonLink>
        )}

        <Button
          color="secondary"
          className="my-2 !text-base"
          onClick={() => {
            console.log('TODO: implement this')
          }}>
          <span
            role="img"
            aria-label="recycle emoji"
            className="mr-2 inline-block text-xl">
            ♻️
          </span>{' '}
          <TransClient>Recommencer</TransClient>
        </Button>

        <TutorialLink className="!text-base font-normal" />
      </div>
    </div>
  )
}
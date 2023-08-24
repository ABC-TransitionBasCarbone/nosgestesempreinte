'use client'

import TransClient from '@/components/translation/TransClient'
import Button from '@/design-system/inputs/Button'
import TextAreaInputGroup from '@/design-system/inputs/TextAreaInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useClientTranslation } from '@/locales/client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'

type CreateIssueProps = {
  title: string
  body: string
  setURL: Dispatch<SetStateAction<string>>
  disableButton: (disabled: boolean) => void
  labels?: string[]
}

export const createIssue = ({
  title,
  body,
  setURL,
  disableButton,
  labels = ['💁 contribution externe'],
}: CreateIssueProps) => {
  if (title == null || body == null || [title, body].includes('')) {
    return null
  }

  fetch(
    '/.netlify/functions/create-issue?' +
      Object.entries({
        repo: 'datagir/nosgestesclimat',
        title,
        body,
        labels,
      })
        .map(
          ([key, value]: [string, string | string[]]) =>
            key + '=' + encodeURIComponent(value as string)
        )
        .join('&'),
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((json) => {
      setURL(json?.url as string)
      disableButton(false)
    })
}

export default function GithubContributionForm() {
  const searchParams = useSearchParams()
  const fromLocation = searchParams.get('fromLocation')

  const [sujet, setSujet] = useState('')
  const [comment, setComment] = useState('')
  const [issueURL, setIssueURL] = useState(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const { t } = useClientTranslation()

  return !issueURL ? (
    <form className='mt-8'>
      <TextInputGroup
        label={<TransClient>Le titre bref de votre problème</TransClient>}
        name='sujet'
        required
        value={sujet}
        onChange={(e) => setSujet(e.target.value)}
      />

      <TextAreaInputGroup
        label={
          <TransClient i18nKey={'publicodes.Contribution.descriptionComplète'}>
            <p>La description complète de votre problème</p>
            <p>
              <small>
                En indiquant le navigateur que vous utilisez (par exemple
                Firefox version 93, Chrome version 95, Safari, etc.), et la
                plateforme (iPhone, Android, ordinateur Windows, etc.), vous
                nous aiderez à résoudre le bug plus rapidement.
              </small>
            </p>
          </TransClient>
        }
        aria-describedby='messageAttention'
        value={comment}
        onChange={(e) => setComment(e.target?.value)}
        name='comment'
        required
      />
      <p id='messageAttention'>
        <em>
          <TransClient>
            Cette contribution sera publique : n'y mettez pas d'informations
            sensibles
          </TransClient>
        </em>
      </p>

      <Button
        aria-disabled={isButtonDisabled}
        type='submit'
        onClick={(e) => {
          if (isButtonDisabled) return null

          e.preventDefault()

          setIsButtonDisabled(true)

          const augmentedComment =
            comment +
            (fromLocation
              ? '\n> ' + t('Depuis la page') + ': `' + fromLocation + '`'
              : '') +
            t('publicodes.Contribution.commentaireAugmenté')
          createIssue({
            title: sujet,
            body: augmentedComment,
            setURL: setIssueURL as unknown as Dispatch<SetStateAction<string>>,
            disableButton: setIsButtonDisabled,
            labels: ['❓ FAQ', '💁 contribution externe'],
          })
        }}
      >
        <TransClient>Envoyer</TransClient>
      </Button>
    </form>
  ) : (
    <p role='status'>
      <TransClient i18nKey={'publicodes.Contribution.remerciements'}>
        Merci 😍! Suivez l'avancement de votre suggestion en cliquant sur{' '}
        <Link href={issueURL ?? ''}>ce lien</Link>.
      </TransClient>
    </p>
  )
}

'use client'

import Button from '@/design-system/inputs/Button'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useClientTranslation } from '@/hooks/useClientTranslation'


type Props = {
  linkToPrev: string
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
  submitDisabled?: boolean
  currentPage: string
}

export default function Navigation({
  linkToPrev,
  handleSubmit,
  submitDisabled,
}: Props) {
  const { t } = useClientTranslation()
  return (
    <div className="my-8 flex justify-between border-b border-gray-200 pb-8">
      <ButtonLink
        href={linkToPrev}
        color="secondary"
        title={t('précédent')}>
        ←
      </ButtonLink>

      <Button
        onClick={(event) => {
          handleSubmit(event)
        }}
        disabled={submitDisabled}>
        {t('Suivant') + ' →'}
      </Button>
    </div>
  )
}

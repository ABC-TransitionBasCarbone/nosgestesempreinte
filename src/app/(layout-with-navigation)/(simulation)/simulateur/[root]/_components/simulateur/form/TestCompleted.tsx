import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { formatResultToDetailParam } from '@/helpers/url/formatResultToDetailParam'
import { useEngine, useForm } from '@/publicodes-state'
import Star from './testCompleted/Star'

export default function TestCompleted() {
  const { categories } = useForm()
  const { getValue } = useEngine()

  const detailsParamString = formatResultToDetailParam({ categories, getValue })

  return (
    <div className="mb-4 flex flex-col items-center rounded-lg bg-primaryLight p-4">
      <Star />
      <p className="mb-4 text-lg">
        <Trans>Vous avez terminé le test</Trans>&nbsp;👏
      </p>
      <ButtonLink
        //TODO: there should be a helper for that
        href={`/fin?diapo=bilan${
          detailsParamString ? `&${detailsParamString}` : ''
        }`}>
        <Trans>Voir mon résultat</Trans>
      </ButtonLink>
      <p className="mb-0 mt-4 text-lg">
        <Trans>ou</Trans>
      </p>
      <Link className="mb-4 text-lg" href="/profil">
        <Trans>Modifier mes réponses</Trans>
      </Link>
    </div>
  )
}

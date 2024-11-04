import Trans from '@/components/translation/Trans'
import { useRule } from '@/publicodes-state'

export default function DishesNumberInfo() {
  const { numericValue: totalNumberOfPlats } = useRule(
    'ui . nombre de repas par semaine'
  )

  return (
    <>
      <div aria-live="polite" className="mb-2 text-center text-sm">
        {totalNumberOfPlats < 14 ? (
          <span className="text-red-700">
            <Trans>Êtes-vous sûr de faire moins de 14 repas ?</Trans>
          </span>
        ) : null}
        {totalNumberOfPlats > 14 ? (
          <span className="text-red-700">
            <Trans>Êtes-vous sûr de faire plus de 14 repas ?</Trans>
          </span>
        ) : null}
      </div>
    </>
  )
}

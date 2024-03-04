import { useLocale } from '@/hooks/useLocale'
import { Trans } from 'react-i18next'

type Props = {
  total: number
  averagePassengers: number
  totalForOnePassenger: number
}

export default function Summary({
  total,
  averagePassengers,
  totalForOnePassenger,
}: Props) {
  const locale = useLocale()

  return (
    <div className="mt-4 px-2 text-right text-xs">
      <Trans>Au total</Trans> {total.toLocaleString(locale)}{' '}
      <Trans>km sont parcourus par an, avec en moyenne</Trans>{' '}
      {averagePassengers.toLocaleString(locale)}{' '}
      <Trans>voyageurs. La distance individuelle parcourue est donc de</Trans>{' '}
      {(totalForOnePassenger ?? 0).toLocaleString(locale)} <Trans>km</Trans>.{' '}
      <br className="hidden md:inline" />
      <Trans>
        C’est bien cette distance qui sera comptabilisée en fin de test.
      </Trans>
    </div>
  )
}

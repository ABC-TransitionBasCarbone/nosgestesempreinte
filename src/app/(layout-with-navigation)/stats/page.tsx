import { t } from '@/helpers/metadata/fakeMetadataT'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ClientProvider from './_components/ClientProvider'
import StatsContent from './_components/StatsContent'

export async function generateMetadata() {
  return getMetadataObject({
    title: t("Nos Statistiques d'utilisation - Nos Gestes Climat"),
    description: t(
      "Observez l'évolution de l'impact de Nos Gestes Climat en mesures chiffrées."
    ),
    alternates: {
      canonical: '/stats',
    },
  })
}

export default function Dashboard() {
  return (
    <ClientProvider>
      <StatsContent />
    </ClientProvider>
  )
}

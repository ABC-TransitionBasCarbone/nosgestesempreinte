import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Mon groupe, nos bilans carbone personnels - Nos Gestes Climat',
    description:
      "Calculez votre empreinte carbone en groupe et comparez la avec l'empreinte de vos proches grâce au simulateur de bilan carbone personnel Nos Gestes Climat.",
    alternates: {
      canonical: '/amis/resultats',
    },
  })
}

export default function Layout({
  params,
  children,
}: PropsWithChildren<{ params: { root: string } }>) {
  return <FormProvider root={params.root}>{children}</FormProvider>
}

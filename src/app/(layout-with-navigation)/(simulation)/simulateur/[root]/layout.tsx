import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'

type Props = { params: { root: string } }

export async function generateMetadata({ params }: Props) {

  return getMetadataObject({
    title: 'Enquête 2024',
    alternates: {
      canonical: `/simulateur/${params.root}`,
    },
  })
}

export default function Layout({ params, children }: PropsWithChildren<Props>) {
  return <FormProvider root={params.root}>{children}</FormProvider>
}

import { noIndexObject } from '@/constants/metadata'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { FormProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'

export async function generateMetadata() {
  return getMetadataObject({
    title: "Enquête 2024",
    robots: noIndexObject,
    alternates: {
      canonical: '/fin',
    },
  })
}

export default function Layout({ children }: PropsWithChildren) {
  return <FormProvider>{children}</FormProvider>
}

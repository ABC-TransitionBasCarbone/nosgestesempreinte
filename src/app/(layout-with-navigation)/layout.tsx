import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'

import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Enquête 2024',
    alternates: { canonical: '/' },
  })
}

export default async function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="m-auto flex max-w-7xl justify-start">
        <Main className="w-full max-w-5xl overflow-visible px-4 lg:mx-auto">
          {children}
        </Main>
      </div>
    </>
  )
}

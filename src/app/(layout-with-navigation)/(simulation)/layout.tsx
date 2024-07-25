import Providers from '@/components/providers/Providers'
import { PropsWithChildren } from 'react'

export default async function SimulateurLayout({
  children,
}: PropsWithChildren) {
  return <Providers>{children}</Providers>
}

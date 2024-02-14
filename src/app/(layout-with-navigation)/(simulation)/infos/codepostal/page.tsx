'use client'

import Trans from '@/components/translation/Trans'
import PostalCodeInput from '@/design-system/inputs/PostalCodeInput'
import Title from '@/design-system/layout/Title'
import { useAppNavigation } from '@/hooks/navigation/useAppNavigation'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useContext } from 'react'
import { InfosContext } from '../_components/InfosProvider'
import Navigation from '../_components/Navigation'

export default function PostalCode() {
  const router = useRouter()

  const { getLinkToInfosPage } = useAppNavigation()

  const { postalCode, setPostalCode } = useContext(InfosContext)

  const handleSubmit = useCallback(
    async (event: MouseEvent | FormEvent) => {
      // Avoid reloading page
      event?.preventDefault()

      // Go to next page
      router.push(getLinkToInfosPage(3))
    },
    [router, getLinkToInfosPage]
  )

  return (
    <form>
      <Title
        data-cypress-id="postal-code-title"
        className="text-lg md:text-2xl"
        title={<Trans>Votre code postal</Trans>}
        subtitle={<Trans>Facultatif</Trans>}
      />
      <PostalCodeInput postalCode={postalCode} setPostalCode={setPostalCode} />
      <Navigation
        linkToPrev={getLinkToInfosPage(1)}
        handleSubmit={handleSubmit}
      />
    </form>
  )
}

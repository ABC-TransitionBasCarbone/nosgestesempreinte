import MaxWidthContent from '@/components/layout/MaxWidthContent'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import CopyInput from '@/design-system/inputs/CopyInput'
import { Organization } from '@/types/organizations'
import CTACard from './CTACard'

export default function ShareSection({
  organization,
}: {
  organization: Organization
}) {
  return (
    <section className="bg-grey-100 py-4">
      <MaxWidthContent>
        <div className="flex flex-wrap items-start gap-8 md:flex-nowrap">
          <CTACard
            overLabel={<Trans>Via un lien de partage</Trans>}
            title={<Trans>Partager le test</Trans>}
            description={
              <Trans>
                Partagez simplement cette page à vos employés, utilisateurs,
                élèves, et suivez leurs résultats
              </Trans>
            }>
            <CopyInput
              textToCopy={`${window.location.origin}/o/${organization?.slug}`}
            />

            <div className="mt-8">
              <button className="text-primary-400 underline">
                <Trans>Téléchargez un QRcode</Trans>
              </button>
            </div>
          </CTACard>

          <CTACard
            overLabel={<Trans>Services web et mobiles</Trans>}
            title={<Trans>Intégration en iframe</Trans>}
            description={
              <Trans>
                Intégrez le test sur un article de blog, ou une page dédiée de
                votre site ou application mobile{' '}
              </Trans>
            }>
            <ButtonLink href="/diffuser">
              <Trans>Découvrez le guide</Trans>
            </ButtonLink>
          </CTACard>
        </div>
      </MaxWidthContent>
    </section>
  )
}

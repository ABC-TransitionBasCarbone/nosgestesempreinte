import Footer from '@/components/layout/Footer'
import Main from '@/design-system/layout/Main'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Actions from './_components/Actions'
import Amis from './_components/Amis'
import Contributions from './_components/Contributions'
import Explanations from './_components/Explanations'
import Heading from './_components/Heading'
import Organisations from './_components/Organisations'
import Buttons from "@/app/_components/heading/Buttons";
import Trans from "@/components/translation/Trans";

export async function generateMetadata() {
  const { t } = await getServerTranslation()
  return getMetadataObject({
    title: t(
      "Votre calculateur d'empreinte carbone personnelle - Nos Gestes Climat"
    ),
    description: t(
      'Connaissez-vous votre empreinte sur le climat ? Faites le test et découvrez comment réduire votre empreinte carbone sur le climat.'
    ),
    alternates: {
      canonical: '/',
    },
  })
}

export default async function Homepage() {
  return (
    <>
      <Main>
        <div className="relative flex items-center justify-center overflow-hidden p-4 ">
          <div className="relative mb-2 text-center md:mb-0">
            <h1 className="md:text-5xl">
              {'Bonjour, vous allez répondre à des questions sur votre empreinte carbone'}
            </h1>
            <Buttons/>
          </div>
        </div>
      </Main>
    </>
)
}

import Main from '@/design-system/layout/Main'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Buttons from "@/app/_components/heading/Buttons";

export async function generateMetadata() {
  return getMetadataObject({
    title:
      "Votre calculateur d'empreinte carbone personnelle - Nos Gestes Climat"
    ,
    description:
      'Connaissez-vous votre empreinte sur le climat ? Faites le test et découvrez comment réduire votre empreinte carbone sur le climat.'
    ,
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

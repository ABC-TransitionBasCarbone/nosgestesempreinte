import Trans from '@/components/translation/Trans'
import { orderedCategories } from '@/constants/orderedCategories'
import Title from '@/design-system/layout/Title'
import FormProvider from '@/publicodes-state/formProvider'
import { Metadata } from 'next'
import ProfilPageContent from './_components/ProfilPageContent'

export const metadata: Metadata = {
  title: 'Mon profil',
  description:
    'Explorez et modifiez les informations que vous avez saisies dans le parcours nosgestesclimat.',
}

export default function Profil() {
  return (
    <FormProvider root={'bilan'} categoryOrder={orderedCategories}>
      <Title title={<Trans>Mon profil</Trans>} />
      <ProfilPageContent />
    </FormProvider>
  )
}

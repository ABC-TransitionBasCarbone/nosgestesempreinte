import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Questions from './_components/Questions'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Enquête 2024',
    alternates: {
      canonical: '/questions',
    },
  })
}

export default function QuestionsPage() {
  return (
    <>
      <Title>
        <Trans>Questions</Trans>
      </Title>
      <Questions />
    </>
  )
}

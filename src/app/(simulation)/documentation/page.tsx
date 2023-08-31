import PageLayout from '@/components/layout/PageLayout'
import { Metadata } from 'next'
import DocumentationLanding from './_components/DocumentationLanding'

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Notre documentation détaille les calculs qui nous ont permis de calculer votre bilan carbone personnel.',
}

export default function Documentation() {
  return (
    <PageLayout shouldShowMenu>
      <DocumentationLanding />
    </PageLayout>
  )
}
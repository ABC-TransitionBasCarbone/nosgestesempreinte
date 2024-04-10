import MDXContent from '@/components/mdx/MDXContent'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import AboutEn from '@/locales/pages/en/empreinte-climat.mdx'
import AboutFr from '@/locales/pages/fr/empreinte-climat.mdx'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Empreinte Climat - Nos Gestes Climat',
    description: `L'empreinte climat, qu'est-ce que c'est ?`,
    alternates: {
      canonical: '/empreinte-climat',
    },
  })
}

export default function AProposPage() {
  return <MDXContent contentEn={AboutEn} contentFr={AboutFr} />
}
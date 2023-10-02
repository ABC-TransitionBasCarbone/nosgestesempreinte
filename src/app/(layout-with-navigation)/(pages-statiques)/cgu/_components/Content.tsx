'use client'

import MDXContent from '@/components/mdx/MDXContent'
import ContentEn from '@/locales/pages/en/CGU.mdx'
import ContentFr from '@/locales/pages/fr/CGU.mdx'

export default function Content() {
  return <MDXContent contentFr={ContentFr} contentEn={ContentEn} />
}

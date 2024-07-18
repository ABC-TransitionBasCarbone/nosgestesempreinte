'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { linkToClassement } from '@/helpers/navigation/classementPages'


export default function GoBackLink({ className }: { className?: string }) {
  return (
    <Link
      href={linkToClassement}
      className={`${className} inline-block px-0 !text-[1rem] text-primary-700 no-underline transition-opacity hover:opacity-80`}>
      ← <Trans>Retour</Trans>
    </Link>
  )
}

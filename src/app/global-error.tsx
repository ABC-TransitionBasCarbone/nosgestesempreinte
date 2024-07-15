'use client'

import Error500 from '@/components/layout/500'
import NextError from 'next/error'

export default function GlobalError() {

  return (
    <html lang="fr">
      <body>
        <Error500 />
        <NextError statusCode={undefined as any} />
      </body>
    </html>
  )
}

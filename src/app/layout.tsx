import { getMigrationInstructions } from '@/helpers/modelFetching/getMigrationInstructions'
// Initialise react-i18next
import '@/locales/initClient'
import '@/locales/initServer'
import { dir } from 'i18next'
import { currentLocale } from 'next-i18n-router'
import localFont from 'next/font/local'
import Script from 'next/script'
import { PropsWithChildren } from 'react'
import MainLayoutProviders from './_components/MainLayoutProviders'
import './globals.css'

export const marianne = localFont({
  src: [
    {
      path: '_fonts/Marianne-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '_fonts/Marianne-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '_fonts/Marianne-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '_fonts/Marianne-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '_fonts/Marianne-Bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: '_fonts/Marianne-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-marianne',
})

export default async function RootLayout({ children }: PropsWithChildren) {
  const lang = currentLocale()
  const migrationInstructions = getMigrationInstructions()

  return (
    <html lang={lang ?? ''} dir={dir(lang ?? '')}>
      <head>
        <link rel="manifest" href="../manifest.webmanifest" />

        <meta name="theme-color" content="#4949ba" />
      </head>

      <body className={`${marianne.className} bg-white text-default`}>
        <Script id="script-user-agent">{`
          const b = document.documentElement;
          b.setAttribute('data-useragent', navigator.userAgent);
        `}</Script>

        <MainLayoutProviders
          migrationInstructions={migrationInstructions}>
          {children}
        </MainLayoutProviders>
      </body>
    </html>
  )
}

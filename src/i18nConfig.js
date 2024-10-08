export const i18nConfig = {
  locales: ['fr', 'en', 'es'],
  defaultLocale: 'fr',
  localeDetector: (request) => {
    const acceptedLanguages = request.headers
      ?.get('accept-language')
      ?.split(',')
    if (!acceptedLanguages) {
      return 'fr'
    }
    const preferedLanguage = acceptedLanguages.find((acceptedLanguage) =>
      ['fr', 'en', 'es'].includes(acceptedLanguage.split('-'))
    )
    return preferedLanguage || 'fr'
  },
}

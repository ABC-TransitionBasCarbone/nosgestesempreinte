'use client'

import TransClient from '@/components/translation/TransClient'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/locales/client'
import { getCurrentLangInfos } from '@/locales/translation'
import { capitaliseString } from '@/utils/capitaliseString'
import { sortReleases } from '@/utils/sortReleases'
import Link from 'next/link'

export const localStorageKey = 'last-viewed-release'

// TODO: support translations
export const determinant = (word: string) =>
	/^[aeiouy]/i.exec(word) ? 'd’' : 'de '

export default function NewsBanner() {
	const { t, i18n } = useClientTranslation()
	const currentLangInfos = getCurrentLangInfos(i18n)

	const releases = sortReleases(currentLangInfos.releases),
		lastRelease = releases && releases[0]
	/*
	const [lastViewedRelease, setLastViewedRelease] = usePersistingState(
		localStorageKey,
		null
	)
	*/

	if (!lastRelease) return null // Probably a problem fetching releases in the compilation step. It shouldn't happen, the build should fail, but just in case, this potential failure should not put the whole web site down for a side feature

	// We only want to show the banner to returning visitors, so we initiate the
	// local storage value with the last release.
	/*
	if (lastViewedRelease === undefined) {
		setLastViewedRelease(lastRelease.name)
		return null
	}
	*/
	console.log('TODO : replace persisting state here')
	const showBanner = lastRelease.name // && lastViewedRelease !== lastRelease.name

	const date = new Date(lastRelease.published_at).toLocaleDateString(
		currentLangInfos.abrvLocale,
		{
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}
	)

	return showBanner ? (
		<Card className="relative min-w-[20rem] p-8 text-left">
			<div>
				<h2 className="m-0 flex items-center">
					<span className="mr-2 inline-block h-3 w-3 rounded-2xl bg-primary"></span>{' '}
					<TransClient>Nouveautés</TransClient>
				</h2>
				<div>
					<small className="max-w-[12rem]">
						<TransClient i18nKey={'components.NewsBanner.miseAJourDate'}>
							Dernière mise à jour {{ date } as unknown as React.ReactNode}
						</TransClient>
					</small>
				</div>
				<div className="mt-2">
					<Link href={'/nouveautes'}>{capitaliseString(lastRelease.name)}</Link>
				</div>
			</div>
			<button
				// onClick={() => setLastViewedRelease(lastRelease.name)}
				className="absolute right-2 top-2 h-8 w-8 border-none bg-transparent p-0 text-lg text-primaryDark"
				title={t('Fermer la notification de nouveautés')}
			>
				&times;
			</button>
		</Card>
	) : null
}
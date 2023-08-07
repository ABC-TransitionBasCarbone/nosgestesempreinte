'use client'

import { getCurrentLangInfos } from '@/locales/translation'
import { capitaliseString } from '@/utils/capitaliseString'
import { sortReleases } from '@/utils/sortReleases'
import Link from 'next/link'
import { Trans, useTranslation } from 'react-i18next'

export const localStorageKey = 'last-viewed-release'

// TODO: support translations
export const determinant = (word: string) =>
	/^[aeiouy]/i.exec(word) ? 'd’' : 'de '

export default function NewsBanner() {
	const { t, i18n } = useTranslation()
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
		<div className="ui__ card box min-w-[20rem] relative text-left">
			<div>
				<h2 className="flex items-center m-0">
					<span className="bg-primary w-3 h-3 inline-block rounded-2xl mr-2"></span>{' '}
					<Trans>Nouveautés</Trans>
				</h2>
				<div>
					<small className="max-w-[12rem]">
						<Trans i18nKey={'components.NewsBanner.miseAJourDate'}>
							Dernière mise à jour {{ date }}
						</Trans>
					</small>
				</div>
				<div>
					<Link href={'/nouveautés'}>{capitaliseString(lastRelease.name)}</Link>
				</div>
			</div>
			<button
				// onClick={() => setLastViewedRelease(lastRelease.name)}
				className="border-none absolute right-2 top-2 p-0 text-primaryDark"
				title={t('Fermer la notification de nouveautés')}
			>
				&times;
			</button>
		</div>
	) : null
}

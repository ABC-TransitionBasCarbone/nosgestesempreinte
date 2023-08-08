import Landing from './[landing]/page'
/*
export const metadata: Metadata = {
	title: t('Connaissez-vous votre empreinte climat ?'),
	description: t('meta.publicodes.Landing.description'),
	openGraph: {
		images: 'https://nosgestesclimat.fr/images/dessin-nosgestesclimat.png',
	},
}
*/

export default function Page({
	params: { lang },
}: {
	params: { lang: string }
}) {
	return <Landing lang={lang} />
}

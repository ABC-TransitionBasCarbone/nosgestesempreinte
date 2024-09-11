import { getMetadataObject } from '@/helpers/metadata/getMetadataObject';
import Homepage from './homePage';

export async function generateMetadata() {
    return getMetadataObject({
        title: 'Enquête 2024',
        alternates: { canonical: '/' },
    })
}

export default function HomePageContainer () {
    return <Homepage />;
}

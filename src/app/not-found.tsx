import Route404 from '@/components/layout/404'

export async function generateMetadata() {
  return {
    title: "Enquête 2024",
    alternates: {
      canonical: '/404',
    },
  }
}

export default function NotFound() {
  return <Route404 />
}

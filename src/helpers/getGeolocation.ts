import { RegionFromGeolocation } from '@/publicodes-state/types'
import { SERVER_URL } from '@/constants/urls'

export async function getGeolocation(): Promise<RegionFromGeolocation> {
  console.log(process.env)
  return await fetch(
      `${SERVER_URL}/api/geolocation`
  )
      .then((res) => res.json())
      .then(
          (res: {
            country: {
              code: string
              name: string
            }
          }) => res.country
      )
}

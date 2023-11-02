import { useTempEngine } from '@/publicodes-state'
import RavijenChart from './RavijenChart'

export default function ServicesChart({
  squashPercentage,
}: {
  squashPercentage?: number
}) {
  const { getRuleObject } = useTempEngine()

  const rootObject = getRuleObject('services sociétaux')

  const serviceCategories = rootObject.rawNode.formule.somme

  const serviceSubcategories = serviceCategories.reduce(
    (acc: { [key: string]: string[] }, category: string) => {
      const categoryObject = getRuleObject(category)

      acc[category] = categoryObject.rawNode.formule.somme

      return acc
    },
    {}
  )

  return (
    <RavijenChart
      categories={serviceCategories}
      subcategories={serviceSubcategories}
      squashPercentage={squashPercentage}
    />
  )
}

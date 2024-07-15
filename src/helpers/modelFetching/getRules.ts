import { NGCRules } from '@/publicodes-state/types'
import { getFileFromModel } from './getFileFromModel'
import { getSupportedRegions } from './getSupportedRegions'

type Props = {
  isOptim?: boolean
  regionCode?: string
  locale?: string
  PRNumber?: string
}
/*
 * This function is used to get the rules. It is used in the useRules hook and can also be called directly from a server component.
 */
export async function getRules(
  { locale = 'fr', regionCode = 'FR', PRNumber }: Props = {
    locale: 'fr',
    regionCode: 'FR',
    isOptim: true,
  }
): Promise<NGCRules> {
  const supportedRegions = await getSupportedRegions()

  // We provide the FR version of the model if the region is not supported
  const regionCodeToProvide = supportedRegions[regionCode] ? regionCode : 'FR'

  let fileName = ''

  fileName = `co2-model.${regionCodeToProvide}-lang.${locale}.json`

  return getFileFromModel({ fileName, PRNumber })
}

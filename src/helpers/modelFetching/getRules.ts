import { NGCRules } from '@/publicodes-state/types'
import { getFileFromModel } from './getFileFromModel'

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

  let fileName = ''

  fileName = `co2-model.${regionCode}-lang.${locale}.json`

  return getFileFromModel({ fileName, PRNumber })
}

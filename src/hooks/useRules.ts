import { getRules } from '@/helpers/modelFetching/getRules'
import { NGCRules } from '@/publicodes-state/types'
import {
  UseQueryResult,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import { useLocale } from './useLocale'
import { usePRNumber } from './usePRNumber'

type Props = {
  isOptim?: boolean
  region?: string
}

export function useRules(
  { isOptim = true }: Props = { isOptim: true, region: 'FR' }
): UseQueryResult<NGCRules, Error> {
  const locale = useLocale()

  const { PRNumber } = usePRNumber()


  return useQuery({
    queryKey: ['rules', locale, isOptim, PRNumber],
    queryFn: () => getRules({ locale, isOptim, PRNumber }),
    placeholderData: keepPreviousData,
    staleTime: 5000000000, // We don't want to import the rule multiple times
  })
}

import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'

type Props = {
  subcategory: string
  total: number
  position: 'first' | 'middle' | 'last'
}

const positionClassNames = {
  first: 'border-r',
  last: 'border-l',
  middle: 'border-x',
}
export default function Subcategory({ subcategory, total, position }: Props) {
  const { numericValue, icons } = useRule(subcategory)

  const percent = (numericValue / total) * 100

  if (percent < 5) return

  return (
    <div
      className={`flex h-full items-center justify-center border-l border-white transition-all ${positionClassNames[position]} ease-in-out`}
      style={{ width: `${percent}%` }}>
      <Emoji>{icons}</Emoji>
    </div>
  )
}

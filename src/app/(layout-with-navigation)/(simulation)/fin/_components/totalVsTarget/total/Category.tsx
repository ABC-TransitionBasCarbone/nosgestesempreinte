import { useRule } from '@/publicodes-state'
import Image from 'next/image'

type Props = {
  category: string
  total: number
  position: 'first' | 'middle' | 'last'
}

const positionClassNames = {
  first: 'border-b-2',
  last: 'border-t-2',
  middle: 'border-y-2',
}
export default function Category({ category, total, position }: Props) {
  const { title, color } = useRule(category)
  const { numericValue } = useRule(
    category === 'transport' ? 'transport . empreinte' : category
  )
  const percent = (numericValue / total) * 100

  return (
    <div
      className={`relative flex w-full items-center justify-center  border-black transition-all ${positionClassNames[position]}`}
      style={{ height: `${percent}%`, backgroundColor: color }}>
      <Image
        style={{ filter: 'grayscale(1) invert(1) brightness(1.8)' }}
        src={`/images/model/${category}.svg`}
        alt={title || category}
        width={32}
        height={32}
      />
    </div>
  )
}

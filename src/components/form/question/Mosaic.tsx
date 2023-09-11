import { useRule } from '@/publicodes-state'
import MosaicQuestion from './mosaic/MosaicQuestion'

type Props = {
  question: string
}

export default function Mosaic({ question }: Props) {
  const { questionsOfMosaic } = useRule(question)

  return (
    <div className="grid grid-cols-2 gap-4">
      {questionsOfMosaic
        ? questionsOfMosaic.map((questionOfMosaic) => (
            <MosaicQuestion
              key={questionOfMosaic}
              question={questionOfMosaic}
            />
          ))
        : 'Cette mosaique n a pas d enfants.'}
    </div>
  )
}
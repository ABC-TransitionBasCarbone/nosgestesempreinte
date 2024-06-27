import { useRule } from '@/publicodes-state'
import MosaicQuestion from './mosaic/MosaicQuestion'

type Props = {
  question: string
}

export default function Mosaic({ question, ...props }: Props) {
  const { questionsOfMosaic } = useRule(question)
  console.log("mosaic");
  console.log("question", question);
  console.log("questionsOfMosaic", questionsOfMosaic);

  return (
    <fieldset className="grid gap-4 md:grid-cols-2">
      {questionsOfMosaic
        ? questionsOfMosaic.map((questionOfMosaic, index) => (
            <MosaicQuestion
              key={questionOfMosaic}
              parentMosaic={question}
              question={questionOfMosaic}
              index={index}
              {...props}
            />
          ))
        : 'Cette mosaique n a pas d enfants.'}
    </fieldset>
  )
}

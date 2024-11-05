import Question from '@/components/form/Question'
import JourneysInput from './voiture/JourneysInput'

type Props = {
  question: string
}
export default function Voiture({ question, ...props }: Props) {
  return (
    <>
      <Question question={question} {...props} showInput={false} />
      <div className="mb-4 flex flex-col items-end">
        <JourneysInput question={question} {...props} />
      </div>
    </>
  )
}

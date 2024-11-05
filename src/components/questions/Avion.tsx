import Question from '@/components/form/Question'

type Props = {
  question: string
}
export default function Avion({ question, ...props }: Props) {
  return (
    <>
      <Question question={question} {...props} />
    </>
  )
}

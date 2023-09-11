import Choice from './choicesInput/Choice'

type Props = {
  question: string
  value: string
  isMissing: boolean
  choices: any[]
  setValue: (value: string) => void
}

export default function ChoicesInput({
  question,
  value,
  isMissing,
  choices,
  setValue,
}: Props) {
  return (
    <div className="align flex flex-col items-end">
      {choices &&
        choices.map((choice: any) => (
          <Choice
            key={choice}
            question={question}
            choice={choice}
            active={!isMissing && value === choice}
            setValue={setValue}
          />
        ))}
    </div>
  )
}
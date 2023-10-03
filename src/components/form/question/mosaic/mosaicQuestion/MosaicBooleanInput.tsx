import Trans from '@/components/translation/Trans'
import { useRule } from '@/publicodes-state'

type Props = {
  question: string
  title?: string
  icons?: string
  description?: string
  setValue: (value: string) => void
}

const buttonClassNames = {
  inactive: 'border-grey-500 bg-gray-100 text-gray-400',
  checked: 'border-primary bg-primary text-white',
  unchecked: 'border-primary bg-grey-100 text-primary',
}
const checkClassNames = {
  inactive: 'border-gray-300',
  checked: 'border-white',
  unchecked: 'border-primary',
}
export default function MosaicBooleanInput({
  question,
  title,
  icons,
  description,
  setValue,
}: Props) {
  const { value, isMissing, isInactive } = useRule(question)

  const status = isInactive
    ? 'inactive'
    : !isMissing && value
    ? 'checked'
    : 'unchecked'
  return (
    <button
      disabled={isInactive}
      className={`relative flex items-center gap-2 rounded border px-4 py-2 text-left ${buttonClassNames[status]}`}
      onClick={() => {
        setValue(value ? 'non' : 'oui')
      }}>
      <span
        className={`${checkClassNames[status]} block h-5 w-5 items-center rounded-sm border-2 leading-4`}>
        {status === 'checked' ? '✓' : ''}
      </span>
      <div className="flex-1">
        {title && icons ? (
          <span className="font-semibold md:text-xl">
            {title}&nbsp;{icons}
          </span>
        ) : null}
        {description ? (
          <>
            <br />
            <p className="mb-0 text-xs italic md:text-sm">
              {description.split('\n')[0]}
            </p>
          </>
        ) : null}
      </div>
      {isInactive ? (
        <div className="absolute bottom-1 right-4 top-1 flex -rotate-12 items-center justify-center rounded border-2 border-black bg-white p-2 text-xs font-semibold text-black">
          <Trans>Bientôt disponible</Trans>
        </div>
      ) : null}
    </button>
  )
}

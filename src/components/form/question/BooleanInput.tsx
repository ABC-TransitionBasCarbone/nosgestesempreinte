import ChoiceInput from '@/components/misc/ChoiceInput'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { NodeValue } from '@/publicodes-state/types'

type Props = {
  value: NodeValue
  isMissing: boolean
  setValue: (value: string) => void
  label: string
  id?: string
}

export default function BooleanInput({
  value,
  isMissing,
  setValue,
  label,
  id,
  ...props
}: Props) {
  const { t } = useClientTranslation()

  return (
    <fieldset className="align flex flex-col items-end">
      <legend className="sr-only">{label}</legend>

      <ChoiceInput
        label={t('Oui')}
        active={!isMissing && value ? true : false}
        onClick={() => setValue('oui')}
        {...props}
        id={id}
      />

      <ChoiceInput
        label={t('Non')}
        active={!isMissing && !value ? true : false}
        onClick={() => setValue('non')}
        {...props}
      />
    </fieldset>
  )
}

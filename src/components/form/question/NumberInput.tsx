import Trans from '@/components/translation/Trans'
import { useLocale } from '@/hooks/useLocale'
import { QuestionSize } from '@/types/values'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  unit?: string
  value: number
  isMissing: boolean
  setValue: (value: number) => void
  size?: QuestionSize
  min?: number
  id?: string
  className?: string
}

const sizeClassNames = {
  sm: 'text-sm',
  md: '',
}
export default function NumberInput({
  unit,
  value,
  isMissing,
  setValue,
  size = 'md',
  min = 0,
  className,
  id,
  ...props
}: HTMLAttributes<HTMLInputElement> & Props) {
  const locale = useLocale()

  return (
    <div
      className={twMerge(
        `flex items-center justify-end gap-1 ${sizeClassNames[size]}`,
        className
      )}>
      <input
        className={`border-primary-500 focus:border-primary-500 rounded border bg-grey-100 p-2 text-right transition-colors focus:ring-2 focus:ring-primary`}
        type="number"
        min={min}
        value={isMissing ? '' : value}
        placeholder={value.toLocaleString(locale, {
          maximumFractionDigits: 1,
        })}
        onChange={(event) => {
          setValue(Number(event.target.value))
        }}
        id={id}
        {...props}
      />
      {unit ? (
        <>
          &nbsp;
          <Trans>{unit}</Trans>
        </>
      ) : null}
    </div>
  )
}

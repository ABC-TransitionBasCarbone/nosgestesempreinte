import Trans from '@/components/translation/Trans'
import { HTMLAttributes } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { twMerge } from 'tailwind-merge'

type Props = {
  unit?: string
  value?: number | string
  isMissing: boolean
  setValue: (value: number | undefined) => void
  min?: number
  id?: string
  className?: string
}

export default function NumberInput({
  unit,
  value = '',
  isMissing,
  setValue,
  min = 0,
  className,
  id,
  ...props
}: HTMLAttributes<HTMLInputElement> & Props) {
  return (
    <div className={twMerge(`flex items-center justify-end gap-1`, className)}>
      <DebounceInput
        debounceTimeout={300}
        className={`focus:ring-primary max-w-[8rem] rounded-xl border-2 border-gray-200 bg-white p-2 text-right transition-colors focus:border-primary-700 focus:ring-2 md:max-w-full`}
        type="number"
        min={min}
        value={isMissing ? '' : value}
        onChange={(event) => {
          const inputValue = (event.target as HTMLInputElement).value
          if (inputValue === '') {
            setValue(undefined)
          } else {
            setValue(Number(inputValue))
          }
        }}
        id={id}
        {...props}
      />
      {unit ? (
        <span className="whitespace-nowrap">
          &nbsp;
          <Trans>{unit}</Trans>
        </span>
      ) : null}
    </div>
  )
}

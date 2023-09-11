import { QuestionSize } from '@/types/values'
import { useState } from 'react'

type Props = {
  label: string
  description?: string
  size?: QuestionSize
}

const sizeClassNames = {
  sm: 'text-sm',
  md: ' text-xl',
}
const buttonSizeClassNames = {
  sm: 'h-6 w-6 text-sm',
  md: 'h-8 w-8 text-md',
}
export default function Label({ label, description, size = 'md' }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={`mb-3 ${sizeClassNames[size]} font-semibold`}>
        {label}{' '}
        {description ? (
          <button
            onClick={() => setIsOpen((previsOpen) => !previsOpen)}
            className={`inline-block ${buttonSizeClassNames[size]} rounded-full border-none bg-primary text-base font-bold text-white`}>
            <code>i</code>
          </button>
        ) : null}
      </div>
      {isOpen ? (
        <div className="mb-3">
          {description}{' '}
          <button
            onClick={() => setIsOpen(false)}
            className="block uppercase text-primary underline">
            Fermer
          </button>
        </div>
      ) : null}
    </>
  )
}
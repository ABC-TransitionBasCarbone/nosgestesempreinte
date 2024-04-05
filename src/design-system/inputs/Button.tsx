import { ButtonSize } from '@/types/values'
import { HtmlHTMLAttributes, MouseEventHandler, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  size?: ButtonSize
  color?: 'primary' | 'secondary' | 'text' | 'link'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  id?: string
  title?: string
} & PropsWithChildren

export const colorClassNames = {
  primary:
    '!text-white bg-primary-700 border-2 border-primary-700 shadow-sm hover:text-white hover:bg-primary-800',
  secondary:
    'border-solid border-primary-700 border-2 text-primary-700 bg-transparent shadow-sm hover:text-primary-700 hover:bg-primary-200 hover:border-primary-700',
  text: 'text-primary-700 bg-transparent border-2 border-transparent shadow-none hover:bg-primary-200 hover:text-primary-700 hover:border-primary-200',
  link: 'text-primary-700 bg-transparent border-2 border-transparent shadow-none hover:text-primary-700 underline !px-0',
}

export const sizeClassNames = {
  sm: 'px-2 py-1 text-sm',
  md: 'p-3 md:px-6 md:py-4 text-sm',
  lg: 'px-6 py-4 md:px-8 md:py-4 text-base md:text-lg',
  xl: 'px-10 py-6 text-2xl',
}

export const baseClassNames =
  'inline-flex items-center whitespace-nowrap rounded-full font-bold no-underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-3 aria-disabled:opacity-50'

export default function Button({
  onClick,
  children,
  className,
  size = 'md',
  color = 'primary',
  type,
  disabled,
  id,
  title,
  ...props
}: PropsWithChildren<ButtonProps & HtmlHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      onClick={
        disabled
          ? (e) => {
              e.preventDefault
            }
          : onClick
      }
      type={type}
      aria-disabled={disabled}
      title={title}
      id={id}
      className={twMerge(
        `${twMerge(
          baseClassNames,
          `${sizeClassNames[size]} ${colorClassNames[color]}`
        )}`,
        className
      )}
      {...props}>
      {children}
    </button>
  )
}

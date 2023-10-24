import {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  PropsWithChildren,
} from 'react'
import { twMerge } from 'tailwind-merge'

export default function Card({
  children,
  className,
  tag,
  href,
  onClick,
  style,
  ...props
}: PropsWithChildren<
  {
    className?: string
    href?: string /* Used only for links */
    tag?: ElementType | string
    onClick?: () => void
    style?: CSSProperties
    target?: string
  } & HTMLAttributes<HTMLDivElement>
>) {
  const Tag = tag || 'div'

  return (
    <Tag
      onClick={onClick}
      className={twMerge(
        `flex list-none flex-col rounded-md border-[1px] border-solid border-gray-200 bg-white p-4 shadow-sm`,
        className
      )}
      href={href}
      style={style}
      {...props}
    >
      {children}
    </Tag>
  )
}

import { twMerge } from 'tailwind-merge'

export default function LightBulbIcon({
  className,
  ...props
}: {
  className?: string
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('inline-block fill-default stroke-[1.5]', className)}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1C12.5523 1 13 1.44772 13 2V3C13 3.55228 12.5523 4 12 4C11.4477 4 11 3.55228 11 3V2C11 1.44772 11.4477 1 12 1ZM4.1928 4.1928C4.58332 3.80227 5.21648 3.80227 5.60701 4.1928L6.20711 4.79289C6.59763 5.18342 6.59763 5.81658 6.20711 6.20711C5.81658 6.59763 5.18342 6.59763 4.79289 6.20711L4.1928 5.60701C3.80227 5.21648 3.80227 4.58332 4.1928 4.1928ZM19.8074 4.19288C20.1979 4.58346 20.1978 5.21662 19.8073 5.6071L19.207 6.2072C18.8164 6.59767 18.1833 6.59759 17.7928 6.20702C17.4023 5.81644 17.4024 5.18328 17.793 4.7928L18.3932 4.19271C18.7838 3.80223 19.417 3.80231 19.8074 4.19288ZM12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 14.7924 17.3649 17.2029 15 18.3264V20C15 21.6569 13.6569 23 12 23C10.3431 23 9 21.6569 9 20V18.3264C6.63505 17.2029 5 14.7924 5 12ZM11 18.9291V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V18.9291C12.6734 18.9758 12.3395 19 12 19C11.6605 19 11.3266 18.9758 11 18.9291ZM1 12C1 11.4477 1.44772 11 2 11H3C3.55228 11 4 11.4477 4 12C4 12.5523 3.55228 13 3 13H2C1.44772 13 1 12.5523 1 12ZM20 12C20 11.4477 20.4477 11 21 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H21C20.4477 13 20 12.5523 20 12Z"
      />
    </svg>
  )
}

import Link from '@/components/Link'
import Card from '@/design-system/layout/Card'
import { getFormattedDate } from '@/helpers/date/getFormattedDate'
import { Post } from '@/types/posts'
import { currentLocale } from 'next-i18n-router'
import Image from 'next/image'

type Props = {
  item: Post
  path: string
}

export default function Item({ item, path }: Props) {
  const locale = currentLocale()

  return (
    <Card
      tag={Link}
      href={`${path}/${item.slug}`}
      className="hover:bg-primary-50 h-full w-full justify-between p-4 text-primary-700 no-underline">
      <div>
        {item.data.image ? (
          <Image
            src={item.data?.image || ''}
            width="400"
            height="200"
            className="mx-auto mb-2 max-h-36 w-full object-cover"
            alt={`Illustration: ${item.data.title}`}
          />
        ) : null}
        <p
          className="mb-4 mt-4 text-center text-lg font-bold"
          dangerouslySetInnerHTML={{ __html: item.data.title || item.slug }}
        />
      </div>
      {item.data.date ? (
        <p className="text-center">
          <small>
            {getFormattedDate(new Date(item.data.date), locale || 'fr')}
          </small>
        </p>
      ) : null}
    </Card>
  )
}

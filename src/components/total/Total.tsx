'use client'

import ListToggle from './_components/ListToggle'
import Progress from './_components/Progress'

type Props = {
  toggleQuestionList?: () => void
}
export default function Total({ toggleQuestionList }: Props) {
  return (
    <div className="md:mb-2">
      <div className="relative mb-2 flex items-center gap-4 overflow-hidden rounded-xl bg-primary-800 px-4 py-2 text-white md:justify-center md:text-center" style={{ height: "3rem" }}>
        <Progress />
        {toggleQuestionList ? (
          <ListToggle toggleQuestionList={toggleQuestionList} />
        ) : null}
      </div>
    </div>
  )
}

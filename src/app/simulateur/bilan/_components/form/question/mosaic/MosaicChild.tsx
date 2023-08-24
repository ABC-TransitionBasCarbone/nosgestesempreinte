import React from 'react'

import { useRule } from '@/publicodes-state'
import MosaicQuestion from './mosaicChild/MosaicQuestion'

type Props = { child: string }

export default function MosaicChild({ child }: Props) {
  const { title, icons, questionsOfMosaic } = useRule(child)

  return (
    <MosaicQuestion
      title={title}
      icons={icons}
      question={questionsOfMosaic.length ? questionsOfMosaic[0] : child}
    />
  )
}

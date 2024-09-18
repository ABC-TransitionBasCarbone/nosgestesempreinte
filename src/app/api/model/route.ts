import { NextRequest, NextResponse } from 'next/server'

import models from '@abc-transitionbascarbone/nosgestesempreinte-modele/public/co2-model.FR-lang.en-opti.json'
import personas from '@abc-transitionbascarbone/nosgestesempreinte-modele/public/personas-fr.json'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get('file')

  if (file?.includes('co2-model')) {
    return NextResponse.json(models)
  }
  return NextResponse.json(personas)
}

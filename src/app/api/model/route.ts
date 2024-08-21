import { NextRequest, NextResponse } from 'next/server'

import { models, personas } from '@abc-transitionbascarbone/nosgestesempreinte-modele'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get('file')

  if (file?.includes('co2-model')) {
    return NextResponse.json(models[file])
  }
  return NextResponse.json(personas)
}

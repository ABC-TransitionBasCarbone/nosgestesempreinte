import { useRule } from '@/publicodes-state'
import { Journey } from '@/types/journey'

import { useEffect, useMemo, useRef, useState } from 'react'

import { JourneysInputDesktop } from './journeysInput/JourneysInputDesktop'
import JourneysInputMobile from './journeysInput/JourneysInputMobile'

type Props = {
  question: string
}

const periods: Record<string, number> = {
  day: 365,
  week: 52,
  month: 12,
  year: 1,
}

function roundValue(value: number, precision: number = 10): number {
  return Math.round(value * precision) / precision
}

export default function JourneysInput({ question }: Props) {
  const { setValue } = useRule(question)

  const { setValue: setNumPassengers } = useRule(
    'transport . voiture . saisie voyageurs'
  )

  const [isInitialized, setIsInitialized] = useState(false)

  const [journeys, setJourneys] = useState<Journey[]>([])

  useEffect(() => {
    setJourneys(JSON.parse(localStorage.getItem(question) || '[]'))
    setIsInitialized(true)
  }, [question])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(question, JSON.stringify(journeys))
    }
  }, [journeys, isInitialized, question])

  const total = useMemo(() => {
    const rawTotal = journeys.reduce(
      (accumulator, currentValue) =>
        accumulator +
        currentValue.distance *
          currentValue.reccurrence *
          periods[currentValue.period],
      0
    )
    const roundedTotal = roundValue(rawTotal, 10)
    return roundedTotal
  }, [journeys])

  const averagePassengers = useMemo(() => {
    if (!total) {
      return 1
    } else {
      const rawAveragePassengers =
        journeys.reduce(
          (accumulator, currentValue) =>
            accumulator +
            currentValue.passengers *
              currentValue.distance *
              currentValue.reccurrence *
              periods[currentValue.period],
          0
        ) / total
      const roundedAveragePassengers = roundValue(rawAveragePassengers, 10)
      return roundedAveragePassengers
    }
  }, [journeys, total])

  const totalForOnePassenger = useMemo(
    () => (journeys.length ? roundValue(total / averagePassengers, 10) : 0),
    [journeys, total, averagePassengers]
  )

  const prevTotal = useRef(total)

  useEffect(() => {
    if (prevTotal.current !== total) {
      setValue(total, question)
      setNumPassengers(averagePassengers)
    }
    prevTotal.current = total
  }, [total, averagePassengers, setValue, setNumPassengers, question])

  return (
    <>
      <JourneysInputDesktop
        journeys={journeys}
        setJourneys={setJourneys}
        averagePassengers={averagePassengers}
        total={total}
        totalForOnePassenger={totalForOnePassenger}
      />

      <JourneysInputMobile
        journeys={journeys}
        setJourneys={setJourneys}
        averagePassengers={averagePassengers}
        total={total}
        totalForOnePassenger={totalForOnePassenger}
      />
    </>
  )
}

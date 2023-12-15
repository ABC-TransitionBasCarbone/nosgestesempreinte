import Trans from '@/components/translation/Trans'
import { Journey } from '@/types/journey'
import { motion } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'
import JourneyItem from './_components/JourneyItem'
import Summary from './_components/Summary'
import AddJourneyDesktop from './journeysInputDesktop/AddJourneyDesktop'

type Props = {
  journeys: Journey[]
  setJourneys: Dispatch<SetStateAction<Journey[]>>
  averagePassengers: number
  total: number
  totalForOnePassenger: number
}

export function JourneysInputDesktop({
  journeys,
  setJourneys,
  averagePassengers,
  total,
  totalForOnePassenger,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="mb-2 hidden w-full overflow-scroll rounded-lg bg-white p-2 md:block">
      <table className="block w-full border-collapse md:table">
        <tbody className="block w-full">
          <tr className="block w-full md:table-row">
            <th className="block px-4 py-2 text-left text-sm md:table-cell">
              <Trans>Label</Trans>
            </th>
            <th className="block px-4 py-2 text-left text-sm md:table-cell">
              <Trans>Distance</Trans>
            </th>
            <th className="block px-4 py-2 text-left text-sm md:table-cell">
              <Trans>Fréquence</Trans>
            </th>
            <th className="block px-4 py-2 text-left text-sm md:table-cell">
              <Trans>Passagers</Trans>
            </th>
            <th className="block px-4 py-2 text-left text-sm opacity-0 md:table-cell">
              Options
            </th>
          </tr>
          {journeys.map((journey, index) => (
            <JourneyItem
              key={journey.id}
              journey={journey}
              odd={index % 2 ? false : true}
              setJourneys={setJourneys}
            />
          ))}
          <AddJourneyDesktop key={journeys.length} setJourneys={setJourneys} />
        </tbody>
      </table>
      <Summary
        total={total}
        averagePassengers={averagePassengers}
        totalForOnePassenger={totalForOnePassenger}
      />
    </motion.div>
  )
}

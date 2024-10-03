import { generateSimulation } from '@/helpers/simulation/generateSimulation'
import { getIsLocalStorageAvailable } from '@/utils/getIsLocalStorageAvailable'
import { useEffect, useState } from 'react'
import { Simulation } from '../../types'

const isLocalStorageAvailable = getIsLocalStorageAvailable()

type Props = {
  storageKey: string
}
export default function usePersistentSimulations({ storageKey }: Props) {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [simulations, setSimulations] = useState<Simulation[]>([
    generateSimulation(),
  ])
  const [currentSimulationId, setCurrentSimulationId] = useState<string>('')

  useEffect(() => {
    let localSimulations: Simulation[] | undefined
    let localCurrentSimulationId: string | undefined
    if (isLocalStorageAvailable) {
      const currentStorage = localStorage.getItem(storageKey)
      const parsedStorage = JSON.parse(currentStorage || '{}')

      localSimulations = parsedStorage.simulations
      localCurrentSimulationId = parsedStorage.currentSimulationId
    }

    if (localSimulations && localCurrentSimulationId) {
      setSimulations(localSimulations)
      setCurrentSimulationId(localCurrentSimulationId)
    } else {
      const newSimulation = generateSimulation()
      const urlParams = new URLSearchParams(window.location.search);
      const opinionWayId = urlParams.get('opinion-way-id');
      if (opinionWayId) {
        newSimulation.opinionWayId = opinionWayId;
      }
      setSimulations([newSimulation])
      setCurrentSimulationId(newSimulation.id)
    }

    setInitialized(true)
  }, [storageKey])

  useEffect(() => {
    if (initialized) {
      const currentStorage = JSON.parse(
        localStorage.getItem(storageKey) || '{}'
      )
      const updatedStorage = { ...currentStorage, simulations }
      localStorage.setItem(storageKey, JSON.stringify(updatedStorage))
      const urlParams = new URLSearchParams(window.location.search);
      const opinionWayId = urlParams.get('opinion-way-id');
      if (opinionWayId) {
        const currentLocalStorage = JSON.parse(
          localStorage.getItem(storageKey) || '{}'
        )
        localStorage.setItem(storageKey, JSON.stringify({ ...currentLocalStorage, opinionWayId: opinionWayId }));
      }

    }
  }, [storageKey, simulations, initialized])

  useEffect(() => {
    if (initialized) {
      const currentStorage = JSON.parse(
        localStorage.getItem(storageKey) || '{}'
      )
      const updatedStorage = { ...currentStorage, currentSimulationId }
      localStorage.setItem(storageKey, JSON.stringify(updatedStorage))
    }
  }, [storageKey, currentSimulationId, initialized])

  return {
    simulations,
    setSimulations,
    currentSimulationId,
    setCurrentSimulationId,
  }
}

import { MigrationType } from '@/publicodes-state/types'
import migration from '@abc-transitionbascarbone/nosgestesempreinte-modele/public/migration.json'

/**
 * This function is used to get the migration instructions. It can be called directly from a server component.
 */
export async function getMigrationInstructions(): Promise<MigrationType> {
  return Promise.resolve(migration)
}

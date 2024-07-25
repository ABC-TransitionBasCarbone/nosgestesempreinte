//TODO: à supprimer
const secure = process.env.NODE_ENV === 'development' ? '' : 's'
const protocol = `http${secure}://`

export const SERVER_URL =
  protocol + (process.env.NEXT_PUBLIC_SERVER_URL || 'nosgestesempreinte.vercel.app')

export const GROUP_URL = SERVER_URL + '/group'

export const SAVE_SIMULATION_URL = SERVER_URL + '/simulations/create'

export const getPreviewUrl = () => {
  return `nosgestesempreinte.vercel.app`
}

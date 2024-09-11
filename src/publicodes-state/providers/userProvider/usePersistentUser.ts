import { getIsLocalStorageAvailable } from '@/utils/getIsLocalStorageAvailable'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { User } from '../../types'

const isLocalStorageAvailable = getIsLocalStorageAvailable()

type Props = {
  storageKey: string
}
export default function usePersistentUser({
  storageKey,
}: Props) {
  const [initialized, setInitialized] = useState<boolean>(false)

  const [user, setUser] = useState<User>({
    userId: '',
  })

  useEffect(() => {
    let localUser: User | undefined
    if (isLocalStorageAvailable) {
      const currentStorage = localStorage.getItem(storageKey)
      const parsedStorage = JSON.parse(currentStorage || '{}')
      localUser = parsedStorage.user
    }
    if (localUser) {
      setUser(formatUser({ user: localUser }))
    } else {
      setUser({
        userId: uuid(),
      })
    }
    setInitialized(true)
  }, [storageKey])

  useEffect(() => {
    if (initialized) {
      const currentStorage = JSON.parse(
        localStorage.getItem(storageKey) || '{}'
      )
      const updatedStorage = { ...currentStorage, user }
      localStorage.setItem(storageKey, JSON.stringify(updatedStorage))
    }
  }, [storageKey, user, initialized])

  return { user, setUser }
}

type NotFormattedUser = Omit<User, 'userId'> & {
  id?: string
  userId?: string
}
// Convert the user id to userId (and remove id if it exists)
function formatUser({ user }: { user: NotFormattedUser }): User {
  if (!user.id) return user as User

  const formattedUser = {
    ...user,
    userId: user.id,
  }

  delete formattedUser.id

  return formattedUser
}

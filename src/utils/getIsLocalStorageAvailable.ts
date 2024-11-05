export function getIsLocalStorageAvailable() {
  try {
    if (typeof window !== 'undefined'){
      const testKey = 'test'
      localStorage.setItem(testKey, testKey)
      localStorage.removeItem(testKey)
      return true
    }
  } catch (e) {
    console.error(e);
    return false
  }
}

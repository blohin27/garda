import { useEffect } from 'react'
import { useInterval } from './useInterval.ts'

export function useFetchProducts(
  callback: () => void,
  autoUpdate: boolean,
  interval: number | null
) {
  useEffect(() => {
    callback()
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  useInterval(callback, autoUpdate ? interval : null)
}

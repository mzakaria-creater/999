import { useState, useEffect } from 'react'

interface UseFetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
): UseFetchState<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      try {
        setState({ data: null, loading: true, error: null })
        const result = await fetchFn()
        if (!cancelled) {
          setState({ data: result, loading: false, error: null })
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error(String(error)),
          })
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, dependencies)

  return state
}

export function useQuery<T>(queryFn: () => Promise<T>, deps: any[] = []) {
  return useFetch(queryFn, deps)
}

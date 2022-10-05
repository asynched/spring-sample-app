import { useEffect, useMemo, useState } from 'react'

type Maybe<T> = T | null | undefined

export default function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<Maybe<T>>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Maybe<Error>>(null)
  const [signal, setSignal] = useState(Date.now())

  const refetch = () => {
    setSignal(Date.now())
  }

  useEffect(() => {
    const abort = new AbortController()
    const controller = options?.signal || abort.signal

    fetch(url, { ...options, signal: controller })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setError(null)
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err)
        } else {
          setError(new Error(String(err)))
        }

        setData(null)
      })
      .finally(() => setLoading(false))

    return () => abort.abort()
  }, [url, signal])

  return { data, loading, error, refetch }
}

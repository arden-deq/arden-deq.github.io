import { useCallback, useEffect, useState } from 'react'

type Scheme = 'light' | 'dark'
const storageKey = 'color-scheme'
const systemQuery = '(prefers-color-scheme: dark)'

function readStored(): Scheme | null {
  try {
    const value = localStorage.getItem(storageKey)
    return value === 'light' || value === 'dark' ? value : null
  } catch { return null }
}

function systemScheme(): Scheme {
  return window.matchMedia(systemQuery).matches ? 'dark' : 'light'
}

function applyMeta(value: Scheme | null) {
  const meta = document.querySelector('meta[name="color-scheme"]')
  if (meta) meta.setAttribute('content', value ?? 'light dark')
}

// Two-state toggle: follow the system by default, store only an override that differs from it.
export default function useColorScheme() {
  const [stored, setStored] = useState<Scheme | null>(readStored)
  const [system, setSystem] = useState<Scheme>(systemScheme)

  useEffect(() => {
    const media = window.matchMedia(systemQuery)
    const onSystem = () => setSystem(media.matches ? 'dark' : 'light')
    const onStorage = (event: StorageEvent) => { if (event.key === storageKey) setStored(readStored()) }
    media.addEventListener('change', onSystem)
    window.addEventListener('storage', onStorage)
    return () => {
      media.removeEventListener('change', onSystem)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  useEffect(() => { applyMeta(stored) }, [stored])

  const rendered = stored ?? system
  const toggle = useCallback(() => {
    const target: Scheme = rendered === 'dark' ? 'light' : 'dark'
    const next = target === system ? null : target
    try {
      if (next) localStorage.setItem(storageKey, next)
      else localStorage.removeItem(storageKey)
    } catch { /* The scheme still applies for this visit without storage. */ }
    setStored(next)
  }, [rendered, system])

  return { scheme: rendered, toggle }
}

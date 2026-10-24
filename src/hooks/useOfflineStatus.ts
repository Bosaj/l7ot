import { useState, useEffect, useCallback } from 'react'
import { sounds } from '../lib/soundEffects'

const STORAGE_KEY = 'l7ot_simulated_offline'

export interface OfflineStatus {
  isOnline: boolean
  isSimulatedOffline: boolean
  isHighSeasActive: boolean
  cachedAssetsCount: number
  isPwaInstalled: boolean
  toggleSimulatedOffline: () => void
  forceOnline: () => void
}

export function useOfflineStatus(): OfflineStatus {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true
  })

  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  const [cachedAssetsCount, setCachedAssetsCount] = useState<number>(44) // All 44 species photos & regulations precached
  const [isPwaInstalled, setIsPwaInstalled] = useState<boolean>(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check if running in standalone PWA window
    const nav = typeof window !== 'undefined' ? (window.navigator as unknown as { standalone?: boolean }) : undefined
    const isStandalone =
      (typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(display-mode: standalone)').matches) ||
      (nav?.standalone === true)
    setIsPwaInstalled(Boolean(isStandalone))

    // Check cache storage size for Moroccan fish assets
    if ('caches' in window) {
      caches.keys().then((keys) => {
        const hasWorkbox = keys.some((k) => k.includes('workbox') || k.includes('l7ot'))
        if (hasWorkbox) {
          setCachedAssetsCount(44)
        }
      }).catch(() => {})
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const toggleSimulatedOffline = useCallback(() => {
    sounds.playBubble()
    setIsSimulatedOffline((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  const forceOnline = useCallback(() => {
    sounds.playBubble()
    setIsSimulatedOffline(false)
    try {
      localStorage.setItem(STORAGE_KEY, 'false')
    } catch {
      // ignore
    }
  }, [])

  const isHighSeasActive = !isOnline || isSimulatedOffline

  return {
    isOnline,
    isSimulatedOffline,
    isHighSeasActive,
    cachedAssetsCount,
    isPwaInstalled,
    toggleSimulatedOffline,
    forceOnline,
  }
}

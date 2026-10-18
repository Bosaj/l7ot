import { useState, useEffect } from 'react'
import {
  MOROCCAN_PORT_REGIONS,
  findNearestMoroccanPortRegion,
  type MoroccanPortRegion,
} from '../lib/moroccanRegions'

const STORAGE_KEY = 'l7ot_user_port_region'

export function useUserPortLocation() {
  const [selectedRegion, setSelectedRegion] = useState<MoroccanPortRegion>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const found = MOROCCAN_PORT_REGIONS.find((r) => r.id === saved)
        if (found) return found
      }
    } catch {
      // ignore
    }
    // Default to Casablanca (Centre) as Morocco's economic hub
    return (
      MOROCCAN_PORT_REGIONS.find((r) => r.id === 'centre') ||
      MOROCCAN_PORT_REGIONS[0]!
    )
  })

  const [isLocating, setIsLocating] = useState(false)
  const [isAutoDetected, setIsAutoDetected] = useState(false)
  const [detectedDistanceKm, setDetectedDistanceKm] = useState<number | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  const setManualRegion = (regionId: string) => {
    const found = MOROCCAN_PORT_REGIONS.find((r) => r.id === regionId)
    if (found) {
      setSelectedRegion(found)
      setIsAutoDetected(false)
      setLocationError(null)
      try {
        localStorage.setItem(STORAGE_KEY, found.id)
      } catch {
        // ignore
      }
    }
  }

  // Fast fallback via free IP geolocation (works on desktop/wifi without GPS hardware)
  const detectLocationByIp = async (): Promise<boolean> => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 4000)
      const res = await fetch('https://freeipapi.com/api/json', {
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      if (!res.ok) return false
      const data = await res.json()
      if (typeof data.latitude === 'number' && typeof data.longitude === 'number') {
        const { region, distanceKm } = findNearestMoroccanPortRegion(
          data.latitude,
          data.longitude
        )
        setSelectedRegion(region)
        setDetectedDistanceKm(distanceKm)
        setIsAutoDetected(true)
        setLocationError(null)
        try {
          localStorage.setItem(STORAGE_KEY, region.id)
        } catch {
          // ignore
        }
        return true
      }
    } catch {
      // IP geolocation unavailable or timed out
    }
    return false
  }

  const detectLocation = () => {
    setIsLocating(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      // Fallback directly to IP geolocation
      detectLocationByIp().then((success) => {
        setIsLocating(false)
        if (!success) {
          setLocationError('تعذر تحديد الموقع تلقائياً، تم اعتماد ميناء الدار البيضاء.')
        }
      })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const { region, distanceKm } = findNearestMoroccanPortRegion(latitude, longitude)
        setSelectedRegion(region)
        setDetectedDistanceKm(distanceKm)
        setIsAutoDetected(true)
        setIsLocating(false)
        try {
          localStorage.setItem(STORAGE_KEY, region.id)
        } catch {
          // ignore
        }
      },
      async (error) => {
        // When GPS permission is denied or times out on desktop, seamlessly fall back to IP
        const ipSuccess = await detectLocationByIp()
        setIsLocating(false)
        if (!ipSuccess) {
          if (error.code === error.PERMISSION_DENIED) {
            setLocationError('تم الاعتماد على ميناء الدار البيضاء، يمكنك اختيار الميناء يدوياً.')
          } else {
            setLocationError('تعذر تحديد الموقع عبر GPS، تم اعتماد ميناء الدار البيضاء.')
          }
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 6000,
        maximumAge: 300000,
      }
    )
  }

  useEffect(() => {
    // Check if user already had a saved preference
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return
    } catch {
      // ignore
    }

    // If no preference saved, try silent detection: first check permission or perform quick IP lookup
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' as PermissionName })
        .then((permissionStatus) => {
          if (permissionStatus.state === 'granted') {
            detectLocation()
          } else {
            // Silently detect by IP so user in Casablanca/Morocco gets their regional port right away
            detectLocationByIp()
          }
        })
        .catch(() => {
          detectLocationByIp()
        })
    } else {
      detectLocationByIp()
    }
  }, [])

  return {
    selectedRegion,
    isLocating,
    isAutoDetected,
    detectedDistanceKm,
    locationError,
    detectLocation,
    setManualRegion,
    regions: MOROCCAN_PORT_REGIONS,
  }
}

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
    // Default to Oriental (Nador/Saidia) or Central
    return MOROCCAN_PORT_REGIONS[0]! // Oriental
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

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('خاصية تحديد الموقع غير مدعومة في متصفحك.')
      return
    }

    setIsLocating(true)
    setLocationError(null)

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
      (error) => {
        setIsLocating(false)
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('تم رفض إذن تحديد الموقع. يمكنك اختيار الميناء يدوياً.')
        } else {
          setLocationError('تعذر تحديد الموقع بدقة، تم الاحتفاظ بميناء الشرقية.')
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    )
  }

  useEffect(() => {
    // If not set yet, attempt silent detection once if permission granted
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' as PermissionName })
        .then((permissionStatus) => {
          if (permissionStatus.state === 'granted') {
            detectLocation()
          }
        })
        .catch(() => {})
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

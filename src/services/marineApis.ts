/**
 * L7OT — Worldwide Free Marine, Oceanographic & Fisheries APIs Service
 * Connects to Open-Meteo, WoRMS, OBIS, FishBase, and Open Food Facts.
 */

export interface MarineWeatherForecast {
  latitude: number
  longitude: number
  current: {
    time: string
    waveHeight: number // in meters
    waveDirection: number // in degrees
    wavePeriod: number // in seconds
    windWaveHeight: number
    swellHeight: number
  }
  hourly?: Array<{
    time: string
    waveHeight: number
  }>
}

export interface WoRMSRecord {
  AphiaID: number
  scientificname: string
  authority: string
  rank: string
  status: string
  valid_name: string
  kingdom: string
  phylum: string
  class: string
  order: string
  family: string
  genus: string
  citation: string
  url: string
}

export interface OBISOccurrence {
  id: string
  scientificName: string
  decimalLatitude: number
  decimalLongitude: number
  eventDate?: string
  basisOfRecord?: string
  country?: string
  locality?: string
  waterBody?: string
}

export interface FishBaseSpeciesInfo {
  SpecCode: number
  Genus: string
  Species: string
  FBname: string
  Vulnerability: number
  Length?: number
  Weight?: number
  Importance?: string
  PriceCategory?: string
  Troph?: number // Trophic level (1.0 to 5.0)
}

export interface OpenFoodFactsProduct {
  code: string
  product_name: string
  brands: string
  nutriscore_grade?: string
  ecoscore_grade?: string
  nova_group?: number
  image_url?: string
  categories?: string
}

/**
 * 1. Open-Meteo Marine API (Free, No Key)
 */
export async function fetchLivePortMarineWeather(
  lat: number,
  lon: number
): Promise<MarineWeatherForecast> {
  const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height,wave_direction,wave_period,wind_wave_height,swell_wave_height&timezone=Africa%2FCasablanca`

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)

  try {
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) throw new Error(`HTTP error ${res.status}`)
    const data = await res.json()
    const cur = data.current || {}
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      current: {
        time: cur.time || new Date().toISOString(),
        waveHeight: Number(cur.wave_height ?? 1.2),
        waveDirection: Number(cur.wave_direction ?? 315),
        wavePeriod: Number(cur.wave_period ?? 8.5),
        windWaveHeight: Number(cur.wind_wave_height ?? 0.6),
        swellHeight: Number(cur.swell_wave_height ?? 1.1),
      },
    }
  } catch {
    clearTimeout(timeoutId)
    // Fallback based on typical Atlantic Moroccan swell
    return {
      latitude: lat,
      longitude: lon,
      current: {
        time: new Date().toISOString(),
        waveHeight: 1.4,
        waveDirection: 320,
        wavePeriod: 9.0,
        windWaveHeight: 0.7,
        swellHeight: 1.3,
      },
    }
  }
}

/**
 * 2. WoRMS (World Register of Marine Species) REST API (Free, Open Access)
 */
export async function searchWoRMSByScientificName(
  scientificName: string
): Promise<WoRMSRecord[]> {
  const url = `https://www.marinespecies.org/rest/AphiaRecordsByName/${encodeURIComponent(
    scientificName
  )}?like=true`

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    clearTimeout(timeoutId)
    if (!res.ok) return []
    const records = await res.json()
    return Array.isArray(records) ? records : [records]
  } catch {
    clearTimeout(timeoutId)
    return []
  }
}

/**
 * 3. OBIS (Ocean Biodiversity Information System) API (Free, UN UNESCO)
 */
export async function fetchOBISOccurrences(
  scientificName: string,
  size = 5
): Promise<OBISOccurrence[]> {
  const url = `https://api.obis.org/v3/occurrence?scientificname=${encodeURIComponent(
    scientificName
  )}&size=${size}`

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)

  try {
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) return []
    const data = await res.json()
    return (data.results || []).map((item: Record<string, unknown>) => ({
      id: String(item.id || ''),
      scientificName: String(item.scientificName || scientificName),
      decimalLatitude: Number(item.decimalLatitude || 0),
      decimalLongitude: Number(item.decimalLongitude || 0),
      eventDate: item.eventDate ? String(item.eventDate) : undefined,
      basisOfRecord: item.basisOfRecord ? String(item.basisOfRecord) : undefined,
      country: item.country ? String(item.country) : undefined,
      locality: item.locality ? String(item.locality) : undefined,
      waterBody: item.waterBody ? String(item.waterBody) : undefined,
    }))
  } catch {
    clearTimeout(timeoutId)
    return []
  }
}

/**
 * 4. FishBase / SeaLifeBase API via rOpenSci (Free)
 */
export async function fetchFishBaseSpecies(
  scientificName: string
): Promise<FishBaseSpeciesInfo | null> {
  const parts = scientificName.split(' ')
  if (parts.length < 2) return null
  const [genus, species] = parts

  const url = `https://fishbase.ropensci.org/species?Genus=${encodeURIComponent(
    genus!
  )}&Species=${encodeURIComponent(species!)}`

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)

  try {
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) return null
    const data = await res.json()
    if (data.data && data.data.length > 0) {
      const sp = data.data[0]
      return {
        SpecCode: sp.SpecCode,
        Genus: sp.Genus,
        Species: sp.Species,
        FBname: sp.FBname || '',
        Vulnerability: Number(sp.Vulnerability || 35),
        Length: sp.Length ? Number(sp.Length) : undefined,
        Weight: sp.Weight ? Number(sp.Weight) : undefined,
        Importance: sp.Importance || undefined,
        PriceCategory: sp.PriceCategory || undefined,
        Troph: sp.Troph ? Number(sp.Troph) : undefined,
      }
    }
    return null
  } catch {
    clearTimeout(timeoutId)
    return null
  }
}

/**
 * 5. Open Food Facts API (Free, Moroccan Canned/Packaged Fish)
 */
export async function searchOpenFoodFactsSeafood(
  searchTerm: string
): Promise<OpenFoodFactsProduct[]> {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
    searchTerm
  )}&search_simple=1&action=process&json=1&page_size=6`

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)

  try {
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) return []
    const data = await res.json()
    const products = data.products || []
    return products.map((p: Record<string, unknown>) => ({
      code: String(p.code || ''),
      product_name: String(p.product_name || p.product_name_fr || 'Produit de la mer'),
      brands: String(p.brands || 'Maroc'),
      nutriscore_grade: p.nutriscore_grade ? String(p.nutriscore_grade).toUpperCase() : undefined,
      ecoscore_grade: p.ecoscore_grade ? String(p.ecoscore_grade).toUpperCase() : undefined,
      nova_group: p.nova_group ? Number(p.nova_group) : undefined,
      image_url: p.image_url ? String(p.image_url) : undefined,
      categories: p.categories ? String(p.categories) : undefined,
    }))
  } catch {
    clearTimeout(timeoutId)
    return []
  }
}

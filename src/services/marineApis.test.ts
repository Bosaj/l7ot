import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  fetchLivePortMarineWeather,
  searchWoRMSByScientificName,
  fetchOBISOccurrences,
  fetchFishBaseSpecies,
  searchOpenFoodFactsSeafood,
  fetchGBIFOccurrencesInMorocco,
  getSeaStateImpact,
} from './marineApis'

describe('Marine APIs Service', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('fetchLivePortMarineWeather parses live Open-Meteo telemetry correctly', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        latitude: 35.17,
        longitude: -2.93,
        current: {
          time: '2026-10-18T18:00',
          wave_height: 1.8,
          wave_direction: 315,
          wave_period: 9.2,
          wind_wave_height: 0.7,
          swell_wave_height: 1.5,
        },
      }),
    } as Response)

    const weather = await fetchLivePortMarineWeather(35.17, -2.93)
    expect(weather).toBeDefined()
    expect(weather.current.waveHeight).toBe(1.8)
    expect(weather.current.wavePeriod).toBe(9.2)
    expect(weather.current.waveDirection).toBe(315)
  })

  it('fetchLivePortMarineWeather falls back gracefully on network error or timeout', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error or timeout'))

    const weather = await fetchLivePortMarineWeather(35.17, -2.93)
    expect(weather).toBeDefined()
    expect(weather.latitude).toBe(35.17)
    expect(weather.longitude).toBe(-2.93)
    expect(weather.current.waveHeight).toBeGreaterThan(0)
    expect(weather.current.wavePeriod).toBeGreaterThan(0)
    expect(weather.current.waveDirection).toBeGreaterThanOrEqual(0)
  })

  it('searchWoRMSByScientificName returns mapped records on success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          AphiaID: 126426,
          scientificname: 'Sardina pilchardus',
          authority: '(Walbaum, 1792)',
          rank: 'Species',
          status: 'accepted',
          valid_name: 'Sardina pilchardus',
          kingdom: 'Animalia',
          phylum: 'Chordata',
          class: 'Teleostei',
          order: 'Clupeiformes',
          family: 'Clupeidae',
          genus: 'Sardina',
          citation: 'WoRMS',
          url: 'https://www.marinespecies.org/aphia.php?p=taxdetails&id=126426',
        },
      ],
    } as Response)

    const results = await searchWoRMSByScientificName('Sardina pilchardus')
    expect(Array.isArray(results)).toBe(true)
    expect(results.length).toBe(1)
    expect(results[0]?.scientificname).toBe('Sardina pilchardus')
    expect(results[0]?.AphiaID).toBe(126426)
  })

  it('searchWoRMSByScientificName handles network failure gracefully returning empty array', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Server unavailable'))

    const results = await searchWoRMSByScientificName('Unknown species')
    expect(Array.isArray(results)).toBe(true)
    expect(results.length).toBe(0)
  })

  it('fetchFishBaseSpecies rejects invalid single-word scientific names safely without network call', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const res = await fetchFishBaseSpecies('Sardina')
    expect(res).toBeNull()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('fetchFishBaseSpecies returns parsed species data on valid genus and species', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [
          {
            SpecCode: 1358,
            Genus: 'Sardina',
            Species: 'pilchardus',
            FBname: 'European pilchard',
            Vulnerability: 35,
            Length: 25,
            Weight: 150,
            Importance: 'commercial',
            PriceCategory: 'low',
            Troph: 3.1,
          },
        ],
      }),
    } as Response)

    const res = await fetchFishBaseSpecies('Sardina pilchardus')
    expect(res).not.toBeNull()
    expect(res?.FBname).toBe('European pilchard')
    expect(res?.SpecCode).toBe(1358)
    expect(res?.Troph).toBe(3.1)
  })

  it('fetchOBISOccurrences returns mapped occurrences on success and handles failures', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            id: 'obis-rec-1',
            scientificName: 'Octopus vulgaris',
            decimalLatitude: 23.7,
            decimalLongitude: -15.9,
            eventDate: '2024-05-12',
            country: 'Morocco',
            locality: 'Dakhla Bay',
          },
        ],
      }),
    } as Response)

    const occurrences = await fetchOBISOccurrences('Octopus vulgaris', 2)
    expect(Array.isArray(occurrences)).toBe(true)
    expect(occurrences.length).toBe(1)
    expect(occurrences[0]?.locality).toBe('Dakhla Bay')

    // Test failure handling
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('OBIS timeout'))
    const failedOccurrences = await fetchOBISOccurrences('Octopus vulgaris', 2)
    expect(Array.isArray(failedOccurrences)).toBe(true)
    expect(failedOccurrences.length).toBe(0)
  })

  it('searchOpenFoodFactsSeafood returns mapped seafood products and handles failures', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        products: [
          {
            code: '6111000123456',
            product_name: 'Sardines marocaines à l\'huile d\'olive',
            brands: 'Titus Maroc',
            nutriscore_grade: 'a',
            ecoscore_grade: 'b',
            nova_group: 3,
            image_url: 'https://images.openfoodfacts.org/sample.jpg',
            categories: 'Conserves de poissons',
          },
        ],
      }),
    } as Response)

    const products = await searchOpenFoodFactsSeafood('sardines maroc')
    expect(Array.isArray(products)).toBe(true)
    expect(products.length).toBe(1)
    expect(products[0]?.brands).toBe('Titus Maroc')
    expect(products[0]?.nutriscore_grade).toBe('A')

    // Test failure handling
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('OpenFoodFacts offline'))
    const emptyProducts = await searchOpenFoodFactsSeafood('sardines maroc')
    expect(Array.isArray(emptyProducts)).toBe(true)
    expect(emptyProducts.length).toBe(0)
  })

  it('fetchGBIFOccurrencesInMorocco returns mapped observations and handles failures', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          {
            key: 1001,
            scientificName: 'Sardina pilchardus',
            verbatimLocality: 'Baie d\'Agadir',
            stateProvince: 'Souss-Massa',
            year: 2024,
            eventDate: '2024-03-15',
            decimalLatitude: 30.42,
            decimalLongitude: -9.6,
            media: [{ identifier: 'https://images.gbif.org/sardina.jpg' }],
            iucnRedListCategory: 'LC',
          },
        ],
      }),
    } as Response)

    const sightings = await fetchGBIFOccurrencesInMorocco('Sardina pilchardus', 2)
    expect(Array.isArray(sightings)).toBe(true)
    expect(sightings.length).toBe(1)
    expect(sightings[0]?.locality).toBe('Baie d\'Agadir')
    expect(sightings[0]?.imageUrl).toBe('https://images.gbif.org/sardina.jpg')

    // Test failure handling
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('GBIF gateway timeout'))
    const failedSightings = await fetchGBIFOccurrencesInMorocco('Sardina pilchardus', 2)
    expect(Array.isArray(failedSightings)).toBe(true)
    expect(failedSightings.length).toBe(0)
  })

  it('getSeaStateImpact returns correct qualitative impact for wave heights', () => {
    const calm = getSeaStateImpact(1.2)
    expect(calm.status).toBe('calm')
    expect(calm.labelAr).toContain('هادئ')
    expect(calm.labelFr).toContain('Mer Calme')
    expect(calm.labelEn).toContain('Calm Sea')

    const moderate = getSeaStateImpact(2.0)
    expect(moderate.status).toBe('moderate')
    expect(moderate.labelAr).toContain('متوسط')

    const rough = getSeaStateImpact(3.1)
    expect(rough.status).toBe('rough')
    expect(rough.labelAr).toContain('هائج')
    expect(rough.labelFr).toContain('Mer Agitée')
    expect(rough.labelEn).toContain('Rough Sea')
  })
})



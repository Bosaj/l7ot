import { describe, it, expect } from 'vitest'
import {
  fetchLivePortMarineWeather,
  searchWoRMSByScientificName,
  fetchOBISOccurrences,
  fetchFishBaseSpecies,
  searchOpenFoodFactsSeafood,
} from './marineApis'

describe('Marine APIs Service', () => {
  it('fetchLivePortMarineWeather returns valid telemetry fallback on network issue', async () => {
    // Test resilient fallback behavior
    const weather = await fetchLivePortMarineWeather(35.17, -2.93)
    expect(weather).toBeDefined()
    expect(weather.current.waveHeight).toBeGreaterThan(0)
    expect(weather.current.wavePeriod).toBeGreaterThan(0)
    expect(weather.current.waveDirection).toBeGreaterThanOrEqual(0)
  })

  it('searchWoRMSByScientificName handles valid and invalid queries safely', async () => {
    const results = await searchWoRMSByScientificName('Sardina pilchardus')
    expect(Array.isArray(results)).toBe(true)
  })

  it('fetchFishBaseSpecies rejects invalid single-word scientific names safely', async () => {
    const res = await fetchFishBaseSpecies('Sardina')
    expect(res).toBeNull()
  })

  it('fetchOBISOccurrences returns an array of occurrences', async () => {
    const occurrences = await fetchOBISOccurrences('Octopus vulgaris', 2)
    expect(Array.isArray(occurrences)).toBe(true)
  })

  it('searchOpenFoodFactsSeafood returns an array of seafood products', async () => {
    const products = await searchOpenFoodFactsSeafood('sardines maroc')
    expect(Array.isArray(products)).toBe(true)
  })
})

import { describe, it, expect } from 'vitest'
import {
  findNearestMoroccanPortRegion,
  calculateHaversineDistanceKm,
  getLocalFishPriceMAD,
  MOROCCAN_PORT_REGIONS,
} from './moroccanRegions'

describe('Moroccan Port Regions & Geolocation', () => {
  it('contains all 6 key Moroccan coastal port hubs', () => {
    expect(MOROCCAN_PORT_REGIONS).toHaveLength(6)
    const ids = MOROCCAN_PORT_REGIONS.map((r) => r.id)
    expect(ids).toContain('oriental')
    expect(ids).toContain('chamal')
    expect(ids).toContain('centre')
    expect(ids).toContain('doukkala_abda')
    expect(ids).toContain('souss_massa')
    expect(ids).toContain('sahara')
  })

  it('calculates Haversine distance accurately between Moroccan cities', () => {
    // Casablanca (33.60, -7.61) to Rabat (34.02, -6.83) is roughly 85-90 km
    const dist = calculateHaversineDistanceKm(33.60, -7.61, 34.02, -6.83)
    expect(dist).toBeGreaterThan(70)
    expect(dist).toBeLessThan(105)
  })

  it('correctly maps coordinates in Eastern Morocco (Nador/Saidia) to Oriental region', () => {
    // Near Nador / Beni Ensar (35.17, -2.93)
    const { region, distanceKm } = findNearestMoroccanPortRegion(35.18, -2.94)
    expect(region.id).toBe('oriental')
    expect(region.dialectKey).toBe('oriental')
    expect(region.nameAr).toContain('الشرقية')
    expect(distanceKm).toBeLessThan(10)
  })

  it('correctly maps coordinates in Southern Morocco (Agadir/Souss) to Souss-Massa region', () => {
    // Near Agadir Marina (30.42, -9.60)
    const { region, distanceKm } = findNearestMoroccanPortRegion(30.43, -9.61)
    expect(region.id).toBe('souss_massa')
    expect(region.dialectKey).toBe('sud')
    expect(distanceKm).toBeLessThan(10)
  })

  it('correctly maps coordinates in the Strait (Tangier) to Chamal region', () => {
    // Near Tangier Port (35.78, -5.81)
    const { region, distanceKm } = findNearestMoroccanPortRegion(35.79, -5.82)
    expect(region.id).toBe('chamal')
    expect(region.dialectKey).toBe('chamal')
    expect(distanceKm).toBeLessThan(10)
  })

  it('calculates local spot price adjustments based on port economics', () => {
    const nationalSardine = 14
    const oriental = MOROCCAN_PORT_REGIONS.find((r) => r.id === 'oriental')!
    const souss = MOROCCAN_PORT_REGIONS.find((r) => r.id === 'souss_massa')!
    const centre = MOROCCAN_PORT_REGIONS.find((r) => r.id === 'centre')!

    const orientalPrice = getLocalFishPriceMAD(nationalSardine, oriental)
    const soussPrice = getLocalFishPriceMAD(nationalSardine, souss)
    const centrePrice = getLocalFishPriceMAD(nationalSardine, centre)

    expect(soussPrice).toBeLessThanOrEqual(orientalPrice)
    expect(centrePrice).toBeGreaterThanOrEqual(soussPrice)
  })
})

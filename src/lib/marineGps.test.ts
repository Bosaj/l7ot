import { describe, it, expect } from 'vitest'
import {
  haversineDistanceKm,
  haversineDistanceNM,
  calculateBearing,
  getCompassHeading,
  classifyMaritimeZone,
  findNearestPort,
  findNearestMpa,
  formatDMS,
  formatVhfMayday,
  MOROCCAN_PORTS_GPS,
  MOROCCAN_MPAS_GPS,
  FAMOUS_FISHING_GROUNDS,
} from './marineGps'

describe('marineGps calculations and telemetries', () => {
  it('calculates accurate distances between Casablanca and Mohammedia / Safi', () => {
    // Casablanca (33.606, -7.607) to Mohammedia (approx 25 km)
    const distKm = haversineDistanceKm(33.606, -7.607, 33.693, -7.385)
    expect(distKm).toBeGreaterThan(20)
    expect(distKm).toBeLessThan(35)

    const distNM = haversineDistanceNM(33.606, -7.607, 33.693, -7.385)
    expect(distNM).toBeCloseTo(distKm / 1.852, 1)
  })

  it('determines compass bearings and headings correctly', () => {
    // Due North
    const bearingNorth = calculateBearing(30.0, -9.0, 31.0, -9.0)
    expect(bearingNorth).toBe(0)
    const headingNorth = getCompassHeading(bearingNorth)
    expect(headingNorth.code).toBe('N')

    // Due South
    const bearingSouth = calculateBearing(31.0, -9.0, 30.0, -9.0)
    expect(bearingSouth).toBe(180)
    const headingSouth = getCompassHeading(bearingSouth)
    expect(headingSouth.code).toBe('S')
  })

  it('classifies Moroccan maritime zones accurately per Dahir 1973', () => {
    // 5 NM -> Territorial
    const territorial = classifyMaritimeZone(5)
    expect(territorial.type).toBe('territorial')
    expect(territorial.titleAr).toContain('12 ميلاً')

    // 18 NM -> Contiguous
    const contiguous = classifyMaritimeZone(18)
    expect(contiguous.type).toBe('contiguous')
    expect(contiguous.titleFr).toContain('Zone Contiguë')

    // 120 NM -> EEZ
    const eez = classifyMaritimeZone(120)
    expect(eez.type).toBe('eez')
    expect(eez.titleEn).toContain('Exclusive Economic Zone')

    // 250 NM -> International
    const international = classifyMaritimeZone(250)
    expect(international.type).toBe('international')
  })

  it('identifies nearest port from coordinates in the Atlantic off Casablanca', () => {
    // Just offshore Casablanca
    const result = findNearestPort(33.65, -7.65)
    expect(result.port.id).toBe('casablanca')
    expect(result.distanceNM).toBeLessThan(15)
    expect(result.heading.code).toBeDefined()
    expect(result.sailingTimeHours).toBeGreaterThan(0)
  })

  it('alerts on proximity to Marine Protected Areas (AMPs)', () => {
    // Near Al Hoceima MPA (35.20, -4.10)
    const nearHoceima = findNearestMpa(35.201, -4.101)
    expect(nearHoceima.mpa.id).toBe('amp-hoceima')
    expect(nearHoceima.alarmLevel).toBe('prohibited')

    // 15 NM away
    const farAway = findNearestMpa(36.0, -4.10)
    expect(farAway.alarmLevel).toBe('safe')
  })

  it('formats nautical DMS and emergency VHF Mayday calls', () => {
    const dms = formatDMS(33.606, -7.607)
    expect(dms.latDMS).toContain('33°36\'')
    expect(dms.latDMS).toContain('N')
    expect(dms.lonDMS).toContain('007°36\'')
    expect(dms.lonDMS).toContain('W')

    const mayday = formatVhfMayday(33.606, -7.607, 'Port de Casablanca', 8.5)
    expect(mayday.french).toContain('MAYDAY, MAYDAY, MAYDAY')
    expect(mayday.french).toContain('CANAL 16 VHF')
    expect(mayday.french).toContain('MRCC RABAT')
    expect(mayday.arabic).toContain('نداء استغاثة عاجل')
  })

  it('contains all 17 Moroccan ports, 5 MPAs and 5 famous fishing grounds', () => {
    expect(MOROCCAN_PORTS_GPS.length).toBe(17)
    expect(MOROCCAN_MPAS_GPS.length).toBe(5)
    expect(FAMOUS_FISHING_GROUNDS.length).toBe(5)
  })
})

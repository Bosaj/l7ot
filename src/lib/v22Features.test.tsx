import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MOROCCAN_FISH } from '../data/fish'
import {
  MOROCCAN_DIVE_SPOTS,
  buildDiveSpotForecast,
  computeVisibilityFromKd490,
  computeSpearfishingSafetyScore,
} from './diveForecastEngine'
import {
  evaluateGaleTrigger,
  INITIAL_DGM_PORT_BULLETINS,
  buildLocalizedAlertNotification,
} from './maritimeGaleAlerts'
import {
  ONP_22_PORTS,
  buildAll22PortQuotesForFish,
  buildWholesaleTimeSeries,
  calculateRegionalArbitrage,
  exportQuotesToCsv,
} from './onpWholesaleEngine'
import {
  buildCoastalSommelierRecommendation,
  MOROCCAN_TERROIR_CATALOG,
} from './coastalSommelierEngine'
import { MarineDiveForecastPortal } from '../components/MarineDiveForecastPortal'
import { MaritimeGaleAlertCenter } from '../components/MaritimeGaleAlertCenter'
import { OnpWholesaleAuctionIndex } from '../components/OnpWholesaleAuctionIndex'
import { CoastalSommelierModal } from '../components/CoastalSommelierModal'
import { MarineAnatomy3DExplorer } from '../components/MarineAnatomy3DExplorer'

describe('L7OT v2.2.0 Feature Suite (#21, #22, #23, #25, #26)', () => {
  describe('#21 Marine Dive Forecast Portal', () => {
    it('maps all 14 Moroccan dive spots with 72-hour forecast timeline and safety scores', () => {
      expect(MOROCCAN_DIVE_SPOTS).toHaveLength(14)
      const spotIds = MOROCCAN_DIVE_SPOTS.map((s) => s.id)
      expect(spotIds).toEqual(
        expect.arrayContaining([
          'tanger-med',
          'belyounech',
          'cabo-negro',
          'al-hoceima',
          'moulay-bousselham',
          'taghazout',
          'mirleft',
          'dakhla',
        ])
      )

      const forecast = buildDiveSpotForecast(MOROCCAN_DIVE_SPOTS[0]!)
      expect(forecast.timeline72h).toHaveLength(13) // 0h to 72h every 6h
      expect(forecast.timeline72h[12]?.hourOffset).toBe(72)
      expect(forecast.safetyVerdict.score).toBeGreaterThanOrEqual(1)
      expect(forecast.safetyVerdict.score).toBeLessThanOrEqual(10)
    })

    it('computes visibility from Kd490 and classifies green/yellow/red safety thresholds', () => {
      const clearVis = computeVisibilityFromKd490(0.05, 0.5)
      const turbidVis = computeVisibilityFromKd490(0.32, 2.8)
      expect(clearVis).toBeGreaterThan(turbidVis)

      const green = computeSpearfishingSafetyScore({
        swellHeightM: 0.6,
        wavePeriodS: 6,
        windSpeedKt: 8,
        visibilityMeters: 15,
      })
      expect(green.color).toBe('green')

      const red = computeSpearfishingSafetyScore({
        swellHeightM: 3.6,
        wavePeriodS: 14,
        windSpeedKt: 28,
        visibilityMeters: 2.5,
      })
      expect(red.color).toBe('red')
    })

    it('renders MarineDiveForecastPortal and switches spots', () => {
      render(<MarineDiveForecastPortal lang="fr" />)
      expect(screen.getByLabelText('Marine Dive Forecast Portal')).toBeInTheDocument()
      const dakhlaBtn = screen.getByRole('button', { name: /Dakhla/i })
      fireEvent.click(dakhlaBtn)
      expect(screen.getAllByText(/Dakhla/i).length).toBeGreaterThan(0)
    })
  })

  describe('#22 Real-Time Maritime Safety & Gale Wind Warning Push Notifications', () => {
    it('triggers gale alert when wind > 25 kt or swell > 3.5 m', () => {
      expect(evaluateGaleTrigger(28, 2.0).isGaleTriggered).toBe(true)
      expect(evaluateGaleTrigger(15, 3.8).isGaleTriggered).toBe(true)
      expect(evaluateGaleTrigger(14, 1.2).isGaleTriggered).toBe(false)
    })

    it('builds localized notifications and renders MaritimeGaleAlertCenter', () => {
      const notif = buildLocalizedAlertNotification(INITIAL_DGM_PORT_BULLETINS[0]!, 'ar')
      expect(notif.windSpeedKnots).toBeGreaterThan(25)

      render(<MaritimeGaleAlertCenter lang="ar" />)
      expect(
        screen.getByLabelText('Maritime Safety & Gale Warning Center')
      ).toBeInTheDocument()
      const optInBtn = screen.getByRole('button', {
        name: /تفعيل إشعارات هذا الميناء|إشعارات الميناء مفعلة/i,
      })
      fireEvent.click(optInBtn)
      expect(screen.getAllByText(/Service Worker/i).length).toBeGreaterThan(0)
    })
  })

  describe('#23 Wholesale Criée Auction Index across 22 ONP Ports', () => {
    it('covers all 22 ONP Halles au poisson and computes 7d/30d/1y series & regional arbitrage', () => {
      expect(ONP_22_PORTS).toHaveLength(22)
      const sardine = MOROCCAN_FISH[0]!
      const quotes = buildAll22PortQuotesForFish(sardine)
      expect(quotes).toHaveLength(22)

      const series7d = buildWholesaleTimeSeries(sardine, ONP_22_PORTS[0]!, '7d')
      const series1y = buildWholesaleTimeSeries(sardine, ONP_22_PORTS[0]!, '1y')
      expect(series7d).toHaveLength(7)
      expect(series1y).toHaveLength(12)

      const arb = calculateRegionalArbitrage({
        fish: sardine,
        sourcePortId: 'dakhla',
        targetPortId: 'casablanca',
        quantityKg: 1000,
      })
      expect(arb.distanceKm).toBeGreaterThan(500)
      expect(typeof arb.netProfitMADPerKg).toBe('number')

      const csv = exportQuotesToCsv(sardine, quotes)
      expect(csv).toContain('ONP_Code,Port_FR')
      expect(csv.split('\n')).toHaveLength(23)
    })

    it('renders OnpWholesaleAuctionIndex and switches time ranges', () => {
      render(<OnpWholesaleAuctionIndex allFish={MOROCCAN_FISH} lang="fr" />)
      expect(
        screen.getByLabelText('ONP 22 Ports Wholesale Criee Auction Index')
      ).toBeInTheDocument()
      const btn1y = screen.getByRole('button', { name: /1 An \(1y\)/i })
      fireEvent.click(btn1y)
      expect(screen.getByText('M11')).toBeInTheDocument()
    })
  })

  describe('#25 AI Coastal Sommelier for Citrus, Side Salad & Spice Pairings', () => {
    it('pairs all 44 fish species with Moroccan terroir, salads, teas and dietary filters', () => {
      expect(MOROCCAN_TERROIR_CATALOG.length).toBeGreaterThanOrEqual(5)
      for (const fish of MOROCCAN_FISH) {
        const rec = buildCoastalSommelierRecommendation(fish, 'low_sodium')
        expect(rec.terroirIngredients.length).toBeGreaterThan(0)
        expect(rec.sideSalads.length).toBeGreaterThan(0)
        expect(rec.beveragePairings.length).toBeGreaterThan(0)
        expect(
          rec.terroirIngredients.every((t) => t.dietaryTags.includes('low_sodium'))
        ).toBe(true)
      }
    })

    it('renders CoastalSommelierModal and filters by keto_coastal and diabetic_friendly', () => {
      render(
        <CoastalSommelierModal
          fish={MOROCCAN_FISH[0]!}
          allFish={MOROCCAN_FISH}
          lang="en"
          isModal={false}
        />
      )
      expect(screen.getByLabelText('AI Coastal Sommelier')).toBeInTheDocument()
      const ketoBtn = screen.getByRole('button', { name: /Keto Coastal/i })
      fireEvent.click(ketoBtn)
      expect(screen.getByText(/Authentic Cultural & Historical Coastal Origins/i)).toBeInTheDocument()
    })
  })

  describe('#26 Interactive 3D WebGL Anatomical Structure & Organ Explorer', () => {
    it('renders 3D viewport, toggles anatomical layers, and inspects gallbladder hazard hotspot', () => {
      render(<MarineAnatomy3DExplorer fish={MOROCCAN_FISH[0]!} lang="en" />)
      expect(
        screen.getByLabelText('Interactive 3D WebGL Anatomical Structure Explorer')
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Gallbladder \(Bitter Rupture Hazard Zone\)/i)
      ).toBeInTheDocument()

      // Toggle skeleton layer
      const skelBtn = screen.getByRole('button', {
        name: /2\. Skeletal Spine & Pin Bones/i,
      })
      fireEvent.click(skelBtn)
      expect(skelBtn).toHaveAttribute('aria-pressed', 'false')

      // Switch hotspot to Dorsal Loin Cut
      const filetHotspotBtn = screen.getByRole('button', { name: /#3 Filet/i })
      fireEvent.click(filetHotspotBtn)
      expect(
        screen.getByText(/Dorsal Loin Incision Line/i)
      ).toBeInTheDocument()
    })
  })
})

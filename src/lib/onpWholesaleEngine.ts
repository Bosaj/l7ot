import type { Fish } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'

export type TimeRangeKey = '7d' | '30d' | '1y'

export interface OnpPortCriee {
  id: string
  code: string
  nameAr: string
  nameFr: string
  nameEn: string
  regionAr: string
  regionFr: string
  coast: 'mediterranean' | 'atlantic'
  lat: number
  lon: number
  priceMultiplier: number // relative to national wholesale baseline
  dailyVolumeTonsBase: number
  specialtyFishIds: string[]
}

export interface PortAuctionQuote {
  port: OnpPortCriee
  fishId: string
  averageWholesaleMAD: number
  peakBidExtraMAD: number
  gradeBIndustrialMAD: number
  dailyLandingTons: number
  ma30MAD: number
  upperBandMAD: number
  lowerBandMAD: number
  volatilityPercent: number
  priceAlert: 'spike_above_band' | 'dip_below_band' | 'within_band'
}

export interface TimeSeriesPoint {
  index: number
  label: string
  spotMAD: number
  ma30MAD: number
  upperBandMAD: number
  lowerBandMAD: number
  volumeTons: number
}

export interface ArbitrageResult {
  sourcePort: OnpPortCriee
  targetPort: OnpPortCriee
  sourcePriceMAD: number
  targetPriceMAD: number
  grossSpreadMADPerKg: number
  distanceKm: number
  coldChainCostMADPerKg: number
  netProfitMADPerKg: number
  totalNetMarginMAD: number
  roiPercent: number
  profitable: boolean
}

/**
 * All 22 official Office National des Pêches (ONP) coastal Halles au poisson across Morocco.
 */
export const ONP_22_PORTS: OnpPortCriee[] = [
  {
    id: 'nador',
    code: 'ONP-01',
    nameAr: 'بني نصار / الناظور',
    nameFr: 'Beni Ensar / Nador',
    nameEn: 'Nador (Beni Ensar)',
    regionAr: 'الشرق والريف',
    regionFr: 'Oriental',
    coast: 'mediterranean',
    lat: 35.26,
    lon: -2.93,
    priceMultiplier: 1.08,
    dailyVolumeTonsBase: 42,
    specialtyFishIds: ['crevette', 'pageot', 'dorade-royale', 'rouget'],
  },
  {
    id: 'ras-kebdana',
    code: 'ONP-02',
    nameAr: 'رأس كبدانة (رأس الماء)',
    nameFr: 'Ras Kebdana',
    nameEn: 'Ras Kebdana',
    regionAr: 'الشرق والريف',
    regionFr: 'Oriental',
    coast: 'mediterranean',
    lat: 35.14,
    lon: -2.42,
    priceMultiplier: 1.04,
    dailyVolumeTonsBase: 19,
    specialtyFishIds: ['sardine', 'pageot', 'bogue-bouga', 'poulpe'],
  },
  {
    id: 'al-hoceima',
    code: 'ONP-03',
    nameAr: 'الحسيمة',
    nameFr: 'Al Hoceima',
    nameEn: 'Al Hoceima',
    regionAr: 'الريف المتوسطي',
    regionFr: 'Rif Central',
    coast: 'mediterranean',
    lat: 35.25,
    lon: -3.93,
    priceMultiplier: 1.12,
    dailyVolumeTonsBase: 36,
    specialtyFishIds: ['merou-brun', 'dentex-merjane', 'espadon', 'sardine'],
  },
  {
    id: 'cala-iris',
    code: 'ONP-04',
    nameAr: 'كالا إيريس (بني بوفراح)',
    nameFr: 'Cala Iris',
    nameEn: 'Cala Iris',
    regionAr: 'الريف المتوسطي',
    regionFr: 'Rif Central',
    coast: 'mediterranean',
    lat: 35.15,
    lon: -4.37,
    priceMultiplier: 1.06,
    dailyVolumeTonsBase: 14,
    specialtyFishIds: ['merou-brun', 'poulpe', 'calamar', 'sar-sargo'],
  },
  {
    id: 'jebha',
    code: 'ONP-05',
    nameAr: 'الجبهة (شفشاون)',
    nameFr: 'Jebha',
    nameEn: 'Jebha',
    regionAr: 'غمارة والريف',
    regionFr: 'Chefchaouen',
    coast: 'mediterranean',
    lat: 35.21,
    lon: -4.66,
    priceMultiplier: 1.03,
    dailyVolumeTonsBase: 16,
    specialtyFishIds: ['sardine', 'bonite-sarda', 'pageot', 'rouget'],
  },
  {
    id: 'mdiq',
    code: 'ONP-06',
    nameAr: 'المضيق (تطوان)',
    nameFr: 'M’diq',
    nameEn: 'Mdiq (Tetouan)',
    regionAr: 'الشمال الغربي',
    regionFr: 'Tétouan',
    coast: 'mediterranean',
    lat: 35.68,
    lon: -5.32,
    priceMultiplier: 1.14,
    dailyVolumeTonsBase: 38,
    specialtyFishIds: ['thon-rouge', 'espadon', 'dorade-royale', 'anchois'],
  },
  {
    id: 'tanger',
    code: 'ONP-07',
    nameAr: 'طنجة (ميناء الصيد)',
    nameFr: 'Tanger',
    nameEn: 'Tangier Port',
    regionAr: 'البوغاز وطنجة',
    regionFr: 'Tanger-Tétouan',
    coast: 'atlantic',
    lat: 35.78,
    lon: -5.81,
    priceMultiplier: 1.15,
    dailyVolumeTonsBase: 64,
    specialtyFishIds: ['espadon', 'pageot', 'thon-rouge', 'bar-loup'],
  },
  {
    id: 'larache',
    code: 'ONP-08',
    nameAr: 'العرائش',
    nameFr: 'Larache',
    nameEn: 'Larache',
    regionAr: 'اللوكوس والغرب',
    regionFr: 'Loukkos',
    coast: 'atlantic',
    lat: 35.19,
    lon: -6.15,
    priceMultiplier: 0.96,
    dailyVolumeTonsBase: 78,
    specialtyFishIds: ['anchois', 'sardine', 'espadon', 'crevette'],
  },
  {
    id: 'mehdia',
    code: 'ONP-09',
    nameAr: 'المهدية (القنيطرة)',
    nameFr: 'Mehdia (Kénitra)',
    nameEn: 'Mehdia (Kenitra)',
    regionAr: 'الغرب والسبو',
    regionFr: 'Gharb',
    coast: 'atlantic',
    lat: 34.26,
    lon: -6.66,
    priceMultiplier: 0.98,
    dailyVolumeTonsBase: 52,
    specialtyFishIds: ['courbine', 'sardine', 'sole', 'mulet'],
  },
  {
    id: 'sale',
    code: 'ONP-10',
    nameAr: 'سلا / الرباط',
    nameFr: 'Salé / Rabat',
    nameEn: 'Sale / Rabat',
    regionAr: 'الرباط سلا القنيطرة',
    regionFr: 'Rabat-Salé',
    coast: 'atlantic',
    lat: 34.04,
    lon: -6.83,
    priceMultiplier: 1.18,
    dailyVolumeTonsBase: 28,
    specialtyFishIds: ['merlan', 'sole', 'bar-loup', 'rouget'],
  },
  {
    id: 'mohammedia',
    code: 'ONP-11',
    nameAr: 'المحمدية',
    nameFr: 'Mohammedia',
    nameEn: 'Mohammedia',
    regionAr: 'الدار البيضاء الكبرى',
    regionFr: 'Grand Casablanca',
    coast: 'atlantic',
    lat: 33.71,
    lon: -7.39,
    priceMultiplier: 1.16,
    dailyVolumeTonsBase: 34,
    specialtyFishIds: ['merlan', 'sardine', 'crevette', 'calamar'],
  },
  {
    id: 'casablanca',
    code: 'ONP-12',
    nameAr: 'الدار البيضاء (سوق الجملة بالمرسى)',
    nameFr: 'Casablanca (Halle ONP)',
    nameEn: 'Casablanca ONP',
    regionAr: 'الدار البيضاء الكبرى',
    regionFr: 'Grand Casablanca',
    coast: 'atlantic',
    lat: 33.6,
    lon: -7.62,
    priceMultiplier: 1.22,
    dailyVolumeTonsBase: 145,
    specialtyFishIds: ['merlan', 'sole', 'courbine', 'crevette'],
  },
  {
    id: 'el-jadida',
    code: 'ONP-13',
    nameAr: 'الجديدة / الجرف الأصفر',
    nameFr: 'El Jadida / Jorf Lasfar',
    nameEn: 'El Jadida',
    regionAr: 'دكالة',
    regionFr: 'Doukkala',
    coast: 'atlantic',
    lat: 33.25,
    lon: -8.5,
    priceMultiplier: 0.95,
    dailyVolumeTonsBase: 58,
    specialtyFishIds: ['sardine', 'maquereau', 'sar-sargo', 'congre'],
  },
  {
    id: 'safi',
    code: 'ONP-14',
    nameAr: 'آسفي',
    nameFr: 'Safi',
    nameEn: 'Safi',
    regionAr: 'عبدة',
    regionFr: 'Abda',
    coast: 'atlantic',
    lat: 32.3,
    lon: -9.24,
    priceMultiplier: 0.84,
    dailyVolumeTonsBase: 280,
    specialtyFishIds: ['sardine', 'maquereau', 'anchois', 'raie'],
  },
  {
    id: 'essaouira',
    code: 'ONP-15',
    nameAr: 'الصويرة (موكادور)',
    nameFr: 'Essaouira',
    nameEn: 'Essaouira',
    regionAr: 'حاحا وموكادور',
    regionFr: 'Mogador',
    coast: 'atlantic',
    lat: 31.51,
    lon: -9.77,
    priceMultiplier: 0.88,
    dailyVolumeTonsBase: 115,
    specialtyFishIds: ['sardine', 'merlan', 'sabre', 'congre'],
  },
  {
    id: 'agadir',
    code: 'ONP-16',
    nameAr: 'أكادير (أنزا)',
    nameFr: 'Agadir (Anza)',
    nameEn: 'Agadir (Anza)',
    regionAr: 'سوس ماسة',
    regionFr: 'Souss-Massa',
    coast: 'atlantic',
    lat: 30.42,
    lon: -9.61,
    priceMultiplier: 0.92,
    dailyVolumeTonsBase: 320,
    specialtyFishIds: ['sole', 'merlan', 'calamar', 'sardine'],
  },
  {
    id: 'sidi-ifni',
    code: 'ONP-17',
    nameAr: 'سيدي إفني',
    nameFr: 'Sidi Ifni',
    nameEn: 'Sidi Ifni',
    regionAr: 'كلميم واد نون',
    regionFr: 'Guelmim-Oued Noun',
    coast: 'atlantic',
    lat: 29.38,
    lon: -10.17,
    priceMultiplier: 0.86,
    dailyVolumeTonsBase: 95,
    specialtyFishIds: ['courbine', 'sar-tambour', 'sardine', 'poulpe'],
  },
  {
    id: 'tan-tan',
    code: 'ONP-18',
    nameAr: 'طانطان (الوطية)',
    nameFr: 'Tan-Tan (El Ouatia)',
    nameEn: 'Tan-Tan (El Ouatia)',
    regionAr: 'كلميم واد نون',
    regionFr: 'Guelmim-Oued Noun',
    coast: 'atlantic',
    lat: 28.5,
    lon: -11.33,
    priceMultiplier: 0.81,
    dailyVolumeTonsBase: 390,
    specialtyFishIds: ['poulpe', 'sardine', 'courbine', 'seiche'],
  },
  {
    id: 'tarfaya',
    code: 'ONP-19',
    nameAr: 'طرفاية',
    nameFr: 'Tarfaya',
    nameEn: 'Tarfaya',
    regionAr: 'العيون الساقية الحمراء',
    regionFr: 'Laâyoune-Sakia El Hamra',
    coast: 'atlantic',
    lat: 27.94,
    lon: -12.92,
    priceMultiplier: 0.79,
    dailyVolumeTonsBase: 140,
    specialtyFishIds: ['courbine', 'poulpe', 'dorade-grise', 'sole'],
  },
  {
    id: 'laayoune',
    code: 'ONP-20',
    nameAr: 'العيون (المرسى)',
    nameFr: 'Laâyoune (El Marsa)',
    nameEn: 'Laayoune (El Marsa)',
    regionAr: 'العيون الساقية الحمراء',
    regionFr: 'Laâyoune-Sakia El Hamra',
    coast: 'atlantic',
    lat: 27.09,
    lon: -13.42,
    priceMultiplier: 0.77,
    dailyVolumeTonsBase: 620,
    specialtyFishIds: ['sardine', 'poulpe', 'crevette', 'chinchard'],
  },
  {
    id: 'boujdour',
    code: 'ONP-21',
    nameAr: 'بوجدور',
    nameFr: 'Boujdour',
    nameEn: 'Boujdour',
    regionAr: 'العيون الساقية الحمراء',
    regionFr: 'Laâyoune-Sakia El Hamra',
    coast: 'atlantic',
    lat: 26.13,
    lon: -14.48,
    priceMultiplier: 0.76,
    dailyVolumeTonsBase: 210,
    specialtyFishIds: ['poulpe', 'courbine', 'seiche', 'congre'],
  },
  {
    id: 'dakhla',
    code: 'ONP-22',
    nameAr: 'الداخلة (وادي الذهب)',
    nameFr: 'Dakhla',
    nameEn: 'Dakhla',
    regionAr: 'الداخلة وادي الذهب',
    regionFr: 'Dakhla-Oued Ed-Dahab',
    coast: 'atlantic',
    lat: 23.71,
    lon: -15.93,
    priceMultiplier: 0.72,
    dailyVolumeTonsBase: 740,
    specialtyFishIds: ['poulpe', 'courbine', 'sardine', 'langouste-royale'],
  },
]

/**
 * Computes wholesale auction quotes across all 22 ONP Halles au poisson for a selected species.
 */
export function buildAll22PortQuotesForFish(fish: Fish): PortAuctionQuote[] {
  const baseWholesale = Math.max(8, Math.round(fish.pricing.currentSpotMAD * 0.76))
  const past6 = fish.pricing.past6MonthsMAD
  const meanPast =
    past6.reduce((sum, v) => sum + v, 0) / Math.max(1, past6.length) * 0.76
  const variance =
    past6.reduce((sum, v) => sum + Math.pow(v * 0.76 - meanPast, 2), 0) /
    Math.max(1, past6.length)
  const stdDev = Math.max(1.5, Math.sqrt(variance))

  return ONP_22_PORTS.map((port, idx) => {
    const isSpecialty = port.specialtyFishIds.includes(fish.id)
    const specialtyDiscount = isSpecialty ? 0.91 : 1.03
    const averageWholesaleMAD = Math.max(
      6,
      Math.round(baseWholesale * port.priceMultiplier * specialtyDiscount)
    )
    const peakBidExtraMAD = Math.round(averageWholesaleMAD * 1.24)
    const gradeBIndustrialMAD = Math.max(4, Math.round(averageWholesaleMAD * 0.68))

    const ma30MAD = Math.max(6, Math.round(meanPast * port.priceMultiplier))
    const bandWidth = Math.max(2, Math.round(stdDev * 1.5 * port.priceMultiplier))
    const upperBandMAD = ma30MAD + bandWidth
    const lowerBandMAD = Math.max(4, ma30MAD - bandWidth)
    const volatilityPercent = Math.round((bandWidth / Math.max(1, ma30MAD)) * 100)

    const priceAlert: PortAuctionQuote['priceAlert'] =
      averageWholesaleMAD > upperBandMAD
        ? 'spike_above_band'
        : averageWholesaleMAD < lowerBandMAD
        ? 'dip_below_band'
        : 'within_band'

    const speciesShare = isSpecialty ? 0.22 : 0.08 + ((idx % 5) * 0.015)
    const dailyLandingTons = Number((port.dailyVolumeTonsBase * speciesShare).toFixed(1))

    return {
      port,
      fishId: fish.id,
      averageWholesaleMAD,
      peakBidExtraMAD,
      gradeBIndustrialMAD,
      dailyLandingTons,
      ma30MAD,
      upperBandMAD,
      lowerBandMAD,
      volatilityPercent,
      priceAlert,
    }
  })
}

/**
 * Generates interactive time-series data for 7d, 30d, or 1y with 30-day moving average and volatility bands.
 */
export function buildWholesaleTimeSeries(
  fish: Fish,
  port: OnpPortCriee,
  range: TimeRangeKey
): TimeSeriesPoint[] {
  const quote = buildAll22PortQuotesForFish(fish).find((q) => q.port.id === port.id)!
  const count = range === '7d' ? 7 : range === '30d' ? 15 : 12

  const points: TimeSeriesPoint[] = []
  for (let i = 0; i < count; i++) {
    const progress = i / Math.max(1, count - 1)
    const wave = Math.sin(progress * Math.PI * 2.5 + port.lat * 0.3) * (quote.upperBandMAD - quote.ma30MAD) * 0.85
    const trendDrift =
      fish.pricing.trend === 'up'
        ? (progress - 0.5) * 5
        : fish.pricing.trend === 'down'
        ? (0.5 - progress) * 5
        : 0

    const ma30MAD = Math.max(5, Math.round(quote.ma30MAD + trendDrift * 0.6))
    const bandHalf = Math.max(2, Math.round((quote.upperBandMAD - quote.lowerBandMAD) / 2))
    const spotMAD = Math.max(
      4,
      i === count - 1 ? quote.averageWholesaleMAD : Math.round(ma30MAD + wave)
    )

    const label =
      range === '7d'
        ? `J-${count - 1 - i}`
        : range === '30d'
        ? `J-${(count - 1 - i) * 2}`
        : `M${i + 1}`

    points.push({
      index: i,
      label: i === count - 1 ? 'Direct' : label,
      spotMAD,
      ma30MAD,
      upperBandMAD: ma30MAD + bandHalf,
      lowerBandMAD: Math.max(3, ma30MAD - bandHalf),
      volumeTons: Number((quote.dailyLandingTons * (0.85 + Math.cos(i) * 0.2)).toFixed(1)),
    })
  }
  return points
}

/**
 * Computes B2B wholesale arbitrage between two ONP landing ports (e.g., Dakhla vs Casablanca vs Nador).
 */
export function calculateRegionalArbitrage(params: {
  fish: Fish
  sourcePortId: string
  targetPortId: string
  quantityKg: number
}): ArbitrageResult {
  const quotes = buildAll22PortQuotesForFish(params.fish)
  const sourceQuote = quotes.find((q) => q.port.id === params.sourcePortId) || quotes[21]! // Dakhla default
  const targetQuote = quotes.find((q) => q.port.id === params.targetPortId) || quotes[11]! // Casablanca default

  const dLat = (targetQuote.port.lat - sourceQuote.port.lat) * 111
  const dLon =
    (targetQuote.port.lon - sourceQuote.port.lon) *
    111 *
    Math.cos(((targetQuote.port.lat + sourceQuote.port.lat) / 2) * (Math.PI / 180))
  const roadDistanceKm = Math.max(25, Math.round(Math.sqrt(dLat * dLat + dLon * dLon) * 1.28))

  // Cold-chain refrigerated truck + ONP crate/ice fee: ~1.8 MAD base + 0.0045 MAD/km per kg
  const coldChainCostMADPerKg = Number((1.8 + roadDistanceKm * 0.0045).toFixed(2))
  const grossSpreadMADPerKg = Number(
    (targetQuote.averageWholesaleMAD - sourceQuote.averageWholesaleMAD).toFixed(2)
  )
  const netProfitMADPerKg = Number((grossSpreadMADPerKg - coldChainCostMADPerKg).toFixed(2))
  const totalNetMarginMAD = Math.round(netProfitMADPerKg * params.quantityKg)
  const totalCostPerKg = sourceQuote.averageWholesaleMAD + coldChainCostMADPerKg
  const roiPercent = Number(((netProfitMADPerKg / Math.max(1, totalCostPerKg)) * 100).toFixed(1))

  return {
    sourcePort: sourceQuote.port,
    targetPort: targetQuote.port,
    sourcePriceMAD: sourceQuote.averageWholesaleMAD,
    targetPriceMAD: targetQuote.averageWholesaleMAD,
    grossSpreadMADPerKg,
    distanceKm: roadDistanceKm,
    coldChainCostMADPerKg,
    netProfitMADPerKg,
    totalNetMarginMAD,
    roiPercent,
    profitable: netProfitMADPerKg > 0,
  }
}

/**
 * Generates CSV string for all 22 ONP port quotes of a given species.
 */
export function exportQuotesToCsv(fish: Fish, quotes: PortAuctionQuote[]): string {
  const header = [
    'ONP_Code',
    'Port_FR',
    'Port_AR',
    'Coast',
    'Species_ID',
    'Species_FR',
    'Avg_Wholesale_MAD_kg',
    'Peak_Extra_Bid_MAD_kg',
    'Industrial_GradeB_MAD_kg',
    'MA30_MAD_kg',
    'Upper_Band_MAD_kg',
    'Lower_Band_MAD_kg',
    'Daily_Landing_Tons',
    'Price_Alert',
  ].join(',')

  const rows = quotes.map((q) =>
    [
      q.port.code,
      `"${q.port.nameFr}"`,
      `"${q.port.nameAr}"`,
      q.port.coast,
      fish.id,
      `"${fish.nameFrench}"`,
      q.averageWholesaleMAD,
      q.peakBidExtraMAD,
      q.gradeBIndustrialMAD,
      q.ma30MAD,
      q.upperBandMAD,
      q.lowerBandMAD,
      q.dailyLandingTons,
      q.priceAlert,
    ].join(',')
  )

  return [header, ...rows].join('\n')
}

export function getPortDisplayName(port: OnpPortCriee, lang: SupportedLanguage): string {
  return lang === 'ar' ? port.nameAr : lang === 'fr' ? port.nameFr : port.nameEn
}

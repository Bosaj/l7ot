import type { SupportedLanguage } from '../i18n/strings'

export type SafetyColor = 'green' | 'yellow' | 'red'

export interface DiveSpot {
  id: string
  nameAr: string
  nameFr: string
  nameEn: string
  basin: 'gibraltar' | 'mediterranean' | 'atlantic_north' | 'atlantic_center' | 'souss_sahara'
  basinLabel: { ar: string; fr: string; en: string }
  lat: number
  lon: number
  depthRangeMeters: [number, number]
  bottomType: { ar: string; fr: string; en: string }
  targetSpecies: { ar: string[]; fr: string[]; en: string[] }
  baseSwellMeters: number
  basePeriodSeconds: number
  baseWindKnots: number
  baseKd490: number // Diffuse attenuation coefficient at 490nm (m^-1), typical 0.04 (crystal) to 0.35 (turbid)
  baseSstCelsius: number
}

export interface ForecastHourPoint {
  hourOffset: number // 0 to 72
  timestampIso: string
  label: string
  swellHeightM: number
  wavePeriodS: number
  windSpeedKt: number
  kd490: number
  visibilityMeters: number
  sstCelsius: number
  tidalCoefficient: number
  tideState: 'high' | 'rising' | 'low' | 'ebbing'
  safetyScore: number // 1-10
  safetyColor: SafetyColor
}

export interface DiveSpotForecast {
  spot: DiveSpot
  current: ForecastHourPoint
  nextHighTide: string
  nextLowTide: string
  tidalCoefficient: number
  safetyVerdict: {
    color: SafetyColor
    score: number
    badgeAr: string
    badgeFr: string
    badgeEn: string
    adviceAr: string
    adviceFr: string
    adviceEn: string
  }
  timeline72h: ForecastHourPoint[]
}

export const MOROCCAN_DIVE_SPOTS: DiveSpot[] = [
  {
    id: 'belyounech',
    nameAr: 'بليونش (جبل موسى)',
    nameFr: 'Belyounech (Jbel Moussa)',
    nameEn: 'Belyounech (Mount Moses)',
    basin: 'gibraltar',
    basinLabel: { ar: 'مضيق جبل طارق', fr: 'Détroit de Gibraltar', en: 'Strait of Gibraltar' },
    lat: 35.908,
    lon: -5.394,
    depthRangeMeters: [5, 32],
    bottomType: {
      ar: 'جروف صخرية عميقة وكهوف مرجانية بتيارات أطلسية-متوسطية',
      fr: 'Tombants rocheux profonds & grottes à courant',
      en: 'Deep rocky drop-offs & current-swept caves',
    },
    targetSpecies: {
      ar: ['الميرو الأسمر', 'الباجو الملكي', 'الدرعي', 'الأخطبوط'],
      fr: ['Mérou brun', 'Daurade royale', 'Bar / Loup', 'Poulpe'],
      en: ['Dusky Grouper', 'Gilthead Seabream', 'European Seabass', 'Octopus'],
    },
    baseSwellMeters: 0.9,
    basePeriodSeconds: 7.5,
    baseWindKnots: 12,
    baseKd490: 0.06,
    baseSstCelsius: 18.4,
  },
  {
    id: 'tanger-med',
    nameAr: 'طنجة المتوسط (القصر الصغير)',
    nameFr: 'Tanger Med (Ksar Sghir)',
    nameEn: 'Tanger Med (Ksar Sghir)',
    basin: 'gibraltar',
    basinLabel: { ar: 'مضيق جبل طارق', fr: 'Détroit de Gibraltar', en: 'Strait of Gibraltar' },
    lat: 35.885,
    lon: -5.512,
    depthRangeMeters: [6, 28],
    bottomType: {
      ar: 'صفائح صخرية وممرات تيارات المد والجزر القوية',
      fr: 'Dalles rocheuses & veines de courant de marée',
      en: 'Rocky ledges & strong tidal current channels',
    },
    targetSpecies: {
      ar: ['الدرعي', 'القرب (الكوربين)', 'الشرغو', 'بيسبادا'],
      fr: ['Bar', 'Courbine', 'Sar commun', 'Espadon'],
      en: ['Seabass', 'Meagre', 'White Seabream', 'Swordfish'],
    },
    baseSwellMeters: 1.2,
    basePeriodSeconds: 8.2,
    baseWindKnots: 15,
    baseKd490: 0.08,
    baseSstCelsius: 18.1,
  },
  {
    id: 'cabo-negro',
    nameAr: 'كابو نيغرو (الرأس الأسود - تطوان)',
    nameFr: 'Cabo Negro (Tétouan)',
    nameEn: 'Cabo Negro (Tetouan)',
    basin: 'mediterranean',
    basinLabel: { ar: 'الواجهة المتوسطية الغربية', fr: 'Méditerranée Occidentale', en: 'Western Mediterranean' },
    lat: 35.684,
    lon: -5.276,
    depthRangeMeters: [4, 22],
    bottomType: {
      ar: 'صخور ساحلية مغطاة بأعشاب البوسيدونيا ومياه صافية',
      fr: 'Herbiers de posidonie & enrochements clairs',
      en: 'Posidonia seagrass beds & clear rocky reefs',
    },
    targetSpecies: {
      ar: ['الشرغو', 'الزريقة', 'البوري', 'الروبيو'],
      fr: ['Sar', 'Dorade royale', 'Mulet', 'Rouget de roche'],
      en: ['Seabream', 'Gilthead Bream', 'Mullet', 'Red Mullet'],
    },
    baseSwellMeters: 0.6,
    basePeriodSeconds: 6.0,
    baseWindKnots: 9,
    baseKd490: 0.05,
    baseSstCelsius: 19.6,
  },
  {
    id: 'al-hoceima',
    nameAr: 'الحسيمة (كالا إيريس وجزيرة بادس)',
    nameFr: 'Al Hoceima (Cala Iris & Bades)',
    nameEn: 'Al Hoceima (Cala Iris)',
    basin: 'mediterranean',
    basinLabel: { ar: 'الحوض المتوسطي - الريف', fr: 'Parc National d’Al Hoceima', en: 'Al Hoceima Marine Park' },
    lat: 35.152,
    lon: -4.368,
    depthRangeMeters: [5, 35],
    bottomType: {
      ar: 'أقواس صخرية بركانية ومياه بلورية عالية الشفافية',
      fr: 'Arches rocheuses volcaniques & eaux cristallines',
      en: 'Volcanic rock arches & crystal-clear waters',
    },
    targetSpecies: {
      ar: ['الميرو', 'المرجان (الدانتي)', 'السيبيا', 'الكلمار'],
      fr: ['Mérou', 'Denté commun', 'Seiche', 'Calmar'],
      en: ['Grouper', 'Common Dentex', 'Cuttlefish', 'Squid'],
    },
    baseSwellMeters: 0.5,
    basePeriodSeconds: 5.8,
    baseWindKnots: 8,
    baseKd490: 0.04,
    baseSstCelsius: 20.1,
  },
  {
    id: 'ras-el-ma',
    nameAr: 'رأس الماء (قابوياوا - الناظور)',
    nameFr: 'Ras El Ma (Cap de l’Eau - Nador)',
    nameEn: 'Ras El Ma (Cap de l’Eau)',
    basin: 'mediterranean',
    basinLabel: { ar: 'الواجهة المتوسطية الشرقية', fr: 'Méditerranée Orientale', en: 'Eastern Mediterranean' },
    lat: 35.141,
    lon: -2.423,
    depthRangeMeters: [4, 26],
    bottomType: {
      ar: 'جرف صخري ثلاثي ومنحدرات رملية-صخرية غنية بالقشريات',
      fr: 'Falaises calcaires & fonds sablo-rocheux',
      en: 'Limestone cliffs & sandy-rocky drop-offs',
    },
    targetSpecies: {
      ar: ['الباجو', 'الكروفيت الملكي', 'البوقة', 'الميرو'],
      fr: ['Pageot', 'Crevette royale', 'Bogue', 'Mérou'],
      en: ['Pandora', 'King Prawn', 'Bogue', 'Grouper'],
    },
    baseSwellMeters: 0.7,
    basePeriodSeconds: 6.4,
    baseWindKnots: 11,
    baseKd490: 0.06,
    baseSstCelsius: 19.9,
  },
  {
    id: 'cap-spartel',
    nameAr: 'رأس سبارطيل (مغارة هرقل - طنجة)',
    nameFr: 'Cap Spartel (Grottes d’Hercule)',
    nameEn: 'Cap Spartel (Hercules Caves)',
    basin: 'gibraltar',
    basinLabel: { ar: 'ملتقى الأطلسي والمتوسط', fr: 'Jonction Atlantique-Méditerranée', en: 'Atlantic-Med Confluence' },
    lat: 35.792,
    lon: -5.924,
    depthRangeMeters: [6, 25],
    bottomType: {
      ar: 'صخور أطلسية ضخمة ومصبات تيارات باردة غنية بالأسماك السطحية',
      fr: 'Blocs granitiques & courants d’upwelling',
      en: 'Granite boulders & cold upwelling currents',
    },
    targetSpecies: {
      ar: ['الدرعي الأطلسي', 'الشرغو الكبير', 'البونيتو', 'الفرخ'],
      fr: ['Bar atlantique', 'Sar tambour', 'Bonite', 'Congre'],
      en: ['Atlantic Bass', 'Zebra Seabream', 'Bonito', 'Conger Eel'],
    },
    baseSwellMeters: 1.5,
    basePeriodSeconds: 9.8,
    baseWindKnots: 14,
    baseKd490: 0.11,
    baseSstCelsius: 17.9,
  },
  {
    id: 'moulay-bousselham',
    nameAr: 'مولاي بوسلهام (المرجة الزرقاء)',
    nameFr: 'Moulay Bousselham (Merja Zerga)',
    nameEn: 'Moulay Bousselham',
    basin: 'atlantic_north',
    basinLabel: { ar: 'الأطلسي الشمالي - الغرب', fr: 'Atlantique Nord (Gharb)', en: 'North Atlantic (Gharb)' },
    lat: 34.878,
    lon: -6.294,
    depthRangeMeters: [3, 18],
    bottomType: {
      ar: 'مصب بحيري وصخور ساحلية (الفيلا) غنية بالقرب والدرعي',
      fr: 'Passe lagunaire & platiers rocheux côtiers',
      en: 'Lagoon inlet & coastal rocky flats',
    },
    targetSpecies: {
      ar: ['القرب (الكوربين)', 'الدرعي', 'الصول', 'البوري'],
      fr: ['Courbine', 'Bar', 'Sole', 'Mulet'],
      en: ['Meagre', 'Seabass', 'Dover Sole', 'Grey Mullet'],
    },
    baseSwellMeters: 1.8,
    basePeriodSeconds: 10.5,
    baseWindKnots: 13,
    baseKd490: 0.16,
    baseSstCelsius: 18.2,
  },
  {
    id: 'bouznika',
    nameAr: 'بوزنيقة (القصبة والداخلة الصخرية)',
    nameFr: 'Bouznika (Kasbah & Récifs)',
    nameEn: 'Bouznika Reefs',
    basin: 'atlantic_center',
    basinLabel: { ar: 'الأطلسي الأوسط - الشاوية', fr: 'Atlantique Central', en: 'Central Atlantic' },
    lat: 33.796,
    lon: -7.161,
    depthRangeMeters: [3, 16],
    bottomType: {
      ar: 'أحواض صخرية محمية طبيعياً وشقوق غنية بالأخطبوط والشرغو',
      fr: 'Cuvettes rocheuses abritées & failles à sars',
      en: 'Sheltered rocky coves & seabream crevices',
    },
    targetSpecies: {
      ar: ['الشرغو', 'الأخطبوط', 'الفرخ (الصنور)', 'بوزروك'],
      fr: ['Sar', 'Poulpe', 'Congre', 'Moules'],
      en: ['White Seabream', 'Octopus', 'Conger', 'Mussels'],
    },
    baseSwellMeters: 1.4,
    basePeriodSeconds: 10.2,
    baseWindKnots: 10,
    baseKd490: 0.12,
    baseSstCelsius: 18.7,
  },
  {
    id: 'oualidia',
    nameAr: 'الواليدية (البحيرة والحاجز الصخري)',
    nameFr: 'Oualidia (Lagune & Brise-lames)',
    nameEn: 'Oualidia Lagoon & Reef',
    basin: 'atlantic_center',
    basinLabel: { ar: 'الأطلسي الأوسط - دكالة', fr: 'Atlantique Doukkala', en: 'Doukkala Atlantic' },
    lat: 32.734,
    lon: -9.042,
    depthRangeMeters: [2, 15],
    bottomType: {
      ar: 'بحيرة شاطئية هادئة محمية بحزام صخري طبيعي من أمواج المحيط',
      fr: 'Lagune abritée par une barre rocheuse naturelle',
      en: 'Calm lagoon shielded by a natural rock barrier',
    },
    targetSpecies: {
      ar: ['الزريقة الملكية', 'الصول', 'بوجنبة (العنكبوت البحري)', 'المحار'],
      fr: ['Dorade royale', 'Sole', 'Araignée de mer', 'Huîtres'],
      en: ['Gilthead Bream', 'Sole', 'Spider Crab', 'Oysters'],
    },
    baseSwellMeters: 1.3,
    basePeriodSeconds: 9.6,
    baseWindKnots: 11,
    baseKd490: 0.1,
    baseSstCelsius: 18.5,
  },
  {
    id: 'safi-beddouza',
    nameAr: 'رأس بدوزة (آسفي)',
    nameFr: 'Cap Beddouza (Safi)',
    nameEn: 'Cap Beddouza (Safi)',
    basin: 'atlantic_center',
    basinLabel: { ar: 'ساحل عبدة - الصعود المائي', fr: 'Côte Abda (Upwelling)', en: 'Abda Upwelling Coast' },
    lat: 32.545,
    lon: -9.279,
    depthRangeMeters: [5, 24],
    bottomType: {
      ar: 'منحدرات كلسية ومياه باردة غنية بالمغذيات والأسماك الكبيرة',
      fr: 'Plateaux calcaires & eaux froides riches en nutriments',
      en: 'Limestone ledges & nutrient-rich cold upwelling water',
    },
    targetSpecies: {
      ar: ['القرب الملكي', 'الشرغو الحداد', 'الراية', 'سردين آسفي'],
      fr: ['Courbine royale', 'Sar tambour', 'Raie', 'Sardine'],
      en: ['Royal Meagre', 'Zebra Seabream', 'Skate', 'Sardine'],
    },
    baseSwellMeters: 1.9,
    basePeriodSeconds: 11.0,
    baseWindKnots: 16,
    baseKd490: 0.14,
    baseSstCelsius: 17.5,
  },
  {
    id: 'taghazout',
    nameAr: 'تغازوت وأورير (أنزا - أكادير)',
    nameFr: 'Taghazout & Aourir (Agadir)',
    nameEn: 'Taghazout & Aourir (Agadir)',
    basin: 'souss_sahara',
    basinLabel: { ar: 'حوض سوس ماسة الأطلسي', fr: 'Bassin Souss-Massa', en: 'Souss-Massa Basin' },
    lat: 30.545,
    lon: -9.711,
    depthRangeMeters: [4, 22],
    bottomType: {
      ar: 'رؤوس صخرية متدرجة وأعماق رملية-صخرية معتدلة الحرارة',
      fr: 'Pointes rocheuses & fonds mixtes sablo-rocheux',
      en: 'Rocky points & mixed sand-reef bottoms',
    },
    targetSpecies: {
      ar: ['الصول', 'القرب', 'أمان إيغلبن (السرغو السوسي)', 'السيبيا'],
      fr: ['Sole', 'Courbine', 'Sar du Souss', 'Seiche'],
      en: ['Sole', 'Meagre', 'Souss Seabream', 'Cuttlefish'],
    },
    baseSwellMeters: 1.4,
    basePeriodSeconds: 10.4,
    baseWindKnots: 11,
    baseKd490: 0.09,
    baseSstCelsius: 19.3,
  },
  {
    id: 'mirleft',
    nameAr: 'ميرلفت (أكلو وسيدي محمد بن عبد الله)',
    nameFr: 'Mirleft (Aglou & Falaises)',
    nameEn: 'Mirleft Cliffs & Coves',
    basin: 'souss_sahara',
    basinLabel: { ar: 'ساحل تيزنيت - آيت باعمران', fr: 'Côte Tiznit - Aït Baâmrane', en: 'Tiznit - Ait Baamrane Coast' },
    lat: 29.581,
    lon: -10.038,
    depthRangeMeters: [5, 25],
    bottomType: {
      ar: 'خلجان صخرية محصنة وجروف غنية بالشرغو الملكي والقرب',
      fr: 'Criques encaissées & tombants riches en courbines',
      en: 'Sheltered cliff coves & rich meagre drop-offs',
    },
    targetSpecies: {
      ar: ['القرب (أزاغار)', 'الشرغو الكبير', 'الدرعي', 'الأخطبوط'],
      fr: ['Courbine', 'Gros Sar', 'Bar moucheté', 'Poulpe'],
      en: ['Meagre', 'Large Seabream', 'Spotted Bass', 'Octopus'],
    },
    baseSwellMeters: 1.6,
    basePeriodSeconds: 10.8,
    baseWindKnots: 12,
    baseKd490: 0.1,
    baseSstCelsius: 19.0,
  },
  {
    id: 'sidi-ifni',
    nameAr: 'سيدي إفني (أقواس الكزيرة)',
    nameFr: 'Sidi Ifni (Arches de Legzira)',
    nameEn: 'Sidi Ifni (Legzira Arches)',
    basin: 'souss_sahara',
    basinLabel: { ar: 'الأطلسي الجنوبي - الكزيرة', fr: 'Atlantique Sud (Legzira)', en: 'South Atlantic (Legzira)' },
    lat: 29.445,
    lon: -10.116,
    depthRangeMeters: [4, 24],
    bottomType: {
      ar: 'تكوينات صخرية حمراء ومغارات تحت مائية غنية بالأسماك القاعية',
      fr: 'Formations de grès rouge & grottes sous-marines',
      en: 'Red sandstone formations & underwater caverns',
    },
    targetSpecies: {
      ar: ['القرب', 'أومبرين (المعزة)', 'الباجو', 'اللانغوست'],
      fr: ['Courbine', 'Ombrine', 'Pageot', 'Langouste'],
      en: ['Meagre', 'Umbrina', 'Pandora', 'Spiny Lobster'],
    },
    baseSwellMeters: 1.7,
    basePeriodSeconds: 11.2,
    baseWindKnots: 14,
    baseKd490: 0.12,
    baseSstCelsius: 18.9,
  },
  {
    id: 'dakhla',
    nameAr: 'الداخلة (لاساركا وفم البوير)',
    nameFr: 'Dakhla (Lassarga & Foum El Bouir)',
    nameEn: 'Dakhla (Lassarga Peninsula)',
    basin: 'souss_sahara',
    basinLabel: { ar: 'وادي الذهب - الأطلسي الصحراوي', fr: 'Oued Ed-Dahab (Sahara)', en: 'Oued Ed-Dahab (Sahara)' },
    lat: 23.652,
    lon: -15.961,
    depthRangeMeters: [3, 28],
    bottomType: {
      ar: 'التقاء خليج الداخلة الهادئ بالمحيط الأطلسي الغني بالكوربين الملكي',
      fr: 'Pointe océanique & embouchure de la baie de Dakhla',
      en: 'Ocean peninsula & Dakhla bay mouth',
    },
    targetSpecies: {
      ar: ['الكوربين الصحراوي', 'الأخطبوط الملكي', 'الشخار', 'التونة'],
      fr: ['Courbine royale', 'Poulpe de Dakhla', 'Diagramme', 'Thon'],
      en: ['Royal Meagre', 'Dakhla Octopus', 'Sweetlips', 'Tuna'],
    },
    baseSwellMeters: 1.1,
    basePeriodSeconds: 9.2,
    baseWindKnots: 15,
    baseKd490: 0.07,
    baseSstCelsius: 20.5,
  },
]

/**
 * Computes underwater horizontal visibility in meters from Copernicus Kd490 diffuse attenuation index (m^-1)
 * and swell agitation.
 */
export function computeVisibilityFromKd490(kd490: number, swellHeightM: number): number {
  const safeKd = Math.max(0.03, Math.min(0.45, kd490))
  // Empirical Secchi / horizontal diver visibility approximation: Z_vis ≈ 1.45 / Kd490 adjusted by swell resuspension
  const rawVis = 1.15 / safeKd - swellHeightM * 1.6
  return Number(Math.max(1.5, Math.min(22, rawVis)).toFixed(1))
}

/**
 * Algorithmic 1–10 Spearfishing & Free-Diving Safety Index based on visibility, swell height, period, and wind.
 */
export function computeSpearfishingSafetyScore(params: {
  swellHeightM: number
  wavePeriodS: number
  windSpeedKt: number
  visibilityMeters: number
}): { score: number; color: SafetyColor } {
  const { swellHeightM, wavePeriodS, windSpeedKt, visibilityMeters } = params

  // Swell penalty (0 to 4.5 pts)
  const swellPenalty = Math.max(0, (swellHeightM - 0.5) * 1.9)
  // Long-period groundswell surge penalty
  const periodPenalty = wavePeriodS > 11 ? (wavePeriodS - 11) * 0.35 : 0
  // Wind chop penalty
  const windPenalty = windSpeedKt > 10 ? (windSpeedKt - 10) * 0.14 : 0
  // Visibility bonus/penalty
  const visAdjustment = visibilityMeters >= 10 ? 0.8 : visibilityMeters < 5 ? -1.8 : 0

  const rawScore = 9.4 - swellPenalty - periodPenalty - windPenalty + visAdjustment
  const score = Number(Math.max(1, Math.min(10, rawScore)).toFixed(1))

  const color: SafetyColor = score >= 7.2 ? 'green' : score >= 4.5 ? 'yellow' : 'red'
  return { score, color }
}

/**
 * Generates a complete 72-hour forecast (13 points at 6-hour intervals: 0h to +72h)
 * for any of the 14 Moroccan dive spots, optionally enriched with live Open-Meteo marine telemetry.
 */
export function buildDiveSpotForecast(
  spot: DiveSpot,
  liveOverride?: { swellHeightM?: number; wavePeriodS?: number; windSpeedKt?: number },
  referenceDate: Date = new Date()
): DiveSpotForecast {
  const baseSwell = liveOverride?.swellHeightM ?? spot.baseSwellMeters
  const basePeriod = liveOverride?.wavePeriodS ?? spot.basePeriodSeconds
  const baseWind = liveOverride?.windSpeedKt ?? spot.baseWindKnots

  // Harmonic lunar phase factor for tidal coefficient (35 to 112)
  const dayOfYear = Math.floor(
    (referenceDate.getTime() - new Date(referenceDate.getFullYear(), 0, 0).getTime()) / 86400000
  )
  const basinCoeffOffset =
    spot.basin === 'gibraltar' ? 8 : spot.basin === 'mediterranean' ? -18 : spot.basin === 'souss_sahara' ? 10 : 4

  const timeline72h: ForecastHourPoint[] = []

  for (let h = 0; h <= 72; h += 6) {
    const ptDate = new Date(referenceDate.getTime() + h * 3600 * 1000)
    const phase = (h / 24) * Math.PI * 2 + spot.lat * 0.25

    const swellDelta = Math.sin(phase * 0.65) * 0.35 + (h > 36 ? 0.15 : -0.05)
    const swellHeightM = Number(Math.max(0.3, baseSwell + swellDelta).toFixed(2))
    const wavePeriodS = Number(Math.max(4.5, basePeriod + Math.cos(phase * 0.5) * 1.1).toFixed(1))
    const windSpeedKt = Math.round(Math.max(4, baseWind + Math.sin(phase) * 4.5))

    const kd490 = Number(
      Math.max(0.035, Math.min(0.38, spot.baseKd490 + (swellHeightM - spot.baseSwellMeters) * 0.045)).toFixed(3)
    )
    const visibilityMeters = computeVisibilityFromKd490(kd490, swellHeightM)
    const sstCelsius = Number((spot.baseSstCelsius + Math.sin(phase * 0.4) * 0.4).toFixed(1))

    const rawCoeff = Math.round(
      74 + Math.sin(((dayOfYear + h / 24) / 14.76) * Math.PI * 2) * 28 + basinCoeffOffset
    )
    const tidalCoefficient = Math.max(35, Math.min(112, rawCoeff))

    const tideCycle = (h + Math.round(spot.lon)) % 12
    const tideState: ForecastHourPoint['tideState'] =
      tideCycle === 0 ? 'high' : tideCycle < 6 ? 'ebbing' : tideCycle === 6 ? 'low' : 'rising'

    const { score: safetyScore, color: safetyColor } = computeSpearfishingSafetyScore({
      swellHeightM,
      wavePeriodS,
      windSpeedKt,
      visibilityMeters,
    })

    const dayLabel = `J+${Math.floor(h / 24)} · ${String(ptDate.getHours()).padStart(2, '0')}:00`

    timeline72h.push({
      hourOffset: h,
      timestampIso: ptDate.toISOString(),
      label: h === 0 ? 'الآن / Direct' : `+${h}h (${dayLabel})`,
      swellHeightM,
      wavePeriodS,
      windSpeedKt,
      kd490,
      visibilityMeters,
      sstCelsius,
      tidalCoefficient,
      tideState,
      safetyScore,
      safetyColor,
    })
  }

  const current = timeline72h[0]!
  const { color, score } = current ? { color: current.safetyColor, score: current.safetyScore } : { color: 'green' as SafetyColor, score: 8 }

  const badgeAr =
    color === 'green'
      ? 'أخضر: بحر هادئ ومياه صافية · مثالي للغطس الحر'
      : color === 'yellow'
      ? 'أصفر: سويل متوسط · حذر للغواصين المتمرسين فقط'
      : 'أحمر: تيارات سحب خطيرة وعكارة عالية · ممنوع الغطس'

  const badgeFr =
    color === 'green'
      ? 'Vert : Mer calme & eau claire · Idéal chasse sous-marine'
      : color === 'yellow'
      ? 'Jaune : Houle modérée · Plongeurs expérimentés uniquement'
      : 'Rouge : Courants d’arrachement & visibilité nulle · Danger'

  const badgeEn =
    color === 'green'
      ? 'Green: Calm & Clear · Optimal Spearfishing Conditions'
      : color === 'yellow'
      ? 'Yellow: Moderate Swell · Experienced Divers Only'
      : 'Red: Dangerous Undertow / Zero Visibility · No Diving'

  const adviceAr =
    color === 'green'
      ? `الرؤية الأفقية تحت الماء تصل إلى ${current.visibilityMeters} متر (معامل عكارة Kd490 = ${current.kd490}). ظروف ممتازة لصيد ${spot.targetSpecies.ar.slice(0, 2).join(' و')} مع بداية المد.`
      : color === 'yellow'
      ? `علو السويل ${current.swellHeightM} متر بفترة ${current.wavePeriodS} ثانية. الرؤية ${current.visibilityMeters} متر؛ يُنصح بالغطس في الخلجان المحمية والابتعاد عن كسر الأمواج الصخري.`
      : `تحذير: السويل (${current.swellHeightM}م) والرياح (${current.windSpeedKt} عقدة) يسببان تيارات سحب قاعية وعكارة شديدة (الرؤية أقل من ${current.visibilityMeters}م). يُمنع النزول للماء.`

  const adviceFr =
    color === 'green'
      ? `Visibilité horizontale de ${current.visibilityMeters}m (Kd490 = ${current.kd490}). Excellentes conditions d’agachon pour ${spot.targetSpecies.fr.slice(0, 2).join(' et ')}.`
      : color === 'yellow'
      ? `Houle de ${current.swellHeightM}m (${current.wavePeriodS}s) et visibilité de ${current.visibilityMeters}m. Privilégiez les zones abritées et utilisez une bouée de signalisation.`
      : `Danger : Houle forte (${current.swellHeightM}m) et vent de ${current.windSpeedKt} nds générant un fort ressac et une eau trouble (${current.visibilityMeters}m). Mise à l’eau déconseillée.`

  const adviceEn =
    color === 'green'
      ? `Horizontal underwater visibility reaches ${current.visibilityMeters}m (Kd490 = ${current.kd490}). Prime conditions for ${spot.targetSpecies.en.slice(0, 2).join(' & ')}.`
      : color === 'yellow'
      ? `Swell at ${current.swellHeightM}m (${current.wavePeriodS}s) with ${current.visibilityMeters}m visibility. Stay clear of shallow surge zones and dive with a buddy.`
      : `Hazard: ${current.swellHeightM}m swell and ${current.windSpeedKt} kt winds creating dangerous undertow and high turbidity (${current.visibilityMeters}m visibility). Do not dive.`

  const baseHour = (Math.abs(Math.round(spot.lon)) + 4) % 12
  const nextHighTide = `${String(baseHour).padStart(2, '0')}:25 & ${String(baseHour + 12).padStart(2, '0')}:48`
  const nextLowTide = `${String((baseHour + 6) % 12).padStart(2, '0')}:14 & ${String(((baseHour + 6) % 12) + 12).padStart(2, '0')}:36`

  return {
    spot,
    current,
    nextHighTide,
    nextLowTide,
    tidalCoefficient: current.tidalCoefficient,
    safetyVerdict: {
      color,
      score,
      badgeAr,
      badgeFr,
      badgeEn,
      adviceAr,
      adviceFr,
      adviceEn,
    },
    timeline72h,
  }
}

export function getLocalizedSpotName(spot: DiveSpot, lang: SupportedLanguage): string {
  return lang === 'ar' ? spot.nameAr : lang === 'fr' ? spot.nameFr : spot.nameEn
}

export type FishCategory =
  | 'poisson_bleu'
  | 'poisson_blanc'
  | 'cephalopode'
  | 'crustace'
  | 'mollusque'
  | 'cartilagineux'

export type CoastType = 'atlantic' | 'mediterranean' | 'both'

export type CookingMethod =
  | 'tagine'
  | 'friture'
  | 'four'
  | 'grillade'
  | 'pil_pil'
  | 'soup'
  | 'pastilla'

export interface RegionalNames {
  chamal: string[] // North / Mediterranean (Tanger, Tetouan, Larache)
  oriental: string[] // Oriental / Mediterranean East (Nador, Saidia, Ras Kebdana, Berkane, Marchica lagoon)
  centre: string[] // Centre / Atlantic (Casablanca, Rabat, Safi, El Jadida)
  sud: string[] // South / Souss / Sahara / Amazigh (Agadir, Dakhla, Tan-Tan, Essaouira)
}

export interface MarketPriceTrend {
  trend: 'up' | 'down' | 'stable'
  past6MonthsMAD: number[] // monthly historical prices
  currentSpotMAD: number
  forecastFutureMAD: number // next quarter projection
  globalExportUSD: {
    min: number
    max: number
    avg: number
    hub: string // e.g. "Mercabarna (Spain)", "Rungis (France)", "Tokyo Toyosu"
  }
  driversAr: string
  driversFr: string
  driversEn: string
}

export interface FishNutrition100g {
  calories: number
  proteinGrams: number
  lipidsGrams: number
  omega3Mg: number // EPA & DHA
  vitaminD_IU: number
  vitaminB12_mcg: number
  calciumMg: number
  ironMg: number
  phosphorusMg: number
  seleniumMcg: number
  iodineMcg: number
  zincMg: number
  healthBenefits: {
    ar: string[]
    fr: string[]
    en: string[]
  }
}

export interface CleaningStep {
  stepNumber: number
  titleAr: string
  titleFr: string
  titleEn: string
  instructionAr: string
  instructionFr: string
  instructionEn: string
  kessalTipAr: string // Secret from Moroccan market fish cleaner
  kessalTipFr: string
  kessalTipEn: string
}

export interface CleaningTutorial {
  methodNameAr: string
  methodNameFr: string
  methodNameEn: string
  difficulty: 'easy' | 'medium' | 'pro'
  prepTimeMinutes: number
  toolsNeededAr: string[]
  toolsNeededFr: string[]
  toolsNeededEn: string[]
  steps: CleaningStep[]
}

export interface Fish {
  id: string
  nameDarijaArabic: string
  nameDarijaLatin: string
  nameFrench: string
  nameEnglish: string
  scientificName: string
  category: FishCategory
  coast: CoastType
  mainPorts: string[]
  regionalNames: RegionalNames
  pricing: MarketPriceTrend
  nutrition: FishNutrition100g
  cleaningTutorial: CleaningTutorial
  seasonality: {
    peakMonths: number[] // 1-12
    description: { ar: string; fr: string; en: string }
  }
  culinaryProfile: {
    flavor: 'mild' | 'rich' | 'sweet' | 'oily' | 'delicate' | 'pronounced'
    texture: 'tender' | 'firm' | 'flaky' | 'meaty'
    bonesDifficulty: 'none' | 'low' | 'medium' | 'high'
    bestCookingMethods: CookingMethod[]
  }
  freshnessKeys: {
    ar: string[]
    fr: string[]
    en: string[]
  }
  description: {
    ar: string
    fr: string
    en: string
  }
  imageUrl: string
  fallbackImageUrl?: string
  /** YouTube video ID of a cleaning / preparation tutorial for this species. */
  cleaningVideoId?: string
  audioPhonetic: string
  recommendedRecipeIds: string[]
}

export interface CharmoulaFormula {
  garlicCloves: number
  corianderGrams: number
  parsleyGrams: number
  cuminTsp: number
  paprikaTsp: number
  oliveOilTbsp: number
  lemonJuiceTbsp: number
  harissaTsp: number
  saltTsp: number
  blackPepperTsp: number
  corianderPowderTsp?: number
  preservedLemonPiece?: string
}

export interface Recipe {
  id: string
  slug: string
  titleDarijaArabic: string
  titleDarijaLatin: string
  titleFrench: string
  titleEnglish: string
  category: CookingMethod
  fishIds: string[]
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: 'facile' | 'moyen' | 'expert'
  caloriesEst: number
  description: {
    ar: string
    fr: string
    en: string
  }
  charmoulaFormula: CharmoulaFormula
  ingredients: {
    itemAr: string
    itemFr: string
    itemEn: string
    quantity: string
  }[]
  steps: {
    stepNumber: number
    textAr: string
    textFr: string
    textEn: string
  }[]
  chefSecrets: {
    ar: string
    fr: string
    en: string
  }
  moroccanAccompaniments: {
    ar: string[]
    fr: string[]
    en: string[]
  }
  imageUrl: string
  /** Verified YouTube video ID of a Moroccan recipe tutorial */
  videoId?: string
}

export interface MarketFreshnessCriterion {
  id: string
  titleAr: string
  titleFr: string
  titleEn: string
  freshIndicatorAr: string
  freshIndicatorFr: string
  freshIndicatorEn: string
  staleIndicatorAr: string
  staleIndicatorFr: string
  staleIndicatorEn: string
  iconName: string
}

export interface InternationalContract {
  id: string
  partnerNameAr: string
  partnerNameFr: string
  partnerNameEn: string
  flagEmoji: string
  titleAr: string
  titleFr: string
  titleEn: string
  datesActive: string
  status: 'active' | 'expired_negotiating' | 'permanent_cooperation'
  financialCompensation: string
  vesselsQuota: string
  keyClausesAr: string[]
  keyClausesFr: string[]
  keyClausesEn: string[]
  geopoliticalContextAr: string
  geopoliticalContextFr: string
  geopoliticalContextEn: string
  impactOnMoroccanMarketAr: string
  impactOnMoroccanMarketFr: string
  impactOnMoroccanMarketEn: string
}

export interface FisheriesAgreement {
  id: string
  partnerName: { ar: string; fr: string; en: string }
  flag: string
  status: 'active' | 'suspended_under_renegotiation' | 'framework'
  period: string
  economicValue: { ar: string; fr: string; en: string }
  targetSpecies: string[]
  keyTerms: { ar: string[]; fr: string[]; en: string[] }
  strategicContext: { ar: string; fr: string; en: string }
  moroccoGains: { ar: string[]; fr: string[]; en: string[] }
}

export interface MarketTrend {
  id: string
  speciesId: string
  speciesName: { ar: string; fr: string; en: string }
  pastTrend: {
    priceRangeMAD: string
    summary: { ar: string; fr: string; en: string }
  }
  presentStatus: {
    priceRangeMAD: string
    supplyStatus: 'abundant' | 'moderate' | 'scarce'
    trendDirection: 'up' | 'down' | 'stable'
    summary: { ar: string; fr: string; en: string }
  }
  futureForecast: {
    outlook: 'up' | 'down' | 'stable'
    driverFactors: { ar: string[]; fr: string[]; en: string[] }
    projection: { ar: string; fr: string; en: string }
  }
  biologicalRestPeriod?: {
    months: string
    description: { ar: string; fr: string; en: string }
  }
}

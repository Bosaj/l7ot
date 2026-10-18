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
  northChamal: string // Tangier, Tetouan, Al Hoceima, Nador
  centreAtlantic: string // Casablanca, Rabat, Safi, Essaouira
  southSoussSahara: string // Agadir, Tan-Tan, Laayoune, Dakhla
}

export interface PricingDetails {
  wholesalePortMAD: { min: number; max: number; unit: 'kg' | 'piece' }
  retailMarketMAD: { min: number; max: number; unit: 'kg' | 'piece' }
  globalExportEUR: { min: number; max: number; unit: 'kg' | 'piece'; referenceMarket: string }
}

export interface NutritionPer100g {
  caloriesKcal: number
  proteinGrams: number
  lipidsGrams: number
  omega3Mg: number // EPA + DHA
  vitaminD_mcg: number
  vitaminB12_mcg: number
  iodine_mcg: number
  selenium_mcg: number
  phosphorus_mg: number
  calcium_mg: number
  iron_mg: number
  zinc_mg: number
  magnesium_mg: number
  potassium_mg: number
  healthHighlights: {
    ar: string[]
    fr: string[]
    en: string[]
  }
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
  seasonality: {
    peakMonths: number[] // 1-12
    description: { ar: string; fr: string; en: string }
  }
  priceRangeMAD: {
    min: number
    max: number
    unit: 'kg' | 'piece'
  }
  pricingDetails?: PricingDetails
  regionalNames?: RegionalNames
  nutritionPer100g?: NutritionPer100g
  culinaryProfile: {
    flavor: 'mild' | 'rich' | 'sweet' | 'oily' | 'delicate'
    texture: 'tender' | 'firm' | 'flaky' | 'meaty'
    bonesDifficulty: 'low' | 'medium' | 'high'
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
  audioPhonetic: string
  recommendedRecipeIds: string[]
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

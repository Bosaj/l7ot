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

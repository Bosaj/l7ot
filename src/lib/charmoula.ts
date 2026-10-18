import type { Fish, CookingMethod } from '../data/types'

export interface CharmoulaCalculationResult {
  fish: Fish
  method: CookingMethod
  servings: number
  weightKg: number
  formula: {
    garlicCloves: number
    corianderGrams: number
    corianderTbsp: number
    parsleyGrams: number
    parsleyTbsp: number
    cuminTsp: number
    paprikaTsp: number
    oliveOilTbsp: number
    lemonJuiceTbsp: number
    harissaTsp: number
    saltTsp: number
    blackPepperTsp: number
    preservedLemonQuarter: number
    specialAdditions: { ar: string; fr: string; en: string }[]
  }
  marinadeTimeMinutes: number
  cookTempCelsius: number | null
  estimatedCookTimeMinutes: number
  chefGuidance: {
    ar: string
    fr: string
    en: string
  }
}

export function calculateCharmoula(
  fish: Fish,
  method: CookingMethod,
  servings: number
): CharmoulaCalculationResult {
  const safeServings = Math.max(1, Math.min(20, servings))
  // baseline assumption: ~250g of whole fish or 180g of fillets per person
  const weightKg = Number(((safeServings * 0.25)).toFixed(2))

  // Base multiplier based on 4 servings standard
  const scale = safeServings / 4

  // Coefficients depending on fish category and cooking method
  let garlicFactor = 1
  let cuminFactor = 1
  let paprikaFactor = 1
  let oilFactor = 1
  let lemonFactor = 1
  let harissaFactor = 1
  let marinadeMinutes = 20
  let cookTemp = 190
  let cookMinutes = 30

  // 1. Adjust for Fish Category
  if (fish.category === 'poisson_bleu') {
    // Sardines, Mackerel, Anchovies love bold cumin, garlic, and vinegar/lemon
    cuminFactor = 1.3
    garlicFactor = 1.2
    lemonFactor = 1.2
    marinadeMinutes = 15
  } else if (fish.category === 'poisson_blanc') {
    // Sole, Merlan, Seabass need more delicate balance; less overpowering cumin
    cuminFactor = 0.8
    garlicFactor = 0.9
    lemonFactor = 1.3
    marinadeMinutes = 20
  } else if (fish.category === 'crustace') {
    // Crevettes: heavy garlic, rich paprika, lots of olive oil
    garlicFactor = 1.5
    paprikaFactor = 1.4
    oilFactor = 1.4
    cuminFactor = 0.6
    marinadeMinutes = 10
  } else if (fish.category === 'cephalopode') {
    // Calamari, Poulpe: benefit from tenderizing lemon, bay leaf, and paprika
    lemonFactor = 1.4
    paprikaFactor = 1.2
    marinadeMinutes = 30
  }

  // 2. Adjust for Cooking Method
  switch (method) {
    case 'tagine':
      oilFactor *= 1.1
      paprikaFactor *= 1.2
      cookTemp = 160 // gentle stovetop or oven
      cookMinutes = Math.round(35 + safeServings * 2)
      break
    case 'friture':
      oilFactor *= 0.7 // less oil inside the rub since it gets fried
      lemonFactor *= 1.2
      cookTemp = 180 // oil temp
      cookMinutes = Math.round(8 + safeServings * 1.5)
      break
    case 'four':
      oilFactor *= 1.2
      cookTemp = 200
      cookMinutes = Math.round(25 + safeServings * 2.5)
      break
    case 'grillade':
      oilFactor *= 1.3
      cuminFactor *= 1.2
      cookTemp = 220
      cookMinutes = Math.round(10 + safeServings * 1)
      break
    case 'pil_pil':
      oilFactor *= 1.6
      garlicFactor *= 1.4
      paprikaFactor *= 1.3
      cookTemp = 190
      cookMinutes = 10
      break
    case 'soup':
      lemonFactor *= 1.3
      cuminFactor *= 0.7
      cookTemp = 100
      cookMinutes = 35
      break
    case 'pastilla':
      oilFactor *= 1.2
      garlicFactor *= 1.3
      cookTemp = 180
      cookMinutes = 40
      break
  }

  const baseGarlic = 5 * scale * garlicFactor
  const baseCoriander = 40 * scale
  const baseParsley = 25 * scale
  const baseCumin = 2 * scale * cuminFactor
  const basePaprika = 2.5 * scale * paprikaFactor
  const baseOil = 4 * scale * oilFactor
  const baseLemon = 2.5 * scale * lemonFactor
  const baseHarissa = 1 * scale * harissaFactor
  const baseSalt = 1.2 * scale
  const basePepper = 0.5 * scale
  const preservedLemonQuarters = Math.max(1, Math.round(1.5 * scale))

  const specialAdditions: { ar: string; fr: string; en: string }[] = []

  if (method === 'tagine' || method === 'four') {
    specialAdditions.push({
      ar: 'ورقتان من ورق الرند (سيدنا موسى) وعيدان الكرفس في القاع',
      fr: '2 feuilles de laurier et quelques branches de céleri au fond',
      en: '2 dried bay leaves and fresh celery stalks lining the base',
    })
  }

  if (fish.priceRangeMAD.min >= 80) {
    specialAdditions.push({
      ar: 'شعيرات من الزعفران الحر الأصيل من تاليوين منقوعة في ماء دافئ',
      fr: 'Pincée de safran pur de Taliouine infusée dans l’eau tiède',
      en: 'A pinch of pure Taliouine saffron threads steeped in warm water',
    })
  }

  if (method === 'friture') {
    specialAdditions.push({
      ar: 'سميد ناعم جداً (فينو) مخلط بملعقة نشا للتفنيد قبل القلي',
      fr: 'Semoule extra-fine mélangée à 1 c. à soupe de fécule pour panure',
      en: 'Extra-fine semolina mixed with 1 tbsp cornstarch for crunchy dredging',
    })
  }

  const chefGuidance = {
    ar: `لتحضير ${fish.nameDarijaArabic} بطريقة ${method === 'tagine' ? 'الطاجين' : method === 'four' ? 'الفرن' : method === 'friture' ? 'القلي' : 'الشواء'}: اخلط مكونات الشرمولة في مهراز خشب حتى تتجانس. اترك السمك يتشرب التتبيلة ${marinadeMinutes} دقيقة في مكان بارد قبل بدء الطهي.`,
    fr: `Pour réussir votre ${fish.nameFrench} en ${method} : pilez les herbes et épices au mortier jusqu’à consistance onctueuse. Laissez mariner ${marinadeMinutes} minutes au frais avant de lancer la cuisson.`,
    en: `To master your ${fish.nameEnglish} prepared via ${method}: crush fresh herbs, garlic, and spices in a mortar until silky. Marinate for ${marinadeMinutes} minutes in a cool spot before applying heat.`,
  }

  return {
    fish,
    method,
    servings: safeServings,
    weightKg,
    formula: {
      garlicCloves: Math.max(1, Math.round(baseGarlic)),
      corianderGrams: Math.round(baseCoriander),
      corianderTbsp: Math.max(1, Math.round(baseCoriander / 10)),
      parsleyGrams: Math.round(baseParsley),
      parsleyTbsp: Math.max(1, Math.round(baseParsley / 10)),
      cuminTsp: Number(Math.max(0.5, baseCumin).toFixed(1)),
      paprikaTsp: Number(Math.max(0.5, basePaprika).toFixed(1)),
      oliveOilTbsp: Number(Math.max(1, baseOil).toFixed(1)),
      lemonJuiceTbsp: Number(Math.max(1, baseLemon).toFixed(1)),
      harissaTsp: Number(Math.max(0.25, baseHarissa).toFixed(1)),
      saltTsp: Number(Math.max(0.5, baseSalt).toFixed(1)),
      blackPepperTsp: Number(Math.max(0.25, basePepper).toFixed(1)),
      preservedLemonQuarter: preservedLemonQuarters,
      specialAdditions,
    },
    marinadeTimeMinutes: marinadeMinutes,
    cookTempCelsius: cookTemp,
    estimatedCookTimeMinutes: cookMinutes,
    chefGuidance,
  }
}

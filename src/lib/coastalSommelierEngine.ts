import type { Fish, CookingMethod } from '../data/types'

export type DietaryFilterKey = 'all' | 'low_sodium' | 'diabetic_friendly' | 'keto_coastal'

export interface TerroirIngredient {
  id: string
  nameAr: string
  nameFr: string
  nameEn: string
  regionOriginAr: string
  regionOriginFr: string
  regionOriginEn: string
  roleAr: string
  roleFr: string
  roleEn: string
  dietaryTags: DietaryFilterKey[]
}

export interface MoroccanSaladPairing {
  id: string
  nameAr: string
  nameFr: string
  nameEn: string
  harmonyReasonAr: string
  harmonyReasonFr: string
  harmonyReasonEn: string
  glycemicIndex: 'low' | 'very_low'
  sodiumMgPerServing: number
  netCarbsGrams: number
  dietaryTags: DietaryFilterKey[]
}

export interface MoroccanTeaBeveragePairing {
  id: string
  nameAr: string
  nameFr: string
  nameEn: string
  infusionProfileAr: string
  infusionProfileFr: string
  infusionProfileEn: string
  digestiveBenefitAr: string
  digestiveBenefitFr: string
  digestiveBenefitEn: string
  dietaryTags: DietaryFilterKey[]
}

export interface SommelierRecommendation {
  fish: Fish
  cookingMethod: CookingMethod
  dietaryFilter: DietaryFilterKey
  terroirIngredients: TerroirIngredient[]
  sideSalads: MoroccanSaladPairing[]
  beveragePairings: MoroccanTeaBeveragePairing[]
  culturalOriginStory: {
    ar: string
    fr: string
    en: string
  }
  sommelierVerdict: {
    ar: string
    fr: string
    en: string
  }
}

export const MOROCCAN_TERROIR_CATALOG: TerroirIngredient[] = [
  {
    id: 'berkane-citrus',
    nameAr: 'حوامض بركان والليمون البلدي الطري',
    nameFr: 'Agrumes IGP de Berkane & Citron Beldi',
    nameEn: 'Berkane PGI Citrus & Fresh Beldi Lemon',
    regionOriginAr: 'سهول تريفة - بركان والجهة الشرقية',
    regionOriginFr: 'Plaine des Triffa - Berkane (Oriental)',
    regionOriginEn: 'Triffa Plain - Berkane (Eastern Morocco)',
    roleAr: 'يكسر دهون الأسماك الزرقاء والأوميغا 3 بحموضة عطرية متوازنة بدون ملح إضافي.',
    roleFr: 'Tranche le gras des poissons bleus riches en Oméga-3 par une acidité florale sans sel.',
    roleEn: 'Cuts through rich Omega-3 oils in pelagic fish with bright floral acidity and zero added sodium.',
    dietaryTags: ['all', 'low_sodium', 'diabetic_friendly', 'keto_coastal'],
  },
  {
    id: 'taliouine-saffron',
    nameAr: 'زعفران تاليوين وتارودانت الحر (شعيرات الذهب الأحمر)',
    nameFr: 'Safran AOP de Taliouine & Taroudant',
    nameEn: 'Taliouine PDO Saffron Threads',
    regionOriginAr: 'تاليوين وتارودانت - الأطلس الصغير وسوس',
    regionOriginFr: 'Taliouine & Taroudant (Anti-Atlas)',
    regionOriginEn: 'Taliouine & Taroudant (Anti-Atlas)',
    roleAr: 'يمنح الأسماك البيضاء النبيلة والقرشيات عبقاً ملكياً ومضادات أكسدة طبيعية (الكروسين).',
    roleFr: 'Sublime la chair délicate des poissons blancs et crustacés avec ses notes miellées et antioxydantes.',
    roleEn: 'Elevates delicate white fish and crustaceans with honeyed floral notes and natural crocin antioxidants.',
    dietaryTags: ['all', 'low_sodium', 'diabetic_friendly', 'keto_coastal'],
  },
  {
    id: 'taliouine-almonds',
    nameAr: 'لوز تافراوت وتاليوين البلدي المحمص',
    nameFr: 'Amandes Beldi Torréfiées de Tafraoute & Taliouine',
    nameEn: 'Roasted Tafraoute & Taliouine Beldi Almonds',
    regionOriginAr: 'تافراوت وتاليوين - جبال الأطلس الصغير',
    regionOriginFr: 'Vallées d’Ameln & Taliouine',
    regionOriginEn: 'Ameln Valley & Taliouine',
    roleAr: 'يضيف قرمشة غنية بالدهون الصحية والمغنيسيوم لطواجن الفرخ (الصنور) والبسطيلة الساحلية.',
    roleFr: 'Apporte un croquant riche en magnésium et bons lipides aux tajines de congre et pastillas.',
    roleEn: 'Adds magnesium-rich crunch and healthy monounsaturated fats to conger tagines and seafood pastillas.',
    dietaryTags: ['all', 'low_sodium', 'diabetic_friendly', 'keto_coastal'],
  },
  {
    id: 'essaouira-argan',
    nameAr: 'زيت أركان الصويرة وحاحا الغذائي المحمص على الحجر',
    nameFr: 'Huile d’Argan Torréfiée IGP d’Essaouira & Haha',
    nameEn: 'Essaouira PGI Roasted Culinary Argan Oil',
    regionOriginAr: 'الصويرة، تمنار وحاحا - المحمية الحيوية للأركان',
    regionOriginFr: 'Biosphère de l’Arganeraie (Essaouira - Haha)',
    regionOriginEn: 'Argan Biosphere Reserve (Essaouira - Haha)',
    roleAr: 'يُقطّر في اللحظة الأخيرة فوق السمك المشوي أو المسلوق ليمنحه نكهة بندق ساحلية فريدة وفيتامين E.',
    roleFr: 'Versée en filet à cru après cuisson sur le poisson grillé pour une note de noisette torréfiée.',
    roleEn: 'Drizzled raw after grilling to impart a signature toasted hazelnut finish and high Vitamin E.',
    dietaryTags: ['all', 'low_sodium', 'diabetic_friendly', 'keto_coastal'],
  },
  {
    id: 'oualidia-sea-salt',
    nameAr: 'زهرة ملح الواليدية وبحيرة زيما الطبيعية',
    nameFr: 'Fleur de Sel Marine de Oualidia',
    nameEn: 'Oualidia Lagoon Fleur de Sel',
    regionOriginAr: 'ملاحات الواليدية وساحل دكالة-عبدة',
    regionOriginFr: 'Salines lagunaires de Oualidia',
    regionOriginEn: 'Oualidia Coastal Salt Pans',
    roleAr: 'بلورات غنية باليود والمغنيسيوم البحري تُرش باعتدال لإبراز حلاوة لحم الصول والدوراد المشوي.',
    roleFr: 'Cristaux riches en iode et oligo-éléments marins exaltant la finesse du poisson rôti.',
    roleEn: 'Iodine-rich marine crystals used sparingly to highlight the natural sweetness of baked sole and bream.',
    dietaryTags: ['all', 'diabetic_friendly', 'keto_coastal'],
  },
  {
    id: 'chefchaouen-oregano',
    nameAr: 'زعتر وأزير جبال شفشاون والريف البري',
    nameFr: 'Origan Sauvage (Zaâtar) & Romarin du Rif',
    nameEn: 'Wild Rif Oregano (Zaatar) & Mountain Rosemary',
    regionOriginAr: 'شفشاون، الجبهة ومرتفعات الريف',
    regionOriginFr: 'Montagnes du Rif (Chefchaouen - Jebha)',
    regionOriginEn: 'Rif Mountains (Chefchaouen - Jebha)',
    roleAr: 'بديل عطري مثالي للملح يطيب شواء السردين، الأخطبوط والباجو على الطريقة الشمالية.',
    roleFr: 'Substitut aromatique idéal au sel pour parfumer les grillades de sardines, poulpe et pageot.',
    roleEn: 'Zero-sodium aromatic herb rub ideal for northern-style grilled sardines, octopus, and pandora.',
    dietaryTags: ['all', 'low_sodium', 'diabetic_friendly', 'keto_coastal'],
  },
]

export const MOROCCAN_SALADS_CATALOG: MoroccanSaladPairing[] = [
  {
    id: 'zaalouk-mechouia',
    nameAr: 'زعلوك الباذنجان المشوي على الفحم بزيت العود والكمون',
    nameFr: 'Zaalouk d’Aubergines Fumées au Cumin & Huile d’Olive',
    nameEn: 'Smoky Charcoal-Roasted Eggplant Zaalouk',
    harmonyReasonAr: 'قوامه الحريري المدخن يوازن قرمشة الأسماك المقلية والمشوية (السردين، الميرلا، الشرغو) ويمتص دهونها بفضل الألياف الذائبة.',
    harmonyReasonFr: 'Sa texture fondante et fumée équilibre le croustillant des poissons frits ou grillés tout en apportant des fibres solubles.',
    harmonyReasonEn: 'Velvety smoky texture balances crispy fried or grilled fish while soluble eggplant fibers aid lipid digestion.',
    glycemicIndex: 'very_low',
    sodiumMgPerServing: 85,
    netCarbsGrams: 5,
    dietaryTags: ['all', 'low_sodium', 'diabetic_friendly', 'keto_coastal'],
  },
  {
    id: 'taktouka-berkane',
    nameAr: 'تكتوكة الفلفل الأحمر والأخضر المشوي بالثوم والقزبر',
    nameFr: 'Taktouka de Poivrons Grillés à l’Ail & Coriandre',
    nameEn: 'Roasted Red & Green Bell Pepper Taktouka',
    harmonyReasonAr: 'غنية بفيتامين C الطبيعي الذي يضاعف امتصاص الحديد والسيلينيوم الموجود في التونة، الاسبادون والأسماك الزرقاء.',
    harmonyReasonFr: 'Ultra-riche en vitamine C naturelle, elle multiplie l’absorption du fer marin des poissons bleus (thon, espadon, sardine).',
    harmonyReasonEn: 'Packed with natural Vitamin C that boosts bio-absorption of marine iron and selenium from blue fish.',
    glycemicIndex: 'very_low',
    sodiumMgPerServing: 75,
    netCarbsGrams: 6,
    dietaryTags: ['all', 'low_sodium', 'diabetic_friendly', 'keto_coastal'],
  },
  {
    id: 'bakoula-khobiza',
    nameAr: 'البقولة (الخبيزة) المغربية بالزيتون والحامض البلدي',
    nameFr: 'Bakoula (Mauve Sauvage) aux Citrons & Huile d’Argan',
    nameEn: 'Wild Mallow Greens (Bakoula) with Citrus & Olive Oil',
    harmonyReasonAr: 'أوراق خضراء برية غنية بالكلوروفيل والبوتاسيوم، مثالية مع الأخطبوط، السيبيا والأسماك الغضروفية كالراية.',
    harmonyReasonFr: 'Feuilles sauvages riches en chlorophylle et potassium, parfaites avec le poulpe, la seiche et la raie.',
    harmonyReasonEn: 'Chlorophyll- and potassium-rich wild greens that pair effortlessly with octopus, cuttlefish, and skate.',
    glycemicIndex: 'very_low',
    sodiumMgPerServing: 95,
    netCarbsGrams: 3,
    dietaryTags: ['all', 'low_sodium', 'diabetic_friendly', 'keto_coastal'],
  },
  {
    id: 'khizou-mchermel',
    nameAr: 'خيزو مشرمل بالثوم والكمون وماء الزهر الخفيف',
    nameFr: 'Khizou Mchermel (Carottes Marines à la Charmoula)',
    nameEn: 'Chermoula-Marinated Moroccan Carrots (Khizou Mchermel)',
    harmonyReasonAr: 'حلاوته الطبيعية المتوازنة مع عصير حامض بركان تبرز بياض ونعومة أسماك القاع (الصول، الباجو، سان بيير).',
    harmonyReasonFr: 'La douceur acidulée des carottes au cumin met en valeur la chair nacrée de la sole, du pageot et du Saint-Pierre.',
    harmonyReasonEn: 'Tangy-sweet cumin carrots highlight the pearlescent flaky flesh of Dover sole, pandora, and John Dory.',
    glycemicIndex: 'low',
    sodiumMgPerServing: 90,
    netCarbsGrams: 9,
    dietaryTags: ['all', 'low_sodium', 'diabetic_friendly'],
  },
]

export const MOROCCAN_TEA_PAIRINGS_CATALOG: MoroccanTeaBeveragePairing[] = [
  {
    id: 'atay-louiza',
    nameAr: 'منقوع اللويزة السوسية الصافية بدون سكر (أو بأتاي شعره خفيف)',
    nameFr: 'Infusion de Verveine Odorante du Souss (Louiza)',
    nameEn: 'Souss Lemon Verbena Herbal Infusion (Louiza)',
    infusionProfileAr: 'نكهة ليمونية عشبية ناعمة خالية من الكافيين والسكريات.',
    infusionProfileFr: 'Notes citronnées apaisantes, 0% caféine et sans sucre ajouté.',
    infusionProfileEn: 'Soothing lemony herbal aroma, naturally caffeine-free and sugar-free.',
    digestiveBenefitAr: 'تهدئ الجهاز الهضمي بعد وجبات الطاجين، البسطيلة أو الأسماك الغنية بالثوم والشرمولة.',
    digestiveBenefitFr: 'Facilite la digestion des tajines à la charmoula et apaise l’estomac en soirée.',
    digestiveBenefitEn: 'Calms digestion after garlic-rich chermoula tagines and evening seafood feasts.',
    dietaryTags: ['all', 'low_sodium', 'diabetic_friendly', 'keto_coastal'],
  },
  {
    id: 'atay-naanaa-meknassi',
    nameAr: 'أتاي مغربي بالنعناع العبدي والصنوبر (قليل السكر أو بدون سكر)',
    nameFr: 'Thé Vert Gunpowder à la Menthe Abdi (Sans Sucre / Léger)',
    nameEn: 'Moroccan Gunpowder Green Tea with Abdi Spearmint',
    infusionProfileAr: 'غني بمركبات الكاتيكين القابضة ومنعش بالمنثول الطبيعي.',
    infusionProfileFr: 'Riche en catéchines antioxydantes et fraîcheur mentholée vive.',
    infusionProfileEn: 'High in antioxidant catechins with crisp spearmint menthol.',
    digestiveBenefitAr: 'يطهر الفم من دهون الأسماك المقلية والمشوية (السردين، الشرن، البوقة) وينشط الأيض.',
    digestiveBenefitFr: 'Nettoie le palais après une friture de poisson ou une grillade de sardines au port.',
    digestiveBenefitEn: 'Cleanses the palate after port-side grilled sardines or mixed seafood fry-ups.',
    dietaryTags: ['all', 'low_sodium', 'diabetic_friendly', 'keto_coastal'],
  },
  {
    id: 'atay-chiba',
    nameAr: 'أتاي بالشيبة الشتوية والزعفران الحر',
    nameFr: 'Thé d’Hiver à l’Absinthe Marocaine (Chiba) & Safran',
    nameEn: 'Winter Moroccan Wormwood (Chiba) & Saffron Tea',
    infusionProfileAr: 'مرارة عطرية نبيلة دافئة تتناغم مع أسماك المياه الباردة.',
    infusionProfileFr: 'Amertume aromatique noble réchauffante pour les poissons d’hiver.',
    infusionProfileEn: 'Warm, noble herbal bitterness crafted for winter Atlantic seafood.',
    digestiveBenefitAr: 'يحفز إفرازات الكبد والمرارة لهضم الأسماك الدهنية والشوربات البحرية الساخنة.',
    digestiveBenefitFr: 'Stimule la fonction hépatique et biliaire après les poissons riches et soupes marines.',
    digestiveBenefitEn: 'Stimulates natural bile flow to digest rich winter fish and coastal soups.',
    dietaryTags: ['all', 'low_sodium', 'diabetic_friendly', 'keto_coastal'],
  },
]

/**
 * Generates an intelligent AI Coastal Sommelier pairing recommendation for any of the 44 Moroccan fish species.
 */
export function buildCoastalSommelierRecommendation(
  fish: Fish,
  dietaryFilter: DietaryFilterKey = 'all',
  preferredMethod?: CookingMethod
): SommelierRecommendation {
  const cookingMethod = preferredMethod || fish.culinaryProfile.bestCookingMethods[0] || 'tagine'
  const isOilyOrRich =
    fish.category === 'poisson_bleu' ||
    fish.nutrition.lipidsGrams >= 5 ||
    fish.culinaryProfile.flavor === 'oily' ||
    fish.culinaryProfile.flavor === 'rich'

  // Filter catalog by dietary preference
  const matchesDiet = (tags: DietaryFilterKey[]) =>
    dietaryFilter === 'all' || tags.includes(dietaryFilter)

  // Select top 3 terroir ingredients tailored to fish profile
  const terroirPool = MOROCCAN_TERROIR_CATALOG.filter((t) => matchesDiet(t.dietaryTags))
  const prioritizedTerroir = [...terroirPool].sort((a, b) => {
    const score = (item: TerroirIngredient) => {
      if (isOilyOrRich && (item.id === 'berkane-citrus' || item.id === 'chefchaouen-oregano')) return 10
      if (!isOilyOrRich && (item.id === 'taliouine-saffron' || item.id === 'essaouira-argan')) return 10
      if (cookingMethod === 'tagine' && item.id === 'taliouine-almonds') return 9
      return 5
    }
    return score(b) - score(a)
  })

  // Select side salads tailored to fish fattiness & texture
  const saladPool = MOROCCAN_SALADS_CATALOG.filter((s) => matchesDiet(s.dietaryTags))
  const prioritizedSalads = [...saladPool].sort((a, b) => {
    const score = (s: MoroccanSaladPairing) => {
      if (isOilyOrRich && (s.id === 'taktouka-berkane' || s.id === 'zaalouk-mechouia')) return 10
      if (fish.category === 'cephalopode' && s.id === 'bakoula-khobiza') return 11
      if (fish.category === 'poisson_blanc' && s.id === 'khizou-mchermel') return 9
      return 5
    }
    return score(b) - score(a)
  })

  // Select tea / herbal infusion pairings
  const teaPool = MOROCCAN_TEA_PAIRINGS_CATALOG.filter((t) => matchesDiet(t.dietaryTags))
  const prioritizedTeas = [...teaPool].sort((a, b) => {
    const score = (t: MoroccanTeaBeveragePairing) => {
      if (cookingMethod === 'friture' || cookingMethod === 'grillade') {
        return t.id === 'atay-naanaa-meknassi' ? 10 : 6
      }
      if (cookingMethod === 'soup') {
        return t.id === 'atay-chiba' ? 10 : 6
      }
      return t.id === 'atay-louiza' ? 10 : 7
    }
    return score(b) - score(a)
  })

  const mainPort = fish.mainPorts[0] || 'آسفي والصويرة'
  const culturalOriginStory = {
    ar: `في موانئ ${fish.mainPorts.join(' و')}، اعتاد البحارة وعائلات الساحل المغربي منذ قرون تقديم سمك ${fish.nameDarijaArabic} (${fish.scientificName}) مع خيرات الظهير الفلاحي القريب: حوامض بركان والليمون البلدي لكسر زفرة البحر، وزيت أركان حاحا أو زعفران تاليوين في المناسبات، متبوعاً بكأس أتاي بالنعناع أو اللويزة لضمان هضم مثالي.`,
    fr: `Dans les ports historiques de ${fish.mainPorts.join(' et ')}, la tradition maritime marocaine associe depuis des siècles ${fish.nameFrench} (${fish.scientificName}) aux joyaux du terroir côtier et de l’arrière-pays : agrumes de Berkane pour vivifier la chair, huile d’argan d’Essaouira ou safran de Taliouine, suivis d’une infusion digestive de Louiza ou de thé à la menthe.`,
    en: `Across the historic ports of ${fish.mainPorts.join(' & ')}, Moroccan coastal culinary heritage pairs ${fish.nameEnglish} (${fish.scientificName}) with hinterland terroir treasures—Berkane citrus to brighten marine oils, Essaouira roasted argan oil, and Taliouine saffron—finished with a soothing Souss verbena (Louiza) or spearmint tea infusion.`,
  }

  const dietBadgeAr =
    dietaryFilter === 'low_sodium'
      ? 'نظام قليل الصوديوم (أعشاب الريف وحوامض بركان بدون ملح مضاف)'
      : dietaryFilter === 'diabetic_friendly'
      ? 'نظام ملائم للسكري (مؤشر جلايسيمي منخفض جداً وألياف ذائبة)'
      : dietaryFilter === 'keto_coastal'
      ? 'نظام كيتو ساحلي (${fish.nutrition.omega3Mg} ملغ أوميغا-3 مع زيت أركان والزيتون)'
      : `تناغم تقليدي أصيل من ميناء ${mainPort}`

  const sommelierVerdict = {
    ar: `توصية الساقي الساحلي لسمك ${fish.nameDarijaArabic} (${fish.nutrition.proteinGrams}غ بروتين، ${fish.nutrition.lipidsGrams}غ دهون): يُحضّر بطريقة "${cookingMethod}" مع ${prioritizedTerroir[0]?.nameAr || ''}، ويُرافقه طبق ${prioritizedSalads[0]?.nameAr || ''}، ويُختم بـ ${prioritizedTeas[0]?.nameAr || ''} (${dietBadgeAr}).`,
    fr: `Accord du Sommelier Côtier pour ${fish.nameFrench} (${fish.nutrition.proteinGrams}g protéines, ${fish.nutrition.lipidsGrams}g lipides) : sublimé par ${prioritizedTerroir[0]?.nameFr || ''}, accompagné de ${prioritizedSalads[0]?.nameFr || ''} et conclu par ${prioritizedTeas[0]?.nameFr || ''}.`,
    en: `Coastal Sommelier Pairing for ${fish.nameEnglish} (${fish.nutrition.proteinGrams}g protein, ${fish.nutrition.lipidsGrams}g lipids): elevated with ${prioritizedTerroir[0]?.nameEn || ''}, served alongside ${prioritizedSalads[0]?.nameEn || ''}, and finished with ${prioritizedTeas[0]?.nameEn || ''}.`,
  }

  return {
    fish,
    cookingMethod,
    dietaryFilter,
    terroirIngredients: prioritizedTerroir.slice(0, 3),
    sideSalads: prioritizedSalads.slice(0, 3),
    beveragePairings: prioritizedTeas.slice(0, 2),
    culturalOriginStory,
    sommelierVerdict,
  }
}

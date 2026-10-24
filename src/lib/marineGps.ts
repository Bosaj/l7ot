export interface MoroccanPortGpsPoint {
  id: string
  nameAr: string
  nameFr: string
  nameEn: string
  coast: 'mediterranean' | 'atlantic'
  lat: number
  lon: number
  crieeType: 'Halle au Poisson' | 'Comptoir d’Agréage'
  regionNameAr: string
  regionNameFr: string
  regionNameEn: string
  vhfFrequencyMhz: number
  emergencyPhone: string
}

export interface MarineProtectedAreaGps {
  id: string
  nameAr: string
  nameFr: string
  nameEn: string
  lat: number
  lon: number
  radiusNM: number
  legalProtection: string
  restrictionsAr: string
  restrictionsFr: string
  restrictionsEn: string
}

export interface FamousFishingGround {
  id: string
  nameAr: string
  nameFr: string
  nameEn: string
  lat: number
  lon: number
  targetSpeciesAr: string[]
  targetSpeciesFr: string[]
  targetSpeciesEn: string[]
  depthMeters: number
  descriptionAr: string
  descriptionFr: string
}

export const MOROCCAN_PORTS_GPS: MoroccanPortGpsPoint[] = [
  {
    id: 'saidia',
    nameAr: 'ميناء السعيدية (الجوهرة الزرقاء)',
    nameFr: 'Port de Saïdia (Perle Bleue)',
    nameEn: 'Port of Saidia (Blue Pearl)',
    coast: 'mediterranean',
    lat: 35.085,
    lon: -2.233,
    crieeType: 'Comptoir d’Agréage',
    regionNameAr: 'الجهة الشرقية',
    regionNameFr: 'Région Orientale',
    regionNameEn: 'Oriental Region',
    vhfFrequencyMhz: 156.8, // Canal 16
    emergencyPhone: '+212 536 62 10 00',
  },
  {
    id: 'nador',
    nameAr: 'ميناء بني نصار / الناظور ومارشيكا',
    nameFr: 'Port de Beni Ensar / Nador & Marchica',
    nameEn: 'Port of Beni Ensar / Nador',
    coast: 'mediterranean',
    lat: 35.263,
    lon: -2.932,
    crieeType: 'Halle au Poisson',
    regionNameAr: 'الجهة الشرقية',
    regionNameFr: 'Région Orientale',
    regionNameEn: 'Oriental Region',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 536 60 12 12',
  },
  {
    id: 'hoceima',
    nameAr: 'ميناء الحسيمة (خليج النكور)',
    nameFr: 'Port d’Al Hoceïma',
    nameEn: 'Port of Al Hoceima',
    coast: 'mediterranean',
    lat: 35.244,
    lon: -3.925,
    crieeType: 'Halle au Poisson',
    regionNameAr: 'طنجة تطوان الحسيمة',
    regionNameFr: 'Tanger-Tétouan-Al Hoceïma',
    regionNameEn: 'Tangier-Tetouan-Al Hoceima',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 539 98 20 40',
  },
  {
    id: 'tanger-med',
    nameAr: 'طنجة المتوسط والبوغاز (مضيق جبل طارق)',
    nameFr: 'Port de Tanger Med & Détroit',
    nameEn: 'Port of Tangier Med & Strait',
    coast: 'mediterranean',
    lat: 35.888,
    lon: -5.518,
    crieeType: 'Halle au Poisson',
    regionNameAr: 'طنجة تطوان الحسيمة',
    regionNameFr: 'Tanger-Tétouan-Al Hoceïma',
    regionNameEn: 'Tangier-Tetouan-Al Hoceima',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 539 39 40 00',
  },
  {
    id: 'larache',
    nameAr: 'ميناء العرائش (وادي لوكوس)',
    nameFr: 'Port de Larache (Oued Loukkos)',
    nameEn: 'Port of Larache',
    coast: 'atlantic',
    lat: 35.195,
    lon: -6.155,
    crieeType: 'Halle au Poisson',
    regionNameAr: 'طنجة تطوان الحسيمة',
    regionNameFr: 'Tanger-Tétouan-Al Hoceïma',
    regionNameEn: 'Tangier-Tetouan-Al Hoceima',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 539 91 22 15',
  },
  {
    id: 'mehdia',
    nameAr: 'ميناء المهدية وقنيطرة (وادي سبو)',
    nameFr: 'Port de Mehdia & Kénitra (Sebou)',
    nameEn: 'Port of Mehdia & Kenitra',
    coast: 'atlantic',
    lat: 34.258,
    lon: -6.678,
    crieeType: 'Halle au Poisson',
    regionNameAr: 'الرباط سلا القنيطرة',
    regionNameFr: 'Rabat-Salé-Kénitra',
    regionNameEn: 'Rabat-Sale-Kenitra',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 537 38 80 14',
  },
  {
    id: 'casablanca',
    nameAr: 'ميناء الدار البيضاء والمحمدية',
    nameFr: 'Port de Casablanca & Mohammedia',
    nameEn: 'Port of Casablanca & Mohammedia',
    coast: 'atlantic',
    lat: 33.606,
    lon: -7.607,
    crieeType: 'Halle au Poisson',
    regionNameAr: 'الدار البيضاء سطات',
    regionNameFr: 'Casablanca-Settat',
    regionNameEn: 'Casablanca-Settat',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 522 31 40 40',
  },
  {
    id: 'oualidia',
    nameAr: 'بحيرة الوليدية والمحار الملكي',
    nameFr: 'Lagune d’Oualidia & Huîtres',
    nameEn: 'Oualidia Oyster Lagoon',
    coast: 'atlantic',
    lat: 32.733,
    lon: -9.033,
    crieeType: 'Comptoir d’Agréage',
    regionNameAr: 'الدار البيضاء سطات',
    regionNameFr: 'Casablanca-Settat',
    regionNameEn: 'Casablanca-Settat',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 523 36 60 20',
  },
  {
    id: 'safi',
    nameAr: 'ميناء آسفي (عاصمة السردين العالمية)',
    nameFr: 'Port de Safi (Capitale de la Sardine)',
    nameEn: 'Port of Safi (Sardine Capital)',
    coast: 'atlantic',
    lat: 32.308,
    lon: -9.248,
    crieeType: 'Halle au Poisson',
    regionNameAr: 'مراكش آسفي',
    regionNameFr: 'Marrakech-Safi',
    regionNameEn: 'Marrakech-Safi',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 524 62 25 10',
  },
  {
    id: 'essaouira',
    nameAr: 'ميناء الصويرة (موغادور التاريخية)',
    nameFr: 'Port d’Essaouira (Mogador)',
    nameEn: 'Port of Essaouira (Mogador)',
    coast: 'atlantic',
    lat: 31.512,
    lon: -9.771,
    crieeType: 'Halle au Poisson',
    regionNameAr: 'مراكش آسفي',
    regionNameFr: 'Marrakech-Safi',
    regionNameEn: 'Marrakech-Safi',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 524 47 40 50',
  },
  {
    id: 'agadir',
    nameAr: 'ميناء أكادير الكبير وأنزا',
    nameFr: 'Port d’Agadir & Anza',
    nameEn: 'Port of Agadir & Anza',
    coast: 'atlantic',
    lat: 30.428,
    lon: -9.625,
    crieeType: 'Halle au Poisson',
    regionNameAr: 'سوس ماسة',
    regionNameFr: 'Souss-Massa',
    regionNameEn: 'Souss-Massa',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 528 84 10 20',
  },
  {
    id: 'sidi-ifni',
    nameAr: 'ميناء سيدي إفني والشاطئ الأبيض',
    nameFr: 'Port de Sidi Ifni & Plage Blanche',
    nameEn: 'Port of Sidi Ifni',
    coast: 'atlantic',
    lat: 29.379,
    lon: -10.178,
    crieeType: 'Halle au Poisson',
    regionNameAr: 'كلميم واد نون',
    regionNameFr: 'Guelmim-Oued Noun',
    regionNameEn: 'Guelmim-Oued Noun',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 528 87 50 15',
  },
  {
    id: 'tan-tan',
    nameAr: 'ميناء طانطان (الوطية الكبير)',
    nameFr: 'Port de Tan-Tan (El Ouatia)',
    nameEn: 'Port of Tan-Tan (El Ouatia)',
    coast: 'atlantic',
    lat: 28.497,
    lon: -11.332,
    crieeType: 'Halle au Poisson',
    regionNameAr: 'كلميم واد نون',
    regionNameFr: 'Guelmim-Oued Noun',
    regionNameEn: 'Guelmim-Oued Noun',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 528 87 80 40',
  },
  {
    id: 'laayoune',
    nameAr: 'ميناء العيون المرسى (المنصة الوطنية الكبرى)',
    nameFr: 'Port de Laâyoune - Marsa',
    nameEn: 'Port of Laayoune - Marsa',
    coast: 'atlantic',
    lat: 27.093,
    lon: -13.415,
    crieeType: 'Halle au Poisson',
    regionNameAr: 'العيون الساقية الحمراء',
    regionNameFr: 'Laâyoune-Sakia El Hamra',
    regionNameEn: 'Laayoune-Sakia El Hamra',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 528 89 20 10',
  },
  {
    id: 'boujdour',
    nameAr: 'ميناء بوجدور (كاب بوجدور)',
    nameFr: 'Port de Boujdour (Cap Bojador)',
    nameEn: 'Port of Boujdour',
    coast: 'atlantic',
    lat: 26.126,
    lon: -14.484,
    crieeType: 'Halle au Poisson',
    regionNameAr: 'العيون الساقية الحمراء',
    regionNameFr: 'Laâyoune-Sakia El Hamra',
    regionNameEn: 'Laayoune-Sakia El Hamra',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 528 89 60 12',
  },
  {
    id: 'dakhla',
    nameAr: 'ميناء الداخلة (وادي الذهب ورأس تيرس)',
    nameFr: 'Port de Dakhla (Baie d’Oued Ed-Dahab)',
    nameEn: 'Port of Dakhla (Gold Bay)',
    coast: 'atlantic',
    lat: 23.714,
    lon: -15.935,
    crieeType: 'Halle au Poisson',
    regionNameAr: 'الداخلة وادي الذهب',
    regionNameFr: 'Dakhla-Oued Ed-Dahab',
    regionNameEn: 'Dakhla-Oued Ed-Dahab',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 528 89 70 80',
  },
  {
    id: 'lagouira',
    nameAr: 'ميناء الكويرة ورأس نواذيبو (الحدود الجنوبية)',
    nameFr: 'Port de Lagouira (Cap Blanc)',
    nameEn: 'Port of Lagouira (Cap Blanc)',
    coast: 'atlantic',
    lat: 20.832,
    lon: -17.090,
    crieeType: 'Comptoir d’Agréage',
    regionNameAr: 'الداخلة وادي الذهب',
    regionNameFr: 'Dakhla-Oued Ed-Dahab',
    regionNameEn: 'Dakhla-Oued Ed-Dahab',
    vhfFrequencyMhz: 156.8,
    emergencyPhone: '+212 528 89 70 80',
  },
]

export const MOROCCAN_MPAS_GPS: MarineProtectedAreaGps[] = [
  {
    id: 'amp-hoceima',
    nameAr: 'المحمية البحرية للحسيمة (Parc National)',
    nameFr: 'Aire Marine Protégée d’Al Hoceïma',
    nameEn: 'Al Hoceima Marine Protected Area',
    lat: 35.20,
    lon: -4.10,
    radiusNM: 4.5,
    legalProtection: 'Loi 22-07 & Décret 2-04-503',
    restrictionsAr: 'ممنوع الصيد بالجرف (الشباك القاعية) نهائياً؛ حماية صقر أوسبري والدلفين الأسود وتكاثر الميرو.',
    restrictionsFr: 'Chalutage strictement interdit. Zone de frayère pour le mérou et sanctuaire des cétacés.',
    restrictionsEn: 'Trawling strictly forbidden. Prime nursery for dusky groupers and cetaceans.',
  },
  {
    id: 'amp-marchica',
    nameAr: 'محمية بحيرة مارشيكا (الناظور)',
    nameFr: 'Réserve Lagunaire de Marchica (Nador)',
    nameEn: 'Marchica Lagoon Protected Reserve',
    lat: 35.15,
    lon: -2.85,
    radiusNM: 3.2,
    legalProtection: 'Site RAMSAR & Dahir 1973',
    restrictionsAr: 'حظر شباك الصيد غير القانونية؛ حماية موائل الحنكليس ومحار بحيرة مارشيكا الطبيعية.',
    restrictionsFr: 'Chasse et chalutage interdits. Sanctuaire des civelles et coquillages naturels.',
    restrictionsEn: 'Hunting and trawling prohibited. Natural nursery for glass eels and clams.',
  },
  {
    id: 'amp-boughaba',
    nameAr: 'محمية سيدي بوغابة ومصب سبو (المهدية)',
    nameFr: 'Réserve Naturelle de Sidi Boughaba (Mehdia)',
    nameEn: 'Sidi Boughaba Coastal Reserve',
    lat: 34.24,
    lon: -6.65,
    radiusNM: 2.8,
    legalProtection: 'Site RAMSAR International',
    restrictionsAr: 'مصب نهري حساس؛ حظر الصيد بالشباك الدقيقة وتكاثر صغار الصول والدرعي.',
    restrictionsFr: 'Zone côtière sensible d’estuaire ; frayère des alevins de sole et de loup.',
    restrictionsEn: 'Sensitive coastal estuary; nursery grounds for juvenile sole and sea bass.',
  },
  {
    id: 'amp-souss',
    nameAr: 'المحمية البحرية سوس-ماسة (أكادير)',
    nameFr: 'Parc National du Souss-Massa (Littoral)',
    nameEn: 'Souss-Massa National Marine Reserve',
    lat: 30.08,
    lon: -9.68,
    radiusNM: 5.0,
    legalProtection: 'Décret N° 2-91-518',
    restrictionsAr: 'ملاذ طائر أبو منجل الأقرع؛ حظر الاقتراب من مناطق تعشيش السواحل والراحة البيولوجية.',
    restrictionsFr: 'Sanctuaire de l’Ibis Chauve ; navigation côtière motorisée restreinte près des falaises.',
    restrictionsEn: 'Northern Bald Ibis sanctuary; motorized coastal traffic strictly regulated.',
  },
  {
    id: 'amp-dakhla',
    nameAr: 'محمية خليج وادي الذهب (الداخلة)',
    nameFr: 'Sanctuaire de la Baie d’Oued Ed-Dahab (Dakhla)',
    nameEn: 'Dakhla Rio de Oro Marine Sanctuary',
    lat: 23.70,
    lon: -15.90,
    radiusNM: 6.0,
    legalProtection: 'Site RAMSAR & Décret Halieutique',
    restrictionsAr: 'حظر صيد الأخطبوط في فترات الراحة البيولوجية؛ حماية فقمة الراهب المتوسطية والدلافين.',
    restrictionsFr: 'Repos biologique rigoureux pour le poulpe ; sanctuaire du phoque moine et des dauphins.',
    restrictionsEn: 'Strict octopus bio-rest enforcement; sanctuary for monk seals and dolphins.',
  },
]

export const FAMOUS_FISHING_GROUNDS: FamousFishingGround[] = [
  {
    id: 'detroit-tanger',
    nameAr: 'مضيق جبل طارق وخندق طنجة',
    nameFr: 'Détroit de Gibraltar & Fosse de Tanger',
    nameEn: 'Strait of Gibraltar & Tangier Trench',
    lat: 35.88,
    lon: -5.75,
    targetSpeciesAr: ['التونة الحمراء', 'الإسبادون', 'لوبينا (درعي)'],
    targetSpeciesFr: ['Thon Rouge', 'Espadon', 'Bar Loup'],
    targetSpeciesEn: ['Bluefin Tuna', 'Swordfish', 'Sea Bass'],
    depthMeters: 450,
    descriptionAr: 'معبر الهجرة التاريخي للأسماك السطحية الكبرى بين المحيط الأطلسي والبحر الأبيض المتوسط.',
    descriptionFr: 'Couloir migratoire majeur des pélagiques géants entre l’Atlantique et la Méditerranée.',
  },
  {
    id: 'banc-safi',
    nameAr: 'بانكو آسفي الأطلسي',
    nameFr: 'Banc de Safi (Fosse Sardinière)',
    nameEn: 'Safi Atlantic Bank',
    lat: 32.35,
    lon: -9.40,
    targetSpeciesAr: ['السردين الأطلسي', 'الراية', 'الفرخ'],
    targetSpeciesFr: ['Sardine Pilchardus', 'Raie', 'Congre'],
    targetSpeciesEn: ['Sardine', 'Skate', 'Conger Eel'],
    depthMeters: 180,
    descriptionAr: 'أغنى منطقة صعود للمياه الباردة (Upwelling) المغذية لمليارات السردين.',
    descriptionFr: 'Zone majeure d’upwelling riche en nutriments alimentant la plus grande biomasse de sardine.',
  },
  {
    id: 'fosse-essaouira',
    nameAr: 'خندق موغادور وقاع الصويرة',
    nameFr: 'Fosse d’Essaouira (Cap Sim)',
    nameEn: 'Essaouira Mogador Trench',
    lat: 31.55,
    lon: -9.95,
    targetSpeciesAr: ['الميرلا الحرة', 'الشرغو', 'السيبيا'],
    targetSpeciesFr: ['Merlu Blanc', 'Sar', 'Seiche'],
    targetSpeciesEn: ['White Hake', 'Sea Bream', 'Cuttlefish'],
    depthMeters: 220,
    descriptionAr: 'منطقة صيد الأسماك البيضاء النبيلة ذات الجودة الاستثنائية للأسواق الملكية والأوروبية.',
    descriptionFr: 'Zone de pêche réputée pour le merlu blanc et les sparidés nobles.',
  },
  {
    id: 'bassin-agadir',
    nameAr: 'أعماق سوس ومغارة أنزا',
    nameFr: 'Fosse d’Agadir & Anza',
    nameEn: 'Agadir Souss Deep Basin',
    lat: 30.40,
    lon: -9.85,
    targetSpeciesAr: ['تازنكارت (سردين)', 'الأخطبوط', 'الصول الملكي'],
    targetSpeciesFr: ['Sardine', 'Poulpe', 'Sole Royale'],
    targetSpeciesEn: ['Sardine', 'Octopus', 'Dover Sole'],
    depthMeters: 160,
    descriptionAr: 'حوض دافئ يلتقي فيه الأسطول الساحلي مع مزارع المحار والرخويات الأطلسية.',
    descriptionFr: 'Bassin hauturier où opèrent les plus grands senneurs côtiers du Royaume.',
  },
  {
    id: 'fosse-dakhla',
    nameAr: 'حوض رأس تيرس وخليج وادي الذهب',
    nameFr: 'Plateau du Sahara & Dakhla (Cap Blanc)',
    nameEn: 'Sahara Cephalopod Bank & Dakhla',
    lat: 23.75,
    lon: -16.05,
    targetSpeciesAr: ['أخطبوط واد الذهب N°1', 'الكوربين الصحراوي', 'الكلمار'],
    targetSpeciesFr: ['Poulpe Sauvage', 'Courbine', 'Calmar Géant'],
    targetSpeciesEn: ['Octopus', 'Meagre', 'Giant Squid'],
    depthMeters: 120,
    descriptionAr: 'أجود وأكبر مخزون للأخطبوط في العالم (التصدير الأول لليابان وإسبانيا).',
    descriptionFr: 'Le réservoir mondial n°1 du poulpe d’or, fleuron de la criée de Dakhla.',
  },
]

/**
 * Great-circle distance between two GPS coordinates using Haversine formula (km)
 */
export function haversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c * 10) / 10
}

/**
 * Great-circle distance in Nautical Miles (1 NM = 1.852 km)
 */
export function haversineDistanceNM(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const km = haversineDistanceKm(lat1, lon1, lat2, lon2)
  return Math.round((km / 1.852) * 10) / 10
}

/**
 * Calculate initial compass bearing (azimuth 0 - 359 degrees) from origin to destination
 */
export function calculateBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)
  const θ = Math.atan2(y, x)
  const bearing = ((θ * 180) / Math.PI + 360) % 360
  return Math.round(bearing)
}

export interface CompassHeading {
  code: string
  degrees: number
  labelAr: string
  labelFr: string
  labelEn: string
}

export function getCompassHeading(degrees: number): CompassHeading {
  const normalized = ((degrees % 360) + 360) % 360
  const sectors = [
    { code: 'N', labelAr: 'شمال', labelFr: 'Nord', labelEn: 'North' },
    { code: 'NNE', labelAr: 'شمال شمال-شرق', labelFr: 'Nord-Nord-Est', labelEn: 'North-North-East' },
    { code: 'NE', labelAr: 'شمال-شرق', labelFr: 'Nord-Est', labelEn: 'North-East' },
    { code: 'ENE', labelAr: 'شرق شمال-شرق', labelFr: 'Est-Nord-Est', labelEn: 'East-North-East' },
    { code: 'E', labelAr: 'شرق', labelFr: 'Est', labelEn: 'East' },
    { code: 'ESE', labelAr: 'شرق جنوب-شرق', labelFr: 'Est-Sud-Est', labelEn: 'East-South-East' },
    { code: 'SE', labelAr: 'جنوب-شرق', labelFr: 'Sud-Est', labelEn: 'South-East' },
    { code: 'SSE', labelAr: 'جنوب جنوب-شرق', labelFr: 'Sud-Sud-Est', labelEn: 'South-South-East' },
    { code: 'S', labelAr: 'جنوب', labelFr: 'Sud', labelEn: 'South' },
    { code: 'SSW', labelAr: 'جنوب جنوب-غرب', labelFr: 'Sud-Sud-Ouest', labelEn: 'South-South-West' },
    { code: 'SW', labelAr: 'جنوب-غرب', labelFr: 'Sud-Ouest', labelEn: 'South-West' },
    { code: 'WSW', labelAr: 'غرب جنوب-غرب', labelFr: 'Ouest-Sud-Ouest', labelEn: 'West-South-West' },
    { code: 'W', labelAr: 'غرب', labelFr: 'Ouest', labelEn: 'West' },
    { code: 'WNW', labelAr: 'غرب شمال-غرب', labelFr: 'Ouest-Nord-Ouest', labelEn: 'West-North-West' },
    { code: 'NW', labelAr: 'شمال-غرب', labelFr: 'Nord-Ouest', labelEn: 'North-West' },
    { code: 'NNW', labelAr: 'شمال شمال-غرب', labelFr: 'Nord-Nord-Ouest', labelEn: 'North-North-West' },
  ]
  const index = Math.round(normalized / 22.5) % 16
  const item = sectors[index]!
  return {
    code: item.code,
    degrees: normalized,
    labelAr: item.labelAr,
    labelFr: item.labelFr,
    labelEn: item.labelEn,
  }
}

export type MoroccanMaritimeZoneType =
  | 'territorial'
  | 'contiguous'
  | 'eez'
  | 'international'

export interface MoroccanMaritimeZoneInfo {
  type: MoroccanMaritimeZoneType
  titleAr: string
  titleFr: string
  titleEn: string
  descriptionAr: string
  descriptionFr: string
  descriptionEn: string
  legalDahirRef: string
  badgeColorClass: string
}

export function classifyMaritimeZone(distanceToNearestPortNM: number): MoroccanMaritimeZoneInfo {
  if (distanceToNearestPortNM <= 12) {
    return {
      type: 'territorial',
      titleAr: 'المياه الإقليمية المغربية (12 ميلاً بحرياً)',
      titleFr: 'Eaux Territoriales Marocaines (12 NM)',
      titleEn: 'Moroccan Territorial Waters (12 NM)',
      descriptionAr: 'سيادة وطنية كاملة للمملكة المغربية. يطبق ظهير 1973 وقوانين الصيد ومراقبة خفر السواحل.',
      descriptionFr: 'Souveraineté étatique intégrale du Royaume du Maroc selon la convention de Montego Bay et le Dahir de 1973.',
      descriptionEn: 'Full sovereign territorial waters of the Kingdom of Morocco under Dahir 1973 and UNCLOS.',
      legalDahirRef: 'ظهير شريف رقم 1-73-211 والقانون رقم 1-81 المعين لحدود المياه الإقليمية',
      badgeColorClass: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    }
  }

  if (distanceToNearestPortNM <= 24) {
    return {
      type: 'contiguous',
      titleAr: 'المنطقة المتاخمة المغربية (12 إلى 24 ميلاً)',
      titleFr: 'Zone Contiguë Marocaine (12 à 24 NM)',
      titleEn: 'Moroccan Contiguous Zone (12 to 24 NM)',
      descriptionAr: 'نطاق مراقبة جمركية، ضريبية، صحية وأمنية من طرف البحرية الملكية والدرك الملكي البحري.',
      descriptionFr: 'Zone de contrôle douanier, fiscal, sanitaire et sécuritaire par la Marine Royale.',
      descriptionEn: 'Customs, immigration, and environmental security control zone under Royal Navy oversight.',
      legalDahirRef: 'القانون رقم 37.17 المغير والمتمم للظهير الشريف رقم 1.73.211',
      badgeColorClass: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
    }
  }

  if (distanceToNearestPortNM <= 200) {
    return {
      type: 'eez',
      titleAr: 'المنطقة الاقتصادية الخالصة للمملكة (ZEE 200 ميل)',
      titleFr: 'Zone Économique Exclusive Marocaine (ZEE 200 NM)',
      titleEn: 'Moroccan Exclusive Economic Zone (200 NM)',
      descriptionAr: 'حقوق سيادية استكشافية واستغلالية حصرية للمملكة على كافة الثروات السمكية والبيولوجية وقاع البحر.',
      descriptionFr: 'Droits souverains exclusifs du Maroc sur l’exploration, l’exploitation des ressources halieutiques vivantes.',
      descriptionEn: 'Exclusive sovereign Moroccan rights over fisheries and maritime resources up to 200 nautical miles.',
      legalDahirRef: 'ظهير شريف رقم 1-81-179 بإصدار القانون رقم 1-81 المنشئ لمنطقة اقتصادية خالصة',
      badgeColorClass: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    }
  }

  return {
    type: 'international',
    titleAr: 'أعالي البحار الدولية (> 200 ميل)',
    titleFr: 'Haute Mer Internationale (> 200 NM)',
    titleEn: 'International High Seas (> 200 NM)',
    descriptionAr: 'مياه دولية تخضع للقانون الدولي للبحار والمنظمات الإقليمية للصيد (ICCAT / FAO).',
    descriptionFr: 'Eaux internationales régies par la convention de Montego Bay et les quotas ICCAT.',
    descriptionEn: 'International waters governed by UNCLOS and regional fisheries management organizations (ICCAT).',
    legalDahirRef: 'Convention des Nations Unies sur le Droit de la Mer (UNCLOS)',
    badgeColorClass: 'border-slate-500/40 bg-slate-500/10 text-slate-300',
  }
}

/**
 * Find closest Moroccan port with distance, bearing, and estimated sailing time
 */
export function findNearestPort(lat: number, lon: number): {
  port: MoroccanPortGpsPoint
  distanceKm: number
  distanceNM: number
  bearingDeg: number
  heading: CompassHeading
  sailingTimeHours: number
} {
  let closest = MOROCCAN_PORTS_GPS[0]!
  let minKm = haversineDistanceKm(lat, lon, closest.lat, closest.lon)

  for (let i = 1; i < MOROCCAN_PORTS_GPS.length; i++) {
    const p = MOROCCAN_PORTS_GPS[i]!
    const km = haversineDistanceKm(lat, lon, p.lat, p.lon)
    if (km < minKm) {
      minKm = km
      closest = p
    }
  }

  const distanceNM = Math.round((minKm / 1.852) * 10) / 10
  const bearingDeg = calculateBearing(lat, lon, closest.lat, closest.lon)
  const heading = getCompassHeading(bearingDeg)
  // Assuming typical artisanal barque / trawler cruising speed of 8 knots
  const sailingTimeHours = Math.round((distanceNM / 8) * 10) / 10

  return {
    port: closest,
    distanceKm: minKm,
    distanceNM,
    bearingDeg,
    heading,
    sailingTimeHours,
  }
}

/**
 * Find closest Moroccan Marine Protected Area and evaluate safety alarm status
 */
export function findNearestMpa(lat: number, lon: number): {
  mpa: MarineProtectedAreaGps
  distanceNM: number
  isInsideOrWarning: boolean
  alarmLevel: 'safe' | 'warning' | 'prohibited'
} {
  let closest = MOROCCAN_MPAS_GPS[0]!
  let minNM = haversineDistanceNM(lat, lon, closest.lat, closest.lon)

  for (let i = 1; i < MOROCCAN_MPAS_GPS.length; i++) {
    const m = MOROCCAN_MPAS_GPS[i]!
    const dist = haversineDistanceNM(lat, lon, m.lat, m.lon)
    if (dist < minNM) {
      minNM = dist
      closest = m
    }
  }

  let alarmLevel: 'safe' | 'warning' | 'prohibited' = 'safe'
  if (minNM <= closest.radiusNM) {
    alarmLevel = 'prohibited'
  } else if (minNM <= closest.radiusNM + 3) {
    alarmLevel = 'warning'
  }

  return {
    mpa: closest,
    distanceNM: minNM,
    isInsideOrWarning: alarmLevel !== 'safe',
    alarmLevel,
  }
}

/**
 * Format decimal degrees to Nautical Degrees Minutes Seconds (DMS)
 * e.g. 33.606, -7.607 -> "33°36'22\" N, 007°36'25\" W"
 */
export function formatDMS(lat: number, lon: number): {
  latDMS: string
  lonDMS: string
  fullString: string
} {
  const formatCoord = (deg: number, isLat: boolean) => {
    const absolute = Math.abs(deg)
    const d = Math.floor(absolute)
    const minutesNotTruncated = (absolute - d) * 60
    const m = Math.floor(minutesNotTruncated)
    const s = Math.round((minutesNotTruncated - m) * 60)

    const padDeg = isLat ? String(d).padStart(2, '0') : String(d).padStart(3, '0')
    const padMin = String(m).padStart(2, '0')
    const padSec = String(s).padStart(2, '0')

    const dir = isLat ? (deg >= 0 ? 'N' : 'S') : (deg >= 0 ? 'E' : 'W')
    return `${padDeg}°${padMin}'${padSec}" ${dir}`
  }

  const latDMS = formatCoord(lat, true)
  const lonDMS = formatCoord(lon, false)
  return {
    latDMS,
    lonDMS,
    fullString: `${latDMS}, ${lonDMS}`,
  }
}

/**
 * Format distress message for VHF Canal 16 / MRCC Rabat Maritime Rescue
 */
export function formatVhfMayday(
  lat: number,
  lon: number,
  nearestPortName: string,
  distanceNM: number,
  vesselName: string = 'BARQUE ARTISANALE DU MAROC'
): {
  french: string
  arabic: string
} {
  const dms = formatDMS(lat, lon)
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'

  const french = `MAYDAY, MAYDAY, MAYDAY.
ICI : ${vesselName}.
POSITION GPS : ${dms.fullString}.
DISTANCE : À ${distanceNM} NM DU ${nearestPortName.toUpperCase()}.
HORODATAGE : ${timestamp}.
CANAL 16 VHF (156.800 MHz) · MRCC RABAT (+212 537 62 58 77).`

  const arabic = `نداء استغاثة عاجل (MAYDAY MAYDAY MAYDAY)
من قارب الصيد: ${vesselName}
الإحداثيات البحرية (GPS): ${dms.fullString}
الموقع: على بعد ${distanceNM} ميل بحري من ${nearestPortName}
التوقيت: ${timestamp}
قناة النجدة البحرية VHF 16 · مركز تنسيق الإنقاذ البحري الرباط (MRCC)`

  return { french, arabic }
}

import React, { useState, useMemo } from 'react'
import {
  Compass,
  Waves,
  Wind,
  Thermometer,
  Anchor,
  ShieldCheck,
  Fish,
  Layers,
  ArrowRight,
} from 'lucide-react'
import type { SupportedLanguage } from '../i18n/strings'
import type { MoroccanPortRegion } from '../lib/moroccanRegions'
import { sounds } from '../lib/soundEffects'

export interface PortPoint {
  id: string
  regionId: string
  nameAr: string
  nameFr: string
  nameEn: string
  coast: 'mediterranean' | 'atlantic'
  cx: number // 0-1000 SVG coordinates
  cy: number
  waveHeightM: number
  windKnots: number
  tempC: number
  topCatchAr: string[]
  topCatchFr: string[]
  topCatchEn: string[]
  crieeType: 'Halle au Poisson' | 'Comptoir d’Agréage'
  fleetStats: {
    artisanalBarques: number
    coastalSeiners: number
    trawlers: number
  }
  annualTonnageTonnes: number
  onpRank: number
}

export interface MarineProtectedArea {
  id: string
  nameAr: string
  nameFr: string
  nameEn: string
  typeAr: string
  typeFr: string
  cx: number
  cy: number
  areaKm2: number
  keySpeciesAr: string[]
  keySpeciesFr: string[]
  legalProtection: string
  descriptionAr: string
  descriptionFr: string
}

export interface FisheryCorridor {
  id: string
  nameAr: string
  nameFr: string
  nameEn: string
  biomassTypeAr: string
  biomassTypeFr: string
  startCoord: [number, number]
  endCoord: [number, number]
  topSpeciesAr: string[]
  topSpeciesFr: string[]
  descriptionAr: string
  descriptionFr: string
}

export const MOROCCAN_COASTAL_PORTS: PortPoint[] = [
  {
    id: 'saidia',
    regionId: 'oriental',
    nameAr: 'السعيدية (الجوهرة الزرقاء والحدود)',
    nameFr: 'Saïdia (Perle Bleue)',
    nameEn: 'Saidia',
    coast: 'mediterranean',
    cx: 890,
    cy: 70,
    waveHeightM: 0.6,
    windKnots: 8,
    tempC: 19.5,
    topCatchAr: ['سالمونيتي', 'الكلمار', 'الباخيل'],
    topCatchFr: ['Rouget', 'Calmar', 'Pageot'],
    topCatchEn: ['Red Mullet', 'Squid', 'Pageot'],
    crieeType: 'Comptoir d’Agréage',
    fleetStats: { artisanalBarques: 120, coastalSeiners: 14, trawlers: 6 },
    annualTonnageTonnes: 3200,
    onpRank: 16,
  },
  {
    id: 'nador',
    regionId: 'oriental',
    nameAr: 'بني نصار / الناظور ومارشيكا',
    nameFr: 'Beni Ensar / Nador & Marchica',
    nameEn: 'Beni Ensar / Nador',
    coast: 'mediterranean',
    cx: 840,
    cy: 85,
    waveHeightM: 0.8,
    windKnots: 11,
    tempC: 19.2,
    topCatchAr: ['تيتشوكْتْ (سردين)', 'الغامبا', 'بوزروك مارشيكا'],
    topCatchFr: ['Sardine', 'Gambas', 'Palourdes'],
    topCatchEn: ['Sardines', 'Prawns', 'Clams'],
    crieeType: 'Halle au Poisson',
    fleetStats: { artisanalBarques: 450, coastalSeiners: 62, trawlers: 38 },
    annualTonnageTonnes: 28500,
    onpRank: 7,
  },
  {
    id: 'hoceima',
    regionId: 'chamal',
    nameAr: 'الحسيمة (جوهرة الريف وخليج النكور)',
    nameFr: 'Al Hoceïma',
    nameEn: 'Al Hoceima',
    coast: 'mediterranean',
    cx: 740,
    cy: 95,
    waveHeightM: 1.1,
    windKnots: 14,
    tempC: 18.8,
    topCatchAr: ['الميرو', 'الإسبادون', 'الباجو الحجري'],
    topCatchFr: ['Mérou', 'Espadon', 'Pageot'],
    topCatchEn: ['Grouper', 'Swordfish', 'Pageot'],
    crieeType: 'Halle au Poisson',
    fleetStats: { artisanalBarques: 380, coastalSeiners: 44, trawlers: 22 },
    annualTonnageTonnes: 19400,
    onpRank: 9,
  },
  {
    id: 'tanger-med',
    regionId: 'chamal',
    nameAr: 'طنجة المتوسط والبوغاز (جبل طارق)',
    nameFr: 'Tanger Med & Détroit',
    nameEn: 'Tangier Med & Strait',
    coast: 'mediterranean',
    cx: 600,
    cy: 65,
    waveHeightM: 1.4,
    windKnots: 18,
    tempC: 18.1,
    topCatchAr: ['التونة الحمراء', 'السيف', 'لوبينا (درعي)'],
    topCatchFr: ['Thon Rouge', 'Espadon', 'Bar Loup'],
    topCatchEn: ['Bluefin Tuna', 'Swordfish', 'Sea Bass'],
    crieeType: 'Halle au Poisson',
    fleetStats: { artisanalBarques: 520, coastalSeiners: 78, trawlers: 45 },
    annualTonnageTonnes: 44200,
    onpRank: 5,
  },
  {
    id: 'larache',
    regionId: 'chamal',
    nameAr: 'العرائش ومصب وادي لوكوس',
    nameFr: 'Larache & Oued Loukkos',
    nameEn: 'Larache',
    coast: 'atlantic',
    cx: 560,
    cy: 130,
    waveHeightM: 1.6,
    windKnots: 15,
    tempC: 18.5,
    topCatchAr: ['روبيو', 'الأنشوا', 'الصول'],
    topCatchFr: ['Rouget', 'Anchois', 'Sole'],
    topCatchEn: ['Red Mullet', 'Anchovy', 'Sole'],
    crieeType: 'Halle au Poisson',
    fleetStats: { artisanalBarques: 310, coastalSeiners: 56, trawlers: 34 },
    annualTonnageTonnes: 26800,
    onpRank: 8,
  },
  {
    id: 'mehdia',
    regionId: 'centre',
    nameAr: 'المهدية وقنيطرة (مصب واد سبو)',
    nameFr: 'Mehdia & Kénitra (Sebou)',
    nameEn: 'Mehdia & Kenitra',
    coast: 'atlantic',
    cx: 520,
    cy: 175,
    waveHeightM: 1.7,
    windKnots: 13,
    tempC: 18.7,
    topCatchAr: ['الصول الحر', 'اللانغوستين', 'الشرن'],
    topCatchFr: ['Sole', 'Langoustine', 'Chinchard'],
    topCatchEn: ['Sole', 'Norway Lobster', 'Horse Mackerel'],
    crieeType: 'Halle au Poisson',
    fleetStats: { artisanalBarques: 220, coastalSeiners: 28, trawlers: 19 },
    annualTonnageTonnes: 14500,
    onpRank: 11,
  },
  {
    id: 'casablanca',
    regionId: 'centre',
    nameAr: 'ميناء الدار البيضاء والمحمدية',
    nameFr: 'Port de Casablanca & Mohammedia',
    nameEn: 'Casablanca & Mohammedia',
    coast: 'atlantic',
    cx: 480,
    cy: 220,
    waveHeightM: 1.8,
    windKnots: 16,
    tempC: 18.9,
    topCatchAr: ['الميرلا', 'الكوربين', 'الصول الملكي'],
    topCatchFr: ['Merlan', 'Courbine', 'Sole'],
    topCatchEn: ['Hake', 'Meagre', 'Sole'],
    crieeType: 'Halle au Poisson',
    fleetStats: { artisanalBarques: 640, coastalSeiners: 112, trawlers: 88 },
    annualTonnageTonnes: 62000,
    onpRank: 4,
  },
  {
    id: 'oualidia',
    regionId: 'doukkala_abda',
    nameAr: 'الوليدية وبحيرة المحار الطبيعية',
    nameFr: 'Oualidia & Lagune d’Huîtres',
    nameEn: 'Oualidia Oyster Lagoon',
    coast: 'atlantic',
    cx: 410,
    cy: 290,
    waveHeightM: 1.5,
    windKnots: 12,
    tempC: 19.1,
    topCatchAr: ['المحار الملكي', 'بوجنبة (عقرب)', 'الدرعي'],
    topCatchFr: ['Huîtres N°2/3', 'Crabe', 'Bar'],
    topCatchEn: ['Oysters', 'Crabs', 'Sea Bass'],
    crieeType: 'Comptoir d’Agréage',
    fleetStats: { artisanalBarques: 180, coastalSeiners: 8, trawlers: 2 },
    annualTonnageTonnes: 4100,
    onpRank: 15,
  },
  {
    id: 'safi',
    regionId: 'doukkala_abda',
    nameAr: 'آسفي (عاصمة السردين العالمية)',
    nameFr: 'Safi (Capitale Mondiale de la Sardine)',
    nameEn: 'Safi (Sardine Capital)',
    coast: 'atlantic',
    cx: 380,
    cy: 335,
    waveHeightM: 2.1,
    windKnots: 17,
    tempC: 18.4,
    topCatchAr: ['السردين الأطلسي', 'الراية', 'الفرخ (كونغرو)'],
    topCatchFr: ['Sardine Pilchardus', 'Raie', 'Congre'],
    topCatchEn: ['Sardine', 'Skate', 'Conger Eel'],
    crieeType: 'Halle au Poisson',
    fleetStats: { artisanalBarques: 720, coastalSeiners: 145, trawlers: 62 },
    annualTonnageTonnes: 94000,
    onpRank: 3,
  },
  {
    id: 'essaouira',
    regionId: 'souss_massa',
    nameAr: 'الصويرة (موغادور التاريخية ورأس الحديد)',
    nameFr: 'Essaouira (Mogador)',
    nameEn: 'Essaouira (Mogador)',
    coast: 'atlantic',
    cx: 330,
    cy: 400,
    waveHeightM: 2.3,
    windKnots: 22,
    tempC: 17.9,
    topCatchAr: ['الميرلا الحرة', 'الشرغو', 'السيبيا'],
    topCatchFr: ['Merlu Blanc', 'Sar', 'Seiche'],
    topCatchEn: ['White Hake', 'Sea Bream', 'Cuttlefish'],
    crieeType: 'Halle au Poisson',
    fleetStats: { artisanalBarques: 490, coastalSeiners: 68, trawlers: 31 },
    annualTonnageTonnes: 38600,
    onpRank: 6,
  },
  {
    id: 'agadir',
    regionId: 'souss_massa',
    nameAr: 'أكادير (أنزا وميناء الصيد الكبير)',
    nameFr: 'Port d’Agadir & Anza',
    nameEn: 'Port of Agadir & Anza',
    coast: 'atlantic',
    cx: 290,
    cy: 480,
    waveHeightM: 1.9,
    windKnots: 14,
    tempC: 19.3,
    topCatchAr: ['تازنكارت (سردين)', 'الأخطبوط', 'الصول'],
    topCatchFr: ['Sardine', 'Poulpe', 'Sole'],
    topCatchEn: ['Sardines', 'Octopus', 'Sole'],
    crieeType: 'Halle au Poisson',
    fleetStats: { artisanalBarques: 890, coastalSeiners: 198, trawlers: 142 },
    annualTonnageTonnes: 148000,
    onpRank: 2,
  },
  {
    id: 'sidi-ifni',
    regionId: 'souss_massa',
    nameAr: 'سيدي إفني والشاطئ الأبيض',
    nameFr: 'Sidi Ifni & Plage Blanche',
    nameEn: 'Sidi Ifni',
    coast: 'atlantic',
    cx: 250,
    cy: 550,
    waveHeightM: 2.2,
    windKnots: 19,
    tempC: 18.6,
    topCatchAr: ['الكوربين الملكي', 'الدرعي', 'الروكبا (أخطبوط)'],
    topCatchFr: ['Courbine', 'Bar Loup', 'Poulpe'],
    topCatchEn: ['Meagre', 'Sea Bass', 'Octopus'],
    crieeType: 'Halle au Poisson',
    fleetStats: { artisanalBarques: 340, coastalSeiners: 38, trawlers: 16 },
    annualTonnageTonnes: 21500,
    onpRank: 10,
  },
  {
    id: 'tan-tan',
    regionId: 'sahara',
    nameAr: 'طانطان (ميناء الوطية الكبير)',
    nameFr: 'Tan-Tan (Port d’El Ouatia)',
    nameEn: 'Tan-Tan (El Ouatia)',
    coast: 'atlantic',
    cx: 220,
    cy: 610,
    waveHeightM: 2.1,
    windKnots: 18,
    tempC: 19.2,
    topCatchAr: ['السردين الصناعي', 'الأسماك السطحية', 'القرش'],
    topCatchFr: ['Sardine Industrielle', 'Pélagiques', 'Roussette'],
    topCatchEn: ['Industrial Sardine', 'Pelagics', 'Dogfish'],
    crieeType: 'Halle au Poisson',
    fleetStats: { artisanalBarques: 410, coastalSeiners: 110, trawlers: 74 },
    annualTonnageTonnes: 82000,
    onpRank: 5,
  },
  {
    id: 'laayoune',
    regionId: 'sahara',
    nameAr: 'العيون المرسى (المنصة الوطنية الكبرى)',
    nameFr: 'Laâyoune - Port de Marsa',
    nameEn: 'Laâyoune - Marsa Port',
    coast: 'atlantic',
    cx: 190,
    cy: 670,
    waveHeightM: 2.0,
    windKnots: 16,
    tempC: 19.8,
    topCatchAr: ['السردين والأسماك السطحية', 'كروفيت رويال', 'التونة'],
    topCatchFr: ['Pélagiques', 'Crevette Royale', 'Thon'],
    topCatchEn: ['Small Pelagics', 'King Prawns', 'Tuna'],
    crieeType: 'Halle au Poisson',
    fleetStats: { artisanalBarques: 920, coastalSeiners: 240, trawlers: 160 },
    annualTonnageTonnes: 340000,
    onpRank: 1,
  },
  {
    id: 'boujdour',
    regionId: 'sahara',
    nameAr: 'بوجدور (ميناء كاب بوجدور)',
    nameFr: 'Boujdour (Cap Bojador)',
    nameEn: 'Boujdour',
    coast: 'atlantic',
    cx: 155,
    cy: 760,
    waveHeightM: 1.9,
    windKnots: 17,
    tempC: 19.9,
    topCatchAr: ['أخطبوط بوجدور', 'الصول الصحراوي', 'الكوربين'],
    topCatchFr: ['Poulpe', 'Sole', 'Courbine'],
    topCatchEn: ['Octopus', 'Sole', 'Meagre'],
    crieeType: 'Halle au Poisson',
    fleetStats: { artisanalBarques: 680, coastalSeiners: 45, trawlers: 28 },
    annualTonnageTonnes: 46000,
    onpRank: 6,
  },
  {
    id: 'dakhla',
    regionId: 'sahara',
    nameAr: 'الداخلة (رأس تيرس وخليج وادي الذهب)',
    nameFr: 'Dakhla & Baie de Rio de Oro',
    nameEn: 'Dakhla & Gold Bay',
    coast: 'atlantic',
    cx: 120,
    cy: 850,
    waveHeightM: 1.7,
    windKnots: 15,
    tempC: 20.2,
    topCatchAr: ['أخطبوط واد الذهب N°1', 'الكالامار', 'الكوربين الصحراوي'],
    topCatchFr: ['Poulpe N°1 Mondial', 'Calmar', 'Courbine'],
    topCatchEn: ['Octopus N°1', 'Squid', 'Meagre'],
    crieeType: 'Halle au Poisson',
    fleetStats: { artisanalBarques: 1450, coastalSeiners: 85, trawlers: 120 },
    annualTonnageTonnes: 195000,
    onpRank: 2,
  },
  {
    id: 'lagouira',
    regionId: 'sahara',
    nameAr: 'الكويرة ورأس نواذيبو (الحدود الجنوبية)',
    nameFr: 'Lagouira & Cap Blanc',
    nameEn: 'Lagouira & Cap Blanc',
    coast: 'atlantic',
    cx: 95,
    cy: 930,
    waveHeightM: 1.8,
    windKnots: 18,
    tempC: 20.6,
    topCatchAr: ['اللانغوست الملكي', 'الكوربين', 'الراية'],
    topCatchFr: ['Langouste Royale', 'Courbine', 'Raie'],
    topCatchEn: ['Royal Spiny Lobster', 'Meagre', 'Ray'],
    crieeType: 'Comptoir d’Agréage',
    fleetStats: { artisanalBarques: 210, coastalSeiners: 12, trawlers: 8 },
    annualTonnageTonnes: 8500,
    onpRank: 13,
  },
]

export const MOROCCAN_MARINE_RESERVES: MarineProtectedArea[] = [
  {
    id: 'pnah',
    nameAr: 'المنتزه الوطني للحسيمة (PNAH)',
    nameFr: 'Parc National d’Al Hoceïma',
    nameEn: 'Al Hoceima National Park',
    typeAr: 'محمية بحرية ساحلية · 19,600 هكتار',
    typeFr: 'Aire Marine Protégée (AMP) · 19 600 ha',
    cx: 740,
    cy: 105,
    areaKm2: 196,
    keySpeciesAr: ['الميرو البني', 'المرجان الأحمر', 'عقاب البحر (البلبوزارد)'],
    keySpeciesFr: ['Mérou brun', 'Corail rouge', 'Balbuzard pêcheur'],
    legalProtection: 'Décret royal n° 2-04-747 · Zone de non-prélèvement',
    descriptionAr: 'أكبر محمية بحرية صخرية بالبحر المتوسط المغربي، تشتهر بشعاب المرجان ومستعمرات تكاثر الدلفين الكبير والميرو.',
    descriptionFr: 'Plus vaste sanctuaire marin méditerranéen du Maroc abritant les derniers nids de balbuzard et le mérou protégé.',
  },
  {
    id: 'marchica',
    nameAr: 'بحيرة مارشيكا / الناظور (Ramsar)',
    nameFr: 'Lagune de Marchica (Nador)',
    nameEn: 'Marchica Coastal Lagoon',
    typeAr: 'بحيرة ساحلية وموقع رامسار · 115 كلم²',
    typeFr: 'Lagune Côtière & Site Ramsar · 115 km²',
    cx: 840,
    cy: 95,
    areaKm2: 115,
    keySpeciesAr: ['بوزروك مارشيكا', 'الوراطة الملكية (Dorade)', 'السيبيا'],
    keySpeciesFr: ['Palourdes', 'Dorade Royale', 'Seiche'],
    legalProtection: 'Convention Ramsar relative aux zones humides mondiales',
    descriptionAr: 'ثاني كبرى بحيرات شمال إفريقيا ومشتل حيوي طبيعي لتكاثر الصدفيات والأسماك العظمية تحت إشراف وكالة مارشيكا.',
    descriptionFr: 'Joyau lagunaire de 115 km² servant de nourricerie naturelle pour la dorade royale et la conchyliculture.',
  },
  {
    id: 'souss-massa',
    nameAr: 'المنتزه الوطني لسوس ماسة',
    nameFr: 'Parc National de Souss-Massa',
    nameEn: 'Souss-Massa National Park',
    typeAr: 'محمية مصبات الأنهار والمحيط الأطلسي',
    typeFr: 'Parc Estuarien & Réserve Marine',
    cx: 275,
    cy: 510,
    areaKm2: 338,
    keySpeciesAr: ['الدرعي (Bar Loup)', 'البوري الرمادي', 'سلطان إبراهيم'],
    keySpeciesFr: ['Bar Loup', 'Mulet', 'Rouget'],
    legalProtection: 'Loi n° 22-07 relative aux aires protégées',
    descriptionAr: 'مصب نهري واد سوس وواد ماسة، يشكل مأوى تكاثر استراتيجي لأسماك المياه متوسطة الملوحة والطيور المائية النادرة.',
    descriptionFr: 'Estuaire stratégique entre Agadir et Tiznit, essentiel pour la fraye du bar et des poissons démersaux.',
  },
  {
    id: 'dakhla-sanctuary',
    nameAr: 'محمية خليج وادي الذهب (الداخلة)',
    nameFr: 'Sanctuaire de la Baie d’Oued Ed-Dahab',
    nameEn: 'Dakhla Bay Marine Sanctuary',
    typeAr: 'محمية خليج المحيط الأطلسي · موقع رامسار',
    typeFr: 'Sanctuaire Marin Ramsar & Nurserie',
    cx: 125,
    cy: 865,
    areaKm2: 400,
    keySpeciesAr: ['أخطبوط السواحل', 'الكوربين الصحراوي', 'دلفين المحيط'],
    keySpeciesFr: ['Poulpe commun', 'Courbine', 'Grand Dauphin'],
    legalProtection: 'Arrêté ministériel repos biologique du poulpe (2 fois par an)',
    descriptionAr: 'أكبر حضانة طبيعية للأخطبوط في إفريقيا وخليج دافئ محمي من التيارات القوية، تنطبق عليه فترات الراحة البيولوجية الإلزامية.',
    descriptionFr: 'Première nurserie de poulpe en Afrique occidentale protégée par les arrêtés stricts de repos biologique.',
  },
]

export const MOROCCAN_FISHERY_CORRIDORS: FisheryCorridor[] = [
  {
    id: 'corridor-sardine',
    nameAr: 'الرواق الأطلسي للأسماك السطحية (آسفي - العيون)',
    nameFr: 'Grand Couloir Pélagique Sardinier (Safi - Laâyoune)',
    nameEn: 'Atlantic Sardine Pelagic Belt',
    biomassTypeAr: 'السردين والأنشوا والشرن والكبايلا',
    biomassTypeFr: 'Sardines, Anchois & Chinchards',
    startCoord: [380, 335],
    endCoord: [190, 670],
    topSpeciesAr: ['سردين المغرب', 'الأنشوا', 'الكبايلا'],
    topSpeciesFr: ['Sardina pilchardus', 'Engraulis encrasicolus', 'Scomber colias'],
    descriptionAr: 'منطقة الصيد الأغنى عالمياً بالأسماك السطحية الصغيرة، بفضل ظاهرة التيارات الصاعدة الباردة (Upwelling الكناري).',
    descriptionFr: 'Zone d’upwelling intense des Canaries générant la première biomasse sardinière exportée au monde.',
  },
  {
    id: 'corridor-poulpe',
    nameAr: 'حوض الرخويات والأخطبوط (بوجدور - الداخلة - الكويرة)',
    nameFr: 'Bassin Céphalopodier du Sahara (Dakhla - Cap Blanc)',
    nameEn: 'Sahara Cephalopod Corridor',
    biomassTypeAr: 'الأخطبوط، الكالامار، السيبيا، والكوربين',
    biomassTypeFr: 'Poulpe, Calmar, Seiche & Courbine',
    startCoord: [155, 760],
    endCoord: [95, 930],
    topSpeciesAr: ['الأخطبوط', 'الكلمار الصحراوي', 'الكوربين'],
    topSpeciesFr: ['Octopus vulgaris', 'Loligo vulgaris', 'Argyrosomus regius'],
    descriptionAr: 'المنطقة Halieutique رقم 1 لتصدير الرخويات إلى اليابان وأوروبا بنظام الحصص الفردية والراحة البيولوجية الصارمة.',
    descriptionFr: 'Zone halieutique reine pour l’export vers le Japon et l’UE avec quotas stricts et surveillance satellite VMS.',
  },
  {
    id: 'corridor-detroit',
    nameAr: 'ممر هجرة التونة وأسماك البوغاز (طنجة - البوغاز)',
    nameFr: 'Couloir de Migration du Détroit de Gibraltar',
    nameEn: 'Strait of Gibraltar Pelagic Highway',
    biomassTypeAr: 'التونة الحمراء، سمك السيف (Espadon)، والدرعي',
    biomassTypeFr: 'Thon Rouge (Madrague), Espadon & Bar',
    startCoord: [600, 65],
    endCoord: [560, 130],
    topSpeciesAr: ['التونة الحمراء', 'السيف', 'الباجو'],
    topSpeciesFr: ['Thunnus thynnus', 'Xiphias gladius', 'Pagellus'],
    descriptionAr: 'نقطة العبور الإلزامية لأسماك التونة المهاجرة بين المحيط الأطلسي والبحر الأبيض المتوسط وتاريخ مصايد المضربة (المدرابة).',
    descriptionFr: 'Carrefour migratoire séculaire reliant l’Atlantique à la Méditerranée avec les madragues traditionnelles marocaines.',
  },
]

export interface MoroccanCoastalRadarProps {
  lang: SupportedLanguage
  selectedRegion?: MoroccanPortRegion
  onSelectRegion?: (regionId: string) => void
  onFilterSpeciesByPort?: (portName: string) => void
  isStandaloneTab?: boolean
}

export const MoroccanCoastalRadar: React.FC<MoroccanCoastalRadarProps> = ({
  lang,
  selectedRegion,
  onSelectRegion,
  onFilterSpeciesByPort,
  isStandaloneTab = false,
}) => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'ports' | 'reserves' | 'corridors'>('all')
  const [selectedCoast, setSelectedCoast] = useState<'all' | 'atlantic' | 'mediterranean'>('all')
  const [hoveredPort, setHoveredPort] = useState<PortPoint | null>(null)
  const [selectedPortId, setSelectedPortId] = useState<string>('casablanca')
  const [selectedReserveId, setSelectedReserveId] = useState<string | null>(null)
  const [selectedCorridorId, setSelectedCorridorId] = useState<string | null>(null)

  const isRtl = lang === 'ar'

  const activePort: PortPoint = useMemo(() => {
    if (selectedPortId) {
      const match = MOROCCAN_COASTAL_PORTS.find((p) => p.id === selectedPortId)
      if (match) return match
    }
    if (selectedRegion) {
      const match = MOROCCAN_COASTAL_PORTS.find((p) => p.regionId === selectedRegion.id)
      if (match) return match
    }
    return MOROCCAN_COASTAL_PORTS[6] ?? MOROCCAN_COASTAL_PORTS[0]!
  }, [selectedPortId, selectedRegion])

  const displayPort: PortPoint = hoveredPort ?? activePort

  const filteredPorts = useMemo(() => {
    return MOROCCAN_COASTAL_PORTS.filter((p) => {
      if (selectedCoast === 'all') return true
      return p.coast === selectedCoast
    })
  }, [selectedCoast])

  const handleSelectPort = (port: PortPoint) => {
    sounds.playSonar()
    setSelectedPortId(port.id)
    setSelectedReserveId(null)
    setSelectedCorridorId(null)
    if (onSelectRegion) {
      onSelectRegion(port.regionId)
    }
  }

  const handleSelectReserve = (reserve: MarineProtectedArea) => {
    sounds.playBubble()
    setSelectedReserveId(reserve.id)
    setSelectedCorridorId(null)
  }

  const handleSelectCorridor = (corridor: FisheryCorridor) => {
    sounds.playBubble()
    setSelectedCorridorId(corridor.id)
    setSelectedReserveId(null)
  }

  const activeReserve = useMemo(
    () => MOROCCAN_MARINE_RESERVES.find((r) => r.id === selectedReserveId) || null,
    [selectedReserveId]
  )

  const activeCorridor = useMemo(
    () => MOROCCAN_FISHERY_CORRIDORS.find((c) => c.id === selectedCorridorId) || null,
    [selectedCorridorId]
  )

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-[#f6f1e7]/10 bg-[#0c1015] p-5 sm:p-7 shadow-2xl transition-all ${isStandaloneTab ? 'max-w-7xl mx-auto' : ''}`}>
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-cyan-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#d96b27]/10 blur-[120px]" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f6f1e7]/10 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-cyan-300">
            <Compass className="h-3.5 w-3.5 text-cyan-400" />
            <span>
              {lang === 'ar'
                ? 'نظام المعلومات الجغرافي البحري المغربي · 3,500 كلم'
                : lang === 'fr'
                ? 'SIG Maritime & Cartographie des Côtes du Maroc · 3 500 km'
                : 'Moroccan Marine GIS & Coastal Cartography · 3,500 km'}
            </span>
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#f6f1e7] sm:text-3xl">
            {lang === 'ar'
              ? 'الأطلس التفاعلي للموانئ، المحميات البحرية وبؤر الصيد'
              : lang === 'fr'
              ? 'Atlas Cartographique des Ports, Aires Marines & Couloirs Halieutiques'
              : 'Interactive Cartography of Ports, Marine Sanctuaries & Fishing Belts'}
          </h3>
          <p className="text-xs text-[#a69b8d]">
            {lang === 'ar'
              ? 'استكشف الموانئ الـ 17، المحميات الطبيعية (AMP)، وروافد الكتلة الحيوية مع ربط مباشر بأسعار المزاد وأسماك الموسوعة'
              : lang === 'fr'
              ? 'Explorez les 17 halles maritimes, réserves protégées (AMP) et couloirs d’upwelling avec liaison directe vers l’encyclopédie'
              : 'Explore all 17 port criées, protected reserves (AMP) and pelagic upwelling corridors synced to the encyclopedia'}
          </p>
        </div>

        {/* Global Key Maritime Metrics */}
        <div className="grid grid-cols-3 gap-2 shrink-0 font-mono text-center">
          <div className="rounded-xl border border-white/5 bg-[#12171e] p-2.5">
            <span className="block text-[10px] text-[#786c60] uppercase">
              {lang === 'ar' ? 'السواحل' : 'LITTORAL'}
            </span>
            <span className="font-bold text-sm text-cyan-400">3,500 km</span>
          </div>
          <div className="rounded-xl border border-white/5 bg-[#12171e] p-2.5">
            <span className="block text-[10px] text-[#786c60] uppercase">
              {lang === 'ar' ? 'المنطقة (ZEE)' : 'ZEE MAROC'}
            </span>
            <span className="font-bold text-sm text-[#f2b47e]">1M km²</span>
          </div>
          <div className="rounded-xl border border-white/5 bg-[#12171e] p-2.5">
            <span className="block text-[10px] text-[#786c60] uppercase">
              {lang === 'ar' ? 'الموانئ' : 'PORTS ONP'}
            </span>
            <span className="font-bold text-sm text-emerald-400">17 Halles</span>
          </div>
        </div>
      </div>

      {/* Layer Control Bar & Coast Filters */}
      <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#f6f1e7]/10 pb-4 text-xs font-mono">
        {/* Layer Switches */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-[#a69b8d] flex items-center gap-1 me-1">
            <Layers className="h-3.5 w-3.5 text-[#e68a45]" />
            {lang === 'ar' ? 'طبقات الخريطة:' : 'Couches SIG :'}
          </span>

          <button
            type="button"
            onClick={() => setActiveLayer('all')}
            className={`rounded-lg px-2.5 py-1 transition ${
              activeLayer === 'all'
                ? 'bg-[#d96b27] text-[#0b0908] font-bold'
                : 'border border-white/10 bg-[#12171e] text-[#a69b8d] hover:text-[#f6f1e7]'
            }`}
          >
            {lang === 'ar' ? 'الكل (الموانئ + المحميات)' : 'Toutes les Couches'}
          </button>

          <button
            type="button"
            onClick={() => setActiveLayer('ports')}
            className={`rounded-lg px-2.5 py-1 transition flex items-center gap-1 ${
              activeLayer === 'ports'
                ? 'bg-cyan-500 text-[#0b0908] font-bold'
                : 'border border-white/10 bg-[#12171e] text-[#a69b8d] hover:text-[#f6f1e7]'
            }`}
          >
            <Anchor className="h-3 w-3" />
            <span>{lang === 'ar' ? 'الموانئ وأسواق الجملة (17)' : 'Halles & Ports (17)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLayer('reserves')}
            className={`rounded-lg px-2.5 py-1 transition flex items-center gap-1 ${
              activeLayer === 'reserves'
                ? 'bg-emerald-500 text-[#0b0908] font-bold'
                : 'border border-white/10 bg-[#12171e] text-[#a69b8d] hover:text-[#f6f1e7]'
            }`}
          >
            <ShieldCheck className="h-3 w-3" />
            <span>{lang === 'ar' ? 'المحميات الطبيعية (AMP)' : 'Aires Marines (AMP)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLayer('corridors')}
            className={`rounded-lg px-2.5 py-1 transition flex items-center gap-1 ${
              activeLayer === 'corridors'
                ? 'bg-amber-500 text-[#0b0908] font-bold'
                : 'border border-white/10 bg-[#12171e] text-[#a69b8d] hover:text-[#f6f1e7]'
            }`}
          >
            <Fish className="h-3 w-3" />
            <span>{lang === 'ar' ? 'أروقة الصيد والكتلة الحيوية' : 'Couloirs Halieutiques'}</span>
          </button>
        </div>

        {/* Coast Switches */}
        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#090d12] p-1">
          <button
            type="button"
            onClick={() => setSelectedCoast('all')}
            className={`rounded px-2 py-0.5 text-[10px] ${
              selectedCoast === 'all'
                ? 'bg-[#d96b27] text-[#0b0908] font-bold'
                : 'text-[#a69b8d] hover:text-[#f6f1e7]'
            }`}
          >
            {lang === 'ar' ? 'كل السواحل' : 'Tout Littoral'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCoast('mediterranean')}
            className={`rounded px-2 py-0.5 text-[10px] ${
              selectedCoast === 'mediterranean'
                ? 'bg-[#d96b27] text-[#0b0908] font-bold'
                : 'text-[#a69b8d] hover:text-[#f6f1e7]'
            }`}
          >
            {lang === 'ar' ? 'المتوسط (512 كلم)' : 'Méditerranée (512 km)'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCoast('atlantic')}
            className={`rounded px-2 py-0.5 text-[10px] ${
              selectedCoast === 'atlantic'
                ? 'bg-[#d96b27] text-[#0b0908] font-bold'
                : 'text-[#a69b8d] hover:text-[#f6f1e7]'
            }`}
          >
            {lang === 'ar' ? 'الأطلسي (2,934 كلم)' : 'Atlantique (2 934 km)'}
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Real-Time Telemetry Deck */}
      <div className="relative z-10 mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Stylized Coastal Vector Map (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-white/5 bg-[#090d12] p-4 sm:p-6 relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#786c60] mb-3">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              {lang === 'ar' ? 'إسقاط كارتوغرافي حي للسواحل المغربية' : 'Projection Cartographique Active du Littoral'}
            </span>
            <span>{isRtl ? 'المتوسط ↗ · الأطلسي ↙' : 'Méditerranée ↗ · Atlantique ↙'}</span>
          </div>

          {/* SVG Coastline Projection Canvas */}
          <div className="relative w-full aspect-[16/10] max-h-[520px] select-none">
            <svg
              viewBox="0 0 1000 960"
              className="w-full h-full drop-shadow-lg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="coastGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0891b2" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#d96b27" stopOpacity="0.85" />
                </linearGradient>

                <linearGradient id="corridorGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#eab308" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#d96b27" stopOpacity="0.8" />
                </linearGradient>

                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Bathymetric Depth Contour Lines (Canary Current & Upwelling) */}
              <path
                d="M 50,200 Q 300,300 600,100"
                stroke="rgba(6, 182, 212, 0.08)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                fill="none"
              />
              <path
                d="M 20,500 Q 250,600 500,400"
                stroke="rgba(6, 182, 212, 0.08)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                fill="none"
              />
              <path
                d="M 10,800 Q 150,850 400,700"
                stroke="rgba(6, 182, 212, 0.08)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                fill="none"
              />

              {/* Stylized Moroccan Coastline Arc */}
              <path
                d="M 910,65 L 890,70 Q 820,95 740,95 Q 670,80 600,65 Q 560,95 560,130 Q 530,170 480,220 Q 440,260 410,290 Q 395,310 380,335 Q 350,370 330,400 Q 305,445 290,480 Q 270,520 250,550 Q 220,610 190,670 Q 155,760 120,850 Q 105,890 95,930"
                stroke="url(#coastGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                filter="url(#glow)"
              />

              {/* Landmass Shading Fill */}
              <path
                d="M 910,65 L 890,70 Q 820,95 740,95 Q 670,80 600,65 Q 560,95 560,130 Q 530,170 480,220 Q 440,260 410,290 Q 395,310 380,335 Q 350,370 330,400 Q 305,445 290,480 Q 270,520 250,550 Q 220,610 190,670 Q 155,760 120,850 Q 105,890 95,930 L 700,930 L 950,500 Z"
                fill="rgba(20, 26, 34, 0.45)"
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth="1"
              />

              {/* Fishery Corridors Layer */}
              {(activeLayer === 'all' || activeLayer === 'corridors') &&
                MOROCCAN_FISHERY_CORRIDORS.map((corridor) => {
                  const isCorridorActive = selectedCorridorId === corridor.id
                  return (
                    <g
                      key={corridor.id}
                      className="cursor-pointer"
                      onClick={() => handleSelectCorridor(corridor)}
                    >
                      <line
                        x1={corridor.startCoord[0]}
                        y1={corridor.startCoord[1]}
                        x2={corridor.endCoord[0]}
                        y2={corridor.endCoord[1]}
                        stroke={isCorridorActive ? '#eab308' : 'rgba(234, 179, 8, 0.35)'}
                        strokeWidth={isCorridorActive ? '8' : '5'}
                        strokeLinecap="round"
                        strokeDasharray="8 6"
                      />
                    </g>
                  )
                })}

              {/* Marine Protected Areas (AMPs) Layer */}
              {(activeLayer === 'all' || activeLayer === 'reserves') &&
                MOROCCAN_MARINE_RESERVES.map((reserve) => {
                  const isReserveActive = selectedReserveId === reserve.id
                  return (
                    <g
                      key={reserve.id}
                      className="cursor-pointer"
                      onClick={() => handleSelectReserve(reserve)}
                    >
                      <circle
                        cx={reserve.cx}
                        cy={reserve.cy}
                        r={isReserveActive ? '16' : '11'}
                        fill="rgba(16, 185, 129, 0.25)"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                        className={isReserveActive ? 'animate-pulse' : ''}
                      />
                      <circle cx={reserve.cx} cy={reserve.cy} r="4.5" fill="#10b981" />
                      <text
                        x={reserve.cx + 12}
                        y={reserve.cy + 3}
                        className="text-[9px] font-mono fill-emerald-300 select-none font-bold"
                      >
                        🛡️ {lang === 'ar' ? reserve.nameAr.split(' ')[0] : reserve.nameFr.split(' ')[0]}
                      </text>
                    </g>
                  )
                })}

              {/* Port Markers Layer */}
              {(activeLayer === 'all' || activeLayer === 'ports') &&
                filteredPorts.map((port) => {
                  const isSelected = activePort.id === port.id
                  const isHovered = hoveredPort?.id === port.id

                  return (
                    <g
                      key={port.id}
                      className="cursor-pointer transition-transform duration-300"
                      onMouseEnter={() => setHoveredPort(port)}
                      onMouseLeave={() => setHoveredPort(null)}
                      onClick={() => handleSelectPort(port)}
                    >
                      {/* Animated Ping on active/hover */}
                      {(isSelected || isHovered) && (
                        <circle
                          cx={port.cx}
                          cy={port.cy}
                          r="18"
                          className="animate-ping opacity-35"
                          fill={isSelected ? '#d96b27' : '#06b6d4'}
                        />
                      )}

                      {/* Outer Glow Halo */}
                      <circle
                        cx={port.cx}
                        cy={port.cy}
                        r={isSelected ? '10' : '7'}
                        fill={isSelected ? '#d96b27' : isHovered ? '#22d3ee' : '#0891b2'}
                        stroke="#090d12"
                        strokeWidth="2.5"
                      />

                      {/* Inner Core Pin */}
                      <circle cx={port.cx} cy={port.cy} r="3.5" fill="#ffffff" />

                      {/* Port Label */}
                      <text
                        x={port.cx + (port.cx > 500 ? -12 : 12)}
                        y={port.cy + 4}
                        textAnchor={port.cx > 500 ? 'end' : 'start'}
                        className={`text-[11px] font-mono select-none transition-all ${
                          isSelected
                            ? 'fill-[#f2b47e] font-bold text-[12px]'
                            : isHovered
                            ? 'fill-cyan-300 font-semibold'
                            : 'fill-[#a69b8d]/80 text-[10px]'
                        }`}
                      >
                        {lang === 'ar' ? port.nameAr.split(' ')[0] : port.nameFr.split(' ')[0]}
                      </text>
                    </g>
                  )
                })}
            </svg>
          </div>

          {/* Map Footer Legend */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#786c60] pt-2 border-t border-white/5">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[#d96b27]" />
                {lang === 'ar' ? 'الميناء المختار' : 'Port Sélectionné'}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {lang === 'ar' ? 'محمية AMP' : 'Réserve Protégée'}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                {lang === 'ar' ? 'رواق صيد' : 'Couloir Pélagique'}
              </span>
            </div>
            <span>● {lang === 'ar' ? 'انقر على أي موقع لعرض بياناته' : 'Cliquez pour inspecter'}</span>
          </div>
        </div>

        {/* Right Column: Dynamic Telemetry & Detailed Port / Reserve Dossier (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card: Active Selection Dossier */}
          {activeReserve ? (
            /* Protected Area Detail Card */
            <div className="rounded-xl border border-emerald-500/40 bg-gradient-to-b from-[#0e1a14] to-[#0a120e] p-5 shadow-xl relative overflow-hidden">
              <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-2">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{lang === 'ar' ? 'محمية بحرية طبيعية مصنفة (AMP)' : 'Aire Marine Protégée (AMP)'}</span>
              </div>
              <h4 className="font-editorial text-2xl font-bold text-[#f6f1e7]">
                {lang === 'ar' ? activeReserve.nameAr : activeReserve.nameFr}
              </h4>
              <p className="font-mono text-xs text-emerald-300 mt-1">
                {lang === 'ar' ? activeReserve.typeAr : activeReserve.typeFr} · {activeReserve.areaKm2} km²
              </p>

              <p className="mt-3 text-xs leading-relaxed text-[#d4cbbd]">
                {lang === 'ar' ? activeReserve.descriptionAr : activeReserve.descriptionFr}
              </p>

              <div className="mt-4 rounded-lg border border-emerald-500/20 bg-[#07100b] p-3 text-xs space-y-2">
                <span className="font-mono text-[10px] text-emerald-400 font-bold block uppercase">
                  {lang === 'ar' ? 'الأنواع المستوطنة والمحمية:' : 'Espèces Clés Protégées :'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(lang === 'ar' ? activeReserve.keySpeciesAr : activeReserve.keySpeciesFr).map((sp, idx) => (
                    <span
                      key={idx}
                      className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-300"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-emerald-500/20 text-[10px] font-mono text-[#a69b8d]">
                <span className="text-emerald-400 font-bold block mb-0.5">
                  {lang === 'ar' ? 'الإطار القانوني للحماية:' : 'Statut Juridique :'}
                </span>
                <span>{activeReserve.legalProtection}</span>
              </div>
            </div>
          ) : activeCorridor ? (
            /* Fishery Corridor Detail Card */
            <div className="rounded-xl border border-amber-500/40 bg-gradient-to-b from-[#1c180b] to-[#120f06] p-5 shadow-xl relative overflow-hidden">
              <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-2">
                <Fish className="h-3.5 w-3.5" />
                <span>{lang === 'ar' ? 'رواق الكتلة الحيوية والصيد' : 'Couloir de Biomasse Halieutique'}</span>
              </div>
              <h4 className="font-editorial text-2xl font-bold text-[#f6f1e7]">
                {lang === 'ar' ? activeCorridor.nameAr : activeCorridor.nameFr}
              </h4>
              <p className="font-mono text-xs text-amber-300 mt-1">
                {lang === 'ar' ? activeCorridor.biomassTypeAr : activeCorridor.biomassTypeFr}
              </p>

              <p className="mt-3 text-xs leading-relaxed text-[#d4cbbd]">
                {lang === 'ar' ? activeCorridor.descriptionAr : activeCorridor.descriptionFr}
              </p>

              <div className="mt-4 rounded-lg border border-amber-500/20 bg-[#0e0c05] p-3 text-xs space-y-2">
                <span className="font-mono text-[10px] text-amber-400 font-bold block uppercase">
                  {lang === 'ar' ? 'الأسماك المستهدفة بالرواق:' : 'Espèces Ciblées dans ce Couloir :'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(lang === 'ar' ? activeCorridor.topSpeciesAr : activeCorridor.topSpeciesFr).map((sp, idx) => (
                    <span
                      key={idx}
                      className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[11px] text-amber-300"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Standard Port Telemetry Card */
            <div className="rounded-xl border border-[#d96b27]/30 bg-gradient-to-b from-[#18130f] to-[#0f0c0a] p-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 h-28 w-28 rounded-full bg-[#d96b27]/10 blur-2xl" />

              {/* Selected Port Name & Status */}
              <div className="relative z-10 flex items-start justify-between gap-3 border-b border-[#f6f1e7]/10 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#d96b27]">
                    <Anchor className="h-3 w-3" />
                    <span>
                      {displayPort.coast === 'mediterranean'
                        ? lang === 'ar' ? 'البحر الأبيض المتوسط' : 'Façade Méditerranée'
                        : lang === 'ar' ? 'المحيط الأطلسي' : 'Façade Atlantique'}
                    </span>
                  </div>
                  <h4 className="font-editorial text-2xl font-bold text-[#f6f1e7] mt-1">
                    {lang === 'ar' ? displayPort.nameAr : lang === 'fr' ? displayPort.nameFr : displayPort.nameEn}
                  </h4>
                  <span className="font-mono text-xs text-[#a69b8d]">
                    {displayPort.crieeType} · {lang === 'ar' ? `ترتيب الإنزال الوطني: #${displayPort.onpRank}` : `Rang National ONP : #${displayPort.onpRank}`}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectPort(displayPort)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-bold transition shrink-0 ${
                    activePort.id === displayPort.id
                      ? 'border border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                      : 'border border-[#d96b27] bg-[#d96b27] text-[#0b0908] hover:bg-[#b85318]'
                  }`}
                >
                  {activePort.id === displayPort.id
                    ? lang === 'ar' ? 'مفعل ✓' : 'Actif ✓'
                    : lang === 'ar' ? 'تثبيت الميناء' : 'Sélectionner'}
                </button>
              </div>

              {/* Real-Time Oceanographic Conditions */}
              <div className="relative z-10 mt-4 grid grid-cols-3 gap-2.5">
                <div className="rounded-lg border border-white/5 bg-[#0b0908] p-3 text-center">
                  <Waves className="h-4 w-4 text-cyan-400 mx-auto mb-1" />
                  <span className="block font-mono text-[10px] text-[#786c60] uppercase">
                    {lang === 'ar' ? 'علو السويل' : 'Houle'}
                  </span>
                  <span className="font-mono text-base font-bold text-cyan-300">
                    {displayPort.waveHeightM} m
                  </span>
                </div>

                <div className="rounded-lg border border-white/5 bg-[#0b0908] p-3 text-center">
                  <Wind className="h-4 w-4 text-amber-400 mx-auto mb-1" />
                  <span className="block font-mono text-[10px] text-[#786c60] uppercase">
                    {lang === 'ar' ? 'سرعة الرياح' : 'Vent'}
                  </span>
                  <span className="font-mono text-base font-bold text-amber-300">
                    {displayPort.windKnots} kts
                  </span>
                </div>

                <div className="rounded-lg border border-white/5 bg-[#0b0908] p-3 text-center">
                  <Thermometer className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                  <span className="block font-mono text-[10px] text-[#786c60] uppercase">
                    {lang === 'ar' ? 'حرارة البحر' : 'Eau'}
                  </span>
                  <span className="font-mono text-base font-bold text-rose-300">
                    {displayPort.tempC} °C
                  </span>
                </div>
              </div>

              {/* Fleet Composition */}
              <div className="relative z-10 mt-4 rounded-lg border border-white/5 bg-[#0b0908] p-3 text-xs">
                <div className="flex items-center justify-between text-[#a69b8d] font-mono text-[10px] uppercase mb-2">
                  <span>{lang === 'ar' ? 'أسطول الصيد المسجل بالمرسى:' : 'Flotte Active Enregistrée :'}</span>
                  <span className="text-[#f2b47e]">
                    ~{displayPort.annualTonnageTonnes.toLocaleString()} {lang === 'ar' ? 'طن/سنة' : 't/an'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                  <div className="rounded bg-[#14110f] p-1.5">
                    <span className="block font-bold text-[#f6f1e7]">{displayPort.fleetStats.artisanalBarques}</span>
                    <span className="text-[9px] text-[#786c60]">{lang === 'ar' ? 'فلوكة تقليدية' : 'Barques'}</span>
                  </div>
                  <div className="rounded bg-[#14110f] p-1.5">
                    <span className="block font-bold text-[#d96b27]">{displayPort.fleetStats.coastalSeiners}</span>
                    <span className="text-[9px] text-[#786c60]">{lang === 'ar' ? 'سردينية' : 'Sardiniers'}</span>
                  </div>
                  <div className="rounded bg-[#14110f] p-1.5">
                    <span className="block font-bold text-cyan-400">{displayPort.fleetStats.trawlers}</span>
                    <span className="text-[9px] text-[#786c60]">{lang === 'ar' ? 'مركب جر' : 'Chalutiers'}</span>
                  </div>
                </div>
              </div>

              {/* Top Landings & Direct Encyclopedia Filter */}
              <div className="relative z-10 mt-4 space-y-2 border-t border-[#f6f1e7]/10 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#a69b8d] font-semibold">
                    {lang === 'ar' ? 'أهم الأنواع المفرغة في هذا الميناء:' : 'Espèces Phares Débarquées :'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(lang === 'ar'
                    ? displayPort.topCatchAr
                    : lang === 'fr'
                    ? displayPort.topCatchFr
                    : displayPort.topCatchEn
                  ).map((fishName, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-full border border-[#f2b47e]/30 bg-[#f2b47e]/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-[#f2b47e]"
                    >
                      <span>{fishName}</span>
                    </span>
                  ))}
                </div>

                {/* Direct Action to Filter Catalog by this Port */}
                {onFilterSpeciesByPort && (
                  <button
                    type="button"
                    onClick={() => onFilterSpeciesByPort(displayPort.nameFr.split(' ')[0] ?? displayPort.id)}
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#d96b27] px-3.5 py-2 font-mono text-xs font-bold text-[#0b0908] hover:bg-[#e68a45] transition shadow"
                  >
                    <Fish className="h-4 w-4" />
                    <span>
                      {lang === 'ar'
                        ? `عرض أسماك ${displayPort.nameAr.split(' ')[0]} في الموسوعة`
                        : `Filtrer les poissons de ${displayPort.nameFr.split(' ')[0]} dans l'Atlas`}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

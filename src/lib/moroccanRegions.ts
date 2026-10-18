export interface MoroccanPortRegion {
  id: 'oriental' | 'chamal' | 'centre' | 'doukkala_abda' | 'souss_massa' | 'sahara'
  nameAr: string
  nameFr: string
  nameEn: string
  primaryPortAr: string
  primaryPortFr: string
  primaryPortEn: string
  lat: number
  lon: number
  dialectKey: 'oriental' | 'chamal' | 'centre' | 'sud'
  dialectLabelAr: string
  dialectLabelFr: string
  dialectLabelEn: string
  priceAdjustmentFactor: number // Multiplier for local spot market benchmark
  notableLocalFishIds: string[]
}

export const MOROCCAN_PORT_REGIONS: MoroccanPortRegion[] = [
  {
    id: 'oriental',
    nameAr: 'الجهة الشرقية (الناظور، السعيدية، رأس كبدانة، بحيرة مارشيكا)',
    nameFr: 'Région Orientale (Nador, Saïdia, Ras Kebdana, Lagune Marchica)',
    nameEn: 'Oriental Region (Nador, Saïdia, Ras Kebdana, Marchica Lagoon)',
    primaryPortAr: 'ميناء بني نصار / الناظور',
    primaryPortFr: 'Port de Beni Ensar / Nador',
    primaryPortEn: 'Port of Beni Ensar / Nador',
    lat: 35.17,
    lon: -2.93,
    dialectKey: 'oriental',
    dialectLabelAr: 'لهجة الشرقية والريف (الناظور والسعيدية)',
    dialectLabelFr: 'Dialecte Oriental & Rif (Nador / Saïdia)',
    dialectLabelEn: 'Oriental & Rif Dialect (Nador / Saïdia)',
    priceAdjustmentFactor: 0.95, // Direct Mediterranean coastal landing
    notableLocalFishIds: ['crevette', 'dorade-royale', 'bar-loup', 'rouget', 'calamar', 'palourde-coquillage'],
  },
  {
    id: 'chamal',
    nameAr: 'الشمال ومضيق جبل طارق (طنجة، تطوان، المضيق، العرائش، الحسيمة)',
    nameFr: 'Nord & Détroit (Tanger, Tétouan, M’diq, Larache, Al Hoceïma)',
    nameEn: 'North & Strait (Tangier, Tetouan, M’diq, Larache, Al Hoceima)',
    primaryPortAr: 'ميناء طنجة المتوسط وطنجة المدينة',
    primaryPortFr: 'Port de Tanger Ville & Tanger Med',
    primaryPortEn: 'Port of Tangier Med & Tangier City',
    lat: 35.78,
    lon: -5.81,
    dialectKey: 'chamal',
    dialectLabelAr: 'اللهجة الشمالية (طنجة وتطوان والعرائش)',
    dialectLabelFr: 'Dialecte Nord / Chamali (Tanger / Tétouan)',
    dialectLabelEn: 'Northern Chamali Dialect (Tangier / Tetouan)',
    priceAdjustmentFactor: 1.05, // High demand from domestic hospitality and Spain
    notableLocalFishIds: ['espadon', 'thon-rouge', 'pageot', 'merlan', 'sole'],
  },
  {
    id: 'centre',
    nameAr: 'الوسط والشريط الأطلسي (الدار البيضاء، الرباط، المحمدية، القنيطرة)',
    nameFr: 'Centre Atlantique (Casablanca, Rabat, Mohammedia, Kénitra)',
    nameEn: 'Central Atlantic (Casablanca, Rabat, Mohammedia, Kenitra)',
    primaryPortAr: 'ميناء الدار البيضاء وميناء المحمدية',
    primaryPortFr: 'Port de Casablanca & Port de Mohammedia',
    primaryPortEn: 'Port of Casablanca & Mohammedia',
    lat: 33.60,
    lon: -7.61,
    dialectKey: 'centre',
    dialectLabelAr: 'دارجة الوسط (كازا، الرباط والمهدية)',
    dialectLabelFr: 'Darija Centre (Casablanca / Rabat)',
    dialectLabelEn: 'Central Darija (Casablanca / Rabat)',
    priceAdjustmentFactor: 1.15, // High metropolitan market consumption
    notableLocalFishIds: ['merlan', 'sole', 'sardine', 'congre', 'crevette'],
  },
  {
    id: 'doukkala_abda',
    nameAr: 'دكالة وعبدة (آسفي، الجديدة، الوليدية، الجرف الأصفر)',
    nameFr: 'Doukkala-Abda (Safi, El Jadida, Oualidia, Jorf Lasfar)',
    nameEn: 'Doukkala-Abda (Safi, El Jadida, Oualidia, Jorf Lasfar)',
    primaryPortAr: 'ميناء آسفي التاريخي وميناء الجديدة',
    primaryPortFr: 'Port de Safi & Port d’El Jadida',
    primaryPortEn: 'Historic Port of Safi & El Jadida',
    lat: 32.30,
    lon: -9.24,
    dialectKey: 'centre',
    dialectLabelAr: 'لهجة عبدة ودكالة (آسفي والجديدة)',
    dialectLabelFr: 'Dialecte Abda & Doukkala (Safi)',
    dialectLabelEn: 'Abda & Doukkala Dialect (Safi)',
    priceAdjustmentFactor: 0.88, // World capital of sardine landings
    notableLocalFishIds: ['sardine', 'maquereau', 'chinchard', 'huitre-oualidia', 'courbine'],
  },
  {
    id: 'souss_massa',
    nameAr: 'سوس ماسة والشاطئ الأطلسي (أكادير، تغازوت، ميرلفت، تيزنيت، طانطان)',
    nameFr: 'Souss-Massa & Côte Atlantique (Agadir, Taghazout, Mirleft, Tiznit)',
    nameEn: 'Souss-Massa & Atlantic Coast (Agadir, Taghazout, Mirleft, Tiznit)',
    primaryPortAr: 'ميناء أكادير الكبير وميناء طانطان',
    primaryPortFr: 'Grand Port d’Agadir & Port de Tan-Tan',
    primaryPortEn: 'Major Port of Agadir & Tan-Tan',
    lat: 30.42,
    lon: -9.60,
    dialectKey: 'sud',
    dialectLabelAr: 'اللهجة السوسية والأمازيغية (تاشلحيت وأكادير)',
    dialectLabelFr: 'Dialecte Souss & Tachelhit (Agadir)',
    dialectLabelEn: 'Souss & Tachelhit Dialect (Agadir)',
    priceAdjustmentFactor: 0.85, // Direct industrial landing port
    notableLocalFishIds: ['sardine', 'courbine', 'sar-sargo', 'anchois', 'seiche'],
  },
  {
    id: 'sahara',
    nameAr: 'الصحراء المغربية ومصايد الجنوب (الداخلة، العيون، بوجدور، طرفاية)',
    nameFr: 'Sahara Marocain & Grands Bancs du Sud (Dakhla, Laâyoune, Boujdour)',
    nameEn: 'Moroccan Sahara & Southern Banks (Dakhla, Laâyoune, Boujdour)',
    primaryPortAr: 'ميناء الداخلة الأطلسي وميناء العيون المرسى',
    primaryPortFr: 'Port de Dakhla & Port de Laâyoune',
    primaryPortEn: 'Port of Dakhla & Port of Laâyoune',
    lat: 23.71,
    lon: -15.93,
    dialectKey: 'sud',
    dialectLabelAr: 'لهجة الصحراء والجنوب (الحسانية والداخلة)',
    dialectLabelFr: 'Dialecte Hassani & Sud (Dakhla)',
    dialectLabelEn: 'Hassani & Southern Dialect (Dakhla)',
    priceAdjustmentFactor: 0.78, // Deep resource source (especially octopus, squid)
    notableLocalFishIds: ['poulpe', 'courbine', 'calamar', 'seiche', 'sardine'],
  },
]

/**
 * Calculates great-circle distance between two GPS points using the Haversine formula (in kilometers)
 */
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Earth radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c)
}

/**
 * Given GPS coordinates, finds the closest Moroccan coastal port region
 */
export function findNearestMoroccanPortRegion(
  lat: number,
  lon: number
): { region: MoroccanPortRegion; distanceKm: number } {
  let closestRegion = MOROCCAN_PORT_REGIONS[0]!
  let minDistance = Infinity

  for (const region of MOROCCAN_PORT_REGIONS) {
    const dist = calculateHaversineDistanceKm(lat, lon, region.lat, region.lon)
    if (dist < minDistance) {
      minDistance = dist
      closestRegion = region
    }
  }

  return { region: closestRegion, distanceKm: minDistance }
}

/**
 * Computes location-adjusted local spot price for a fish given a port region
 */
export function getLocalFishPriceMAD(
  nationalSpotPrice: number,
  region: MoroccanPortRegion
): number {
  return Math.max(8, Math.round(nationalSpotPrice * region.priceAdjustmentFactor))
}

import type { SupportedLanguage } from '../i18n/strings'

export type AlertSeverity = 'gale_warning' | 'swell_hazard' | 'chergui_squall' | 'advisory' | 'clear'

export interface DgmMaritimeBulletin {
  id: string
  portId: string
  portNameAr: string
  portNameFr: string
  portNameEn: string
  sectorAr: string
  sectorFr: string
  sectorEn: string
  windSpeedKnots: number
  windGustKnots: number
  windDirection: string
  swellHeightMeters: number
  swellPeriodSeconds: number
  harborBarStatus: 'open' | 'restricted_flouka' | 'closed'
  severity: AlertSeverity
  isGaleTriggered: boolean // true when windSpeedKnots > 25 or swellHeightMeters > 3.5
  dgmBulletinCode: string
  issuedAt: string
  headlineAr: string
  headlineFr: string
  headlineEn: string
  detailsAr: string
  detailsFr: string
  detailsEn: string
}

export interface PersistedSafetyNotification {
  id: string
  portId: string
  portName: string
  title: string
  body: string
  severity: AlertSeverity
  windSpeedKnots: number
  swellHeightMeters: number
  createdAtIso: string
  deliveredViaServiceWorker: boolean
}

export const GALE_SUBSCRIPTION_STORAGE_KEY = 'l7ot_gale_alert_subscription_v1'
export const GALE_OFFLINE_QUEUE_STORAGE_KEY = 'l7ot_gale_offline_notifications_v1'

export interface GaleSubscriptionState {
  optedIn: boolean
  homePortId: string
  windThresholdKnots: number
  swellThresholdMeters: number
  swRegistered: boolean
  updatedAtIso: string
}

/**
 * Evaluates whether meteorological telemetry exceeds the artisanal safety thresholds:
 * Wind speed > 25 knots OR Swell height > 3.5 meters.
 */
export function evaluateGaleTrigger(
  windSpeedKnots: number,
  swellHeightMeters: number,
  customWindThreshold = 25,
  customSwellThreshold = 3.5
): {
  isGaleTriggered: boolean
  severity: AlertSeverity
  harborBarStatus: DgmMaritimeBulletin['harborBarStatus']
} {
  const windTriggered = windSpeedKnots > customWindThreshold
  const swellTriggered = swellHeightMeters > customSwellThreshold

  if (windTriggered && swellTriggered) {
    return {
      isGaleTriggered: true,
      severity: 'gale_warning',
      harborBarStatus: 'closed',
    }
  }
  if (swellTriggered) {
    return {
      isGaleTriggered: true,
      severity: 'swell_hazard',
      harborBarStatus: 'closed',
    }
  }
  if (windTriggered) {
    return {
      isGaleTriggered: true,
      severity: 'chergui_squall',
      harborBarStatus: 'restricted_flouka',
    }
  }
  if (windSpeedKnots >= 18 || swellHeightMeters >= 2.4) {
    return {
      isGaleTriggered: false,
      severity: 'advisory',
      harborBarStatus: 'restricted_flouka',
    }
  }
  return {
    isGaleTriggered: false,
    severity: 'clear',
    harborBarStatus: 'open',
  }
}

export const INITIAL_DGM_PORT_BULLETINS: DgmMaritimeBulletin[] = [
  {
    id: 'bms-tanger-cap-spartel',
    portId: 'tanger-med',
    portNameAr: 'طنجة المتوسط / القصر الصغير',
    portNameFr: 'Tanger Med / Ksar Sghir',
    portNameEn: 'Tangier Med / Gibraltar Strait',
    sectorAr: 'مضيق جبل طارق وطنجة (Cap Spartel - Sebta)',
    sectorFr: 'Détroit de Gibraltar (Cap Spartel - Sebta)',
    sectorEn: 'Strait of Gibraltar Sector',
    windSpeedKnots: 29,
    windGustKnots: 38,
    windDirection: 'E / Chergui (شرقي)',
    swellHeightMeters: 2.8,
    swellPeriodSeconds: 9.5,
    harborBarStatus: 'restricted_flouka',
    severity: 'chergui_squall',
    isGaleTriggered: true,
    dgmBulletinCode: 'BMS-COTE-MA-01/TNG',
    issuedAt: 'اليوم 06:00 UTC · المديرية العامة للأرصاد الجوية (DGM)',
    headlineAr: 'نشرة إنذارية برتقالية: هبات رياح الشرقي القوية (29–38 عقدة) بمضيق جبل طارق',
    headlineFr: 'BMS Orange : Coup de vent d’Est (Chergui 29–38 nœuds) sur le Détroit',
    headlineEn: 'DGM Gale Warning: Strong Easterly Chergui Squalls (29–38 kt) in Gibraltar Strait',
    detailsAr:
      'تُحذر قبطانية الميناء والمديرية العامة للأرصاد الجوية (DGM) كافة أرباب قوارب الصيد التقليدي (الفلوكة) من هبات رياح الشرقي القوية التي تتجاوز 25 عقدة مع تيارات سحب سريعة نحو عرض الأطلسي.',
    detailsFr:
      'La Direction Générale de la Météorologie (DGM) et la Capitainerie recommandent la suspension immédiate des sorties des barques artisanales (Flouka) en raison des rafales de Chergui dépassant 25 nœuds.',
    detailsEn:
      'DGM & Port Authority advise all artisanal Flouka boats to remain in harbor due to easterly Chergui gusts exceeding the 25-knot gale threshold.',
  },
  {
    id: 'bms-essaouira-safi',
    portId: 'essaouira',
    portNameAr: 'الصويرة وآسفي (موكادور - عبدة)',
    portNameFr: 'Essaouira & Safi',
    portNameEn: 'Essaouira & Safi',
    sectorAr: 'الساحل الأطلسي الأوسط (الجرف الأصفر - آسفي - الصويرة)',
    sectorFr: 'Atlantique Central (Safi - Essaouira - Cap Sim)',
    sectorEn: 'Central Atlantic Sector (Safi - Essaouira)',
    windSpeedKnots: 28,
    windGustKnots: 36,
    windDirection: 'NNE (شمالي شرقي - Trade Winds)',
    swellHeightMeters: 3.8,
    swellPeriodSeconds: 13.2,
    harborBarStatus: 'closed',
    severity: 'gale_warning',
    isGaleTriggered: true,
    dgmBulletinCode: 'BMS-COTE-MA-04/mog',
    issuedAt: 'اليوم 06:00 UTC · المديرية العامة للأرصاد الجوية (DGM)',
    headlineAr: 'إنذار بحري أحمر: أمواج عاتية (3.8 متر) ورياح تتجاوز 28 عقدة — إغلاق البارة',
    headlineFr: 'Alerte Rouge : Houle dangereuse de 3,8m et vent de 28 nds — Barre fermée',
    headlineEn: 'Red Gale & Swell Alert: 3.8m Swell & 28 kt Winds — Harbor Bar Closed',
    detailsAr:
      'تجاوز علو أمواج السويل الشمالي الغربي 3.5 متر مع رياح شمالية شرقية بقوة 28 عقدة. تم إغلاق مدخل الميناء (البارة قاطعة) أمام جميع قوارب الصيد التقليدي والساحلي.',
    detailsFr:
      'Franchissement simultané des seuils critiques (> 3,5m de houle et > 25 nœuds de vent). Accès au chenal portuaire strictement interdit aux unités artisanales.',
    detailsEn:
      'Both swell (>3.5m) and wind (>25 kt) thresholds exceeded. Harbor entrance bar is closed to all artisanal and coastal vessels.',
  },
  {
    id: 'bms-casablanca-mohammedia',
    portId: 'casablanca',
    portNameAr: 'الدار البيضاء والمحمدية',
    portNameFr: 'Casablanca & Mohammedia',
    portNameEn: 'Casablanca & Mohammedia',
    sectorAr: 'ساحل الشاوية والرباط (المهدية - الدار البيضاء)',
    sectorFr: 'Secteur Mehdia - Rabat - Casablanca',
    sectorEn: 'Mehdia - Rabat - Casablanca Sector',
    windSpeedKnots: 19,
    windGustKnots: 24,
    windDirection: 'NW (شمالي غربي)',
    swellHeightMeters: 3.6,
    swellPeriodSeconds: 12.4,
    harborBarStatus: 'closed',
    severity: 'swell_hazard',
    isGaleTriggered: true,
    dgmBulletinCode: 'BMS-COTE-MA-02/cas',
    issuedAt: 'اليوم 06:00 UTC · المديرية العامة للأرصاد الجوية (DGM)',
    headlineAr: 'تنبيه أمواج عاتية (3.6 متر): حذر شديد عند مداخل موانئ البيضاء والرباط والمهدية',
    headlineFr: 'Avis de Forte Houle (3,6m) : Franchissement dangereux des passes portuaires',
    headlineEn: 'Heavy Swell Warning (3.6m): Dangerous Breaking Waves at Harbor Entrances',
    detailsAr:
      'أمواج سويل طويلة الدورة (12.4 ثانية) بعلو 3.6 متر تتكسر بقوة في مداخل الموانئ. يُمنع خروج الفلوكات الصغيرة وتُوصى مراكب الصيد الساحلي بتأمين الحبال داخل الحوض.',
    detailsFr:
      'Houle longue de Nord-Ouest dépassant le seuil de 3,5m. Risque élevé de déferlement sur la barre de Mehdia, Salé et Casablanca.',
    detailsEn:
      'Long-period NW swell exceeding 3.5m threshold. High risk of breaking waves across harbor bars.',
  },
  {
    id: 'bms-agadir-tantan',
    portId: 'agadir',
    portNameAr: 'أكادير وسيدي إفني وطانطان',
    portNameFr: 'Agadir, Sidi Ifni & Tan-Tan',
    portNameEn: 'Agadir, Sidi Ifni & Tan-Tan',
    sectorAr: 'ساحل سوس ماسة وواد نون (أكادير - طانطان)',
    sectorFr: 'Secteur Cap Ghir - Agadir - Tan-Tan',
    sectorEn: 'Cap Ghir - Agadir - Tan-Tan Sector',
    windSpeedKnots: 16,
    windGustKnots: 21,
    windDirection: 'NNW (شمالي غربي)',
    swellHeightMeters: 2.1,
    swellPeriodSeconds: 10.2,
    harborBarStatus: 'open',
    severity: 'advisory',
    isGaleTriggered: false,
    dgmBulletinCode: 'BMS-COTE-MA-05/aga',
    issuedAt: 'اليوم 06:00 UTC · المديرية العامة للأرصاد الجوية (DGM)',
    headlineAr: 'بحر قليل الهيجان إلى هائج نسبياً (2.1 متر) · الملاحة مفتوحة مع اليقظة بعد الزوال',
    headlineFr: 'Mer peu agitée à agitée (2,1m) · Navigation ouverte avec vigilance l’après-midi',
    headlineEn: 'Moderate Sea State (2.1m) · Harbor Open with Afternoon Thermal Wind Advisory',
    detailsAr:
      'ظروف ملاحة ملائمة صباحاً لقوارب الصيد التقليدي بخليج أكادير وأنزا، مع نشاط نسبي للرياح الحرارية بعد الساعة 15:00.',
    detailsFr:
      'Conditions favorables le matin dans la baie d’Agadir, renforcement thermique modéré du vent de Nord-Ouest en fin d’après-midi.',
    detailsEn:
      'Favorable morning conditions in Agadir Bay; moderate thermal NW breeze strengthening after 15:00.',
  },
  {
    id: 'bms-dakhla-laayoune',
    portId: 'dakhla',
    portNameAr: 'الداخلة والعيون وبوجدور',
    portNameFr: 'Dakhla, Laâyoune & Boujdour',
    portNameEn: 'Dakhla, Laayoune & Boujdour',
    sectorAr: 'الأقاليم الجنوبية (العيون - بوجدور - الداخلة - الكويرة)',
    sectorFr: 'Atlantique Sud (Laâyoune - Boujdour - Dakhla)',
    sectorEn: 'Southern Sahara Atlantic Sector',
    windSpeedKnots: 26,
    windGustKnots: 33,
    windDirection: 'NNE (رياح تجارية صحراوية)',
    swellHeightMeters: 2.4,
    swellPeriodSeconds: 9.8,
    harborBarStatus: 'restricted_flouka',
    severity: 'chergui_squall',
    isGaleTriggered: true,
    dgmBulletinCode: 'BMS-COTE-MA-06/vil',
    issuedAt: 'اليوم 06:00 UTC · المديرية العامة للأرصاد الجوية (DGM)',
    headlineAr: 'تنبيه رياح قوية (26 عقدة): تقليص خروج قوارب الصيد التقليدي بقرى الصيد الجنوبية',
    headlineFr: 'Avis de Grand Frais (26 nds) : Vigilance villages de pêche de Dakhla et Boujdour',
    headlineEn: 'Strong Trade Wind Warning (26 kt): Caution for Artisanal Fishing Villages',
    detailsAr:
      'رياح شمالية شرقية قوية تتجاوز 25 عقدة على الساحل الأطلسي لوادي الذهب (لاساركا، انتيرفت، لبويردة). يُنصح بالبقاء داخل المياه المحمية للخليج.',
    detailsFr:
      'Alizés soutenus dépassant 25 nœuds sur la façade atlantique de Lassarga et Ntirift. Navigation artisanale limitée à l’intérieur de la baie.',
    detailsEn:
      'Trade winds exceeding 25 knots along outer Dakhla peninsula; artisanal boats advised to stay within sheltered bay waters.',
  },
  {
    id: 'bms-nador-alhoceima',
    portId: 'nador',
    portNameAr: 'الناظور والحسيمة (الواجهة المتوسطية)',
    portNameFr: 'Nador & Al Hoceima (Méditerranée)',
    portNameEn: 'Nador & Al Hoceima (Mediterranean)',
    sectorAr: 'الواجهة المتوسطية (الحسيمة - بني نصار - السعيدية)',
    sectorFr: 'Méditerranée (Al Hoceima - Nador - Saïdia)',
    sectorEn: 'Mediterranean Rif & Oriental Sector',
    windSpeedKnots: 12,
    windGustKnots: 16,
    windDirection: 'ENE (شمالي شرقي خفيف)',
    swellHeightMeters: 0.8,
    swellPeriodSeconds: 5.5,
    harborBarStatus: 'open',
    severity: 'clear',
    isGaleTriggered: false,
    dgmBulletinCode: 'BMS-COTE-MA-07/nad',
    issuedAt: 'اليوم 06:00 UTC · المديرية العامة للأرصاد الجوية (DGM)',
    headlineAr: 'بحر هادئ وجميل (0.8 متر · 12 عقدة) · ظروف مثالية لخروج الفلوكة والصيد الساحلي',
    headlineFr: 'Mer belle à peu agitée (0,8m · 12 nds) · Conditions optimales pour les barques',
    headlineEn: 'Calm Sea State (0.8m · 12 kt) · Optimal Conditions for Artisanal Boats',
    detailsAr:
      'جميع موانئ الواجهة المتوسطية (بني نصار، رأس كبدانة، الحسيمة، الجبهة) مفتوحة بالكامل مع رؤية ممتازة ورياح خفيفة.',
    detailsFr:
      'Tous les ports méditerranéens sont ouverts sans restriction avec une excellente visibilité maritime.',
    detailsEn:
      'All Mediterranean ports are fully open with calm seas and clear visibility.',
  },
]

export function loadGaleSubscription(): GaleSubscriptionState {
  try {
    const raw = localStorage.getItem(GALE_SUBSCRIPTION_STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw) as GaleSubscriptionState
    }
  } catch {
    // ignore storage errors
  }
  return {
    optedIn: false,
    homePortId: 'essaouira',
    windThresholdKnots: 25,
    swellThresholdMeters: 3.5,
    swRegistered: false,
    updatedAtIso: new Date().toISOString(),
  }
}

export function saveGaleSubscription(state: GaleSubscriptionState): void {
  try {
    localStorage.setItem(GALE_SUBSCRIPTION_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

export function loadPersistedNotifications(): PersistedSafetyNotification[] {
  try {
    const raw = localStorage.getItem(GALE_OFFLINE_QUEUE_STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw) as PersistedSafetyNotification[]
    }
  } catch {
    // ignore
  }
  return [
    {
      id: 'notif-seed-1',
      portId: 'essaouira',
      portName: 'الصويرة / آسفي (Essaouira & Safi)',
      title: '⚠️ إنذار بحري DGM: أمواج 3.8م ورياح 28 عقدة',
      body: 'تم إغلاق البارة أمام قوارب الفلوكة بميناء الصويرة وآسفي (تجاوز عتبة 25 عقدة و3.5 متر).',
      severity: 'gale_warning',
      windSpeedKnots: 28,
      swellHeightMeters: 3.8,
      createdAtIso: new Date(Date.now() - 1800 * 1000).toISOString(),
      deliveredViaServiceWorker: true,
    },
    {
      id: 'notif-seed-2',
      portId: 'tanger-med',
      portName: 'طنجة المتوسط (Tanger Med)',
      title: '🌬️ تنبيه رياح الشرقي (Chergui): 29 عقدة بمضيق جبل طارق',
      body: 'هبات شرقي قوية تتجاوز 25 عقدة. يُنصح أرباب قوارب الصيد التقليدي بعدم الابتعاد عن الميناء.',
      severity: 'chergui_squall',
      windSpeedKnots: 29,
      swellHeightMeters: 2.8,
      createdAtIso: new Date(Date.now() - 5400 * 1000).toISOString(),
      deliveredViaServiceWorker: true,
    },
  ]
}

export function persistSafetyNotification(
  notif: PersistedSafetyNotification
): PersistedSafetyNotification[] {
  const existing = loadPersistedNotifications()
  const updated = [notif, ...existing.filter((n) => n.id !== notif.id)].slice(0, 15)
  try {
    localStorage.setItem(GALE_OFFLINE_QUEUE_STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // ignore
  }
  return updated
}

/**
 * Registers the Service Worker for offline gale notifications & dispatches a push payload.
 */
export async function registerGaleServiceWorkerAndNotify(
  notif?: PersistedSafetyNotification
): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false
  }
  try {
    const reg = await navigator.serviceWorker.register('/sw-gale-alerts.js')
    if (notif && reg.active) {
      reg.active.postMessage({
        type: 'PERSIST_AND_SHOW_GALE_ALERT',
        payload: notif,
      })
    }
    return true
  } catch {
    return false
  }
}

export function buildLocalizedAlertNotification(
  bulletin: DgmMaritimeBulletin,
  lang: SupportedLanguage
): PersistedSafetyNotification {
  const portName =
    lang === 'ar' ? bulletin.portNameAr : lang === 'fr' ? bulletin.portNameFr : bulletin.portNameEn
  const title =
    lang === 'ar' ? bulletin.headlineAr : lang === 'fr' ? bulletin.headlineFr : bulletin.headlineEn
  const body =
    lang === 'ar' ? bulletin.detailsAr : lang === 'fr' ? bulletin.detailsFr : bulletin.detailsEn

  return {
    id: `notif-${bulletin.portId}-${Date.now()}`,
    portId: bulletin.portId,
    portName,
    title,
    body,
    severity: bulletin.severity,
    windSpeedKnots: bulletin.windSpeedKnots,
    swellHeightMeters: bulletin.swellHeightMeters,
    createdAtIso: new Date().toISOString(),
    deliveredViaServiceWorker: true,
  }
}

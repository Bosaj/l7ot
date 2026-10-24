import React, { useState, useMemo } from 'react'
import {
  Moon,
  Waves,
  Clock,
  ArrowUp,
  ArrowDown,
  Anchor,
  ShieldCheck,
} from 'lucide-react'
import type { SupportedLanguage } from '../i18n/strings'

export interface MoroccanTideAndLunarClockProps {
  lang: SupportedLanguage
  className?: string
}

interface PortTideProfile {
  id: string
  nameAr: string
  nameFr: string
  nameEn: string
  coast: 'atlantic' | 'mediterranean'
  baseHighTideHour: number // Hour offset
  baseHighTideMin: number
  meanAmplitudeM: number
  coefficientBase: number
}

const MOROCCAN_PORT_TIDES: PortTideProfile[] = [
  {
    id: 'tanger',
    nameAr: 'طنجة ومضيق جبل طارق',
    nameFr: 'Tanger & Détroit',
    nameEn: 'Tangier & Strait',
    coast: 'mediterranean',
    baseHighTideHour: 2,
    baseHighTideMin: 45,
    meanAmplitudeM: 1.8,
    coefficientBase: 72,
  },
  {
    id: 'casablanca',
    nameAr: 'الدار البيضاء والمحمدية',
    nameFr: 'Casablanca & Mohammedia',
    nameEn: 'Casablanca & Mohammedia',
    coast: 'atlantic',
    baseHighTideHour: 4,
    baseHighTideMin: 15,
    meanAmplitudeM: 2.9,
    coefficientBase: 84,
  },
  {
    id: 'safi',
    nameAr: 'آسفي (حوض السردين)',
    nameFr: 'Safi (Bassin Sardinier)',
    nameEn: 'Safi (Sardine Basin)',
    coast: 'atlantic',
    baseHighTideHour: 4,
    baseHighTideMin: 35,
    meanAmplitudeM: 3.1,
    coefficientBase: 86,
  },
  {
    id: 'essaouira',
    nameAr: 'الصويرة (موكادور)',
    nameFr: 'Essaouira (Mogador)',
    nameEn: 'Essaouira (Mogador)',
    coast: 'atlantic',
    baseHighTideHour: 4,
    baseHighTideMin: 50,
    meanAmplitudeM: 3.0,
    coefficientBase: 85,
  },
  {
    id: 'agadir',
    nameAr: 'أكادير وخليج سوس',
    nameFr: 'Agadir & Baie du Souss',
    nameEn: 'Agadir & Souss Bay',
    coast: 'atlantic',
    baseHighTideHour: 5,
    baseHighTideMin: 10,
    meanAmplitudeM: 2.8,
    coefficientBase: 82,
  },
  {
    id: 'dakhla',
    nameAr: 'الداخلة وخليج وادي الذهب',
    nameFr: 'Dakhla & Baie d’Or',
    nameEn: 'Dakhla & Gold Bay',
    coast: 'atlantic',
    baseHighTideHour: 6,
    baseHighTideMin: 0,
    meanAmplitudeM: 2.2,
    coefficientBase: 78,
  },
]

/** Computes accurate astronomical lunar phase and illumination for any date */
function getAstronomicalLunarPhase(date: Date = new Date()) {
  const refNewMoon = new Date('2024-01-11T11:57:00Z').getTime()
  const now = date.getTime()
  const daysDiff = (now - refNewMoon) / (1000 * 60 * 60 * 24)
  const synodicMonth = 29.53058867
  const cycleDay = ((daysDiff % synodicMonth) + synodicMonth) % synodicMonth
  const normalized = cycleDay / synodicMonth
  const illumination = Math.round((0.5 - 0.5 * Math.cos(normalized * 2 * Math.PI)) * 100)

  // 8 lunar phase categories
  let phaseKey: 'new' | 'waxing_crescent' | 'first_quarter' | 'waxing_gibbous' | 'full' | 'waning_gibbous' | 'last_quarter' | 'waning_crescent' = 'new'
  if (normalized < 0.03 || normalized >= 0.97) phaseKey = 'new'
  else if (normalized < 0.22) phaseKey = 'waxing_crescent'
  else if (normalized < 0.28) phaseKey = 'first_quarter'
  else if (normalized < 0.47) phaseKey = 'waxing_gibbous'
  else if (normalized < 0.53) phaseKey = 'full'
  else if (normalized < 0.72) phaseKey = 'waning_gibbous'
  else if (normalized < 0.78) phaseKey = 'last_quarter'
  else phaseKey = 'waning_crescent'

  // Spring vs Neap tides (Vives-Eaux vs Mortes-Eaux)
  const springFactor = Math.abs(Math.cos(normalized * 2 * Math.PI))
  const coefficient = Math.round(45 + springFactor * 55)

  return {
    cycleDay: Number(cycleDay.toFixed(1)),
    illumination,
    phaseKey,
    coefficient,
    isSpringTide: coefficient >= 75,
  }
}

export const MoroccanTideAndLunarClock: React.FC<MoroccanTideAndLunarClockProps> = ({
  lang,
  className = '',
}) => {
  const [selectedPortId, setSelectedPortId] = useState<string>('casablanca')
  const now = useMemo(() => new Date(), [])
  const lunar = useMemo(() => getAstronomicalLunarPhase(now), [now])

  const selectedPort = useMemo(
    () => (MOROCCAN_PORT_TIDES.find((p) => p.id === selectedPortId) || MOROCCAN_PORT_TIDES[1])!,
    [selectedPortId]
  )

  // Compute daily semi-diurnal tides based on port offset + lunar cycle progression
  const tides = useMemo(() => {
    // Semi-diurnal period is 12h 25m
    const shiftMins = Math.round(lunar.cycleDay * 50) % 720
    const firstHighMins = (selectedPort.baseHighTideHour * 60 + selectedPort.baseHighTideMin + shiftMins) % 720
    const secondHighMins = (firstHighMins + 745) % 1440
    const firstLowMins = (firstHighMins + 372) % 1440
    const secondLowMins = (secondHighMins + 372) % 1440

    const formatTime = (mins: number) => {
      const h = Math.floor(mins / 60) % 24
      const m = mins % 60
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    }

    const currentMinutesOfDay = now.getHours() * 60 + now.getMinutes()
    // Find next event
    const events = [
      { type: 'high', mins: firstHighMins, time: formatTime(firstHighMins), label: lang === 'ar' ? 'المد الأول' : 'Pleine Mer 1' },
      { type: 'low', mins: firstLowMins, time: formatTime(firstLowMins), label: lang === 'ar' ? 'الجزر الأول' : 'Basse Mer 1' },
      { type: 'high', mins: secondHighMins, time: formatTime(secondHighMins), label: lang === 'ar' ? 'المد الثاني' : 'Pleine Mer 2' },
      { type: 'low', mins: secondLowMins, time: formatTime(secondLowMins), label: lang === 'ar' ? 'الجزر الثاني' : 'Basse Mer 2' },
    ].sort((a, b) => a.mins - b.mins)

    const nextEvent = (events.find((e) => e.mins > currentMinutesOfDay) || events[0])!
    const isRising = nextEvent.type === 'high'

    return {
      firstHigh: formatTime(firstHighMins),
      secondHigh: formatTime(secondHighMins),
      firstLow: formatTime(firstLowMins),
      secondLow: formatTime(secondLowMins),
      nextEvent,
      isRising,
      heightHigh: (selectedPort.meanAmplitudeM * (0.8 + (lunar.coefficient / 120) * 0.4)).toFixed(2),
      heightLow: (0.35 + (1 - lunar.coefficient / 120) * 0.4).toFixed(2),
    }
  }, [lunar, selectedPort, now, lang])

  const lunarText = useMemo(() => {
    switch (lunar.phaseKey) {
      case 'new':
        return {
          name: lang === 'ar' ? 'المحاق (نوارة القمر - قمرة ميتة)' : lang === 'fr' ? 'Nouvelle Lune (Nuit Noire)' : 'New Moon (Dark Night)',
          fisheryImpact:
            lang === 'ar'
              ? 'الذروة الملكية لصيد السردين والأنشوبة بالشباك الدوارة (اللامبارو). الأسماك السطحية تنجذب بكثافة لأضواء المراكب.'
              : lang === 'fr'
              ? 'Période reine pour les sardiniers au lamparo (boliche). Les bancs pélagiques montent vers la lumière en obscurité totale.'
              : 'Peak conditions for sardine and anchovy purse seiners using lamps. Pelagic schools rise toward light in total darkness.',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        }
      case 'full':
        return {
          name: lang === 'ar' ? 'البدر الكامل (14 في الشهر العربي)' : lang === 'fr' ? 'Pleine Lune (Badr)' : 'Full Moon (Badr)',
          fisheryImpact:
            lang === 'ar'
              ? 'ضوء القمر يشتت السردين في الأعماق. موعد مفضل لصيد الصنارة الشاطئية (السورفكاستينغ) ليلاً لاستهداف الشرغو والدرعي.'
              : lang === 'fr'
              ? 'La lumière lunaire disperse la sardine au fond. Période idéale pour le surfcasting nocturne (bars, sars, dorades).'
              : 'Moonlight scatters sardines into deep water. Prime window for nocturnal surfcasting targeting seabass and sea bream.',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        }
      case 'waxing_crescent':
      case 'waxing_gibbous':
        return {
          name: lang === 'ar' ? 'القمر المتزايد (الهلال إلى الأحدب)' : lang === 'fr' ? 'Lune Croissante' : 'Waxing Moon',
          fisheryImpact:
            lang === 'ar'
              ? 'نشاط ممتاز للصيد بالجر الساحلي والخيوط الطويلة (بالانغري) لصيد الميرلان، الكوربين والراية.'
              : lang === 'fr'
              ? 'Excellente activité pour les palangriers et chalutiers côtiers ciblant merlu, courbine et turbot.'
              : 'Strong activity for longliners and coastal trawlers targeting hake, meagre, and turbot.',
          badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        }
      default:
        return {
          name: lang === 'ar' ? 'القمر المتناقص (التربيع الثاني)' : lang === 'fr' ? 'Lune Décroissante' : 'Waning Moon',
          fisheryImpact:
            lang === 'ar'
              ? 'تيارات مائية هادئة (مياه ميتة)، وقت مثالي للصيد بالقوارب الصغيرة (الفلوكة) وصيد الأخطبوط والسيبيا.'
              : lang === 'fr'
              ? 'Courants calmes de morte-eau, parfait pour les barques artisanales (floukas) ciblant poulpes et seiches.'
              : 'Calm neap currents, ideal for artisanal floukas targeting octopus, cuttlefish, and red mullet.',
          badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
        }
    }
  }, [lunar.phaseKey, lang])

  return (
    <div
      className={`rounded-xl border border-[#2a211c] bg-[#120e0c] p-5 sm:p-6 shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Subtle Moon/Wave ambient glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-[#d96b27]/10 blur-3xl pointer-events-none" />

      {/* Header with Title and Maritime Port Selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#2a211c] pb-4">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold text-[#e68a45] uppercase tracking-wider">
            <Moon className="h-3.5 w-3.5 text-[#e68a45]" />
            <span>
              {lang === 'ar'
                ? 'مرصد المد والجزر والدورات القمرية للسواحل المغربية'
                : lang === 'fr'
                ? 'Horloge des Marées & Baromètre Lunaire Marocain'
                : 'Moroccan Coastal Tide Clock & Lunar Barometer'}
            </span>
          </div>
          <h3 className="font-editorial text-xl font-bold text-[#f6f1e7] mt-1 sm:text-2xl">
            {lang === 'ar'
              ? 'إيقاع البحر: المد والجزر، القمر، ومواسم صيد المراكب'
              : lang === 'fr'
              ? 'Rythmes Côtiers : Marées, Lune & Stratégie Halieutique'
              : 'Coastal Rhythms: Tides, Moon & Moroccan Fleet Strategy'}
          </h3>
        </div>

        {/* Port Selector */}
        <div className="flex items-center gap-2">
          <Anchor className="h-4 w-4 text-[#a69b8d]" />
          <select
            value={selectedPortId}
            onChange={(e) => setSelectedPortId(e.target.value)}
            className="rounded-lg border border-[#2a211c] bg-[#0b0908] px-3 py-1.5 font-mono text-xs text-[#f6f1e7] focus:border-[#d96b27] focus:outline-none"
          >
            {MOROCCAN_PORT_TIDES.map((p) => (
              <option key={p.id} value={p.id}>
                {lang === 'ar' ? p.nameAr : lang === 'fr' ? p.nameFr : p.nameEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Lunar Telemetry + Tide Gauges */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Column: Astronomical Moon Status */}
        <div className="lg:col-span-5 rounded-lg border border-[#2a211c] bg-[#0b0908] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase text-[#a69b8d]">
                {lang === 'ar' ? 'الطور القمري الحالي' : 'Phase Lunaire Actuelle'}
              </span>
              <span className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold border ${lunarText.badge}`}>
                {lunar.illumination}% {lang === 'ar' ? 'إضاءة' : 'lum.'}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d96b27]/40 bg-[#1e1713] text-[#f2b47e] shadow-inner">
                <Moon className="h-6 w-6 text-[#f2b47e]" />
              </div>
              <div>
                <h4 className="font-bold text-[#f6f1e7] text-base sm:text-lg">{lunarText.name}</h4>
                <p className="font-mono text-[11px] text-[#786c60]">
                  {lang === 'ar'
                    ? `اليوم ${lunar.cycleDay} من الدورة الشهرية (29.5 يوماً)`
                    : `Jour ${lunar.cycleDay} du cycle synodique (29.5j)`}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-md border border-[#2a211c] bg-[#14110f] p-3">
              <span className="font-mono text-[10px] uppercase font-bold text-[#d96b27] block mb-1">
                {lang === 'ar' ? '💡 توجيه الصيادين وتأثير الطور:' : '💡 Stratégie halieutique recommandée :'}
              </span>
              <p className="text-xs leading-relaxed text-[#d4cbbd]">{lunarText.fisheryImpact}</p>
            </div>
          </div>

          {/* Tidal Coefficient Indicator */}
          <div className="mt-4 pt-3 border-t border-[#2a211c] flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase text-[#786c60] block">
                {lang === 'ar' ? 'معامل المد (Coefficient)' : 'Coefficient de Marée'}
              </span>
              <span className="font-mono text-xl font-bold text-[#f6f1e7]">
                {lunar.coefficient}{' '}
                <span className="text-xs text-[#a69b8d] font-normal">/ 120</span>
              </span>
            </div>
            <div className="text-end">
              <span
                className={`inline-block font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                  lunar.isSpringTide
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                }`}
              >
                {lunar.isSpringTide
                  ? lang === 'ar'
                    ? 'المد العالي (Vives-eaux)'
                    : 'Vives-eaux (Fort marnage)'
                  : lang === 'ar'
                  ? 'مياه ميتة (Mortes-eaux)'
                  : 'Mortes-eaux (Faible courant)'}
              </span>
              <span className="block font-mono text-[10px] text-[#786c60] mt-0.5">
                {lang === 'ar' ? 'تيارات قوية بالصخور' : 'Courants dynamiques'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Tide Times & Heights for Selected Port */}
        <div className="lg:col-span-7 rounded-lg border border-[#2a211c] bg-[#0b0908] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Waves className="h-4 w-4 text-[#e68a45]" />
                <span className="font-mono text-xs font-bold text-[#f6f1e7]">
                  {lang === 'ar'
                    ? `جدول أوقات المد والجزر لمرسى ${selectedPort.nameAr}`
                    : `Horaires des Marées · Port de ${selectedPort.nameFr}`}
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#e68a45] flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {lang === 'ar' ? 'تحديث فلكي مباشر' : 'Calcul astronomique direct'}
              </span>
            </div>

            {/* Next Tide Event Highlight Box */}
            <div className="rounded-lg border border-[#d96b27]/30 bg-[#1f1713] p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    tides.isRising ? 'bg-emerald-500/20 text-emerald-300' : 'bg-sky-500/20 text-sky-300'
                  }`}
                >
                  {tides.isRising ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-[#a69b8d] block">
                    {lang === 'ar' ? 'الحدث البحري القادم اليوم:' : 'Prochaine marée :'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-base text-[#f6f1e7]">{tides.nextEvent.label}</span>
                    <span className="font-mono text-lg font-bold text-[#e68a45]">{tides.nextEvent.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-end font-mono">
                <span className="text-[10px] text-[#a69b8d] block">
                  {lang === 'ar' ? 'حالة الحركة' : 'Tendance'}
                </span>
                <span className="text-xs font-bold text-[#f6f1e7]">
                  {tides.isRising
                    ? lang === 'ar'
                      ? 'البحر طالع (Marée montante)'
                      : 'Marée montante (+ flux)'
                    : lang === 'ar'
                    ? 'البحر هابط (Marée descendante)'
                    : 'Marée descendante (- reflux)'}
                </span>
              </div>
            </div>

            {/* 4 Daily Marée Slots */}
            <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              {/* High Tide 1 */}
              <div className="rounded border border-[#2a211c] bg-[#14110f] p-2.5">
                <span className="font-mono text-[9px] uppercase text-emerald-400 block font-bold">
                  {lang === 'ar' ? 'المد الأول (عالي)' : 'Pleine Mer 1'}
                </span>
                <span className="font-mono text-base font-bold text-[#f6f1e7] block mt-1">
                  {tides.firstHigh}
                </span>
                <span className="font-mono text-[10px] text-[#786c60]">~{tides.heightHigh}m</span>
              </div>

              {/* Low Tide 1 */}
              <div className="rounded border border-[#2a211c] bg-[#14110f] p-2.5">
                <span className="font-mono text-[9px] uppercase text-sky-400 block font-bold">
                  {lang === 'ar' ? 'الجزر الأول (واطي)' : 'Basse Mer 1'}
                </span>
                <span className="font-mono text-base font-bold text-[#f6f1e7] block mt-1">
                  {tides.firstLow}
                </span>
                <span className="font-mono text-[10px] text-[#786c60]">~{tides.heightLow}m</span>
              </div>

              {/* High Tide 2 */}
              <div className="rounded border border-[#2a211c] bg-[#14110f] p-2.5">
                <span className="font-mono text-[9px] uppercase text-emerald-400 block font-bold">
                  {lang === 'ar' ? 'المد الثاني (عالي)' : 'Pleine Mer 2'}
                </span>
                <span className="font-mono text-base font-bold text-[#f6f1e7] block mt-1">
                  {tides.secondHigh}
                </span>
                <span className="font-mono text-[10px] text-[#786c60]">~{tides.heightHigh}m</span>
              </div>

              {/* Low Tide 2 */}
              <div className="rounded border border-[#2a211c] bg-[#14110f] p-2.5">
                <span className="font-mono text-[9px] uppercase text-sky-400 block font-bold">
                  {lang === 'ar' ? 'الجزر الثاني (واطي)' : 'Basse Mer 2'}
                </span>
                <span className="font-mono text-base font-bold text-[#f6f1e7] block mt-1">
                  {tides.secondLow}
                </span>
                <span className="font-mono text-[10px] text-[#786c60]">~{tides.heightLow}m</span>
              </div>
            </div>
          </div>

          {/* Practical Coastal Rules Footer */}
          <div className="mt-3.5 pt-3 border-t border-[#2a211c] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#a69b8d]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#e68a45]" />
              {lang === 'ar'
                ? 'قاعدة الصيد بالمغرب: السورفكاستينغ (Surfcasting) يعطي أفضل مردود قبل بلوغ المد العالي بساعتين.'
                : 'Règle côtière : Le surfcasting offre son meilleur rendement 2h avant la pleine mer.'}
            </span>
            <span className="font-mono text-[#786c60]">
              {selectedPort.coast === 'atlantic' ? 'Océan Atlantique' : 'Mer Méditerranée'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

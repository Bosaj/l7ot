import React, { useState, useMemo } from 'react'
import {
  Waves,
  Eye,
  Compass,
  Wind,
  Thermometer,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Clock,
  Anchor,
} from 'lucide-react'
import type { SupportedLanguage } from '../i18n/strings'
import {
  MOROCCAN_DIVE_SPOTS,
  buildDiveSpotForecast,
  getLocalizedSpotName,
  type SafetyColor,
} from '../lib/diveForecastEngine'

interface MarineDiveForecastPortalProps {
  lang: SupportedLanguage
}

export const MarineDiveForecastPortal: React.FC<MarineDiveForecastPortalProps> = ({ lang }) => {
  const [selectedSpotId, setSelectedSpotId] = useState<string>('belyounech')
  const [basinFilter, setBasinFilter] = useState<string>('all')
  const [selectedStepIdx, setSelectedStepIdx] = useState<number>(0)

  const filteredSpots = useMemo(() => {
    if (basinFilter === 'all') return MOROCCAN_DIVE_SPOTS
    return MOROCCAN_DIVE_SPOTS.filter((s) => s.basin === basinFilter)
  }, [basinFilter])

  const activeSpot = useMemo(() => {
    return (
      MOROCCAN_DIVE_SPOTS.find((s) => s.id === selectedSpotId) ||
      filteredSpots[0] ||
      MOROCCAN_DIVE_SPOTS[0]!
    )
  }, [selectedSpotId, filteredSpots])

  const forecast = useMemo(() => buildDiveSpotForecast(activeSpot), [activeSpot])
  const selectedPoint = forecast.timeline72h[selectedStepIdx] || forecast.current

  const getColorBadgeStyles = (color: SafetyColor) => {
    if (color === 'green') {
      return {
        border: 'border-emerald-500/40',
        bg: 'bg-emerald-500/15',
        text: 'text-emerald-300',
        dot: 'bg-emerald-400',
        Icon: ShieldCheck,
      }
    }
    if (color === 'yellow') {
      return {
        border: 'border-amber-500/40',
        bg: 'bg-amber-500/15',
        text: 'text-amber-300',
        dot: 'bg-amber-400',
        Icon: ShieldAlert,
      }
    }
    return {
      border: 'border-rose-500/40',
      bg: 'bg-rose-500/15',
      text: 'text-rose-300',
      dot: 'bg-rose-500',
      Icon: AlertTriangle,
    }
  }

  const verdictStyle = getColorBadgeStyles(forecast.safetyVerdict.color)
  const VerdictIcon = verdictStyle.Icon

  // Build SVG polyline for 72h visibility & swell
  const svgPointsVis = forecast.timeline72h
    .map((pt, idx) => {
      const x = (idx / Math.max(1, forecast.timeline72h.length - 1)) * 560 + 20
      const y = 110 - (Math.min(20, pt.visibilityMeters) / 20) * 90
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  const svgPointsSwell = forecast.timeline72h
    .map((pt, idx) => {
      const x = (idx / Math.max(1, forecast.timeline72h.length - 1)) * 560 + 20
      const y = 110 - (Math.min(4, pt.swellHeightM) / 4) * 90
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <section
      aria-label="Marine Dive Forecast Portal"
      className="rounded-xl border border-cyan-500/25 bg-[#14110f] p-6 sm:p-8 shadow-2xl space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#f6f1e7]/10 pb-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase text-cyan-300">
            <Eye className="h-3.5 w-3.5 text-cyan-400" />
            <span>
              {lang === 'ar'
                ? 'بوابة توقعات الغطس الحر والصيد بالرمح · 14 موقعاً مغربياً (Copernicus Kd490)'
                : lang === 'fr'
                ? 'Portail Météo Plongée & Chasse Sous-Marine · 14 Spots (Copernicus Kd490)'
                : 'Marine Dive & Spearfishing Forecast Portal · 14 Moroccan Spots (Kd490)'}
            </span>
          </div>
          <h2 className="font-editorial text-2xl font-bold text-[#f6f1e7] sm:text-3xl">
            {lang === 'ar'
              ? 'شفافية المياه (Turbidity Kd490)، معاملات المد والجزر ومؤشر أمان الغطس (72 ساعة)'
              : lang === 'fr'
              ? 'Visibilité Sous-Marine (Turbidité Kd490), Coefficients de Marée & Sécurité 72h'
              : 'Underwater Visibility (Kd490 Turbidity), Tidal Coefficients & 72h Dive Safety'}
          </h2>
          <p className="max-w-3xl text-xs sm:text-sm text-[#a69b8d] leading-relaxed">
            {lang === 'ar'
              ? 'تقييم أوقيانوغرافي متخصص للغواصين وصيادي الرمح على طول السواحل المغربية (من بليونش وطنجة المتوسط والحسيمة إلى تغازوت وميرلفت والداخلة) يدمج معامل عكارة المياه Kd490 وعلو السويل وتيارات المد والجزر.'
              : lang === 'fr'
              ? 'Tableau de bord océanographique dédié aux apnéistes, chasseurs sous-marins et pêcheurs côtiers évaluant la transparence de l’eau (Kd490), la houle et les courants de marée sur 14 spots marocains.'
              : 'Specialized oceanographic dashboard for Moroccan spearfishermen and free-divers evaluating underwater visibility, swell safety, and tidal currents across 14 dive spots.'}
          </p>
        </div>

        {/* Basin Filter */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          {[
            { id: 'all', ar: 'كل الأحواض (14)', fr: 'Tous (14)', en: 'All (14)' },
            { id: 'gibraltar', ar: 'جبل طارق', fr: 'Détroit', en: 'Gibraltar' },
            { id: 'mediterranean', ar: 'المتوسط', fr: 'Méditerranée', en: 'Med' },
            { id: 'atlantic_north', ar: 'أطلسي شمالي', fr: 'Atl. Nord', en: 'N. Atlantic' },
            { id: 'atlantic_center', ar: 'أطلسي أوسط', fr: 'Atl. Centre', en: 'C. Atlantic' },
            { id: 'souss_sahara', ar: 'سوس والصحراء', fr: 'Souss-Sahara', en: 'Souss-Sahara' },
          ].map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setBasinFilter(b.id)}
              className={`rounded-lg px-2.5 py-1.5 font-mono text-[11px] font-semibold transition ${
                basinFilter === b.id
                  ? 'bg-cyan-500 text-[#0b0908] font-bold'
                  : 'border border-[#f6f1e7]/10 bg-[#0b0908] text-[#a69b8d] hover:text-[#f6f1e7]'
              }`}
            >
              {lang === 'ar' ? b.ar : lang === 'fr' ? b.fr : b.en}
            </button>
          ))}
        </div>
      </div>

      {/* 14 Dive Spots Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
        {filteredSpots.map((spot) => {
          const spotForecast = buildDiveSpotForecast(spot)
          const st = getColorBadgeStyles(spotForecast.safetyVerdict.color)
          const isSelected = spot.id === activeSpot.id

          return (
            <button
              key={spot.id}
              type="button"
              onClick={() => {
                setSelectedSpotId(spot.id)
                setSelectedStepIdx(0)
              }}
              className={`rounded-xl border p-2.5 text-start transition-all ${
                isSelected
                  ? 'border-cyan-400 bg-cyan-500/15 ring-1 ring-cyan-400'
                  : 'border-[#f6f1e7]/10 bg-[#0b0908] hover:border-[#f6f1e7]/25'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className={`h-2 w-2 rounded-full shrink-0 ${st.dot}`} />
                <span className="font-mono text-[10px] font-bold text-cyan-300">
                  {spotForecast.safetyVerdict.score}/10
                </span>
              </div>
              <div className="font-editorial text-xs font-bold text-[#f6f1e7] truncate">
                {getLocalizedSpotName(spot, lang)}
              </div>
              <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-[#a69b8d]">
                <span>👁️ {spotForecast.current.visibilityMeters}m</span>
                <span>🌊 {spotForecast.current.swellHeightM}m</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Active Spot Telemetry & Spearfishing Safety Index */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Telemetry Metrics & 72h Interactive Chart */}
        <div className="lg:col-span-8 rounded-xl border border-[#f6f1e7]/10 bg-[#0b0908] p-5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f6f1e7]/10 pb-4">
            <div>
              <span className="font-mono text-[10px] uppercase text-cyan-400 block">
                {activeSpot.basinLabel[lang]} · {activeSpot.depthRangeMeters[0]}–{activeSpot.depthRangeMeters[1]}m
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#f6f1e7]">
                {getLocalizedSpotName(activeSpot, lang)}
              </h3>
              <p className="text-xs text-[#a69b8d] mt-0.5">{activeSpot.bottomType[lang]}</p>
            </div>

            {/* Color-Coded Safety Badge */}
            <div
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold ${verdictStyle.border} ${verdictStyle.bg} ${verdictStyle.text}`}
            >
              <VerdictIcon className="h-4 w-4 shrink-0" />
              <span>
                {lang === 'ar'
                  ? forecast.safetyVerdict.badgeAr
                  : lang === 'fr'
                  ? forecast.safetyVerdict.badgeFr
                  : forecast.safetyVerdict.badgeEn}
              </span>
            </div>
          </div>

          {/* 5 Oceanographic Dials for Selected Hour */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-3 text-center">
              <Eye className="mx-auto h-4 w-4 text-cyan-400 mb-1" />
              <span className="block font-mono text-[10px] text-[#a69b8d]">
                {lang === 'ar' ? 'الرؤية الأفقية' : lang === 'fr' ? 'Visibilité Eau' : 'Water Visibility'}
              </span>
              <span className="font-mono text-xl font-bold text-cyan-300">
                {selectedPoint.visibilityMeters}m
              </span>
              <span className="block font-mono text-[9px] text-[#786c60]">
                Kd490: {selectedPoint.kd490} m⁻¹
              </span>
            </div>

            <div className="rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-3 text-center">
              <Waves className="mx-auto h-4 w-4 text-[#e68a45] mb-1" />
              <span className="block font-mono text-[10px] text-[#a69b8d]">
                {lang === 'ar' ? 'علو السويل والدورة' : lang === 'fr' ? 'Houle & Période' : 'Swell & Period'}
              </span>
              <span className="font-mono text-xl font-bold text-[#f6f1e7]">
                {selectedPoint.swellHeightM}m
              </span>
              <span className="block font-mono text-[9px] text-[#786c60]">
                T = {selectedPoint.wavePeriodS}s
              </span>
            </div>

            <div className="rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-3 text-center">
              <Anchor className="mx-auto h-4 w-4 text-amber-400 mb-1" />
              <span className="block font-mono text-[10px] text-[#a69b8d]">
                {lang === 'ar' ? 'معامل المد والجزر' : lang === 'fr' ? 'Coeff. Marée' : 'Tidal Coeff.'}
              </span>
              <span className="font-mono text-xl font-bold text-amber-300">
                {selectedPoint.tidalCoefficient}
              </span>
              <span className="block font-mono text-[9px] text-[#786c60]">
                {selectedPoint.tideState === 'rising'
                  ? lang === 'ar'
                    ? 'مد صاعد ▲'
                    : 'Montante ▲'
                  : selectedPoint.tideState === 'ebbing'
                  ? lang === 'ar'
                    ? 'جزر هابط ▼'
                    : 'Descendante ▼'
                  : selectedPoint.tideState === 'high'
                  ? lang === 'ar'
                    ? 'قمة المد ●'
                    : 'Pleine Mer ●'
                  : lang === 'ar'
                  ? 'قاع الجزر ○'
                  : 'Basse Mer ○'}
              </span>
            </div>

            <div className="rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-3 text-center">
              <Wind className="mx-auto h-4 w-4 text-emerald-400 mb-1" />
              <span className="block font-mono text-[10px] text-[#a69b8d]">
                {lang === 'ar' ? 'سرعة الرياح' : lang === 'fr' ? 'Vent Marin' : 'Wind Speed'}
              </span>
              <span className="font-mono text-xl font-bold text-emerald-300">
                {selectedPoint.windSpeedKt} kt
              </span>
              <span className="block font-mono text-[9px] text-[#786c60]">
                ~{Math.round(selectedPoint.windSpeedKt * 1.852)} km/h
              </span>
            </div>

            <div className="rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-3 text-center col-span-2 sm:col-span-1">
              <Thermometer className="mx-auto h-4 w-4 text-rose-400 mb-1" />
              <span className="block font-mono text-[10px] text-[#a69b8d]">
                {lang === 'ar' ? 'حرارة الماء (SST)' : lang === 'fr' ? 'Temp. Eau (SST)' : 'Water SST'}
              </span>
              <span className="font-mono text-xl font-bold text-rose-300">
                {selectedPoint.sstCelsius}°C
              </span>
              <span className="block font-mono text-[9px] text-[#786c60]">
                {selectedPoint.sstCelsius < 18.5
                  ? lang === 'ar'
                    ? 'بدلة 5–7 ملم'
                    : 'Combi 5–7mm'
                  : lang === 'ar'
                  ? 'بدلة 3–5 ملم'
                  : 'Combi 3–5mm'}
              </span>
            </div>
          </div>

          {/* 72-Hour Forecast Interactive Timeline Chart */}
          <div className="rounded-xl border border-[#f6f1e7]/10 bg-[#14110f] p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#f6f1e7]">
                <Clock className="h-4 w-4 text-cyan-400" />
                <span>
                  {lang === 'ar'
                    ? `منحنى توقعات 72 ساعة (${selectedPoint.label}) — مؤشر الأمان: ${selectedPoint.safetyScore}/10`
                    : lang === 'fr'
                    ? `Timeline Prévisionnelle 72h (${selectedPoint.label}) — Indice : ${selectedPoint.safetyScore}/10`
                    : `72-Hour Forecast Timeline (${selectedPoint.label}) — Safety Score: ${selectedPoint.safetyScore}/10`}
                </span>
              </div>
              <div className="flex items-center gap-4 font-mono text-[10px]">
                <span className="inline-flex items-center gap-1 text-cyan-300">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  {lang === 'ar' ? 'الرؤية (متر)' : 'Visibilité (m)'}
                </span>
                <span className="inline-flex items-center gap-1 text-amber-300">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  {lang === 'ar' ? 'علو السويل (متر)' : 'Houle (m)'}
                </span>
              </div>
            </div>

            <svg
              viewBox="0 0 600 125"
              className="w-full h-32 overflow-visible rounded bg-[#0b0908] p-2 border border-[#f6f1e7]/5"
            >
              {/* Grid lines */}
              <line x1="20" y1="25" x2="580" y2="25" stroke="rgba(246,241,231,0.07)" strokeDasharray="3 3" />
              <line x1="20" y1="65" x2="580" y2="65" stroke="rgba(246,241,231,0.07)" strokeDasharray="3 3" />
              <line x1="20" y1="105" x2="580" y2="105" stroke="rgba(246,241,231,0.07)" />

              {/* Visibility curve */}
              <polyline
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={svgPointsVis}
              />

              {/* Swell curve */}
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4 2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={svgPointsSwell}
              />

              {/* Interactive nodes */}
              {forecast.timeline72h.map((pt, idx) => {
                const x = (idx / Math.max(1, forecast.timeline72h.length - 1)) * 560 + 20
                const yVis = 110 - (Math.min(20, pt.visibilityMeters) / 20) * 90
                const isCurrent = idx === selectedStepIdx
                const dotColor =
                  pt.safetyColor === 'green'
                    ? '#34d399'
                    : pt.safetyColor === 'yellow'
                    ? '#fbbf24'
                    : '#f43f5e'

                return (
                  <g
                    key={pt.hourOffset}
                    className="cursor-pointer"
                    onClick={() => setSelectedStepIdx(idx)}
                  >
                    <circle
                      cx={x}
                      cy={yVis}
                      r={isCurrent ? 6 : 4}
                      fill={dotColor}
                      stroke="#0b0908"
                      strokeWidth="1.5"
                    />
                    <text
                      x={x}
                      y={121}
                      textAnchor="middle"
                      fill={isCurrent ? '#22d3ee' : '#a69b8d'}
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      +{pt.hourOffset}h
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* 72h Step Pills */}
            <div className="flex overflow-x-auto gap-1.5 pb-1 no-scrollbar">
              {forecast.timeline72h.map((pt, idx) => {
                const st = getColorBadgeStyles(pt.safetyColor)
                return (
                  <button
                    key={pt.hourOffset}
                    type="button"
                    onClick={() => setSelectedStepIdx(idx)}
                    className={`shrink-0 rounded-lg border px-2.5 py-1 font-mono text-[10px] transition ${
                      selectedStepIdx === idx
                        ? 'border-cyan-400 bg-cyan-500/20 text-white font-bold'
                        : 'border-[#f6f1e7]/10 bg-[#0b0908] text-[#a69b8d] hover:text-white'
                    }`}
                  >
                    <span className={`inline-block h-1.5 w-1.5 rounded-full me-1 ${st.dot}`} />
                    +{pt.hourOffset}h ({pt.safetyScore})
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right: Spearfishing Safety Index Gauge, Tidal Harmonic Windows & Target Species */}
        <div className="lg:col-span-4 rounded-xl border border-[#f6f1e7]/10 bg-[#0b0908] p-5 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#f6f1e7]/10 pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase text-[#a69b8d] block">
                  {lang === 'ar' ? 'مؤشر جدوى الغطس والصيد بالرمح' : 'INDICE CHASSE SOUS-MARINE'}
                </span>
                <h4 className="font-editorial text-lg font-bold text-[#f6f1e7]">
                  {lang === 'ar'
                    ? 'تقييم الأمان والوضوح'
                    : lang === 'fr'
                    ? 'Score de Praticabilité'
                    : 'Spearfishing Safety Index'}
                </h4>
              </div>
              <div
                className={`flex h-14 w-14 flex-col items-center justify-center rounded-2xl border font-mono ${verdictStyle.border} ${verdictStyle.bg} ${verdictStyle.text}`}
              >
                <span className="text-lg font-black leading-none">{selectedPoint.safetyScore}</span>
                <span className="text-[9px] opacity-80">/ 10</span>
              </div>
            </div>

            <p className="rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-3.5 text-xs leading-relaxed text-[#d4cbbd]">
              {lang === 'ar'
                ? forecast.safetyVerdict.adviceAr
                : lang === 'fr'
                ? forecast.safetyVerdict.adviceFr
                : forecast.safetyVerdict.adviceEn}
            </p>

            {/* Harmonic Tide Table */}
            <div className="rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-3.5 space-y-2 font-mono text-xs">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Compass className="h-3.5 w-3.5" />
                <span>
                  {lang === 'ar'
                    ? 'مواقيت المد والجزر الحرجة (Tidal Harmonics)'
                    : 'Horaires des Marées & Courants'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#d4cbbd]">
                <span>{lang === 'ar' ? 'قمة المد (Pleine Mer):' : 'Pleine Mer (High):'}</span>
                <span className="text-emerald-300 font-bold" dir="ltr">
                  {forecast.nextHighTide}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#d4cbbd]">
                <span>{lang === 'ar' ? 'قاع الجزر (Basse Mer):' : 'Basse Mer (Low):'}</span>
                <span className="text-cyan-300 font-bold" dir="ltr">
                  {forecast.nextLowTide}
                </span>
              </div>
            </div>

            {/* Target Spearfishing Species at this Spot */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase text-[#a69b8d] block">
                {lang === 'ar'
                  ? 'الأنواع المستهدفة في هذا الموقع:'
                  : lang === 'fr'
                  ? 'Espèces cibles sur ce spot :'
                  : 'Target species at this dive spot:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeSpot.targetSpecies[lang].map((sp) => (
                  <span
                    key={sp}
                    className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-200"
                  >
                    🎯 {sp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Color Legend */}
          <div className="rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-3 space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2 text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'أخضر (7.2–10): بحر هادئ ومياه صافية'
                  : lang === 'fr'
                  ? 'Vert (7.2–10) : Mer calme & claire'
                  : 'Green (7.2–10): Calm & Clear'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'أصفر (4.5–7.1): سويل متوسط وحذر'
                  : lang === 'fr'
                  ? 'Jaune (4.5–7.1) : Houle modérée'
                  : 'Yellow (4.5–7.1): Moderate Swell'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-rose-300">
              <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'أحمر (1.0–4.4): تيارات سحب خطيرة وعكارة'
                  : lang === 'fr'
                  ? 'Rouge (1.0–4.4) : Courants dangereux / Eau trouble'
                  : 'Red (1.0–4.4): Dangerous Undertow / Zero Visibility'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

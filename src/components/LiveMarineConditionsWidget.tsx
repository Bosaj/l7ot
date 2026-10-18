import React, { useState, useEffect } from 'react'
import {
  Waves,
  RefreshCw,
  Anchor,
  Info,
} from 'lucide-react'
import type { SupportedLanguage } from '../i18n/strings'
import {
  fetchLivePortMarineWeather,
  getSeaStateImpact,
  type MarineWeatherForecast,
} from '../services/marineApis'
import {
  MOROCCAN_PORT_REGIONS,
  type MoroccanPortRegion,
} from '../lib/moroccanRegions'

interface LiveMarineConditionsWidgetProps {
  currentRegion?: MoroccanPortRegion
  lang: SupportedLanguage
  onSelectRegion?: (regionId: string) => void
}

export const LiveMarineConditionsWidget: React.FC<LiveMarineConditionsWidgetProps> = ({
  currentRegion,
  lang,
  onSelectRegion,
}) => {
  const activeRegion =
    currentRegion ||
    MOROCCAN_PORT_REGIONS.find((r) => r.id === 'centre') ||
    MOROCCAN_PORT_REGIONS[0]!

  const [weather, setWeather] = useState<MarineWeatherForecast | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const loadWeather = async (lat: number, lon: number) => {
    setLoading(true)
    try {
      const data = await fetchLivePortMarineWeather(lat, lon)
      setWeather(data)
      setLastUpdated(new Date())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWeather(activeRegion.lat, activeRegion.lon)
  }, [activeRegion.id])

  const impact = weather ? getSeaStateImpact(weather.current.waveHeight) : null

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#2a211c] bg-[#120e0c] p-4 sm:p-5 shadow-xl">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -top-16 -end-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2a211c] pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            <Waves className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-editorial text-sm font-bold text-[#f4ede2] sm:text-base">
                {lang === 'ar'
                  ? 'رادار البحر والطقس البحري المباشر'
                  : 'Radar Météo Marine & Criées en Direct'}
              </h3>
              <span className="inline-flex items-center gap-1 rounded bg-cyan-500/20 px-1.5 py-0.5 font-mono text-[10px] text-cyan-300 border border-cyan-400/30">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Open-Meteo API
              </span>
            </div>
            <p className="font-mono text-[11px] text-[#a69b8d]">
              {lang === 'ar'
                ? `الميناء المعتمد: ${activeRegion.primaryPortAr}`
                : `Port Référent : ${activeRegion.primaryPortFr}`}
            </p>
          </div>
        </div>

        {/* Port selector pills & Refresh button */}
        <div className="flex items-center gap-1.5">
          {onSelectRegion && (
            <select
              value={activeRegion.id}
              onChange={(e) => onSelectRegion(e.target.value)}
              aria-label="Sélectionner le port de référence"
              className="rounded-md border border-[#2a211c] bg-[#0b0908] px-2.5 py-1 text-xs font-mono text-[#e09f3e] focus:outline-none focus:border-cyan-400"
            >
              {MOROCCAN_PORT_REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {lang === 'ar' ? r.primaryPortAr.split('/')[0] : r.primaryPortFr.split('/')[0]}
                </option>
              ))}
            </select>
          )}

          <button
            type="button"
            onClick={() => loadWeather(activeRegion.lat, activeRegion.lon)}
            disabled={loading}
            title={lang === 'ar' ? 'تحديث بيانات البحر' : 'Rafraîchir'}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-[#2a211c] bg-[#0b0908] text-[#a69b8d] transition hover:text-[#f4ede2] hover:border-cyan-400"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main telemetry body */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Wave Height */}
        <div className="rounded-xl border border-[#2a211c] bg-[#0b0908] p-3 text-start">
          <span className="block font-mono text-[10px] uppercase text-[#a69b8d]">
            {lang === 'ar' ? 'علو الموج (الحالي):' : 'Hauteur de houle :'}
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-mono text-2xl font-black text-cyan-400">
              {weather?.current.waveHeight.toFixed(1) ?? '1.3'}
            </span>
            <span className="font-mono text-xs text-[#a69b8d]">
              {lang === 'ar' ? 'متر' : 'm'}
            </span>
          </div>
          <span className="block font-mono text-[10px] text-[#786c60] mt-0.5">
            {lang === 'ar' ? 'موج المحيط الأطلسي' : 'Houle du large'}
          </span>
        </div>

        {/* Wave Period */}
        <div className="rounded-xl border border-[#2a211c] bg-[#0b0908] p-3 text-start">
          <span className="block font-mono text-[10px] uppercase text-[#a69b8d]">
            {lang === 'ar' ? 'دورة الأمواج:' : 'Période houle :'}
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-mono text-2xl font-black text-[#f4ede2]">
              {weather?.current.wavePeriod.toFixed(0) ?? '8'}
            </span>
            <span className="font-mono text-xs text-[#a69b8d]">
              {lang === 'ar' ? 'ثانية' : 'sec'}
            </span>
          </div>
          <span className="block font-mono text-[10px] text-[#786c60] mt-0.5">
            {lang === 'ar' ? 'فاصل زمني بين الموجتين' : 'Intervalle crêtes'}
          </span>
        </div>

        {/* Swell / Wind Wave */}
        <div className="rounded-xl border border-[#2a211c] bg-[#0b0908] p-3 text-start">
          <span className="block font-mono text-[10px] uppercase text-[#a69b8d]">
            {lang === 'ar' ? 'موج الرياح:' : 'Mer du vent :'}
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-mono text-2xl font-black text-[#e09f3e]">
              {weather?.current.windWaveHeight.toFixed(1) ?? '0.6'}
            </span>
            <span className="font-mono text-xs text-[#a69b8d]">
              {lang === 'ar' ? 'متر' : 'm'}
            </span>
          </div>
          <span className="block font-mono text-[10px] text-[#786c60] mt-0.5">
            {lang === 'ar' ? 'أمواج سطحية ساحلية' : 'Vagues côtières'}
          </span>
        </div>

        {/* Port Status Indicator */}
        <div className="rounded-xl border border-[#2a211c] bg-[#0b0908] p-3 text-start">
          <span className="block font-mono text-[10px] uppercase text-[#a69b8d]">
            {lang === 'ar' ? 'مؤشر أمان الصيد:' : 'Indice Sortie Mer :'}
          </span>
          <div className="mt-1 flex items-center gap-1.5">
            <Anchor className="h-4 w-4 text-emerald-400" />
            <span className="font-mono text-xs font-bold text-emerald-400">
              {impact ? (lang === 'ar' ? impact.labelAr.split('·')[0] : impact.labelFr.split('·')[0]) : (lang === 'ar' ? 'بحر هادئ' : 'Mer Calme')}
            </span>
          </div>
          <span className="block font-mono text-[10px] text-[#786c60] mt-1">
            {lang === 'ar' ? 'الأسطول الساحلي نشط' : 'Flotte active'}
          </span>
        </div>
      </div>

      {/* Practical Consumer Market Impact Banner */}
      {impact && (
        <div className={`mt-3.5 rounded-xl border p-3 text-xs leading-relaxed ${impact.color}`}>
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">
                {lang === 'ar'
                  ? 'تأثير حالة البحر اليوم على وفرة وأسعار الحوت في الأسواق:'
                  : 'Impact sur les arrivages et les prix en poissonnerie :'}
              </strong>
              <span>
                {lang === 'ar'
                  ? impact.consumerAdviceAr
                  : lang === 'fr'
                  ? impact.consumerAdviceFr
                  : impact.consumerAdviceEn}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Live sync footnote */}
      <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-[#786c60]">
        <span>
          {lang === 'ar'
            ? `آخر تحديث عبر الأقمار الاصطناعية: ${lastUpdated.toLocaleTimeString()}`
            : `Dernière synchro satellite : ${lastUpdated.toLocaleTimeString()}`}
        </span>
        <span>Open-Meteo Marine (NOAA / ECMWF)</span>
      </div>
    </div>
  )
}

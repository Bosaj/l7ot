import React, { useState, useMemo } from 'react'
import {
  TrendingUp,
  Download,
  FileSpreadsheet,
  FileJson,
  ArrowLeftRight,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Scale,
} from 'lucide-react'
import type { Fish } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import {
  ONP_22_PORTS,
  buildAll22PortQuotesForFish,
  buildWholesaleTimeSeries,
  calculateRegionalArbitrage,
  exportQuotesToCsv,
  getPortDisplayName,
  type TimeRangeKey,
} from '../lib/onpWholesaleEngine'

interface OnpWholesaleAuctionIndexProps {
  allFish: Fish[]
  lang: SupportedLanguage
}

export const OnpWholesaleAuctionIndex: React.FC<OnpWholesaleAuctionIndexProps> = ({
  allFish,
  lang,
}) => {
  const [selectedFishId, setSelectedFishId] = useState<string>(allFish[0]?.id || 'sardine')
  const [selectedPortId, setSelectedPortId] = useState<string>('dakhla')
  const [timeRange, setTimeRange] = useState<TimeRangeKey>('30d')

  // Arbitrage Comparator states (e.g. Dakhla vs Casablanca vs Nador)
  const [arbSourcePortId, setArbSourcePortId] = useState<string>('dakhla')
  const [arbTargetPortId, setArbTargetPortId] = useState<string>('casablanca')
  const [arbThirdPortId, setArbThirdPortId] = useState<string>('nador')
  const [arbQuantityKg, setArbQuantityKg] = useState<number>(1000)
  const [exportFeedback, setExportFeedback] = useState<string>('')

  const activeFish = useMemo(
    () => allFish.find((f) => f.id === selectedFishId) || allFish[0]!,
    [allFish, selectedFishId]
  )

  const activePort = useMemo(
    () => ONP_22_PORTS.find((p) => p.id === selectedPortId) || ONP_22_PORTS[0]!,
    [selectedPortId]
  )

  const all22Quotes = useMemo(() => buildAll22PortQuotesForFish(activeFish), [activeFish])

  const timeSeries = useMemo(
    () => buildWholesaleTimeSeries(activeFish, activePort, timeRange),
    [activeFish, activePort, timeRange]
  )

  const primaryArbitrage = useMemo(
    () =>
      calculateRegionalArbitrage({
        fish: activeFish,
        sourcePortId: arbSourcePortId,
        targetPortId: arbTargetPortId,
        quantityKg: arbQuantityKg,
      }),
    [activeFish, arbSourcePortId, arbTargetPortId, arbQuantityKg]
  )

  const secondaryArbitrage = useMemo(
    () =>
      calculateRegionalArbitrage({
        fish: activeFish,
        sourcePortId: arbSourcePortId,
        targetPortId: arbThirdPortId,
        quantityKg: arbQuantityKg,
      }),
    [activeFish, arbSourcePortId, arbThirdPortId, arbQuantityKg]
  )

  const handleDownloadSheet = (format: 'csv' | 'json') => {
    const content =
      format === 'csv'
        ? exportQuotesToCsv(activeFish, all22Quotes)
        : JSON.stringify(
            {
              generatedAt: new Date().toISOString(),
              species: {
                id: activeFish.id,
                nameAr: activeFish.nameDarijaArabic,
                nameFr: activeFish.nameFrench,
                scientificName: activeFish.scientificName,
              },
              portsCount: all22Quotes.length,
              quotes: all22Quotes,
            },
            null,
            2
          )

    try {
      if (typeof Blob !== 'undefined' && typeof URL !== 'undefined' && URL.createObjectURL) {
        const blob = new Blob([content], {
          type: format === 'csv' ? 'text/csv;charset=utf-8;' : 'application/json',
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `onp-criee-22-ports-${activeFish.id}.${format}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch {
      // safe fallback in headless test environments
    }

    setExportFeedback(
      lang === 'ar'
        ? `✓ تم تصدير بيانات الـ 22 مرسى بصيغة ${format.toUpperCase()} بنجاح`
        : lang === 'fr'
        ? `✓ Export ${format.toUpperCase()} des 22 criées ONP généré`
        : `✓ Exported 22 ONP ports dataset as ${format.toUpperCase()}`
    )
  }

  // SVG chart coordinates
  const maxVal = Math.max(...timeSeries.map((p) => p.upperBandMAD), 20)
  const minVal = Math.max(0, Math.min(...timeSeries.map((p) => p.lowerBandMAD)) - 4)
  const valSpan = Math.max(1, maxVal - minVal)

  const getX = (idx: number) =>
    (idx / Math.max(1, timeSeries.length - 1)) * 540 + 30
  const getY = (val: number) => 125 - ((val - minVal) / valSpan) * 100

  const spotPolyline = timeSeries
    .map((pt, i) => `${getX(i).toFixed(1)},${getY(pt.spotMAD).toFixed(1)}`)
    .join(' ')

  const ma30Polyline = timeSeries
    .map((pt, i) => `${getX(i).toFixed(1)},${getY(pt.ma30MAD).toFixed(1)}`)
    .join(' ')

  const bandPolygon = [
    ...timeSeries.map((pt, i) => `${getX(i).toFixed(1)},${getY(pt.upperBandMAD).toFixed(1)}`),
    ...[...timeSeries]
      .reverse()
      .map((pt, revIdx) => {
        const origIdx = timeSeries.length - 1 - revIdx
        return `${getX(origIdx).toFixed(1)},${getY(pt.lowerBandMAD).toFixed(1)}`
      }),
  ].join(' ')

  return (
    <section
      aria-label="ONP 22 Ports Wholesale Criee Auction Index"
      className="rounded-xl border border-[#d96b27]/30 bg-[#14110f] p-6 sm:p-8 shadow-2xl space-y-8 text-[#f6f1e7]"
    >
      {/* Masthead */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#f6f1e7]/10 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d96b27]/40 bg-[#d96b27]/15 px-3 py-1 font-mono text-[11px] font-bold text-[#f2b47e]">
            <Building2 className="h-3.5 w-3.5 text-[#e68a45]" />
            <span>
              {lang === 'ar'
                ? 'مؤشر المزاد العلني بالجملة في 22 مرسى (ONP Halles au Poisson)'
                : lang === 'fr'
                ? 'Indice de Gros des Criées ONP · 22 Halles aux Poissons du Maroc'
                : 'ONP Wholesale Criée Auction Index · All 22 Moroccan Landing Ports'}
            </span>
          </div>
          <h2 className="font-editorial text-2xl font-bold text-[#f6f1e7] sm:text-4xl">
            {lang === 'ar'
              ? 'بورصة الجملة الرسمية (WPI)، نطاقات التقلب وحاسبة المراجحة بين الموانئ'
              : lang === 'fr'
              ? 'Indice des Prix de Gros (WPI), Bandes de Volatilité & Arbitrage Inter-Ports'
              : 'Wholesale Price Index (WPI), Volatility Bands & Regional Arbitrage Radar'}
          </h2>
          <p className="max-w-3xl text-xs sm:text-sm text-[#a69b8d] leading-relaxed">
            {lang === 'ar'
              ? 'يتتبع هذا المرصد المهني أحجام التفريغ اليومية ومتوسط أسعار الجملة وأعلى المزايدات عبر 22 سوق جملة ساحلي تابع للمكتب الوطني للصيد (ONP)، مع مقارنة الفوارق السعرية بين الداخلة والدار البيضاء والناظور.'
              : lang === 'fr'
              ? 'Radar B2B transparent suivant les volumes débarqués, les cours moyens, la moyenne mobile 30 jours (MA30) et les écarts régionaux à travers les 22 criées ONP.'
              : 'Transparent B2B wholesale pricing radar tracking daily landings, 30-day moving averages, volatility bands, and regional price spreads across all 22 ONP fish auctions.'}
          </p>
        </div>

        {/* Export CSV / JSON Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleDownloadSheet('csv')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-2 font-mono text-xs font-bold text-emerald-300 hover:bg-emerald-500 hover:text-black transition"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>{lang === 'ar' ? 'تصدير CSV (22 مرسى)' : 'Exporter CSV (22 Ports)'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleDownloadSheet('json')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/15 px-3.5 py-2 font-mono text-xs font-bold text-cyan-300 hover:bg-cyan-500 hover:text-black transition"
          >
            <FileJson className="h-4 w-4" />
            <span>{lang === 'ar' ? 'تصدير JSON (B2B)' : 'Exporter JSON (B2B)'}</span>
          </button>
        </div>
      </div>

      {exportFeedback && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-mono text-xs text-emerald-300 flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>{exportFeedback}</span>
        </div>
      )}

      {/* Controls: Species Selector, Port Selector & Time-Range (7d, 30d, 1y) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className="font-mono text-[11px] uppercase text-[#a69b8d] block mb-1.5">
            {lang === 'ar' ? '1. اختر النوع السمكي (44 نوعاً):' : '1. Espèce Halieutique (44) :'}
          </label>
          <select
            aria-label="Select Wholesale Fish Species"
            value={selectedFishId}
            onChange={(e) => setSelectedFishId(e.target.value)}
            className="w-full rounded-lg border border-[#f6f1e7]/15 bg-[#0b0908] px-3 py-2.5 text-xs font-bold text-[#f2b47e] focus:border-[#d96b27] focus:outline-none"
          >
            {allFish.map((f) => (
              <option key={f.id} value={f.id} className="bg-[#0b0908] text-[#f6f1e7]">
                {lang === 'ar'
                  ? `${f.nameDarijaArabic} (${f.nameFrench})`
                  : `${f.nameFrench} (${f.nameDarijaArabic})`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-mono text-[11px] uppercase text-[#a69b8d] block mb-1.5">
            {lang === 'ar' ? '2. اختر سوق الجملة (22 مرسى ONP):' : '2. Halle aux Poissons ONP (22) :'}
          </label>
          <select
            aria-label="Select ONP Port Criee"
            value={selectedPortId}
            onChange={(e) => setSelectedPortId(e.target.value)}
            className="w-full rounded-lg border border-[#f6f1e7]/15 bg-[#0b0908] px-3 py-2.5 text-xs font-bold text-cyan-300 focus:border-[#d96b27] focus:outline-none"
          >
            {ONP_22_PORTS.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#0b0908] text-[#f6f1e7]">
                {p.code} · {getPortDisplayName(p, lang)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="font-mono text-[11px] uppercase text-[#a69b8d] block mb-1.5">
            {lang === 'ar' ? '3. النطاق الزمني للمؤشر (Time-Range):' : '3. Horizon Temporel (WPI) :'}
          </span>
          <div className="grid grid-cols-3 gap-1.5 rounded-lg border border-[#f6f1e7]/15 bg-[#0b0908] p-1">
            {(['7d', '30d', '1y'] as TimeRangeKey[]).map((rng) => (
              <button
                key={rng}
                type="button"
                onClick={() => setTimeRange(rng)}
                className={`rounded-md py-1.5 font-mono text-xs font-bold transition ${
                  timeRange === rng
                    ? 'bg-[#d96b27] text-[#0b0908]'
                    : 'text-[#a69b8d] hover:text-[#f6f1e7]'
                }`}
              >
                {rng === '7d'
                  ? lang === 'ar'
                    ? '7 أيام (7d)'
                    : '7 Jours (7d)'
                  : rng === '30d'
                  ? lang === 'ar'
                    ? '30 يوماً (30d)'
                    : '30 Jours (30d)'
                  : lang === 'ar'
                  ? 'سنة (1y)'
                  : '1 An (1y)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive WPI Price Trend Graph with 30-Day Moving Average & Volatility Bands */}
      <div className="rounded-xl border border-[#f6f1e7]/10 bg-[#0b0908] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-editorial text-xl font-bold text-[#f6f1e7] flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#e68a45]" />
              <span>
                {lang === 'ar'
                  ? `منحنى مؤشر أسعار الجملة (WPI) — ${activeFish.nameDarijaArabic} في ${activePort.nameAr}`
                  : `Graphique WPI & Bandes de Volatilité — ${activeFish.nameFrench} (${activePort.nameFr})`}
              </span>
            </h3>
            <p className="font-mono text-xs text-[#a69b8d]">
              {lang === 'ar'
                ? 'يتضمن المتوسط المتحرك لـ 30 يوماً (MA30) ونطاق التقلب الأعلى والأدنى (±1.5σ)'
                : 'Inclut la Moyenne Mobile 30 jours (MA30) et le canal de volatilité (±1.5σ)'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-emerald-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              {lang === 'ar' ? 'سعر المزاد الفوري (Spot MAD/kg)' : 'Cours Criée Spot'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-amber-300">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              {lang === 'ar' ? 'متوسط 30 يوماً (MA30)' : 'Moyenne 30j (MA30)'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-cyan-300">
              <span className="h-2.5 w-2.5 rounded bg-cyan-500/30 border border-cyan-400" />
              {lang === 'ar' ? 'نطاق التقلب (±1.5σ)' : 'Bandes Volatilité'}
            </span>
          </div>
        </div>

        <svg
          viewBox="0 0 600 140"
          className="w-full h-40 overflow-visible rounded-lg border border-[#f6f1e7]/5 bg-[#14110f] p-2"
        >
          {/* Volatility Shaded Band */}
          <polygon points={bandPolygon} fill="rgba(34, 211, 238, 0.12)" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1" />

          {/* MA30 Line */}
          <polyline
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
            strokeDasharray="5 3"
            points={ma30Polyline}
          />

          {/* Spot Wholesale Price Line */}
          <polyline
            fill="none"
            stroke="#34d399"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={spotPolyline}
          />

          {/* Points & Labels */}
          {timeSeries.map((pt, i) => {
            const x = getX(i)
            const y = getY(pt.spotMAD)
            return (
              <g key={pt.index}>
                <circle cx={x} cy={y} r="4" fill="#34d399" stroke="#0b0908" strokeWidth="1.5" />
                <text
                  x={x}
                  y={y - 8}
                  textAnchor="middle"
                  fill="#f6f1e7"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {pt.spotMAD}
                </text>
                <text
                  x={x}
                  y={135}
                  textAnchor="middle"
                  fill="#a69b8d"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {pt.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Regional Price Spread Comparator & B2B Arbitrage Calculator (e.g., Dakhla vs Casablanca vs Nador) */}
      <div className="rounded-xl border border-amber-500/30 bg-[#0b0908] p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f6f1e7]/10 pb-3">
          <div>
            <h3 className="font-editorial text-xl font-bold text-amber-200 flex items-center gap-2">
              <ArrowLeftRight className="h-5 w-5 text-amber-400" />
              <span>
                {lang === 'ar'
                  ? 'حاسبة المراجحة والفوارق السعرية الجهوية لتجار الجملة (مثال: الداخلة ↔ الدار البيضاء ↔ الناظور)'
                  : lang === 'fr'
                  ? 'Comparateur d’Écarts Régionaux & Calculateur d’Arbitrage B2B (Dakhla ↔ Casablanca ↔ Nador)'
                  : 'Regional Price Spread Comparator & Wholesale Arbitrage Calculator (Dakhla ↔ Casablanca ↔ Nador)'}
              </span>
            </h3>
          </div>
          <span className="font-mono text-xs text-amber-400">
            <Scale className="inline h-3.5 w-3.5 me-1" />
            {lang === 'ar' ? 'يشمل تكلفة النقل المبرد والثلج' : 'Inclut transport frigorifique & glace'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div>
            <label className="font-mono text-[10px] uppercase text-[#a69b8d] block mb-1">
              {lang === 'ar' ? 'ميناء الشراء (المصدر):' : 'Port d’Achat (Départ) :'}
            </label>
            <select
              aria-label="Arbitrage Source Port"
              value={arbSourcePortId}
              onChange={(e) => setArbSourcePortId(e.target.value)}
              className="w-full rounded border border-[#f6f1e7]/15 bg-[#14110f] p-2 text-xs font-bold text-emerald-300"
            >
              {ONP_22_PORTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {getPortDisplayName(p, lang)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase text-[#a69b8d] block mb-1">
              {lang === 'ar' ? 'سوق البيع الأول (الوسط):' : 'Port Cible 1 (Centre) :'}
            </label>
            <select
              aria-label="Arbitrage Target Port 1"
              value={arbTargetPortId}
              onChange={(e) => setArbTargetPortId(e.target.value)}
              className="w-full rounded border border-[#f6f1e7]/15 bg-[#14110f] p-2 text-xs font-bold text-amber-300"
            >
              {ONP_22_PORTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {getPortDisplayName(p, lang)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase text-[#a69b8d] block mb-1">
              {lang === 'ar' ? 'سوق البيع الثاني (الشمال/الشرق):' : 'Port Cible 2 (Nord/Est) :'}
            </label>
            <select
              aria-label="Arbitrage Target Port 2"
              value={arbThirdPortId}
              onChange={(e) => setArbThirdPortId(e.target.value)}
              className="w-full rounded border border-[#f6f1e7]/15 bg-[#14110f] p-2 text-xs font-bold text-cyan-300"
            >
              {ONP_22_PORTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {getPortDisplayName(p, lang)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase text-[#a69b8d] block mb-1">
              {lang === 'ar' ? 'الكمية المشحونة (كلغ):' : 'Tonnage Camion Frigo (kg) :'}
            </label>
            <input
              type="number"
              min={100}
              max={20000}
              step={100}
              value={arbQuantityKg}
              onChange={(e) => setArbQuantityKg(Math.max(100, Number(e.target.value)))}
              className="w-full rounded border border-[#f6f1e7]/15 bg-[#14110f] p-2 font-mono text-xs font-bold text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[primaryArbitrage, secondaryArbitrage].map((arb, idx) => (
            <div
              key={idx}
              className={`rounded-xl border p-4 space-y-2 ${
                arb.profitable
                  ? 'border-emerald-500/35 bg-emerald-950/15'
                  : 'border-rose-500/30 bg-rose-950/15'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-[#f6f1e7]">
                  {getPortDisplayName(arb.sourcePort, lang)} ({arb.sourcePriceMAD} MAD) ➔{' '}
                  {getPortDisplayName(arb.targetPort, lang)} ({arb.targetPriceMAD} MAD)
                </span>
                <span className="text-[11px] text-[#a69b8d]">{arb.distanceKm} km</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
                <div className="rounded bg-[#0b0908] p-2 border border-white/5">
                  <span className="text-[10px] text-[#a69b8d] block">
                    {lang === 'ar' ? 'الفارق الخام:' : 'Écart Brut :'}
                  </span>
                  <span className="font-bold text-amber-300">
                    {arb.grossSpreadMADPerKg > 0 ? `+${arb.grossSpreadMADPerKg}` : arb.grossSpreadMADPerKg} MAD/kg
                  </span>
                </div>

                <div className="rounded bg-[#0b0908] p-2 border border-white/5">
                  <span className="text-[10px] text-[#a69b8d] block">
                    {lang === 'ar' ? 'تكلفة التبريد:' : 'Coût Frigo :'}
                  </span>
                  <span className="font-bold text-cyan-300">
                    -{arb.coldChainCostMADPerKg} MAD/kg
                  </span>
                </div>

                <div className="rounded bg-[#0b0908] p-2 border border-white/5">
                  <span className="text-[10px] text-[#a69b8d] block">
                    {lang === 'ar' ? 'الهامش الصافي:' : 'Marge Nette :'}
                  </span>
                  <span
                    className={`font-bold ${
                      arb.profitable ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {arb.totalNetMarginMAD.toLocaleString()} MAD ({arb.roiPercent}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All 22 ONP Halles au Poisson Live Table */}
      <div className="space-y-3">
        <h3 className="font-editorial text-lg font-bold text-[#f6f1e7]">
          {lang === 'ar'
            ? `جدول أسعار المزاد العلني عبر 22 مرسى تابع لـ ONP — ${activeFish.nameDarijaArabic}`
            : `Tableau Officiel des 22 Criées ONP — ${activeFish.nameFrench}`}
        </h3>

        <div className="overflow-x-auto rounded-xl border border-[#f6f1e7]/10 bg-[#0b0908]">
          <table className="w-full text-start font-mono text-xs">
            <thead className="border-b border-[#f6f1e7]/10 bg-[#14110f] text-[10px] uppercase text-[#a69b8d]">
              <tr>
                <th className="p-3 text-start">#</th>
                <th className="p-3 text-start">{lang === 'ar' ? 'الميناء (ONP)' : 'Port Criée'}</th>
                <th className="p-3 text-start">{lang === 'ar' ? 'متوسط الجملة' : 'Moyenne Gros'}</th>
                <th className="p-3 text-start">{lang === 'ar' ? 'أعلى مزايدة (Extra)' : 'Pic Extra T1'}</th>
                <th className="p-3 text-start">{lang === 'ar' ? 'متوسط 30ي (MA30)' : 'MA30 & Bandes'}</th>
                <th className="p-3 text-start">{lang === 'ar' ? 'الكمية المفرغة' : 'Volume/Jour'}</th>
                <th className="p-3 text-start">{lang === 'ar' ? 'تنبيه السعر' : 'Alerte Tendance'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f6f1e7]/5">
              {all22Quotes.map((q) => (
                <tr
                  key={q.port.id}
                  onClick={() => setSelectedPortId(q.port.id)}
                  className={`cursor-pointer transition hover:bg-[#14110f] ${
                    q.port.id === selectedPortId ? 'bg-[#d96b27]/15' : ''
                  }`}
                >
                  <td className="p-2.5 text-[#e68a45] font-bold">{q.port.code}</td>
                  <td className="p-2.5 font-sans font-bold text-[#f6f1e7]">
                    {getPortDisplayName(q.port, lang)}
                  </td>
                  <td className="p-2.5 font-bold text-emerald-400">
                    {q.averageWholesaleMAD} MAD/kg
                  </td>
                  <td className="p-2.5 text-amber-300">{q.peakBidExtraMAD} MAD/kg</td>
                  <td className="p-2.5 text-[#a69b8d]">
                    {q.ma30MAD} MAD ({q.lowerBandMAD}–{q.upperBandMAD})
                  </td>
                  <td className="p-2.5 text-cyan-300">{q.dailyLandingTons} t</td>
                  <td className="p-2.5">
                    {q.priceAlert === 'spike_above_band' ? (
                      <span className="inline-flex items-center gap-1 rounded bg-rose-500/20 px-2 py-0.5 text-[10px] text-rose-300">
                        <AlertTriangle className="h-3 w-3" />
                        {lang === 'ar' ? 'تجاوز النطاق ▲' : 'Hausse > Bande'}
                      </span>
                    ) : q.priceAlert === 'dip_below_band' ? (
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">
                        <CheckCircle2 className="h-3 w-3" />
                        {lang === 'ar' ? 'فرصة شراء ▼' : 'Opportunité Achat'}
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#786c60]">
                        {lang === 'ar' ? 'ضمن النطاق المعتاد' : 'Normal (±1.5σ)'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

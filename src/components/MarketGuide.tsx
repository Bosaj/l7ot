import React, { useState } from 'react'
import {
  Compass,
  CheckCircle2,
  XCircle,
  Eye,
  Activity,
  Sparkles,
  ShieldCheck,
  Wind,
  MapPin,
  Calendar,
  Clock,
  Anchor,
  Check,
} from 'lucide-react'
import { FRESHNESS_CRITERIA, MOROCCAN_PORTS } from '../data/freshness'
import { MOROCCAN_FISH } from '../data/fish'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'
import { PriceBadge } from './PriceBadge'
import { LiveMarineConditionsWidget } from './LiveMarineConditionsWidget'
import type { MoroccanPortRegion } from '../lib/moroccanRegions'
import { sounds } from '../lib/soundEffects'

interface MarketGuideProps {
  lang: SupportedLanguage
  userRegion?: MoroccanPortRegion
  onSelectRegion?: (regionId: string) => void
}

export const MarketGuide: React.FC<MarketGuideProps> = ({
  lang,
  userRegion,
  onSelectRegion,
}) => {
  const t = STRINGS[lang]
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)

  // Interactive 5-Sense Freshness Diagnostic State
  const [freshnessChecks, setFreshnessChecks] = useState<Record<string, boolean>>({
    eyes: true,
    gills: true,
    'skin-scales': true,
    'flesh-resilience': true,
    smell: true,
  })

  const toggleCheck = (id: string) => {
    sounds.playBubble()
    setFreshnessChecks((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const freshScore = Object.values(freshnessChecks).filter(Boolean).length

  const getIcon = (name: string) => {
    switch (name) {
      case 'Eye':
        return <Eye className="h-5 w-5 text-[#e68a45]" />
      case 'Activity':
        return <Activity className="h-5 w-5 text-rose-400" />
      case 'Sparkles':
        return <Sparkles className="h-5 w-5 text-amber-400" />
      case 'ShieldCheck':
        return <ShieldCheck className="h-5 w-5 text-emerald-400" />
      case 'Wind':
        return <Wind className="h-5 w-5 text-cyan-400" />
      default:
        return <CheckCircle2 className="h-5 w-5 text-[#e68a45]" />
    }
  }

  const peakFishThisMonth = MOROCCAN_FISH.filter((f) =>
    f.seasonality.peakMonths.includes(selectedMonth)
  )

  const landingSchedules = [
    {
      time: '06:00 – 09:00',
      periodAr: 'الفجر والصباح الباكر',
      periodFr: 'Aube & Matinée',
      periodEn: 'Dawn & Early Morning',
      fleetAr: 'قوارب الصيد التقليدي الخشبية (الفلوكة)',
      fleetFr: 'Pêche Artisanale (Barques Floukas)',
      fleetEn: 'Artisanal Wooden Skiffs (Floukas)',
      methodAr: 'صيد الصنار والخيوط الطويلة (البالانكر)',
      methodFr: 'Ligne, Palangre & Casiers',
      methodEn: 'Hook-and-Line & Longlines',
      targetAr: 'الباجو الملكي، الدوديك، الدرعي، الميرو، والزريقة',
      targetFr: 'Pageot Royal, Bar Européen, Mérou, Daurade Royale',
      targetEn: 'Royal Seabream, European Seabass, Grouper, Pagel',
      badgeAr: 'طازج بنسبة 100% · صيد حي',
      badgeFr: 'Grade A+ · Pêche du Jour',
      badgeEn: 'Grade A+ · Live Catch',
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    },
    {
      time: '11:00 – 14:30',
      periodAr: 'منتصف النهار والظهيرة',
      periodFr: 'Midi & Début d’Après-Midi',
      periodEn: 'Midday & Early Afternoon',
      fleetAr: 'مراكب الصيد بالجر الساحلية (الكرارة / الشالوتي)',
      fleetFr: 'Chalutiers Côtiers de Fond',
      fleetEn: 'Coastal Bottom Trawlers',
      methodAr: 'شباك الجر القاعية على أعماق 30-150 متر',
      methodFr: 'Chalut de fond (30–150m)',
      methodEn: 'Demersal Trawl Netting',
      targetAr: 'الميرلا البيضاء، الصول، الكلمار، السيبيا، والكروفيت',
      targetFr: 'Merlu Blanc, Soles Royales, Calmar, Seiche, Crevettes',
      targetEn: 'Silver Hake, Dover Sole, Squid, Cuttlefish, Prawns',
      badgeAr: 'وفرة ممتازة · تنوع عالي',
      badgeFr: 'Excellente Diversité',
      badgeEn: 'High Diversity & Yield',
      color: 'border-[#d96b27]/40 bg-[#d96b27]/10 text-[#f2b47e]',
    },
    {
      time: '20:30 – 02:00',
      periodAr: 'الليل بعد الغروب',
      periodFr: 'Nuitée & Soirée',
      periodEn: 'Night & Late Evening',
      fleetAr: 'مراكب صيد الأسماك السطحية (السناكبي / بولينشيات)',
      fleetFr: 'Sardiniers & Senneurs Tournants',
      fleetEn: 'Purse Seiners (Sardine Fleets)',
      methodAr: 'الشباك الدائرية المحيطة السطحية',
      methodFr: 'Senne tournante de surface',
      methodEn: 'Pelagic Purse Seine Netting',
      targetAr: 'السردين الأطلسي، الإسقمري (كابايلا)، الشرل، والأنشوبة',
      targetFr: 'Sardine Atlantique, Maquereau, Chinchard, Anchois',
      targetEn: 'Atlantic Sardine, Mackerel, Horse Mackerel, Anchovy',
      badgeAr: 'قمة الأوميغا 3 والدهون الصحية',
      badgeFr: 'Richesse Oméga-3 Maximale',
      badgeEn: 'Peak Omega-3 Richness',
      color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
    },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-12">
      {/* Editorial Luxury Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-[#f6f1e7]/15 bg-[#14110f] p-6 sm:p-10 shadow-2xl">
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-[#d96b27]/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 border border-[#d96b27]/40 bg-[#d96b27]/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase text-[#f2b47e]">
            <Compass className="h-3.5 w-3.5 text-[#e68a45]" />
            <span>{t.marketTitle}</span>
          </div>
          <h2 className="font-editorial text-3xl font-bold tracking-tight text-[#f6f1e7] sm:text-5xl">
            {lang === 'ar'
              ? 'دليل المراسي، اختبار الطراوة وساعات الإنزال'
              : lang === 'fr'
              ? 'Guide des Criées, Fraîcheur & Horaires de Débarquement'
              : 'Port Auction Guide, Freshness Diagnosis & Fleet Landings'}
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-[#a69b8d]">
            {t.marketSubtitle}
          </p>
        </div>
      </div>

      {/* Live Port Marine Telemetry & Market Impact (Open-Meteo API) */}
      <section className="space-y-4">
        <LiveMarineConditionsWidget
          currentRegion={userRegion}
          lang={lang}
          onSelectRegion={onSelectRegion}
        />
      </section>

      {/* Fleet Landing Hours & Port Fish Market Clock */}
      <section className="space-y-5 rounded-2xl border border-[#f6f1e7]/12 bg-[#120f0d] p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f6f1e7]/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d96b27]/15 border border-[#d96b27]/30 text-[#e68a45]">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#f6f1e7] sm:text-2xl">
                {lang === 'ar'
                  ? 'ساعات إنزال الأسطول المغربي بالمراسي (الذهاب في الوقت المناسب)'
                  : lang === 'fr'
                  ? 'Horloge des Débarquements des Flottes Marocaines'
                  : 'Moroccan Fleet Landing Schedule (Optimal Port Visit Hours)'}
              </h3>
              <p className="text-xs text-[#a69b8d]">
                {lang === 'ar'
                  ? 'متى تصل القوارب والمراكب بأسماكها الطرية إلى أرصفة الميناء؟'
                  : lang === 'fr'
                  ? 'À quelle heure les barques et chalutiers débarquent-ils à quai ?'
                  : 'Exact arrival times for artisanal boats and coastal trawlers at docks.'}
              </p>
            </div>
          </div>
          <span className="font-mono text-xs text-[#e68a45] uppercase tracking-wider">
            {lang === 'ar' ? 'موانئ الأطلسي والمتوسط' : 'Atlantique & Méditerranée'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {landingSchedules.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-[#f6f1e7]/10 bg-[#0b0908] p-5 shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-[#f6f1e7] flex items-center gap-1.5">
                    <Anchor className="h-4 w-4 text-[#e68a45]" />
                    {item.time}
                  </span>
                  <span className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold border ${item.color}`}>
                    {lang === 'ar' ? item.badgeAr : lang === 'fr' ? item.badgeFr : item.badgeEn}
                  </span>
                </div>

                <div>
                  <h4 className="font-editorial text-base font-bold text-[#f2b47e]">
                    {lang === 'ar' ? item.fleetAr : lang === 'fr' ? item.fleetFr : item.fleetEn}
                  </h4>
                  <span className="font-mono text-[10px] text-[#786c60] block mt-0.5">
                    {lang === 'ar' ? item.methodAr : lang === 'fr' ? item.methodFr : item.methodEn}
                  </span>
                </div>

                <div className="rounded border border-[#f6f1e7]/8 bg-[#151210] p-3">
                  <span className="font-mono text-[10px] uppercase text-[#a69b8d] block mb-1">
                    {lang === 'ar' ? 'الأسماك الواردة:' : 'Espèces débarquées :'}
                  </span>
                  <p className="text-xs text-[#e8e0d3] font-medium leading-relaxed">
                    {lang === 'ar' ? item.targetAr : lang === 'fr' ? item.targetFr : item.targetEn}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f6f1e7]/8 text-[11px] text-[#a69b8d]">
                <span className="font-mono text-[10px] text-[#e68a45]">
                  {lang === 'ar' ? item.periodAr : lang === 'fr' ? item.periodFr : item.periodEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive 5-Sense Freshness Diagnostic Lab */}
      <section className="space-y-6 rounded-2xl border border-[#f6f1e7]/12 bg-[#120f0d] p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f6f1e7]/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#f6f1e7] sm:text-2xl">
                {lang === 'ar'
                  ? 'مختبر اختبار الطراوة التفاعلي (افحص حوتك بنقرة)'
                  : lang === 'fr'
                  ? 'Diagnostic Interactif des 5 Sens de Fraîcheur'
                  : 'Interactive 5-Sense Freshness Diagnostic Lab'}
              </h3>
              <p className="text-xs text-[#a69b8d]">
                {lang === 'ar'
                  ? 'انقر على العلامات التي تراها على السمكة للحصول على التقييم المباشر ودرجة الجودة'
                  : lang === 'fr'
                  ? 'Cochez les critères constatés pour obtenir la note de fraîcheur en direct.'
                  : 'Toggle the observed criteria to compute real-time freshness grade.'}
              </p>
            </div>
          </div>

          {/* Real-time score indicator */}
          <div className="flex items-center gap-3 rounded-xl border border-[#f6f1e7]/10 bg-[#0b0908] px-4 py-2">
            <div className="text-end font-mono">
              <span className="text-[10px] uppercase text-[#a69b8d] block">
                {lang === 'ar' ? 'مؤشر الطراوة:' : 'Indice Criée :'}
              </span>
              <span className={`text-sm font-bold ${freshScore >= 4 ? 'text-emerald-400' : freshScore === 3 ? 'text-amber-400' : 'text-rose-400'}`}>
                {freshScore} / 5 {freshScore >= 4 ? (lang === 'ar' ? 'ممتاز' : 'Extra') : freshScore === 3 ? (lang === 'ar' ? 'مقبول' : 'Correct') : (lang === 'ar' ? 'غير طازج' : 'Passé')}
              </span>
            </div>
            <div className="h-8 w-8 rounded-full border border-current flex items-center justify-center font-mono font-bold text-xs" style={{ color: freshScore >= 4 ? '#34d399' : freshScore === 3 ? '#fbbf24' : '#f87171' }}>
              {Math.round((freshScore / 5) * 100)}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FRESHNESS_CRITERIA.map((crit) => {
            const isChecked = freshnessChecks[crit.id] ?? false
            return (
              <div
                key={crit.id}
                onClick={() => toggleCheck(crit.id)}
                className={`cursor-pointer rounded-xl border p-5 transition-all select-none ${
                  isChecked
                    ? 'border-emerald-500/40 bg-emerald-950/10 shadow-lg shadow-emerald-950/20'
                    : 'border-rose-500/30 bg-rose-950/10 hover:border-rose-400/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0b0908] border border-[#f6f1e7]/10">
                      {getIcon(crit.iconName)}
                    </div>
                    <h4 className="font-editorial text-sm font-bold text-[#f6f1e7]">
                      {lang === 'ar' ? crit.titleAr : lang === 'fr' ? crit.titleFr : crit.titleEn}
                    </h4>
                  </div>
                  <button
                    type="button"
                    aria-label="Toggle criteria"
                    className={`flex h-6 w-6 items-center justify-center rounded-md border font-bold text-xs transition ${
                      isChecked
                        ? 'border-emerald-400 bg-emerald-500 text-[#0b0908]'
                        : 'border-[#786c60] text-[#786c60] hover:text-[#f6f1e7]'
                    }`}
                  >
                    {isChecked ? <Check className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </button>
                </div>

                {isChecked ? (
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/25 p-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 mb-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{t.freshLabel}</span>
                    </div>
                    <p className="text-xs text-emerald-200/90 leading-relaxed">
                      {lang === 'ar' ? crit.freshIndicatorAr : lang === 'fr' ? crit.freshIndicatorFr : crit.freshIndicatorEn}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-rose-500/20 bg-rose-950/25 p-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300 mb-1">
                      <XCircle className="h-3.5 w-3.5" />
                      <span>{t.staleLabel}</span>
                    </div>
                    <p className="text-xs text-rose-200/90 leading-relaxed">
                      {lang === 'ar' ? crit.staleIndicatorAr : lang === 'fr' ? crit.staleIndicatorFr : crit.staleIndicatorEn}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Seasonal Calendar Matrix */}
      <section className="space-y-5 rounded-2xl border border-[#f6f1e7]/12 bg-[#120f0d] p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f6f1e7]/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#f6f1e7] sm:text-2xl">{t.seasonHeader}</h3>
              <p className="text-xs text-[#a69b8d]">
                {lang === 'ar'
                  ? 'ما هو الحوت المتوفر بجودة عالية وأسعار مناسبة خلال هذا الشهر؟'
                  : lang === 'fr'
                  ? 'Quels poissons sont en pic de qualité et d’abondance ce mois-ci ?'
                  : 'Which fish are in peak abundance and best market pricing this month?'}
              </p>
            </div>
          </div>

          {/* Month Selector Pills */}
          <div className="flex flex-wrap items-center gap-1">
            {t.months.map((m, idx) => {
              const monthNum = idx + 1
              return (
                <button
                  key={monthNum}
                  type="button"
                  onClick={() => {
                    sounds.playTabClick()
                    setSelectedMonth(monthNum)
                  }}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    selectedMonth === monthNum
                      ? 'bg-[#d96b27] text-[#0b0908] font-bold shadow-md shadow-[#d96b27]/20 ring-1 ring-[#e68a45]'
                      : 'bg-[#0b0908] text-[#a69b8d] hover:text-[#f6f1e7] border border-[#f6f1e7]/8'
                  }`}
                >
                  {m}
                </button>
              )
            })}
          </div>
        </div>

        {/* Highlighted Fish for the chosen month */}
        <div>
          <span className="text-xs font-bold text-[#f2b47e] block mb-3 font-mono">
            {lang === 'ar'
              ? `⭐ أسماك في ذروة الجودة والوفرة في شهر (${t.months[selectedMonth - 1]}):`
              : lang === 'fr'
              ? `⭐ Espèces en pic de fraîcheur au mois de (${t.months[selectedMonth - 1]}) :`
              : `⭐ Species at peak seasonal abundance in (${t.months[selectedMonth - 1]}):`}
          </span>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {peakFishThisMonth.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-3 rounded-xl border border-[#f6f1e7]/8 bg-[#0b0908] p-3 transition hover:border-[#d96b27]/40"
              >
                <img
                  src={f.imageUrl}
                  alt={f.nameFrench}
                  className="h-10 w-10 rounded-lg object-cover border border-[#f6f1e7]/10"
                />
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-[#f6f1e7] truncate">
                    {lang === 'ar' ? f.nameDarijaArabic : lang === 'fr' ? f.nameFrench : f.nameEnglish}
                  </h5>
                  <span className="text-[10px] text-[#e68a45] font-mono block truncate">{f.nameDarijaLatin}</span>
                  <div className="mt-0.5">
                    <PriceBadge
                      amount={f.pricing.currentSpotMAD}
                      unit="kg"
                      lang={lang}
                      amountClassName="text-[10px] font-bold text-emerald-400"
                      unitClassName="text-[9px] text-emerald-400/80"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Moroccan Landing Ports Map & Directory */}
      <section className="space-y-5 rounded-2xl border border-[#f6f1e7]/12 bg-[#120f0d] p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 border-b border-[#f6f1e7]/10 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-editorial text-xl font-bold text-[#f6f1e7] sm:text-2xl">{t.portsHeader}</h3>
            <p className="text-xs text-[#a69b8d]">
              {lang === 'ar'
                ? 'خريطة موانئ المملكة من البحر الأبيض المتوسط إلى المحيط الأطلسي والداخلة'
                : lang === 'fr'
                ? 'Cartographie des ports royaux de la Méditerranée à l’Atlantique et Dakhla'
                : 'Mapping of Moroccan landing ports from the Mediterranean to the Atlantic & Dakhla'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOROCCAN_PORTS.map((port) => (
            <div
              key={port.id}
              className="flex flex-col justify-between rounded-xl border border-[#f6f1e7]/10 bg-[#0b0908] p-5 shadow-lg transition-transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-editorial text-base font-bold text-[#f6f1e7]">
                    {lang === 'ar' ? port.nameAr : lang === 'fr' ? port.nameFr : port.nameEn}
                  </h4>
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold border ${
                      port.coast === 'atlantic'
                        ? 'border-blue-500/30 bg-blue-500/10 text-blue-300'
                        : 'border-teal-500/30 bg-teal-500/10 text-teal-300'
                    }`}
                  >
                    {port.coast === 'atlantic'
                      ? (lang === 'ar' ? 'أطلسي' : 'Atlantique')
                      : (lang === 'ar' ? 'متوسطي' : 'Méditerranée')}
                  </span>
                </div>

                <p className="text-xs text-[#a69b8d] leading-relaxed mb-4">
                  {lang === 'ar'
                    ? port.descriptionAr
                    : lang === 'fr'
                    ? port.descriptionFr
                    : port.descriptionEn}
                </p>
              </div>

              <div className="border-t border-[#f6f1e7]/8 pt-3">
                <span className="text-[10px] font-bold text-[#e68a45] uppercase tracking-wider block mb-1.5 font-mono">
                  {lang === 'ar' ? 'أشهر مصايد هذا الميناء:' : lang === 'fr' ? 'Principales prises :' : 'Top Catches:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {port.topFish.map((f, i) => (
                    <span
                      key={i}
                      className="rounded bg-[#14110f] px-2 py-0.5 text-[11px] font-medium text-[#d4cbbd] border border-[#f6f1e7]/8"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

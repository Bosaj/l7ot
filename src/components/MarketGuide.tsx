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
} from 'lucide-react'
import { FRESHNESS_CRITERIA, MOROCCAN_PORTS } from '../data/freshness'
import { MOROCCAN_FISH } from '../data/fish'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'

interface MarketGuideProps {
  lang: SupportedLanguage
}

export const MarketGuide: React.FC<MarketGuideProps> = ({ lang }) => {
  const t = STRINGS[lang]
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)

  const getIcon = (name: string) => {
    switch (name) {
      case 'Eye':
        return <Eye className="h-5 w-5 text-cyan-400" />
      case 'Activity':
        return <Activity className="h-5 w-5 text-rose-400" />
      case 'Sparkles':
        return <Sparkles className="h-5 w-5 text-amber-400" />
      case 'ShieldCheck':
        return <ShieldCheck className="h-5 w-5 text-emerald-400" />
      case 'Wind':
        return <Wind className="h-5 w-5 text-blue-400" />
      default:
        return <CheckCircle2 className="h-5 w-5 text-cyan-400" />
    }
  }

  const peakFishThisMonth = MOROCCAN_FISH.filter((f) =>
    f.seasonality.peakMonths.includes(selectedMonth)
  )

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-cyan-950 to-blue-950 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
            <Compass className="h-3.5 w-3.5" />
            <span>{t.marketTitle}</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            دليل الشراء واختبار الطراوة في المارشي
          </h2>
          <p className="max-w-2xl text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.marketSubtitle}
          </p>
        </div>
      </div>

      {/* 1. The 5-Point Sensory Test */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">
              {t.testFreshnessHeader}
            </h3>
            <p className="text-xs text-slate-400">
              قواعد الخبراء والصيادين المغاربة لتمييز الحوت الطري بنظرة واحدة ولمسة إصبع
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FRESHNESS_CRITERIA.map((crit) => (
            <div
              key={crit.id}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md transition-all hover:border-cyan-500/40"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 border border-white/5">
                    {getIcon(crit.iconName)}
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {lang === 'ar' ? crit.titleAr : lang === 'fr' ? crit.titleFr : crit.titleEn}
                  </h4>
                </div>

                {/* Fresh Indicator Box */}
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-3 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{t.freshLabel}</span>
                  </div>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">
                    {lang === 'ar'
                      ? crit.freshIndicatorAr
                      : lang === 'fr'
                      ? crit.freshIndicatorFr
                      : crit.freshIndicatorEn}
                  </p>
                </div>

                {/* Stale Indicator Box */}
                <div className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-1">
                    <XCircle className="h-3.5 w-3.5" />
                    <span>{t.staleLabel}</span>
                  </div>
                  <p className="text-xs text-rose-200/80 leading-relaxed">
                    {lang === 'ar'
                      ? crit.staleIndicatorAr
                      : lang === 'fr'
                      ? crit.staleIndicatorFr
                      : crit.staleIndicatorEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Seasonal Calendar Matrix */}
      <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">{t.seasonHeader}</h3>
              <p className="text-xs text-slate-400">
                ما هو الحوت المتوفر بجودة عالية وأسعار مناسبة خلال هذا الشهر؟
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
                  onClick={() => setSelectedMonth(monthNum)}
                  className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-all ${
                    selectedMonth === monthNum
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                      : 'bg-slate-950/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              )
            })}
          </div>
        </div>

        {/* Highlighted Fish for the chosen month */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <span className="text-xs font-bold text-amber-300 block mb-3">
            ⭐ أسماك في ذروة الجودة والوفرة في شهر ({t.months[selectedMonth - 1]}):
          </span>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {peakFishThisMonth.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-slate-950/60 p-3"
              >
                <img
                  src={f.imageUrl}
                  alt={f.nameFrench}
                  className="h-10 w-10 rounded-xl object-cover"
                />
                <div>
                  <h5 className="text-xs font-bold text-white">
                    {f.nameDarijaArabic}
                  </h5>
                  <span className="text-[11px] text-cyan-400">{f.nameDarijaLatin}</span>
                  <span className="text-[10px] text-emerald-400 block font-semibold">
                    {f.pricing.currentSpotMAD} MAD / kg
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Moroccan Landing Ports Map & Directory */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">{t.portsHeader}</h3>
            <p className="text-xs text-slate-400">
              خريطة موانئ المملكة من البحر الأبيض المتوسط إلى المحيط الأطلسي والداخلة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOROCCAN_PORTS.map((port) => (
            <div
              key={port.id}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md transition-all hover:border-cyan-500/40"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-bold text-white">
                    {lang === 'ar' ? port.nameAr : lang === 'fr' ? port.nameFr : port.nameEn}
                  </h4>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      port.coast === 'atlantic'
                        ? 'border border-blue-400/30 bg-blue-500/10 text-blue-300'
                        : 'border border-teal-400/30 bg-teal-500/10 text-teal-300'
                    }`}
                  >
                    {port.coast === 'atlantic' ? 'أطلسي' : 'متوسطي'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {lang === 'ar'
                    ? port.descriptionAr
                    : lang === 'fr'
                    ? port.descriptionFr
                    : port.descriptionEn}
                </p>
              </div>

              <div className="border-t border-white/5 pt-3">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-1.5">
                  أشهر مصايد هذا الميناء:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {port.topFish.map((f, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-slate-950 px-2 py-0.5 text-[11px] font-medium text-slate-300 border border-white/5"
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

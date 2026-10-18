import React, { useState } from 'react'
import {
  X,
  Volume2,
  ChefHat,
  MapPin,
  Calendar,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Globe,
  Coins,
  Heart,
} from 'lucide-react'
import type { Fish, Recipe } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'
import { speakDarija } from '../lib/speech'

interface FishModalProps {
  fish: Fish
  allRecipes: Recipe[]
  lang: SupportedLanguage
  onClose: () => void
  onSelectRecipe: (recipe: Recipe) => void
  onCookWithFish: (fish: Fish) => void
}

export const FishModal: React.FC<FishModalProps> = ({
  fish,
  allRecipes,
  lang,
  onClose,
  onSelectRecipe,
  onCookWithFish,
}) => {
  const t = STRINGS[lang]
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [portionGrams, setPortionGrams] = useState<number>(100)

  const handleAudio = () => {
    setIsPlayingAudio(true)
    speakDarija(fish.nameDarijaArabic, fish.audioPhonetic)
    setTimeout(() => setIsPlayingAudio(false), 1600)
  }

  const linkedRecipes = allRecipes.filter(
    (r) => fish.recommendedRecipeIds.includes(r.id) || r.fishIds.includes(fish.id)
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
        {/* Header Hero Image */}
        <div className="relative h-60 w-full shrink-0 overflow-hidden bg-slate-950 sm:h-72">
          {!imgError ? (
            <img
              src={fish.imageUrl}
              alt={fish.nameFrench}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-cyan-950 p-6 text-center">
              <Sparkles className="h-10 w-10 text-cyan-400 mb-2" />
              <h2 className="text-2xl font-black text-white">{fish.nameDarijaArabic}</h2>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white backdrop-blur-md transition-colors hover:bg-rose-500"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Floating Title and Audio */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-black tracking-tight text-white drop-shadow-md sm:text-4xl">
                  {fish.nameDarijaArabic}
                </h2>
                <button
                  type="button"
                  onClick={handleAudio}
                  title={t.listenPronunciation}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/20 text-cyan-300 backdrop-blur-md transition-all hover:bg-cyan-500 hover:text-white ${
                    isPlayingAudio ? 'scale-110 ring-4 ring-cyan-400/50' : ''
                  }`}
                >
                  <Volume2 className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm font-semibold text-cyan-300">
                {fish.nameDarijaLatin} · {fish.nameFrench} ({fish.nameEnglish})
              </p>
              <p className="text-xs italic text-slate-400">{fish.scientificName}</p>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-right backdrop-blur-md">
              <span className="block text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">
                السعر التقريبي
              </span>
              <span className="text-lg font-black text-emerald-400">
                {fish.priceRangeMAD.min} - {fish.priceRangeMAD.max} MAD
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Description */}
          <p className="text-sm leading-relaxed text-slate-200 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
            {fish.description[lang]}
          </p>

          {/* Grid Information Pills */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Landing Ports */}
            <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-cyan-400 mb-2.5">
                <MapPin className="h-4 w-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {t.portsTitle}
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {fish.mainPorts.map((port) => (
                  <span
                    key={port}
                    className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-300"
                  >
                    {port}
                  </span>
                ))}
              </div>
            </div>

            {/* Seasonality */}
            <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-amber-400 mb-2.5">
                <Calendar className="h-4 w-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {t.seasonPeak}
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {fish.seasonality.description[lang]}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {fish.seasonality.peakMonths.map((m) => (
                  <span
                    key={m}
                    className="rounded-md bg-amber-400/20 px-2 py-0.5 text-[11px] font-semibold text-amber-300"
                  >
                    {t.months[m - 1]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Names Across Morocco */}
          {fish.regionalNames && (
            <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/70 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Globe className="h-4 w-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    {lang === 'fr'
                      ? 'Appellations régionales au Maroc'
                      : lang === 'en'
                      ? 'Regional Names Across Morocco'
                      : 'الأسماء المحلية حسب مناطق وسواحل المغرب'}
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  تعدد اللهجات البحرية
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 text-xs">
                <div className="rounded-xl border border-white/5 bg-slate-900/60 p-2.5">
                  <span className="block text-[10px] text-cyan-300 font-bold mb-1">
                    الشمال والبوغاز (طنجة، تطوان، الناظور)
                  </span>
                  <p className="font-semibold text-white">{fish.regionalNames.northChamal}</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-slate-900/60 p-2.5">
                  <span className="block text-[10px] text-blue-300 font-bold mb-1">
                    الوسط الأطلسي (البيضاء، الرباط، أسفي)
                  </span>
                  <p className="font-semibold text-white">{fish.regionalNames.centreAtlantic}</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-slate-900/60 p-2.5">
                  <span className="block text-[10px] text-amber-300 font-bold mb-1">
                    سوس والصحراء (أكادير، طانطان، الداخلة)
                  </span>
                  <p className="font-semibold text-white">{fish.regionalNames.southSoussSahara}</p>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Barometer: Moroccan Ports vs Retail vs Global Export */}
          {fish.pricingDetails && (
            <div className="rounded-2xl border border-emerald-500/20 bg-slate-950/70 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Coins className="h-4 w-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    {lang === 'fr'
                      ? 'Baromètre des prix : Maroc vs Marché Mondial'
                      : lang === 'en'
                      ? 'Price Barometer: Moroccan Markets vs Global Export'
                      : 'مؤشر الأسعار: موانئ المغرب مقابل السوق العالمي للتصدير'}
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  ONP & Halle aux poissons
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 text-xs">
                <div className="rounded-xl border border-white/5 bg-slate-900/60 p-3">
                  <span className="block text-[10px] text-slate-400 mb-1">
                    سوق الجملة بالميناء (Criée / ONP)
                  </span>
                  <div className="text-base font-extrabold text-emerald-400">
                    {fish.pricingDetails.wholesalePortMAD.min} - {fish.pricingDetails.wholesalePortMAD.max}{' '}
                    <span className="text-xs text-slate-300">درهم/{fish.pricingDetails.wholesalePortMAD.unit}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">سعر المزاد بالموانئ</span>
                </div>

                <div className="rounded-xl border border-white/5 bg-slate-900/60 p-3">
                  <span className="block text-[10px] text-slate-400 mb-1">
                    سوق المارشي والتقسيط بالمغرب
                  </span>
                  <div className="text-base font-extrabold text-cyan-400">
                    {fish.pricingDetails.retailMarketMAD.min} - {fish.pricingDetails.retailMarketMAD.max}{' '}
                    <span className="text-xs text-slate-300">درهم/{fish.pricingDetails.retailMarketMAD.unit}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">المستهلك بالمدن</span>
                </div>

                <div className="rounded-xl border border-white/5 bg-slate-900/60 p-3">
                  <span className="block text-[10px] text-slate-400 mb-1">
                    السوق العالمي والتصدير (أوروبا / آسيا)
                  </span>
                  <div className="text-base font-extrabold text-amber-400">
                    {fish.pricingDetails.globalExportEUR.min} - {fish.pricingDetails.globalExportEUR.max}{' '}
                    <span className="text-xs text-slate-300">€/{fish.pricingDetails.globalExportEUR.unit}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1 truncate">
                    {fish.pricingDetails.globalExportEUR.referenceMarket}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Health & Elements Calculator (100g vs 1kg Live Calculation) */}
          {fish.nutritionPer100g && (
            <div className="rounded-2xl border border-rose-500/20 bg-slate-950/70 p-4 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div className="flex items-center gap-2 text-rose-400">
                  <Heart className="h-4 w-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    {lang === 'fr'
                      ? 'Valeur Nutritionnelle & Éléments Santé (Calcul en Direct)'
                      : lang === 'en'
                      ? 'Nutritional Value & Health Elements (Live Calculation)'
                      : 'القيمة الغذائية والعناصر الحيوية (حاسبة حية لـ 100 غرام أو 1 كلغ)'}
                  </h4>
                </div>

                {/* Portion Selector Buttons */}
                <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-slate-900 p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setPortionGrams(100)}
                    className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                      portionGrams === 100
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    100 غرام
                  </button>
                  <button
                    type="button"
                    onClick={() => setPortionGrams(250)}
                    className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                      portionGrams === 250
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    250 غرام
                  </button>
                  <button
                    type="button"
                    onClick={() => setPortionGrams(500)}
                    className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                      portionGrams === 500
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    500 غرام
                  </button>
                  <button
                    type="button"
                    onClick={() => setPortionGrams(1000)}
                    className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                      portionGrams === 1000
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    1 كيلوغرام (1kg)
                  </button>
                </div>
              </div>

              {/* Dynamic Macro & Micronutrient Grid */}
              {(() => {
                const factor = portionGrams / 100
                const n = fish.nutritionPer100g!
                const calories = Math.round(n.caloriesKcal * factor)
                const protein = (n.proteinGrams * factor).toFixed(1)
                const proteinPct = Math.min(100, Math.round((parseFloat(protein) / 50) * 100))
                const lipids = (n.lipidsGrams * factor).toFixed(1)
                const omega3 = Math.round(n.omega3Mg * factor)
                const omega3Pct = Math.min(100, Math.round((omega3 / 1000) * 100))
                const vitD = (n.vitaminD_mcg * factor).toFixed(1)
                const vitDPct = Math.min(100, Math.round((parseFloat(vitD) / 15) * 100))
                const vitB12 = (n.vitaminB12_mcg * factor).toFixed(1)
                const vitB12Pct = Math.min(100, Math.round((parseFloat(vitB12) / 2.4) * 100))
                const iodine = Math.round(n.iodine_mcg * factor)
                const iodinePct = Math.min(100, Math.round((iodine / 150) * 100))
                const selenium = (n.selenium_mcg * factor).toFixed(1)
                const seleniumPct = Math.min(100, Math.round((parseFloat(selenium) / 55) * 100))
                const iron = (n.iron_mg * factor).toFixed(1)
                const ironPct = Math.min(100, Math.round((parseFloat(iron) / 14) * 100))
                const calcium = Math.round(n.calcium_mg * factor)
                const calciumPct = Math.min(100, Math.round((calcium / 1000) * 100))
                const phosphorus = Math.round(n.phosphorus_mg * factor)
                const zinc = (n.zinc_mg * factor).toFixed(1)

                return (
                  <div className="space-y-4">
                    {/* Key Indicators Banner */}
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                      <div className="rounded-xl border border-white/5 bg-slate-900/60 p-2 text-center">
                        <span className="block text-[10px] text-slate-400">الطاقة السعرية</span>
                        <span className="text-base font-black text-rose-400">{calories}</span>
                        <span className="text-[10px] text-slate-400 block">kcal</span>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-slate-900/60 p-2 text-center">
                        <span className="block text-[10px] text-slate-400">البروتين الصافي</span>
                        <span className="text-base font-black text-emerald-400">{protein}g</span>
                        <span className="text-[10px] text-emerald-300 block">{proteinPct}% AJR</span>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-slate-900/60 p-2 text-center">
                        <span className="block text-[10px] text-slate-400">الدهون الصحية</span>
                        <span className="text-base font-black text-blue-400">{lipids}g</span>
                        <span className="text-[10px] text-blue-300 block">دهون نقية</span>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-slate-900/60 p-2 text-center">
                        <span className="block text-[10px] text-slate-400">أوميغا 3</span>
                        <span className="text-base font-black text-cyan-400">{omega3}mg</span>
                        <span className="text-[10px] text-cyan-300 block">{omega3Pct}% AJR</span>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-slate-900/60 p-2 text-center">
                        <span className="block text-[10px] text-slate-400">فيتامين B12</span>
                        <span className="text-base font-black text-amber-400">{vitB12}µg</span>
                        <span className="text-[10px] text-amber-300 block">{vitB12Pct}% AJR</span>
                      </div>
                    </div>

                    {/* Detailed Minerals & Vitamins Progress Bars */}
                    <div className="space-y-2.5 pt-1">
                      <span className="text-xs font-bold text-slate-300 block">
                        نسبة تغطية الاحتياج اليومي للإنسان البالغ (AJR / Daily Value) لـ {portionGrams} غرام:
                      </span>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
                        {/* Protein */}
                        <div className="rounded-xl bg-slate-900/50 p-2 border border-white/5">
                          <div className="flex justify-between mb-1">
                            <span className="text-slate-300">البروتين (لبناء العضلات والأنسجة)</span>
                            <span className="font-bold text-emerald-400">{protein}g ({proteinPct}%)</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, proteinPct)}%` }} />
                          </div>
                        </div>

                        {/* Omega-3 */}
                        <div className="rounded-xl bg-slate-900/50 p-2 border border-white/5">
                          <div className="flex justify-between mb-1">
                            <span className="text-slate-300">أوميغا 3 EPA / DHA (للقلب والدماغ)</span>
                            <span className="font-bold text-cyan-400">{omega3}mg ({omega3Pct}%)</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${Math.min(100, omega3Pct)}%` }} />
                          </div>
                        </div>

                        {/* Vitamin D */}
                        <div className="rounded-xl bg-slate-900/50 p-2 border border-white/5">
                          <div className="flex justify-between mb-1">
                            <span className="text-slate-300">فيتامين D3 (للمناعة وتثبيت الكالسيوم)</span>
                            <span className="font-bold text-amber-400">{vitD}µg ({vitDPct}%)</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, vitDPct)}%` }} />
                          </div>
                        </div>

                        {/* Selenium */}
                        <div className="rounded-xl bg-slate-900/50 p-2 border border-white/5">
                          <div className="flex justify-between mb-1">
                            <span className="text-slate-300">السيلينيوم (مضاد أكسدة طبيعي)</span>
                            <span className="font-bold text-purple-400">{selenium}µg ({seleniumPct}%)</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.min(100, seleniumPct)}%` }} />
                          </div>
                        </div>

                        {/* Iodine */}
                        <div className="rounded-xl bg-slate-900/50 p-2 border border-white/5">
                          <div className="flex justify-between mb-1">
                            <span className="text-slate-300">اليود البحري (للغدة الدرقية والأيض)</span>
                            <span className="font-bold text-blue-400">{iodine}µg ({iodinePct}%)</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, iodinePct)}%` }} />
                          </div>
                        </div>

                        {/* Calcium & Phosphorus */}
                        <div className="rounded-xl bg-slate-900/50 p-2 border border-white/5">
                          <div className="flex justify-between mb-1">
                            <span className="text-slate-300">الكالسيوم والفسفور (للهيكل العظمي)</span>
                            <span className="font-bold text-amber-300">{calcium}mg ({calciumPct}%) · {phosphorus}mg P</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${Math.min(100, calciumPct)}%` }} />
                          </div>
                        </div>

                        {/* Iron & Zinc */}
                        <div className="rounded-xl bg-slate-900/50 p-2 border border-white/5">
                          <div className="flex justify-between mb-1">
                            <span className="text-slate-300">الحديد والزنك العضوي (لتجديد الدم والمناعة)</span>
                            <span className="font-bold text-rose-400">{iron}mg حديد ({ironPct}%) · {zinc}mg زنك</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 rounded-full" style={{ width: `${Math.min(100, ironPct)}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Health Benefits Highlights List */}
                    <div className="rounded-xl bg-slate-900/70 p-3 border border-white/5">
                      <span className="text-xs font-bold text-emerald-400 block mb-2">
                        🌟 أهم الفوائد الطبية والصحية المثبتة علمياً:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {n.healthHighlights[lang].map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-400">✓</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}

          {/* Freshness Checklist */}
          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              <CheckCircle2 className="h-4 w-4" />
              {t.freshnessKeys}
            </h4>
            <ul className="space-y-2">
              {fish.freshnessKeys[lang].map((key, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>{key}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Compatible Recipes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-200">
                <BookOpen className="h-4 w-4 text-cyan-400" />
                {t.compatibleRecipes}
              </h4>
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onCookWithFish(fish)
                }}
                className="flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/20 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500 hover:text-white transition-all shadow-sm"
              >
                <ChefHat className="h-3.5 w-3.5" />
                <span>{t.chefTitle}</span>
              </button>
            </div>

            {linkedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {linkedRecipes.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => {
                      onClose()
                      onSelectRecipe(r)
                    }}
                    className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/50 p-3 hover:border-cyan-500/50 transition-all hover:bg-slate-800"
                  >
                    <img
                      src={r.imageUrl}
                      alt={r.titleFrench}
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {r.titleDarijaArabic}
                      </h5>
                      <span className="text-[11px] text-slate-400 line-clamp-1">
                        {r.titleFrench}
                      </span>
                      <span className="mt-1 inline-block text-[10px] text-cyan-400 font-medium">
                        ⏱️ {r.prepTimeMinutes + r.cookTimeMinutes} دقيقة
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/10 p-4 text-center text-xs text-slate-400">
                يمكن تحضير هذا الحوت بطرق الشواء أو الفرن أو الطاجين المغربي بالشرمولة.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

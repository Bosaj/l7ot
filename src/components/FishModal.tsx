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
  Scissors,
  Zap,
  TrendingUp,
} from 'lucide-react'
import type { Fish, Recipe } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'
import { speakDarija } from '../lib/speech'
import { NutritionCalculator } from './NutritionCalculator'

interface FishModalProps {
  fish: Fish
  allRecipes: Recipe[]
  lang: SupportedLanguage
  initialTab?: 'overview' | 'nutrition' | 'cleaning' | 'market'
  onClose: () => void
  onSelectRecipe: (recipe: Recipe) => void
  onCookWithFish: (fish: Fish) => void
  onOpenCleaningTutorial?: (fish: Fish) => void
}

export const FishModal: React.FC<FishModalProps> = ({
  fish,
  allRecipes,
  lang,
  initialTab = 'overview',
  onClose,
  onSelectRecipe,
  onCookWithFish,
  onOpenCleaningTutorial,
}) => {
  const t = STRINGS[lang]
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [modalTab, setModalTab] = useState<'overview' | 'nutrition' | 'cleaning' | 'market'>(initialTab)

  const handleAudio = () => {
    setIsPlayingAudio(true)
    speakDarija(fish.nameDarijaArabic, fish.audioPhonetic, fish.id)
    setTimeout(() => setIsPlayingAudio(false), 3200)
  }

  const linkedRecipes = allRecipes.filter(
    (r) => fish.recommendedRecipeIds?.includes(r.id) || r.fishIds?.includes(fish.id)
  )

  const p = fish.pricing

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
        {/* Header Hero Image */}
        <div className="relative h-64 w-full shrink-0 overflow-hidden bg-slate-950 sm:h-72">
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

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/35 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white backdrop-blur-md transition-colors hover:bg-rose-500"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Floating Title and Audio */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
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

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/15 px-4 py-2 text-right backdrop-blur-md">
              <span className="block text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">
                السعر الفوري بالسوق
              </span>
              <span className="text-xl font-black text-emerald-400">
                {p.currentSpotMAD} MAD / kg
              </span>
              <span className="block text-[10px] text-slate-300">
                العالمي: ${p.globalExportUSD.avg}/kg
              </span>
            </div>
          </div>
        </div>

        {/* Modal Section Tabs */}
        <div className="flex items-center gap-1.5 border-b border-white/5 bg-slate-950/70 p-2 text-xs font-semibold overflow-x-auto">
          <button
            type="button"
            onClick={() => setModalTab('overview')}
            className={`rounded-xl px-3.5 py-2 transition-all ${
              modalTab === 'overview'
                ? 'bg-cyan-500 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            نظرة عامة والأسماء الجهوية
          </button>
          <button
            type="button"
            onClick={() => setModalTab('nutrition')}
            className={`rounded-xl px-3.5 py-2 transition-all flex items-center gap-1.5 ${
              modalTab === 'nutrition'
                ? 'bg-cyan-500 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            حاسبة القيمة الغذائية (100غ / 1كلغ)
          </button>
          <button
            type="button"
            onClick={() => setModalTab('market')}
            className={`rounded-xl px-3.5 py-2 transition-all flex items-center gap-1.5 ${
              modalTab === 'market'
                ? 'bg-cyan-500 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            تتبع أسعار السوق والاتجاه
          </button>
          {onOpenCleaningTutorial && (
            <button
              type="button"
              onClick={() => onOpenCleaningTutorial(fish)}
              className="rounded-xl px-3.5 py-2 text-amber-300 hover:text-white flex items-center gap-1.5 border border-amber-500/20 bg-amber-500/10 mr-auto"
            >
              <Scissors className="h-3.5 w-3.5" />
              طريقة تنقية الحوت (الكسال)
            </button>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {modalTab === 'overview' && (
            <>
              {/* Description */}
              <p className="text-sm leading-relaxed text-slate-200 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                {fish.description[lang]}
              </p>

              {/* Regional Names Across Morocco */}
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  أسماء هذا الحوت حسب جهات وموانئ المغرب:
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-3.5">
                    <span className="text-[11px] font-bold text-cyan-300 block mb-1">
                      الشمال والمتوسط (طنجة، تطوان، الحسيمة، الناظور):
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {fish.regionalNames.chamal.map((name, i) => (
                        <li key={i}>• {name}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-blue-500/20 bg-blue-950/20 p-3.5">
                    <span className="text-[11px] font-bold text-blue-300 block mb-1">
                      الوسط والأطلسي (الدار البيضاء، الرباط، آسفي):
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {fish.regionalNames.centre.map((name, i) => (
                        <li key={i}>• {name}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-3.5">
                    <span className="text-[11px] font-bold text-emerald-300 block mb-1">
                      الجنوب وسوس والصحراء (أكادير، الداخلة، طانطان):
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {fish.regionalNames.sud.map((name, i) => (
                        <li key={i}>• {name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Landing Ports & Seasonality */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            </>
          )}

          {modalTab === 'nutrition' && (
            <NutritionCalculator fish={fish} lang={lang} />
          )}

          {modalTab === 'market' && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                      تتبع بورصة أسعار {fish.nameDarijaArabic} في المغرب والعالم
                    </h4>
                    <p className="text-xs text-slate-400">
                      مقارنة الأسعار الفورية، السجلات السابقة للأشهر الستة وتوقعات الفصل القادم
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold border ${
                      p.trend === 'up'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : p.trend === 'down'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300 border-white/10'
                    }`}
                  >
                    اتجاه السوق: {p.trend === 'up' ? '↗ صعود في الأسعار' : p.trend === 'down' ? '↘ تراجع وتخفيض' : '➔ استقرار نسبي'}
                  </span>
                </div>

                {/* 6 Months Historical Progression */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 block">
                    تطور السعر خلال الأشهر الستة الماضية (MAD / kg):
                  </span>
                  <div className="grid grid-cols-6 gap-2 text-center text-xs">
                    {p.past6MonthsMAD.map((val, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-white/5 bg-slate-900/80 p-2.5"
                      >
                        <span className="text-[10px] text-slate-400 block mb-1">
                          شهر {idx + 1}
                        </span>
                        <span className="font-bold text-cyan-300">{val} MAD</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Spot vs Global Export */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4">
                    <span className="text-xs text-emerald-300 font-bold block mb-1">
                      السعر الحالي في الموانئ المغربية (Spot):
                    </span>
                    <span className="text-2xl font-black text-emerald-400">
                      {p.currentSpotMAD} MAD / kg
                    </span>
                    <span className="text-xs text-slate-400 block mt-1">
                      توقعات الفصل القادم: {p.forecastFutureMAD} MAD / kg
                    </span>
                  </div>

                  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4">
                    <span className="text-xs text-cyan-300 font-bold block mb-1">
                      السعر العالمي المرجعي (Global Export):
                    </span>
                    <span className="text-2xl font-black text-cyan-400">
                      ${p.globalExportUSD.avg} / kg
                    </span>
                    <span className="text-xs text-slate-400 block mt-1">
                      البورصة المرجعية: {p.globalExportUSD.hub}
                    </span>
                  </div>
                </div>

                {/* Market Drivers Explanation */}
                <div className="rounded-2xl border border-white/5 bg-slate-950 p-4">
                  <span className="text-xs font-bold text-amber-300 block uppercase mb-1">
                    عوامل تحرك السوق والطلب:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {p.driversAr}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

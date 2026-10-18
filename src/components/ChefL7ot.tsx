import React, { useState, useMemo } from 'react'
import {
  ChefHat,
  Flame,
  Clock,
  Sparkles,
  Check,
  Copy,
  Scale,
  Thermometer,
} from 'lucide-react'
import type { Fish, CookingMethod } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'
import { calculateCharmoula } from '../lib/charmoula'

interface ChefL7otProps {
  allFish: Fish[]
  selectedFishId?: string
  lang: SupportedLanguage
}

export const ChefL7ot: React.FC<ChefL7otProps> = ({
  allFish,
  selectedFishId,
  lang,
}) => {
  const t = STRINGS[lang]

  const [fishId, setFishId] = useState<string>(
    selectedFishId || allFish[0]?.id || 'sardine'
  )
  const [method, setMethod] = useState<CookingMethod>('tagine')
  const [servings, setServings] = useState<number>(4)
  const [copied, setCopied] = useState(false)

  const currentFish = useMemo(
    () => allFish.find((f) => f.id === fishId) || allFish[0]!,
    [allFish, fishId]
  )

  const result = useMemo(
    () => calculateCharmoula(currentFish, method, servings),
    [currentFish, method, servings]
  )

  const handleCopy = () => {
    const text = `🐟 شرمولة وشيف الحوت لـ ${currentFish.nameDarijaArabic} (${servings} أشخاص):
- ثوم: ${result.formula.garlicCloves} فصوص
- قزبر: ${result.formula.corianderGrams} غ (${result.formula.corianderTbsp} معالق كبار)
- معدنوس: ${result.formula.parsleyGrams} غ (${result.formula.parsleyTbsp} معالق كبار)
- كامون بلدي: ${result.formula.cuminTsp} معلقة صغيرة
- تحميرة حلوة: ${result.formula.paprikaTsp} معلقة صغيرة
- هريسة حارة: ${result.formula.harissaTsp} معلقة صغيرة
- زيت زيتون: ${result.formula.oliveOilTbsp} معالق كبار
- عصير حامض: ${result.formula.lemonJuiceTbsp} معالق كبار
- حامض مصير: ${result.formula.preservedLemonQuarter} ربع حامضة
⏱️ مدة النقع: ${result.marinadeTimeMinutes} دقيقة | مدة الطهي: ${result.estimatedCookTimeMinutes} دقيقة`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const cookingMethods: { id: CookingMethod; label: string; icon: string }[] = [
    { id: 'tagine', label: t.methodTagine, icon: '🍲' },
    { id: 'four', label: t.methodFour, icon: '🔥' },
    { id: 'friture', label: t.methodFriture, icon: '🍳' },
    { id: 'grillade', label: t.methodGrillade, icon: '🍢' },
    { id: 'pil_pil', label: t.methodPilPil, icon: '🌶️' },
    { id: 'soup', label: t.methodSoup, icon: '🥣' },
  ]

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-cyan-950 to-blue-950 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              <ChefHat className="h-3.5 w-3.5" />
              <span>{t.chefTitle}</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              حاسبة الشرمولة المغربية الذكية
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.chefSubtitle}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-2xl border border-cyan-400/40 bg-cyan-500/20 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-cyan-500 shadow-lg shadow-cyan-500/20"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'تم النسخ بنجاح' : 'نسخ مقادير الشرمولة'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Panel Bento */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Side: Selectors */}
        <div className="space-y-6 lg:col-span-5">
          {/* 1. Select Fish */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 block">
              {t.selectFishLabel}
            </label>
            <select
              value={fishId}
              onChange={(e) => setFishId(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-semibold text-white focus:border-cyan-400 focus:outline-none transition-colors"
            >
              {allFish.map((f) => (
                <option key={f.id} value={f.id} className="bg-slate-950 text-white">
                  {f.nameDarijaArabic} ({f.nameDarijaLatin} · {f.nameFrench})
                </option>
              ))}
            </select>

            {/* Fish Quick Snapshot */}
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/5 bg-slate-950/40 p-3">
              <img
                src={currentFish.imageUrl}
                alt={currentFish.nameFrench}
                className="h-14 w-14 rounded-xl object-cover"
              />
              <div>
                <h4 className="text-sm font-bold text-white">
                  {currentFish.nameDarijaArabic}
                </h4>
                <p className="text-xs text-cyan-400">{currentFish.nameFrench}</p>
                <span className="text-[11px] text-slate-400">
                  {currentFish.priceRangeMAD.min}-{currentFish.priceRangeMAD.max} MAD/kg
                </span>
              </div>
            </div>
          </div>

          {/* 2. Select Cooking Method */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 block">
              {t.selectMethodLabel}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {cookingMethods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`flex items-center gap-2.5 rounded-2xl border p-3 text-right text-xs font-semibold transition-all ${
                    method === m.id
                      ? 'border-cyan-500 bg-cyan-500/20 text-white shadow-md shadow-cyan-500/10'
                      : 'border-white/5 bg-slate-950/50 text-slate-400 hover:border-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-base">{m.icon}</span>
                  <span className="line-clamp-1">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Number of Servings Slider */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {t.servingsCountLabel}
              </label>
              <span className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-black text-cyan-300">
                {servings} {t.servingsLabel}
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={12}
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-950 accent-cyan-400"
            />

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Scale className="h-3.5 w-3.5 text-cyan-400" />
                {t.estimatedWeight}:{' '}
                <strong className="text-white">{result.weightKg} kg</strong>
              </span>
              <span>1 إلى 12 شخص</span>
            </div>
          </div>
        </div>

        {/* Right Side: Generated Formula & Proportions */}
        <div className="space-y-6 lg:col-span-7">
          {/* Quick Stats Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center">
              <Clock className="mx-auto mb-1 h-5 w-5 text-cyan-400" />
              <span className="text-[11px] text-slate-400 block">{t.marinadeTime}</span>
              <span className="text-sm font-bold text-white">
                {result.marinadeTimeMinutes} دقيقة
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center">
              <Thermometer className="mx-auto mb-1 h-5 w-5 text-amber-400" />
              <span className="text-[11px] text-slate-400 block">{t.cookingTemp}</span>
              <span className="text-sm font-bold text-white">
                {result.cookTempCelsius}°C
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center">
              <Flame className="mx-auto mb-1 h-5 w-5 text-rose-400" />
              <span className="text-[11px] text-slate-400 block">{t.estimatedCookingDuration}</span>
              <span className="text-sm font-bold text-white">
                {result.estimatedCookTimeMinutes} دقيقة
              </span>
            </div>
          </div>

          {/* Charmoula Measurement Table */}
          <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2 text-base font-black text-white">
                <ChefHat className="h-5 w-5 text-cyan-400" />
                مقادير الشرمولة الدقيقة لـ ({servings} أشخاص)
              </h3>
              <span className="text-xs text-cyan-400 font-semibold">
                شرمولة معتبرة
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950/60 p-3">
                <span className="text-xs text-slate-300">{t.garlicLabel}</span>
                <span className="text-xs font-black text-cyan-300">
                  {result.formula.garlicCloves} فصوص محكوكين
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950/60 p-3">
                <span className="text-xs text-slate-300">{t.corianderLabel}</span>
                <span className="text-xs font-black text-cyan-300">
                  {result.formula.corianderGrams}g ({result.formula.corianderTbsp} م كبار)
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950/60 p-3">
                <span className="text-xs text-slate-300">{t.parsleyLabel}</span>
                <span className="text-xs font-black text-cyan-300">
                  {result.formula.parsleyGrams}g ({result.formula.parsleyTbsp} م كبار)
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950/60 p-3">
                <span className="text-xs text-slate-300">{t.cuminLabel}</span>
                <span className="text-xs font-black text-amber-300">
                  {result.formula.cuminTsp} معلقة صغيرة
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950/60 p-3">
                <span className="text-xs text-slate-300">{t.paprikaLabel}</span>
                <span className="text-xs font-black text-rose-300">
                  {result.formula.paprikaTsp} معلقة صغيرة
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950/60 p-3">
                <span className="text-xs text-slate-300">{t.oliveOilLabel}</span>
                <span className="text-xs font-black text-emerald-300">
                  {result.formula.oliveOilTbsp} معالق كبار
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950/60 p-3">
                <span className="text-xs text-slate-300">{t.lemonJuiceLabel}</span>
                <span className="text-xs font-black text-yellow-300">
                  {result.formula.lemonJuiceTbsp} معالق كبار
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950/60 p-3">
                <span className="text-xs text-slate-300">{t.harissaLabel}</span>
                <span className="text-xs font-black text-red-400">
                  {result.formula.harissaTsp} معلقة صغيرة
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950/60 p-3">
                <span className="text-xs text-slate-300">{t.preservedLemonLabel}</span>
                <span className="text-xs font-black text-amber-200">
                  {result.formula.preservedLemonQuarter} أرباع حامضة مصيرة
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950/60 p-3">
                <span className="text-xs text-slate-300">{t.saltLabel} & {t.blackPepperLabel}</span>
                <span className="text-xs font-black text-slate-200">
                  {result.formula.saltTsp} م ص ملح / {result.formula.blackPepperTsp} م ص إبزار
                </span>
              </div>
            </div>

            {/* Special Additions */}
            {result.formula.specialAdditions.length > 0 && (
              <div className="mt-4 rounded-2xl border border-white/5 bg-slate-950/40 p-4">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                  {t.specialIngredients}
                </h4>
                <div className="space-y-1.5">
                  {result.formula.specialAdditions.map((add, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>{add[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chef Guidance Text */}
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/10 p-6">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Sparkles className="h-4 w-4" />
              نصيحة شيف الحوت المغربي
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-emerald-200/90">
              {result.chefGuidance[lang]}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

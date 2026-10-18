import React, { useState } from 'react'
import {
  Heart,
  ShieldCheck,
  Zap,
  Scale,
  Sparkles,
} from 'lucide-react'
import type { Fish } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'

interface NutritionCalculatorProps {
  fish: Fish
  lang: SupportedLanguage
}

export const NutritionCalculator: React.FC<NutritionCalculatorProps> = ({
  fish,
  lang,
}) => {
  const [weightGrams, setWeightGrams] = useState<number>(100)

  // Multiplier relative to 100g base
  const factor = weightGrams / 100
  const nut = fish.nutrition

  const scaled = {
    calories: Math.round(nut.calories * factor),
    proteinGrams: Number((nut.proteinGrams * factor).toFixed(1)),
    lipidsGrams: Number((nut.lipidsGrams * factor).toFixed(1)),
    omega3Mg: Math.round(nut.omega3Mg * factor),
    vitaminD_IU: Math.round(nut.vitaminD_IU * factor),
    vitaminB12_mcg: Number((nut.vitaminB12_mcg * factor).toFixed(1)),
    calciumMg: Math.round(nut.calciumMg * factor),
    ironMg: Number((nut.ironMg * factor).toFixed(1)),
    phosphorusMg: Math.round(nut.phosphorusMg * factor),
    seleniumMcg: Number((nut.seleniumMcg * factor).toFixed(1)),
    iodineMcg: Number((nut.iodineMcg * factor).toFixed(1)),
    zincMg: Number((nut.zincMg * factor).toFixed(1)),
  }

  // Daily Reference Intake (DRI) estimates for protein (50g), Vitamin D (600 IU), Vitamin B12 (2.4 mcg)
  const proteinPercent = Math.min(200, Math.round((scaled.proteinGrams / 50) * 100))
  const vitDPercent = Math.min(300, Math.round((scaled.vitaminD_IU / 600) * 100))
  const vitB12Percent = Math.min(500, Math.round((scaled.vitaminB12_mcg / 2.4) * 100))

  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
      {/* Header and Portion Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h3 className="flex items-center gap-2 text-base font-bold text-white">
            <Zap className="h-4 w-4 text-amber-400" />
            حاسبة القيمة الغذائية الحية لـ ({fish.nameDarijaArabic})
          </h3>
          <p className="text-xs text-slate-400">
            احسب السعرات والبروتين وأوميغا 3 والفيتامينات حسب وزن الحصة (100غ أو 1 كلغ أو حصة مخصصة)
          </p>
        </div>

        {/* Preset Weight Pills */}
        <div className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-slate-950 p-1">
          {[
            { label: '100 غرام', grams: 100 },
            { label: '250 غ (حصة)', grams: 250 },
            { label: '500 غ', grams: 500 },
            { label: '1 كيلوغرام (1000غ)', grams: 1000 },
          ].map((preset) => (
            <button
              key={preset.grams}
              type="button"
              onClick={() => setWeightGrams(preset.grams)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                weightGrams === preset.grams
                  ? 'bg-cyan-500 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Weight Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Scale className="h-3.5 w-3.5 text-cyan-400" />
            تعديل الوزن المخصص للحصة:
          </span>
          <span className="rounded-md bg-cyan-500/20 px-2 py-0.5 text-cyan-300 font-bold">
            {weightGrams} غرام {weightGrams >= 1000 ? `(${(weightGrams / 1000).toFixed(1)} كلغ)` : ''}
          </span>
        </div>
        <input
          type="range"
          min={50}
          max={1500}
          step={25}
          value={weightGrams}
          onChange={(e) => setWeightGrams(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-950 accent-cyan-400"
        />
      </div>

      {/* Primary Nutritional Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Calories */}
        <div className="rounded-2xl border border-white/5 bg-slate-950/70 p-4 text-center">
          <span className="text-[11px] text-slate-400 block mb-1">السعرات الحرارية</span>
          <span className="text-2xl font-black text-white">{scaled.calories}</span>
          <span className="text-[10px] text-slate-500 block">كيلوكالوري (kcal)</span>
        </div>

        {/* Protein */}
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4 text-center">
          <span className="text-[11px] text-cyan-300 block mb-1">البروتين الصافي</span>
          <span className="text-2xl font-black text-cyan-400">{scaled.proteinGrams}g</span>
          <span className="text-[10px] text-cyan-300/80 block">{proteinPercent}% من الاحتياج اليومي</span>
        </div>

        {/* Omega 3 */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 text-center">
          <span className="text-[11px] text-emerald-300 block mb-1">أوميغا 3 (EPA / DHA)</span>
          <span className="text-2xl font-black text-emerald-400">{scaled.omega3Mg}</span>
          <span className="text-[10px] text-emerald-300/80 block">ميليغرام (mg) للقلب</span>
        </div>

        {/* Lipids */}
        <div className="rounded-2xl border border-white/5 bg-slate-950/70 p-4 text-center">
          <span className="text-[11px] text-slate-400 block mb-1">الدهون الكلية</span>
          <span className="text-2xl font-black text-white">{scaled.lipidsGrams}g</span>
          <span className="text-[10px] text-slate-500 block">دهون صحية غير مشبعة</span>
        </div>
      </div>

      {/* Micronutrients Table */}
      <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          المعادن والفيتامينات في هذه الكمية ({weightGrams}غ):
        </h4>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 text-xs">
          <div className="rounded-xl bg-slate-900/80 p-2.5 border border-white/5">
            <span className="text-slate-400 block text-[11px]">فيتامين D</span>
            <span className="font-bold text-amber-300">{scaled.vitaminD_IU} IU</span>
            <span className="text-[10px] text-slate-500 block">{vitDPercent}% احتياج يومي</span>
          </div>

          <div className="rounded-xl bg-slate-900/80 p-2.5 border border-white/5">
            <span className="text-slate-400 block text-[11px]">فيتامين B12</span>
            <span className="font-bold text-rose-300">{scaled.vitaminB12_mcg} µg</span>
            <span className="text-[10px] text-slate-500 block">{vitB12Percent}% احتياج يومي</span>
          </div>

          <div className="rounded-xl bg-slate-900/80 p-2.5 border border-white/5">
            <span className="text-slate-400 block text-[11px]">الكالسيوم</span>
            <span className="font-bold text-white">{scaled.calciumMg} mg</span>
            <span className="text-[10px] text-slate-500 block">للعظام والمفاصل</span>
          </div>

          <div className="rounded-xl bg-slate-900/80 p-2.5 border border-white/5">
            <span className="text-slate-400 block text-[11px]">الحديد العضوي</span>
            <span className="font-bold text-white">{scaled.ironMg} mg</span>
            <span className="text-[10px] text-slate-500 block">ضد فقر الدم</span>
          </div>

          <div className="rounded-xl bg-slate-900/80 p-2.5 border border-white/5">
            <span className="text-slate-400 block text-[11px]">السيلينيوم</span>
            <span className="font-bold text-white">{scaled.seleniumMcg} µg</span>
            <span className="text-[10px] text-slate-500 block">مضاد أكسدة فائق</span>
          </div>

          <div className="rounded-xl bg-slate-900/80 p-2.5 border border-white/5">
            <span className="text-slate-400 block text-[11px]">اليود البحري</span>
            <span className="font-bold text-white">{scaled.iodineMcg} µg</span>
            <span className="text-[10px] text-slate-500 block">للغدة الدرقية</span>
          </div>

          <div className="rounded-xl bg-slate-900/80 p-2.5 border border-white/5">
            <span className="text-slate-400 block text-[11px]">الفسفور</span>
            <span className="font-bold text-white">{scaled.phosphorusMg} mg</span>
            <span className="text-[10px] text-slate-500 block">للذاكرة والتركيز</span>
          </div>

          <div className="rounded-xl bg-slate-900/80 p-2.5 border border-white/5">
            <span className="text-slate-400 block text-[11px]">الزنك</span>
            <span className="font-bold text-white">{scaled.zincMg} mg</span>
            <span className="text-[10px] text-slate-500 block">للمناعة والجلد</span>
          </div>
        </div>
      </div>

      {/* Bodily Health Benefits */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
          <Heart className="h-4 w-4" />
          الفوائد الصحية المباشرة للجسم:
        </h4>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {nut.healthBenefits[lang].map((benefit, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 rounded-2xl border border-emerald-500/20 bg-emerald-950/15 p-3 text-xs text-emerald-100"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

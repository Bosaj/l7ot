import React, { useState, useMemo } from 'react'
import {
  Sparkles,
  Utensils,
  Coffee,
  Compass,
  HeartPulse,
  X,
  CheckCircle2,
  MapPin,
} from 'lucide-react'
import type { Fish, CookingMethod } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import {
  buildCoastalSommelierRecommendation,
  type DietaryFilterKey,
} from '../lib/coastalSommelierEngine'

interface CoastalSommelierModalProps {
  fish: Fish
  allFish?: Fish[]
  lang: SupportedLanguage
  preferredMethod?: CookingMethod
  isModal?: boolean
  onClose?: () => void
  onSelectFish?: (fish: Fish) => void
}

export const CoastalSommelierModal: React.FC<CoastalSommelierModalProps> = ({
  fish,
  allFish = [],
  lang,
  preferredMethod,
  isModal = true,
  onClose,
  onSelectFish,
}) => {
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilterKey>('all')
  const [methodOverride, setMethodOverride] = useState<CookingMethod | undefined>(
    preferredMethod
  )

  const recommendation = useMemo(
    () => buildCoastalSommelierRecommendation(fish, dietaryFilter, methodOverride),
    [fish, dietaryFilter, methodOverride]
  )

  const dietaryOptions: Array<{
    id: DietaryFilterKey
    labelAr: string
    labelFr: string
    labelEn: string
  }> = [
    {
      id: 'all',
      labelAr: 'التناغم المغربي الأصيل (الكل)',
      labelFr: 'Accord Traditionnel Complet',
      labelEn: 'All Traditional Pairings',
    },
    {
      id: 'low_sodium',
      labelAr: 'قليل الصوديوم (Low Sodium)',
      labelFr: 'Pauvre en Sodium (Sans Sel)',
      labelEn: 'Low Sodium',
    },
    {
      id: 'diabetic_friendly',
      labelAr: 'ملائم لمرضى السكري (Diabetic-Friendly)',
      labelFr: 'Indice Glycémique Bas (Diabète)',
      labelEn: 'Diabetic-Friendly',
    },
    {
      id: 'keto_coastal',
      labelAr: 'كيتو ساحلي (Keto Coastal)',
      labelFr: 'Keto Côtier (Riche Oméga-3)',
      labelEn: 'Keto Coastal',
    },
  ]

  const panel = (
    <section
      aria-label="AI Coastal Sommelier"
      className="rounded-2xl border border-amber-500/35 bg-[#120e0c] p-5 sm:p-7 text-[#f6f1e7] shadow-2xl space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-[#f6f1e7]/10 pb-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-3 py-1 font-mono text-[11px] font-bold text-amber-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>
              {lang === 'ar'
                ? 'الساقي الساحلي الذكي (AI Coastal Sommelier) · مصفوفة التيروار المغربي'
                : lang === 'fr'
                ? 'Sommelier Côtier IA · Matrice des Terroirs Marocains'
                : 'AI Coastal Sommelier · Moroccan Terroir & Culinary Matrix'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-editorial text-2xl font-bold text-[#f6f1e7] sm:text-3xl">
              {lang === 'ar'
                ? `تناغم الحوامض والمقبلات وأتاي مع ${fish.nameDarijaArabic}`
                : lang === 'fr'
                ? `Accords Agrumes, Salades & Infusions pour ${fish.nameFrench}`
                : `Citrus, Moroccan Salad & Herbal Tea Pairings for ${fish.nameEnglish}`}
            </h2>

            {allFish.length > 1 && onSelectFish && (
              <select
                aria-label="Switch Sommelier Fish"
                value={fish.id}
                onChange={(e) => {
                  const found = allFish.find((f) => f.id === e.target.value)
                  if (found) onSelectFish(found)
                }}
                className="rounded-lg border border-amber-500/30 bg-[#0b0908] px-3 py-1.5 text-xs font-bold text-amber-300"
              >
                {allFish.map((f) => (
                  <option key={f.id} value={f.id}>
                    {lang === 'ar' ? f.nameDarijaArabic : f.nameFrench}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {isModal && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Sommelier"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#0b0908] text-[#f6f1e7] hover:border-amber-400 hover:text-amber-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dietary Filters & Cooking Method Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-xl border border-[#f6f1e7]/10 bg-[#0b0908] p-4">
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] uppercase text-emerald-400 flex items-center gap-1.5 font-bold">
            <HeartPulse className="h-3.5 w-3.5" />
            {lang === 'ar'
              ? 'تصفية حسب النظام الغذائي والصحي:'
              : lang === 'fr'
              ? 'Filtres Nutritionnels & Diététiques :'
              : 'Dietary & Health Filters:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {dietaryOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDietaryFilter(opt.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  dietaryFilter === opt.id
                    ? 'bg-emerald-500 text-[#0b0908] shadow-md'
                    : 'border border-[#f6f1e7]/10 bg-[#14110f] text-[#a69b8d] hover:text-[#f6f1e7]'
                }`}
              >
                {lang === 'ar' ? opt.labelAr : lang === 'fr' ? opt.labelFr : opt.labelEn}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 shrink-0">
          <span className="font-mono text-[10px] uppercase text-amber-300 block">
            {lang === 'ar' ? 'طريقة الطهي المعتمدة:' : 'Mode de Cuisson :'}
          </span>
          <div className="flex flex-wrap gap-1">
            {(['tagine', 'grillade', 'four', 'friture', 'pil_pil', 'soup'] as CookingMethod[]).map(
              (m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethodOverride(m)}
                  className={`rounded px-2.5 py-1 font-mono text-[11px] font-bold uppercase transition ${
                    recommendation.cookingMethod === m
                      ? 'bg-[#d96b27] text-[#0b0908]'
                      : 'bg-[#14110f] text-[#a69b8d] hover:text-white'
                  }`}
                >
                  {m}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Sommelier Executive Verdict */}
      <div className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-[#18120e] to-[#0b0908] p-4">
        <p className="text-xs sm:text-sm leading-relaxed text-amber-100 font-medium">
          ✨ {recommendation.sommelierVerdict[lang]}
        </p>
      </div>

      {/* 3 Pillars Grid: Terroir Matrix, Side Salads & Herbal Teas */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Pillar 1: Moroccan Terroir Matrix */}
        <div className="rounded-xl border border-[#f6f1e7]/10 bg-[#0b0908] p-4 space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-editorial font-bold text-base border-b border-[#f6f1e7]/10 pb-2">
            <MapPin className="h-4 w-4 text-amber-400" />
            <h3>
              {lang === 'ar'
                ? '1. مكونات التيروار المغربي (Terroir)'
                : lang === 'fr'
                ? '1. Joyaux du Terroir Marocain'
                : '1. Moroccan Terroir Pairings'}
            </h3>
          </div>

          <div className="space-y-3">
            {recommendation.terroirIngredients.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-[#f6f1e7]/8 bg-[#14110f] p-3 space-y-1"
              >
                <div className="font-bold text-xs text-amber-200">
                  {lang === 'ar' ? item.nameAr : lang === 'fr' ? item.nameFr : item.nameEn}
                </div>
                <div className="font-mono text-[10px] text-[#e68a45]">
                  📍{' '}
                  {lang === 'ar'
                    ? item.regionOriginAr
                    : lang === 'fr'
                    ? item.regionOriginFr
                    : item.regionOriginEn}
                </div>
                <p className="text-[11px] text-[#c4b8aa] leading-relaxed">
                  {lang === 'ar' ? item.roleAr : lang === 'fr' ? item.roleFr : item.roleEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 2: Traditional Moroccan Side Salads */}
        <div className="rounded-xl border border-[#f6f1e7]/10 bg-[#0b0908] p-4 space-y-3">
          <div className="flex items-center gap-2 text-emerald-300 font-editorial font-bold text-base border-b border-[#f6f1e7]/10 pb-2">
            <Utensils className="h-4 w-4 text-emerald-400" />
            <h3>
              {lang === 'ar'
                ? '2. السلطات والمقبلات الساحلية المرافقة'
                : lang === 'fr'
                ? '2. Salades Marocaines (Zaalouk, Taktouka...)'
                : '2. Harmonized Moroccan Side Salads'}
            </h3>
          </div>

          <div className="space-y-3">
            {recommendation.sideSalads.map((salad) => (
              <div
                key={salad.id}
                className="rounded-lg border border-[#f6f1e7]/8 bg-[#14110f] p-3 space-y-1.5"
              >
                <div className="font-bold text-xs text-emerald-200">
                  {lang === 'ar' ? salad.nameAr : lang === 'fr' ? salad.nameFr : salad.nameEn}
                </div>
                <p className="text-[11px] text-[#c4b8aa] leading-relaxed">
                  {lang === 'ar'
                    ? salad.harmonyReasonAr
                    : lang === 'fr'
                    ? salad.harmonyReasonFr
                    : salad.harmonyReasonEn}
                </p>
                <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400 pt-1">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>
                    GI: {salad.glycemicIndex} · Na: {salad.sodiumMgPerServing}mg · Carbs:{' '}
                    {salad.netCarbsGrams}g
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 3: Herbal Tea & Beverage Infusions */}
        <div className="rounded-xl border border-[#f6f1e7]/10 bg-[#0b0908] p-4 space-y-3">
          <div className="flex items-center gap-2 text-cyan-300 font-editorial font-bold text-base border-b border-[#f6f1e7]/10 pb-2">
            <Coffee className="h-4 w-4 text-cyan-400" />
            <h3>
              {lang === 'ar'
                ? '3. أتاي والأعشاب الهضمية (النعناع، اللويزة، الشيبة)'
                : lang === 'fr'
                ? '3. Infusions & Thés (Menthe, Louiza, Chiba)'
                : '3. Moroccan Mint, Louiza & Chiba Infusions'}
            </h3>
          </div>

          <div className="space-y-3">
            {recommendation.beveragePairings.map((tea) => (
              <div
                key={tea.id}
                className="rounded-lg border border-[#f6f1e7]/8 bg-[#14110f] p-3 space-y-1.5"
              >
                <div className="font-bold text-xs text-cyan-200">
                  {lang === 'ar' ? tea.nameAr : lang === 'fr' ? tea.nameFr : tea.nameEn}
                </div>
                <div className="font-mono text-[10px] text-cyan-400">
                  {lang === 'ar'
                    ? tea.infusionProfileAr
                    : lang === 'fr'
                    ? tea.infusionProfileFr
                    : tea.infusionProfileEn}
                </div>
                <p className="text-[11px] text-[#c4b8aa] leading-relaxed">
                  {lang === 'ar'
                    ? tea.digestiveBenefitAr
                    : lang === 'fr'
                    ? tea.digestiveBenefitFr
                    : tea.digestiveBenefitEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Authentic Cultural & Historical Coastal Origin Note */}
      <div className="rounded-xl border border-[#f6f1e7]/10 bg-[#0b0908] p-4 space-y-1.5">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#e68a45]">
          <Compass className="h-4 w-4" />
          <span>
            {lang === 'ar'
              ? 'الأصل التاريخي والثقافي في الموانئ المغربية:'
              : lang === 'fr'
              ? 'Histoire Culturelle & Patrimoine Côtier :'
              : 'Authentic Cultural & Historical Coastal Origins:'}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-[#d4cbbd]">
          {recommendation.culturalOriginStory[lang]}
        </p>
      </div>
    </section>
  )

  if (!isModal) return panel

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="my-auto max-h-[92vh] w-full max-w-5xl overflow-y-auto"
      >
        {panel}
      </div>
    </div>
  )
}

import React from 'react'
import { X, Clock, Users, Flame, Sparkles, ChefHat, Check } from 'lucide-react'
import type { Recipe } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'

interface RecipeModalProps {
  recipe: Recipe
  lang: SupportedLanguage
  onClose: () => void
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  lang,
  onClose,
}) => {
  const t = STRINGS[lang]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
        {/* Header Hero */}
        <div className="relative h-60 w-full shrink-0 overflow-hidden bg-slate-950 sm:h-72">
          <img
            src={recipe.imageUrl}
            alt={recipe.titleFrench}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white backdrop-blur-md transition-colors hover:bg-rose-500"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              {recipe.titleDarijaArabic}
            </h2>
            <p className="text-sm font-semibold text-cyan-300">
              {recipe.titleDarijaLatin} · {recipe.titleFrench}
            </p>
          </div>
        </div>

        {/* Timings & Highlights Bar */}
        <div className="flex flex-wrap items-center justify-around gap-4 border-b border-white/5 bg-slate-950/60 p-4 text-xs font-medium text-slate-300">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-cyan-400" />
            <span>
              {t.prepTime}: {recipe.prepTimeMinutes} دقيقة | {t.cookTime}: {recipe.cookTimeMinutes} دقيقة
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-amber-400" />
            <span>
              {recipe.servings} {t.servingsLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-rose-400" />
            <span>{recipe.caloriesEst} سعرة حرارية تقريباً</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Description */}
          <p className="text-sm leading-relaxed text-slate-200 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
            {recipe.description[lang]}
          </p>

          {/* Charmoula Spice Meter */}
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-cyan-300 mb-3">
              <ChefHat className="h-4 w-4" />
              {t.spicesTitle}
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
              <div className="rounded-xl bg-slate-900/80 p-2.5 border border-white/5">
                <span className="text-slate-400 block">{t.garlicLabel}</span>
                <span className="text-sm font-bold text-white">
                  {recipe.charmoulaFormula.garlicCloves} فصوص
                </span>
              </div>
              <div className="rounded-xl bg-slate-900/80 p-2.5 border border-white/5">
                <span className="text-slate-400 block">{t.corianderLabel}</span>
                <span className="text-sm font-bold text-white">
                  {recipe.charmoulaFormula.corianderGrams} غرام
                </span>
              </div>
              <div className="rounded-xl bg-slate-900/80 p-2.5 border border-white/5">
                <span className="text-slate-400 block">{t.cuminLabel}</span>
                <span className="text-sm font-bold text-white">
                  {recipe.charmoulaFormula.cuminTsp} معالق صغار
                </span>
              </div>
              <div className="rounded-xl bg-slate-900/80 p-2.5 border border-white/5">
                <span className="text-slate-400 block">{t.paprikaLabel}</span>
                <span className="text-sm font-bold text-white">
                  {recipe.charmoulaFormula.paprikaTsp} معالق صغار
                </span>
              </div>
              <div className="rounded-xl bg-slate-900/80 p-2.5 border border-white/5">
                <span className="text-slate-400 block">{t.oliveOilLabel}</span>
                <span className="text-sm font-bold text-white">
                  {recipe.charmoulaFormula.oliveOilTbsp} معالق كبار
                </span>
              </div>
              <div className="rounded-xl bg-slate-900/80 p-2.5 border border-white/5">
                <span className="text-slate-400 block">{t.lemonJuiceLabel}</span>
                <span className="text-sm font-bold text-white">
                  {recipe.charmoulaFormula.lemonJuiceTbsp} معالق كبار
                </span>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">
              {t.ingredientsTitle}
            </h3>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {recipe.ingredients.map((ing, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/50 p-2.5 text-xs text-slate-300"
                >
                  <span className="font-medium text-white">
                    {lang === 'ar' ? ing.itemAr : lang === 'fr' ? ing.itemFr : ing.itemEn}
                  </span>
                  <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 font-bold text-cyan-300">
                    {ing.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">
              {t.stepsTitle}
            </h3>
            <div className="space-y-3">
              {recipe.steps.map((s) => (
                <div
                  key={s.stepNumber}
                  className="flex items-start gap-3 rounded-2xl border border-white/5 bg-slate-950/40 p-3.5"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-xs font-black text-slate-950">
                    {s.stepNumber}
                  </span>
                  <p className="text-xs leading-relaxed text-slate-300">
                    {lang === 'ar' ? s.textAr : lang === 'fr' ? s.textFr : s.textEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chef Secret Alert */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5">
              <Sparkles className="h-4 w-4" />
              {t.chefSecretTitle}
            </h4>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              {recipe.chefSecrets[lang]}
            </p>
          </div>

          {/* Accompaniments */}
          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              {t.moroccanAccompanimentsTitle}
            </h4>
            <div className="flex flex-wrap gap-2">
              {recipe.moroccanAccompaniments[lang].map((acc, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900 px-2.5 py-1 text-xs text-slate-300"
                >
                  <Check className="h-3 w-3 text-emerald-400" />
                  {acc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

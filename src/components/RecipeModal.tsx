import React, { useState, useEffect } from 'react'
import {
  X,
  Clock,
  Users,
  Flame,
  ChefHat,
  Play,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react'
import type { Recipe } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'

interface RecipeModalProps {
  recipe: Recipe
  lang: SupportedLanguage
  onClose: () => void
  onBackToFish?: () => void
  backToFishName?: string
  onSelectFishId?: (fishId: string) => void
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  lang,
  onClose,
  onBackToFish,
  backToFishName,
  onSelectFishId,
}) => {
  const t = STRINGS[lang]
  const [playingVideo, setPlayingVideo] = useState(false)

  // Lock background body scroll while modal is active (with touch-bounce prevention)
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const originalTouchAction = document.body.style.touchAction
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.touchAction = originalTouchAction
    }
  }, [])

  const isRtl = lang === 'ar'
  const BackIcon = isRtl ? ArrowRight : ArrowLeft

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative z-10 flex my-auto max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-sm border border-[#2a211c] bg-[#120e0c] text-[#f4ede2] shadow-2xl">
        {/* Header Hero */}
        <div className="relative h-60 w-full shrink-0 overflow-hidden bg-[#0b0908] sm:h-72">
          <img
            src={recipe.imageUrl}
            alt={recipe.titleFrench}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120e0c] via-[#120e0c]/40 to-black/30" />

          {/* Top Bar with Back-to-Fish (if applicable) and Close */}
          <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2">
            {onBackToFish ? (
              <button
                type="button"
                onClick={onBackToFish}
                className="flex items-center gap-1.5 rounded-sm border border-[#2a211c] bg-[#0b0908]/85 px-3 py-1.5 font-mono text-xs text-[#e09f3e] backdrop-blur-md transition hover:border-[#c85a32]"
              >
                <BackIcon className="h-3.5 w-3.5" />
                <span>
                  {lang === 'ar'
                    ? `الرجوع إلى ${backToFishName || 'السمكة'}`
                    : `Retour à ${backToFishName || 'l’espèce'}`}
                </span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-[#2a211c] bg-[#0b0908]/85 text-[#f4ede2] backdrop-blur-md transition-colors hover:border-[#c85a32] hover:text-[#e09f3e]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute bottom-4 inset-x-5">
            <h2 className="font-editorial text-3xl font-bold text-[#f4ede2] sm:text-4xl">
              {recipe.titleDarijaArabic}
            </h2>
            <p className="mt-1 font-mono text-xs text-[#e09f3e]">
              {recipe.titleDarijaLatin} · {recipe.titleFrench}
            </p>
          </div>
        </div>

        {/* Timings & Highlights Bar */}
        <div className="flex flex-wrap items-center justify-around gap-4 border-b border-[#2a211c] bg-[#0b0908] p-3.5 font-mono text-xs text-[#b5a592]">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-[#e09f3e]" />
            <span>
              {t.prepTime}: {recipe.prepTimeMinutes} min | {t.cookTime}: {recipe.cookTimeMinutes} min
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-amber-400" />
            <span>
              {recipe.servings} {t.servingsLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-[#c85a32]" />
            <span dir="ltr">~{recipe.caloriesEst} kcal</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Description */}
          <p className="rounded-sm border border-[#2a211c] bg-[#181310] p-4 text-sm leading-relaxed text-[#f4ede2]">
            {recipe.description[lang]}
          </p>

          {/* Embedded Video Player if present */}
          {recipe.videoId && (
            <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-4 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#e09f3e]">
                  <Sparkles className="h-3.5 w-3.5" />
                  {lang === 'ar' ? 'فيديو طريقة التحضير المغربية' : 'Tutoriel vidéo de préparation'}
                </span>
                <a
                  href={`https://www.youtube.com/watch?v=${recipe.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-[#8c7d6b] hover:text-[#e09f3e]"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  YouTube
                </a>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-[#2a211c] bg-[#0b0908]">
                {playingVideo ? (
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${recipe.videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={recipe.titleDarijaArabic}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlayingVideo(true)}
                    aria-label="Play Recipe Video"
                    className="group absolute inset-0 h-full w-full"
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${recipe.videoId}/hqdefault.jpg`}
                      alt={recipe.titleDarijaArabic}
                      className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#0b0908] via-transparent to-transparent" />
                    <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#d96b27] text-[#0b0908] shadow-2xl transition group-hover:scale-110">
                      <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Charmoula Spice Meter */}
          <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-5">
            <h3 className="flex items-center gap-2 font-editorial text-sm font-bold text-[#e09f3e] mb-3">
              <ChefHat className="h-4 w-4" />
              {t.spicesTitle}
            </h3>
            <div className="grid grid-cols-2 gap-2.5 text-xs sm:grid-cols-3">
              <div className="rounded-sm bg-[#120e0c] p-2.5 border border-[#2a211c]">
                <span className="text-[#8c7d6b] block text-[11px]">{t.garlicLabel}</span>
                <span className="font-mono text-xs font-bold text-[#f4ede2]">
                  {recipe.charmoulaFormula.garlicCloves} {lang === 'ar' ? 'فصوص' : 'gousses'}
                </span>
              </div>
              <div className="rounded-sm bg-[#120e0c] p-2.5 border border-[#2a211c]">
                <span className="text-[#8c7d6b] block text-[11px]">{t.corianderLabel}</span>
                <span className="font-mono text-xs font-bold text-[#f4ede2]">
                  {recipe.charmoulaFormula.corianderGrams} g
                </span>
              </div>
              <div className="rounded-sm bg-[#120e0c] p-2.5 border border-[#2a211c]">
                <span className="text-[#8c7d6b] block text-[11px]">{t.cuminLabel}</span>
                <span className="font-mono text-xs font-bold text-[#f4ede2]">
                  {recipe.charmoulaFormula.cuminTsp} {lang === 'ar' ? 'معالق صغار' : 'c.à.c'}
                </span>
              </div>
              <div className="rounded-sm bg-[#120e0c] p-2.5 border border-[#2a211c]">
                <span className="text-[#8c7d6b] block text-[11px]">{t.paprikaLabel}</span>
                <span className="font-mono text-xs font-bold text-[#f4ede2]">
                  {recipe.charmoulaFormula.paprikaTsp} {lang === 'ar' ? 'معالق صغار' : 'c.à.c'}
                </span>
              </div>
              <div className="rounded-sm bg-[#120e0c] p-2.5 border border-[#2a211c]">
                <span className="text-[#8c7d6b] block text-[11px]">{t.oliveOilLabel}</span>
                <span className="font-mono text-xs font-bold text-[#f4ede2]">
                  {recipe.charmoulaFormula.oliveOilTbsp} {lang === 'ar' ? 'معالق كبار' : 'c.à.s'}
                </span>
              </div>
              <div className="rounded-sm bg-[#120e0c] p-2.5 border border-[#2a211c]">
                <span className="text-[#8c7d6b] block text-[11px]">{t.lemonJuiceLabel}</span>
                <span className="font-mono text-xs font-bold text-[#f4ede2]">
                  {recipe.charmoulaFormula.lemonJuiceTbsp} {lang === 'ar' ? 'معالق كبار' : 'c.à.s'}
                </span>
              </div>
            </div>
          </div>

          {/* Associated Moroccan Fish */}
          {recipe.fishIds && recipe.fishIds.length > 0 && onSelectFishId && (
            <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-3.5">
              <span className="font-mono text-[11px] text-[#8c7d6b] block mb-2">
                {lang === 'ar'
                  ? 'السمك المناسب لهذه الوصفة (اضغط لعرض الملف الكامل):'
                  : lang === 'fr'
                  ? 'Poissons de la recette (cliquez pour voir la fiche) :'
                  : 'Recommended fish species (click to inspect species):'}
              </span>
              <div className="flex flex-wrap gap-2">
                {recipe.fishIds.map((fId) => (
                  <button
                    key={fId}
                    type="button"
                    onClick={() => onSelectFishId(fId)}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-[#c85a32]/40 bg-[#c85a32]/15 px-3 py-1 font-mono text-xs font-bold text-[#f2b47e] transition hover:bg-[#c85a32] hover:text-white"
                  >
                    <span>🐟 {fId}</span>
                    <span className="text-[10px] text-[#e09f3e]">↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients */}
          <div>
            <h3 className="font-editorial text-sm font-bold text-[#f4ede2] uppercase tracking-wider mb-3">
              {t.ingredientsTitle}
            </h3>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {recipe.ingredients.map((ing, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-sm border border-[#2a211c] bg-[#181310] p-2.5 text-xs text-[#f4ede2]"
                >
                  <span className="font-medium">
                    {lang === 'ar' ? ing.itemAr : lang === 'fr' ? ing.itemFr : ing.itemEn}
                  </span>
                  <span className="rounded-sm bg-[#c85a32]/20 px-2 py-0.5 font-mono text-[11px] font-bold text-[#e09f3e]">
                    {ing.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            <h3 className="font-editorial text-sm font-bold text-[#f4ede2] uppercase tracking-wider mb-2">
              {t.stepsTitle}
            </h3>
            {recipe.steps.map((st) => (
              <div
                key={st.stepNumber}
                className="rounded-sm border border-[#2a211c] bg-[#181310] p-3.5 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c85a32] font-mono text-[11px] font-bold text-[#f4ede2]">
                    {st.stepNumber}
                  </span>
                  <span className="font-mono text-xs text-[#8c7d6b]">
                    {lang === 'ar' ? `المرحلة ${st.stepNumber}` : `Étape ${st.stepNumber}`}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-[#b5a592]">
                  {lang === 'ar' ? st.textAr : lang === 'fr' ? st.textFr : st.textEn}
                </p>
              </div>
            ))}
          </div>

          {/* Chef Secret */}
          <div className="rounded-sm border border-[#c85a32]/40 bg-[#c85a32]/10 p-4">
            <h4 className="flex items-center gap-2 font-editorial text-xs font-bold uppercase tracking-wider text-[#e09f3e] mb-1.5">
              <Sparkles className="h-4 w-4" />
              {t.chefSecretTitle}
            </h4>
            <p className="text-xs leading-relaxed text-[#f4ede2]">
              {recipe.chefSecrets[lang]}
            </p>
          </div>

          {/* Moroccan Accompaniments */}
          <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-4">
            <h4 className="font-editorial text-xs font-bold uppercase tracking-wider text-[#f4ede2] mb-2">
              {t.moroccanAccompanimentsTitle}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {recipe.moroccanAccompaniments[lang].map((acc, i) => (
                <span
                  key={i}
                  className="rounded-sm border border-[#2a211c] bg-[#120e0c] px-2.5 py-1 text-xs text-[#b5a592]"
                >
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

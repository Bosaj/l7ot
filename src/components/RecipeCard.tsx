import React from 'react'
import { Clock, Users, Flame, ChefHat } from 'lucide-react'
import type { Recipe } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'

interface RecipeCardProps {
  recipe: Recipe
  lang: SupportedLanguage
  onSelectRecipe: (recipe: Recipe) => void
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  lang,
  onSelectRecipe,
}) => {
  const t = STRINGS[lang]

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'facile':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
      case 'moyen':
        return 'border-amber-500/30 bg-amber-500/10 text-amber-300'
      case 'expert':
        return 'border-rose-500/30 bg-rose-500/10 text-rose-300'
      default:
        return 'border-slate-500/30 bg-slate-500/10 text-slate-300'
    }
  }

  return (
    <div
      onClick={() => onSelectRecipe(recipe)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
    >
      {/* Recipe Photo */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950 sm:h-52">
        <img
          src={recipe.imageUrl}
          alt={recipe.titleFrench}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* Difficulty & Cooking Style */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md ${getDifficultyBadge(
              recipe.difficulty
            )}`}
          >
            {recipe.difficulty === 'facile'
              ? t.easy
              : recipe.difficulty === 'moyen'
              ? t.medium
              : t.expert}
          </span>

          <span className="flex items-center gap-1 rounded-full border border-white/10 bg-slate-950/70 px-2.5 py-1 text-[11px] font-medium text-slate-300 backdrop-blur-md">
            <Flame className="h-3 w-3 text-amber-400" />
            {recipe.category}
          </span>
        </div>
      </div>

      {/* Recipe Info */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
            {recipe.titleDarijaArabic}
          </h3>
          <p className="text-xs font-semibold text-cyan-400 mt-0.5">
            {recipe.titleDarijaLatin}
          </p>
          <p className="text-xs text-slate-400 mt-1 line-clamp-1">
            {recipe.titleFrench}
          </p>

          <p className="mt-3 text-xs leading-relaxed text-slate-300 line-clamp-2">
            {recipe.description[lang]}
          </p>
        </div>

        {/* Timings Footer */}
        <div className="mt-5 border-t border-white/5 pt-4">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-cyan-400" />
              <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} دقيقة</span>
            </div>

            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-slate-400" />
              <span>
                {recipe.servings} {t.servingsLabel}
              </span>
            </div>

            <span className="font-semibold text-cyan-400 flex items-center gap-1 group-hover:underline">
              <ChefHat className="h-3.5 w-3.5" />
              {t.viewDetails}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { Clock, Users, Flame, ChefHat } from 'lucide-react'
import type { Recipe } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'

interface RecipeCardProps {
  recipe: Recipe
  index?: number
  lang: SupportedLanguage
  onSelectRecipe: (recipe: Recipe) => void
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  index = 0,
  lang,
  onSelectRecipe,
}) => {
  const t = STRINGS[lang]
  const recipeCode = `REC-${String(index + 1).padStart(2, '0')}`

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'facile':
        return 'border-emerald-500/40 bg-[#0b0908]/85 text-emerald-300'
      case 'moyen':
        return 'border-amber-500/40 bg-[#0b0908]/85 text-amber-300'
      case 'expert':
        return 'border-rose-500/40 bg-[#0b0908]/85 text-rose-300'
      default:
        return 'border-[#f6f1e7]/20 bg-[#0b0908]/85 text-[#d4cbbd]'
    }
  }

  return (
    <article
      onClick={() => onSelectRecipe(recipe)}
      className="double-bezel group cursor-pointer transition-all duration-300 hover:-translate-y-1"
    >
      <div className="double-bezel-inner flex h-full flex-col justify-between overflow-hidden">
        {/* Top Recipe Index Bar */}
        <div className="flex items-center justify-between border-b border-[#f6f1e7]/10 bg-[#100d0b] px-4 py-2 text-[11px] font-mono">
          <span className="font-bold text-[#e68a45]">{recipeCode}</span>
          <span className="flex items-center gap-1 uppercase text-[#d4cbbd]">
            <Flame className="h-3 w-3 text-[#e68a45]" />
            {recipe.category}
          </span>
        </div>

        {/* Recipe Photo */}
        <div className="relative h-48 w-full overflow-hidden bg-[#0b0908] sm:h-52">
          <img
            src={recipe.imageUrl}
            alt={recipe.titleFrench}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14110f] via-transparent to-black/25" />

          {/* Difficulty & Region */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
            <span
              className={`rounded border px-2 py-0.5 font-mono text-[10px] font-semibold backdrop-blur-sm ${getDifficultyBadge(
                recipe.difficulty
              )}`}
            >
              {recipe.difficulty === 'facile'
                ? t.easy
                : recipe.difficulty === 'moyen'
                ? t.medium
                : t.expert}
            </span>
          </div>
        </div>

        {/* Recipe Info */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <h3 className="font-editorial text-xl font-bold text-[#f6f1e7] group-hover:text-[#e68a45] transition-colors">
              {recipe.titleDarijaArabic}
            </h3>
            <p className="font-mono text-xs font-semibold text-[#e68a45] mt-0.5">
              {recipe.titleDarijaLatin}
            </p>
            <p className="text-xs text-[#a69b8d] mt-1 line-clamp-1">
              {recipe.titleFrench}
            </p>

            <p className="mt-3 text-xs leading-relaxed text-[#d4cbbd] line-clamp-2">
              {recipe.description[lang]}
            </p>
          </div>

          {/* Timings Footer */}
          <div className="mt-5 border-t border-[#f6f1e7]/10 pt-3.5">
            <div className="flex items-center justify-between font-mono text-xs text-[#d4cbbd]">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#e68a45]" />
                <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-[#a69b8d]" />
                <span>
                  {recipe.servings} {t.servingsLabel}
                </span>
              </div>

              <span className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-[#f6f1e7] px-2.5 font-sans text-[11px] font-bold text-[#0b0908] transition-colors group-hover:bg-[#e68a45] whitespace-nowrap shrink-0">
                <ChefHat className="h-3 w-3 shrink-0" />
                <span className="whitespace-nowrap">{t.viewDetails}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

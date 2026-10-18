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

import React, { useState } from 'react'
import { Volume2, ChefHat, Eye, MapPin, Sparkles } from 'lucide-react'
import type { Fish } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'
import { speakDarija } from '../lib/speech'

interface FishCardProps {
  fish: Fish
  lang: SupportedLanguage
  onSelectFish: (fish: Fish) => void
  onCookWithFish?: (fish: Fish) => void
}

export const FishCard: React.FC<FishCardProps> = ({
  fish,
  lang,
  onSelectFish,
  onCookWithFish,
}) => {
  const t = STRINGS[lang]
  const [imgError, setImgError] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlayingAudio(true)
    speakDarija(fish.nameDarijaArabic, fish.audioPhonetic)
    setTimeout(() => setIsPlayingAudio(false), 1600)
  }

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'poisson_bleu':
        return 'border-blue-500/30 bg-blue-500/10 text-blue-300'
      case 'poisson_blanc':
        return 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
      case 'cephalopode':
        return 'border-purple-500/30 bg-purple-500/10 text-purple-300'
      case 'crustace':
        return 'border-rose-500/30 bg-rose-500/10 text-rose-300'
      case 'mollusque':
        return 'border-amber-500/30 bg-amber-300/10 text-amber-300'
      case 'cartilagineux':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
      default:
        return 'border-slate-500/30 bg-slate-500/10 text-slate-300'
    }
  }

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'poisson_bleu':
        return t.catPoissonBleu
      case 'poisson_blanc':
        return t.catPoissonBlanc
      case 'cephalopode':
        return t.catCephalopode
      case 'crustace':
        return t.catCrustace
      case 'mollusque':
        return t.catMollusque
      case 'cartilagineux':
        return t.catCartilagineux
      default:
        return cat
    }
  }

  return (
    <div
      onClick={() => onSelectFish(fish)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
    >
      {/* Visual Image Header */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950 sm:h-52">
        {!imgError ? (
          <img
            src={fish.imageUrl}
            alt={fish.nameFrench}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-cyan-950 to-blue-950 p-4 text-center">
            <Sparkles className="mb-2 h-8 w-8 text-cyan-400 opacity-60" />
            <span className="text-base font-semibold text-cyan-200">
              {fish.nameDarijaArabic}
            </span>
            <span className="text-xs text-slate-400">{fish.scientificName}</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Category & Coast Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md ${getCategoryColor(
              fish.category
            )}`}
          >
            {getCategoryLabel(fish.category)}
          </span>

          <span className="flex items-center gap-1 rounded-full border border-white/10 bg-slate-950/70 px-2.5 py-1 text-[11px] font-medium text-slate-300 backdrop-blur-md">
            <MapPin className="h-3 w-3 text-cyan-400" />
            {fish.coast === 'both'
              ? 'أطلسي + متوسط'
              : fish.coast === 'atlantic'
              ? 'أطلسي'
              : 'متوسطي'}
          </span>
        </div>

        {/* Audio pronunciation float button */}
        <button
          type="button"
          onClick={handleAudio}
          title={t.listenPronunciation}
          className={`absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-cyan-300 shadow-md backdrop-blur-md transition-all hover:bg-cyan-500 hover:text-white ${
            isPlayingAudio ? 'scale-110 ring-4 ring-cyan-400/50' : ''
          }`}
        >
          <Volume2 className="h-4 w-4" />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Main Titles */}
          <div className="mb-2 flex items-baseline justify-between gap-2">
            <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              {fish.nameDarijaArabic}
            </h3>
            <span className="text-sm font-medium text-cyan-400">
              {fish.nameDarijaLatin}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium text-slate-300">{fish.nameFrench}</span>
            <span className="italic opacity-70">{fish.scientificName}</span>
          </div>

          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-300">
            {fish.description[lang]}
          </p>
        </div>

        {/* Pricing & Actions Footer */}
        <div className="mt-5 border-t border-white/5 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block">
                متوسط الثمن بالمارشي
              </span>
              <div className="text-sm font-bold text-emerald-400">
                {fish.priceRangeMAD.min} - {fish.priceRangeMAD.max}{' '}
                <span className="text-[11px] font-normal text-slate-400">
                  {fish.priceRangeMAD.unit === 'kg' ? t.priceUnitKg : t.priceUnitPiece}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onCookWithFish && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onCookWithFish(fish)
                  }}
                  title={t.chefTitle}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500 hover:text-white transition-all shadow-sm"
                >
                  <ChefHat className="h-4 w-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => onSelectFish(fish)}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
              >
                <Eye className="h-3.5 w-3.5 text-cyan-400" />
                <span>{t.viewDetails}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

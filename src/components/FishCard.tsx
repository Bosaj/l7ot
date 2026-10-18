import React, { useState } from 'react'
import {
  Volume2,
  ChefHat,
  Eye,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  Scissors,
  Zap,
} from 'lucide-react'
import type { Fish } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'
import { speakDarija } from '../lib/speech'

interface FishCardProps {
  fish: Fish
  lang: SupportedLanguage
  onSelectFish: (fish: Fish) => void
  onCookWithFish?: (fish: Fish) => void
  onOpenCleaningTutorial?: (fish: Fish) => void
  onOpenNutrition?: (fish: Fish) => void
}

export const FishCard: React.FC<FishCardProps> = ({
  fish,
  lang,
  onSelectFish,
  onCookWithFish,
  onOpenCleaningTutorial,
  onOpenNutrition,
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

  const p = fish.pricing

  return (
    <div
      onClick={() => onSelectFish(fish)}
      className="double-bezel group cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/15"
    >
      <div className="double-bezel-inner flex h-full flex-col justify-between overflow-hidden p-0">
        {/* Real Biological Photo Header */}
        <div className="relative h-52 w-full overflow-hidden bg-slate-950 sm:h-56">
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

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

          {/* Category & Coast Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span
              className={`rounded-full border px-2.5 py-1 text-xs font-bold backdrop-blur-md ${getCategoryColor(
                fish.category
              )}`}
            >
              {getCategoryLabel(fish.category)}
            </span>

            {/* Price Trend Pill */}
            <span
              className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold backdrop-blur-md ${
                p.trend === 'up'
                  ? 'border-rose-500/30 bg-rose-500/20 text-rose-300'
                  : p.trend === 'down'
                  ? 'border-emerald-500/30 bg-emerald-500/20 text-emerald-300'
                  : 'border-slate-500/30 bg-slate-800/60 text-slate-300'
              }`}
            >
              {p.trend === 'up' ? (
                <>
                  <TrendingUp className="h-3 w-3" /> طالع
                </>
              ) : p.trend === 'down' ? (
                <>
                  <TrendingDown className="h-3 w-3" /> هابط
                </>
              ) : (
                <>
                  <Minus className="h-3 w-3" /> مستقر
                </>
              )}
            </span>
          </div>

          {/* Audio Pronunciation Button */}
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

        {/* Content Body */}
        <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
          <div>
            {/* Title & Latin transcript */}
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors font-sans">
                {fish.nameDarijaArabic}
              </h3>
              <span className="text-xs font-bold text-cyan-400">
                {fish.nameDarijaLatin}
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium text-slate-300">{fish.nameFrench}</span>
              <span className="italic opacity-70 text-[11px]">{fish.scientificName}</span>
            </div>

            {/* Regional Names Badges */}
            <div className="mt-3 rounded-2xl border border-white/5 bg-slate-950/50 p-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                الأسماء الجهوية بالمغرب:
              </span>
              <div className="flex flex-wrap gap-1 text-[11px]">
                <span className="rounded-md bg-cyan-950/60 border border-cyan-500/20 px-2 py-0.5 text-cyan-300">
                  شمال: {fish.regionalNames.chamal[0]}
                </span>
                <span className="rounded-md bg-blue-950/60 border border-blue-500/20 px-2 py-0.5 text-blue-300">
                  وسط: {fish.regionalNames.centre[0]}
                </span>
                <span className="rounded-md bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 text-emerald-300">
                  جنوب: {fish.regionalNames.sud[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Comparison (Local vs Global Export) */}
          <div className="rounded-2xl border border-white/5 bg-slate-950/70 p-3">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">
                  ثمن السوق المغربي (Spot)
                </span>
                <span className="text-base font-black text-emerald-400">
                  {p.currentSpotMAD} MAD / kg
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-medium">
                  التصدير الدولي (Global)
                </span>
                <span className="text-xs font-bold text-cyan-300">
                  ${p.globalExportUSD.avg} / kg
                </span>
              </div>
            </div>
          </div>

          {/* Action Tools Ribbon */}
          <div className="flex items-center justify-between gap-1.5 border-t border-white/5 pt-3">
            <div className="flex items-center gap-1.5">
              {onOpenCleaningTutorial && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpenCleaningTutorial(fish)
                  }}
                  title="طريقة تنقية الحوت بالمغرب"
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-slate-800/80 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all"
                >
                  <Scissors className="h-3.5 w-3.5" />
                </button>
              )}

              {onOpenNutrition && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpenNutrition(fish)
                  }}
                  title="حاسبة القيمة الغذائية الحية (100غ / 1كلغ)"
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-slate-800/80 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 transition-all"
                >
                  <Zap className="h-3.5 w-3.5" />
                </button>
              )}

              {onCookWithFish && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onCookWithFish(fish)
                  }}
                  title={t.chefTitle}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500 hover:text-white transition-all shadow-sm"
                >
                  <ChefHat className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => onSelectFish(fish)}
              className="flex items-center gap-1 rounded-xl border border-white/10 bg-slate-800/80 px-3 py-1.5 text-xs font-bold text-slate-200 transition-colors hover:bg-cyan-500 hover:text-slate-950"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>{t.viewDetails}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

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
  index?: number
  lang: SupportedLanguage
  onSelectFish: (fish: Fish) => void
  onCookWithFish?: (fish: Fish) => void
  onOpenCleaningTutorial?: (fish: Fish) => void
  onOpenNutrition?: (fish: Fish) => void
}

export const FishCard: React.FC<FishCardProps> = ({
  fish,
  index = 0,
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
    speakDarija(fish.nameDarijaArabic, fish.audioPhonetic, fish.id)
    setTimeout(() => setIsPlayingAudio(false), 3200)
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
  const specimenCode = `N° ${String(index + 1).padStart(2, '0')}`

  // Compute SVG sparkline path from past6MonthsMAD
  const prices = p.past6MonthsMAD
  const minP = Math.min(...prices)
  const maxP = Math.max(...prices)
  const rangeP = maxP - minP || 1
  const sparkPoints = prices
    .map((val, idx) => {
      const x = (idx / (prices.length - 1)) * 72
      const y = 20 - ((val - minP) / rangeP) * 16
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <article
      onClick={() => onSelectFish(fish)}
      className="double-bezel group cursor-pointer transition-all duration-300 hover:-translate-y-1"
    >
      <div className="double-bezel-inner flex h-full flex-col justify-between overflow-hidden">
        {/* Top Specimen Index Header */}
        <div className="flex items-center justify-between border-b border-[#f6f1e7]/10 bg-[#100d0b] px-4 py-2.5 text-[11px]">
          <div className="flex items-center gap-2 font-mono">
            <span className="font-bold text-[#e68a45]">{specimenCode}</span>
            <span className="text-[#f6f1e7]/20">/</span>
            <span className="italic font-serif text-[#a69b8d]">{fish.scientificName}</span>
          </div>
          <span className="rounded border border-[#f6f1e7]/12 bg-[#1c1714] px-2 py-0.5 text-[10px] font-medium text-[#d4cbbd]">
            {getCategoryLabel(fish.category)}
          </span>
        </div>

        {/* Biological Specimen Frame */}
        <div className="relative h-52 w-full overflow-hidden bg-[#0b0908] sm:h-56">
          {!imgError ? (
            <img
              src={fish.imageUrl}
              alt={`${fish.nameDarijaArabic} - ${fish.nameFrench}`}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#14110f] p-4 text-center">
              <Sparkles className="mb-2 h-7 w-7 text-[#e68a45] opacity-60" />
              <span className="font-editorial text-lg text-[#f6f1e7]">
                {fish.nameDarijaArabic}
              </span>
              <span className="font-mono text-xs text-[#a69b8d]">{fish.scientificName}</span>
            </div>
          )}

          {/* Subtle Editorial Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14110f] via-transparent to-black/25" />

          {/* Top-Left Ports Strip */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
            <span className="rounded bg-[#0b0908]/85 border border-[#f6f1e7]/15 px-2 py-0.5 font-mono text-[10px] text-[#e8e0d3] backdrop-blur-sm">
              {fish.mainPorts.slice(0, 2).join(' · ')}
            </span>

            {/* Price Trend Indicator */}
            <span
              className={`flex items-center gap-1 rounded border px-2 py-0.5 font-mono text-[10px] font-semibold backdrop-blur-sm ${
                p.trend === 'up'
                  ? 'border-amber-500/40 bg-[#0b0908]/85 text-amber-300'
                  : p.trend === 'down'
                  ? 'border-emerald-500/40 bg-[#0b0908]/85 text-emerald-300'
                  : 'border-[#f6f1e7]/20 bg-[#0b0908]/85 text-[#d4cbbd]'
              }`}
            >
              {p.trend === 'up' ? (
                <>
                  <TrendingUp className="h-3 w-3" />
                  <span>{lang === 'ar' ? 'طالع' : 'HAUSSE'}</span>
                </>
              ) : p.trend === 'down' ? (
                <>
                  <TrendingDown className="h-3 w-3" />
                  <span>{lang === 'ar' ? 'هابط' : 'BAISSE'}</span>
                </>
              ) : (
                <>
                  <Minus className="h-3 w-3" />
                  <span>{lang === 'ar' ? 'مستقر' : 'STABLE'}</span>
                </>
              )}
            </span>
          </div>

          {/* Native Arabic Pronunciation Pill Button */}
          <button
            type="button"
            onClick={handleAudio}
            title={t.listenPronunciation}
            className={`absolute bottom-3 right-3 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md transition-all ${
              isPlayingAudio
                ? 'border-[#e68a45] bg-[#d96b27] text-[#0b0908] ring-4 ring-[#d96b27]/30'
                : 'border-[#f6f1e7]/25 bg-[#0b0908]/85 text-[#f6f1e7] hover:border-[#e68a45] hover:bg-[#d96b27] hover:text-[#0b0908]'
            }`}
          >
            {isPlayingAudio ? (
              <span className="flex h-3.5 items-end gap-0.5">
                <span className="h-3 w-0.5 bg-current animate-wave-1" />
                <span className="h-3.5 w-0.5 bg-current animate-wave-2" />
                <span className="h-2.5 w-0.5 bg-current animate-wave-3" />
              </span>
            ) : (
              <Volume2 className="h-3.5 w-3.5 text-[#e68a45] group-hover:text-current" />
            )}
            <span className="text-[11px]">
              {isPlayingAudio
                ? lang === 'ar'
                  ? 'ينطق بالدارجة...'
                  : 'Audio...'
                : lang === 'ar'
                ? 'نطق بالدارجة'
                : 'Écouter'}
            </span>
          </button>
        </div>

        {/* Specimen Body */}
        <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
          <div className="space-y-3">
            {/* Editorial Serif Headline */}
            <div className="border-b border-[#f6f1e7]/10 pb-3">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-editorial text-2xl font-bold text-[#f6f1e7] group-hover:text-[#e68a45] transition-colors">
                  {fish.nameDarijaArabic}
                </h3>
                <span className="font-mono text-xs font-semibold text-[#e68a45]">
                  {fish.nameDarijaLatin}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-[#a69b8d]">
                <span className="font-medium text-[#d4cbbd]">{fish.nameFrench}</span>
                <span className="text-[11px]">{fish.nameEnglish}</span>
              </div>
            </div>

            {/* Regional Moroccan Names Ledger */}
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-baseline justify-between gap-2 border-b border-[#f6f1e7]/5 pb-1">
                <span className="font-mono text-[10px] uppercase text-[#a69b8d] shrink-0">
                  {lang === 'ar' ? 'الشمال:' : 'Nord:'}
                </span>
                <span className="text-right font-medium text-[#e8e0d3] truncate">
                  {fish.regionalNames.chamal[0]}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-2 border-b border-[#f6f1e7]/5 pb-1">
                <span className="font-mono text-[10px] uppercase text-[#a69b8d] shrink-0">
                  {lang === 'ar' ? 'الوسط:' : 'Centre:'}
                </span>
                <span className="text-right font-medium text-[#e8e0d3] truncate">
                  {fish.regionalNames.centre[0]}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[10px] uppercase text-[#a69b8d] shrink-0">
                  {lang === 'ar' ? 'الجنوب:' : 'Sud:'}
                </span>
                <span className="text-right font-medium text-[#f2b47e] truncate">
                  {fish.regionalNames.sud[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Monospace ONP Price & Sparkline Ledger */}
          <div className="rounded-lg border border-[#f6f1e7]/10 bg-[#0b0908] p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="block font-mono text-[9px] uppercase text-[#a69b8d]">
                  {lang === 'ar' ? 'سعر المرسى والأسواق' : 'COURS SOUK MAROC'}
                </span>
                <span className="font-mono text-base font-bold text-emerald-400">
                  {p.currentSpotMAD} MAD
                  <span className="text-[10px] font-normal text-[#a69b8d]">/kg</span>
                </span>
              </div>

              {/* 6-Month Sparkline */}
              <div className="flex flex-col items-center">
                <svg width="74" height="22" className="overflow-visible">
                  <polyline
                    fill="none"
                    stroke={p.trend === 'up' ? '#f59e0b' : p.trend === 'down' ? '#34d399' : '#e68a45'}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={sparkPoints}
                  />
                </svg>
                <span className="font-mono text-[8px] text-[#786c60]">6M TREND</span>
              </div>

              <div className="text-right">
                <span className="block font-mono text-[9px] uppercase text-[#a69b8d]">
                  {lang === 'ar' ? 'التصدير الدولي' : 'EXPORT GLOBAL'}
                </span>
                <span className="font-mono text-xs font-bold text-[#f2b47e]">
                  ${p.globalExportUSD.avg}
                  <span className="text-[10px] font-normal text-[#a69b8d]">/kg</span>
                </span>
              </div>
            </div>

            {/* Quick Nutrition Strip */}
            <div className="mt-2.5 flex items-center justify-between border-t border-[#f6f1e7]/8 pt-2 font-mono text-[10px] text-[#a69b8d]">
              <span>{fish.nutrition.calories} kcal</span>
              <span>•</span>
              <span>{fish.nutrition.proteinGrams}g Prot</span>
              <span>•</span>
              <span className="text-[#e68a45]">{fish.nutrition.omega3Mg}mg Ω-3</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between gap-1.5 border-t border-[#f6f1e7]/10 pt-3">
            <div className="flex items-center gap-1.5">
              {onOpenCleaningTutorial && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpenCleaningTutorial(fish)
                  }}
                  title="طريقة تنقية الحوت بالمغرب"
                  className="flex items-center gap-1 rounded border border-[#f6f1e7]/12 bg-[#1c1714] px-2.5 py-1.5 text-[11px] font-medium text-[#f2b47e] transition-colors hover:border-[#d96b27] hover:bg-[#d96b27] hover:text-[#0b0908]"
                >
                  <Scissors className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">
                    {lang === 'ar' ? 'فيديو التنقية' : 'Nettoyage'}
                  </span>
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
                  className="flex h-8 w-8 items-center justify-center rounded border border-[#f6f1e7]/12 bg-[#1c1714] text-emerald-400 transition-colors hover:bg-emerald-500 hover:text-[#0b0908]"
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
                  className="flex h-8 w-8 items-center justify-center rounded border border-[#f6f1e7]/12 bg-[#1c1714] text-[#e68a45] transition-colors hover:bg-[#d96b27] hover:text-[#0b0908]"
                >
                  <ChefHat className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => onSelectFish(fish)}
              className="flex items-center gap-1.5 rounded bg-[#f6f1e7] px-3 py-1.5 text-xs font-bold text-[#0b0908] transition-colors hover:bg-[#e68a45]"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>{t.viewDetails}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

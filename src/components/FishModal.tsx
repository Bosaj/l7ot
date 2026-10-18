import React, { useState, useEffect } from 'react'
import {
  X,
  Volume2,
  ChefHat,
  MapPin,
  Calendar,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Scissors,
  Zap,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
} from 'lucide-react'
import type { Fish, Recipe } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'
import { speakDarija } from '../lib/speech'
import { PriceBadge } from './PriceBadge'
import { NutritionCalculator } from './NutritionCalculator'

interface FishModalProps {
  fish: Fish
  allFish?: Fish[]
  allRecipes: Recipe[]
  lang: SupportedLanguage
  initialTab?: 'overview' | 'nutrition' | 'cleaning' | 'market'
  onClose: () => void
  onSelectFish?: (fish: Fish) => void
  onSelectRecipe: (recipe: Recipe) => void
  onCookWithFish: (fish: Fish) => void
  onOpenCleaningTutorial?: (fish: Fish) => void
}

/** Click-to-play YouTube player: loads no third-party scripts until user presses play */
const InlineVideoPlayer: React.FC<{
  videoId: string
  title: string
  lang: SupportedLanguage
}> = ({ videoId, title, lang }) => {
  const [playing, setPlaying] = useState(false)
  const watchLabel =
    lang === 'ar' ? 'مشاهدة على يوتيوب' : lang === 'fr' ? 'Ouvrir sur YouTube' : 'Watch on YouTube'

  return (
    <div className="space-y-2">
      <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-[#2a211c] bg-[#0b0908] shadow-2xl">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={title}
            className="group absolute inset-0 h-full w-full"
          >
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt={title}
              className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#0b0908] via-transparent to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#d96b27] text-[#0b0908] shadow-2xl transition group-hover:scale-110">
              <Play className="h-7 w-7 translate-x-0.5 fill-current" />
            </span>
          </button>
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-[#a69b8d]">
        <span className="font-mono text-[11px] text-[#e09f3e]">
          {lang === 'ar' ? 'فيديو توضيحي بدقة عالية' : 'Tutoriel vidéo HD'}
        </span>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 hover:text-[#e09f3e]"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {watchLabel}
        </a>
      </div>
    </div>
  )
}

export const FishModal: React.FC<FishModalProps> = ({
  fish,
  allFish = [],
  allRecipes,
  lang,
  initialTab = 'overview',
  onClose,
  onSelectFish,
  onSelectRecipe,
  onCookWithFish,
}) => {
  const t = STRINGS[lang]
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [modalTab, setModalTab] = useState<'overview' | 'nutrition' | 'cleaning' | 'market'>(
    initialTab
  )

  useEffect(() => {
    setModalTab(initialTab)
    setImgError(false)
  }, [fish.id, initialTab])

  const currentIndex = allFish.findIndex((f) => f.id === fish.id)
  const prevFish = currentIndex > 0 ? allFish[currentIndex - 1] : allFish[allFish.length - 1]
  const nextFish = currentIndex < allFish.length - 1 ? allFish[currentIndex + 1] : allFish[0]

  const handleAudio = () => {
    setIsPlayingAudio(true)
    speakDarija(fish.nameDarijaArabic, fish.audioPhonetic, fish.id)
    setTimeout(() => setIsPlayingAudio(false), 3200)
  }

  const linkedRecipes = allRecipes.filter(
    (r) => fish.recommendedRecipeIds?.includes(r.id) || r.fishIds?.includes(fish.id)
  )

  const p = fish.pricing
  const tut = fish.cleaningTutorial

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative z-10 flex my-auto max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-sm border border-[#2a211c] bg-[#120e0c] text-[#f4ede2] shadow-2xl">
        {/* Header Hero Image */}
        <div className="relative h-60 w-full shrink-0 overflow-hidden bg-[#0b0908] sm:h-72">
          {!imgError ? (
            <img
              src={fish.imageUrl}
              alt={fish.nameFrench}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#181310] p-6 text-center">
              <Sparkles className="h-10 w-10 text-[#e09f3e] mb-2" />
              <h2 className="font-editorial text-2xl font-bold text-[#f4ede2]">
                {fish.nameDarijaArabic}
              </h2>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#120e0c] via-[#120e0c]/40 to-black/30" />

          {/* Top Bar with Prev/Next Navigation and Close */}
          <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2">
            {allFish.length > 1 && onSelectFish ? (
              <div className="flex items-center gap-1.5 rounded-sm border border-[#2a211c] bg-[#0b0908]/85 p-1 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => prevFish && onSelectFish(prevFish)}
                  title={prevFish ? prevFish.nameDarijaArabic : 'Previous'}
                  className="flex items-center gap-1 rounded px-2 py-1 text-xs font-mono text-[#b5a592] hover:bg-[#1a1411] hover:text-[#f4ede2]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {lang === 'ar' ? 'السابق' : 'Précédent'}
                  </span>
                </button>
                <span className="text-[#332822]">|</span>
                <button
                  type="button"
                  onClick={() => nextFish && onSelectFish(nextFish)}
                  title={nextFish ? nextFish.nameDarijaArabic : 'Next'}
                  className="flex items-center gap-1 rounded px-2 py-1 text-xs font-mono text-[#b5a592] hover:bg-[#1a1411] hover:text-[#f4ede2]"
                >
                  <span className="hidden sm:inline">
                    {lang === 'ar' ? 'التالي' : 'Suivant'}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
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

          {/* Floating Title, Dialect Ledger & Spot Price */}
          <div className="absolute bottom-4 inset-x-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-editorial text-3xl font-bold tracking-tight text-[#f4ede2] sm:text-4xl">
                  {fish.nameDarijaArabic}
                </h2>
                <button
                  type="button"
                  onClick={handleAudio}
                  title={t.listenPronunciation}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-[#d96b27]/40 bg-[#d96b27]/20 text-[#e09f3e] backdrop-blur-md transition-all hover:bg-[#d96b27] hover:text-[#0b0908] ${
                    isPlayingAudio ? 'scale-110 ring-4 ring-[#d96b27]/40' : ''
                  }`}
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1 font-mono text-xs text-[#e09f3e]">
                {fish.nameDarijaLatin} · {fish.nameFrench} ({fish.nameEnglish})
              </p>
              <p className="font-serif italic text-xs text-[#8c7d6b]">{fish.scientificName}</p>
            </div>

            <div className="rounded-sm border border-[#2a211c] bg-[#0b0908]/90 px-3.5 py-2 text-end backdrop-blur-md">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-[#8c7d6b]">
                {lang === 'ar' ? 'سعر السوق بالمغرب' : 'Cours Spot Maroc'}
              </span>
              <div>
                <PriceBadge
                  amount={p.currentSpotMAD}
                  unit="kg"
                  lang={lang}
                  amountClassName="text-lg font-bold text-emerald-400"
                  unitClassName="text-[11px] text-emerald-400/80"
                />
              </div>
              <span className="block font-mono text-[10px] text-[#b5a592]">
                {lang === 'ar'
                  ? `التصدير: $${p.globalExportUSD.avg} / كلغ`
                  : `Export: $${p.globalExportUSD.avg}/kg`}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 border-b border-[#2a211c] bg-[#0b0908] p-2 text-xs font-semibold overflow-x-auto">
          <button
            type="button"
            onClick={() => setModalTab('overview')}
            className={`rounded-sm px-3.5 py-1.5 transition-all ${
              modalTab === 'overview'
                ? 'bg-[#d96b27] text-[#0b0908] font-bold'
                : 'text-[#b5a592] hover:text-[#f4ede2]'
            }`}
          >
            {lang === 'ar' ? 'نظرة عامة والأسماء الجهوية' : 'Aperçu & Noms Régionaux'}
          </button>

          <button
            type="button"
            onClick={() => setModalTab('cleaning')}
            className={`rounded-sm px-3.5 py-1.5 transition-all flex items-center gap-1.5 ${
              modalTab === 'cleaning'
                ? 'bg-[#d96b27] text-[#0b0908] font-bold'
                : 'text-[#b5a592] hover:text-[#f4ede2]'
            }`}
          >
            <Scissors className="h-3.5 w-3.5" />
            {lang === 'ar' ? 'فيديو ودليل التنقية (الكسال)' : 'Vidéo & Découpe (Kessal)'}
          </button>

          <button
            type="button"
            onClick={() => setModalTab('nutrition')}
            className={`rounded-sm px-3.5 py-1.5 transition-all flex items-center gap-1.5 ${
              modalTab === 'nutrition'
                ? 'bg-[#d96b27] text-[#0b0908] font-bold'
                : 'text-[#b5a592] hover:text-[#f4ede2]'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            {lang === 'ar' ? 'حاسبة القيمة الغذائية' : 'Nutrition (100g/1kg)'}
          </button>

          <button
            type="button"
            onClick={() => setModalTab('market')}
            className={`rounded-sm px-3.5 py-1.5 transition-all flex items-center gap-1.5 ${
              modalTab === 'market'
                ? 'bg-[#d96b27] text-[#0b0908] font-bold'
                : 'text-[#b5a592] hover:text-[#f4ede2]'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            {lang === 'ar' ? 'بورصة الأسعار والاتجاه' : 'Cours & Marchés'}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {modalTab === 'overview' && (
            <>
              {/* Description */}
              <p className="rounded-sm border border-[#2a211c] bg-[#181310] p-4 text-sm leading-relaxed text-[#f4ede2]">
                {fish.description[lang]}
              </p>

              {/* Regional Names Across Morocco */}
              <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-5 space-y-3">
                <h4 className="flex items-center gap-2 font-editorial text-sm font-bold text-[#e09f3e]">
                  <MapPin className="h-4 w-4" />
                  {lang === 'ar'
                    ? 'أسماء هذا الحوت حسب جهات وموانئ المغرب:'
                    : 'Noms régionaux dans les ports marocains :'}
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-sm border border-[#2a211c] bg-[#120e0c] p-3.5">
                    <span className="font-mono text-[11px] font-bold text-[#e09f3e] block mb-1">
                      {lang === 'ar' ? 'الشمال والمتوسط:' : 'Nord & Méditerranée :'}
                    </span>
                    <ul className="text-xs text-[#b5a592] space-y-1">
                      {fish.regionalNames.chamal.map((name, i) => (
                        <li key={i}>• {name}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-sm border border-[#2a211c] bg-[#120e0c] p-3.5">
                    <span className="font-mono text-[11px] font-bold text-[#e09f3e] block mb-1">
                      {lang === 'ar' ? 'الوسط والأطلسي:' : 'Centre & Atlantique :'}
                    </span>
                    <ul className="text-xs text-[#b5a592] space-y-1">
                      {fish.regionalNames.centre.map((name, i) => (
                        <li key={i}>• {name}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-sm border border-[#2a211c] bg-[#120e0c] p-3.5">
                    <span className="font-mono text-[11px] font-bold text-[#e09f3e] block mb-1">
                      {lang === 'ar' ? 'الجنوب وسوس والصحراء:' : 'Sud, Souss & Sahara :'}
                    </span>
                    <ul className="text-xs text-[#b5a592] space-y-1">
                      {fish.regionalNames.sud.map((name, i) => (
                        <li key={i}>• {name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Landing Ports & Seasonality */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-4">
                  <div className="flex items-center gap-2 text-[#e09f3e] mb-2.5">
                    <MapPin className="h-4 w-4" />
                    <h4 className="font-editorial text-xs font-bold uppercase tracking-wider text-[#f4ede2]">
                      {t.portsTitle}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {fish.mainPorts.map((port) => (
                      <span
                        key={port}
                        className="rounded-sm border border-[#2a211c] bg-[#120e0c] px-2.5 py-1 font-mono text-xs text-[#b5a592]"
                      >
                        {port}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-4">
                  <div className="flex items-center gap-2 text-[#e09f3e] mb-2.5">
                    <Calendar className="h-4 w-4" />
                    <h4 className="font-editorial text-xs font-bold uppercase tracking-wider text-[#f4ede2]">
                      {t.seasonPeak}
                    </h4>
                  </div>
                  <p className="text-xs text-[#b5a592] leading-relaxed">
                    {fish.seasonality.description[lang]}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {fish.seasonality.peakMonths.map((m) => (
                      <span
                        key={m}
                        className="rounded-sm bg-[#c85a32]/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#e09f3e]"
                      >
                        {t.months[m - 1]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Freshness Checklist */}
              <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-4">
                <h4 className="flex items-center gap-2 font-editorial text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                  <CheckCircle2 className="h-4 w-4" />
                  {t.freshnessKeys}
                </h4>
                <ul className="space-y-2">
                  {fish.freshnessKeys[lang].map((key, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#b5a592]">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{key}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Compatible Recipes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="flex items-center gap-2 font-editorial text-sm font-bold text-[#f4ede2]">
                    <BookOpen className="h-4 w-4 text-[#e09f3e]" />
                    {t.compatibleRecipes}
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      onCookWithFish(fish)
                    }}
                    className="flex items-center gap-1.5 rounded-sm bg-[#c85a32] px-3 py-1.5 text-xs font-bold text-[#f4ede2] hover:bg-[#b04b25] transition"
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
                        className="group flex cursor-pointer items-center gap-3 rounded-sm border border-[#2a211c] bg-[#181310] p-3 hover:border-[#c85a32] transition"
                      >
                        <img
                          src={r.imageUrl}
                          alt={r.titleFrench}
                          className="h-14 w-14 rounded-sm object-cover"
                        />
                        <div className="min-w-0">
                          <h5 className="font-editorial text-sm font-bold text-[#f4ede2] group-hover:text-[#e09f3e] transition">
                            {r.titleDarijaArabic}
                          </h5>
                          <span className="text-[11px] text-[#8c7d6b] truncate block">
                            {r.titleFrench}
                          </span>
                          <span className="mt-1 inline-block font-mono text-[10px] text-[#e09f3e]">
                            ⏱️ {r.prepTimeMinutes + r.cookTimeMinutes} min
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-sm border border-dashed border-[#2a211c] p-4 text-center text-xs text-[#8c7d6b]">
                    {lang === 'ar'
                      ? 'يمكن تحضير هذا الحوت بطرق الشواء أو الفرن أو الطاجين المغربي بالشرمولة.'
                      : 'Idéal rôti au four, grillé sur braises ou mijoté en tagine traditionnel.'}
                  </div>
                )}
              </div>
            </>
          )}

          {/* TAB 2: CLEANING TUTORIAL & VIDEO */}
          {modalTab === 'cleaning' && (
            <div className="space-y-6">
              <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2a211c] pb-3">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#e09f3e]">
                      {lang === 'ar'
                        ? 'طريقة الكسال المحترف في المرسى'
                        : 'Technique des maîtres écaillers marocains'}
                    </span>
                    <h3 className="font-editorial text-lg font-bold text-[#f4ede2]">
                      {lang === 'ar'
                        ? tut.methodNameAr
                        : lang === 'fr'
                          ? tut.methodNameFr
                          : tut.methodNameEn}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-[#b5a592]">
                    ⏱️ ~{tut.prepTimeMinutes} min · {tut.difficulty.toUpperCase()}
                  </span>
                </div>

                {/* Embedded Video */}
                {fish.cleaningVideoId && (
                  <InlineVideoPlayer
                    videoId={fish.cleaningVideoId}
                    title={tut.methodNameAr}
                    lang={lang}
                  />
                )}

                {/* Step-by-Step Instructions */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-editorial text-sm font-bold text-[#f4ede2]">
                    {lang === 'ar' ? 'مراحل التنقية خطوة بخطوة:' : 'Étapes de nettoyage :'}
                  </h4>
                  {tut.steps.map((st) => (
                    <div
                      key={st.stepNumber}
                      className="rounded-sm border border-[#2a211c] bg-[#120e0c] p-4 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c85a32] font-mono text-[11px] font-bold text-[#f4ede2]">
                          {st.stepNumber}
                        </span>
                        <h5 className="font-editorial text-sm font-bold text-[#f4ede2]">
                          {lang === 'ar'
                            ? st.titleAr
                            : lang === 'fr'
                              ? st.titleFr
                              : st.titleEn}
                        </h5>
                      </div>
                      <p className="text-xs leading-relaxed text-[#b5a592]">
                        {lang === 'ar'
                          ? st.instructionAr
                          : lang === 'fr'
                            ? st.instructionFr
                            : st.instructionEn}
                      </p>
                      <div className="rounded-sm bg-[#c85a32]/10 p-2.5 text-xs text-[#e09f3e]">
                        <span className="font-bold">
                          💡 {lang === 'ar' ? 'سر الكسال:' : 'Astuce du Kessal :'}
                        </span>{' '}
                        {lang === 'ar'
                          ? st.kessalTipAr
                          : lang === 'fr'
                            ? st.kessalTipFr
                            : st.kessalTipEn}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NUTRITION CALCULATOR */}
          {modalTab === 'nutrition' && <NutritionCalculator fish={fish} lang={lang} />}

          {/* TAB 4: MARKET & PRICING */}
          {modalTab === 'market' && (
            <div className="space-y-6">
              <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#2a211c] pb-4">
                  <div>
                    <h4 className="font-editorial text-base font-bold text-[#f4ede2] flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                      {lang === 'ar'
                        ? `تتبع بورصة أسعار ${fish.nameDarijaArabic} في المغرب والعالم`
                        : `Cours & Marchés : ${fish.nameFrench}`}
                    </h4>
                    <p className="text-xs text-[#8c7d6b]">
                      {lang === 'ar'
                        ? 'مقارنة الأسعار الفورية، السجلات السابقة للأشهر الستة وتوقعات الفصل القادم'
                        : 'Historique des 6 derniers mois et perspectives de cotation'}
                    </p>
                  </div>

                  <span
                    className={`rounded-sm px-3 py-1 font-mono text-xs font-bold border ${
                      p.trend === 'up'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : p.trend === 'down'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : 'bg-[#120e0c] text-[#b5a592] border-[#2a211c]'
                    }`}
                  >
                    {p.trend === 'up'
                      ? lang === 'ar'
                        ? '↗ صعود في الأسعار'
                        : '↗ HAUSSE'
                      : p.trend === 'down'
                        ? lang === 'ar'
                          ? '↘ تراجع وتخفيض'
                          : '↘ BAISSE'
                        : lang === 'ar'
                          ? '➔ استقرار نسبي'
                          : '➔ STABLE'}
                  </span>
                </div>

                {/* 6 Months Historical Progression */}
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-[#b5a592] block">
                    {lang === 'ar'
                      ? 'تطور السعر خلال الأشهر الستة الماضية (درهم / كلغ):'
                      : 'Historique des prix sur 6 mois (MAD / kg) :'}
                  </span>
                  <div className="grid grid-cols-6 gap-2 text-center text-xs">
                    {p.past6MonthsMAD.map((val, idx) => (
                      <div
                        key={idx}
                        className="rounded-sm border border-[#2a211c] bg-[#120e0c] p-2.5"
                      >
                        <span className="font-mono text-[10px] text-[#8c7d6b] block mb-1">
                          M-{6 - idx}
                        </span>
                        <span dir="ltr" className="font-mono font-bold text-[#e09f3e]">
                          {val} MAD
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Spot vs Global Export */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                  <div className="rounded-sm border border-emerald-500/30 bg-emerald-950/20 p-4">
                    <span className="font-mono text-xs text-emerald-300 font-bold block mb-1.5">
                      {lang === 'ar'
                        ? 'السعر الحالي في الموانئ المغربية (سوق الجملة):'
                        : 'Prix Criée Maroc (Spot) :'}
                    </span>
                    <div className="text-2xl font-black text-emerald-400">
                      <PriceBadge
                        amount={p.currentSpotMAD}
                        unit="kg"
                        lang={lang}
                        amountClassName="text-2xl font-black text-emerald-400"
                        unitClassName="text-sm font-semibold text-emerald-300/80"
                      />
                    </div>
                    <span className="font-mono text-xs text-[#a69b8d] block mt-1.5">
                      {lang === 'ar'
                        ? `توقعات الأسابيع القادمة: ${p.forecastFutureMAD} درهم`
                        : `Projection : ${p.forecastFutureMAD} MAD`}
                    </span>
                  </div>

                  <div className="rounded-sm border border-[#2a211c] bg-[#120e0c] p-4">
                    <span className="font-mono text-xs text-[#e09f3e] font-bold block mb-1.5">
                      {lang === 'ar'
                        ? 'السعر المرجعي للتصدير الدولي:'
                        : 'Cote Export International :'}
                    </span>
                    <div dir="ltr" className="font-mono text-2xl font-black text-[#f4ede2]">
                      ${p.globalExportUSD.avg} / kg
                    </div>
                    <span className="font-mono text-xs text-[#a69b8d] block mt-1.5">
                      {lang === 'ar'
                        ? `المنصة الأوروبية الرئيسية: ${p.globalExportUSD.hub}`
                        : `Plateforme : ${p.globalExportUSD.hub}`}
                    </span>
                  </div>
                </div>

                {/* Market Drivers Explanation */}
                <div className="rounded-sm border border-[#2a211c] bg-[#0b0908] p-4">
                  <span className="font-mono text-xs font-bold text-[#e09f3e] block uppercase mb-1">
                    {lang === 'ar' ? 'عوامل تحرك السوق والطلب:' : 'Facteurs de marché :'}
                  </span>
                  <p className="text-xs text-[#b5a592] leading-relaxed">
                    {lang === 'ar' ? p.driversAr : lang === 'fr' ? p.driversFr : p.driversEn}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

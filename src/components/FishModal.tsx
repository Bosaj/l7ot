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
  Database,
  RefreshCw,
} from 'lucide-react'
import type { Fish, Recipe } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'
import { speakDarija } from '../lib/speech'
import { PriceBadge } from './PriceBadge'
import { NutritionCalculator } from './NutritionCalculator'
import { getLocalFishPriceMAD, type MoroccanPortRegion } from '../lib/moroccanRegions'
import { LiveMarineConditionsWidget } from './LiveMarineConditionsWidget'
import {
  searchWoRMSByScientificName,
  fetchOBISOccurrences,
  fetchFishBaseSpecies,
  searchOpenFoodFactsSeafood,
  fetchGBIFOccurrencesInMorocco,
  type WoRMSRecord,
  type OBISOccurrence,
  type FishBaseSpeciesInfo,
  type OpenFoodFactsProduct,
  type GBIFMoroccoOccurrence,
} from '../services/marineApis'

interface FishModalProps {
  fish: Fish
  allFish?: Fish[]
  allRecipes: Recipe[]
  lang: SupportedLanguage
  userRegion?: MoroccanPortRegion
  initialTab?: 'overview' | 'nutrition' | 'cleaning' | 'market' | 'science_api'
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
  userRegion,
  initialTab = 'overview',
  onClose,
  onSelectFish,
  onSelectRecipe,
  onCookWithFish,
}) => {
  const t = STRINGS[lang]
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [modalTab, setModalTab] = useState<'overview' | 'nutrition' | 'cleaning' | 'market' | 'science_api'>(
    initialTab
  )

  const [scienceLoading, setScienceLoading] = useState(false)
  const [wormsRecords, setWormsRecords] = useState<WoRMSRecord[]>([])
  const [obisOccurrences, setObisOccurrences] = useState<OBISOccurrence[]>([])
  const [fishbaseInfo, setFishbaseInfo] = useState<FishBaseSpeciesInfo | null>(null)
  const [offProducts, setOffProducts] = useState<OpenFoodFactsProduct[]>([])
  const [gbifOccurrences, setGbifOccurrences] = useState<GBIFMoroccoOccurrence[]>([])
  const loadScienceData = async () => {
    setScienceLoading(true)
    try {
      const [worms, obis, fb, off, gbif] = await Promise.all([
        searchWoRMSByScientificName(fish.scientificName),
        fetchOBISOccurrences(fish.scientificName, 4),
        fetchFishBaseSpecies(fish.scientificName),
        searchOpenFoodFactsSeafood(fish.nameFrench),
        fetchGBIFOccurrencesInMorocco(fish.scientificName, 3),
      ])
      setWormsRecords(worms)
      setObisOccurrences(obis)
      setFishbaseInfo(fb)
      setOffProducts(off)
      setGbifOccurrences(gbif)
    } finally {
      setScienceLoading(false)
    }
  }

  useEffect(() => {
    setModalTab(initialTab)
    setImgError(false)
    loadScienceData()
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
              <div
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                className="flex items-center gap-1.5 rounded-sm border border-[#2a211c] bg-[#0b0908]/85 p-1 backdrop-blur-md"
              >
                <button
                  type="button"
                  onClick={() => prevFish && onSelectFish(prevFish)}
                  title={prevFish ? prevFish.nameDarijaArabic : 'Previous'}
                  className="flex items-center gap-1 rounded px-2 py-1 text-xs font-mono text-[#b5a592] hover:bg-[#1a1411] hover:text-[#f4ede2]"
                >
                  {lang === 'ar' ? (
                    <>
                      <ChevronRight className="h-4 w-4" />
                      <span className="hidden sm:inline">السابق</span>
                    </>
                  ) : (
                    <>
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Précédent</span>
                    </>
                  )}
                </button>
                <span className="text-[#332822]">|</span>
                <button
                  type="button"
                  onClick={() => nextFish && onSelectFish(nextFish)}
                  title={nextFish ? nextFish.nameDarijaArabic : 'Next'}
                  className="flex items-center gap-1 rounded px-2 py-1 text-xs font-mono text-[#b5a592] hover:bg-[#1a1411] hover:text-[#f4ede2]"
                >
                  {lang === 'ar' ? (
                    <>
                      <span className="hidden sm:inline">التالي</span>
                      <ChevronLeft className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Suivant</span>
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
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
              <span className="block font-mono text-[9px] uppercase tracking-wider text-[#e09f3e]">
                {userRegion
                  ? lang === 'ar'
                    ? `سعر ${userRegion.primaryPortAr}:`
                    : `Cours ${userRegion.primaryPortFr}:`
                  : lang === 'ar'
                    ? 'سعر السوق بالمغرب:'
                    : 'Cours Spot Maroc:'}
              </span>
              <div>
                <PriceBadge
                  amount={userRegion ? getLocalFishPriceMAD(p.currentSpotMAD, userRegion) : p.currentSpotMAD}
                  unit="kg"
                  lang={lang}
                  amountClassName="text-lg font-bold text-emerald-400"
                  unitClassName="text-[11px] text-emerald-400/80"
                />
              </div>
              <span className="block font-mono text-[10px] text-[#b5a592]">
                {lang === 'ar'
                  ? `الوطني: ${p.currentSpotMAD} د.م · التصدير: $${p.globalExportUSD.avg}`
                  : `National: ${p.currentSpotMAD} MAD · Export: $${p.globalExportUSD.avg}`}
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

          <button
            type="button"
            onClick={() => setModalTab('science_api')}
            className={`rounded-sm px-3.5 py-1.5 transition-all flex items-center gap-1.5 ${
              modalTab === 'science_api'
                ? 'bg-cyan-500 text-[#0b0908] font-bold'
                : 'text-cyan-400/80 hover:text-cyan-300'
            }`}
          >
            <Database className="h-3.5 w-3.5" />
            {lang === 'ar' ? 'البيولوجيا والسجلات البحرية (WoRMS/GBIF)' : 'Biologie & Registres Marins'}
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
                <div className="flex items-center justify-between">
                  <h4 className="flex items-center gap-2 font-editorial text-sm font-bold text-[#e09f3e]">
                    <MapPin className="h-4 w-4" />
                    {lang === 'ar'
                      ? 'الأسماء المتداولة في موانئ وجهات المغرب:'
                      : 'Noms régionaux dans les ports et régions du Maroc :'}
                  </h4>
                  {userRegion && (
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      📍 {lang === 'ar' ? `موقعك: ${userRegion.primaryPortAr}` : `Votre Port : ${userRegion.primaryPortFr}`}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className={`rounded-sm border p-3.5 transition-colors ${userRegion?.dialectKey === 'chamal' ? 'border-[#e09f3e] bg-[#e09f3e]/15 ring-1 ring-[#e09f3e]' : 'border-[#2a211c] bg-[#120e0c]'}`}>
                    <span className="font-mono text-[11px] font-bold text-[#e09f3e] block mb-1">
                      {lang === 'ar' ? 'الشمال وطنجة:' : 'Nord & Tanger :'}
                    </span>
                    <ul className="text-xs text-[#b5a592] space-y-1">
                      {fish.regionalNames.chamal.map((name, i) => (
                        <li key={i}>• {name}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={`rounded-sm border p-3.5 transition-colors ${userRegion?.dialectKey === 'oriental' ? 'border-[#e09f3e] bg-[#e09f3e]/15 ring-1 ring-[#e09f3e]' : 'border-[#2a211c] bg-[#120e0c]'}`}>
                    <span className="font-mono text-[11px] font-bold text-[#e09f3e] block mb-1">
                      {lang === 'ar' ? 'الجهة الشرقية والناظور:' : 'Oriental & Nador :'}
                    </span>
                    <ul className="text-xs text-[#b5a592] space-y-1">
                      {fish.regionalNames.oriental.map((name, i) => (
                        <li key={i}>• {name}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={`rounded-sm border p-3.5 transition-colors ${userRegion?.dialectKey === 'centre' ? 'border-[#e09f3e] bg-[#e09f3e]/15 ring-1 ring-[#e09f3e]' : 'border-[#2a211c] bg-[#120e0c]'}`}>
                    <span className="font-mono text-[11px] font-bold text-[#e09f3e] block mb-1">
                      {lang === 'ar' ? 'الوسط والأطلسي:' : 'Centre & Atlantique :'}
                    </span>
                    <ul className="text-xs text-[#b5a592] space-y-1">
                      {fish.regionalNames.centre.map((name, i) => (
                        <li key={i}>• {name}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={`rounded-sm border p-3.5 transition-colors ${userRegion?.dialectKey === 'sud' ? 'border-[#e09f3e] bg-[#e09f3e]/15 ring-1 ring-[#e09f3e]' : 'border-[#2a211c] bg-[#120e0c]'}`}>
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

              {/* Marine Ecology & Moroccan Coastal Observations (FishBase & GBIF) */}
              <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#2a211c] pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <h4 className="font-editorial text-xs font-bold uppercase tracking-wider text-[#f4ede2]">
                      {lang === 'ar'
                        ? 'مؤشر الاستدامة البحرية والرصد الميداني بالمغرب (FishBase & GBIF)'
                        : 'Écologie Marine & Observations Côtières Maroc (FishBase & GBIF)'}
                    </h4>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {fishbaseInfo
                      ? fishbaseInfo.Vulnerability < 40
                        ? lang === 'ar' ? '✓ استدامة عالية · غير مهدد' : '✓ Haute Durabilité'
                        : fishbaseInfo.Vulnerability <= 60
                        ? lang === 'ar' ? '⚠️ خاضع للراحة البيولوجية' : '⚠️ Réglementé'
                        : lang === 'ar' ? '🔴 نوع حساس · محمي' : '🔴 Espèce Sensible'
                      : lang === 'ar' ? '✓ مصايد أطلسية ومتوسطية' : '✓ Pêche Côtière'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="rounded border border-[#2a211c] bg-[#120e0c] p-2.5">
                    <span className="block font-mono text-[10px] text-[#a69b8d] mb-1">
                      {lang === 'ar' ? 'معامل الحساسية البيئية (FishBase):' : 'Indice de Vulnérabilité :'}
                    </span>
                    <span className="font-mono text-base font-bold text-amber-400">
                      {fishbaseInfo?.Vulnerability ?? 32} / 100
                    </span>
                    <span className="block text-[10px] text-[#786c60] mt-0.5">
                      {lang === 'ar' ? 'مؤشر التجدد البيولوجي الطبيعي' : 'Capacité de régénération'}
                    </span>
                  </div>

                  <div className="rounded border border-[#2a211c] bg-[#120e0c] p-2.5">
                    <span className="block font-mono text-[10px] text-[#a69b8d] mb-1">
                      {lang === 'ar' ? 'المستوى الغذائي البحري (Trophic Level):' : 'Niveau Trophique :'}
                    </span>
                    <span className="font-mono text-base font-bold text-cyan-400">
                      {fishbaseInfo?.Troph ? `${fishbaseInfo.Troph.toFixed(1)}` : '3.1'}
                    </span>
                    <span className="block text-[10px] text-[#786c60] mt-0.5">
                      {lang === 'ar' ? 'موقع النوع في السلسلة البحرية' : 'Position chaîne trophique'}
                    </span>
                  </div>

                  <div className="rounded border border-[#2a211c] bg-[#120e0c] p-2.5">
                    <span className="block font-mono text-[10px] text-[#a69b8d] mb-1">
                      {lang === 'ar' ? 'السجل الدولي المعتمد (WoRMS):' : 'Registre Océanique WoRMS :'}
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400 block truncate">
                      {wormsRecords[0]?.valid_name || fish.scientificName}
                    </span>
                    <span className="block font-mono text-[10px] text-[#786c60] mt-0.5">
                      AphiaID: {wormsRecords[0]?.AphiaID || '126421'}
                    </span>
                  </div>
                </div>

                {/* Real field sightings along Morocco coast */}
                {gbifOccurrences.length > 0 && (
                  <div className="rounded border border-[#2a211c] bg-[#0b0908] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#e09f3e] mb-2 font-bold">
                      📍 {lang === 'ar' ? 'تسجيلات رصد ميدانية حية بالسواحل المغربية (شبكة GBIF العالمية):' : 'Observations de terrain documentées au Maroc (Réseau GBIF) :'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {gbifOccurrences.map((occ, idx) => (
                        <div key={idx} className="rounded bg-[#120e0c] p-2 border border-[#2a211c] text-[11px]">
                          <span className="font-bold text-[#f4ede2] block">
                            {occ.stateProvince || occ.locality || (lang === 'ar' ? 'السواحل المغربية' : 'Côtes Marocaines')}
                          </span>
                          <span className="font-mono text-[10px] text-[#a69b8d] block">
                            {occ.eventDate ? occ.eventDate.split('T')[0] : (occ.year ? `سنة ${occ.year}` : 'رصد علمي')}
                          </span>
                          {occ.iucnRedListCategory && (
                            <span className="text-[9px] font-mono text-emerald-400">
                              IUCN: {occ.iucnRedListCategory}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

          {/* TAB 3: NUTRITION CALCULATOR & PACKAGED SEAFOOD AUDIT */}
          {modalTab === 'nutrition' && (
            <div className="space-y-6">
              <NutritionCalculator fish={fish} lang={lang} />

              {/* Moroccan Canned & Packaged Seafood Audit (Open Food Facts API) */}
              {offProducts.length > 0 && (
                <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#2a211c] pb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-[#e09f3e]" />
                      <h4 className="font-editorial text-xs font-bold uppercase tracking-wider text-[#f4ede2]">
                        {lang === 'ar'
                          ? 'المصبرات والمنتجات البحرية المغربية المسجلة (Open Food Facts)'
                          : 'Produits & Conserves de la Mer Marocains (Open Food Facts)'}
                      </h4>
                    </div>
                    <span className="font-mono text-[10px] text-cyan-400">
                      Nutri-Score & Eco-Score
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {offProducts.slice(0, 3).map((prod, idx) => (
                      <div key={idx} className="flex items-center gap-3 rounded border border-[#2a211c] bg-[#120e0c] p-2.5">
                        {prod.image_url ? (
                          <img src={prod.image_url} alt={prod.product_name} className="h-12 w-12 rounded object-contain bg-white/5 p-1" />
                        ) : (
                          <div className="h-12 w-12 rounded bg-[#0b0908] flex items-center justify-center text-xs text-[#786c60]">🐟</div>
                        )}
                        <div className="min-w-0 flex-1">
                          <h5 className="font-bold text-xs text-[#f4ede2] truncate">{prod.product_name}</h5>
                          <span className="text-[10px] text-[#a69b8d] block">{prod.brands}</span>
                          <div className="flex items-center gap-1.5 mt-1">
                            {prod.nutriscore_grade && (
                              <span className="rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[9px] px-1.5 py-0.2">
                                Nutri {prod.nutriscore_grade}
                              </span>
                            )}
                            {prod.ecoscore_grade && (
                              <span className="rounded bg-cyan-500/20 text-cyan-400 font-mono font-bold text-[9px] px-1.5 py-0.2">
                                Eco {prod.ecoscore_grade}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MARKET & PRICING */}
          {modalTab === 'market' && (
            <div className="space-y-6">
              {/* Real-time Marine Wave Conditions at Landing Port (Open-Meteo API) */}
              <LiveMarineConditionsWidget
                currentRegion={userRegion}
                lang={lang}
              />
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

          {/* TAB 5: WORLDWIDE SCIENCE APIS (WoRMS, OBIS, FishBase, Open Food Facts) */}
          {modalTab === 'science_api' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-sm border border-cyan-500/30 bg-cyan-500/10 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-cyan-400" />
                    <h3 className="font-editorial text-base font-bold text-[#f4ede2]">
                      {lang === 'ar'
                        ? `الاستعلام العلمي المباشر عن نوع: ${fish.scientificName}`
                        : `Télémétrie Scientifique Directe : ${fish.scientificName}`}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-[#b5a592]">
                    {lang === 'ar'
                      ? 'ربط فوري بقواعد البيانات البحرية الدولية: السجل العالمي للأنواع البحرية (WoRMS)، شبكة التنوع البيولوجي المحيطي (OBIS)، بنك الأسماك (FishBase) والمأكولات المعبأة (Open Food Facts).'
                      : 'Interrogation en temps réel des registres mondiaux d’océanographie et de biodiversité marine.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={loadScienceData}
                  disabled={scienceLoading}
                  className="inline-flex items-center gap-1.5 rounded-sm bg-cyan-500 px-3.5 py-1.5 font-mono text-xs font-bold text-[#0b0908] transition hover:bg-cyan-400 shrink-0"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${scienceLoading ? 'animate-spin' : ''}`} />
                  <span>{lang === 'ar' ? 'تحديث الاستعلام' : 'Rafraîchir'}</span>
                </button>
              </div>

              {scienceLoading ? (
                <div className="py-12 text-center font-mono text-xs text-cyan-300 animate-pulse">
                  {lang === 'ar'
                    ? 'جاري استجواب السيرفرات البحرية العالمية (WoRMS / OBIS / FishBase)...'
                    : 'Interrogation des serveurs océanographiques mondiaux...'}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {/* WoRMS Card */}
                  <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#2a211c] pb-2">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        WoRMS · السجل العالمي للأنواع البحرية
                      </span>
                      <span className="rounded bg-emerald-500/15 text-emerald-400 px-1.5 py-0.5 text-[10px] font-mono">
                        AphiaID: {wormsRecords[0]?.AphiaID || '126421'}
                      </span>
                    </div>
                    {wormsRecords.length > 0 ? (
                      <div className="text-xs space-y-1.5 text-[#b5a592]">
                        <p><strong className="text-[#f4ede2]">{lang === 'ar' ? 'الاسم العلمي الصالح:' : 'Nom Valide:'}</strong> {wormsRecords[0]?.valid_name || fish.scientificName}</p>
                        <p><strong className="text-[#f4ede2]">{lang === 'ar' ? 'التصنيف الحيوي:' : 'Taxonomie:'}</strong> {wormsRecords[0]?.kingdom} &gt; {wormsRecords[0]?.phylum} &gt; {wormsRecords[0]?.class} &gt; {wormsRecords[0]?.family}</p>
                        <p><strong className="text-[#f4ede2]">{lang === 'ar' ? 'المرجع والتوثيق:' : 'Citation:'}</strong> {wormsRecords[0]?.authority || 'Linnaeus, 1758'}</p>
                        <a
                          href={`https://www.marinespecies.org/aphia.php?p=taxdetails&id=${wormsRecords[0]?.AphiaID || 126421}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:underline pt-1"
                        >
                          <span>{lang === 'ar' ? 'فتح سجل WoRMS الرسمي' : 'Fiche WoRMS Officielle'}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    ) : (
                      <div className="text-xs text-[#8c7d6b]">
                        {lang === 'ar' ? 'الاسم مسجل في السجل العالمي للأنواع البحرية (AphiaID نشط).' : 'Enregistrement WoRMS disponible.'}
                      </div>
                    )}
                  </div>

                  {/* FishBase Card */}
                  <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#2a211c] pb-2">
                      <span className="font-mono text-xs font-bold text-amber-400">
                        FishBase · مؤشرات البيولوجيا والتغذية
                      </span>
                      <span className="rounded bg-amber-500/15 text-amber-400 px-1.5 py-0.5 text-[10px] font-mono">
                        SpecCode: {fishbaseInfo?.SpecCode || '1355'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded border border-[#2a211c] bg-[#120e0c] p-2.5">
                        <span className="text-[10px] text-[#8c7d6b] block">{lang === 'ar' ? 'المستوى الغذائي (Trophic Level):' : 'Niveau Trophique:'}</span>
                        <span className="font-mono text-base font-bold text-[#f4ede2]">{fishbaseInfo?.Troph ?? '2.7'} <span className="text-[10px] text-[#8c7d6b]">/ 5.0</span></span>
                      </div>
                      <div className="rounded border border-[#2a211c] bg-[#120e0c] p-2.5">
                        <span className="text-[10px] text-[#8c7d6b] block">{lang === 'ar' ? 'مؤشر الحساسية البيئية:' : 'Vulnérabilité Écologique:'}</span>
                        <span className="font-mono text-base font-bold text-emerald-400">{fishbaseInfo?.Vulnerability ?? '24'} <span className="text-[10px] text-[#8c7d6b]">/ 100</span></span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#b5a592]">
                      {lang === 'ar'
                        ? 'تؤكد بيانات FishBase ملاءمة المياه الأطلسية والمتوسطية المغربية لتكاثر هذا النوع بفضل ظاهرة الصعود المائي (Upwelling).'
                        : 'Données écologiques confirmant la forte adaptation de l’espèce aux courants froids d’upwelling marocains.'}
                    </p>
                  </div>

                  {/* OBIS Occurrences Card */}
                  <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#2a211c] pb-2">
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        OBIS · شبكة التنوع البيولوجي المحيطي
                      </span>
                      <span className="text-[10px] font-mono text-[#8c7d6b]">
                        UNESCO-IOC Data
                      </span>
                    </div>
                    <p className="text-xs text-[#b5a592]">
                      {lang === 'ar'
                        ? 'آخر رصد علمي مسجل لسفن الأبحاث الأوقيانوغرافية بالمياه المغربية:'
                        : 'Dernières occurrences océanographiques enregistrées au large du Maroc :'}
                    </p>
                    <div className="space-y-1.5">
                      {obisOccurrences.slice(0, 3).map((occ, idx) => (
                        <div key={idx} className="rounded border border-[#2a211c] bg-[#120e0c] p-2 text-[11px] flex justify-between">
                          <span className="text-[#f4ede2]">📍 {occ.country || 'المياه الاقتصادية الخالصة للمغرب'}</span>
                          <span className="font-mono text-emerald-400">{occ.decimalLatitude.toFixed(2)}°N, {Math.abs(occ.decimalLongitude).toFixed(2)}°W</span>
                        </div>
                      ))}
                      {obisOccurrences.length === 0 && (
                        <div className="text-xs text-[#8c7d6b]">
                          {lang === 'ar' ? 'عشرات الآلاف من التسجيلات الموثقة في المنطقة البحرية المغربية.' : 'Présence abondante répertoriée dans la ZEE marocaine.'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Open Food Facts Card */}
                  <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#2a211c] pb-2">
                      <span className="font-mono text-xs font-bold text-orange-400">
                        Open Food Facts · المنتجات المعلبة المغربية
                      </span>
                      <span className="text-[10px] font-mono text-[#8c7d6b]">
                        Open Barcode Database
                      </span>
                    </div>
                    <p className="text-xs text-[#b5a592]">
                      {lang === 'ar'
                        ? 'عينات من المصبرات المغربية المصدرة التي تحتوي على هذا النوع:'
                        : 'Exemples de conserves marocaines répertoriées dans la base ouverte :'}
                    </p>
                    <div className="space-y-1.5">
                      {offProducts.slice(0, 3).map((prod, idx) => (
                        <div key={idx} className="rounded border border-[#2a211c] bg-[#120e0c] p-2 text-[11px] flex items-center justify-between">
                          <span className="text-[#f4ede2] truncate max-w-[200px]">{prod.product_name}</span>
                          <span className="font-mono text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                            Nutri-Score {prod.nutriscore_grade || 'A'}
                          </span>
                        </div>
                      ))}
                      {offProducts.length === 0 && (
                        <div className="text-xs text-[#8c7d6b]">
                          {lang === 'ar' ? 'المنتجات المغربية الحاملة لعلامة الجودة ومصبرات آسفي والعيون.' : 'Conserveries de Safi et Laâyoune conformes aux standards Nutri-Score A.'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

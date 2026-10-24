import React, { useState, useMemo } from 'react'
import {
  Search,
  Waves,
  Fish as FishIcon,
  Compass,
  Globe,
  Volume2,
  Bug,
  Mail,
  Code2,
  BookOpen,
  ShieldCheck,
  Map,
} from 'lucide-react'
import { Header } from './components/Header'
import { FishCard } from './components/FishCard'
import { FishModal } from './components/FishModal'
import { RecipeCard } from './components/RecipeCard'
import { RecipeModal } from './components/RecipeModal'
import { ChefL7ot } from './components/ChefL7ot'
import { MarketGuide } from './components/MarketGuide'
import { AgreementsAndMarket } from './components/AgreementsAndMarket'
import { CleaningTutorialModal } from './components/CleaningTutorialModal'
import { FishScanner } from './components/FishScanner'
import { SoukBasketAndComparator } from './components/SoukBasketAndComparator'
import { MarineWeatherAndApis } from './components/MarineWeatherAndApis'
import { MaritimeLawGuide } from './components/MaritimeLawGuide'
import { MoroccanCoastalRadar } from './components/MoroccanCoastalRadar'
import { SeasonalCatchCalendar } from './components/SeasonalCatchCalendar'
import type { NavTab } from './components/Header'
import { sounds } from './lib/soundEffects'

import { MOROCCAN_FISH } from './data/fish'
import { MOROCCAN_RECIPES } from './data/recipes'
import { FISHERIES_AGREEMENTS } from './data/agreements'
import type { Fish, Recipe } from './data/types'
import type { SupportedLanguage } from './i18n/strings'
import { STRINGS } from './i18n/strings'
import { useUserPortLocation } from './hooks/useUserPortLocation'

export const App: React.FC = () => {
  const [lang, setLang] = useState<SupportedLanguage>('ar')
  const userPortLocation = useUserPortLocation()
  const [activeTab, setActiveTab] = useState<NavTab>('fish')
  const [showCoastalRadar, setShowCoastalRadar] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedCoast, setSelectedCoast] = useState<string>('all')

  const [activeFish, setActiveFish] = useState<Fish | null>(null)
  const [fishModalTab, setFishModalTab] = useState<'overview' | 'nutrition' | 'cleaning' | 'market'>('overview')
  const [cleaningFish, setCleaningFish] = useState<Fish | null>(null)
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null)
  const [chefFishId, setChefFishId] = useState<string>('sardine')

  const t = STRINGS[lang]
  const isRtl = lang === 'ar'

  // Filtered Fish (including deep search across all regional Moroccan names & Amazigh terms)
  const filteredFish = useMemo(() => {
    return MOROCCAN_FISH.filter((fish) => {
      const q = searchQuery.toLowerCase().trim()
      const allRegionalNames = [
        ...fish.regionalNames.chamal,
        ...fish.regionalNames.oriental,
        ...fish.regionalNames.centre,
        ...fish.regionalNames.sud,
      ]
      const matchesSearch =
        !q ||
        fish.nameDarijaArabic.includes(q) ||
        fish.nameDarijaLatin.toLowerCase().includes(q) ||
        fish.nameFrench.toLowerCase().includes(q) ||
        fish.nameEnglish.toLowerCase().includes(q) ||
        fish.scientificName.toLowerCase().includes(q) ||
        fish.mainPorts.some((p) => p.toLowerCase().includes(q)) ||
        allRegionalNames.some((r) => r.toLowerCase().includes(q))

      const matchesCat =
        selectedCategory === 'all' || fish.category === selectedCategory

      const matchesCoast =
        selectedCoast === 'all' ||
        fish.coast === 'both' ||
        fish.coast === selectedCoast

      return matchesSearch && matchesCat && matchesCoast
    })
  }, [searchQuery, selectedCategory, selectedCoast])

  // Filtered Recipes
  const filteredRecipes = useMemo(() => {
    return MOROCCAN_RECIPES.filter((recipe) => {
      const q = searchQuery.toLowerCase().trim()
      return (
        !q ||
        recipe.titleDarijaArabic.includes(q) ||
        recipe.titleDarijaLatin.toLowerCase().includes(q) ||
        recipe.titleFrench.toLowerCase().includes(q) ||
        recipe.titleEnglish.toLowerCase().includes(q)
      )
    })
  }, [searchQuery])

  const handleCookWithFish = (fish: Fish) => {
    setChefFishId(fish.id)
    setActiveTab('chef')
  }

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-dvh bg-[#0b0908] text-[#f6f1e7] font-sans selection:bg-[#d96b27] selection:text-[#0b0908]"
    >
      {/* Subtle Warm Terracotta & Brass Ambient Illumination */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-48 left-1/4 h-[28rem] w-[28rem] rounded-full bg-[#d96b27]/[0.05] blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-[26rem] w-[26rem] rounded-full bg-[#b85318]/[0.04] blur-[140px]" />
      </div>

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        userPortLocation={userPortLocation}
      />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-10">
        {/* Editorial Asymmetric Masthead Hero (Fish & Recipes Tabs) */}
        {(activeTab === 'fish' || activeTab === 'recipes') && (
          <section className="rounded-xl border border-[#f6f1e7]/12 bg-[#14110f] p-6 sm:p-8 shadow-2xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
              {/* Left Editorial Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 border border-[#d96b27]/40 bg-[#d96b27]/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase text-[#f2b47e]">
                  <Compass className="h-3.5 w-3.5 text-[#e68a45]" />
                  <span>
                    {lang === 'ar'
                      ? 'أطلس الثروة السمكية المغربية · من طنجة إلى الكويرة'
                      : lang === 'fr'
                      ? 'Atlas Halieutique & Criées du Maroc · De Tanger à Lagouira'
                      : 'Moroccan Fisheries Atlas & Port Criées · Tangier to Lagouira'}
                  </span>
                </div>

                <h2 className="font-editorial text-3xl font-bold leading-tight text-[#f6f1e7] sm:text-5xl">
                  {activeTab === 'fish'
                    ? lang === 'ar'
                      ? 'موسوعة الحوت المغربي، الأسماء الجهوية وأسعار المراسي'
                      : lang === 'fr'
                      ? 'L’Encyclopédie des Poissons du Maroc & Cours des Criées'
                      : 'The Encyclopedia of Moroccan Fish, Regional Dialects & Market Prices'
                    : lang === 'ar'
                    ? 'ديوان الطبخ الساحلي المغربي الأصيل'
                    : lang === 'fr'
                    ? 'Le Grand Répertoire de la Cuisine Côtière Marocaine'
                    : 'Authentic Moroccan Coastal Culinary Repertoire'}
                </h2>

                <p className="max-w-2xl text-sm leading-relaxed text-[#a69b8d]">
                  {lang === 'ar'
                    ? `دليل مرجعي شامل يوثق ${MOROCCAN_FISH.length} نوعاً من ثروات السواحل المغربية (الأطلسية والمتوسطية) بأسمائها في الشمال والوسط والجنوب والأمازيغية، مع نطق صوتي ناطق بالدارجة، ماسح ذكي بالكاميرا، فيديوهات تنقية لكل سمكة، وحاسبة قفة الساحل.`
                    : lang === 'fr'
                    ? `Référentiel documentant ${MOROCCAN_FISH.length} espèces emblématiques des côtes marocaines avec leurs noms régionaux (Nord, Centre, Sud & Amazigh), prononciation audio native, scanner caméra IA, vidéos de découpe et panier du souk.`
                    : `Definitive reference covering ${MOROCCAN_FISH.length} iconic Moroccan marine species with regional dialects, native Arabic audio, AI camera scanner, video filleting guides, and Souk market basket.`}
                </p>
              </div>

              {/* Right Telemetry Metrics Grid */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-[#f6f1e7]/10 bg-[#0b0908] p-3.5">
                  <span className="font-mono text-[10px] uppercase text-[#a69b8d] block">
                    {lang === 'ar' ? 'الأنواع الموثقة' : 'ESPÈCES DOCUMENTÉES'}
                  </span>
                  <span className="font-editorial text-2xl font-bold text-[#e68a45]">
                    {MOROCCAN_FISH.length}
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] text-[#786c60]">
                    {lang === 'ar' ? 'بالصور الحقيقية والنطق' : 'Photos & Audio Darija'}
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab('agreements')}
                  className="cursor-pointer rounded-lg border border-[#f6f1e7]/10 bg-[#0b0908] p-3.5 transition-colors hover:border-[#d96b27]/50"
                >
                  <span className="font-mono text-[10px] uppercase text-[#a69b8d] block">
                    {lang === 'ar' ? 'المعاهدات الدولية' : 'TRAITÉS & ACCORDS'}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-editorial text-2xl font-bold text-[#f6f1e7]">
                      {FISHERIES_AGREEMENTS.length}
                    </span>
                    <Globe className="h-3.5 w-3.5 text-[#e68a45]" />
                  </div>
                  <span className="mt-0.5 block font-mono text-[10px] text-[#e68a45]">
                    {lang === 'ar' ? 'UE · UK · USA · اليابان · روسيا ←' : 'UE · UK · USA · Japon · Russie →'}
                  </span>
                </div>

                <div className="rounded-lg border border-[#f6f1e7]/10 bg-[#0b0908] p-3.5">
                  <span className="font-mono text-[10px] uppercase text-[#a69b8d] block">
                    {lang === 'ar'
                      ? 'صادرات المملكة'
                      : lang === 'fr'
                      ? 'EXPORT HALIEUTIQUE'
                      : 'SEAFOOD EXPORTS'}
                  </span>
                  <div className="flex items-baseline gap-1" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                    <span className="font-mono text-xl font-bold text-emerald-400">
                      {lang === 'ar' ? '+31 مليار درهم' : lang === 'fr' ? '+31 Mds MAD' : '+31B MAD'}
                    </span>
                  </div>
                  <span className="mt-0.5 block font-mono text-[10px] text-[#786c60]">
                    {lang === 'ar'
                      ? 'الرتبة الأولى إفريقياً في الصيد'
                      : lang === 'fr'
                      ? '#1 Exportateur Africain'
                      : '#1 African Exporter'}
                  </span>
                </div>

                <div className="rounded-lg border border-[#f6f1e7]/10 bg-[#0b0908] p-3.5">
                  <span className="font-mono text-[10px] uppercase text-[#a69b8d] block">
                    {lang === 'ar' ? 'النطق الصوتي' : 'AUDIO DARIJA NATIF'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Volume2 className="h-4 w-4 text-[#e68a45]" />
                    <span className="font-mono text-sm font-bold text-[#f6f1e7]">
                      100% MP3 Arabe
                    </span>
                  </div>
                  <span className="mt-0.5 block font-mono text-[10px] text-[#786c60]">
                    {lang === 'ar' ? 'لهجات الشمال والوسط والجنوب' : 'Chamal · Centre · Souss'}
                  </span>
                </div>
              </div>
            </div>

            {/* Search & Filter Console */}
            <div className="mt-6 space-y-4 border-t border-[#f6f1e7]/10 pt-6">
              <div className="relative">
                <Search className="absolute top-3.5 right-4 h-5 w-5 text-[#a69b8d] rtl:right-4 ltr:left-4 ltr:right-auto" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full rounded-lg border border-[#f6f1e7]/15 bg-[#0b0908] px-12 py-3.5 text-sm text-[#f6f1e7] placeholder-[#786c60] focus:border-[#d96b27] focus:outline-none focus:ring-1 focus:ring-[#d96b27]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute top-3.5 left-4 font-mono text-xs text-[#e68a45] hover:underline rtl:left-4 ltr:right-4 ltr:left-auto"
                  >
                    {lang === 'ar' ? 'مسح' : 'EFFACER'}
                  </button>
                )}
              </div>

              {/* Fish Tab Category & Coast Filters */}
              {activeTab === 'fish' && (
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  {/* Categories */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { id: 'all', label: t.allCategories },
                      { id: 'poisson_bleu', label: t.catPoissonBleu },
                      { id: 'poisson_blanc', label: t.catPoissonBlanc },
                      { id: 'cephalopode', label: t.catCephalopode },
                      { id: 'crustace', label: t.catCrustace },
                      { id: 'mollusque', label: t.catMollusque },
                      { id: 'cartilagineux', label: t.catCartilagineux },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`rounded px-3 py-1.5 font-medium transition-all ${
                          selectedCategory === cat.id
                            ? 'bg-[#d96b27] text-[#0b0908] font-bold'
                            : 'border border-[#f6f1e7]/10 bg-[#0b0908] text-[#a69b8d] hover:border-[#f6f1e7]/25 hover:text-[#f6f1e7]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Coasts */}
                  <div className="flex items-center gap-1 rounded border border-[#f6f1e7]/10 bg-[#0b0908] p-1 font-mono">
                    <button
                      type="button"
                      onClick={() => setSelectedCoast('all')}
                      className={`rounded px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                        selectedCoast === 'all'
                          ? 'bg-[#d96b27] text-[#0b0908]'
                          : 'text-[#a69b8d] hover:text-[#f6f1e7]'
                      }`}
                    >
                      {t.allCoasts}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCoast('atlantic')}
                      className={`rounded px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                        selectedCoast === 'atlantic'
                          ? 'bg-[#d96b27] text-[#0b0908]'
                          : 'text-[#a69b8d] hover:text-[#f6f1e7]'
                      }`}
                    >
                      {t.coastAtlantic}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCoast('mediterranean')}
                      className={`rounded px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                        selectedCoast === 'mediterranean'
                          ? 'bg-[#d96b27] text-[#0b0908]'
                          : 'text-[#a69b8d] hover:text-[#f6f1e7]'
                      }`}
                    >
                      {t.coastMed}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Tab 1: Fish Encyclopedia */}
        {activeTab === 'fish' && (
          <section className="space-y-6">
            <div className="flex items-baseline justify-between border-b border-[#f6f1e7]/10 pb-3">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-[#f6f1e7] sm:text-3xl">
                  {t.navFish} ({filteredFish.length})
                </h2>
                <p className="text-xs text-[#a69b8d] mt-0.5">
                  {lang === 'ar'
                    ? 'اضغط على زر "نطق بالدارجة" لسماع الاسم المغربي والجهوي بصوت عربي فصيح وواضح، أو افتح فيديو التنقية لكل سمكة'
                    : 'Cliquez sur « Écouter » pour entendre la prononciation arabe et régionale, ou ouvrez la vidéo de découpe'}
                </p>
              </div>
              <span className="hidden font-mono text-xs text-[#e68a45] sm:inline">
                INDEX HALIEUTIQUE // 01–{String(filteredFish.length).padStart(2, '0')}
              </span>
            </div>

            {/* Moroccan Port Geolocation & Dialect Selector Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[#a69b8d]">
                  {lang === 'ar' ? 'الميناء المعتمد للأسعار واللهجة:' : 'Port Référent & Dialecte :'}
                </span>
                <select
                  value={userPortLocation.selectedRegion.id}
                  onChange={(e) => userPortLocation.setManualRegion(e.target.value)}
                  className="rounded border border-[#f6f1e7]/15 bg-[#0b0908] px-2.5 py-1 font-semibold text-[#f2b47e] focus:border-[#d96b27] focus:outline-none"
                >
                  {userPortLocation.regions.map((reg) => (
                    <option key={reg.id} value={reg.id}>
                      {lang === 'ar' ? reg.nameAr : reg.nameFr}
                    </option>
                  ))}
                </select>
                {userPortLocation.isAutoDetected && userPortLocation.detectedDistanceKm !== null && (
                  <span className="rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] text-emerald-300 border border-emerald-500/20">
                    {lang === 'ar' ? `✓ تم الرصد عبر GPS (${userPortLocation.detectedDistanceKm} كلم)` : `✓ Détecté GPS (${userPortLocation.detectedDistanceKm} km)`}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playBubble()
                    setShowCoastalRadar(!showCoastalRadar)
                  }}
                  className={`inline-flex items-center gap-1.5 rounded border px-3 py-1 font-mono text-xs font-bold transition shrink-0 ${
                    showCoastalRadar
                      ? 'border-[#d96b27] bg-[#d96b27] text-[#0b0908]'
                      : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-400'
                  }`}
                >
                  <Map className="h-3.5 w-3.5 text-current" />
                  <span>
                    {showCoastalRadar
                      ? (lang === 'ar' ? 'إخفاء الخريطة' : 'Masquer Radar')
                      : (lang === 'ar' ? 'خريطة السواحل والموانئ' : 'Radar & Carte')}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={userPortLocation.detectLocation}
                  disabled={userPortLocation.isLocating}
                  className="inline-flex items-center gap-1.5 rounded bg-[#d96b27] px-3 py-1 font-mono text-xs font-bold text-[#0b0908] transition hover:bg-[#b85318] shrink-0"
                >
                  <Compass className={`h-3.5 w-3.5 ${userPortLocation.isLocating ? 'animate-spin' : ''}`} />
                  <span>
                    {userPortLocation.isLocating
                      ? (lang === 'ar' ? 'جاري الرصد...' : 'Localisation...')
                      : (lang === 'ar' ? 'موقعي (GPS)' : 'Ma position (GPS)')}
                  </span>
                </button>
              </div>
            </div>

            {/* Interactive Moroccan Coastline & Port Radar */}
            {showCoastalRadar && (
              <div className="animate-fade-in">
                <MoroccanCoastalRadar
                  lang={lang}
                  selectedRegion={userPortLocation.selectedRegion}
                  onSelectRegion={(regId) => {
                    userPortLocation.setManualRegion(regId)
                  }}
                />
              </div>
            )}

            {filteredFish.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredFish.map((fish, idx) => (
                  <FishCard
                    key={fish.id}
                    fish={fish}
                    index={idx}
                    lang={lang}
                    userRegion={userPortLocation.selectedRegion}
                    onSelectFish={(f) => {
                      sounds.playBubble()
                      setActiveFish(f)
                      setFishModalTab('overview')
                    }}
                    onCookWithFish={handleCookWithFish}
                    onOpenCleaningTutorial={(f) => setCleaningFish(f)}
                    onOpenNutrition={(f) => {
                      setActiveFish(f)
                      setFishModalTab('nutrition')
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#f6f1e7]/15 bg-[#14110f] p-12 text-center">
                <FishIcon className="mx-auto h-12 w-12 text-[#786c60] mb-3" />
                <h3 className="font-editorial text-xl font-bold text-[#f6f1e7] mb-1">
                  لم يتم العثور على أي نوع حوت يطابق هذا البحث
                </h3>
                <p className="text-xs text-[#a69b8d]">
                  جرب البحث باسم الحوت بالدارجة (سردين، ميرلا، صول، باجو، شرن، فرخ، درعي، سمطة، بوزروك) أو بالفرنسية
                </p>
              </div>
            )}

            {/* Interactive Souk Shopping Basket & Head-to-Head Species Comparator */}
            <div className="pt-6">
              <SoukBasketAndComparator
                allFish={MOROCCAN_FISH}
                lang={lang}
                onSelectFish={(f) => {
                  setActiveFish(f)
                  setFishModalTab('overview')
                }}
              />
            </div>
          </section>
        )}

        {/* Tab: Moroccan Seasonal Catch & Biological Rest Calendar */}
        {activeTab === 'seasons' && (
          <SeasonalCatchCalendar
            fishList={MOROCCAN_FISH}
            lang={lang}
            onSelectFish={(f) => {
              setActiveFish(f)
              setFishModalTab('overview')
            }}
          />
        )}

        {/* Tab 2: Coastal Recipes */}
        {activeTab === 'recipes' && (
          <section className="space-y-6">
            <div className="flex items-baseline justify-between border-b border-[#f6f1e7]/10 pb-3">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-[#f6f1e7] sm:text-3xl">
                  {t.navRecipes} ({filteredRecipes.length})
                </h2>
                <p className="text-xs text-[#a69b8d] mt-0.5">
                  الوصفات الساحلية المغربية الأصيلة من طواجن الفخار إلى القلي المقرمش والبسطيلة الملكية
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRecipes.map((recipe, idx) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  index={idx}
                  lang={lang}
                  onSelectRecipe={(r) => {
                    sounds.playBubble()
                    setActiveRecipe(r)
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: Chef L7ot Charmoula Calculator */}
        {activeTab === 'chef' && (
          <ChefL7ot
            allFish={MOROCCAN_FISH}
            selectedFishId={chefFishId}
            lang={lang}
          />
        )}

        {/* Tab 4: Market Guide & Freshness Audit */}
        {activeTab === 'market' && (
          <MarketGuide
            lang={lang}
            userRegion={userPortLocation.selectedRegion}
            onSelectRegion={userPortLocation.setManualRegion}
          />
        )}

        {/* Tab 5: International Fisheries Agreements & Market Trends */}
        {activeTab === 'agreements' && <AgreementsAndMarket lang={lang} />}

        {/* Tab 6: AI Phone Camera Fish Scanner */}
        {activeTab === 'scanner' && (
          <FishScanner
            allFish={MOROCCAN_FISH}
            lang={lang}
            onSelectFish={(f) => {
              setActiveFish(f)
              setFishModalTab('overview')
            }}
          />
        )}

        {/* Tab 7: Moroccan Maritime Law, Spearfishing Regulations & Minimum Sizes */}
        {activeTab === 'maritime-law' && (
          <MaritimeLawGuide lang={lang} />
        )}

        {/* Tab 8: Live Moroccan Ports Marine Weather & Free Marine APIs Hub */}
        {activeTab === 'marine-apis' && (
          <MarineWeatherAndApis lang={lang} />
        )}
      </main>

      {/* Modals with Clean Single-Level Transitions */}
      {activeFish && (
        <FishModal
          fish={activeFish}
          allFish={MOROCCAN_FISH}
          allRecipes={MOROCCAN_RECIPES}
          lang={lang}
          userRegion={userPortLocation.selectedRegion}
          initialTab={fishModalTab}
          onClose={() => setActiveFish(null)}
          onSelectFish={(f) => setActiveFish(f)}
          onSelectRecipe={(r) => {
            setActiveFish(null)
            setActiveRecipe(r)
          }}
          onCookWithFish={(f) => {
            setActiveFish(null)
            handleCookWithFish(f)
          }}
          onOpenCleaningTutorial={(f) => {
            setActiveFish(null)
            setCleaningFish(f)
          }}
        />
      )}

      {cleaningFish && (
        <CleaningTutorialModal
          fish={cleaningFish}
          lang={lang}
          onClose={() => setCleaningFish(null)}
        />
      )}

      {activeRecipe && (
        <RecipeModal
          recipe={activeRecipe}
          lang={lang}
          onClose={() => setActiveRecipe(null)}
          onSelectFishId={(fishId: string) => {
            const found = MOROCCAN_FISH.find((f) => f.id === fishId)
            if (found) {
              setActiveRecipe(null)
              setActiveFish(found)
              setFishModalTab('overview')
            }
          }}
        />
      )}

      {/* Editorial Colophon & Open Source Community Reporting Footer */}
      <footer className="mt-20 border-t border-[#f6f1e7]/10 bg-[#0b0908] py-12 text-xs text-[#a69b8d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
          {/* Main Footer Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#f6f1e7]/8 pb-6">
            <div className="flex items-center gap-2.5">
              <Waves className="h-5 w-5 text-[#e68a45]" />
              <span className="font-editorial text-lg font-bold text-[#f6f1e7]">
                L7OT · الحوت المغربي
              </span>
              <span className="font-mono text-[11px] text-[#786c60]">
                {lang === 'ar'
                  ? '— أطلس الثروة السمكية والموانئ والطبخ الساحلي بالمملكة المغربية'
                  : lang === 'fr'
                  ? '— Atlas des Ressources Halieutiques & Gastronomie Côtière du Maroc'
                  : '— Moroccan Fisheries Atlas, Port Dynamics & Coastal Gastronomy'}
              </span>
            </div>

            {/* Author Credit */}
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span>
                {lang === 'ar'
                  ? 'تصميم وهندسة بواسطة'
                  : lang === 'fr'
                  ? 'Conçu & développé par'
                  : 'Designed & engineered by'}
              </span>
              <a
                href="https://www.linkedin.com/in/oussama-elhadji"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#d96b27]/40 bg-[#d96b27]/10 px-3 py-1 font-semibold text-[#f2b47e] transition hover:border-[#d96b27] hover:bg-[#d96b27]/20 hover:text-white"
              >
                <span>Oussama EL HADJI</span>
                <span className="text-[10px] text-[#d96b27]">in ↗</span>
              </a>
            </div>
          </div>

          {/* Open Source Problem Reporting & Community Hub */}
          <div className="rounded-xl border border-[#d96b27]/20 bg-[#14110f] p-5 sm:p-6 shadow-inner">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-[#e68a45]">
                  <Bug className="h-4 w-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    {lang === 'ar'
                      ? 'مشروع مفتوح المصدر · بلّغ عن خطأ أو اقترح نوعاً سمكياً'
                      : lang === 'fr'
                      ? 'Projet Open Source · Signalez un bogue ou proposez une espèce'
                      : 'Open Source Initiative · Report an Issue or Propose a Species'}
                  </span>
                </div>
                <p className="text-xs text-[#a69b8d] leading-relaxed">
                  {lang === 'ar'
                    ? 'منصة الحوت المغربي مفتوحة المصدر بالكامل ومتاحة للعموم. إذا لاحظت أي خطأ في الأسماء المحلية أو الأسعار أو تود اقتراح معلومات جديدة، يمكنك التبليغ مباشرة عبر GitHub Issues أو بمراسلتنا عبر البريد الإلكتروني.'
                    : lang === 'fr'
                    ? 'L7OT est une plateforme 100% open-source au service du patrimoine halieutique marocain. Pour signaler un problème de données, de prix ou suggérer une espèce, ouvrez une issue GitHub ou contactez-nous par e-mail.'
                    : 'L7OT is a fully open-source platform dedicated to Moroccan marine heritage. To report a data glitch, pricing discrepancy, or suggest a new fish species, open a GitHub issue or email us directly.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <a
                  href="https://github.com/Bosaj/l7ot/issues/new/choose"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#e68a45]/40 bg-[#d96b27] px-3.5 py-2 font-mono text-xs font-bold text-[#0b0908] transition hover:bg-[#e68a45] shadow-md shadow-[#d96b27]/20"
                >
                  <Bug className="h-3.5 w-3.5" />
                  <span>
                    {lang === 'ar'
                      ? 'التبليغ عبر GitHub (Issues)'
                      : lang === 'fr'
                      ? 'Signaler sur GitHub'
                      : 'Report on GitHub'}
                  </span>
                </a>

                <a
                  href="mailto:elhadjioussama11@gmail.com?subject=%5BL7OT%20Report%5D%20Signalement%20ou%20Suggestion%20de%20Poisson"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#f6f1e7]/15 bg-[#0b0908] px-3.5 py-2 font-mono text-xs font-medium text-[#f6f1e7] transition hover:border-[#d96b27]/50 hover:bg-[#1a1512]"
                >
                  <Mail className="h-3.5 w-3.5 text-[#e68a45]" />
                  <span>
                    {lang === 'ar'
                      ? 'مراسلة عبر الإيميل'
                      : lang === 'fr'
                      ? 'Contacter par Email'
                      : 'Contact via Email'}
                  </span>
                </a>

                <a
                  href="https://github.com/Bosaj/l7ot/wiki"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#f6f1e7]/10 bg-[#0b0908] px-3 py-2 font-mono text-xs font-medium text-[#a69b8d] transition hover:text-[#f6f1e7]"
                >
                  <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
                  <span>
                    {lang === 'ar' ? 'ويكي المنصة' : 'Wiki L7ot'}
                  </span>
                </a>

                <a
                  href="https://github.com/Bosaj/l7ot"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#f6f1e7]/10 bg-[#0b0908] px-3 py-2 font-mono text-xs font-medium text-[#a69b8d] transition hover:text-[#f6f1e7]"
                >
                  <Code2 className="h-3.5 w-3.5 text-[#e68a45]" />
                  <span>
                    {lang === 'ar' ? 'الكود المصدري' : 'Source Code'}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Moroccan Marine Law & Biological Conservation Notice */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-[#786c60] border-t border-[#f6f1e7]/6 pt-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'قوانين الصيد البحري المغربي: ظهير 1973، القانون 15-12، وقرارات الراحة البيولوجية (الميرو 1 يوليوز - 31 غشت، والأخطبوط) تضمن استدامة المصايد الوطنية.'
                  : lang === 'fr'
                  ? 'Réglementation maritime marocaine (Dahir 1973, Loi 15-12) : respect des tailles minimales, permis de chasse sous-marine en apnée et repos biologiques obligatoires.'
                  : 'Moroccan Maritime Law (Dahir 1973, Law 15-12): compliance with legal minimum catch sizes, spearfishing apnea licensing, and mandatory biological resting periods.'}
              </span>
            </div>
            <div className="shrink-0 text-start sm:text-end">
              <span>{lang === 'ar' ? 'النسخة v1.2.0 · رخصة MIT الحرة' : 'Release v1.2.0 · MIT Open Source License'}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

import React, { useState, useMemo } from 'react'
import {
  Search,
  Waves,
  Fish as FishIcon,
} from 'lucide-react'
import { Header } from './components/Header'
import { FishCard } from './components/FishCard'
import { FishModal } from './components/FishModal'
import { RecipeCard } from './components/RecipeCard'
import { RecipeModal } from './components/RecipeModal'
import { ChefL7ot } from './components/ChefL7ot'
import { MarketGuide } from './components/MarketGuide'
import { AgreementsAndMarket } from './components/AgreementsAndMarket'

import { MOROCCAN_FISH } from './data/fish'
import { MOROCCAN_RECIPES } from './data/recipes'
import type { Fish, Recipe } from './data/types'
import type { SupportedLanguage } from './i18n/strings'
import { STRINGS } from './i18n/strings'

export const App: React.FC = () => {
  const [lang, setLang] = useState<SupportedLanguage>('ar')
  const [activeTab, setActiveTab] = useState<'fish' | 'recipes' | 'chef' | 'market' | 'agreements'>('fish')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedCoast, setSelectedCoast] = useState<string>('all')

  const [activeFish, setActiveFish] = useState<Fish | null>(null)
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null)
  const [chefFishId, setChefFishId] = useState<string>('sardine')

  const t = STRINGS[lang]
  const isRtl = lang === 'ar'

  // Filtered Fish
  const filteredFish = useMemo(() => {
    return MOROCCAN_FISH.filter((fish) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        fish.nameDarijaArabic.includes(q) ||
        fish.nameDarijaLatin.toLowerCase().includes(q) ||
        fish.nameFrench.toLowerCase().includes(q) ||
        fish.nameEnglish.toLowerCase().includes(q) ||
        fish.scientificName.toLowerCase().includes(q) ||
        fish.mainPorts.some((p) => p.toLowerCase().includes(q))

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
      className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white"
    >
      {/* Background Oceanic Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-600/10 blur-[128px]" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-blue-600/10 blur-[128px]" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-emerald-600/10 blur-[128px]" />
      </div>

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
      />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
        {/* Sub-hero Search Bar (active on fish and recipe tabs) */}
        {(activeTab === 'fish' || activeTab === 'recipes') && (
          <div className="mx-auto max-w-3xl space-y-4">
            <div className="relative">
              <Search className="absolute top-3.5 right-4 h-5 w-5 text-slate-400 rtl:right-4 ltr:left-4 ltr:right-auto" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-12 py-3.5 text-sm text-white placeholder-slate-400 shadow-xl backdrop-blur-xl focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute top-3.5 left-4 text-xs text-slate-400 hover:text-white rtl:left-4 ltr:right-4 ltr:left-auto"
                >
                  مسح
                </button>
              )}
            </div>

            {/* Fish Tab Category & Coast Pills */}
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
                      className={`rounded-xl px-3 py-1.5 font-medium transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20 font-bold'
                          : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Coasts */}
                <div className="flex items-center gap-1 rounded-xl border border-white/5 bg-slate-900/60 p-1">
                  <button
                    type="button"
                    onClick={() => setSelectedCoast('all')}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                      selectedCoast === 'all'
                        ? 'bg-cyan-500 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.allCoasts}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCoast('atlantic')}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                      selectedCoast === 'atlantic'
                        ? 'bg-cyan-500 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.coastAtlantic}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCoast('mediterranean')}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                      selectedCoast === 'mediterranean'
                        ? 'bg-cyan-500 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.coastMed}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 1: Fish Encyclopedia */}
        {activeTab === 'fish' && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">
                  {t.navFish} ({filteredFish.length})
                </h2>
                <p className="text-xs text-slate-400">
                  جميع أنواع الحوت الشائعة في السواحل المغربية بأسمائها بالدارجة والأسعار الحالية
                </p>
              </div>
            </div>

            {filteredFish.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredFish.map((fish) => (
                  <FishCard
                    key={fish.id}
                    fish={fish}
                    lang={lang}
                    onSelectFish={(f) => setActiveFish(f)}
                    onCookWithFish={handleCookWithFish}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-12 text-center">
                <FishIcon className="mx-auto h-12 w-12 text-slate-600 mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">
                  لم يتم العثور على أي نوع حوت يطابق هذا البحث
                </h3>
                <p className="text-xs text-slate-400">
                  جرب البحث باسم الحوت بالدارجة (سردين، ميرلا، صول، قرب) أو بالفرنسية
                </p>
              </div>
            )}
          </section>
        )}

        {/* Tab 2: Coastal Recipes */}
        {activeTab === 'recipes' && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">
                  {t.navRecipes} ({filteredRecipes.length})
                </h2>
                <p className="text-xs text-slate-400">
                  الوصفات الساحلية المغربية الأصيلة من طواجن الفخار إلى القلي المقرمش والبسطيلة الملكية
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  lang={lang}
                  onSelectRecipe={(r) => setActiveRecipe(r)}
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
        {activeTab === 'market' && <MarketGuide lang={lang} />}

        {/* Tab 5: International Fisheries Agreements & Market Trends */}
        {activeTab === 'agreements' && <AgreementsAndMarket lang={lang} />}
      </main>

      {/* Modals */}
      {activeFish && (
        <FishModal
          fish={activeFish}
          allRecipes={MOROCCAN_RECIPES}
          lang={lang}
          onClose={() => setActiveFish(null)}
          onSelectRecipe={(r) => setActiveRecipe(r)}
          onCookWithFish={handleCookWithFish}
        />
      )}

      {activeRecipe && (
        <RecipeModal
          recipe={activeRecipe}
          lang={lang}
          onClose={() => setActiveRecipe(null)}
        />
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 bg-slate-950/80 py-8 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Waves className="h-4 w-4 text-cyan-400" />
            <span className="font-bold text-slate-200">L7OT · الحوت المغربي</span>
            <span>— 3,500 كلم من السواحل الأطلسية والمتوسطية</span>
          </div>
          <p>{t.footerMadeWith}</p>
        </div>
      </footer>
    </div>
  )
}

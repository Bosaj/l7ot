import React from 'react'
import { Anchor } from 'lucide-react'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'

interface HeaderProps {
  activeTab: 'fish' | 'recipes' | 'chef' | 'market' | 'agreements'
  setActiveTab: (tab: 'fish' | 'recipes' | 'chef' | 'market' | 'agreements') => void
  lang: SupportedLanguage
  setLang: (lang: SupportedLanguage) => void
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
}) => {
  const t = STRINGS[lang]

  const navItems: Array<{
    id: 'fish' | 'recipes' | 'chef' | 'market' | 'agreements'
    index: string
    label: string
    meta: string
  }> = [
    {
      id: 'fish',
      index: '01',
      label: t.navFish,
      meta: lang === 'ar' ? '22 نوعاً' : lang === 'fr' ? '22 Espèces' : '22 Species',
    },
    {
      id: 'recipes',
      index: '02',
      label: t.navRecipes,
      meta: lang === 'ar' ? '11 وصفة' : lang === 'fr' ? '11 Recettes' : '11 Recipes',
    },
    {
      id: 'chef',
      index: '03',
      label: t.navChef,
      meta: lang === 'ar' ? 'ميزان التوابل' : lang === 'fr' ? 'Atelier' : 'Spice Lab',
    },
    {
      id: 'market',
      index: '04',
      label: t.navMarket,
      meta: lang === 'ar' ? 'فحص الطراوة' : lang === 'fr' ? 'Guide Criée' : 'Freshness',
    },
    {
      id: 'agreements',
      index: '05',
      label: t.navAgreements,
      meta: lang === 'ar' ? '10 معاهدات' : lang === 'fr' ? '10 Traités' : '10 Treaties',
    },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-[#f6f1e7]/12 bg-[#0b0908]/95 backdrop-blur-md">
      {/* Top Maritime Telemetry Strip (Criée Live Tape) */}
      <div className="border-b border-[#f6f1e7]/8 bg-[#120f0d] px-4 py-1.5 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap font-mono text-[#a69b8d]">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#e68a45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e68a45]" />
              ONP CRIÉE LIVE
            </span>
            <span className="text-[#f6f1e7]/20">|</span>
            <span>SAFI · SARDINE 14 MAD/KG ▼</span>
            <span className="hidden text-[#f6f1e7]/20 md:inline">|</span>
            <span className="hidden md:inline">DAKHLA · POULPE 95 MAD/KG ▲</span>
            <span className="hidden text-[#f6f1e7]/20 lg:inline">|</span>
            <span className="hidden lg:inline">TANGER MED · PAGEOT VORACERO 110 MAD/KG ▲</span>
            <span className="hidden text-[#f6f1e7]/20 xl:inline">|</span>
            <span className="hidden xl:inline text-emerald-400/90">
              INRH · 3,500 KM LITTORAL ATLANTIQUE & MÉDITERRANÉEN
            </span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <span className="mr-1.5 hidden text-[#786c60] sm:inline">ÉDITION:</span>
            <button
              type="button"
              onClick={() => setLang('ar')}
              className={`rounded px-2 py-0.5 font-semibold transition-colors ${
                lang === 'ar'
                  ? 'bg-[#d96b27] text-[#0b0908]'
                  : 'text-[#a69b8d] hover:text-[#f6f1e7]'
              }`}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => setLang('fr')}
              className={`rounded px-2 py-0.5 font-semibold transition-colors ${
                lang === 'fr'
                  ? 'bg-[#d96b27] text-[#0b0908]'
                  : 'text-[#a69b8d] hover:text-[#f6f1e7]'
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`rounded px-2 py-0.5 font-semibold transition-colors ${
                lang === 'en'
                  ? 'bg-[#d96b27] text-[#0b0908]'
                  : 'text-[#a69b8d] hover:text-[#f6f1e7]'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Main Editorial Masthead & Architectural Index Navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 py-4 lg:flex-row lg:items-center">
          {/* Brand Crest */}
          <div
            onClick={() => setActiveTab('fish')}
            className="flex cursor-pointer items-center gap-3.5 group"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#d96b27]/40 bg-[#1c1612] text-[#e68a45] transition-transform duration-300 group-hover:border-[#e68a45]">
              <Anchor className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-baseline gap-2.5">
                <h1 className="font-editorial text-2xl font-bold tracking-tight text-[#f6f1e7] sm:text-3xl">
                  {t.siteTitle}
                </h1>
                <span className="border border-[#d96b27]/35 bg-[#d96b27]/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-[#f2b47e]">
                  ATLAS MARITIME DU MAROC
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[#a69b8d]">{t.tagline}</p>
            </div>
          </div>

          {/* Numbered Editorial Index Navigation */}
          <nav
            aria-label="Main Navigation"
            className="flex items-stretch gap-1 overflow-x-auto border border-[#f6f1e7]/10 bg-[#14110f] p-1 rounded-lg"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`group relative flex items-center gap-2.5 whitespace-nowrap rounded-md px-3.5 py-2 text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-[#d96b27] text-[#0b0908] font-bold shadow-sm'
                      : 'text-[#d4cbbd] hover:bg-[#f6f1e7]/5 hover:text-[#f6f1e7]'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] ${
                      isActive ? 'text-[#0b0908]/80 font-bold' : 'text-[#e68a45]'
                    }`}
                  >
                    {item.index}
                  </span>
                  <span className="text-xs sm:text-[13px]">{item.label}</span>
                  <span
                    className={`hidden rounded px-1.5 py-0.5 font-mono text-[9px] xl:inline-block ${
                      isActive
                        ? 'bg-[#0b0908]/15 text-[#0b0908]'
                        : 'bg-[#f6f1e7]/5 text-[#a69b8d]'
                    }`}
                  >
                    {item.meta}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}

import React from 'react'
import { Camera } from 'lucide-react'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'

export type NavTab = 'fish' | 'scanner' | 'recipes' | 'chef' | 'market' | 'agreements' | 'marine-apis'

interface HeaderProps {
  activeTab: NavTab
  setActiveTab: (tab: NavTab) => void
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
    id: NavTab
    index: string
    label: string
    meta: string
    highlight?: boolean
  }> = [
    {
      id: 'fish',
      index: '01',
      label: t.navFish,
      meta: lang === 'ar' ? '32 نوعاً' : lang === 'fr' ? '32 Espèces' : '32 Species',
    },
    {
      id: 'scanner',
      index: '02',
      label: t.navScanner,
      meta: lang === 'ar' ? 'كاميرا ذكية' : lang === 'fr' ? 'Vision IA' : 'Camera AI',
      highlight: true,
    },
    {
      id: 'recipes',
      index: '03',
      label: t.navRecipes,
      meta: lang === 'ar' ? '16 وصفة' : lang === 'fr' ? '16 Recettes' : '16 Recipes',
    },
    {
      id: 'chef',
      index: '04',
      label: t.navChef,
      meta: lang === 'ar' ? 'ميزان التوابل' : lang === 'fr' ? 'Atelier' : 'Spice Lab',
    },
    {
      id: 'market',
      index: '05',
      label: t.navMarket,
      meta: lang === 'ar' ? 'فحص الطراوة' : lang === 'fr' ? 'Guide Criée' : 'Freshness',
    },
    {
      id: 'agreements',
      index: '06',
      label: t.navAgreements,
      meta: lang === 'ar' ? '10 معاهدات' : lang === 'fr' ? '10 Traités' : '10 Treaties',
    },
    {
      id: 'marine-apis',
      index: '07',
      label: t.navMarineApis,
      meta: lang === 'ar' ? 'طقس مباشر & APIs' : lang === 'fr' ? 'Météo & APIs' : 'Live Waves & APIs',
    },
  ]

  const tickerItems =
    lang === 'ar'
      ? [
          { port: 'آسفي · السردين', price: '14 درهم/كلغ', trend: '▼', down: true },
          { port: 'الداخلة · الأخطبوط', price: '95 درهم/كلغ', trend: '▲', down: false },
          { port: 'طنجة المتوسط · الباجو الملكي', price: '110 درهم/كلغ', trend: '▲', down: false },
          { port: 'الواليدية · المحار وبوجنبة', price: '70 درهم/كلغ', trend: '●', down: true },
        ]
      : lang === 'fr'
        ? [
            { port: 'SAFI · SARDINE', price: '14 MAD/KG', trend: '▼', down: true },
            { port: 'DAKHLA · POULPE', price: '95 MAD/KG', trend: '▲', down: false },
            { port: 'TANGER MED · PAGEOT ROYAL', price: '110 MAD/KG', trend: '▲', down: false },
            { port: 'OUALIDIA · HUÎTRES & CRABE', price: '70 MAD/KG', trend: '●', down: true },
          ]
        : [
            { port: 'SAFI · SARDINE', price: '14 MAD/KG', trend: '▼', down: true },
            { port: 'DAKHLA · OCTOPUS', price: '95 MAD/KG', trend: '▲', down: false },
            { port: 'TANGIER MED · ROYAL BREAM', price: '110 MAD/KG', trend: '▲', down: false },
            { port: 'OUALIDIA · OYSTERS & CRAB', price: '70 MAD/KG', trend: '●', down: true },
          ]

  return (
    <header className="sticky top-0 z-40 border-b border-[#f6f1e7]/12 bg-[#0b0908]/95 backdrop-blur-md">
      {/* Top Maritime Telemetry Strip (Localized & RTL/LTR Safe) */}
      <div className="border-b border-[#f6f1e7]/8 bg-[#120f0d] px-4 py-1.5 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2.5 overflow-x-auto whitespace-nowrap font-mono text-[#a69b8d]">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#e68a45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e68a45] animate-pulse" />
              {lang === 'ar'
                ? 'بورصة الموانئ المغربية (ONP مباشر)'
                : lang === 'fr'
                  ? 'ONP CRIÉE MAROC EN DIRECT'
                  : 'ONP MOROCCO PORT AUCTION LIVE'}
            </span>

            {tickerItems.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="text-[#f6f1e7]/20">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-[#d4cbbd]">{item.port}</span>
                  <span
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                      item.down
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-300'
                    }`}
                  >
                    <span>{item.price}</span>
                    <span className="text-[9px] opacity-80">{item.trend}</span>
                  </span>
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <span className="me-1.5 hidden text-[#786c60] sm:inline">
              {lang === 'ar' ? 'اللغة:' : lang === 'fr' ? 'ÉDITION:' : 'LANGUAGE:'}
            </span>
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
        <div className="flex flex-col justify-between gap-4 py-3.5 xl:flex-row xl:items-center">
          {/* Custom Moroccan Zellige & Brass Fish Brand Crest */}
          <div
            onClick={() => setActiveTab('fish')}
            className="flex cursor-pointer items-center gap-3.5 group"
          >
            <img
              src="/favicon.svg"
              alt="L7OT Moroccan Maritime Crest"
              className="h-12 w-12 shrink-0 rounded-lg border border-[#d96b27]/40 bg-[#14100d] p-0.5 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:border-[#e68a45]"
            />
            <div>
              <div className="flex flex-wrap items-baseline gap-2.5">
                <h1 className="font-editorial text-2xl font-bold tracking-tight text-[#f6f1e7] sm:text-3xl">
                  {t.siteTitle}
                </h1>
                <span className="border border-[#d96b27]/35 bg-[#d96b27]/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-[#f2b47e]">
                  {lang === 'ar'
                    ? 'الأطلس البحري المغربي · 32 نوعاً'
                    : lang === 'fr'
                      ? 'ATLAS MARITIME DU MAROC · 32 ESPÈCES'
                      : 'MOROCCAN MARITIME ATLAS · 32 SPECIES'}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[#a69b8d] line-clamp-1">{t.tagline}</p>
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
                  className={`group relative flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-[#d96b27] text-[#0b0908] font-bold shadow-sm'
                      : item.highlight
                        ? 'border border-[#e68a45]/40 bg-[#e68a45]/10 text-[#f2b47e] hover:bg-[#e68a45]/20'
                        : 'text-[#d4cbbd] hover:bg-[#f6f1e7]/5 hover:text-[#f6f1e7]'
                  }`}
                >
                  {item.id === 'scanner' ? (
                    <Camera
                      className={`h-3.5 w-3.5 ${
                        isActive ? 'text-[#0b0908]' : 'text-[#e68a45]'
                      }`}
                    />
                  ) : (
                    <span
                      dir="ltr"
                      className={`font-mono text-[10px] ${
                        isActive ? 'text-[#0b0908]/80 font-bold' : 'text-[#e68a45]'
                      }`}
                    >
                      {item.index}
                    </span>
                  )}
                  <span className="text-xs sm:text-[13px]">{item.label}</span>
                  <span
                    className={`hidden rounded px-1.5 py-0.5 font-mono text-[9px] 2xl:inline-block ${
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

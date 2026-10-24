import React, { useState } from 'react'
import {
  Camera,
  MapPin,
  Fish,
  UtensilsCrossed,
  ChefHat,
  ShoppingBag,
  Globe2,
  Waves,
  Scale,
  Volume2,
  VolumeX,
  Calendar,
} from 'lucide-react'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'
import type { MoroccanPortRegion } from '../lib/moroccanRegions'
import { sounds } from '../lib/soundEffects'
import { getAssetUrl } from '../lib/assetHelper'

export type NavTab = 'fish' | 'scanner' | 'seasons' | 'recipes' | 'chef' | 'market' | 'agreements' | 'maritime-law' | 'marine-apis'

interface HeaderProps {
  activeTab: NavTab
  setActiveTab: (tab: NavTab) => void
  lang: SupportedLanguage
  setLang: (lang: SupportedLanguage) => void
  userPortLocation?: {
    selectedRegion: MoroccanPortRegion
    isLocating: boolean
    isAutoDetected: boolean
    detectedDistanceKm: number | null
    detectLocation: () => void
    setManualRegion: (regionId: string) => void
    regions: MoroccanPortRegion[]
  }
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  userPortLocation,
}) => {
  const t = STRINGS[lang]
  const [soundActive, setSoundActive] = useState(() => sounds.isEnabled())

  const navItems: Array<{
    id: NavTab
    index: string
    label: string
    shortLabel: string
    icon: React.ComponentType<{ className?: string }>
    highlight?: boolean
  }> = [
    {
      id: 'fish',
      index: '01',
      label: t.navFish,
      shortLabel: lang === 'ar' ? 'الأسماك' : lang === 'fr' ? 'Poissons' : 'Species',
      icon: Fish,
    },
    {
      id: 'scanner',
      index: '02',
      label: t.navScanner,
      shortLabel: lang === 'ar' ? 'ماسح الكاميرا' : lang === 'fr' ? 'Vision IA' : 'Scanner',
      icon: Camera,
      highlight: true,
    },
        {
      id: 'seasons',
      index: '03',
      label: lang === 'ar' ? 'المواسم والراحة البيولوجية' : lang === 'fr' ? 'Saisons & Repos Bio' : 'Seasons & Bio-Rest',
      shortLabel: lang === 'ar' ? 'المواسم' : lang === 'fr' ? 'Saisons' : 'Seasons',
      icon: Calendar,
    },
    {
      id: 'recipes',
      index: '04',
      label: t.navRecipes,
      shortLabel: lang === 'ar' ? 'الوصفات' : lang === 'fr' ? 'Recettes' : 'Recipes',
      icon: UtensilsCrossed,
    },
    {
      id: 'chef',
      index: '05',
      label: t.navChef,
      shortLabel: lang === 'ar' ? 'شيف التوابل' : lang === 'fr' ? 'Chef Épices' : 'Spice Lab',
      icon: ChefHat,
    },
    {
      id: 'market',
      index: '06',
      label: t.navMarket,
      shortLabel: lang === 'ar' ? 'دليل المارشي' : lang === 'fr' ? 'Guide Criée' : 'Market',
      icon: ShoppingBag,
    },
    {
      id: 'agreements',
      index: '07',
      label: t.navAgreements,
      shortLabel: lang === 'ar' ? 'المعاهدات' : lang === 'fr' ? 'Traités' : 'Treaties',
      icon: Globe2,
    },
    {
      id: 'maritime-law',
      index: '08',
      label: t.navMaritimeLaw,
      shortLabel: lang === 'ar' ? 'قانون الصيد' : lang === 'fr' ? 'Lois & Tailles' : 'Fishing Law',
      icon: Scale,
    },
    {
      id: 'marine-apis',
      index: '09',
      label: t.navMarineApis,
      shortLabel: lang === 'ar' ? 'طقس الموانئ' : lang === 'fr' ? 'Météo Mer' : 'Port Radar',
      icon: Waves,
    },
  ]

  const tickerItems =
    lang === 'ar'
      ? [
          { port: 'بني نصار / الناظور · باخيل والغامبا', amount: 85, unit: 'درهم/كلغ', trend: '▲', down: false },
          { port: 'طنجة المتوسط · الباجو الملكي والزريقة', amount: 110, unit: 'درهم/كلغ', trend: '▲', down: false },
          { port: 'الحسيمة · الميرو والباسي', amount: 130, unit: 'درهم/كلغ', trend: '▲', down: false },
          { port: 'العرائش · بيسبادا وروبيو', amount: 65, unit: 'درهم/كلغ', trend: '▼', down: true },
          { port: 'الدار البيضاء · الكوربين والكلمار', amount: 80, unit: 'درهم/كلغ', trend: '●', down: true },
          { port: 'الواليدية · المحار الملكي وبوجنبة', amount: 70, unit: 'درهم/كلغ', trend: '●', down: true },
          { port: 'آسفي · السردين الطري', amount: 14, unit: 'درهم/كلغ', trend: '▼', down: true },
          { port: 'الصويرة · الميرلا والصابر', amount: 55, unit: 'درهم/كلغ', trend: '▼', down: true },
          { port: 'أكادير · الصول والكوكياج', amount: 120, unit: 'درهم/كلغ', trend: '▲', down: false },
          { port: 'سيدي إفني وطانطان · الأخطبوط والكوربين', amount: 90, unit: 'درهم/كلغ', trend: '▲', down: false },
          { port: 'العيون المرسى · كروفيت رويال وتونة', amount: 140, unit: 'درهم/كلغ', trend: '▼', down: true },
          { port: 'الداخلة · الأخطبوط والسيبيا', amount: 95, unit: 'درهم/كلغ', trend: '▲', down: false },
        ]
      : lang === 'fr'
        ? [
            { port: 'NADOR / BENI ANSAR · PAGEOT & GAMBAS', amount: 85, unit: 'MAD/KG', trend: '▲', down: false },
            { port: 'TANGER MED · DAURADE ROYALE', amount: 110, unit: 'MAD/KG', trend: '▲', down: false },
            { port: 'AL HOCEIMA · MÉROU & PAGEOT', amount: 130, unit: 'MAD/KG', trend: '▲', down: false },
            { port: 'LARACHE · ESPADON & ROUGET', amount: 65, unit: 'MAD/KG', trend: '▼', down: true },
            { port: 'CASABLANCA · COURBINE & CALMAR', amount: 80, unit: 'MAD/KG', trend: '●', down: true },
            { port: 'OUALIDIA · HUÎTRES & CRABE', amount: 70, unit: 'MAD/KG', trend: '●', down: true },
            { port: 'SAFI · SARDINE ATLANTIQUE', amount: 14, unit: 'MAD/KG', trend: '▼', down: true },
            { port: 'ESSAOUIRA · MERLU BLANC', amount: 55, unit: 'MAD/KG', trend: '▼', down: true },
            { port: 'AGADIR · SOLE ROYALE & SEICHE', amount: 120, unit: 'MAD/KG', trend: '▲', down: false },
            { port: 'TAN-TAN / SIDI IFNI · POULPE & COURBINE', amount: 90, unit: 'MAD/KG', trend: '▲', down: false },
            { port: 'LAÂYOUNE · CREVETTE ROYALE', amount: 140, unit: 'MAD/KG', trend: '▼', down: true },
            { port: 'DAKHLA · POULPE & THON', amount: 95, unit: 'MAD/KG', trend: '▲', down: false },
          ]
        : [
            { port: 'NADOR / BENI ANSAR · ROYAL PAGEL & SHRIMPS', amount: 85, unit: 'MAD/KG', trend: '▲', down: false },
            { port: 'TANGIER MED · ROYAL SEABREAM', amount: 110, unit: 'MAD/KG', trend: '▲', down: false },
            { port: 'AL HOCEIMA · DUSKY GROUPER', amount: 130, unit: 'MAD/KG', trend: '▲', down: false },
            { port: 'LARACHE · SWORDFISH & RED MULLET', amount: 65, unit: 'MAD/KG', trend: '▼', down: true },
            { port: 'CASABLANCA · CROAKER & SQUID', amount: 80, unit: 'MAD/KG', trend: '●', down: true },
            { port: 'OUALIDIA · ROYAL OYSTERS & CRAB', amount: 70, unit: 'MAD/KG', trend: '●', down: true },
            { port: 'SAFI · ATLANTIC SARDINE', amount: 14, unit: 'MAD/KG', trend: '▼', down: true },
            { port: 'ESSAOUIRA · SILVER HAKE', amount: 55, unit: 'MAD/KG', trend: '▼', down: true },
            { port: 'AGADIR · DOVER SOLE & SEAFOOD', amount: 120, unit: 'MAD/KG', trend: '▲', down: false },
            { port: 'TAN-TAN / SIDI IFNI · OCTOPUS & CROAKER', amount: 90, unit: 'MAD/KG', trend: '▲', down: false },
            { port: 'LAAYOUNE · KING PRAWN & TUNA', amount: 140, unit: 'MAD/KG', trend: '▼', down: true },
            { port: 'DAKHLA · SAHARA OCTOPUS', amount: 95, unit: 'MAD/KG', trend: '▲', down: false },
          ]

  return (
    <header className="sticky top-0 z-40 border-b border-[#f6f1e7]/12 bg-[#0b0908]/95 backdrop-blur-md">
      {/* Top Maritime Telemetry Strip (Auto-scrolling Marquee with Pause on Hover, Zero Scrollbar) */}
      <div className="border-b border-[#f6f1e7]/8 bg-[#120f0d] px-3 py-1.5 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 text-[11px]">
          {/* Pinned Left Header Badge */}
          <div className="flex items-center gap-2 shrink-0 border-e border-[#f6f1e7]/10 pe-3 z-10 bg-[#120f0d]">
            <span className="inline-flex items-center gap-1.5 font-mono font-bold text-[#e68a45] text-[10px] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e68a45] animate-pulse" />
              {lang === 'ar'
                ? 'بورصة الموانئ (ONP)'
                : lang === 'fr'
                  ? 'CRIÉE ONP DIRECT'
                  : 'ONP LIVE AUCTION'}
            </span>
          </div>

          {/* Continuous Auto-Scrolling Ticker (Dual-track seamless loop, pauses immediately on hover, zero emptiness) */}
          <div
            dir="ltr"
            className="relative flex-1 overflow-hidden min-w-0 mx-2 group select-none"
            title={lang === 'ar' ? 'مرر المؤشر لإيقاف الشريط وقراءة الأسعار' : 'Hover to pause prices'}
          >
            {/* Soft gradient edge masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#120f0d] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#120f0d] to-transparent z-10" />

            <div className="flex w-max animate-marquee">
              {/* Track A */}
              <div className="flex shrink-0 items-center gap-6 pr-6 font-mono text-[#a69b8d] cursor-pointer py-0.5">
                {tickerItems.map((item, idx) => (
                  <div key={`ta-${idx}`} className="inline-flex items-center gap-2">
                    <span className="text-[#f6f1e7]/20">•</span>
                    <span className="text-[#d4cbbd] font-medium text-[11px] whitespace-nowrap">{item.port}</span>
                    <span
                      dir={lang === 'ar' ? 'rtl' : 'ltr'}
                      className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                        item.down
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/20'
                      }`}
                    >
                      <span className="font-bold tabular-nums">{item.amount}</span>
                      <span className="text-[9px] font-normal opacity-90">{item.unit}</span>
                      <span className="text-[9px] opacity-85">{item.trend}</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Track B (Identical clone for seamless zero-gap infinite loop) */}
              <div className="flex shrink-0 items-center gap-6 pr-6 font-mono text-[#a69b8d] cursor-pointer py-0.5" aria-hidden="true">
                {tickerItems.map((item, idx) => (
                  <div key={`tb-${idx}`} className="inline-flex items-center gap-2">
                    <span className="text-[#f6f1e7]/20">•</span>
                    <span className="text-[#d4cbbd] font-medium text-[11px] whitespace-nowrap">{item.port}</span>
                    <span
                      dir={lang === 'ar' ? 'rtl' : 'ltr'}
                      className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                        item.down
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/20'
                      }`}
                    >
                      <span className="font-bold tabular-nums">{item.amount}</span>
                      <span className="text-[9px] font-normal opacity-90">{item.unit}</span>
                      <span className="text-[9px] opacity-85">{item.trend}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location Port & Language Controls (Pinned at End) */}
          <div className="flex items-center gap-2.5 font-mono text-[11px] shrink-0 z-10 bg-[#120f0d] ps-2">
            {userPortLocation && (
              <div className="flex items-center gap-1 border-e border-[#f6f1e7]/15 pe-2">
                <button
                  type="button"
                  onClick={userPortLocation.detectLocation}
                  disabled={userPortLocation.isLocating}
                  title={lang === 'ar' ? 'رصد الموقع الجغرافي وتحديد أقرب ميناء مغربي' : 'Localisation GPS du port le plus proche'}
                  className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-medium transition ${
                    userPortLocation.isLocating
                      ? 'border-[#d96b27] bg-[#d96b27]/20 text-[#f2b47e]'
                      : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-400'
                  }`}
                >
                  <MapPin className={`h-3 w-3 text-cyan-400 ${userPortLocation.isLocating ? 'animate-spin' : ''}`} />
                  <span className="max-w-[130px] truncate">
                    {userPortLocation.isLocating
                      ? (lang === 'ar' ? 'جاري الرصد...' : 'GPS...')
                      : (lang === 'ar' ? userPortLocation.selectedRegion.primaryPortAr.split('/')[0] : userPortLocation.selectedRegion.primaryPortFr.split('/')[0])}
                  </span>
                </button>
              </div>
            )}

            {/* Language Selector */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setLang('ar')}
                className={`rounded px-1.5 py-0.5 text-[10px] font-semibold transition-colors ${
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
                className={`rounded px-1.5 py-0.5 text-[10px] font-semibold transition-colors ${
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
                className={`rounded px-1.5 py-0.5 text-[10px] font-semibold transition-colors ${
                  lang === 'en'
                    ? 'bg-[#d96b27] text-[#0b0908]'
                    : 'text-[#a69b8d] hover:text-[#f6f1e7]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setSoundActive(sounds.toggle())}
                title={soundActive ? (lang === 'ar' ? 'كتم المؤثرات الصوتية' : 'Couper les sons') : (lang === 'ar' ? 'تشغيل المؤثرات الصوتية' : 'Activer les sons')}
                className={`flex items-center justify-center rounded px-1.5 py-0.5 text-[10px] transition-colors border ${
                  soundActive
                    ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
                    : 'border-white/10 text-[#786c60] hover:text-[#f6f1e7]'
                }`}
              >
                {soundActive ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editorial Masthead & Architectural Index Navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 py-3.5 xl:flex-row xl:items-center">
          {/* Custom Moroccan Zellige & Brass Fish Brand Crest */}
          <div
            onClick={() => {
              sounds.playBubble()
              setActiveTab('fish')
            }}
            className="flex cursor-pointer items-center gap-3.5 group"
          >
            <img
              src={getAssetUrl("favicon.svg")}
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
                    ? 'الأطلس البحري المغربي · 44 نوعاً'
                    : lang === 'fr'
                      ? 'ATLAS MARITIME DU MAROC · 44 ESPÈCES'
                      : 'MOROCCAN MARITIME ATLAS · 44 SPECIES'}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[#a69b8d] line-clamp-1">{t.tagline}</p>
            </div>
          </div>

          {/* Numbered Editorial Index Navigation (Zero scrollbar, responsive wrapping pills) */}
          <nav
            aria-label="Main Navigation"
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#f6f1e7]/10 bg-[#14110f] p-1.5 shadow-inner no-scrollbar"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    sounds.playTabClick()
                    setActiveTab(item.id)
                  }}
                  className={`group relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-[#d96b27] text-[#0b0908] font-bold shadow-md shadow-[#d96b27]/20 ring-1 ring-[#e68a45]'
                      : item.highlight
                        ? 'border border-[#e68a45]/40 bg-[#e68a45]/10 text-[#f2b47e] hover:bg-[#e68a45]/20'
                        : 'text-[#d4cbbd] hover:bg-[#f6f1e7]/8 hover:text-[#f6f1e7]'
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive
                        ? 'text-[#0b0908]'
                        : item.highlight
                          ? 'text-[#e68a45]'
                          : 'text-[#a69b8d] group-hover:text-[#f6f1e7]'
                    }`}
                  />
                  <span
                    dir="ltr"
                    className={`font-mono text-[9px] ${
                      isActive ? 'text-[#0b0908]/80 font-bold' : 'text-[#e68a45]/80'
                    }`}
                  >
                    {item.index}
                  </span>
                  <span className="font-medium text-xs whitespace-nowrap">
                    {item.label}
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

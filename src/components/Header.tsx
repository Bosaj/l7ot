import React from 'react'
import { Fish as FishIcon, BookOpen, Utensils, Compass, Languages, Waves } from 'lucide-react'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'

interface HeaderProps {
  activeTab: 'fish' | 'recipes' | 'chef' | 'market'
  setActiveTab: (tab: 'fish' | 'recipes' | 'chef' | 'market') => void
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

  return (
    <header className="sticky top-0 z-40 border-b border-cyan-900/30 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
            <FishIcon className="h-6 w-6 text-white" />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-slate-950">
              <Waves className="h-2.5 w-2.5 text-white" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white drop-shadow-sm font-sans">
                {t.siteTitle}
              </span>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-300">
                المغرب 🇲🇦
              </span>
            </div>
            <p className="hidden text-xs text-slate-400 sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-white/5 bg-slate-900/80 p-1 text-sm shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab('fish')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 font-medium transition-all duration-200 ${
              activeTab === 'fish'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <FishIcon className="h-4 w-4" />
            <span>{t.navFish}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('recipes')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 font-medium transition-all duration-200 ${
              activeTab === 'recipes'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>{t.navRecipes}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('chef')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 font-medium transition-all duration-200 ${
              activeTab === 'chef'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Utensils className="h-4 w-4" />
            <span>{t.navChef}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('market')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 font-medium transition-all duration-200 ${
              activeTab === 'market'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>{t.navMarket}</span>
          </button>
        </nav>

        {/* Language Switcher */}
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-slate-900/60 p-1">
          <Languages className="ml-1.5 h-3.5 w-3.5 text-slate-400" />
          <button
            type="button"
            onClick={() => setLang('ar')}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
              lang === 'ar'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            العربية
          </button>
          <button
            type="button"
            onClick={() => setLang('fr')}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
              lang === 'fr'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
              lang === 'en'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  )
}

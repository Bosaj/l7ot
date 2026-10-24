import React, { useState } from 'react'
import {
  Calendar,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react'
import type { Fish } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { sounds } from '../lib/soundEffects'
import { getAssetUrl } from '../lib/assetHelper'

interface SeasonalCatchCalendarProps {
  fishList: Fish[]
  lang: SupportedLanguage
  onSelectFish: (fish: Fish) => void
}

const MONTHS_DATA = [
  { num: 1, nameAr: 'يناير', nameFr: 'Janvier', nameEn: 'January' },
  { num: 2, nameAr: 'فبراير', nameFr: 'Février', nameEn: 'February' },
  { num: 3, nameAr: 'مارس', nameFr: 'Mars', nameEn: 'March' },
  { num: 4, nameAr: 'أبريل', nameFr: 'Avril', nameEn: 'April' },
  { num: 5, nameAr: 'ماي', nameFr: 'Mai', nameEn: 'May' },
  { num: 6, nameAr: 'يونيو', nameFr: 'Juin', nameEn: 'June' },
  { num: 7, nameAr: 'يوليوز', nameFr: 'Juillet', nameEn: 'July' },
  { num: 8, nameAr: 'غشت', nameFr: 'Août', nameEn: 'August' },
  { num: 9, nameAr: 'شتنبر', nameFr: 'Septembre', nameEn: 'September' },
  { num: 10, nameAr: 'أكتوبر', nameFr: 'Octobre', nameEn: 'October' },
  { num: 11, nameAr: 'نونبر', nameFr: 'Novembre', nameEn: 'November' },
  { num: 12, nameAr: 'دجنبر', nameFr: 'Décembre', nameEn: 'December' },
]

export const SeasonalCatchCalendar: React.FC<SeasonalCatchCalendarProps> = ({
  fishList,
  lang,
  onSelectFish,
}) => {
  const currentMonthNum = new Date().getMonth() + 1
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonthNum)
  const [activeCategory, setActiveCategory] = useState<'all' | 'peak' | 'rest'>('all')

  const selectedMonthMeta = MONTHS_DATA.find((m) => m.num === selectedMonth) || MONTHS_DATA[0]!

  // Peak fish for this month
  const peakFish = fishList.filter((f) => f.seasonality?.peakMonths?.includes(selectedMonth))

  // Fish under biological rest in this month
  const restFish = fishList.filter(
    (f) =>
      f.regulations?.isUnderBiologicalRest ||
      (f.regulations?.biologicalRestPeriod &&
        ((selectedMonth >= 4 && selectedMonth <= 5) || (selectedMonth >= 9 && selectedMonth <= 10)) &&
        f.category === 'cephalopode')
  )

  const handleMonthClick = (mNum: number) => {
    sounds.playBubble()
    setSelectedMonth(mNum)
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-[#d96b27]/30 bg-gradient-to-b from-[#19130e] to-[#0c0a08] p-6 shadow-2xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#d96b27]/10 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f2b47e]/30 bg-[#f2b47e]/10 px-3 py-1 font-mono text-xs font-semibold text-[#f2b47e]">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {lang === 'ar'
                  ? 'رزنامة المواسم البحرية والراحة البيولوجية المغربية'
                  : lang === 'fr'
                  ? 'Calendrier Saisonnier & Repos Biologique au Maroc'
                  : 'Moroccan Seasonal Catch & Biological Rest Calendar'}
              </span>
            </div>
            <h2 className="mt-2 font-editorial text-2xl font-bold text-[#f6f1e7] sm:text-3xl">
              {lang === 'ar'
                ? `مواسم الصيد لشهر ${selectedMonthMeta.nameAr}`
                : lang === 'fr'
                ? `Disponibilité & Pêche en ${selectedMonthMeta.nameFr}`
                : `Seafood Seasons in ${selectedMonthMeta.nameEn}`}
            </h2>
            <p className="mt-1 font-mono text-xs text-[#a69b8d]">
              {lang === 'ar'
                ? 'استشر مواسم وفرة الأسماك في الموانئ المغربية لتقتني أجود أنواع الحوت بأفضل أسعار الجملة'
                : 'Consultez les pics de pêche pour consommer durablement au meilleur prix de la criée.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 rounded-lg px-3 py-1.5 font-bold">
              ● {peakFish.length} {lang === 'ar' ? 'أنواع في ذروة الوفرة' : 'Espèces en pic'}
            </span>
            {restFish.length > 0 && (
              <span className="font-mono text-xs text-rose-400 bg-rose-950/30 border border-rose-500/30 rounded-lg px-3 py-1.5 font-bold">
                ▲ {restFish.length} {lang === 'ar' ? 'راحة بيولوجية' : 'Repos bio'}
              </span>
            )}
          </div>
        </div>

        {/* 12 Months Horizontal Scroll / Bar */}
        <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {MONTHS_DATA.map((m) => {
            const isSelected = m.num === selectedMonth
            const isCurrent = m.num === currentMonthNum
            return (
              <button
                key={m.num}
                type="button"
                onClick={() => handleMonthClick(m.num)}
                className={`flex-1 min-w-[70px] rounded-xl py-2 px-2 text-center font-mono transition-all ${
                  isSelected
                    ? 'border-2 border-[#d96b27] bg-[#d96b27] text-[#0b0908] font-bold shadow-lg shadow-[#d96b27]/20 scale-105'
                    : 'border border-[#2a211c] bg-[#14100d] text-[#a69b8d] hover:border-[#d96b27]/40 hover:text-[#f6f1e7]'
                }`}
              >
                <span className="block text-[10px] uppercase tracking-wider opacity-80">
                  {lang === 'ar' ? `شهر ${m.num}` : `M${m.num}`}
                </span>
                <span className="block text-xs font-bold mt-0.5">
                  {lang === 'ar' ? m.nameAr : lang === 'fr' ? m.nameFr : m.nameEn}
                </span>
                {isCurrent && (
                  <span className="block text-[8px] font-bold mt-1 text-cyan-300">
                    {lang === 'ar' ? 'الحالي' : 'Actuel'}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="inline-flex rounded-xl border border-[#2a211c] bg-[#120e0c] p-1 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`rounded-lg px-3.5 py-1.5 font-bold transition ${
              activeCategory === 'all'
                ? 'bg-[#d96b27] text-[#0b0908]'
                : 'text-[#a69b8d] hover:text-[#f6f1e7]'
            }`}
          >
            {lang === 'ar' ? 'جميع الأسماك' : 'Tous'} ({peakFish.length + restFish.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('peak')}
            className={`rounded-lg px-3.5 py-1.5 font-bold transition ${
              activeCategory === 'peak'
                ? 'bg-emerald-600 text-white'
                : 'text-[#a69b8d] hover:text-emerald-400'
            }`}
          >
            ✓ {lang === 'ar' ? 'ذروة الموسم والجودة' : 'Pleine Saison'} ({peakFish.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('rest')}
            className={`rounded-lg px-3.5 py-1.5 font-bold transition ${
              activeCategory === 'rest'
                ? 'bg-rose-600 text-white'
                : 'text-[#a69b8d] hover:text-rose-400'
            }`}
          >
            ⚠️ {lang === 'ar' ? 'الراحة البيولوجية' : 'Repos Biologique'} ({restFish.length})
          </button>
        </div>

        <span className="font-mono text-xs text-[#786c60]">
          {lang === 'ar'
            ? 'انقر على أي سمكة لمعاينة البطاقة التقنية وطريقة التنقية'
            : 'Cliquez sur une espèce pour voir sa fiche et son tutoriel de nettoyage.'}
        </span>
      </div>

      {/* Species Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(activeCategory === 'all' || activeCategory === 'peak' ? peakFish : []).map((fish) => (
          <div
            key={fish.id}
            onClick={() => {
              sounds.playBubble()
              onSelectFish(fish)
            }}
            className="group cursor-pointer rounded-xl border border-emerald-500/25 bg-gradient-to-b from-[#141814] to-[#0d100d] p-4 transition-all hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-950/40 relative overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <img
                src={getAssetUrl(fish.imageUrl)}
                alt={fish.nameFrench}
                className="h-14 w-14 rounded-lg object-cover border border-emerald-500/30 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    {lang === 'ar' ? 'في عز الموسم' : 'Plein Pic'}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#f2b47e]">
                    {fish.pricing.currentSpotMAD} {lang === 'ar' ? 'د.م/كلغ' : 'DH/kg'}
                  </span>
                </div>
                <h4 className="mt-1 font-editorial text-lg font-bold text-[#f6f1e7] truncate group-hover:text-emerald-300 transition-colors">
                  {lang === 'ar' ? fish.nameDarijaArabic : lang === 'fr' ? fish.nameFrench : fish.nameEnglish}
                </h4>
                <p className="font-mono text-xs text-[#a69b8d] italic truncate">
                  {fish.scientificName}
                </p>
              </div>
            </div>

            <p className="mt-3 font-mono text-xs text-[#8e9b8a] line-clamp-2 border-t border-white/5 pt-2">
              {lang === 'ar'
                ? fish.seasonality?.description?.ar || 'وفرة متميزة في أسواق السمك بالجملة'
                : fish.seasonality?.description?.fr || 'Pic de capture optimal'}
            </p>
          </div>
        ))}

        {/* Biological Rest Cards */}
        {(activeCategory === 'all' || activeCategory === 'rest' ? restFish : []).map((fish) => (
          <div
            key={fish.id}
            onClick={() => {
              sounds.playSonar()
              onSelectFish(fish)
            }}
            className="group cursor-pointer rounded-xl border border-rose-500/25 bg-gradient-to-b from-[#181212] to-[#0f0c0c] p-4 transition-all hover:border-rose-400 hover:shadow-lg hover:shadow-rose-950/40 relative overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <img
                src={getAssetUrl(fish.imageUrl)}
                alt={fish.nameFrench}
                className="h-14 w-14 rounded-lg object-cover border border-rose-500/30 group-hover:scale-105 transition-transform opacity-70"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1 rounded bg-rose-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-rose-400">
                    <ShieldAlert className="h-3 w-3" />
                    {lang === 'ar' ? 'راحة بيولوجية' : 'Repos Bio'}
                  </span>
                  <span className="font-mono text-[10px] text-rose-400 uppercase font-semibold">
                    {lang === 'ar' ? 'قرار وزاري' : 'Arrêté DPM'}
                  </span>
                </div>
                <h4 className="mt-1 font-editorial text-lg font-bold text-[#f6f1e7] truncate group-hover:text-rose-300 transition-colors">
                  {lang === 'ar' ? fish.nameDarijaArabic : lang === 'fr' ? fish.nameFrench : fish.nameEnglish}
                </h4>
                <p className="font-mono text-xs text-[#a69b8d] italic truncate">
                  {fish.scientificName}
                </p>
              </div>
            </div>

            <p className="mt-3 font-mono text-xs text-rose-300/80 line-clamp-2 border-t border-rose-500/10 pt-2">
              {lang === 'ar'
                ? fish.regulations?.biologicalRestPeriod?.ar || 'فترة الراحة البيولوجية الرسمية لمنع الصيد الجائر وتكاثر النوع'
                : fish.regulations?.biologicalRestPeriod?.fr || 'Période d’interdiction de pêche pour reproduction.'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

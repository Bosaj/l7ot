import React, { useState } from 'react'
import {
  Anchor,
  Compass,
  WifiOff,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  X,
  Radio,
  ShieldCheck,
} from 'lucide-react'
import type { SupportedLanguage } from '../i18n/strings'
import { sounds } from '../lib/soundEffects'

interface OffshoreFishermanBannerProps {
  isHighSeasActive: boolean
  isSimulatedOffline: boolean
  isOnline?: boolean
  lang: SupportedLanguage
  onOpenGpsNavigator: () => void
  onToggleSimulatedOffline: () => void
}

export const OffshoreFishermanBanner: React.FC<OffshoreFishermanBannerProps> = ({
  isHighSeasActive,
  isSimulatedOffline,
  lang,
  onOpenGpsNavigator,
  onToggleSimulatedOffline,
}) => {
  const [isDismissed, setIsDismissed] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  if (!isHighSeasActive && isDismissed) return null

  // When high seas mode is active, even if dismissed we show a compact persistent pill
  if (isHighSeasActive && isDismissed) {
    return (
      <aside
        aria-label={lang === 'ar' ? 'شريط وضع الصيد في عرض البحر' : 'Bannière Mode Haute Mer'}
        className="fixed bottom-4 start-4 z-40 animate-fade-in"
      >
        <button
          type="button"
          onClick={() => {
            sounds.playBubble()
            setIsDismissed(false)
          }}
          className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-[#0b0908]/95 px-4 py-2 font-mono text-xs font-bold text-emerald-300 shadow-2xl backdrop-blur-md hover:bg-emerald-500/10 transition"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <Anchor className="h-4 w-4 text-emerald-400" />
          <span>
            {lang === 'ar'
              ? 'وضع عرض البحر نشط (100% بدون إنترنت)'
              : lang === 'fr'
              ? 'Mode Mer Actif (100% Hors-ligne)'
              : 'High Seas Mode Active (100% Offline)'}
          </span>
        </button>
      </aside>
    )
  }

  // If not high-seas active and not dismissed, don't show the big banner unless user actively wants simulation
  if (!isHighSeasActive) return null

  return (
    <aside
      aria-label={lang === 'ar' ? 'شريط وضع الصيد في عرض البحر' : 'Bannière Mode Haute Mer'}
      className="relative z-30 border-b border-emerald-500/30 bg-gradient-to-r from-[#0d1f18] via-[#0b1713] to-[#0a1512] px-4 py-3 sm:px-6 shadow-xl text-emerald-100"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left Title & Status */}
          <div className="flex items-start gap-3">
            <div className="relative mt-0.5 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/15 text-emerald-300 shadow-inner">
                <Anchor className="h-5 w-5" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
            </div>

            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-editorial text-base font-bold text-emerald-200">
                  {lang === 'ar'
                    ? 'وضع الصيد في عرض البحر نشط · 100% بدون إنترنت'
                    : lang === 'fr'
                    ? 'Mode Pêcheur en Haute Mer · 100% Hors-Ligne'
                    : 'High-Seas Fishermen Mode · 100% Offline Ready'}
                </span>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                  {isSimulatedOffline
                    ? (lang === 'ar' ? 'محاكاة عرض البحر' : 'Simulation Mer')
                    : (lang === 'ar' ? 'لا يوجد اتصال 4G/5G' : 'Zéro Réseau')}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400/80">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  {lang === 'ar' ? '44 صورة وقوانين الصيد مخزنة محلياً' : '44 espèces & Dahir 1973 en cache'}
                </span>
              </div>

              <p className="text-xs text-emerald-300/80 max-w-2xl">
                {lang === 'ar'
                  ? 'تم حفظ جميع البيانات والصور وقوانين الصيد في ذاكرة المتصفح. يمكنك تصفح الأطلس ومراجعة المقاسات واستعمال البوصلة البحرية في أعالي البحار بدون شبكة.'
                  : lang === 'fr'
                  ? 'Toutes les données, photos et lois maritimes sont pré-chargées en cache local. L’atlas et le compas GPS fonctionnent en mer sans aucune connexion.'
                  : 'All marine species, photos, and maritime fishing laws are pre-cached. You can navigate the atlas and GPS compass at sea with zero cellular network.'}
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                sounds.playBubble()
                onOpenGpsNavigator()
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400 bg-emerald-500 px-3.5 py-1.5 font-mono text-xs font-bold text-[#06140e] shadow hover:bg-emerald-400 transition"
            >
              <Compass className="h-4 w-4" />
              <span>
                {lang === 'ar'
                  ? 'بوصلة الموانئ (GPS)'
                  : lang === 'fr'
                  ? 'Compas Portuaire (GPS)'
                  : 'Marine Compass (GPS)'}
              </span>
            </button>

            {isSimulatedOffline && (
              <button
                type="button"
                onClick={onToggleSimulatedOffline}
                className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-2.5 py-1.5 font-mono text-xs text-emerald-300 hover:bg-emerald-900/40 transition"
                title={lang === 'ar' ? 'إلغاء وضع المحاكاة' : 'Désactiver la simulation'}
              >
                <WifiOff className="h-3.5 w-3.5" />
                <span>{lang === 'ar' ? 'إنهاء المحاكاة' : 'Quitter'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                sounds.playBubble()
                setIsExpanded(!isExpanded)
              }}
              className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition"
              aria-label={isExpanded ? 'Collapse info' : 'Expand info'}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playBubble()
                setIsDismissed(true)
              }}
              className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-emerald-500/20 text-emerald-400/60 hover:text-emerald-200 transition"
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Collapsible Deep Telemetry & Safety Details */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-emerald-500/20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-emerald-200/90 animate-fade-in">
            <div className="flex items-start gap-2 rounded bg-emerald-950/40 p-2.5 border border-emerald-500/20">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-mono text-[11px] text-emerald-300">
                  {lang === 'ar' ? 'القوانين والمقاسات محلياً' : 'Législation Dahir 1973'}
                </strong>
                <span className="text-[11px] text-emerald-300/70">
                  {lang === 'ar'
                    ? 'جدول المقاسات الأدنى المسموح بصيدها (الصول 20 سم، الدرعي 36 سم، السردين 11 سم) متوفر 100% دون إنترنت.'
                    : 'Les tailles minimales légales de débarquement sont enregistrées hors-ligne pour contrôle en mer.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded bg-emerald-950/40 p-2.5 border border-emerald-500/20">
              <Radio className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-mono text-[11px] text-emerald-300">
                  {lang === 'ar' ? 'قناة النجدة البحرية VHF 16' : 'Canal VHF 16 & MRCC'}
                </strong>
                <span className="text-[11px] text-emerald-300/70">
                  {lang === 'ar'
                    ? 'تردد الاستغاثة 156.800 MHz ومركز تنسيق الإنقاذ البحري بالرباط (+212 537 62 58 77) متاح بنقرة واحدة.'
                    : 'Fréquence 156.800 MHz et protocole MAYDAY international prêts pour diffusion radio.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded bg-emerald-950/40 p-2.5 border border-emerald-500/20">
              <Compass className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-mono text-[11px] text-emerald-300">
                  {lang === 'ar' ? 'مستشعر المسافة إلى أقرب ميناء' : 'Cap & Distance Portuaire'}
                </strong>
                <span className="text-[11px] text-emerald-300/70">
                  {lang === 'ar'
                    ? 'حساب المسافة بالأميال البحرية (NM) وزاوية السمت البوصلية للعودة الآمنة لأقرب ميناء صيد مغربي.'
                    : 'Calcul automatique du cap azimut et de la distance vers le port ONP de refuge le plus proche.'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

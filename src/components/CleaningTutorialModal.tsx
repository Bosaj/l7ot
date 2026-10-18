import React, { useState } from 'react'
import {
  X,
  Sparkles,
  Scissors,
  Lightbulb,
  Clock,
  Play,
  ExternalLink,
} from 'lucide-react'
import type { Fish } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'

interface CleaningTutorialModalProps {
  fish: Fish
  lang: SupportedLanguage
  onClose: () => void
}

/** Click-to-play YouTube player: loads no third-party scripts until the user presses play. */
const VideoPlayer: React.FC<{ videoId: string; title: string; lang: SupportedLanguage }> = ({
  videoId,
  title,
  lang,
}) => {
  const [playing, setPlaying] = useState(false)
  const watchLabel =
    lang === 'fr' ? 'Ouvrir sur YouTube' : lang === 'en' ? 'Open on YouTube' : 'فتح على يوتيوب'
  return (
    <div className="space-y-2">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-xl">
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
              alt=""
              className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cyan-500 text-white shadow-2xl shadow-cyan-500/40 ring-8 ring-cyan-500/20 transition group-hover:scale-110">
              <Play className="h-7 w-7 translate-x-0.5 fill-current" />
            </span>
          </button>
        )}
      </div>
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-cyan-300"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        {watchLabel}
      </a>
    </div>
  )
}

export const CleaningTutorialModal: React.FC<CleaningTutorialModalProps> = ({
  fish,
  lang,
  onClose,
}) => {
  const tut = fish.cleaningTutorial

  const title = lang === 'fr' ? tut.methodNameFr : lang === 'en' ? tut.methodNameEn : tut.methodNameAr
  const tools = lang === 'fr' ? tut.toolsNeededFr : lang === 'en' ? tut.toolsNeededEn : tut.toolsNeededAr

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
        {/* Header Hero */}
        <div className="relative border-b border-white/10 bg-gradient-to-br from-slate-900 via-cyan-950 to-blue-950 p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-white backdrop-blur-md transition-colors hover:bg-rose-500"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
              <Scissors className="h-3.5 w-3.5" />
              {lang === 'fr'
                ? 'Tutoriel de nettoyage marocain (L’Kessal)'
                : lang === 'en'
                ? 'Moroccan Fishmonger Cleaning Tutorial'
                : 'دليل تنقية الحوت بالمغرب (طريقة الكسال)'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {title}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'fr'
                ? `Technique artisanale des maîtres écaillers marocains pour préparer ${fish.nameFrench} sans abîmer la chair.`
                : lang === 'en'
                ? `Master the authentic Moroccan market techniques to prepare ${fish.nameEnglish} cleanly and swiftly.`
                : `تعلم كيف ينقي مهنيو أسواق السمك المغربية (معلم الحوت) سمكة ${fish.nameDarijaArabic} باحترافية وسرعة ونظافة دون إتلاف طراوة اللحم.`}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5 rounded-xl bg-slate-950/60 px-3 py-1.5 border border-white/5">
              <Clock className="h-3.5 w-3.5 text-cyan-400" />
              {lang === 'fr'
                ? `Durée : ~${tut.prepTimeMinutes} min`
                : lang === 'en'
                ? `Estimated: ~${tut.prepTimeMinutes} mins`
                : `المدة المقدرة: ${tut.prepTimeMinutes} دقائق`}
            </span>
            <span className="flex items-center gap-1.5 rounded-xl bg-slate-950/60 px-3 py-1.5 border border-white/5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              {lang === 'fr'
                ? `Difficulté : ${tut.difficulty === 'easy' ? 'Facile' : tut.difficulty === 'medium' ? 'Moyenne' : 'Professionnel'}`
                : lang === 'en'
                ? `Level: ${tut.difficulty === 'easy' ? 'Easy' : tut.difficulty === 'medium' ? 'Moderate' : 'Pro'}`
                : `مستوى الصعوبة: ${tut.difficulty === 'easy' ? 'سهل' : tut.difficulty === 'medium' ? 'متوسط' : 'محترف'}`}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {fish.cleaningVideoId && (
            <VideoPlayer
              videoId={fish.cleaningVideoId}
              lang={lang}
              title={
                lang === 'fr'
                  ? `Vidéo : nettoyer ${fish.nameFrench}`
                  : lang === 'en'
                  ? `Video: how to clean ${fish.nameEnglish}`
                  : `فيديو: تنقية ${fish.nameDarijaArabic}`
              }
            />
          )}

          {/* Tools Needed */}
          <div className="rounded-2xl border border-white/5 bg-slate-950/50 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              {lang === 'fr' ? 'Matériel requis :' : lang === 'en' ? 'Required tools :' : 'الأدوات والمواد المطلوبة:'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, i) => (
                <span
                  key={i}
                  className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300"
                >
                  ✓ {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {lang === 'fr'
                ? 'Étapes de découpe et préparation :'
                : lang === 'en'
                ? 'Step-by-step cleaning procedure:'
                : 'خطوات التنظيف مرحلة بمرحلة:'}
            </h4>

            {tut.steps.map((step) => {
              const stepTitle = lang === 'fr' ? step.titleFr : lang === 'en' ? step.titleEn : step.titleAr
              const stepInstruction = lang === 'fr' ? step.instructionFr : lang === 'en' ? step.instructionEn : step.instructionAr
              const kessalTip = lang === 'fr' ? step.kessalTipFr : lang === 'en' ? step.kessalTipEn : step.kessalTipAr

              return (
                <div
                  key={step.stepNumber}
                  className="rounded-3xl border border-white/5 bg-slate-950/60 p-5 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-xs font-black text-slate-950">
                      {step.stepNumber}
                    </span>
                    <h5 className="text-sm font-bold text-white">
                      {stepTitle}
                    </h5>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {stepInstruction}
                  </p>

                  {/* Kessal Secret Box */}
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-3 flex items-start gap-2.5">
                    <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-amber-300 block">
                        {lang === 'fr'
                          ? 'Le secret de l’artisan poissonnier :'
                          : lang === 'en'
                          ? 'Moroccan fishmonger pro tip:'
                          : 'سر معلم الحوت (الكسال):'}
                      </span>
                      <p className="text-xs text-amber-100/90 leading-relaxed">
                        {kessalTip}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}


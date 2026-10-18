import React, { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Globe,
  Anchor,
  Calendar,
} from 'lucide-react'
import { FISHERIES_AGREEMENTS, MARKET_TRENDS } from '../data/agreements'
import type { FisheriesAgreement } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'

interface AgreementsAndMarketProps {
  lang: SupportedLanguage
}

export const AgreementsAndMarket: React.FC<AgreementsAndMarketProps> = ({ lang }) => {
  const [activeSubSection, setActiveSubSection] = useState<'agreements' | 'trends'>('agreements')

  const getStatusBadge = (status: FisheriesAgreement['status']) => {
    switch (status) {
      case 'active':
        return {
          bg: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
          label: lang === 'fr' ? 'Actif & En vigueur' : lang === 'en' ? 'Active & Enforced' : 'سارٍ ومنتظم',
        }
      case 'suspended_under_renegotiation':
        return {
          bg: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
          label:
            lang === 'fr'
              ? 'Expiré / En renégociation souveraine'
              : lang === 'en'
              ? 'Expired / Sovereign Renegotiation'
              : 'منتهٍ / في طور إعادة التفاوض السيادي',
        }
      case 'framework':
        return {
          bg: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
          label: lang === 'fr' ? 'Cadre permanent' : lang === 'en' ? 'Permanent Framework' : 'إطار تعاون دائم',
        }
    }
  }

  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-rose-400" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-emerald-400" />
      case 'stable':
        return <Minus className="h-4 w-4 text-cyan-400" />
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Presentation Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
            <Anchor className="h-3.5 w-3.5" />
            <span>
              {lang === 'fr'
                ? 'Diplomatie Maritime & Observatoire Économique'
                : lang === 'en'
                ? 'Maritime Diplomacy & Economic Observatory'
                : 'الدبلوماسية البحرية المغربية وتتبع مؤشرات الأسواق'}
            </span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
            {lang === 'fr'
              ? 'Accords Internationaux de Pêche & Baromètre des Marchés'
              : lang === 'en'
              ? 'International Fisheries Treaties & Live Market Barometer'
              : 'معاهدات الصيد الدولية للمملكة ومؤشرات أسواق السمك (الماضي، الحاضر، والمستقبل)'}
          </h2>

          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            {lang === 'fr'
              ? 'Analyse approfondie des partenariats halieutiques stratégiques conclus par le Royaume du Maroc (UE, Russie, Japon, ICCAT), des contreparties économiques souveraines, ainsi que l’évolution passée, présente et prospective des cours du poisson avec les périodes de repos biologique.'
              : lang === 'en'
              ? 'In-depth analysis of strategic fisheries partnerships concluded by the Kingdom of Morocco (EU, Russia, Japan, ICCAT), sovereign economic compensations, and comprehensive market price dynamics (historical, current, and future forecast) coupled with biological rest cycles.'
              : 'دليل شامل ومفصل للاتفاقيات الدولية الكبرى للصيد البحري التي أبرمها المغرب مع الاتحاد الأوروبي، وروسيا، واليابان، ولجنة ICCAT، مع شرح شروطها السيادية ومكاسب المملكة، وتتبع شامل لتطور أسعار الأسماك بالماضي والحاضر والمستقبل وفترات الراحة البيولوجية.'}
          </p>
        </div>

        {/* Floating Toggle Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={() => setActiveSubSection('agreements')}
            className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold transition-all ${
              activeSubSection === 'agreements'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Globe className="h-4 w-4" />
            <span>
              {lang === 'fr'
                ? '1. Accords & Traités Internationaux'
                : lang === 'en'
                ? '1. International Fisheries Treaties'
                : '1. المعاهدات والاتفاقيات الدولية'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubSection('trends')}
            className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold transition-all ${
              activeSubSection === 'trends'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>
              {lang === 'fr'
                ? '2. Suivi des Marchés & الراحة البيولوجية'
                : lang === 'en'
                ? '2. Market Trends & Biological Rest'
                : '2. تتبع الأسواق والراحة البيولوجية'}
            </span>
          </button>
        </div>
      </div>

      {/* Sub-Section 1: International Fisheries Agreements */}
      {activeSubSection === 'agreements' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {FISHERIES_AGREEMENTS.map((agreement) => {
              const badge = getStatusBadge(agreement.status)
              return (
                <div
                  key={agreement.id}
                  className="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/80"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{agreement.flag}</span>
                        <div>
                          <h3 className="text-lg font-black text-white sm:text-xl">
                            {agreement.partnerName[lang]}
                          </h3>
                          <span className="text-xs text-slate-400">{agreement.period}</span>
                        </div>
                      </div>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${badge.bg}`}
                      >
                        {badge.label}
                      </span>
                    </div>

                    {/* Financial & Economic Value */}
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-3.5">
                      <span className="block text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                        {lang === 'fr'
                          ? 'Valeur Économique & Compensation'
                          : lang === 'en'
                          ? 'Economic Value & Financial Compensation'
                          : 'القيمة الاقتصادية والتعويضات المالية للمغرب'}
                      </span>
                      <p className="text-xs font-semibold text-emerald-200">
                        {agreement.economicValue[lang]}
                      </p>
                    </div>

                    {/* Strategic Context */}
                    <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-4">
                      <span className="block text-[11px] font-bold text-cyan-300 uppercase tracking-wider mb-2">
                        {lang === 'fr'
                          ? 'Contexte Stratégique & Souveraineté'
                          : lang === 'en'
                          ? 'Strategic Context & Sovereignty'
                          : 'السياق الإستراتيجي والسيادة البحرية'}
                      </span>
                      <p className="text-xs leading-relaxed text-slate-300">
                        {agreement.strategicContext[lang]}
                      </p>
                    </div>

                    {/* Key Terms */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-200 block">
                        {lang === 'fr'
                          ? 'Clauses clés & Quotas :'
                          : lang === 'en'
                          ? 'Key Clauses & Quotas:'
                          : 'أبرز الشروط والالتزامات والحصص:'}
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {agreement.keyTerms[lang].map((term, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-0.5">•</span>
                            <span>{term}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What Morocco Gains */}
                    <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-3.5 space-y-1.5">
                      <span className="block text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                        {lang === 'fr'
                          ? 'Gains concrets pour le secteur national'
                          : lang === 'en'
                          ? 'Direct Gains for Morocco'
                          : 'المكاسب المباشرة لقطاع الصيد والبحارة المغاربة'}
                      </span>
                      <ul className="space-y-1 text-xs text-amber-100">
                        {agreement.moroccoGains[lang].map((gain, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-400">✓</span>
                            <span>{gain}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Sub-Section 2: Market Trends Tracker & Biological Rest */}
      {activeSubSection === 'trends' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-4 text-xs text-slate-300 leading-relaxed">
            💡{' '}
            <strong className="text-cyan-300">
              {lang === 'fr'
                ? 'Comment fonctionne le marché du poisson au Maroc ?'
                : lang === 'en'
                ? 'How does the Moroccan fish market operate?'
                : 'كيف تعمل وتتقلب أسعار سوق السمك بالمغرب؟'}
            </strong>{' '}
            {lang === 'fr'
              ? 'Les prix sont dictés par les débarquements journaliers dans les halles aux poissons de l’ONP, l’état de la mer (tempêtes hivernales appelées "المنية"), les périodes obligatoires de repos biologique et les pics festifs (notamment Ramadan où la demande explose).'
              : lang === 'en'
              ? 'Prices are dictated by daily landings across ONP port auctions, oceanic conditions (winter storms known as "l-mniyya"), mandatory biological rest closures, and festive surges (especially Ramadan where domestic demand skyrockets).'
              : 'تتحدد أسعار السمك يومياً عبر المزاد العلني في أسواق الجملة بالموانئ (Halle aux poissons التابعة لـ ONP)، وتتأثر بشكل مباشر بحالة البحر (فترات هيجان البحر المعروفة بـ "المنية")، وفترات الراحة البيولوجية لحماية توالد الأسماك، وذروة الطلب في شهر رمضان والأعياد.'}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {MARKET_TRENDS.map((trend) => (
              <div
                key={trend.id}
                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md transition-all hover:border-cyan-500/30"
              >
                <div className="space-y-5">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div>
                      <h3 className="text-xl font-black text-white">{trend.speciesName[lang]}</h3>
                      <span className="text-xs text-slate-400">
                        {lang === 'fr'
                          ? 'Observatoire des cours & Perspectives'
                          : lang === 'en'
                          ? 'Price Trends & Market Outlook'
                          : 'مرصد الأسعار والتوقعات المستقبلية'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs">
                      {getTrendIcon(trend.presentStatus.trendDirection)}
                      <span className="font-semibold text-white">
                        {trend.presentStatus.trendDirection === 'up'
                          ? lang === 'fr'
                            ? 'Tendance Haussière'
                            : lang === 'en'
                            ? 'Bullish / Rising'
                            : 'منحى تصاعدي'
                          : trend.presentStatus.trendDirection === 'down'
                          ? lang === 'fr'
                            ? 'Tendance Baissière'
                            : lang === 'en'
                            ? 'Bearish / Dropping'
                            : 'منحى تنازلي'
                          : lang === 'fr'
                          ? 'Cours Stable'
                          : lang === 'en'
                          ? 'Stable Market'
                          : 'سعر مستقر'}
                      </span>
                    </div>
                  </div>

                  {/* 3-Timeframes Grid: Past, Present, Future */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
                    {/* Past */}
                    <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-3 space-y-1.5">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {lang === 'fr' ? '1. Le Passé' : lang === 'en' ? '1. Past Trend' : '1. في الماضي'}
                      </span>
                      <div className="text-sm font-bold text-slate-300">
                        {trend.pastTrend.priceRangeMAD}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {trend.pastTrend.summary[lang]}
                      </p>
                    </div>

                    {/* Present */}
                    <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-3 space-y-1.5">
                      <span className="block text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                        {lang === 'fr' ? '2. Le Présent' : lang === 'en' ? '2. Present Status' : '2. الوضع الحالي'}
                      </span>
                      <div className="text-sm font-bold text-cyan-300">
                        {trend.presentStatus.priceRangeMAD}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {trend.presentStatus.summary[lang]}
                      </p>
                    </div>

                    {/* Future */}
                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-3 space-y-1.5">
                      <span className="block text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                        {lang === 'fr' ? '3. Perspectives Futures' : lang === 'en' ? '3. Future Outlook' : '3. التوقعات القادمة'}
                      </span>
                      <div className="text-sm font-bold text-emerald-300">
                        {trend.futureForecast.outlook === 'stable'
                          ? lang === 'fr'
                            ? 'Stabilisation'
                            : lang === 'en'
                            ? 'Stabilizing'
                            : 'استقرار مرتقب'
                          : trend.futureForecast.outlook === 'up'
                          ? lang === 'fr'
                            ? 'Maintien élevé'
                            : lang === 'en'
                            ? 'Premium High'
                            : 'استمرار الارتفاع'
                          : lang === 'fr'
                          ? 'Détente des prix'
                          : lang === 'en'
                          ? 'Price Easing'
                          : 'انخفاض وتوفر'}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {trend.futureForecast.projection[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Biological Rest Period Notice */}
                  {trend.biologicalRestPeriod && (
                    <div className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-950/20 p-3.5 text-xs text-amber-200">
                      <Calendar className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-amber-300 font-bold mb-0.5">
                          {lang === 'fr'
                            ? `Période de Repos Biologique : ${trend.biologicalRestPeriod.months}`
                            : lang === 'en'
                            ? `Biological Rest Closure: ${trend.biologicalRestPeriod.months}`
                            : `فترة الراحة البيولوجية: ${trend.biologicalRestPeriod.months}`}
                        </strong>
                        <p className="text-[11px] text-amber-100 leading-relaxed">
                          {trend.biologicalRestPeriod.description[lang]}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Future Growth Drivers */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-300 block">
                      {lang === 'fr'
                        ? 'Facteurs d’évolution et initiatives étatiques :'
                        : lang === 'en'
                        ? 'Market drivers and governance factors:'
                        : 'عوامل التطور وبرامج الدولة لدعم المخزون:'}
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {trend.futureForecast.driverFactors[lang].map((factor, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-400">✓</span>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

import React, { useState } from 'react'
import {
  Globe2,
  Anchor,
  Shield,
  Coins,
  TrendingUp,
} from 'lucide-react'
import { MOROCCAN_INTERNATIONAL_CONTRACTS } from '../data/contracts'
import type { SupportedLanguage } from '../i18n/strings'
import { STRINGS } from '../i18n/strings'

interface InternationalAgreementsProps {
  lang: SupportedLanguage
}

export const InternationalAgreements: React.FC<InternationalAgreementsProps> = ({
  lang,
}) => {
  const t = STRINGS[lang]
  const [selectedId, setSelectedId] = useState<string>('maroc-ue')

  const currentContract =
    MOROCCAN_INTERNATIONAL_CONTRACTS.find((c) => c.id === selectedId) ||
    MOROCCAN_INTERNATIONAL_CONTRACTS[0]!

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-cyan-950 to-blue-950 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
            <Globe2 className="h-3.5 w-3.5" />
            <span>الدبلوماسية البحرية والاقتصاد الأزرق للمملكة</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            {t.navAgreements}
          </h2>
          <p className="max-w-2xl text-xs sm:text-sm text-slate-300 leading-relaxed">
            تحليل شامل ومفصل لجميع الاتفاقيات والمعاهدات التي أبرمتها المملكة المغربية مع الاتحاد الأوروبي، روسيا الاتحادية، اليابان ومخطط أليوتيس الوطني لحماية واستثمار 3,500 كلم من السواحل.
          </p>
        </div>
      </div>

      {/* Contract Selector Tabs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {MOROCCAN_INTERNATIONAL_CONTRACTS.map((contract) => (
          <button
            key={contract.id}
            type="button"
            onClick={() => setSelectedId(contract.id)}
            className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-right transition-all ${
              selectedId === contract.id
                ? 'border-cyan-400 bg-cyan-500/20 text-white shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40'
                : 'border-white/5 bg-slate-900/60 text-slate-400 hover:border-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-2xl">{contract.flagEmoji}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  contract.status === 'active'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : contract.status === 'expired_negotiating'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}
              >
                {contract.status === 'active'
                  ? 'ساري المفعول'
                  : contract.status === 'expired_negotiating'
                  ? 'منتهي (تفاوض سيادي)'
                  : 'شراكة دائمة'}
              </span>
            </div>
            <span className="text-xs font-bold text-white mt-1">
              {lang === 'ar'
                ? contract.partnerNameAr
                : lang === 'fr'
                ? contract.partnerNameFr
                : contract.partnerNameEn}
            </span>
          </button>
        ))}
      </div>

      {/* Deep-Dive Contract Details */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{currentContract.flagEmoji}</span>
              <h3 className="text-2xl font-black text-white">
                {lang === 'ar'
                  ? currentContract.titleAr
                  : lang === 'fr'
                  ? currentContract.titleFr
                  : currentContract.titleEn}
              </h3>
            </div>
            <p className="text-xs font-semibold text-cyan-400">
              {currentContract.datesActive}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 text-right">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">
                السفن والحصص المرخصة
              </span>
              <span className="text-xs font-bold text-cyan-300">
                {currentContract.vesselsQuota}
              </span>
            </div>
          </div>
        </div>

        {/* Financial Compensation & Royalties */}
        <div className="rounded-2xl border border-amber-500/20 bg-amber-950/15 p-4 flex items-start gap-3">
          <Coins className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
              المقابل والتعويض المالي السنوي
            </h4>
            <p className="text-xs text-amber-200/90 leading-relaxed font-medium">
              {currentContract.financialCompensation}
            </p>
          </div>
        </div>

        {/* Key Clauses & Technical Requirements */}
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Anchor className="h-4 w-4 text-cyan-400" />
            أهم البنود والشروط الملزمة في الاتفاقية
          </h4>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {(lang === 'ar'
              ? currentContract.keyClausesAr
              : lang === 'fr'
              ? currentContract.keyClausesFr
              : currentContract.keyClausesEn
            ).map((clause, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 rounded-2xl border border-white/5 bg-slate-950/60 p-3.5 text-xs text-slate-300"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-[10px] font-black text-cyan-300">
                  {idx + 1}
                </span>
                <p className="leading-relaxed">{clause}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Geopolitical Context */}
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/15 p-5 space-y-2">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
            <Shield className="h-4 w-4" />
            السياق الجيوسياسي والسيادة البحرية الوطنية
          </h4>
          <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed">
            {lang === 'ar'
              ? currentContract.geopoliticalContextAr
              : lang === 'fr'
              ? currentContract.geopoliticalContextFr
              : currentContract.geopoliticalContextEn}
          </p>
        </div>

        {/* Impact on Local Moroccan Market */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/15 p-5 space-y-2">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
            <TrendingUp className="h-4 w-4" />
            الأثر على السوق المحلي وأسعار الحوت في المغرب
          </h4>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            {lang === 'ar'
              ? currentContract.impactOnMoroccanMarketAr
              : lang === 'fr'
              ? currentContract.impactOnMoroccanMarketFr
              : currentContract.impactOnMoroccanMarketEn}
          </p>
        </div>
      </div>
    </div>
  )
}

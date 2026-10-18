import React, { useState, useMemo } from 'react'
import {
  Scale,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Award,
  Sparkles,
  Volume2,
  ArrowLeftRight,
  Check,
  Copy,
} from 'lucide-react'
import type { Fish } from '../data/types'
import type { Language } from '../i18n/strings'
import { speakDarija } from '../lib/speech'
import { PriceBadge } from './PriceBadge'

interface SoukBasketAndComparatorProps {
  fishList?: Fish[]
  allFish?: Fish[]
  lang: Language
  onSelectFish: (fish: Fish) => void
}

interface BasketItem {
  fishId: string
  kg: number
  includeKessalCleaning: boolean
}

export const SoukBasketAndComparator: React.FC<SoukBasketAndComparatorProps> = ({
  fishList: propFishList,
  allFish,
  lang,
  onSelectFish,
}) => {
  const fishList = allFish || propFishList || []
  const [leftFishId, setLeftFishId] = useState<string>(fishList[0]?.id || 'sardine')
  const [rightFishId, setRightFishId] = useState<string>(
    fishList[2]?.id || 'dorade-royale'
  )
  const [basket, setBasket] = useState<BasketItem[]>([
    { fishId: 'sardine', kg: 1.5, includeKessalCleaning: true },
    { fishId: 'crevette', kg: 0.5, includeKessalCleaning: false },
  ])
  const [selectedAddFishId, setSelectedAddFishId] = useState<string>('merlan')
  const [copiedList, setCopiedList] = useState(false)

  const leftFish = useMemo(
    () => fishList.find((f) => f.id === leftFishId) || fishList[0],
    [fishList, leftFishId]
  )
  const rightFish = useMemo(
    () => fishList.find((f) => f.id === rightFishId) || fishList[1],
    [fishList, rightFishId]
  )

  const getLocalizedName = (fish: Fish) => {
    if (lang === 'ar') return fish.nameDarijaArabic
    if (lang === 'fr') return fish.nameFrench
    return fish.nameEnglish
  }

  const currencyShort = lang === 'ar' ? 'درهم' : 'MAD'

  const addToBasket = (fishId: string) => {
    setBasket((prev) => {
      const existing = prev.find((item) => item.fishId === fishId)
      if (existing) {
        return prev.map((item) =>
          item.fishId === fishId
            ? { ...item, kg: Math.round((item.kg + 0.5) * 10) / 10 }
            : item
        )
      }
      return [...prev, { fishId, kg: 1, includeKessalCleaning: true }]
    })
  }

  const updateKg = (fishId: string, delta: number) => {
    setBasket((prev) =>
      prev
        .map((item) =>
          item.fishId === fishId
            ? { ...item, kg: Math.max(0.5, Math.round((item.kg + delta) * 10) / 10) }
            : item
        )
    )
  }

  const toggleKessal = (fishId: string) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.fishId === fishId
          ? { ...item, includeKessalCleaning: !item.includeKessalCleaning }
          : item
      )
    )
  }

  const removeFromBasket = (fishId: string) => {
    setBasket((prev) => prev.filter((item) => item.fishId !== fishId))
  }

  const basketTotals = useMemo(() => {
    let fishCostMAD = 0
    let kessalCostMAD = 0
    let totalKg = 0
    let totalProteinGrams = 0
    let totalOmega3Mg = 0

    for (const item of basket) {
      const fish = fishList.find((f) => f.id === item.fishId)
      if (!fish) continue
      totalKg += item.kg
      fishCostMAD += fish.pricing.currentSpotMAD * item.kg
      if (item.includeKessalCleaning) {
        kessalCostMAD += Math.ceil(item.kg) * 5
      }
      // 1 kg = 10 x 100g
      totalProteinGrams += fish.nutrition.proteinGrams * item.kg * 10
      totalOmega3Mg += fish.nutrition.omega3Mg * item.kg * 10
    }

    return {
      fishCostMAD: Math.round(fishCostMAD),
      kessalCostMAD: Math.round(kessalCostMAD),
      grandTotalMAD: Math.round(fishCostMAD + kessalCostMAD),
      totalKg: Math.round(totalKg * 10) / 10,
      totalProteinGrams: Math.round(totalProteinGrams),
      totalOmega3Grams: (totalOmega3Mg / 1000).toFixed(1),
    }
  }, [basket, fishList])

  const copySoukList = () => {
    const lines = basket.map((item) => {
      const f = fishList.find((x) => x.id === item.fishId)
      if (!f) return ''
      const sub = Math.round(f.pricing.currentSpotMAD * item.kg)
      return `• ${getLocalizedName(f)} (${f.nameDarijaArabic}) — ${item.kg} kg : ~${sub} ${currencyShort}`
    })
    const summary = `L7OT — ${lang === 'ar' ? 'قفة المرسى المغربية' : 'Panier Souk Marocain'}\n${lines.join('\n')}\nTotal: ~${basketTotals.grandTotalMAD} ${currencyShort}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary).catch(() => {})
    }
    setCopiedList(true)
    setTimeout(() => setCopiedList(false), 2200)
  }

  if (!leftFish || !rightFish) return null

  return (
    <section className="my-12 rounded-sm border border-[#2a211c] bg-[#120e0c] p-5 sm:p-8 text-[#f4ede2] shadow-2xl">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[#2a211c] pb-6 md:flex-row md:items-end">
        <div>
          <span className="inline-flex items-center gap-2 rounded-sm border border-[#c85a32]/40 bg-[#c85a32]/15 px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#e09f3e]">
            <Sparkles className="h-3.5 w-3.5" />
            {lang === 'ar'
              ? 'أدوات المرسى التفاعلية · قفة السوق ومقارن الأسماك'
              : lang === 'fr'
                ? 'OUTILS DU PORT · COMPARATEUR & PANIER DE LA CRIÉE'
                : 'PORT TOOLS · HEAD-TO-HEAD COMPARATOR & SOUK BASKET'}
          </span>
          <h2 className="mt-2 font-editorial text-2xl font-bold text-[#f4ede2] sm:text-4xl">
            {lang === 'ar'
              ? 'مقارن الأسماك وجهاً لوجه وحاسبة قفة المرسى'
              : lang === 'fr'
                ? 'Comparateur d’Espèces & Simulateur de Panier au Souk'
                : 'Species Head-to-Head Comparator & Souk Basket Estimator'}
          </h2>
        </div>
        <p className="max-w-xl text-xs leading-relaxed text-[#b5a592] sm:text-sm">
          {lang === 'ar'
            ? 'قارن أي سمكتين من أصل 32 نوعاً مغربياً من حيث الثمن في المرسى، التصدير، الأوميغا 3 والبروتين، أو خطط ميزانية قفة الحوت الأسبوعية لعائلتك مع حساب أجرة التنقية عند الكسال.'
            : lang === 'fr'
              ? 'Comparez deux espèces marocaines côte à côte (prix criée, export, oméga-3, protéines, arêtes) et préparez votre budget marché avec le forfait nettoyage du Kessal.'
              : 'Compare any two Moroccan species side-by-side (Souk price, export value, Omega-3, protein, bones) and estimate your market basket with Kessal cleaning fees.'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        {/* LEFT 7 COLS: HEAD-TO-HEAD COMPARATOR */}
        <div className="rounded-sm border border-[#2a211c] bg-[#181310] p-5 xl:col-span-7">
          <div className="mb-5 flex items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 font-editorial text-lg font-bold text-[#f4ede2] sm:text-xl">
              <Scale className="h-5 w-5 text-[#c85a32]" />
              {lang === 'ar'
                ? 'مقارنة شاملة وجهاً لوجه (32 نوعاً)'
                : lang === 'fr'
                  ? 'Duel Comparatif Côte à Côte (32 Espèces)'
                  : 'Head-to-Head Species Duel (32 Species)'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setLeftFishId(rightFishId)
                setRightFishId(leftFishId)
              }}
              className="inline-flex items-center gap-1.5 rounded-sm border border-[#332822] bg-[#120e0c] px-3 py-1.5 font-mono text-xs text-[#e09f3e] transition hover:border-[#c85a32]"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              {lang === 'ar' ? 'تبديل السمكتين' : lang === 'fr' ? 'Inverser' : 'Swap'}
            </button>
          </div>

          {/* Two selectors */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { fish: leftFish, setId: setLeftFishId, accent: 'border-[#c85a32]/50' },
              { fish: rightFish, setId: setRightFishId, accent: 'border-[#e09f3e]/50' },
            ].map(({ fish, setId, accent }, idx) => (
              <div
                key={idx}
                className={`rounded-sm border ${accent} bg-[#120e0c] p-3.5`}
              >
                <select
                  value={fish.id}
                  onChange={(e) => setId(e.target.value)}
                  aria-label={idx === 0 ? 'First fish species' : 'Second fish species'}
                  className="mb-3 w-full rounded-sm border border-[#2a211c] bg-[#181310] px-3 py-2 text-xs font-semibold text-[#f4ede2] focus:border-[#c85a32] focus:outline-none"
                >
                  {fishList.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.nameDarijaArabic} · {lang === 'ar' ? `${f.pricing.currentSpotMAD} درهم/كلغ` : `${f.nameFrench} (${f.pricing.currentSpotMAD} MAD)`}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-3">
                  <img
                    src={fish.imageUrl}
                    alt={getLocalizedName(fish)}
                    onClick={() => onSelectFish(fish)}
                    className="h-16 w-20 cursor-pointer rounded-sm border border-[#2a211c] object-cover transition hover:opacity-90"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onSelectFish(fish)}
                        className="truncate font-editorial text-base font-bold text-[#f4ede2] hover:text-[#e09f3e]"
                      >
                        {getLocalizedName(fish)}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          speakDarija(fish.nameDarijaArabic, fish.audioPhonetic, fish.id)
                        }
                        className="rounded-sm border border-[#2a211c] p-1 text-[#e09f3e] hover:border-[#c85a32]"
                        title={lang === 'ar' ? 'استمع للاسم بالدارجة' : 'Listen Darija'}
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="truncate font-mono text-[11px] text-[#8c7d6b]">
                      {fish.nameDarijaLatin}
                    </p>
                    <div className="mt-1">
                      <PriceBadge
                        amount={fish.pricing.currentSpotMAD}
                        unit="kg"
                        lang={lang}
                        amountClassName="text-xs font-bold text-[#e09f3e]"
                        unitClassName="text-[10px] text-[#e09f3e]/80"
                        className="rounded-sm bg-[#c85a32]/15 px-2 py-0.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Metrics Table */}
          <div className="space-y-2.5 text-xs">
            {/* Row 1: Moroccan Market Price */}
            <div className="grid grid-cols-3 items-center gap-2 rounded-sm border border-[#241d19] bg-[#120e0c] px-3 py-2.5">
              <div
                className={`flex items-center gap-1.5 font-mono text-xs font-bold ${
                  leftFish.pricing.currentSpotMAD < rightFish.pricing.currentSpotMAD ? 'text-[#52b788]' : 'text-[#b5a592]'
                }`}
              >
                <PriceBadge
                  amount={leftFish.pricing.currentSpotMAD}
                  unit="kg"
                  lang={lang}
                  amountClassName="text-xs font-bold"
                  unitClassName="text-[10px]"
                />
                {leftFish.pricing.currentSpotMAD < rightFish.pricing.currentSpotMAD && (
                  <Award className="h-3.5 w-3.5 text-[#52b788] shrink-0" />
                )}
              </div>
              <div className="text-center text-[11px] font-medium text-[#8c7d6b]">
                {lang === 'ar' ? 'ثمن السوق المغربي (الأوفر)' : lang === 'fr' ? 'Prix Souk Maroc (Plus économique)' : 'Moroccan Souk Price (Best Value)'}
              </div>
              <div
                className={`flex items-center justify-end gap-1.5 font-mono text-xs font-bold ${
                  rightFish.pricing.currentSpotMAD < leftFish.pricing.currentSpotMAD ? 'text-[#52b788]' : 'text-[#b5a592]'
                }`}
              >
                <PriceBadge
                  amount={rightFish.pricing.currentSpotMAD}
                  unit="kg"
                  lang={lang}
                  amountClassName="text-xs font-bold"
                  unitClassName="text-[10px]"
                />
                {rightFish.pricing.currentSpotMAD < leftFish.pricing.currentSpotMAD && (
                  <Award className="h-3.5 w-3.5 text-[#52b788] shrink-0" />
                )}
              </div>
            </div>

            {/* Row 2: Omega-3 */}
            <div className="grid grid-cols-3 items-center gap-2 rounded-sm border border-[#241d19] bg-[#120e0c] px-3 py-2.5">
              <div
                className={`flex items-center gap-1.5 font-mono text-xs font-bold ${
                  leftFish.nutrition.omega3Mg > rightFish.nutrition.omega3Mg ? 'text-[#52b788]' : 'text-[#b5a592]'
                }`}
              >
                <span>{leftFish.nutrition.omega3Mg} {lang === 'ar' ? 'ملغ' : 'mg'}</span>
                {leftFish.nutrition.omega3Mg > rightFish.nutrition.omega3Mg && (
                  <Award className="h-3.5 w-3.5 text-[#52b788] shrink-0" />
                )}
              </div>
              <div className="text-center text-[11px] font-medium text-[#8c7d6b]">
                {lang === 'ar' ? 'أوميغا 3 (لكل 100 غرام)' : lang === 'fr' ? 'Oméga-3 EPA/DHA (pour 100g)' : 'Omega-3 EPA/DHA (per 100g)'}
              </div>
              <div
                className={`flex items-center justify-end gap-1.5 font-mono text-xs font-bold ${
                  rightFish.nutrition.omega3Mg > leftFish.nutrition.omega3Mg ? 'text-[#52b788]' : 'text-[#b5a592]'
                }`}
              >
                <span>{rightFish.nutrition.omega3Mg} {lang === 'ar' ? 'ملغ' : 'mg'}</span>
                {rightFish.nutrition.omega3Mg > leftFish.nutrition.omega3Mg && (
                  <Award className="h-3.5 w-3.5 text-[#52b788] shrink-0" />
                )}
              </div>
            </div>

            {/* Row 3: Protein */}
            <div className="grid grid-cols-3 items-center gap-2 rounded-sm border border-[#241d19] bg-[#120e0c] px-3 py-2.5">
              <div
                className={`flex items-center gap-1.5 font-mono text-xs font-bold ${
                  leftFish.nutrition.proteinGrams > rightFish.nutrition.proteinGrams ? 'text-[#52b788]' : 'text-[#b5a592]'
                }`}
              >
                <span>{leftFish.nutrition.proteinGrams} {lang === 'ar' ? 'غرام' : 'g'}</span>
                {leftFish.nutrition.proteinGrams > rightFish.nutrition.proteinGrams && (
                  <Award className="h-3.5 w-3.5 text-[#52b788] shrink-0" />
                )}
              </div>
              <div className="text-center text-[11px] font-medium text-[#8c7d6b]">
                {lang === 'ar' ? 'البروتين الصافي (لكل 100 غرام)' : lang === 'fr' ? 'Protéines Marines (pour 100g)' : 'Marine Protein (per 100g)'}
              </div>
              <div
                className={`flex items-center justify-end gap-1.5 font-mono text-xs font-bold ${
                  rightFish.nutrition.proteinGrams > leftFish.nutrition.proteinGrams ? 'text-[#52b788]' : 'text-[#b5a592]'
                }`}
              >
                <span>{rightFish.nutrition.proteinGrams} {lang === 'ar' ? 'غرام' : 'g'}</span>
                {rightFish.nutrition.proteinGrams > leftFish.nutrition.proteinGrams && (
                  <Award className="h-3.5 w-3.5 text-[#52b788] shrink-0" />
                )}
              </div>
            </div>

            {/* Row 4: Global Export */}
            <div className="grid grid-cols-3 items-center gap-2 rounded-sm border border-[#241d19] bg-[#120e0c] px-3 py-2.5">
              <div
                className={`flex items-center gap-1.5 font-mono text-xs font-bold ${
                  leftFish.pricing.globalExportUSD.avg > rightFish.pricing.globalExportUSD.avg ? 'text-[#52b788]' : 'text-[#b5a592]'
                }`}
              >
                <span dir="ltr">${leftFish.pricing.globalExportUSD.avg.toFixed(1)}/kg</span>
                {leftFish.pricing.globalExportUSD.avg > rightFish.pricing.globalExportUSD.avg && (
                  <Award className="h-3.5 w-3.5 text-[#52b788] shrink-0" />
                )}
              </div>
              <div className="text-center text-[11px] font-medium text-[#8c7d6b]">
                {lang === 'ar' ? 'قيمة التصدير العالمي' : lang === 'fr' ? 'Cote Export International' : 'Global Export Valuation'}
              </div>
              <div
                className={`flex items-center justify-end gap-1.5 font-mono text-xs font-bold ${
                  rightFish.pricing.globalExportUSD.avg > leftFish.pricing.globalExportUSD.avg ? 'text-[#52b788]' : 'text-[#b5a592]'
                }`}
              >
                <span dir="ltr">${rightFish.pricing.globalExportUSD.avg.toFixed(1)}/kg</span>
                {rightFish.pricing.globalExportUSD.avg > leftFish.pricing.globalExportUSD.avg && (
                  <Award className="h-3.5 w-3.5 text-[#52b788] shrink-0" />
                )}
              </div>
            </div>

            {/* Row 5: Vitamin B12 & Iron */}
            <div className="grid grid-cols-3 items-center gap-2 rounded-sm border border-[#241d19] bg-[#120e0c] px-3 py-2.5">
              <div
                className={`flex items-center gap-1.5 font-mono text-xs font-bold ${
                  leftFish.nutrition.vitaminB12_mcg + leftFish.nutrition.ironMg > rightFish.nutrition.vitaminB12_mcg + rightFish.nutrition.ironMg ? 'text-[#52b788]' : 'text-[#b5a592]'
                }`}
              >
                <span dir="ltr">{leftFish.nutrition.vitaminB12_mcg}µg · {leftFish.nutrition.ironMg}mg</span>
              </div>
              <div className="text-center text-[11px] font-medium text-[#8c7d6b]">
                {lang === 'ar' ? 'فيتامين B12 والحديد (لكل 100 غرام)' : lang === 'fr' ? 'Vitamine B12 & Fer (pour 100g)' : 'Vitamin B12 & Iron (per 100g)'}
              </div>
              <div
                className={`flex items-center justify-end gap-1.5 font-mono text-xs font-bold ${
                  rightFish.nutrition.vitaminB12_mcg + rightFish.nutrition.ironMg > leftFish.nutrition.vitaminB12_mcg + leftFish.nutrition.ironMg ? 'text-[#52b788]' : 'text-[#b5a592]'
                }`}
              >
                <span dir="ltr">{rightFish.nutrition.vitaminB12_mcg}µg · {rightFish.nutrition.ironMg}mg</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLS: SOUK SHOPPING BASKET ESTIMATOR */}
        <div className="flex flex-col justify-between rounded-sm border border-[#2a211c] bg-[#181310] p-5 xl:col-span-5">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-editorial text-lg font-bold text-[#f4ede2] sm:text-xl">
                <ShoppingBag className="h-5 w-5 text-[#e09f3e]" />
                {lang === 'ar'
                  ? 'قفة المرسى المغربية (حاسبة السوق)'
                  : lang === 'fr'
                    ? 'Panier de la Criée (Simulateur Souk)'
                    : 'Moroccan Souk Basket Calculator'}
              </h3>
              <button
                type="button"
                onClick={copySoukList}
                className="inline-flex items-center gap-1.5 rounded-sm border border-[#332822] bg-[#120e0c] px-2.5 py-1 font-mono text-xs text-[#e09f3e] hover:border-[#c85a32]"
              >
                {copiedList ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#52b788]" />
                    {lang === 'ar' ? 'تم النسخ' : 'Copied'}
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    {lang === 'ar' ? 'نسخ القائمة' : lang === 'fr' ? 'Copier' : 'Copy List'}
                  </>
                )}
              </button>
            </div>

            {/* Add fish bar */}
            <div className="mb-4 flex items-center gap-2">
              <select
                value={selectedAddFishId}
                onChange={(e) => setSelectedAddFishId(e.target.value)}
                aria-label="Select fish to add to basket"
                className="min-w-0 flex-1 truncate rounded-sm border border-[#2a211c] bg-[#120e0c] px-3 py-2 text-xs text-[#f4ede2] focus:border-[#c85a32] focus:outline-none"
              >
                {fishList.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nameDarijaArabic} — {lang === 'ar' ? `${f.pricing.currentSpotMAD} درهم/كلغ` : `${f.nameFrench} (${f.pricing.currentSpotMAD} MAD/kg)`}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => addToBasket(selectedAddFishId)}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-sm bg-[#c85a32] px-3.5 py-2 text-xs font-bold text-[#f4ede2] transition hover:bg-[#b04b25]"
              >
                <Plus className="h-4 w-4" />
                <span>{lang === 'ar' ? 'أضف للقفة' : lang === 'fr' ? 'Ajouter' : 'Add'}</span>
              </button>
            </div>

            {/* Basket Items */}
            <div className="max-h-72 space-y-2.5 overflow-y-auto pe-1">
              {basket.map((item) => {
                const fish = fishList.find((f) => f.id === item.fishId)
                if (!fish) return null
                const lineMAD = Math.round(fish.pricing.currentSpotMAD * item.kg)
                return (
                  <div
                    key={item.fishId}
                    className="flex items-center justify-between gap-3 rounded-sm border border-[#241d19] bg-[#120e0c] p-2.5"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <img
                        src={fish.imageUrl}
                        alt={getLocalizedName(fish)}
                        className="h-10 w-12 shrink-0 rounded-sm object-cover border border-[#2a211c]"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-editorial text-sm font-bold text-[#f4ede2]">
                          {getLocalizedName(fish)}
                        </p>
                        <button
                          type="button"
                          onClick={() => toggleKessal(item.fishId)}
                          className={`mt-0.5 block truncate text-[10px] underline ${
                            item.includeKessalCleaning
                              ? 'text-[#52b788]'
                              : 'text-[#8c7d6b]'
                          }`}
                        >
                          {item.includeKessalCleaning
                            ? lang === 'ar'
                              ? '✓ مع تنقية الكسال (+5 دراهم/كلغ)'
                              : '✓ + Kessal cleaning (+5 MAD/kg)'
                            : lang === 'ar'
                              ? '+ إضافة تنقية الكسال'
                              : '+ Add Kessal cleaning'}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div
                        className="flex items-center rounded-sm border border-[#2a211c] bg-[#181310]"
                      >
                        <button
                          type="button"
                          onClick={() => updateKg(item.fishId, -0.5)}
                          aria-label="Decrease quantity"
                          className="px-2 py-1 text-[#b5a592] hover:text-[#f4ede2]"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 font-mono text-xs font-bold text-[#f4ede2] whitespace-nowrap">
                          {item.kg} {lang === 'ar' ? 'كلغ' : 'kg'}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateKg(item.fishId, 0.5)}
                          aria-label="Increase quantity"
                          className="px-2 py-1 text-[#b5a592] hover:text-[#f4ede2]"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="min-w-[64px] text-end">
                        <PriceBadge
                          amount={lineMAD}
                          unit="none"
                          lang={lang}
                          amountClassName="text-xs font-bold text-[#e09f3e]"
                          unitClassName="text-[10px] text-[#e09f3e]/80"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromBasket(item.fishId)}
                        className="p-1 text-[#8c7d6b] hover:text-rose-400"
                        title={lang === 'ar' ? 'حذف من القفة' : 'Supprimer'}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Totals Summary Footer */}
          <div className="mt-5 rounded-sm border border-[#c85a32]/40 bg-[#120e0c] p-4">
            <div className="grid grid-cols-3 gap-2 border-b border-[#241d19] pb-3 text-center">
              <div>
                <span className="block text-[10px] text-[#8c7d6b]">
                  {lang === 'ar' ? 'الوزن الإجمالي' : lang === 'fr' ? 'Poids Total' : 'Total Weight'}
                </span>
                <span className="font-mono text-sm font-bold text-[#f4ede2]">
                  {basketTotals.totalKg} {lang === 'ar' ? 'كلغ' : 'kg'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-[#8c7d6b]">
                  {lang === 'ar' ? 'البروتين الصافي' : lang === 'fr' ? 'Protéines' : 'Total Protein'}
                </span>
                <span className="font-mono text-sm font-bold text-[#52b788]">
                  {basketTotals.totalProteinGrams} {lang === 'ar' ? 'غرام' : 'g'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-[#8c7d6b]">
                  {lang === 'ar' ? 'أوميغا 3' : 'Omega-3'}
                </span>
                <span className="font-mono text-sm font-bold text-[#38bdf8]">
                  {basketTotals.totalOmega3Grams} {lang === 'ar' ? 'غرام' : 'g'}
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="block text-xs font-semibold text-[#b5a592] truncate">
                  {lang === 'ar'
                    ? 'الميزانية التقديرية في المرسى (شاملة الكسال):'
                    : lang === 'fr'
                      ? 'Budget Estimé au Souk (Kessal inclus) :'
                      : 'Estimated Souk Total (incl. Kessal) :'}
                </span>
                <span className="font-mono text-[11px] text-[#8c7d6b]">
                  {lang === 'ar'
                    ? `${basketTotals.fishCostMAD} درهم للحوت + ${basketTotals.kessalCostMAD} درهم للكسال`
                    : `${basketTotals.fishCostMAD} MAD poisson + ${basketTotals.kessalCostMAD} MAD Kessal`}
                </span>
              </div>
              <div className="shrink-0">
                <PriceBadge
                  amount={basketTotals.grandTotalMAD}
                  unit="none"
                  lang={lang}
                  amountClassName="text-2xl font-extrabold text-[#e09f3e]"
                  unitClassName="text-sm font-bold text-[#e09f3e]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

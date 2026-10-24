import React, { useState } from 'react'
import {
  Printer,
  Copy,
  Check,
  Ruler,
  AlertTriangle,
  Scale,
  MapPin,
  Anchor,
  ChefHat,
} from 'lucide-react'
import type { Fish } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'

export interface FishSpecimenPassportModalProps {
  fish: Fish
  lang: SupportedLanguage
  onClose: () => void
}

export const FishSpecimenPassportModal: React.FC<FishSpecimenPassportModalProps> = ({
  fish,
  lang,
  onClose,
}) => {
  const [copied, setCopied] = useState(false)

  const minMAD = Math.min(...fish.pricing.past6MonthsMAD, fish.pricing.currentSpotMAD)
  const maxMAD = Math.max(...fish.pricing.past6MonthsMAD, fish.pricing.currentSpotMAD)

  const handlePrint = () => {
    window.print()
  }

  const handleCopyMarkdown = () => {
    const md = `# L7OT (الحوت) · FICHE TECHNIQUE HALIEUTIQUE DU MAROC
## ${fish.nameDarijaArabic} (${fish.nameDarijaLatin}) — ${fish.nameFrench} / ${fish.nameEnglish}

### 1. Nomenclatures & Dialectes Côtiers
- **Nom Scientifique:** *${fish.scientificName}*
- **Darija:** ${fish.nameDarijaArabic} (${fish.nameDarijaLatin} · ${fish.audioPhonetic})
- **Chamal (Tanger/Tétouan):** ${fish.regionalNames.chamal.join(', ') || 'N/A'}
- **Oriental (Nador/Al Hoceima):** ${fish.regionalNames.oriental.join(', ') || 'N/A'}
- **Centre (Casablanca/Safi):** ${fish.regionalNames.centre.join(', ') || 'N/A'}
- **Sud (Souss/Sahara):** ${fish.regionalNames.sud.join(', ') || 'N/A'}

### 2. Réglementation Halieutique & Tailles Minimales (Dahir & Arrêtés)
- **Taille Marchande Minimale:** ${fish.regulations?.minimumCatchSizeCm ? `${fish.regulations.minimumCatchSizeCm} cm` : 'Non réglementée'}
- **Période de Repos Biologique:** ${fish.regulations?.isUnderBiologicalRest ? '⚠️ En cours (Pêche interdite)' : '✅ Pêche autorisée'}
- **Référence Légale:** ${fish.regulations?.dahirLawRef || 'Dahir du 23 Novembre 1973 formant règlement sur la pêche maritime'}
- **Catégorie Halieutique:** ${fish.regulations?.legalCategory || 'Espèce côtière'}

### 3. Répartition & Débarquements aux Criées du Maroc
- **Façade Maritime:** ${fish.coast === 'both' ? 'Atlantique & Méditerranée (Double façade)' : fish.coast === 'atlantic' ? 'Océan Atlantique' : 'Mer Méditerranée'}
- **Principaux Ports de Débarquement:** ${fish.mainPorts.join(', ')}
- **Saisonnalité:** ${fish.seasonality.description[lang]}

### 4. Profil Nutritionnel (pour 100g de chair nette)
- **Calories:** ${fish.nutrition.calories} kcal
- **Protéines:** ${fish.nutrition.proteinGrams} g
- **Lipides:** ${fish.nutrition.lipidsGrams} g
- **Acides Gras Oméga-3:** ${fish.nutrition.omega3Mg} mg

### 5. Cotation & Marché (Criée Royale)
- **Cours Spot Moyen:** ${fish.pricing.currentSpotMAD} MAD / kg
- **Fourchette Observée:** ${minMAD} à ${maxMAD} MAD / kg

---
*Généré par l'Atlas Halieutique L7OT · https://bosaj.github.io/l7ot/*`

    if (navigator.clipboard) {
      navigator.clipboard.writeText(md).catch(() => {})
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="relative my-auto w-full max-w-3xl rounded-lg border border-[#3d2f26] bg-[#0f0c0a] p-6 sm:p-8 text-[#f6f1e7] shadow-2xl">
        {/* Printable Maritime Specimen Frame */}
        <div id="printable-specimen-dossier" className="space-y-6">
          {/* Header with Coat of Arms & Legal Header */}
          <div className="flex items-center justify-between border-b-2 border-[#d96b27]/40 pb-5">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[#e68a45] uppercase tracking-wider">
                <Anchor className="h-4 w-4 text-[#e68a45]" />
                <span>
                  {lang === 'ar'
                    ? 'المملكة المغربية · الأطلس المرجعي للمصايد L7OT'
                    : 'Royaume du Maroc · Atlas Halieutique Officiel L7OT'}
                </span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#f6f1e7] mt-1">
                {lang === 'ar'
                  ? `البطاقة التقنية وجواز المصيد: ${fish.nameDarijaArabic}`
                  : `Fiche Technique & Passeport Halieutique : ${fish.nameFrench}`}
              </h2>
              <p className="font-serif italic text-xs text-[#a69b8d] mt-0.5">
                {fish.scientificName} · Ref: L7OT-{fish.id.toUpperCase()}-2026
              </p>
            </div>

            <div className="text-end">
              <span className="inline-block rounded border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-300">
                {lang === 'ar' ? 'وثيقة موثقة رسمياً' : 'Document Certifié'}
              </span>
              <span className="block font-mono text-[10px] text-[#786c60] mt-1">
                Criée Royale
              </span>
            </div>
          </div>

          {/* Regional Dialects Strip */}
          <div className="rounded-lg border border-[#2a211c] bg-[#14110f] p-4">
            <span className="block font-mono text-[10px] uppercase font-bold text-[#d96b27] mb-2">
              {lang === 'ar' ? 'الأسماء والنداءات الجهوية بالموانئ المغربية:' : 'Appellations Vernaculaires Régionales :'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="block font-mono text-[10px] text-[#786c60]">
                  {lang === 'ar' ? 'الشمال (طنجة/تطوان)' : 'Nord / Chamal'}
                </span>
                <span className="font-bold text-[#f6f1e7]">{fish.regionalNames.chamal.join(' · ') || '—'}</span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-[#786c60]">
                  {lang === 'ar' ? 'الشرق (الناظور/الحسيمة)' : 'Oriental / Rif'}
                </span>
                <span className="font-bold text-[#f6f1e7]">{fish.regionalNames.oriental.join(' · ') || '—'}</span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-[#786c60]">
                  {lang === 'ar' ? 'الوسط (كازا/آسفي)' : 'Centre / Doukkala'}
                </span>
                <span className="font-bold text-[#f6f1e7]">{fish.regionalNames.centre.join(' · ') || '—'}</span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-[#786c60]">
                  {lang === 'ar' ? 'الجنوب (سوس/الصحراء)' : 'Sud / Souss'}
                </span>
                <span className="font-bold text-[#f6f1e7]">{fish.regionalNames.sud.join(' · ') || '—'}</span>
              </div>
            </div>
          </div>

          {/* Regulatory & Law Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/15 p-3.5">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-emerald-400">
                <Ruler className="h-3.5 w-3.5" />
                {lang === 'ar' ? 'المقاس الأدنى القانوني' : 'Taille Min. Légale'}
              </span>
              <span className="font-mono text-xl font-bold text-emerald-300 block mt-1">
                {fish.regulations?.minimumCatchSizeCm ? `${fish.regulations.minimumCatchSizeCm} cm` : 'Non soumise'}
              </span>
              <span className="text-[10px] text-[#a69b8d] block mt-0.5">
                {fish.regulations?.dahirLawRef || 'ظهير 1973 وقرارات الصيد'}
              </span>
            </div>

            <div className="rounded-lg border border-amber-500/30 bg-amber-950/15 p-3.5">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-amber-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                {lang === 'ar' ? 'حالة الراحة البيولوجية' : 'Repos Biologique'}
              </span>
              <span className="font-mono text-base font-bold text-amber-300 block mt-1">
                {fish.regulations?.isUnderBiologicalRest
                  ? lang === 'ar' ? '⚠️ فترة راحة بيولوجية' : '⚠️ En cours'
                  : lang === 'ar' ? '✅ الصيد مسموح' : '✅ Pêche autorisée'}
              </span>
              <span className="text-[10px] text-[#a69b8d] block mt-0.5">
                {lang === 'ar' ? 'لحماية توالد الأسماك' : 'Protection de la reproduction'}
              </span>
            </div>

            <div className="rounded-lg border border-[#2a211c] bg-[#14110f] p-3.5">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-[#e68a45]">
                <Scale className="h-3.5 w-3.5" />
                {lang === 'ar' ? 'سعر المرجع بالمرسى' : 'Cours Criée Royale'}
              </span>
              <span className="font-mono text-xl font-bold text-[#f6f1e7] block mt-1">
                {fish.pricing.currentSpotMAD} <span className="text-xs text-[#a69b8d]">MAD/kg</span>
              </span>
              <span className="text-[10px] text-[#a69b8d] block mt-0.5">
                {minMAD}–{maxMAD} MAD/kg
              </span>
            </div>
          </div>

          {/* Nutritional Passport Table */}
          <div className="rounded-lg border border-[#2a211c] bg-[#14110f] p-4">
            <span className="block font-mono text-[10px] uppercase font-bold text-[#d96b27] mb-2">
              {lang === 'ar' ? 'التحليل البيوكيميائي لكل 100 غرام من اللحم الصافي:' : 'Analyse Biochimique pour 100g de chair nette :'}
            </span>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="rounded border border-[#2a211c] bg-[#0b0908] p-2">
                <span className="font-mono text-[9px] uppercase text-[#a69b8d] block">Énergie</span>
                <span className="font-mono text-base font-bold text-[#f6f1e7]">{fish.nutrition.calories}</span>
                <span className="text-[9px] text-[#786c60] block">kcal</span>
              </div>
              <div className="rounded border border-[#2a211c] bg-[#0b0908] p-2">
                <span className="font-mono text-[9px] uppercase text-emerald-400 block">Protéines</span>
                <span className="font-mono text-base font-bold text-emerald-300">{fish.nutrition.proteinGrams}g</span>
                <span className="text-[9px] text-[#786c60] block">haut rendement</span>
              </div>
              <div className="rounded border border-[#2a211c] bg-[#0b0908] p-2">
                <span className="font-mono text-[9px] uppercase text-amber-400 block">Lipides</span>
                <span className="font-mono text-base font-bold text-amber-300">{fish.nutrition.lipidsGrams}g</span>
                <span className="text-[9px] text-[#786c60] block">graisses saines</span>
              </div>
              <div className="rounded border border-[#2a211c] bg-[#0b0908] p-2">
                <span className="font-mono text-[9px] uppercase text-sky-400 block">Oméga-3</span>
                <span className="font-mono text-base font-bold text-sky-300">{fish.nutrition.omega3Mg}mg</span>
                <span className="text-[9px] text-[#786c60] block">DHA / EPA</span>
              </div>
            </div>
          </div>

          {/* Landing Ports & Traditional Moroccan Cooking */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-[#2a211c] bg-[#14110f] p-3.5">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-[#e68a45] mb-1">
                <MapPin className="h-3.5 w-3.5" />
                {lang === 'ar' ? 'موانئ الإنزال الرئيسية بالمغرب:' : 'Principaux Ports de Débarquement :'}
              </span>
              <p className="text-[#d4cbbd] leading-relaxed">{fish.mainPorts.join(' · ')}</p>
            </div>

            <div className="rounded-lg border border-[#2a211c] bg-[#14110f] p-3.5">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-[#e68a45] mb-1">
                <ChefHat className="h-3.5 w-3.5" />
                {lang === 'ar' ? 'طرق الطبخ المغربي الموصى بها:' : 'Modes de Cuisson Recommandés :'}
              </span>
              <p className="text-[#d4cbbd] leading-relaxed">
                {fish.culinaryProfile.bestCookingMethods.join(' · ')}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="mt-6 pt-5 border-t border-[#2a211c] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-lg bg-[#d96b27] px-4 py-2 font-mono text-xs font-bold text-[#0b0908] shadow hover:bg-[#e68a45] transition"
            >
              <Printer className="h-4 w-4" />
              <span>{lang === 'ar' ? 'طباعة / تصدير PDF' : 'Imprimer / Exporter PDF'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-2 rounded-lg border border-[#2a211c] bg-[#14110f] px-3.5 py-2 font-mono text-xs text-[#f6f1e7] hover:border-[#d96b27] transition"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>
                {copied
                  ? lang === 'ar' ? 'تم نسخ التقرير!' : 'Dossier copié !'
                  : lang === 'ar' ? 'نسخ Dossier Markdown' : 'Copier Markdown'}
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#2a211c] bg-[#14110f] px-4 py-2 font-mono text-xs text-[#a69b8d] hover:text-[#f6f1e7] hover:border-[#f6f1e7]/20 transition"
          >
            {lang === 'ar' ? 'إغلاق' : 'Fermer'}
          </button>
        </div>
      </div>
    </div>
  )
}

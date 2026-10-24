import React, { useState, useMemo, useRef } from 'react'
import {
  ShoppingBag,
  PlusCircle,
  CheckCircle2,
  MapPin,
  ThumbsUp,
  Filter,
  Search,
  Store,
  Camera,
  Image as ImageIcon,
  Share2,
  TrendingUp,
  X,
  ShieldCheck,
  Award,
} from 'lucide-react'
import type { SupportedLanguage } from '../i18n/strings'
import type { Fish } from '../data/types'
import { sounds } from '../lib/soundEffects'
import { getAssetUrl } from '../lib/assetHelper'

export interface CommunityPriceReport {
  id: string
  fishId: string
  fishNameAr: string
  fishNameFr: string
  fishNameEn: string
  cityAr: string
  cityFr: string
  marketNameAr: string
  marketNameFr: string
  reportedPriceMAD: number
  onpWholesaleMAD: number
  freshnessGrade: 'extra' | 'grade_a' | 'standard'
  hasReceiptOrPhoto: boolean
  photoUrl?: string
  marketType?: 'port_direct' | 'souk_municipal' | 'supermarche'
  notesAr: string
  notesFr: string
  reporterName: string
  timestamp: string // relative or ISO
  confirmationsCount: number
}

const STORAGE_KEY = 'l7ot_community_prices_v1'

const PRE_SEEDED_REPORTS: CommunityPriceReport[] = [
  {
    id: 'rep-01',
    fishId: 'sardine',
    fishNameAr: 'سردين أطلسي طري',
    fishNameFr: 'Sardine Atlantique',
    fishNameEn: 'Atlantic Sardine',
    cityAr: 'آسفي',
    cityFr: 'Safi',
    marketNameAr: 'مرسى آسفي (مباشرة من الفلوكة)',
    marketNameFr: 'Port de Safi (Débarquement direct)',
    reportedPriceMAD: 12,
    onpWholesaleMAD: 10,
    freshnessGrade: 'extra',
    hasReceiptOrPhoto: true,
    photoUrl: getAssetUrl('fish/sardine.webp'),
    marketType: 'port_direct',
    notesAr: 'حوت طري عاد خارج من البحر مع 7 صباحاً، عيون كتبري وغلاصم حمرين دم.',
    notesFr: 'Directement débarqué de la barque artisanale à 7h, fraîcheur absolue.',
    reporterName: 'سعيد الصياد',
    timestamp: 'منذ 25 دقيقة',
    confirmationsCount: 18,
  },
  {
    id: 'rep-02',
    fishId: 'merlan',
    fishNameAr: 'ميرلا بيضاء حرة',
    fishNameFr: 'Merlan Blanc',
    fishNameEn: 'Whiting / Hake',
    cityAr: 'الدار البيضاء',
    cityFr: 'Casablanca',
    marketNameAr: 'المارشي سونطرال (السوق المركزي)',
    marketNameFr: 'Marché Central (Boulevard Mohammed V)',
    reportedPriceMAD: 65,
    onpWholesaleMAD: 50,
    freshnessGrade: 'grade_a',
    hasReceiptOrPhoto: true,
    photoUrl: getAssetUrl('fish/merlan.webp'),
    marketType: 'souk_municipal',
    notesAr: 'ميرلا نبتة نقية، ثمن معقول مقارنة بالأسبوع الفايت.',
    notesFr: 'Merlan très frais, chair ferme et brillante.',
    reporterName: 'أمينة بنجلون',
    timestamp: 'منذ 45 دقيقة',
    confirmationsCount: 12,
  },
  {
    id: 'rep-03',
    fishId: 'calamar',
    fishNameAr: 'كالامار صحراوي رويال',
    fishNameFr: 'Calmar du Sahara',
    fishNameEn: 'Sahara Squid',
    cityAr: 'طنجة',
    cityFr: 'Tanger',
    marketNameAr: 'سوق السمك باب المارسى',
    marketNameFr: 'Marché aux Poissons Bab El Marsa',
    reportedPriceMAD: 110,
    onpWholesaleMAD: 85,
    freshnessGrade: 'extra',
    hasReceiptOrPhoto: true,
    photoUrl: getAssetUrl('fish/calamar.webp'),
    marketType: 'souk_municipal',
    notesAr: 'حجم كبير نقي ديال الشواية والفران، لحم رطب وشفاف.',
    notesFr: 'Calmar blanc épais, parfait pour grillade.',
    reporterName: 'كريم الشمالي',
    timestamp: 'منذ ساعتين',
    confirmationsCount: 9,
  },
  {
    id: 'rep-04',
    fishId: 'sole',
    fishNameAr: 'صول ملكي ديال القاع',
    fishNameFr: 'Sole Royale',
    fishNameEn: 'Dover Sole',
    cityAr: 'أكادير',
    cityFr: 'Agadir',
    marketNameAr: 'سوق الأحد (جناح الحوت)',
    marketNameFr: 'Souk El Had (Hall Poissons)',
    reportedPriceMAD: 95,
    onpWholesaleMAD: 75,
    freshnessGrade: 'grade_a',
    hasReceiptOrPhoto: true,
    photoUrl: getAssetUrl('fish/sole.webp'),
    marketType: 'souk_municipal',
    notesAr: 'صول حبة كبيرة، جودة عالية.',
    notesFr: 'Belles pièces d’environ 400g, branchies rouge vif.',
    reporterName: 'حسن السوسي',
    timestamp: 'منذ 3 ساعات',
    confirmationsCount: 15,
  },
  {
    id: 'rep-05',
    fishId: 'poulpe',
    fishNameAr: 'أخطبوط وادي الذهب T1',
    fishNameFr: 'Poulpe de Dakhla N°1',
    fishNameEn: 'Dakhla Octopus',
    cityAr: 'الداخلة',
    cityFr: 'Dakhla',
    marketNameAr: 'سوق المسيرة البلدي',
    marketNameFr: 'Marché Municipal El Massira',
    reportedPriceMAD: 80,
    onpWholesaleMAD: 70,
    freshnessGrade: 'extra',
    hasReceiptOrPhoto: true,
    photoUrl: getAssetUrl('fish/poulpe.webp'),
    marketType: 'port_direct',
    notesAr: 'أخطبوط صيد القوارب التقليدية، نقاوة منقطعة النظير.',
    notesFr: 'Poulpe royal direct de la lagune, chair ferme.',
    reporterName: 'سيدي أحمد',
    timestamp: 'منذ 4 ساعات',
    confirmationsCount: 22,
  },
  {
    id: 'rep-06',
    fishId: 'crevette',
    fishNameAr: 'كروفيت رويال بلدي',
    fishNameFr: 'Crevette Royale',
    fishNameEn: 'King Prawns',
    cityAr: 'الناظور',
    cityFr: 'Nador',
    marketNameAr: 'سوق المركب التجاري ومارشيكا',
    marketNameFr: 'Marché المركب & Marchica',
    reportedPriceMAD: 120,
    onpWholesaleMAD: 95,
    freshnessGrade: 'extra',
    hasReceiptOrPhoto: true,
    photoUrl: getAssetUrl('fish/crevette.webp'),
    marketType: 'souk_municipal',
    notesAr: 'غامبا حمراء طرية ديال مياه رأس كبدانة ومارشيكا.',
    notesFr: 'Gambas fraîches de Méditerranée.',
    reporterName: 'طارق الريفي',
    timestamp: 'منذ 5 ساعات',
    confirmationsCount: 14,
  },
]

export const MOROCCAN_MARKETS = [
  { cityAr: 'الدار البيضاء', cityFr: 'Casablanca', nameAr: 'المارشي سونطرال (السوق المركزي)', nameFr: 'Marché Central', type: 'souk_municipal' as const },
  { cityAr: 'الدار البيضاء', cityFr: 'Casablanca', nameAr: 'سوق السمك بنجدية', nameFr: 'Marché Benjdia', type: 'souk_municipal' as const },
  { cityAr: 'الدار البيضاء', cityFr: 'Casablanca', nameAr: 'مرسى الدار البيضاء (الميناء)', nameFr: 'Port de Casablanca', type: 'port_direct' as const },
  { cityAr: 'الرباط', cityFr: 'Rabat', nameAr: 'السوق المركزي بالرباط', nameFr: 'Marché Central Rabat', type: 'souk_municipal' as const },
  { cityAr: 'الرباط', cityFr: 'Rabat', nameAr: 'ميناء الصيد بسلا', nameFr: 'Port de Pêche de Salé', type: 'port_direct' as const },
  { cityAr: 'طنجة', cityFr: 'Tanger', nameAr: 'سوق السمك باب المارسى', nameFr: 'Marché Bab El Marsa', type: 'souk_municipal' as const },
  { cityAr: 'طنجة', cityFr: 'Tanger', nameAr: 'ميناء طنجة المدينة', nameFr: 'Port de Tanger Ville', type: 'port_direct' as const },
  { cityAr: 'آسفي', cityFr: 'Safi', nameAr: 'مرسى الصيد بآسفي', nameFr: 'Port de Pêche de Safi', type: 'port_direct' as const },
  { cityAr: 'آسفي', cityFr: 'Safi', nameAr: 'سوق البياضة للأسماك', nameFr: 'Marché Biada', type: 'souk_municipal' as const },
  { cityAr: 'الصويرة', cityFr: 'Essaouira', nameAr: 'سوق السمك التاريخي بالمدينة القديمة', nameFr: 'Marché Médina Mogador', type: 'souk_municipal' as const },
  { cityAr: 'الصويرة', cityFr: 'Essaouira', nameAr: 'مرسى الصويرة', nameFr: 'Port d’Essaouira', type: 'port_direct' as const },
  { cityAr: 'أكادير', cityFr: 'Agadir', nameAr: 'سوق الأحد (جناح السمك)', nameFr: 'Souk El Had', type: 'souk_municipal' as const },
  { cityAr: 'أكادير', cityFr: 'Agadir', nameAr: 'ميناء الصيد بأكادير (أنزا)', nameFr: 'Port d’Agadir Anza', type: 'port_direct' as const },
  { cityAr: 'الناظور', cityFr: 'Nador', nameAr: 'سوق المركب التجاري', nameFr: 'Marché المركب Nador', type: 'souk_municipal' as const },
  { cityAr: 'الناظور', cityFr: 'Nador', nameAr: 'ميناء بني نصار', nameFr: 'Port de Beni Ensar', type: 'port_direct' as const },
  { cityAr: 'الداخلة', cityFr: 'Dakhla', nameAr: 'سوق المسيرة البلدي', nameFr: 'Marché Municipal Dakhla', type: 'souk_municipal' as const },
  { cityAr: 'الداخلة', cityFr: 'Dakhla', nameAr: 'مرسى الداخلة', nameFr: 'Port de Dakhla', type: 'port_direct' as const },
]

interface CommunityPriceReporterProps {
  allFish: Fish[]
  lang: SupportedLanguage
  onSelectFishModal?: (fish: Fish) => void
}

export const CommunityPriceReporter: React.FC<CommunityPriceReporterProps> = ({
  allFish,
  lang,
  onSelectFishModal,
}) => {
  const [reports, setReports] = useState<CommunityPriceReport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      // ignore
    }
    return PRE_SEEDED_REPORTS
  })

  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('all')
  const [selectedChannelFilter, setSelectedChannelFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [confirmedReports, setConfirmedReports] = useState<Record<string, boolean>>({})
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null)

  // Form states
  const [formFishId, setFormFishId] = useState<string>(allFish[0]?.id || 'sardine')
  const [formMarketIndex, setFormMarketIndex] = useState<number>(0)
  const [formPrice, setFormPrice] = useState<string>('15')
  const [formFreshness, setFormFreshness] = useState<'extra' | 'grade_a' | 'standard'>('extra')
  const [formHasReceipt, setFormHasReceipt] = useState<boolean>(true)
  const [formPhotoData, setFormPhotoData] = useState<string | null>(null)
  const [formNotes, setFormNotes] = useState<string>('')
  const [formReporter, setFormReporter] = useState<string>('')
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Save to local storage
  const saveReports = (newReports: CommunityPriceReport[]) => {
    setReports(newReports)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newReports))
    } catch {
      // ignore
    }
  }

  const selectedFishObj = useMemo(() => {
    return allFish.find((f) => f.id === formFishId) || allFish[0]!
  }, [allFish, formFishId])

  const selectedMarketObj = useMemo(() => {
    return MOROCCAN_MARKETS[formMarketIndex] || MOROCCAN_MARKETS[0]!
  }, [formMarketIndex])

  // Macro Statistics Barometer
  const marketMetrics = useMemo(() => {
    if (reports.length === 0) {
      return { avgSpread: 0, topBargain: null, topConfirmed: null }
    }
    const totalSpread = reports.reduce((acc, r) => {
      const diff = ((r.reportedPriceMAD - r.onpWholesaleMAD) / r.onpWholesaleMAD) * 100
      return acc + diff
    }, 0)
    const avgSpread = Math.round(totalSpread / reports.length)

    // Best bargain (lowest spread)
    const sortedByBargain = [...reports].sort((a, b) => {
      const diffA = (a.reportedPriceMAD - a.onpWholesaleMAD) / a.onpWholesaleMAD
      const diffB = (b.reportedPriceMAD - b.onpWholesaleMAD) / b.onpWholesaleMAD
      return diffA - diffB
    })

    // Most confirmed report
    const sortedByConfirm = [...reports].sort((a, b) => b.confirmationsCount - a.confirmationsCount)

    return {
      avgSpread,
      topBargain: sortedByBargain[0] || null,
      topConfirmed: sortedByConfirm[0] || null,
    }
  }, [reports])

  // Form price markup calculation preview
  const formMarkupInfo = useMemo(() => {
    const p = parseFloat(formPrice) || 0
    const wholesale = selectedFishObj.pricing.currentSpotMAD || 1
    const diffPercent = Math.round(((p - wholesale) / wholesale) * 100)
    let badgeClass = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
    let labelAr = 'سعر استثنائي ممتاز (قريب جداً من سعر المرشى)'
    let labelFr = 'Prix Criée Exceptionnel (Très proche du débarquement)'

    if (diffPercent > 45) {
      badgeClass = 'border-red-500/40 bg-red-500/10 text-red-300'
      labelAr = `تنبيه مضاربة: السعر أعلى بـ +${diffPercent}% من مرسى الصيد الجملة`
      labelFr = `Alerte Spéculation : Prix supérieur de +${diffPercent}% à la criée`
    } else if (diffPercent > 15) {
      badgeClass = 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
      labelAr = `هامش تجاري معقول واعتيادي للأسواق (+${diffPercent}%)`
      labelFr = `Marge commerciale normale de souk (+${diffPercent}%)`
    }

    return { diffPercent, badgeClass, labelAr, labelFr, wholesale }
  }, [formPrice, selectedFishObj])

  // Filtered reports
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchesCity =
        selectedCityFilter === 'all' ||
        r.cityFr.toLowerCase() === selectedCityFilter.toLowerCase() ||
        r.cityAr === selectedCityFilter

      const matchesChannel =
        selectedChannelFilter === 'all' ||
        (selectedChannelFilter === 'port' && r.marketType === 'port_direct') ||
        (selectedChannelFilter === 'souk' && r.marketType === 'souk_municipal')

      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        r.fishNameAr.toLowerCase().includes(q) ||
        r.fishNameFr.toLowerCase().includes(q) ||
        r.fishNameEn.toLowerCase().includes(q) ||
        r.marketNameAr.toLowerCase().includes(q) ||
        r.marketNameFr.toLowerCase().includes(q) ||
        r.notesAr.toLowerCase().includes(q)

      return matchesCity && matchesChannel && matchesSearch
    })
  }, [reports, selectedCityFilter, selectedChannelFilter, searchQuery])

  const handleConfirmPrice = (reportId: string) => {
    if (confirmedReports[reportId]) return
    sounds.playBubble()
    setConfirmedReports((prev) => ({ ...prev, [reportId]: true }))
    const updated = reports.map((r) => {
      if (r.id === reportId) {
        return { ...r, confirmationsCount: r.confirmationsCount + 1 }
      }
      return r
    })
    saveReports(updated)
  }

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormPhotoData(reader.result)
        setFormHasReceipt(true)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault()
    const p = parseFloat(formPrice)
    if (!p || p <= 0) return

    sounds.playBubble()
    const newReport: CommunityPriceReport = {
      id: `rep-${Date.now()}`,
      fishId: selectedFishObj.id,
      fishNameAr: selectedFishObj.nameDarijaArabic,
      fishNameFr: selectedFishObj.nameFrench,
      fishNameEn: selectedFishObj.nameEnglish,
      cityAr: selectedMarketObj.cityAr,
      cityFr: selectedMarketObj.cityFr,
      marketNameAr: selectedMarketObj.nameAr,
      marketNameFr: selectedMarketObj.nameFr,
      reportedPriceMAD: p,
      onpWholesaleMAD: selectedFishObj.pricing.currentSpotMAD,
      freshnessGrade: formFreshness,
      hasReceiptOrPhoto: formHasReceipt,
      photoUrl: formPhotoData || selectedFishObj.imageUrl,
      marketType: selectedMarketObj.type,
      notesAr: formNotes || 'ملاحظة مباشرة من السوق.',
      notesFr: formNotes || 'Observation directe sur le marché.',
      reporterName: formReporter || (lang === 'ar' ? 'مواطن مستهلك' : 'Citoyen Observateur'),
      timestamp: lang === 'ar' ? 'الآن' : 'À l’instant',
      confirmationsCount: 1,
    }

    saveReports([newReport, ...reports])
    setSubmitSuccess(true)
    setTimeout(() => {
      setSubmitSuccess(false)
      setIsFormOpen(false)
      setFormNotes('')
      setFormPhotoData(null)
    }, 1800)
  }

  const handleShareWhatsApp = () => {
    sounds.playBubble()
    const headline =
      lang === 'ar'
        ? `🐟 *نشرة أسعار الحوت اليوم بالأسواق المغربية — بورصة L7OT*`
        : `🐟 *Bulletin des Prix du Poisson au Maroc Aujourd'hui — L7OT*`
    const itemsText = filteredReports
      .slice(0, 5)
      .map((r) => {
        const name = lang === 'ar' ? r.fishNameAr : r.fishNameFr
        const city = lang === 'ar' ? r.cityAr : r.cityFr
        const market = lang === 'ar' ? r.marketNameAr : r.marketNameFr
        return `• *${name}* à ${city} (${market}) : *${r.reportedPriceMAD} MAD/kg* (Gros ONP: ${r.onpWholesaleMAD} MAD)`
      })
      .join('\n')

    const footer =
      lang === 'ar'
        ? `\n\n📊 تتبع أسعار 44 نوعاً من الأسماك المغربية مباشرة عبر: https://l7ot.vercel.app`
        : `\n\n📊 Consultez l’atlas des 44 poissons marocains sur : https://l7ot.vercel.app`

    const message = `${headline}\n\n${itemsText}${footer}`
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="space-y-8 animate-fade-in text-[#f6f1e7]">
      {/* Lightbox Photo Preview Modal */}
      {activePhotoModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePhotoModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] max-w-2xl overflow-hidden rounded-2xl border border-amber-500/30 bg-[#14110f] p-3 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setActivePhotoModal(null)}
              className="absolute end-4 top-4 z-10 rounded-full bg-black/70 p-2 text-white hover:bg-black transition"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={activePhotoModal}
              alt="Photo d'observation"
              className="max-h-[75vh] w-full rounded-xl object-contain"
            />
            <div className="p-3 text-center font-mono text-xs text-amber-300">
              {lang === 'ar' ? 'إثبات الفاتورة أو صورة الصيد الحية من السوق ✓' : 'Justificatif / Photo du produit au marché ✓'}
            </div>
          </div>
        </div>
      )}

      {/* Header Editorial Masthead */}
      <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-[#1c120a] via-[#140d07] to-[#0c0804] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-amber-300">
              <ShoppingBag className="h-3.5 w-3.5 text-amber-400" />
              <span>
                {lang === 'ar'
                  ? 'بورصة المواطن للأسماك · مرصد الأسعار الحية من أسواق المغرب'
                  : lang === 'fr'
                  ? 'Bourse Citoyenne Halieutique · Observatoire des Cours aux Souks'
                  : 'Citizen Seafood Price Observatory · Live Souk & Port Prices'}
              </span>
            </div>

            <h2 className="font-editorial text-2xl font-bold text-amber-100 sm:text-4xl">
              {lang === 'ar'
                ? 'مرصد أسعار الحوت بالتقسيط، ومقارنتها بسعر الجملة في المراسي (ONP)'
                : lang === 'fr'
                ? 'Prix Réels au Kilo chez les Poissonniers & Comparaison Criée'
                : 'Real Consumer Seafood Prices & Port Wholesale Benchmark'}
            </h2>

            <p className="max-w-3xl text-xs sm:text-sm text-[#a69b8d] leading-relaxed">
              {lang === 'ar'
                ? 'منصة تشاركية مفتوحة للمواطنين، الطباخين وبحارة الصيد التقليدي لمشاركة أثمنة الشراء الحقيقية بالدرهم/كلغ في المارشيات الشعبية وأسواق القرب (الدار البيضاء، الرباط، طنجة، آسفي، أكادير، الداخلة، الناظور)، لكشف هوامش الربح ومكافحة المضاربة.'
                : lang === 'fr'
                ? 'Plateforme collaborative citoyenne pour déclarer et consulter les prix réels au détail (MAD/kg) sur les marchés marocains, comparés instantanément aux cours officiels des criées ONP.'
                : 'Crowdsourced citizen marketplace tracking real consumer prices across Moroccan souks, comparing retail margins against official ONP landing auctions.'}
            </p>
          </div>

          {/* Action Buttons Strip */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-4 py-2.5 font-mono text-xs font-bold text-emerald-300 shadow-lg hover:bg-emerald-500 hover:text-black transition"
            >
              <Share2 className="h-4 w-4" />
              <span>{lang === 'ar' ? 'مشاركة النشرة (WhatsApp)' : 'Partager (WhatsApp)'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playBubble()
                setIsFormOpen(!isFormOpen)
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-amber-400 bg-amber-500 px-5 py-2.5 font-mono text-xs font-bold text-[#0b0908] shadow-lg hover:bg-amber-400 transition"
            >
              <PlusCircle className="h-4 w-4" />
              <span>
                {isFormOpen
                  ? (lang === 'ar' ? 'إغلاق الاستمارة' : 'Fermer')
                  : (lang === 'ar' ? 'شارك سعر اليوم في السوق +' : 'Déclarer un prix au souk +')}
              </span>
            </button>
          </div>
        </div>

        {/* Top Macro Barometer Bento Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 border-t border-amber-500/20 pt-6">
          <div className="rounded-xl border border-white/10 bg-[#0b0908]/70 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-[#a69b8d] font-mono">
              <span>{lang === 'ar' ? 'متوسط هامش الربح الوطني' : 'Marge Moyenne Nationale'}</span>
              <TrendingUp className="h-4 w-4 text-amber-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-editorial text-3xl font-bold text-amber-300">
                +{marketMetrics.avgSpread}%
              </span>
              <span className="text-[11px] text-[#a69b8d]">
                {lang === 'ar' ? 'فوق سعر الجملة بالمرسى' : 'au-dessus de la criée'}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-emerald-300 font-mono">
              <span>{lang === 'ar' ? 'أفضل صفقة اليوم (أقل هامش)' : 'Bonne Affaire du Jour'}</span>
              <Award className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-2">
              {marketMetrics.topBargain ? (
                <div>
                  <span className="font-editorial text-lg font-bold text-emerald-200">
                    {lang === 'ar' ? marketMetrics.topBargain.fishNameAr : marketMetrics.topBargain.fishNameFr}
                  </span>
                  <p className="font-mono text-xs text-emerald-400">
                    {marketMetrics.topBargain.reportedPriceMAD} MAD/kg · {marketMetrics.topBargain.cityFr}
                  </p>
                </div>
              ) : (
                <span className="text-xs text-[#a69b8d]">—</span>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-cyan-300 font-mono">
              <span>{lang === 'ar' ? 'التقرير الأكثر تأكيداً من المواطنين' : 'Rapport le Plus Confirmé'}</span>
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="mt-2">
              {marketMetrics.topConfirmed ? (
                <div>
                  <span className="font-editorial text-lg font-bold text-cyan-200">
                    {lang === 'ar' ? marketMetrics.topConfirmed.fishNameAr : marketMetrics.topConfirmed.fishNameFr}
                  </span>
                  <p className="font-mono text-xs text-cyan-400">
                    {marketMetrics.topConfirmed.confirmationsCount} {lang === 'ar' ? 'تأكيد موثق ✓' : 'validations citoyennes ✓'}
                  </p>
                </div>
              ) : (
                <span className="text-xs text-[#a69b8d]">—</span>
              )}
            </div>
          </div>
        </div>

        {/* Observation Form Drawer */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmitReport}
            className="mt-6 rounded-xl border border-amber-500/30 bg-[#0b0908] p-5 sm:p-6 space-y-5 animate-fade-in shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#f6f1e7]/10 pb-3">
              <h3 className="font-editorial text-lg font-bold text-amber-200">
                {lang === 'ar'
                  ? 'تسجيل سعر سمكة اليوم من السوق أو المرشى'
                  : 'Déclaration d’un prix d’achat au marché'}
              </h3>
              <span className="font-mono text-xs text-[#a69b8d]">
                {lang === 'ar' ? 'المساهمة بنقرة واحدة' : 'Contribution anonyme & libre'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Fish Select */}
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-[#a69b8d] block">
                  {lang === 'ar' ? '1. نوع الحوت' : '1. Espèce de poisson'}
                </label>
                <select
                  value={formFishId}
                  onChange={(e) => setFormFishId(e.target.value)}
                  className="w-full rounded-lg border border-[#f6f1e7]/15 bg-[#14110f] p-2.5 text-xs text-[#f6f1e7] focus:border-amber-500 focus:outline-none"
                >
                  {allFish.map((f) => (
                    <option key={f.id} value={f.id}>
                      {lang === 'ar'
                        ? `${f.nameDarijaArabic} (${f.pricing.currentSpotMAD} درهم بالجملة)`
                        : `${f.nameFrench} (ONP: ${f.pricing.currentSpotMAD} MAD)`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Market Select */}
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-[#a69b8d] block">
                  {lang === 'ar' ? '2. السوق أو الميناء' : '2. Marché ou port'}
                </label>
                <select
                  value={formMarketIndex}
                  onChange={(e) => setFormMarketIndex(parseInt(e.target.value, 10))}
                  className="w-full rounded-lg border border-[#f6f1e7]/15 bg-[#14110f] p-2.5 text-xs text-[#f6f1e7] focus:border-amber-500 focus:outline-none"
                >
                  {MOROCCAN_MARKETS.map((m, idx) => (
                    <option key={idx} value={idx}>
                      {lang === 'ar' ? `${m.cityAr} · ${m.nameAr}` : `${m.cityFr} - ${m.nameFr}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price input */}
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-[#a69b8d] block">
                  {lang === 'ar' ? '3. السعر بالدرهم / كلغ' : '3. Prix payé (MAD / kg)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    step="0.5"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    required
                    className="w-full rounded-lg border border-[#f6f1e7]/15 bg-[#14110f] p-2.5 font-mono text-sm font-bold text-amber-300 focus:border-amber-500 focus:outline-none"
                  />
                  <span className="absolute end-3 top-2.5 font-mono text-xs text-[#786c60]">
                    {lang === 'ar' ? 'درهم' : 'MAD'}
                  </span>
                </div>
              </div>
            </div>

            {/* Freshness & Photo Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-[#a69b8d] block">
                  {lang === 'ar' ? 'درجة الطراوة المرصودة' : 'Niveau de fraîcheur'}
                </label>
                <select
                  value={formFreshness}
                  onChange={(e) => setFormFreshness(e.target.value as 'extra' | 'grade_a' | 'standard')}
                  className="w-full rounded-lg border border-[#f6f1e7]/15 bg-[#14110f] p-2.5 text-xs text-[#f6f1e7] focus:border-amber-500 focus:outline-none"
                >
                  <option value="extra">{lang === 'ar' ? 'Extra · خروج دابا من الفلوكة' : 'Extra - Débarquement direct'}</option>
                  <option value="grade_a">{lang === 'ar' ? 'Grade A · طري ممتاز وعينين كيبريو' : 'Grade A - Très frais & ferme'}</option>
                  <option value="standard">{lang === 'ar' ? 'Standard · عادي واعتيادي' : 'Standard - Frais moyen'}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-[#a69b8d] block">
                  {lang === 'ar' ? 'اسمك أو صفتك (اختياري)' : 'Votre nom ou qualité'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'مواطن من سلا، شيف، صياد...' : 'Consommateur, Chef...'}
                  value={formReporter}
                  onChange={(e) => setFormReporter(e.target.value)}
                  className="w-full rounded-lg border border-[#f6f1e7]/15 bg-[#14110f] p-2.5 text-xs text-[#f6f1e7] focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Photo & Receipt Upload */}
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-[#a69b8d] block">
                  {lang === 'ar' ? 'صورة الفاتورة أو السمكة' : 'Photo de la facture ou du poisson'}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-amber-500/30 bg-[#14110f] p-2 text-xs text-amber-200 hover:border-amber-400 transition"
                  >
                    <Camera className="h-3.5 w-3.5 text-amber-400" />
                    <span>
                      {formPhotoData
                        ? (lang === 'ar' ? 'تم اختيار الصورة ✓' : 'Photo chargée ✓')
                        : (lang === 'ar' ? 'التقاط أو رفع صورة' : 'Photo / Reçu')}
                    </span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                  {formPhotoData && (
                    <button
                      type="button"
                      onClick={() => setFormPhotoData(null)}
                      className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"
                      title="Supprimer la photo"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Price Comparison Preview Barometer */}
            <div className={`rounded-lg border p-3 text-xs ${formMarkupInfo.badgeClass}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span>
                  <strong>{lang === 'ar' ? 'تحليل الهامش:' : 'Analyse de marge :'}</strong> {lang === 'ar' ? formMarkupInfo.labelAr : formMarkupInfo.labelFr}
                </span>
                <span className="font-mono text-[11px]">
                  {lang === 'ar' ? 'سعر الجملة (ONP):' : 'Cours ONP Criée :'} {formMarkupInfo.wholesale} MAD/kg
                </span>
              </div>
            </div>

            {/* Note & Submit */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <input
                type="text"
                placeholder={lang === 'ar' ? 'ملاحظة إضافية عن السلعة أو الجودة...' : 'Note ou commentaire sur le produit...'}
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                className="flex-1 rounded-lg border border-[#f6f1e7]/15 bg-[#14110f] p-2.5 text-xs text-[#f6f1e7] focus:border-amber-500 focus:outline-none"
              />

              <button
                type="submit"
                disabled={submitSuccess}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 font-mono text-xs font-bold text-[#0b0908] hover:bg-emerald-400 transition shrink-0"
              >
                {submitSuccess ? <CheckCircle2 className="h-4 w-4" /> : <Store className="h-4 w-4" />}
                <span>
                  {submitSuccess
                    ? (lang === 'ar' ? '✓ تم نشر تقريرك بنجاح!' : '✓ Rapport Publié !')
                    : (lang === 'ar' ? 'نشر التقرير في البورصة' : 'Publier ce rapport')}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-3 text-xs md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-mono text-[#a69b8d]">
            {lang === 'ar' ? 'تصفية حسب المدينة:' : 'Filtrer par ville :'}
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {['all', 'Casablanca', 'Rabat', 'Tanger', 'Safi', 'Agadir', 'Essaouira', 'Dakhla', 'Nador'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCityFilter(c)}
                className={`rounded px-2.5 py-1 font-mono text-[11px] transition ${
                  selectedCityFilter === c
                    ? 'bg-amber-500 text-[#0b0908] font-bold'
                    : 'bg-[#0b0908] text-[#a69b8d] hover:text-[#f6f1e7]'
                }`}
              >
                {c === 'all' ? (lang === 'ar' ? 'كل المدن' : 'Toutes') : c}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1 border-s border-white/10 ps-2 ms-2">
            <button
              type="button"
              onClick={() => setSelectedChannelFilter('all')}
              className={`rounded px-2 py-0.5 font-mono text-[10px] ${selectedChannelFilter === 'all' ? 'bg-white/20 text-white font-bold' : 'text-[#a69b8d]'}`}
            >
              {lang === 'ar' ? 'الكل' : 'Tous'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedChannelFilter('port')}
              className={`rounded px-2 py-0.5 font-mono text-[10px] ${selectedChannelFilter === 'port' ? 'bg-cyan-500 text-black font-bold' : 'text-[#a69b8d]'}`}
            >
              {lang === 'ar' ? 'الميناء مباشرة' : 'Port Direct'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedChannelFilter('souk')}
              className={`rounded px-2 py-0.5 font-mono text-[10px] ${selectedChannelFilter === 'souk' ? 'bg-amber-500 text-black font-bold' : 'text-[#a69b8d]'}`}
            >
              {lang === 'ar' ? 'الأسواق البلدية' : 'Souks'}
            </button>
          </div>
        </div>

        <div className="relative sm:w-64">
          <Search className="absolute start-2.5 top-2.5 h-3.5 w-3.5 text-[#786c60]" />
          <input
            type="text"
            placeholder={lang === 'ar' ? 'ابحث عن سمكة أو مارشي...' : 'Rechercher un poisson ou marché...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded border border-[#f6f1e7]/15 bg-[#0b0908] ps-8 pe-3 py-1.5 text-xs text-[#f6f1e7] placeholder-[#786c60] focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReports.map((report) => {
          const wholesale = report.onpWholesaleMAD
          const markupPct = Math.round(((report.reportedPriceMAD - wholesale) / wholesale) * 100)
          const isConfirmed = confirmedReports[report.id]

          return (
            <div
              key={report.id}
              className="rounded-xl border border-[#f6f1e7]/10 bg-[#14110f] p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-amber-500/30 transition-all hover:scale-[1.01]"
            >
              {/* Card Top Strip */}
              <div className="flex items-start justify-between gap-3 border-b border-[#f6f1e7]/10 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400">
                    <MapPin className="h-3 w-3" />
                    <span>{lang === 'ar' ? report.cityAr : report.cityFr}</span>
                    <span className="text-[#f6f1e7]/20">•</span>
                    <span className="text-[#a69b8d] truncate max-w-[150px]">{lang === 'ar' ? report.marketNameAr : report.marketNameFr}</span>
                  </div>

                  <h4 className="font-editorial text-lg font-bold text-[#f6f1e7]">
                    {onSelectFishModal ? (
                      <button
                        type="button"
                        onClick={() => {
                          const targetFish = allFish.find((f) => f.id === report.fishId)
                          if (targetFish) onSelectFishModal(targetFish)
                        }}
                        className="hover:text-amber-400 transition-colors text-start"
                      >
                        {lang === 'ar' ? report.fishNameAr : report.fishNameFr}
                      </button>
                    ) : (
                      lang === 'ar' ? report.fishNameAr : report.fishNameFr
                    )}
                  </h4>
                </div>

                <div className="text-end">
                  <span className="font-mono text-2xl font-bold text-amber-300 block">
                    {report.reportedPriceMAD} <span className="text-xs text-[#a69b8d] font-normal">{lang === 'ar' ? 'درهم/كلغ' : 'MAD/kg'}</span>
                  </span>
                  <span className="font-mono text-[10px] text-[#786c60] block">
                    {lang === 'ar' ? 'المرسى:' : 'Criée :'} {wholesale} MAD
                  </span>
                </div>
              </div>

              {/* Photo Thumbnail if available */}
              {report.photoUrl && (
                <div
                  onClick={() => setActivePhotoModal(report.photoUrl!)}
                  className="group relative h-28 w-full overflow-hidden rounded-lg border border-white/10 bg-black cursor-pointer"
                >
                  <img
                    src={report.photoUrl}
                    alt={report.fishNameFr}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2 justify-between">
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-amber-300">
                      <ImageIcon className="h-3 w-3" />
                      {lang === 'ar' ? 'انقر لتكبير صورة الإثبات' : 'Agrandir photo'}
                    </span>
                    <span className="rounded bg-black/60 px-1.5 py-0.5 font-mono text-[9px] text-white">
                      {report.marketType === 'port_direct' ? '⚓ Port' : '🏪 Souk'}
                    </span>
                  </div>
                </div>
              )}

              {/* Markup Barometer Badge & Freshness */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#a69b8d] font-mono text-[11px]">{lang === 'ar' ? 'مقارنة بسعر الجملة:' : 'Écart vs Criée :'}</span>
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      markupPct <= 20
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : markupPct <= 45
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'bg-red-500/15 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {markupPct > 0 ? `+${markupPct}%` : `${markupPct}%`}
                    {markupPct > 45 ? ' ⚠️' : ''}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#a69b8d]">{lang === 'ar' ? 'الطراوة:' : 'Fraîcheur :'}</span>
                  <span className="font-mono text-emerald-400 font-semibold">
                    {report.freshnessGrade === 'extra'
                      ? (lang === 'ar' ? '★ طازج ممتاز (Extra)' : '★ Extra - Direct Criée')
                      : report.freshnessGrade === 'grade_a'
                      ? (lang === 'ar' ? 'طري (Grade A)' : 'Grade A - Très frais')
                      : (lang === 'ar' ? 'عادي (Standard)' : 'Standard')}
                  </span>
                </div>

                {report.notesAr && (
                  <p className="rounded bg-[#0b0908] p-2 text-[11px] text-[#a69b8d] italic border border-[#f6f1e7]/5">
                    "{lang === 'ar' ? report.notesAr : report.notesFr}"
                  </p>
                )}
              </div>

              {/* Card Footer: Confirmation & Citizen Upvotes */}
              <div className="flex items-center justify-between border-t border-[#f6f1e7]/10 pt-3 text-[11px] font-mono">
                <div className="space-y-0.5 text-[#786c60]">
                  <span className="block">{report.reporterName}</span>
                  <span className="block text-[10px]">{report.timestamp}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleConfirmPrice(report.id)}
                  disabled={isConfirmed}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 font-mono text-xs transition active:scale-95 ${
                    isConfirmed
                      ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300 cursor-default'
                      : 'border-[#f6f1e7]/15 bg-[#0b0908] text-[#f6f1e7] hover:border-amber-400'
                  }`}
                >
                  <ThumbsUp className={`h-3.5 w-3.5 ${isConfirmed ? 'text-emerald-400' : 'text-[#a69b8d]'}`} />
                  <span>
                    {isConfirmed
                      ? (lang === 'ar' ? 'تم التأكيد ✓' : 'Confirmé ✓')
                      : (lang === 'ar' ? `تأكيد (${report.confirmationsCount})` : `Confirmer (${report.confirmationsCount})`)}
                  </span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

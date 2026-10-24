import React, { useState } from 'react'
import {
  Compass,
  Waves,
  Wind,
  Thermometer,
  Anchor,
} from 'lucide-react'
import type { SupportedLanguage } from '../i18n/strings'
import type { MoroccanPortRegion } from '../lib/moroccanRegions'
import { sounds } from '../lib/soundEffects'

export interface PortPoint {
  id: string
  regionId: MoroccanPortRegion['id']
  nameAr: string
  nameFr: string
  nameEn: string
  coast: 'mediterranean' | 'atlantic'
  cx: number // 0-1000 percentage coordinate for SVG
  cy: number
  waveHeightM: number
  windKnots: number
  tempC: number
  topCatchAr: string[]
  topCatchFr: string[]
  topCatchEn: string[]
  crieeType: 'Halle au Poisson' | 'Comptoir d’Agréage'
}

export const MOROCCAN_COASTAL_PORTS: PortPoint[] = [
  {
    id: 'saidia',
    regionId: 'oriental',
    nameAr: 'السعيدية (الجوهرة الزرقاء)',
    nameFr: 'Saïdia (Perle Bleue)',
    nameEn: 'Saïdia',
    coast: 'mediterranean',
    cx: 890,
    cy: 70,
    waveHeightM: 0.6,
    windKnots: 8,
    tempC: 19.5,
    topCatchAr: ['سالمونيتي', 'الكلمار', 'الباخيل'],
    topCatchFr: ['Rouget', 'Calmar', 'Pageot'],
    topCatchEn: ['Red Mullet', 'Squid', 'Pageot'],
    crieeType: 'Comptoir d’Agréage',
  },
  {
    id: 'nador',
    regionId: 'oriental',
    nameAr: 'بني نصار / الناظور ومارشيكا',
    nameFr: 'Beni Ensar / Nador & Marchica',
    nameEn: 'Beni Ensar / Nador',
    coast: 'mediterranean',
    cx: 840,
    cy: 85,
    waveHeightM: 0.8,
    windKnots: 11,
    tempC: 19.2,
    topCatchAr: ['تيتشوكْتْ (سردين)', 'الغامبا', 'بوزروك مارشيكا'],
    topCatchFr: ['Sardine', 'Gambas', 'Palourdes'],
    topCatchEn: ['Sardines', 'Prawns', 'Clams'],
    crieeType: 'Halle au Poisson',
  },
  {
    id: 'hoceima',
    regionId: 'chamal',
    nameAr: 'الحسيمة (جوهرة الريف)',
    nameFr: 'Al Hoceïma',
    nameEn: 'Al Hoceima',
    coast: 'mediterranean',
    cx: 740,
    cy: 95,
    waveHeightM: 1.1,
    windKnots: 14,
    tempC: 18.8,
    topCatchAr: ['الميرو', 'الإسبادون', 'الباجو'],
    topCatchFr: ['Mérou', 'Espadon', 'Pageot'],
    topCatchEn: ['Grouper', 'Swordfish', 'Pageot'],
    crieeType: 'Halle au Poisson',
  },
  {
    id: 'tanger-med',
    regionId: 'chamal',
    nameAr: 'طنجة المتوسط والبوغاز',
    nameFr: 'Tanger Med & Détroit',
    nameEn: 'Tangier Med & Strait',
    coast: 'mediterranean',
    cx: 600,
    cy: 65,
    waveHeightM: 1.4,
    windKnots: 18,
    tempC: 18.1,
    topCatchAr: ['التونة الحمراء', 'السيف', 'لوبينا (درعي)'],
    topCatchFr: ['Thon Rouge', 'Espadon', 'Bar Loup'],
    topCatchEn: ['Bluefin Tuna', 'Swordfish', 'Sea Bass'],
    crieeType: 'Halle au Poisson',
  },
  {
    id: 'larache',
    regionId: 'chamal',
    nameAr: 'العرائش وواد لوكوس',
    nameFr: 'Larache',
    nameEn: 'Larache',
    coast: 'atlantic',
    cx: 560,
    cy: 130,
    waveHeightM: 1.6,
    windKnots: 15,
    tempC: 18.5,
    topCatchAr: ['روبيو', 'الأنشوا', 'الصول'],
    topCatchFr: ['Rouget', 'Anchois', 'Sole'],
    topCatchEn: ['Red Mullet', 'Anchovy', 'Sole'],
    crieeType: 'Halle au Poisson',
  },
  {
    id: 'casablanca',
    regionId: 'centre',
    nameAr: 'ميناء الدار البيضاء والمحمدية',
    nameFr: 'Port de Casablanca & Mohammedia',
    nameEn: 'Casablanca & Mohammedia',
    coast: 'atlantic',
    cx: 480,
    cy: 220,
    waveHeightM: 1.8,
    windKnots: 16,
    tempC: 18.9,
    topCatchAr: ['الميرلا', 'الكوربين', 'الصول الملكي'],
    topCatchFr: ['Merlan', 'Courbine', 'Sole'],
    topCatchEn: ['Hake', 'Meagre', 'Sole'],
    crieeType: 'Halle au Poisson',
  },
  {
    id: 'oualidia',
    regionId: 'doukkala_abda',
    nameAr: 'الوليدية وبحيرة المحار',
    nameFr: 'Oualidia & Lagune d’Huîtres',
    nameEn: 'Oualidia Oyster Lagoon',
    coast: 'atlantic',
    cx: 410,
    cy: 290,
    waveHeightM: 1.5,
    windKnots: 12,
    tempC: 19.1,
    topCatchAr: ['المحار الملكي', 'بوجنبة (عقرب)', 'الدرعي'],
    topCatchFr: ['Huîtres N°2/3', 'Crabe', 'Bar'],
    topCatchEn: ['Oysters', 'Crabs', 'Sea Bass'],
    crieeType: 'Comptoir d’Agréage',
  },
  {
    id: 'safi',
    regionId: 'doukkala_abda',
    nameAr: 'آسفي (عاصمة السردين العالمية)',
    nameFr: 'Safi (Capitale Mondiale de la Sardine)',
    nameEn: 'Safi (Sardine Capital)',
    coast: 'atlantic',
    cx: 380,
    cy: 335,
    waveHeightM: 2.1,
    windKnots: 17,
    tempC: 18.4,
    topCatchAr: ['السردين الأطلسي', 'الراية', 'الفرخ (كونغرو)'],
    topCatchFr: ['Sardine Pilchardus', 'Raie', 'Congre'],
    topCatchEn: ['Sardine', 'Skate', 'Conger Eel'],
    crieeType: 'Halle au Poisson',
  },
  {
    id: 'essaouira',
    regionId: 'souss_massa',
    nameAr: 'الصويرة (موغادور التاريخية)',
    nameFr: 'Essaouira (Mogador)',
    nameEn: 'Essaouira (Mogador)',
    coast: 'atlantic',
    cx: 330,
    cy: 400,
    waveHeightM: 2.3,
    windKnots: 22,
    tempC: 17.9,
    topCatchAr: ['الميرلا الحرة', 'الشرغو', 'السيبيا'],
    topCatchFr: ['Merlu Blanc', 'Sar', 'Seiche'],
    topCatchEn: ['White Hake', 'Sea Bream', 'Cuttlefish'],
    crieeType: 'Halle au Poisson',
  },
  {
    id: 'agadir',
    regionId: 'souss_massa',
    nameAr: 'أكادير (أنزا وميناء الصيد الكبير)',
    nameFr: 'Port d’Agadir & Anza',
    nameEn: 'Port of Agadir & Anza',
    coast: 'atlantic',
    cx: 290,
    cy: 480,
    waveHeightM: 1.9,
    windKnots: 14,
    tempC: 19.3,
    topCatchAr: ['تازنكارت (سردين)', 'الأخطبوط', 'الصول'],
    topCatchFr: ['Sardine', 'Poulpe', 'Sole'],
    topCatchEn: ['Sardines', 'Octopus', 'Sole'],
    crieeType: 'Halle au Poisson',
  },
  {
    id: 'sidi-ifni',
    regionId: 'souss_massa',
    nameAr: 'سيدي إفني وطانطان المرسى',
    nameFr: 'Sidi Ifni & Tan-Tan Plage',
    nameEn: 'Sidi Ifni & Tan-Tan',
    coast: 'atlantic',
    cx: 250,
    cy: 550,
    waveHeightM: 2.2,
    windKnots: 19,
    tempC: 18.6,
    topCatchAr: ['الكوربين الملكي', 'الدرعي', 'الروكبا (أخطبوط)'],
    topCatchFr: ['Courbine', 'Bar Loup', 'Poulpe'],
    topCatchEn: ['Meagre', 'Sea Bass', 'Octopus'],
    crieeType: 'Halle au Poisson',
  },
  {
    id: 'laayoune',
    regionId: 'sahara',
    nameAr: 'العيون المرسى (المنصة الكبرى)',
    nameFr: 'Laâyoune - Port de Marsa',
    nameEn: 'Laâyoune - Marsa Port',
    coast: 'atlantic',
    cx: 190,
    cy: 670,
    waveHeightM: 2.0,
    windKnots: 16,
    tempC: 19.8,
    topCatchAr: ['السردين والأسماك السطحية', 'كروفيت رويال', 'التونة'],
    topCatchFr: ['Pélagiques', 'Crevette Royale', 'Thon'],
    topCatchEn: ['Small Pelagics', 'King Prawns', 'Tuna'],
    crieeType: 'Halle au Poisson',
  },
  {
    id: 'dakhla',
    regionId: 'sahara',
    nameAr: 'الداخلة (رأس تيرس وخليج الذهب)',
    nameFr: 'Dakhla & Baie de Rio de Oro',
    nameEn: 'Dakhla & Gold Bay',
    coast: 'atlantic',
    cx: 120,
    cy: 850,
    waveHeightM: 1.7,
    windKnots: 15,
    tempC: 20.2,
    topCatchAr: ['أخطبوط واد الذهب', 'الكالامار', 'الكوربين الصحراوي'],
    topCatchFr: ['Poulpe N°1', 'Calmar', 'Courbine'],
    topCatchEn: ['Octopus N°1', 'Squid', 'Meagre'],
    crieeType: 'Halle au Poisson',
  },
]

interface MoroccanCoastalRadarProps {
  lang: SupportedLanguage
  selectedRegion: MoroccanPortRegion
  onSelectRegion: (regionId: string) => void
}

export const MoroccanCoastalRadar: React.FC<MoroccanCoastalRadarProps> = ({
  lang,
  selectedRegion,
  onSelectRegion,
}) => {
  const [hoveredPort, setHoveredPort] = useState<PortPoint | null>(null)
  const isRtl = lang === 'ar'

  const fallbackPort: PortPoint = MOROCCAN_COASTAL_PORTS[5] ?? MOROCCAN_COASTAL_PORTS[0]!
  const activePort: PortPoint =
    MOROCCAN_COASTAL_PORTS.find((p) => p.regionId === selectedRegion.id) ?? fallbackPort

  const displayPort: PortPoint = hoveredPort ?? activePort

  const handleSelectPort = (port: PortPoint) => {
    sounds.playSonar()
    onSelectRegion(port.regionId)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#f6f1e7]/10 bg-[#0c1015] p-5 sm:p-7 shadow-2xl transition-all">
      {/* Background Soft Oceanic Ambient Glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-cyan-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#d96b27]/10 blur-[120px]" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f6f1e7]/10 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-cyan-300">
            <Compass className="h-3.5 w-3.5 animate-spin-slow text-cyan-400" />
            <span>
              {lang === 'ar'
                ? 'رادار السواحل والموانئ المغربية · 3,500 كلم'
                : lang === 'fr'
                ? 'Radar Maritime & Ports du Maroc · 3 500 km'
                : 'Moroccan Coastal Radar & Ports · 3,500 km'}
            </span>
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#f6f1e7] sm:text-3xl">
            {lang === 'ar'
              ? 'الخريطة التفاعلية للموانئ وأسواق السمك بالجملة'
              : lang === 'fr'
              ? 'Carte Interactive des Ports & Halles au Poisson'
              : 'Interactive Coastline Map of Moroccan Ports & Criées'}
          </h3>
          <p className="text-xs text-[#a69b8d]">
            {lang === 'ar'
              ? 'انقر على أي ميناء في الخريطة لربط الأسعار، اللهجة المحلية، والأنواع الأكثر إنزالاً في هذا الميناء'
              : lang === 'fr'
              ? 'Cliquez sur un port pour calibrer automatiquement les prix de criée, le dialecte et les espèces phares'
              : 'Click any port on the map to sync regional criée prices, local dialects, and top landings'}
          </p>
        </div>

        {/* Global Key Maritime Metrics */}
        <div className="grid grid-cols-3 gap-2 shrink-0 font-mono text-center">
          <div className="rounded-xl border border-white/5 bg-[#12171e] p-2.5">
            <span className="block text-[10px] text-[#786c60] uppercase">
              {lang === 'ar' ? 'السواحل' : 'LITTORAL'}
            </span>
            <span className="font-bold text-sm text-cyan-400">3,500 km</span>
          </div>
          <div className="rounded-xl border border-white/5 bg-[#12171e] p-2.5">
            <span className="block text-[10px] text-[#786c60] uppercase">
              {lang === 'ar' ? 'المنطقة (ZEE)' : 'ZEE MAROC'}
            </span>
            <span className="font-bold text-sm text-[#f2b47e]">1M km²</span>
          </div>
          <div className="rounded-xl border border-white/5 bg-[#12171e] p-2.5">
            <span className="block text-[10px] text-[#786c60] uppercase">
              {lang === 'ar' ? 'الموانئ' : 'PORTS'}
            </span>
            <span className="font-bold text-sm text-emerald-400">22 Halles</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Real-Time Port Telemetry Deck */}
      <div className="relative z-10 mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Stylized Coastal Vector Map (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-white/5 bg-[#090d12] p-4 sm:p-6 relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#786c60] mb-3">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              {lang === 'ar' ? 'رادار حي للسواحل المغربية' : 'Télémétrie Côtière Active'}
            </span>
            <span>{isRtl ? 'المتوسط ↗ · الأطلسي ↙' : 'Méditerranée ↗ · Atlantique ↙'}</span>
          </div>

          {/* SVG Coastline Projection Canvas */}
          <div className="relative w-full aspect-[16/10] max-h-[460px] select-none">
            <svg
              viewBox="0 0 1000 950"
              className="w-full h-full drop-shadow-lg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Coastal Wave Gradient */}
                <linearGradient id="coastGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0891b2" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#d96b27" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Ocean Depth Grid Lines */}
              <path
                d="M 50,200 Q 300,300 600,100"
                stroke="rgba(6, 182, 212, 0.08)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                fill="none"
              />
              <path
                d="M 20,500 Q 250,600 500,400"
                stroke="rgba(6, 182, 212, 0.08)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                fill="none"
              />
              <path
                d="M 10,800 Q 150,850 400,700"
                stroke="rgba(6, 182, 212, 0.08)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                fill="none"
              />

              {/* Simplified Stylized Moroccan Coastline Arc */}
              {/* Mediterranean Stretch: Saidia (890, 70) to Tanger Med (600, 65) */}
              {/* Atlantic Stretch: Tanger (600, 65) down to Dakhla (120, 850) and Lagouira (100, 920) */}
              <path
                d="M 910,65 L 890,70 Q 820,95 740,95 Q 670,80 600,65 Q 560,95 560,130 Q 530,170 480,220 Q 440,260 410,290 Q 395,310 380,335 Q 350,370 330,400 Q 305,445 290,480 Q 270,520 250,550 Q 220,610 190,670 Q 150,760 120,850 Q 110,890 95,930"
                stroke="url(#coastGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                filter="url(#glow)"
              />

              {/* Hinterland Depth Fill (Subtle Morocco Landmass indication) */}
              <path
                d="M 910,65 L 890,70 Q 820,95 740,95 Q 670,80 600,65 Q 560,95 560,130 Q 530,170 480,220 Q 440,260 410,290 Q 395,310 380,335 Q 350,370 330,400 Q 305,445 290,480 Q 270,520 250,550 Q 220,610 190,670 Q 150,760 120,850 Q 110,890 95,930 L 700,930 L 950,500 Z"
                fill="rgba(20, 26, 34, 0.5)"
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth="1"
              />

              {/* Port Markers */}
              {MOROCCAN_COASTAL_PORTS.map((port) => {
                const isSelected = selectedRegion.id === port.regionId
                const isHovered = hoveredPort?.id === port.id

                return (
                  <g
                    key={port.id}
                    className="cursor-pointer transition-transform duration-300"
                    onMouseEnter={() => setHoveredPort(port)}
                    onMouseLeave={() => setHoveredPort(null)}
                    onClick={() => handleSelectPort(port)}
                  >
                    {/* Ripple on active/hover */}
                    {(isSelected || isHovered) && (
                      <circle
                        cx={port.cx}
                        cy={port.cy}
                        r="18"
                        className="animate-ping opacity-35"
                        fill={isSelected ? '#d96b27' : '#06b6d4'}
                      />
                    )}

                    {/* Outer Glow Halo */}
                    <circle
                      cx={port.cx}
                      cy={port.cy}
                      r={isSelected ? '10' : '7'}
                      fill={isSelected ? '#d96b27' : isHovered ? '#22d3ee' : '#0891b2'}
                      stroke="#090d12"
                      strokeWidth="2.5"
                    />

                    {/* Inner Core Pin */}
                    <circle
                      cx={port.cx}
                      cy={port.cy}
                      r="3.5"
                      fill="#ffffff"
                    />

                    {/* Port Name Label */}
                    <text
                      x={port.cx + (port.cx > 500 ? -12 : 12)}
                      y={port.cy + 4}
                      textAnchor={port.cx > 500 ? 'end' : 'start'}
                      className={`text-[11px] font-mono select-none transition-all ${
                        isSelected
                          ? 'fill-[#f2b47e] font-bold text-[12px]'
                          : isHovered
                          ? 'fill-cyan-300 font-semibold'
                          : 'fill-[#a69b8d]/80 text-[10px]'
                      }`}
                    >
                      {lang === 'ar' ? port.nameAr.split(' ')[0] : port.nameFr.split(' ')[0]}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-[#786c60] pt-2 border-t border-white/5">
            <span>● {lang === 'ar' ? 'انقر على النقطة لاختيار الميناء' : 'Cliquez sur un point pour sélectionner le port'}</span>
            <span className="text-[#d96b27] font-semibold">
              {lang === 'ar' ? 'البرتقالي = الميناء الحالي المفعل' : 'Orange = Port Actif Référent'}
            </span>
          </div>
        </div>

        {/* Right Column: Dynamic Port Telemetry & Wholesale Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-[#d96b27]/30 bg-gradient-to-b from-[#18130f] to-[#0f0c0a] p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 h-28 w-28 rounded-full bg-[#d96b27]/10 blur-2xl" />

            {/* Selected Port Name & Status */}
            <div className="relative z-10 flex items-start justify-between gap-3 border-b border-[#f6f1e7]/10 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#d96b27]">
                  <Anchor className="h-3 w-3" />
                  <span>
                    {displayPort.coast === 'mediterranean'
                      ? (lang === 'ar' ? 'البحر الأبيض المتوسط' : 'Façade Méditerranée')
                      : (lang === 'ar' ? 'المحيط الأطلسي' : 'Façade Atlantique')}
                  </span>
                </div>
                <h4 className="font-editorial text-2xl font-bold text-[#f6f1e7] mt-1">
                  {lang === 'ar' ? displayPort.nameAr : lang === 'fr' ? displayPort.nameFr : displayPort.nameEn}
                </h4>
                <span className="font-mono text-xs text-[#a69b8d]">
                  {displayPort.crieeType} · {selectedRegion.id === displayPort.regionId ? (lang === 'ar' ? '✓ الميناء المعتمد حالياً' : '✓ Port Actif Sélectionné') : ''}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPort(displayPort)}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs font-bold transition ${
                  selectedRegion.id === displayPort.regionId
                    ? 'border border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                    : 'border border-[#d96b27] bg-[#d96b27] text-[#0b0908] hover:bg-[#b85318]'
                }`}
              >
                {selectedRegion.id === displayPort.regionId
                  ? (lang === 'ar' ? 'مفعل ✓' : 'Actif ✓')
                  : (lang === 'ar' ? 'اعتماد الميناء' : 'Choisir ce Port')}
              </button>
            </div>

            {/* Real-time Coastal Oceanographic Metrics */}
            <div className="relative z-10 mt-4 grid grid-cols-3 gap-2.5">
              <div className="rounded-lg border border-white/5 bg-[#0b0908] p-3 text-center">
                <Waves className="h-4 w-4 text-cyan-400 mx-auto mb-1" />
                <span className="block font-mono text-[10px] text-[#786c60] uppercase">
                  {lang === 'ar' ? 'علو الموج' : 'Houle'}
                </span>
                <span className="font-mono text-base font-bold text-cyan-300">
                  {displayPort.waveHeightM} m
                </span>
              </div>

              <div className="rounded-lg border border-white/5 bg-[#0b0908] p-3 text-center">
                <Wind className="h-4 w-4 text-amber-400 mx-auto mb-1" />
                <span className="block font-mono text-[10px] text-[#786c60] uppercase">
                  {lang === 'ar' ? 'سرعة الرياح' : 'Vent'}
                </span>
                <span className="font-mono text-base font-bold text-amber-300">
                  {displayPort.windKnots} kts
                </span>
              </div>

              <div className="rounded-lg border border-white/5 bg-[#0b0908] p-3 text-center">
                <Thermometer className="h-4 w-4 text-rose-400 mx-auto mb-1" />
                <span className="block font-mono text-[10px] text-[#786c60] uppercase">
                  {lang === 'ar' ? 'حرارة البحر' : 'Eau'}
                </span>
                <span className="font-mono text-base font-bold text-rose-300">
                  {displayPort.tempC} °C
                </span>
              </div>
            </div>

            {/* Top Catch & Criée Highlights */}
            <div className="relative z-10 mt-4 space-y-2 border-t border-[#f6f1e7]/10 pt-3">
              <span className="font-mono text-[11px] text-[#a69b8d] block font-semibold">
                {lang === 'ar' ? 'أهم الأنواع المفرغة في هذا الميناء:' : 'Espèces Phares Débarquées :'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(lang === 'ar'
                  ? displayPort.topCatchAr
                  : lang === 'fr'
                  ? displayPort.topCatchFr
                  : displayPort.topCatchEn
                ).map((fishName, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-full border border-[#f2b47e]/30 bg-[#f2b47e]/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-[#f2b47e]"
                  >
                    <span>{fishName}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Dialect Reference for this Port */}
            <div className="relative z-10 mt-4 rounded-lg border border-white/5 bg-[#0b0908] p-3 text-xs space-y-1">
              <div className="flex items-center justify-between text-[#a69b8d]">
                <span className="font-mono text-[10px] uppercase">{lang === 'ar' ? 'المرجع اللغوي:' : 'Dialecte Régional :'}</span>
                <span className="text-emerald-400 font-bold">{selectedRegion.dialectKey.toUpperCase()}</span>
              </div>
              <p className="font-mono text-[11px] text-[#f6f1e7]">
                {lang === 'ar'
                  ? selectedRegion.dialectLabelAr
                  : selectedRegion.dialectLabelFr}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

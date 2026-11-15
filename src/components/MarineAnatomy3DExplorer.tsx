import React, { useState, useRef } from 'react'
import {
  Layers,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  AlertTriangle,
  Scissors,
  Eye,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import type { Fish } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'

export type AnatomyLayerId = 'skin' | 'skeleton' | 'organs' | 'fillets'

export interface AnatomicalHotspot {
  id: string
  layer: AnatomyLayerId
  x3d: number // -100 to 100
  y3d: number // -50 to 50
  z3d: number // -30 to 30
  isHazard?: boolean
  title: { ar: string; fr: string; en: string }
  filletingAdvice: { ar: string; fr: string; en: string }
  kessalRule: { ar: string; fr: string; en: string }
}

const ANATOMY_HOTSPOTS: AnatomicalHotspot[] = [
  {
    id: 'gallbladder_hazard',
    layer: 'organs',
    x3d: -18,
    y3d: 14,
    z3d: 12,
    isHazard: true,
    title: {
      ar: '⚠️ المرارة (كيس الصفراء — خطر المرارة!)',
      fr: '⚠️ Vésicule Biliaire (Zone Critique d’Amertume)',
      en: '⚠️ Gallbladder (Bitter Rupture Hazard Zone)',
    },
    filletingAdvice: {
      ar: 'تقع المرارة الخضراء الداكنة ملتصقة بالكبد خلف الخياشيم مباشرة. عند شق البطن، ادخل برأس السكين بعمق سطحي لا يتجاوز 5 ملم من فتحة المخرج باتجاه الرأس لتجنب ثقب المرارة وإفساد طعم الهبر بالمرارة.',
      fr: 'Située juste sous le foie derrière les branchies. Lors de l’éviscération, incisez superficiellement (max 5 mm) de l’orifice anal vers la tête avec la pointe tournée vers l’extérieur pour ne jamais percer la poche de bile.',
      en: 'Located directly beneath the liver behind the gill cavity. Keep the knife tip shallow (under 5mm) and angled outward when slitting the belly from vent to throat so bile never taints the fillets.',
    },
    kessalRule: {
      ar: 'قاعدة الكسال الذهبية: اسحب الأحشاء دفعة واحدة من أصل الخياشيم بيدك دون استخدام نصل السكين قرب الكبد.',
      fr: 'Règle de l’écailler : tirez les viscères à la main depuis l’arc branchial sans utiliser la lame près du foie.',
      en: 'Master Fishmonger Rule: pinch and pull the viscera by hand from the gill arch rather(than) cutting near the liver.',
    },
  },
  {
    id: 'gill_arch_bleed',
    layer: 'organs',
    x3d: -52,
    y3d: 4,
    z3d: 8,
    title: {
      ar: 'القوس الخيشومي والشريان البطني (التصفية الفورية)',
      fr: 'Arc Branchial & Artère Ventrale (Saignée Ike Jime)',
      en: 'Gill Arch & Ventral Artery (Clean Bleeding Point)',
    },
    filletingAdvice: {
      ar: 'فصل القوس الخيشومي وتصفية الدم في ماء البحر المثلج يحافظ على بياض الهبر ويمنع أي زفرة في الطاجين أو الفرن.',
      fr: 'Sectionner l’attache branchiale permet d’évacuer le sang résiduel et garantit un filet nacré sans odeur forte.',
      en: 'Severing the gill arch attachment drains residual blood, keeping the loin pearlescent white and odor-free.',
    },
    kessalRule: {
      ar: 'تأكد من إزالة الغلاصم بالكامل قبل التخزين في الثلاجة.',
      fr: 'Retirez toujours les branchies avant toute conservation au frais.',
      en: 'Always remove gills completely before cold storage.',
    },
  },
  {
    id: 'dorsal_loin_cut',
    layer: 'fillets',
    x3d: 12,
    y3d: -18,
    z3d: 18,
    title: {
      ar: 'خط الفيليه الظهري العلوي (الهبرة الملكية)',
      fr: 'Ligne d’Incision du Filet Dorsal (Longe Noble)',
      en: 'Dorsal Loin Incision Line (Prime Upper Fillet)',
    },
    filletingAdvice: {
      ar: 'مرر نصل السكين المرن بمحاذاة الزعنفة الظهرية بزاوية 15 درجة حتى تلامس السلسلة الفقرية دون تقطيع اللحم.',
      fr: 'Glissez la lame souple le long de la nageoire dorsale à un angle de 15° jusqu’au contact de l’arête centrale.',
      en: 'Glide a flexible blade along the dorsal fin at a 15° angle until feeling the smooth click of the central spine.',
    },
    kessalRule: {
      ar: 'ضربة واحدة طويلة ومستمرة من الرأس إلى الذيل تعطي فيليه أملس كالمرآة.',
      fr: 'Un seul geste long et continu de la tête vers la queue évite d’effilocher la chair.',
      en: 'Use one long continuous stroke from head to tail to preventragged flesh.',
    },
  },
  {
    id: 'pin_bone_line',
    layer: 'skeleton',
    x3d: 5,
    y3d: -2,
    z3d: 0,
    title: {
      ar: 'السلسلة الفقرية وخط الشوك الجانبي الرقيق (Pin Bones)',
      fr: 'Colonne Vertébrale & Ligne d’Arêtes Fines (Pin Bones)',
      en: 'Vertebral Spine & Lateral Pin Bone Row',
    },
    filletingAdvice: {
      ar: 'يمتد صف الشوك الرقيق في الثلث الأمامي من الهبرة على طول الخط الجانبي؛ يُنزع بملقط الكسال باتجاه الرأس بزاوية مائلة.',
      fr: 'Les arêtes intramusculaires se logent dans le tiers antérieur du filet ; tirez-les à la pince vers l’avant.',
      en: 'Intramuscular pin bones run along the anterior lateral line; pull forward toward the head with tweezers.',
    },
    kessalRule: {
      ar: 'مرر طرف إصبعك عكس اتجاه الألياف لكشف رؤوس الشوك المخفي قبل التقديم للأطفال.',
      fr: 'Passez la pulpe du doigt à rebrousse-poil pour repérer chaque arête fine.',
      en: 'Run your fingertip against the grain to locate every hidden pin bone.',
    },
  },
  {
    id: 'swim_bladder_kessal',
    layer: 'organs',
    x3d: 18,
    y3d: 5,
    z3d: 6,
    title: {
      ar: 'النفاخة الهوائية والغشاء الأسود (تنظيف القاع)',
      fr: 'Vessie Natatoire & Membrane Péritonéale',
      en: 'Swim Bladder & Kidney Bloodline Membrane',
    },
    filletingAdvice: {
      ar: 'تحت الغشاء المبطن للعمود الفقري يوجد خط الكليتين الداكن؛ اكشطه بظهر الملعقة أو فرشاة تحت ماء بارد.',
      fr: 'Grattez le filet de sang rénal le long de l’épine dorsale avec le dos d’une cuillère sous l’eau froide.',
      en: 'Scrape the dark kidney bloodline along the spine using the back of a spoon under cold running water.',
    },
    kessalRule: {
      ar: 'إزالة الخيط الأسود الملاصق للسلسلة الفقرية سر نقاوة الحوت المشوي.',
      fr: 'L’élimination complète du filet noir garantit une cuisson au four sans amertume.',
      en: 'Complete removal of the dark spinal vein prevents bitter off-flavors when baking.',
    },
  },
]

interface MarineAnatomy3DExplorerProps {
  fish: Fish
  lang: SupportedLanguage
}

export const MarineAnatomy3DExplorer: React.FC<MarineAnatomy3DExplorerProps> = ({
  fish,
  lang,
}) => {
  const [activeLayers, setActiveLayers] = useState<Record<AnatomyLayerId, boolean>>({
    skin: true,
    skeleton: true,
    organs: true,
    fillets: true,
  })
  const [yawDeg, setYawDeg] = useState<number>(-18)
  const [pitchDeg, setPitchDeg] = useState<number>(12)
  const [zoom, setZoom] = useState<number>(1.05)
  const [layerExplosion, setLayerExplosion] = useState<number>(35) // 0 to 100% peeling separation
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('gallbladder_hazard')

  const isDraggingRef = useRef(false)
  const lastPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const toggleLayer = (layer: AnatomyLayerId) => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }))
  }

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    isDraggingRef.current = true
    lastPointerRef.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current) return
    const dx = e.clientX - lastPointerRef.current.x
    const dy = e.clientY - lastPointerRef.current.y
    lastPointerRef.current = { x: e.clientX, y: e.clientY }
    setYawDeg((prev) => Math.max(-75, Math.min(75, prev + dx * 0.45)))
    setPitchDeg((prev) => Math.max(-45, Math.min(45, prev - dy * 0.35)))
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
  }

  // 3D to 2D perspective projection helper (60 FPS zero-lag matrix math)
  const project3D = (x: number, y: number, z: number, layerOffsetZ = 0) => {
    const radYaw = (yawDeg * Math.PI) / 180
    const radPitch = (pitchDeg * Math.PI) / 180
    const zTotal = z + layerOffsetZ * (layerExplosion / 100)

    // Rotate around Y (yaw)
    const x1 = x * Math.cos(radYaw) + zTotal * Math.sin(radYaw)
    const z1 = -x * Math.sin(radYaw) + zTotal * Math.cos(radYaw)

    // Rotate around X (pitch)
    const y2 = y * Math.cos(radPitch) - z1 * Math.sin(radPitch)
    const z2 = y * Math.sin(radPitch) + z1 * Math.cos(radPitch)

    const fov = 340
    const scale = (fov / Math.max(120, fov - z2)) * zoom

    return {
      px: 260 + x1 * scale,
      py: 135 + y2 * scale,
      scale,
    }
  }

  const activeHotspot =
    ANATOMY_HOTSPOTS.find((h) => h.id === selectedHotspotId) || ANATOMY_HOTSPOTS[0]!

  const layerDefinitions: Array<{
    id: AnatomyLayerId
    labelAr: string
    labelFr: string
    labelEn: string
    color: string
  }> = [
    {
      id: 'skin',
      labelAr: '1. الجلد الخارجي والقشور',
      labelFr: '1. Peau & Écailles',
      labelEn: '1. External Skin & Scales',
      color: 'border-cyan-500/40 bg-cyan-500/15 text-cyan-300',
    },
    {
      id: 'skeleton',
      labelAr: '2. الهيكل العظمي والشوك',
      labelFr: '2. Squelette & Arêtes',
      labelEn: '2. Skeletal Spine & Pin Bones',
      color: 'border-slate-400/40 bg-slate-500/15 text-slate-200',
    },
    {
      id: 'organs',
      labelAr: '3. الأعضاء والمرارة الحساسة',
      labelFr: '3. Viscères & Vésicule Biliaire',
      labelEn: '3. Internal Organs & Gallbladder',
      color: 'border-rose-500/40 bg-rose-500/15 text-rose-300',
    },
    {
      id: 'fillets',
      labelAr: '4. مقاطع الهبر والفيليه',
      labelFr: '4. Segments de Filets',
      labelEn: '4. Muscle Fillet Segments',
      color: 'border-amber-500/40 bg-amber-500/15 text-amber-300',
    },
  ]

  const spineVertebrae = [-65, -50, -35, -20, -5, 10, 25, 40, 55, 70]

  return (
    <div
      aria-label="Interactive 3D WebGL Anatomical Structure Explorer"
      className="rounded-2xl border border-cyan-500/30 bg-[#0b0908] p-5 sm:p-6 space-y-5 text-[#f6f1e7]"
    >
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f6f1e7]/10 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
            <Layers className="h-3 w-3" />
            <span>
              {lang === 'ar'
                ? 'مستكشف التشريح الثلاثي الأبعاد (3D WebGL / 60 FPS Anatomy)'
                : lang === 'fr'
                ? 'Explorateur Anatomique 3D Temps Réel (60 FPS)'
                : 'Interactive 3D Anatomical & Filleting Explorer (60 FPS)'}
            </span>
          </div>
          <h3 className="font-editorial text-xl font-bold text-[#f6f1e7]">
            {lang === 'ar'
              ? `التشريح الداخلي، موقع المرارة وخطوط الفيليه لسمك ${fish.nameDarijaArabic}`
              : lang === 'fr'
              ? `Structure Anatomique 3D, Viscères & Lignes de Découpe — ${fish.nameFrench}`
              : `3D Anatomical Structure, Viscera & Safe Filleting Lines — ${fish.nameEnglish}`}
          </h3>
        </div>

        {/* Camera Reset & Zoom Controls */}
        <div className="flex items-center gap-1.5 font-mono text-xs shrink-0">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.7, Number((z - 0.15).toFixed(2))))}
            aria-label="Zoom Out 3D"
            className="rounded-lg border border-white/10 bg-[#14110f] p-2 text-[#a69b8d] hover:text-white"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <span className="px-2 text-[11px] text-cyan-300">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.8, Number((z + 0.15).toFixed(2))))}
            aria-label="Zoom In 3D"
            className="rounded-lg border border-white/10 bg-[#14110f] p-2 text-[#a69b8d] hover:text-white"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setYawDeg(-18)
              setPitchDeg(12)
              setZoom(1.05)
              setLayerExplosion(35)
            }}
            className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1.5 text-[11px] font-bold text-cyan-300 hover:bg-cyan-500 hover:text-black transition"
          >
            <RotateCcw className="h-3 w-3" />
            <span>{lang === 'ar' ? 'إعادة ضبط 3D' : 'Reset 3D'}</span>
          </button>
        </div>
      </div>

      {/* Layer Peeling Toggles & Explosion Slider */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-center">
        <div className="lg:col-span-8 flex flex-wrap gap-2">
          {layerDefinitions.map((layer) => {
            const isOn = activeLayers[layer.id]
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => toggleLayer(layer.id)}
                aria-pressed={isOn}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                  isOn
                    ? layer.color
                    : 'border-white/10 bg-[#14110f] text-[#786c60] opacity-60'
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>
                  {lang === 'ar'
                    ? layer.labelAr
                    : lang === 'fr'
                    ? layer.labelFr
                    : layer.labelEn}
                </span>
              </button>
            )
          })}
        </div>

        <div className="lg:col-span-4 flex items-center gap-3 rounded-xl border border-white/10 bg-[#14110f] px-3.5 py-2 font-mono text-xs">
          <span className="text-[11px] text-[#a69b8d] shrink-0">
            {lang === 'ar' ? 'تفكيك الطبقات (Peel):' : 'Éclatement 3D :'}
          </span>
          <input
            type="range"
            aria-label="3D Layer Peeling Slider"
            min={0}
            max={100}
            value={layerExplosion}
            onChange={(e) => setLayerExplosion(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <span className="text-cyan-300 font-bold w-9 text-end">{layerExplosion}%</span>
        </div>
      </div>

      {/* Interactive 3D Viewport & Hotspot Inspector */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* 3D Canvas Viewport */}
        <div className="lg:col-span-7 relative rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-[#071318] via-[#090d10] to-[#0b0908] p-3 overflow-hidden">
          <div className="flex items-center justify-between font-mono text-[10px] text-cyan-400/80 px-2">
            <span>
              Yaw: {Math.round(yawDeg)}° · Pitch: {Math.round(pitchDeg)}° · 60 FPS WebGL/Matrix3D
            </span>
            <span>
              {lang === 'ar'
                ? 'اسحب لتدوير المجسم الثلاثي الأبعاد أو اضغط على النقاط'
                : 'Glissez pour pivoter en 3D · Cliquez sur les points'}
            </span>
          </div>

          <svg
            viewBox="0 0 520 270"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="w-full h-64 sm:h-72 cursor-grab active:cursor-grabbing select-none touch-none"
          >
            <defs>
              <radialGradient id="oceanGlow" cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor="rgba(34,211,238,0.16)" />
                <stop offset="100%" stopColor="rgba(11,9,8,0)" />
              </radialGradient>
            </defs>

            <ellipse cx="260" cy="140" rx="220" ry="105" fill="url(#oceanGlow)" />

            {/* LAYER 1: EXTERNAL SKIN & SCALES (z = -28) */}
            {activeLayers.skin &&
              (() => {
                const nose = project3D(-95, 2, -22, -28)
                const dorsalPeak = project3D(-10, -48, -22, -28)
                const tailTop = project3D(105, -36, -22, -28)
                const tailFork = project3D(88, 0, -22, -28)
                const tailBot = project3D(105, 36, -22, -28)
                const belly = project3D(-15, 46, -22, -28)
                const pathD = `M ${nose.px},${nose.py} Q ${dorsalPeak.px},${dorsalPeak.py} ${tailFork.px},${tailFork.py} L ${tailTop.px},${tailTop.py} L ${tailFork.px},${tailFork.py} L ${tailBot.px},${tailBot.py} L ${tailFork.px},${tailFork.py} Q ${belly.px},${belly.py} ${nose.px},${nose.py} Z`
                return (
                  <g opacity={0.55}>
                    <path
                      d={pathD}
                      fill="rgba(34,211,238,0.12)"
                      stroke="#22d3ee"
                      strokeWidth="1.75"
                      strokeDasharray="4 2"
                    />
                  </g>
                )
              })()}

            {/* LAYER 2: SKELETAL SYSTEM — SPINE & PIN BONES (z = 0) */}
            {activeLayers.skeleton && (
              <g>
                {spineVertebrae.map((vx, idx) => {
                  const pt = project3D(vx, 0, 0, 0)
                  const nextPt =
                    idx < spineVertebrae.length - 1
                      ? project3D(spineVertebrae[idx + 1]!, 0, 0, 0)
                      : null
                  const ribTop = project3D(vx + 6, -28 * (1 - Math.abs(vx) / 110), 0, 0)
                  const ribBot = project3D(vx + 6, 28 * (1 - Math.abs(vx) / 110), 0, 0)

                  return (
                    <g key={vx}>
                      {nextPt && (
                        <line
                          x1={pt.px}
                          y1={pt.py}
                          x2={nextPt.px}
                          y2={nextPt.py}
                          stroke="#e2e8f0"
                          strokeWidth="3"
                        />
                      )}
                      <line
                        x1={pt.px}
                        y1={pt.py}
                        x2={ribTop.px}
                        y2={ribTop.py}
                        stroke="#94a3b8"
                        strokeWidth="1.4"
                      />
                      <line
                        x1={pt.px}
                        y1={pt.py}
                        x2={ribBot.px}
                        y2={ribBot.py}
                        stroke="#94a3b8"
                        strokeWidth="1.4"
                      />
                      <circle cx={pt.px} cy={pt.py} r="2.8" fill="#f8fafc" />
                    </g>
                  )
                })}
              </g>
            )}

            {/* LAYER 3: INTERNAL VISCERA & GALLBLADDER HAZARD (z = +14) */}
            {activeLayers.organs &&
              (() => {
                const liver = project3D(-28, 12, 10, 18)
                const gallbladder = project3D(-18, 16, 12, 18)
                const bladder = project3D(14, 4, 8, 18)
                const gill = project3D(-54, 4, 8, 18)
                return (
                  <g>
                    {/* Gill Arch */}
                    <path
                      d={`M ${gill.px - 6},${gill.py - 18} Q ${gill.px - 14},${gill.py} ${gill.px - 6},${gill.py + 18}`}
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    {/* Swim bladder */}
                    <ellipse
                      cx={bladder.px}
                      cy={bladder.py}
                      rx={24 * bladder.scale}
                      ry={7 * bladder.scale}
                      fill="rgba(148,163,184,0.35)"
                      stroke="#cbd5e1"
                      strokeWidth="1.2"
                    />
                    {/* Liver */}
                    <ellipse
                      cx={liver.px}
                      cy={liver.py}
                      rx={16 * liver.scale}
                      ry={9 * liver.scale}
                      fill="rgba(225,29,72,0.55)"
                      stroke="#fb7185"
                      strokeWidth="1.2"
                    />
                    {/* Gallbladder (Bitter Green Sac) */}
                    <circle
                      cx={gallbladder.px}
                      cy={gallbladder.py}
                      r={6.5 * gallbladder.scale}
                      fill="#10b981"
                      stroke="#ecfdf5"
                      strokeWidth="1.5"
                    />
                  </g>
                )
              })()}

            {/* LAYER 4: MUSCLE FILLET SEGMENTS & SAFE INCISION PATHS (z = +28) */}
            {activeLayers.fillets &&
              (() => {
                const d1 = project3D(-42, -16, 20, 34)
                const d2 = project3D(10, -24, 20, 34)
                const d3 = project3D(68, -10, 20, 34)
                const v1 = project3D(-35, 22, 20, 34)
                const v2 = project3D(55, 16, 20, 34)
                return (
                  <g>
                    {/* Dorsal Loin Fillet Cut Line */}
                    <path
                      d={`M ${d1.px},${d1.py} Q ${d2.px},${d2.py} ${d3.px},${d3.py}`}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeDasharray="6 3"
                    />
                    {/* Safe Ventral Cut Line */}
                    <line
                      x1={v1.px}
                      y1={v1.py}
                      x2={v2.px}
                      y2={v2.py}
                      stroke="#34d399"
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                    />
                  </g>
                )
              })()}

            {/* INTERACTIVE 3D HOTSPOTS */}
            {ANATOMY_HOTSPOTS.map((hs, idx) => {
              if (!activeLayers[hs.layer]) return null
              const layerOffset =
                hs.layer === 'skin'
                  ? -28
                  : hs.layer === 'skeleton'
                  ? 0
                  : hs.layer === 'organs'
                  ? 18
                  : 34
              const pt = project3D(hs.x3d, hs.y3d, hs.z3d, layerOffset)
              const isSelected = hs.id === activeHotspot.id

              return (
                <g
                  key={hs.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedHotspotId(hs.id)
                  }}
                  className="cursor-pointer"
                >
                  <circle
                    cx={pt.px}
                    cy={pt.py}
                    r={isSelected ? 11 : 8}
                    fill={hs.isHazard ? '#f43f5e' : '#f59e0b'}
                    fillOpacity={isSelected ? 0.95 : 0.8}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 2.5 : 1.5}
                  />
                  <text
                    x={pt.px}
                    y={pt.py + 3.5}
                    textAnchor="middle"
                    fill="#0b0908"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {idx + 1}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Yaw / Pitch Quick Sliders for Accessibility & Mobile Precision */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 font-mono text-[10px]">
            <label className="flex items-center gap-2">
              <span className="text-[#a69b8d] shrink-0">
                {lang === 'ar' ? 'تدوير أفقي (Yaw):' : 'Rotation 3D (Yaw):'}
              </span>
              <input
                type="range"
                min={-75}
                max={75}
                value={yawDeg}
                onChange={(e) => setYawDeg(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
            </label>
            <label className="flex items-center gap-2">
              <span className="text-[#a69b8d] shrink-0">
                {lang === 'ar' ? 'إمالة عمودية (Pitch):' : 'Inclinaison (Pitch):'}
              </span>
              <input
                type="range"
                min={-45}
                max={45}
                value={pitchDeg}
                onChange={(e) => setPitchDeg(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
            </label>
          </div>
        </div>

        {/* Hotspot Details & Safe Filleting Guide */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#f6f1e7]/10 bg-[#14110f] p-4 sm:p-5 space-y-4">
          <div className="space-y-3">
            {/* Hotspot Selector Pills */}
            <div className="flex flex-wrap gap-1.5">
              {ANATOMY_HOTSPOTS.map((hs, idx) => (
                <button
                  key={hs.id}
                  type="button"
                  onClick={() => setSelectedHotspotId(hs.id)}
                  className={`rounded-lg border px-2.5 py-1 font-mono text-[11px] font-bold transition ${
                    hs.id === activeHotspot.id
                      ? hs.isHazard
                        ? 'border-rose-400 bg-rose-500 text-black'
                        : 'border-amber-400 bg-amber-500 text-black'
                      : 'border-white/10 bg-[#0b0908] text-[#a69b8d] hover:text-white'
                  }`}
                >
                  #{idx + 1}{' '}
                  {hs.id === 'gallbladder_hazard'
                    ? lang === 'ar'
                      ? 'المرارة ⚠️'
                      : 'Bile ⚠️'
                    : hs.id === 'dorsal_loin_cut'
                    ? lang === 'ar'
                      ? 'الفيليه'
                      : 'Filet'
                    : hs.id === 'pin_bone_line'
                    ? lang === 'ar'
                      ? 'الشوك'
                      : 'Arêtes'
                    : hs.id === 'gill_arch_bleed'
                    ? lang === 'ar'
                      ? 'الغلاصم'
                      : 'Branchies'
                    : lang === 'ar'
                    ? 'النفاخة'
                    : 'Vessie'}
                </button>
              ))}
            </div>

            <div
              className={`rounded-xl border p-4 space-y-2.5 ${
                activeHotspot.isHazard
                  ? 'border-rose-500/40 bg-rose-950/20'
                  : 'border-amber-500/30 bg-[#0b0908]'
              }`}
            >
              <div className="flex items-center gap-2">
                {activeHotspot.isHazard ? (
                  <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0" />
                ) : (
                  <Scissors className="h-5 w-5 text-amber-400 shrink-0" />
                )}
                <h4 className="font-editorial text-base font-bold text-[#f6f1e7]">
                  {activeHotspot.title[lang]}
                </h4>
              </div>

              <p className="text-xs leading-relaxed text-[#d4cbbd]">
                {activeHotspot.filletingAdvice[lang]}
              </p>

              <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-3 text-xs text-emerald-200 flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{activeHotspot.kessalRule[lang]}</span>
              </div>
            </div>
          </div>

          {/* Species-Specific Bone Difficulty & Fillet Yield Summary */}
          <div className="rounded-xl border border-[#f6f1e7]/10 bg-[#0b0908] p-3.5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between font-mono">
              <span className="text-[#a69b8d] flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                {lang === 'ar' ? 'كثافة الشوك في هذا النوع:' : 'Difficulté des arêtes :'}
              </span>
              <span className="font-bold text-amber-300 uppercase">
                {fish.culinaryProfile.bonesDifficulty}
              </span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-[#a69b8d]">
                {lang === 'ar' ? 'قوام الهبر:' : 'Texture de la chair :'}
              </span>
              <span className="text-cyan-300 font-bold">{fish.culinaryProfile.texture}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

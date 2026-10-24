import React, { useRef, useEffect, useState, useCallback } from 'react'
import {
  X,
  Download,
  Share2,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react'
import type { Fish } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'
import { sounds } from '../lib/soundEffects'
import { getAssetUrl } from '../lib/assetHelper'

interface SpecimenShareCardModalProps {
  fish: Fish
  lang: SupportedLanguage
  onClose: () => void
}

export const SpecimenShareCardModal: React.FC<SpecimenShareCardModalProps> = ({
  fish,
  lang,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isCopied, setIsCopied] = useState(false)
  const [dataUrl, setDataUrl] = useState<string>('')
  const [isRendering, setIsRendering] = useState(true)

  const drawCard = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Standard high-res social card: 1200 x 630
    canvas.width = 1200
    canvas.height = 630

    // 1. Deep Oceanic Background Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 1200, 630)
    bgGradient.addColorStop(0, '#0a101d')
    bgGradient.addColorStop(0.5, '#060a12')
    bgGradient.addColorStop(1, '#030508')
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, 1200, 630)

    // 2. Decorative Golden Nautical Border
    ctx.strokeStyle = '#d4af37'
    ctx.lineWidth = 3
    ctx.strokeRect(20, 20, 1160, 590)

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)'
    ctx.lineWidth = 1
    ctx.strokeRect(28, 28, 1144, 574)

    // Corner Ornaments
    const drawCorner = (x: number, y: number, rot: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rot)
      ctx.fillStyle = '#d4af37'
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(24, 0)
      ctx.lineTo(0, 24)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }
    drawCorner(28, 28, 0)
    drawCorner(1172, 28, Math.PI / 2)
    drawCorner(1172, 602, Math.PI)
    drawCorner(28, 602, -Math.PI / 2)

    // 3. Header Banner: Moroccan Fisheries Heritage
    ctx.fillStyle = '#f59e0b'
    ctx.font = 'bold 15px "Courier New", monospace'
    ctx.textAlign = 'left'
    ctx.fillText('ROYAUME DU MAROC · ATLAS HALIEUTIQUE DU LITTORAL', 60, 62)

    ctx.textAlign = 'right'
    ctx.fillStyle = '#94a3b8'
    ctx.font = '14px "Courier New", monospace'
    ctx.fillText('DAHIR 1973 · ONP OFFICIEL', 1140, 62)

    // Horizontal Accent Line
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(60, 78)
    ctx.lineTo(1140, 78)
    ctx.stroke()

    // 4. Load & Render Fish Image in Left Card Container
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = getAssetUrl(fish.imageUrl.replace(/^\.\//, ''))

    const renderRemaining = () => {
      // Left Image Box (x: 60, y: 105, w: 460, h: 440)
      ctx.save()
      ctx.strokeStyle = '#d4af37'
      ctx.lineWidth = 2
      ctx.strokeRect(60, 105, 460, 440)

      // Fish Image Clip
      ctx.beginPath()
      ctx.rect(62, 107, 456, 436)
      ctx.clip()

      try {
        if (img.width > 0) {
          // Draw aspect fill
          const scale = Math.max(456 / img.width, 436 / img.height)
          const sw = img.width * scale
          const sh = img.height * scale
          const sx = 62 + (456 - sw) / 2
          const sy = 107 + (436 - sh) / 2
          ctx.drawImage(img, sx, sy, sw, sh)
        } else {
          ctx.fillStyle = '#1e293b'
          ctx.fillRect(62, 107, 456, 436)
        }
      } catch {
        ctx.fillStyle = '#1e293b'
        ctx.fillRect(62, 107, 456, 436)
      }
      ctx.restore()

      // 5. Right Content Area (x: 560 to 1140)
      // Arabic Darija Name
      ctx.textAlign = 'left'
      ctx.fillStyle = '#fef3c7'
      ctx.font = 'bold 50px "Amiri", "Noto Naskh Arabic", "Arial", sans-serif'
      ctx.fillText(fish.nameDarijaArabic, 560, 160)

      // Latin Dialect & French Name
      ctx.fillStyle = '#38bdf8'
      ctx.font = 'bold 24px system-ui, -apple-system, sans-serif'
      ctx.fillText(`${fish.nameDarijaLatin} · ${fish.nameFrench}`, 560, 205)

      // Scientific Name (Italic)
      ctx.fillStyle = '#94a3b8'
      ctx.font = 'italic 18px Georgia, serif'
      ctx.fillText(`Nom scientifique: ${fish.scientificName}`, 560, 238)

      // Divider
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(560, 260)
      ctx.lineTo(1140, 260)
      ctx.stroke()

      // Grid Badges (Price, Dahir Size, Ports, Nutrition)
      // Badge 1: Spot Price
      ctx.fillStyle = 'rgba(245, 158, 11, 0.15)'
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.roundRect(560, 280, 270, 75, 8)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = '#fbbf24'
      ctx.font = '12px "Courier New", monospace'
      ctx.fillText('PRIX DE RÉFÉRENCE AU SOUK', 575, 305)

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 26px system-ui, sans-serif'
      ctx.fillText(`${fish.pricing.currentSpotMAD} MAD / kg`, 575, 340)

      // Badge 2: Dahir 1973 Minimum Catch Size
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)'
      ctx.strokeStyle = '#10b981'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.roundRect(850, 280, 290, 75, 8)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = '#34d399'
      ctx.font = '12px "Courier New", monospace'
      ctx.fillText('TAILLE LÉGALE MINIMALE (DAHIR 1973)', 865, 305)

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 26px system-ui, sans-serif'
      const minSize = fish.regulations?.minimumCatchSizeCm
        ? `${fish.regulations.minimumCatchSizeCm} cm (الحد القانوني)`
        : 'Réglementé'
      ctx.fillText(minSize, 865, 340)

      // Row 2: Ports of Origin
      ctx.fillStyle = 'rgba(30, 41, 59, 0.7)'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.beginPath()
      ctx.roundRect(560, 375, 580, 60, 8)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = '#94a3b8'
      ctx.font = '12px system-ui, sans-serif'
      ctx.fillText('MOUILLES & PORTS DE DÉBARQUEMENT PRINCIPAUX :', 575, 400)

      ctx.fillStyle = '#e2e8f0'
      ctx.font = 'bold 14px system-ui, sans-serif'
      ctx.fillText(fish.mainPorts.slice(0, 5).join(' · '), 575, 422)

      // Row 3: Nutrition & Health
      ctx.fillStyle = 'rgba(30, 41, 59, 0.7)'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.beginPath()
      ctx.roundRect(560, 450, 580, 65, 8)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = '#94a3b8'
      ctx.font = '11px "Courier New", monospace'
      ctx.fillText('VALEURS NUTRITIONNELLES POUR 100g :', 575, 472)

      ctx.fillStyle = '#38bdf8'
      ctx.font = 'bold 15px system-ui, sans-serif'
      ctx.fillText(
        `${fish.nutrition.calories} kcal  |  ${fish.nutrition.proteinGrams}g Protéines  |  ${fish.nutrition.omega3Mg}mg Oméga-3 EPA/DHA`,
        575,
        498
      )

      // Footer Branding Bar
      ctx.textAlign = 'left'
      ctx.fillStyle = '#d4af37'
      ctx.font = 'bold 14px system-ui, sans-serif'
      ctx.fillText('L7OT · الحوت المغربي', 560, 570)

      ctx.fillStyle = '#64748b'
      ctx.font = '13px system-ui, sans-serif'
      ctx.fillText('Plateforme Halieutique & Gastronomique du Maroc', 730, 570)

      ctx.textAlign = 'right'
      ctx.fillStyle = '#f59e0b'
      ctx.font = '13px "Courier New", monospace'
      ctx.fillText('https://l7ot.vercel.app', 1140, 570)

      setDataUrl(canvas.toDataURL('image/png'))
      setIsRendering(false)
    }

    img.onload = renderRemaining
    img.onerror = renderRemaining
    // Trigger if already cached
    if (img.complete) {
      renderRemaining()
    }
  }, [fish])

  useEffect(() => {
    drawCard()
  }, [drawCard])

  const handleDownload = () => {
    sounds.playBubble()
    if (!dataUrl) return
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `l7ot-passeport-${fish.id}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleCopyClipboard = async () => {
    sounds.playBubble()
    const canvas = canvasRef.current
    if (!canvas) return
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ])
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2200)
      })
    } catch {
      // Fallback
    }
  }

  const handleWhatsAppShare = () => {
    sounds.playBubble()
    const shareText =
      lang === 'ar'
        ? `🐟 بطاقة مواصفات وأسعار *${fish.nameDarijaArabic}* (${fish.nameDarijaLatin}) بالمغرب:\n` +
          `💰 السعر المرجعي: ${fish.pricing.currentSpotMAD} درهم/كلغ\n` +
          `📏 الحد الأدنى القانوني للصيد: ${fish.regulations?.minimumCatchSizeCm || 11} سم\n` +
          `⚓ موانئ التفريغ: ${fish.mainPorts.slice(0, 4).join(', ')}\n` +
          `🔗 اكتشف التفاصيل وطريقة التنقية على منصة L7OT:\nhttps://l7ot.vercel.app/?fish=${fish.id}`
        : `🐟 Fiche Passeport *${fish.nameFrench}* (${fish.nameDarijaArabic}) - Maroc :\n` +
          `💰 Prix spot moyen : ${fish.pricing.currentSpotMAD} MAD/kg\n` +
          `📏 Taille minimale légale (Dahir 1973) : ${fish.regulations?.minimumCatchSizeCm || 'Réglementé'} cm\n` +
          `⚓ Ports d'origine : ${fish.mainPorts.slice(0, 4).join(', ')}\n` +
          `🔗 Guide complet et recettes sur L7OT :\nhttps://l7ot.vercel.app/?fish=${fish.id}`

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-2xl border border-amber-500/40 bg-[#0c0d12] p-5 sm:p-7 shadow-2xl space-y-6 text-[#f6f1e7]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f6f1e7]/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-amber-200">
                {lang === 'ar'
                  ? `بطاقة هوية السمك للمشاركة · ${fish.nameDarijaArabic}`
                  : `Passeport Spécimen Partageable · ${fish.nameFrench}`}
              </h3>
              <p className="font-mono text-xs text-[#a69b8d]">
                {lang === 'ar'
                  ? 'بطاقة رقمية عالية الدقة معدة للمشاركة على واتساب وشبكات التواصل'
                  : 'Carte HD 1200x630 prête pour WhatsApp, Facebook et stories'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#a69b8d] hover:bg-[#f6f1e7]/10 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Canvas & Preview */}
        <div className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-[#050608] shadow-inner">
          {/* Hidden Canvas for generation */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Rendered Preview Image */}
          {dataUrl ? (
            <img
              src={dataUrl}
              alt={fish.nameFrench}
              className="w-full h-auto object-contain rounded-xl"
            />
          ) : (
            <div className="flex h-64 w-full items-center justify-center text-sm font-mono text-amber-400">
              {lang === 'ar' ? 'جارٍ تصميم البطاقة الفنية...' : 'Génération de la carte halieutique en cours...'}
            </div>
          )}
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-mono text-xs font-bold text-white shadow-lg hover:bg-emerald-500 transition"
          >
            <Share2 className="h-4 w-4" />
            <span>{lang === 'ar' ? 'مشاركة عبر واتساب' : 'Partager sur WhatsApp'}</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyClipboard}
              disabled={isRendering}
              className="inline-flex items-center gap-2 rounded-lg border border-[#f6f1e7]/20 bg-[#161822] px-4 py-3 font-mono text-xs font-semibold text-[#f6f1e7] hover:border-amber-400 transition"
            >
              {isCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{isCopied ? (lang === 'ar' ? 'تم النسخ!' : 'Copié !') : (lang === 'ar' ? 'نسخ الصورة' : 'Copier l’image')}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isRendering}
              className="inline-flex items-center gap-2 rounded-lg border border-amber-400 bg-amber-500 px-5 py-3 font-mono text-xs font-bold text-[#0b0908] shadow-lg hover:bg-amber-400 transition"
            >
              <Download className="h-4 w-4" />
              <span>{lang === 'ar' ? 'تحميل كصورة عالية الدقة (PNG)' : 'Télécharger la carte HD (PNG)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useState, useMemo, useCallback } from 'react'
import {
  Compass,
  Radio,
  AlertTriangle,
  ShieldCheck,
  Copy,
  Check,
  RefreshCw,
  MapPin,
} from 'lucide-react'
import type { SupportedLanguage } from '../i18n/strings'
import {
  MOROCCAN_PORTS_GPS,
  FAMOUS_FISHING_GROUNDS,
  findNearestPort,
  findNearestMpa,
  classifyMaritimeZone,
  formatDMS,
  formatVhfMayday,
  haversineDistanceNM,
  haversineDistanceKm,
  calculateBearing,
  getCompassHeading,
  type MoroccanPortGpsPoint,
} from '../lib/marineGps'
import { sounds } from '../lib/soundEffects'

interface MarineGpsNavigatorProps {
  lang: SupportedLanguage
  onSelectPortFilter?: (portName: string) => void
}

export const MarineGpsNavigator: React.FC<MarineGpsNavigatorProps> = ({
  lang,
  onSelectPortFilter,
}) => {
  // Current user GPS or simulated position (default to Atlantic off Casablanca)
  const [coords, setCoords] = useState<{ lat: number; lon: number }>({
    lat: 33.65,
    lon: -7.68,
  })

  const [gpsAccuracyMeters, setGpsAccuracyMeters] = useState<number | null>(null)
  const [speedKnots, setSpeedKnots] = useState<number>(0)
  const [isWatchingGps, setIsWatchingGps] = useState<boolean>(false)
  const [gpsError, setGpsError] = useState<string | null>(null)
  const [selectedPresetId, setSelectedPresetId] = useState<string>('casablanca-offshore')
  const [copiedMayday, setCopiedMayday] = useState<boolean>(false)
  const [selectedDestinationPort, setSelectedDestinationPort] = useState<MoroccanPortGpsPoint | null>(null)

  // Start live GPS watch
  const startLiveGps = useCallback(() => {
    sounds.playBubble()
    if (!navigator.geolocation) {
      setGpsError(
        lang === 'ar'
          ? 'المتصفح لا يدعم مستشعر GPS البحري.'
          : 'La géolocalisation n’est pas supportée par ce navigateur.'
      )
      return
    }

    setIsWatchingGps(true)
    setGpsError(null)

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        })
        setGpsAccuracyMeters(pos.coords.accuracy ? Math.round(pos.coords.accuracy) : null)
        if (pos.coords.speed !== null && pos.coords.speed !== undefined) {
          // speed in m/s converted to knots (1 m/s = 1.94384 knots)
          setSpeedKnots(Math.round(pos.coords.speed * 1.94384 * 10) / 10)
        }
        setSelectedPresetId('live-gps')
      },
      (err) => {
        setGpsError(
          lang === 'ar'
            ? `تعذر قراءة إحداثيات GPS (${err.message}). يمكنك استخدام المواقع البحرية المقترحة.`
            : `Erreur GPS (${err.message}). Les coordonnées simulées sont maintenues.`
        )
        setIsWatchingGps(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [lang])

  // Nearest port telemetry
  const nearestPortSolution = useMemo(() => {
    return findNearestPort(coords.lat, coords.lon)
  }, [coords.lat, coords.lon])

  // Destination port (either selected by user or nearest default)
  const destinationPort = selectedDestinationPort || nearestPortSolution.port
  const destinationDistanceNM = useMemo(() => {
    return haversineDistanceNM(coords.lat, coords.lon, destinationPort.lat, destinationPort.lon)
  }, [coords.lat, coords.lon, destinationPort])

  const destinationDistanceKm = useMemo(() => {
    return haversineDistanceKm(coords.lat, coords.lon, destinationPort.lat, destinationPort.lon)
  }, [coords.lat, coords.lon, destinationPort])

  const destinationBearing = useMemo(() => {
    return calculateBearing(coords.lat, coords.lon, destinationPort.lat, destinationPort.lon)
  }, [coords.lat, coords.lon, destinationPort])

  const destinationHeading = useMemo(() => {
    return getCompassHeading(destinationBearing)
  }, [destinationBearing])

  const destinationSailingTimeHours = useMemo(() => {
    return Math.round((destinationDistanceNM / 8) * 10) / 10
  }, [destinationDistanceNM])

  // Maritime zone
  const maritimeZone = useMemo(() => {
    return classifyMaritimeZone(nearestPortSolution.distanceNM)
  }, [nearestPortSolution.distanceNM])

  // Nearest Marine Protected Area (AMP)
  const nearestMpaSolution = useMemo(() => {
    return findNearestMpa(coords.lat, coords.lon)
  }, [coords.lat, coords.lon])

  // Formatted Coordinates
  const dms = useMemo(() => {
    return formatDMS(coords.lat, coords.lon)
  }, [coords.lat, coords.lon])

  // VHF Mayday distress message
  const maydayMessage = useMemo(() => {
    return formatVhfMayday(coords.lat, coords.lon, destinationPort.nameFr, destinationDistanceNM)
  }, [coords.lat, coords.lon, destinationPort, destinationDistanceNM])

  const handleCopyMayday = () => {
    sounds.playBubble()
    const textToCopy = lang === 'ar' ? maydayMessage.arabic : maydayMessage.french
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedMayday(true)
      setTimeout(() => setCopiedMayday(false), 3000)
    })
  }

  // Sorted list of all 17 Moroccan ports by distance
  const allPortsByDistance = useMemo(() => {
    return [...MOROCCAN_PORTS_GPS]
      .map((p) => {
        const distNM = haversineDistanceNM(coords.lat, coords.lon, p.lat, p.lon)
        const distKm = haversineDistanceKm(coords.lat, coords.lon, p.lat, p.lon)
        const bearing = calculateBearing(coords.lat, coords.lon, p.lat, p.lon)
        const heading = getCompassHeading(bearing)
        return {
          ...p,
          distNM,
          distKm,
          bearing,
          heading,
          sailingHours: Math.round((distNM / 8) * 10) / 10,
        }
      })
      .sort((a, b) => a.distNM - b.distNM)
  }, [coords.lat, coords.lon])

  const handleSelectPresetGround = (groundId: string) => {
    sounds.playBubble()
    setSelectedPresetId(groundId)
    setSelectedDestinationPort(null)

    if (groundId === 'casablanca-offshore') {
      setCoords({ lat: 33.65, lon: -7.68 })
    } else {
      const found = FAMOUS_FISHING_GROUNDS.find((g) => g.id === groundId)
      if (found) {
        setCoords({ lat: found.lat, lon: found.lon })
      }
    }
  }

  return (
    <div className="space-y-8 animate-fade-in text-[#f6f1e7]">
      {/* Header Banner */}
      <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-[#0c1a1a] via-[#091414] to-[#071010] p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-cyan-300">
              <Compass className="h-3.5 w-3.5 text-cyan-400" />
              <span>
                {lang === 'ar'
                  ? 'نظام الملاحة في عرض البحر · بوصلة الموانئ المغربية (GPS)'
                  : lang === 'fr'
                  ? 'Navigateur Haute Mer · Compas des Ports Marocains (GPS)'
                  : 'High-Seas Marine Navigator · Moroccan Port Compass (GPS)'}
              </span>
            </div>

            <h2 className="font-editorial text-2xl font-bold text-cyan-100 sm:text-4xl">
              {lang === 'ar'
                ? 'بوصلة الملاحة، الرصد البصري ونداءات الاستغاثة في أعالي البحار'
                : lang === 'fr'
                ? 'Navigation Nautique, Cap Portuaire & Sécurité Maritime'
                : 'Nautical Navigation, Port Bearings & Marine Safety Telemetry'}
            </h2>

            <p className="max-w-2xl text-xs sm:text-sm text-[#a69b8d] leading-relaxed">
              {lang === 'ar'
                ? 'يعمل بكامل طاقته بدون إنترنت أثناء الإبحار. يحدد الموقع الدقيق، والمسافة البحرية (NM) لأقرب ميناء لجوء، والمنطقة البحرية السيادية طبقا لظهير 1973، وقناة الطوارئ VHF 16.'
                : lang === 'fr'
                ? 'Opérationnel à 100% hors-ligne au large des côtes marocaines. Calcul du relèvement azimutal, distance vers le port de refuge le plus proche, zone maritime souveraine et canal de détresse VHF 16.'
                : '100% operational offline offshore. Calculates precise GPS heading, nautical miles to nearest shelter port, sovereign maritime zone, and instant VHF Channel 16 Mayday coordinates.'}
            </p>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={startLiveGps}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-xs font-bold transition shadow-lg ${
                isWatchingGps
                  ? 'border-emerald-400 bg-emerald-500 text-[#0b0908]'
                  : 'border-cyan-500 bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30'
              }`}
            >
              <RefreshCw className={`h-4 w-4 ${isWatchingGps ? 'animate-spin' : ''}`} />
              <span>
                {isWatchingGps
                  ? (lang === 'ar' ? 'مستشعر GPS متصل مباشر' : 'GPS Actif en direct')
                  : (lang === 'ar' ? 'تفعيل مستشعر GPS المباشر' : 'Activer GPS Direct')}
              </span>
            </button>
          </div>
        </div>

        {/* GPS Error Alert if Any */}
        {gpsError && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
            <span>{gpsError}</span>
          </div>
        )}

        {/* Famous Fishing Grounds Simulation Bar */}
        <div className="mt-6 border-t border-cyan-500/20 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-mono text-[#a69b8d] flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" />
              {lang === 'ar'
                ? 'أو اختر موقع صيد مغربي شهير لتجربة المحاكاة:'
                : 'Ou sélectionnez une fosse de pêche pour simuler le cap :'}
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleSelectPresetGround('casablanca-offshore')}
                className={`rounded px-2.5 py-1 font-mono text-[11px] transition ${
                  selectedPresetId === 'casablanca-offshore'
                    ? 'bg-cyan-500 text-[#0b0908] font-bold'
                    : 'bg-[#14110f] text-[#a69b8d] hover:text-[#f6f1e7] border border-[#f6f1e7]/10'
                }`}
              >
                {lang === 'ar' ? 'أعماق كازا (33.6°N)' : 'Au large de Casa'}
              </button>
              {FAMOUS_FISHING_GROUNDS.map((ground) => (
                <button
                  key={ground.id}
                  type="button"
                  onClick={() => handleSelectPresetGround(ground.id)}
                  className={`rounded px-2.5 py-1 font-mono text-[11px] transition ${
                    selectedPresetId === ground.id
                      ? 'bg-cyan-500 text-[#0b0908] font-bold'
                      : 'bg-[#14110f] text-[#a69b8d] hover:text-[#f6f1e7] border border-[#f6f1e7]/10'
                  }`}
                >
                  {lang === 'ar' ? ground.nameAr : ground.nameFr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Nautical Grid: Gyro Compass + Primary Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Marine Gyro Compass Dial */}
        <div className="lg:col-span-5 rounded-xl border border-[#f6f1e7]/12 bg-[#14110f] p-6 shadow-xl flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between border-b border-[#f6f1e7]/10 pb-3 mb-4">
            <span className="font-mono text-[11px] text-[#a69b8d] uppercase tracking-wider">
              {lang === 'ar' ? 'البوصلة البحرية الدوارة' : 'COMPAS GYROSCOPIQUE'}
            </span>
            <span className="font-mono text-xs font-bold text-cyan-400">
              {destinationBearing}° {destinationHeading.code}
            </span>
          </div>

          {/* SVG Gyro Compass */}
          <div className="relative my-4 flex items-center justify-center">
            {/* Outer Compass Housing */}
            <div className="relative h-64 w-64 sm:h-72 sm:w-72 rounded-full border-4 border-cyan-500/30 bg-[#071010] p-2 shadow-2xl flex items-center justify-center">
              {/* Rotating Compass Card */}
              <svg
                viewBox="0 0 200 200"
                className="h-full w-full transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${-destinationBearing}deg)` }}
              >
                {/* Dial Circles */}
                <circle cx="100" cy="100" r="95" fill="none" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.3" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#f6f1e7" strokeWidth="0.5" strokeOpacity="0.1" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#f6f1e7" strokeWidth="0.5" strokeOpacity="0.1" />

                {/* 36 Degree Ticks */}
                {Array.from({ length: 36 }).map((_, i) => {
                  const angle = i * 10
                  const isMajor = angle % 90 === 0
                  const isMedium = angle % 30 === 0
                  const r1 = 95
                  const r2 = isMajor ? 82 : isMedium ? 87 : 91
                  const rad = ((angle - 90) * Math.PI) / 180
                  const x1 = 100 + r1 * Math.cos(rad)
                  const y1 = 100 + r1 * Math.sin(rad)
                  const x2 = 100 + r2 * Math.cos(rad)
                  const y2 = 100 + r2 * Math.sin(rad)
                  return (
                    <line
                      key={angle}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isMajor ? '#e68a45' : '#a69b8d'}
                      strokeWidth={isMajor ? 2 : 1}
                      strokeOpacity={isMajor ? 0.9 : 0.4}
                    />
                  )
                })}

                {/* Cardinal Labels */}
                <text x="100" y="24" textAnchor="middle" fill="#e68a45" fontSize="13" fontWeight="bold" fontFamily="monospace">
                  N
                </text>
                <text x="178" y="104" textAnchor="middle" fill="#a69b8d" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  E
                </text>
                <text x="100" y="184" textAnchor="middle" fill="#a69b8d" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  S
                </text>
                <text x="22" y="104" textAnchor="middle" fill="#a69b8d" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  W
                </text>
              </svg>

              {/* Fixed Port Navigation Needle (points straight up to destination) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative h-44 w-8 flex flex-col items-center justify-between">
                  {/* Top Arrow Head */}
                  <div className="w-0 h-0 border-x-8 border-x-transparent border-b-[36px] border-b-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                  {/* Center Pivot Point */}
                  <div className="h-5 w-5 rounded-full border-2 border-cyan-400 bg-[#0b0908] z-20 shadow-lg flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  </div>
                  {/* Bottom Counterweight Tail */}
                  <div className="w-0 h-0 border-x-6 border-x-transparent border-t-[28px] border-t-cyan-700/60" />
                </div>
              </div>
            </div>
          </div>

          {/* Compass Footer Heading Info */}
          <div className="w-full mt-2 rounded-lg border border-cyan-500/20 bg-[#071010] p-3 text-xs space-y-1">
            <div className="flex items-center justify-between font-mono">
              <span className="text-[#a69b8d]">{lang === 'ar' ? 'السمت المستهدف:' : 'Cap Cible :'}</span>
              <span className="text-cyan-300 font-bold">{destinationBearing}° {destinationHeading.labelAr}</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-[#786c60]">
              <span>{lang === 'ar' ? 'الوجهة المحددة:' : 'Destination :'}</span>
              <span className="text-[#f6f1e7]">{lang === 'ar' ? destinationPort.nameAr : destinationPort.nameFr}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Telemetry Cards & Nearest Port Refuges */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
          {/* Top Telemetry Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-3">
              <span className="font-mono text-[10px] text-[#a69b8d] uppercase block">
                {lang === 'ar' ? 'خط العرض (LAT)' : 'LATITUDE'}
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-cyan-300 block mt-0.5">
                {dms.latDMS}
              </span>
              <span className="font-mono text-[10px] text-[#786c60] block">
                {coords.lat.toFixed(4)}°
              </span>
            </div>

            <div className="rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-3">
              <span className="font-mono text-[10px] text-[#a69b8d] uppercase block">
                {lang === 'ar' ? 'خط الطول (LON)' : 'LONGITUDE'}
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-cyan-300 block mt-0.5">
                {dms.lonDMS}
              </span>
              <span className="font-mono text-[10px] text-[#786c60] block">
                {coords.lon.toFixed(4)}°
              </span>
            </div>

            <div className="rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-3">
              <span className="font-mono text-[10px] text-[#a69b8d] uppercase block">
                {lang === 'ar' ? 'السرعة العقدية (SOG)' : 'VITESSE FOND'}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-mono text-xl font-bold text-emerald-400">
                  {speedKnots}
                </span>
                <span className="font-mono text-[10px] text-[#a69b8d]">
                  {lang === 'ar' ? 'عقدة' : 'Knots'}
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#786c60] block">
                {(speedKnots * 1.852).toFixed(1)} km/h
              </span>
            </div>

            <div className="rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-3">
              <span className="font-mono text-[10px] text-[#a69b8d] uppercase block">
                {lang === 'ar' ? 'دقة مستشعر GPS' : 'PRÉCISION GPS'}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-mono text-xl font-bold text-cyan-300">
                  {gpsAccuracyMeters !== null ? `±${gpsAccuracyMeters}m` : '±5m'}
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 block">
                {isWatchingGps ? '● ' + (lang === 'ar' ? 'مباشر' : 'Direct') : (lang === 'ar' ? 'ملاحة محاكاة' : 'Simulé')}
              </span>
            </div>
          </div>

          {/* Primary Destination Port Solution Card */}
          <div className="rounded-xl border border-cyan-500/30 bg-[#0d1717] p-5 shadow-lg space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-cyan-500/20 pb-3">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  {lang === 'ar' ? 'ميناء الملاذ والرجوع المعتمد' : 'PORT DE REFUGE & DÉBARQUEMENT'}
                </span>
                <h3 className="font-editorial text-xl font-bold text-cyan-100 sm:text-2xl mt-0.5">
                  {lang === 'ar' ? destinationPort.nameAr : destinationPort.nameFr}
                </h3>
                <span className="font-mono text-xs text-[#a69b8d]">
                  {lang === 'ar' ? destinationPort.regionNameAr : destinationPort.regionNameFr} · {destinationPort.coast === 'atlantic' ? (lang === 'ar' ? 'الشاطئ الأطلسي' : 'Côte Atlantique') : (lang === 'ar' ? 'البحر الأبيض المتوسط' : 'Méditerranée')}
                </span>
              </div>

              <div className="text-end">
                <span className="font-mono text-3xl font-bold text-cyan-300 block">
                  {destinationDistanceNM} <span className="text-base text-cyan-400 font-normal">NM</span>
                </span>
                <span className="font-mono text-xs text-[#a69b8d]">
                  ({destinationDistanceKm} {lang === 'ar' ? 'كيلومتر' : 'km'})
                </span>
              </div>
            </div>

            {/* Travel Time & Heading Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-lg bg-[#071010] p-3 border border-cyan-500/20">
                <span className="font-mono text-[10px] text-[#a69b8d] uppercase block">
                  {lang === 'ar' ? 'السمت والبوصلة' : 'CAP COMPAS'}
                </span>
                <span className="font-mono text-base font-bold text-cyan-200 mt-0.5 block">
                  {destinationBearing}° {destinationHeading.code}
                </span>
                <span className="text-[11px] text-[#786c60]">
                  {lang === 'ar' ? destinationHeading.labelAr : destinationHeading.labelFr}
                </span>
              </div>

              <div className="rounded-lg bg-[#071010] p-3 border border-cyan-500/20">
                <span className="font-mono text-[10px] text-[#a69b8d] uppercase block">
                  {lang === 'ar' ? 'الوقت المقدر (بسرعة 8 عقد)' : 'TEMPS ESTIMÉ (8 NDS)'}
                </span>
                <span className="font-mono text-base font-bold text-emerald-400 mt-0.5 block">
                  {destinationSailingTimeHours} {lang === 'ar' ? 'ساعة' : 'h'}
                </span>
                <span className="text-[11px] text-[#786c60]">
                  {lang === 'ar' ? 'سرعة فلكة أو مركب صيد' : 'Vitesse barque artisanale'}
                </span>
              </div>

              <div className="rounded-lg bg-[#071010] p-3 border border-cyan-500/20">
                <span className="font-mono text-[10px] text-[#a69b8d] uppercase block">
                  {lang === 'ar' ? 'هاتف الطوارئ بالميناء' : 'URGENCE PORT'}
                </span>
                <a
                  href={`tel:${destinationPort.emergencyPhone.replace(/\s+/g, '')}`}
                  className="font-mono text-base font-bold text-cyan-300 mt-0.5 block hover:underline"
                >
                  {destinationPort.emergencyPhone}
                </a>
                <span className="text-[11px] text-[#786c60]">
                  {destinationPort.crieeType}
                </span>
              </div>
            </div>

            {onSelectPortFilter && (
              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playBubble()
                    onSelectPortFilter(destinationPort.nameFr.split(' ')[2] || destinationPort.nameFr)
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 hover:text-cyan-100 transition"
                >
                  <span>
                    {lang === 'ar'
                      ? `عرض أسماك وإنتاجات هذا الميناء في الأطلس ←`
                      : `Voir les poissons de ce port dans l’atlas →`}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Moroccan Sovereign Maritime Zone Status */}
          <div className={`rounded-xl border p-4 shadow-lg ${maritimeZone.badgeColorClass}`}>
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5 text-current" />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-editorial text-sm font-bold text-current">
                    {lang === 'ar' ? maritimeZone.titleAr : maritimeZone.titleFr}
                  </span>
                  <span className="rounded bg-black/30 px-2 py-0.5 font-mono text-[10px]">
                    {nearestPortSolution.distanceNM} NM {lang === 'ar' ? 'عن أقرب ساحل' : 'du littoral'}
                  </span>
                </div>
                <p className="text-xs text-current/80">
                  {lang === 'ar' ? maritimeZone.descriptionAr : maritimeZone.descriptionFr}
                </p>
                <span className="font-mono text-[10px] text-current/60 block pt-0.5">
                  {maritimeZone.legalDahirRef}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marine Protected Area Alarm & Safety Radar */}
      <div className="rounded-xl border border-[#f6f1e7]/12 bg-[#14110f] p-5 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f6f1e7]/10 pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`h-4 w-4 ${
              nearestMpaSolution.alarmLevel === 'prohibited'
                ? 'text-red-400 animate-pulse'
                : nearestMpaSolution.alarmLevel === 'warning'
                ? 'text-amber-400'
                : 'text-emerald-400'
            }`} />
            <h4 className="font-editorial text-base font-bold text-[#f6f1e7]">
              {lang === 'ar'
                ? 'رادار المحميات البحرية ومناطق الراحة البيولوجية (Dahir 1973)'
                : 'Sanctuaires Marins Protégés (AMPs) & Repos Biologique'}
            </h4>
          </div>
          <span className={`font-mono text-xs px-2.5 py-0.5 rounded-full border ${
            nearestMpaSolution.alarmLevel === 'prohibited'
              ? 'border-red-500/40 bg-red-500/15 text-red-300 font-bold'
              : nearestMpaSolution.alarmLevel === 'warning'
              ? 'border-amber-500/40 bg-amber-500/15 text-amber-300 font-bold'
              : 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
          }`}>
            {nearestMpaSolution.alarmLevel === 'prohibited'
              ? (lang === 'ar' ? '⚠️ داخل نطاق المحمية الطبيعية - الصيد ممنوع' : '⚠️ Zone Protégée - Pêche Interdite')
              : nearestMpaSolution.alarmLevel === 'warning'
              ? (lang === 'ar' ? '⚠️ اقتراب من حزام المحمية (< 3 NM)' : '⚠️ Proximité Immédiate de Réserve (< 3 NM)')
              : (lang === 'ar' ? '✓ منطقة صيد ساحلية نظامية مسموحة' : '✓ Navigation en Zone Réglementaire')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs items-center">
          <div className="md:col-span-8 space-y-1">
            <strong className="text-sm text-[#f6f1e7] block">
              {lang === 'ar' ? nearestMpaSolution.mpa.nameAr : nearestMpaSolution.mpa.nameFr}
            </strong>
            <p className="text-[#a69b8d] leading-relaxed">
              {lang === 'ar' ? nearestMpaSolution.mpa.restrictionsAr : nearestMpaSolution.mpa.restrictionsFr}
            </p>
            <span className="font-mono text-[10px] text-[#786c60] block">
              {nearestMpaSolution.mpa.legalProtection} · {lang === 'ar' ? `نطاق الحماية: ${nearestMpaSolution.mpa.radiusNM} ميل بحري` : `Rayon de protection : ${nearestMpaSolution.mpa.radiusNM} NM`}
            </span>
          </div>

          <div className="md:col-span-4 rounded-lg bg-[#0b0908] p-3 border border-[#f6f1e7]/10 text-center">
            <span className="font-mono text-[10px] text-[#a69b8d] uppercase block">
              {lang === 'ar' ? 'المسافة إلى مركز المحمية' : 'DISTANCE CENTRE AMP'}
            </span>
            <span className="font-mono text-2xl font-bold text-[#f2b47e] block my-0.5">
              {nearestMpaSolution.distanceNM} <span className="text-xs text-[#a69b8d]">NM</span>
            </span>
            <span className="font-mono text-[10px] text-[#786c60] block">
              {(nearestMpaSolution.distanceNM * 1.852).toFixed(1)} km
            </span>
          </div>
        </div>
      </div>

      {/* VHF Emergency Radio Canal 16 & Rescue Broadcast Sheet */}
      <div className="rounded-xl border border-red-500/30 bg-gradient-to-br from-[#1a0c0c] via-[#140a0a] to-[#0f0707] p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-500/40 bg-red-500/20 text-red-400">
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-red-400">
                {lang === 'ar' ? 'بروتوكول السلامة والاستغاثة البحرية' : 'SÉCURITÉ & DÉTRESSE EN HAUTE MER'}
              </span>
              <h3 className="font-editorial text-xl font-bold text-red-100 sm:text-2xl">
                {lang === 'ar'
                  ? 'قناة النجدة الدولية VHF Canal 16 (156.800 MHz)'
                  : 'Canal d’Urgence International VHF 16 (156.800 MHz)'}
              </h3>
            </div>
          </div>

          {/* Quick Copy Mayday Button */}
          <button
            type="button"
            onClick={handleCopyMayday}
            className="inline-flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-lg hover:bg-red-500 transition shrink-0"
          >
            {copiedMayday ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>
              {copiedMayday
                ? (lang === 'ar' ? 'تم نسخ نداء الاستغاثة!' : 'Message Mayday Copié !')
                : (lang === 'ar' ? 'نسخ نداء الاستغاثة بنقرة واحدة' : 'Copier Message Mayday')}
            </span>
          </button>
        </div>

        {/* Pre-formatted Emergency Broadcast Text */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          <div className="md:col-span-8 rounded-lg bg-[#0b0505] p-4 border border-red-500/20 font-mono text-xs text-red-200/90 whitespace-pre-line leading-relaxed select-all">
            {lang === 'ar' ? maydayMessage.arabic : maydayMessage.french}
          </div>

          {/* Emergency Telephone Numbers */}
          <div className="md:col-span-4 rounded-lg bg-[#0b0505] p-4 border border-red-500/20 flex flex-col justify-between space-y-3">
            <div>
              <span className="font-mono text-[10px] font-bold text-[#a69b8d] uppercase block">
                {lang === 'ar' ? 'أرقام النجدة البحرية الرسمية بالمغرب' : 'NUMÉROS DE SECOURS MARITIME'}
              </span>
              <div className="mt-2 space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-[#f6f1e7]/10 pb-1.5">
                  <span className="text-[#a69b8d]">{lang === 'ar' ? 'مركز الإنقاذ MRCC الرباط:' : 'MRCC Rabat :'}</span>
                  <a href="tel:+212537625877" className="font-mono font-bold text-red-300 hover:underline">
                    +212 537 62 58 77
                  </a>
                </div>
                <div className="flex items-center justify-between border-b border-[#f6f1e7]/10 pb-1.5">
                  <span className="text-[#a69b8d]">{lang === 'ar' ? 'الدرك الملكي البحري:' : 'Gendarmerie Maritime :'}</span>
                  <a href="tel:177" className="font-mono font-bold text-red-300 hover:underline">
                    177
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#a69b8d]">{lang === 'ar' ? 'الوقاية المدنية:' : 'Protection Civile :'}</span>
                  <a href="tel:150" className="font-mono font-bold text-red-300 hover:underline">
                    150
                  </a>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-red-300/70 font-mono">
              {lang === 'ar'
                ? 'استعمل النداء عند الخطر الجسيم الوشيك على السفينة أو الأرواح. البث مفتوح 24/24 عبر خفر السواحل الملكية.'
                : 'Émission continue 24/7 sous l’égide de la Marine Royale et du Ministère des Pêches Maritimes.'}
            </p>
          </div>
        </div>
      </div>

      {/* Complete Moroccan Coastal Port Refuge Table (Sorted by Distance) */}
      <div className="rounded-xl border border-[#f6f1e7]/12 bg-[#14110f] p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f6f1e7]/10 pb-3">
          <div>
            <h3 className="font-editorial text-lg font-bold text-[#f6f1e7]">
              {lang === 'ar'
                ? 'موانئ الصيد المغربية الـ 17 مرتبة حسب القرب من إحداثياتك'
                : 'Les 17 Ports Halieutiques Classés par Proximité Immédiate'}
            </h3>
            <p className="text-xs text-[#a69b8d]">
              {lang === 'ar'
                ? 'اضغط على أي ميناء لجعله وجهة الملاحة المباشرة على البوصلة البحرية'
                : 'Cliquez sur un port pour orienter immédiatement le compas vers cette destination'}
            </p>
          </div>
          <span className="font-mono text-xs text-cyan-400">
            {allPortsByDistance.length} {lang === 'ar' ? 'مرفأ ومرسى' : 'PORTS ONP'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {allPortsByDistance.map((port, idx) => {
            const isCurrentDestination = destinationPort.id === port.id
            return (
              <div
                key={port.id}
                onClick={() => {
                  sounds.playBubble()
                  setSelectedDestinationPort(port)
                }}
                className={`cursor-pointer rounded-lg border p-3.5 transition-all text-xs space-y-2 ${
                  isCurrentDestination
                    ? 'border-cyan-400 bg-cyan-950/30 shadow-lg'
                    : 'border-[#f6f1e7]/10 bg-[#0b0908] hover:border-[#f6f1e7]/30'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] text-[#786c60] block">
                      #{idx + 1} · {port.coast === 'atlantic' ? 'ATLANTIQUE' : 'MÉDITERRANÉE'}
                    </span>
                    <strong className="text-sm font-editorial text-[#f6f1e7] block">
                      {lang === 'ar' ? port.nameAr : port.nameFr}
                    </strong>
                    <span className="text-[11px] text-[#a69b8d] block">
                      {lang === 'ar' ? port.regionNameAr : port.regionNameFr}
                    </span>
                  </div>

                  <div className="text-end">
                    <span className={`font-mono text-base font-bold ${isCurrentDestination ? 'text-cyan-300' : 'text-[#f2b47e]'}`}>
                      {port.distNM} NM
                    </span>
                    <span className="font-mono text-[10px] text-[#786c60] block">
                      {port.distKm} km
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#f6f1e7]/10 pt-2 font-mono text-[11px]">
                  <span className="text-cyan-300 font-semibold">
                    {port.bearing}° {port.heading.code}
                  </span>
                  <span className="text-[#a69b8d]">
                    ~{port.sailingHours}h @ 8nds
                  </span>
                  <span className={`rounded px-1.5 py-0.5 text-[9px] ${
                    isCurrentDestination
                      ? 'bg-cyan-500 text-[#0b0908] font-bold'
                      : 'bg-[#14110f] text-[#a69b8d]'
                  }`}>
                    {isCurrentDestination
                      ? (lang === 'ar' ? 'الهدف المعتمد' : 'Actif')
                      : (lang === 'ar' ? 'تحديد' : 'Pointer')}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

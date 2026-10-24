import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Maximize2, Radio } from 'lucide-react'
import type {
  PortPoint,
  MarineProtectedArea,
  FisheryCorridor,
  MoroccanLighthouse,
} from './MoroccanCoastalRadar'
import { MOROCCAN_LIGHTHOUSES } from './MoroccanCoastalRadar'
import type { SupportedLanguage } from '../i18n/strings'
import { sounds } from '../lib/soundEffects'

interface MoroccanLeafletMapProps {
  ports: PortPoint[]
  reserves: MarineProtectedArea[]
  corridors: FisheryCorridor[]
  lighthouses?: MoroccanLighthouse[]
  activePort: PortPoint
  activeReserve: MarineProtectedArea | null
  activeCorridor: FisheryCorridor | null
  activeLayer: 'all' | 'ports' | 'reserves' | 'corridors'
  lang: SupportedLanguage
  onSelectPort: (port: PortPoint) => void
  onSelectReserve: (reserve: MarineProtectedArea) => void
  onSelectCorridor: (corridor: FisheryCorridor) => void
}

export type MapTileProvider = 'marine' | 'satellite' | 'natgeo'

interface TileLayerDef {
  baseUrl: string
  overlayUrl?: string
  attribution: string
  maxZoom: number
  nameAr: string
  nameFr: string
  nameEn: string
  icon: string
}

const TILE_LAYERS: Record<MapTileProvider, TileLayerDef> = {
  marine: {
    baseUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
    overlayUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri, GEBCO, NOAA, National Geographic, DeLorme',
    maxZoom: 13,
    nameAr: 'المحيطات والأعماق (Esri Oceans)',
    nameFr: 'Océans & Bathymétrie (Esri)',
    nameEn: 'Oceans & Depths (Esri)',
    icon: '🌊',
  },
  satellite: {
    baseUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    overlayUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Source: Esri, Maxar, Earthstar Geographics, GIS User Community',
    maxZoom: 18,
    nameAr: 'أقمار صناعية حقيقية (Satellite Esri)',
    nameFr: 'Satellite Haute Résolution (Esri)',
    nameEn: 'High-Res Satellite (Esri)',
    icon: '🛰️',
  },
  natgeo: {
    baseUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, DeLorme, HERE, UNEP-WCMC',
    maxZoom: 16,
    nameAr: 'خريطة تضاريس ناشيونال جيوغرافيك',
    nameFr: 'Relief Topographique (NatGeo)',
    nameEn: 'Physical & Topo (NatGeo)',
    icon: '🗺️',
  },
}

export const MoroccanLeafletMap: React.FC<MoroccanLeafletMapProps> = ({
  ports,
  reserves,
  corridors,
  lighthouses = MOROCCAN_LIGHTHOUSES,
  activePort,
  activeReserve,
  activeCorridor,
  activeLayer,
  lang,
  onSelectPort,
  onSelectReserve,
  onSelectCorridor,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)
  const corridorsLayerRef = useRef<L.LayerGroup | null>(null)
  const lighthousesLayerRef = useRef<L.LayerGroup | null>(null)
  const radarGridLayerRef = useRef<L.LayerGroup | null>(null)
  const baseTileLayerRef = useRef<L.TileLayer | null>(null)
  const overlayTileLayerRef = useRef<L.TileLayer | null>(null)

  // Default to Real Marine Ocean map with blue water & bathymetry
  const [tileMode, setTileMode] = useState<MapTileProvider>('marine')
  // Nautical marks active by default
  const [showNauticalMarks, setShowNauticalMarks] = useState<boolean>(true)
  // Tactical radar grid
  const [showRadarGrid, setShowRadarGrid] = useState<boolean>(false)

  // Full Moroccan Sovereign Maritime Coordinates: Lagouira (SW) to Saïdia (NE)
  const MOROCCO_BOUNDS: L.LatLngBoundsExpression = [
    [20.5, -17.5], // South-West (Lagouira & Atlantic Sahara)
    [36.2, -1.8],  // North-East (Saïdia & Mediterranean Oriental)
  ]

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return
    if (mapInstanceRef.current) return

    try {
      const map = L.map(mapContainerRef.current, {
        center: [29.5, -9.5],
        zoom: 5.5,
        minZoom: 4,
        maxZoom: 17,
        maxBounds: [
          [18.0, -22.0],
          [38.0, 2.0],
        ],
        zoomControl: false,
      })

      // Add Zoom Control at top-right
      L.control.zoom({ position: 'topright' }).addTo(map)

      // 1. Base Tile Layer
      const initialConfig = TILE_LAYERS[tileMode]
      const baseLayer = L.tileLayer(initialConfig.baseUrl, {
        attribution: initialConfig.attribution,
        maxZoom: initialConfig.maxZoom,
      }).addTo(map)
      baseTileLayerRef.current = baseLayer

      // 2. Reference / Labels Layer (if available)
      if (initialConfig.overlayUrl) {
        const overlayLayer = L.tileLayer(initialConfig.overlayUrl, {
          maxZoom: initialConfig.maxZoom,
          opacity: 0.9,
        }).addTo(map)
        overlayTileLayerRef.current = overlayLayer
      }

      // Feature Layer Groups
      corridorsLayerRef.current = L.layerGroup().addTo(map)
      radarGridLayerRef.current = L.layerGroup().addTo(map)
      lighthousesLayerRef.current = L.layerGroup().addTo(map)
      markersLayerRef.current = L.layerGroup().addTo(map)

      // Fit full Morocco bounds on initial load
      map.fitBounds(MOROCCO_BOUNDS, { padding: [24, 24] })

      // Trigger size invalidation to prevent blank tiles
      setTimeout(() => {
        map.invalidateSize()
      }, 250)

      mapInstanceRef.current = map
    } catch {
      // Graceful fallback for headless or jsdom test environments
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Switch Base & Overlay Tile Layers
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    if (baseTileLayerRef.current) {
      map.removeLayer(baseTileLayerRef.current)
      baseTileLayerRef.current = null
    }

    if (overlayTileLayerRef.current) {
      map.removeLayer(overlayTileLayerRef.current)
      overlayTileLayerRef.current = null
    }

    const config = TILE_LAYERS[tileMode]

    const newBaseLayer = L.tileLayer(config.baseUrl, {
      attribution: config.attribution,
      maxZoom: config.maxZoom,
    }).addTo(map)
    baseTileLayerRef.current = newBaseLayer

    if (config.overlayUrl) {
      const newOverlayLayer = L.tileLayer(config.overlayUrl, {
        maxZoom: config.maxZoom,
        opacity: 0.9,
      }).addTo(map)
      overlayTileLayerRef.current = newOverlayLayer
    }
  }, [tileMode])

  // Render Fishery Corridors on the Water
  useEffect(() => {
    const layerGroup = corridorsLayerRef.current
    if (!layerGroup) return

    layerGroup.clearLayers()

    if (activeLayer === 'all' || activeLayer === 'corridors') {
      corridors.forEach((corridor) => {
        if (!corridor.waypointsLatLon || corridor.waypointsLatLon.length < 2) return

        const isSelected = activeCorridor?.id === corridor.id
        const color = corridor.id === 'corridor-poulpe' ? '#06b6d4' : '#f59e0b'

        const polyline = L.polyline(corridor.waypointsLatLon, {
          color,
          weight: isSelected ? 6 : 4,
          opacity: isSelected ? 0.95 : 0.7,
          dashArray: '8, 8',
        }).addTo(layerGroup)

        polyline.on('click', () => {
          sounds.playBubble()
          onSelectCorridor(corridor)
        })

        const title = lang === 'ar' ? corridor.nameAr : lang === 'en' ? corridor.nameEn : corridor.nameFr
        const biomass = lang === 'ar' ? corridor.biomassTypeAr : corridor.biomassTypeFr

        polyline.bindPopup(`
          <div style="font-family: system-ui, sans-serif; min-width: 190px; color: #0b0908; padding: 4px;">
            <div style="font-weight: 800; font-size: 12px; color: ${color}; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin-bottom: 5px;">
              🐟 ${title}
            </div>
            <div style="font-size: 11px; color: #4b5563;">
              <strong>${lang === 'ar' ? 'الكتلة الحيوية' : 'Biomasse'}:</strong> ${biomass}
            </div>
          </div>
        `)
      })
    }
  }, [corridors, activeCorridor, activeLayer, lang, onSelectCorridor])

  // Render Nautical Marks & Active Lighthouses (Working toggle!)
  useEffect(() => {
    const layerGroup = lighthousesLayerRef.current
    if (!layerGroup) return

    layerGroup.clearLayers()

    if (showNauticalMarks) {
      lighthouses.forEach((lh) => {
        const lhTitle = lang === 'ar' ? lh.nameAr : lang === 'en' ? lh.nameEn : lh.nameFr
        const lhChar = lang === 'ar' ? lh.characteristicAr : lang === 'en' ? lh.characteristicEn : lh.characteristicFr

        // Custom Glowing Lighthouse DivIcon
        const iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group">
            <div class="absolute -inset-2 rounded-full bg-amber-400/40 animate-ping"></div>
            <div class="relative flex items-center justify-center h-7 w-7 rounded-full border-2 border-amber-300 bg-amber-500 text-black shadow-lg shadow-amber-500/80 scale-110 z-20 transition-transform">
              <span class="text-[12px] font-bold leading-none select-none">🏮</span>
            </div>
            <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-950/90 text-amber-300 border border-amber-400/50 px-1.5 py-0.2 font-mono text-[9px] font-bold shadow">
              ${lhTitle.split(' ')[0]}
            </div>
          </div>
        `

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-lighthouse-pin',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        })

        // Draw Lighthouse Marker
        L.marker([lh.lat, lh.lng], { icon: customIcon })
          .addTo(layerGroup)
          .bindPopup(`
            <div style="font-family: system-ui, sans-serif; min-width: 220px; padding: 4px; color: #0b0908;">
              <div style="font-weight: 800; font-size: 13px; color: #d97706; border-bottom: 2px solid #fef3c7; padding-bottom: 4px; margin-bottom: 6px;">
                🏮 ${lhTitle}
              </div>
              <div style="font-size: 11px; margin-bottom: 4px;">
                📡 <strong>${lang === 'ar' ? 'المدى البصري' : lang === 'en' ? 'Optical Range' : 'Portée Optique'}:</strong> ${lh.rangeNauticalMiles} NM (~${Math.round(lh.rangeNauticalMiles * 1.852)} km)
              </div>
              <div style="font-size: 11px; margin-bottom: 4px;">
                📐 <strong>${lang === 'ar' ? 'علو المنارة' : lang === 'en' ? 'Tower Height' : 'Hauteur du Foyer'}:</strong> ${lh.heightMeters} m
              </div>
              <div style="font-size: 10.5px; color: #4b5563; background: #fffbeb; padding: 4px; rounded: 4px; border: 1px solid #fde68a;">
                ⚡ <strong>${lang === 'ar' ? 'إيقاع الوميض' : lang === 'en' ? 'Light Cadence' : 'Caractéristique'}:</strong> ${lhChar}
              </div>
            </div>
          `)

        // Draw Optical Nautical Range Ring (~1.852 km per nautical mile)
        L.circle([lh.lat, lh.lng], {
          radius: lh.rangeNauticalMiles * 1852,
          color: '#f59e0b',
          fillColor: '#fbbf24',
          fillOpacity: 0.05,
          weight: 1.2,
          dashArray: '3, 6',
        }).addTo(layerGroup)
      })
    }
  }, [lighthouses, showNauticalMarks, lang])

  // Tactical Radar EEZ Range Rings Overlay
  useEffect(() => {
    const layerGroup = radarGridLayerRef.current
    if (!layerGroup) return

    layerGroup.clearLayers()

    if (showRadarGrid) {
      // 50, 100, and 200 NM Moroccan Exclusive Economic Zone (ZEE) Surveillance Rings
      const centerCoords: [number, number] = [31.5, -9.8] // Central Atlantic pivot
      const rings = [
        { nm: 50, label: '50 NM · Eaux Territoriales', color: '#06b6d4' },
        { nm: 100, label: '100 NM · Zone Contiguë', color: '#38bdf8' },
        { nm: 200, label: '200 NM · ZEE Souveraine du Maroc', color: '#f59e0b' },
      ]

      rings.forEach((ring) => {
        L.circle(centerCoords, {
          radius: ring.nm * 1852,
          color: ring.color,
          fill: false,
          weight: 1.5,
          dashArray: '4, 8',
        }).addTo(layerGroup)
      })
    }
  }, [showRadarGrid])

  // Render Port and Marine Reserve Markers
  useEffect(() => {
    const map = mapInstanceRef.current
    const markersGroup = markersLayerRef.current
    if (!map || !markersGroup) return

    markersGroup.clearLayers()

    // 1. Render Port Markers
    if (activeLayer === 'all' || activeLayer === 'ports') {
      ports.forEach((port) => {
        const isSelected = activePort.id === port.id
        const label =
          lang === 'ar'
            ? port.nameAr.split(' ')[0]
            : lang === 'en'
            ? port.nameEn.split(' ')[0]
            : port.nameFr.split(' ')[0]

        // Custom High-Contrast Nautical Marine Pin
        const pinHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group" style="transform: translate3d(0,0,0);">
            ${
              isSelected
                ? '<div class="absolute -inset-2.5 rounded-full bg-amber-400/50 animate-ping"></div>'
                : ''
            }
            <div class="relative flex items-center justify-center h-8 w-8 rounded-full border-2 ${
              isSelected
                ? 'border-amber-200 bg-amber-500 text-black shadow-lg shadow-amber-500/60 scale-125 z-30'
                : 'border-cyan-300 bg-slate-900/95 text-cyan-200 hover:border-amber-400 hover:scale-115 z-20 shadow-md'
            } transition-all duration-200">
              <span class="text-[13px] font-bold leading-none select-none">⚓</span>
            </div>
            <div class="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[10px] font-bold tracking-wide pointer-events-none ${
              isSelected
                ? 'bg-amber-500 text-black border border-amber-300 shadow-lg'
                : 'bg-slate-950/95 text-cyan-200 border border-cyan-500/40 shadow'
            }">
              ${label}
            </div>
          </div>
        `

        const customIcon = L.divIcon({
          html: pinHtml,
          className: 'custom-marine-pin',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        })

        const marker = L.marker([port.lat, port.lng], { icon: customIcon })
          .addTo(markersGroup)
          .on('click', () => {
            sounds.playBubble()
            onSelectPort(port)
            map.flyTo([port.lat, port.lng], Math.max(map.getZoom(), 8), { duration: 0.8 })
          })

        // Detailed Nautical Telemetry Popup
        const portName = lang === 'ar' ? port.nameAr : lang === 'en' ? port.nameEn : port.nameFr
        const catchList = (lang === 'ar' ? port.topCatchAr : lang === 'en' ? port.topCatchEn : port.topCatchFr).join(', ')

        marker.bindPopup(`
          <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 200px; padding: 4px; color: #0b0908;">
            <div style="font-weight: 800; font-size: 13px; color: #b45309; border-bottom: 2px solid #fef3c7; padding-bottom: 5px; margin-bottom: 6px;">
              ⚓ ${portName}
            </div>
            <div style="display: flex; gap: 8px; margin-bottom: 6px; font-size: 11px;">
              <span>🌊 <strong>${lang === 'ar' ? 'الموج' : lang === 'en' ? 'Swell' : 'Houle'}:</strong> ${port.waveHeightM}m</span>
              <span>💨 <strong>${lang === 'ar' ? 'الرياح' : lang === 'en' ? 'Wind' : 'Vent'}:</strong> ${port.windKnots}kts</span>
              <span>🌡️ <strong>${lang === 'ar' ? 'الحرارة' : lang === 'en' ? 'Sea' : 'Eau'}:</strong> ${port.tempC}°C</span>
            </div>
            <div style="font-size: 10.5px; color: #374151; background: #f9fafb; padding: 5px; rounded: 4px; border: 1px solid #e5e7eb;">
              🐟 <strong>${lang === 'ar' ? 'أهم المصيد اليوم' : lang === 'en' ? 'Fresh Landings' : 'Top Débarquements'}:</strong>
              <div style="color: #0369a1; font-weight: 600; margin-top: 2px;">${catchList}</div>
            </div>
          </div>
        `)
      })
    }

    // 2. Render Marine Protected Areas (Reserves)
    if (activeLayer === 'all' || activeLayer === 'reserves') {
      reserves.forEach((reserve) => {
        const isSelected = activeReserve?.id === reserve.id
        const label =
          lang === 'ar'
            ? reserve.nameAr.split(' ')[0]
            : lang === 'en'
            ? reserve.nameEn.split(' ')[0]
            : reserve.nameFr.split(' ')[0]

        const reservePinHtml = `
          <div class="relative flex items-center justify-center cursor-pointer">
            <div class="h-7 w-7 rounded-full border-2 border-emerald-400 bg-emerald-950/95 flex items-center justify-center text-[12px] text-emerald-300 shadow-md ${
              isSelected ? 'scale-125 ring-2 ring-emerald-300' : ''
            }">
              🛡️
            </div>
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-emerald-950/95 px-2 py-0.5 font-mono text-[9.5px] font-bold text-emerald-300 border border-emerald-500/50 shadow">
              ${label}
            </div>
          </div>
        `

        const reserveIcon = L.divIcon({
          html: reservePinHtml,
          className: 'custom-reserve-pin',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        })

        L.marker([reserve.lat, reserve.lng], { icon: reserveIcon })
          .addTo(markersGroup)
          .on('click', () => {
            sounds.playBubble()
            onSelectReserve(reserve)
            map.flyTo([reserve.lat, reserve.lng], Math.max(map.getZoom(), 8), { duration: 0.8 })
          })

        // Draw protective sanctuary biological safety radius
        L.circle([reserve.lat, reserve.lng], {
          radius: Math.sqrt(reserve.areaKm2 / Math.PI) * 1000,
          color: '#10b981',
          fillColor: '#10b981',
          fillOpacity: 0.18,
          weight: 2,
          dashArray: '5, 5',
        }).addTo(markersGroup)
      })
    }
  }, [ports, reserves, activePort, activeReserve, activeLayer, lang, onSelectPort, onSelectReserve])

  const handleResetMoroccoView = () => {
    sounds.playBubble()
    if (mapInstanceRef.current) {
      mapInstanceRef.current.fitBounds(MOROCCO_BOUNDS, { padding: [24, 24] })
    }
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[520px] md:h-[560px] rounded-xl overflow-hidden border border-white/10 bg-[#06101e] shadow-2xl">
      {/* Map DOM Element */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Tactical Layer Switcher Controls (Top-Left) */}
      <div className="absolute top-2 sm:top-3 start-2 sm:start-3 z-20 flex flex-wrap items-center gap-1 bg-[#090d16]/95 backdrop-blur-md p-1 rounded-lg border border-cyan-500/20 shadow-xl max-w-[96%]">
        {/* 1. Marine Oceans & Bathymetry */}
        <button
          type="button"
          onClick={() => {
            sounds.playBubble()
            setTileMode('marine')
          }}
          className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-mono font-bold transition ${
            tileMode === 'marine'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
              : 'text-[#a69b8d] hover:text-white hover:bg-white/5'
          }`}
          title="Esri World Ocean Base & Bathymetric Depths"
        >
          <span>🌊</span>
          <span>{lang === 'ar' ? 'المحيطات' : lang === 'en' ? 'Oceans' : 'Océans'}</span>
          <span className="hidden sm:inline">{lang === 'ar' ? ' والأعماق' : lang === 'en' ? ' & Depths' : ' & Fonds'}</span>
        </button>

        {/* 2. High-Res Satellite Photography */}
        <button
          type="button"
          onClick={() => {
            sounds.playBubble()
            setTileMode('satellite')
          }}
          className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-mono font-bold transition ${
            tileMode === 'satellite'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
              : 'text-[#a69b8d] hover:text-white hover:bg-white/5'
          }`}
          title="Esri World High-Resolution Satellite Imagery"
        >
          <span>🛰️</span>
          <span>{lang === 'ar' ? 'قمر صناعي' : lang === 'en' ? 'Satellite' : 'Satellite'}</span>
        </button>

        {/* 3. Physical Topography */}
        <button
          type="button"
          onClick={() => {
            sounds.playBubble()
            setTileMode('natgeo')
          }}
          className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-mono font-bold transition ${
            tileMode === 'natgeo'
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
              : 'text-[#a69b8d] hover:text-white hover:bg-white/5'
          }`}
          title="National Geographic World Physical Map"
        >
          <span>🗺️</span>
          <span>{lang === 'ar' ? 'تضاريس' : lang === 'en' ? 'Physical' : 'Relief'}</span>
        </button>

        {/* 4. Nautical Marks & Moroccan Lighthouses Toggle (Working!) */}
        <button
          type="button"
          onClick={() => {
            sounds.playSonar()
            setShowNauticalMarks((prev) => !prev)
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition border ${
            showNauticalMarks
              ? 'bg-amber-400 text-black border-amber-300 shadow-lg shadow-amber-400/40'
              : 'border-white/10 text-[#a69b8d] hover:text-white hover:bg-white/5'
          }`}
          title="Afficher les 8 grands phares et balises maritimes du Maroc"
        >
          <span className="text-sm">💡</span>
          <span>
            {lang === 'ar'
              ? 'المنارات والعلامات البحرية'
              : lang === 'en'
              ? 'Nautical Marks & Lighthouses'
              : 'Phares & Balises'}
          </span>
          {showNauticalMarks && <span className="h-2 w-2 rounded-full bg-black animate-pulse" />}
        </button>

        {/* 5. Radar Sonar Grid & ZEE Arcs Toggle */}
        <button
          type="button"
          onClick={() => {
            sounds.playSonar()
            setShowRadarGrid((prev) => !prev)
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono font-bold transition border ${
            showRadarGrid
              ? 'bg-cyan-400 text-black border-cyan-300 shadow-lg shadow-cyan-400/30'
              : 'border-white/10 text-[#a69b8d] hover:text-white hover:bg-white/5'
          }`}
          title="Activer la grille de surveillance radar sonar ZEE"
        >
          <Radio className="h-3.5 w-3.5" />
          <span>{lang === 'ar' ? 'رادار ZEE' : lang === 'en' ? 'Radar EEZ' : 'Radar ZEE'}</span>
        </button>
      </div>

      {/* Floating Reset View Button (Bottom-Right) */}
      <div className="absolute bottom-4 end-4 z-20">
        <button
          type="button"
          onClick={handleResetMoroccoView}
          className="flex items-center gap-2 rounded-lg bg-[#090d16]/95 hover:bg-slate-800 border border-cyan-500/30 px-3.5 py-2 text-xs font-mono font-bold text-white shadow-2xl backdrop-blur-md transition hover:scale-105"
          title={lang === 'ar' ? 'إعادة تركيز الخريطة على كامل المغرب' : 'Recentrer sur tout le Maroc'}
        >
          <Maximize2 className="h-3.5 w-3.5 text-cyan-400" />
          <span>{lang === 'ar' ? 'كامل سواحل المغرب (3,500 كلم)' : lang === 'en' ? 'Whole Moroccan Coast (3,500 km)' : 'Tout le Littoral (3 500 km)'}</span>
        </button>
      </div>
    </div>
  )
}

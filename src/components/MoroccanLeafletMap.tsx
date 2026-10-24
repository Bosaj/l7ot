import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Maximize2, Compass } from 'lucide-react'
import type { PortPoint, MarineProtectedArea, FisheryCorridor } from './MoroccanCoastalRadar'
import type { SupportedLanguage } from '../i18n/strings'
import { sounds } from '../lib/soundEffects'

interface MoroccanLeafletMapProps {
  ports: PortPoint[]
  reserves: MarineProtectedArea[]
  corridors: FisheryCorridor[]
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
    nameAr: 'خريطة المحيطات والأعماق (Esri Oceans)',
    nameFr: 'Océans & Bathymétrie (Esri)',
    nameEn: 'Oceans & Marine (Esri)',
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

const OPENSEAMAP_SEAMARK_URL = 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'

export const MoroccanLeafletMap: React.FC<MoroccanLeafletMapProps> = ({
  ports,
  reserves,
  activePort,
  activeReserve,
  activeLayer,
  lang,
  onSelectPort,
  onSelectReserve,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)
  const baseTileLayerRef = useRef<L.TileLayer | null>(null)
  const overlayTileLayerRef = useRef<L.TileLayer | null>(null)
  const seamarksLayerRef = useRef<L.TileLayer | null>(null)

  // Default to Real Marine Ocean map with blue water & bathymetry
  const [tileMode, setTileMode] = useState<MapTileProvider>('marine')
  const [showSeamarks, setShowSeamarks] = useState<boolean>(true)

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

      // 3. OpenSeaMap Seamarks Nautical Navigation Layer
      if (showSeamarks) {
        const seamarks = L.tileLayer(OPENSEAMAP_SEAMARK_URL, {
          maxZoom: 18,
          opacity: 0.85,
        }).addTo(map)
        seamarksLayerRef.current = seamarks
      }

      // 4. Markers Layer
      const markersGroup = L.layerGroup().addTo(map)
      markersLayerRef.current = markersGroup

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

    // Remove old base layer
    if (baseTileLayerRef.current) {
      map.removeLayer(baseTileLayerRef.current)
      baseTileLayerRef.current = null
    }

    // Remove old overlay layer
    if (overlayTileLayerRef.current) {
      map.removeLayer(overlayTileLayerRef.current)
      overlayTileLayerRef.current = null
    }

    const config = TILE_LAYERS[tileMode]

    // Mount new base layer
    const newBaseLayer = L.tileLayer(config.baseUrl, {
      attribution: config.attribution,
      maxZoom: config.maxZoom,
    }).addTo(map)
    baseTileLayerRef.current = newBaseLayer

    // Mount reference label layer if present
    if (config.overlayUrl) {
      const newOverlayLayer = L.tileLayer(config.overlayUrl, {
        maxZoom: config.maxZoom,
        opacity: 0.9,
      }).addTo(map)
      overlayTileLayerRef.current = newOverlayLayer
    }

    // Re-stack seamarks on top
    if (seamarksLayerRef.current && showSeamarks) {
      seamarksLayerRef.current.bringToFront()
    }
  }, [tileMode])

  // Toggle OpenSeaMap Seamarks Navigation Layer
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    if (showSeamarks) {
      if (!seamarksLayerRef.current) {
        const seamarks = L.tileLayer(OPENSEAMAP_SEAMARK_URL, {
          maxZoom: 18,
          opacity: 0.85,
        }).addTo(map)
        seamarksLayerRef.current = seamarks
      }
      seamarksLayerRef.current.bringToFront()
    } else {
      if (seamarksLayerRef.current) {
        map.removeLayer(seamarksLayerRef.current)
        seamarksLayerRef.current = null
      }
    }
  }, [showSeamarks])

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
  }, [ports, reserves, activePort, activeReserve, activeLayer, lang])

  const handleResetMoroccoView = () => {
    sounds.playBubble()
    if (mapInstanceRef.current) {
      mapInstanceRef.current.fitBounds(MOROCCO_BOUNDS, { padding: [24, 24] })
    }
  }

  return (
    <div className="relative w-full h-[540px] rounded-xl overflow-hidden border border-white/10 bg-[#06101e] shadow-2xl">
      {/* Map DOM Element */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Tactical Layer Switcher Controls (Top-Left) */}
      <div className="absolute top-3 start-3 z-20 flex flex-wrap items-center gap-1.5 bg-[#090d16]/95 backdrop-blur-md p-1.5 rounded-lg border border-cyan-500/20 shadow-xl">
        {/* 1. Marine Oceans & Bathymetry */}
        <button
          type="button"
          onClick={() => {
            sounds.playBubble()
            setTileMode('marine')
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition ${
            tileMode === 'marine'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
              : 'text-[#a69b8d] hover:text-white hover:bg-white/5'
          }`}
          title="Esri World Ocean Base & Bathymetric Depths"
        >
          <span>🌊</span>
          <span>{lang === 'ar' ? 'المحيطات والأعماق' : lang === 'en' ? 'Oceans & Depths' : 'Océans & Fonds'}</span>
        </button>

        {/* 2. High-Res Satellite Photography */}
        <button
          type="button"
          onClick={() => {
            sounds.playBubble()
            setTileMode('satellite')
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition ${
            tileMode === 'satellite'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
              : 'text-[#a69b8d] hover:text-white hover:bg-white/5'
          }`}
          title="Esri World High-Resolution Satellite Imagery"
        >
          <span>🛰️</span>
          <span>{lang === 'ar' ? 'قمر صناعي حقيقي' : lang === 'en' ? 'Real Satellite' : 'Satellite Réel'}</span>
        </button>

        {/* 3. Physical Topography */}
        <button
          type="button"
          onClick={() => {
            sounds.playBubble()
            setTileMode('natgeo')
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold transition ${
            tileMode === 'natgeo'
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
              : 'text-[#a69b8d] hover:text-white hover:bg-white/5'
          }`}
          title="National Geographic World Physical Map"
        >
          <span>🗺️</span>
          <span>{lang === 'ar' ? 'تضاريس' : lang === 'en' ? 'Physical' : 'Relief'}</span>
        </button>

        {/* 4. OpenSeaMap Seamarks Toggle */}
        <button
          type="button"
          onClick={() => {
            sounds.playBubble()
            setShowSeamarks((prev) => !prev)
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono font-bold border transition ${
            showSeamarks
              ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
              : 'border-white/10 text-[#a69b8d] hover:text-white hover:bg-white/5'
          }`}
          title="OpenSeaMap Maritime Beacons, Buoys, and Channels"
        >
          <Compass className="h-3.5 w-3.5" />
          <span>{lang === 'ar' ? 'إشارات الملاحة' : lang === 'en' ? 'Nautical Marks' : 'Balises'}</span>
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

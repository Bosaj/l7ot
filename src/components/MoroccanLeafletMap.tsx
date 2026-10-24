import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Layers, Maximize2 } from 'lucide-react'
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

type TileProvider = 'dark' | 'satellite' | 'osm'

const TILE_LAYERS: Record<
  TileProvider,
  { url: string; attribution: string; maxZoom: number; nameAr: string; nameFr: string; nameEn: string }
> = {
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
    maxZoom: 19,
    nameAr: 'خريطة بحرية داكنة (CartoDB)',
    nameFr: 'Carte Nautique Sombre (CartoDB)',
    nameEn: 'Dark Nautical Map (CartoDB)',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Earthstar Geographics',
    maxZoom: 18,
    nameAr: 'قمر صناعي حقيقي (Satellite Esri)',
    nameFr: 'Imagerie Satellite Réelle (Esri)',
    nameEn: 'Real World Satellite (Esri)',
  },
  osm: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
    nameAr: 'خريطة تضاريس الشارع (OpenStreetMap)',
    nameFr: 'Carte Standard (OpenStreetMap)',
    nameEn: 'Standard Map (OpenStreetMap)',
  },
}

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
  const tileLayerRef = useRef<L.TileLayer | null>(null)

  const [tileMode, setTileMode] = useState<TileProvider>('dark')

  // Full Moroccan Geographic Bounds: Saïdia to Lagouira
  const MOROCCO_BOUNDS: L.LatLngBoundsExpression = [
    [20.5, -17.5], // South-West (Lagouira)
    [36.2, -1.8],  // North-East (Saïdia / Mediterranean)
  ]

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return
    if (mapInstanceRef.current) return

    try {
      const map = L.map(mapContainerRef.current, {
        center: [29.5, -9.5],
        zoom: 5.5,
        minZoom: 4,
        maxZoom: 16,
        maxBounds: [
          [18.0, -22.0],
          [38.0, 2.0],
        ],
        zoomControl: false,
      })

      // Add Zoom Control at top-right
      L.control.zoom({ position: 'topright' }).addTo(map)

      // Initial Tile Layer
      const initialLayerConfig = TILE_LAYERS[tileMode]
      const tileLayer = L.tileLayer(initialLayerConfig.url, {
        attribution: initialLayerConfig.attribution,
        maxZoom: initialLayerConfig.maxZoom,
      }).addTo(map)
      tileLayerRef.current = tileLayer

      const markersGroup = L.layerGroup().addTo(map)
      markersLayerRef.current = markersGroup

      // Fit full Morocco bounds on initial load
      map.fitBounds(MOROCCO_BOUNDS, { padding: [20, 20] })

      mapInstanceRef.current = map
    } catch {
      // Handle jsdom or headless environments
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Switch Tile Layer
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current)
    }

    const config = TILE_LAYERS[tileMode]
    const newTileLayer = L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: config.maxZoom,
    }).addTo(map)
    tileLayerRef.current = newTileLayer
  }, [tileMode])

  // Update Markers (Ports & Reserves)
  useEffect(() => {
    const map = mapInstanceRef.current
    const markersGroup = markersLayerRef.current
    if (!map || !markersGroup) return

    markersGroup.clearLayers()

    // 1. Render Port Markers
    if (activeLayer === 'all' || activeLayer === 'ports') {
      ports.forEach((port) => {
        const isSelected = activePort.id === port.id
        const label = lang === 'ar' ? port.nameAr.split(' ')[0] : port.nameFr.split(' ')[0]

        // Custom High-Tech Nautical HTML Pin
        const pinHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group">
            ${
              isSelected
                ? '<div class="absolute -inset-2 rounded-full bg-amber-500/40 animate-ping"></div>'
                : ''
            }
            <div class="relative flex items-center justify-center h-7 w-7 rounded-full border-2 ${
              isSelected
                ? 'border-amber-300 bg-amber-500 text-black shadow-lg shadow-amber-500/50 scale-125 z-30'
                : 'border-cyan-400 bg-slate-900/90 text-cyan-300 hover:border-amber-400 hover:scale-110 z-20'
            } transition-transform">
              <span class="text-[12px] font-bold">⚓</span>
            </div>
            <div class="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
              isSelected
                ? 'bg-amber-500 text-black border border-amber-300 shadow-md'
                : 'bg-slate-950/90 text-slate-200 border border-white/20'
            }">
              ${label}
            </div>
          </div>
        `

        const customIcon = L.divIcon({
          html: pinHtml,
          className: 'custom-marine-pin',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        })

        const marker = L.marker([port.lat, port.lng], { icon: customIcon })
          .addTo(markersGroup)
          .on('click', () => {
            sounds.playBubble()
            onSelectPort(port)
            map.flyTo([port.lat, port.lng], Math.max(map.getZoom(), 8), { duration: 0.8 })
          })

        // Popup with live marine summary
        marker.bindPopup(`
          <div style="font-family: system-ui, sans-serif; min-width: 180px; padding: 4px; color: #0b0908;">
            <div style="font-weight: bold; font-size: 13px; color: #b45309; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin-bottom: 6px;">
              ⚓ ${lang === 'ar' ? port.nameAr : port.nameFr}
            </div>
            <div style="font-size: 11px; margin-bottom: 4px;">
              🌊 <strong>${lang === 'ar' ? 'علو الموج' : 'Houle'}:</strong> ${port.waveHeightM} m
            </div>
            <div style="font-size: 11px; margin-bottom: 4px;">
              💨 <strong>${lang === 'ar' ? 'الرياح' : 'Vent'}:</strong> ${port.windKnots} kts
            </div>
            <div style="font-size: 11px; margin-bottom: 6px;">
              🌡️ <strong>${lang === 'ar' ? 'حرارة البحر' : 'Température'}:</strong> ${port.tempC}°C
            </div>
            <div style="font-size: 10px; color: #4b5563;">
              🐟 <strong>${lang === 'ar' ? 'أهم المصيد' : 'Top Débarquements'}:</strong> ${(lang === 'ar' ? port.topCatchAr : port.topCatchFr).join(', ')}
            </div>
          </div>
        `)
      })
    }

    // 2. Render Marine Protected Areas (Reserves)
    if (activeLayer === 'all' || activeLayer === 'reserves') {
      reserves.forEach((reserve) => {
        const isSelected = activeReserve?.id === reserve.id
        const label = lang === 'ar' ? reserve.nameAr.split(' ')[0] : reserve.nameFr.split(' ')[0]

        const reservePinHtml = `
          <div class="relative flex items-center justify-center cursor-pointer">
            <div class="h-6 w-6 rounded-full border-2 border-emerald-400 bg-emerald-950/90 flex items-center justify-center text-[10px] text-emerald-300 shadow-md ${
              isSelected ? 'scale-125 ring-2 ring-emerald-300' : ''
            }">
              🛡️
            </div>
            <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-emerald-950/95 px-1.5 py-0.5 font-mono text-[9px] font-bold text-emerald-300 border border-emerald-500/40">
              ${label}
            </div>
          </div>
        `

        const reserveIcon = L.divIcon({
          html: reservePinHtml,
          className: 'custom-reserve-pin',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })

        L.marker([reserve.lat, reserve.lng], { icon: reserveIcon })
          .addTo(markersGroup)
          .on('click', () => {
            sounds.playBubble()
            onSelectReserve(reserve)
            map.flyTo([reserve.lat, reserve.lng], Math.max(map.getZoom(), 8), { duration: 0.8 })
          })

        // Draw protective circle around the sanctuary
        L.circle([reserve.lat, reserve.lng], {
          radius: Math.sqrt(reserve.areaKm2 / Math.PI) * 1000,
          color: '#10b981',
          fillColor: '#10b981',
          fillOpacity: 0.15,
          weight: 1.5,
          dashArray: '4, 4',
        }).addTo(markersGroup)
      })
    }
  }, [ports, reserves, activePort, activeReserve, activeLayer, lang])

  const handleResetMoroccoView = () => {
    sounds.playBubble()
    if (mapInstanceRef.current) {
      mapInstanceRef.current.fitBounds(MOROCCO_BOUNDS, { padding: [20, 20] })
    }
  }

  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-white/10 bg-[#090d12] shadow-2xl">
      {/* Map DOM Element */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Tactical Layer Switcher Controls (Top-Left) */}
      <div className="absolute top-3 start-3 z-20 flex flex-wrap items-center gap-1.5 bg-[#090d12]/90 backdrop-blur-md p-1.5 rounded-lg border border-white/15 shadow-xl">
        <button
          type="button"
          onClick={() => {
            sounds.playBubble()
            setTileMode('dark')
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold transition ${
            tileMode === 'dark'
              ? 'bg-cyan-500 text-black shadow'
              : 'text-[#a69b8d] hover:text-white'
          }`}
          title="CartoDB Dark Nautical Tiles"
        >
          <Layers className="h-3.5 w-3.5" />
          <span>{lang === 'ar' ? 'خريطة بحرية' : 'Nautique'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sounds.playBubble()
            setTileMode('satellite')
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold transition ${
            tileMode === 'satellite'
              ? 'bg-amber-500 text-black shadow'
              : 'text-[#a69b8d] hover:text-white'
          }`}
          title="Esri World High-Res Satellite Imagery"
        >
          <span>🛰️</span>
          <span>{lang === 'ar' ? 'قمر صناعي حقيقي' : 'Satellite'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sounds.playBubble()
            setTileMode('osm')
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold transition ${
            tileMode === 'osm'
              ? 'bg-emerald-500 text-black shadow'
              : 'text-[#a69b8d] hover:text-white'
          }`}
          title="OpenStreetMap Standard"
        >
          <span>🗺️</span>
          <span>OSM</span>
        </button>
      </div>

      {/* Floating Reset View Button (Bottom-Right) */}
      <div className="absolute bottom-4 end-4 z-20">
        <button
          type="button"
          onClick={handleResetMoroccoView}
          className="flex items-center gap-2 rounded-lg bg-[#090d12]/90 hover:bg-slate-800 border border-white/20 px-3 py-2 text-xs font-mono font-bold text-white shadow-xl backdrop-blur-md transition"
          title={lang === 'ar' ? 'إعادة تركيز الخريطة على كامل المغرب' : 'Recentrer sur tout le Maroc'}
        >
          <Maximize2 className="h-3.5 w-3.5 text-cyan-400" />
          <span>{lang === 'ar' ? 'كامل سواحل المغرب (3,500 كلم)' : 'Tout le Maroc (3 500 km)'}</span>
        </button>
      </div>
    </div>
  )
}

import React, { useState } from 'react';
import { MapPin, ShieldAlert, Navigation, Compass, Radio, Wind, AlertTriangle } from 'lucide-react';

export default function PolarMap({ personnelList, incidents, activeRoute }) {
  const [selectedPin, setSelectedPin] = useState(null);

  // Map markers for Antarctic Bharati Sector
  const stations = [
    { id: 'bharathi', name: 'Bharathi Station (Base Hub)', type: 'Station', x: 72, y: 35, lat: "-69°24'S", lng: "76°11'E", temp: "-24°C" },
    { id: 'maitri', name: 'Maitri Station', type: 'Station', x: 25, y: 75, lat: "-70°45'S", lng: "11°44'E", temp: "-28°C" },
    { id: 'camp-beta', name: 'Ridge Field Camp Beta', type: 'Field Camp', x: 82, y: 55, lat: "-69°52'S", lng: "76°31'E", temp: "-36°C" }
  ];

  return (
    <div className="glass-card p-4 relative overflow-hidden flex flex-col h-full min-h-[420px]">
      
      {/* Header & Controls */}
      <div className="flex items-center justify-between mb-3 z-10">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#00f2fe] animate-spin-slow" />
          <h3 className="text-sm font-bold text-[#f0f6fc] uppercase tracking-wider">
            Antarctic Operational Sector GPS Radar (Bharathi / Maitri)
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            <Radio className="w-3 h-3 animate-pulse" /> Live Telemetry
          </span>
          <span className="text-[#8b949e] bg-white/5 px-2 py-0.5 rounded">Grid: 69°S - 76°E</span>
        </div>
      </div>

      {/* SVG Canvas Polar Radar Layout */}
      <div className="relative flex-1 w-full bg-[#030917] rounded-xl border border-[#00f2fe]/20 overflow-hidden shadow-inner flex items-center justify-center">
        
        {/* Polar Coordinate Grid Overlays */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
          <defs>
            <radialGradient id="polar-radar" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#040914" stopOpacity="0.8" />
            </radialGradient>
          </defs>

          {/* Concentric Polar Circles */}
          <circle cx="50%" cy="50%" r="20%" stroke="#00f2fe" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          <circle cx="50%" cy="50%" r="38%" stroke="#00f2fe" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          <circle cx="50%" cy="50%" r="48%" stroke="#00f2fe" strokeWidth="1" fill="none" />
          
          {/* Axis Lines */}
          <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#00f2fe" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#00f2fe" strokeWidth="0.8" strokeDasharray="3 3" />

          {/* Route A Line (High Crevasse Risk - Red Dashed Path) */}
          <path 
            d="M 720 140 L 780 180 L 820 220" 
            stroke="#ff385c" 
            strokeWidth="3" 
            strokeDasharray="6 4" 
            fill="none" 
          />

          {/* Route B Line (Glacier Rim Route - Cyan Solid Path) */}
          <path 
            d="M 720 140 Q 750 200 820 220" 
            stroke="#00f2fe" 
            strokeWidth="3" 
            fill="none" 
          />
        </svg>

        {/* Hazard Zone Overlay */}
        <div className="absolute top-8 left-12 bg-red-500/10 border border-red-500/40 rounded-lg p-2 max-w-[180px] pointer-events-none z-0">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-400">
            <AlertTriangle className="w-3.5 h-3.5" /> Hidden Crevasse Zone
          </div>
          <p className="text-[9px] text-red-200/70 mt-0.5">KM 45 Glacier Pass (-45°C wind chill)</p>
        </div>

        {/* Base Stations Pins */}
        {stations.map(st => (
          <div 
            key={st.id}
            onClick={() => setSelectedPin(st)}
            style={{ left: `${st.x}%`, top: `${st.y}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
          >
            <div className="w-6 h-6 rounded-full bg-[#00f2fe]/20 border-2 border-[#00f2fe] flex items-center justify-center shadow-[0_0_15px_#00f2fe] group-hover:scale-125 transition-transform">
              <div className="w-2 h-2 rounded-full bg-[#00f2fe] animate-ping" />
            </div>
            <div className="absolute left-7 top-0 bg-[#0a1329]/90 border border-[#00f2fe]/40 px-2 py-1 rounded text-[10px] whitespace-nowrap text-white font-mono shadow-md">
              <span className="font-bold text-[#00f2fe]">{st.name}</span>
              <div className="text-[9px] text-[#8b949e]">{st.lat}, {st.lng}</div>
            </div>
          </div>
        ))}

        {/* Emergency Beacon Pin (Team B Medical Alert at Ridge Camp Beta) */}
        {incidents.some(i => i.status === 'ACTIVE' && i.severity === 'CRITICAL') && (
          <div 
            style={{ left: '82%', top: '55%' }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
          >
            <div className="w-10 h-10 rounded-full bg-red-500/30 border-2 border-red-500 flex items-center justify-center pulse-red">
              <ShieldAlert className="w-5 h-5 text-red-500 animate-bounce" />
            </div>
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-950/90 border border-red-500/80 px-2.5 py-1 rounded text-[10px] text-red-200 font-bold whitespace-nowrap shadow-lg">
              CRITICAL MEDICAL EMERGENCY!
            </div>
          </div>
        )}

        {/* Map Legend */}
        <div className="absolute bottom-3 left-3 bg-[#040914]/85 border border-white/10 p-2.5 rounded-lg text-[10px] font-mono flex flex-col gap-1.5 z-10 backdrop-blur">
          <div className="font-bold text-[#f0f6fc] border-b border-white/10 pb-1">MAP LEGEND</div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] shadow-[0_0_8px_#00f2fe]" />
            <span className="text-[#8b949e]">NCPOR Station Hub</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-[#00f2fe]" />
            <span className="text-[#8b949e]">Route B (Recommended Rim Pass)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-red-500 border-dashed" />
            <span className="text-[#8b949e]">Route A (High Crevasse Risk)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-400 font-bold">Active Medical Dispatch Signal</span>
          </div>
        </div>

        {/* Selected Pin Details Modal Overlay */}
        {selectedPin && (
          <div className="absolute top-4 right-4 bg-[#0a1329]/95 border border-[#00f2fe]/50 p-3 rounded-lg text-xs max-w-xs z-30 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-1.5 border-b border-white/10 pb-1">
              <span className="font-bold text-[#00f2fe]">{selectedPin.name}</span>
              <button onClick={() => setSelectedPin(null)} className="text-white/60 hover:text-white">✕</button>
            </div>
            <div className="space-y-1 text-[#8b949e] font-mono text-[11px]">
              <div>Latitude: <span className="text-white">{selectedPin.lat}</span></div>
              <div>Longitude: <span className="text-white">{selectedPin.lng}</span></div>
              <div>Temperature: <span className="text-cyan-300 font-bold">{selectedPin.temp}</span></div>
              <div>Status: <span className="text-emerald-400">Station Operational</span></div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

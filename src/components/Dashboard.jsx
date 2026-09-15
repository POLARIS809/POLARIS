import React from 'react';
import { 
  Activity, 
  Users, 
  Package, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Zap, 
  TrendingUp, 
  ArrowUpRight,
  Sparkles,
  QrCode,
  FileSpreadsheet
} from 'lucide-react';
import PolarMap from './PolarMap';

export default function Dashboard({ 
  expeditions, 
  cargoList, 
  inventoryList, 
  personnelList, 
  incidents,
  setActiveTab,
  onOpenQRModal,
  onRunShortageAI,
  onTriggerEmergency
}) {
  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED');

  const overallRiskScore = 72; // Out of 100
  const riskCategories = [
    { name: 'Weather Risk', score: 85, color: '#ff385c', status: 'CRITICAL STORM' },
    { name: 'Cargo Delay Risk', score: 81, color: '#ff385c', status: 'HIGH DELAY (84%)' },
    { name: 'Inventory Shortage Risk', score: 78, color: '#ffb703', status: 'FUEL SHORTAGE PREDICTED' },
    { name: 'Route Safety Risk', score: 65, color: '#ffb703', status: 'ROUTE A CREVASSE' },
    { name: 'Equipment Failure Risk', score: 50, color: '#00f2fe', status: 'MODERATE' },
    { name: 'Personnel Risk', score: 45, color: '#00f5d4', status: 'STABLE' }
  ];

  return (
    <div className="space-y-6">
      
      {/* KPI Cards Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Expeditions */}
        <div className="glass-card p-4 relative overflow-hidden group cursor-pointer" onClick={() => setActiveTab('expedition')}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Active Expeditions</span>
            <div className="p-2 rounded-lg bg-[#00f2fe]/10 border border-[#00f2fe]/30 text-[#00f2fe]">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">08</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +2 Planned
            </span>
          </div>
          <p className="text-[11px] text-[#8b949e] mt-1">Primary: POLAR-EXP-2027-01 (Bharathi)</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f2fe] to-[#4facfe]" />
        </div>

        {/* Card 2: Personnel */}
        <div className="glass-card p-4 relative overflow-hidden group cursor-pointer" onClick={() => setActiveTab('personnel')}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Deployed Personnel</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">126</span>
            <span className="text-xs text-emerald-400 font-semibold">60 Bharathi | 40 Maitri</span>
          </div>
          <p className="text-[11px] text-[#8b949e] mt-1">Glaciologists, Engineers, Doctors</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
        </div>

        {/* Card 3: Cargo Units */}
        <div className="glass-card p-4 relative overflow-hidden group cursor-pointer" onClick={() => setActiveTab('cargo')}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Cargo & Assets</span>
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">342</span>
            <span className="text-xs text-amber-400 font-semibold">12.4 Tons Load</span>
          </div>
          <p className="text-[11px] text-[#8b949e] mt-1">1 In-Transit High Delay Warning</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
        </div>

        {/* Card 4: Emergencies */}
        <div className="glass-card p-4 relative overflow-hidden group cursor-pointer" onClick={() => setActiveTab('emergency')}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Active Emergencies</span>
            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 pulse-red">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-red-400">{activeIncidents.length.toString().padStart(2, '0')}</span>
            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold">1 CRITICAL HAPE</span>
          </div>
          <p className="text-[11px] text-[#8b949e] mt-1">Auto-Dispatch Engine Standing By</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600" />
        </div>

      </div>

      {/* Main Grid: Risk Panel & Live Polar Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Expedition Health & AI Risk Score Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card p-5">
            
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#00f2fe]" />
                  Expedition Health & Operational Risk
                </h3>
                <p className="text-xs text-[#8b949e]">Unified AI Operational Risk Calculator</p>
              </div>
              <span className="badge badge-critical text-xs px-3 py-1 font-mono">HIGH RISK</span>
            </div>

            {/* Main Risk Gauge */}
            <div className="flex items-center justify-around my-6 bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-center">
                <div className="text-4xl font-extrabold text-red-400 font-mono">72 <span className="text-sm text-[#8b949e]">/ 100</span></div>
                <div className="text-xs font-semibold text-[#8b949e] mt-1 uppercase tracking-wider">Overall Risk Score</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="space-y-1 text-xs">
                <div className="text-red-400 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> High Weather & Cargo Risk
                </div>
                <div className="text-amber-300">Fuel Shortage Predicted in 18.9 Days</div>
                <div className="text-[#8b949e]">Model: XGBoost + Weighted Risk Matrix</div>
              </div>
            </div>

            {/* Risk Category Meters */}
            <div className="space-y-3">
              {riskCategories.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#f0f6fc]">{cat.name}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-[11px] text-[#8b949e]">{cat.status}</span>
                      <span style={{ color: cat.color }}>{cat.score}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${cat.score}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <button 
                onClick={() => setActiveTab('ai-analytics')}
                className="btn-secondary text-xs w-full justify-center"
              >
                <Sparkles className="w-4 h-4 text-[#00f2fe]" />
                Open AI Risk Simulator & Optimization
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Live Polar Map Radar (7 cols) */}
        <div className="lg:col-span-7">
          <PolarMap 
            personnelList={personnelList} 
            incidents={incidents} 
            activeRoute="ROUTE-B"
          />
        </div>

      </div>

      {/* Real-time Alerts Ticker & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Ticker 1: Inventory Alert */}
        <div className="glass-card p-4 flex items-start gap-3 border-l-4 border-amber-500">
          <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-300">Fuel Shortage Alert (AI Prediction)</h4>
            <p className="text-xs text-[#8b949e]">Bharathi Diesel stock (1,800L) depleted in 18.9 days. Expedition requires 27 days. +1,350L reorder required.</p>
            <button onClick={onRunShortageAI} className="text-xs text-[#00f2fe] font-bold hover:underline">
              Resolve via AI Inventory Module →
            </button>
          </div>
        </div>

        {/* Ticker 2: Cargo Delay Alert */}
        <div className="glass-card p-4 flex items-start gap-3 border-l-4 border-red-500">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-red-300">Cargo CRG-10452 High Delay (84%)</h4>
            <p className="text-xs text-[#8b949e]">Deep Core Cryo-Drill delayed by pack ice. AI recommends switching to Airfreight + Route B.</p>
            <button onClick={onOpenQRModal} className="text-xs text-[#00f2fe] font-bold hover:underline">
              Scan & Inspect QR Code →
            </button>
          </div>
        </div>

        {/* Ticker 3: Emergency Quick Dispatch */}
        <div className="glass-card p-4 flex items-start gap-3 border-l-4 border-red-500 bg-red-950/20">
          <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-bounce" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white">Emergency Command Ready</h4>
            <p className="text-xs text-[#8b949e]">1 Critical Medical Incident active at Ridge Field Camp Beta. Response Team A standing by.</p>
            <button onClick={onTriggerEmergency} className="btn-danger text-xs py-1 px-3 mt-1">
              Open Rescue Dispatch Center
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

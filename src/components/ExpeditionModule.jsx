import React, { useState } from 'react';
import { Activity, Plus, Calendar, MapPin, Users, Ship, ShieldCheck, AlertTriangle, ChevronRight, Check } from 'lucide-react';

export default function ExpeditionModule({ expeditions, onAddExpedition }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedExp, setSelectedExp] = useState(expeditions[0]);

  // New Expedition Form State
  const [formData, setFormData] = useState({
    name: '',
    code: `POLAR-EXP-${new Date().getFullYear() + 1}-02`,
    destination: 'Antarctica (Bharathi Station)',
    baseCamp: 'Bharathi Station (69°24\'S 76°11\'E)',
    startDate: '2027-02-01',
    endDate: '2027-03-15',
    durationDays: 45,
    scientistsCount: 30,
    crewCount: 15,
    cargoWeightTons: 10.0,
    missionObjective: 'Geomagnetic solar radiation monitoring and sub-glacial water sampling.',
    assignedShip: 'MV Polar Star (Icebreaker Class A1)',
    assignedVehicles: 'PistenBully 300 #01, Snowmobile Alpha-1'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExp = {
      id: `EXP-${Date.now().toString().slice(-4)}`,
      ...formData,
      totalPersonnel: Number(formData.scientistsCount) + Number(formData.crewCount),
      status: 'Planned',
      riskScore: 35,
      riskLevel: 'LOW',
      leader: 'Dr. R. K. Malhotra (Lead Scientist)',
      assignedVehicles: formData.assignedVehicles.split(',').map(v => v.trim())
    };
    onAddExpedition(newExp);
    setSelectedExp(newExp);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#00f2fe]" />
            <h2 className="text-xl font-extrabold text-white">Expedition Management</h2>
          </div>
          <p className="text-xs text-[#8b949e]">Plan, configure, and monitor NCPOR Polar Expeditions across Antarctic & Arctic Base Hubs.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary text-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          Create New Expedition
        </button>
      </div>

      {/* Main Grid: Expedition List & Details Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Expedition Cards List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          {expeditions.map((exp) => {
            const isSelected = selectedExp.id === exp.id;
            return (
              <div 
                key={exp.id}
                onClick={() => setSelectedExp(exp)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-[#0e2147] border-[#00f2fe] shadow-[0_0_20px_rgba(0,242,254,0.25)]' 
                    : 'glass-card border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#00f2fe]">{exp.code}</span>
                  <span className={`badge ${
                    exp.status === 'Active' ? 'badge-success' : 
                    exp.status === 'Planned' ? 'badge-cyan' : 'badge-warning'
                  }`}>
                    {exp.status}
                  </span>
                </div>
                
                <h3 className="text-sm font-bold text-white mt-1.5">{exp.name}</h3>
                
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#8b949e]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00f2fe]" />
                    <span>{exp.destination.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{exp.totalPersonnel} Personnel</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{exp.durationDays} Days</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Ship className="w-3.5 h-3.5 text-purple-400" />
                    <span>{exp.cargoWeightTons}T Cargo</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-[#8b949e]">Risk Score: <strong className={exp.riskScore > 60 ? 'text-red-400' : 'text-emerald-400'}>{exp.riskScore}/100 ({exp.riskLevel})</strong></span>
                  <ChevronRight className="w-4 h-4 text-[#00f2fe]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Expedition Details Drawer (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="glass-card p-6 space-y-6">
            
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#00f2fe] bg-[#00f2fe]/10 px-2 py-0.5 rounded border border-[#00f2fe]/30">
                  {selectedExp.code}
                </span>
                <h3 className="text-xl font-extrabold text-white mt-2">{selectedExp.name}</h3>
                <p className="text-xs text-[#8b949e] mt-1">{selectedExp.missionObjective}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#8b949e]">Status</span>
                <div className="text-lg font-bold text-emerald-400 font-mono">{selectedExp.status}</div>
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white/5 p-4 rounded-xl border border-white/10 text-xs">
              <div>
                <span className="text-[#8b949e] block">Base Camp Hub</span>
                <strong className="text-white font-mono">{selectedExp.baseCamp}</strong>
              </div>
              <div>
                <span className="text-[#8b949e] block">Expedition Window</span>
                <strong className="text-white font-mono">{selectedExp.startDate} to {selectedExp.endDate}</strong>
              </div>
              <div>
                <span className="text-[#8b949e] block">Duration</span>
                <strong className="text-white font-mono">{selectedExp.durationDays} Days</strong>
              </div>
              <div>
                <span className="text-[#8b949e] block">Personnel Breakdown</span>
                <strong className="text-white font-mono">{selectedExp.scientistsCount} Scientists, {selectedExp.crewCount} Crew</strong>
              </div>
              <div>
                <span className="text-[#8b949e] block">Icebreaker Vessel</span>
                <strong className="text-purple-300 font-mono">{selectedExp.assignedShip}</strong>
              </div>
              <div>
                <span className="text-[#8b949e] block">Expedition Leader</span>
                <strong className="text-amber-300 font-mono">{selectedExp.leader}</strong>
              </div>
            </div>

            {/* Assigned Vehicles */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Allocated Polar Vehicles</h4>
              <div className="flex flex-wrap gap-2">
                {selectedExp.assignedVehicles && selectedExp.assignedVehicles.map((v, i) => (
                  <span key={i} className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-xs font-mono text-cyan-300">
                    🚜 {v}
                  </span>
                ))}
              </div>
            </div>

            {/* Expedition Timeline Visualizer */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Expedition Milestone Timeline</h4>
              <div className="space-y-3 relative pl-4 border-l-2 border-[#00f2fe]/30">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-[#00f2fe]" />
                  <span className="text-xs font-bold text-[#00f2fe]">Phase 1: Cargo Registration & Goa Staging</span>
                  <p className="text-[11px] text-[#8b949e]">Pack icebreakers, complete equipment calibration at NCPOR depot.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-amber-400" />
                  <span className="text-xs font-bold text-amber-300">Phase 2: Vessel Transit & Cape Town Layover</span>
                  <p className="text-[11px] text-[#8b949e]">Refuel SA Agulhas II, load emergency medical kits.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300">Phase 3: Antarctic Station Landing & Field Ops</span>
                  <p className="text-[11px] text-[#8b949e]">Disembark at Bharathi Station, initiate deep ice core drilling along Route B.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Create Expedition Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto border-[#00f2fe]/50">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#00f2fe]" />
                Create New Polar Expedition
              </h3>
              <button onClick={() => setShowModal(false)} className="text-white/60 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#8b949e] block mb-1">Expedition Title</label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Antarctic Ridge Survey"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="text-[#8b949e] block mb-1">Expedition ID Code</label>
                  <input 
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="input-field font-mono"
                  />
                </div>
                <div>
                  <label className="text-[#8b949e] block mb-1">Destination Base Hub</label>
                  <select 
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    className="input-field"
                  >
                    <option value="Antarctica (Bharathi Station)">Antarctica (Bharathi Station)</option>
                    <option value="Antarctica (Maitri Station)">Antarctica (Maitri Station)</option>
                    <option value="Arctic (Himadri Station)">Arctic (Himadri Station)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#8b949e] block mb-1">Duration (Days)</label>
                  <input 
                    type="number"
                    value={formData.durationDays}
                    onChange={(e) => setFormData({...formData, durationDays: e.target.value})}
                    className="input-field font-mono"
                  />
                </div>
                <div>
                  <label className="text-[#8b949e] block mb-1">Scientists Count</label>
                  <input 
                    type="number"
                    value={formData.scientistsCount}
                    onChange={(e) => setFormData({...formData, scientistsCount: e.target.value})}
                    className="input-field font-mono"
                  />
                </div>
                <div>
                  <label className="text-[#8b949e] block mb-1">Support Crew Count</label>
                  <input 
                    type="number"
                    value={formData.crewCount}
                    onChange={(e) => setFormData({...formData, crewCount: e.target.value})}
                    className="input-field font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#8b949e] block mb-1">Mission Objectives</label>
                <textarea 
                  rows="3"
                  value={formData.missionObjective}
                  onChange={(e) => setFormData({...formData, missionObjective: e.target.value})}
                  className="input-field"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Initialize Expedition</button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

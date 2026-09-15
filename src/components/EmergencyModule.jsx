import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Siren, 
  Clock, 
  Navigation, 
  Truck, 
  Stethoscope, 
  Flame, 
  Radio, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function EmergencyModule({ incidents, onAddIncident, onAssignResponseTeam, onResolveIncident }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(incidents[0] || null);

  // New Emergency Form State
  const [newIncident, setNewIncident] = useState({
    type: 'Medical emergency',
    severity: 'CRITICAL',
    location: 'Ridge Field Camp Beta (14 km SW of Bharathi Station)',
    reportedBy: 'Dr. Priya V. Nair',
    description: 'Researcher experiencing severe acute high-altitude pulmonary edema (HAPE) following blizzard.'
  });

  const incidentTypes = [
    'Medical emergency',
    'Vehicle failure',
    'Communication failure',
    'Equipment failure',
    'Extreme weather',
    'Personnel missing',
    'Fire',
    'Supply shortage'
  ];

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: `INC-${Date.now().toString().slice(-4)}`,
      incidentCode: `INC-EMG-${Math.floor(100 + Math.random() * 900)}`,
      ...newIncident,
      assignedTeam: 'Unassigned (Auto-Assigning...)',
      status: 'ACTIVE',
      createdAt: new Date().toUTCString().slice(17, 25) + ' UTC',
      resolvedAt: null,
      aiRecommendation: {
        nearestResponseTeam: 'Mechanized Support Team A (PistenBully #01)',
        nearestVehicle: 'PistenBully 300 #01 (Heated Cab)',
        availableMedicalSupplies: 'Hyperbaric Chamber Kit #4',
        estimatedETA: '38 Minutes',
        priorityRank: 1
      }
    };
    onAddIncident(item);
    setSelectedIncident(item);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-4 border-l-4 border-red-500 bg-gradient-to-r from-[#17050a] via-[#210913] to-[#0a1329]">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-red-500 animate-bounce" />
            <h2 className="text-xl font-extrabold text-white">Emergency Command Center</h2>
          </div>
          <p className="text-xs text-[#8b949e]">High-Impact Emergency Dispatch & AI Priority Resolution Workflow Engine.</p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="btn-danger text-xs shrink-0"
        >
          <Siren className="w-4 h-4" />
          Report Emergency Incident
        </button>
      </div>

      {/* AI Emergency Workflow Stepper Bar */}
      <div className="glass-card p-4 space-y-2">
        <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
          <Siren className="w-4 h-4 animate-pulse" />
          Autonomous Emergency Dispatch Pipeline
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 text-center text-[10px] font-mono">
          <div className="bg-red-500/10 border border-red-500/30 p-2 rounded text-red-300 font-bold">1. Emergency Detected</div>
          <div className="bg-red-500/10 border border-red-500/30 p-2 rounded text-red-300 font-bold">2. Incident Created</div>
          <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded text-amber-300 font-bold">3. Severity Assessment</div>
          <div className="bg-[#00f2fe]/10 border border-[#00f2fe]/30 p-2 rounded text-[#00f2fe] font-bold">4. Nearest Resource ID</div>
          <div className="bg-[#00f2fe]/10 border border-[#00f2fe]/30 p-2 rounded text-[#00f2fe] font-bold">5. Response Team Assign</div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded text-emerald-300 font-bold">6. Dispatch Alert</div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded text-emerald-300 font-bold">7. Incident Resolved</div>
        </div>
      </div>

      {/* Main Grid: Active Incidents List & AI Dispatch Control Room */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Incident List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Active Incident Queue</h3>
          
          {incidents.map(inc => {
            const isSelected = selectedIncident?.id === inc.id;
            return (
              <div 
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-red-950/40 border-red-500 shadow-[0_0_20px_rgba(255,56,92,0.3)]' 
                    : 'glass-card border-white/10 hover:border-red-500/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-red-400">{inc.incidentCode}</span>
                  <span className={`badge ${
                    inc.severity === 'CRITICAL' ? 'badge-critical' : 'badge-warning'
                  }`}>
                    {inc.severity}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mt-1.5">{inc.type}</h4>
                <p className="text-xs text-[#8b949e] line-clamp-2 mt-1">{inc.description}</p>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#8b949e]">Status: <strong className="text-amber-300">{inc.status}</strong></span>
                  <span className="text-red-400">ETA: {inc.aiRecommendation?.estimatedETA || 'Calculating'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Incident AI Dispatch Command Hub (7 Cols) */}
        <div className="lg:col-span-7">
          {selectedIncident ? (
            <div className="glass-card p-6 space-y-6 border-red-500/40">
              
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/40">
                      {selectedIncident.incidentCode}
                    </span>
                    <span className="badge badge-critical text-xs">{selectedIncident.severity}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-2">{selectedIncident.type}</h3>
                  <p className="text-xs text-[#8b949e] mt-1">{selectedIncident.description}</p>
                </div>

                {selectedIncident.status !== 'RESOLVED' && (
                  <button 
                    onClick={() => onResolveIncident(selectedIncident.id)}
                    className="btn-secondary text-xs text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Mark Resolved
                  </button>
                )}
              </div>

              {/* Location & Personnel Specs */}
              <div className="grid grid-cols-2 gap-3 bg-white/5 p-4 rounded-xl border border-white/10 text-xs font-mono">
                <div>
                  <span className="text-[#8b949e] block">Incident Location</span>
                  <strong className="text-white">{selectedIncident.location}</strong>
                </div>
                <div>
                  <span className="text-[#8b949e] block">Reported By</span>
                  <strong className="text-cyan-300">{selectedIncident.reportedBy}</strong>
                </div>
              </div>

              {/* AI Rescue & Dispatch Recommendation Box */}
              <div className="bg-gradient-to-r from-[#170814] to-[#0d1c3a] p-4 rounded-xl border border-amber-500/50 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  AI Automated Resource Matcher & Priority Dispatch
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-black/40 p-3 rounded-lg border border-white/10">
                    <span className="text-[#8b949e] text-[10px] block">Nearest Response Unit</span>
                    <strong className="text-emerald-400 font-mono text-sm block">
                      {selectedIncident.aiRecommendation.nearestResponseTeam}
                    </strong>
                  </div>

                  <div className="bg-black/40 p-3 rounded-lg border border-white/10">
                    <span className="text-[#8b949e] text-[10px] block">Nearest Polar Vehicle</span>
                    <strong className="text-[#00f2fe] font-mono text-sm block">
                      {selectedIncident.aiRecommendation.nearestVehicle}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono bg-white/5 p-2.5 rounded-lg">
                  <span className="text-[#8b949e]">Required Medical Asset:</span>
                  <strong className="text-purple-300">{selectedIncident.aiRecommendation.availableMedicalSupplies}</strong>
                </div>

                {selectedIncident.status === 'ACTIVE' && (
                  <button 
                    onClick={() => onAssignResponseTeam(selectedIncident.id, selectedIncident.aiRecommendation.nearestResponseTeam)}
                    className="btn-danger w-full justify-center text-xs font-extrabold py-2.5 shadow-[0_0_20px_rgba(255,56,92,0.4)]"
                  >
                    <Siren className="w-4 h-4 animate-bounce" />
                    AUTONOMOUSLY DISPATCH RESCUE TEAM (ETA: {selectedIncident.aiRecommendation.estimatedETA})
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="glass-card p-12 text-center text-[#8b949e] text-xs">
              Select an incident from the queue to inspect AI dispatch details.
            </div>
          )}
        </div>

      </div>

      {/* Report Emergency Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full p-6 space-y-4 border-red-500/60">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                Report Emergency Incident to AI Command Center
              </h3>
              <button onClick={() => setShowModal(false)} className="text-white/60 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-[#8b949e] block mb-1">Emergency Category</label>
                <select 
                  value={newIncident.type}
                  onChange={(e) => setNewIncident({...newIncident, type: e.target.value})}
                  className="input-field"
                >
                  {incidentTypes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8b949e] block mb-1">Severity Level</label>
                  <select 
                    value={newIncident.severity}
                    onChange={(e) => setNewIncident({...newIncident, severity: e.target.value})}
                    className="input-field font-bold text-red-400"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#8b949e] block mb-1">Reported By</label>
                  <input 
                    type="text"
                    required
                    value={newIncident.reportedBy}
                    onChange={(e) => setNewIncident({...newIncident, reportedBy: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#8b949e] block mb-1">GPS Location / Coordinates</label>
                <input 
                  type="text"
                  required
                  value={newIncident.location}
                  onChange={(e) => setNewIncident({...newIncident, location: e.target.value})}
                  className="input-field font-mono"
                />
              </div>

              <div>
                <label className="text-[#8b949e] block mb-1">Incident Description & Vital Symptoms</label>
                <textarea 
                  rows="3"
                  required
                  value={newIncident.description}
                  onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                  className="input-field"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-danger">Trigger Instant AI Dispatch</button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

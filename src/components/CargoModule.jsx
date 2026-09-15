import React, { useState } from 'react';
import { Package, QrCode, Plus, AlertTriangle, CheckCircle2, Truck, Ship, ShieldAlert, ArrowRight, Search, Filter } from 'lucide-react';
import QRModal from './QRModal';

export default function CargoModule({ cargoList, onAddCargo, onUpdateCargoStatus, openQRItem, setOpenQRItem }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newCargo, setNewCargo] = useState({
    name: '',
    category: 'Scientific Equipment',
    weightKg: 100,
    origin: 'NCPOR HQ, Goa, India',
    destination: 'Bharathi Station, Antarctica',
    priority: 'HIGH',
    assignedExpedition: 'POLAR-EXP-2027-01'
  });

  const lifecycleStages = ['Registered', 'Packed', 'Loaded', 'In Transit', 'Arrived', 'Delivered'];

  const filteredCargo = cargoList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: `CRG-${Date.now().toString().slice(-5)}`,
      code: `CRG-${Math.floor(10000 + Math.random() * 90000)}`,
      ...newCargo,
      status: 'Registered',
      delayProbability: Math.floor(10 + Math.random() * 40),
      delayRisk: 'LOW',
      trackingId: `NCPOR-TRK-${Math.floor(10000 + Math.random() * 90000)}`,
      qrCodeData: `POLARIS:${newCargo.name}|WEIGHT:${newCargo.weightKg}KG|DEST:${newCargo.destination}`,
      notes: 'Registered for Antarctic dispatch.'
    };
    onAddCargo(item);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-4">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-extrabold text-white">Cargo & Asset Tracking Hub</h2>
          </div>
          <p className="text-xs text-[#8b949e]">QR/Barcode Digital Lifecycle Tracking with AI Delay Prediction & Route Rerouting.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary text-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            Register Cargo Item
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-card p-3">
        <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1.5 rounded-lg w-full sm:w-72">
          <Search className="w-4 h-4 text-[#8b949e]" />
          <input 
            type="text"
            placeholder="Search Cargo ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs text-white focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-[#00f2fe]" />
          <span className="text-[#8b949e]">Category:</span>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#0a1329] border border-white/10 text-white rounded px-2 py-1"
          >
            <option value="ALL">All Categories</option>
            <option value="Scientific Equipment">Scientific Equipment</option>
            <option value="Medical">Medical</option>
            <option value="Fuel">Fuel</option>
            <option value="Food Rations">Food Rations</option>
            <option value="Communication Equipment">Communication Equipment</option>
          </select>
        </div>
      </div>

      {/* Cargo List Table & Lifecycle Matrix */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="custom-table text-xs">
            <thead>
              <tr>
                <th>Cargo Item & Code</th>
                <th>Category & Weight</th>
                <th>Origin → Destination</th>
                <th>Priority</th>
                <th>Lifecycle Status</th>
                <th>AI Delay Risk</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCargo.map((cargo) => (
                <tr key={cargo.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white">{cargo.name}</div>
                        <span className="font-mono text-[10px] text-[#00f2fe]">{cargo.code}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="text-white">{cargo.category}</div>
                    <span className="text-[10px] text-amber-300 font-mono">{cargo.weightKg} kg</span>
                  </td>

                  <td>
                    <div className="text-[11px] font-mono">
                      <span className="text-[#8b949e]">{cargo.origin.split(',')[0]}</span>
                      <ArrowRight className="w-3 h-3 inline mx-1 text-[#00f2fe]" />
                      <span className="text-emerald-400 font-bold">{cargo.destination.split(',')[0]}</span>
                    </div>
                  </td>

                  <td>
                    <span className={`badge ${
                      cargo.priority === 'CRITICAL' ? 'badge-critical' :
                      cargo.priority === 'HIGH' ? 'badge-warning' : 'badge-cyan'
                    }`}>
                      {cargo.priority}
                    </span>
                  </td>

                  {/* Lifecycle Stepper Dropdown */}
                  <td>
                    <select
                      value={cargo.status}
                      onChange={(e) => onUpdateCargoStatus(cargo.id, e.target.value)}
                      className="bg-[#040914] border border-[#00f2fe]/30 text-[#00f2fe] font-mono text-[11px] rounded px-2 py-1 cursor-pointer"
                    >
                      {lifecycleStages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className={`font-bold ${cargo.delayProbability > 60 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {cargo.delayProbability}%
                      </span>
                      {cargo.delayProbability > 60 && (
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                      )}
                    </div>
                  </td>

                  <td>
                    <button 
                      onClick={() => setOpenQRItem(cargo)}
                      className="btn-secondary text-[11px] py-1 px-2.5 flex items-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5 text-[#00f2fe]" />
                      <span>Scan QR</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cargo Lifecycle Stage Pipeline visualizer */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
          NCPOR Physical-to-Digital Cargo Lifecycle Pipeline
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center">
          {lifecycleStages.map((stage, i) => (
            <div key={stage} className="bg-white/5 p-3 rounded-lg border border-white/10 relative">
              <div className="text-[10px] font-mono text-[#8b949e]">Step 0{i + 1}</div>
              <div className="text-xs font-bold text-[#00f2fe] mt-1">{stage}</div>
              <div className="mt-2 text-[10px] text-emerald-400 font-mono">
                {cargoList.filter(c => c.status === stage).length} Items
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Code Modal Popup */}
      <QRModal cargo={openQRItem} onClose={() => setOpenQRItem(null)} />

      {/* Add Cargo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full p-6 space-y-4 border-amber-500/50">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                Register Cargo Item for Polar Staging
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/60 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-[#8b949e] block mb-1">Item Title / Description</label>
                <input 
                  type="text"
                  required
                  value={newCargo.name}
                  onChange={(e) => setNewCargo({...newCargo, name: e.target.value})}
                  placeholder="e.g. Deep Sea Temperature Profiler"
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8b949e] block mb-1">Category</label>
                  <select 
                    value={newCargo.category}
                    onChange={(e) => setNewCargo({...newCargo, category: e.target.value})}
                    className="input-field"
                  >
                    <option value="Scientific Equipment">Scientific Equipment</option>
                    <option value="Medical">Medical</option>
                    <option value="Fuel">Fuel</option>
                    <option value="Food Rations">Food Rations</option>
                    <option value="Communication Equipment">Communication Equipment</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#8b949e] block mb-1">Weight (Kg)</label>
                  <input 
                    type="number"
                    value={newCargo.weightKg}
                    onChange={(e) => setNewCargo({...newCargo, weightKg: Number(e.target.value)})}
                    className="input-field font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8b949e] block mb-1">Dispatch Priority</label>
                  <select 
                    value={newCargo.priority}
                    onChange={(e) => setNewCargo({...newCargo, priority: e.target.value})}
                    className="input-field"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#8b949e] block mb-1">Destination Station</label>
                  <select 
                    value={newCargo.destination}
                    onChange={(e) => setNewCargo({...newCargo, destination: e.target.value})}
                    className="input-field"
                  >
                    <option value="Bharathi Station, Antarctica">Bharathi Station, Antarctica</option>
                    <option value="Maitri Station, Antarctica">Maitri Station, Antarctica</option>
                    <option value="Himadri Station, Arctic">Himadri Station, Arctic</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Generate QR & Register Cargo</button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

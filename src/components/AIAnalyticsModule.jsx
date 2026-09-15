import React, { useState } from 'react';
import { BrainCircuit, Sparkles, Navigation, AlertTriangle, CheckCircle2, Sliders, Database, ArrowRight, BarChart3 } from 'lucide-react';
import { initialRoutes, aiTrainingDatasets } from '../data/polarMockData';

export default function AIAnalyticsModule({ cargoList }) {
  const [activeSubTab, setActiveSubTab] = useState('cargo-ml'); // cargo-ml, route-opt, risk-sim, datasets

  // Cargo Delay ML Form State
  const [distanceKm, setDistanceKm] = useState(12000);
  const [transportMode, setTransportMode] = useState('Ship (MV Polar Star)');
  const [weatherCondition, setWeatherCondition] = useState('Severe Pack Ice');
  const [cargoPriority, setCargoPriority] = useState('CRITICAL');

  // Calculated Delay Probability
  const delayProb = Math.min(95, Math.max(15, Math.round((distanceKm / 200) * (weatherCondition.includes('Pack Ice') ? 1.4 : 0.8) + (cargoPriority === 'CRITICAL' ? 10 : 0))));
  const delayRiskLevel = delayProb > 70 ? 'HIGH' : delayProb > 40 ? 'MEDIUM' : 'LOW';

  // Route Selection State
  const [selectedRoute, setSelectedRoute] = useState('ROUTE-B');

  // Risk Score Simulator State
  const [riskWeights, setRiskWeights] = useState({
    weather: 85,
    cargo: 81,
    inventory: 78,
    equipment: 50,
    personnel: 45,
    route: 65
  });

  const totalRiskScore = Math.round(
    (riskWeights.weather * 0.25) +
    (riskWeights.cargo * 0.20) +
    (riskWeights.inventory * 0.20) +
    (riskWeights.route * 0.15) +
    (riskWeights.equipment * 0.10) +
    (riskWeights.personnel * 0.10)
  );

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-4">
        <div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-[#00f2fe]" />
            <h2 className="text-xl font-extrabold text-white">AI / ML Intelligence & Optimization Suite</h2>
          </div>
          <p className="text-xs text-[#8b949e]">Predictive logistics models, cargo delay ML classifiers, route optimization, and risk engines.</p>
        </div>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('cargo-ml')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'cargo-ml' ? 'bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/50' : 'text-[#8b949e] hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          1. Cargo Delay ML Predictor
        </button>

        <button
          onClick={() => setActiveSubTab('route-opt')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'route-opt' ? 'bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/50' : 'text-[#8b949e] hover:text-white'
          }`}
        >
          <Navigation className="w-3.5 h-3.5" />
          2. Route & Resource Optimization
        </button>

        <button
          onClick={() => setActiveSubTab('risk-sim')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'risk-sim' ? 'bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/50' : 'text-[#8b949e] hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          3. Risk Score Simulator
        </button>

        <button
          onClick={() => setActiveSubTab('datasets')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'datasets' ? 'bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/50' : 'text-[#8b949e] hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          4. AI Training Datasets
        </button>
      </div>

      {/* Sub-Tab 1: Cargo Delay ML Predictor */}
      {activeSubTab === 'cargo-ml' && (
        <div className="glass-card p-6 border-l-4 border-amber-500 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Module 10 — Cargo Delay Risk Predictor
              </h3>
              <p className="text-xs text-[#8b949e]">XGBoost Classification Model trained on historical NCPOR Antarctic voyages.</p>
            </div>
            <span className="badge badge-warning font-mono text-xs">XGBoost Classifier</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Input Parameters (6 Cols) */}
            <div className="lg:col-span-6 space-y-4 text-xs">
              <div>
                <label className="text-[#8b949e] flex justify-between mb-1">
                  <span>Transit Distance (Goa/Cape Town → Station)</span>
                  <strong className="text-[#00f2fe] font-mono">{distanceKm} km</strong>
                </label>
                <input 
                  type="range"
                  min="3000"
                  max="15000"
                  step="500"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full accent-[#00f2fe]"
                />
              </div>

              <div>
                <label className="text-[#8b949e] block mb-1">Transport Mode</label>
                <select 
                  value={transportMode}
                  onChange={(e) => setTransportMode(e.target.value)}
                  className="input-field"
                >
                  <option value="Ship (MV Polar Star)">Ship (MV Polar Star - Class A1 Icebreaker)</option>
                  <option value="Airfreight C-17 Globemaster">Airfreight (C-17 Globemaster to Novolazarevskaya)</option>
                  <option value="Sno-Cat Convoy">Sno-Cat Over-Ice Convoy</option>
                </select>
              </div>

              <div>
                <label className="text-[#8b949e] block mb-1">Weather & Sea Ice Condition</label>
                <select 
                  value={weatherCondition}
                  onChange={(e) => setWeatherCondition(e.target.value)}
                  className="input-field"
                >
                  <option value="Severe Pack Ice">Severe Pack Ice & Heavy Blizzard (65°S Pack)</option>
                  <option value="Moderate Floe">Moderate Floe Ice Window</option>
                  <option value="Clear Summer Sea">Clear Summer Open Water Window</option>
                </select>
              </div>

              <div>
                <label className="text-[#8b949e] block mb-1">Cargo Priority Level</label>
                <select 
                  value={cargoPriority}
                  onChange={(e) => setCargoPriority(e.target.value)}
                  className="input-field"
                >
                  <option value="CRITICAL">CRITICAL (Scientific Drill Rig / Medical Kits)</option>
                  <option value="HIGH">HIGH (Polar Diesel Fuel)</option>
                  <option value="MEDIUM">MEDIUM (General Rations)</option>
                </select>
              </div>
            </div>

            {/* Prediction Output Card (6 Cols) */}
            <div className="lg:col-span-6 bg-white/5 p-5 rounded-xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-xs text-[#8b949e] uppercase font-semibold">ML Prediction Output</div>
                
                <div className="mt-4 flex items-center justify-around bg-black/40 p-4 rounded-xl border border-white/10">
                  <div className="text-center">
                    <div className="text-xs text-[#8b949e] uppercase">Delay Probability</div>
                    <div className={`text-4xl font-extrabold font-mono mt-1 ${delayProb > 60 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {delayProb}%
                    </div>
                  </div>

                  <div className="w-px h-12 bg-white/10" />

                  <div className="text-center">
                    <div className="text-xs text-[#8b949e] uppercase">Risk Level</div>
                    <span className={`badge mt-2 font-mono text-sm ${
                      delayRiskLevel === 'HIGH' ? 'badge-critical' : 'badge-warning'
                    }`}>
                      {delayRiskLevel} RISK
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/40 text-xs space-y-2">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> AI Decision Support Explanation
                  </div>
                  <p className="text-amber-100/90 leading-relaxed">
                    {delayProb > 60 
                      ? 'High probability of icepack entrapment along standard shipping route. Deep Core Cryo-Drill Rig CRG-10452 will experience an estimated 6-day delay.'
                      : 'Low delay risk under current parameters. Shipping timeline is within normal buffer thresholds.'}
                  </p>
                  {delayProb > 60 && (
                    <div className="text-white font-bold bg-amber-500/30 p-2 rounded border border-amber-400/50 mt-2">
                      💡 Recommended Action: Reroute cargo via Cape Town airfreight to Novolazarevskaya airstrip, then transfer to Route B Glacier Rim Pass.
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Sub-Tab 2: Route & Resource Optimization */}
      {activeSubTab === 'route-opt' && (
        <div className="glass-card p-6 border-l-4 border-[#00f2fe] space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Module 13 — Route & Linear Resource Optimization Engine
              </h3>
              <p className="text-xs text-[#8b949e]">Linear Programming & OR-Tools to maximize mission coverage with minimum risk.</p>
            </div>
            <span className="badge badge-cyan font-mono text-xs">OR-Tools Solver</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {initialRoutes.map(route => {
              const isRecommended = route.id === 'ROUTE-B';
              return (
                <div 
                  key={route.id}
                  onClick={() => setSelectedRoute(route.id)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all space-y-4 ${
                    isRecommended 
                      ? 'bg-[#0a2342] border-[#00f2fe] shadow-[0_0_25px_rgba(0,242,254,0.3)]' 
                      : 'glass-card border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{route.name}</h4>
                    {isRecommended && (
                      <span className="badge badge-success font-bold text-xs">AI RECOMMENDED</span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono bg-black/40 p-3 rounded-lg border border-white/10">
                    <div>
                      <span className="text-[#8b949e] text-[10px] block">Distance</span>
                      <strong className="text-white text-sm">{route.distanceKm} km</strong>
                    </div>
                    <div>
                      <span className="text-[#8b949e] text-[10px] block">Risk Score</span>
                      <strong className={route.riskScore > 60 ? 'text-red-400 text-sm' : 'text-emerald-400 text-sm'}>
                        {route.riskScore} / 100
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#8b949e] text-[10px] block">Fuel Needed</span>
                      <strong className="text-amber-300 text-sm">{route.fuelRequiredL} L</strong>
                    </div>
                  </div>

                  <p className="text-xs text-[#8b949e]">{route.terrainType}</p>

                  <div className={`p-3 rounded-lg text-xs font-semibold ${
                    isRecommended ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300' : 'bg-red-500/15 border border-red-500/40 text-red-300'
                  }`}>
                    {route.recommendation}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs text-amber-200">
            <strong>System Explanation:</strong> Route B is recommended because it has 46% lower operational risk despite being 15 km longer. Hidden crevasse hazards along Route A present unacceptable risk to heavy PistenBully transports.
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Risk Score Simulator */}
      {activeSubTab === 'risk-sim' && (
        <div className="glass-card p-6 border-l-4 border-purple-500 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Module 11 — Unified Expedition Risk Score Simulator
              </h3>
              <p className="text-xs text-[#8b949e]">Adjust risk weightings across Weather, Cargo, Inventory, Equipment, and Personnel.</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#8b949e]">Total Aggregate Risk Score</span>
              <div className="text-3xl font-extrabold text-red-400 font-mono">{totalRiskScore} / 100</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {Object.keys(riskWeights).map(key => (
              <div key={key} className="bg-white/5 p-3 rounded-lg border border-white/10">
                <label className="text-white font-semibold capitalize flex justify-between mb-1">
                  <span>{key} Risk Level</span>
                  <strong className="text-cyan-300 font-mono">{riskWeights[key]}%</strong>
                </label>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={riskWeights[key]}
                  onChange={(e) => setRiskWeights({...riskWeights, [key]: Number(e.target.value)})}
                  className="w-full accent-[#00f2fe]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 4: AI Training Datasets */}
      {activeSubTab === 'datasets' && (
        <div className="glass-card p-6 space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Section 25 — Historical & Synthetic AI Training Datasets
            </h3>
            <p className="text-xs text-[#8b949e]">Sample historical records used to train inventory and cargo ML models.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#00f2fe] uppercase font-mono">1. Inventory Consumption Training Data</h4>
            <div className="overflow-x-auto">
              <table className="custom-table text-xs">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Item</th>
                    <th>Team Size</th>
                    <th>Daily Usage</th>
                    <th>Current Stock</th>
                    <th>Weather Score</th>
                    <th>Shortage Occurred</th>
                  </tr>
                </thead>
                <tbody>
                  {aiTrainingDatasets.inventoryDataset.map((row, idx) => (
                    <tr key={idx}>
                      <td className="font-mono">{row.date}</td>
                      <td className="font-bold text-white">{row.item}</td>
                      <td>{row.teamSize} Scientists</td>
                      <td>{row.dailyUsage} L/day</td>
                      <td>{row.stock} L</td>
                      <td>{row.weatherScore} / 10</td>
                      <td>
                        <span className={`badge ${row.shortage === 1 ? 'badge-critical' : 'badge-success'}`}>
                          {row.shortage === 1 ? 'YES (1)' : 'NO (0)'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

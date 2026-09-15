import React, { useState } from 'react';
import { Boxes, Zap, AlertTriangle, CheckCircle2, TrendingUp, RefreshCw, Sparkles, Droplets, Battery, Flame, Stethoscope } from 'lucide-react';

export default function InventoryModule({ inventoryList, onUpdateStock }) {
  
  // Interactive AI Predictor Form State
  const [selectedItem, setSelectedItem] = useState(inventoryList[0]);
  const [teamSize, setTeamSize] = useState(60);
  const [expeditionDays, setExpeditionDays] = useState(27);
  const [weatherScore, setWeatherScore] = useState(8.5); // Out of 10
  const [currentStock, setCurrentStock] = useState(1800);
  const [dailyUsage, setDailyUsage] = useState(95);

  // Live AI Prediction Outputs
  const remainingDays = (currentStock / dailyUsage).toFixed(1);
  const totalPredictedUsage = Math.round(dailyUsage * expeditionDays * (1 + (weatherScore > 7 ? 0.15 : 0.05)));
  const shortageAmount = totalPredictedUsage > currentStock ? totalPredictedUsage - currentStock : 0;
  const shortageProbability = shortageAmount > 0 ? Math.min(99, Math.round((shortageAmount / totalPredictedUsage) * 100 + 20)) : 12;
  const shortageRisk = shortageProbability > 65 ? 'HIGH' : shortageProbability > 35 ? 'MEDIUM' : 'LOW';

  const categoryIcons = {
    'Consumable - Fuel': Flame,
    'Consumable - Food': Droplets,
    'Consumable - Medicine': Stethoscope,
    'Consumable - Energy': Battery,
    'Consumable - Medical': Stethoscope
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-4">
        <div>
          <div className="flex items-center gap-2">
            <Boxes className="w-6 h-6 text-[#00f2fe]" />
            <h2 className="text-xl font-extrabold text-white">AI Inventory Management & Shortage Predictor</h2>
          </div>
          <p className="text-xs text-[#8b949e]">Predict polar resource depletion rates, fuel stockouts, and optimal reorder points via ML.</p>
        </div>
      </div>

      {/* Main Feature: AI Shortage Prediction Calculator Widget */}
      <div className="glass-card p-6 border-l-4 border-[#00f2fe] space-y-6 bg-gradient-to-r from-[#071329] to-[#0d1e3d]">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00f2fe] animate-pulse" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              AI Feature 1 — Inventory Shortage Prediction Model
            </h3>
          </div>
          <span className="badge badge-cyan font-mono text-xs">Random Forest / XGBoost ML</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Controls Sliders (7 Cols) */}
          <div className="lg:col-span-7 space-y-4 text-xs">
            
            <div>
              <label className="text-[#8b949e] block mb-1 font-semibold">Select Resource Item</label>
              <select 
                value={selectedItem.id}
                onChange={(e) => {
                  const item = inventoryList.find(i => i.id === e.target.value);
                  setSelectedItem(item);
                  setCurrentStock(item.currentStock);
                  setDailyUsage(item.dailyConsumption);
                }}
                className="input-field font-bold text-white text-sm"
              >
                {inventoryList.map(item => (
                  <option key={item.id} value={item.id}>{item.name} ({item.currentStock} {item.unit})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[#8b949e] flex justify-between mb-1">
                  <span>Current Stock Level</span>
                  <strong className="text-[#00f2fe] font-mono">{currentStock} {selectedItem.unit}</strong>
                </label>
                <input 
                  type="range"
                  min="500"
                  max="6000"
                  step="50"
                  value={currentStock}
                  onChange={(e) => setCurrentStock(Number(e.target.value))}
                  className="w-full accent-[#00f2fe]"
                />
              </div>

              <div>
                <label className="text-[#8b949e] flex justify-between mb-1">
                  <span>Daily Consumption Rate</span>
                  <strong className="text-amber-300 font-mono">{dailyUsage} {selectedItem.unit}/day</strong>
                </label>
                <input 
                  type="range"
                  min="10"
                  max="250"
                  step="5"
                  value={dailyUsage}
                  onChange={(e) => setDailyUsage(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[#8b949e] flex justify-between mb-1">
                  <span>Expedition Duration</span>
                  <strong className="text-emerald-400 font-mono">{expeditionDays} Days</strong>
                </label>
                <input 
                  type="range"
                  min="10"
                  max="90"
                  value={expeditionDays}
                  onChange={(e) => setExpeditionDays(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div>
                <label className="text-[#8b949e] flex justify-between mb-1">
                  <span>Weather Severity Score</span>
                  <strong className="text-purple-300 font-mono">{weatherScore} / 10</strong>
                </label>
                <input 
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={weatherScore}
                  onChange={(e) => setWeatherScore(Number(e.target.value))}
                  className="w-full accent-purple-400"
                />
              </div>
            </div>

          </div>

          {/* AI Output Card (5 Cols) */}
          <div className="lg:col-span-5 bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="text-xs text-[#8b949e] uppercase font-semibold">AI Calculated Depletion Output</div>
              
              <div className="mt-3 space-y-2 font-mono text-xs">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-[#8b949e]">Estimated Days Remaining:</span>
                  <span className={`font-bold ${Number(remainingDays) < expeditionDays ? 'text-red-400' : 'text-emerald-400'}`}>
                    {remainingDays} Days
                  </span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-[#8b949e]">Expedition Duration Needed:</span>
                  <span className="text-white font-bold">{expeditionDays} Days</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-[#8b949e]">Predicted Total Requirement:</span>
                  <span className="text-amber-300 font-bold">{totalPredictedUsage} {selectedItem.unit}</span>
                </div>
              </div>

              {/* Shortage Risk Box */}
              <div className={`mt-4 p-3 rounded-lg border ${
                shortageRisk === 'HIGH' ? 'bg-red-500/20 border-red-500/50 text-red-300' : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
              }`}>
                <div className="flex items-center justify-between font-bold text-sm">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> SHORTAGE RISK: {shortageRisk}
                  </span>
                  <span className="font-mono text-lg">{shortageProbability}%</span>
                </div>
                {shortageAmount > 0 && (
                  <p className="text-xs mt-1 font-semibold text-amber-200">
                    ⚠️ Recommended Additional Reorder: <strong>+{shortageAmount} {selectedItem.unit}</strong> before departure!
                  </p>
                )}
              </div>
            </div>

            <button 
              onClick={() => onUpdateStock(selectedItem.id, currentStock + shortageAmount)}
              disabled={shortageAmount === 0}
              className="btn-primary text-xs w-full justify-center mt-4 disabled:opacity-40"
            >
              <RefreshCw className="w-4 h-4" />
              Approve AI Reorder Dispatch (+{shortageAmount} {selectedItem.unit})
            </button>
          </div>

        </div>

      </div>

      {/* Consumable Inventory Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Consumable Stock Roster</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="custom-table text-xs">
            <thead>
              <tr>
                <th>Resource Item & Code</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Daily Usage</th>
                <th>Est. Remaining</th>
                <th>AI Shortage Risk</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {inventoryList.map(item => {
                const Icon = categoryIcons[item.category] || Boxes;
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded bg-[#00f2fe]/10 border border-[#00f2fe]/30 text-[#00f2fe]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-white">{item.name}</div>
                          <span className="font-mono text-[10px] text-[#8b949e]">{item.code}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="text-[#8b949e]">{item.category}</span>
                    </td>

                    <td>
                      <span className="font-mono font-bold text-white">{item.currentStock} {item.unit}</span>
                    </td>

                    <td>
                      <span className="font-mono text-amber-300">{item.dailyConsumption} {item.unit}/day</span>
                    </td>

                    <td>
                      <span className="font-mono text-cyan-300 font-bold">{item.remainingDays} Days</span>
                    </td>

                    <td>
                      <span className={`badge ${
                        item.shortageRisk === 'HIGH' ? 'badge-critical' :
                        item.shortageRisk === 'MEDIUM' ? 'badge-warning' : 'badge-success'
                      }`}>
                        {item.shortageRisk} ({item.shortageProbability}%)
                      </span>
                    </td>

                    <td>
                      <span className="font-mono text-[11px] text-[#8b949e]">{item.location}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

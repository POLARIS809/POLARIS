import React, { useState } from 'react';
import { Wrench, AlertTriangle, CheckCircle2, Clock, Truck, ShieldAlert, Cpu } from 'lucide-react';

export default function AssetModule({ assets, onUpdateAssetLifecycle }) {
  const lifecycleStages = ['Procurement', 'Allocation', 'Usage', 'Maintenance', 'Retirement'];

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-4">
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-extrabold text-white">Digital Asset Lifecycle Management</h2>
          </div>
          <p className="text-xs text-[#8b949e]">End-to-end tracking of polar vehicles, generators, drills, and satellite communication hardware.</p>
        </div>
      </div>

      {/* Lifecycle Diagram Header */}
      <div className="glass-card p-5">
        <h3 className="text-xs font-bold text-[#00f2fe] uppercase tracking-wider mb-3">Asset Lifecycle Framework</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          {lifecycleStages.map((stage, i) => (
            <div key={stage} className="bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-[10px] font-mono text-purple-300">Phase 0{i + 1}</span>
              <div className="font-bold text-white mt-0.5">{stage}</div>
              <div className="text-[10px] text-[#8b949e] mt-1 font-mono">
                {assets.filter(a => a.lifecycleStage === stage).length} Assets Active
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Asset Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="custom-table text-xs">
            <thead>
              <tr>
                <th>Asset Title & Code</th>
                <th>Category</th>
                <th>Condition Status</th>
                <th>Assigned Technician</th>
                <th>Hours Operated</th>
                <th>Lifecycle Phase</th>
                <th>Next Maintenance</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(asset => (
                <tr key={asset.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white">{asset.name}</div>
                        <span className="font-mono text-[10px] text-[#00f2fe]">{asset.assetCode}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="text-[#8b949e]">{asset.category}</span>
                  </td>

                  <td>
                    <span className={`badge ${
                      asset.condition === 'OPERATIONAL' ? 'badge-success' :
                      asset.condition === 'NEEDS MAINTENANCE' ? 'badge-warning' : 'badge-critical'
                    }`}>
                      {asset.condition}
                    </span>
                  </td>

                  <td>
                    <span className="text-white font-semibold">{asset.assignedTo}</span>
                  </td>

                  <td>
                    <span className="font-mono text-amber-300">{asset.hoursOperated} hrs</span>
                  </td>

                  <td>
                    <select
                      value={asset.lifecycleStage}
                      onChange={(e) => onUpdateAssetLifecycle(asset.id, e.target.value)}
                      className="bg-[#040914] border border-purple-500/30 text-purple-300 font-mono text-[11px] rounded px-2 py-1 cursor-pointer"
                    >
                      {lifecycleStages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <span className={`font-mono text-[11px] ${
                      asset.nextMaintenanceDue.includes('OVERDUE') ? 'text-red-400 font-bold' : 'text-[#8b949e]'
                    }`}>
                      {asset.nextMaintenanceDue}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

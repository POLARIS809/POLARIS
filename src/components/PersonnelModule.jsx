import React, { useState } from 'react';
import { Users, MapPin, Phone, ShieldAlert, Award, UserCheck, Search, Filter } from 'lucide-react';

export default function PersonnelModule({ personnelList, onUpdatePersonnelStatus }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredPersonnel = personnelList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.employeeCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-extrabold text-white">Personnel Management & Visual GPS Movement Tracking</h2>
          </div>
          <p className="text-xs text-[#8b949e]">Centralized roster, team allocation, emergency contact records, and live movement telemetry.</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-card p-3">
        <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1.5 rounded-lg w-full sm:w-72">
          <Search className="w-4 h-4 text-[#8b949e]" />
          <input 
            type="text"
            placeholder="Search Personnel Name, ID, or Role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs text-white focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-[#00f2fe]" />
          <span className="text-[#8b949e]">Filter Status:</span>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0a1329] border border-white/10 text-white rounded px-2 py-1"
          >
            <option value="ALL">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Assigned">Assigned</option>
            <option value="On Mission">On Mission</option>
            <option value="Emergency">Emergency</option>
            <option value="Evacuated">Evacuated</option>
          </select>
        </div>
      </div>

      {/* Personnel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPersonnel.map(person => (
          <div 
            key={person.id}
            className={`glass-card p-4 space-y-3 relative border ${
              person.status === 'Emergency' 
                ? 'border-red-500/80 bg-red-950/20 pulse-red' 
                : 'border-white/10'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{person.name}</h3>
                  {person.teamLead && (
                    <span className="bg-amber-500/20 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-500/40">
                      LEAD
                    </span>
                  )}
                </div>
                <span className="font-mono text-[10px] text-[#00f2fe]">{person.employeeCode}</span>
              </div>

              {/* Status Selector */}
              <select
                value={person.status}
                onChange={(e) => onUpdatePersonnelStatus(person.id, e.target.value)}
                className="bg-[#040914] border border-white/20 text-white font-mono text-[10px] rounded px-2 py-1 cursor-pointer"
              >
                <option value="Available">Available</option>
                <option value="Assigned">Assigned</option>
                <option value="On Mission">On Mission</option>
                <option value="On Leave">On Leave</option>
                <option value="Emergency">Emergency</option>
                <option value="Evacuated">Evacuated</option>
              </select>
            </div>

            <p className="text-xs font-semibold text-emerald-300">{person.role}</p>

            <div className="space-y-1.5 text-xs text-[#8b949e] font-mono bg-white/5 p-3 rounded-lg border border-white/10">
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{person.qualification}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00f2fe] shrink-0" />
                <span className="text-white truncate">{person.currentLocation}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="truncate">{person.contact}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-[#8b949e]">Team: <strong className="text-cyan-300">{person.team}</strong></span>
              <span className="text-[#8b949e]">Mission: <strong className="text-white">{person.assignedMission}</strong></span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

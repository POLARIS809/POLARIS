import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  ShieldAlert, 
  Boxes, 
  Users, 
  Activity, 
  BrainCircuit, 
  QrCode, 
  Wrench, 
  Presentation,
  Clock,
  Radio,
  UserCheck
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  currentRole, 
  setCurrentRole, 
  sihMode, 
  setSihMode,
  activeEmergenciesCount 
}) {
  const [time, setTime] = useState({
    utc: new Date().toUTCString().slice(17, 25) + ' UTC',
    ist: new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' }) + ' IST'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime({
        utc: now.toUTCString().slice(17, 25) + ' UTC',
        ist: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' }) + ' IST'
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Command Hub', icon: Compass },
    { id: 'expedition', label: 'Expeditions', icon: Activity },
    { id: 'cargo', label: 'Cargo & QR', icon: QrCode },
    { id: 'inventory', label: 'Inventory & Stock', icon: Boxes },
    { id: 'personnel', label: 'Personnel GPS', icon: Users },
    { id: 'assets', label: 'Asset Lifecycle', icon: Wrench },
    { 
      id: 'emergency', 
      label: 'Emergency Command', 
      icon: ShieldAlert, 
      badge: activeEmergenciesCount > 0 ? activeEmergenciesCount : null 
    },
    { id: 'ai-analytics', label: 'AI/ML Analytics', icon: BrainCircuit }
  ];

  const roles = [
    'Expedition Manager',
    'Super Admin',
    'Logistics Officer',
    'Inventory Manager',
    'Team Leader',
    'Field User'
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#040914]/90 border-b border-[#00f2fe]/20 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00f2fe] to-[#4facfe] p-0.5 shadow-[0_0_15px_rgba(0,242,254,0.4)]">
            <div className="w-full h-full bg-[#040914] rounded-[10px] flex items-center justify-center">
              <Compass className="w-6 h-6 text-[#00f2fe] animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-wider title-gradient">POLARIS</h1>
              <span className="text-[10px] font-mono font-bold bg-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe]/30 px-2 py-0.5 rounded-full">
                MoES / NCPOR PS-26062
              </span>
            </div>
            <p className="text-xs text-[#8b949e]">AI Polar Expedition Logistics & Command System</p>
          </div>
        </div>

        {/* Live Clock & Station Telemetry */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
          <div className="flex items-center gap-1.5 text-[#00f2fe]">
            <Clock className="w-3.5 h-3.5" />
            <span>{time.utc}</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Bharathi 69°S: -24°C</span>
          </div>
        </div>

        {/* Actions & Role Switcher */}
        <div className="flex items-center gap-3">
          
          {/* SIH Demo Presentation Wizard Toggle */}
          <button 
            onClick={() => setSihMode(!sihMode)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center gap-2 ${
              sihMode 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-pulse' 
                : 'bg-white/5 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>SIH 12-Step Pitch Demo</span>
          </button>

          {/* Role Switcher (RBAC) */}
          <div className="flex items-center gap-2 bg-[#0a1329] border border-[#00f2fe]/30 px-3 py-1.5 rounded-lg">
            <UserCheck className="w-4 h-4 text-[#00f2fe]" />
            <select 
              value={currentRole} 
              onChange={(e) => setCurrentRole(e.target.value)}
              className="bg-transparent text-xs text-[#f0f6fc] font-medium focus:outline-none cursor-pointer"
            >
              {roles.map(role => (
                <option key={role} value={role} className="bg-[#0a1329] text-[#f0f6fc]">{role}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto mt-3 flex items-center gap-1 overflow-x-auto pb-1 border-t border-white/5 pt-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 relative ${
                isActive 
                  ? 'bg-gradient-to-r from-[#00f2fe]/20 to-[#4facfe]/20 text-[#00f2fe] border border-[#00f2fe]/50 shadow-[0_0_15px_rgba(0,242,254,0.2)]' 
                  : 'text-[#8b949e] hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#00f2fe]' : ''}`} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="bg-[#ff385c] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full pulse-red">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

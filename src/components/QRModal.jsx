import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, ShieldAlert, CheckCircle2, ArrowRight, Package, Truck, AlertTriangle } from 'lucide-react';

export default function QRModal({ cargo, onClose }) {
  if (!cargo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-6 space-y-5 border-[#00f2fe]/60 shadow-[0_0_40px_rgba(0,242,254,0.3)] animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#00f2fe]" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Physical-to-Digital Cargo Telemetry</h3>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white font-mono text-sm">✕</button>
        </div>

        {/* QR Code Display & Scan Simulation */}
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-inner border-4 border-[#00f2fe]/40 relative">
          <QRCodeSVG 
            value={cargo.qrCodeData || cargo.code} 
            size={180} 
            level="H" 
            includeMargin={true}
          />
          <div className="mt-2 text-center">
            <span className="font-mono text-xs font-extrabold text-slate-900">{cargo.code}</span>
            <div className="text-[10px] text-slate-600 font-mono">Tracking ID: {cargo.trackingId}</div>
          </div>
        </div>

        {/* Cargo Telemetry Info */}
        <div className="space-y-3 text-xs">
          <div className="bg-white/5 p-3 rounded-lg border border-white/10 space-y-1">
            <h4 className="font-bold text-white text-sm">{cargo.name}</h4>
            <div className="flex items-center justify-between text-[#8b949e]">
              <span>Category: <strong className="text-cyan-300">{cargo.category}</strong></span>
              <span>Weight: <strong className="text-amber-300">{cargo.weightKg} kg</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-white/5 p-3 rounded-lg border border-white/10">
            <div>
              <span className="text-[#8b949e] block">Origin Dispatch Hub</span>
              <strong className="text-emerald-400">{cargo.origin}</strong>
            </div>
            <div>
              <span className="text-[#8b949e] block">Destination Station</span>
              <strong className="text-[#00f2fe]">{cargo.destination}</strong>
            </div>
          </div>

          {/* Delay Risk Badge */}
          <div className={`p-3 rounded-lg border flex items-start gap-2.5 ${
            cargo.delayProbability > 60 
              ? 'bg-red-500/15 border-red-500/40 text-red-300' 
              : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
          }`}>
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">
                AI Delay Prediction: {cargo.delayProbability}% Risk ({cargo.delayRisk})
              </div>
              <p className="text-[10px] opacity-80 mt-0.5">{cargo.notes}</p>
              {cargo.recommendedAction && (
                <div className="text-[10px] font-bold text-amber-300 mt-1">
                  AI Recommended Action: {cargo.recommendedAction}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button onClick={onClose} className="btn-primary text-xs w-full justify-center">
            Close QR Telemetry Inspector
          </button>
        </div>

      </div>
    </div>
  );
}

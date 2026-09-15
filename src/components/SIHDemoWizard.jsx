import React, { useState } from 'react';
import { sihDemoSteps } from '../data/polarMockData';
import { Presentation, ChevronRight, ChevronLeft, Sparkles, CheckCircle2, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SIHDemoWizard({ 
  setActiveTab, 
  onTriggerEmergency, 
  onRunShortageAI, 
  onRunCargoAI,
  onOpenQRModal,
  onCloseWizard
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = sihDemoSteps[currentStepIndex];

  const handleStepAction = () => {
    // Navigate to target module
    setActiveTab(currentStep.targetModule);

    // Execute step-specific side effects
    if (currentStep.step === 5) {
      if (onOpenQRModal) onOpenQRModal();
    } else if (currentStep.step === 7) {
      if (onRunShortageAI) onRunShortageAI();
    } else if (currentStep.step === 8) {
      if (onRunCargoAI) onRunCargoAI();
    } else if (currentStep.step === 10 || currentStep.step === 11) {
      if (onTriggerEmergency) onTriggerEmergency();
    } else if (currentStep.step === 12) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNext = () => {
    if (currentStepIndex < sihDemoSteps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setActiveTab(sihDemoSteps[nextIndex].targetModule);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      setActiveTab(sihDemoSteps[prevIndex].targetModule);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#0d1f3d] via-[#102a52] to-[#0d1f3d] border-b-2 border-amber-500/60 p-4 shadow-[0_10px_30px_rgba(245,158,11,0.2)] text-[#f0f6fc] relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Step Info */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-extrabold text-black text-xl shadow-[0_0_15px_rgba(245,158,11,0.6)] shrink-0">
            #{currentStep.step}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                <Presentation className="w-3.5 h-3.5" />
                SIH Pitch Flow Step {currentStep.step} of 12
              </span>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-amber-200">
                Module: {currentStep.targetModule.toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">{currentStep.title}</h3>
            <p className="text-xs text-amber-100/80 max-w-2xl mt-1">{currentStep.description}</p>
          </div>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-lg text-white text-xs flex items-center gap-1 font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

          <button
            onClick={handleStepAction}
            className="btn-primary bg-gradient-to-r from-amber-400 to-orange-500 text-black border border-amber-300 font-extrabold text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105 transition-transform"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>{currentStep.actionText}</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === sihDemoSteps.length - 1}
            className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-lg text-white text-xs flex items-center gap-1 font-semibold"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>

          <button 
            onClick={onCloseWizard}
            className="ml-2 text-xs text-amber-300/60 hover:text-amber-200 underline"
          >
            Close
          </button>
        </div>

      </div>

      {/* Progress Bar */}
      <div className="w-full bg-black/40 h-1.5 mt-3 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-amber-500 to-orange-400 h-full transition-all duration-300"
          style={{ width: `${((currentStep.step) / 12) * 100}%` }}
        />
      </div>
    </div>
  );
}

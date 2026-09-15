import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SIHDemoWizard from './components/SIHDemoWizard';
import Dashboard from './components/Dashboard';
import ExpeditionModule from './components/ExpeditionModule';
import CargoModule from './components/CargoModule';
import InventoryModule from './components/InventoryModule';
import PersonnelModule from './components/PersonnelModule';
import AssetModule from './components/AssetModule';
import EmergencyModule from './components/EmergencyModule';
import AIAnalyticsModule from './components/AIAnalyticsModule';

import { 
  initialExpeditions, 
  initialCargo, 
  initialInventory, 
  initialPersonnel, 
  initialAssets, 
  initialIncidents 
} from './data/polarMockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentRole, setCurrentRole] = useState('Expedition Manager');
  const [sihMode, setSihMode] = useState(true); // Default active for pitch demo!
  const [openQRItem, setOpenQRItem] = useState(null);

  // Core App State
  const [expeditions, setExpeditions] = useState(initialExpeditions);
  const [cargoList, setCargoList] = useState(initialCargo);
  const [inventoryList, setInventoryList] = useState(initialInventory);
  const [personnelList, setPersonnelList] = useState(initialPersonnel);
  const [assets, setAssets] = useState(initialAssets);
  const [incidents, setIncidents] = useState(initialIncidents);

  // State Handler Functions
  const handleAddExpedition = (newExp) => {
    setExpeditions([newExp, ...expeditions]);
  };

  const handleAddCargo = (newItem) => {
    setCargoList([newItem, ...cargoList]);
  };

  const handleUpdateCargoStatus = (id, newStatus) => {
    setCargoList(cargoList.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const handleUpdateStock = (id, newStock) => {
    setInventoryList(inventoryList.map(inv => {
      if (inv.id === id) {
        const remainingDays = (newStock / inv.dailyConsumption).toFixed(1);
        const shortageProbability = remainingDays < inv.expeditionDaysNeeded ? 78 : 12;
        return {
          ...inv,
          currentStock: newStock,
          remainingDays: Number(remainingDays),
          shortageRisk: shortageProbability > 50 ? 'HIGH' : 'LOW',
          shortageProbability
        };
      }
      return inv;
    }));
  };

  const handleUpdatePersonnelStatus = (id, newStatus) => {
    setPersonnelList(personnelList.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const handleUpdateAssetLifecycle = (id, newStage) => {
    setAssets(assets.map(a => a.id === id ? { ...a, lifecycleStage: newStage } : a));
  };

  const handleAddIncident = (newInc) => {
    setIncidents([newInc, ...incidents]);
  };

  const handleAssignResponseTeam = (id, teamName) => {
    setIncidents(incidents.map(inc => {
      if (inc.id === id) {
        return {
          ...inc,
          assignedTeam: teamName,
          status: 'IN PROGRESS'
        };
      }
      return inc;
    }));
  };

  const handleResolveIncident = (id) => {
    setIncidents(incidents.map(inc => {
      if (inc.id === id) {
        return {
          ...inc,
          status: 'RESOLVED',
          resolvedAt: new Date().toUTCString().slice(17, 25) + ' UTC'
        };
      }
      return inc;
    }));
  };

  // Helper trigger callbacks for SIH wizard
  const triggerEmergencyFlow = () => {
    setActiveTab('emergency');
  };

  const runShortageAIFlow = () => {
    setActiveTab('inventory');
  };

  const runCargoAIFlow = () => {
    setActiveTab('ai-analytics');
  };

  const openQRModalFlow = () => {
    setActiveTab('cargo');
    setOpenQRItem(cargoList[0]);
  };

  const activeEmergenciesCount = incidents.filter(i => i.status !== 'RESOLVED').length;

  return (
    <div className="min-h-screen bg-[#040914] text-[#f0f6fc] flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        sihMode={sihMode}
        setSihMode={setSihMode}
        activeEmergenciesCount={activeEmergenciesCount}
      />

      {/* SIH Presentation Pitch Guided Wizard (When Enabled) */}
      {sihMode && (
        <SIHDemoWizard 
          setActiveTab={setActiveTab}
          onTriggerEmergency={triggerEmergencyFlow}
          onRunShortageAI={runShortageAIFlow}
          onRunCargoAI={runCargoAIFlow}
          onOpenQRModal={openQRModalFlow}
          onCloseWizard={() => setSihMode(false)}
        />
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {activeTab === 'dashboard' && (
          <Dashboard 
            expeditions={expeditions}
            cargoList={cargoList}
            inventoryList={inventoryList}
            personnelList={personnelList}
            incidents={incidents}
            setActiveTab={setActiveTab}
            onOpenQRModal={openQRModalFlow}
            onRunShortageAI={runShortageAIFlow}
            onTriggerEmergency={triggerEmergencyFlow}
          />
        )}

        {activeTab === 'expedition' && (
          <ExpeditionModule 
            expeditions={expeditions}
            onAddExpedition={handleAddExpedition}
          />
        )}

        {activeTab === 'cargo' && (
          <CargoModule 
            cargoList={cargoList}
            onAddCargo={handleAddCargo}
            onUpdateCargoStatus={handleUpdateCargoStatus}
            openQRItem={openQRItem}
            setOpenQRItem={setOpenQRItem}
          />
        )}

        {activeTab === 'inventory' && (
          <InventoryModule 
            inventoryList={inventoryList}
            onUpdateStock={handleUpdateStock}
          />
        )}

        {activeTab === 'personnel' && (
          <PersonnelModule 
            personnelList={personnelList}
            onUpdatePersonnelStatus={handleUpdatePersonnelStatus}
          />
        )}

        {activeTab === 'assets' && (
          <AssetModule 
            assets={assets}
            onUpdateAssetLifecycle={handleUpdateAssetLifecycle}
          />
        )}

        {activeTab === 'emergency' && (
          <EmergencyModule 
            incidents={incidents}
            onAddIncident={handleAddIncident}
            onAssignResponseTeam={handleAssignResponseTeam}
            onResolveIncident={handleResolveIncident}
          />
        )}

        {activeTab === 'ai-analytics' && (
          <AIAnalyticsModule 
            cargoList={cargoList}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#040914] py-4 text-center text-xs text-[#8b949e] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 gap-2">
          <div>
            <strong>POLARIS</strong> &copy; {new Date().getFullYear()} National Centre for Polar and Ocean Research (NCPOR) / MoES
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>SIH Problem Statement 26062</span>
            <span>|</span>
            <span className="text-[#00f2fe]">AI Powered Expedition System</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

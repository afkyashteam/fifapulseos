import { useState, useEffect } from 'react';
import { IMAGES, Incident, INITIAL_INCIDENTS } from '../types';

interface CommandCenterScreenProps {
  onTriggerGlobalAlert: (msg: string) => void;
}

export default function CommandCenterScreen({ onTriggerGlobalAlert }: CommandCenterScreenProps) {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<Incident>(INITIAL_INCIDENTS[0]);
  const [mapZoom, setMapZoom] = useState(1);
  const [mapLayer, setMapLayer] = useState<'Standard' | 'Terrain' | 'Heatmap'>('Standard');
  const [activeUnits, setActiveUnits] = useState(42);
  const [simulationProgress, setSimulationProgress] = useState(84);
  const [hudMessage, setHudMessage] = useState<string | null>(null);

  // Evacuation simulation fluctuating percentage
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        const delta = Math.random() * 1.6 - 0.8;
        const next = prev + delta;
        if (next < 70) return 72;
        if (next > 98) return 96;
        return Math.round(next * 10) / 10;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Display a temporary HUD message
  const triggerHud = (msg: string) => {
    setHudMessage(msg);
    setTimeout(() => {
      setHudMessage(null);
    }, 3000);
  };

  const handleIncidentSelect = (incident: Incident) => {
    setSelectedIncident(incident);
    triggerHud(`HUD ANALYZING: COORDINATES MATCH ${incident.location.toUpperCase()}`);
  };

  const handleAddCustomIncident = (type: 'Crowd Pressure' | 'Heat Alert' | 'Gate Delay') => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newInc: Incident = {
      id: String(Date.now()),
      time: timeStr,
      message: type === 'Crowd Pressure'
        ? 'High pressure build up at East Transit gate. Crowd flow diverting.'
        : type === 'Heat Alert'
        ? 'Primary clinic at capacity due to heat exhaustion reports.'
        : 'Ticket scanning system lag at Gate C-12. Technical team notified.',
      severity: type === 'Crowd Pressure' ? 'high' : type === 'Heat Alert' ? 'medium' : 'low',
      location: type === 'Crowd Pressure' ? 'East Transit' : type === 'Heat Alert' ? 'Sector 4' : 'Gate C-12',
      type: type
    };

    setIncidents([newInc, ...incidents]);
    setSelectedIncident(newInc);
    setActiveUnits((prev) => prev + 1);
    triggerHud(`ALERT TRIGGERED: NEW LOG REGISTERED AT ${timeStr}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#050508] p-6 text-[#e3e1e9] font-sans">
      
      {/* Temporary Tech Toast Notification HUD */}
      {hudMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 glass-panel bg-black/80 text-[#00f0ff] border border-[#00f0ff]/50 px-6 py-2.5 rounded-full font-mono text-xs tracking-wider uppercase animate-bounce shadow-[0_0_20px_rgba(0,240,255,0.4)]">
          {hudMessage}
        </div>
      )}

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 pb-12 h-full">
        
        {/* Left column: Incident Timeline */}
        <section className="col-span-1 lg:col-span-3 flex flex-col gap-4">
          <div className="glass-panel rounded-xl flex-grow flex flex-col overflow-hidden border border-white/5 bg-[#121318]/50">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#93000a]/10">
              <h3 className="font-bold text-sm text-[#ffb4ab] flex items-center gap-2 font-sans">
                <span className="material-symbols-outlined text-base">history</span>
                Incident Timeline
              </h3>
              <span className="font-mono text-[9px] bg-[#93000a]/30 text-[#ffb4ab] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                LIVE FEED
              </span>
            </div>

            {/* Quick simulation controls */}
            <div className="p-3 border-b border-white/5 bg-black/20 flex gap-1">
              <button 
                onClick={() => handleAddCustomIncident('Crowd Pressure')}
                className="flex-1 py-1.5 px-2 bg-[#93000a]/20 hover:bg-[#93000a]/40 border border-[#ffb4ab]/20 text-[#ffb4ab] rounded text-[9px] font-mono font-bold cursor-pointer transition-colors"
              >
                + CROWD SPIKE
              </button>
              <button 
                onClick={() => handleAddCustomIncident('Heat Alert')}
                className="flex-1 py-1.5 px-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 rounded text-[9px] font-mono font-bold cursor-pointer transition-colors"
              >
                + HEAT EXHAUST
              </button>
            </div>

            {/* Scrolling Incident List */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 max-h-[440px] relative">
              <div className="absolute left-[26px] top-4 bottom-4 w-px bg-white/10" />
              
              {incidents.map((incident) => (
                <div 
                  key={incident.id} 
                  onClick={() => handleIncidentSelect(incident)}
                  className={`relative pl-8 cursor-pointer transition-all ${
                    selectedIncident.id === incident.id ? 'scale-102 opacity-100' : 'opacity-70 hover:opacity-95'
                  }`}
                >
                  <div className={`absolute left-[20px] top-1 w-3.5 h-3.5 rounded-full border-2 border-[#050508] ${
                    incident.severity === 'high' ? 'bg-red-500 pulse-red' : incident.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-400'
                  }`} />
                  
                  <div className="text-[10px] font-mono text-[#b9cacb]/80 mb-1 flex justify-between">
                    <span>{incident.time}</span>
                    <span className="uppercase text-[8px] text-[#00f0ff]">{incident.type}</span>
                  </div>

                  <div className={`p-3 rounded-xl border ${
                    selectedIncident.id === incident.id 
                      ? 'bg-white/10 border-[#00f0ff]/40 shadow-md' 
                      : 'bg-white/5 border-white/5'
                  }`}>
                    <p className="text-xs font-sans text-[#e3e1e9] leading-tight font-medium">
                      {incident.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Center column: Interactive Emergency Map & Evacuation Status */}
        <section className="col-span-1 lg:col-span-6 flex flex-col gap-6">
          <div className="glass-panel rounded-xl flex-grow relative overflow-hidden border border-white/5 min-h-[380px] shadow-2xl flex flex-col justify-between">
            
            {/* Map Header Overlays */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <span className="pulse-dot" />
                <span className="font-mono text-[9px] text-[#00f0ff] font-bold">
                  ACTIVE COMMAND RESPONDERS: {activeUnits}
                </span>
              </div>
              <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 pulse-red" />
                <span className="font-mono text-[9px] text-[#ffb4ab] font-bold uppercase">
                  FOCUS COMPONENT: {selectedIncident.location}
                </span>
              </div>
            </div>

            {/* Map Zoom / Controls Overlays */}
            <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
              <div className="flex gap-1.5">
                <button 
                  onClick={() => {
                    setMapZoom((prev) => Math.min(prev + 0.1, 1.4));
                    triggerHud('HUD ZOOM LEVEL ADVANCED');
                  }}
                  className="w-9 h-9 bg-black/80 hover:bg-[#34343a] rounded-lg border border-white/20 flex items-center justify-center text-[#00f0ff] cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
                <button 
                  onClick={() => {
                    setMapZoom((prev) => Math.max(prev - 0.1, 0.7));
                    triggerHud('HUD ZOOM LEVEL REDUCED');
                  }}
                  className="w-9 h-9 bg-black/80 hover:bg-[#34343a] rounded-lg border border-white/20 flex items-center justify-center text-[#00f0ff] cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">remove</span>
                </button>
              </div>
              <div className="flex bg-black/80 p-1 rounded-lg border border-white/20 gap-1">
                {(['Standard', 'Terrain', 'Heatmap'] as const).map((layer) => (
                  <button
                    key={layer}
                    onClick={() => {
                      setMapLayer(layer);
                      triggerHud(`MAP RENDER OVERLAY CHANGED TO ${layer.toUpperCase()}`);
                    }}
                    className={`px-2 py-1 text-[8px] font-mono font-bold rounded cursor-pointer ${
                      mapLayer === layer ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'text-[#b9cacb]'
                    }`}
                  >
                    {layer}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Interactive Map background area */}
            <div className="w-full h-full absolute inset-0 z-0 overflow-hidden bg-[#0d0e13]">
              <div className="scan-line" />
              <div 
                className={`w-full h-full bg-cover bg-center transition-all duration-500 ${
                  mapLayer === 'Heatmap' ? 'saturate-200 hue-rotate-60 contrast-125' : mapLayer === 'Terrain' ? 'brightness-75 contrast-110' : ''
                }`}
                style={{ 
                  backgroundImage: `url('${IMAGES.commandMapBg}')`,
                  transform: `scale(${mapZoom})`,
                  opacity: 0.45
                }}
              />

              {/* Dynamic Interactive map markers */}
              {/* Main alert marker */}
              <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform">
                <div className="flex flex-col items-center">
                  <div className="bg-[#93000a]/30 p-2.5 rounded-full border border-red-500 pulse-red shadow-[0_0_15px_rgba(255,180,171,0.5)]">
                    <span className="material-symbols-outlined text-red-400 text-xl font-bold">warning</span>
                  </div>
                  <div className="mt-1.5 bg-[#93000a]/95 border border-red-500 px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-wider font-mono">
                    {selectedIncident.location}
                  </div>
                </div>
              </div>

              {/* Responder unit 1 */}
              <div className="absolute top-[30%] left-[62%] z-10 hover:scale-110 transition-transform">
                <div className="flex flex-col items-center">
                  <div className="bg-[#00f0ff]/20 p-2 rounded-full border border-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                    <span className="material-symbols-outlined text-[#00f0ff] text-xs">medical_services</span>
                  </div>
                  <div className="mt-1 bg-black/95 border border-white/10 px-1.5 py-0.5 rounded text-[7px] text-[#00f0ff] font-mono">
                    MED-04
                  </div>
                </div>
              </div>

              {/* Responder unit 2 */}
              <div className="absolute bottom-[28%] right-[35%] z-10 hover:scale-110 transition-transform">
                <div className="flex flex-col items-center">
                  <div className="bg-[#36ff8b]/20 p-2 rounded-full border border-[#36ff8b] shadow-[0_0_10px_rgba(54,255,139,0.4)]">
                    <span className="material-symbols-outlined text-[#36ff8b] text-xs">security</span>
                  </div>
                  <div className="mt-1 bg-black/95 border border-white/10 px-1.5 py-0.5 rounded text-[7px] text-[#36ff8b] font-mono">
                    SEC-21
                  </div>
                </div>
              </div>
            </div>

            {/* Dummy element for spacer */}
            <div />
          </div>

          {/* Bottom: Evacuation simulation status bar container */}
          <div className="glass-panel rounded-xl p-5 border border-white/5 bg-[#121318]/40 shadow-md space-y-3">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-[#b9cacb]/60 uppercase tracking-widest block font-bold">
                  EVACUATION SIMULATION STATUS
                </span>
                <span className="text-sm font-bold text-[#e3e1e9] block">
                  Priority Alpha-1 Sequence Logged
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-[#36ff8b] font-bold block text-glow">
                  {simulationProgress}% Egress Success Rate
                </span>
                <span className="text-[10px] text-[#b9cacb]/50">Est. Clearance: 14m 20s</span>
              </div>
            </div>

            <div className="h-4 w-full bg-black/60 rounded-full overflow-hidden border border-white/10 p-[2px]">
              <div 
                className="h-full bg-gradient-to-r from-[#00f0ff] via-[#36ff8b] to-[#00f0ff] rounded-full relative transition-all duration-500 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                style={{ width: `${simulationProgress}%` }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] w-24 animate-[move_2.5s_linear_infinite]" />
              </div>
            </div>
          </div>
        </section>

        {/* Right column: AI-Generated Response Plan */}
        <section className="col-span-1 lg:col-span-3 flex flex-col gap-6">
          <div className="glass-panel rounded-xl flex-grow flex flex-col overflow-hidden border border-white/5 bg-[#121318]/50 shadow-lg justify-between">
            
            {/* Header */}
            <div>
              <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#00f0ff]/5">
                <span className="material-symbols-outlined text-[#00f0ff] text-glow animate-pulse">
                  auto_awesome
                </span>
                <h3 className="font-bold text-sm text-[#00f0ff] font-sans uppercase tracking-wider">
                  AI Response Plan
                </h3>
              </div>

              {/* Analysis Text details */}
              <div className="p-4 space-y-4">
                <div className="bg-black/40 p-4 rounded-xl border border-[#00f0ff]/20">
                  <span className="font-mono text-[9px] text-[#00f0ff] font-bold block mb-1">
                    SITUATION ANALYSIS
                  </span>
                  <p className="text-xs text-[#b9cacb] leading-relaxed font-sans">
                    High density detected near <strong className="text-white">{selectedIncident.location}</strong>. AI model identifies active bottleneck issues and risk of pressure levels rising above target threshold (4.2 people/m²). Emergency flow measures advised.
                  </p>
                </div>

                {/* Recommendations */}
                <div className="space-y-3 pt-1">
                  <span className="font-mono text-[9px] text-[#b9cacb]/60 uppercase tracking-widest font-bold block">
                    RECOMMENDED ACTIONS
                  </span>
                  
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#36ff8b] text-base mt-0.5">check_circle</span>
                    <p className="text-xs text-[#e3e1e9] leading-tight font-sans">
                      Redirect incoming flow from Corridor B to South Annex.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-yellow-400 text-base mt-0.5">error</span>
                    <p className="text-xs text-[#e3e1e9] leading-tight font-sans">
                      Deploy Medical Unit 04 to standby at {selectedIncident.location} for support.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#00f0ff] text-base mt-0.5">broadcast_on_home</span>
                    <p className="text-xs text-[#e3e1e9] leading-tight font-sans">
                      Initiate "Calm Sequence" audio broadcast in multiple languages.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operational Actions Form */}
            <div className="p-4 bg-black/40 border-t border-white/5 grid grid-cols-2 gap-2">
              <button 
                onClick={() => triggerHud('NOTIFICATION DISPATCHED: METROPOLITAN SECURITY FORCES EN ROUTE')}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#36ff8b] hover:bg-[#36ff8b]/5 transition-all group cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#36ff8b] text-lg mb-1 group-hover:scale-110 transition-transform">
                  security
                </span>
                <span className="text-[8px] font-mono font-bold text-white uppercase">Notify Security</span>
              </button>

              <button 
                onClick={() => triggerHud('NOTIFICATION DISPATCHED: PARAMEDIC & FIRST AID DISPATCHED')}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#00f0ff] hover:bg-[#00f0ff]/5 transition-all group cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#00f0ff] text-lg mb-1 group-hover:scale-110 transition-transform">
                  medical_services
                </span>
                <span className="text-[8px] font-mono font-bold text-white uppercase">Notify Medical</span>
              </button>

              <button 
                onClick={() => onTriggerGlobalAlert('SECTOR 7 CRITICAL ALARM: IMMEDIATE BROADCAST REDIRECTION')}
                className="col-span-2 py-2.5 rounded-lg bg-[#93000a] hover:bg-red-700 text-white font-sans text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  campaign
                </span>
                Broadcast Alert
              </button>

              <button 
                onClick={() => {
                  const dataStr = JSON.stringify({
                    timestamp: new Date().toISOString(),
                    activeIncident: selectedIncident,
                    simulationResult: { egressRate: simulationProgress, clearance: '14m 20s' },
                    activeUnits: activeUnits,
                    region: 'Sector 7 World Cup 2026 Logistics Hub'
                  }, null, 2);
                  alert(`LOGISTICS COOP REPORT GENERATED:\n\n${dataStr}`);
                }}
                className="col-span-2 py-2 rounded-lg bg-white/5 border border-white/10 text-[#b9cacb] font-sans text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1 hover:bg-white/10 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">description</span>
                Generate Report
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

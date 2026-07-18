import { useState, useEffect } from 'react';
import { IMAGES, AiInsight, INITIAL_INSIGHTS } from '../types';

export default function AnalyticsScreen() {
  const [insights, setInsights] = useState<AiInsight[]>(INITIAL_INSIGHTS);
  const [selectedInsight, setSelectedInsight] = useState<AiInsight | null>(INITIAL_INSIGHTS[0]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [activeTab, setActiveTab] = useState<'All' | 'High Risk' | 'Medium Risk' | 'Optimization'>('All');
  const [gateStats, setGateStats] = useState({
    GateA: { capacity: 92, flow: '1,420/min', status: 'critical' },
    GateB: { capacity: 48, flow: '610/min', status: 'optimal' },
    GateC: { capacity: 74, flow: '980/min', status: 'warning' },
    GateD: { capacity: 15, flow: '180/min', status: 'nominal' }
  });
  const [isExecutingAction, setIsExecutingAction] = useState(false);
  const [executionMessage, setExecutionMessage] = useState('');

  // Randomize gate statistics a little bit over time for live effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGateStats((prev) => {
        const randomize = (val: number, max: number) => {
          const delta = Math.floor(Math.random() * 5) - 2;
          return Math.max(10, Math.min(max, val + delta));
        };
        const nextGateA = randomize(prev.GateA.capacity, 100);
        return {
          GateA: { ...prev.GateA, capacity: nextGateA, status: nextGateA > 90 ? 'critical' : 'warning' },
          GateB: { ...prev.GateB, capacity: randomize(prev.GateB.capacity, 100) },
          GateC: { ...prev.GateC, capacity: randomize(prev.GateC.capacity, 100) },
          GateD: { ...prev.GateD, capacity: randomize(prev.GateD.capacity, 100) }
        };
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleActionExecute = (actionTitle: string, actionDesc: string) => {
    setIsExecutingAction(true);
    setExecutionMessage(`ESTABLISHING CONNECTION TO SECURE GATEWAY...`);
    
    setTimeout(() => {
      setExecutionMessage(`EXECUTING PROTOCOL: "${actionDesc.toUpperCase()}"...`);
      setTimeout(() => {
        setExecutionMessage(`SUCCESS! TOURNAMENT OPERATING RESPONSE IMPLEMENTED.`);
        setTimeout(() => {
          setIsExecutingAction(false);
          // Auto resolve or change the risk state
          if (actionTitle.includes('Gate A')) {
            setGateStats(prev => ({
              ...prev,
              GateA: { capacity: 64, flow: '820/min', status: 'optimal' }
            }));
          }
        }, 1500);
      }, 1500);
    }, 1200);
  };

  const filteredInsights = insights.filter((ins) => {
    if (activeTab === 'All') return true;
    return ins.risk === activeTab;
  });

  const timelineMilestones = [
    { time: '17:30', title: 'Gates Open', status: 'completed' },
    { time: '18:15', title: 'Security Peak', status: 'completed' },
    { time: '19:45', title: 'Arrival Wave', status: 'active' },
    { time: '20:00', title: 'Kickoff (MEX-ARG)', status: 'scheduled' },
    { time: '20:45', title: 'Half-time surge', status: 'scheduled' },
    { time: '21:50', title: 'Egress Phase 1', status: 'scheduled' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#050508] p-6 text-[#e3e1e9] font-sans">
      
      {/* Execution Overlay Panel */}
      {isExecutingAction && (
        <div className="fixed inset-0 bg-[#050508]/90 z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-[480px] rounded-2xl p-8 border border-[#36ff8b]/40 text-center space-y-6 shadow-[0_0_50px_rgba(54,255,139,0.2)] animate-pulse-fast">
            <div className="relative w-20 h-20 mx-auto bg-[#36ff8b]/10 border border-[#36ff8b]/30 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-[#36ff8b] animate-spin">
                sync_alt
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#36ff8b] uppercase tracking-wider text-glow-green">
                Securing Network Node
              </h3>
              <p className="font-mono text-xs text-[#b9cacb] leading-relaxed select-none">
                {executionMessage}
              </p>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#36ff8b] rounded-full animate-pulse" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      )}

      {/* Main Grid Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 pb-12">
        
        {/* Left / Center Area: Estadio Azteca Real-Time Feed */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
          <div className="glass-panel rounded-xl flex-grow overflow-hidden border border-white/5 relative bg-[#121318]/40 shadow-xl min-h-[440px] flex flex-col justify-between">
            
            {/* Overlay Title bar */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <div className="bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <span className="pulse-dot" />
                <span className="font-sans text-[11px] font-bold text-[#00f0ff] uppercase tracking-wide">
                  Estadio Azteca Real-Time Feed
                </span>
              </div>
            </div>

            {/* Rotator / Zoom control buttons */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button 
                onClick={() => {
                  setRotation((prev) => (prev + 90) % 360);
                }}
                className="w-9 h-9 bg-black/85 hover:bg-[#34343a] rounded-lg border border-white/10 flex items-center justify-center text-[#00f0ff] cursor-pointer transition-colors"
                title="Rotate Feed"
              >
                <span className="material-symbols-outlined text-base">rotate_right</span>
              </button>
              <button 
                onClick={() => {
                  setZoomLevel((prev) => Math.min(prev + 0.15, 1.45));
                }}
                className="w-9 h-9 bg-black/85 hover:bg-[#34343a] rounded-lg border border-white/10 flex items-center justify-center text-[#00f0ff] cursor-pointer transition-colors"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-base">zoom_in</span>
              </button>
              <button 
                onClick={() => {
                  setZoomLevel((prev) => Math.max(prev - 0.15, 0.75));
                }}
                className="w-9 h-9 bg-black/85 hover:bg-[#34343a] rounded-lg border border-white/10 flex items-center justify-center text-[#00f0ff] cursor-pointer transition-colors"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined text-base">zoom_out</span>
              </button>
            </div>

            {/* Main Stadium isometric viewport */}
            <div className="w-full h-full absolute inset-0 z-0 overflow-hidden flex items-center justify-center bg-[#0d0e13]">
              <div 
                className="w-full h-full bg-cover bg-center transition-all duration-700"
                style={{ 
                  backgroundImage: `url('${IMAGES.analyticsMapBg}')`,
                  transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                  opacity: 0.5
                }}
              />

              {/* Dynamic Overlay Floating Gate hotspots */}
              {/* Gate A (Surge hotspot) */}
              <div 
                className="absolute top-[35%] left-[32%] z-10 cursor-pointer group"
                style={{ transform: `rotate(${-rotation}deg)` }}
              >
                <div className="relative">
                  <span className={`absolute -inset-2.5 rounded-full ${
                    gateStats.GateA.capacity > 85 ? 'bg-red-500/30 animate-ping' : 'bg-[#00f0ff]/20'
                  }`} />
                  <div className={`p-2 rounded-lg border flex items-center gap-2 shadow-lg transition-transform hover:scale-105 ${
                    gateStats.GateA.capacity > 85 ? 'bg-[#93000a]/90 border-red-500' : 'bg-[#121318]/90 border-[#00f0ff]/50'
                  }`}>
                    <span className="font-mono text-[9px] font-bold text-white">GATE A</span>
                    <span className={`text-[9px] font-mono font-bold ${
                      gateStats.GateA.capacity > 85 ? 'text-red-300' : 'text-[#00f0ff]'
                    }`}>{gateStats.GateA.capacity}% CAP</span>
                  </div>
                </div>
              </div>

              {/* Gate B (Optimal hotspot) */}
              <div 
                className="absolute top-[68%] left-[24%] z-10 cursor-pointer group"
                style={{ transform: `rotate(${-rotation}deg)` }}
              >
                <div className="relative">
                  <div className="p-2 rounded-lg border bg-[#121318]/95 border-[#36ff8b]/50 flex items-center gap-2 shadow-lg transition-transform hover:scale-105">
                    <span className="font-mono text-[9px] font-bold text-white">GATE B</span>
                    <span className="text-[9px] font-mono text-[#36ff8b] font-bold">{gateStats.GateB.capacity}% CAP</span>
                  </div>
                </div>
              </div>

              {/* Gate C (Warning hotspot) */}
              <div 
                className="absolute bottom-[35%] right-[28%] z-10 cursor-pointer group"
                style={{ transform: `rotate(${-rotation}deg)` }}
              >
                <div className="relative">
                  <span className="absolute -inset-2 rounded-full bg-yellow-500/20 animate-ping" />
                  <div className="p-2 rounded-lg border bg-[#121318]/95 border-yellow-500/50 flex items-center gap-2 shadow-lg transition-transform hover:scale-105">
                    <span className="font-mono text-[9px] font-bold text-white">GATE C</span>
                    <span className="text-[9px] font-mono text-yellow-400 font-bold">{gateStats.GateC.capacity}% CAP</span>
                  </div>
                </div>
              </div>

              {/* Gate D (Nominal hotspot) */}
              <div 
                className="absolute top-[28%] right-[32%] z-10 cursor-pointer group"
                style={{ transform: `rotate(${-rotation}deg)` }}
              >
                <div className="relative">
                  <div className="p-2 rounded-lg border bg-[#121318]/95 border-white/20 flex items-center gap-2 shadow-lg transition-transform hover:scale-105">
                    <span className="font-mono text-[9px] font-bold text-white">GATE D</span>
                    <span className="text-[9px] font-mono text-[#b9cacb] font-bold">{gateStats.GateD.capacity}% CAP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dummy element for flex layout spacer */}
            <div />
          </div>

          {/* Bottom horizontal: Live Chronology Schedule */}
          <div className="glass-panel rounded-xl p-5 border border-white/5 bg-[#121318]/40 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-[9px] text-[#b9cacb]/60 uppercase tracking-widest font-bold">
                Live Chronology Timeline
              </span>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]"></span>
                </span>
                <span className="text-glow text-[#00f0ff] font-bold">CURRENT: 19:48</span>
              </div>
            </div>

            {/* Horizontal Timeline flow */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative">
              <div className="absolute top-[14px] left-0 right-0 h-0.5 bg-white/5 z-0 hidden md:block" />
              
              {timelineMilestones.map((milestone, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                  {/* Indicator node */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 mb-2 transition-transform duration-300 ${
                    milestone.status === 'completed'
                      ? 'bg-[#36ff8b]/10 border-[#36ff8b] text-[#36ff8b]'
                      : milestone.status === 'active'
                      ? 'bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff] scale-110 shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                      : 'bg-[#121318] border-white/10 text-white/40'
                  }`}>
                    {milestone.status === 'completed' ? (
                      <span className="material-symbols-outlined text-xs">done</span>
                    ) : (
                      <span className="text-[9px] font-mono font-black">{idx + 1}</span>
                    )}
                  </div>

                  <span className="font-mono text-[10px] text-white/50 block font-bold">{milestone.time}</span>
                  <span className={`text-[11px] font-sans block mt-0.5 leading-tight ${
                    milestone.status === 'active' ? 'text-[#00f0ff] font-bold' : 'text-[#e3e1e9]'
                  }`}>
                    {milestone.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Area: AI Insights Navigation Panel */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel rounded-xl flex-grow flex flex-col overflow-hidden border border-white/5 bg-[#121318]/50 shadow-xl">
            {/* Title */}
            <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#00f0ff]/5">
              <span className="material-symbols-outlined text-[#00f0ff]">
                insights
              </span>
              <h3 className="font-bold text-sm text-[#00f0ff] uppercase tracking-wider font-sans">
                AI Insight Diagnostics
              </h3>
            </div>

            {/* Pill Tabs Filter */}
            <div className="px-4 pt-4 pb-2 border-b border-white/5 flex gap-1 bg-black/15">
              {(['All', 'High Risk', 'Medium Risk', 'Optimization'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2 py-1 rounded text-[9px] font-mono font-bold transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30' 
                      : 'text-[#b9cacb] hover:bg-white/5'
                  }`}
                >
                  {tab === 'All' ? 'ALL' : tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* List of dynamic insights */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3 max-h-[380px]">
              {filteredInsights.map((insight) => (
                <div
                  key={insight.id}
                  onClick={() => setSelectedInsight(insight)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedInsight?.id === insight.id
                      ? 'bg-white/10 border-[#00f0ff]/50 shadow-lg scale-102'
                      : 'bg-white/5 border-white/5 hover:bg-white/7'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider ${
                      insight.risk === 'High Risk'
                        ? 'bg-red-500/20 text-red-400'
                        : insight.risk === 'Medium Risk'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {insight.risk}
                    </span>
                    <span className="font-mono text-[9px] text-[#36ff8b]">
                      CONFIDENCE: {insight.confidence}%
                    </span>
                  </div>

                  <h4 className="font-sans font-bold text-sm text-[#e3e1e9] mb-1">
                    {insight.title}
                  </h4>
                  <p className="text-xs text-[#b9cacb] leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Selected Insight Action Control Area */}
            {selectedInsight && (
              <div className="p-4 bg-black/40 border-t border-white/5 space-y-4">
                <div className="bg-[#121318] p-3.5 rounded-lg border border-white/5 space-y-2">
                  <span className="font-mono text-[8px] text-[#b9cacb]/50 tracking-widest uppercase block font-bold">
                    RECOMMENDED COMMAND REROUTE
                  </span>
                  <p className="text-xs text-[#00f0ff] font-medium leading-relaxed font-sans">
                    {selectedInsight.recommendedAction}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleActionExecute(selectedInsight.title, selectedInsight.recommendedAction)}
                  className="w-full py-3 bg-[#36ff8b] text-[#004d1c] hover:brightness-110 rounded-lg text-xs font-black tracking-widest uppercase cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(54,255,139,0.3)]"
                >
                  <span className="material-symbols-outlined text-base font-bold">check_box</span>
                  Execute Operating Directive
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

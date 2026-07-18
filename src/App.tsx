import { useState, useEffect } from 'react';
import { User, IMAGES } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import AuthScreen from './components/AuthScreen';
import CommandCenterScreen from './components/CommandCenterScreen';
import AnalyticsScreen from './components/AnalyticsScreen';
import AiAssistantDrawer from './components/AiAssistantDrawer';

type MainView = 'WELCOME' | 'AUTH' | 'DASHBOARD' | 'COMMAND';
type SidebarView = 'LIVE_INTEL' | 'CROWD_FLOW' | 'TRANSPORT' | 'SUSTAINABILITY' | 'DIGITAL_TWIN' | 'REPORTS' | 'SETTINGS' | 'SUPPORT';

export default function App() {
  // Navigation & User session state
  const [currentView, setCurrentView] = useState<MainView>('WELCOME');
  const [sidebarTab, setSidebarTab] = useState<SidebarView>('LIVE_INTEL');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // High-tech overlay drawer states
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Global Critical Flashing Alarm states
  const [globalAlarmMessage, setGlobalAlarmMessage] = useState<string | null>(null);
  const [liveLogCount, setLiveLogCount] = useState(3);

  // Simulated live notification logger stream
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Gate A surge alert resolved via Emergency Valve 14.', time: '14:32', category: 'SYSTEM' },
    { id: 2, text: 'Security Team Gamma deployed to Outer Plaza Section C.', time: '14:29', category: 'SECURITY' },
    { id: 3, text: 'Smart Shuttle Fleet Alpha dispatched to Plaza Station.', time: '14:26', category: 'LOGISTICS' }
  ]);

  // Handle high-tech AI Copilot simulated response hooks
  const handleAiCommandTrigger = (cmd: string) => {
    const timeStr = new Date().toTimeString().split(' ')[0].substring(0, 5);
    if (cmd === 'CALM_SEQUENCE_ACTIVED') {
      setNotifications(prev => [
        { id: Date.now(), text: 'AI COMPANION: Multilingual Calm Broadcast triggered in Sector 7.', time: timeStr, category: 'AI_AGENT' },
        ...prev
      ]);
      setLiveLogCount(prev => prev + 1);
    } else if (cmd === 'FLOW_REROUTED') {
      setNotifications(prev => [
        { id: Date.now(), text: 'AI COMPANION: Dynamic spatial flow routing completed.', time: timeStr, category: 'AI_AGENT' },
        ...prev
      ]);
      setLiveLogCount(prev => prev + 1);
    } else if (cmd === 'VOLUNTEER_SYNCED') {
      setNotifications(prev => [
        { id: Date.now(), text: 'AI COMPANION: Handheld volunteer checklist sync dispatched.', time: timeStr, category: 'AI_AGENT' },
        ...prev
      ]);
      setLiveLogCount(prev => prev + 1);
    }
  };

  const triggerGlobalAlert = (msg: string) => {
    setGlobalAlarmMessage(msg);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('DASHBOARD');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setCurrentView('WELCOME');
  };

  return (
    <div className={`min-h-screen bg-[#050508] text-[#e3e1e9] flex flex-col relative overflow-x-hidden ${
      globalAlarmMessage ? 'border-4 border-red-600 animate-pulse pulse-red' : ''
    }`}>
      
      {/* Critical Alarm Siren Modal overlay */}
      {globalAlarmMessage && (
        <div className="fixed inset-0 bg-[#93000a]/90 backdrop-blur-md z-100 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-[500px] rounded-2xl p-8 border-2 border-red-500 text-center space-y-6 shadow-[0_0_50px_rgba(255,180,171,0.4)] relative">
            <div className="absolute top-2 right-2 flex gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 pulse-red" />
              <span className="w-2 h-2 rounded-full bg-red-500 pulse-red" />
            </div>
            
            <div className="w-20 h-20 bg-red-500/10 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto pulse-red">
              <span className="material-symbols-outlined text-4xl text-red-400 font-bold">campaign</span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-white uppercase tracking-wider font-sans">
                CRITICAL DIRECTIVE LOGGED
              </h2>
              <div className="font-mono text-xs text-red-200 bg-red-950/50 p-4 rounded-xl border border-red-900/30">
                {globalAlarmMessage}
              </div>
            </div>

            <p className="text-xs text-[#b9cacb] leading-relaxed">
              Authorized operators can immediately alert metropolitan transit networks, deploy security fleets, or issue emergency digital wayfinding redirects.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setNotifications(prev => [
                    { id: Date.now(), text: 'EMERGENCY: Authorized emergency broadcast deployed.', time: 'NOW', category: 'CRITICAL' },
                    ...prev
                  ]);
                  setLiveLogCount(prev => prev + 1);
                  setGlobalAlarmMessage(null);
                }}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase cursor-pointer"
              >
                CONFIRM BROADCAST
              </button>
              <button
                onClick={() => setGlobalAlarmMessage(null)}
                className="flex-1 py-3 bg-white/5 border border-white/20 text-[#b9cacb] hover:bg-white/10 rounded-xl text-xs font-bold uppercase cursor-pointer"
              >
                DISMISS FLARE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Navigation Top Bar */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 px-4 md:px-6 py-3 flex justify-between items-center bg-[#050508]/85 backdrop-blur-md">
        <div className="flex items-center gap-4">
          {/* Logo brand block */}
          <div 
            onClick={() => setCurrentView('WELCOME')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <img 
              alt="FIFA Pulse AI Logo" 
              className="w-8 h-8 object-contain filter drop-shadow-[0_0_5px_rgba(0,240,255,0.4)] group-hover:rotate-12 transition-transform" 
              src={IMAGES.logo}
            />
            <div>
              <span className="font-sans font-black text-sm tracking-tight text-white group-hover:text-[#00f0ff] transition-colors">
                FIFA PULSE AI
              </span>
              <span className="font-mono text-[8px] text-[#b9cacb]/50 block uppercase tracking-widest font-bold">
                STADIUM OS // v1.26
              </span>
            </div>
          </div>

          {/* Top Tabs - only visible if logged in */}
          {currentUser && (
            <nav className="hidden md:flex gap-1.5 ml-6 pl-6 border-l border-white/10">
              <button
                onClick={() => {
                  setCurrentView('DASHBOARD');
                  setSidebarTab('LIVE_INTEL');
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentView === 'DASHBOARD'
                    ? 'bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 shadow-[0_0_8px_rgba(0,240,255,0.15)]'
                    : 'text-[#b9cacb] hover:bg-white/5 hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setCurrentView('COMMAND');
                  setSidebarTab('LIVE_INTEL');
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentView === 'COMMAND'
                    ? 'bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 shadow-[0_0_8px_rgba(0,240,255,0.15)]'
                    : 'text-[#b9cacb] hover:bg-white/5 hover:text-white'
                }`}
              >
                Command
              </button>
              <button
                onClick={() => triggerGlobalAlert('LOGISTICS DISPATCH OVERFLOW: SHUTTLES REQUESTING RE-DEPLOY')}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-[#b9cacb] hover:bg-white/5 hover:text-white transition-all cursor-pointer"
              >
                Logistics
              </button>
              <button
                onClick={() => triggerGlobalAlert('SAFETY SYSTEM HEARTBEAT CHECK: ALL SECTORS NOMINAL')}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-[#b9cacb] hover:bg-white/5 hover:text-white transition-all cursor-pointer"
              >
                Safety
              </button>
            </nav>
          )}
        </div>

        {/* Header Right menu assets */}
        <div className="flex items-center gap-3">
          {/* Weather status ticker */}
          <div className="hidden lg:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="material-symbols-outlined text-xs text-yellow-400">sunny</span>
            <span className="font-mono text-[9px] text-[#b9cacb] font-bold">24°C Mexico City</span>
          </div>

          {/* If user logged in, display telemetry controls */}
          {currentUser ? (
            <>
              {/* Notification list toggle bell button */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsNotificationOpen(!isNotificationOpen);
                    setLiveLogCount(0);
                  }}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#b9cacb] hover:text-white cursor-pointer relative"
                  title="System Logs"
                >
                  <span className="material-symbols-outlined text-lg">notifications</span>
                  {liveLogCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#050508]" />
                  )}
                </button>

                {/* Dropdown panel popup */}
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-72 glass-panel rounded-xl overflow-hidden shadow-2xl z-50 border border-white/10 text-xs">
                    <div className="p-3 bg-[#121318] border-b border-white/5 flex justify-between items-center">
                      <span className="font-bold text-[#00f0ff] uppercase tracking-wider font-mono text-[10px]">OPERATIONAL ACTIVITY FEED</span>
                      <button 
                        onClick={() => setNotifications([])}
                        className="text-[9px] font-mono text-[#b9cacb]/50 hover:text-white uppercase"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="max-h-60 overflow-y-auto p-2.5 space-y-2 bg-[#0c0d12]">
                      {notifications.length === 0 ? (
                        <p className="text-center text-[#b9cacb]/30 py-6 font-mono text-[10px]">NO NEW LOGS DETECTED</p>
                      ) : (
                        notifications.map((notif) => (
                          <div key={notif.id} className="p-2 rounded bg-white/5 border border-white/5 text-[11px] leading-snug space-y-1">
                            <div className="flex justify-between text-[8px] font-mono text-[#00f0ff]/80">
                              <span className="font-bold">{notif.category}</span>
                              <span>{notif.time}</span>
                            </div>
                            <p className="text-[#b9cacb]">{notif.text}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Account Avatar widget */}
              <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                <div className="hidden sm:block text-right">
                  <span className="text-[11px] font-extrabold text-white block">C.O.O. Michael Vance</span>
                  <span className="text-[9px] font-mono text-[#00f0ff] block tracking-wide font-bold uppercase">Sector 7 Master Operator</span>
                </div>
                <img
                  alt="Michael Vance Avatar"
                  className="w-8 h-8 rounded-full border border-[#00f0ff]/50 object-cover"
                  src={IMAGES.cooProfile}
                />
                <button
                  onClick={handleSignOut}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/10 border border-white/10 flex items-center justify-center text-[#b9cacb] hover:text-red-400 cursor-pointer transition-colors"
                  title="Secure Lock Session"
                >
                  <span className="material-symbols-outlined text-sm">lock</span>
                </button>
              </div>
            </>
          ) : (
            /* If visitor, show simple auth option */
            <button
              onClick={() => setCurrentView('AUTH')}
              className="px-5 py-2 bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 rounded-lg text-xs font-bold hover:bg-[#00f0ff]/20 transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Mobile responsive toggle */}
          {currentUser && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#b9cacb]"
            >
              <span className="material-symbols-outlined text-lg">menu</span>
            </button>
          )}
        </div>
      </header>

      {/* Mobile Responsive Nav Drawer */}
      {isMobileMenuOpen && currentUser && (
        <div className="md:hidden glass-panel border-b border-white/5 bg-[#0c0d12]/95 p-4 flex flex-col gap-3 relative z-30">
          <button
            onClick={() => {
              setCurrentView('DASHBOARD');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 hover:bg-[#00f0ff]/10 rounded-lg text-xs font-bold text-white uppercase"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              setCurrentView('COMMAND');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 hover:bg-[#00f0ff]/10 rounded-lg text-xs font-bold text-white uppercase"
          >
            Command Center
          </button>
          <button
            onClick={() => {
              triggerGlobalAlert('SHUTTLE DISPATCH PROTOCOL REQUEST');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 hover:bg-[#00f0ff]/10 rounded-lg text-xs font-bold text-[#b9cacb] uppercase"
          >
            Transit Logistics
          </button>
          <button
            onClick={() => {
              triggerGlobalAlert('SAFETY DIAGNOSTICS PENDING');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 hover:bg-[#00f0ff]/10 rounded-lg text-xs font-bold text-[#b9cacb] uppercase"
          >
            Safety Hub
          </button>
        </div>
      )}

      {/* Main Workspace Frame container */}
      <div className="flex-grow flex h-full">
        {/* Left Sidebar Layout - only if session is active */}
        {currentUser && currentView !== 'WELCOME' && (
          <aside className="hidden md:flex flex-col justify-between w-64 border-r border-white/5 bg-[#0d0e13]/60 relative z-10 p-4">
            
            <div className="space-y-6">
              {/* Profile Block */}
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <span className="text-[8px] font-mono text-[#b9cacb]/50 tracking-widest uppercase block font-bold">ACTIVE COMMAND SECTOR</span>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#36ff8b] pulse-dot" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-sans">Sector 7 - ACTIVE</span>
                </div>
              </div>

              {/* Nav Options */}
              <nav className="space-y-1.5">
                {[
                  { id: 'LIVE_INTEL', label: 'Live Intel', icon: 'monitoring' },
                  { id: 'CROWD_FLOW', label: 'Crowd Flow Overlay', icon: 'groups_3' },
                  { id: 'TRANSPORT', label: 'Transport Dispatcher', icon: 'directions_bus' },
                  { id: 'SUSTAINABILITY', label: 'Sustainability Tracker', icon: 'eco' },
                  { id: 'DIGITAL_TWIN', label: 'Digital Twin Wire', icon: 'view_in_ar' },
                  { id: 'REPORTS', label: 'Generated Reports', icon: 'analytics' },
                  { id: 'SETTINGS', label: 'System Settings', icon: 'tune' },
                  { id: 'SUPPORT', label: 'Operations Support', icon: 'contact_support' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSidebarTab(tab.id as SidebarView);
                      if (tab.id === 'REPORTS') {
                        triggerGlobalAlert('TOURNAMENT EXPORT REPORT: Generating full Sector 7 logistics telemetry...');
                      }
                    }}
                    className={`w-full py-3 px-4 rounded-xl flex items-center gap-3 text-xs font-medium transition-all cursor-pointer ${
                      sidebarTab === tab.id
                        ? 'bg-white/10 text-white border border-white/10 shadow-sm font-bold'
                        : 'text-[#b9cacb] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Emergency bottom flashing block button */}
            <div className="pt-4 border-t border-white/5 space-y-3">
              <button
                onClick={() => triggerGlobalAlert('CRITICAL CROWD OVERFLOW LEVEL REGISTERED IN GATEWAY A')}
                className="w-full py-3 bg-[#93000a]/20 hover:bg-[#93000a] text-[#ffb4ab] hover:text-white rounded-xl text-xs font-extrabold tracking-widest uppercase flex items-center justify-center gap-2 border border-[#ffb4ab]/30 cursor-pointer transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-sm">emergency_home</span>
                EMERGENCY ALERT
              </button>
            </div>
          </aside>
        )}

        {/* Content Body Switch panel */}
        <div className="flex-grow relative min-w-0">
          
          {/* Transparent high-tech sidebar informational widgets */}
          {currentUser && sidebarTab === 'CROWD_FLOW' && (
            <div className="absolute top-4 left-4 z-20 glass-panel p-4 rounded-xl border border-[#00f0ff]/50 bg-black/90 max-w-sm space-y-3">
              <h4 className="font-mono text-[10px] text-[#00f0ff] uppercase tracking-widest font-bold">CROWD FLOW INTENSITY MATRIX</h4>
              <p className="text-xs text-[#b9cacb]">
                Real-time spatial density scanning estimates stadium arrival wave at 4.6 people/second en route to northern turnstiles.
              </p>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-sm font-bold text-white block">3,420</span>
                  <span className="text-[8px] font-mono text-[#b9cacb]/50">CURRENT FLOW RATE</span>
                </div>
                <div className="p-2.5 bg-white/5 rounded-lg border border-[#36ff8b]/20">
                  <span className="text-sm font-bold text-[#36ff8b] block">NOMINAL</span>
                  <span className="text-[8px] font-mono text-[#b9cacb]/50">OVERALL STATUS</span>
                </div>
              </div>
            </div>
          )}

          {currentUser && sidebarTab === 'TRANSPORT' && (
            <div className="absolute top-4 left-4 z-20 glass-panel p-4 rounded-xl border border-[#00f0ff]/50 bg-black/90 max-w-md space-y-3">
              <h4 className="font-mono text-[10px] text-[#00f0ff] uppercase tracking-widest font-bold">SMART SHUTTLE DISPATCH CONTROL</h4>
              <p className="text-xs text-[#b9cacb]">
                Metropolitan transit coordinators dispatched 12 double-decker smart buses en route to Estadio Azteca.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs py-1.5 border-b border-white/5 font-mono">
                  <span>FLEET ALPHA</span>
                  <span className="text-[#36ff8b]">12 BUSES DEPLOYED</span>
                </div>
                <div className="flex justify-between text-xs py-1.5 border-b border-white/5 font-mono">
                  <span>FLEET BETA</span>
                  <span className="text-yellow-400">STANDBY SCHEDULED</span>
                </div>
              </div>
            </div>
          )}

          {currentUser && sidebarTab === 'SUSTAINABILITY' && (
            <div className="absolute top-4 left-4 z-20 glass-panel p-4 rounded-xl border border-[#36ff8b]/50 bg-black/90 max-w-sm space-y-3">
              <h4 className="font-mono text-[10px] text-[#36ff8b] uppercase tracking-widest font-bold">ZERO-CARBON telemetry</h4>
              <p className="text-xs text-[#b9cacb]">
                Dynamic power management reduced current cooling array loads by 12% utilizing smart energy cycle patterns.
              </p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span>RENEWABLE INTEGRITY</span>
                  <span>94.2%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#36ff8b]" style={{ width: '94.2%' }} />
                </div>
              </div>
            </div>
          )}

          {currentUser && sidebarTab === 'DIGITAL_TWIN' && (
            <div className="absolute top-4 left-4 z-20 glass-panel p-4 rounded-xl border border-[#00f0ff]/50 bg-black/90 max-w-sm space-y-2 font-mono text-[10px]">
              <span className="text-[#00f0ff] font-bold block">Digital Twin Telemetry Check:</span>
              <p className="text-white/80">
                - Surveillance node check: 100% OK<br />
                - Turnstile scan latency: 4.2ms nominal<br />
                - Structural integrity load: 14% nominal<br />
                - Grid redundancy: 100% active
              </p>
            </div>
          )}

          {currentUser && sidebarTab === 'SETTINGS' && (
            <div className="absolute top-4 left-4 z-20 glass-panel p-5 rounded-xl border border-white/10 bg-black/90 max-w-md space-y-4">
              <h4 className="font-mono text-[10px] text-[#00f0ff] uppercase tracking-widest font-bold">SYSTEM OPERATIONAL CONFIGURATION</h4>
              <div className="space-y-3">
                <label className="block text-xs text-[#b9cacb]">
                  Diagnostic refresh rate (seconds):
                  <input type="range" min="1" max="10" className="w-full mt-1 accent-[#00f0ff]" />
                </label>
                <div className="flex items-center justify-between text-xs">
                  <span>Enable Auto-AI routing redirects</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#00f0ff]" />
                </div>
              </div>
            </div>
          )}

          {currentUser && sidebarTab === 'SUPPORT' && (
            <div className="absolute top-4 left-4 z-20 glass-panel p-5 rounded-xl border border-white/10 bg-black/90 max-w-md space-y-3">
              <h4 className="font-mono text-[10px] text-[#00f0ff] uppercase tracking-widest font-bold font-black">OPERATIONAL MANUAL INDEX</h4>
              <p className="text-xs text-[#b9cacb]">
                Need immediate assistance? Contact the secure Global Sports Logistics Hub Operations hotline at +1-800-PULSE-AI.
              </p>
            </div>
          )}

          {/* Subscreen Rendering engine */}
          {currentView === 'WELCOME' && (
            <WelcomeScreen 
              onExplore={() => {
                if (currentUser) {
                  setCurrentView('DASHBOARD');
                } else {
                  setCurrentView('AUTH');
                }
              }}
              onLaunchAssistant={() => {
                if (!currentUser) {
                  setCurrentView('AUTH');
                } else {
                  setCurrentView('COMMAND');
                  setIsAiDrawerOpen(true);
                }
              }}
            />
          )}

          {currentView === 'AUTH' && (
            <AuthScreen onLoginSuccess={handleLogin} />
          )}

          {currentView === 'DASHBOARD' && currentUser && (
            <AnalyticsScreen />
          )}

          {currentView === 'COMMAND' && currentUser && (
            <CommandCenterScreen onTriggerGlobalAlert={triggerGlobalAlert} />
          )}
        </div>
      </div>

      {/* Persistent AI Assistant trigger Floating Action Button */}
      {currentUser && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsAiDrawerOpen(!isAiDrawerOpen)}
            className="w-14 h-14 rounded-full bg-[#00f0ff] hover:brightness-110 text-[#00363a] flex items-center justify-center cursor-pointer shadow-[0_4px_20px_rgba(0,240,255,0.45)] transition-all active:scale-95 duration-300"
            title="Launch FIFA Copilot"
          >
            <span className="material-symbols-outlined text-2xl font-bold animate-pulse">
              smart_toy
            </span>
          </button>
        </div>
      )}

      {/* AI Assistant Sliding drawer panel overlay */}
      <AiAssistantDrawer 
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        onExecuteCommand={handleAiCommandTrigger}
      />
    </div>
  );
}

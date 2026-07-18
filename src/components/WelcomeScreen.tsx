import { useEffect, useState, useRef } from 'react';
import { IMAGES } from '../types';

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
}

function Counter({ end, duration, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          let startTime: number | null = null;
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={elementRef} className="text-4xl font-extrabold text-[#dbfcff] text-glow tracking-tight">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

interface WelcomeScreenProps {
  onExplore: () => void;
  onLaunchAssistant: () => void;
}

export default function WelcomeScreen({ onExplore, onLaunchAssistant }: WelcomeScreenProps) {
  const [scanProgress, setScanProgress] = useState(75);

  // Digital twin scan animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + (Math.random() * 4 - 2);
        if (next < 40) return 43;
        if (next > 95) return 92;
        return Math.round(next);
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const commandModules = [
    {
      title: 'AI Navigation',
      icon: 'near_me',
      color: 'text-[#00f0ff] bg-[#00f0ff]/10',
      desc: 'Hyper-accurate spatial routing using live visitor density maps and predictive flow algorithms.'
    },
    {
      title: 'Crowd Intelligence',
      icon: 'group',
      color: 'text-[#36ff8b] bg-[#36ff8b]/10',
      desc: 'Real-time sentiment and density analysis to proactively manage bottlenecks before they occur.'
    },
    {
      title: 'Emergency Copilot',
      icon: 'emergency_share',
      color: 'text-[#ffb4ab] bg-[#ffb4ab]/10',
      desc: 'Automated emergency protocol activation with localized evacuation guidance for every attendee.'
    },
    {
      title: 'Accessibility Assistant',
      icon: 'accessibility_new',
      color: 'text-[#dcb8ff] bg-[#dcb8ff]/10',
      desc: 'Personalized support for visitors with limited mobility, providing low-stress pathfinding.'
    },
    {
      title: 'Transport Planner',
      icon: 'commute',
      color: 'text-[#00f0ff] bg-[#00f0ff]/10',
      desc: 'Synchronized coordination between stadium exit gates and metropolitan transit hubs.'
    },
    {
      title: 'Sustainability Monitor',
      icon: 'eco',
      color: 'text-[#36ff8b] bg-[#36ff8b]/10',
      desc: 'Dynamic energy management and waste reduction tracking for zero-carbon stadium operations.'
    },
    {
      title: 'Multilingual AI',
      icon: 'translate',
      color: 'text-[#dcb8ff] bg-[#dcb8ff]/10',
      desc: 'Instant translation and cultural mediation across 60+ languages for a truly global audience.'
    },
    {
      title: 'Volunteer Assistant',
      icon: 'volunteer_activism',
      color: 'text-[#00f0ff] bg-[#00f0ff]/10',
      desc: 'Smart task assignment and real-time training overlays for the stadium volunteer workforce.'
    }
  ];

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-[#050508] pb-16">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex flex-col justify-center px-6 md:px-12 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url('${IMAGES.heroBg}')` }}
          />
          <div className="absolute inset-0 stadium-overlay" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-4 py-2 glass-panel rounded-full border border-[#00f0ff]/30">
            <span className="pulse-dot" />
            <span className="font-sans text-[11px] font-bold text-[#00f0ff] uppercase tracking-wider">
              System Online: All Sectors Nominal
            </span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black text-[#dbfcff] leading-none tracking-tight">
            Welcome to <br />
            <span className="text-[#00f0ff] text-glow">FIFA Pulse AI</span>
          </h1>

          <p className="font-sans text-lg sm:text-xl md:text-2xl text-[#b9cacb] max-w-2xl leading-relaxed">
            The Generative AI Stadium Operating System for the FIFA World Cup 2026. Precision intelligence for the global stage.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={onExplore}
              className="px-6 py-3.5 bg-[#00f0ff] text-[#00363a] rounded-xl font-sans text-sm font-bold hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              <span className="material-symbols-outlined">dashboard</span>
              Explore Dashboard
            </button>
            <button 
              onClick={onLaunchAssistant}
              className="px-6 py-3.5 glass-panel text-[#00f0ff] border border-[#00f0ff]/40 rounded-xl font-sans text-sm font-bold hover:bg-[#00f0ff]/10 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">smart_toy</span>
              Launch AI Assistant
            </button>
            <button 
              onClick={onExplore}
              className="px-6 py-3.5 glass-panel text-[#e3e1e9] rounded-xl font-sans text-sm font-bold hover:bg-[#34343a]/50 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">visibility</span>
              Live Stadium View
            </button>
          </div>
        </div>
      </section>

      {/* Stats Counter Panel */}
      <section className="py-12 px-6 md:px-12 bg-[#0d0e13]/80 border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 glass-panel rounded-2xl text-center hover:-translate-y-1 transition-all duration-300">
            <Counter end={74999} duration={2000} suffix="+" />
            <div className="text-[11px] font-sans font-bold text-[#b9cacb] uppercase tracking-wider mt-2">
              Visitors Managed
            </div>
          </div>
          <div className="p-6 glass-panel rounded-2xl text-center hover:-translate-y-1 transition-all duration-300">
            <Counter end={81} duration={1500} suffix="%" />
            <div className="text-[11px] font-sans font-bold text-[#b9cacb] uppercase tracking-wider mt-2">
              Nav Accuracy
            </div>
          </div>
          <div className="p-6 glass-panel rounded-2xl text-center hover:-translate-y-1 transition-all duration-300">
            <Counter end={32} duration={1200} suffix="%" />
            <div className="text-[11px] font-sans font-bold text-[#b9cacb] uppercase tracking-wider mt-2">
              Reduced Congestion
            </div>
          </div>
          <div className="p-6 glass-panel rounded-2xl text-center hover:-translate-y-1 transition-all duration-300">
            <Counter end={45} duration={1200} suffix="%" />
            <div className="text-[11px] font-sans font-bold text-[#b9cacb] uppercase tracking-wider mt-2">
              Faster Response
            </div>
          </div>
        </div>
      </section>

      {/* Command Modules Grid */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="font-sans text-3xl font-extrabold text-[#dbfcff] mb-3">Command Modules</h2>
          <p className="text-[#b9cacb] max-w-2xl text-sm">
            Harnessing advanced generative neural networks to ensure a seamless, safe, and sustainable tournament experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {commandModules.map((item, index) => (
            <div key={index} className="glass-card p-6 rounded-2xl flex flex-col justify-between min-h-[190px]">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${item.color}`}>
                  <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                    {item.icon}
                  </span>
                </div>
                <span className="pulse-dot animate-pulse" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-[#e3e1e9] mb-1.5 text-base">{item.title}</h3>
                <p className="text-[#b9cacb] text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stadium Digital Twin Preview */}
      <section className="py-16 px-6 md:px-12 bg-[#1a1b21]/40 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-sans text-3xl font-extrabold text-[#dbfcff]">Stadium Digital Twin</h2>
            <p className="text-[#b9cacb] text-sm leading-relaxed max-w-lg">
              Every millimeter of the World Cup infrastructure is mapped in a real-time, AI-driven digital twin. Monitor every sensor, every gate, and every heartbeat from a single high-fidelity interface.
            </p>
            <div className="space-y-3 max-w-md">
              <div className="flex items-center gap-4 glass-panel p-4 rounded-xl border border-[#00f0ff]/20">
                <span className="material-symbols-outlined text-[#00f0ff]">sensors</span>
                <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-wider">
                  42,000+ Active Sensor Nodes Detected
                </span>
              </div>
              <div className="flex items-center gap-4 glass-panel p-4 rounded-xl border border-[#36ff8b]/20">
                <span className="material-symbols-outlined text-[#36ff8b]">query_stats</span>
                <span className="font-mono text-xs text-[#36ff8b] uppercase tracking-wider">
                  Predictive Accuracy: 99.8% Latency: 4ms
                </span>
              </div>
            </div>
          </div>

          <div className="relative h-[340px] rounded-2xl overflow-hidden glass-panel border border-white/10 group">
            <img 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
              src={IMAGES.digitalTwinBg}
              alt="Stadium Digital Twin"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="font-mono text-[10px] text-[#00f0ff] tracking-widest uppercase mb-1.5 font-bold">
                Sector Scan Active
              </span>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#00f0ff] rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 pb-6 px-6 text-center text-xs text-[#b9cacb] max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col items-center gap-4">
          <img 
            alt="FIFA Pulse AI Logo" 
            className="w-12 h-12 object-contain filter drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]" 
            src={IMAGES.logo}
          />
          <p className="max-w-sm leading-relaxed">
            The official Stadium AI Partner of the FIFA World Cup 2026. Empowering the future of sports logistics.
          </p>
        </div>
        <div className="flex justify-center gap-8 font-mono text-[10px] uppercase tracking-widest text-[#b9cacb]/60 pt-4 border-t border-white/5">
          <a className="hover:text-[#00f0ff] transition-colors" href="#">Privacy Protocol</a>
          <a className="hover:text-[#00f0ff] transition-colors" href="#">System Status</a>
          <a className="hover:text-[#00f0ff] transition-colors" href="#">Documentation</a>
        </div>
      </footer>
    </div>
  );
}

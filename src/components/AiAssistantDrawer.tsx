import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'ai' | 'operator';
  text: string;
  time: string;
  commands?: string[];
}

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteCommand: (cmd: string) => void;
}

export default function AiAssistantDrawer({ isOpen, onClose, onExecuteCommand }: AiAssistantDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'SYSTEM INITIALIZED: FIFA Pulse Operating Assistant active. Directing logistical intelligence for Sector 7.',
      time: '12:00'
    },
    {
      id: '2',
      sender: 'ai',
      text: 'I can execute automated control protocols. Choose a directive or send a transmission:',
      time: '12:01',
      commands: [
        'ACTIVATE GENERAL CALM SEQUENCE',
        'REROUTE FLOW FROM GATE A TO GATE B',
        'TRIGGER SECTOR 7 VOLUNTEER SYNC',
        'RETRIEVE TOTAL SENSOR LOGS'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const timeStr = new Date().toTimeString().split(' ')[0];
    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'operator',
      text: textToSend,
      time: timeStr
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI parsing stadium metrics
    setTimeout(() => {
      setIsTyping(false);
      let responseText = '';
      let actionCmd: string | undefined;

      const lowerText = textToSend.toLowerCase();
      if (lowerText.includes('calm') || lowerText.includes('sequence')) {
        responseText = 'COMPLYING: Broadcasting localized audio calm sequence across Sector 7 zones.';
        actionCmd = 'CALM_SEQUENCE_ACTIVED';
      } else if (lowerText.includes('gate') || lowerText.includes('reroute') || lowerText.includes('flow')) {
        responseText = 'COMPLYING: Instructing digital wayfinding billboards to divert incoming spectators from Gate A to Gate B.';
        actionCmd = 'FLOW_REROUTED';
      } else if (lowerText.includes('volunteer') || lowerText.includes('sync')) {
        responseText = 'COMPLYING: Refreshing task checklist overlays on active volunteer wristbands (3,240 workers synced).';
        actionCmd = 'VOLUNTEER_SYNCED';
      } else if (lowerText.includes('sensor') || lowerText.includes('logs') || lowerText.includes('status')) {
        responseText = 'REPORT: All 42,000+ IoT nodes reporting nominal values. Network load 4ms latency, optimal power.';
        actionCmd = 'SENSOR_REPORT_GENERATED';
      } else {
        responseText = `TRANSMISSION RECEIVED. Model parsing: "${textToSend}". Executing general logistical assistance sequence. No bottlenecks detected.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: responseText,
          time: new Date().toTimeString().split(' ')[0]
        }
      ]);

      if (actionCmd) {
        onExecuteCommand(actionCmd);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-[#0c0d12]/95 border-l border-white/10 z-50 shadow-2xl flex flex-col justify-between backdrop-blur-md animate-slide-in font-sans">
      
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#00f0ff]/5">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#00f0ff] animate-pulse">
            smart_toy
          </span>
          <div>
            <h3 className="font-bold text-sm text-[#00f0ff] text-glow">
              FIFA PULSE COPILOT
            </h3>
            <span className="text-[9px] font-mono text-[#b9cacb]/60 uppercase tracking-widest block font-bold">
              Autonomous Stadium Agent
            </span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#b9cacb] hover:text-white cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>

      {/* Chat Messages */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'operator' ? 'items-end' : 'items-start'}`}>
            <span className="text-[8px] font-mono text-[#b9cacb]/50 mb-1">
              {msg.sender === 'operator' ? 'OPERATOR' : 'PULSE_AI'} // {msg.time}
            </span>
            <div className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed border ${
              msg.sender === 'operator'
                ? 'bg-[#00f0ff]/10 border-[#00f0ff]/30 text-white rounded-br-none'
                : 'bg-white/5 border-white/5 text-[#b9cacb] rounded-bl-none'
            }`}>
              {msg.text}

              {/* Commands Shortcuts list */}
              {msg.commands && (
                <div className="mt-3.5 space-y-1.5 pt-2 border-t border-white/5">
                  {msg.commands.map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => handleSendMessage(cmd)}
                      className="w-full text-left p-2 rounded bg-black/40 hover:bg-[#00f0ff]/10 text-[9px] font-mono font-bold text-[#00f0ff] border border-white/5 transition-all cursor-pointer"
                    >
                      &gt; {cmd}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex flex-col items-start">
            <span className="text-[8px] font-mono text-[#b9cacb]/50 mb-1">PULSE_AI // THINKING</span>
            <div className="p-3 bg-white/5 border border-white/5 rounded-2xl rounded-bl-none text-xs text-[#b9cacb] flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-bounce delay-200" />
              <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-bounce delay-300" />
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="p-4 border-t border-white/10 bg-[#0d0e13]/80 flex gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Transmit a command code..."
          className="flex-grow bg-black/50 border border-white/10 focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/30 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none"
        />
        <button
          type="submit"
          className="w-11 h-11 bg-[#00f0ff] text-[#00363a] rounded-xl flex items-center justify-center hover:brightness-110 active:scale-95 cursor-pointer transition-all shadow-[0_0_10px_rgba(0,240,255,0.3)]"
        >
          <span className="material-symbols-outlined text-lg font-bold">send</span>
        </button>
      </form>
    </div>
  );
}

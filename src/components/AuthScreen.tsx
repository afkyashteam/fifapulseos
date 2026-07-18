import * as React from 'react';
import { useState, useEffect } from 'react';
import { IMAGES, User } from '../types';

interface AuthScreenProps {
  onLoginSuccess: (user: User) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [selectedRole, setSelectedRole] = useState<'FAN' | 'ORGANIZER' | 'VOLUNTEER' | 'OPS ADMIN'>('FAN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [authStatusMessage, setAuthStatusMessage] = useState('VERIFYING BIOMETRICS...');

  const handleRoleSelect = (role: 'FAN' | 'ORGANIZER' | 'VOLUNTEER' | 'OPS ADMIN') => {
    setSelectedRole(role);
  };

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthorizing(true);
    setAuthStatusMessage('SCANNING CYBER-IDENTITY...');

    // Simulate futuristic login handshake
    setTimeout(() => {
      setAuthStatusMessage('DECRYPTING CREDENTIALS (AES-256)...');
      setTimeout(() => {
        setAuthStatusMessage('AUTHORIZATION GRANTED. SECURING SECTOR 7...');
        setTimeout(() => {
          const mockUser: User = {
            email: email || `${selectedRole.toLowerCase().replace(' ', '_')}@fifapulse.ai`,
            role: selectedRole,
            name: selectedRole === 'OPS ADMIN' ? 'Michael Vance' : selectedRole === 'ORGANIZER' ? 'Sofia Rodriguez' : 'Alex Mercer',
            sector: 'Sector 7',
            avatarUrl: selectedRole === 'OPS ADMIN' ? IMAGES.michaelVance : IMAGES.cooProfile
          };
          onLoginSuccess(mockUser);
        }, 800);
      }, 800);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#050508] text-[#e3e1e9] font-sans">
      {/* Abstract Stadium Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-25 mix-blend-overlay"
          style={{ backgroundImage: `url('${IMAGES.authBg}')` }}
        />
        {/* Ambient Luminescent Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00f0ff]/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#36ff8b]/5 blur-[130px] rounded-full" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4">
        {isAuthorizing ? (
          /* High-Tech Authorization Overlay screen */
          <div className="glass-panel w-full max-w-[440px] rounded-2xl p-8 text-center space-y-6 border border-[#00f0ff]/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] animate-pulse-fast">
            <div className="relative w-24 h-24 mx-auto border border-[#00f0ff]/50 rounded-full flex items-center justify-center bg-black/40">
              <span className="material-symbols-outlined text-5xl text-[#00f0ff] animate-pulse">
                fingerprint
              </span>
              <div className="absolute inset-0 border-2 border-dashed border-[#00f0ff] rounded-full animate-spin duration-10000" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-wider text-[#00f0ff] uppercase text-glow">
                Establishing Link
              </h2>
              <div className="font-mono text-xs text-[#b9cacb] max-w-xs mx-auto truncate">
                {authStatusMessage}
              </div>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-[#00f0ff] to-[#36ff8b] rounded-full animate-pulse" style={{ width: '100%' }} />
            </div>
          </div>
        ) : (
          /* Login Container Card */
          <div className="glass-panel w-full max-w-[460px] rounded-2xl overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
            {/* Header */}
            <div className="px-8 pt-8 pb-5 text-center border-b border-white/5 bg-black/20">
              <h1 className="text-2xl sm:text-3xl font-black text-[#00f0ff] tracking-tight text-glow">
                FIFA PULSE AI
              </h1>
              <p className="font-mono text-[10px] text-[#b9cacb] uppercase tracking-widest mt-1">
                Secure Command Access
              </p>
            </div>

            {/* Segment Selector */}
            <div className="px-8 pt-6">
              <div className="flex gap-1 p-1 bg-black/40 rounded-xl border border-white/5">
                {(['FAN', 'ORGANIZER', 'VOLUNTEER', 'OPS ADMIN'] as const).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleSelect(role)}
                    className={`flex-1 text-[9px] font-mono py-2 px-1 rounded-lg transition-all duration-300 font-bold ${
                      selectedRole === role
                        ? 'bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 shadow-[0_0_8px_rgba(0,240,255,0.2)]'
                        : 'text-[#b9cacb] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Face ID Illustration */}
            <div className="px-8 pt-6 flex justify-center">
              <div className="relative w-24 h-24 rounded-xl border border-[#00f0ff]/30 flex items-center justify-center bg-[#1a1b21]/30 overflow-hidden shadow-inner">
                <div className="scan-line" />
                <span className="material-symbols-outlined text-[#00f0ff] text-5xl animate-pulse" style={{ fontVariationSettings: "'wght' 200" }}>
                  face_6
                </span>
                {/* Corner brackets */}
                <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff]/60" />
                <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#00f0ff]/60" />
                <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#00f0ff]/60" />
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff]/60" />
              </div>
            </div>

            {/* Interactive Form */}
            <form onSubmit={handleAuthorize} className="px-8 py-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[#b9cacb] ml-1">
                  Access Identity
                </label>
                <div className="relative border border-white/10 focus-within:border-[#00f0ff] focus-within:ring-1 focus-within:ring-[#00f0ff]/30 rounded-lg bg-black/40 transition-all">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#b9cacb] text-lg">
                    alternate_email
                  </span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full bg-transparent border-0 py-3 pl-10 pr-4 text-xs text-[#e3e1e9] placeholder-white/20 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-mono uppercase text-[#b9cacb]">
                    Security Code
                  </label>
                  <a href="#" className="text-[9px] font-mono text-[#00f0ff]/70 hover:text-[#00f0ff] transition-colors">
                    FORGOT?
                  </a>
                </div>
                <div className="relative border border-white/10 focus-within:border-[#00f0ff] focus-within:ring-1 focus-within:ring-[#00f0ff]/30 rounded-lg bg-black/40 transition-all">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#b9cacb] text-lg">
                    lock
                  </span>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Security password"
                    className="w-full bg-transparent border-0 py-3 pl-10 pr-4 text-xs text-[#e3e1e9] placeholder-white/20 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#00f0ff] text-[#00363a] rounded-lg text-sm font-extrabold tracking-wide uppercase hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)] mt-2"
              >
                Authorize Session
              </button>

              <div className="relative py-1 flex items-center gap-3">
                <div className="flex-grow border-t border-white/5" />
                <span className="text-[8px] font-mono text-[#b9cacb]/50">OR SECURE VIA</span>
                <div className="flex-grow border-t border-white/5" />
              </div>

              {/* Social Login buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('partner.google@fifapulse.ai');
                    setPassword('google_secure_code_1');
                  }}
                  className="flex items-center justify-center gap-2 py-2 px-3 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <span className="text-[11px] font-black text-black">G</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold">GOOGLE</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('partner.apple@fifapulse.ai');
                    setPassword('apple_secure_code_1');
                  }}
                  className="flex items-center justify-center gap-2 py-2 px-3 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-white text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                    apps
                  </span>
                  <span className="text-[9px] font-mono font-bold">APPLE</span>
                </button>
              </div>
            </form>

            {/* Footer options */}
            <div className="px-8 pb-6 flex flex-col items-center gap-2 text-center text-[11px] border-t border-white/5 pt-4 bg-black/10">
              <p className="text-[#b9cacb]/80">
                Don't have an asset ID?{' '}
                <a href="#" className="text-[#00f0ff] font-bold hover:underline">
                  Register Fleet
                </a>
              </p>
              <div className="flex gap-4 text-[9px] font-mono text-[#b9cacb]/40 mt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">security</span> ENCRYPTED AES-256
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">public</span> REGION: GLOBAL 01
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Status Bar */}
      <footer className="relative z-10 px-8 py-4 flex justify-between items-center border-t border-white/5 bg-black/40 text-[10px] font-mono text-[#b9cacb]/40">
        <div className="flex gap-6">
          <span className="text-[#00f0ff] font-bold">SYS_STATUS: OPTIMAL</span>
          <span>LATENCY: 12ms</span>
        </div>
        <div>
          © 2026 FIFA TECHNOLOGY HUB
        </div>
      </footer>
    </div>
  );
}

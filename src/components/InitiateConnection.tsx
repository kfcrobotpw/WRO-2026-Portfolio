import React, { useState } from 'react';
import { Send, CheckCircle2, Radio, Sparkles, Mail, User, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InitiateConnection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState('Competition & Collaboration');
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('transmitting');

    // Simulate cyber transmission link
    setTimeout(() => {
      setStatus('success');
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#22d3ee', '#38bdf8', '#a855f7'],
      });

      // Save transmission to local storage history
      const prevMessages = JSON.parse(localStorage.getItem('robot_portfolio_transmissions') || '[]');
      prevMessages.push({
        id: Date.now(),
        name: name || 'Anonymous Operative',
        email,
        message: message || 'Initiated direct communication ping.',
        topic,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('robot_portfolio_transmissions', JSON.stringify(prevMessages));

      // Reset form after short delay
      setTimeout(() => {
        setEmail('');
        setName('');
        setMessage('');
      }, 1000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Centered Connection Card (Direct from Image 2) */}
      <div className="max-w-xl mx-auto">
        <div
          id="initiate-connection-card"
          className="relative rounded-2xl border border-cyan-900/50 bg-[#08111e]/90 backdrop-blur-xl p-8 sm:p-10 shadow-[0_0_40px_rgba(4,18,34,0.8)] overflow-hidden"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-1">
              <Radio size={12} className="animate-pulse text-cyan-400" />
              <span>TRANSMISSION_LINK_ONLINE</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Orbitron'] text-white tracking-wider">
              Initiate Connection
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Ready to collaborate on the next robotic innovation?
            </p>
          </div>

          {/* Form */}
          {status === 'success' ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 rounded-full bg-cyan-950 border-2 border-cyan-400 text-cyan-300 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.5)]">
                <CheckCircle2 size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-['Orbitron'] text-white">
                  TRANSMISSION RECEIVED
                </h3>
                <p className="text-xs text-cyan-400 font-mono">
                  신호가 성공적으로 전송되었습니다. 곧 연락드리겠습니다!
                </p>
              </div>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 px-6 py-2 text-xs font-bold font-['Orbitron'] text-slate-300 bg-slate-900 border border-slate-700 hover:border-cyan-400 rounded-lg cursor-pointer"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Optional Name */}
              <div className="space-y-1">
                <label className="block text-[11px] font-mono text-slate-400">
                  Your Name / Organization (Optional)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. WRO Team Lead, RoboCup Sponsor"
                    className="w-full px-4 py-3 bg-[#050c17] border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none font-mono transition-colors"
                  />
                </div>
              </div>

              {/* Email Input Field (Direct from Image 2: "Your Communication Link (Email)") */}
              <div className="space-y-1">
                <label className="block text-[11px] font-mono text-slate-300 font-semibold">
                  Your Communication Link (Email) <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <input
                    id="contact-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full px-4 py-3 bg-[#050c17] border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none font-mono transition-colors"
                  />
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-1">
                <label className="block text-[11px] font-mono text-slate-400">
                  Message Payload (Optional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="대회 협업, 프로젝트 문의, 로봇 설계 피드백 등 자유롭게 남겨주세요."
                  className="w-full px-4 py-3 bg-[#050c17] border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none font-sans transition-colors resize-none"
                />
              </div>

              {/* Transmit Button (Direct from Image 2: "TRANSMIT MESSAGE") */}
              <div className="pt-2">
                <button
                  id="transmit-message-btn"
                  type="submit"
                  disabled={status === 'transmitting'}
                  className="w-full py-3.5 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 active:scale-[0.99] text-[#060b13] font-bold font-['Orbitron'] tracking-widest text-xs uppercase shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'transmitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>TRANSMITTING ENCRYPTED SIGNAL...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>TRANSMIT MESSAGE</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct email display */}
              <div className="pt-3 text-center border-t border-slate-800/80">
                <p className="text-[11px] text-slate-500 font-mono">
                  Direct Inquiries: <a href="mailto:kfcrobotpw@gmail.com" className="text-cyan-400 hover:underline">kfcrobotpw@gmail.com</a>
                </p>
              </div>

            </form>
          )}

        </div>
      </div>

    </section>
  );
};

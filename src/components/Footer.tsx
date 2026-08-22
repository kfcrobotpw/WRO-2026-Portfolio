import React, { useState } from 'react';
import { RobotLogo } from './RobotLogo';
import { ArrowUp, X, Lock } from 'lucide-react';

interface FooterProps {
  onNavigateToAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToAdmin }) => {
  const [modalContent, setModalContent] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-cyan-950/60 bg-[#040810] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top / Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Robot Portfolio Logo */}
          <div className="flex items-center gap-3">
            <RobotLogo size="sm" />
          </div>

          {/* Center: Copyright Notice with discreet Admin Portal Link */}
          <div className="flex items-center gap-2 text-center text-slate-400 font-mono text-[11px]">
            <span>© 2026 My Robot Portfolio. All Rights Reserved.</span>
            {onNavigateToAdmin && (
              <button
                onClick={onNavigateToAdmin}
                className="opacity-30 hover:opacity-100 hover:text-cyan-400 p-1 transition-opacity cursor-pointer inline-flex items-center gap-1"
                title="관리자 제어 센터 (/admin)"
                aria-label="Admin Portal"
              >
                <Lock size={10} />
              </button>
            )}
          </div>

          {/* Right: Policy Links */}
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <button
              onClick={() => setModalContent('privacy')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => setModalContent('terms')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp size={14} />
            </button>
          </div>

        </div>
      </div>

      {/* Policy Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#08111e] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 space-y-4 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold font-['Orbitron'] text-white">
                {modalContent === 'privacy' ? 'PRIVACY POLICY' : 'TERMS OF SERVICE'}
              </h3>
              <button
                onClick={() => setModalContent(null)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-3 font-sans leading-relaxed">
              {modalContent === 'privacy' ? (
                <>
                  <p>
                    본 포트폴리오는 방문자의 개인정보를 소중히 다루며, 연락 양식을 통해 수집된 이메일 주소 및 메시지는 오직 소통 및 협업 목적으로만 안전하게 보관됩니다.
                  </p>
                  <p>
                    제3자에게 제공되지 않으며, 원하실 경우 언제든지 삭제를 요청하실 수 있습니다.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    본 웹사이트에 수록된 WRO 로봇 하드웨어 도면, 알고리즘 소스 코드 및 기술 연구일지는 작성자의 창의적 저작물입니다.
                  </p>
                  <p>
                    비상업적 연구 및 교육 목적의 열람을 환영하며, 무단 복제 및 상업적 도용은 금지됩니다.
                  </p>
                </>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setModalContent(null)}
                className="px-4 py-2 text-xs font-bold font-['Orbitron'] text-[#060b13] bg-cyan-400 hover:bg-cyan-300 rounded"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

    </footer>
  );
};

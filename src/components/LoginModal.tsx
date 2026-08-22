import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, AlertCircle, X, Globe } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login, loginWithGoogle } = usePortfolio();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  useEffect(() => {
    if (isLoginModalOpen) {
      setPassword('');
      setErrorMsg('');
      setShowPassword(false);
    }
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg('비밀번호를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      const success = login(password);
      setIsSubmitting(false);

      if (!success) {
        setErrorMsg('비밀번호가 일치하지 않습니다. 다시 시도해주세요.');
      }
    }, 250);
  };

  const handleGoogleLogin = async () => {
    setIsGoogleSubmitting(true);
    setErrorMsg('');
    const ok = await loginWithGoogle();
    setIsGoogleSubmitting(false);
    if (!ok) {
      setErrorMsg('Google 로그인에 실패했거나 취소되었습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="login-modal-box"
        className="relative w-full max-w-md bg-[#08111e] border border-cyan-500/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(34,211,238,0.3)] space-y-5"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              <Lock size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Orbitron'] text-white tracking-wider flex items-center gap-2">
                ADMIN ACCESS
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700 font-mono">
                  Firebase
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">포트폴리오 클라우드 실시간 편집 인증</p>
            </div>
          </div>

          <button
            id="close-login-modal-btn"
            onClick={closeLoginModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Google Sign In Option */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400/80 hover:bg-slate-800 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer disabled:opacity-60"
          >
            {isGoogleSubmitting ? (
              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                />
              </svg>
            )}
            <span>Sign in with Google (Firebase)</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-[#08111e] px-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest absolute">
              또는 관리자 비밀번호
            </span>
          </div>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-2">
            <label className="block text-xs font-mono text-cyan-300 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound size={14} className="text-cyan-400" />
                SECURITY KEYCODE
              </span>
            </label>

            <div className="relative">
              <input
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-3 bg-[#050c17] border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none font-mono tracking-wider pr-11 transition-all"
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 p-1 transition-colors"
                title={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-950/50 border border-red-500/50 text-red-300 text-xs font-mono">
                <AlertCircle size={14} className="flex-shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          <div className="pt-1">
            <button
              id="submit-login-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 active:scale-[0.99] text-[#060b13] font-bold font-['Orbitron'] tracking-widest text-xs uppercase shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>UNLOCK EDITOR ACCESS</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-[11px] text-slate-500 font-mono flex items-center justify-center gap-1.5">
              <Globe size={12} className="text-cyan-500" />
              Firestore Cloud Database 실시간 자동 동기화
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};

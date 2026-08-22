import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { RobotLogo } from './RobotLogo';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowLeft, 
  Sparkles, 
  Cloud, 
  Camera, 
  Download, 
  RotateCcw, 
  LogOut, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  ExternalLink,
  Edit3
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PhotoManagerModal } from './modals/PhotoManagerModal';

interface AdminPortalProps {
  onNavigateHome: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onNavigateHome }) => {
  const { 
    isAdmin, 
    adminUser, 
    login, 
    logout, 
    isFirebaseSyncing,
    heroData,
    competitions,
    skills,
    achievements,
    projects,
    resetAllToDefault
  } = usePortfolio();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPhotoManager, setShowPhotoManager] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [backupDownloaded, setBackupDownloaded] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg('관리자 ID를 입력해주세요.');
      return;
    }
    if (!password) {
      setErrorMsg('비밀번호를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await login(username, password);
      setIsSubmitting(false);

      if (!res.success) {
        setErrorMsg(res.message || '아이디 또는 비밀번호가 일치하지 않습니다.');
      } else {
        try {
          confetti({
            particleCount: 70,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#22d3ee', '#10b981', '#a855f7'],
          });
        } catch {
          // Ignore confetti errors
        }
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('로그인 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleExportBackup = () => {
    const data = {
      heroData,
      competitions,
      skills,
      achievements,
      projects,
      exportDate: new Date().toISOString(),
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `robot_portfolio_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setBackupDownloaded(true);
    setTimeout(() => setBackupDownloaded(false), 3000);
  };

  const handleReset = () => {
    resetAllToDefault();
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen bg-[#040811] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Background Cyber Grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.15) 1px, transparent 1px), linear-gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.05) 1px, transparent 1px)`,
          backgroundSize: '36px 36px, 36px 36px, 36px 36px',
        }}
      />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Header */}
      <header className="relative z-10 border-b border-cyan-950/80 bg-[#060b13]/80 backdrop-blur-md px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RobotLogo size="sm" />
            <div className="border-l border-slate-800 pl-3">
              <span className="text-xs font-mono font-bold text-cyan-400">ADMIN CONTROL CENTER</span>
              <span className="text-[10px] block text-slate-500 font-mono">/admin portal</span>
            </div>
          </div>

          <button
            onClick={onNavigateHome}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>공개 포트폴리오 (/)</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 py-8 sm:py-12 flex items-center justify-center">
        {!isAdmin ? (
          /* --- 1. LOGIN SCREEN --- */
          <div className="w-full max-w-md bg-[#08111e]/95 border border-cyan-500/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(34,211,238,0.2)] space-y-6">
            
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/60 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                <Lock size={26} />
              </div>
              <h2 className="text-xl font-bold font-['Orbitron'] tracking-wider text-white">
                ADMIN LOGIN
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                지정된 관리자 계정(ID/PW)으로 서버 인증을 진행합니다.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* ID Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-cyan-300 font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User size={14} className="text-cyan-400" />
                    <span>관리자 ID</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="관리자 ID를 입력하세요"
                    autoComplete="off"
                    className="w-full px-4 py-2.5 bg-[#040811] border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none font-mono tracking-wider transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-cyan-300 font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <KeyRound size={14} className="text-cyan-400" />
                    <span>비밀번호</span>
                  </span>
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="비밀번호 입력"
                    className="w-full px-4 py-2.5 bg-[#040811] border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none font-mono tracking-wider pr-11 transition-all"
                  />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 p-1 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-mono">
                    <AlertCircle size={14} className="flex-shrink-0 text-red-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 active:scale-[0.99] text-[#060b13] font-bold font-['Orbitron'] tracking-widest text-xs uppercase shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>서버 해시 검증 중...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} />
                      <span>ADMIN LOGIN</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2 space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                  <CheckCircle2 size={13} />
                  <span>PBKDF2 Salted Hash Database Protection Active</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">
                  인증된 사용자만 포트폴리오를 추가·수정·삭제할 수 있습니다.
                </p>
              </div>

            </form>

          </div>
        ) : (
          /* --- 2. AUTHENTICATED ADMIN DASHBOARD --- */
          <div className="w-full space-y-6">
            
            {/* Status Card */}
            <div className="bg-[#08111e]/90 border border-cyan-500/40 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-400 text-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-['Orbitron'] text-white flex items-center gap-2">
                      관리자 인증 완료
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 font-mono">
                        ACTIVE SESSION
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      계정: <span className="text-cyan-300 font-bold">{adminUser?.username || 'jww9882'}</span> | 세션 유효함
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onNavigateHome}
                    className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-mono text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] cursor-pointer"
                  >
                    <Edit3 size={14} />
                    <span>실시간 포트폴리오 편집 화면으로 이동</span>
                  </button>

                  <button
                    onClick={logout}
                    className="px-3.5 py-2 rounded-xl bg-red-950/60 border border-red-500/50 hover:bg-red-900 text-red-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>로그아웃</span>
                  </button>
                </div>
              </div>

              {/* Data Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono">
                <div className="p-3 rounded-xl bg-[#040811] border border-slate-800">
                  <span className="text-[11px] text-slate-400">대회 여정</span>
                  <p className="text-lg font-bold text-cyan-300">{competitions.length}개 기록</p>
                </div>
                <div className="p-3 rounded-xl bg-[#040811] border border-slate-800">
                  <span className="text-[11px] text-slate-400">보유 기술</span>
                  <p className="text-lg font-bold text-cyan-300">{skills.length}개 역량</p>
                </div>
                <div className="p-3 rounded-xl bg-[#040811] border border-slate-800">
                  <span className="text-[11px] text-slate-400">수상 및 일지</span>
                  <p className="text-lg font-bold text-cyan-300">{achievements.length}개 항목</p>
                </div>
                <div className="p-3 rounded-xl bg-[#040811] border border-slate-800">
                  <span className="text-[11px] text-slate-400">프로젝트</span>
                  <p className="text-lg font-bold text-cyan-300">{projects.length}개 아카이브</p>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
              
              {/* Photo Manager */}
              <div className="p-5 rounded-2xl bg-[#08111e]/90 border border-cyan-500/30 hover:border-cyan-400/80 transition-all space-y-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-500 text-cyan-400 flex items-center justify-center">
                  <Camera size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-['Orbitron']">사진 통합 관리</h4>
                  <p className="text-xs text-slate-400 font-sans">
                    로봇, 프로젝트, 대회, 상장 사진을 한 곳에서 일괄 수정합니다.
                  </p>
                </div>
                <button
                  onClick={() => setShowPhotoManager(true)}
                  className="w-full py-2 px-3 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/60 text-cyan-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  사진 관리자 열기
                </button>
              </div>

              {/* Data Backup */}
              <div className="p-5 rounded-2xl bg-[#08111e]/90 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-3">
                <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 flex items-center justify-center">
                  <Download size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-['Orbitron']">JSON 백업 다운로드</h4>
                  <p className="text-xs text-slate-400 font-sans">
                    전체 포트폴리오 텍스트와 사진 데이터를 파일로 백업합니다.
                  </p>
                </div>
                <button
                  onClick={handleExportBackup}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs transition-colors cursor-pointer"
                >
                  백업 파일 다운로드
                </button>
              </div>

              {/* Data Reset */}
              <div className="p-5 rounded-2xl bg-[#08111e]/90 border border-slate-800 hover:border-amber-500/50 transition-all space-y-3">
                <div className="w-9 h-9 rounded-lg bg-amber-950/40 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                  <RotateCcw size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-['Orbitron']">데이터 원본 초기화</h4>
                  <p className="text-xs text-slate-400 font-sans">
                    모든 수정 사항을 기본 예시 데이터로 되돌립니다.
                  </p>
                </div>
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-amber-950/40 border border-slate-700 hover:border-amber-500 text-amber-300 text-xs transition-colors cursor-pointer"
                >
                  기본값으로 초기화
                </button>
              </div>

            </div>

            {backupDownloaded && (
              <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-300 text-xs font-mono flex items-center gap-2 animate-bounce">
                <CheckCircle2 size={16} />
                <span>백업 JSON 파일이 성공적으로 다운로드되었습니다.</span>
              </div>
            )}

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-[#040811] px-4 py-4 text-center text-xs text-slate-600 font-mono">
        <span>© 2026 JWW Robotics Engineering Portfolio | Secure Admin Console</span>
      </footer>

      {/* Photo Manager Modal */}
      {showPhotoManager && (
        <PhotoManagerModal onClose={() => setShowPhotoManager(false)} />
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-[#08111e] border border-amber-500/60 rounded-2xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-950/80 border border-amber-500 text-amber-400 mx-auto flex items-center justify-center">
              <AlertCircle size={24} />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold font-['Orbitron'] text-white">데이터 초기화</h4>
              <p className="text-xs text-slate-300 font-sans">
                모든 사진 및 편집 내용을 취소하고 원본 기본 데이터로 되돌리시겠습니까?
              </p>
            </div>

            <div className="flex gap-2 justify-center pt-2 font-mono">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-xs font-bold rounded bg-amber-500 hover:bg-amber-400 text-black cursor-pointer"
              >
                초기화 확인
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

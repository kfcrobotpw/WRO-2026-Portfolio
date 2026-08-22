import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PhotoManagerModal } from './modals/PhotoManagerModal';
import { 
  ShieldCheck, 
  RotateCcw, 
  Download, 
  Cloud,
  Sparkles, 
  Edit3, 
  Check, 
  AlertTriangle,
  Camera
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminToolbar: React.FC = () => {
  const { 
    isAdmin, 
    resetAllToDefault,
    currentUser,
    isFirebaseSyncing,
    heroData,
    competitions,
    skills,
    achievements,
    projects
  } = usePortfolio();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showPhotoManager, setShowPhotoManager] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  if (!isAdmin) return null;

  const handleReset = () => {
    resetAllToDefault();
    setShowResetConfirm(false);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.1 },
      colors: ['#22d3ee', '#a855f7'],
    });
  };

  const handleExport = () => {
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

    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <>
      <div 
        id="admin-toolbar"
        className="sticky top-18 sm:top-20 z-40 bg-[#0c192d]/95 backdrop-blur-md border-y border-cyan-500/40 px-4 py-2.5 shadow-[0_4px_25px_rgba(0,0,0,0.8)] animate-in slide-in-from-top-4 duration-300"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Left: Mode Status */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <ShieldCheck size={14} className="text-cyan-400" />
              <span>ADMIN EDITOR ACTIVE</span>
            </div>

            {/* Cloud Sync Status */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900/80 border border-cyan-900 text-slate-300 font-mono text-[11px]">
              <Cloud size={13} className="text-cyan-400" />
              <span>Firestore Sync: {isFirebaseSyncing ? '동기화 중...' : '연결됨'}</span>
              {currentUser && (
                <span className="text-cyan-300 ml-1 hidden sm:inline">({currentUser.email})</span>
              )}
            </div>

            <span className="hidden xl:inline text-slate-400 font-sans text-[11px]">
              각 섹션의 <span className="text-cyan-300 font-bold font-mono">[📷 사진]</span> 또는 <span className="text-cyan-300 font-bold font-mono">[✏️ 수정]</span> 버튼으로 실시간 편집
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 font-mono">
            
            {/* Direct Photo Manager Button */}
            <button
              id="admin-photo-manager-btn"
              onClick={() => setShowPhotoManager(true)}
              className="px-3 py-1 rounded bg-cyan-950/80 border border-cyan-400 hover:bg-cyan-900 text-cyan-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer font-bold shadow-[0_0_10px_rgba(34,211,238,0.3)]"
              title="포트폴리오 전체 사진 관리"
            >
              <Camera size={13} />
              <span>사진 통합 관리</span>
            </button>

            {/* Export JSON backup */}
            <button
              onClick={handleExport}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
              title="전체 포트폴리오 데이터 백업 (JSON)"
            >
              <Download size={13} />
              <span className="hidden md:inline">백업</span>
            </button>

            {/* Reset Defaults Button */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-amber-500/80 text-slate-300 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
              title="기본값으로 초기화"
            >
              <RotateCcw size={13} />
              <span className="hidden md:inline">초기화</span>
            </button>
          </div>

        </div>

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <div className="relative w-full max-w-sm bg-[#08111e] border border-amber-500/60 rounded-2xl p-6 shadow-2xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-950/80 border border-amber-500 text-amber-400 mx-auto flex items-center justify-center">
                <AlertTriangle size={24} />
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

        {copiedNotification && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-300 text-xs font-mono shadow-2xl flex items-center gap-2 animate-bounce">
            <Check size={16} />
            <span>백업 JSON 파일이 다운로드되었습니다!</span>
          </div>
        )}

      </div>

      {/* Centralized Photo Manager Modal */}
      {showPhotoManager && (
        <PhotoManagerModal onClose={() => setShowPhotoManager(false)} />
      )}
    </>
  );
};

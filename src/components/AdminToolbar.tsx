import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PhotoManagerModal } from './modals/PhotoManagerModal';
import { 
  ShieldCheck, 
  Cloud,
  Camera
} from 'lucide-react';

export const AdminToolbar: React.FC = () => {
  const { 
    isAdmin, 
    currentUser,
    isFirebaseSyncing,
  } = usePortfolio();

  const [showPhotoManager, setShowPhotoManager] = useState(false);

  // Shift + B shortcut to toggle Photo Manager Modal when logged in
  useEffect(() => {
    if (!isAdmin) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is actively typing in an input or textarea
      const target = e.target as HTMLElement | null;
      if (
        target && (
          target.tagName === 'INPUT' || 
          target.tagName === 'TEXTAREA' || 
          target.isContentEditable
        )
      ) {
        return;
      }

      if (e.shiftKey && (e.key === 'B' || e.key === 'b' || e.code === 'KeyB')) {
        e.preventDefault();
        setShowPhotoManager((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  if (!isAdmin) return null;

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

          {/* Right Actions: Direct Photo Manager Button with Shift+B shortcut badge */}
          <div className="flex items-center gap-2 font-mono">
            <button
              id="admin-photo-manager-btn"
              onClick={() => setShowPhotoManager(true)}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-950/90 border border-cyan-400 hover:bg-cyan-900/90 hover:border-cyan-300 text-cyan-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer font-bold shadow-[0_0_15px_rgba(34,211,238,0.35)]"
              title="포트폴리오 전체 사진 관리 (단축키: Shift + B)"
            >
              <Camera size={14} className="text-cyan-400" />
              <span>사진 편집</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-sans font-semibold bg-cyan-900/80 border border-cyan-500/40 rounded text-cyan-200 shadow-inner">
                Shift + B
              </kbd>
            </button>
          </div>

        </div>
      </div>

      {/* Centralized Photo Manager Modal */}
      {showPhotoManager && (
        <PhotoManagerModal onClose={() => setShowPhotoManager(false)} />
      )}
    </>
  );
};


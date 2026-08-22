import React, { useState } from 'react';
import { AchievementItem } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { EditAchievementModal } from './modals/EditAchievementModal';
import { Trophy, Award, BookOpen, Star, Sparkles, Check, X, ShieldCheck, Plus, Edit3, Camera, Maximize2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Achievements: React.FC = () => {
  const { achievements, addAchievement, updateAchievement, deleteAchievement, isAdmin } = usePortfolio();
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<AchievementItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const handleOpenAchievement = (ach: AchievementItem) => {
    setSelectedAchievement(ach);
    // Trigger festive cyber sparks
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#a855f7', '#22d3ee', '#38bdf8']
    });
  };

  return (
    <section id="awards" className="relative py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center justify-center gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Orbitron'] text-white tracking-wider">
            Achievements
          </h2>
          {isAdmin && (
            <button
              onClick={() => setIsCreating(true)}
              className="px-3 py-1 text-xs font-mono font-bold text-black bg-purple-400 hover:bg-purple-300 rounded-lg flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.6)] cursor-pointer"
            >
              <Plus size={13} />
              <span>수상 추가</span>
            </button>
          )}
        </div>
        <p className="text-sm text-slate-400 max-w-xl mx-auto font-sans">
          로보틱스 대회 및 엔지니어링 연구 성과
        </p>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent mx-auto" />
      </div>

      {/* Main Achievement Card (Direct from Image 2) */}
      <div className="max-w-2xl mx-auto space-y-6">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            id={`achievement-card-${ach.id}`}
            onClick={() => handleOpenAchievement(ach)}
            className="relative rounded-2xl border border-purple-900/40 bg-[#08111e]/90 backdrop-blur-md p-8 sm:p-10 text-center flex flex-col items-center justify-center gap-4 cursor-pointer group hover:border-purple-500/70 hover:bg-[#0d182a] transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]"
          >
            {/* Admin Edit Controls */}
            {isAdmin && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingAchievement(ach);
                  }}
                  className="p-1.5 rounded-lg bg-purple-950/80 border border-purple-500/60 text-purple-300 hover:bg-purple-900 hover:text-white transition-colors"
                  title="수상 이력 수정"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingAchievement(ach);
                  }}
                  className="px-2 py-1 rounded-lg bg-purple-950/80 border border-purple-500/60 text-purple-300 hover:bg-purple-900 hover:text-white transition-colors text-[10px] font-mono flex items-center gap-1"
                  title="상장/트로피 사진 수정"
                >
                  <Camera size={12} />
                  <span>사진 {ach.imageUrl ? '수정' : '등록'}</span>
                </button>
              </div>
            )}

            {/* Ambient Purple Glow */}
            <div className="absolute inset-0 bg-purple-600/5 rounded-2xl pointer-events-none group-hover:bg-purple-600/10 transition-colors" />

            {/* Glowing Trophy Icon or Thumbnail */}
            {ach.imageUrl ? (
              <div className="relative w-32 h-24 rounded-xl overflow-hidden border border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <img
                  src={ach.imageUrl}
                  alt={ach.awardName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/30 blur-lg rounded-full" />
                <div className="relative p-4 rounded-2xl bg-purple-950/50 border border-purple-500/50 text-purple-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.9)]">
                  <Trophy size={36} className="text-purple-400" />
                </div>
              </div>
            )}

            {/* Competition Name */}
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold font-['Orbitron'] text-slate-100 group-hover:text-purple-300 transition-colors">
                {ach.title}
              </h3>
              
              {/* Award Title (연구일지상) */}
              <p className="text-base sm:text-lg font-bold text-purple-400 font-sans tracking-wide">
                {ach.awardName}
              </p>
            </div>

            <p className="text-xs text-slate-400 max-w-md line-clamp-2 font-sans">
              {ach.description}
            </p>

            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-400 group-hover:text-purple-300 mt-2">
              <BookOpen size={14} />
              <span>연구일지 세부 기록 및 분석 보기 ➔</span>
            </span>
          </div>
        ))}
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl bg-[#08111e] border border-purple-500/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(168,85,247,0.3)] space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-600/50 text-purple-400">
                  <Trophy size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-['Orbitron'] text-white">
                    {selectedAchievement.title}
                  </h3>
                  <p className="text-xs text-purple-400 font-mono">{selectedAchievement.awardName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAchievement(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* If Photo Exists */}
            {selectedAchievement.imageUrl && (
              <div className="relative rounded-xl overflow-hidden border border-purple-500/60 bg-black/60 max-h-60">
                <img
                  src={selectedAchievement.imageUrl}
                  alt={selectedAchievement.awardName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setZoomedImage(selectedAchievement.imageUrl || null)}
                  className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded bg-black/80 border border-purple-400 text-purple-300 text-xs font-mono flex items-center gap-1 cursor-pointer hover:bg-purple-950"
                >
                  <Maximize2 size={12} />
                  <span>사진 원본</span>
                </button>
              </div>
            )}

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div>
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">
                  수상 배경 및 심사평
                </h4>
                <p className="mt-1 text-slate-200 leading-relaxed font-sans">
                  {selectedAchievement.description}
                </p>
              </div>

              {selectedAchievement.journalHighlights && (
                <div>
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono mb-2">
                    주요 연구일지(Engineering Logbook) 수록 내용
                  </h4>
                  <ul className="space-y-2">
                    {selectedAchievement.journalHighlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                        <Check size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <div className="text-xs font-mono text-slate-500">
                인증기관: {selectedAchievement.organization || 'RoboCup Korea'}
              </div>
              <button
                onClick={() => setSelectedAchievement(null)}
                className="px-4 py-2 rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-500 text-purple-200 text-xs font-mono cursor-pointer"
              >
                확인 (CONFIRM)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Edit Achievement Modal */}
      {editingAchievement && (
        <EditAchievementModal
          initialData={editingAchievement}
          onSave={(updated) => {
            updateAchievement(updated.id, updated);
            setEditingAchievement(null);
          }}
          onDelete={(id) => {
            deleteAchievement(id);
            setEditingAchievement(null);
          }}
          onClose={() => setEditingAchievement(null)}
        />
      )}

      {/* Create Achievement Modal */}
      {isCreating && (
        <EditAchievementModal
          onSave={(newAch) => {
            addAchievement(newAch);
            setIsCreating(false);
          }}
          onClose={() => setIsCreating(false)}
        />
      )}

      {/* Zoom Lightbox */}
      {zoomedImage && (
        <div 
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative max-w-4xl max-h-[85vh] rounded-2xl border border-purple-400 overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.5)]">
            <img
              src={zoomedImage}
              alt="Award Certificate High-Res"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
            <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 border border-purple-400 text-purple-300 font-mono text-xs rounded-lg">
              CLICK ANYWHERE TO CLOSE
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

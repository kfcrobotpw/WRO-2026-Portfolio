import React, { useState } from 'react';
import { CompetitionLog } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { EditCompetitionModal } from './modals/EditCompetitionModal';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Plus, 
  Award, 
  Activity, 
  Sparkles, 
  ChevronRight, 
  X, 
  Edit3, 
  Trash2,
  Camera,
  Maximize2
} from 'lucide-react';

export const CompetitionJourney: React.FC = () => {
  const { competitions, addCompetition, updateCompetition, deleteCompetition, isAdmin } = usePortfolio();

  const [selectedComp, setSelectedComp] = useState<CompetitionLog | null>(null);
  const [editingComp, setEditingComp] = useState<CompetitionLog | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <section id="journey" className="relative py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center justify-center gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Orbitron'] text-white tracking-wider">
            Competition Journey
          </h2>
          {isAdmin && (
            <button
              onClick={() => setIsCreating(true)}
              className="px-3 py-1 text-xs font-mono font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.6)] cursor-pointer"
            >
              <Plus size={13} />
              <span>대회 추가</span>
            </button>
          )}
        </div>
        {/* Sleek cyber connector circle */}
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border-2 border-cyan-400 bg-[#060b13] shadow-[0_0_10px_#22d3ee] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
        </div>
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent mx-auto" />
      </div>

      {/* Main Competition Cards List */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {competitions.map((comp) => (
          <div
            key={comp.id}
            id={`competition-card-${comp.id}`}
            className="relative rounded-2xl border border-cyan-900/50 bg-[#08111e]/90 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_30px_rgba(4,18,34,0.7)] hover:border-cyan-500/40 transition-all duration-300 group"
          >
            {/* Ambient Corner Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Top Bar: Title + Team Badge + Admin Controls */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                  {comp.year} ARCHIVE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-['Orbitron'] text-white mt-0.5">
                  {comp.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Purple Accent Team Badge */}
                <div className="px-4 py-1.5 rounded-lg border border-purple-500/80 bg-purple-950/30 text-purple-300 text-xs font-['Orbitron'] font-bold tracking-widest text-center shadow-[0_0_15px_rgba(168,85,247,0.25)]">
                  <span className="block leading-tight">{comp.teamName || 'K.F.C.'}</span>
                  <span className="text-[10px] text-purple-400 font-mono">F=ma</span>
                </div>

                {isAdmin && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingComp(comp)}
                      className="p-1.5 rounded-lg bg-cyan-950/70 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-900 hover:text-white transition-colors cursor-pointer"
                      title="대회 기록 수정"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => setEditingComp(comp)}
                      className="px-2 py-1 rounded-lg bg-cyan-950/70 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-900 hover:text-white transition-colors text-[10px] font-mono flex items-center gap-1 cursor-pointer"
                      title="대회 사진 등록/수정"
                    >
                      <Camera size={12} />
                      <span>사진 {comp.imageUrl ? '수정' : '등록'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Optional Competition Photo Banner */}
            {comp.imageUrl && (
              <div className="relative my-4 rounded-xl overflow-hidden border border-cyan-900/60 bg-black/60 h-48 sm:h-64 group/photo">
                <img
                  src={comp.imageUrl}
                  alt={comp.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-500"
                />
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.5) 50%)',
                    backgroundSize: '100% 4px'
                  }}
                />
                <button
                  onClick={() => setZoomedImage(comp.imageUrl || null)}
                  className="absolute bottom-3 right-3 px-3 py-1 rounded bg-black/80 border border-cyan-400 text-cyan-300 text-xs font-mono flex items-center gap-1.5 opacity-0 group-hover/photo:opacity-100 transition-opacity cursor-pointer hover:bg-cyan-950"
                >
                  <Maximize2 size={13} />
                  <span>사진 확대</span>
                </button>
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 border border-cyan-500/50 text-[10px] font-mono text-cyan-300">
                  TOURNAMENT ARENA ARCHIVE
                </div>
              </div>
            )}

            {/* Role Summary */}
            <div className="py-4 text-sm sm:text-base text-slate-300">
              <span className="font-bold text-white font-['Rajdhani'] tracking-wide">Role:</span>{' '}
              <span className="text-slate-200 font-medium">{comp.role}</span>
            </div>

            {/* Structured Review Block (Well-Done & Improvement) */}
            <div className="rounded-xl border border-slate-800/90 bg-[#050c17]/90 p-4 sm:p-6 space-y-4 my-2">
              
              {/* 잘한 점 (Strengths) */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-cyan-400 flex-shrink-0">
                  <CheckCircle2 size={18} className="drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                </div>
                <div className="text-sm sm:text-base">
                  <span className="font-bold text-cyan-300 mr-2">잘한 점:</span>
                  <span className="text-slate-200">{comp.wellDone}</span>
                </div>
              </div>

              {/* 아쉬운 점 (Points for Improvement) */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-rose-400 flex-shrink-0">
                  <AlertTriangle size={18} className="drop-shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                </div>
                <div className="text-sm sm:text-base">
                  <span className="font-bold text-rose-300 mr-2">아쉬운 점:</span>
                  <span className="text-slate-300 leading-relaxed">{comp.improvement}</span>
                </div>
              </div>

              {/* Rounds Telemetry Quick Toggle (if available) */}
              {comp.roundsData && (
                <div className="pt-3 border-t border-slate-800/80">
                  <button
                    onClick={() => setSelectedComp(selectedComp?.id === comp.id ? null : comp)}
                    className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  >
                    <Activity size={14} />
                    <span>{selectedComp?.id === comp.id ? '텔레메트리 세부 분석 닫기' : '2차 라운드 모터 출력 편차 & 오차 분석 보기 ➔'}</span>
                  </button>

                  {/* Expanded Telemetry Analysis View */}
                  {selectedComp?.id === comp.id && (
                    <div className="mt-4 p-4 rounded-lg bg-slate-950/90 border border-cyan-800/50 space-y-3 font-mono text-xs">
                      <div className="text-cyan-400 font-bold font-['Orbitron'] flex items-center justify-between">
                        <span>ROUND 1 vs ROUND 2 MOTOR CALIBRATION DELTA</span>
                        <span className="text-rose-400 text-[10px]">DELTA: +6% R-MOTOR BIAS</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {comp.roundsData.map((rd) => (
                          <div key={rd.round} className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1.5">
                            <div className="flex justify-between font-bold text-white">
                              <span>Round {rd.round}</span>
                              <span className={rd.score >= 60 ? 'text-emerald-400' : 'text-amber-400'}>
                                Score: {rd.score}/{rd.maxScore}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400">{rd.notes}</p>
                            {rd.motorOutputDiff && (
                              <div className="text-[10px] text-cyan-300 bg-cyan-950/40 px-2 py-1 rounded">
                                모터 출력: {rd.motorOutputDiff}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] text-slate-400 pt-1">
                        💡 <strong>사후 대응책:</strong> 2라운드 주행 시 배터리 전압 강하를 추정하는 소프트웨어 전압 피드포워드 게인(Gain)과 자이로 헤딩 보정 알고리즘을 구축하여 다음 대회 완벽 대비.
                      </p>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Bottom Quote */}
            <div className="mt-6 pt-4 text-center border-t border-slate-800/60">
              <p className="text-sm sm:text-base italic font-semibold text-slate-300 tracking-wide font-sans">
                {comp.quote}
              </p>
            </div>

          </div>
        ))}

        {/* Future Experiences Placeholder Box */}
        <div
          id="future-experiences-box"
          className="relative rounded-2xl border-2 border-dashed border-slate-800 bg-[#060c16]/50 p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-3 group hover:border-cyan-800/80 transition-colors"
        >
          {/* Pulsating Hourglass Icon */}
          <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-colors shadow-inner">
            <Clock size={24} className="animate-pulse" />
          </div>

          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-mono tracking-[0.2em] text-slate-400 group-hover:text-slate-300 uppercase">
              Awaiting New Data. Future Experiences Will Be Recorded Here.
            </p>
            <p className="text-[11px] text-slate-600 font-sans">
              2026-2027 시즌 새로운 로봇 대회 및 자율주행 알고리즘 도전 기록이 실시간으로 동기화됩니다.
            </p>
          </div>

          {/* Add New Entry Button */}
          {isAdmin && (
            <button
              id="add-journey-btn"
              onClick={() => setIsCreating(true)}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-500/50 text-xs font-mono text-cyan-300 transition-all cursor-pointer"
            >
              <Plus size={14} />
              <span>새 대회 기록 작성하기 (Add Log)</span>
            </button>
          )}
        </div>

      </div>

      {/* Edit Competition Modal */}
      {editingComp && (
        <EditCompetitionModal
          initialData={editingComp}
          onSave={(updated) => {
            updateCompetition(updated.id, updated);
            setEditingComp(null);
          }}
          onDelete={(id) => {
            deleteCompetition(id);
            setEditingComp(null);
          }}
          onClose={() => setEditingComp(null)}
        />
      )}

      {/* Create Competition Modal */}
      {isCreating && (
        <EditCompetitionModal
          onSave={(newComp) => {
            addCompetition(newComp);
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
          <div className="relative max-w-4xl max-h-[85vh] rounded-2xl border border-cyan-400 overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.5)]">
            <img
              src={zoomedImage}
              alt="Competition Arena High-Res"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
            <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 border border-cyan-400 text-cyan-300 font-mono text-xs rounded-lg">
              CLICK ANYWHERE TO CLOSE
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

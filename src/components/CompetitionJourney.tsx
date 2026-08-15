import React, { useState } from 'react';
import { CompetitionLog } from '../types';
import { INITIAL_COMPETITIONS } from '../data/portfolioData';
import { CheckCircle2, AlertTriangle, Clock, Plus, Award, Activity, Sparkles, ChevronRight, X } from 'lucide-react';

export const CompetitionJourney: React.FC = () => {
  const [competitions, setCompetitions] = useState<CompetitionLog[]>(() => {
    const saved = localStorage.getItem('robot_portfolio_competitions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_COMPETITIONS;
      }
    }
    return INITIAL_COMPETITIONS;
  });

  const [selectedComp, setSelectedComp] = useState<CompetitionLog | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    year: '2027',
    title: '',
    teamName: 'K.F.C. F=ma',
    role: '',
    wellDone: '',
    improvement: '',
    quote: '',
  });

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.title || !newEntry.role) return;

    const item: CompetitionLog = {
      id: `comp-${Date.now()}`,
      year: newEntry.year,
      title: newEntry.title,
      teamName: newEntry.teamName,
      badgeText: newEntry.teamName,
      role: newEntry.role,
      wellDone: newEntry.wellDone || '새로운 로직을 성공적으로 검증함.',
      improvement: newEntry.improvement || '센서 보정 시간 단축 필요.',
      quote: newEntry.quote ? `“${newEntry.quote}”` : '“끊임없는 도전과 학습의 과정이었습니다.”',
    };

    const updated = [item, ...competitions];
    setCompetitions(updated);
    localStorage.setItem('robot_portfolio_competitions', JSON.stringify(updated));
    setShowAddModal(false);
    setNewEntry({
      year: '2027',
      title: '',
      teamName: 'K.F.C. F=ma',
      role: '',
      wellDone: '',
      improvement: '',
      quote: '',
    });
  };

  return (
    <section id="journey" className="relative py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center justify-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Orbitron'] text-white tracking-wider">
            Competition Journey
          </h2>
        </div>
        {/* Sleek cyber connector circle (Direct from Image 2) */}
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border-2 border-cyan-400 bg-[#060b13] shadow-[0_0_10px_#22d3ee] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
        </div>
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent mx-auto" />
      </div>

      {/* Main Competition Cards List */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {competitions.map((comp, idx) => (
          <div
            key={comp.id}
            id={`competition-card-${comp.id}`}
            className="relative rounded-2xl border border-cyan-900/50 bg-[#08111e]/90 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_30px_rgba(4,18,34,0.7)] hover:border-cyan-500/40 transition-all duration-300 group"
          >
            {/* Ambient Corner Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Top Bar: Title + Team Badge */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                  {comp.year} ARCHIVE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-['Orbitron'] text-white mt-0.5">
                  {comp.title}
                </h3>
              </div>

              {/* Purple Accent Team Badge (Direct from Image 2) */}
              <div className="px-4 py-1.5 rounded-lg border border-purple-500/80 bg-purple-950/30 text-purple-300 text-xs font-['Orbitron'] font-bold tracking-widest text-center shadow-[0_0_15px_rgba(168,85,247,0.25)]">
                <span className="block leading-tight">K.F.C.</span>
                <span className="text-[10px] text-purple-400 font-mono">F=ma</span>
              </div>
            </div>

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

            {/* Bottom Quote (Direct from Image 2) */}
            <div className="mt-6 pt-4 text-center border-t border-slate-800/60">
              <p className="text-sm sm:text-base italic font-semibold text-slate-300 tracking-wide font-sans">
                {comp.quote}
              </p>
            </div>

          </div>
        ))}

        {/* Future Experiences Placeholder Box (Direct from Image 2) */}
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
          <button
            id="add-journey-btn"
            onClick={() => setShowAddModal(true)}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-500/50 text-xs font-mono text-cyan-300 transition-all cursor-pointer"
          >
            <Plus size={14} />
            <span>새 대회 기록 작성하기 (Add Log)</span>
          </button>
        </div>

      </div>

      {/* Modal for adding a new competition log */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#08111e] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(34,211,238,0.2)] space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold font-['Orbitron'] text-white">NEW COMPETITION LOG</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddLog} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">연도 (Year)</label>
                  <input
                    type="text"
                    value={newEntry.year}
                    onChange={(e) => setNewEntry({ ...newEntry, year: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:border-cyan-400 outline-none"
                    placeholder="2027"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">팀 이름 (Team)</label>
                  <input
                    type="text"
                    value={newEntry.teamName}
                    onChange={(e) => setNewEntry({ ...newEntry, teamName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:border-cyan-400 outline-none"
                    placeholder="K.F.C. F=ma"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">대회명 (Competition Name)</label>
                <input
                  type="text"
                  required
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:border-cyan-400 outline-none"
                  placeholder="2027 WRO Korea Open Final"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">역할 (Role)</label>
                <input
                  type="text"
                  required
                  value={newEntry.role}
                  onChange={(e) => setNewEntry({ ...newEntry, role: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:border-cyan-400 outline-none"
                  placeholder="메인 프로그래머, 섀시 기구학 설계"
                />
              </div>

              <div>
                <label className="block text-cyan-400 mb-1">잘한 점 (Strengths)</label>
                <input
                  type="text"
                  value={newEntry.wellDone}
                  onChange={(e) => setNewEntry({ ...newEntry, wellDone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:border-cyan-400 outline-none"
                  placeholder="센서 융합을 통한 완벽한 라인트레이싱 달성"
                />
              </div>

              <div>
                <label className="block text-rose-400 mb-1">아쉬운 점 (Improvements)</label>
                <input
                  type="text"
                  value={newEntry.improvement}
                  onChange={(e) => setNewEntry({ ...newEntry, improvement: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:border-cyan-400 outline-none"
                  placeholder="배터리 잔량 관리에 대한 사전 체크리스트 보완"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">한 줄 소감 (Quote)</label>
                <input
                  type="text"
                  value={newEntry.quote}
                  onChange={(e) => setNewEntry({ ...newEntry, quote: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:border-cyan-400 outline-none"
                  placeholder="실패를 두려워하지 않고 끝까지 완주했다."
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-[#060b13] bg-cyan-400 hover:bg-cyan-300 rounded font-['Orbitron']"
                >
                  저장하기
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};

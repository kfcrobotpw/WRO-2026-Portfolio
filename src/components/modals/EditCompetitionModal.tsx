import React, { useState } from 'react';
import { CompetitionLog } from '../../types';
import { Trophy, Check, X, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EditCompetitionModalProps {
  initialData?: CompetitionLog | null;
  onSave: (comp: CompetitionLog) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

export const EditCompetitionModal: React.FC<EditCompetitionModalProps> = ({
  initialData,
  onSave,
  onDelete,
  onClose,
}) => {
  const isEditing = !!initialData;
  const [formData, setFormData] = useState<CompetitionLog>(() => {
    if (initialData) return { ...initialData };
    return {
      id: `comp-${Date.now()}`,
      year: '2026',
      title: '2026 WRO Korea Open',
      teamName: 'K.F.C.',
      badgeText: 'K.F.C.\nF=ma',
      role: '로봇 제작, 프로그래밍, 주행 테스트, 문제 해결, 전략 수립',
      wellDone: 'main 코드를 많이 고치고 문제를 많이 해결했다.',
      improvement: '모형 문제로 미션을 수행하지 못하고 2번째 라운드에 모터 출력값이 달라 모든 미션을 수행하지 못한것이 아쉬웠다.',
      quote: '“모형 이슈로 수상은 못하였지만 최선을 다한 대회라고 생각한다.”',
      roundsData: [
        {
          round: 1,
          score: 65,
          maxScore: 100,
          notes: '1라운드 미션 진행 중 블록 모형 규격 오차 발생.',
          motorOutputDiff: '정상 (L: 82%, R: 82%)'
        },
        {
          round: 2,
          score: 45,
          maxScore: 100,
          notes: '2라운드 주행 시 좌우 모터 전압 강하에 따른 출력값 편차 발생.',
          motorOutputDiff: '편차 감지 (L: 78%, R: 84% - 편차 +6%)'
        }
      ]
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.role) return;

    onSave(formData);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#22d3ee', '#38bdf8'],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#08111e] border border-cyan-500/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(34,211,238,0.25)] space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300">
              <Trophy size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Orbitron'] text-white">
                {isEditing ? '대회 여정(JOURNEY) 기록 수정' : '신규 대회 여정 추가'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">WRO 및 로보틱스 대회 경험 기록</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-slate-300">Year (연도)</label>
              <input
                type="text"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-100 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-slate-300">Competition Title (대회명)</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="예: 2026 WRO Korea Open"
                className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-100 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-300">Team Name (팀명)</label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                placeholder="예: K.F.C."
                className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-100 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-300">Badge Text (오른쪽 뱃지 문구)</label>
              <input
                type="text"
                value={formData.badgeText || ''}
                onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                placeholder="예: K.F.C. F=ma"
                className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-cyan-300 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-1">
            <label className="text-cyan-300 font-bold">Role: 본인 역할</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="예: 로봇 제작, 프로그래밍, 주행 테스트, 문제 해결, 전략 수립"
              className="w-full px-3 py-2 bg-[#050c17] border border-cyan-500/50 rounded-lg text-white font-sans text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Well Done (잘한 점) */}
          <div className="space-y-1">
            <label className="text-emerald-400 font-bold">잘한 점 (Success Factors)</label>
            <textarea
              rows={2}
              value={formData.wellDone}
              onChange={(e) => setFormData({ ...formData, wellDone: e.target.value })}
              placeholder="예: main 코드를 많이 고치고 문제를 많이 해결했다."
              className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 font-sans focus:border-emerald-400 focus:outline-none resize-none"
            />
          </div>

          {/* Improvement (아쉬운 점) */}
          <div className="space-y-1">
            <label className="text-amber-400 font-bold">아쉬운 점 (Improvement Points)</label>
            <textarea
              rows={2}
              value={formData.improvement}
              onChange={(e) => setFormData({ ...formData, improvement: e.target.value })}
              placeholder="예: 모형 문제로 미션을 수행하지 못하고 2번째 라운드에 모터 출력값이 달라..."
              className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 font-sans focus:border-amber-400 focus:outline-none resize-none"
            />
          </div>

          {/* Retrospective Quote */}
          <div className="space-y-1">
            <label className="text-slate-300 font-bold">대회 회고 인용구</label>
            <input
              type="text"
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              placeholder="“모형 이슈로 수상은 못하였지만 최선을 다한 대회라고 생각한다.”"
              className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-100 font-sans italic focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            {isEditing && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm('이 대회 기록을 삭제하시겠습니까?')) {
                    onDelete(formData.id);
                    onClose();
                  }
                }}
                className="px-3 py-2 rounded-lg bg-red-950/60 border border-red-500/60 text-red-300 hover:bg-red-900 flex items-center gap-1.5"
              >
                <Trash2 size={14} />
                <span>기록 삭제</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-['Orbitron'] flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              >
                <Check size={14} />
                <span>저장</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

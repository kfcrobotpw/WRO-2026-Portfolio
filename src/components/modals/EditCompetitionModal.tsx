import React, { useState } from 'react';
import { CompetitionLog } from '../../types';
import { Trophy, Check, X, Trash2, Camera, FileText } from 'lucide-react';
import { ImageEditorField } from '../common/ImageEditorField';
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
      imageUrl: '',
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

  const [activeTab, setActiveTab] = useState<'info' | 'photo'>('info');

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
                {isEditing ? '대회 여정(JOURNEY) & 현장 사진 수정' : '신규 대회 여정 추가'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">WRO 및 로보틱스 대회 경험 및 경기장 사진</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors ${
              activeTab === 'info'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText size={13} />
            <span>대회 정보 & 회고</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('photo')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors ${
              activeTab === 'photo'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera size={13} />
            <span>대회 현장 사진 ({formData.imageUrl ? '등록됨' : '미등록'})</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300">Year (연도)</label>
                  <input
                    type="text"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-cyan-300 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300">Competition Title (대회 공식 명칭)</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-white font-['Orbitron'] font-bold focus:border-cyan-400 focus:outline-none"
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
                    className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-purple-300 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300">Role / 담당 업무</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 focus:border-cyan-400 focus:outline-none font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-cyan-300 font-bold">잘한 점 (Strengths & Progress)</label>
                <textarea
                  rows={2}
                  value={formData.wellDone}
                  onChange={(e) => setFormData({ ...formData, wellDone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 font-sans focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-amber-300 font-bold">아쉬운 점 & 보완할 점 (Improvement Points)</label>
                <textarea
                  rows={2}
                  value={formData.improvement}
                  onChange={(e) => setFormData({ ...formData, improvement: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 font-sans focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-purple-300 font-bold">대회 총평 / 핵심 명언</label>
                <input
                  type="text"
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 font-sans italic focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'photo' && (
            <div className="space-y-3">
              <ImageEditorField
                value={formData.imageUrl || ''}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                presetCategory="competition"
                label="대회 현장/팀/경기장 사진 등록"
                helperText="대회 경기장, 팀원 단체 사진, 경기 매트 스냅샷 등을 등록하세요."
              />
            </div>
          )}

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
                className="px-3 py-2 rounded-lg bg-red-950/60 border border-red-500/60 text-red-300 hover:bg-red-900 flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 size={14} />
                <span>삭제</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-['Orbitron'] flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.5)] cursor-pointer"
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

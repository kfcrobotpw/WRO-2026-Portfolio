import React, { useState } from 'react';
import { AchievementItem } from '../../types';
import { Trophy, Check, X, Trash2, Camera, FileText } from 'lucide-react';
import { ImageEditorField } from '../common/ImageEditorField';
import confetti from 'canvas-confetti';

interface EditAchievementModalProps {
  initialData?: AchievementItem | null;
  onSave: (ach: AchievementItem) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

export const EditAchievementModal: React.FC<EditAchievementModalProps> = ({
  initialData,
  onSave,
  onDelete,
  onClose,
}) => {
  const isEditing = !!initialData;
  const [formData, setFormData] = useState<AchievementItem>(() => {
    if (initialData) return { ...initialData };
    return {
      id: `ach-${Date.now()}`,
      title: 'Robocup Open South Korea 2026',
      awardName: '연구일지상 (Best Engineering Logbook Award)',
      year: '2026',
      organization: 'RoboCup Korea Association',
      description: '로봇 하드웨어 기구 설계도, 주행 궤적 실험 데이터, PID 게인값 튜닝 오차 분석 및 실패 요인 극복 과정을 체계적으로 기록하여 연구일지 부문 최고상을 수상하였습니다.',
      badgeColor: 'border-purple-500 text-purple-400 bg-purple-950/40',
      date: '2026. 02',
      imageUrl: '',
      journalHighlights: [
        '모터 전압 강하에 따른 듀티비(Duty Cycle) 보정 공식 수립',
        '컬러 센서 캘리브레이션 3단계 알고리즘',
        '120회 이상의 주행 테스트 오차 누적 그래프 분석',
      ]
    };
  });

  const [activeTab, setActiveTab] = useState<'info' | 'photo'>('info');
  const [highlightsInput, setHighlightsInput] = useState(
    (formData.journalHighlights || []).join('\n')
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.awardName) return;

    const highlights = highlightsInput
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    onSave({
      ...formData,
      journalHighlights: highlights,
    });

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#a855f7', '#22d3ee'],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#08111e] border border-purple-500/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(168,85,247,0.25)] space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-950/70 border border-purple-500/40 text-purple-300">
              <Trophy size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Orbitron'] text-white">
                {isEditing ? '수상 이력(ACHIEVEMENT) & 상장 사진 수정' : '신규 수상 이력 추가'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">로보틱스 대회 수상 및 연구일지 상장/트로피 사진</p>
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
                ? 'bg-purple-950 text-purple-300 border border-purple-500/50 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText size={13} />
            <span>수상 정보 & 연구일지 하이라이트</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('photo')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors ${
              activeTab === 'photo'
                ? 'bg-purple-950 text-purple-300 border border-purple-500/50 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera size={13} />
            <span>상장/트로피 사진 ({formData.imageUrl ? '등록됨' : '미등록'})</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-slate-300">대회명 (Competition Title)</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-white font-['Orbitron'] font-bold focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-purple-300 font-bold">수상명 (Award Name - 예: 연구일지상)</label>
                <input
                  type="text"
                  required
                  value={formData.awardName}
                  onChange={(e) => setFormData({ ...formData, awardName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050c17] border border-purple-500/60 rounded-lg text-purple-200 font-bold text-sm focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300">수여 기관 (Organization)</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300">수상 일자 (Date / Year)</label>
                  <input
                    type="text"
                    value={formData.date || formData.year}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value, year: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-purple-300 focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">수상 상세 설명 & 심사 총평</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 font-sans focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-purple-300 font-bold">연구일지 핵심 기록 내용 (줄 단위로 구분)</label>
                <textarea
                  rows={3}
                  value={highlightsInput}
                  onChange={(e) => setHighlightsInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 font-sans focus:border-purple-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'photo' && (
            <div className="space-y-3">
              <ImageEditorField
                value={formData.imageUrl || ''}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                presetCategory="award"
                label="상장/트로피/연구일지 사진 등록"
                helperText="대회 상장 스캔본, 트로피 사진 또는 연구일지 실제 페이지를 등록하세요."
              />
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            {isEditing && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm('이 수상 기록을 삭제하시겠습니까?')) {
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
                className="px-6 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-bold font-['Orbitron'] flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.5)] cursor-pointer"
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

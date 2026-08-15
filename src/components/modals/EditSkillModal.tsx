import React, { useState } from 'react';
import { SkillItem } from '../../types';
import { Layers, Check, X, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EditSkillModalProps {
  initialData?: SkillItem | null;
  onSave: (skill: SkillItem) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

export const EditSkillModal: React.FC<EditSkillModalProps> = ({
  initialData,
  onSave,
  onDelete,
  onClose,
}) => {
  const isEditing = !!initialData;
  const [formData, setFormData] = useState<SkillItem>(() => {
    if (initialData) return { ...initialData };
    return {
      id: `skill-${Date.now()}`,
      name: 'NEW PROTOCOL',
      category: 'programming',
      icon: 'Code2',
      level: 90,
      shortDesc: '새로운 기술 설명',
      description: '로보틱스 및 알고리즘 제어를 위한 기술 스택 세부 정보입니다.',
      tags: ['Algorithm', 'Robotics'],
      codeSample: `// Sample Implementation\nvoid runTask() {\n  // Logic here\n}`,
      wroApplication: '대회 미션 및 하드웨어 제어에 활용'
    };
  });

  const [tagInput, setTagInput] = useState(formData.tags.join(', '));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const parsedTags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      ...formData,
      tags: parsedTags.length > 0 ? parsedTags : ['Robotics'],
    });

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
              <Layers size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Orbitron'] text-white">
                {isEditing ? '핵심 역량(SKILL) 수정' : '신규 기술 스택 추가'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">기술 레벨 및 WRO 활용법 설정</p>
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
            <div className="space-y-1 sm:col-span-2">
              <label className="text-slate-300">Skill Name (예: BLOCK CODING, PYTHON)</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-white font-['Orbitron'] font-bold focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300">Category (분야)</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-cyan-300 focus:border-cyan-400 focus:outline-none"
              >
                <option value="programming">Programming</option>
                <option value="hardware">Hardware</option>
                <option value="creative">Creative / Deck</option>
                <option value="ai">AI / Vision</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-slate-300">Proficiency Level (숙련도):</label>
              <span className="text-cyan-400 font-bold">{formData.level}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value, 10) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300">Short Subtitle (요약 부제)</label>
            <input
              type="text"
              value={formData.shortDesc}
              onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
              placeholder="예: Pybricks & 데이터/비전 알고리즘"
              className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 font-sans focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300">Full Description (상세 설명)</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 font-sans focus:border-cyan-400 focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300">Tags (쉼표로 구분)</label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="PID Algorithm, OpenCV, NumPy"
              className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-cyan-300 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-cyan-300 font-bold">WRO & Robot Application (실제 대회 적용 사례)</label>
            <input
              type="text"
              value={formData.wroApplication || ''}
              onChange={(e) => setFormData({ ...formData, wroApplication: e.target.value })}
              placeholder="예: 2026 WRO main 알고리즘 작성 및 모터 출력 보정 로직 구현"
              className="w-full px-3 py-2 bg-[#050c17] border border-cyan-500/40 rounded-lg text-slate-200 font-sans focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300">Code Snippet (코드 예시)</label>
            <textarea
              rows={4}
              value={formData.codeSample || ''}
              onChange={(e) => setFormData({ ...formData, codeSample: e.target.value })}
              className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-cyan-300 font-mono text-[11px] focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            {isEditing && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm('이 기술 스택을 삭제하시겠습니까?')) {
                    onDelete(formData.id);
                    onClose();
                  }
                }}
                className="px-3 py-2 rounded-lg bg-red-950/60 border border-red-500/60 text-red-300 hover:bg-red-900 flex items-center gap-1.5"
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

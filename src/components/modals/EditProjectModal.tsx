import React, { useState } from 'react';
import { ProjectItem } from '../../types';
import { Bot, Check, X, Trash2, Camera, FileText } from 'lucide-react';
import { ImageEditorField } from '../common/ImageEditorField';
import confetti from 'canvas-confetti';

interface EditProjectModalProps {
  initialData?: ProjectItem | null;
  onSave: (proj: ProjectItem) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  initialData,
  onSave,
  onDelete,
  onClose,
}) => {
  const isEditing = !!initialData;
  const [formData, setFormData] = useState<ProjectItem>(() => {
    if (initialData) return { ...initialData };
    return {
      id: `proj-${Date.now()}`,
      title: 'F=ma main',
      subtitle: 'Final WRO 미션 프로젝트',
      category: 'WRO Competition',
      tag: 'Project',
      tags: ['Color Sensor', 'Motor Control', 'Python', 'PID Tracing'],
      summary: 'WRO 대회 공식 미션 해결을 위해 제작된 고속 고정밀 자율주행 로봇 시스템',
      description: '대회 미션 블록 수거 및 격자 맵 정밀 주행을 위해 개발된 메인 로봇 소프트웨어 및 하드웨어입니다.',
      blueprintTitle: 'AURORA-7: COMPETITION ROBOT MK.IV',
      specs: [
        { label: 'Platform', value: 'LEGO SPIKE Prime / Pybricks Hub' },
        { label: 'Drive Train', value: 'Dual High-Torque XL Motors' },
        { label: 'Sensors', value: '2x High-Precision Color Sensors' },
      ],
      keyFeatures: [
        '듀얼 컬러 센서 실시간 편차 적분(PID) 라인트레이싱 알고리즘',
        '모터 전압 강하에 따른 좌우 출력 자동 보정 캘리브레이션 루프',
      ],
      codeSnippet: {
        language: 'python',
        description: 'WRO 메인 알고리즘 루프',
        code: `# Python Control Loop\ndef step():\n    pass`,
      },
      imageType: 'blueprint',
      imageUrl: '',
    };
  });

  const [activeTab, setActiveTab] = useState<'info' | 'photo'>('info');
  const [tagsInput, setTagsInput] = useState(formData.tags.join(', '));
  const [featuresInput, setFeaturesInput] = useState(formData.keyFeatures.join('\n'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const parsedFeatures = featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    onSave({
      ...formData,
      tags: parsedTags.length > 0 ? parsedTags : ['Project'],
      keyFeatures: parsedFeatures.length > 0 ? parsedFeatures : ['자율주행 미션 수행'],
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
              <Bot size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Orbitron'] text-white">
                {isEditing ? '프로젝트(PROJECT) & 사진 편집' : '신규 프로젝트 추가'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">로봇 하드웨어·소프트웨어 아카이브 및 실제 사진</p>
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
            <span>기본 정보 & 스펙</span>
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
            <span>로봇/하드웨어 사진 ({formData.imageUrl ? '등록됨' : '미등록'})</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300">Project Title (예: F=ma main)</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-white font-['Orbitron'] font-bold focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300">Subtitle (예: Final WRO 미션 프로젝트)</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-cyan-300 focus:border-cyan-400 focus:outline-none font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300">Badge Tag (예: Project, Hardware)</label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-purple-300 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300">Blueprint Graphic Fallback</label>
                  <select
                    value={formData.imageType}
                    onChange={(e) => setFormData({ ...formData, imageType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-cyan-300 focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="blueprint">Robot Chassis Blueprint</option>
                    <option value="drone">Drone Controller PCB</option>
                    <option value="quadruped">Quadruped Gait Engine</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Summary (카드 미리보기 요약)</label>
                <input
                  type="text"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 font-sans focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Full Description (상세 설명)</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 font-sans focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Tags / Sensors (쉼표로 구분)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Color Sensor, Motor Control, Python, PID Tracing"
                  className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-cyan-300 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Key Engineering Features (줄 단위 구분)</label>
                <textarea
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 font-sans focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'photo' && (
            <div className="space-y-3">
              <ImageEditorField
                value={formData.imageUrl || ''}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                presetCategory="project"
                label="프로젝트 로봇/하드웨어 사진 등록"
                helperText="실제 대회 로봇 사진, 프로토타입 또는 기판 사진을 업로드하세요."
              />
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            {isEditing && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm('이 프로젝트를 삭제하시겠습니까?')) {
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

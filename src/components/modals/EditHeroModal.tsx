import React, { useState } from 'react';
import { HeroData } from '../../types';
import { Edit3, Check, X, Sparkles, Camera, Sliders, Layers } from 'lucide-react';
import { ImageEditorField } from '../common/ImageEditorField';
import confetti from 'canvas-confetti';

interface EditHeroModalProps {
  heroData: HeroData;
  onSave: (data: HeroData) => void;
  onClose: () => void;
}

export const EditHeroModal: React.FC<EditHeroModalProps> = ({ heroData, onSave, onClose }) => {
  const [formData, setFormData] = useState<HeroData>({ 
    ...heroData,
    imageMode: heroData.imageMode || 'photo',
    imageFilter: heroData.imageFilter || { brightness: 100, contrast: 100, glow: false, grayscale: false }
  });
  const [activeTab, setActiveTab] = useState<'text' | 'photo' | 'metrics'>('text');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#22d3ee', '#38bdf8', '#a855f7'],
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
              <Edit3 size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Orbitron'] text-white">HERO & BIO / 사진 편집</h3>
              <p className="text-xs text-slate-400 font-mono">소개글, 목표 인용구 및 메인 로봇 사진 관리</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors ${
              activeTab === 'text'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Edit3 size={13} />
            <span>소개 텍스트 & 슬로건</span>
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
            <span>로봇/프로필 사진 & 비주얼</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors ${
              activeTab === 'metrics'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders size={13} />
            <span>핵심 지표 (METRICS)</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          
          {/* TAB 1: TEXT */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-slate-300">Top Tagline (상단 뱃지 텍스트)</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-100 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300">Main Headline (헤드라인 앞부분)</label>
                  <input
                    type="text"
                    value={formData.headlineMain}
                    onChange={(e) => setFormData({ ...formData, headlineMain: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-100 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300">Headline Gradient Highlight (그라데이션 강조)</label>
                  <input
                    type="text"
                    value={formData.headlineHighlight}
                    onChange={(e) => setFormData({ ...formData, headlineHighlight: e.target.value })}
                    className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-cyan-300 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Sub Headline (보조 슬로건)</label>
                <input
                  type="text"
                  value={formData.subHeadline}
                  onChange={(e) => setFormData({ ...formData, subHeadline: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-100 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Korean Main Bio */}
              <div className="space-y-1">
                <label className="text-cyan-300 font-bold">Main Bio (핵심 소개 문장 - 예: 나는 로봇을 만들고 코딩을 하는 사람이다.)</label>
                <input
                  type="text"
                  value={formData.bioMain}
                  onChange={(e) => setFormData({ ...formData, bioMain: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050c17] border border-cyan-500/60 rounded-lg text-cyan-100 focus:border-cyan-400 focus:outline-none font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Bio Detail (상세 엔지니어링 소개)</label>
                <textarea
                  rows={3}
                  value={formData.bioSub}
                  onChange={(e) => setFormData({ ...formData, bioSub: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-100 focus:border-cyan-400 focus:outline-none font-sans"
                />
              </div>

              {/* Quote */}
              <div className="space-y-1 p-3 rounded-xl bg-[#040912] border border-cyan-900/40">
                <label className="text-cyan-400 font-bold">Featured Quote (철학/목표 인용구)</label>
                <textarea
                  rows={2}
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-100 focus:border-cyan-400 focus:outline-none font-sans"
                />
                <div className="pt-1">
                  <label className="text-slate-400 text-[10px]">Quote Author / Context (출처/설명)</label>
                  <input
                    type="text"
                    value={formData.quoteAuthor}
                    onChange={(e) => setFormData({ ...formData, quoteAuthor: e.target.value })}
                    className="w-full px-3 py-1.5 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PHOTO */}
          {activeTab === 'photo' && (
            <div className="space-y-4">
              {/* Display Mode Selection */}
              <div className="p-3 rounded-xl bg-[#050c17] border border-slate-800 space-y-2">
                <label className="text-slate-300 font-bold block">
                  우측 메인 비주얼 표시 모드
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageMode: 'photo' })}
                    className={`p-2 rounded-lg border text-center transition-colors cursor-pointer ${
                      formData.imageMode === 'photo'
                        ? 'border-cyan-400 bg-cyan-950/80 text-cyan-300 font-bold'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    실제 로봇 사진
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageMode: 'visual' })}
                    className={`p-2 rounded-lg border text-center transition-colors cursor-pointer ${
                      formData.imageMode === 'visual'
                        ? 'border-cyan-400 bg-cyan-950/80 text-cyan-300 font-bold'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    사이버 시뮬레이터
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageMode: 'both' })}
                    className={`p-2 rounded-lg border text-center transition-colors cursor-pointer ${
                      formData.imageMode === 'both'
                        ? 'border-cyan-400 bg-cyan-950/80 text-cyan-300 font-bold'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    토글 탭 모드
                  </button>
                </div>
              </div>

              {/* Image Editor Component */}
              <ImageEditorField
                value={formData.imageUrl || ''}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                filter={formData.imageFilter}
                onFilterChange={(filter) => setFormData({ ...formData, imageFilter: filter })}
                presetCategory="hero"
                label="메인 히어로 로봇/프로필 사진"
                helperText="내 컴퓨터 사진 파일 업로드, 외부 URL 또는 갤러리 프리셋을 등록할 수 있습니다."
              />
            </div>
          )}

          {/* TAB 3: METRICS */}
          {activeTab === 'metrics' && (
            <div className="space-y-3">
              <p className="text-slate-400 text-xs">
                히어로 영역 하단에 표시되는 3개의 핵심 텔레메트리 지표입니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5 p-3 rounded-lg bg-[#050c17] border border-cyan-900/40">
                  <span className="text-cyan-400 font-bold">지표 1 (Cyan)</span>
                  <input
                    type="text"
                    value={formData.metrics.metric1Val}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, metric1Val: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-cyan-300 font-bold text-sm"
                  />
                  <input
                    type="text"
                    value={formData.metrics.metric1Label}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, metric1Label: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-400 text-[10px]"
                  />
                </div>

                <div className="space-y-1.5 p-3 rounded-lg bg-[#050c17] border border-purple-900/40">
                  <span className="text-purple-400 font-bold">지표 2 (Purple)</span>
                  <input
                    type="text"
                    value={formData.metrics.metric2Val}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, metric2Val: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-purple-300 font-bold text-sm"
                  />
                  <input
                    type="text"
                    value={formData.metrics.metric2Label}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, metric2Label: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-400 text-[10px]"
                  />
                </div>

                <div className="space-y-1.5 p-3 rounded-lg bg-[#050c17] border border-sky-900/40">
                  <span className="text-sky-400 font-bold">지표 3 (Sky)</span>
                  <input
                    type="text"
                    value={formData.metrics.metric3Val}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, metric3Val: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded text-sky-300 font-bold text-sm"
                  />
                  <input
                    type="text"
                    value={formData.metrics.metric3Label}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metrics: { ...formData.metrics, metric3Label: e.target.value },
                      })
                    }
                    className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-400 text-[10px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-bold flex items-center gap-1.5 shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all cursor-pointer"
            >
              <Check size={16} />
              <span>저장 (FIRESTORE SYNC)</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

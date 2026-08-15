import React, { useState } from 'react';
import { HeroData } from '../../types';
import { Edit3, Check, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EditHeroModalProps {
  heroData: HeroData;
  onSave: (data: HeroData) => void;
  onClose: () => void;
}

export const EditHeroModal: React.FC<EditHeroModalProps> = ({ heroData, onSave, onClose }) => {
  const [formData, setFormData] = useState<HeroData>({ ...heroData });

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
              <h3 className="text-lg font-bold font-['Orbitron'] text-white">HERO & BIO 편집</h3>
              <p className="text-xs text-slate-400 font-mono">메인 소개글 및 목표 인용구 수정</p>
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
              className="w-full px-3 py-2 bg-[#050c17] border border-cyan-500/50 rounded-lg text-white font-sans text-sm focus:border-cyan-400 focus:outline-none font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300">Sub Bio (상세 설명 문장)</label>
            <textarea
              rows={2}
              value={formData.bioSub}
              onChange={(e) => setFormData({ ...formData, bioSub: e.target.value })}
              className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-200 font-sans focus:border-cyan-400 focus:outline-none resize-none"
            />
          </div>

          {/* Target Quote Card */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-900/60 space-y-3">
            <h4 className="text-cyan-400 font-bold font-['Orbitron']">🎯 TARGET GOAL QUOTE CARD</h4>
            
            <div className="space-y-1">
              <label className="text-slate-300">Target Goal Quote (목표 인용구)</label>
              <input
                type="text"
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-slate-100 font-sans font-semibold focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300">Quote Label (인용구 하단 라벨)</label>
              <input
                type="text"
                value={formData.quoteAuthor}
                onChange={(e) => setFormData({ ...formData, quoteAuthor: e.target.value })}
                className="w-full px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-cyan-300 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="space-y-2">
            <label className="text-slate-300 font-bold">Quick Metric Numbers & Labels</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-2.5 rounded bg-[#050c17] border border-slate-800 space-y-1">
                <input
                  type="text"
                  placeholder="Metric 1 Value"
                  value={formData.metrics.metric1Val}
                  onChange={(e) => setFormData({
                    ...formData,
                    metrics: { ...formData.metrics, metric1Val: e.target.value }
                  })}
                  className="w-full px-2 py-1 bg-black border border-slate-700 rounded text-cyan-400 font-bold"
                />
                <input
                  type="text"
                  placeholder="Metric 1 Label"
                  value={formData.metrics.metric1Label}
                  onChange={(e) => setFormData({
                    ...formData,
                    metrics: { ...formData.metrics, metric1Label: e.target.value }
                  })}
                  className="w-full px-2 py-1 bg-black border border-slate-700 rounded text-slate-300 text-[11px]"
                />
              </div>

              <div className="p-2.5 rounded bg-[#050c17] border border-slate-800 space-y-1">
                <input
                  type="text"
                  placeholder="Metric 2 Value"
                  value={formData.metrics.metric2Val}
                  onChange={(e) => setFormData({
                    ...formData,
                    metrics: { ...formData.metrics, metric2Val: e.target.value }
                  })}
                  className="w-full px-2 py-1 bg-black border border-slate-700 rounded text-purple-400 font-bold"
                />
                <input
                  type="text"
                  placeholder="Metric 2 Label"
                  value={formData.metrics.metric2Label}
                  onChange={(e) => setFormData({
                    ...formData,
                    metrics: { ...formData.metrics, metric2Label: e.target.value }
                  })}
                  className="w-full px-2 py-1 bg-black border border-slate-700 rounded text-slate-300 text-[11px]"
                />
              </div>

              <div className="p-2.5 rounded bg-[#050c17] border border-slate-800 space-y-1">
                <input
                  type="text"
                  placeholder="Metric 3 Value"
                  value={formData.metrics.metric3Val}
                  onChange={(e) => setFormData({
                    ...formData,
                    metrics: { ...formData.metrics, metric3Val: e.target.value }
                  })}
                  className="w-full px-2 py-1 bg-black border border-slate-700 rounded text-sky-400 font-bold"
                />
                <input
                  type="text"
                  placeholder="Metric 3 Label"
                  value={formData.metrics.metric3Label}
                  onChange={(e) => setFormData({
                    ...formData,
                    metrics: { ...formData.metrics, metric3Label: e.target.value }
                  })}
                  className="w-full px-2 py-1 bg-black border border-slate-700 rounded text-slate-300 text-[11px]"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-800">
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
              <span>저장 (SAVE CHANGES)</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

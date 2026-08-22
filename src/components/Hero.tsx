import React, { useState } from 'react';
import { HeroRobotVisual } from './HeroRobotVisual';
import { ArrowRight, FileText, Edit3 } from 'lucide-react';
import { RobotLogo } from './RobotLogo';
import { usePortfolio } from '../context/PortfolioContext';
import { EditHeroModal } from './modals/EditHeroModal';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { heroData, updateHeroData, isAdmin } = usePortfolio();
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <section
      id="about"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-32 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Hero Text & Identity */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            
            {/* Top Identity Tag / Mobile Badge */}
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-['Orbitron'] font-semibold">{heroData.tagline}</span>
              </div>

              {isAdmin && (
                <button
                  id="edit-hero-btn"
                  onClick={() => setShowEditModal(true)}
                  className="px-3 py-1 text-xs font-mono font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.6)] cursor-pointer"
                >
                  <Edit3 size={13} />
                  <span>소개글 편집</span>
                </button>
              )}
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Orbitron'] tracking-tight text-white leading-tight">
                {heroData.headlineMain}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                  {heroData.headlineHighlight}
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-cyan-300/90 font-['Rajdhani'] tracking-wide">
                {heroData.subHeadline}
              </p>
            </div>

            {/* Korean Bio (Direct from Image 2 & User Request) */}
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-slate-200 font-medium">
                {heroData.bioMain}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed font-sans max-w-xl">
                {heroData.bioSub}
              </p>
            </div>

            {/* Target Quote Card with Neon Cyan Vertical Bar (Direct from Image 2) */}
            <div
              id="hero-quote-card"
              className="relative pl-5 py-3 border-l-4 border-cyan-400 bg-slate-900/40 rounded-r-xl backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.08)] group hover:bg-slate-900/60 transition-colors"
            >
              <p className="text-base sm:text-lg font-semibold text-slate-100 italic tracking-wide font-sans">
                “{heroData.quote}”
              </p>
              <span className="block mt-1 text-xs text-cyan-400/80 font-mono">
                {heroData.quoteAuthor}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-explore-work-btn"
                onClick={() => onNavigate('portfolio')}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold font-['Orbitron'] tracking-widest text-[#060b13] bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:shadow-[0_0_30px_rgba(34,211,238,0.9)] transition-all uppercase cursor-pointer active:scale-95"
              >
                <span>EXPLORE WORK</span>
                <ArrowRight size={15} />
              </button>

              <button
                id="hero-view-resume-btn"
                onClick={() => setShowResumeModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold font-['Orbitron'] tracking-widest text-cyan-300 hover:text-white bg-slate-950/60 hover:bg-cyan-950/40 border border-cyan-500/50 hover:border-cyan-400 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all uppercase cursor-pointer"
              >
                <FileText size={15} />
                <span>VIEW RESUME</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 font-mono text-xs">
              <div className="space-y-0.5">
                <span className="text-cyan-400 text-base font-bold font-['Orbitron']">
                  {heroData.metrics.metric1Val}
                </span>
                <p className="text-[11px] text-slate-400">{heroData.metrics.metric1Label}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-purple-400 text-base font-bold font-['Orbitron']">
                  {heroData.metrics.metric2Val}
                </span>
                <p className="text-[11px] text-slate-400">{heroData.metrics.metric2Label}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-sky-400 text-base font-bold font-['Orbitron']">
                  {heroData.metrics.metric3Val}
                </span>
                <p className="text-[11px] text-slate-400">{heroData.metrics.metric3Label}</p>
              </div>
            </div>

          </div>

          {/* Right Column: High-Tech Hero Robot PCB Assembly Visual */}
          <div className="lg:col-span-6">
            <HeroRobotVisual />
          </div>

        </div>
      </div>

      {/* Edit Hero Modal */}
      {showEditModal && (
        <EditHeroModal
          heroData={heroData}
          onSave={updateHeroData}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Resume / Profile Summary Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#08111e] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(34,211,238,0.25)] space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <RobotLogo size="sm" showText={false} />
                <div>
                  <h3 className="text-lg font-bold font-['Orbitron'] text-white">ENGINEER PROFILE & RESUME</h3>
                  <p className="text-xs text-cyan-400 font-mono">Wonwoo Jang (K.F.C. F=ma)</p>
                </div>
              </div>
              <button
                onClick={() => setShowResumeModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">Summary</h4>
                <p className="mt-1 text-slate-300 text-xs sm:text-sm leading-relaxed">
                  로봇 제작 및 소프트웨어 알고리즘 개발을 전문으로 하는 로보틱스 엔지니어입니다. WRO 및 RoboCup 대회 출전을 통해 하드웨어 섀시 기구 설계부터 듀얼 센서 기반 PID 라인트레이싱, 모터 출력 편차 보정 제어기까지 전 과정을 직접 수행하였습니다.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">Education & Competitions</h4>
                <ul className="mt-1 space-y-1.5 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">▹</span>
                    <span><strong>2026 WRO Korea Open</strong> — K.F.C. (F=ma) 메인 프로그래머 & 기구 설계</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">▹</span>
                    <span><strong>2026 RoboCup Open South Korea</strong> — <strong className="text-purple-300">연구일지상 수상</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-400">▹</span>
                    <span><strong>National Robotics Challenge</strong> — 모듈형 섀시 시스템 개발</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">Technical Skillset</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Block Coding', 'Embedded C', 'Python (Pybricks)', 'PID Control', 'Robot Mechanism Design', 'OpenCV Vision', 'React / Web', 'Gemini AI'].map(tag => (
                    <span key={tag} className="px-2.5 py-1 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowResumeModal(false);
                  onNavigate('portfolio');
                }}
                className="px-5 py-2.5 text-xs font-bold font-['Orbitron'] text-[#060b13] bg-cyan-400 hover:bg-cyan-300 rounded-lg cursor-pointer"
              >
                EXPLORE PROJECTS
              </button>
              <button
                onClick={() => setShowResumeModal(false)}
                className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

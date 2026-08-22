import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImageEditorField } from '../common/ImageEditorField';
import { 
  Camera, 
  X, 
  Check, 
  Sparkles, 
  Bot, 
  Trophy, 
  Award, 
  Sliders, 
  Save, 
  Layers,
  Eye,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PhotoManagerModalProps {
  onClose: () => void;
  defaultSection?: 'hero' | 'projects' | 'competitions' | 'achievements';
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  onClose,
  defaultSection = 'hero'
}) => {
  const { 
    heroData, 
    updateHeroData, 
    projects, 
    updateProject, 
    competitions, 
    updateCompetition, 
    achievements, 
    updateAchievement 
  } = usePortfolio();

  const [section, setSection] = useState<'hero' | 'projects' | 'competitions' | 'achievements'>(defaultSection);
  
  // Hero Local state
  const [heroImgUrl, setHeroImgUrl] = useState(heroData.imageUrl || '');
  const [heroImgMode, setHeroImgMode] = useState<'visual' | 'photo' | 'both'>(heroData.imageMode || 'photo');
  const [heroFilter, setHeroFilter] = useState(heroData.imageFilter || { brightness: 100, contrast: 100, glow: false, grayscale: false });

  // Selected sub items
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [selectedCompId, setSelectedCompId] = useState<string>(competitions[0]?.id || '');
  const [selectedAchId, setSelectedAchId] = useState<string>(achievements[0]?.id || '');

  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');

  // Handle Hero Save
  const handleSaveHero = async () => {
    await updateHeroData({
      imageUrl: heroImgUrl,
      imageMode: heroImgMode,
      imageFilter: heroFilter
    });
    triggerSuccess('메인 히어로 사진 및 비주얼 설정이 클라우드에 저장되었습니다!');
  };

  // Handle Project Image Save
  const currentProject = projects.find(p => p.id === selectedProjectId);
  const handleUpdateProjectImage = async (newUrl: string) => {
    if (!currentProject) return;
    await updateProject(currentProject.id, {
      imageUrl: newUrl
    });
    triggerSuccess(`'${currentProject.title}' 프로젝트 사진이 업데이트되었습니다!`);
  };

  // Handle Competition Image Save
  const currentComp = competitions.find(c => c.id === selectedCompId);
  const handleUpdateCompImage = async (newUrl: string) => {
    if (!currentComp) return;
    await updateCompetition(currentComp.id, {
      imageUrl: newUrl
    });
    triggerSuccess(`'${currentComp.title}' 대회 사진이 업데이트되었습니다!`);
  };

  // Handle Achievement Image Save
  const currentAch = achievements.find(a => a.id === selectedAchId);
  const handleUpdateAchImage = async (newUrl: string) => {
    if (!currentAch) return;
    await updateAchievement(currentAch.id, {
      imageUrl: newUrl
    });
    triggerSuccess(`'${currentAch.title}' 수상 사진이 업데이트되었습니다!`);
  };

  const triggerSuccess = (msg: string) => {
    setSavedSuccessMsg(msg);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#22d3ee', '#38bdf8', '#a855f7']
    });
    setTimeout(() => setSavedSuccessMsg(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#08111e] border border-cyan-500/60 rounded-2xl shadow-[0_0_50px_rgba(34,211,238,0.3)] flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#060c16]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              <Camera size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Orbitron'] text-white flex items-center gap-2">
                PHOTO & MEDIA STUDIO
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700 font-mono">
                  Admin Realtime Editor
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                포트폴리오 내 모든 로봇·대회·프로젝트 사진 등록 및 실시간 클라우드 동기화
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success Alert Banner */}
        {savedSuccessMsg && (
          <div className="px-6 py-2 bg-emerald-950/80 border-b border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center justify-between animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <Check size={15} className="text-emerald-400" />
              <span>{savedSuccessMsg}</span>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-[#050b14] px-6 text-xs font-mono overflow-x-auto">
          <button
            onClick={() => setSection('hero')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              section === 'hero'
                ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot size={15} />
            <span>메인 히어로 로봇/프로필 사진</span>
          </button>

          <button
            onClick={() => setSection('projects')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              section === 'projects'
                ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers size={15} />
            <span>프로젝트 아카이브 사진 ({projects.length})</span>
          </button>

          <button
            onClick={() => setSection('competitions')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              section === 'competitions'
                ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy size={15} />
            <span>대회 현장 사진 ({competitions.length})</span>
          </button>

          <button
            onClick={() => setSection('achievements')}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              section === 'achievements'
                ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-950/30'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award size={15} />
            <span>수상 및 연구일지 사진 ({achievements.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* SECTION 1: HERO */}
          {section === 'hero' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#050c17] border border-cyan-900/50 space-y-4 font-mono">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-white font-['Orbitron']">
                      HERO DISPLAY MODE (표시 모드 선택)
                    </h4>
                    <p className="text-xs text-slate-400">
                      메인 우측 영역에 표시할 형태를 선택하세요.
                    </p>
                  </div>

                  {/* Mode Buttons */}
                  <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-700 text-xs">
                    <button
                      type="button"
                      onClick={() => setHeroImgMode('photo')}
                      className={`px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer transition-colors ${
                        heroImgMode === 'photo'
                          ? 'bg-cyan-400 text-black font-bold shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Camera size={13} />
                      <span>실제 로봇 사진</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setHeroImgMode('visual')}
                      className={`px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer transition-colors ${
                        heroImgMode === 'visual'
                          ? 'bg-cyan-400 text-black font-bold shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Bot size={13} />
                      <span>사이버 시뮬레이터</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setHeroImgMode('both')}
                      className={`px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer transition-colors ${
                        heroImgMode === 'both'
                          ? 'bg-cyan-400 text-black font-bold shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Eye size={13} />
                      <span>탭 전환 모드</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hero Image Editor Field */}
              <ImageEditorField
                value={heroImgUrl}
                onChange={setHeroImgUrl}
                filter={heroFilter}
                onFilterChange={setHeroFilter}
                presetCategory="hero"
                label="메인 히어로 로봇 / 엔지니어 프로필 사진"
                helperText="포트폴리오 최상단 메인 화면에 표시될 대표 로봇 혹은 연구실 사진을 등록하세요."
              />

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSaveHero}
                  className="w-full py-3.5 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 active:scale-[0.99] text-black font-bold font-['Orbitron'] tracking-widest text-xs uppercase shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save size={16} />
                  <span>히어로 사진 설정 저장 (FIRESTORE SYNC)</span>
                </button>
              </div>
            </div>
          )}

          {/* SECTION 2: PROJECTS */}
          {section === 'projects' && (
            <div className="space-y-5">
              {/* Project Selector */}
              <div className="space-y-1 font-mono">
                <label className="text-xs text-slate-300 font-bold flex items-center gap-1.5">
                  <FolderOpen size={14} className="text-cyan-400" />
                  <span>편집할 프로젝트 선택</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {projects.map((proj) => (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => setSelectedProjectId(proj.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedProjectId === proj.id
                          ? 'border-cyan-400 bg-cyan-950/70 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                          : 'border-slate-800 bg-[#050c17] hover:border-slate-700'
                      }`}
                    >
                      <span className="text-[10px] text-cyan-400 block font-mono">{proj.tag || 'Project'}</span>
                      <h4 className="text-xs font-bold text-white font-['Orbitron'] line-clamp-1">{proj.title}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{proj.subtitle}</p>
                    </button>
                  ))}
                </div>
              </div>

              {currentProject && (
                <div className="p-4 rounded-xl bg-[#050c17] border border-cyan-900/40 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-[10px] text-cyan-400 font-mono">SELECTED PROJECT</span>
                    <h3 className="text-base font-bold font-['Orbitron'] text-white">
                      {currentProject.title} ({currentProject.subtitle})
                    </h3>
                  </div>

                  <ImageEditorField
                    value={currentProject.imageUrl || ''}
                    onChange={handleUpdateProjectImage}
                    presetCategory="project"
                    label={`${currentProject.title} 로봇/하드웨어 사진`}
                    helperText="프로젝트 카드 및 상세 보기 모달에서 설계도와 함께 표시될 실제 하드웨어 사진입니다."
                  />
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: COMPETITIONS */}
          {section === 'competitions' && (
            <div className="space-y-5">
              {/* Competition Selector */}
              <div className="space-y-1 font-mono">
                <label className="text-xs text-slate-300 font-bold flex items-center gap-1.5">
                  <Trophy size={14} className="text-cyan-400" />
                  <span>편집할 대회 선택</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {competitions.map((comp) => (
                    <button
                      key={comp.id}
                      type="button"
                      onClick={() => setSelectedCompId(comp.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedCompId === comp.id
                          ? 'border-cyan-400 bg-cyan-950/70 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                          : 'border-slate-800 bg-[#050c17] hover:border-slate-700'
                      }`}
                    >
                      <span className="text-[10px] text-purple-400 block font-mono">{comp.year} ARCHIVE</span>
                      <h4 className="text-xs font-bold text-white font-['Orbitron'] line-clamp-1">{comp.title}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">Team: {comp.teamName}</p>
                    </button>
                  ))}
                </div>
              </div>

              {currentComp && (
                <div className="p-4 rounded-xl bg-[#050c17] border border-cyan-900/40 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-[10px] text-purple-400 font-mono">{currentComp.year} TOURNAMENT</span>
                    <h3 className="text-base font-bold font-['Orbitron'] text-white">
                      {currentComp.title} ({currentComp.teamName})
                    </h3>
                  </div>

                  <ImageEditorField
                    value={currentComp.imageUrl || ''}
                    onChange={handleUpdateCompImage}
                    presetCategory="competition"
                    label={`${currentComp.title} 대회 경기장/팀 사진`}
                    helperText="대회 경기 현장, 팀 단체 사진, 대회장 부스 사진 등을 등록할 수 있습니다."
                  />
                </div>
              )}
            </div>
          )}

          {/* SECTION 4: ACHIEVEMENTS */}
          {section === 'achievements' && (
            <div className="space-y-5">
              {/* Achievement Selector */}
              <div className="space-y-1 font-mono">
                <label className="text-xs text-slate-300 font-bold flex items-center gap-1.5">
                  <Award size={14} className="text-purple-400" />
                  <span>편집할 수상 실적 선택</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {achievements.map((ach) => (
                    <button
                      key={ach.id}
                      type="button"
                      onClick={() => setSelectedAchId(ach.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedAchId === ach.id
                          ? 'border-purple-400 bg-purple-950/70 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                          : 'border-slate-800 bg-[#050c17] hover:border-slate-700'
                      }`}
                    >
                      <span className="text-[10px] text-purple-400 block font-mono">{ach.year} AWARD</span>
                      <h4 className="text-xs font-bold text-white font-['Orbitron'] line-clamp-1">{ach.awardName}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{ach.title}</p>
                    </button>
                  ))}
                </div>
              </div>

              {currentAch && (
                <div className="p-4 rounded-xl bg-[#050c17] border border-purple-900/40 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-[10px] text-purple-400 font-mono">HONOR & LOGBOOK</span>
                    <h3 className="text-base font-bold font-['Orbitron'] text-white">
                      {currentAch.awardName}
                    </h3>
                    <p className="text-xs text-purple-300 font-mono">{currentAch.title}</p>
                  </div>

                  <ImageEditorField
                    value={currentAch.imageUrl || ''}
                    onChange={handleUpdateAchImage}
                    presetCategory="award"
                    label={`${currentAch.awardName} 상장/트로피/연구일지 사진`}
                    helperText="수상 상장 사진, 트로피 또는 연구일지 실제 페이지 스캔본을 등록하세요."
                  />
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#060c16] flex items-center justify-between text-xs font-mono">
          <p className="text-slate-500 text-[11px]">
            클라우드 Firestore 실시간 자동 동기화 활성화됨
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
          >
            닫기 (CLOSE)
          </button>
        </div>

      </div>
    </div>
  );
};

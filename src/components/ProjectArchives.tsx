import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { EditProjectModal } from './modals/EditProjectModal';
import { 
  Cpu, 
  Bot, 
  Layers, 
  ArrowRight, 
  Code, 
  Sliders, 
  Play, 
  Sparkles, 
  X, 
  ShieldCheck, 
  ExternalLink,
  RotateCcw,
  Plus,
  Edit3
} from 'lucide-react';

export const ProjectArchives: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject, isAdmin } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'blueprint' | 'code' | 'sim'>('overview');

  // Interactive PID Simulator state inside project modal
  const [kp, setKp] = useState(1.4);
  const [ki, setKi] = useState(0.02);
  const [kd, setKd] = useState(0.35);
  const [robotPos, setRobotPos] = useState(0); // -100 to 100
  const [simRunning, setSimRunning] = useState(false);

  const runSimulationStep = () => {
    setSimRunning(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      // Simulates noisy line curvature and PID response
      const noise = Math.sin(step * 0.4) * 40;
      const error = noise - robotPos;
      const correction = error * (kp * 0.4) + (kd * 0.1);
      setRobotPos((prev) => Math.max(-60, Math.min(60, prev + correction * 0.3)));

      if (step > 40) {
        clearInterval(interval);
        setSimRunning(false);
      }
    }, 80);
  };

  return (
    <section id="portfolio" className="relative py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center justify-center gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Orbitron'] text-white tracking-wider">
            Project Archives
          </h2>
          {isAdmin && (
            <button
              onClick={() => setIsCreating(true)}
              className="px-3 py-1 text-xs font-mono font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.6)] cursor-pointer"
            >
              <Plus size={13} />
              <span>프로젝트 추가</span>
            </button>
          )}
        </div>
        <p className="text-sm text-slate-400 max-w-xl mx-auto font-sans">
          실제 대회 및 연구 목적으로 설계·제작된 로봇 하드웨어 & 자율 소프트웨어 시스템
        </p>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent mx-auto" />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((proj) => (
          <div
            key={proj.id}
            id={`project-card-${proj.id}`}
            className="relative rounded-2xl border border-cyan-900/50 bg-[#08111e]/90 backdrop-blur-md overflow-hidden flex flex-col justify-between group hover:border-cyan-400/60 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
          >
            {/* Admin Edit Trigger */}
            {isAdmin && (
              <button
                onClick={() => setEditingProject(proj)}
                className="absolute top-3 left-3 p-1.5 rounded-lg bg-cyan-950/90 border border-cyan-400/60 text-cyan-300 hover:bg-cyan-800 hover:text-white transition-colors z-20"
                title="프로젝트 수정"
              >
                <Edit3 size={14} />
              </button>
            )}

            {/* Top Blueprint Graphic Preview Banner */}
            <div className="relative h-44 sm:h-48 w-full bg-[#050b14] border-b border-cyan-900/40 p-3 overflow-hidden flex items-center justify-center">
              
              {/* Technical Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(34, 211, 238, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.15) 1px, transparent 1px)`,
                  backgroundSize: '16px 16px'
                }}
              />

              {/* Blueprint Graphic based on type */}
              {proj.imageType === 'blueprint' ? (
                /* AURORA-7 Competition Robot Blueprint */
                <svg viewBox="0 0 400 180" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                  {/* Schematic Title */}
                  <text x="15" y="20" fill="#38bdf8" fontSize="10" fontFamily="Orbitron" fontWeight="bold">
                    AURORA-7: COMPETITION ROBOT MK.IV
                  </text>
                  <text x="320" y="20" fill="#a855f7" fontSize="8" fontFamily="monospace">
                    6-DOF MANIPULATOR
                  </text>

                  {/* Robot Chassis Blueprint Outline */}
                  <rect x="70" y="55" width="260" height="90" rx="8" fill="#0c1a2f" stroke="#0284c7" strokeWidth="1.5" />
                  
                  {/* Dual Drive Wheels with treads */}
                  <rect x="50" y="70" width="30" height="60" rx="4" fill="#030712" stroke="#22d3ee" strokeWidth="1.5" />
                  <rect x="320" y="70" width="30" height="60" rx="4" fill="#030712" stroke="#22d3ee" strokeWidth="1.5" />
                  
                  {/* Color Sensor Units */}
                  <circle cx="110" cy="140" r="10" fill="#071526" stroke="#22d3ee" strokeWidth="1.5" />
                  <circle cx="110" cy="140" r="4" fill="#38bdf8" />
                  <circle cx="290" cy="140" r="10" fill="#071526" stroke="#22d3ee" strokeWidth="1.5" />
                  <circle cx="290" cy="140" r="4" fill="#38bdf8" />
                  <line x1="110" y1="140" x2="290" y2="140" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Robotic Arm Gripper Mast */}
                  <polygon points="180,60 220,60 200,30" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="200" y1="30" x2="250" y2="45" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="250" cy="45" r="5" fill="#a855f7" />

                  {/* Dimension Markers */}
                  <text x="15" y="85" fill="#0284c7" fontSize="7" fontFamily="monospace">POWER: 7.4V LI-PO</text>
                  <text x="15" y="98" fill="#0284c7" fontSize="7" fontFamily="monospace">CHASSIS: TITANIUM ALLOY</text>
                  <text x="15" y="111" fill="#0284c7" fontSize="7" fontFamily="monospace">DUAL TRACKED MOTORS</text>
                </svg>
              ) : proj.imageType === 'drone' ? (
                /* Nexus Drone Controller PCB */
                <svg viewBox="0 0 400 180" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                  <text x="15" y="20" fill="#38bdf8" fontSize="10" fontFamily="Orbitron" fontWeight="bold">
                    NEXUS FLIGHT CONTROLLER PCB
                  </text>
                  <rect x="110" y="40" width="180" height="110" rx="8" fill="#08182b" stroke="#0ea5e9" strokeWidth="1.5" />
                  {/* Central Processor */}
                  <rect x="170" y="70" width="60" height="50" rx="4" fill="#0284c7" fillOpacity="0.4" stroke="#22d3ee" strokeWidth="1.5" />
                  <text x="178" y="98" fill="#e0f2fe" fontSize="8" fontFamily="monospace" fontWeight="bold">STM32F4</text>
                  {/* Circuit traces */}
                  <path d="M 130 60 L 170 60" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
                  <path d="M 230 90 L 270 90" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
                  <circle cx="130" cy="60" r="4" fill="#a855f7" />
                  <circle cx="270" cy="90" r="4" fill="#22d3ee" />
                </svg>
              ) : (
                /* Quadruped Gait Simulation */
                <svg viewBox="0 0 400 180" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                  <text x="15" y="20" fill="#c084fc" fontSize="10" fontFamily="Orbitron" fontWeight="bold">
                    UNIT-404 QUADRUPED GAIT ENGINE
                  </text>
                  {/* Robot Dog Body Skeleton */}
                  <rect x="150" y="60" width="100" height="36" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                  {/* Legs */}
                  <line x1="165" y1="96" x2="140" y2="140" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                  <line x1="140" y1="140" x2="130" y2="160" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
                  <line x1="235" y1="96" x2="260" y2="135" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                  <line x1="260" y1="135" x2="270" y2="160" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
                  {/* Sensor Eye */}
                  <circle cx="240" cy="72" r="4" fill="#22d3ee" />
                </svg>
              )}

              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-[10px] font-mono text-cyan-300">
                {proj.tag}
              </div>
            </div>

            {/* Project Content Area */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              
              <div className="space-y-2">
                {/* Title & Tag */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold font-['Orbitron'] text-white group-hover:text-cyan-300 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-300 font-sans mt-0.5">
                      {proj.subtitle}
                    </p>
                  </div>

                  <span className="px-2.5 py-1 text-[11px] font-['Orbitron'] font-bold rounded border border-purple-500/80 bg-purple-950/40 text-purple-300">
                    {proj.tag}
                  </span>
                </div>

                {/* Summary Text */}
                <p className="text-xs text-slate-400 font-sans line-clamp-2 leading-relaxed">
                  {proj.summary}
                </p>
              </div>

              {/* Tags / Sensors List (Matching Image 2) */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] font-mono rounded bg-[#050b14] border border-slate-800 text-slate-300 group-hover:border-cyan-900/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Main Action Button (자세히 보기 ➔) (Direct from Image 2) */}
                <button
                  id={`project-details-btn-${proj.id}`}
                  onClick={() => {
                    setSelectedProject(proj);
                    setActiveTab('overview');
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-950 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-400/80 text-xs font-bold font-['Orbitron'] tracking-widest text-slate-200 hover:text-cyan-300 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
                >
                  <span>자세히 보기</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Comprehensive Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#08111e] border border-cyan-500/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(34,211,238,0.25)] space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-cyan-950 text-cyan-300 border border-cyan-700/60">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{selectedProject.blueprintTitle}</span>
                </div>
                <h3 className="text-2xl font-bold font-['Orbitron'] text-white mt-1">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-cyan-400 font-medium font-sans">{selectedProject.subtitle}</p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-slate-800 gap-4 text-xs font-mono">
              {[
                { id: 'overview', label: '시스템 개요 (Overview)' },
                { id: 'code', label: '알고리즘 코드 (Code)' },
                { id: 'sim', label: 'PID 튜닝 시뮬레이터 (Simulator)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-2 border-b-2 font-bold cursor-pointer transition-colors ${
                    activeTab === tab.id
                      ? 'border-cyan-400 text-cyan-300'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6 text-sm text-slate-300 font-sans">
                <div>
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                    프로젝트 상세 설명
                  </h4>
                  <p className="mt-1 text-slate-200 leading-relaxed text-sm">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Key Specifications Grid */}
                <div>
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono mb-2.5">
                    Hardware & System Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                    {selectedProject.specs.map((spec, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/90 flex justify-between">
                        <span className="text-slate-400">{spec.label}:</span>
                        <span className="text-cyan-300 font-semibold text-right ml-2">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono mb-2">
                    주요 엔지니어링 특징
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm">
                    {selectedProject.keyFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-mono">▹</span>
                        <span className="text-slate-300">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Source Code Snippet */}
            {activeTab === 'code' && selectedProject.codeSnippet && (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>{selectedProject.codeSnippet.description}</span>
                  <span className="text-cyan-400 uppercase font-bold">{selectedProject.codeSnippet.language}</span>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 overflow-x-auto leading-relaxed shadow-inner max-h-96">
                  <code>{selectedProject.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            {/* Tab 3: Interactive PID Simulator */}
            {activeTab === 'sim' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold font-['Orbitron'] text-cyan-300">
                        WRO PID LINE TRACKING SIMULATOR
                      </h4>
                      <p className="text-xs text-slate-400 font-mono">
                        게인값(Kp, Ki, Kd)을 조절하여 로봇의 라인트레이싱 복원력을 테스트해보세요.
                      </p>
                    </div>
                    <button
                      onClick={runSimulationStep}
                      disabled={simRunning}
                      className="px-4 py-2 text-xs font-bold font-['Orbitron'] bg-cyan-400 hover:bg-cyan-300 text-black rounded flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Play size={13} />
                      <span>{simRunning ? '주행 중...' : '시뮬레이션 실행'}</span>
                    </button>
                  </div>

                  {/* Visual Track Area */}
                  <div className="relative h-28 w-full bg-[#050b14] rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center">
                    {/* Black Line representation */}
                    <div className="absolute inset-x-0 h-4 bg-slate-800 shadow-inner" />
                    
                    {/* Simulated Robot Marker */}
                    <div
                      className="absolute w-12 h-16 rounded-md bg-cyan-950 border-2 border-cyan-400 shadow-[0_0_15px_#22d3ee] flex flex-col items-center justify-center text-[9px] font-mono text-cyan-300 transition-all duration-75"
                      style={{
                        transform: `translateY(${robotPos}px) rotate(${robotPos * 0.4}deg)`,
                      }}
                    >
                      <span>F=ma</span>
                      <span className="text-[7px] text-white">MK.IV</span>
                    </div>

                    {/* Sensor Rays */}
                    <div
                      className="absolute w-2 h-2 rounded-full bg-red-400 animate-ping"
                      style={{ transform: `translateY(${robotPos}px)` }}
                    />
                  </div>

                  {/* Parameter Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono">
                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>Proportional (Kp):</span>
                        <span className="text-cyan-400 font-bold">{kp}</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="3.0"
                        step="0.05"
                        value={kp}
                        onChange={(e) => setKp(parseFloat(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>Integral (Ki):</span>
                        <span className="text-cyan-400 font-bold">{ki}</span>
                      </div>
                      <input
                        type="range"
                        min="0.00"
                        max="0.10"
                        step="0.005"
                        value={ki}
                        onChange={(e) => setKi(parseFloat(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>Derivative (Kd):</span>
                        <span className="text-cyan-400 font-bold">{kd}</span>
                      </div>
                      <input
                        type="range"
                        min="0.05"
                        max="1.5"
                        step="0.05"
                        value={kd}
                        onChange={(e) => setKd(parseFloat(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              {isAdmin ? (
                <button
                  onClick={() => {
                    const toEdit = selectedProject;
                    setSelectedProject(null);
                    setEditingProject(toEdit);
                  }}
                  className="px-4 py-2 text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/50 rounded-lg flex items-center gap-1.5"
                >
                  <Edit3 size={13} />
                  <span>내용 수정</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-500 font-mono">
                  SYSTEM VER: 2026.08_RELEASE
                </span>
              )}

              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 text-xs font-bold font-['Orbitron'] text-[#060b13] bg-cyan-400 hover:bg-cyan-300 rounded-lg"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <EditProjectModal
          initialData={editingProject}
          onSave={(updated) => updateProject(updated.id, updated)}
          onDelete={(id) => deleteProject(id)}
          onClose={() => setEditingProject(null)}
        />
      )}

      {/* Create Project Modal */}
      {isCreating && (
        <EditProjectModal
          onSave={(newProj) => addProject(newProj)}
          onClose={() => setIsCreating(false)}
        />
      )}

    </section>
  );
};

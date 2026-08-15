import React, { useState } from 'react';
import { SkillItem } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { EditSkillModal } from './modals/EditSkillModal';
import { 
  Puzzle, 
  Code2, 
  Terminal, 
  Bot, 
  Presentation, 
  Layout, 
  Cpu, 
  Sparkles, 
  CheckCircle,
  X,
  Code,
  Plus,
  Edit3
} from 'lucide-react';

export const CoreCapabilities: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill, isAdmin } = usePortfolio();
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Puzzle':
        return <Puzzle className="w-7 h-7 text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" />;
      case 'Code2':
        return <Code2 className="w-7 h-7 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" />;
      case 'Terminal':
        return <Terminal className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />;
      case 'Bot':
        return <Bot className="w-7 h-7 text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" />;
      case 'Presentation':
        return <Presentation className="w-7 h-7 text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]" />;
      case 'Layout':
        return <Layout className="w-7 h-7 text-purple-300 drop-shadow-[0_0_8px_rgba(216,180,254,0.8)]" />;
      case 'Cpu':
        return <Cpu className="w-7 h-7 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />;
      default:
        return <Bot className="w-7 h-7 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="relative py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center justify-center gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Orbitron'] text-white tracking-wider">
            Core Capabilities
          </h2>
          {isAdmin && (
            <button
              onClick={() => setIsCreating(true)}
              className="px-3 py-1 text-xs font-mono font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.6)] cursor-pointer"
            >
              <Plus size={13} />
              <span>기술 추가</span>
            </button>
          )}
        </div>
        <p className="text-sm text-slate-400 max-w-xl mx-auto font-sans">
          로봇 기구 설계부터 임베디드 펌웨어, 자율주행 알고리즘 및 웹 텔레메트리까지 포괄하는 핵심 기술 스택
        </p>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent mx-auto" />
      </div>

      {/* Skills Grid (Matching 2 Rows / 4 Columns Layout in Image 2) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {skills.map((skill) => (
          <div
            key={skill.id}
            id={`skill-card-${skill.id}`}
            onClick={() => setSelectedSkill(skill)}
            className="relative rounded-2xl border border-cyan-900/40 bg-[#08111e]/80 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center gap-3 cursor-pointer group hover:border-cyan-500/60 hover:bg-[#0c192c]/90 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]"
          >
            {/* Top Corner Admin Edit Trigger */}
            {isAdmin ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingSkill(skill);
                }}
                className="absolute top-2.5 right-2.5 p-1 rounded bg-cyan-950/80 border border-cyan-500/60 text-cyan-300 hover:bg-cyan-800 hover:text-white transition-colors z-10"
                title="스킬 수정"
              >
                <Edit3 size={13} />
              </button>
            ) : (
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-cyan-950 group-hover:bg-cyan-400 transition-colors" />
            )}

            {/* Icon Container with glowing neon outline */}
            <div className="p-3 rounded-xl bg-[#050c17] border border-slate-800/80 group-hover:border-cyan-500/40 transition-colors">
              {getIcon(skill.icon)}
            </div>

            {/* Title (Orbitron Font) */}
            <h3 className="text-xs sm:text-sm font-bold font-['Orbitron'] tracking-wider text-slate-200 group-hover:text-cyan-300 transition-colors">
              {skill.name}
            </h3>

            {/* Short Subtext / Tag */}
            <span className="text-[11px] text-slate-400 line-clamp-1 font-mono">
              {skill.shortDesc}
            </span>

            {/* Micro Progress Bar */}
            <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Selected Skill Modal with Code Sample & WRO Application */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#08111e] border border-cyan-500/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(34,211,238,0.25)] space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-cyan-800/60">
                  {getIcon(selectedSkill.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-['Orbitron'] text-white">
                    {selectedSkill.name}
                  </h3>
                  <p className="text-xs text-cyan-400 font-mono">{selectedSkill.shortDesc}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Description */}
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">Overview</h4>
                <p className="mt-1 text-slate-200 leading-relaxed font-sans">
                  {selectedSkill.description}
                </p>
              </div>

              {/* WRO Application */}
              {selectedSkill.wroApplication && (
                <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-900/60 text-xs">
                  <span className="font-bold text-cyan-300 font-mono block mb-1">
                    🎯 WRO & 로봇 대회 실전 활용:
                  </span>
                  <p className="text-slate-300 font-sans">{selectedSkill.wroApplication}</p>
                </div>
              )}

              {/* Tags */}
              <div>
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono mb-2">
                  Keywords & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-xs rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Code / Logic Sample */}
              {selectedSkill.codeSample && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-400 font-mono flex items-center gap-1.5">
                      <Code size={14} className="text-cyan-400" />
                      Implementation Snippet
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">SOURCE_CODE</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed shadow-inner">
                    <code>{selectedSkill.codeSample}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              {isAdmin ? (
                <button
                  onClick={() => {
                    const toEdit = selectedSkill;
                    setSelectedSkill(null);
                    setEditingSkill(toEdit);
                  }}
                  className="px-4 py-2 text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/50 rounded-lg flex items-center gap-1.5"
                >
                  <Edit3 size={13} />
                  <span>내용 수정</span>
                </button>
              ) : <div />}

              <button
                onClick={() => setSelectedSkill(null)}
                className="px-5 py-2 text-xs font-bold font-['Orbitron'] text-[#060b13] bg-cyan-400 hover:bg-cyan-300 rounded-lg"
              >
                DONE
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Edit Skill Modal */}
      {editingSkill && (
        <EditSkillModal
          initialData={editingSkill}
          onSave={(updated) => updateSkill(updated.id, updated)}
          onDelete={(id) => deleteSkill(id)}
          onClose={() => setEditingSkill(null)}
        />
      )}

      {/* Create Skill Modal */}
      {isCreating && (
        <EditSkillModal
          onSave={(newSkill) => addSkill(newSkill)}
          onClose={() => setIsCreating(false)}
        />
      )}

    </section>
  );
};


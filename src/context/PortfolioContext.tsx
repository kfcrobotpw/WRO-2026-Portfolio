import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  HeroData, 
  CompetitionLog, 
  SkillItem, 
  AchievementItem, 
  ProjectItem 
} from '../types';
import { 
  INITIAL_HERO_DATA, 
  INITIAL_COMPETITIONS, 
  SKILLS_DATA, 
  ACHIEVEMENTS_DATA, 
  PROJECTS_DATA 
} from '../data/portfolioData';

interface PortfolioContextType {
  isAdmin: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (password: string) => boolean;
  logout: () => void;

  heroData: HeroData;
  updateHeroData: (data: Partial<HeroData>) => void;

  competitions: CompetitionLog[];
  addCompetition: (comp: CompetitionLog) => void;
  updateCompetition: (id: string, comp: Partial<CompetitionLog>) => void;
  deleteCompetition: (id: string) => void;

  skills: SkillItem[];
  addSkill: (skill: SkillItem) => void;
  updateSkill: (id: string, skill: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;

  achievements: AchievementItem[];
  addAchievement: (ach: AchievementItem) => void;
  updateAchievement: (id: string, ach: Partial<AchievementItem>) => void;
  deleteAchievement: (id: string) => void;

  projects: ProjectItem[];
  addProject: (proj: ProjectItem) => void;
  updateProject: (id: string, proj: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  resetAllToDefault: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const AUTH_KEY = 'robot_portfolio_auth_admin';
const HERO_STORAGE_KEY = 'robot_portfolio_hero_data';
const COMPS_STORAGE_KEY = 'robot_portfolio_competitions';
const SKILLS_STORAGE_KEY = 'robot_portfolio_skills';
const ACH_STORAGE_KEY = 'robot_portfolio_achievements';
const PROJ_STORAGE_KEY = 'robot_portfolio_projects';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Hero Data state
  const [heroData, setHeroData] = useState<HeroData>(() => {
    const saved = localStorage.getItem(HERO_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_HERO_DATA;
      }
    }
    return INITIAL_HERO_DATA;
  });

  // Competitions state
  const [competitions, setCompetitions] = useState<CompetitionLog[]>(() => {
    const saved = localStorage.getItem(COMPS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_COMPETITIONS;
      }
    }
    return INITIAL_COMPETITIONS;
  });

  // Skills state
  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const saved = localStorage.getItem(SKILLS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return SKILLS_DATA;
      }
    }
    return SKILLS_DATA;
  });

  // Achievements state
  const [achievements, setAchievements] = useState<AchievementItem[]>(() => {
    const saved = localStorage.getItem(ACH_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ACHIEVEMENTS_DATA;
      }
    }
    return ACHIEVEMENTS_DATA;
  });

  // Projects state
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(PROJ_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return PROJECTS_DATA;
      }
    }
    return PROJECTS_DATA;
  });

  // Auth methods
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const login = (password: string) => {
    if (password === 'jangww9882!') {
      setIsAdmin(true);
      localStorage.setItem(AUTH_KEY, 'true');
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem(AUTH_KEY);
  };

  // Hero updater
  const updateHeroData = (data: Partial<HeroData>) => {
    setHeroData((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Competition handlers
  const addCompetition = (comp: CompetitionLog) => {
    setCompetitions((prev) => {
      const updated = [comp, ...prev];
      localStorage.setItem(COMPS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const updateCompetition = (id: string, comp: Partial<CompetitionLog>) => {
    setCompetitions((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...comp } : item));
      localStorage.setItem(COMPS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteCompetition = (id: string) => {
    setCompetitions((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(COMPS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Skills handlers
  const addSkill = (skill: SkillItem) => {
    setSkills((prev) => {
      const updated = [...prev, skill];
      localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const updateSkill = (id: string, skill: Partial<SkillItem>) => {
    setSkills((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...skill } : item));
      localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteSkill = (id: string) => {
    setSkills((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Achievement handlers
  const addAchievement = (ach: AchievementItem) => {
    setAchievements((prev) => {
      const updated = [ach, ...prev];
      localStorage.setItem(ACH_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const updateAchievement = (id: string, ach: Partial<AchievementItem>) => {
    setAchievements((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...ach } : item));
      localStorage.setItem(ACH_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteAchievement = (id: string) => {
    setAchievements((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(ACH_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Project handlers
  const addProject = (proj: ProjectItem) => {
    setProjects((prev) => {
      const updated = [proj, ...prev];
      localStorage.setItem(PROJ_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const updateProject = (id: string, proj: Partial<ProjectItem>) => {
    setProjects((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...proj } : item));
      localStorage.setItem(PROJ_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(PROJ_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Reset to default
  const resetAllToDefault = () => {
    setHeroData(INITIAL_HERO_DATA);
    setCompetitions(INITIAL_COMPETITIONS);
    setSkills(SKILLS_DATA);
    setAchievements(ACHIEVEMENTS_DATA);
    setProjects(PROJECTS_DATA);

    localStorage.removeItem(HERO_STORAGE_KEY);
    localStorage.removeItem(COMPS_STORAGE_KEY);
    localStorage.removeItem(SKILLS_STORAGE_KEY);
    localStorage.removeItem(ACH_STORAGE_KEY);
    localStorage.removeItem(PROJ_STORAGE_KEY);
  };

  return (
    <PortfolioContext.Provider
      value={{
        isAdmin,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
        heroData,
        updateHeroData,
        competitions,
        addCompetition,
        updateCompetition,
        deleteCompetition,
        skills,
        addSkill,
        updateSkill,
        deleteSkill,
        achievements,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        projects,
        addProject,
        updateProject,
        deleteProject,
        resetAllToDefault,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

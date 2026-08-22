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
import { 
  db, 
  auth, 
  googleProvider, 
  handleFirestoreError, 
  OperationType 
} from '../lib/firebase';
import { 
  doc, 
  collection, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';

interface PortfolioContextType {
  isAdmin: boolean;
  currentUser: User | null;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (password: string) => boolean;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  isFirebaseSyncing: boolean;

  heroData: HeroData;
  updateHeroData: (data: Partial<HeroData>) => Promise<void>;

  competitions: CompetitionLog[];
  addCompetition: (comp: CompetitionLog) => Promise<void>;
  updateCompetition: (id: string, comp: Partial<CompetitionLog>) => Promise<void>;
  deleteCompetition: (id: string) => Promise<void>;

  skills: SkillItem[];
  addSkill: (skill: SkillItem) => Promise<void>;
  updateSkill: (id: string, skill: Partial<SkillItem>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;

  achievements: AchievementItem[];
  addAchievement: (ach: AchievementItem) => Promise<void>;
  updateAchievement: (id: string, ach: Partial<AchievementItem>) => Promise<void>;
  deleteAchievement: (id: string) => Promise<void>;

  projects: ProjectItem[];
  addProject: (proj: ProjectItem) => Promise<void>;
  updateProject: (id: string, proj: Partial<ProjectItem>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isFirebaseSyncing, setIsFirebaseSyncing] = useState<boolean>(true);

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

  // Track Firebase Auth status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setIsAdmin(true);
        localStorage.setItem(AUTH_KEY, 'true');
      }
    });
    return () => unsubscribe();
  }, []);

  // Set up Firebase Real-Time Synchronization Listeners
  useEffect(() => {
    setIsFirebaseSyncing(true);

    // 1. Hero Settings Listener
    const heroDocPath = 'settings/hero';
    const unsubHero = onSnapshot(
      doc(db, 'settings', 'hero'),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as HeroData;
          setHeroData(data);
          localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(data));
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, heroDocPath);
      }
    );

    // 2. Competitions Listener
    const compsPath = 'competitions';
    const unsubComps = onSnapshot(
      collection(db, 'competitions'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: CompetitionLog[] = [];
          snapshot.forEach((d) => {
            list.push(d.data() as CompetitionLog);
          });
          setCompetitions(list);
          localStorage.setItem(COMPS_STORAGE_KEY, JSON.stringify(list));
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, compsPath);
      }
    );

    // 3. Skills Listener
    const skillsPath = 'skills';
    const unsubSkills = onSnapshot(
      collection(db, 'skills'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: SkillItem[] = [];
          snapshot.forEach((d) => {
            list.push(d.data() as SkillItem);
          });
          setSkills(list);
          localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(list));
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, skillsPath);
      }
    );

    // 4. Achievements Listener
    const achsPath = 'achievements';
    const unsubAchs = onSnapshot(
      collection(db, 'achievements'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: AchievementItem[] = [];
          snapshot.forEach((d) => {
            list.push(d.data() as AchievementItem);
          });
          setAchievements(list);
          localStorage.setItem(ACH_STORAGE_KEY, JSON.stringify(list));
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, achsPath);
      }
    );

    // 5. Projects Listener
    const projPath = 'projects';
    const unsubProj = onSnapshot(
      collection(db, 'projects'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: ProjectItem[] = [];
          snapshot.forEach((d) => {
            list.push(d.data() as ProjectItem);
          });
          setProjects(list);
          localStorage.setItem(PROJ_STORAGE_KEY, JSON.stringify(list));
        }
        setIsFirebaseSyncing(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, projPath);
        setIsFirebaseSyncing(false);
      }
    );

    return () => {
      unsubHero();
      unsubComps();
      unsubSkills();
      unsubAchs();
      unsubProj();
    };
  }, []);

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

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (res.user) {
        setIsAdmin(true);
        localStorage.setItem(AUTH_KEY, 'true');
        setIsLoginModalOpen(false);
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Google Sign-In notice:', err);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    setIsAdmin(false);
    localStorage.removeItem(AUTH_KEY);
  };

  // Hero updater
  const updateHeroData = async (data: Partial<HeroData>) => {
    const updated = { ...heroData, ...data };
    setHeroData(updated);
    localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'settings', 'hero'), {
        ...updated,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/hero');
    }
  };

  // Competition handlers
  const addCompetition = async (comp: CompetitionLog) => {
    const updated = [comp, ...competitions];
    setCompetitions(updated);
    localStorage.setItem(COMPS_STORAGE_KEY, JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'competitions', comp.id), {
        ...comp,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `competitions/${comp.id}`);
    }
  };

  const updateCompetition = async (id: string, comp: Partial<CompetitionLog>) => {
    const updated = competitions.map((item) => (item.id === id ? { ...item, ...comp } : item));
    setCompetitions(updated);
    localStorage.setItem(COMPS_STORAGE_KEY, JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'competitions', id), {
        ...comp,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `competitions/${id}`);
    }
  };

  const deleteCompetition = async (id: string) => {
    const updated = competitions.filter((item) => item.id !== id);
    setCompetitions(updated);
    localStorage.setItem(COMPS_STORAGE_KEY, JSON.stringify(updated));

    try {
      await deleteDoc(doc(db, 'competitions', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `competitions/${id}`);
    }
  };

  // Skills handlers
  const addSkill = async (skill: SkillItem) => {
    const updated = [...skills, skill];
    setSkills(updated);
    localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'skills', skill.id), {
        ...skill,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `skills/${skill.id}`);
    }
  };

  const updateSkill = async (id: string, skill: Partial<SkillItem>) => {
    const updated = skills.map((item) => (item.id === id ? { ...item, ...skill } : item));
    setSkills(updated);
    localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'skills', id), {
        ...skill,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `skills/${id}`);
    }
  };

  const deleteSkill = async (id: string) => {
    const updated = skills.filter((item) => item.id !== id);
    setSkills(updated);
    localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(updated));

    try {
      await deleteDoc(doc(db, 'skills', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `skills/${id}`);
    }
  };

  // Achievement handlers
  const addAchievement = async (ach: AchievementItem) => {
    const updated = [ach, ...achievements];
    setAchievements(updated);
    localStorage.setItem(ACH_STORAGE_KEY, JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'achievements', ach.id), {
        ...ach,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `achievements/${ach.id}`);
    }
  };

  const updateAchievement = async (id: string, ach: Partial<AchievementItem>) => {
    const updated = achievements.map((item) => (item.id === id ? { ...item, ...ach } : item));
    setAchievements(updated);
    localStorage.setItem(ACH_STORAGE_KEY, JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'achievements', id), {
        ...ach,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `achievements/${id}`);
    }
  };

  const deleteAchievement = async (id: string) => {
    const updated = achievements.filter((item) => item.id !== id);
    setAchievements(updated);
    localStorage.setItem(ACH_STORAGE_KEY, JSON.stringify(updated));

    try {
      await deleteDoc(doc(db, 'achievements', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `achievements/${id}`);
    }
  };

  // Project handlers
  const addProject = async (proj: ProjectItem) => {
    const updated = [proj, ...projects];
    setProjects(updated);
    localStorage.setItem(PROJ_STORAGE_KEY, JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'projects', proj.id), {
        ...proj,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `projects/${proj.id}`);
    }
  };

  const updateProject = async (id: string, proj: Partial<ProjectItem>) => {
    const updated = projects.map((item) => (item.id === id ? { ...item, ...proj } : item));
    setProjects(updated);
    localStorage.setItem(PROJ_STORAGE_KEY, JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'projects', id), {
        ...proj,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `projects/${id}`);
    }
  };

  const deleteProject = async (id: string) => {
    const updated = projects.filter((item) => item.id !== id);
    setProjects(updated);
    localStorage.setItem(PROJ_STORAGE_KEY, JSON.stringify(updated));

    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
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
        currentUser,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        loginWithGoogle,
        logout,
        isFirebaseSyncing,
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

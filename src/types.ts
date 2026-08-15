export interface HeroData {
  tagline: string;
  headlineMain: string;
  headlineHighlight: string;
  subHeadline: string;
  bioMain: string;
  bioSub: string;
  quote: string;
  quoteAuthor: string;
  metrics: {
    metric1Val: string;
    metric1Label: string;
    metric2Val: string;
    metric2Label: string;
    metric3Val: string;
    metric3Label: string;
  };
}

export interface CompetitionLog {
  id: string;
  year: string;
  title: string;
  teamName: string;
  badgeText?: string;
  role: string;
  wellDone: string;
  improvement: string;
  quote: string;
  roundsData?: {
    round: number;
    score: number;
    maxScore: number;
    notes: string;
    motorOutputDiff?: string;
  }[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'programming' | 'hardware' | 'creative' | 'ai';
  icon: string;
  level: number; // 1-100
  shortDesc: string;
  description: string;
  tags: string[];
  codeSample?: string;
  wroApplication?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  awardName: string;
  year: string;
  organization: string;
  description: string;
  badgeColor?: string;
  date?: string;
  journalHighlights?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  tags: string[];
  summary: string;
  description: string;
  blueprintTitle: string;
  specs: { label: string; value: string }[];
  keyFeatures: string[];
  codeSnippet?: {
    language: string;
    code: string;
    description: string;
  };
  imageType: 'blueprint' | 'drone' | 'quadruped';
}

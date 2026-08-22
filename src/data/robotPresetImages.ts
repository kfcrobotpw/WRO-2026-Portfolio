export interface PresetImage {
  id: string;
  title: string;
  category: 'hero' | 'project' | 'competition' | 'award';
  url: string;
  description: string;
}

export const ROBOT_PRESET_IMAGES: PresetImage[] = [
  {
    id: 'preset-wro-robot-1',
    title: 'WRO Competition Robot MK.IV',
    category: 'hero',
    url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
    description: '고속 라인트레이싱 및 듀얼 컬러 센서 섀시'
  },
  {
    id: 'preset-pcb-chip',
    title: 'Cyber Robotic Microcontroller PCB',
    category: 'hero',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    description: '고주파 임베디드 회로 기판 및 칩셋'
  },
  {
    id: 'preset-robotic-arm',
    title: 'Precision Robotic Manipulator',
    category: 'project',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    description: '6자유도 고정밀 매니퓰레이터 기구학'
  },
  {
    id: 'preset-spike-robot',
    title: 'SPIKE Prime Mission Rover',
    category: 'project',
    url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1000&q=80',
    description: 'WRO 미션 오브젝트 수거용 모듈형 로봇'
  },
  {
    id: 'preset-drone-fc',
    title: 'Nexus Quadcopter Flight Controller',
    category: 'project',
    url: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80',
    description: '400Hz 저지연 자세 제어 드론 하드웨어'
  },
  {
    id: 'preset-quadruped',
    title: 'Dynamic Quadruped Gait Robot',
    category: 'project',
    url: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1000&q=80',
    description: '12자유도 동적 보행 및 지형 적응 4족 로봇'
  },
  {
    id: 'preset-wro-arena',
    title: 'WRO 2026 Competition Arena',
    category: 'competition',
    url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80',
    description: 'WRO 코리아 오픈 대회 공식 경기장 매트 및 미션 블록'
  },
  {
    id: 'preset-robocup-match',
    title: 'RoboCup Junior Field Snapshot',
    category: 'competition',
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1000&q=80',
    description: 'RoboCup 오픈 주니어 자율 축구 경기 현장'
  },
  {
    id: 'preset-award-trophy',
    title: 'Engineering Logbook Grand Award',
    category: 'award',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1000&q=80',
    description: '2026 RoboCup 연구일지상 최고상 트로피 및 상장'
  },
  {
    id: 'preset-lab-workspace',
    title: 'Robotics Engineering Lab Workbench',
    category: 'hero',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    description: '오실로스코프, 모터 테스터 및 납땜 스테이션'
  }
];

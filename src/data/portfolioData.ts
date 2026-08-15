import { CompetitionLog, SkillItem, AchievementItem, ProjectItem } from '../types';

export const INITIAL_COMPETITIONS: CompetitionLog[] = [
  {
    id: 'wro-2026',
    year: '2026',
    title: '2026 WRO Korea Open',
    teamName: 'K.F.C.',
    badgeText: 'K.F.C.\nF=ma',
    role: '로봇 제작, 프로그래밍, 주행 테스트, 문제 해결, 전략 수립',
    wellDone: 'main 코드를 많이 고치고 문제를 많이 해결했다.',
    improvement: '모형 문제로 미션을 수행하지 못하고 2번째 라운드에 모터 출력값이 달라 모든 미션을 수행하지 못한것이 아쉬웠다.',
    quote: '“모형 이슈로 수상은 못하였지만 최선을 다한 대회라고 생각한다.”',
    roundsData: [
      {
        round: 1,
        score: 65,
        maxScore: 100,
        notes: '1라운드 미션 진행 중 블록 모형 규격 오차로 인한 그리퍼 정렬 실패 발생.',
        motorOutputDiff: '정상 (L: 82%, R: 82%)'
      },
      {
        round: 2,
        score: 45,
        maxScore: 100,
        notes: '2라운드 주행 시 좌우 모터의 배터리 전압 강하에 따른 출력값 편차로 라인트레이싱 경로 이탈.',
        motorOutputDiff: '편차 감지 (L: 78%, R: 84% - 편차 +6%)'
      }
    ]
  },
  {
    id: 'robocup-2025',
    year: '2025',
    title: 'RoboCup International Junior',
    teamName: 'K.F.C. Robotics',
    badgeText: 'RoboCup\nGlobal',
    role: '자율 축구 리그 주행 알고리즘 설계 및 실시간 경로 탐색 구현',
    wellDone: '동적 장애물 회피 알고리즘을 성공적으로 적용하여 득점 성공률 35% 향상.',
    improvement: '현장 조명 환경 변화에 따른 비전 센서 HSV 임계값 캘리브레이션 시간 부족.',
    quote: '“센서 데이터의 불확실성을 소프트웨어 필터링으로 극복하는 값진 경험이었습니다.”',
  },
  {
    id: 'nrc-2024',
    year: '2024',
    title: 'National Robotics Challenge',
    teamName: 'F=ma Lab',
    badgeText: 'NRC 2024\nHardware',
    role: '모듈형 섀시 시스템 설계 및 기어비 최적화',
    wellDone: '모듈형 퀵체인지 섀시를 개발하여 피트 구역 내 수리 및 정비 시간을 40% 단축.',
    improvement: '고속 회전 시 서보 모터 발열로 인한 토크 저하 방열 대책 보완 필요.',
    quote: '“하드웨어의 견고함이 곧 소프트웨어의 안정성으로 이어진다는 것을 배웠습니다.”',
  }
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'block-coding',
    name: 'BLOCK CODING',
    category: 'programming',
    icon: 'Puzzle',
    level: 95,
    shortDesc: 'Spike Prime / EV3 블록 코딩',
    description: '로봇의 직관적인 상태 머신 제어, 다중 스레드 이벤트 트리거, 컬러 센서 기반 라인트레이싱 로직을 블록 환경에서 신속하게 프로토타이핑합니다.',
    tags: ['LEGO Spike Prime', 'EV3 Classroom', 'State Machine', 'Event Driven'],
    codeSample: `// Spike Prime Block Logic Flow
WHEN Program Starts:
  SET movement motors to [B + C]
  SET speed to 50%
  REPEAT UNTIL (ColorSensor[A] == RED):
    IF ColorSensor[A] == BLACK:
      STEER -25% (Left Adjust)
    ELSE:
      STEER +25% (Right Adjust)
  STOP ALL MOTORS & TRIGGER Gripper[D].RUN_FOR(1.2 sec)`,
    wroApplication: '대회 현장 빠른 룰 변경 대응 및 초기 프로토타입 주행 검증에 활용'
  },
  {
    id: 'c-coding',
    name: 'C CODING',
    category: 'programming',
    icon: 'Code2',
    level: 88,
    shortDesc: 'Embedded C & Microcontroller 제어',
    description: 'Arduino 및 STM32 기반 마이크로컨트롤러에서 하드웨어 레지스터 직접 제어, 타이머 인터럽트, PWM 모터 속도 제어 및 ADC 센서 필터링을 구현합니다.',
    tags: ['Embedded C', 'Interrupts', 'PWM Control', 'Register Level', 'I2C/SPI'],
    codeSample: `#include <avr/io.h>
#include <avr/interrupt.h>

void init_pwm() {
  // Fast PWM Mode with Timer1
  TCCR1A |= (1 << COM1A1) | (1 << WGM11);
  TCCR1B |= (1 << WGM13) | (1 << WGM12) | (1 << CS11);
  ICR1 = 20000; // 50Hz for servo
}

void set_motor_speed(uint8_t left, uint8_t right) {
  OCR1A = left * 200;
  OCR1B = right * 200;
}`,
    wroApplication: '고속 연산이 필요한 자이로 센서 통합 및 서보 모터 정밀 각도 제어'
  },
  {
    id: 'python',
    name: 'PYTHON',
    category: 'programming',
    icon: 'Terminal',
    level: 92,
    shortDesc: 'Pybricks & 데이터/비전 알고리즘',
    description: 'Pybricks 허브 펌웨어 프로그래밍, 복잡한 PID 라인트레이싱 수식 연산, 주행 로그 시각화 및 컴퓨터 비전 알고리즘을 파이썬으로 구현합니다.',
    tags: ['Pybricks', 'PID Algorithm', 'OpenCV', 'NumPy', 'Data Analysis'],
    codeSample: `from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor, ColorSensor
from pybricks.parameters import Port, Direction

hub = PrimeHub()
left_motor = Motor(Port.B, Direction.COUNTERCLOCKWISE)
right_motor = Motor(Port.C)
sensor = ColorSensor(Port.A)

# PID Line Tracking Parameters
kp, ki, kd = 1.45, 0.02, 0.35
target_reflection = 50
integral, last_error = 0, 0

def step_pid():
    global integral, last_error
    current = sensor.reflection()
    error = target_reflection - current
    integral += error
    derivative = error - last_error
    turn = (kp * error) + (ki * integral) + (kd * derivative)
    left_motor.dc(50 + turn)
    right_motor.dc(50 - turn)
    last_error = error`,
    wroApplication: '2026 WRO main 알고리즘 작성 및 모터 출력 보정 로직 구현'
  },
  {
    id: 'robot-building',
    name: 'ROBOT BUILDING',
    category: 'hardware',
    icon: 'Bot',
    level: 94,
    shortDesc: '섀시 기구학 & 기어 메커니즘 설계',
    description: '저중심 섀시 설계, 랙 앤 피니언 리프트, 4점 지지 구동계, 듀얼 컬러 센서 쉴드 및 고토크 기어 트레인을 직접 조립 및 기구학적으로 최적화합니다.',
    tags: ['Chassis Kinematics', 'Gear Ratio Tuning', 'Gripper Mechanism', 'Center of Gravity'],
    codeSample: `// Mechanical Specifications
- Drive Mechanism: Direct Dual Differential Drive + Omni Caster
- Gear Ratio: 1:1.66 Speed Multiplier (20T Drive -> 12T Driven)
- Center of Mass: 28mm from Ground (Ultra-low stability)
- Sensor Shielding: Black Matte 3D-printed light-leak hood`,
    wroApplication: '미션 오브젝트 정밀 파지용 2자유도 랙 기어 리프터 제작'
  },
  {
    id: 'ppt-presentation',
    name: 'PPT PRESENTATION',
    category: 'creative',
    icon: 'Presentation',
    level: 86,
    shortDesc: '기술 발표 & 전략 엔지니어링 리포트',
    description: '대회 심사위원 프레젠테이션, 로봇 제작 전략 및 주행 실패 요인 분석, 엔지니어링 연구일지 시각 자료를 전문적으로 기획하고 발표합니다.',
    tags: ['Tech Pitching', 'Engineering Log', 'Strategy Deck', 'Data Visualization'],
    codeSample: `// Presentation Structure for Competition Review
1. Executive Summary & Team Roles (K.F.C. F=ma)
2. Robot Hardware Architecture & Low-CG Layout
3. Software Control Loop & PID Tuning Telemetry
4. Competition Reflection: Motor Delta Analysis
5. Future Roadmap & Hardware Modularity Upgrade`,
    wroApplication: 'RoboCup 연구일지상 수상 기반 엔지니어링 로그북 작성 및 발표'
  },
  {
    id: 'web-design',
    name: 'WEB DESIGN',
    category: 'creative',
    icon: 'Layout',
    level: 90,
    shortDesc: '인터랙티브 웹 & 실시간 텔레메트리 UI',
    description: 'React, Tailwind CSS, TypeScript 및 Canvas를 결합하여 사이버네틱 무드의 로봇 포트폴리오, 센서 실시간 모니터링 대시보드를 제작합니다.',
    tags: ['React 19', 'Tailwind CSS', 'Canvas 2D', 'Motion Graphics', 'Telemetry UI'],
    codeSample: `// Responsive Cyber Dashboard Component
export const TelemetryHUD = ({ gyro, rpm, voltage }) => (
  <div className="grid grid-cols-3 gap-4 border border-cyan-500/30 p-4 bg-slate-950/80">
    <DataGauge label="GYRO PITCH" value={gyro.pitch} unit="deg" />
    <DataGauge label="MOTOR RPM" value={rpm} unit="RPM" highlight />
    <DataGauge label="BATTERY" value={voltage} unit="V" />
  </div>
);`,
    wroApplication: '로봇 주행 데이터 웹 시각화 툴 및 인터랙티브 포트폴리오 사이트 구축'
  },
  {
    id: 'ai-tools',
    name: 'AI TOOLS',
    category: 'ai',
    icon: 'Cpu',
    level: 89,
    shortDesc: 'Gemini AI & 강화학습 모션 제어',
    description: 'Google Gemini API를 통한 코드 디버깅 및 알고리즘 최적화, 컴퓨터 비전 객체 인식, 강화학습 기반 모션 플래닝을 연구합니다.',
    tags: ['Gemini API', 'Computer Vision', 'Reinforcement Learning', 'Autonomous Navigation'],
    codeSample: `// AI-Assisted Mission Strategy Optimizer
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();
// Analyzes competition grid constraints and generates optimal TSP path`,
    wroApplication: 'WRO 미션 경로 최단 탐색 알고리즘 생성 및 주행 실패 로그 분석'
  }
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'robocup-2026-journal',
    title: 'Robocup Open South Korea 2026',
    awardName: '연구일지상 (Best Engineering Logbook Award)',
    year: '2026',
    organization: 'RoboCup Korea Association',
    description: '로봇 하드웨어 기구 설계도, 주행 궤적 실험 데이터, PID 게인값 튜닝 오차 분석 및 실패 요인 극복 과정을 체계적으로 기록하여 연구일지 부문 최고상을 수상하였습니다.',
    badgeColor: 'border-purple-500 text-purple-400 bg-purple-950/40',
    date: '2026. 02',
    journalHighlights: [
      '모터 전압 강하에 따른 듀티비(Duty Cycle) 보정 공식 수립',
      '컬러 센서 캘리브레이션 3단계 알고리즘 (백색/흑색/바닥 보정)',
      '120회 이상의 주행 테스트 오차 누적 그래프 분석',
      '하드웨어 모듈화 섀시 도면 및 부품 리스트 수록'
    ]
  },
  {
    id: 'wro-2026-regional',
    title: '2026 WRO Korea Open Finalist',
    awardName: '본선 진출 & 전략 혁신 부문 우수',
    year: '2026',
    organization: 'World Robot Olympiad Korea Committee',
    description: 'K.F.C. (F=ma) 팀의 메인 프로그래머 겸 기구 설계자로서 고난도 미션 모듈을 설계하고 신속한 현장 코드 수정으로 본선에 진출하였습니다.',
    badgeColor: 'border-cyan-500 text-cyan-400 bg-cyan-950/40',
    date: '2026. 08',
    journalHighlights: [
      '현장 룰 변경에 대응하는 모듈형 파이썬 스크립트 작성',
      '듀얼 센서 교차 보정 라인트레이싱 구현'
    ]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'f-ma-main',
    title: 'F=ma main',
    subtitle: 'Final WRO 미션 프로젝트',
    category: 'WRO Competition',
    tag: 'Project',
    tags: ['Color Sensor', 'Motor Control', 'Python', 'PID Tracing'],
    summary: 'WRO 대회 공식 미션 해결을 위해 제작된 고속 고정밀 자율주행 로봇 시스템',
    description: '대회 미션 블록 수거 및 격자 맵 정밀 주행을 위해 개발된 메인 로봇 소프트웨어 및 하드웨어입니다. 듀얼 컬러 센서의 반사율 차이를 실시간 PID로 계산하여 오차를 능동 보정하며, 기구적 모터 토크 편차를 소프트웨어 전압 추정기로 안정화합니다.',
    blueprintTitle: 'AURORA-7: COMPETITION ROBOT MK.IV',
    specs: [
      { label: 'Platform', value: 'LEGO SPIKE Prime / Pybricks Hub' },
      { label: 'Drive Train', value: 'Dual High-Torque XL Motors (1:1.66 Gear Ratio)' },
      { label: 'Sensors', value: '2x High-Precision Color Sensors + 1x Ultrasonic' },
      { label: 'Actuator', value: '2-DOF Rack & Pinion Precision Gripper' },
      { label: 'Control Loop', value: '100Hz PID Line-Tracking + Gyro Assist' },
      { label: 'Battery Sys', value: '7.3V Li-Ion with Active Voltage Compensation' }
    ],
    keyFeatures: [
      '듀얼 컬러 센서 실시간 편차 적분(PID) 라인트레이싱 알고리즘',
      '모터 전압 강하에 따른 좌우 출력 자동 보정 캘리브레이션 루프',
      '고속 90도/180도 피벗 턴 및 교차로 감지 상태 머신',
      '미션 블록 3단계 수거 및 격리 보관용 모듈형 그리퍼 시스템'
    ],
    codeSnippet: {
      language: 'python',
      description: 'WRO 메인 라인트레이싱 및 모터 보정 핵심 루프',
      code: `class WROMainController:
    def __init__(self, left_motor, right_motor, sensor_left, sensor_right):
        self.lm = left_motor
        self.rm = right_motor
        self.sl = sensor_left
        self.sr = sensor_right
        self.kp = 1.42
        self.ki = 0.015
        self.kd = 0.38
        self.integral = 0
        self.last_error = 0
        self.voltage_offset_r = 1.04 # 2라운드 모터 편차 보정 계수

    def follow_line(self, target_distance_cm, base_speed=60):
        # Reset relative encoders
        self.lm.reset_angle(0)
        while abs(self.lm.angle()) < target_distance_cm * 20.5:
            # Dual sensor reflection difference
            ref_l = self.sl.reflection()
            ref_r = self.sr.reflection()
            error = ref_l - ref_r
            
            self.integral += error
            derivative = error - self.last_error
            turn = (self.kp * error) + (self.ki * self.integral) + (self.kd * derivative)
            
            # Apply dynamic motor output balancing
            left_power = base_speed + turn
            right_power = (base_speed - turn) * self.voltage_offset_r
            
            self.lm.dc(left_power)
            self.rm.dc(right_power)
            self.last_error = error`
    },
    imageType: 'blueprint'
  },
  {
    id: 'nexus-drone',
    title: 'Nexus Drone Controller',
    subtitle: 'Custom Flight Controller & Firmware',
    category: 'Hardware & Firmware',
    tag: 'Hardware',
    tags: ['Embedded C', 'FreeRTOS', 'IMU Kalman Filter', 'PCB Design'],
    summary: '초저지연 쿼드콥터 기동을 위해 직접 설계한 비행 제어기 보드 및 펌웨어',
    description: '고속 기동 시 발생하는 진동 노이즈를 6축 자이로/가속도 센서 융합 칼만 필터로 제거하고, 400Hz DShot 프로토콜을 통해 변속기에 신호를 전송하는 초경량 FC 시스템입니다.',
    blueprintTitle: 'NEXUS-FC V2.1 SCHEMATIC & TELEMETRY',
    specs: [
      { label: 'MCU Core', value: 'STM32F405 ARM Cortex-M4 @ 168MHz' },
      { label: 'IMU Sensor', value: 'BMI270 6-Axis Low-Noise Gyroscope' },
      { label: 'Barometer', value: 'DPS310 High-Precision Altitude Sensor' },
      { label: 'Protocol', value: 'DShot600 / CRSF Ultra-low Latency' },
      { label: 'OS/Kernel', value: 'FreeRTOS Multi-threaded Task Engine' }
    ],
    keyFeatures: [
      '자이로 노이즈 차단을 위한 하드웨어 저역 통과 필터(LPF) 설계',
      '초당 400회 PID 자세 보정 루프를 통한 극한 기동 안정성',
      '배터리 전압 급감 시 자동 비상 착륙 세이프가드'
    ],
    codeSnippet: {
      language: 'c',
      description: '쿼드콥터 롤/피치 자세 제어 칼만 필터 루프',
      code: `void FlightControl_Loop(void) {
    // 1. Read Raw IMU Data via SPI DMA
    BMI270_Read_Raw(&gyro_raw, &accel_raw);
    
    // 2. Kalman Filter State Update
    float roll_est = Kalman_GetAngle(&kalman_roll, accel_raw.y, gyro_raw.x, dt);
    float pitch_est = Kalman_GetAngle(&kalman_pitch, accel_raw.x, gyro_raw.y, dt);
    
    // 3. Compute Dual PID Output
    float roll_output = PID_Calculate(&pid_roll, target_roll, roll_est);
    float pitch_output = PID_Calculate(&pid_pitch, target_pitch, pitch_est);
    
    // 4. Mix Motor PWMs with DShot600
    DShot_SetMotorOutputs(roll_output, pitch_output, yaw_output, throttle);
}`
    },
    imageType: 'drone'
  },
  {
    id: 'quadruped-gait',
    title: 'Quadruped Gait Engine',
    subtitle: 'Dynamic 4-Leg Robot Balancing',
    category: 'AI / Simulation',
    tag: 'AI/ML',
    tags: ['Python', 'PyTorch', 'MuJoCo', 'Reinforcement Learning'],
    summary: '비평탄 험지 주행을 위한 심층 강화학습 기반 4족 보행 로봇 동적 균형 제어기',
    description: '물리 엔진 시뮬레이션 환경에서 심층 강화학습(PPO)을 통해 학습된 보행 정책 신경망을 실제 로봇 하드웨어에 배포(Sim-to-Real)하여 경사면과 장애물을 안정적으로 돌파합니다.',
    blueprintTitle: 'UNIT-404 QUADRUPED SYSTEM ARCHITECTURE',
    specs: [
      { label: 'Degrees of Freedom', value: '12-DOF (3 Actuators per Leg)' },
      { label: 'Actuators', value: 'Brushless BLDC Actuators + Planetary Gearbox' },
      { label: 'Simulation Engine', value: 'MuJoCo Physics + Isaac Gym' },
      { label: 'Algorithm', value: 'Proximal Policy Optimization (PPO)' },
      { label: 'Inference Board', value: 'NVIDIA Jetson Orin Nano' }
    ],
    keyFeatures: [
      '외란(충격, 미끄러짐) 발생 시 0.02초 내 접지 복원 보행 패턴 전이',
      '가상 환경 도메인 랜덤화(Domain Randomization)로 하드웨어 전이 오차 최소화',
      '실시간 발끝 접촉 센서 데이터 기반 지형 경사도 추정'
    ],
    codeSnippet: {
      language: 'python',
      description: 'PPO 기반 4족 로봇 보행 정책 신경망 추론 루프',
      code: `import torch
import numpy as np

class QuadrupedPolicyInference:
    def __init__(self, model_path='quadruped_ppo_v4.pt'):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.policy_net = torch.jit.load(model_path).to(self.device)
        self.policy_net.eval()
        
    def step_action(self, joint_angles, joint_vels, base_ang_vel, projected_gravity):
        # Compose 48-dim observation vector
        obs = np.concatenate([joint_angles, joint_vels, base_ang_vel, projected_gravity])
        obs_tensor = torch.FloatTensor(obs).unsqueeze(0).to(self.device)
        
        with torch.no_grad():
            target_joint_positions = self.policy_net(obs_tensor)
            
        return target_joint_positions.cpu().numpy()[0]`
    },
    imageType: 'quadruped'
  }
];

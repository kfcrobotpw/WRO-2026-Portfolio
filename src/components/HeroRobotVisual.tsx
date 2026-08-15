import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Cpu, Activity, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';

export const HeroRobotVisual: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [telemetry, setTelemetry] = useState({
    motorL: 82,
    motorR: 82,
    voltage: 7.42,
    gyroYaw: 0.0,
    colorSensorRaw: 54,
    laserPower: 96,
  });

  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    'System initialized...',
    'Calibrating dual optical line sensors...',
    'Arm kinematic solvers online (6-DOF)...',
    'PWM motor synchronization: OK',
    'Telemetry link established (2.4GHz)...'
  ];

  // Dynamic telemetry simulator
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        motorL: Math.round(80 + Math.sin(Date.now() / 800) * 4),
        motorR: Math.round(80 + Math.cos(Date.now() / 800) * 4),
        voltage: Number((7.4 - Math.sin(Date.now() / 5000) * 0.08).toFixed(2)),
        gyroYaw: Number((Math.sin(Date.now() / 1500) * 1.8).toFixed(1)),
        colorSensorRaw: Math.round(50 + Math.sin(Date.now() / 600) * 15),
        laserPower: 95 + Math.round(Math.random() * 4),
      }));
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2800);
    return () => clearInterval(stepInterval);
  }, [isPlaying, steps.length]);

  return (
    <div className="relative w-full rounded-2xl border border-cyan-500/30 bg-[#070e1a]/80 backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] group">
      {/* Top Cyber Frame Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-cyan-900/40 bg-slate-950/60 font-mono text-[11px]">
        <div className="flex items-center gap-2 text-cyan-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="font-semibold tracking-wider font-['Orbitron']">PROJECT CHIMERA: PCB ASSEMBLY</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="hidden sm:inline-block text-[10px] text-cyan-500/80">LATENCY: 1.2ms</span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 hover:text-cyan-300 text-slate-400 cursor-pointer"
            title={isPlaying ? 'Pause simulation' : 'Resume simulation'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          </button>
        </div>
      </div>

      {/* Main Visual Display: Cyber Robotic Arm & Circuit Canvas */}
      <div className="relative h-64 sm:h-76 md:h-84 w-full bg-gradient-to-b from-[#050b14] via-[#081220] to-[#040810] flex items-center justify-center overflow-hidden">
        {/* Futuristic Grid Lines */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.15) 1px, transparent 1px), linear-gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.05) 1px, transparent 1px)`,
            backgroundSize: '24px 24px, 24px 24px, 24px 24px'
          }}
        />

        {/* Ambient Glows */}
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* SVG Robotic Arm & PCB Microchip Graphic */}
        <svg
          viewBox="0 0 500 320"
          className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]"
        >
          <defs>
            <linearGradient id="cyberArmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="glowCyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
            </linearGradient>
            <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* PCB Motherboard Platform */}
          <g transform="translate(130, 200)">
            {/* PCB Base */}
            <polygon
              points="0,30 240,30 280,75 40,75"
              fill="#061826"
              stroke="#0284c7"
              strokeWidth="1.5"
            />
            {/* Circuit Traces */}
            <path
              d="M 60 55 L 120 55 L 140 40 L 200 40"
              stroke="#22d3ee"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              fill="none"
            />
            <path
              d="M 80 65 L 150 65 L 170 50 L 250 50"
              stroke="#38bdf8"
              strokeWidth="1.2"
              fill="none"
            />
            {/* Main Processor Chip */}
            <polygon
              points="110,40 180,40 200,60 130,60"
              fill="#0284c7"
              fillOpacity="0.4"
              stroke="#22d3ee"
              strokeWidth="2"
            />
            {/* Chip Laser Target Indicator */}
            <circle cx="155" cy="50" r="10" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" fill="none">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 155 50"
                to="360 155 50"
                dur="6s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="155" cy="50" r="3" fill="#22d3ee" filter="url(#neonBlur)" />
            {/* Chip Glow Center */}
            <circle cx="155" cy="50" r="1.5" fill="#ffffff" />
          </g>

          {/* Precision Laser Beam from Robotic Head to Chip */}
          {isPlaying && (
            <g>
              <line
                x1="285"
                y1="130"
                x2="285"
                y2="250"
                stroke="#22d3ee"
                strokeWidth="2.5"
                filter="url(#neonBlur)"
              >
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.7;1;0.5"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </line>
              {/* Spark particles at soldering point */}
              <circle cx="285" cy="250" r="6" fill="#e0f2fe" filter="url(#neonBlur)">
                <animate
                  attributeName="r"
                  values="4;8;4"
                  dur="0.4s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          )}

          {/* High-Tech Industrial Robotic Arm Assembly */}
          <g transform="translate(180, 20)">
            {/* Base Pillar & Mounting Swivel */}
            <rect x="180" y="20" width="70" height="24" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="215" cy="32" r="6" fill="#22d3ee" />

            {/* Upper Arm Joint 1 */}
            <g>
              <line x1="215" y1="32" x2="160" y2="90" stroke="#334155" strokeWidth="14" strokeLinecap="round" />
              <line x1="215" y1="32" x2="160" y2="90" stroke="#22d3ee" strokeWidth="3" strokeDasharray="6 3" />
              <circle cx="160" cy="90" r="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              <circle cx="160" cy="90" r="4" fill="#38bdf8" />
            </g>

            {/* Forearm Joint 2 with Hydraulic Piston */}
            <g>
              <line x1="160" y1="90" x2="105" y2="110" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
              <line x1="160" y1="90" x2="105" y2="110" stroke="#0ea5e9" strokeWidth="2" />
              
              {/* Hydraulic Cylinder */}
              <rect x="135" y="80" width="22" height="6" rx="2" fill="#0284c7" transform="rotate(-15 135 80)" />

              <circle cx="105" cy="110" r="8" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
              <circle cx="105" cy="110" r="3" fill="#e0f2fe" />
            </g>

            {/* Robotic Tool Head (Laser & Precision Gripper) */}
            <g transform="translate(105, 110)">
              <polygon points="-5,0 5,0 12,20 -12,20" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              {/* Nozzle */}
              <rect x="-3" y="20" width="6" height="10" fill="#22d3ee" />
              {/* Status Ring */}
              <circle cx="0" cy="10" r="4" fill="#a855f7" />
            </g>
          </g>

          {/* Background Digital Telemetry HUD Overlay */}
          <g transform="translate(30, 40)" className="font-mono text-[9px] fill-cyan-400/80">
            <text x="0" y="0">SYS.FREQ: 100Hz</text>
            <text x="0" y="14">VOLTAGE: {telemetry.voltage}V</text>
            <text x="0" y="28">GYRO_Z: {telemetry.gyroYaw}°</text>
            <text x="0" y="42">LASER_PWR: {telemetry.laserPower}%</text>
          </g>

          <g transform="translate(370, 40)" className="font-mono text-[9px] fill-cyan-400/80">
            <text x="0" y="0">MOTOR_L: {telemetry.motorL}%</text>
            <text x="0" y="14">MOTOR_R: {telemetry.motorR}%</text>
            <text x="0" y="28">SENSOR: {telemetry.colorSensorRaw}%</text>
            <text x="0" y="42">STATE: NOMINAL</text>
          </g>
        </svg>

        {/* Real-time Telemetry Floating Widgets on Bottom Corners */}
        <div className="absolute bottom-3 left-4 hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-slate-950/80 border border-cyan-900/60 font-mono text-[10px] text-cyan-300 backdrop-blur-sm">
          <Zap size={11} className="text-amber-400" />
          <span>MOTORS BALANCED: {telemetry.motorL}% / {telemetry.motorR}%</span>
        </div>

        <div className="absolute bottom-3 right-4 hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-slate-950/80 border border-purple-900/60 font-mono text-[10px] text-purple-300 backdrop-blur-sm">
          <ShieldCheck size={11} className="text-purple-400" />
          <span>ARM INTEGRITY: 100%</span>
        </div>
      </div>

      {/* Bottom Live Terminal Status Log Bar (Matching Image 2) */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#050b14] border-t border-cyan-900/40 font-mono text-xs text-cyan-300">
        <div className="flex items-center gap-2.5">
          <span className="text-cyan-400 font-bold">▶</span>
          <span className="text-slate-300 tracking-wide">
            {steps[activeStep]}
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-sans hidden sm:inline">
          LIVE TELEMETRY
        </span>
      </div>
    </div>
  );
};

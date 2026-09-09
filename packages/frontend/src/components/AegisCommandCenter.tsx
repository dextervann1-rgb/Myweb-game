"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Activity, 
  HeartPulse, 
  ShieldAlert, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  Radio, 
  RefreshCw, 
  Terminal, 
  Cpu, 
  Wifi, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Layers, 
  Bot, 
  Sparkles,
  Lock,
  Radar
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

export interface AgentVitals {
  id: string;
  name: string;
  codename: string;
  role: string;
  avatarColor: string;
  nominalBpm: number;
  currentBpm: number;
  shieldHealth: number; // 0-100%
  stressLevel: number; // 0-100%
  status: 'NOMINAL' | 'ELEVATED' | 'CRITICAL_DEFENSE' | 'STABILIZING';
  lastAlert: string;
}

interface AegisCommandCenterProps {
  distressModeActive: boolean;
  onToggleDistressMode: () => void;
  onLogMessage?: (msg: string) => void;
}

const INITIAL_AGENTS: AgentVitals[] = [
  {
    id: 'bff-dex-bouncer',
    name: 'BFF-DEX-AI Bouncer',
    codename: 'SANCTUM_GATEKEEPER_01',
    role: 'Wallet Waiting Room & Gate Security',
    avatarColor: '#0052FF',
    nominalBpm: 68,
    currentBpm: 68,
    shieldHealth: 99,
    stressLevel: 14,
    status: 'NOMINAL',
    lastAlert: 'Gate perimeter clean. 0 front-running bots detected.',
  },
  {
    id: 'poa-maddy-may',
    name: 'POA Maddy May',
    codename: 'ON_THE_WAY_HEARTBEAT',
    role: 'Zero Screen-Timeout Keeper',
    avatarColor: '#10B981',
    nominalBpm: 72,
    currentBpm: 72,
    shieldHealth: 100,
    stressLevel: 8,
    status: 'NOMINAL',
    lastAlert: 'Background frame sync active. Tab latency: 2ms.',
  },
  {
    id: 'vann-ai-dlp',
    name: 'VannAI Data Loss Prevention',
    codename: 'VAULT_DLP_SENTINEL',
    role: 'State Preservation & Anti-Leak Shield',
    avatarColor: '#D4AF37',
    nominalBpm: 65,
    currentBpm: 65,
    shieldHealth: 98,
    stressLevel: 12,
    status: 'NOMINAL',
    lastAlert: 'Session state memory locked & encrypted in local enclave.',
  },
  {
    id: 'omega-8-ai',
    name: 'Òmega⁸-AI Core',
    codename: 'DIVINE_ORCHESTRATOR',
    role: 'Multi-Interface Smart-to-Safe Engine',
    avatarColor: '#A855F7',
    nominalBpm: 75,
    currentBpm: 75,
    shieldHealth: 97,
    stressLevel: 16,
    status: 'NOMINAL',
    lastAlert: '60 FPS display loop harmonized. Adaptive handicap primed.',
  },
  {
    id: 'samantha-ai',
    name: 'Samantha AI',
    codename: 'SOVEREIGN_VOICE_GUARDIAN',
    role: 'Conversational Voice & Live Intelligence Guardian',
    avatarColor: '#EC4899',
    nominalBpm: 70,
    currentBpm: 70,
    shieldHealth: 99,
    stressLevel: 10,
    status: 'NOMINAL',
    lastAlert: 'Neural voice stream nominal. Audio buffer latency: 14ms.',
  },
  {
    id: 'marine-ai-scout',
    name: 'Marine Scout AI',
    codename: 'SWIFT_PATHFINDER_4',
    role: 'Pre-Flight Contract & Threat Scout',
    avatarColor: '#EF4444',
    nominalBpm: 80,
    currentBpm: 80,
    shieldHealth: 95,
    stressLevel: 22,
    status: 'NOMINAL',
    lastAlert: 'Base L2 mempool route scouted. Ɓ€€4 warning index: 0.1.',
  },
];

const SIMULATED_DISTRESS_SCENARIOS = [
  {
    id: 'maddy_tab_hibernation',
    agentId: 'poa-maddy-may',
    title: 'Mobile Tab Timeout Desync Threat',
    severity: 'HIGH' as const,
    description: 'Mobile browser placed background tab in hibernation. Heartbeat clock jitter detected.',
    symptom: 'BPM surges to 146 BPM • Frame buffer drops from 60 to 18 FPS',
    countermeasure: 'Deploy Keep-Alive Web Worker & Phosphor Heartbeat Beacon',
    elevatedBpm: 146,
    stressLevel: 88,
    alertText: '⚠️ CRITICAL JITTER: POA Maddy May heart rhythm elevated to 146 BPM! Intercepting tab pause.'
  },
  {
    id: 'marine_gas_spike',
    agentId: 'marine-ai-scout',
    title: 'Base L2 Calldata Front-Running Threat',
    severity: 'CRITICAL' as const,
    description: 'Mempool congestion spike detected. Unverified sandwich bot attempting to preempt survivor mint.',
    symptom: 'Threat Vector jumps to Ɓ€€4 9.4 • Revert risk elevated',
    countermeasure: 'Reroute transaction via private Aegis Flash-Minter Pipe',
    elevatedBpm: 158,
    stressLevel: 94,
    alertText: '🚨 Ɓ€€4 SECURITY SPIKE: Marine Scout detecting front-runner calldata. Locking waiting room.'
  },
  {
    id: 'omega_sudden_death',
    agentId: 'omega-8-ai',
    title: 'Sudden Death Countdown Crisis',
    severity: 'HIGH' as const,
    description: 'Player entered Cycle 0 Sudden Death with under 6 seconds remaining. Cognitive overload alert.',
    symptom: 'Calculation load at 92% • Referee countdown pulsing',
    countermeasure: 'Auto-inject 35% time-dilation handicap cushion and Genesis Combo guide',
    elevatedBpm: 138,
    stressLevel: 85,
    alertText: '⚠️ SUDDEN DEATH OVERLOAD: Òmega⁸-AI adjusting difficulty curve to safeguard pilgrim.'
  },
  {
    id: 'bff_drain_attempt',
    agentId: 'bff-dex-bouncer',
    title: 'Malicious Permit2 Signature Injection',
    severity: 'CRITICAL' as const,
    description: 'Foreign phishing contract attempted to request broad token approvals during transaction.',
    symptom: 'Gate barrier engaged • Zero-Drain Shield absorbing payload',
    countermeasure: 'Quarantine foreign call, isolate session, and notify founder',
    elevatedBpm: 162,
    stressLevel: 96,
    alertText: '🚨 ZERO-DRAIN SHIELD ENGAGED: BFF-DEX-AI Bouncer vaporized unauthorized approval packet.'
  }
];

export default function AegisCommandCenter({
  distressModeActive,
  onToggleDistressMode,
  onLogMessage
}: AegisCommandCenterProps) {
  const [agents, setAgents] = useState<AgentVitals[]>(INITIAL_AGENTS);
  const [selectedAgentId, setSelectedAgentId] = useState<string>('poa-maddy-may');
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isDefibrillating, setIsDefibrillating] = useState<boolean>(false);
  const [monitorBpm, setMonitorBpm] = useState<number>(72);
  const [graphPoints, setGraphPoints] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Audio Telemetry Beeper (Procedural Web Audio API)
  const playHeartbeatBeep = useCallback((freq = 520, duration = 0.08) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration + 0.02);
    } catch {
      // AudioContext policy fallback
    }
  }, [soundEnabled]);

  // Handle global distressModeActive changes from parent
  useEffect(() => {
    if (distressModeActive) {
      setMonitorBpm(142);
      setAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          currentBpm: Math.floor(agent.nominalBpm * 1.85 + Math.random() * 15),
          stressLevel: Math.min(95, agent.stressLevel + 65),
          shieldHealth: Math.max(45, agent.shieldHealth - 25),
          status: 'CRITICAL_DEFENSE',
          lastAlert: '⚠️ GLOBAL DISTRESS ENGAGED: Aegis Army forming high-density smart-to-safe perimeter.',
        }))
      );
      playHeartbeatBeep(780, 0.15);
    } else if (!activeScenarioId) {
      setMonitorBpm(72);
      setAgents(INITIAL_AGENTS);
    }
  }, [distressModeActive, activeScenarioId, playHeartbeatBeep]);

  // Real-Time Canvas ECG / Oscilloscope Health Monitor Waveform Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let x = 0;
    const height = canvas.height;
    const width = canvas.width;
    const midY = height / 2;

    // Buffer for phosphor persistence effect
    ctx.fillStyle = '#060810';
    ctx.fillRect(0, 0, width, height);

    let stepInBeat = 0;
    const beatLength = distressModeActive || activeScenarioId ? 18 : 45; // faster when distressed

    const draw = () => {
      // Create trailing phosphor decay by filling with slight opacity black
      ctx.fillStyle = 'rgba(6, 8, 16, 0.06)';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid overlay
      ctx.strokeStyle = distressModeActive ? 'rgba(239, 68, 68, 0.08)' : 'rgba(0, 82, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gy = 0; gy < height; gy += 16) {
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
      }
      for (let gx = 0; gx < width; gx += 20) {
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
      }
      ctx.stroke();

      // Determine instantaneous ECG waveform value
      let yOffset = 0;
      stepInBeat = (stepInBeat + 1) % beatLength;

      // Realistic P-Q-R-S-T ECG Waveform math
      if (stepInBeat === 6) {
        // P-wave (atrial depolarization)
        yOffset = -8;
      } else if (stepInBeat === 10) {
        // Q-wave (initial septal deflection)
        yOffset = 6;
      } else if (stepInBeat === 12) {
        // R-peak (ventricular depolarization spike)
        yOffset = distressModeActive ? -height * 0.44 : -height * 0.36;
        if (stepInBeat === 12 && soundEnabled) {
          playHeartbeatBeep(distressModeActive ? 840 : 540, 0.05);
        }
      } else if (stepInBeat === 14) {
        // S-wave (late ventricular depolarization rebound)
        yOffset = height * 0.22;
      } else if (stepInBeat === 20) {
        // T-wave (ventricular repolarization)
        yOffset = -14;
      } else {
        // Isoelectric baseline with tiny natural noise
        yOffset = (Math.random() - 0.5) * 2;
      }

      const currentY = midY + yOffset;

      // Draw leading glowing head
      const isCritical = distressModeActive || (activeScenarioId && activeScenarioId !== null);
      const strokeColor = isCritical ? '#EF4444' : '#10B981';
      const glowColor = isCritical ? 'rgba(239, 68, 68, 0.8)' : 'rgba(16, 185, 129, 0.8)';

      ctx.save();
      ctx.shadowBlur = isCritical ? 14 : 8;
      ctx.shadowColor = glowColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.beginPath();

      const prevX = (x - 2 + width) % width;
      ctx.moveTo(prevX, midY);
      ctx.lineTo(x, currentY);
      ctx.stroke();

      // Draw scanning front laser head
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x, currentY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Clear small slice directly ahead of the beam
      ctx.fillStyle = '#060810';
      ctx.fillRect((x + 1) % width, 0, 8, height);

      x = (x + 2) % width;
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [distressModeActive, activeScenarioId, soundEnabled, playHeartbeatBeep]);

  // Trigger simulated distress scenario
  const handleTriggerScenario = (scenarioId: string) => {
    triggerHaptic('warning');
    const scenario = SIMULATED_DISTRESS_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) return;

    setActiveScenarioId(scenarioId);
    setSelectedAgentId(scenario.agentId);
    setMonitorBpm(scenario.elevatedBpm);

    setAgents((prev) =>
      prev.map((agent) => {
        if (agent.id === scenario.agentId) {
          return {
            ...agent,
            currentBpm: scenario.elevatedBpm,
            stressLevel: scenario.stressLevel,
            shieldHealth: Math.max(35, agent.shieldHealth - 30),
            status: 'CRITICAL_DEFENSE',
            lastAlert: scenario.alertText,
          };
        }
        return {
          ...agent,
          currentBpm: Math.floor(agent.nominalBpm * 1.3),
          stressLevel: Math.min(65, agent.stressLevel + 25),
          status: 'ELEVATED',
        };
      })
    );

    playHeartbeatBeep(720, 0.2);

    if (onLogMessage) {
      const timestamp = new Date().toLocaleTimeString();
      onLogMessage(`[${timestamp}] 🚨 AEGIS COMMAND CENTER ALERT: ${scenario.title} for agent ${scenario.agentId.toUpperCase()}`);
    }
  };

  // Defibrillate & Stabilize Swarm Action
  const handleDefibrillateSwarm = () => {
    triggerHaptic('heavy');
    setIsDefibrillating(true);
    playHeartbeatBeep(980, 0.35);

    setTimeout(() => {
      playHeartbeatBeep(660, 0.15);
      setTimeout(() => {
        playHeartbeatBeep(520, 0.1);
      }, 120);
    }, 250);

    const timestamp = new Date().toLocaleTimeString();
    if (onLogMessage) {
      onLogMessage(`[${timestamp}] ⚡ AEGIS DEFIBRILLATION PULSE: Restoring neural harmony & resetting telemetry to nominal.`);
    }

    setTimeout(() => {
      setIsDefibrillating(false);
      setActiveScenarioId(null);
      if (distressModeActive) {
        onToggleDistressMode();
      }
      setMonitorBpm(72);
      setAgents(INITIAL_AGENTS.map((a) => ({ ...a, status: 'NOMINAL', shieldHealth: 100, stressLevel: 8 })));
      triggerHaptic('success');
    }, 900);
  };

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];
  const activeScenario = SIMULATED_DISTRESS_SCENARIOS.find((s) => s.id === activeScenarioId);

  return (
    <div className="rounded-3xl bg-[#060811] border-2 border-[#0052FF]/40 p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-[0_0_50px_rgba(0,82,255,0.25)] space-y-8">
      
      {/* Ambient Visual Backlight */}
      <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
        distressModeActive || activeScenarioId ? 'bg-red-600/15' : 'bg-[#0052FF]/10'
      }`} />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & High-Level Telemetry Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0052FF]/20 border border-[#0052FF]/60 text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#60A5FA]" />
              AEGIS COMMAND CENTER
            </span>
            <span className={`text-[11px] font-mono px-3 py-1 rounded-full font-bold uppercase flex items-center gap-1.5 border transition-all ${
              distressModeActive || activeScenarioId 
                ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse'
                : 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40'
            }`}>
              <HeartPulse className="w-3.5 h-3.5" />
              {distressModeActive || activeScenarioId ? 'DISTRESS TELEMETRY ACTIVE' : 'TELEMETRY: ALL AGENTS NOMINAL'}
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/30 uppercase font-black">
              SWARM VITALS MATRIX
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
            <span>AI AGENT DISTRESS PULSE &amp; HEALTH OSCILLOSCOPE</span>
          </h3>

          <p className="text-xs sm:text-sm text-[#F5F1E8]/75 font-sans max-w-3xl leading-relaxed">
            Real-time biometric &amp; state telemetry across the 6 Aegis Army sentries. Monitor individual agent stress curves, detect sudden-death jitters, and deploy smart-to-safe defibrillation pulses.
          </p>
        </div>

        {/* Global Sound & Stabilizer Controls */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => {
              triggerHaptic('light');
              setSoundEnabled(!soundEnabled);
            }}
            className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 text-[#F5F1E8] font-mono text-xs font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer"
            title={soundEnabled ? 'Mute Heartbeat Telemetry' : 'Enable Heartbeat Audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#10B981]" /> : <VolumeX className="w-4 h-4 text-white/50" />}
            <span className="text-[11px]">{soundEnabled ? 'AUDIO ON' : 'AUDIO MUTED'}</span>
          </button>

          <button
            onClick={handleDefibrillateSwarm}
            disabled={isDefibrillating}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02] ${
              isDefibrillating
                ? 'bg-yellow-400 text-black animate-pulse'
                : 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black hover:from-[#F3E5AB] hover:to-[#D4AF37]'
            }`}
          >
            <Zap className={`w-4 h-4 ${isDefibrillating ? 'animate-spin' : ''}`} />
            <span>{isDefibrillating ? 'DEFIBRILLATING...' : 'DEFIBRILLATE & STABILIZE'}</span>
          </button>
        </div>
      </div>

      {/* CENTRAL HEALTH MONITOR / OSCILLOSCOPE GRAPH SECTION */}
      <div className={`p-6 sm:p-8 rounded-3xl border-2 transition-all duration-500 relative overflow-hidden ${
        distressModeActive || activeScenarioId
          ? 'bg-[#0E0608] border-red-500/60 shadow-[0_0_40px_rgba(239,68,68,0.3)]'
          : 'bg-[#070A14] border-[#0052FF]/50 shadow-[0_0_35px_rgba(0,82,255,0.2)]'
      }`}>
        
        {/* Top Monitor Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-2 font-bold uppercase ${
              distressModeActive || activeScenarioId ? 'text-red-400' : 'text-[#10B981]'
            }`}>
              <Activity className={`w-4 h-4 ${distressModeActive || activeScenarioId ? 'animate-bounce' : 'animate-pulse'}`} />
              CENTRAL OSCILLOSCOPE FEED: {selectedAgent.name.toUpperCase()}
            </span>
            <span className="text-white/40 text-[11px]">SWEEP RATE: 50mm/s</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="text-white/50">LEAD:</span>
              <span className="text-white font-bold">VANN-II</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-white/50">FILTER:</span>
              <span className="text-[#60A5FA]">EVM-0.05-150Hz</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-white/50">NOTCH:</span>
              <span className="text-[#D4AF37]">60Hz ON</span>
            </div>
          </div>
        </div>

        {/* Live Canvas Waveform Display & Live Numerical Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-6 items-center">
          
          {/* Main ECG Oscilloscope Canvas (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="relative rounded-2xl bg-[#04060C] border border-white/15 p-2 overflow-hidden shadow-inner">
              <canvas
                ref={canvasRef}
                width={700}
                height={160}
                className="w-full h-36 sm:h-44 block rounded-xl"
              />

              {/* Pulsing Center Warning Overlay during distress */}
              {(distressModeActive || activeScenarioId) && (
                <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-red-600/90 text-white font-mono font-black text-xs uppercase tracking-wider animate-pulse flex items-center gap-1.5 shadow-lg">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>TACHYCARDIA DEFENSE: {monitorBpm} BPM</span>
                </div>
              )}

              {/* Stabilizing flash effect */}
              {isDefibrillating && (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm animate-ping pointer-events-none" />
              )}
            </div>

            {/* Scale legend & rhythm classification */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F1E8]/60">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  distressModeActive || activeScenarioId ? 'bg-red-500 animate-ping' : 'bg-[#10B981] animate-pulse'
                }`} />
                <span>
                  {distressModeActive || activeScenarioId 
                    ? 'Rhythm: STRESS INDUCED ACCELERATION (Smart-to-Safe Defensive Cushion Engaged)' 
                    : 'Rhythm: SINUS HARMONY (All Systems Encrypted & Nominal)'}
                </span>
              </div>
              <div className="text-[#D4AF37]">
                Base L2 Block Height: #21,894,012
              </div>
            </div>
          </div>

          {/* Numerical Vitals Panel (1 col) */}
          <div className="space-y-3">
            <div className={`p-4 rounded-2xl border transition-all ${
              distressModeActive || activeScenarioId
                ? 'bg-red-950/40 border-red-500/50'
                : 'bg-black/50 border-white/10'
            }`}>
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-white/50">
                <span>SWARM HEARTBEAT</span>
                <HeartPulse className={`w-3.5 h-3.5 ${
                  distressModeActive || activeScenarioId ? 'text-red-400 animate-pulse' : 'text-[#10B981]'
                }`} />
              </div>
              <div className="flex items-baseline gap-2 pt-1">
                <span className={`text-3xl sm:text-4xl font-black font-mono ${
                  distressModeActive || activeScenarioId ? 'text-red-400' : 'text-[#10B981]'
                }`}>
                  {selectedAgent.currentBpm}
                </span>
                <span className="text-xs font-mono text-white/60">BPM</span>
              </div>
              <p className="text-[10px] text-white/50 font-sans pt-0.5">
                Nominal baseline: {selectedAgent.nominalBpm} BPM
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-white/50">
                <span>AEGIS SHIELD INTEGRITY</span>
                <span className={`font-bold ${selectedAgent.shieldHealth < 60 ? 'text-red-400' : 'text-[#10B981]'}`}>
                  {selectedAgent.shieldHealth}%
                </span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    selectedAgent.shieldHealth < 60 ? 'bg-red-500' : 'bg-[#10B981]'
                  }`}
                  style={{ width: `${selectedAgent.shieldHealth}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-white/50">
                <span>STRESS LEVEL</span>
                <span className={`font-bold ${selectedAgent.stressLevel > 60 ? 'text-red-400' : 'text-[#D4AF37]'}`}>
                  {selectedAgent.stressLevel}%
                </span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    selectedAgent.stressLevel > 60 ? 'bg-red-500' : 'bg-[#D4AF37]'
                  }`}
                  style={{ width: `${selectedAgent.stressLevel}%` }}
                />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* AGENT BIOMETRIC VITALS MATRIX (All 6 Agents) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-white font-bold uppercase flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#D4AF37]" />
            INDIVIDUAL AGENT VITALS &amp; DISTRESS INDICATORS (TAP TO FOCUS)
          </span>
          <span className="text-white/50 text-[11px]">REAL-TIME REVENUE &amp; SESSION PROTECTORS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => {
            const isSelected = agent.id === selectedAgentId;
            const isDistressed = agent.status === 'CRITICAL_DEFENSE';

            return (
              <div
                key={agent.id}
                onClick={() => {
                  triggerHaptic('light');
                  setSelectedAgentId(agent.id);
                  setMonitorBpm(agent.currentBpm);
                  playHeartbeatBeep(agent.currentBpm > 100 ? 760 : 540, 0.05);
                }}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative flex flex-col justify-between space-y-3 hover:scale-[1.02] ${
                  isSelected
                    ? isDistressed 
                      ? 'bg-red-950/40 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                      : 'bg-[#0D152B] border-[#0052FF] shadow-[0_0_20px_rgba(0,82,255,0.4)]'
                    : isDistressed
                    ? 'bg-[#12070A] border-red-500/40 hover:border-red-500'
                    : 'bg-[#080B14] border-white/10 hover:border-[#D4AF37]/50'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span 
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase"
                    style={{ backgroundColor: `${agent.avatarColor}20`, color: agent.avatarColor, border: `1px solid ${agent.avatarColor}40` }}
                  >
                    {agent.codename}
                  </span>

                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className={`w-2 h-2 rounded-full ${
                      isDistressed ? 'bg-red-500 animate-ping' : 'bg-[#10B981] animate-pulse'
                    }`} />
                    <span className={`font-bold ${isDistressed ? 'text-red-400' : 'text-[#10B981]'}`}>
                      {agent.currentBpm} BPM
                    </span>
                  </div>
                </div>

                {/* Name & Role */}
                <div>
                  <h4 className="text-sm font-black text-white uppercase">{agent.name}</h4>
                  <p className="text-[11px] font-mono text-[#D4AF37]">{agent.role}</p>
                </div>

                {/* Mini Visual Vitals Pulse Bar */}
                <div className="space-y-1.5 pt-1 border-t border-white/10">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-white/50">SHIELD STRENGTH</span>
                    <span className={`font-bold ${agent.shieldHealth < 60 ? 'text-red-400' : 'text-[#10B981]'}`}>
                      {agent.shieldHealth}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        agent.shieldHealth < 60 ? 'bg-red-500' : 'bg-[#10B981]'
                      }`}
                      style={{ width: `${agent.shieldHealth}%` }}
                    />
                  </div>
                </div>

                {/* Latest Telemetry Dispatch */}
                <p className="text-[11px] text-[#F5F1E8]/70 font-sans line-clamp-2">
                  {agent.lastAlert}
                </p>

                {/* Action status */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-white/40">DIAGNOSTIC STATUS</span>
                  <span className={`font-bold uppercase ${
                    isDistressed ? 'text-red-400' : 'text-[#60A5FA]'
                  }`}>
                    {agent.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DISTRESS SIMULATOR & EMERGENCY BROADCAST RUNWAYS */}
      <div className="p-6 rounded-3xl bg-[#090D18] border border-white/15 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
          <span className="text-[#D4AF37] font-bold uppercase flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#D4AF37]" />
            DISTRESS ALERT RUNWAY &amp; EMERGENCY INTERVENTION SCENARIOS
          </span>
          <span className="text-white/50 text-[11px]">TEST AEGIS ARMY AUTOMATED DEFENSIVE REFLEXES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {SIMULATED_DISTRESS_SCENARIOS.map((scenario) => {
            const isCurrent = activeScenarioId === scenario.id;

            return (
              <button
                key={scenario.id}
                onClick={() => handleTriggerScenario(scenario.id)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between space-y-2 hover:scale-[1.02] ${
                  isCurrent
                    ? 'bg-red-950/60 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                    : 'bg-black/40 border-white/10 hover:border-red-500/50'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                      scenario.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                    }`}>
                      {scenario.severity} ALERT
                    </span>
                    <span className="text-[10px] font-mono text-white/50">{scenario.elevatedBpm} BPM</span>
                  </div>
                  <h5 className="font-mono text-xs font-bold text-white pt-1">{scenario.title}</h5>
                  <p className="text-[11px] text-[#F5F1E8]/70 font-sans">{scenario.description}</p>
                </div>

                <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-[#D4AF37]">
                  <span>Action: {scenario.countermeasure}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Scenario Mitigation Banner */}
        {activeScenario && (
          <div className="p-4 rounded-2xl bg-red-950/50 border-2 border-red-500 text-xs font-mono space-y-2 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white">
              <span className="font-bold uppercase flex items-center gap-2 text-red-400">
                <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                ACTIVE INCIDENT: {activeScenario.title}
              </span>
              <span className="text-[11px] text-white/60">AUTONOMOUS COUNTERMEASURE DEPLOYED</span>
            </div>
            <p className="text-[#F5F1E8]/85 font-sans">
              <strong>Mitigation:</strong> {activeScenario.countermeasure}. The Aegis Army has created a Smart-to-Safe isolation membrane around the transaction and session cache.
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleDefibrillateSwarm}
                className="px-3.5 py-1.5 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase hover:bg-[#D4AF37] transition-all cursor-pointer shadow"
              >
                RESOLVE INCIDENT &amp; STABILIZE
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Command Center Footer Attribution */}
      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-white/60">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#60A5FA]" />
          <span>Aegis Command Center Telemetry v4.2 • Verified on Base L2 Chain ID: 8453</span>
        </div>
        <div className="flex items-center gap-2 text-[#D4AF37]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Vann Family Ventures LLC • Zero-Drain Sovereign Architecture</span>
        </div>
      </div>

    </div>
  );
}

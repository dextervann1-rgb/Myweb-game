"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Bot, 
  Zap, 
  AlertTriangle, 
  Sparkles, 
  Radio, 
  MessageSquare, 
  LifeBuoy, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Activity, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Clock,
  HeartPulse,
  Send,
  HelpCircle,
  Eye
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

export type StruggleScenario = 
  | 'timer_critical' 
  | 'score_deficit' 
  | 'gas_congestion' 
  | 'defense_broken' 
  | 'tab_timeout';

interface BouncerTip {
  agentId: string;
  agentName: string;
  codename: string;
  avatarColor: string;
  title: string;
  message: string;
  recommendedAction: string;
  actionButtonLabel: string;
  urgency: 'critical' | 'high' | 'advisory';
}

const STRUGGLE_PRESETS: Record<StruggleScenario, {
  label: string;
  distressLevel: number; // 0 - 100
  title: string;
  conditionDescription: string;
  tips: BouncerTip[];
}> = {
  timer_critical: {
    label: '⏱️ Sudden Death Clock (<8s)',
    distressLevel: 92,
    title: 'CRITICAL COUNTDOWN: SUDDEN DEATH OVERTIME',
    conditionDescription: 'Referee clock ticking under 8 seconds in the Cycle 0 Trial. High probability of cycle timeout.',
    tips: [
      {
        agentId: 'poa-maddy-may',
        agentName: 'POA Maddy May',
        codename: 'HEARTBEAT_KEEPER',
        avatarColor: '#10B981',
        title: 'Emergency Time Cushion Engaged',
        message: 'Do not panic-click. My heartbeat beacon has pinged the Base sequencer. I will hold your session alive through background frames.',
        recommendedAction: 'Engage Rhythm Stride (1 tap every 0.8s) rather than rapid spam to maximize accuracy.',
        actionButtonLabel: 'EXTEND HEARTBEAT BUFFER',
        urgency: 'critical'
      },
      {
        agentId: 'omega-8-ai',
        agentName: 'Òmega⁸-AI Core',
        codename: 'DIVINE_ORCHESTRATOR',
        avatarColor: '#A855F7',
        title: 'Overtime Multiplier Alert',
        message: 'Sudden Death grants a 2.5x point surge on your next 3 actions. A single clean action will rescue your ranking.',
        recommendedAction: 'Hit the center golden seal immediately to activate the divine surge.',
        actionButtonLabel: 'APPLY 2.5X SURGE BOOST',
        urgency: 'high'
      }
    ]
  },
  score_deficit: {
    label: '📉 Score Deficit (<500 Pts in Round 3)',
    distressLevel: 78,
    title: 'CYCLE PROGRESS DEFICIT DETECTED',
    conditionDescription: 'Player score is lagging behind the Cycle 0 Survival threshold (minimum 2,500 needed to advance).',
    tips: [
      {
        agentId: 'omega-8-ai',
        agentName: 'Òmega⁸-AI Core',
        codename: 'DIVINE_ORCHESTRATOR',
        avatarColor: '#A855F7',
        title: 'Handicap Rate Calibration',
        message: 'I have adjusted the difficulty curve: target hit windows widened by 35% and combo decay slowed down.',
        recommendedAction: 'Focus on chaining 3 consecutive glyph alignments to trigger the Genesis Combo.',
        actionButtonLabel: 'ENABLE BEGINNER HANDICAP',
        urgency: 'high'
      },
      {
        agentId: 'samantha-ai',
        agentName: 'Samantha AI',
        codename: 'VOICE_GUARDIAN',
        avatarColor: '#EC4899',
        title: 'Sanctuary Moral Resonance',
        message: 'Breathe, pilgrim. Every great survivor in the chronicles stumbled before claiming dominion. Your class perk is primed.',
        recommendedAction: 'Activate your class specialty (+15% to +30% class perk) on the next round.',
        actionButtonLabel: 'CHANNEL CLASS PERK',
        urgency: 'advisory'
      }
    ]
  },
  gas_congestion: {
    label: '⛽ Base Gas Spike & Queue Lag',
    distressLevel: 65,
    title: 'BASE SEQUENCER HIGH TRAFFIC ALERT',
    conditionDescription: 'Spike in Base L2 mempool calldata volume causing temporary confirmation delays.',
    tips: [
      {
        agentId: 'bff-dex-bouncer',
        agentName: 'BFF-DEX-AI Bouncer',
        codename: 'SANCTUM_GATEKEEPER',
        avatarColor: '#0052FF',
        title: 'Wallet Waiting Room Shielding',
        message: 'I am holding your transaction slot warm in the Sanctum Waiting Room. Front-running bots are locked out.',
        recommendedAction: 'Keep your signature pending. Do NOT cancel or submit duplicate tx to avoid burnt gas.',
        actionButtonLabel: 'QUEUE IN WAITING ROOM',
        urgency: 'high'
      },
      {
        agentId: 'marine-ai-scout',
        agentName: 'Marine Scout AI',
        codename: 'SWIFT_PATHFINDER',
        avatarColor: '#EF4444',
        title: 'Calldata Route Optimization',
        message: 'Detected secondary sub-millisecond route through the Base L2 direct pipe. Gas estimate trimmed by 18%.',
        recommendedAction: 'Proceed with default fee; our pre-flight check confirms zero revert probability.',
        actionButtonLabel: 'ROUTE VIA OPTIMIZED PIPE',
        urgency: 'advisory'
      }
    ]
  },
  defense_broken: {
    label: '🛡️ Defense Depleted (Calldata Drain Risk)',
    distressLevel: 88,
    title: 'VULNERABILITY SHIELD DEFICIT',
    conditionDescription: 'Player armor status is under heavy stress from multiple unverified calldata signatures.',
    tips: [
      {
        agentId: 'vann-ai-dlp',
        agentName: 'VannAI-DLP Sentinel',
        codename: 'VAULT_DLP_SENTINEL',
        avatarColor: '#D4AF37',
        title: 'Zero Data Loss Protocol',
        message: 'Locking local memory states in AES-256 encrypted buffers. If your browser crashes, your game cycle persists.',
        recommendedAction: 'Your battle state is saved locally. You can reload safely without losing points.',
        actionButtonLabel: 'FREEZE & BACKUP STATE',
        urgency: 'critical'
      },
      {
        agentId: 'bff-dex-bouncer',
        agentName: 'BFF-DEX-AI Bouncer',
        codename: 'SANCTUM_GATEKEEPER',
        avatarColor: '#0052FF',
        title: 'Signature Quarantine',
        message: 'I have closed the gate to all unverified smart contracts. Only official ÒMEGA Base contract (0x8f3C) is allowed.',
        recommendedAction: 'Verify that any prompt originates from 0x8f3Cf7ad23Cd3CaDbD9735AFF958023D60c2d460.',
        actionButtonLabel: 'STRENGTHEN GATE BARRIER',
        urgency: 'high'
      }
    ]
  },
  tab_timeout: {
    label: '📱 Mobile Tab Switch & Frame Freeze',
    distressLevel: 55,
    title: 'DEVICE BACKGROUND SUSPENSION DETECTED',
    conditionDescription: 'Mobile browser put the app in deep background sleep; risking disconnect during cycle scoring.',
    tips: [
      {
        agentId: 'poa-maddy-may',
        agentName: 'POA Maddy May',
        codename: 'HEARTBEAT_KEEPER',
        avatarColor: '#10B981',
        title: 'Zero Timeout WakeLock Activated',
        message: 'Restoring audio and animation loops at full 60 FPS. Time delta synchronized with on-chain block clock.',
        recommendedAction: 'Resume play smoothly; the referee has compensated for background frame delay.',
        actionButtonLabel: 'FORCE FRAME SYNC',
        urgency: 'high'
      }
    ]
  }
};

interface AegisArmyBouncerIntercomProps {
  distressModeActive: boolean;
  onToggleDistressMode: () => void;
  onLogMessage?: (msg: string) => void;
}

export default function AegisArmyBouncerIntercom({
  distressModeActive,
  onToggleDistressMode,
  onLogMessage
}: AegisArmyBouncerIntercomProps) {
  const [selectedScenario, setSelectedScenario] = useState<StruggleScenario>('timer_critical');
  const [activeTab, setActiveTab] = useState<'realtime_tips' | 'ask_bouncer' | 'assist_powers'>('realtime_tips');
  const [chatQuestion, setChatQuestion] = useState<string>('');
  const [chatLog, setChatLog] = useState<{ sender: string; text: string; role: string; time: string; color: string }[]>([
    {
      sender: 'BFF-DEX-AI Bouncer',
      role: 'SANCTUM_GATEKEEPER',
      text: 'Welcome to the Bouncer Intercom. When cycles get tough, we provide live smart-to-safe cover. Tap any struggle preset above or ask for instant help.',
      time: 'Just now',
      color: '#0052FF'
    }
  ]);
  const [activeAssistBoost, setActiveAssistBoost] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const currentScenarioData = STRUGGLE_PRESETS[selectedScenario];

  // Dynamic sound / audio feedback simulation
  const playAlertChirp = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.22);
    } catch {
      // Audio context fallback ignored
    }
  };

  const handleSelectScenario = (scenario: StruggleScenario) => {
    triggerHaptic('light');
    setSelectedScenario(scenario);
    playAlertChirp();

    if (onLogMessage) {
      const timestamp = new Date().toLocaleTimeString();
      onLogMessage(`[${timestamp}] 🤖 Aegis Army Bouncer switched monitor: ${STRUGGLE_PRESETS[scenario].title}`);
    }
  };

  const handleApplyAssist = (actionLabel: string, agentName: string) => {
    triggerHaptic('heavy');
    playAlertChirp();
    setActiveAssistBoost(actionLabel);

    const timestamp = new Date().toLocaleTimeString();
    const assistMsg = `[${timestamp}] 🛡️ AEGIS ASSIST ENGAGED: ${agentName} deployed "${actionLabel}" for struggling player!`;
    if (onLogMessage) onLogMessage(assistMsg);

    setChatLog((prev) => [
      {
        sender: agentName,
        role: 'ACTIVE_ASSIST',
        text: `✓ Protocol "${actionLabel}" successfully deployed to player cycle. Difficulty curve stabilized.`,
        time: 'Just now',
        color: '#10B981'
      },
      ...prev
    ]);

    setTimeout(() => {
      setActiveAssistBoost(null);
    }, 4500);
  };

  const handleAskQuestion = (promptText?: string) => {
    const query = promptText || chatQuestion;
    if (!query.trim()) return;

    triggerHaptic('medium');
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let responseText = '';
    let responderName = 'Òmega⁸-AI Core';
    let responderColor = '#A855F7';
    let responderRole = 'DIVINE_ORCHESTRATOR';

    const lower = query.toLowerCase();
    if (lower.includes('timer') || lower.includes('clock') || lower.includes('sudden death') || lower.includes('time')) {
      responderName = 'POA Maddy May';
      responderColor = '#10B981';
      responderRole = 'HEARTBEAT_KEEPER';
      responseText = 'In Sudden Death, the clock accelerates, but every rhythm hit awards 2.5x score. Stay calm and pace each strike at steady 1-second intervals!';
    } else if (lower.includes('gas') || lower.includes('wallet') || lower.includes('drain') || lower.includes('stuck') || lower.includes('pending')) {
      responderName = 'BFF-DEX-AI Bouncer';
      responderColor = '#0052FF';
      responderRole = 'SANCTUM_GATEKEEPER';
      responseText = 'I have placed you in the VIP Waiting Room lane. Your transaction will not be front-run or dropped. Zero drain guaranteed.';
    } else if (lower.includes('class') || lower.includes('perk') || lower.includes('archetype') || lower.includes('best')) {
      responderName = 'Samantha AI';
      responderColor = '#EC4899';
      responderRole = 'VOICE_GUARDIAN';
      responseText = 'For beginners struggling with score, Sentinel provides +25% Defense Aura while Warrior delivers +15% Battle Honor. Choose Sentinel for maximum survivability!';
    } else if (lower.includes('distress') || lower.includes('help') || lower.includes('struggling') || lower.includes('losing')) {
      responderName = 'Òmega⁸-AI Core';
      responderColor = '#A855F7';
      responderRole = 'DIVINE_ORCHESTRATOR';
      responseText = 'Distress Mode activates emergency handicap barriers and extends sudden death margins. Tap the "Distress Mode Lockdown" button above anytime!';
    } else {
      responderName = 'Marine Scout AI';
      responderColor = '#EF4444';
      responderRole = 'SWIFT_PATHFINDER';
      responseText = 'Sanctum perimeter is secure on Base L2. Keep your focus on rhythmic inputs and record your score at the end of Cycle 0!';
    }

    setChatLog((prev) => [
      {
        sender: 'You (Pilgrim)',
        role: 'PLAYER',
        text: query,
        time,
        color: '#F3E5AB'
      },
      {
        sender: responderName,
        role: responderRole,
        text: responseText,
        time,
        color: responderColor
      },
      ...prev
    ]);

    setChatQuestion('');
  };

  return (
    <div className="mt-8 rounded-3xl bg-[#060A14] border-2 border-[#0052FF]/50 p-5 sm:p-7 space-y-6 shadow-[0_0_35px_rgba(0,82,255,0.25)] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0052FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Sentry Telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0052FF]/25 border border-[#0052FF]/60 text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5" />
              AEGIS ARMY AI BOUNCER INTERCOM
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 uppercase font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              SENTRY ACTIVE
            </span>
            {distressModeActive && (
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-red-600/30 text-red-300 border border-red-500/70 uppercase font-bold animate-pulse flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-red-400" />
                DISTRESS PROTOCOL LIVE
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            REAL-TIME STRUGGLE RADAR &amp; DISTRESS ALERTS
          </h3>
          <p className="text-xs text-[#F5F1E8]/70 font-sans max-w-2xl">
            The Aegis Army continuously evaluates player metrics across game cycles. When timing slips or difficulty spikes, our autonomous AI bouncers intervene with instant tactical advice and handicap shields.
          </p>
        </div>

        {/* Quick Audio & Distress Toggle Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              triggerHaptic('light');
              setSoundEnabled(!soundEnabled);
            }}
            className={`p-2 rounded-xl border text-xs font-mono transition-all cursor-pointer flex items-center gap-1 ${
              soundEnabled
                ? 'bg-[#0052FF]/20 border-[#0052FF]/50 text-[#60A5FA]'
                : 'bg-black/50 border-white/10 text-white/40'
            }`}
            title={soundEnabled ? 'Audio alerts enabled' : 'Audio alerts muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'SFX ON' : 'SFX OFF'}</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic('heavy');
              onToggleDistressMode();
            }}
            className={`px-3.5 py-2 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-lg ${
              distressModeActive
                ? 'bg-red-600 text-white border border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.7)] animate-pulse'
                : 'bg-[#131B2E] text-red-400 border border-red-500/40 hover:border-red-500 hover:bg-red-950/40'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{distressModeActive ? 'DISTRESS: ACTIVE' : 'TRIGGER DISTRESS'}</span>
          </button>
        </div>
      </div>

      {/* Assist Boost Confirmation Toast */}
      {activeAssistBoost && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#10B981]/30 via-[#0052FF]/20 to-[#060A14] border-2 border-[#10B981] text-white flex items-center justify-between shadow-[0_0_25px_rgba(16,185,129,0.5)] animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5 font-mono text-xs">
            <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
            <div>
              <span className="text-[10px] text-[#10B981] uppercase font-bold block">TACTICAL ASSIST REINFORCEMENT ACTIVE</span>
              <span className="font-bold text-white">Applied: {activeAssistBoost} (Protected for Cycle 0)</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#10B981] font-bold px-2 py-0.5 rounded bg-[#10B981]/20 border border-[#10B981]/40">
            SHIELD LOCKED
          </span>
        </div>
      )}

      {/* STRUGGLE SCENARIO SELECTOR BAR */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#F5F1E8]/60 uppercase flex items-center gap-1 text-[11px]">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" /> SIMULATE / DETECT STRUGGLE CONDITION:
          </span>
          <span className="text-[#D4AF37] text-[11px] font-bold">
            Distress Index: {currentScenarioData.distressLevel}%
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
          {(Object.keys(STRUGGLE_PRESETS) as StruggleScenario[]).map((scenarioKey) => {
            const preset = STRUGGLE_PRESETS[scenarioKey];
            const isSelected = selectedScenario === scenarioKey;
            return (
              <button
                key={scenarioKey}
                onClick={() => handleSelectScenario(scenarioKey)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap text-xs font-bold ${
                  isSelected
                    ? 'bg-[#0052FF] text-white border border-[#60A5FA] shadow-[0_0_15px_rgba(0,82,255,0.6)]'
                    : 'bg-[#0B1020] text-[#F5F1E8]/70 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* DISTRESS ALERT MONITOR CARD */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 font-mono ${
        distressModeActive || currentScenarioData.distressLevel >= 80
          ? 'bg-gradient-to-r from-[#2A0808] to-[#120608] border-red-500/80 shadow-[0_0_25px_rgba(239,68,68,0.3)]'
          : 'bg-[#0A0F20] border-[#0052FF]/30'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              distressModeActive || currentScenarioData.distressLevel >= 80
                ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                : 'bg-[#0052FF]/20 text-[#60A5FA] border border-[#0052FF]/50'
            }`}>
              <ShieldAlert className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-black text-white uppercase tracking-wider">
                  {currentScenarioData.title}
                </h4>
                <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                  currentScenarioData.distressLevel >= 80
                    ? 'bg-red-500/30 text-red-300 border border-red-500/50'
                    : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                }`}>
                  {currentScenarioData.distressLevel >= 80 ? 'CRITICAL DISTRESS' : 'ELEVATED ALERT'}
                </span>
              </div>
              <p className="text-xs text-[#F5F1E8]/70 font-sans mt-0.5">
                {currentScenarioData.conditionDescription}
              </p>
            </div>
          </div>

          {/* Distress Level Progress Meter */}
          <div className="sm:w-44 space-y-1 shrink-0">
            <div className="flex justify-between text-[10px] text-[#F5F1E8]/60">
              <span>CYCLE DISTRESS</span>
              <span className="font-bold text-white">{currentScenarioData.distressLevel}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/70 border border-white/10 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  currentScenarioData.distressLevel >= 80
                    ? 'bg-gradient-to-r from-yellow-500 to-red-500'
                    : 'bg-gradient-to-r from-blue-500 to-yellow-500'
                }`}
                style={{ width: `${currentScenarioData.distressLevel}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* THREE-TAB NAVIGATION: 1. Real-Time Tips | 2. Ask AI Bouncer | 3. Assist Powers */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 font-mono text-xs">
        <button
          onClick={() => {
            triggerHaptic('light');
            setActiveTab('realtime_tips');
          }}
          className={`px-3.5 py-1.5 rounded-xl font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'realtime_tips'
              ? 'bg-[#D4AF37] text-black shadow-[0_0_12px_rgba(212,175,55,0.4)]'
              : 'bg-[#0B1020] text-[#F5F1E8]/60 hover:text-white border border-white/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>REAL-TIME BOUNCER TIPS ({currentScenarioData.tips.length})</span>
        </button>

        <button
          onClick={() => {
            triggerHaptic('light');
            setActiveTab('ask_bouncer');
          }}
          className={`px-3.5 py-1.5 rounded-xl font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'ask_bouncer'
              ? 'bg-[#0052FF] text-white shadow-[0_0_12px_rgba(0,82,255,0.5)]'
              : 'bg-[#0B1020] text-[#F5F1E8]/60 hover:text-white border border-white/10'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>INTERCOM CHAT</span>
        </button>

        <button
          onClick={() => {
            triggerHaptic('light');
            setActiveTab('assist_powers');
          }}
          className={`px-3.5 py-1.5 rounded-xl font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'assist_powers'
              ? 'bg-[#10B981] text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]'
              : 'bg-[#0B1020] text-[#F5F1E8]/60 hover:text-white border border-white/10'
          }`}
        >
          <LifeBuoy className="w-3.5 h-3.5" />
          <span>EMERGENCY ASSIST POWERS</span>
        </button>
      </div>

      {/* TAB 1: REAL-TIME BOUNCER TIPS */}
      {activeTab === 'realtime_tips' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
          {currentScenarioData.tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#090D18] border border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between space-y-4 relative group"
            >
              <div className="space-y-3">
                {/* Agent Header */}
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                      style={{ backgroundColor: `${tip.avatarColor}25`, color: tip.avatarColor, border: `1px solid ${tip.avatarColor}60` }}
                    >
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-xs">{tip.agentName}</h5>
                      <span className="text-[10px] text-[#F5F1E8]/50 block">{tip.codename}</span>
                    </div>
                  </div>

                  <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                    tip.urgency === 'critical'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                      : tip.urgency === 'high'
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                  }`}>
                    {tip.urgency}
                  </span>
                </div>

                {/* Directive Title & Message */}
                <div className="space-y-1">
                  <h6 className="text-xs font-mono font-bold text-[#F3E5AB]">
                    {tip.title}
                  </h6>
                  <p className="text-xs text-[#F5F1E8]/85 font-sans leading-relaxed">
                    "{tip.message}"
                  </p>
                </div>

                {/* Tactical Recommendation Box */}
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1 font-mono text-[11px]">
                  <span className="text-[10px] text-[#10B981] font-bold flex items-center gap-1 uppercase">
                    <CheckCircle2 className="w-3 h-3 text-[#10B981]" /> Tactical Action:
                  </span>
                  <p className="text-white/80 font-sans">
                    {tip.recommendedAction}
                  </p>
                </div>
              </div>

              {/* Action Trigger Button */}
              <button
                onClick={() => handleApplyAssist(tip.actionButtonLabel, tip.agentName)}
                className="w-full py-2 px-3 rounded-xl bg-[#0052FF]/20 hover:bg-[#0052FF] text-[#60A5FA] hover:text-white font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#0052FF]/40 hover:border-[#60A5FA]"
              >
                <span>{tip.actionButtonLabel}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: INTERCOM CHAT (ASK BOUNCER) */}
      {activeTab === 'ask_bouncer' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Quick Question Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
            <span className="text-[#F5F1E8]/50 text-[10px] uppercase whitespace-nowrap">QUICK PROMPT:</span>
            {[
              'How do I beat Sudden Death?',
              'Why is my score stuck?',
              'What is the best class perk for defense?',
              'Help! Gas is high on Base',
              'Will I lose my progress on tab switch?'
            ].map((q) => (
              <button
                key={q}
                onClick={() => handleAskQuestion(q)}
                className="px-2.5 py-1 rounded-lg bg-[#0B1020] hover:bg-[#0052FF]/30 text-[#F5F1E8]/70 hover:text-white border border-white/10 text-[11px] whitespace-nowrap transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages Feed */}
          <div className="p-4 rounded-2xl bg-[#080B14] border border-white/10 space-y-3 max-h-64 overflow-y-auto font-mono text-xs">
            {chatLog.map((chat, index) => (
              <div 
                key={index}
                className={`p-3 rounded-xl border space-y-1 ${
                  chat.sender.startsWith('You') 
                    ? 'bg-[#0E1528] border-[#0052FF]/40 ml-6' 
                    : 'bg-[#05070D] border-white/10 mr-6'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold flex items-center gap-1.5" style={{ color: chat.color }}>
                    <Bot className="w-3 h-3" />
                    {chat.sender} <span className="text-white/40">({chat.role})</span>
                  </span>
                  <span className="text-[#F5F1E8]/40">{chat.time}</span>
                </div>
                <p className="text-[#F5F1E8]/90 font-sans text-xs leading-relaxed">
                  {chat.text}
                </p>
              </div>
            ))}
          </div>

          {/* Ask Input Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleAskQuestion();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={chatQuestion}
              onChange={(e) => setChatQuestion(e.target.value)}
              placeholder="Ask the Aegis Army bouncers for instant advice on your cycle..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#080B14] border border-white/20 text-white placeholder:text-white/30 text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#FFD700] text-black font-mono font-bold text-xs uppercase transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>SEND</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: EMERGENCY ASSIST POWERS */}
      {activeTab === 'assist_powers' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs animate-in fade-in duration-300">
          
          {/* Power 1: Òmega⁸ Handicap Shield */}
          <div className="p-4 rounded-2xl bg-[#080D1A] border border-[#A855F7]/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="w-8 h-8 rounded-lg bg-[#A855F7]/20 border border-[#A855F7]/40 text-[#A855F7] flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </span>
              <h5 className="font-bold text-white text-xs uppercase">Handicap Shield</h5>
              <p className="text-[11px] text-[#F5F1E8]/70 font-sans leading-snug">
                Òmega⁸-AI dampens volatility and widens hit zones by +35% for beginners.
              </p>
            </div>
            <button
              onClick={() => handleApplyAssist('Handicap Shield (+35% margin)', 'Òmega⁸-AI Core')}
              className="w-full py-1.5 rounded-xl bg-[#A855F7]/20 hover:bg-[#A855F7] text-[#C084FC] hover:text-black font-bold uppercase transition-all cursor-pointer text-[10px]"
            >
              DEPLOY HANDICAP
            </button>
          </div>

          {/* Power 2: POA Heartbeat Extender */}
          <div className="p-4 rounded-2xl bg-[#080D1A] border border-[#10B981]/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="w-8 h-8 rounded-lg bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] flex items-center justify-center font-bold">
                <HeartPulse className="w-4 h-4" />
              </span>
              <h5 className="font-bold text-white text-xs uppercase">Heartbeat Keeper</h5>
              <p className="text-[11px] text-[#F5F1E8]/70 font-sans leading-snug">
                POA Maddy May extends background timeout limits, preventing match drops on tab switches.
              </p>
            </div>
            <button
              onClick={() => handleApplyAssist('Heartbeat Timeout Immunity', 'POA Maddy May')}
              className="w-full py-1.5 rounded-xl bg-[#10B981]/20 hover:bg-[#10B981] text-[#6EE7B7] hover:text-black font-bold uppercase transition-all cursor-pointer text-[10px]"
            >
              LOCK HEARTBEAT
            </button>
          </div>

          {/* Power 3: BFF-DEX Waiting Room Pass */}
          <div className="p-4 rounded-2xl bg-[#080D1A] border border-[#0052FF]/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="w-8 h-8 rounded-lg bg-[#0052FF]/20 border border-[#0052FF]/40 text-[#60A5FA] flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <h5 className="font-bold text-white text-xs uppercase">Zero-Drain Waiting Room</h5>
              <p className="text-[11px] text-[#F5F1E8]/70 font-sans leading-snug">
                BFF-DEX bouncer verifies your address and reserves your Base nonce against MEV front-runners.
              </p>
            </div>
            <button
              onClick={() => handleApplyAssist('VIP Waiting Room Priority', 'BFF-DEX Bouncer')}
              className="w-full py-1.5 rounded-xl bg-[#0052FF]/20 hover:bg-[#0052FF] text-[#93C5FD] hover:text-white font-bold uppercase transition-all cursor-pointer text-[10px]"
            >
              ENTER WAITING ROOM
            </button>
          </div>

          {/* Power 4: Samantha Moral Surge */}
          <div className="p-4 rounded-2xl bg-[#080D1A] border border-[#EC4899]/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="w-8 h-8 rounded-lg bg-[#EC4899]/20 border border-[#EC4899]/40 text-[#EC4899] flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </span>
              <h5 className="font-bold text-white text-xs uppercase">Sanctuary Blessing</h5>
              <p className="text-[11px] text-[#F5F1E8]/70 font-sans leading-snug">
                Samantha AI channels community grace, calming timer pressure and restoring focus.
              </p>
            </div>
            <button
              onClick={() => handleApplyAssist('Sanctuary Grace Blessing', 'Samantha AI')}
              className="w-full py-1.5 rounded-xl bg-[#EC4899]/20 hover:bg-[#EC4899] text-[#F472B6] hover:text-black font-bold uppercase transition-all cursor-pointer text-[10px]"
            >
              CLAIM BLESSING
            </button>
          </div>

        </div>
      )}

      {/* Footer Status Line */}
      <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-[#F5F1E8]/50">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
          Aegis Army 6-Agent Sentry Loop: Synchronized with Base Sequencer
        </span>
        <span className="text-[#D4AF37]">
          Powered by 3ÐHÐ vannthevisionaryai • Dexter Lamar Vann
        </span>
      </div>

    </div>
  );
}

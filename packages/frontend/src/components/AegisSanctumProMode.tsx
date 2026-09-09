"use client";

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  Bot, 
  Zap, 
  Lock, 
  Cpu, 
  Activity, 
  Wifi, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  Radar, 
  Eye, 
  AlertTriangle,
  RefreshCw,
  Sliders,
  Crown
} from 'lucide-react';
import CleanQueensMaintenance from './CleanQueensMaintenance';
import AegisArmyBouncerIntercom from './AegisArmyBouncerIntercom';
import AegisCommandCenter from './AegisCommandCenter';

interface SecurityAgent {
  id: string;
  name: string;
  codename: string;
  role: string;
  status: 'ACTIVE_SHIELD' | 'SCANNING' | 'STANDBY';
  pingMs: number;
  description: string;
  badgeColor: string;
  iconName: string;
}

const AGENTS_ARMY: SecurityAgent[] = [
  {
    id: 'bff-dex-bouncer',
    name: 'BFF-DEX-AI Bouncer',
    codename: 'SANCTUM_GATEKEEPER_01',
    role: 'Wallet Waiting Room & Gate Security',
    status: 'ACTIVE_SHIELD',
    pingMs: 4,
    description: 'Manages the Wallet Waiting Room queue, prevents front-running, blocks malicious signature drains, and keeps connections warm.',
    badgeColor: '#0052FF',
    iconName: 'Shield',
  },
  {
    id: 'poa-maddy-may',
    name: 'POA Maddy May',
    codename: 'ON_THE_WAY_HEARTBEAT',
    role: 'Zero Screen-Timeout Keeper',
    status: 'ACTIVE_SHIELD',
    pingMs: 2,
    description: 'Keeps game states alive across mobile tab switches and background pauses. Eliminates timed-out match screens completely.',
    badgeColor: '#10B981',
    iconName: 'Activity',
  },
  {
    id: 'vann-ai-dlp',
    name: 'VannAI Data Loss Prevention',
    codename: 'VAULT_DLP_SENTINEL',
    role: 'State Preservation & Anti-Leak Shield',
    status: 'ACTIVE_SHIELD',
    pingMs: 5,
    description: 'Guarantees local & on-chain session integrity, encrypts temporary inputs, and prevents loss of survival battle records.',
    badgeColor: '#D4AF37',
    iconName: 'Lock',
  },
  {
    id: 'omega-8-ai',
    name: 'Òmega⁸-AI Core',
    codename: 'DIVINE_ORCHESTRATOR',
    role: 'Multi-Interface Smart-to-Safe Engine',
    status: 'ACTIVE_SHIELD',
    pingMs: 3,
    description: 'Harmonizes Pro Mode switching, adjusts handicap rates for beginners, and manages real-time sudden death referee computations.',
    badgeColor: '#A855F7',
    iconName: 'Cpu',
  },
  {
    id: 'samantha-ai',
    name: 'Samantha AI',
    codename: 'SOVEREIGN_VOICE_GUARDIAN',
    role: 'Conversational Voice & Live Intelligence Guardian',
    status: 'ACTIVE_SHIELD',
    pingMs: 2,
    description: 'Guards real-time voice conversations and live intelligence feeds. Directs adaptive dialogue, answers player queries, and keeps the channel pristine.',
    badgeColor: '#EC4899',
    iconName: 'Sparkles',
  },
  {
    id: 'marine-ai-scout',
    name: 'Marine Scout AI',
    codename: 'SWIFT_PATHFINDER_4',
    role: 'Pre-Flight Contract & Threat Scout',
    status: 'SCANNING',
    pingMs: 6,
    description: 'Goes before transactions execute. Swiftly inspects call data, detects gas spikes, and flags early warning Ɓ€€4 threats.',
    badgeColor: '#EF4444',
    iconName: 'Radar',
  },
];

export default function AegisSanctumProMode() {
  const [proModeActive, setProModeActive] = useState<boolean>(false);
  const [distressModeActive, setDistressModeActive] = useState<boolean>(false);
  const [activeQueueTime, setActiveQueueTime] = useState<number>(0);
  const [radarAngle, setRadarAngle] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([
    "[05:04:12] BFF-DEX-AI Bouncer: Wallet Waiting Room initialized (Zero-Drain Guard active)",
    "[05:04:15] POA Maddy May: Heartbeat synced. Screen timeout protection: ONLINE",
    "[05:04:18] VannAI-DLP: Session state memory locked & encrypted",
    "[05:04:20] Samantha AI: Conversational voice bridge & live neural stream: ENGAGED",
    "[05:04:23] Marine Scout: Pre-flight perimeter check completed. Warning level: Ɓ€€4 Normal",
  ]);

  // Radar animation & queue timer effect
  useEffect(() => {
    const radarInterval = setInterval(() => {
      setRadarAngle((prev) => (prev + 8) % 360);
    }, 50);

    const queueInterval = setInterval(() => {
      setActiveQueueTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(radarInterval);
      clearInterval(queueInterval);
    };
  }, []);

  const toggleDistressMode = () => {
    const nextState = !distressModeActive;
    setDistressModeActive(nextState);
    const timestamp = new Date().toLocaleTimeString();
    if (nextState) {
      setLogs((prev) => [
        `[${timestamp}] ⚠️ DISTRESS MODE ENGAGED: Aegis Army forming high-barrier smart-to-safe perimeter!`,
        `[${timestamp}] Marine Scout: Sweeping call data for emergency reroute (Ɓ€€4 Alert)`,
        `[${timestamp}] BFF-DEX Bouncer: Locking waiting room to verified addresses only`,
        ...prev.slice(0, 5),
      ]);
    } else {
      setLogs((prev) => [
        `[${timestamp}] ✓ Distress Mode resolved. Returning to Pro Mode Standard Shield`,
        ...prev.slice(0, 5),
      ]);
    }
  };

  const toggleProMode = () => {
    const nextState = !proModeActive;
    setProModeActive(nextState);
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [
      `[${timestamp}] ${nextState ? '⚡ PRO MODE PROMO ACTIVATED' : '🔄 Standard Multi-Interface Active'}: Òmega⁸-AI synced at 60 FPS`,
      ...prev.slice(0, 5),
    ]);
  };

  return (
    <section id="aegis-sanctum" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* 3D HD Outer Sanctum Shell */}
      <div className={`rounded-3xl border-2 transition-all duration-500 p-6 sm:p-10 lg:p-12 relative overflow-hidden backdrop-blur-2xl ${
        distressModeActive 
          ? 'bg-gradient-to-b from-[#1C0A0A] via-[#0E0606] to-[#080B12] border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.4)]'
          : proModeActive 
          ? 'bg-gradient-to-b from-[#131126] via-[#0A0D1A] to-[#080B12] border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.35)]'
          : 'bg-[#090D16] border-[#0052FF]/50 shadow-[0_0_40px_rgba(0,82,255,0.2)]'
      }`}>
        
        {/* Holographic 3DHD ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0052FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#F5F1E8]/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0052FF]/20 border border-[#0052FF]/50 text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                AEGIS SANCTUM PROTOCOL
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/30 uppercase font-black">
                3ÐHÐ VANNTHEVISIONARYAI
              </span>
              {distressModeActive && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/50 text-[10px] font-mono font-black uppercase animate-pulse">
                  <AlertTriangle className="w-3 h-3" /> DISTRESS DEFENSE ACTIVE
                </span>
              )}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              AEGIS ARMY OF AI AGENTS
            </h2>
            <p className="text-xs sm:text-sm text-[#F5F1E8]/70 font-sans max-w-2xl mt-1">
              Multi-Interface Smart-to-Safe protection: BFF-DEX Bouncer, POA Maddy May, VannAI-DLP, Òmega⁸-AI, and Marine Scout defending your legacy on Base.
            </p>
          </div>

          {/* Interactive Control Switches: Pro Mode & Distress Mode */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={toggleProMode}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                proModeActive 
                  ? 'bg-[#D4AF37] text-[#0A0A0A] shadow-[0_0_20px_rgba(212,175,55,0.6)]' 
                  : 'bg-[#080B12] text-[#F3E5AB] border border-[#D4AF37]/40 hover:border-[#D4AF37]'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{proModeActive ? 'PRO MODE: ENGAGED' : 'ENABLE PRO MODE'}</span>
            </button>

            <button
              onClick={toggleDistressMode}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                distressModeActive 
                  ? 'bg-red-600 text-white shadow-[0_0_25px_rgba(239,68,68,0.8)] animate-pulse' 
                  : 'bg-[#080B12] text-red-400 border border-red-500/40 hover:border-red-500'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{distressModeActive ? 'DISTRESS: LOCKDOWN' : 'TEST DISTRESS DEFENSE'}</span>
            </button>
          </div>
        </div>

        {/* 6 AI Agents Army Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-8">
          {AGENTS_ARMY.map((agent) => (
            <div
              key={agent.id}
              className={`p-6 rounded-2xl bg-[#080B12]/90 border transition-all duration-300 relative flex flex-col justify-between space-y-4 hover:scale-[1.02] ${
                distressModeActive 
                  ? 'border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                  : 'border-[#F5F1E8]/10 hover:border-[#D4AF37]/50 shadow-[0_0_15px_rgba(0,0,0,0.5)]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span 
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase"
                    style={{ backgroundColor: `${agent.badgeColor}20`, color: agent.badgeColor, border: `1px solid ${agent.badgeColor}40` }}
                  >
                    {agent.codename}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#10B981]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                    <span>{agent.pingMs}ms</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${agent.badgeColor}15`, border: `1px solid ${agent.badgeColor}40`, color: agent.badgeColor }}
                  >
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white uppercase">{agent.name}</h3>
                    <p className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider">{agent.role}</p>
                  </div>
                </div>

                <p className="text-xs text-[#F5F1E8]/75 font-sans leading-relaxed">
                  {agent.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F5F1E8]/10 flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#F5F1E8]/50">ARMOR STATUS</span>
                <span className="text-[#10B981] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> SHIELD REINFORCED
                </span>
              </div>
            </div>
          ))}

          {/* Radar & Telemetry Live Monitor Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0B132B] to-[#080B12] border border-[#0052FF]/40 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#60A5FA] uppercase tracking-wider flex items-center gap-1">
                <Radar className="w-3.5 h-3.5 text-[#60A5FA]" />
                LIVE THREAT SCANNER
              </span>
              <span className="text-[10px] font-mono text-[#F3E5AB]">Ɓ€€4 PROTOCOL</span>
            </div>

            {/* Simulated Animated Radar Circle */}
            <div className="relative w-32 h-32 mx-auto my-2 rounded-full border-2 border-[#0052FF]/40 bg-[#060913] flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,82,255,0.3)]">
              {/* Concentric rings */}
              <div className="w-20 h-20 rounded-full border border-[#0052FF]/30 absolute" />
              <div className="w-10 h-10 rounded-full border border-[#0052FF]/20 absolute" />
              <div className="w-full h-[1px] bg-[#0052FF]/30 absolute" />
              <div className="h-full w-[1px] bg-[#0052FF]/30 absolute" />
              
              {/* Rotating Sweep Beam */}
              <div 
                className="absolute w-16 h-16 origin-bottom-right"
                style={{
                  transform: `rotate(${radarAngle}deg)`,
                  background: 'linear-gradient(135deg, rgba(0,82,255,0.7) 0%, rgba(212,175,55,0) 70%)',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                  top: 0,
                  left: 0,
                }}
              />
              <span className="relative z-10 text-[9px] font-mono text-white font-bold">
                0 THREATS
              </span>
            </div>

            <div className="text-[10px] font-mono text-center text-[#60A5FA]">
              POA Maddy May Heartbeat: Active ({activeQueueTime}s Session)
            </div>
          </div>
        </div>

        {/* Aegis Command Center: Hospital-Style Health Monitor Graph & AI Agent Distress Pulse */}
        <div className="mt-10">
          <AegisCommandCenter
            distressModeActive={distressModeActive}
            onToggleDistressMode={toggleDistressMode}
            onLogMessage={(msg) => setLogs((prev) => [msg, ...prev.slice(0, 5)])}
          />
        </div>

        {/* 'Aegis Army' AI Bouncer & Struggle Radar Intercom */}
        <AegisArmyBouncerIntercom 
          distressModeActive={distressModeActive}
          onToggleDistressMode={toggleDistressMode}
          onLogMessage={(msg) => setLogs((prev) => [msg, ...prev.slice(0, 5)])}
        />

        {/* Clean Queens Routine Maintenance & VannÐiamond Palladium Standard / €coÐ€X Securities */}
        <div className="mt-10">
          <CleanQueensMaintenance />
        </div>

        {/* Live Security Dispatch Terminal Feed */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#06080F] border border-[#F5F1E8]/10 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-[#F5F1E8]/60 border-b border-[#F5F1E8]/10 pb-2">
            <span className="flex items-center gap-1.5 text-[11px] text-[#D4AF37]">
              <Terminal className="w-3.5 h-3.5" /> AEGIS SANCTUM DISPATCH TELEMETRY
            </span>
            <span className="text-[10px] text-[#10B981]">SYSTEM NOMINAL</span>
          </div>

          <div className="space-y-1 text-[11px] max-h-28 overflow-y-auto">
            {logs.map((log, index) => (
              <p 
                key={index}
                className={index === 0 ? 'text-[#F3E5AB] font-bold' : 'text-[#F5F1E8]/70'}
              >
                {log}
              </p>
            ))}
          </div>
        </div>

        {/* 3DHD Design Signature & Legal Attribution */}
        <div className="mt-6 pt-4 border-t border-[#F5F1E8]/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-[#F5F1E8]/60">
          <span className="text-[#60A5FA]">
            3ÐHÐ design effects by vannthevisionaryai • Created by Dexter Lamar Vann
          </span>
          <span className="text-[#D4AF37] font-bold">
            All rights reserved © Vann Family Ventures LLC
          </span>
        </div>

      </div>

    </section>
  );
}

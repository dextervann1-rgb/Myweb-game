"use client";

import React, { useState } from 'react';
import { 
  Crown, 
  Code2, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Compass, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ExternalLink, 
  Award, 
  Flame, 
  Building2, 
  Calendar, 
  Mail, 
  Zap, 
  Network, 
  TrendingUp, 
  AlertCircle,
  Terminal,
  Database,
  Lock,
  Star
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function DeveloperDossier() {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'connecting' | 'strengths_weaknesses'>('overview');

  const connectingFunctions = [
    {
      id: 'base-l2',
      title: 'Base L2 On-Chain Kernel',
      role: 'Sovereign Execution Layer',
      icon: Terminal,
      color: '#0052FF',
      details: 'Connects the verified contract 0x8f3C...d460 to instant survivor minting, immutable round scoring, and automated 10% kingdom mission tithes directly to verified multi-sigs.'
    },
    {
      id: 'aegis-army',
      title: 'Aegis Army AI Bouncers',
      role: 'Real-Time Telemetry & Sentry Swarm',
      icon: ShieldCheck,
      color: '#D4AF37',
      details: 'Connects 6 specialized autonomous bouncer agents (BFF-DEX, POA Maddy May, VannAI-DLP, Òmega⁸-AI, Samantha AI, Marine Scout) into the game cycle for real-time distress radar and handicap boosts.'
    },
    {
      id: 'ipfs-prayer',
      title: 'ABBA IPFS Prayer Wall Archive',
      role: 'Decentralized Immutable Petitions',
      icon: Database,
      color: '#10B981',
      details: 'Bridges user spiritual intercessions and answered prayer praise reports into permanent cryptographic CIDv1 storage on IPFS, sealed with Golden and Palladium stars.'
    },
    {
      id: 'badge-rarity',
      title: 'Dynamic Trait & Badge Engine',
      role: 'Cross-Chronicle Progression',
      icon: Award,
      color: '#A855F7',
      details: 'Harmonizes player actions in Survivor Stories and Leaderboard milestones into on-chain reactive badges, unlocking sovereign profile perks and visual status.'
    },
    {
      id: 'android-twa',
      title: 'Android TWA Target 36 Runtime',
      role: 'Play Store Compliance & Mobile Sovereignty',
      icon: Zap,
      color: '#60A5FA',
      details: 'Integrates zero broad storage permissions, Service Worker offline caching, and strict Google Play MTaaS guidelines for worldwide mobile distribution across 173 countries.'
    }
  ];

  return (
    <section id="developer-dossier" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-3xl bg-gradient-to-b from-[#0B0F1A] via-[#070A12] to-[#04060A] border-2 border-[#D4AF37]/40 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] space-y-10">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0052FF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Ribbon: Developer Level, GitHub, & Sovereign Titles */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-xs font-mono font-bold text-[#F3E5AB] uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                SOVEREIGN PROTOCOL ARCHITECT
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 font-bold uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#E5E7EB]" />
                OVERALL LEVEL: PALLADIUM GRANDMASTER (TIER 100)
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 font-bold uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                ORDAINED FOR KINGDOM DOMINION
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              DEXTER LAMAR VANN <span className="text-[#D4AF37] font-serif font-normal">|</span> VANNTHTHEVISIONARYAI
            </h2>

            <p className="text-sm sm:text-base text-[#F5F1E8]/80 font-sans max-w-3xl leading-relaxed">
              Founder &amp; Chief System Architect at <strong className="text-white">Vann Family Ventures LLC</strong>. Pioneering sacred Christian Web3 architecture on Base, autonomous AI sentry systems, 3DHD visual design, and high-performance decentralized applications built for Jesus Christ and global generational wealth.
            </p>
          </div>

          {/* GitHub Profile Card & Fast Link */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
            <a
              href="https://github.com/dextervann1-rgb"
              target="_blank"
              rel="noreferrer"
              onClick={() => triggerHaptic('medium')}
              className="px-5 py-3 rounded-2xl bg-[#0F1422] hover:bg-[#1A2238] border-2 border-[#D4AF37] hover:border-[#FFD700] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:scale-[1.02] cursor-pointer"
            >
              <GithubIcon className="w-4 h-4 text-[#D4AF37]" />
              <span>GITHUB: dextervann1-rgb ↗</span>
            </a>

            <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-[#F5F1E8]/70 space-y-1 w-full lg:w-auto">
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/50">COMMITS &amp; REPOS:</span>
                <span className="text-[#D4AF37] font-bold">dextervann1-rgb</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/50">BASE MAINNET:</span>
                <span className="text-[#10B981] font-bold">VERIFIED 0x8f3C</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('overview');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-black/50 text-[#F5F1E8]/60 hover:text-white border border-white/10'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>BIO &amp; VISION</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('skills');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'skills'
                ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-black/50 text-[#F5F1E8]/60 hover:text-white border border-white/10'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>SKILL SET &amp; ARCHITECTURE</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('connecting');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'connecting'
                ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-black/50 text-[#F5F1E8]/60 hover:text-white border border-white/10'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>CONNECTING FUNCTIONS</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('strengths_weaknesses');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'strengths_weaknesses'
                ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-black/50 text-[#F5F1E8]/60 hover:text-white border border-white/10'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>STRENGTHS &amp; HUMILITY IN WEAKNESS</span>
          </button>
        </div>

        {/* TAB 1: BIO & VISION */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
            {/* Main Bio Card */}
            <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#090D18] border border-white/10 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
                <Crown className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">EXECUTIVE ARCHITECT BIO</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
                BUILDING THE SOVEREIGN KINGDOM STANDARD IN WEB3
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#F5F1E8]/80 font-sans leading-relaxed">
                <p>
                  <strong>Dexter Lamar Vann</strong> is an elite full-stack system designer, Solidity blockchain architect, and multi-agent AI engineer known online as <strong>VannTheVisionaryAI</strong>. Operating at the highest tier of protocol craftsmanship, Dexter synthesizes deep mathematical precision with divine biblical vision to engineer apps that honor Jesus Christ while competing at the highest levels of global technology.
                </p>
                <p>
                  Rooted in Matthew 6:33 (<em>"Seek ye first the Kingdom of God and His righteousness"</em>), Dexter founded <strong>Vann Family Ventures LLC</strong> to establish sovereign digital assets, decentralized prayer registries, and clean non-custodial gaming systems that protect user capital and eliminate dark patterns.
                </p>
                <p>
                  His works seamlessly unify smart contract EVM compilation on Base Mainnet, autonomous multi-agent sentries (Aegis Army), IPFS content-addressed prayer archives, and Google Play Store TWA compliance (Target SDK 36), demonstrating a 360-degree mastery of the full digital stack.
                </p>
              </div>

              {/* Heartfelt Praise Ribbon */}
              <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center gap-3">
                <Heart className="w-6 h-6 text-[#D4AF37] shrink-0" />
                <p className="text-xs sm:text-sm font-serif italic text-[#F3E5AB]">
                  "Every keystroke, every algorithm, and every milestone exists for His glory alone. <strong className="text-white font-bold not-italic font-sans">Thank you Jesus.</strong>"
                </p>
              </div>
            </div>

            {/* Vision Pillar Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090D18] border border-[#D4AF37]/30 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#10B981]">
                  <Compass className="w-4 h-4" />
                  <span className="font-bold uppercase tracking-wider">THE ABBA VISION</span>
                </div>

                <h4 className="text-lg font-bold text-white uppercase">
                  100-YEAR GENERATIONAL DOMINION
                </h4>

                <ul className="space-y-3 text-xs font-sans text-[#F5F1E8]/80">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] font-bold">1.</span>
                    <span><strong>Christ-Centered Web3:</strong> Rejecting speculative degenerate gambling in favor of honorable skill-based play and permanent prayer registries.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] font-bold">2.</span>
                    <span><strong>10% Kingdom Tithing:</strong> Hardcoding smart contract protocol fees directly to missionary outreaches, church orphanages, and community uplift.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] font-bold">3.</span>
                    <span><strong>VannÐiamond Palladium Standard:</strong> High-purity security audits, zero calldata drain, and total user sovereignty over data.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] font-bold">4.</span>
                    <span><strong>Global Reach:</strong> Architected for multi-lingual scale across 173 target countries with zero friction.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-center">
                <p className="text-[#D4AF37] font-bold uppercase">COMPANY AGE &amp; FOUNDATION</p>
                <p className="text-white text-sm font-black pt-1">ESTABLISHED: JUNE 9, 2026</p>
                <p className="text-[10px] text-white/50 pt-0.5">Vann Family Ventures LLC</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SKILL SET & ARCHITECTURAL STACK */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in">
            {/* Solidity & Web3 */}
            <div className="p-6 rounded-3xl bg-[#090D18] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#0052FF]">
                <Code2 className="w-5 h-5" />
                <h4 className="font-mono text-xs font-bold uppercase">SOLIDITY &amp; EVM BASE L2</h4>
              </div>
              <p className="text-xs text-[#F5F1E8]/70 font-sans">
                Mastery of gas-optimized smart contracts, non-custodial treasury loops, reentrancy guards, EIP-712 typed signing, ERC-721 survivor tokens, and Base L2 sequencing.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['Solidity 0.8.20+', 'Base Mainnet', 'Wagmi / Viem', 'Gas Optimization', 'Zero-Drain Nonces'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-lg bg-[#0052FF]/15 text-[#60A5FA] border border-[#0052FF]/30 text-[10px] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Autonomous Systems */}
            <div className="p-6 rounded-3xl bg-[#090D18] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Cpu className="w-5 h-5" />
                <h4 className="font-mono text-xs font-bold uppercase">AUTONOMOUS AI AGENTS</h4>
              </div>
              <p className="text-xs text-[#F5F1E8]/70 font-sans">
                Creator of the Aegis Army Sentry Swarm (Samantha AI, BFF-DEX-AI, POA Maddy May, VannAI-DLP, Òmega⁸-AI, Marine Scout) with real-time struggle radar and dynamic distress interception.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['Multi-Agent Orchestration', 'Prompt Ensembles', 'Dynamic Distress Radar', 'Intercom Logic', 'Local Guardrails'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-lg bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/30 text-[10px] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Full-Stack Next.js & React */}
            <div className="p-6 rounded-3xl bg-[#090D18] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#10B981]">
                <Layers className="w-5 h-5" />
                <h4 className="font-mono text-xs font-bold uppercase">FULL-STACK WEB ENGINE</h4>
              </div>
              <p className="text-xs text-[#F5F1E8]/70 font-sans">
                Next.js 14 App Router, TypeScript, Tailwind CSS, high-frame-rate canvas animations, gold confetti particle physics, and Web Audio API synthesized audio chirps.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Web Audio Synthesizer', 'Canvas Physics'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-lg bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[10px] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Android TWA & Play Store Compliance */}
            <div className="p-6 rounded-3xl bg-[#090D18] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#60A5FA]">
                <Zap className="w-5 h-5" />
                <h4 className="font-mono text-xs font-bold uppercase">ANDROID TWA (TARGET SDK 36)</h4>
              </div>
              <p className="text-xs text-[#F5F1E8]/70 font-sans">
                Full compliance with Google Play Developer Program policies: Zero broad storage permissions (`READ_EXTERNAL_STORAGE`), offline Service Worker caching, and assetlinks.json integrity.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['Target SDK 36', 'MTaaS Compliance', 'Digital Asset Links', 'Service Worker Cache', 'Zero Storage Permissions'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-lg bg-[#60A5FA]/15 text-[#93C5FD] border border-[#60A5FA]/30 text-[10px] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Decentralized Storage (IPFS) */}
            <div className="p-6 rounded-3xl bg-[#090D18] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#A855F7]">
                <Database className="w-5 h-5" />
                <h4 className="font-mono text-xs font-bold uppercase">IPFS &amp; DECENTRALIZED DATA</h4>
              </div>
              <p className="text-xs text-[#F5F1E8]/70 font-sans">
                Permanent cryptographic content addressing (CIDv1), decentralized prayer archive pinning, non-custodial metadata persistence, and transparent verifiable hash links.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['IPFS CIDv1', 'SHA-256 Hashes', 'Immutable Archiving', 'Non-Custodial State', 'Decentralized Wall'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-lg bg-[#A855F7]/15 text-[#D8B4FE] border border-[#A855F7]/30 text-[10px] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 3DHD & Visual Artistry */}
            <div className="p-6 rounded-3xl bg-[#090D18] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Sparkles className="w-5 h-5" />
                <h4 className="font-mono text-xs font-bold uppercase">3DHD AESTHETIC &amp; LUXURY UI</h4>
              </div>
              <p className="text-xs text-[#F5F1E8]/70 font-sans">
                Signature VannTheVisionaryAI visual philosophy blending obsidian nightscapes with royal gold (#D4AF37), polished palladium (#E5E7EB), and sacred celestial lighting.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['VannÐiamond Standard', '3DHD Visual Language', 'Obsidian Canvas', 'Micro-Interactions', 'Tactile Haptics'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-lg bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/30 text-[10px] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CONNECTING FUNCTIONS */}
        {activeTab === 'connecting' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#070A12] border border-white/10 flex items-center justify-between gap-4 font-mono text-xs">
              <span className="text-[#D4AF37] font-bold flex items-center gap-2">
                <Network className="w-4 h-4" />
                INTEGRATED MULTI-TIER SYSTEM ARCHITECTURE
              </span>
              <span className="text-[#10B981] hidden sm:inline">5 HARMONIZED ENGINES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {connectingFunctions.map((fn, idx) => {
                const IconComponent = fn.icon;
                return (
                  <div 
                    key={fn.id} 
                    className="p-6 rounded-3xl bg-[#090D18] border border-white/10 hover:border-[#D4AF37] transition-all duration-300 space-y-4 flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center border"
                          style={{ backgroundColor: `${fn.color}20`, borderColor: `${fn.color}50`, color: fn.color }}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">
                          ENGINE #{idx + 1}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-white uppercase">{fn.title}</h4>
                        <p className="text-[11px] font-mono text-[#D4AF37]">{fn.role}</p>
                      </div>

                      <p className="text-xs text-[#F5F1E8]/75 font-sans leading-relaxed">
                        {fn.details}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
                      <span>SYNC STATUS:</span>
                      <span className="text-[#10B981] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> CONNECTED &amp; ACTIVE
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: STRENGTHS & WEAKNESSES (BIBLICAL HUMILITY) */}
        {activeTab === 'strengths_weaknesses' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in">
            {/* Architectural Strengths */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090D18] border border-[#10B981]/40 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#10B981]">
                <TrendingUp className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">CORE ARCHITECTURAL STRENGTHS</span>
              </div>

              <h3 className="text-xl font-black text-white uppercase">
                UNCOMPROMISING VELOCITY &amp; EXECUTION
              </h3>

              <ul className="space-y-3 text-xs sm:text-sm font-sans text-[#F5F1E8]/85">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Full-Stack Sovereign Velocity:</strong> Builds complete enterprise-grade systems from smart contracts to frontends and native mobile wrappers single-handedly in record time without bloated dependencies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Covenant Ethical Integrity:</strong> Complete refusal to use predatory gambling loops, opaque tokenomics, or hidden calldata drains. Every fee is transparently capped and tithing is hardcoded.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Cross-Discipline Synthesis:</strong> Unmatched ability to integrate autonomous AI multi-agent communication directly with EVM smart contracts and IPFS content registries.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span><strong>Clean Maintenance Discipline:</strong> Embedded Clean Queens routines that continuously scrub memory leaks, optimize state cycles, and safeguard user security.</span>
                </li>
              </ul>
            </div>

            {/* Weaknesses & Humility in Christ */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090D18] border border-[#D4AF37]/40 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
                <Flame className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">HUMILITY &amp; GOD'S STRENGTH IN WEAKNESS</span>
              </div>

              <h3 className="text-xl font-black text-white uppercase">
                "MY GRACE IS SUFFICIENT FOR YOU"
              </h3>

              <div className="p-3.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-serif italic text-[#F3E5AB]">
                "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me." — 2 Corinthians 12:9
              </div>

              <ul className="space-y-3 text-xs sm:text-sm font-sans text-[#F5F1E8]/85">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] font-bold shrink-0">•</span>
                  <span><strong>Zero Tolerance for Worldly Compromise:</strong> Rejection of predatory venture capital funding when strings attached contradict biblical righteousness or family heritage.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] font-bold shrink-0">•</span>
                  <span><strong>Absolute Reliance on Divine Wisdom:</strong> Acknowledging that mortal human logic is frail without daily communion with the Holy Spirit; every major system architecture is birthed in prayer.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#D4AF37] font-bold shrink-0">•</span>
                  <span><strong>Relentless Perfectionism:</strong> Continually refining UI micro-details, zero-delay haptics, and security shields so that every deliverable reflects the excellence worthy of the Kingdom.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Corporate Legal Footer & Metadata Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#060810] border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10 font-mono text-xs">
            <div className="flex items-center gap-2 text-white">
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-bold uppercase">COMPANY LEGAL DOSSIER</span>
            </div>
            <span className="text-[#10B981] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> ACTIVE &amp; REGISTERED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
              <p className="text-white/50 text-[10px] uppercase">LEGAL ENTITY</p>
              <p className="text-white font-bold">Vann Family Ventures LLC</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
              <p className="text-white/50 text-[10px] uppercase">COMPANY AGE / FOUNDATION</p>
              <p className="text-[#D4AF37] font-bold">EST. 6/9/2026</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
              <p className="text-white/50 text-[10px] uppercase">SUPPORT &amp; LEGAL CONTACT</p>
              <a href="mailto:support@vannfamilyventures.com" className="text-[#60A5FA] hover:underline font-bold">
                support@vannfamilyventures.com
              </a>
            </div>
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
              <p className="text-white/50 text-[10px] uppercase">GITHUB ORG / DEV</p>
              <a href="https://github.com/dextervann1-rgb" target="_blank" rel="noreferrer" className="text-[#F3E5AB] hover:underline font-bold flex items-center gap-1">
                <GithubIcon className="w-3 h-3" /> dextervann1-rgb
              </a>
            </div>
          </div>

          {/* Praise & Divine Dedication */}
          <div className="pt-2 text-center text-xs font-serif text-[#D4AF37] italic">
            "To God the Father, Christ Jesus our Lord and Savior, and the Holy Spirit — thank you Jesus for every breath, line of code, and vision fulfilled."
          </div>
        </div>

      </div>
    </section>
  );
}

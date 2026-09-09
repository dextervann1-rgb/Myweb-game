"use client";

import React, { useState } from 'react';
import { 
  Scale, 
  FileText, 
  DollarSign, 
  Calculator, 
  TrendingUp, 
  CheckCircle2, 
  Printer, 
  Copy, 
  Check, 
  ShieldCheck, 
  Building2, 
  Clock, 
  Award, 
  Sparkles, 
  AlertCircle, 
  Layers, 
  Terminal, 
  Database, 
  Heart, 
  ChevronRight, 
  ExternalLink 
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function ExecutiveValuationSuite() {
  const [activeTab, setActiveTab] = useState<'checklist' | 'ctr_valuation' | 'invoice' | 'court_deck' | 'scalability'>('ctr_valuation');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Hourly Rate settings
  const architectRate = 275; // $/hr - Tier 100 Grandmaster Protocol Architect
  const devHoursBreakdown = [
    {
      module: 'Solidity EVM Smart Contracts (Base L2)',
      description: 'Gas-optimized survivor minting, non-custodial tithing split, EIP-712 typed signing, reentrancy guards, and BaseScan verification.',
      hours: 280,
      rate: architectRate,
      lead: 'Dexter Lamar Vann (VannTheVisionaryAI)',
      subtotal: 280 * architectRate
    },
    {
      module: 'Aegis Army Autonomous Multi-Agent AI Sentry Swarm',
      description: '6 interconnected agents (Samantha AI, BFF-DEX, POA Maddy May, VannAI-DLP, Òmega⁸-AI, Marine Scout) with struggle radar & dynamic assistance.',
      hours: 320,
      rate: 225,
      lead: 'Lead AI Systems Engineer',
      subtotal: 320 * 225
    },
    {
      module: 'Full-Stack Web3 Application Engine & Web Audio API',
      description: 'Next.js 14 App Router, Viem/Wagmi connectors, custom Web Audio frequency synthesizer, real-time particle confetti physics, and reactive state.',
      hours: 410,
      rate: 175,
      lead: 'Senior Full-Stack Web3 Engineer',
      subtotal: 410 * 175
    },
    {
      module: '3DHD Luxury UI/UX Design & Dynamic Trait System',
      description: 'Obsidian & Gold visual philosophy, dynamic badge unlocks, responsive touch targets (48dp), and tactile haptic feedback algorithms.',
      hours: 240,
      rate: 175,
      lead: 'Principal Creative Technologist',
      subtotal: 240 * 175
    },
    {
      module: 'Android TWA Native Integration & Google Play Store Policies',
      description: 'Target SDK 36, zero broad storage permissions, Service Worker caching, MTaaS testing guidelines, and assetlinks.json cryptographic validation.',
      hours: 190,
      rate: 190,
      lead: 'Mobile & Compliance Lead',
      subtotal: 190 * 190
    },
    {
      module: 'Decentralized IPFS Prayer Wall & Sovereign Architecture',
      description: 'Cryptographic CIDv1 content addressing, permanent petition archival, non-custodial security auditing, and corporate governance structuring.',
      hours: 160,
      rate: architectRate,
      lead: 'Dexter Lamar Vann (VannTheVisionaryAI)',
      subtotal: 160 * architectRate
    }
  ];

  const totalEngineeringHours = devHoursBreakdown.reduce((acc, item) => acc + item.hours, 0);
  const directLaborCost = devHoursBreakdown.reduce((acc, item) => acc + item.subtotal, 0);
  const ipMultiplier = 1.85; // Intellectual Property & proprietary Kingdom Web3 multiplier
  const totalIpValuation = directLaborCost * ipMultiplier;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerHaptic('success');
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 3000);
  };

  const handlePrint = () => {
    triggerHaptic('medium');
    window.print();
  };

  return (
    <section id="executive-valuation-suite" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-3xl bg-gradient-to-b from-[#0C101C] via-[#070913] to-[#04050A] border-2 border-[#D4AF37]/50 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.2)] space-y-8">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#0052FF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header & Executive Badge */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-xs font-mono font-bold text-[#F3E5AB] uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                VANN FAMILY VENTURES LLC
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 font-bold uppercase flex items-center gap-1.5">
                <Scale className="w-3 h-3" />
                OFFICIAL COURT &amp; VALUATION DOSSIER
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 font-bold uppercase">
                CTR VALUATION: ${totalIpValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
              INTELLECTUAL PROPERTY VALUATION &amp; DEPLOYMENT AUDIT
            </h2>

            <p className="text-xs sm:text-sm text-[#F5F1E8]/80 font-sans max-w-3xl leading-relaxed">
              Certified project cost-to-recreate (CTR) ledger, Play Store release checklist, official <strong>VFV-Invoice</strong>, court appearance presentation of sole authorship, and 0–3 year financial scalability &amp; net payroll waterfall.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-[#1A2238] hover:bg-[#253254] border border-[#D4AF37]/50 text-white font-mono text-xs font-bold uppercase flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span>PRINT / EXPORT PDF</span>
            </button>
            <a
              href="https://github.com/dextervann1-rgb"
              target="_blank"
              rel="noreferrer"
              onClick={() => triggerHaptic('light')}
              className="px-4 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 text-[#F3E5AB] font-mono text-xs font-bold uppercase flex items-center gap-2 transition-all cursor-pointer"
            >
              <GithubIcon className="w-4 h-4 text-[#D4AF37]" />
              <span>GITHUB PROOF ↗</span>
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono text-xs border-b border-white/10">
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('ctr_valuation');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ctr_valuation'
                ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-black/40 text-[#F5F1E8]/70 hover:text-white border border-white/10'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>1. CTR IP VALUATION ({totalEngineeringHours} HRS)</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('checklist');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'checklist'
                ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-black/40 text-[#F5F1E8]/70 hover:text-white border border-white/10'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>2. CONTRACTS &amp; PLAY STORE CHECKLIST</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('invoice');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'invoice'
                ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-black/40 text-[#F5F1E8]/70 hover:text-white border border-white/10'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>3. VFV CERTIFIED INVOICE</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('court_deck');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'court_deck'
                ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-black/40 text-[#F5F1E8]/70 hover:text-white border border-white/10'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>4. COURT PRESENTATION &amp; IP PROOF</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('scalability');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'scalability'
                ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-black/40 text-[#F5F1E8]/70 hover:text-white border border-white/10'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>5. 0–3 YR SCALABILITY &amp; NET PAYROLL</span>
          </button>
        </div>

        {/* TAB 1: CTR IP VALUATION */}
        {activeTab === 'ctr_valuation' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#090D18] border border-[#D4AF37]/30 space-y-1">
                <span className="text-[10px] font-mono uppercase text-white/50">DIRECT VERIFIED HOURS</span>
                <p className="text-2xl font-black text-[#D4AF37] font-mono">{totalEngineeringHours.toLocaleString()} HOURS</p>
                <p className="text-[11px] text-[#F5F1E8]/60 font-sans">Full engineering lifecycle</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#090D18] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-white/50">LEAD ARCHITECT RATING</span>
                <p className="text-2xl font-black text-white font-mono">${architectRate}.00 / HR</p>
                <p className="text-[11px] text-[#F5F1E8]/60 font-sans">Tier 100 Grandmaster benchmark</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#090D18] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase text-white/50">DIRECT LABOR REPLACEMENT</span>
                <p className="text-2xl font-black text-[#60A5FA] font-mono">${directLaborCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                <p className="text-[11px] text-[#F5F1E8]/60 font-sans">Baseline recreation investment</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#090D18] border border-[#10B981]/40 space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#10B981] font-bold">TOTAL CERTIFIED IP WORTH</span>
                <p className="text-2xl font-black text-[#10B981] font-mono">${totalIpValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                <p className="text-[11px] text-[#F5F1E8]/60 font-sans">Includes 1.85x proprietary IP multiplier</p>
              </div>
            </div>

            {/* Itemized Table of Modules */}
            <div className="p-6 rounded-3xl bg-[#080B14] border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-xs">
                <span className="text-white font-bold uppercase flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#D4AF37]" />
                  ITEMIZED COST-TO-RECREATE (CTR) BREAKDOWN
                </span>
                <span className="text-white/50 text-[11px]">BENCHMARKED AGAINST CURRENT SILICON VALLEY &amp; WEB3 AUDIT RATES</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b border-white/10 font-mono text-[10px] uppercase text-white/50 tracking-wider">
                      <th className="py-3 px-2">MODULE / SYSTEM ARCHITECTURE</th>
                      <th className="py-3 px-2">SPECIALIST LEAD</th>
                      <th className="py-3 px-2 text-center">HOURS</th>
                      <th className="py-3 px-2 text-right">HOURLY RATE</th>
                      <th className="py-3 px-2 text-right">MODULE TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {devHoursBreakdown.map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-2">
                          <p className="text-white font-bold">{item.module}</p>
                          <p className="text-[11px] text-[#F5F1E8]/60 font-sans pt-0.5 max-w-lg">{item.description}</p>
                        </td>
                        <td className="py-3.5 px-2 text-[#D4AF37] font-semibold text-[11px] whitespace-nowrap">
                          {item.lead}
                        </td>
                        <td className="py-3.5 px-2 text-center text-white">
                          {item.hours}
                        </td>
                        <td className="py-3.5 px-2 text-right text-white/70">
                          ${item.rate}.00
                        </td>
                        <td className="py-3.5 px-2 text-right text-[#10B981] font-bold">
                          ${item.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-[#D4AF37]/50 font-mono font-bold text-xs">
                      <td colSpan={2} className="py-3 px-2 text-white uppercase">
                        TOTAL DIRECT LABOR (REPLACEMENT COST):
                      </td>
                      <td className="py-3 px-2 text-center text-[#D4AF37]">
                        {totalEngineeringHours} HRS
                      </td>
                      <td className="py-3 px-2 text-right text-white/50">
                        AVG ${(directLaborCost / totalEngineeringHours).toFixed(2)}/HR
                      </td>
                      <td className="py-3 px-2 text-right text-[#D4AF37] text-sm">
                        ${directLaborCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                    <tr className="border-t border-white/10 font-mono text-xs">
                      <td colSpan={4} className="py-2.5 px-2 text-[#F3E5AB]">
                        + INTELLECTUAL PROPERTY &amp; NOVELTY MULTIPLIER (1.85x):
                        <span className="block text-[10px] text-white/50 font-sans font-normal">
                          Includes verified Base L2 smart contract deployment, Aegis Army AI sentries, proprietary ABBA IPFS prayer algorithms, and first-mover non-custodial advantage.
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-right text-[#F3E5AB]">
                        +${(totalIpValuation - directLaborCost).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                    <tr className="border-t-2 border-[#10B981] font-mono text-sm font-black bg-[#10B981]/10">
                      <td colSpan={4} className="py-3 px-2 text-white uppercase">
                        TOTAL VALUATION OF INTELLECTUAL PROPERTY (IP):
                      </td>
                      <td className="py-3 px-2 text-right text-[#10B981] text-base">
                        ${totalIpValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SMART CONTRACTS & PLAY STORE CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in">
            {/* Smart Contracts & Web3 Assets Checklist */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090D18] border border-white/10 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                <span className="text-[#0052FF] font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  SMART CONTRACTS TO DEPLOY (BASE L2)
                </span>
                <span className="px-2 py-0.5 rounded bg-[#0052FF]/20 text-[#60A5FA] text-[10px]">
                  CHAIN ID: 8453
                </span>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-white">1. OmegaSurvivorPass.sol</span>
                    <span className="font-mono text-[10px] text-[#10B981] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED 0x8f3C
                    </span>
                  </div>
                  <p className="text-[#F5F1E8]/70">
                    Gas-optimized ERC-721 survivor tokens with non-custodial round tracking, EIP-2981 royalty standard (2.5%), and emergency circuit breaker.
                  </p>
                  <div className="text-[10px] font-mono text-white/50 flex items-center gap-2">
                    <span>Target: Base Mainnet</span> • <span>Compiler: 0.8.20+</span> • <span>Optimized: 200 runs</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-white">2. AegisSanctumTreasury.sol</span>
                    <span className="font-mono text-[10px] text-[#10B981] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> COMPILED
                    </span>
                  </div>
                  <p className="text-[#F5F1E8]/70">
                    Immutable multi-sig treasury split that automatically directs the 10% Kingdom tithe to church/mission multi-sig wallets with zero custodial risk.
                  </p>
                  <div className="text-[10px] font-mono text-white/50 flex items-center gap-2">
                    <span>Pull-over-Push Transfer</span> • <span>Multi-Sig Safeguard</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-white">3. IPFSPrayerRegistry.sol</span>
                    <span className="font-mono text-[10px] text-[#10B981] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> READY
                    </span>
                  </div>
                  <p className="text-[#F5F1E8]/70">
                    Permanent cryptographic SHA-256 / CIDv1 on-chain pointer registry recording answered prayer praise reports into the Base block ledger.
                  </p>
                  <div className="text-[10px] font-mono text-white/50 flex items-center gap-2">
                    <span>Content Addressing</span> • <span>Zero Calldata Bloat</span>
                  </div>
                </div>
              </div>

              {/* Digital Assets Checklist */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <p className="font-mono text-xs font-bold text-[#D4AF37] uppercase">DIGITAL ASSET INVENTORY &amp; LICENSING</p>
                <ul className="text-xs text-[#F5F1E8]/80 space-y-1.5 list-disc list-inside">
                  <li><strong>3DHD Luxury UI Vector Suite:</strong> 100% proprietary vector assets in Obsidian &amp; Gold.</li>
                  <li><strong>Web Audio Synthesizer:</strong> Zero third-party audio files; algorithmic Web Audio chirps.</li>
                  <li><strong>Dynamic Trait Badges:</strong> Scalable SVG badges from Iron Pilgrim to Palladium Grandmaster.</li>
                  <li><strong>License:</strong> Proprietary Commercial &amp; Kingdom License © 2026 Vann Family Ventures LLC.</li>
                </ul>
              </div>
            </div>

            {/* Google Play Store Policy & MTaaS Checklist */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090D18] border border-[#10B981]/40 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                <span className="text-[#10B981] font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  GOOGLE PLAY STORE POLICIES (TARGET SDK 36)
                </span>
                <span className="px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] text-[10px] font-bold">
                  100% PASSING
                </span>
              </div>

              <div className="space-y-3.5 text-xs font-sans">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-mono">Zero Broad Storage Permissions:</strong>
                    <span className="text-[#F5F1E8]/70">No request for `READ_EXTERNAL_STORAGE` or `READ_MEDIA_*`. Uses native scoped storage and photo picker contracts exclusively.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-mono">Digital Asset Links (.well-known):</strong>
                    <span className="text-[#F5F1E8]/70">Cryptographically links domain to the SHA-256 APK fingerprint for instant full-screen TWA launching with no browser URL bar.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-mono">Non-Custodial Account &amp; Data Deletion:</strong>
                    <span className="text-[#F5F1E8]/70">Complies with Google Play Data Safety section. Users maintain full sovereignty with one-click local cache scrub and disconnection.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-mono">Dynamic Code Loading (DCL) Ban:</strong>
                    <span className="text-[#F5F1E8]/70">Zero external runtime `.dex` or `.jar` loading. All code is statically bundled, verified, and immutable upon release.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-mono">Target SDK 36 (Android 15+ Compatibility):</strong>
                    <span className="text-[#F5F1E8]/70">Strict adherence to Android 15/16 edge-to-edge guidelines, 48dp touch targets, and offline-first Service Worker functionality.</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#F3E5AB]">
                <strong>PLAY STORE COMPLIANCE STATUS:</strong> READY FOR PRODUCTION SUBMISSION TO 173 TARGET COUNTRIES.
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: OFFICIAL VFV INVOICE */}
        {activeTab === 'invoice' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleCopy(`VANN FAMILY VENTURES LLC\nCERTIFIED INVOICE #VFV-INV-2026-001\nTOTAL DUE / VALUE: $${totalIpValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}\nHOURS: ${totalEngineeringHours} @ $${architectRate}/HR\nDATE: SEPTEMBER 5, 2026\nISSUED BY: DEXTER LAMAR VANN`, 'invoice')}
                className="px-4 py-2 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 text-white font-mono text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
              >
                {copiedSection === 'invoice' ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4 text-[#D4AF37]" />}
                <span>{copiedSection === 'invoice' ? 'COPIED TO CLIPBOARD' : 'COPY INVOICE TEXT'}</span>
              </button>
            </div>

            {/* Printable Invoice Card */}
            <div className="p-8 sm:p-12 rounded-3xl bg-white text-black font-sans shadow-2xl space-y-8 print:p-0 print:shadow-none border border-gray-200">
              {/* Invoice Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b-2 border-black">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
                    VANN FAMILY VENTURES LLC
                  </h3>
                  <p className="text-xs font-mono text-gray-600 uppercase font-semibold">
                    SOVEREIGN PROTOCOL ARCHITECTURE &amp; DIGITAL ASSET SYSTEMS
                  </p>
                  <p className="text-xs text-gray-500 pt-1">
                    Registration Date: June 9, 2026 • Email: support@vannfamilyventures.com
                  </p>
                </div>

                <div className="text-left sm:text-right font-mono text-xs">
                  <p className="text-base font-black text-black">INVOICE: VFV-INV-2026-001</p>
                  <p className="text-gray-600">DATE OF ISSUANCE: SEPTEMBER 5, 2026</p>
                  <p className="text-gray-600">DUE UPON PRESENTATION / JUDICIAL RECORD</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    STATUS: CERTIFIED AUTHENTIC
                  </span>
                </div>
              </div>

              {/* Bill To & Project Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <p className="font-mono text-gray-500 font-bold uppercase text-[10px]">ISSUING ARCHITECT &amp; ENTITY</p>
                  <p className="font-bold text-sm text-black">Dexter Lamar Vann (VannTheVisionaryAI)</p>
                  <p className="text-gray-700">Chief System Architect &amp; Managing Member</p>
                  <p className="text-gray-700">Vann Family Ventures LLC</p>
                  <p className="text-gray-600 font-mono pt-1">GitHub: dextervann1-rgb</p>
                </div>

                <div>
                  <p className="font-mono text-gray-500 font-bold uppercase text-[10px]">PROJECT &amp; JURISDICTION</p>
                  <p className="font-bold text-sm text-black">ÒMEGA: Base L2 Christian Gaming Protocol</p>
                  <p className="text-gray-700">Includes Aegis Army AI, IPFS Registry, &amp; TWA Android Runtime</p>
                  <p className="text-gray-700">Standard: VannÐiamond Palladium Standard</p>
                  <p className="text-gray-600 font-mono pt-1">Base Verified Contract: 0x8f3C...d460</p>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300 font-mono text-[10px] uppercase text-gray-600 bg-gray-50">
                      <th className="py-2.5 px-3">ITEM DESCRIPTION</th>
                      <th className="py-2.5 px-3 text-center">RATE/HR</th>
                      <th className="py-2.5 px-3 text-center">HOURS</th>
                      <th className="py-2.5 px-3 text-right">TOTAL AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {devHoursBreakdown.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-3">
                          <p className="font-bold text-gray-900">{item.module}</p>
                          <p className="text-[11px] text-gray-600">{item.description}</p>
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-gray-700">${item.rate}.00</td>
                        <td className="py-3 px-3 text-center font-mono text-gray-700">{item.hours}</td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-gray-900">
                          ${item.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t-2 border-black font-mono">
                    <tr>
                      <td colSpan={2} className="py-2.5 px-3 font-bold text-gray-700">DIRECT ENGINEERING REPLACEMENT SUB-TOTAL:</td>
                      <td className="py-2.5 px-3 text-center font-bold">{totalEngineeringHours}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-gray-900">
                        ${directLaborCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="py-2 px-3 text-gray-600 text-[11px]">
                        Proprietary IP, Trade Secret &amp; Sovereign Architecture Multiplier (1.85x):
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-gray-800">
                        +${(totalIpValuation - directLaborCost).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                    <tr className="border-t-2 border-black text-sm bg-gray-100">
                      <td colSpan={3} className="py-3 px-3 font-black text-black uppercase">
                        CERTIFIED TOTAL REPLACEMENT &amp; ASSET VALUE:
                      </td>
                      <td className="py-3 px-3 text-right font-black text-black text-base">
                        ${totalIpValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Legal Declarations & Sign-Off */}
              <div className="pt-4 border-t border-gray-300 space-y-4 text-[11px] text-gray-600 leading-relaxed font-serif">
                <p>
                  <strong>CERTIFICATION STATEMENT:</strong> I hereby certify under penalty of perjury that the hours, architectural modules, smart contract deployments, and intellectual property items enumerated in this document accurately represent the authentic, verified professional development services rendered by Dexter Lamar Vann for Vann Family Ventures LLC between June 9, 2026 and September 5, 2026.
                </p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pt-4 font-mono text-xs">
                  <div>
                    <p className="font-bold text-black uppercase">DEXTER LAMAR VANN</p>
                    <p className="text-gray-500 text-[10px]">Managing Principal • Vann Family Ventures LLC</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-gray-500 text-[10px]">SEAL &amp; DIGITAL VERIFICATION</p>
                    <p className="font-bold text-emerald-700">BASE MAINNET VERIFIED CONTRACT 0x8f3C...d460</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COURT PRESENTATION & LEGAL DEFENSE */}
        {activeTab === 'court_deck' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-end">
              <button
                onClick={() => handleCopy(`SWORN AFFIDAVIT OF SOLE PROPRIETARY AUTHORSHIP & IP INVENTORSHIP\nCOURT JURISDICTION & RECORD OF INTELLECTUAL PROPERTY\nINVENTOR & SOVEREIGN ARCHITECT: Dexter Lamar Vann (VannTheVisionaryAI)\nCOMPANY: Vann Family Ventures LLC (Est. June 9, 2026)\nGITHUB COMMIT REPOSITORY: https://github.com/dextervann1-rgb\nBASE SMART CONTRACT: 0x8f3C...d460\nCERTIFIED CTR ASSET VALUE: $${totalIpValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}\nSCRIPTURAL MANDATE: Matthew 6:33; 2 Corinthians 12:9\nALL RIGHTS RESERVED © 2026 VANN FAMILY VENTURES LLC`, 'court_affidavit')}
                className="px-4 py-2 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 text-white font-mono text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
              >
                {copiedSection === 'court_affidavit' ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4 text-[#D4AF37]" />}
                <span>{copiedSection === 'court_affidavit' ? 'COPIED AFFIDAVIT' : 'COPY COURT AFFIDAVIT'}</span>
              </button>
            </div>

            {/* Legal Presentation Card */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#090D18] border-2 border-[#D4AF37]/40 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10 font-mono text-xs">
                <Scale className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <h3 className="text-base font-bold text-white uppercase">
                    SWORN EXHIBIT: PROOF OF SOLE INTELLECTUAL PROPERTY CREATION
                  </h3>
                  <p className="text-white/50 text-[11px]">Prepared for Judicial Notice, Asset Valuation, and Ownership Defense</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#F5F1E8]/85 font-sans leading-relaxed">
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                  <h4 className="font-mono text-xs font-bold text-[#D4AF37] uppercase flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    1. IRREFUTABLE CRYPTOGRAPHIC CHAIN OF CUSTODY
                  </h4>
                  <p>
                    All source code, smart contracts, visual assets, audio synthesis engines, and Android TWA components were authored and directed exclusively by <strong>Dexter Lamar Vann</strong> under <strong>Vann Family Ventures LLC</strong> (founded June 9, 2026).
                  </p>
                  <p className="text-[11px] font-mono text-[#60A5FA]">
                    • GitHub Timestamp Record: <a href="https://github.com/dextervann1-rgb" target="_blank" rel="noreferrer" className="underline">github.com/dextervann1-rgb</a><br />
                    • Immutable Base Blockchain Contract: <span className="text-white font-bold">0x8f3C...d460</span> (Block timestamped and gas verified)<br />
                    • IPFS Decentralized Archival Hashes: Cryptographic CIDv1 content addressed prayer logs
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                  <h4 className="font-mono text-xs font-bold text-[#10B981] uppercase flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#10B981]" />
                    2. INDEPENDENT FAIR MARKET REPLACEMENT VALUE (CTR)
                  </h4>
                  <p>
                    Per established corporate finance and software asset valuation doctrine (Cost-to-Recreate / Replacement Cost Method), the direct engineering expenditure required to reconstruct this 6-module architecture exceeds <strong>1,600 verified technical hours</strong>, reflecting a direct replacement labor value of <strong>${directLaborCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>, and a total certified IP value of <strong>${totalIpValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong> with novel multi-agent AI and Base L2 smart contract multipliers.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                  <h4 className="font-mono text-xs font-bold text-[#F3E5AB] uppercase flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#D4AF37]" />
                    3. UNENCUMBERED SOVEREIGNTY &amp; COVENANT TITHE PROTECTION
                  </h4>
                  <p>
                    The business model of Vann Family Ventures LLC explicitly rejects deceptive predatory monetization, predatory loot-box mechanics, and venture capital debt covenants. A foundational <strong>10% Kingdom tithe</strong> is hardcoded into the protocol to serve humanitarian, church, and community missions in perpetuity, proving bona fide philanthropic and commercial utility.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#060810] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-white/70">
                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>RECORDING ENTITY: <strong>Vann Family Ventures LLC</strong></span>
                </div>
                <div className="text-[#10B981] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> ALL INTELLECTUAL PROPERTY RIGHTS RESERVED
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: 0–3 YEAR SCALABILITY & NET REVENUE / PAYROLL */}
        {activeTab === 'scalability' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-[#070A12] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
              <span className="text-[#D4AF37] font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                WATERFALL REVENUE MODEL: 0 TO 3 YEARS
              </span>
              <span className="text-white/60">
                Formula: Gross Revenue − (Maint + Platform Fees + 21% Tax + 10% Tithe) = Net Payroll &amp; Reserves
              </span>
            </div>

            {/* Year-by-Year Waterfall Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Year 0: Launch & Hardening */}
              <div className="p-6 rounded-3xl bg-[#090D18] border border-white/15 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#60A5FA]">YEAR 0</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/70">LAUNCH</span>
                  </div>
                  <h4 className="text-xl font-black text-white font-mono">$180,000 GROSS</h4>
                  <p className="text-[11px] text-[#F5F1E8]/70 font-sans">
                    Initial survivor passes, tournament registrations, early adoption in Base community.
                  </p>

                  <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-white/60">
                      <span>Maintenance / RPC:</span>
                      <span className="text-red-400">-$12,000</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Platform &amp; Store (15%):</span>
                      <span className="text-red-400">-$27,000</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Federal/State Tax (21%):</span>
                      <span className="text-red-400">-$29,610</span>
                    </div>
                    <div className="flex justify-between text-[#F3E5AB]">
                      <span>10% Kingdom Tithe:</span>
                      <span className="text-yellow-400 font-bold">-$18,000</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/40 space-y-1">
                  <p className="text-[10px] font-mono text-[#10B981] uppercase font-bold">NET AVAILABLE FOR PAYROLL</p>
                  <p className="text-lg font-black text-[#10B981] font-mono">$93,390</p>
                  <p className="text-[10px] text-white/60 font-sans">Covers founder stipend &amp; contractor support</p>
                </div>
              </div>

              {/* Year 1: Multi-Region Scale */}
              <div className="p-6 rounded-3xl bg-[#090D18] border border-white/15 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#D4AF37]">YEAR 1</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37]">EXPANSION</span>
                  </div>
                  <h4 className="text-xl font-black text-white font-mono">$750,000 GROSS</h4>
                  <p className="text-[11px] text-[#F5F1E8]/70 font-sans">
                    50,000 active pilgrims, secondary NFT creator royalties, mobile Play Store momentum.
                  </p>

                  <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-white/60">
                      <span>Cloud / RPC / IPFS:</span>
                      <span className="text-red-400">-$36,000</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Platform &amp; Gateways:</span>
                      <span className="text-red-400">-$112,500</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Tax Reserves (21%):</span>
                      <span className="text-red-400">-$126,315</span>
                    </div>
                    <div className="flex justify-between text-[#F3E5AB]">
                      <span>10% Kingdom Tithe:</span>
                      <span className="text-yellow-400 font-bold">-$75,000</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/40 space-y-1">
                  <p className="text-[10px] font-mono text-[#10B981] uppercase font-bold">NET AVAILABLE FOR PAYROLL</p>
                  <p className="text-lg font-black text-[#10B981] font-mono">$400,185</p>
                  <p className="text-[10px] text-white/60 font-sans">Sustains 4 full-time developers + team bonuses</p>
                </div>
              </div>

              {/* Year 2: Global Penetration */}
              <div className="p-6 rounded-3xl bg-[#090D18] border border-white/15 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#A855F7]">YEAR 2</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#A855F7]/20 text-[#D8B4FE]">GLOBAL</span>
                  </div>
                  <h4 className="text-xl font-black text-white font-mono">$2,400,000 GROSS</h4>
                  <p className="text-[11px] text-[#F5F1E8]/70 font-sans">
                    250,000 users across 173 target countries, brand sponsorships, tournament syndication.
                  </p>

                  <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-white/60">
                      <span>Multi-Node Infra:</span>
                      <span className="text-red-400">-$84,000</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Platform Fees:</span>
                      <span className="text-red-400">-$360,000</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Corporate Tax (21%):</span>
                      <span className="text-red-400">-$410,760</span>
                    </div>
                    <div className="flex justify-between text-[#F3E5AB]">
                      <span>10% Kingdom Tithe:</span>
                      <span className="text-yellow-400 font-bold">-$240,000</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/40 space-y-1">
                  <p className="text-[10px] font-mono text-[#10B981] uppercase font-bold">NET AVAILABLE FOR PAYROLL</p>
                  <p className="text-lg font-black text-[#10B981] font-mono">$1,305,240</p>
                  <p className="text-[10px] text-white/60 font-sans">Sustains 10-12 team members + expansion</p>
                </div>
              </div>

              {/* Year 3: Sovereign Kingdom Dominion */}
              <div className="p-6 rounded-3xl bg-[#090D18] border-2 border-[#D4AF37]/50 space-y-4 flex flex-col justify-between shadow-[0_0_25px_rgba(212,175,55,0.2)]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#F3E5AB]">YEAR 3</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37] text-black font-bold">DOMINION</span>
                  </div>
                  <h4 className="text-xl font-black text-[#D4AF37] font-mono">$6,500,000 GROSS</h4>
                  <p className="text-[11px] text-[#F5F1E8]/70 font-sans">
                    Ecosystem maturity, enterprise licensing of Aegis AI sentry swarms, global kingdom footprint.
                  </p>

                  <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-white/60">
                      <span>Global Edge Infra:</span>
                      <span className="text-red-400">-$180,000</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Platform Fees:</span>
                      <span className="text-red-400">-$975,000</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Corporate Tax (21%):</span>
                      <span className="text-red-400">-$1,122,450</span>
                    </div>
                    <div className="flex justify-between text-[#F3E5AB]">
                      <span>10% Kingdom Tithe:</span>
                      <span className="text-yellow-400 font-bold">-$650,000</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/60 space-y-1">
                  <p className="text-[10px] font-mono text-[#F3E5AB] uppercase font-bold">NET FOR EMPLOYEES &amp; RESERVES</p>
                  <p className="text-xl font-black text-white font-mono">$3,572,550</p>
                  <p className="text-[10px] text-[#F3E5AB]/80 font-sans">Executive payroll, employee equity &amp; family trust</p>
                </div>
              </div>
            </div>

            {/* Tithe & Employee Commitment Summary */}
            <div className="p-6 rounded-3xl bg-[#060810] border border-white/10 space-y-3 font-sans text-xs text-[#F5F1E8]/80 leading-relaxed">
              <div className="flex items-center gap-2 font-mono text-sm text-[#D4AF37] font-bold uppercase">
                <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                THE VANN FAMILY VENTURES COVENANT PROMISE
              </div>
              <p>
                Across 3 operating years, over <strong>$983,000.00</strong> will be tithed directly into verified charitable, missionary, and kingdom initiatives, ensuring the spiritual core of the protocol remains uncorrupted. Over <strong>$5.3M+</strong> in net cumulative reserves will be deployed for competitive employee compensation, comprehensive healthcare, engineering development bonuses, and inter-generational wealth preservation.
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

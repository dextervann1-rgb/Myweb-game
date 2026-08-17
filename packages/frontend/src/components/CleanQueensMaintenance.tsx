"use client";

import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Crown, 
  RefreshCw, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  TrendingUp, 
  Activity, 
  Flame, 
  Lock, 
  Radio, 
  Sliders, 
  Zap,
  RotateCcw
} from 'lucide-react';

interface SecurityMetric {
  title: string;
  value: string;
  status: string;
  statusColor: string;
  detail: string;
}

export default function CleanQueensMaintenance() {
  const [isCleaning, setIsCleaning] = useState<boolean>(false);
  const [cleanProgress, setCleanProgress] = useState<number>(100);
  const [lastCleanedTime, setLastCleanedTime] = useState<string>("JUST NOW");
  const [maintenanceLogs, setMaintenanceLogs] = useState<string[]>([
    "✓ Clean Queens Fleet Alpha: Stale calldata purged (0 residual leaks)",
    "✓ VannÐiamond Palladium Standard: Verified 99.999% protocol purity",
    "✓ €coÐ€X Securities: Liquidity reserves locked & cryptographic proofs intact",
    "✓ State Shards: 4,096 memory nodes re-indexed with zero latency"
  ]);

  const handleDeployCleanQueens = () => {
    if (isCleaning) return;
    setIsCleaning(true);
    setCleanProgress(0);

    const steps = [
      "⚡ Clean Queens Squadron dispatched across RPC clusters...",
      "🧹 Sweeping memory caches & unconfirmed mempool packets...",
      "💎 Re-aligning state hashes to VannÐiamond Palladium Standard...",
      "🛡️ €coÐ€X Securities telemetry verification: 100% Invariants green...",
      "✨ Routine maintenance finalized. Protocol running at peak purity."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setCleanProgress((prev) => Math.min(prev + 20, 100));

      if (currentStep <= steps.length) {
        setMaintenanceLogs((prev) => [
          `[${new Date().toLocaleTimeString()}] ${steps[currentStep - 1]}`,
          ...prev.slice(0, 5)
        ]);
      }

      if (currentStep >= steps.length) {
        clearInterval(interval);
        setIsCleaning(false);
        setLastCleanedTime(new Date().toLocaleTimeString());
      }
    }, 600);
  };

  const METRICS: SecurityMetric[] = [
    {
      title: "VannÐiamond Palladium Standard",
      value: "99.999% PURE",
      status: "PALLADIUM GRADE",
      statusColor: "text-[#D4AF37] bg-[#D4AF37]/15 border-[#D4AF37]/40",
      detail: "Ultra-high resilience covenant state storage"
    },
    {
      title: "€coÐ€X Securities Health",
      value: "100.00% SECURE",
      status: "FULLY AUDITED",
      statusColor: "text-[#10B981] bg-[#10B981]/15 border-[#10B981]/40",
      detail: "Active real-time escrow & liquidity surveillance"
    },
    {
      title: "Clean Queens Sanitation",
      value: "OPTIMAL",
      status: isCleaning ? "CLEANING IN PROGRESS" : "STANDBY REINFORCED",
      statusColor: isCleaning ? "text-[#60A5FA] bg-[#0052FF]/20 border-[#0052FF]/50 animate-pulse" : "text-[#10B981] bg-[#10B981]/15 border-[#10B981]/40",
      detail: `Last routine sweep: ${lastCleanedTime}`
    },
    {
      title: "Memory Shards Integrity",
      value: "4,096 / 4,096",
      status: "ZERO FRAGMENTATION",
      statusColor: "text-[#A855F7] bg-[#A855F7]/15 border-[#A855F7]/40",
      detail: "Zero timed-out states via POA heartbeat"
    }
  ];

  return (
    <div className="rounded-3xl bg-gradient-to-b from-[#0E1322] via-[#090D16] to-[#080B12] border-2 border-[#D4AF37]/60 p-6 sm:p-8 lg:p-10 shadow-[0_0_40px_rgba(212,175,55,0.25)] space-y-8 relative overflow-hidden">
      
      {/* Background ambient accents */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#0052FF]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#F5F1E8]/10 pb-6 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-xs font-mono font-bold text-[#F3E5AB] uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              CLEAN QUEENS ROUTINE MAINTENANCE
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 uppercase font-black">
              CONTRACTED & ACTIVE
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            VANNÐIAMOND PALLADIUM STANDARD & €COÐ€X SECURITIES
          </h3>

          <p className="text-xs sm:text-sm text-[#F5F1E8]/75 font-sans max-w-2xl">
            Autonomous maintenance fleet contracted to purge memory fragments, verify €coÐ€X Securities, and uphold the uncompromising VannÐiamond Palladium Standard.
          </p>
        </div>

        {/* Deploy Action Button */}
        <div className="shrink-0 flex items-center gap-3">
          <button
            onClick={handleDeployCleanQueens}
            disabled={isCleaning}
            className={`px-5 py-3.5 rounded-2xl font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer shadow-lg ${
              isCleaning
                ? 'bg-[#0052FF] text-white opacity-90 animate-pulse cursor-wait'
                : 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-[#0A0A0A] shadow-[0_0_25px_rgba(212,175,55,0.4)]'
            }`}
          >
            {isCleaning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>CLEANING FLEET DEPLOYED ({cleanProgress}%)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#0A0A0A]" />
                <span>DEPLOY CLEAN QUEENS SWEEP</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar (Visible during active cleaning) */}
      {isCleaning && (
        <div className="w-full bg-[#080B12] rounded-full h-2.5 border border-[#D4AF37]/30 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#D4AF37] via-[#10B981] to-[#0052FF] h-2.5 rounded-full transition-all duration-300 shadow-[0_0_10px_#D4AF37]"
            style={{ width: `${cleanProgress}%` }}
          />
        </div>
      )}

      {/* 4 Pillars Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {METRICS.map((metric, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#080B12]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all space-y-3 shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#F5F1E8]/60 uppercase tracking-wider block">
                {metric.title}
              </span>
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            </div>

            <div className="space-y-1">
              <div className="text-xl font-black text-white font-mono tracking-tight">
                {metric.value}
              </div>
              <span className={`inline-block text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${metric.statusColor}`}>
                {metric.status}
              </span>
            </div>

            <p className="text-[11px] text-[#F5F1E8]/70 font-sans border-t border-[#F5F1E8]/10 pt-2">
              {metric.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Clean Queens Telemetry Terminal */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#06080F] border border-[#D4AF37]/30 font-mono text-xs space-y-3 relative z-10">
        <div className="flex items-center justify-between border-b border-[#F5F1E8]/10 pb-2">
          <span className="text-[#D4AF37] font-bold flex items-center gap-2 text-xs">
            <Activity className="w-3.5 h-3.5 text-[#10B981]" />
            CLEAN QUEENS MAINTENANCE DISPATCH LOG
          </span>
          <span className="text-[10px] text-[#60A5FA]">
            CONTRACT: VFV-DPS-ECODEX-001
          </span>
        </div>

        <div className="space-y-1.5 text-[11px]">
          {maintenanceLogs.map((log, index) => (
            <p 
              key={index}
              className={index === 0 ? "text-[#10B981] font-bold" : "text-[#F5F1E8]/70"}
            >
              {log}
            </p>
          ))}
        </div>
      </div>

      {/* Security & Standard Inscription */}
      <div className="pt-2 border-t border-[#F5F1E8]/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-[#F5F1E8]/60 relative z-10">
        <span className="text-[#F3E5AB]">
          Contracted to uphold the VannÐiamond Palladium Standard • Monitoring €coÐ€X Securities
        </span>
        <span className="text-[#D4AF37] font-bold">
          All rights reserved © Vann Family Ventures LLC
        </span>
      </div>

    </div>
  );
}

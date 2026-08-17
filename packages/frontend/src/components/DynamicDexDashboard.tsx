"use client";

import React, { useMemo } from 'react';
import { 
  Sparkles, 
  Shield, 
  Flame, 
  Clock, 
  Cpu, 
  Wifi, 
  Radio, 
  Layers, 
  Award, 
  Zap,
  CheckCircle2
} from 'lucide-react';

export interface SurvivorRarityStats {
  tier: 'MYTHIC_COVENANT' | 'LEGENDARY_FOUNDER' | 'ANCIENT_STEWARD' | 'VANGUARD_PILGRIM';
  tierLabel: string;
  tierColor: string;
  tierBg: string;
  tierBorder: string;
  rarityScore: number;
  genesisBonus: string;
  kleinKeyStatus: string;
  traits: {
    originCycle: string;
    beulahFrequency: string;
    wifiKernelStatus: string;
    l5AiSyncScore: string;
    powerModifier: string;
    dexUiResonance: string;
    kleinKeyFree: string;
  };
}

/**
 * Calculates deterministic dynamic Survivor NFT traits & rarity tiers
 * based on the wallet address and mint timestamp.
 */
export function calculateSurvivorRarity(address?: string, mintTimestamp?: number): SurvivorRarityStats {
  if (!address) {
    return {
      tier: 'VANGUARD_PILGRIM',
      tierLabel: 'PILGRIM SURVIVOR',
      tierColor: '#60A5FA',
      tierBg: 'bg-[#0052FF]/10',
      tierBorder: 'border-[#0052FF]/40',
      rarityScore: 420,
      genesisBonus: '+5% Standard Protocol Yield',
      kleinKeyStatus: 'Klein Key ³Free: Unlocked for All Pilgrims',
      traits: {
        originCycle: 'Cycle 0 Standby',
        beulahFrequency: '432 Hz Harmonics',
        wifiKernelStatus: 'Module Ready',
        l5AiSyncScore: '88.5%',
        powerModifier: '1.05x Base Multiplier',
        dexUiResonance: 'Standard Light Stream',
        kleinKeyFree: 'YES Feature Active (³Free)',
      },
    };
  }

  // Calculate deterministic pseudo-random seed from address characters
  const cleanAddr = address.toLowerCase().replace('0x', '');
  let charSum = 0;
  for (let i = 0; i < cleanAddr.length; i++) {
    charSum += cleanAddr.charCodeAt(i);
  }

  const timeVal = mintTimestamp || 1723850000;
  const hashSeed = (charSum * 31 + (timeVal % 10000)) % 1000;

  if (hashSeed >= 750) {
    return {
      tier: 'MYTHIC_COVENANT',
      tierLabel: 'MYTHIC COVENANT (TOP 1%)',
      tierColor: '#D4AF37',
      tierBg: 'bg-[#D4AF37]/20',
      tierBorder: 'border-[#D4AF37]',
      rarityScore: 994,
      genesisBonus: '+45% Sudden Death Multiplier & Ɓeulah L5 Priority',
      kleinKeyStatus: 'Klein Key ³Free: Sovereign Master Key',
      traits: {
        originCycle: 'Cycle 0 Genesis Root',
        beulahFrequency: '528 Hz Miracles Wave',
        wifiKernelStatus: 'Solar Drone Direct Link (Kernel v5.4)',
        l5AiSyncScore: '99.8% Perfect Harmony',
        powerModifier: '2.50x Divine Dominion',
        dexUiResonance: 'ÐynamicÐ€X Gold Aura Flow',
        kleinKeyFree: 'YES Feature: Klein Key ³Free (Root Sovereign)',
      },
    };
  } else if (hashSeed >= 450) {
    return {
      tier: 'LEGENDARY_FOUNDER',
      tierLabel: 'LEGENDARY FOUNDER',
      tierColor: '#A855F7',
      tierBg: 'bg-[#A855F7]/20',
      tierBorder: 'border-[#A855F7]',
      rarityScore: 840,
      genesisBonus: '+30% Vault Credit Accrual',
      kleinKeyStatus: 'Klein Key ³Free: Founder Pass Level',
      traits: {
        originCycle: 'Cycle 0 Pioneer',
        beulahFrequency: '440 Hz Sovereign Carrier',
        wifiKernelStatus: 'Drone Mesh Activated',
        l5AiSyncScore: '96.2% High Fidelity',
        powerModifier: '1.80x Faith Shield',
        dexUiResonance: 'ÐynamicÐ€X Purple Ray Pulse',
        kleinKeyFree: 'YES Feature: Klein Key ³Free (Founder Verified)',
      },
    };
  } else if (hashSeed >= 200) {
    return {
      tier: 'ANCIENT_STEWARD',
      tierLabel: 'ANCIENT STEWARD',
      tierColor: '#10B981',
      tierBg: 'bg-[#10B981]/20',
      tierBorder: 'border-[#10B981]',
      rarityScore: 680,
      genesisBonus: '+20% Kingdom Yield Boost',
      kleinKeyStatus: 'Klein Key ³Free: Steward Ward Level',
      traits: {
        originCycle: 'Cycle 0 Vanguard',
        beulahFrequency: '396 Hz Cleansing Tone',
        wifiKernelStatus: 'OS API Connected',
        l5AiSyncScore: '92.4% Optimal Link',
        powerModifier: '1.40x Stewardship Ward',
        dexUiResonance: 'ÐynamicÐ€X Emerald Stream',
        kleinKeyFree: 'YES Feature: Klein Key ³Free (Steward Link)',
      },
    };
  } else {
    return {
      tier: 'VANGUARD_PILGRIM',
      tierLabel: 'VANGUARD PILGRIM',
      tierColor: '#60A5FA',
      tierBg: 'bg-[#0052FF]/20',
      tierBorder: 'border-[#0052FF]',
      rarityScore: 520,
      genesisBonus: '+10% Speedrun Accrual',
      kleinKeyStatus: 'Klein Key ³Free: Pilgrim Universal Key',
      traits: {
        originCycle: 'Cycle 0 Initiate',
        beulahFrequency: '432 Hz Peace Carrier',
        wifiKernelStatus: 'Standard WiFi Node',
        l5AiSyncScore: '89.1% Active Link',
        powerModifier: '1.15x Pilgrim Fortitude',
        dexUiResonance: 'ÐynamicÐ€X Base Cobalt Flow',
        kleinKeyFree: 'YES Feature: Klein Key ³Free (Universal)',
      },
    };
  }
}

interface DynamicDexDashboardProps {
  address?: string;
  selectedClass: string;
}

export default function DynamicDexDashboard({ address, selectedClass }: DynamicDexDashboardProps) {
  const rarity = useMemo(() => calculateSurvivorRarity(address), [address]);

  return (
    <div className="rounded-2xl bg-[#090D16] border-2 border-[#D4AF37]/40 p-5 sm:p-6 space-y-6 relative overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.15)]">
      
      {/* Background dynamic ambient flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#0052FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge & Engine Branding */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5F1E8]/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-black text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30">
              ÐynamicÐ€X UI
            </span>
            <span className="text-[10px] font-mono text-[#60A5FA] uppercase tracking-wider bg-[#0052FF]/15 px-2 py-0.5 rounded border border-[#0052FF]/30 flex items-center gap-1">
              <Wifi className="w-3 h-3 text-[#60A5FA]" />
              Ɓeulah L5 api~wifi ai
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-white uppercase tracking-tight mt-1.5 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#D4AF37]" />
            <span>SURVIVOR NFT ON-CHAIN TRAITS & RARITY ENGINE</span>
          </h4>
        </div>

        {/* Dynamic Rarity Tier Pill */}
        <div className={`px-3 py-1.5 rounded-xl ${rarity.tierBg} border ${rarity.tierBorder} flex items-center gap-2 shrink-0`}>
          <Sparkles className="w-4 h-4" style={{ color: rarity.tierColor }} />
          <span className="text-xs font-mono font-black uppercase tracking-wider" style={{ color: rarity.tierColor }}>
            {rarity.tierLabel}
          </span>
          <span className="text-[10px] font-mono font-bold bg-black/40 px-1.5 py-0.5 rounded text-white">
            {rarity.rarityScore} PTS
          </span>
        </div>
      </div>

      {/* Trait Matrix Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        
        <div className="p-3 rounded-xl bg-[#080B12] border border-[#F5F1E8]/10 space-y-1">
          <span className="text-[10px] font-mono text-[#F5F1E8]/50 uppercase tracking-wider block">
            ORIGIN CYCLE
          </span>
          <p className="font-mono font-bold text-[#F5F1E8] truncate">
            {rarity.traits.originCycle}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#080B12] border border-[#F5F1E8]/10 space-y-1">
          <span className="text-[10px] font-mono text-[#F5F1E8]/50 uppercase tracking-wider block">
            ƁEULAH HARMONIC FREQ
          </span>
          <p className="font-mono font-bold text-[#D4AF37] truncate">
            {rarity.traits.beulahFrequency}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#080B12] border border-[#F5F1E8]/10 space-y-1">
          <span className="text-[10px] font-mono text-[#F5F1E8]/50 uppercase tracking-wider block">
            WIFI DRONE KERNEL
          </span>
          <p className="font-mono font-bold text-[#60A5FA] truncate">
            {rarity.traits.wifiKernelStatus}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#080B12] border border-[#F5F1E8]/10 space-y-1">
          <span className="text-[10px] font-mono text-[#F5F1E8]/50 uppercase tracking-wider block">
            L5 AI SYNC SCORE
          </span>
          <p className="font-mono font-bold text-[#10B981] truncate">
            {rarity.traits.l5AiSyncScore}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#080B12] border border-[#F5F1E8]/10 space-y-1">
          <span className="text-[10px] font-mono text-[#F5F1E8]/50 uppercase tracking-wider block">
            POWER MODIFIER
          </span>
          <p className="font-mono font-bold text-[#F3E5AB] truncate">
            {rarity.traits.powerModifier}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#080B12] border border-[#F5F1E8]/10 space-y-1">
          <span className="text-[10px] font-mono text-[#F5F1E8]/50 uppercase tracking-wider block">
            ÐDYNAMICÐ€X STREAM
          </span>
          <p className="font-mono font-bold text-[#A855F7] truncate">
            {rarity.traits.dexUiResonance}
          </p>
        </div>

        {/* YES Feature: Klein Key ³Free */}
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#10B981]/15 to-[#080B12] border border-[#10B981]/50 space-y-1 col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#10B981] uppercase tracking-wider font-black flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#10B981]" /> YES FEATURE • KLEIN KEY ³FREE
            </span>
            <span className="text-[9px] font-mono bg-[#10B981] text-[#0A0A0A] px-1.5 py-0.2 rounded font-black">
              FREE
            </span>
          </div>
          <p className="font-mono font-bold text-white text-xs truncate">
            {rarity.kleinKeyStatus}
          </p>
        </div>

      </div>

      {/* Genesis Perk Banner */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37]/15 via-[#0052FF]/15 to-[#D4AF37]/15 border border-[#D4AF37]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-white">
          <Zap className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span className="font-sans">
            <strong className="text-[#D4AF37] font-mono">GENESIS TRAIT PERK:</strong> {rarity.genesisBonus} • <strong className="text-[#10B981] font-mono">{rarity.traits.kleinKeyFree}</strong>
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/20 px-2 py-0.5 rounded font-bold uppercase shrink-0">
          ACTIVE ON BASE
        </span>
      </div>

      {/* Trademark & Council Footer */}
      <div className="pt-2 border-t border-[#F5F1E8]/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-[#F5F1E8]/60">
        <span>Powered by Ɓeulah L5 api~wifi ai • VannÐiamond Palladium Standard • €coÐ€X Securities</span>
        <span className="text-[#D4AF37]">All rights reserved © Vann Family Ventures LLC</span>
      </div>

    </div>
  );
}

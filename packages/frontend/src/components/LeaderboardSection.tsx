"use client";

import React, { useState } from 'react';
import { Trophy, Flame, Shield, Sparkles, Award, Star, ExternalLink, Gift } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  handle: string;
  address: string;
  survivorClass: string;
  score: number;
  covenantCycle: string;
  rewardTier: string;
  rewardIcon: string;
  rewardDescription: string;
}

const TOP_TEN_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    handle: "KingdomSentinel_01",
    address: "0x380d...6f0c",
    survivorClass: "Sentinel",
    score: 9450,
    covenantCycle: "Cycle 0 Genesis",
    rewardTier: "Tier 1: High Rollah Crown",
    rewardIcon: "👑",
    rewardDescription: "Cycle 0 Dominion Trophy + 500 ABBA Vault Credits + White-Glove Lore Co-Creation",
  },
  {
    rank: 2,
    handle: "lilbirdie90.base.eth",
    address: "0x7422...0Cad",
    survivorClass: "Steward",
    score: 8920,
    covenantCycle: "Cycle 0 Genesis",
    rewardTier: "Tier 1: High Rollah Crown",
    rewardIcon: "✨",
    rewardDescription: "Heritage Steward Certificate + 350 ABBA Vault Credits + Permanent Temple Inscription",
  },
  {
    rank: 3,
    handle: "BassPackage_Jason",
    address: "0x951e...df06",
    survivorClass: "Psalmist",
    score: 8310,
    covenantCycle: "Cycle 0 Genesis",
    rewardTier: "Tier 1: High Rollah Crown",
    rewardIcon: "🎵",
    rewardDescription: "Blessed With Bass Relic + 250 ABBA Vault Credits + Exclusive Audio Launchpad Access",
  },
  {
    rank: 4,
    handle: "DexterV_Builder",
    address: "0x8f3C...d460",
    survivorClass: "Warrior",
    score: 7850,
    covenantCycle: "Cycle 0 Genesis",
    rewardTier: "Tier 2: Master Steward",
    rewardIcon: "🛡️",
    rewardDescription: "Master Covenant Seal + 150 Vault Credits + Priority Alpha Cycle 1 Access",
  },
  {
    rank: 5,
    handle: "FaithfulPilgrim_Base",
    address: "0x12a9...88e1",
    survivorClass: "Sentinel",
    score: 7200,
    covenantCycle: "Cycle 0 Genesis",
    rewardTier: "Tier 2: Master Steward",
    rewardIcon: "⚔️",
    rewardDescription: "Sanctuary Guardian Relic + 100 Vault Credits + Digital RWA Certificate",
  },
  {
    rank: 6,
    handle: "ZionWatcher_77",
    address: "0x994c...14ef",
    survivorClass: "Psalmist",
    score: 6640,
    covenantCycle: "Cycle 0 Genesis",
    rewardTier: "Tier 2: Master Steward",
    rewardIcon: "📜",
    rewardDescription: "Prophetic Parchment Pass + 75 Vault Credits + Lore Archive Badge",
  },
  {
    rank: 7,
    handle: "LivingStone_07",
    address: "0x531b...a901",
    survivorClass: "Steward",
    score: 6180,
    covenantCycle: "Cycle 0 Genesis",
    rewardTier: "Tier 3: Vanguard Survivor",
    rewardIcon: "💎",
    rewardDescription: "Vanguard Badge + 50 Vault Credits + Cycle 1 Priority Whitelist",
  },
  {
    rank: 8,
    handle: "CornerstoneWarrior",
    address: "0x448d...b02c",
    survivorClass: "Warrior",
    score: 5750,
    covenantCycle: "Cycle 0 Genesis",
    rewardTier: "Tier 3: Vanguard Survivor",
    rewardIcon: "🔥",
    rewardDescription: "Warrior’s Crest + 40 Vault Credits + In-App Custom Badge Frame",
  },
  {
    rank: 9,
    handle: "GraceOverflow_23",
    address: "0x77ef...d19a",
    survivorClass: "Sentinel",
    score: 5310,
    covenantCycle: "Cycle 0 Genesis",
    rewardTier: "Tier 3: Vanguard Survivor",
    rewardIcon: "🕊️",
    rewardDescription: "Peacebringer Insignia + 30 Vault Credits + Fellowship Honor Status",
  },
  {
    rank: 10,
    handle: "AbbaSeeker_Alpha",
    address: "0x203a...cc84",
    survivorClass: "Psalmist",
    score: 4980,
    covenantCycle: "Cycle 0 Genesis",
    rewardTier: "Tier 3: Vanguard Survivor",
    rewardIcon: "🌟",
    rewardDescription: "Genesis Pioneer Certificate + 25 Vault Credits + Community Recognition",
  },
];

export default function LeaderboardSection() {
  const [selectedEntry, setSelectedEntry] = useState<LeaderboardEntry | null>(TOP_TEN_LEADERBOARD[0]);

  return (
    <section id="leaderboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-[#090D16] border-2 border-[#D4AF37]/50 p-6 sm:p-10 lg:p-12 gold-border-glow space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-mono font-bold text-[#F3E5AB] uppercase tracking-widest">
            <Trophy className="w-4 h-4 text-[#D4AF37]" />
            <span>CYCLE 0 • ON-CHAIN LEADERBOARD & REWARDS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F1E8] uppercase tracking-tight">
            TOP 10 SURVIVORS HALL OF HONOR
          </h2>

          <p className="text-sm sm:text-base text-[#F5F1E8]/80 font-sans max-w-3xl mx-auto leading-relaxed">
            Survivors who stand firm through the Cycles and record their faithful stewardship on <strong className="text-[#60A5FA]">Base Mainnet</strong> earn verified rank, digital certificates, and ecosystem rewards.
          </p>
        </div>

        {/* Top 3 Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Rank 2 */}
          <div 
            onClick={() => setSelectedEntry(TOP_TEN_LEADERBOARD[1])}
            className="cursor-pointer rounded-2xl bg-[#080B12] border border-[#F5F1E8]/20 p-6 relative flex flex-col justify-between hover:border-[#D4AF37] transition-all order-2 md:order-1 hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300 bg-slate-400/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                  🥈 RANK #2
                </span>
                <span className="text-xs font-mono text-[#D4AF37]">STEWARD</span>
              </div>
              <h3 className="text-lg font-black text-white truncate">{TOP_TEN_LEADERBOARD[1].handle}</h3>
              <p className="text-xs font-mono text-[#60A5FA]">{TOP_TEN_LEADERBOARD[1].address}</p>
            </div>
            <div className="pt-6 border-t border-[#F5F1E8]/10 mt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#F5F1E8]/60">LEGACY SCORE</span>
                <span className="text-xl font-black text-[#F3E5AB] font-mono">{TOP_TEN_LEADERBOARD[1].score.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-[#10B981] font-mono mt-1 flex items-center gap-1">
                <Gift className="w-3 h-3" /> Heritage Steward Certificate + 350 Credits
              </p>
            </div>
          </div>

          {/* Rank 1 - Champion */}
          <div 
            onClick={() => setSelectedEntry(TOP_TEN_LEADERBOARD[0])}
            className="cursor-pointer rounded-2xl bg-gradient-to-b from-[#1A130A] via-[#0D121F] to-[#080B12] border-2 border-[#D4AF37] p-8 relative flex flex-col justify-between shadow-[0_0_30px_rgba(212,175,55,0.4)] order-1 md:order-2 hover:scale-[1.03] transition-all"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-[#D4AF37] text-[#0A0A0A] text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
              👑 CYCLE 0 CHAMPION
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-[#0A0A0A] bg-[#D4AF37] px-3 py-1 rounded-full flex items-center gap-1">
                  🥇 RANK #1
                </span>
                <span className="text-xs font-mono font-bold text-[#D4AF37]">SENTINEL</span>
              </div>
              <h3 className="text-xl font-black text-[#F5F1E8] truncate">{TOP_TEN_LEADERBOARD[0].handle}</h3>
              <p className="text-xs font-mono text-[#60A5FA]">{TOP_TEN_LEADERBOARD[0].address}</p>
            </div>
            <div className="pt-6 border-t border-[#D4AF37]/30 mt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#F3E5AB]">LEGACY SCORE</span>
                <span className="text-2xl font-black text-[#D4AF37] font-mono">{TOP_TEN_LEADERBOARD[0].score.toLocaleString()}</span>
              </div>
              <p className="text-xs text-[#10B981] font-mono font-bold mt-1 flex items-center gap-1">
                <Gift className="w-3.5 h-3.5" /> Dominion Trophy + 500 Credits + Lore Co-Creation
              </p>
            </div>
          </div>

          {/* Rank 3 */}
          <div 
            onClick={() => setSelectedEntry(TOP_TEN_LEADERBOARD[2])}
            className="cursor-pointer rounded-2xl bg-[#080B12] border border-[#F5F1E8]/20 p-6 relative flex flex-col justify-between hover:border-[#D4AF37] transition-all order-3 md:order-3 hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-700/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                  🥉 RANK #3
                </span>
                <span className="text-xs font-mono text-[#D4AF37]">PSALMIST</span>
              </div>
              <h3 className="text-lg font-black text-white truncate">{TOP_TEN_LEADERBOARD[2].handle}</h3>
              <p className="text-xs font-mono text-[#60A5FA]">{TOP_TEN_LEADERBOARD[2].address}</p>
            </div>
            <div className="pt-6 border-t border-[#F5F1E8]/10 mt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#F5F1E8]/60">LEGACY SCORE</span>
                <span className="text-xl font-black text-[#F3E5AB] font-mono">{TOP_TEN_LEADERBOARD[2].score.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-[#10B981] font-mono mt-1 flex items-center gap-1">
                <Gift className="w-3 h-3" /> Blessed With Bass Relic + 250 Credits
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Table (Ranks 4 to 10) */}
        <div className="overflow-x-auto rounded-2xl border border-[#D4AF37]/30 bg-[#080B12]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#090D16] border-b border-[#D4AF37]/20 text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">RANK</th>
                <th className="py-3 px-4">SURVIVOR</th>
                <th className="py-3 px-4">CLASS</th>
                <th className="py-3 px-4">SCORE</th>
                <th className="py-3 px-4">REWARD PACKAGE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F1E8]/10 font-sans">
              {TOP_TEN_LEADERBOARD.map((item) => (
                <tr 
                  key={item.rank}
                  onClick={() => setSelectedEntry(item)}
                  className={`hover:bg-[#D4AF37]/5 transition-colors cursor-pointer ${
                    selectedEntry?.rank === item.rank ? 'bg-[#D4AF37]/10' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-mono font-bold">
                    {item.rank === 1 ? '🥇 #1' : item.rank === 2 ? '🥈 #2' : item.rank === 3 ? '🥉 #3' : `#${item.rank}`}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white text-xs">{item.handle}</div>
                    <div className="font-mono text-[10px] text-[#60A5FA]">{item.address}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-[#D4AF37] uppercase">
                    {item.survivorClass}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#F3E5AB]">
                    {item.score.toLocaleString()} PTS
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#10B981] font-mono">
                    {item.rewardDescription}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Reward Detail Callout */}
        {selectedEntry && (
          <div className="p-6 rounded-2xl bg-[#080B12] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedEntry.rewardIcon}</span>
                <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase">
                  RANK #{selectedEntry.rank} ALLOCATION • {selectedEntry.rewardTier}
                </span>
              </div>
              <p className="text-sm font-bold text-white">
                {selectedEntry.handle} ({selectedEntry.address})
              </p>
              <p className="text-xs text-[#F5F1E8]/70 font-sans">
                {selectedEntry.rewardDescription}
              </p>
            </div>

            <a
              href="#play-alpha"
              className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shadow-md"
            >
              <Trophy className="w-4 h-4" />
              Claim Your Spot in Alpha
            </a>
          </div>
        )}

      </div>
    </section>
  );
}

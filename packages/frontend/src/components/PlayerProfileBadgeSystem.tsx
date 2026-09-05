"use client";

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { 
  Trophy, 
  Shield, 
  Award, 
  Sparkles, 
  Flame, 
  BookOpen, 
  Heart, 
  Crown, 
  Star, 
  CheckCircle2, 
  Lock, 
  Zap, 
  ChevronRight, 
  Info, 
  User, 
  ExternalLink,
  RefreshCw,
  X,
  Target,
  Medal,
  ScrollText
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

export interface BadgeItem {
  id: string;
  name: string;
  category: 'Stories' | 'Leaderboard' | 'Covenant';
  tier: 'Genesis' | 'Mythic' | 'Master' | 'Vanguard' | 'Pilgrim';
  tierColor: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bgGradient: string;
  description: string;
  requirement: string;
  xpValue: number;
  vaultCreditsReward: number;
  unlocked: boolean;
  progress: number; // 0 to 100
  progressText: string;
  unlockedAt?: string;
}

interface PlayerProfileBadgeSystemProps {
  initialOpenModal?: boolean;
  onCloseModal?: () => void;
}

export default function PlayerProfileBadgeSystem({
  initialOpenModal = false,
  onCloseModal
}: PlayerProfileBadgeSystemProps) {
  const { address, isConnected } = useAccount();
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'All' | 'Stories' | 'Leaderboard' | 'Covenant'>('All');
  const [honoredCount, setHonoredCount] = useState<number>(0);
  const [inscribedCount, setInscribedCount] = useState<number>(0);
  const [hasMinted, setHasMinted] = useState<boolean>(false);
  const [simulatedScore, setSimulatedScore] = useState<number>(7850);
  const [showCelebration, setShowCelebration] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(initialOpenModal);

  // Sync state from localStorage
  const refreshStats = () => {
    if (typeof window !== 'undefined') {
      try {
        const storedHonors = JSON.parse(localStorage.getItem('omega_honored_stories') || '{}');
        const countH = Object.values(storedHonors).filter(Boolean).length;
        setHonoredCount(countH);

        const storedStories = JSON.parse(localStorage.getItem('omega_survivor_chronicles') || '[]');
        setInscribedCount(storedStories.length);

        const isMint = localStorage.getItem('omega_minted_survivor') === 'true';
        setHasMinted(isMint);

        const score = parseInt(localStorage.getItem('omega_player_score') || '7850', 10);
        setSimulatedScore(score);
      } catch (err) {
        console.error('Failed to sync profile badge state:', err);
      }
    }
  };

  useEffect(() => {
    refreshStats();
    const interval = setInterval(refreshStats, 3000);
    return () => clearInterval(interval);
  }, []);

  // Compute Badges
  const badges: BadgeItem[] = [
    // 1. STORIES BADGES
    {
      id: 'badge-scribe',
      name: 'Sacred Chronicler',
      category: 'Stories',
      tier: 'Vanguard',
      tierColor: '#60A5FA',
      icon: ScrollText,
      accentColor: '#3B82F6',
      bgGradient: 'from-[#1E3A8A]/30 to-[#0F172A]',
      description: 'Awarded to pilgrims who inscribe a personal battle testimony into the community chronicles of ÒMEGA.',
      requirement: 'Inscribe at least 1 Survivor Story.',
      xpValue: 250,
      vaultCreditsReward: 50,
      unlocked: inscribedCount > 0,
      progress: Math.min(100, (inscribedCount / 1) * 100),
      progressText: `${inscribedCount}/1 Chronicles Inscribed`,
      unlockedAt: inscribedCount > 0 ? 'Cycle 0 Genesis' : undefined
    },
    {
      id: 'badge-intercessor',
      name: 'Intercessor of Grace',
      category: 'Stories',
      tier: 'Master',
      tierColor: '#EC4899',
      icon: Heart,
      accentColor: '#F43F5E',
      bgGradient: 'from-[#831843]/30 to-[#0F172A]',
      description: 'Demonstrates deep community fellowship by actively honoring the survivor stories and trials of fellow pilgrims.',
      requirement: 'Honor at least 2 survivor stories with an Amen / Honor seal.',
      xpValue: 300,
      vaultCreditsReward: 75,
      unlocked: honoredCount >= 2,
      progress: Math.min(100, (honoredCount / 2) * 100),
      progressText: `${honoredCount}/2 Chronicles Honored`,
      unlockedAt: honoredCount >= 2 ? 'Cycle 0 Genesis' : undefined
    },
    {
      id: 'badge-archivist',
      name: 'Wisdom Archivist',
      category: 'Stories',
      tier: 'Pilgrim',
      tierColor: '#A78BFA',
      icon: BookOpen,
      accentColor: '#8B5CF6',
      bgGradient: 'from-[#4C1D95]/30 to-[#0F172A]',
      description: 'Studies battlefield strategies, survival lessons, and archetype mechanics across the 4 survivor classes.',
      requirement: 'Read & engage with stories across Sentinel, Warrior, Steward & Psalmist.',
      xpValue: 150,
      vaultCreditsReward: 30,
      unlocked: true, // Always unlocked for active participants
      progress: 100,
      progressText: '4/4 Archetypes Studied',
      unlockedAt: 'Genesis Registration'
    },

    // 2. LEADERBOARD BADGES
    {
      id: 'badge-dominion',
      name: 'Dominion High Rollah',
      category: 'Leaderboard',
      tier: 'Mythic',
      tierColor: '#F59E0B',
      icon: Crown,
      accentColor: '#D4AF37',
      bgGradient: 'from-[#78350F]/35 to-[#0F172A]',
      description: 'Secures an elite placement on the Cycle 0 Genesis Top 10 Leaderboard, commanding highest survival dominion.',
      requirement: 'Achieve a score >= 7,500 on the Base Mainnet Leaderboard.',
      xpValue: 1000,
      vaultCreditsReward: 250,
      unlocked: simulatedScore >= 7500,
      progress: Math.min(100, (simulatedScore / 7500) * 100),
      progressText: `${simulatedScore.toLocaleString()} / 7,500 Pts`,
      unlockedAt: simulatedScore >= 7500 ? 'Rank #4 Verified' : undefined
    },
    {
      id: 'badge-sudden-death',
      name: 'Sudden Death Conqueror',
      category: 'Leaderboard',
      tier: 'Master',
      tierColor: '#EF4444',
      icon: Flame,
      accentColor: '#DC2626',
      bgGradient: 'from-[#7F1D1D]/35 to-[#0F172A]',
      description: 'Survives the razor-thin margin of sudden death mode, outlasting the ticking clock and high-volatility trial.',
      requirement: 'Survive at least 1 Sudden Death round without timing out.',
      xpValue: 400,
      vaultCreditsReward: 100,
      unlocked: true, // Qualified by default for trial players
      progress: 100,
      progressText: '1/1 Rounds Survived',
      unlockedAt: 'Verified by POA Heartbeat'
    },
    {
      id: 'badge-vault-champion',
      name: 'Vault Credit Vanguard',
      category: 'Leaderboard',
      tier: 'Vanguard',
      tierColor: '#10B981',
      icon: Trophy,
      accentColor: '#059669',
      bgGradient: 'from-[#064E3B]/35 to-[#0F172A]',
      description: 'Successfully qualifies for Tier 2 Master Steward rewards and seasonal ABBA Vault Credit allocations.',
      requirement: 'Qualify for any Season 0 Leaderboard Reward Tier.',
      xpValue: 350,
      vaultCreditsReward: 80,
      unlocked: simulatedScore >= 5000,
      progress: Math.min(100, (simulatedScore / 5000) * 100),
      progressText: 'Tier 2 Reward Qualified',
      unlockedAt: 'Reward Tier 2 Active'
    },

    // 3. COVENANT / ON-CHAIN BADGES
    {
      id: 'badge-sealed-nft',
      name: 'Sealed Pilgrim on Base',
      category: 'Covenant',
      tier: 'Genesis',
      tierColor: '#FFD700',
      icon: Shield,
      accentColor: '#D4AF37',
      bgGradient: 'from-[#713F12]/40 to-[#0F172A]',
      description: 'Minted and inscribed the non-custodial Survivor Identity smart contract token on Base Mainnet (Chain ID 8453).',
      requirement: 'Mint Survivor NFT via Base contract.',
      xpValue: 500,
      vaultCreditsReward: 150,
      unlocked: hasMinted,
      progress: hasMinted ? 100 : 0,
      progressText: hasMinted ? 'Sealed on Base' : 'Unminted (0.0001 ETH)',
      unlockedAt: hasMinted ? 'Base Contract 0x8f3C' : undefined
    },
    {
      id: 'badge-covenant-tithe',
      name: '10% Tithe Steward',
      category: 'Covenant',
      tier: 'Genesis',
      tierColor: '#38BDF8',
      icon: Star,
      accentColor: '#0284C7',
      bgGradient: 'from-[#0C4A6E]/40 to-[#0F172A]',
      description: 'Dedicated to upholding the Abba Divine Vision covenant where 10% of game royalties honor the Kingdom and feed the needy.',
      requirement: 'Accept the ÒMEGA Spiritual Covenant & play in good faith.',
      xpValue: 200,
      vaultCreditsReward: 40,
      unlocked: true,
      progress: 100,
      progressText: 'Covenant Sealed',
      unlockedAt: 'Genesis Covenant'
    }
  ];

  // Filtered badges
  const filteredBadges = badges.filter((b) => {
    if (activeCategoryFilter === 'All') return true;
    return b.category === activeCategoryFilter;
  });

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const totalXp = badges.reduce((acc, b) => b.unlocked ? acc + b.xpValue : acc, 0);
  const totalCredits = badges.reduce((acc, b) => b.unlocked ? acc + b.vaultCreditsReward : acc, 0);
  const playerLevel = Math.max(1, Math.floor(totalXp / 300) + 1);
  const nextLevelXp = playerLevel * 300;
  const currentLevelProgress = Math.floor(((totalXp % 300) / 300) * 100);

  // Simulation handlers for instant interactive proof
  const handleSimulateInscribe = () => {
    triggerHaptic('success');
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('omega_survivor_chronicles') || '[]');
      stored.push({ id: Date.now().toString(), title: 'Battlefield Breakthrough' });
      localStorage.setItem('omega_survivor_chronicles', JSON.stringify(stored));
      refreshStats();
      setShowCelebration('Sacred Chronicler Badge Unlocked!');
      setTimeout(() => setShowCelebration(null), 3000);
    }
  };

  const handleSimulateHonor = () => {
    triggerHaptic('success');
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('omega_honored_stories') || '{}');
      stored['sim-1'] = true;
      stored['sim-2'] = true;
      localStorage.setItem('omega_honored_stories', JSON.stringify(stored));
      refreshStats();
      setShowCelebration('Intercessor of Grace Badge Unlocked!');
      setTimeout(() => setShowCelebration(null), 3000);
    }
  };

  const handleSimulateScore = () => {
    triggerHaptic('heavy');
    if (typeof window !== 'undefined') {
      localStorage.setItem('omega_player_score', '9500');
      setSimulatedScore(9500);
      refreshStats();
      setShowCelebration('Dominion High Rollah Badge Unlocked!');
      setTimeout(() => setShowCelebration(null), 3000);
    }
  };

  return (
    <section id="player-profile-badges" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DYNAMIC REPUTATION ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
            PLAYER PROFILE &amp; BADGE SYSTEM
          </h2>
          <p className="text-xs sm:text-sm text-[#F5F1E8]/70 font-sans max-w-2xl mt-1">
            Visual badges unlock in real time through active participation in <strong className="text-white">Survivor Stories</strong> (chronicling &amp; honoring) and <strong className="text-white">Leaderboard Mastery</strong> (rankings, sudden death survival &amp; vault credits).
          </p>
        </div>

        {/* Level & XP Quick Counter */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0A0E1A] border border-[#D4AF37]/30 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B68B3E] flex flex-col items-center justify-center text-[#0A0A0A] font-mono font-black shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <span className="text-[9px] uppercase tracking-tighter leading-none">LVL</span>
            <span className="text-xl leading-none font-extrabold">{playerLevel}</span>
          </div>
          <div className="space-y-1 text-left font-mono">
            <div className="flex items-center justify-between text-xs gap-4">
              <span className="text-white font-bold uppercase">
                {unlockedCount >= 6 ? 'MASTER PILGRIM' : 'VANGUARD STEWARD'}
              </span>
              <span className="text-[#FFD700] text-[11px] font-bold">
                {totalXp} XP
              </span>
            </div>
            <div className="w-36 h-2 rounded-full bg-black/60 border border-white/10 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#10B981] transition-all duration-500"
                style={{ width: `${currentLevelProgress}%` }}
              />
            </div>
            <div className="text-[9px] text-[#F5F1E8]/50 flex justify-between">
              <span>{unlockedCount}/{badges.length} Badges</span>
              <span>+{totalCredits} Credits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Unlocking Celebration Toast */}
      {showCelebration && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#D4AF37]/30 via-[#10B981]/20 to-[#0A0E1A] border-2 border-[#D4AF37] text-white flex items-center justify-between shadow-[0_0_30px_rgba(212,175,55,0.5)] animate-in fade-in slide-in-from-top-3">
          <div className="flex items-center gap-3 font-mono">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-black flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-[#D4AF37] uppercase font-bold block">NEW ACHIEVEMENT UNLOCKED</span>
              <span className="text-sm font-black text-white">{showCelebration}</span>
            </div>
          </div>
          <span className="text-xs font-mono text-[#10B981] font-bold px-3 py-1 rounded-lg bg-[#10B981]/20 border border-[#10B981]/40">
            XP CLAIMED
          </span>
        </div>
      )}

      {/* Main Grid: Left Profile Card, Right Badges Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Player Profile Overview Card (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl bg-gradient-to-b from-[#0D1322] to-[#070A12] border border-[#D4AF37]/40 p-6 space-y-6 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            
            {/* Avatar & Identifiers */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#996515] p-0.5 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  <div className="w-full h-full rounded-2xl bg-[#080B12] flex items-center justify-center text-[#FFD700] text-2xl font-black">
                    Ω
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#10B981] border-2 border-[#080B12] flex items-center justify-center text-[9px] text-black font-bold">
                  ✓
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-mono leading-none">
                    {isConnected ? (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Sovereign Pilgrim') : 'DexterV_Builder'}
                  </h3>
                </div>
                <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-[#0052FF]/20 text-[#60A5FA] border border-[#0052FF]/40">
                  BASE MAINNET • 8453
                </span>
                <p className="text-[11px] font-mono text-[#D4AF37] font-bold">
                  Class: {hasMinted ? 'Master Warrior' : 'Vanguard Pilgrim'}
                </p>
              </div>
            </div>

            {/* Profile Statistics in Stories & Leaderboard */}
            <div className="grid grid-cols-2 gap-2.5 font-mono text-xs pt-2">
              <div className="p-3 rounded-xl bg-[#080B12] border border-white/5 space-y-0.5">
                <span className="text-[10px] text-[#F5F1E8]/50 block uppercase">STORIES INSCRIBED</span>
                <span className="text-sm font-bold text-white flex items-center gap-1">
                  <ScrollText className="w-3.5 h-3.5 text-[#60A5FA]" />
                  {inscribedCount}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#080B12] border border-white/5 space-y-0.5">
                <span className="text-[10px] text-[#F5F1E8]/50 block uppercase">STORIES HONORED</span>
                <span className="text-sm font-bold text-[#EC4899] flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-[#EC4899] text-[#EC4899]" />
                  {honoredCount}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#080B12] border border-white/5 space-y-0.5">
                <span className="text-[10px] text-[#F5F1E8]/50 block uppercase">LEADERBOARD RANK</span>
                <span className="text-sm font-bold text-[#D4AF37] flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                  #4 (Verified)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#080B12] border border-white/5 space-y-0.5">
                <span className="text-[10px] text-[#F5F1E8]/50 block uppercase">VAULT CREDITS</span>
                <span className="text-sm font-bold text-[#10B981] flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-[#10B981]" />
                  {150 + totalCredits}
                </span>
              </div>
            </div>

            {/* Live Activity Simulation Triggers */}
            <div className="p-3.5 rounded-2xl bg-[#050811] border border-[#D4AF37]/25 space-y-2">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold block flex items-center gap-1">
                <Zap className="w-3 h-3" /> Quick Unlock Actions (Test Badge Triggers)
              </span>
              <div className="flex flex-col gap-1.5 font-mono text-[11px]">
                <button
                  onClick={handleSimulateInscribe}
                  className="w-full py-1.5 px-3 rounded-lg bg-[#0052FF]/20 hover:bg-[#0052FF]/40 border border-[#0052FF]/50 text-[#60A5FA] text-left transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>1. Inscribe Survivor Story</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
                <button
                  onClick={handleSimulateHonor}
                  className="w-full py-1.5 px-3 rounded-lg bg-[#EC4899]/20 hover:bg-[#EC4899]/40 border border-[#EC4899]/50 text-[#F472B6] text-left transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>2. Honor 2 Survivor Stories</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
                <button
                  onClick={handleSimulateScore}
                  className="w-full py-1.5 px-3 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 border border-[#D4AF37]/50 text-[#FFD700] text-left transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>3. Surpass 7.5k Leaderboard Score</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* In-App Deletion & Reset Button */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('omega_survivor_chronicles');
                  localStorage.removeItem('omega_honored_stories');
                  localStorage.removeItem('omega_player_score');
                  refreshStats();
                }
              }}
              className="w-full py-2 rounded-xl bg-transparent hover:bg-white/5 text-[11px] font-mono text-[#F5F1E8]/50 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              Reset Simulated Badge Progress
            </button>
          </div>
        </div>

        {/* RIGHT: Dynamic Badge Grid (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
            <span className="text-[#F5F1E8]/40 uppercase mr-1 text-[11px] whitespace-nowrap">FILTER BY SECTION:</span>
            {(['All', 'Stories', 'Leaderboard', 'Covenant'] as const).map((cat) => {
              const isSelected = activeCategoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    triggerHaptic('light');
                    setActiveCategoryFilter(cat);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#D4AF37] text-black shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                      : 'bg-[#0A0E1A] text-[#F5F1E8]/70 hover:text-white border border-[#D4AF37]/25'
                  }`}
                >
                  {cat === 'All' ? 'ALL BADGES (8)' : cat}
                </button>
              );
            })}
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredBadges.map((badge) => {
              const IconComp = badge.icon;
              const isLocked = !badge.unlocked;

              return (
                <div
                  key={badge.id}
                  onClick={() => {
                    triggerHaptic('light');
                    setSelectedBadge(badge);
                  }}
                  className={`group relative p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 bg-gradient-to-br ${badge.bgGradient} ${
                    isLocked
                      ? 'border-white/10 opacity-70 hover:opacity-90 hover:border-white/20'
                      : 'border-[#D4AF37]/40 hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]'
                  }`}
                >
                  {/* Badge Header: Icon + Tier Label */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {/* Icon Seal */}
                      <div 
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg ${
                          isLocked 
                            ? 'bg-black/40 text-[#F5F1E8]/30 border border-white/10' 
                            : 'bg-black/60 border border-white/20'
                        }`}
                        style={{ color: isLocked ? undefined : badge.accentColor }}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>

                      <div>
                        <span 
                          className="text-[10px] font-mono font-bold uppercase tracking-wider block"
                          style={{ color: badge.tierColor }}
                        >
                          {badge.tier} • {badge.category}
                        </span>
                        <h4 className="text-sm font-black text-white leading-snug group-hover:text-[#F3E5AB] transition-colors">
                          {badge.name}
                        </h4>
                      </div>
                    </div>

                    {/* Lock / Unlock Status Indicator */}
                    <div className="shrink-0">
                      {badge.unlocked ? (
                        <div className="w-6 h-6 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center text-[#10B981]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-[#F5F1E8]/40">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-[#F5F1E8]/75 font-sans leading-relaxed line-clamp-2">
                    {badge.description}
                  </p>

                  {/* Unlock Progress Bar */}
                  <div className="space-y-1 pt-1 font-mono">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#F5F1E8]/50 uppercase">{badge.progressText}</span>
                      <span className={badge.unlocked ? "text-[#10B981] font-bold" : "text-[#D4AF37]"}>
                        {badge.unlocked ? `+${badge.xpValue} XP` : `${Math.round(badge.progress)}%`}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-black/60 border border-white/10 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          badge.unlocked 
                            ? 'bg-[#10B981]' 
                            : 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B]'
                        }`}
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* DETAILED BADGE INSPECTION MODAL */}
      {selectedBadge && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedBadge(null)}
        >
          <div 
            className="relative w-full max-w-lg rounded-3xl bg-[#090D16] border-2 border-[#D4AF37] p-6 space-y-5 shadow-[0_0_50px_rgba(212,175,55,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div 
                  className="w-14 h-14 rounded-2xl bg-[#04060A] border-2 flex items-center justify-center shadow-lg"
                  style={{ 
                    borderColor: selectedBadge.tierColor,
                    color: selectedBadge.accentColor 
                  }}
                >
                  <selectedBadge.icon className="w-7 h-7" />
                </div>
                <div>
                  <span 
                    className="text-[10px] font-mono font-bold uppercase tracking-wider block"
                    style={{ color: selectedBadge.tierColor }}
                  >
                    {selectedBadge.tier} TIER • {selectedBadge.category} SECTION
                  </span>
                  <h3 className="text-xl font-black text-white">
                    {selectedBadge.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedBadge(null)}
                className="p-1.5 rounded-xl bg-[#080B12] border border-white/10 text-[#F5F1E8]/70 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lore and Details */}
            <div className="p-4 rounded-2xl bg-[#05070D] border border-white/10 space-y-3 text-xs font-sans">
              <p className="text-[#F5F1E8]/85 leading-relaxed">
                {selectedBadge.description}
              </p>
              
              <div className="p-3 rounded-xl bg-black/60 border border-[#D4AF37]/30 space-y-1 font-mono">
                <span className="text-[10px] text-[#D4AF37] uppercase font-bold block">
                  ⚔️ UNLOCK CRITERIA:
                </span>
                <p className="text-white text-xs">
                  {selectedBadge.requirement}
                </p>
              </div>
            </div>

            {/* Rewards Breakdown */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#05070D] border border-white/10">
                <span className="text-[10px] text-[#F5F1E8]/50 block">EXPERIENCE VALUE</span>
                <span className="text-sm font-bold text-[#FFD700]">+{selectedBadge.xpValue} XP</span>
              </div>
              <div className="p-3 rounded-xl bg-[#05070D] border border-white/10">
                <span className="text-[10px] text-[#F5F1E8]/50 block">SEASONAL REWARD</span>
                <span className="text-sm font-bold text-[#10B981]">+{selectedBadge.vaultCreditsReward} Vault Credits</span>
              </div>
            </div>

            {/* Modal Bottom Status */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center gap-2">
                {selectedBadge.unlocked ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[#10B981] font-bold">UNLOCKED ({selectedBadge.unlockedAt || 'ACTIVE'})</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#F5F1E8]/50" />
                    <span className="text-[#F5F1E8]/60">IN PROGRESS: {selectedBadge.progressText}</span>
                  </>
                )}
              </div>

              <button
                onClick={() => setSelectedBadge(null)}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold uppercase transition-all cursor-pointer text-xs"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Swords, 
  Shield, 
  Flame, 
  Sparkles, 
  Heart, 
  CheckCircle2, 
  ExternalLink, 
  PlusCircle, 
  X, 
  Trophy, 
  Send,
  Quote
} from 'lucide-react';

export interface SurvivorStory {
  id: string;
  authorHandle: string;
  authorAddress: string;
  survivorClass: 'Warrior' | 'Steward' | 'Sentinel' | 'Psalmist';
  cycle: string;
  score: number;
  date: string;
  title: string;
  chronicle: string;
  keyLesson: string;
  honors: number;
  txHash?: string;
  isCommunitySubmitted?: boolean;
}

const INITIAL_STORIES: SurvivorStory[] = [
  {
    id: 'story-1',
    authorHandle: 'KingdomSentinel_01',
    authorAddress: '0x380d...6f0c',
    survivorClass: 'Sentinel',
    cycle: 'Cycle 0 • Sudden Death',
    score: 9450,
    date: '2 hours ago',
    title: 'How the 30-Second Shield Saved 14 Pilgrims at Midnight',
    chronicle: 'The referee engine had initiated sudden death. Waves of corruption were surging across the grid, and gas spikes were testing everyone’s resolve. By activating the Sentinel Sanctuary Aura at second 28, our entire squad survived the final block validation intact.',
    keyLesson: 'Never spam actions in sudden death; hold the defensive aura until block confirmation ticks.',
    honors: 142,
    txHash: '0x380d19e8f7a932b1458e0a72c45169a9b7c8df23a67e',
  },
  {
    id: 'story-2',
    authorHandle: 'lilbirdie90.base.eth',
    authorAddress: '0x7422...0Cad',
    survivorClass: 'Steward',
    cycle: 'Cycle 0 • Harvest Gate',
    score: 8920,
    date: 'Yesterday',
    title: 'The Sovereign Tithe That Multiplied Kingdom Vault Yields',
    chronicle: 'Everyone rushed to withdraw early during the market chop, but our covenant squad committed our 10% protocol fee directly into the Abba Treasury. The on-chain referral multiplier kicked in on Base L2, generating a +20% composite yield back to all participants.',
    keyLesson: 'Covenant faithfulness isn’t just spiritual—it creates mathematically sound collective liquidity.',
    honors: 98,
    txHash: '0x74229bca09121e7845fec58a892b1049da897120bc7f',
  },
  {
    id: 'story-3',
    authorHandle: 'BassPackage_Jason',
    authorAddress: '0x951e...df06',
    survivorClass: 'Psalmist',
    cycle: 'Cycle 0 • Resonant Trials',
    score: 8310,
    date: '1 day ago',
    title: 'Singing Praises Through the Gas Wars of Base Mainnet',
    chronicle: 'In the middle of the third trial, the network experienced unprecedented traffic. While other guilds panicked in discord, our Psalmist circle held the harmonic resonance frequencies on the audio launchpad, timing our contract calls with sub-cent transaction precision.',
    keyLesson: 'Worship centers the soul when the protocol volatility reaches fever pitch.',
    honors: 119,
    txHash: '0x951edf06a12b489c095e7c88a104b6d081f9b207a988',
  },
  {
    id: 'story-4',
    authorHandle: 'DexterV_Builder',
    authorAddress: '0x8f3C...d460',
    survivorClass: 'Warrior',
    cycle: 'Cycle 0 • Genesis Alpha',
    score: 7850,
    date: '2 days ago',
    title: 'From 1% Battery to Eternal Inscription on the Leaderboard',
    chronicle: 'My phone was at 1% during an outdoor commute in Denver. The POA heartbeat protection was blinking yellow. I signed the transaction with one thumb right as my battery died. When I plugged in at home, the BaseScan transaction was green and my Warrior had conquered the cycle.',
    keyLesson: 'The zero-timeout heartbeat ensures your session doesn’t die even when your screen does.',
    honors: 185,
    txHash: '0x8f3Cf7ad23Cd3CaDbD9735AFF958023D60c2d46089e1',
  },
  {
    id: 'story-5',
    authorHandle: 'AegisVanguard_Faith',
    authorAddress: '0x12a9...99fe',
    survivorClass: 'Warrior',
    cycle: 'Cycle 0 • Vanguard Test',
    score: 7420,
    date: '3 days ago',
    title: 'Klein Key ³Free: Breaking the Paywall Myth in Web3 Gaming',
    chronicle: 'I was skeptical of Web3 games requiring hundreds of dollars upfront. With ÒMEGA’s Klein Key ³Free trial, I minted my preliminary survivor token for 0 upfront capital, proved my score, and upgraded to full covenant status using pure in-game skill.',
    keyLesson: 'True Kingdom games empower the humble pilgrim before asking for treasure.',
    honors: 76,
    txHash: '0x12a9ef44c102a901ff8933b91a0c8734e901f440ac12',
  },
];

const CLASS_CONFIG = {
  Warrior: {
    icon: Swords,
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.35)',
  },
  Steward: {
    icon: Shield,
    color: '#10B981',
    bg: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.35)',
  },
  Sentinel: {
    icon: Flame,
    color: '#EF4444',
    bg: 'rgba(239, 68, 68, 0.12)',
    border: 'rgba(239, 68, 68, 0.35)',
  },
  Psalmist: {
    icon: Sparkles,
    color: '#8B5CF6',
    bg: 'rgba(139, 92, 246, 0.12)',
    border: 'rgba(139, 92, 246, 0.35)',
  },
};

export default function SurvivorStories() {
  const { address } = useAccount();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('All');
  const [stories, setStories] = useState<SurvivorStory[]>(INITIAL_STORIES);
  const [honoredStories, setHonoredStories] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Form State for New Chronicle Submission
  const [formData, setFormData] = useState({
    authorHandle: '',
    survivorClass: 'Warrior' as 'Warrior' | 'Steward' | 'Sentinel' | 'Psalmist',
    cycle: 'Cycle 0 • Sudden Death',
    score: '100',
    title: '',
    chronicle: '',
    keyLesson: '',
  });

  // Load persisted community stories and honors from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedStories = localStorage.getItem('omega_survivor_chronicles');
        if (savedStories) {
          const parsed = JSON.parse(savedStories);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setStories([...parsed, ...INITIAL_STORIES]);
          }
        }
        const savedHonors = localStorage.getItem('omega_honored_stories');
        if (savedHonors) {
          setHonoredStories(JSON.parse(savedHonors));
        }
      } catch (e) {
        console.error('Error reading saved chronicles:', e);
      }
    }
  }, []);

  // Update scroll navigation arrow state
  const checkScrollBounds = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollBounds();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollBounds);
      window.addEventListener('resize', checkScrollBounds);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollBounds);
      }
      window.removeEventListener('resize', checkScrollBounds);
    };
  }, [stories, selectedClassFilter]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Toggle Honor reaction
  const handleToggleHonor = (id: string) => {
    setHonoredStories((prev) => {
      const isAlreadyHonored = !!prev[id];
      const nextState = { ...prev, [id]: !isAlreadyHonored };

      if (typeof window !== 'undefined') {
        localStorage.setItem('omega_honored_stories', JSON.stringify(nextState));
      }

      // Update story counts
      setStories((prevStories) =>
        prevStories.map((story) => {
          if (story.id === id) {
            return {
              ...story,
              honors: story.honors + (isAlreadyHonored ? -1 : 1),
            };
          }
          return story;
        })
      );

      return nextState;
    });
  };

  // Handle new submission
  const handleSubmitChronicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.chronicle.trim()) return;

    const newStory: SurvivorStory = {
      id: `story-comm-${Date.now()}`,
      authorHandle: formData.authorHandle.trim() || (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'SovereignPilgrim'),
      authorAddress: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '0x79e...b201',
      survivorClass: formData.survivorClass,
      cycle: formData.cycle,
      score: parseInt(formData.score, 10) || 500,
      date: 'Just now',
      title: formData.title.trim(),
      chronicle: formData.chronicle.trim(),
      keyLesson: formData.keyLesson.trim() || 'Faithfulness in the small blocks leads to dominion over many cycles.',
      honors: 1,
      isCommunitySubmitted: true,
      txHash: address ? `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}` : undefined,
    };

    const updated = [newStory, ...stories];
    setStories(updated);

    if (typeof window !== 'undefined') {
      try {
        const communityOnly = updated.filter((s) => s.isCommunitySubmitted);
        localStorage.setItem('omega_survivor_chronicles', JSON.stringify(communityOnly));
      } catch (err) {
        console.error('Failed to persist chronicle:', err);
      }
    }

    setIsModalOpen(false);
    setFormData({
      authorHandle: '',
      survivorClass: 'Warrior',
      cycle: 'Cycle 0 • Sudden Death',
      score: '100',
      title: '',
      chronicle: '',
      keyLesson: '',
    });

    // Reset filter to All and scroll to start to reveal the new story
    setSelectedClassFilter('All');
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const filteredStories = stories.filter((story) => {
    if (selectedClassFilter === 'All') return true;
    return story.survivorClass === selectedClassFilter;
  });

  return (
    <section id="survivor-stories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#0052FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="rounded-3xl bg-[#090D16] border-2 border-[#D4AF37]/40 p-6 sm:p-10 lg:p-12 gold-border-glow space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D4AF37]/20 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-mono font-bold text-[#F3E5AB] uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>TESTIMONIALS OF THE COVENANT • SURVIVOR CHRONICLES</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              SURVIVOR STORIES
            </h2>
            
            <p className="text-xs sm:text-sm text-[#F5F1E8]/70 font-sans mt-2 max-w-2xl">
              Real community chronicles from pilgrims who held the line during sudden-death rounds, timed their contract calls, and preserved their survivor status on <strong className="text-[#60A5FA]">Base Mainnet</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Submit Story Action */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] hover:scale-[1.02] text-[#0A0A0A] font-mono text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-2 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#0A0A0A]" />
              <span>INSCRIBE YOUR CHRONICLE</span>
            </button>

            {/* Navigation Chevrons */}
            <div className="flex items-center gap-1 bg-[#080B12] p-1 rounded-xl border border-[#D4AF37]/30">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="p-2 rounded-lg text-[#F5F1E8]/70 hover:text-white hover:bg-[#D4AF37]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="p-2 rounded-lg text-[#F5F1E8]/70 hover:text-white hover:bg-[#D4AF37]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-mono text-[#F5F1E8]/50 uppercase mr-1">FILTER CLASS:</span>
          {['All', 'Warrior', 'Steward', 'Sentinel', 'Psalmist'].map((cls) => {
            const isSelected = selectedClassFilter === cls;
            return (
              <button
                key={cls}
                onClick={() => setSelectedClassFilter(cls)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                    : 'bg-[#080B12] text-[#F5F1E8]/70 hover:text-white border border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
                }`}
              >
                {cls === 'All' ? 'ALL CHRONICLES' : `${cls.toUpperCase()}S`}
              </button>
            );
          })}
        </div>

        {/* Horizontal Scrolling Story Cards Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-6 pt-2 scrollbar-thin snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarColor: '#D4AF37 #080B12' }}
        >
          {filteredStories.map((story) => {
            const config = CLASS_CONFIG[story.survivorClass] || CLASS_CONFIG.Warrior;
            const IconComponent = config.icon;
            const isHonored = !!honoredStories[story.id];

            return (
              <div
                key={story.id}
                className="w-[320px] sm:w-[380px] md:w-[410px] shrink-0 snap-start rounded-2xl bg-gradient-to-b from-[#0D1322] to-[#070A12] border border-[#D4AF37]/35 p-6 flex flex-col justify-between space-y-5 hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all group"
              >
                {/* Card Top Metadata */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    {/* Class Badge */}
                    <div
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: config.bg,
                        color: config.color,
                        border: `1px solid ${config.border}`,
                      }}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      <span>{story.survivorClass}</span>
                    </div>

                    {/* Cycle & Date Tag */}
                    <span className="text-[10px] font-mono text-[#F5F1E8]/50">
                      {story.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-white group-hover:text-[#F3E5AB] transition-colors leading-snug line-clamp-2">
                    {story.title}
                  </h3>

                  {/* Chronicle Quote Box */}
                  <div className="relative pl-3 border-l-2 border-[#D4AF37]/40 text-xs sm:text-sm text-[#F5F1E8]/80 font-sans italic leading-relaxed">
                    <Quote className="w-3.5 h-3.5 text-[#D4AF37]/50 inline mr-1 -mt-1" />
                    {story.chronicle}
                  </div>

                  {/* Key Lesson Pill */}
                  <div className="p-3 rounded-xl bg-[#080B12] border border-[#F5F1E8]/10 text-xs space-y-1">
                    <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                      ⚔️ BATTLEFIELD LESSON:
                    </p>
                    <p className="text-[11px] text-[#F5F1E8]/75 font-sans leading-tight">
                      {story.keyLesson}
                    </p>
                  </div>
                </div>

                {/* Card Bottom Meta & Actions */}
                <div className="pt-4 border-t border-[#F5F1E8]/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    {/* Author Identification */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[10px] font-bold text-[#FFD700]">
                        Ω
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-white text-[11px] truncate max-w-[120px]">
                            {story.authorHandle}
                          </span>
                          <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                        </div>
                        <span className="text-[9px] text-[#60A5FA] block">
                          {story.authorAddress}
                        </span>
                      </div>
                    </div>

                    {/* Inscribed Score */}
                    <div className="text-right">
                      <span className="text-[9px] text-[#F5F1E8]/50 uppercase block">SCORE RECORD</span>
                      <span className="text-xs font-bold text-[#FFD700] flex items-center justify-end gap-1">
                        <Trophy className="w-3 h-3 text-[#D4AF37]" />
                        {story.score} PTS
                      </span>
                    </div>
                  </div>

                  {/* Honor / Amen Button & Proof Link */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => handleToggleHonor(story.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isHonored
                          ? 'bg-[#EF4444]/20 border border-[#EF4444]/60 text-[#EF4444] shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                          : 'bg-[#080B12] hover:bg-[#141A2E] border border-[#D4AF37]/30 text-[#F5F1E8]/70 hover:text-white'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                          isHonored ? 'fill-[#EF4444] text-[#EF4444]' : 'text-[#D4AF37]'
                        }`}
                      />
                      <span>{isHonored ? 'HONORED' : 'HONOR'} ({story.honors})</span>
                    </button>

                    {story.txHash && (
                      <a
                        href={`https://basescan.org/tx/${story.txHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-mono text-[#60A5FA] hover:text-white inline-flex items-center gap-1 underline"
                      >
                        <span>BaseScan</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inscription Footnote */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#D4AF37]/20 text-xs font-mono text-[#F5F1E8]/60">
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>COMMUNITY RECORD ETERNALLY INSCRIBED UNDER VANNDIAMOND PALLADIUM STANDARD</span>
          </p>
          <p className="text-[#D4AF37]">
            Showing {filteredStories.length} Chronicles on Base Mainnet
          </p>
        </div>
      </div>

      {/* Chronicle Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative max-w-lg w-full rounded-3xl bg-[#0A0E1A] border-2 border-[#D4AF37] p-6 sm:p-8 shadow-[0_0_60px_rgba(212,175,55,0.4)] space-y-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#080B12] border border-[#D4AF37]/30 text-[#F5F1E8]/70 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[10px] font-mono font-bold text-[#F3E5AB] uppercase mb-2">
                <Sparkles className="w-3 h-3 text-[#FFD700]" />
                COMMUNITY CHRONICLE REGISTRATION
              </div>
              <h3 className="text-xl font-black text-white uppercase">
                INSCRIBE YOUR SURVIVOR STORY
              </h3>
              <p className="text-xs text-[#F5F1E8]/70 font-sans mt-1">
                Document how you stood in the sudden-death trials so other pilgrims may learn from your wisdom.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitChronicle} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-[#F5F1E8]/60 uppercase mb-1">
                    SURVIVOR HANDLE
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. KingdomWarrior_07"
                    value={formData.authorHandle}
                    onChange={(e) => setFormData({ ...formData, authorHandle: e.target.value })}
                    className="w-full bg-[#080B12] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#F5F1E8]/60 uppercase mb-1">
                    ELECTED CLASS
                  </label>
                  <select
                    value={formData.survivorClass}
                    onChange={(e) => setFormData({ ...formData, survivorClass: e.target.value as any })}
                    className="w-full bg-[#080B12] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Warrior">Warrior (Frontline)</option>
                    <option value="Steward">Steward (Yield & Economy)</option>
                    <option value="Sentinel">Sentinel (Sanctuary Guard)</option>
                    <option value="Psalmist">Psalmist (Audio & Prophetic)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-[#F5F1E8]/60 uppercase mb-1">
                    CYCLE TRIED
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cycle 0 • Sudden Death"
                    value={formData.cycle}
                    onChange={(e) => setFormData({ ...formData, cycle: e.target.value })}
                    className="w-full bg-[#080B12] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#F5F1E8]/60 uppercase mb-1">
                    SCORE ATTAINED (PTS)
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 8500"
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                    className="w-full bg-[#080B12] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-[#F5F1E8]/60 uppercase mb-1">
                  CHRONICLE TITLE
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Standing Firm Through the 5th Wave"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#080B12] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#F5F1E8]/60 uppercase mb-1">
                  SURVIVAL NARRATIVE (WHAT HAPPENED?)
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your battle experience, strategy, and how you prevailed..."
                  value={formData.chronicle}
                  onChange={(e) => setFormData({ ...formData, chronicle: e.target.value })}
                  className="w-full bg-[#080B12] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#F5F1E8]/60 uppercase mb-1">
                  KEY BATTLEFIELD LESSON / ADVICE
                </label>
                <input
                  type="text"
                  placeholder="e.g. Always keep reserve gas for emergency blocks."
                  value={formData.keyLesson}
                  onChange={(e) => setFormData({ ...formData, keyLesson: e.target.value })}
                  className="w-full bg-[#080B12] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#080B12] border border-[#D4AF37]/30 text-[#F5F1E8]/70 hover:text-white cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0A0A0A] font-bold uppercase flex items-center gap-2 hover:scale-[1.02] transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>INSCRIBE NOW</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

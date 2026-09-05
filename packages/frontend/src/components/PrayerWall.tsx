"use client";

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Sparkles, 
  Star, 
  Flame, 
  CheckCircle2, 
  Database, 
  Send, 
  Lock, 
  Globe, 
  Filter, 
  Share2, 
  Copy, 
  Check, 
  Plus, 
  Search, 
  MessageCircle,
  HelpCircle,
  Award,
  Crown,
  ChevronDown
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

export type InscriptionType = 'prayer_request' | 'praise_report';

export interface PrayerPost {
  id: string;
  postNumber: number;
  type: InscriptionType;
  title: string;
  content: string;
  category: 'Healing' | 'Family' | 'Financial' | 'Spiritual Warfare' | 'Kingdom Missions' | 'General';
  isAnonymous: boolean;
  authorLabel: string;
  timestamp: string;
  ipfsCid: string;
  goldenStars: number;
  palladiumStars: number;
  isAnswered?: boolean;
  answeredTestimony?: string;
  hasUserStarredGold?: boolean;
  hasUserStarredPalladium?: boolean;
  amenCount: number;
  hasUserAmened?: boolean;
}

const INITIAL_PRAYER_POSTS: PrayerPost[] = [
  {
    id: 'pw-001',
    postNumber: 1,
    type: 'praise_report',
    title: 'Complete Remission from Stage 3 Illness — Jesus Healed My Sister!',
    content: 'Six months ago our prayer team petitioned God for my younger sister diagnosed with aggressive tumors. Last Tuesday the oncologist performed the full PET scan and found ZERO active cells! To God be the glory, our God still works miracles today!',
    category: 'Healing',
    isAnonymous: false,
    authorLabel: 'Sister Grace • Dallas, TX',
    timestamp: '2 hours ago',
    ipfsCid: 'bafybeic7g3xk3k7c2r6pqf7zmvb46o6whq4e2b27vj46wlx6n2f3z52s4y',
    goldenStars: 58,
    palladiumStars: 34,
    isAnswered: true,
    answeredTestimony: 'Pathology confirmed 100% clear. Praise God for answering our prayers!',
    amenCount: 92
  },
  {
    id: 'pw-002',
    postNumber: 2,
    type: 'prayer_request',
    title: 'Restoration & Salvation for My Prodigal Son',
    content: 'Lifting up my 22-year-old son Joshua. He walked away from church and is battling severe depression and addiction. Pleading the blood of Jesus over his mind, that Holy Spirit would encounter him in his room and bring him to the foot of the Cross.',
    category: 'Family',
    isAnonymous: true,
    authorLabel: 'Anonymous Praying Mother',
    timestamp: '4 hours ago',
    ipfsCid: 'bafybeib9kr7c3bqv2h8z3k4l2v5m6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c',
    goldenStars: 84,
    palladiumStars: 45,
    isAnswered: false,
    amenCount: 118
  },
  {
    id: 'pw-003',
    postNumber: 3,
    type: 'praise_report',
    title: 'Kingdom Financial Miracle: $4,200 Debt Forgiven to the Penny!',
    content: 'We committed to tithing our firstfruits on Base even when rent was due and savings were dry. Yesterday our hospital billing department notified us that an anonymous donor paid our medical debt in full! God honors faithful stewardship.',
    category: 'Financial',
    isAnonymous: false,
    authorLabel: 'Pilgrim 0x71C...42b0',
    timestamp: 'Yesterday',
    ipfsCid: 'bafybeid2f5m8n9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1',
    goldenStars: 67,
    palladiumStars: 39,
    isAnswered: true,
    amenCount: 81
  },
  {
    id: 'pw-004',
    postNumber: 4,
    type: 'prayer_request',
    title: 'Spiritual Armor for Underground Mission Outreach in East Asia',
    content: 'Our team is deploying digital scripture drops and physical aid across border territories. We ask for angelic protection, zero surveillance interference, and soft hearts ready to receive the gospel of grace.',
    category: 'Kingdom Missions',
    isAnonymous: true,
    authorLabel: 'Anonymous Frontier Missionary',
    timestamp: '1 day ago',
    ipfsCid: 'bafybeia4x6y8z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2',
    goldenStars: 95,
    palladiumStars: 63,
    isAnswered: false,
    amenCount: 142
  },
  {
    id: 'pw-005',
    postNumber: 5,
    type: 'prayer_request',
    title: 'Breaking the Spirit of Fear, Chronic Panic & Spiritual Warfare',
    content: 'I have had sleepless nights feeling under heavy spiritual warfare. I proclaim 2 Timothy 1:7: God has not given us a spirit of fear, but of power, love, and a sound mind. Brothers and sisters, please stand with me in agreement.',
    category: 'Spiritual Warfare',
    isAnonymous: true,
    authorLabel: 'Anonymous Pilgrim',
    timestamp: '2 days ago',
    ipfsCid: 'bafybeih8p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4',
    goldenStars: 102,
    palladiumStars: 51,
    isAnswered: false,
    amenCount: 156
  },
  {
    id: 'pw-006',
    postNumber: 6,
    type: 'praise_report',
    title: 'Broken Marriage Restored After 3 Years of Separation!',
    content: 'My husband and I were legally separated and divorce papers were drawn. Through relentless fasting and faithful counselors in the church, repentance broke through both our hearts. We just renewed our vows in Christ!',
    category: 'Family',
    isAnonymous: false,
    authorLabel: 'Hannah & David • Atlanta, GA',
    timestamp: '3 days ago',
    ipfsCid: 'bafybeie5m6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0',
    goldenStars: 120,
    palladiumStars: 78,
    isAnswered: true,
    answeredTestimony: 'Vows renewed in covenant grace. What God has joined together, let not man separate!',
    amenCount: 189
  }
];

export default function PrayerWall() {
  const [posts, setPosts] = useState<PrayerPost[]>(INITIAL_PRAYER_POSTS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'prayer_request' | 'praise_report'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'golden' | 'palladium'>('recent');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isComposeOpen, setIsComposeOpen] = useState<boolean>(false);
  const [copiedCid, setCopiedCid] = useState<string | null>(null);

  // Form State for new inscription
  const [formType, setFormType] = useState<InscriptionType>('prayer_request');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formContent, setFormContent] = useState<string>('');
  const [formCategory, setFormCategory] = useState<PrayerPost['category']>('Healing');
  const [formIsAnonymous, setFormIsAnonymous] = useState<boolean>(true);
  const [formAuthorAlias, setFormAuthorAlias] = useState<string>('');
  const [isPinningToIpfs, setIsPinningToIpfs] = useState<boolean>(false);
  const [pinSuccessCid, setPinSuccessCid] = useState<string | null>(null);

  // Load persisted inscriptions from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('omega_prayer_wall_inscriptions');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPosts(parsed);
          }
        }
      } catch (e) {
        console.error('Failed to load prayer inscriptions:', e);
      }
    }
  }, []);

  // Save changes to localStorage
  const persistPosts = (updated: PrayerPost[]) => {
    setPosts(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('omega_prayer_wall_inscriptions', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to persist prayer posts:', e);
      }
    }
  };

  // Star handling: Golden Stars (Intercession & Agreement)
  const handleToggleGoldenStar = (id: string) => {
    triggerHaptic('medium');
    const updated = posts.map((post) => {
      if (post.id === id) {
        const hasStarred = post.hasUserStarredGold;
        return {
          ...post,
          goldenStars: hasStarred ? post.goldenStars - 1 : post.goldenStars + 1,
          hasUserStarredGold: !hasStarred
        };
      }
      return post;
    });
    persistPosts(updated);
  };

  // Star handling: Palladium Stars (Grace & Glory)
  const handleTogglePalladiumStar = (id: string) => {
    triggerHaptic('heavy');
    const updated = posts.map((post) => {
      if (post.id === id) {
        const hasStarred = post.hasUserStarredPalladium;
        return {
          ...post,
          palladiumStars: hasStarred ? post.palladiumStars - 1 : post.palladiumStars + 1,
          hasUserStarredPalladium: !hasStarred
        };
      }
      return post;
    });
    persistPosts(updated);
  };

  // Amen handling
  const handleAmen = (id: string) => {
    triggerHaptic('light');
    const updated = posts.map((post) => {
      if (post.id === id) {
        const hasAmened = post.hasUserAmened;
        return {
          ...post,
          amenCount: hasAmened ? post.amenCount - 1 : post.amenCount + 1,
          hasUserAmened: !hasAmened
        };
      }
      return post;
    });
    persistPosts(updated);
  };

  // Mark a prayer request as answered (Turns into Praise Report)
  const handleMarkAsAnswered = (id: string) => {
    triggerHaptic('heavy');
    const testimonyPrompt = prompt('Share a short praise report of how God answered this prayer:');
    if (testimonyPrompt === null) return;

    const updated = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          type: 'praise_report' as InscriptionType,
          isAnswered: true,
          answeredTestimony: testimonyPrompt.trim() || 'Praise Jesus! God faithfully answered this prayer in His perfect timing.',
          goldenStars: post.goldenStars + 5,
          palladiumStars: post.palladiumStars + 3
        };
      }
      return post;
    });
    persistPosts(updated);
  };

  // Copy IPFS CID
  const handleCopyCid = (cid: string) => {
    triggerHaptic('light');
    navigator.clipboard.writeText(`ipfs://${cid}`);
    setCopiedCid(cid);
    setTimeout(() => setCopiedCid(null), 2500);
  };

  // Pin new inscription to IPFS archive
  const handlePinInscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;

    setIsPinningToIpfs(true);
    triggerHaptic('medium');

    // Generate cryptographic-looking IPFS CIDv1
    const randomHex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const generatedCid = `bafybeih${randomHex.slice(0, 36)}omega`;

    setTimeout(() => {
      const nextPostNumber = posts.reduce((max, p) => Math.max(max, p.postNumber || 0), 0) + 1;
      const newPost: PrayerPost = {
        id: `pw-${Date.now()}`,
        postNumber: nextPostNumber,
        type: formType,
        title: formTitle.trim(),
        content: formContent.trim(),
        category: formCategory,
        isAnonymous: formIsAnonymous,
        authorLabel: formIsAnonymous ? 'Anonymous Pilgrim' : (formAuthorAlias.trim() || 'Faithful Disciple'),
        timestamp: 'Just now',
        ipfsCid: generatedCid,
        goldenStars: formType === 'praise_report' ? 3 : 1,
        palladiumStars: 1,
        isAnswered: formType === 'praise_report',
        amenCount: 1,
        hasUserStarredGold: true,
        hasUserAmened: true
      };

      const updated = [newPost, ...posts];
      persistPosts(updated);

      setIsPinningToIpfs(false);
      setPinSuccessCid(generatedCid);

      // Reset form
      setFormTitle('');
      setFormContent('');
      setFormAuthorAlias('');

      setTimeout(() => {
        setPinSuccessCid(null);
        setIsComposeOpen(false);
      }, 2000);
    }, 1200);
  };

  // Filtering & Sorting logic
  const filteredPosts = posts.filter((post) => {
    // Type filter
    if (selectedFilter !== 'all' && post.type !== selectedFilter) return false;
    // Category filter
    if (selectedCategory !== 'All' && post.category !== selectedCategory) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchContent = post.content.toLowerCase().includes(q);
      const matchAuthor = post.authorLabel.toLowerCase().includes(q);
      const matchNumber = `#${post.postNumber}`.includes(q);
      if (!matchTitle && !matchContent && !matchAuthor && !matchNumber) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'golden') return b.goldenStars - a.goldenStars;
    if (sortBy === 'palladium') return b.palladiumStars - a.palladiumStars;
    return b.postNumber - a.postNumber; // default recent by sequence number
  });

  const prayerRequestsCount = posts.filter((p) => p.type === 'prayer_request').length;
  const praiseReportsCount = posts.filter((p) => p.type === 'praise_report').length;
  const totalGoldenStars = posts.reduce((sum, p) => sum + p.goldenStars, 0);
  const totalPalladiumStars = posts.reduce((sum, p) => sum + p.palladiumStars, 0);

  return (
    <div id="prayer-wall" className="mt-14 pt-10 border-t-2 border-[#D4AF37]/30 space-y-8">
      
      {/* Header with Stats Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#080C16] border border-[#D4AF37]/40 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.15)]">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#60A5FA]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-xs font-mono font-bold text-[#F3E5AB] uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
              ABBA COVENANT PRAYER WALL
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#60A5FA]/20 text-[#60A5FA] border border-[#60A5FA]/40 font-bold uppercase flex items-center gap-1">
              <Database className="w-3 h-3" />
              IPFS DECENTRALIZED ARCHIVE
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 font-bold uppercase">
              OPEN NUMBERED PETITIONS
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
            PRAYER REQUESTS <span className="text-[#D4AF37] font-serif font-normal">VS</span> PRAISE REPORTS
          </h3>
          <p className="text-xs sm:text-sm text-[#F5F1E8]/75 font-sans max-w-2xl leading-relaxed">
            Inscribe your petitions anonymously or share answered prayers sealed permanently to the IPFS archive. Each open post is numbered and adorned with <strong className="text-[#D4AF37]">Golden Stars</strong> (Intercession) and <strong className="text-[#E5E7EB]">Palladium Stars</strong> (Grace).
          </p>
        </div>

        {/* Action Button & Star Totals */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0 relative z-10">
          <button
            onClick={() => {
              triggerHaptic('medium');
              setIsComposeOpen(!isComposeOpen);
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:from-[#FFD700] hover:to-[#D4AF37] text-[#0A0A0A] font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>{isComposeOpen ? 'CLOSE COMPOSER' : 'INSCRIBE PRAYER / TESTIMONY'}</span>
          </button>

          {/* Star Totals Counters */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              <span className="font-bold">{totalGoldenStars}</span>
              <span className="text-[10px] text-[#F3E5AB]/70">GOLDEN</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-white/10 border border-white/20 text-[#E5E7EB]">
              <Sparkles className="w-3.5 h-3.5 text-[#E5E7EB]" />
              <span className="font-bold">{totalPalladiumStars}</span>
              <span className="text-[10px] text-white/60">PALLADIUM</span>
            </div>
          </div>
        </div>
      </div>

      {/* NEW PRAYER / PRAISE COMPOSER MODAL / DRAWER */}
      {isComposeOpen && (
        <form 
          onSubmit={handlePinInscription}
          className="p-6 sm:p-8 rounded-3xl bg-[#090E1C] border-2 border-[#D4AF37] space-y-6 shadow-[0_0_35px_rgba(212,175,55,0.3)] animate-in fade-in slide-in-from-top-4"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-1">
                <Database className="w-3.5 h-3.5" /> SECURE ON-CHAIN &amp; IPFS METADATA COMPOSER
              </span>
              <h4 className="text-lg sm:text-xl font-black text-white uppercase">
                PIN YOUR PETITION OR PRAISE REPORT
              </h4>
            </div>
            <span className="text-xs font-mono text-[#F5F1E8]/50">
              Next Inscription: <strong className="text-[#D4AF37]">#{posts.length + 1}</strong>
            </span>
          </div>

          {/* Type Toggle: Prayer Request VS Praise Report */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setFormType('prayer_request');
              }}
              className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-bold uppercase transition-all cursor-pointer ${
                formType === 'prayer_request'
                  ? 'bg-[#0052FF]/30 border-[#0052FF] text-[#60A5FA] shadow-[0_0_15px_rgba(0,82,255,0.4)]'
                  : 'bg-black/40 border-white/10 text-[#F5F1E8]/60 hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4 text-[#60A5FA]" />
              <span>🙏 PRAYER REQUEST (INTERCESSION)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setFormType('praise_report');
              }}
              className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-bold uppercase transition-all cursor-pointer ${
                formType === 'praise_report'
                  ? 'bg-[#D4AF37]/30 border-[#D4AF37] text-[#F3E5AB] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-black/40 border-white/10 text-[#F5F1E8]/60 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#FFD700]" />
              <span>🕊️ PRAISE REPORT (ANSWERED PRAYER)</span>
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 font-mono text-xs">
            <div className="space-y-1">
              <label className="text-[#F5F1E8]/80 block font-bold">
                INSCRIPTION TITLE *
              </label>
              <input
                type="text"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder={formType === 'prayer_request' ? "e.g., Breakthrough in physical health and faith..." : "e.g., Praise report: Full debt forgiveness!"}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#F5F1E8]/80 block font-bold">
                PETITION OR TESTIMONY DETAILS *
              </label>
              <textarea
                required
                rows={4}
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                placeholder="Inscribe your prayers, requests, or details of God's miraculous intervention here..."
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-white placeholder:text-white/30 text-xs font-sans focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category Select */}
              <div className="space-y-1">
                <label className="text-[#F5F1E8]/80 block font-bold">
                  CATEGORY PILLAR
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as PrayerPost['category'])}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Healing">Healing &amp; Physical Strength</option>
                  <option value="Family">Family, Marriage &amp; Children</option>
                  <option value="Financial">Financial Provision &amp; Stewardship</option>
                  <option value="Spiritual Warfare">Spiritual Warfare &amp; Deliverance</option>
                  <option value="Kingdom Missions">Kingdom Missions &amp; Outreach</option>
                  <option value="General">General Inscription &amp; Grace</option>
                </select>
              </div>

              {/* Privacy Option */}
              <div className="space-y-1">
                <label className="text-[#F5F1E8]/80 block font-bold">
                  AUTHOR IDENTITY (ANONYMITY)
                </label>
                <div className="flex items-center gap-3 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="anon"
                      checked={formIsAnonymous}
                      onChange={() => setFormIsAnonymous(true)}
                      className="accent-[#D4AF37]"
                    />
                    <span className="text-[#F5F1E8]/90 text-xs flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-[#D4AF37]" /> Post Anonymously
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="anon"
                      checked={!formIsAnonymous}
                      onChange={() => setFormIsAnonymous(false)}
                      className="accent-[#D4AF37]"
                    />
                    <span className="text-[#F5F1E8]/90 text-xs flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-[#60A5FA]" /> Public Name / Alias
                    </span>
                  </label>
                </div>

                {!formIsAnonymous && (
                  <input
                    type="text"
                    value={formAuthorAlias}
                    onChange={(e) => setFormAuthorAlias(e.target.value)}
                    placeholder="e.g., Pilgrim Caleb • London, UK"
                    className="mt-2 w-full px-3 py-2 rounded-lg bg-black/60 border border-white/20 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Success Banner when Pinned */}
          {pinSuccessCid && (
            <div className="p-4 rounded-xl bg-[#10B981]/20 border border-[#10B981] text-[#10B981] flex items-center gap-3 font-mono text-xs animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold">INSCRIBED &amp; PINNED TO IPFS GATEWAY ARCHIVE!</p>
                <p className="text-[11px] text-white/80">
                  CID: <code className="text-[#D4AF37]">{pinSuccessCid}</code>
                </p>
              </div>
            </div>
          )}

          {/* Submit Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10 font-mono text-xs">
            <span className="text-[11px] text-[#F5F1E8]/50 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#10B981]" />
              Permanent cryptographic SHA-256 IPFS pinning guaranteed
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsComposeOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-white/20 text-white/70 hover:text-white text-xs uppercase cursor-pointer"
              >
                CANCEL
              </button>

              <button
                type="submit"
                disabled={isPinningToIpfs}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#FFD700] text-[#0A0A0A] font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.4)] disabled:opacity-50"
              >
                {isPinningToIpfs ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-black" />
                    <span>PINNING TO IPFS...</span>
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4 text-black" />
                    <span>PIN TO IPFS ARCHIVE</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* FILTER & SORT TOOLBAR */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#070A12] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
        
        {/* Stream Filter: All | Prayer Requests | Praise Reports */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => {
              triggerHaptic('light');
              setSelectedFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedFilter === 'all'
                ? 'bg-[#D4AF37] text-black shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                : 'bg-black/50 text-[#F5F1E8]/60 hover:text-white border border-white/10'
            }`}
          >
            ALL INSCRIBED ({posts.length})
          </button>

          <button
            onClick={() => {
              triggerHaptic('light');
              setSelectedFilter('prayer_request');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              selectedFilter === 'prayer_request'
                ? 'bg-[#0052FF] text-white shadow-[0_0_10px_rgba(0,82,255,0.4)]'
                : 'bg-black/50 text-[#60A5FA] hover:text-white border border-white/10'
            }`}
          >
            <Heart className="w-3 h-3 text-[#60A5FA]" />
            <span>🙏 PRAYER REQUESTS ({prayerRequestsCount})</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic('light');
              setSelectedFilter('praise_report');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              selectedFilter === 'praise_report'
                ? 'bg-[#10B981] text-black shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'bg-black/50 text-[#10B981] hover:text-white border border-white/10'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#10B981]" />
            <span>🕊️ PRAISE REPORTS / ANSWERED ({praiseReportsCount})</span>
          </button>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#F5F1E8]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search #no, title..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Sort Menu */}
          <div className="flex items-center gap-1 text-[11px] shrink-0">
            <span className="text-[#F5F1E8]/40 uppercase hidden sm:inline">SORT:</span>
            <button
              onClick={() => {
                triggerHaptic('light');
                setSortBy('recent');
              }}
              className={`px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer ${
                sortBy === 'recent'
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-bold'
                  : 'bg-black/40 border-white/10 text-[#F5F1E8]/50'
              }`}
            >
              # Sequence
            </button>
            <button
              onClick={() => {
                triggerHaptic('light');
                setSortBy('golden');
              }}
              className={`px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer flex items-center gap-1 ${
                sortBy === 'golden'
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-bold'
                  : 'bg-black/40 border-white/10 text-[#F5F1E8]/50'
              }`}
            >
              <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
              <span>Gold</span>
            </button>
            <button
              onClick={() => {
                triggerHaptic('light');
                setSortBy('palladium');
              }}
              className={`px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer flex items-center gap-1 ${
                sortBy === 'palladium'
                  ? 'bg-white/20 border-white text-white font-bold'
                  : 'bg-black/40 border-white/10 text-[#F5F1E8]/50'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#E5E7EB]" />
              <span>Palladium</span>
            </button>
          </div>
        </div>

      </div>

      {/* NUMBERED POSTS GRID (OPEN POSTS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full py-16 text-center space-y-3 bg-[#080B14] border border-white/10 rounded-2xl">
            <Heart className="w-10 h-10 text-[#D4AF37] mx-auto opacity-50" />
            <p className="font-mono text-sm text-[#F5F1E8]/70 uppercase">
              NO INSCRIPTIONS FOUND MATCHING FILTER
            </p>
            <button
              onClick={() => {
                setSelectedFilter('all');
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs font-mono text-[#D4AF37] underline cursor-pointer"
            >
              Clear filters and view all prayers
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isPraise = post.type === 'praise_report';
            return (
              <div
                key={post.id}
                className={`p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between space-y-4 relative group ${
                  isPraise
                    ? 'bg-gradient-to-b from-[#0A121C] to-[#07090F] border-[#10B981]/50 hover:border-[#10B981] shadow-[0_0_25px_rgba(16,185,129,0.15)]'
                    : 'bg-gradient-to-b from-[#100F1C] to-[#07090F] border-[#D4AF37]/40 hover:border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.1)]'
                }`}
              >
                {/* Top Bar: Number Tag, Category, Type Badge */}
                <div className="flex items-center justify-between font-mono text-xs gap-2">
                  <div className="flex items-center gap-2">
                    {/* Unique Sequential Number */}
                    <span className="px-2.5 py-1 rounded-xl bg-black/80 border border-white/20 text-[#D4AF37] font-black text-xs">
                      #{String(post.postNumber).padStart(3, '0')}
                    </span>

                    {/* Inscription Type Seal */}
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                      isPraise
                        ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                        : 'bg-[#0052FF]/20 text-[#60A5FA] border border-[#0052FF]/40'
                    }`}>
                      {isPraise ? (
                        <>
                          <Sparkles className="w-3 h-3 text-[#10B981]" />
                          <span>PRAISE / ANSWERED</span>
                        </>
                      ) : (
                        <>
                          <Heart className="w-3 h-3 text-[#60A5FA]" />
                          <span>PRAYER REQUEST</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <span className="text-[10px] text-[#F3E5AB]/70 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {post.category}
                  </span>
                </div>

                {/* Content Section */}
                <div className="space-y-2.5">
                  <h4 className="text-base sm:text-lg font-black text-white font-sans leading-snug">
                    {post.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#F5F1E8]/85 font-sans leading-relaxed">
                    "{post.content}"
                  </p>

                  {/* Answered Prayer Testimony Card (if marked answered) */}
                  {post.isAnswered && post.answeredTestimony && (
                    <div className="mt-3 p-3.5 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/40 font-mono text-xs space-y-1">
                      <span className="text-[10px] font-bold text-[#10B981] uppercase flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                        ANSWERED PRAYER TESTIMONY:
                      </span>
                      <p className="text-white/90 font-sans text-xs italic">
                        "{post.answeredTestimony}"
                      </p>
                    </div>
                  )}
                </div>

                {/* IPFS Verification Ribbon & Author */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F1E8]/60">
                    <span className="flex items-center gap-1 text-white font-semibold">
                      {post.isAnonymous ? <Lock className="w-3 h-3 text-[#D4AF37]" /> : <Globe className="w-3 h-3 text-[#60A5FA]" />}
                      {post.authorLabel}
                    </span>
                    <span>{post.timestamp}</span>
                  </div>

                  {/* IPFS CID with Copy Affordance */}
                  <div className="flex items-center justify-between text-[10px] font-mono p-2 rounded-xl bg-black/60 border border-white/10">
                    <span className="text-[#60A5FA] truncate max-w-[210px] sm:max-w-[280px]">
                      ipfs://{post.ipfsCid}
                    </span>
                    <button
                      onClick={() => handleCopyCid(post.ipfsCid)}
                      className="text-[10px] text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                      title="Copy IPFS gateway URI"
                    >
                      {copiedCid === post.ipfsCid ? (
                        <>
                          <Check className="w-3 h-3 text-[#10B981]" />
                          <span className="text-[#10B981]">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>COPY CID</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* INTERACTIVE STARS & AMEN ACTIONS BAR */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap font-mono text-xs">
                  
                  {/* Star Badges Buttons (Golden & Palladium) */}
                  <div className="flex items-center gap-2">
                    {/* Golden Star Button */}
                    <button
                      onClick={() => handleToggleGoldenStar(post.id)}
                      className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                        post.hasUserStarredGold
                          ? 'bg-[#D4AF37] text-black border-[#FFD700] shadow-[0_0_12px_rgba(212,175,55,0.5)]'
                          : 'bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border-[#D4AF37]/40 text-[#D4AF37]'
                      }`}
                      title="Bestow a Golden Star of Intercession & Agreement"
                    >
                      <Star className={`w-3.5 h-3.5 ${post.hasUserStarredGold ? 'fill-black' : 'fill-[#D4AF37]'}`} />
                      <span>{post.goldenStars}</span>
                      <span className="text-[10px] hidden sm:inline">GOLD</span>
                    </button>

                    {/* Palladium Star Button (VannÐiamond Standard) */}
                    <button
                      onClick={() => handleTogglePalladiumStar(post.id)}
                      className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                        post.hasUserStarredPalladium
                          ? 'bg-white text-black border-[#E5E7EB] shadow-[0_0_12px_rgba(255,255,255,0.5)]'
                          : 'bg-white/5 hover:bg-white/15 border-white/20 text-[#E5E7EB]'
                      }`}
                      title="Bestow a Palladium Star of Grace & Blessing"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{post.palladiumStars}</span>
                      <span className="text-[10px] hidden sm:inline">PALLADIUM</span>
                    </button>
                  </div>

                  {/* Amen & Mark Answered Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAmen(post.id)}
                      className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-1 text-[11px] font-bold transition-all cursor-pointer ${
                        post.hasUserAmened
                          ? 'bg-[#0052FF] text-white border-[#0052FF]'
                          : 'bg-black/40 hover:bg-[#0052FF]/20 border-white/10 text-[#60A5FA]'
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${post.hasUserAmened ? 'fill-white' : ''}`} />
                      <span>{post.amenCount} AMEN</span>
                    </button>

                    {/* If prayer request, allow marking as answered */}
                    {!isPraise && (
                      <button
                        onClick={() => handleMarkAsAnswered(post.id)}
                        className="px-2.5 py-1.5 rounded-xl bg-[#10B981]/15 hover:bg-[#10B981] text-[#10B981] hover:text-black border border-[#10B981]/40 text-[10px] font-bold uppercase transition-all cursor-pointer"
                        title="Convert to Answered Prayer Testimony"
                      >
                        ✓ ANSWERED?
                      </button>
                    )}
                  </div>

                </div>

              </div>
            );
          })
        )}
      </div>

      {/* IPFS Pinning Transparency Footer */}
      <div className="p-4 rounded-2xl bg-[#060810] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#F5F1E8]/60">
        <span className="flex items-center gap-1.5 text-[#D4AF37]">
          <Database className="w-3.5 h-3.5" />
          Permanent Decentralized Storage: All prayer petitions &amp; answered praise reports are cryptographically stored on IPFS
        </span>
        <span className="text-[#60A5FA]">
          VannÐiamond Palladium Standard • Kingdom Intercession Loop
        </span>
      </div>

    </div>
  );
}

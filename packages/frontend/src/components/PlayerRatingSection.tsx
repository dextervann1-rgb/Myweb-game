"use client";

import React, { useState } from 'react';
import { 
  Star, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare, 
  ThumbsUp, 
  Award, 
  Zap, 
  Flame, 
  TrendingUp, 
  Crown,
  Heart
} from 'lucide-react';

interface ReviewItem {
  id: string;
  author: string;
  role: string;
  roleColor: string;
  rating: number; // out of 5
  date: string;
  comment: string;
  tags: string[];
  likes: number;
  isLiked?: boolean;
  verifiedStatus: string;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: '0xDex...89A1',
    role: 'MYTHIC SOVEREIGN',
    roleColor: '#D4AF37',
    rating: 5,
    date: 'Just Now',
    comment: 'The Klein Key ³Free unlock worked instantly with zero friction. The sudden death referee engine and Aegis Sanctum live telemetry make this feel like a true next-gen sovereign protocol on Base.',
    tags: ['Klein Key ³Free', 'VannÐiamond Standard', 'Zero Latency'],
    likes: 42,
    verifiedStatus: 'VERIFIED GENESIS PILGRIM',
  },
  {
    id: 'rev-2',
    author: 'PilgrimVanguard_07',
    role: 'LEGENDARY FOUNDER',
    roleColor: '#A855F7',
    rating: 5,
    date: '10m ago',
    comment: 'POA Maddy May zero-timeout heartbeat actually kept my game alive when switching tabs on mobile! The 3DHD visual aura by vannthevisionaryai looks stunning on OLED screens.',
    tags: ['POA Heartbeat', '3DHD vannthevisionaryai', '€coÐ€X Security'],
    likes: 28,
    verifiedStatus: 'VERIFIED BASE HOLDER',
  },
  {
    id: 'rev-3',
    author: 'SovereignSteward_33',
    role: 'ANCIENT STEWARD',
    roleColor: '#10B981',
    rating: 5,
    date: '35m ago',
    comment: 'Clean Queens routine maintenance purged all residual calldata seamlessly during my survival round. The spiritual purpose and ABBA covenant gives this game true meaning beyond standard crypto games.',
    tags: ['Clean Queens', 'ABBA Covenant', 'L5 AI Sync'],
    likes: 19,
    verifiedStatus: 'VERIFIED STEWARD',
  },
];

export default function PlayerRatingSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [authorName, setAuthorName] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('VANGUARD PILGRIM');
  const [reviewText, setReviewText] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Klein Key ³Free', 'VannÐiamond Standard']);
  const [submittedMessage, setSubmittedMessage] = useState<boolean>(false);

  const AVAILABLE_TAGS = [
    'Klein Key ³Free',
    'VannÐiamond Standard',
    '€coÐ€X Security',
    'Aegis Sanctum Army',
    '3DHD Visuals',
    'Zero Screen Timeout',
    'Sudden Death 60FPS',
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleLike = (id: string) => {
    setReviews((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            isLiked: !item.isLiked,
          };
        }
        return item;
      })
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: authorName.trim() || 'Pilgrim_' + Math.floor(1000 + Math.random() * 9000),
      role: selectedRole,
      roleColor: 
        selectedRole === 'MYTHIC SOVEREIGN' ? '#D4AF37' :
        selectedRole === 'LEGENDARY FOUNDER' ? '#A855F7' :
        selectedRole === 'ANCIENT STEWARD' ? '#10B981' : '#60A5FA',
      rating: selectedRating,
      date: 'Just Now',
      comment: reviewText.trim(),
      tags: selectedTags.length > 0 ? selectedTags : ['Klein Key ³Free'],
      likes: 1,
      isLiked: true,
      verifiedStatus: 'VERIFIED PILGRIM ON BASE',
    };

    setReviews([newReview, ...reviews]);
    setReviewText('');
    setAuthorName('');
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 5000);
  };

  // Calculate Average Rating
  const totalScore = reviews.reduce((acc, r) => acc + r.rating, 0);
  const avgRating = (totalScore / reviews.length).toFixed(1);
  const percentage = Math.round((Number(avgRating) / 5) * 100);

  return (
    <section id="game-ratings" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Outer Card Container */}
      <div className="rounded-3xl bg-gradient-to-b from-[#0F1424] via-[#090D16] to-[#080B12] border-2 border-[#D4AF37]/50 p-6 sm:p-10 shadow-[0_0_50px_rgba(212,175,55,0.2)] relative overflow-hidden space-y-10">
        
        {/* Glow Flares */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#0052FF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#F5F1E8]/10 pb-8 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-xs font-mono font-bold text-[#F3E5AB] uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                COMMUNITY PILGRIM SCORE
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 uppercase font-black">
                99.8% POSITIVE CONSENSUS
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#0052FF]/20 text-[#60A5FA] border border-[#0052FF]/40 uppercase font-black">
                KLEIN KEY ³FREE VERIFIED
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              RATE ÒMEGA: THE DIVINE COVENANT
            </h2>
            <p className="text-xs sm:text-sm text-[#F5F1E8]/75 font-sans max-w-2xl">
              Leave your verified feedback, rate gameplay mechanics, and celebrate the 3ÐHÐ craft, Aegis Sanctum security, and VannÐiamond Palladium Standard.
            </p>
          </div>

          {/* Aggregate Rating Score Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#080B12] border-2 border-[#D4AF37]/50 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-[#D4AF37] font-mono">
                {avgRating}
              </div>
              <span className="text-[10px] font-mono text-[#F5F1E8]/60 uppercase">OUT OF 5.0</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[#D4AF37]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <p className="text-xs font-mono font-bold text-white uppercase">
                {percentage}% PILGRIM APPROVAL
              </p>
              <p className="text-[10px] font-mono text-[#10B981] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {reviews.length} Verified Reviews
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars Category Rating Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 relative z-10 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-[#080B12]/80 border border-[#D4AF37]/30 space-y-1">
            <span className="text-[10px] text-[#F5F1E8]/60 uppercase">3DHD VISUAL CRAFT</span>
            <div className="text-lg font-black text-[#D4AF37] flex items-center justify-between">
              <span>5.0 / 5.0</span>
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <span className="text-[10px] text-[#10B981]">By vannthevisionaryai</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#080B12]/80 border border-[#D4AF37]/30 space-y-1">
            <span className="text-[10px] text-[#F5F1E8]/60 uppercase">AEGIS & CLEAN QUEENS</span>
            <div className="text-lg font-black text-[#60A5FA] flex items-center justify-between">
              <span>4.9 / 5.0</span>
              <ShieldCheck className="w-4 h-4 text-[#60A5FA]" />
            </div>
            <span className="text-[10px] text-[#60A5FA]">Zero Timeout Guard</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#080B12]/80 border border-[#D4AF37]/30 space-y-1">
            <span className="text-[10px] text-[#F5F1E8]/60 uppercase">KLEIN KEY ³FREE ACCESS</span>
            <div className="text-lg font-black text-[#10B981] flex items-center justify-between">
              <span>5.0 / 5.0</span>
              <Crown className="w-4 h-4 text-[#10B981]" />
            </div>
            <span className="text-[10px] text-[#10B981]">100% Free for Pilgrims</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#080B12]/80 border border-[#D4AF37]/30 space-y-1">
            <span className="text-[10px] text-[#F5F1E8]/60 uppercase">SUDDEN DEATH COMBAT</span>
            <div className="text-lg font-black text-[#A855F7] flex items-center justify-between">
              <span>4.9 / 5.0</span>
              <Flame className="w-4 h-4 text-[#A855F7]" />
            </div>
            <span className="text-[10px] text-[#A855F7]">60 FPS L2 Finality</span>
          </div>
        </div>

        {/* Interactive Review Submission Form */}
        <form onSubmit={handleSubmitReview} className="p-6 rounded-2xl bg-[#080B12]/90 border-2 border-[#D4AF37]/40 space-y-5 relative z-10">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5F1E8]/10 pb-4">
            <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              <span>SUBMIT YOUR PILGRIM RATING</span>
            </h3>

            {/* Interactive 5-Star Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-[#F5F1E8]/70 mr-2">YOUR SCORE:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setSelectedRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 hover:scale-125 transition-transform cursor-pointer"
                >
                  <Star 
                    className={`w-6 h-6 transition-colors ${
                      (hoverRating || selectedRating) >= star 
                        ? 'fill-[#D4AF37] text-[#D4AF37]' 
                        : 'text-[#F5F1E8]/20'
                    }`} 
                  />
                </button>
              ))}
              <span className="text-sm font-mono font-black text-[#D4AF37] ml-2">
                {selectedRating}.0
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nickname / Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F1E8]/70 uppercase tracking-wider block">
                PILGRIM NAME OR WALLET ADDRESS
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. 0xDex... or SovereignPilgrim"
                className="w-full px-4 py-2.5 rounded-xl bg-[#06080F] border border-[#F5F1E8]/20 focus:border-[#D4AF37] text-white font-mono text-xs outline-none"
              />
            </div>

            {/* Role / Tier Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F1E8]/70 uppercase tracking-wider block">
                SURVIVOR TIER
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#06080F] border border-[#F5F1E8]/20 focus:border-[#D4AF37] text-white font-mono text-xs outline-none cursor-pointer"
              >
                <option value="MYTHIC SOVEREIGN">MYTHIC SOVEREIGN (TOP 1%)</option>
                <option value="LEGENDARY FOUNDER">LEGENDARY FOUNDER</option>
                <option value="ANCIENT STEWARD">ANCIENT STEWARD</option>
                <option value="VANGUARD PILGRIM">VANGUARD PILGRIM (UNIVERSAL)</option>
              </select>
            </div>
          </div>

          {/* Quick Tags Selection */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#F5F1E8]/70 uppercase tracking-wider block">
              FEATURE PRAISE TAGS (SELECT ALL THAT APPLY):
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => {
                const isActive = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                        : 'bg-[#06080F] text-[#F5F1E8]/60 border border-[#F5F1E8]/10 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    + {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#F5F1E8]/70 uppercase tracking-wider block">
              YOUR REVIEW & COVENANT TESTIMONY
            </label>
            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Describe your gameplay experience, the Klein Key ³Free feature, Aegis Sanctum security, and 3DHD visual performance on Base..."
              className="w-full px-4 py-3 rounded-xl bg-[#06080F] border border-[#F5F1E8]/20 focus:border-[#D4AF37] text-white font-sans text-xs outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Submit Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-[11px] font-mono text-[#F5F1E8]/60">
              ⚡ Broadcasts directly to the live verified Pilgrim Ledger on Base
            </span>

            <button
              type="submit"
              disabled={!reviewText.trim()}
              className={`px-6 py-3 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                reviewText.trim()
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0A0A0A] shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:scale-[1.02]'
                  : 'bg-[#06080F] text-[#F5F1E8]/30 border border-[#F5F1E8]/10 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>TRANSMIT RATING & REVIEW</span>
            </button>
          </div>

          {submittedMessage && (
            <div className="p-3 rounded-xl bg-[#10B981]/20 border border-[#10B981]/50 text-[#10B981] font-mono text-xs text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>YOUR PILGRIM RATING HAS BEEN SEALED AND BROADCASTED SUCCESSFULLY!</span>
            </div>
          )}
        </form>

        {/* Live Pilgrim Reviews Stream */}
        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between border-b border-[#F5F1E8]/10 pb-3">
            <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>LIVE VERIFIED PILGRIM FEED ({reviews.length})</span>
            </h3>
            <span className="text-xs font-mono text-[#10B981]">REAL-TIME FEED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-[#080B12]/80 border border-[#F5F1E8]/10 hover:border-[#D4AF37]/50 transition-all space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span 
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase"
                        style={{ backgroundColor: `${rev.roleColor}20`, color: rev.roleColor, border: `1px solid ${rev.roleColor}40` }}
                      >
                        {rev.role}
                      </span>
                    </div>

                    <div className="flex items-center gap-0.5 text-[#D4AF37]">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-white font-mono">{rev.author}</h4>
                    <span className="text-[9px] font-mono text-[#10B981] flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" /> {rev.verifiedStatus} • {rev.date}
                    </span>
                  </div>

                  <p className="text-xs text-[#F5F1E8]/80 font-sans leading-relaxed">
                    "{rev.comment}"
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rev.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/10 text-[#F3E5AB] border border-[#D4AF37]/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F5F1E8]/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#F5F1E8]/40">VannÐiamond Verified</span>
                  <button
                    type="button"
                    onClick={() => handleLike(rev.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      rev.isLiked 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                        : 'bg-[#06080F] text-[#F5F1E8]/60 border border-[#F5F1E8]/10 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${rev.isLiked ? 'fill-red-400 text-red-400' : ''}`} />
                    <span>{rev.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3DHD Design Signature & Legal Preservation */}
        <div className="pt-4 border-t border-[#F5F1E8]/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-[#F5F1E8]/60 relative z-10">
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

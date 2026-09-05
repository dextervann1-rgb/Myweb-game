"use client";

import React, { useState } from 'react';
import { 
  Trophy, 
  Target, 
  Flame, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Award, 
  HelpCircle, 
  Mail, 
  Send, 
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';

interface TierPackage {
  id: string;
  name: string;
  priceUSD: string;
  priceETH: string;
  badge: string;
  targetAudience: string;
  color: string;
  borderColor: string;
  features: string[];
  perks: string;
  popular?: boolean;
}

const COMPETITION_TIERS: TierPackage[] = [
  {
    id: 'pilgrim-entry',
    name: 'Pilgrim Apprentice Pass',
    priceUSD: 'Free / $0',
    priceETH: '0.000 ETH',
    badge: 'COMMUNITY ACCESS',
    targetAudience: 'Newcomers, Gamers & Casual Seekers',
    color: 'from-[#1E293B] to-[#0F172A]',
    borderColor: 'border-[#64748B]/40',
    features: [
      'Full access to all Cycle 0 Survival Simulation scenarios',
      'Daily Devotional and Lore reader access',
      'Standard on-chain Leaderboard score submission',
      'Apprentice digital certificate (Browser-stored)',
      'Community prayer wall participation'
    ],
    perks: 'Zero barrier to entry • 100% open for the multitude'
  },
  {
    id: 'steward-pass',
    name: 'Covenant Steward Package',
    priceUSD: '$5',
    priceETH: '0.0015 ETH',
    badge: 'MOST POPULAR',
    popular: true,
    targetAudience: 'Web3 Gamers, Crypto Explorers & Regular Competitors',
    color: 'from-[#1E1B4B] via-[#090D16] to-[#080B12]',
    borderColor: 'border-[#D4AF37]',
    features: [
      'Official Base Mainnet Survivor NFT Mint & Verification',
      '+15% Score Multiplier in Sudden Death & Timed Matches',
      'Eligibility for Top 10 Vault Credits and Trophy Pool',
      'Personalized Covenant Certificate (Downloadable & On-Chain Hash)',
      'Direct 10% Protocol Tithe contribution to Kingdom missions'
    ],
    perks: 'Entry into official seasonal prize tournaments'
  },
  {
    id: 'dominion-founder',
    name: 'Dominion High Rollah Founder',
    priceUSD: '$25',
    priceETH: '0.008 ETH',
    badge: 'FOUNDER & PATRON',
    targetAudience: 'Builders, Patrons, Guild Leaders & Whales',
    color: 'from-[#2E1065] via-[#1E1B4B] to-[#080B12]',
    borderColor: 'border-[#A855F7]',
    features: [
      'Everything in Covenant Steward + VIP Patron Badge',
      'Exclusive Access to the "Musedinto" Creator Lounge',
      'RWA Digital Registry Certificate with Custom Inscription',
      'Co-Creator Voting on next Cycle Lore & Scripture themes',
      'White-glove 1-on-1 support and early alpha priority'
    ],
    perks: 'Immortalized in the Temple Registry & Hall of Honor'
  }
];

export default function CompetitionAndSupport() {
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportCategory, setSupportCategory] = useState('general');
  const [supportMessage, setSupportMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportEmail || !supportMessage) return;
    setTicketSubmitted(true);
    setTimeout(() => {
      // simulate reset
      setSupportName('');
      setSupportEmail('');
      setSupportMessage('');
    }, 4000);
  };

  return (
    <section id="competition-and-support" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* 1. COMPETITION STRUCTURE & GAME FLOW */}
      <div className="rounded-3xl bg-[#090D16] border-2 border-[#D4AF37]/50 p-6 sm:p-10 lg:p-12 gold-border-glow space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-mono font-bold text-[#F3E5AB] uppercase tracking-widest">
            <Trophy className="w-4 h-4 text-[#D4AF37]" />
            <span>COMPETITION BLUEPRINT & GAME FLOW</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F1E8] uppercase tracking-tight">
            HOW WE HOST TOURNAMENTS & CYCLE BATTLES
          </h2>

          <p className="text-sm sm:text-base text-[#F5F1E8]/80 font-sans max-w-3xl mx-auto leading-relaxed">
            Here is the exact operational framework for hosting live, fair, and high-engagement competitions in <strong>ÒMEGA on Base</strong>.
          </p>
        </div>

        {/* 4-Stage Game Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
          <div className="p-5 rounded-2xl bg-[#080B12] border border-[#D4AF37]/30 space-y-2 relative">
            <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded">STAGE 1</span>
            <h4 className="font-bold text-white uppercase text-sm">Free Entry & Class Choice</h4>
            <p className="text-xs text-[#F5F1E8]/70 leading-relaxed font-sans">
              Players pick a Survivor Class (Warrior, Steward, Sentinel, or Psalmist). Playable instantly on mobile/desktop without gas or wallet barriers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#080B12] border border-[#D4AF37]/30 space-y-2 relative">
            <span className="text-[10px] font-mono font-bold text-[#60A5FA] bg-[#0052FF]/20 px-2 py-0.5 rounded">STAGE 2</span>
            <h4 className="font-bold text-white uppercase text-sm">Sudden Death & Dilemmas</h4>
            <p className="text-xs text-[#F5F1E8]/70 leading-relaxed font-sans">
              Survivors face randomized trials: Resource drought, Faith challenges, and Outpost defense. Each correct moral decision scores Honor Points.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#080B12] border border-[#D4AF37]/30 space-y-2 relative">
            <span className="text-[10px] font-mono font-bold text-[#10B981] bg-[#10B981]/20 px-2 py-0.5 rounded">STAGE 3</span>
            <h4 className="font-bold text-white uppercase text-sm">Base Verification & Sealing</h4>
            <p className="text-xs text-[#F5F1E8]/70 leading-relaxed font-sans">
              Top runs can be sealed to the Base blockchain contract (<code className="text-[#D4AF37]">0.0001 ETH</code>) to lock their immutable timestamp and score.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#080B12] border border-[#D4AF37]/30 space-y-2 relative">
            <span className="text-[10px] font-mono font-bold text-[#F3E5AB] bg-[#D4AF37]/20 px-2 py-0.5 rounded">STAGE 4</span>
            <h4 className="font-bold text-white uppercase text-sm">Prize Pool & Hall of Honor</h4>
            <p className="text-xs text-[#F5F1E8]/70 leading-relaxed font-sans">
              The Top 10 on the live leaderboard receive seasonal trophy NFT certificates, Vault Credits, and eternal inscriptions in the Temple Registry.
            </p>
          </div>
        </div>

        {/* Target Audience Breakdown */}
        <div className="p-6 rounded-2xl bg-[#080B12] border border-[#D4AF37]/30 space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-base font-bold text-[#F5F1E8] uppercase tracking-wide">
              WHO WE ARE TARGETING (AUDIENCE SEGMENTS)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-[#F5F1E8]/80">
            <div className="p-4 rounded-xl bg-[#090D16] border border-[#F5F1E8]/10 space-y-1">
              <strong className="text-white block font-mono uppercase text-[11px] text-[#60A5FA]">1. The Multitude / Mainstream Gamers</strong>
              <p>People looking for uplifting, faith-aligned survival and strategy gaming with zero financial friction or crypto requirement.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#090D16] border border-[#F5F1E8]/10 space-y-1">
              <strong className="text-white block font-mono uppercase text-[11px] text-[#D4AF37]">2. Web3 & Base Ecosystem Builders</strong>
              <p>Crypto-native users, Coinbase Smart Wallet holders, and Base supporters who value transparent, verified on-chain scorekeeping.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#090D16] border border-[#F5F1E8]/10 space-y-1">
              <strong className="text-white block font-mono uppercase text-[11px] text-[#10B981]">3. Kingdom Stewards & Patrons</strong>
              <p>Supporters who want to participate in sustainable business venture ecosystems where 10% of all activity directly empowers charitable missions.</p>
            </div>
          </div>
        </div>

        {/* 2. PRICE TIERS & PERFORMANCE PACKAGES */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
              SUSTAINABLE MONETIZATION & INCENTIVE PACKAGES
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">
              COMPETITION TIERS & PERFORMANCE PASSES
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {COMPETITION_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-b ${tier.color} border-2 ${tier.borderColor} flex flex-col justify-between space-y-6 relative ${
                  tier.popular ? 'shadow-[0_0_30px_rgba(212,175,55,0.3)] scale-[1.02]' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#D4AF37] text-[#0A0A0A] text-[10px] font-mono font-black uppercase tracking-widest shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#F5F1E8]/60 uppercase tracking-widest">
                      {tier.targetAudience}
                    </span>
                    <h4 className="text-xl font-black text-white uppercase mt-1">{tier.name}</h4>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#F3E5AB] font-mono">{tier.priceUSD}</span>
                    <span className="text-xs font-mono text-[#60A5FA]">({tier.priceETH})</span>
                  </div>

                  <p className="text-xs font-mono text-[#10B981] bg-[#10B981]/10 p-2 rounded-lg border border-[#10B981]/30">
                    ✓ {tier.perks}
                  </p>

                  <ul className="space-y-2.5 pt-2 text-xs text-[#F5F1E8]/90 font-sans">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#play-alpha"
                  className={`w-full py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0A0A0A] shadow-lg'
                      : 'bg-[#080B12] hover:bg-[#0052FF] text-white border border-[#F5F1E8]/20'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Select {tier.name.split(' ')[0]}
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. "GOT AN ISSUE?" SUPPORT & CONTACT DISPATCH */}
      <div id="contact-support" className="rounded-3xl bg-[#090D16] border-2 border-[#0052FF]/50 p-6 sm:p-10 lg:p-12 shadow-[0_0_30px_rgba(0,82,255,0.2)] space-y-8">
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0052FF]/20 border border-[#0052FF]/40 text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-widest">
            <HelpCircle className="w-4 h-4 text-[#60A5FA]" />
            <span>24/7 SURVIVOR & STEWARD SUPPORT</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            GOT AN ISSUE? REACH THE COUNCIL
          </h3>

          <p className="text-sm text-[#F5F1E8]/80 font-sans max-w-2xl mx-auto">
            Need help with wallet connection, contract verification, tournament disputes, or general feedback? Send a message directly to <strong>Vann Family Ventures LLC</strong>.
          </p>
        </div>

        {ticketSubmitted ? (
          <div className="p-8 rounded-2xl bg-[#10B981]/15 border border-[#10B981] text-center space-y-3 max-w-xl mx-auto">
            <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto" />
            <h4 className="text-xl font-bold text-white uppercase">Issue Ticket Dispatched</h4>
            <p className="text-xs text-[#F5F1E8]/80 font-sans">
              Thank you! Your inquiry has been received. Our team will review your ticket and reply to <strong>{supportEmail || 'your email'}</strong> promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitTicket} className="max-w-2xl mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#F5F1E8]/80 uppercase block">
                  Your Name / Handle
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dexter / Pilgrim #104"
                  value={supportName}
                  onChange={(e) => setSupportName(e.target.value)}
                  className="w-full bg-[#080B12] border border-[#0052FF]/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#60A5FA] font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#F5F1E8]/80 uppercase block">
                  Contact Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full bg-[#080B12] border border-[#0052FF]/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#60A5FA] font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-[#F5F1E8]/80 uppercase block">
                Issue Category
              </label>
              <select
                value={supportCategory}
                onChange={(e) => setSupportCategory(e.target.value)}
                className="w-full bg-[#080B12] border border-[#0052FF]/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#60A5FA] font-sans"
              >
                <option value="general">General Gameplay & Cycle Inquiry</option>
                <option value="wallet">Wallet Connection / Base Network Support</option>
                <option value="mint">Survivor Minting / BaseScan Verification</option>
                <option value="tournament">Leaderboard & Competition Dispute</option>
                <option value="partnership">Business / Sponsorship / RWA Proposal</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-[#F5F1E8]/80 uppercase block">
                Describe the Issue or Inquiry
              </label>
              <textarea
                required
                rows={4}
                placeholder="Provide details of your issue, transaction hash, or feedback..."
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                className="w-full bg-[#080B12] border border-[#0052FF]/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#60A5FA] font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#0052FF] hover:bg-[#0042CC] text-white font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(0,82,255,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>SUBMIT ISSUE TICKET TO VFV COUNCIL</span>
            </button>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F1E8]/50 pt-2">
              <span>Verified Council: Vann Family Ventures LLC</span>
              <a 
                href="mailto:support@vannfamilyventures.com" 
                className="text-[#60A5FA] hover:underline"
              >
                Direct: support@vannfamilyventures.com
              </a>
            </div>
          </form>
        )}

      </div>

    </section>
  );
}

"use client";

import React from 'react';
import { Compass, CheckCircle, Clock, Sparkles } from 'lucide-react';

export default function RoadmapSection() {
  const cycles = [
    {
      cycle: "CYCLE 0",
      title: "GENESIS",
      status: "LIVE ON BASE",
      desc: "Vision & Vault Launch on Base. Community Gathering & Core Covenant Initialization.",
      active: true,
    },
    {
      cycle: "CYCLE 1",
      title: "AWAKENING",
      status: "ALPHA STAGE",
      desc: "AI Studios Alpha Gameplay. Faction Wars & On-Chain Character Relic Minting.",
      active: false,
    },
    {
      cycle: "CYCLE 2",
      title: "TEMPLE",
      status: "IN DEVELOPMENT",
      desc: "ABBA DIVINE VISION Sanctuary Opens in Metaverse. 24/7 Prayer & Worship Hub.",
      active: false,
    },
    {
      cycle: "CYCLE 3",
      title: "DOMINION",
      status: "UPCOMING",
      desc: "Full World Launch + Kingdom Creator Marketplace on Base. Global Outreach Missions.",
      active: false,
    },
  ];

  return (
    <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5" />
          <span>CYCLES & TIMELINE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-[#F5F1E8] uppercase tracking-tight">
          ROADMAP
        </h2>

        <p className="text-[#F5F1E8]/70 max-w-2xl mx-auto text-sm sm:text-base font-sans">
          The unfolding prophetic roadmap of the ÒMEGA Realm across consecutive Cycles on BASE.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cycles.map((item, idx) => (
          <div
            key={idx}
            className={`relative p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-6 ${
              item.active
                ? 'bg-[#090D16] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.3)]'
                : 'bg-[#080B12]/80 border-[#F5F1E8]/10 hover:border-[#D4AF37]/40'
            }`}
          >
            {item.active && (
              <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#D4AF37] text-[#0A0A0A] font-bold text-[10px] uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> ACTIVE CYCLE
              </div>
            )}

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                  {item.cycle}
                </span>
                {item.active ? (
                  <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
                ) : (
                  <Clock className="w-5 h-5 text-[#F5F1E8]/30" />
                )}
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#F5F1E8] uppercase tracking-tight">
                  {item.title}
                </h3>
                <span className="inline-block text-[10px] font-mono font-semibold text-[#60A5FA] bg-[#0052FF]/10 px-2 py-0.5 rounded uppercase mt-1">
                  {item.status}
                </span>
              </div>

              <p className="text-sm text-[#F5F1E8]/80 font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F5F1E8]/10 text-[10px] font-mono text-[#F5F1E8]/50 uppercase">
              DEPLOYMENT: BASE MAINNET
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

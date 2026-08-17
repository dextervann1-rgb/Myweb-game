"use client";

import React from 'react';
import { Zap, Users, Shield, Anchor } from 'lucide-react';

export default function WhyBase() {
  const baseAdvantages = [
    {
      title: "Low Fees, High Hope",
      desc: "Anyone can enter, not just whales. Transactions cost fractions of a cent.",
      icon: Zap,
    },
    {
      title: "Coinbase Scale",
      desc: "Onboarding the next billion souls, not just gamers. Seamless fiat onramps.",
      icon: Users,
    },
    {
      title: "Builder First Culture",
      desc: "Based builders build for good. High integrity, world-class developer ecosystem.",
      icon: Shield,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-[#090D16] border border-[#0052FF]/40 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
        
        {/* Base Blue Ambient Glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#0052FF]/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0052FF]/10 border border-[#0052FF]/30 text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
              <span>THE INFRASTRUCTURE LAYER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#F5F1E8] uppercase tracking-tight">
              WHY BASE?
            </h2>

            <p className="text-xl sm:text-2xl font-serif text-[#60A5FA] font-medium max-w-3xl mx-auto">
              &ldquo;We chose BASE because Jesus came for the masses, not the elite.&rdquo;
            </p>
          </div>

          {/* 3 Advantage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {baseAdvantages.map((adv, i) => {
              const Icon = adv.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#080B12] border border-[#0052FF]/30 hover:border-[#0052FF] transition-all duration-300 space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0052FF]/10 border border-[#0052FF]/30 flex items-center justify-center text-[#60A5FA]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#F5F1E8] uppercase">
                    {adv.title}
                  </h3>
                  <p className="text-sm text-[#F5F1E8]/75 font-sans leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Based Banner */}
          <div className="text-center pt-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0052FF]/20 via-[#0052FF]/10 to-[#D4AF37]/20 border border-[#0052FF]/50 text-base sm:text-lg font-serif font-bold text-[#F5F1E8]">
              <Anchor className="w-5 h-5 text-[#60A5FA]" />
              <span>ÒMEGA is BASE-native. We are <strong className="text-[#60A5FA]">BASED in Christ</strong>.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import React from 'react';
import { Shield, Sparkles, Coins, Gamepad2 } from 'lucide-react';

export default function CoreGameplay() {
  const gameplayColumns = [
    {
      num: "I",
      title: "OWN YOUR SOUL",
      subtitle: "True Digital Ownership",
      icon: Shield,
      gradient: "from-[#D4AF37]/20 to-transparent",
      text: "Your Character, Relic, and Land are dynamic NFTs on BASE. They evolve as you do. What you steward in the game, you own forever. No corporation can delete your legacy.",
    },
    {
      num: "II",
      title: "SURVIVE THE CYCLES",
      subtitle: "AI-Driven Lore",
      icon: Sparkles,
      gradient: "from-[#0052FF]/20 to-transparent",
      text: "The world runs in Cycles. Powered by AI Studios, the world reacts to the choices of the community. Factions rise and fall. Prophecies unfold. At the end of each Cycle, the world resets — but your honor and your on-chain history remain.",
    },
    {
      num: "III",
      title: "KINGDOM ECONOMY",
      subtitle: "Built to Bless",
      icon: Coins,
      gradient: "from-[#10B981]/20 to-transparent",
      text: "Built on BASE to be fair and fast. $ÒMEGA is not a greed token. It’s a stewardship token. Players can stake, trade, battle, and tithe. 10% of all protocol fees automatically fund ABBA DIVINE VISION missions and real-world Kingdom work.",
    },
  ];

  return (
    <section id="game" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>3 PILLARS OF GAMEPLAY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-[#F5F1E8] uppercase tracking-tight">
          CORE GAMEPLAY
        </h2>
        <p className="text-[#F5F1E8]/70 max-w-2xl mx-auto text-sm sm:text-base font-sans">
          Groundbreaking mechanics designed for true digital ownership, community agency, and Kingdom stewardship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {gameplayColumns.map((col, idx) => {
          const Icon = col.icon;
          return (
            <div
              key={idx}
              className="relative rounded-2xl bg-[#090D16] border border-[#D4AF37]/30 p-8 gold-border-glow flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              {/* Subtle Gradient Accent Top */}
              <div className={`absolute inset-x-0 top-0 h-2 rounded-t-2xl bg-gradient-to-r ${col.gradient}`} />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-[#D4AF37] font-mono">
                    {col.num}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#080B12] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#F5F1E8] uppercase tracking-wide">
                    {col.title}
                  </h3>
                  <p className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest mt-1">
                    {col.subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#F5F1E8]/80 font-sans leading-relaxed">
                  {col.text}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F5F1E8]/10 flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase">
                <span>ON-CHAIN VERIFIED</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="text-[#0052FF]">BASE</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

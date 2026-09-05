"use client";

import React from 'react';
import { Sparkles, BookOpen, Crown, Heart, Flame } from 'lucide-react';
import PrayerWall from './PrayerWall';

export default function AbbaDivineVision() {
  const visionPillars = [
    {
      title: "THE VAULT",
      icon: BookOpen,
      desc: "The first on-chain archive of prophetic visions, teachings, and scripture — stored permanently on BASE / IPFS. Uncensorable Word.",
      tag: "ON-CHAIN SCRIPTURE",
    },
    {
      title: "THE TEMPLE",
      icon: Crown,
      desc: "A metaverse sanctuary for prayer, worship, and discipleship. A church without walls, open 24/7.",
      tag: "24/7 METAVERSE SANCTUARY",
    },
    {
      title: "THE TABLE",
      icon: Heart,
      desc: "A launchpad for Christian creators to mint music, art, and films without compromising their faith.",
      tag: "KINGDOM CREATOR LAUNCHPAD",
    },
  ];

  return (
    <section id="abba-vision" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Banner Container */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0D1322] via-[#090D16] to-[#120D08] border border-[#D4AF37]/40 p-8 sm:p-12 lg:p-16 gold-border-glow overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-mono font-bold text-[#F3E5AB] uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>THE SPIRITUAL LAYER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#F5F1E8] uppercase tracking-tight leading-tight">
              ABBA DIVINE VISION
            </h2>

            <p className="text-xl sm:text-2xl font-serif text-[#D4AF37] font-semibold uppercase tracking-wide">
              WE BUILT A GAME. GOD GAVE US A MANDATE.
            </p>

            <p className="text-base sm:text-lg text-[#F5F1E8]/85 font-sans max-w-3xl mx-auto leading-relaxed">
              <strong>ÒMEGA WEB3</strong> exists to please Jesus first. <br />
              <strong className="text-[#D4AF37]">ABBA DIVINE VISION</strong> is the sanctuary inside the ecosystem — the heart that keeps the game pure.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visionPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#080B12]/90 border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#D4AF37] transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="inline-block text-[10px] font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded uppercase tracking-wider">
                      {pillar.tag}
                    </span>

                    <h3 className="text-2xl font-black text-[#F5F1E8] uppercase tracking-tight">
                      {pillar.title}
                    </h3>

                    <p className="text-sm text-[#F5F1E8]/80 font-sans leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Highlight Box */}
          <div className="p-8 rounded-2xl bg-[#080B12] border-2 border-[#D4AF37]/50 text-center space-y-4 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37]">
              OUR COMMITMENT TO KINGDOM EXCELLENCE
            </p>
            <p className="text-xl sm:text-2xl font-serif text-[#F5F1E8] font-bold">
              This is how we please Jesus in Web3:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base font-bold text-[#F3E5AB]">
              <span className="px-4 py-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                Purity Over Profit
              </span>
              <span className="text-[#D4AF37] hidden sm:inline">•</span>
              <span className="px-4 py-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                Ownership Over Addiction
              </span>
              <span className="text-[#D4AF37] hidden sm:inline">•</span>
              <span className="px-4 py-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                Discipleship Over Degen Culture
              </span>
            </div>
          </div>

          {/* ABBA Covenant Prayer Wall: Anonymous Prayer Petitions & Answered Praise Reports */}
          <PrayerWall />

        </div>
      </div>
    </section>
  );
}

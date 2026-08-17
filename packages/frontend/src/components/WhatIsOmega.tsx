"use client";

import React from 'react';
import { Sparkles, Scroll, Cross } from 'lucide-react';

export default function WhatIsOmega() {
  return (
    <section id="lore" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Decorative Gold Frame Accent */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#0D1322] to-[#080B12] p-8 sm:p-12 lg:p-16 gold-border-glow overflow-hidden">
        
        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/60" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/60" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/60" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/60" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Section Header */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
            <Scroll className="w-3.5 h-3.5" />
            <span>WHAT IS ÒMEGA?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F1E8] tracking-tight uppercase leading-tight">
            NOT PLAY-TO-EARN. <br />
            <span className="gold-gradient-text">PLAY-TO-BECOME.</span>
          </h2>

          <div className="space-y-6 text-base sm:text-lg text-[#F5F1E8]/85 font-sans leading-relaxed text-left sm:text-center max-w-3xl mx-auto">
            <p className="text-xl sm:text-2xl font-serif text-[#D4AF37] font-semibold">
              ÒMEGA is not another degen game. It&apos;s the first on-chain world built to honor Jesus.
            </p>

            <p>
              Set after the collapse of the old world, the ÒMEGA Realm is where Survivors awaken to reclaim what was stolen. Built natively on <strong>BASE</strong> for speed, low fees, and true mass adoption, and forged inside AI Studios, ÒMEGA combines cinematic gameplay with eternal truth.
            </p>

            <p>
              We rejected the exploitative Web3 playbook. No predatory loot boxes. No pay-to-win gambling. Just skill, story, and stewardship.
            </p>
          </div>

          {/* Colossians 3:23 Banner */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#090D16] border border-[#D4AF37]/40 shadow-[0_0_25px_rgba(212,175,55,0.15)] relative">
            <div className="flex flex-col items-center gap-3">
              <Cross className="w-6 h-6 text-[#D4AF37]" />
              <blockquote className="font-serif italic text-lg sm:text-xl text-[#F3E5AB] font-medium text-center">
                &ldquo;Whatever you do, work at it with all your heart, as working for the Lord.&rdquo;
              </blockquote>
              <cite className="text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-[#D4AF37]">
                — Colossians 3:23
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

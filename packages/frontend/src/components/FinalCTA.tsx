"use client";

import React from 'react';
import { Shield, Sparkles, Flame } from 'lucide-react';

export default function FinalCTA() {
  const scrollToAlpha = () => {
    const el = document.getElementById('play-alpha');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
      <div className="relative rounded-3xl bg-gradient-to-b from-[#120D08] via-[#090D16] to-[#080B12] border-2 border-[#D4AF37] p-8 sm:p-14 lg:p-20 gold-border-glow overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-mono font-bold text-[#F3E5AB] uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>THE CALL TO SURVIVORS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#F5F1E8] uppercase tracking-tight leading-tight">
            THE REALM IS WAITING. <br />
            <span className="gold-gradient-text drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              THE KING IS CALLING.
            </span>
          </h2>

          <p className="text-xl sm:text-2xl font-serif italic text-[#F3E5AB] max-w-2xl mx-auto">
            This is more than a game. It&apos;s an assignment.
          </p>

          <div className="pt-4">
            <button
              onClick={scrollToAlpha}
              className="px-8 sm:px-12 py-5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B68B3E] text-[#0A0A0A] font-black text-sm sm:text-base uppercase tracking-widest shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:shadow-[0_0_50px_rgba(212,175,55,0.9)] hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-3 cursor-pointer"
            >
              <Shield className="w-6 h-6 text-[#0A0A0A]" />
              <span>ENTER THE ÒMEGA REALM - MINT YOUR SURVIVOR ON BASE</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

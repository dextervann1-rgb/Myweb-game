"use client";

import React from 'react';
import { Shield, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import SurvivorStatus from './SurvivorStatus';

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden bg-pattern-grid">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-[#0052FF]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#090D16] border border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-8 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-[#D4AF37] animate-ping" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
            BUILT ON BASE • FORGED IN AI STUDIOS
          </span>
          <span className="text-xs text-[#0052FF] font-black px-2 py-0.5 rounded bg-[#0052FF]/20 uppercase">
            MAINNET
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#F5F1E8] mb-6 leading-[1.1] uppercase max-w-4xl">
          THE END IS JUST <br className="hidden sm:inline" />
          <span className="gold-gradient-text drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">
            THE BEGINNING.
          </span>
        </h1>

        {/* Sub-headline */}
        <div className="max-w-3xl mx-auto space-y-4 mb-10 text-base sm:text-xl text-[#F5F1E8]/80 font-sans leading-relaxed">
          <p className="font-serif text-[#F5F1E8]/90 font-medium">
            <strong className="text-[#D4AF37] font-serif">ÒMEGA</strong> is a lore-driven survival universe built on <strong className="text-[#60A5FA]">BASE</strong>. Built in AI Studios. Owned by players. Ordained by <strong className="text-[#D4AF37]">ABBA</strong>.
          </p>
          <p className="text-sm sm:text-base font-light italic text-[#C9A86A]/90 tracking-wide">
            Every soul has a role. Every battle is recorded. Every legend is eternal.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-6">
          <button
            onClick={() => scrollTo('play-alpha')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B68B3E] text-[#0A0A0A] font-black text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:shadow-[0_0_45px_rgba(212,175,55,0.8)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Shield className="w-5 h-5 text-[#0A0A0A]" />
            <span>PLAY THE ALPHA</span>
          </button>

          <button
            onClick={() => scrollTo('abba-vision')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#090D16] border border-[#D4AF37]/50 text-[#F5F1E8] font-bold text-sm uppercase tracking-widest hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-[#D4AF37]" />
            <span>READ THE VISION</span>
          </button>
        </div>

        {/* Survivor Status Card with Base Blue Wallet Connect & Mint Button */}
        <SurvivorStatus />

        {/* Chain Badge Under CTA */}
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#090D16]/80 border border-[#F5F1E8]/10 text-xs sm:text-sm font-sans text-[#F5F1E8]/70">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0052FF]" />
            <span>Built on <strong className="text-[#F5F1E8]">Base</strong></span>
          </div>
          <span className="text-[#F5F1E8]/30">•</span>
          <span>Secured by <strong className="text-[#F5F1E8]">Ethereum</strong></span>
          <span className="text-[#F5F1E8]/30">•</span>
          <span className="flex items-center gap-1 text-[#D4AF37] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Powered by Faith
          </span>
        </div>
      </div>
    </section>
  );
}

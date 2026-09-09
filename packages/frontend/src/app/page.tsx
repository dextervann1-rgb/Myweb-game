"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatIsOmega from "@/components/WhatIsOmega";
import CoreGameplay from "@/components/CoreGameplay";
import AbbaDivineVision from "@/components/AbbaDivineVision";
import WhyBase from "@/components/WhyBase";
import CovenantSection from "@/components/CovenantSection";
import RoadmapSection from "@/components/RoadmapSection";
import InteractiveRealm from "@/components/InteractiveRealm";
import LeaderboardSection from "@/components/LeaderboardSection";
import SurvivorStories from "@/components/SurvivorStories";
import PlayerProfileBadgeSystem from "@/components/PlayerProfileBadgeSystem";
import DeployGuideSection from "@/components/DeployGuideSection";
import CompetitionAndSupport from "@/components/CompetitionAndSupport";
import AegisSanctumProMode from "@/components/AegisSanctumProMode";
import PlayerRatingSection from "@/components/PlayerRatingSection";
import DeveloperDossier from "@/components/DeveloperDossier";
import ExecutiveValuationSuite from "@/components/ExecutiveValuationSuite";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MtaasPlayStoreCompliance from "@/components/MtaasPlayStoreCompliance";

export default function Home() {
  const [deepLinkNotification, setDeepLinkNotification] = React.useState<string | null>(null);

  useEffect(() => {
    // Register Service Worker for Play Store & PWA offline caching
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('ÒMEGA Service Worker registered with scope:', reg.scope);
        })
        .catch((err) => {
          console.log('Service Worker registration skipped:', err);
        });
    }

    // Check for Deep Link Wallet Return (omega://wallet-return or URL query parameters)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('wallet') === 'return' || window.location.hash.includes('wallet-return')) {
        setDeepLinkNotification('omega://wallet-return • Web3 Sovereign Session Re-established with Base L2!');
      }

      // Listen for custom app deep link event
      const handleCustomDeepLink = (e: CustomEvent<{ url: string }>) => {
        setDeepLinkNotification(`Deep link received: ${e.detail.url}`);
      };
      window.addEventListener('omega:deeplink' as any, handleCustomDeepLink as EventListener);
      return () => {
        window.removeEventListener('omega:deeplink' as any, handleCustomDeepLink as EventListener);
      };
    }
  }, []);

  const scrollToAlpha = () => {
    const element = document.getElementById('play-alpha');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080B12] text-[#F5F1E8] selection:bg-[#D4AF37] selection:text-[#0A0A0A]">
      {/* Navigation Header */}
      <Navbar onEnterRealm={scrollToAlpha} />

      {deepLinkNotification && (
        <div className="mx-4 sm:mx-8 mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#D4AF37]/20 via-[#0052FF]/20 to-[#10B981]/20 border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-between gap-4 font-mono text-xs animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping shrink-0" />
            <div>
              <span className="text-[#D4AF37] font-black uppercase block text-[11px]">
                ⚡ ANDROID NATIVE DEEP LINK INTERCEPTED
              </span>
              <span className="text-white font-bold">{deepLinkNotification}</span>
            </div>
          </div>
          <button
            onClick={() => setDeepLinkNotification(null)}
            className="px-3 py-1 rounded-lg bg-black/60 hover:bg-black text-[#F5F1E8] border border-white/20 text-[10px] uppercase font-bold cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      <main className="flex-1 space-y-8 sm:space-y-16 pb-16">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. What is ÒMEGA */}
        <WhatIsOmega />

        {/* 3. Core Gameplay */}
        <CoreGameplay />

        {/* 4. ABBA Divine Vision */}
        <AbbaDivineVision />

        {/* 5. Why BASE */}
        <WhyBase />

        {/* 6. How We Please Jesus - Our Covenant */}
        <CovenantSection />

        {/* 7. Roadmap */}
        <RoadmapSection />

        {/* Interactive Alpha & Survivor Minting Realm Terminal */}
        <InteractiveRealm />

        {/* Top 10 Survivors Leaderboard & Reward Tiers */}
        <LeaderboardSection />

        {/* Community Survivor Chronicles (Horizontal Scroll Layout) */}
        <SurvivorStories />

        {/* Dynamic Player Profile & Real-Time Badge System (Stories & Leaderboard Unlocks) */}
        <PlayerProfileBadgeSystem />

        {/* Divine Vine Base Deployment Masterclass */}
        <DeployGuideSection />

        {/* Competition Blueprint, Price Tiers & Issue Contact */}
        <CompetitionAndSupport />

        {/* Aegis Sanctum Pro Mode & Army of AI Agents */}
        <AegisSanctumProMode />

        {/* Player Rating & Community Pilgrim Reviews */}
        <PlayerRatingSection />

        {/* Executive Sovereign Developer Dossier, Skill Set, Vision & Legal Bio */}
        <DeveloperDossier />

        {/* Executive CTR IP Valuation, VFV Invoice, Court Deck & 0-3 Year Scalability Waterfall */}
        <ExecutiveValuationSuite />

        {/* 8. Final CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* MTaaS & Google Play Store Compliance Inspector */}
      <MtaasPlayStoreCompliance />
    </div>
  );
}

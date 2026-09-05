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
import DeployGuideSection from "@/components/DeployGuideSection";
import CompetitionAndSupport from "@/components/CompetitionAndSupport";
import AegisSanctumProMode from "@/components/AegisSanctumProMode";
import PlayerRatingSection from "@/components/PlayerRatingSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MtaasPlayStoreCompliance from "@/components/MtaasPlayStoreCompliance";

export default function Home() {
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

        {/* Divine Vine Base Deployment Masterclass */}
        <DeployGuideSection />

        {/* Competition Blueprint, Price Tiers & Issue Contact */}
        <CompetitionAndSupport />

        {/* Aegis Sanctum Pro Mode & Army of AI Agents */}
        <AegisSanctumProMode />

        {/* Player Rating & Community Pilgrim Reviews */}
        <PlayerRatingSection />

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

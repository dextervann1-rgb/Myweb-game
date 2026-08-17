"use client";

import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Shield, Sparkles, Menu, X, Wallet, ChevronRight, Trophy, Star } from 'lucide-react';
import SurvivorStatusBadge from './SurvivorStatusBadge';

interface NavbarProps {
  onEnterRealm?: () => void;
}

export default function Navbar({ onEnterRealm }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080B12]/90 backdrop-blur-md border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8A6A1C] p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <div className="w-full h-full bg-[#090D16] rounded-[7px] flex items-center justify-center">
              <span className="text-[#D4AF37] font-bold text-xl tracking-tighter">Ω</span>
            </div>
          </div>
          <div>
            <span className="text-2xl font-black tracking-wider text-[#F5F1E8] group-hover:text-[#D4AF37] transition-colors">
              ÒMEGA
            </span>
            <span className="block text-[10px] text-[#0052FF] font-sans font-semibold uppercase tracking-widest -mt-1">
              On BASE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider text-[#F5F1E8]/80">
          <button 
            onClick={() => handleNavClick('game')} 
            className="hover:text-[#D4AF37] transition-colors cursor-pointer uppercase"
          >
            GAME
          </button>
          <button 
            onClick={() => handleNavClick('abba-vision')} 
            className="hover:text-[#D4AF37] transition-colors cursor-pointer uppercase flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            ABBA DIVINE VISION
          </button>
          <button 
            onClick={() => handleNavClick('lore')} 
            className="hover:text-[#D4AF37] transition-colors cursor-pointer uppercase"
          >
            LORE
          </button>
          <button 
            onClick={() => handleNavClick('covenant')} 
            className="hover:text-[#D4AF37] transition-colors cursor-pointer uppercase"
          >
            COVENANT
          </button>
          <button 
            onClick={() => handleNavClick('roadmap')} 
            className="hover:text-[#D4AF37] transition-colors cursor-pointer uppercase"
          >
            ROADMAP
          </button>
          <button 
            onClick={() => handleNavClick('leaderboard')} 
            className="hover:text-[#D4AF37] transition-colors cursor-pointer uppercase flex items-center gap-1"
          >
            <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" />
            LEADERBOARD
          </button>
          <button 
            onClick={() => handleNavClick('aegis-sanctum')} 
            className="hover:text-[#60A5FA] text-[#60A5FA] font-bold transition-colors cursor-pointer uppercase flex items-center gap-1"
          >
            <Shield className="w-3.5 h-3.5" />
            AEGIS SANCTUM
          </button>
          <button 
            onClick={() => handleNavClick('game-ratings')} 
            className="hover:text-[#D4AF37] text-[#D4AF37] font-bold transition-colors cursor-pointer uppercase flex items-center gap-1"
          >
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
            RATINGS
          </button>
          <button 
            onClick={() => handleNavClick('deploy-guide')} 
            className="hover:text-[#D4AF37] text-[#D4AF37] font-bold transition-colors cursor-pointer uppercase flex items-center gap-1"
          >
            <Shield className="w-3.5 h-3.5" />
            DIVINE VINE
          </button>
          <button 
            onClick={() => handleNavClick('contact-support')} 
            className="hover:text-[#60A5FA] text-[#F5F1E8]/70 transition-colors cursor-pointer uppercase text-xs"
          >
            SUPPORT
          </button>
        </nav>

        {/* Right CTA Button & Wallet Status */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Dynamic Survivor Status Badge */}
          <SurvivorStatusBadge />

          {isConnected ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-[#0052FF]/10 text-[#60A5FA] border border-[#0052FF]/30 truncate max-w-[130px]">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="text-xs text-red-400 hover:text-red-300 font-sans tracking-wide transition-colors"
              >
                Disconnect
              </button>
            </div>
          ) : null}

          <button
            onClick={() => {
              if (onEnterRealm) onEnterRealm();
              handleNavClick('play-alpha');
            }}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B68B3E] text-[#0A0A0A] font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] hover:scale-105 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
          >
            <Shield className="w-4 h-4" />
            <span>ENTER REALM</span>
          </button>
        </div>

        {/* Mobile menu hamburger button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F5F1E8] hover:text-[#D4AF37] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090D16] border-b border-[#D4AF37]/30 px-6 py-6 flex flex-col gap-4 text-sm font-bold tracking-wider">
          <button
            onClick={() => handleNavClick('game')}
            className="text-left py-2 text-[#F5F1E8] hover:text-[#D4AF37] transition-colors border-b border-[#F5F1E8]/10"
          >
            GAME
          </button>
          <button
            onClick={() => handleNavClick('abba-vision')}
            className="text-left py-2 text-[#D4AF37] hover:text-[#F3E5AB] transition-colors border-b border-[#F5F1E8]/10 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> ABBA DIVINE VISION
          </button>
          <button
            onClick={() => handleNavClick('lore')}
            className="text-left py-2 text-[#F5F1E8] hover:text-[#D4AF37] transition-colors border-b border-[#F5F1E8]/10"
          >
            LORE
          </button>
          <button
            onClick={() => handleNavClick('covenant')}
            className="text-left py-2 text-[#F5F1E8] hover:text-[#D4AF37] transition-colors border-b border-[#F5F1E8]/10"
          >
            COVENANT
          </button>
          <button
            onClick={() => handleNavClick('roadmap')}
            className="text-left py-2 text-[#F5F1E8] hover:text-[#D4AF37] transition-colors border-b border-[#F5F1E8]/10"
          >
            ROADMAP
          </button>
          <button
            onClick={() => handleNavClick('leaderboard')}
            className="text-left py-2 text-[#D4AF37] hover:text-[#F3E5AB] transition-colors border-b border-[#F5F1E8]/10 flex items-center gap-2"
          >
            <Trophy className="w-4 h-4 text-[#D4AF37]" /> LEADERBOARD & REWARDS
          </button>
          <button
            onClick={() => handleNavClick('aegis-sanctum')}
            className="text-left py-2 text-[#60A5FA] hover:text-[#93C5FD] transition-colors border-b border-[#F5F1E8]/10 flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-[#60A5FA]" /> AEGIS SANCTUM (PRO MODE & AI AGENTS)
          </button>
          <button
            onClick={() => handleNavClick('game-ratings')}
            className="text-left py-2 text-[#D4AF37] hover:text-[#F3E5AB] transition-colors border-b border-[#F5F1E8]/10 flex items-center gap-2"
          >
            <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" /> PILGRIM RATINGS & REVIEWS
          </button>
          <button
            onClick={() => handleNavClick('deploy-guide')}
            className="text-left py-2 text-[#D4AF37] hover:text-[#F3E5AB] transition-colors border-b border-[#F5F1E8]/10 flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-[#D4AF37]" /> DIVINE VINE
          </button>
          <div className="pt-2 flex flex-col gap-3">
            <div className="flex justify-center pb-1">
              <SurvivorStatusBadge />
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onEnterRealm) onEnterRealm();
                handleNavClick('play-alpha');
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#9A7B22] text-[#0A0A0A] font-extrabold text-xs uppercase tracking-widest text-center shadow-lg flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" /> ENTER THE REALM
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

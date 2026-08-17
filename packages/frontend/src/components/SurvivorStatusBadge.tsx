"use client";

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Shield, Sparkles, Flame, CheckCircle2, User, Trophy, ArrowRight } from 'lucide-react';

interface SurvivorStatusProps {
  hasMintedNFT?: boolean;
}

export default function SurvivorStatusBadge({ hasMintedNFT = false }: SurvivorStatusProps) {
  const { address, isConnected } = useAccount();
  const [mintedState, setMintedState] = useState(false);

  // Check local storage or props for persistent mint state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedMint = localStorage.getItem('omega_minted_survivor');
      if (storedMint === 'true' || hasMintedNFT) {
        setMintedState(true);
      }
    }
  }, [hasMintedNFT]);

  const scrollToRealm = () => {
    const el = document.getElementById('play-alpha');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // State 3: Wallet Connected + Survivor Minted (SEALED ON BASE)
  if (isConnected && mintedState) {
    return (
      <div 
        onClick={scrollToRealm}
        className="cursor-pointer group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/25 via-[#F3E5AB]/15 to-[#D4AF37]/25 border border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.7)] transition-all duration-300"
        title="Survivor Sealed on Base Mainnet"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
        </span>
        <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-black text-[#F3E5AB] uppercase tracking-wider">
              SURVIVOR SEALED
            </span>
            <span className="text-[9px] font-mono bg-[#10B981]/20 text-[#10B981] px-1 rounded font-bold">
              CYCLE 0
            </span>
          </div>
        </div>
      </div>
    );
  }

  // State 2: Wallet Connected + Ready to Mint (UNSEALED SURVIVOR)
  if (isConnected) {
    return (
      <div 
        onClick={scrollToRealm}
        className="cursor-pointer group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0052FF]/15 border border-[#0052FF]/50 shadow-[0_0_10px_rgba(0,82,255,0.2)] hover:border-[#60A5FA] transition-all duration-300"
        title="Wallet Connected - Mint to Seal Survivor"
      >
        <span className="relative flex h-2 w-2">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60A5FA]"></span>
        </span>
        <User className="w-3.5 h-3.5 text-[#60A5FA]" />
        <div className="text-left">
          <span className="text-[10px] font-mono font-bold text-[#60A5FA] uppercase tracking-wider block">
            PILGRIM • READY TO SEAL
          </span>
        </div>
        <ArrowRight className="w-3 h-3 text-[#60A5FA] group-hover:translate-x-0.5 transition-transform" />
      </div>
    );
  }

  // State 1: Guest / Not Connected (VISITOR)
  return (
    <div 
      onClick={scrollToRealm}
      className="cursor-pointer group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#080B12] border border-[#F5F1E8]/20 hover:border-[#D4AF37]/50 transition-all duration-300"
      title="Visitor Mode - Connect Wallet to Seal Status"
    >
      <span className="h-2 w-2 rounded-full bg-[#F5F1E8]/40" />
      <span className="text-[10px] font-mono text-[#F5F1E8]/70 uppercase tracking-wider">
        GUEST STATUS • UNLINKED
      </span>
      <span className="text-[9px] font-mono text-[#D4AF37] group-hover:underline">
        CONNECT →
      </span>
    </div>
  );
}

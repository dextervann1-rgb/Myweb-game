"use client";

import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#D4AF37]/20 bg-[#080B12] text-[#F5F1E8]/70 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-8 text-center">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-[#F5F1E8] tracking-wider">ÒMEGA</span>
            <span className="text-xs font-mono font-bold text-[#0052FF] bg-[#0052FF]/10 px-2 py-0.5 rounded uppercase">
              BASE NATIVE
            </span>
          </div>
          <p className="text-xs font-serif text-[#D4AF37]">
            © 2026 ÒMEGA WEB3 | Built on Base | Built to Glorify ABBA
          </p>
        </div>

        {/* Social & Resource Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase font-semibold text-[#F5F1E8]/80">
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
          >
            Twitter <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-[#F5F1E8]/20">•</span>
          <a
            href="https://farcaster.xyz"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
          >
            Farcaster <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-[#F5F1E8]/20">•</span>
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
          >
            Discord <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-[#F5F1E8]/20">•</span>
          <a
            href="#lore"
            className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
          >
            Whitepaper <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Subline */}
        <div className="pt-4 border-t border-[#F5F1E8]/10 w-full max-w-xl text-center">
          <p className="text-xs font-serif italic opacity-75">
            Est. by Abba — Stewarded by Vann Family
          </p>
        </div>

      </div>
    </footer>
  );
}

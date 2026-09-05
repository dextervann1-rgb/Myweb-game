"use client";

import React from 'react';
import { ExternalLink, Sparkles, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

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
            <span className="text-xs font-mono font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded uppercase flex items-center gap-1 border border-[#10B981]/30">
              <CheckCircle2 className="w-3 h-3" /> PLAY STORE MTaaS COMPLIANT
            </span>
          </div>
          <p className="text-xs font-serif text-[#D4AF37]">
            © 2026 ÒMEGA WEB3 | Built on Base | Ordained by ABBA | Stewarded by Vann Family
          </p>
          <p className="text-[11px] font-mono text-[#F5F1E8]/50">
            Package ID: <code className="text-[#60A5FA]">com.abbadivinevision.omega</code> • Target SDK 36 • Zero Broad Storage Permissions
          </p>
        </div>

        {/* Play Store & Developer Policy Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono uppercase font-semibold text-[#F5F1E8]/80">
          <a
            href="#survivor-stories"
            className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
          >
            Survivor Chronicles
          </a>
          <span className="text-[#F5F1E8]/20">•</span>
          <a
            href="#abba-vision"
            className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
          >
            Abba Divine Vision
          </a>
          <span className="text-[#F5F1E8]/20">•</span>
          <a
            href="mailto:support@vannfamilyventures.com"
            className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-[#60A5FA]"
          >
            Support: support@vannfamilyventures.com
          </a>
        </div>

        {/* Social & Resource Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase font-semibold text-[#F5F1E8]/60">
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
        </div>

        {/* Subline */}
        <div className="pt-4 border-t border-[#F5F1E8]/10 w-full max-w-2xl text-center space-y-1">
          <p className="text-xs font-serif italic opacity-75">
            Est. by Abba — Stewarded by Vann Family Ventures LLC under VannÐiamond Palladium Standard
          </p>
          <p className="text-[10px] font-mono text-[#F5F1E8]/40">
            Compliant with Google Play Developer Program Policies: Privacy Policy • Non-Custodial Security • User Data Deletion Enabled
          </p>
        </div>

      </div>
    </footer>
  );
}

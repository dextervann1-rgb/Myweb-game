"use client";

import React from 'react';
import { ExternalLink, Sparkles, ShieldCheck, Lock, FileText, CheckCircle2, Crown, Heart, Scale } from 'lucide-react';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

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

        {/* Play Store, Developer Dossier & Developer Policy Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono uppercase font-semibold text-[#F5F1E8]/80">
          <a
            href="#developer-dossier"
            className="hover:text-[#D4AF37] text-[#D4AF37] transition-colors flex items-center gap-1 font-bold"
          >
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            Developer Bio &amp; Skills
          </a>
          <span className="text-[#F5F1E8]/20">•</span>
          <a
            href="#executive-valuation-suite"
            className="hover:text-white text-[#10B981] transition-colors flex items-center gap-1 font-bold"
          >
            <Scale className="w-3.5 h-3.5 text-[#10B981]" />
            CTR IP Valuation &amp; Invoice
          </a>
          <span className="text-[#F5F1E8]/20">•</span>
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

        {/* GitHub dextervann1-rgb & Social / Resource Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase font-semibold text-[#F5F1E8]/70">
          <a
            href="https://github.com/dextervann1-rgb"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#D4AF37] text-white transition-colors flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/15"
          >
            <GithubIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
            GitHub: dextervann1-rgb <ExternalLink className="w-3 h-3 text-white/50" />
          </a>
          <span className="text-[#F5F1E8]/20">•</span>
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

        {/* Developer Level & Divine Dedication */}
        <div className="p-3.5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 max-w-xl text-center space-y-1">
          <p className="text-xs font-mono text-[#F3E5AB] font-bold uppercase flex items-center justify-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            OVERALL DEVELOPER LEVEL: PALLADIUM GRANDMASTER (TIER 100)
          </p>
          <p className="text-xs font-serif italic text-[#D4AF37] flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
            "For from Him and through Him and for Him are all things. To Him be the glory forever. <span className="font-bold not-italic font-sans text-white">Thank you Jesus.</span>"
          </p>
        </div>

        {/* Company Legal Footer & Foundation Age */}
        <div className="pt-4 border-t border-[#F5F1E8]/10 w-full max-w-3xl text-center space-y-1.5 font-mono">
          <p className="text-xs text-[#F5F1E8]/80">
            Company: <strong className="text-white">Vann Family Ventures LLC</strong> • Est. <strong className="text-[#D4AF37]">6/9/2026</strong> • Chief Architect: <span className="text-[#60A5FA]">Dexter Lamar Vann (VannTheVisionaryAI)</span>
          </p>
          <p className="text-[11px] text-[#F5F1E8]/60">
            Governed under the VannÐiamond Palladium Standard • Official Legal/Inquiries: <a href="mailto:support@vannfamilyventures.com" className="text-[#60A5FA] underline">support@vannfamilyventures.com</a>
          </p>
          <p className="text-[10px] text-[#F5F1E8]/40">
            Google Play MTaaS Policy Compliant: Non-Custodial Architecture • Zero Broad Storage Permissions • Target SDK 36
          </p>
        </div>

      </div>
    </footer>
  );
}

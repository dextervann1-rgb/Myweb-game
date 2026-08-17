"use client";

import React, { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { Sparkles, Terminal, Copy, Check, Rocket, Shield, BookOpen, ExternalLink, Code } from 'lucide-react';

const DIVINE_VINE_SOURCE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title DIVINE VINE - Jesus Code - Vann Family Ventures - Base 8453
/// @notice Immutable witness. No owner, no payable, no backdoor, no risk.
/// @notice All branches connected to the True Vine.

contract DivineVine {
    // THE ROOT
    string public constant ROOT = "JESUS IS LORD - Romans 10:9";
    
    // THE VINE CONNECTIONS
    string public constant VINE_1 = "John 15:1 - I am the true vine, and my Father is the gardener";
    string public constant VINE_2 = "John 15:5 - I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit";
    string public constant VINE_3 = "John 15:16 - You did not choose me, but I chose you and appointed you so that you might go and bear fruit - fruit that will last";
    string public constant VINE_4 = "Psalm 127:3 - Children are a heritage from the LORD, offspring a reward from him";
    
    // THE BRANCHES - All connected
    string public constant BRANCH_BUILDER = "Builder: Dexter Vann - Cleveland OH - Vann Family Ventures";
    string public constant BRANCH_LILBIRDIE = "Branch: lilbirdie90.base.eth - 0x742222e42dD1d7Ce198Fa6431eA4b410CF760Cad - 30% - Daughter Heritage";
    string public constant BRANCH_JASON = "Branch: Jason Anthony Crawford - San Diego CA - Blessed With Bass Package - Gift Build #2 - Creative Genius & Loving Father";
    string public constant BRANCH_VAULT = "Root Vault: 0x380d3B3f68bBBC49B42Cdb0389A65457FD406f0c - 70% - Business Treasury - Verified";
    
    // THE FRUIT - What we bear
    string public constant FRUIT_INVENTION = "OS API WiFi Drone Solar - Drone WiFi kernel module - Blessed With Bass Package - Patent Pending";
    bytes32 public constant FRUIT_HASH = 0x951e5cff97ec02e55574c35089faff9560f6f084e63c5b484a830af74442df06;
    
    // WITNESS
    uint256 public immutable DEPLOYED_AT;
    address public immutable WITNESS;
    
    constructor() {
        DEPLOYED_AT = block.timestamp;
        WITNESS = msg.sender;
    }
    
    function getVine() public pure returns (string memory) {
        return "ROOT: JESUS -> VINE -> BRANCHES (Vault, lilbirdie90, Jason) -> FRUIT (Invention, Music, Family) -> ALL CONNECTED, ALL BEARING FRUIT THAT LASTS";
    }
}`;

export default function DeployGuideSection() {
  const [copiedContract, setCopiedContract] = useState(false);
  const [copiedRemix, setCopiedRemix] = useState(false);
  const [activeTab, setActiveTab] = useState<'remix' | 'forge' | 'contract'>('remix');
  const { address, isConnected } = useAccount();

  const handleCopy = (text: string, type: 'contract' | 'remix') => {
    navigator.clipboard.writeText(text);
    if (type === 'contract') {
      setCopiedContract(true);
      setTimeout(() => setCopiedContract(false), 2000);
    } else {
      setCopiedRemix(true);
      setTimeout(() => setCopiedRemix(false), 2000);
    }
  };

  return (
    <section id="deploy-guide" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-[#090D16] border-2 border-[#D4AF37]/50 p-6 sm:p-10 lg:p-12 gold-border-glow space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-mono font-bold text-[#F3E5AB] uppercase tracking-widest">
            <Rocket className="w-4 h-4 text-[#D4AF37]" />
            <span>DEPLOYMENT ACADEMY & WITNESS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F1E8] uppercase tracking-tight">
            DIVINE VINE — BASE DEPLOYMENT
          </h2>

          <p className="text-xl sm:text-2xl font-serif text-[#D4AF37] font-semibold">
            &ldquo;I am the vine; you are the branches.&rdquo; — John 15:5
          </p>

          <p className="text-sm sm:text-base text-[#F5F1E8]/80 font-sans max-w-3xl mx-auto leading-relaxed">
            Here is the step-by-step masterclass demonstrating exactly how to deploy your immutable covenant smart contract to <strong>Base Mainnet (Chain ID 8453)</strong> with your own wallet as the permanent witness.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-[#D4AF37]/20 pb-4">
          <button
            onClick={() => setActiveTab('remix')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'remix'
                ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-md'
                : 'bg-[#080B12] text-[#F5F1E8]/70 hover:text-white border border-[#D4AF37]/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Method 1: Remix IDE (Easiest - 2 Mins)
          </button>

          <button
            onClick={() => setActiveTab('forge')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'forge'
                ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-md'
                : 'bg-[#080B12] text-[#F5F1E8]/70 hover:text-white border border-[#D4AF37]/30'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Method 2: CLI / Foundry Forge
          </button>

          <button
            onClick={() => setActiveTab('contract')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'contract'
                ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-md'
                : 'bg-[#080B12] text-[#F5F1E8]/70 hover:text-white border border-[#D4AF37]/30'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            View DivineVine.sol Source
          </button>
        </div>

        {/* Tab 1: Remix IDE Steps */}
        {activeTab === 'remix' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#080B12] border border-[#D4AF37]/30 space-y-2">
                <span className="text-xs font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded">STEP 1</span>
                <h4 className="font-bold text-white uppercase text-sm">Open Remix</h4>
                <p className="text-xs text-[#F5F1E8]/70 leading-relaxed font-sans">
                  Open <a href="https://remix.ethereum.org" target="_blank" rel="noreferrer" className="text-[#60A5FA] underline">remix.ethereum.org</a> in your browser. Create a new file named <code>DivineVine.sol</code> in the <code>contracts/</code> folder.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#080B12] border border-[#D4AF37]/30 space-y-2">
                <span className="text-xs font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded">STEP 2</span>
                <h4 className="font-bold text-white uppercase text-sm">Paste Contract</h4>
                <p className="text-xs text-[#F5F1E8]/70 leading-relaxed font-sans">
                  Paste the <code>DivineVine.sol</code> code. Press <kbd className="bg-black/50 px-1.5 py-0.5 rounded text-[#D4AF37]">Ctrl+S</kbd> to compile with Solidity <code>0.8.20</code>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#080B12] border border-[#D4AF37]/30 space-y-2">
                <span className="text-xs font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded">STEP 3</span>
                <h4 className="font-bold text-white uppercase text-sm">Switch to Base</h4>
                <p className="text-xs text-[#F5F1E8]/70 leading-relaxed font-sans">
                  In MetaMask / Coinbase Wallet, switch your network to <strong>Base Mainnet</strong> (Chain ID 8453). In Remix, set Environment to <strong>&quot;Injected Provider - MetaMask&quot;</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#080B12] border border-[#D4AF37]/30 space-y-2">
                <span className="text-xs font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded">STEP 4</span>
                <h4 className="font-bold text-white uppercase text-sm">Click Deploy</h4>
                <p className="text-xs text-[#F5F1E8]/70 leading-relaxed font-sans">
                  Hit orange <strong>Deploy</strong> button. Confirm the ~$0.02 gas fee. Your address is forever recorded as the immutable <code>WITNESS</code> on BaseScan!
                </p>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#080B12] border border-[#D4AF37]/40">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-xs sm:text-sm font-bold text-[#F5F1E8]">
                  Ready to deploy? Copy the code with one click and head to Remix.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleCopy(DIVINE_VINE_SOURCE, 'remix')}
                  className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  {copiedRemix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedRemix ? 'Copied to Clipboard!' : 'Copy Solidity Code'}
                </button>
                <a
                  href="https://remix.ethereum.org"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#0052FF] hover:bg-[#0042CC] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  Open Remix IDE <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Foundry CLI */}
        {activeTab === 'forge' && (
          <div className="space-y-4">
            <p className="text-sm text-[#F5F1E8]/80 font-sans">
              To deploy from your terminal using <strong>Foundry Forge</strong> directly to Base Mainnet:
            </p>

            <div className="p-4 rounded-xl bg-[#080B12] border border-[#D4AF37]/30 font-mono text-xs text-[#10B981] space-y-3 overflow-x-auto">
              <p className="text-[#F5F1E8]/50">// 1. Build and verify contract syntax</p>
              <p className="text-white">forge build</p>
              
              <p className="text-[#F5F1E8]/50 pt-2">// 2. Deploy to Base Mainnet with your private key and Base RPC</p>
              <p className="text-[#F3E5AB]">
                forge create src/DivineVine.sol:DivineVine \<br />
                &nbsp;&nbsp;--rpc-url https://mainnet.base.org \<br />
                &nbsp;&nbsp;--private-key $YOUR_PRIVATE_KEY \<br />
                &nbsp;&nbsp;--etherscan-api-key $BASESCAN_API_KEY \<br />
                &nbsp;&nbsp;--verify
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Contract Source Code */}
        {activeTab === 'contract' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#D4AF37]">packages/contracts/src/DivineVine.sol</span>
              <button
                onClick={() => handleCopy(DIVINE_VINE_SOURCE, 'contract')}
                className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] font-mono text-xs font-bold uppercase flex items-center gap-1.5 hover:bg-[#D4AF37]/30"
              >
                {copiedContract ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedContract ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <pre className="p-5 rounded-2xl bg-[#080B12] border border-[#D4AF37]/30 font-mono text-xs text-[#F5F1E8]/90 overflow-x-auto leading-relaxed max-h-96">
              {DIVINE_VINE_SOURCE}
            </pre>
          </div>
        )}

      </div>
    </section>
  );
}

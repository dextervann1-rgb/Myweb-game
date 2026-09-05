"use client";

import React, { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useWriteContract, useReadContract } from 'wagmi';
import { Shield, Wallet, Sparkles, CheckCircle2, Flame, ArrowRight, Loader2, Award } from 'lucide-react';

const GAME_CONTRACT_ABI = [
  {
    type: 'function',
    name: 'updateScore',
    inputs: [{ name: '_score', type: 'uint256' }],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'score',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'playFee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  }
] as const;

const GAME_CONTRACT_ADDRESS = '0x8f3Cf7ad23Cd3CaDbD9735AFF958023D60c2d460' as const;

export default function SurvivorStatus() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract, isPending: isMinting, data: txHash } = useWriteContract();

  const [hasMinted, setHasMinted] = useState(false);

  const { data: playFee } = useReadContract({
    address: GAME_CONTRACT_ADDRESS,
    abi: GAME_CONTRACT_ABI,
    functionName: 'playFee',
  });

  const formattedFee = playFee ? (Number(playFee) / 1e18).toFixed(4) : '0.0001';

  // Check persistent minting state in local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('omega_minted_survivor');
      if (stored === 'true' || txHash) {
        setHasMinted(true);
      }
    }
  }, [txHash]);

  const handleMintSurvivor = () => {
    if (!playFee) return;
    try {
      writeContract({
        address: GAME_CONTRACT_ADDRESS,
        abi: GAME_CONTRACT_ABI,
        functionName: 'updateScore',
        args: [BigInt(100)],
        value: playFee,
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('omega_minted_survivor', 'true');
        setHasMinted(true);
      }
    } catch (err) {
      console.error('Mint error:', err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6 p-4 sm:p-5 rounded-2xl bg-[#090D16]/95 border-2 border-[#0052FF]/60 shadow-[0_0_25px_rgba(0,82,255,0.25)] backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Status Info & Network Indicator */}
        <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
          <div className="w-12 h-12 rounded-xl bg-[#0052FF]/20 border border-[#0052FF] flex items-center justify-center text-[#60A5FA] shrink-0 shadow-[0_0_12px_rgba(0,82,255,0.4)]">
            {hasMinted && isConnected ? (
              <Shield className="w-6 h-6 text-[#D4AF37]" />
            ) : isConnected ? (
              <Sparkles className="w-6 h-6 text-[#60A5FA]" />
            ) : (
              <Wallet className="w-6 h-6 text-[#60A5FA]" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-[#60A5FA] uppercase tracking-wider bg-[#0052FF]/20 px-2 py-0.5 rounded border border-[#0052FF]/40">
                BASE 8453
              </span>
              <span className="text-xs font-mono font-extrabold text-[#F5F1E8] uppercase">
                SURVIVOR STATUS
              </span>
            </div>

            <div className="mt-0.5">
              {isConnected ? (
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse"></span>
                  <span className="text-white font-bold">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                  <span className="text-[#F5F1E8]/50">•</span>
                  <span className={hasMinted ? "text-[#D4AF37] font-bold" : "text-[#60A5FA] font-medium"}>
                    {hasMinted ? "SEALED SURVIVOR" : "UNMINTED"}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-[#F5F1E8]/70 font-sans">
                  Wallet Disconnected • Link wallet to mint Survivor on Base
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Action Button (Connect with Base Blue or Mint) */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {!isConnected ? (
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {connectors.slice(0, 2).map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  disabled={isConnecting}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0042CC] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(0,82,255,0.5)] hover:shadow-[0_0_20px_rgba(0,82,255,0.8)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Wallet className="w-4 h-4 text-white" />
                  <span>Connect Wallet</span>
                </button>
              ))}
            </div>
          ) : !hasMinted ? (
            <button
              onClick={handleMintSurvivor}
              disabled={isMinting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B68B3E] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-[#0A0A0A] font-mono text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:shadow-[0_0_30px_rgba(212,175,55,0.8)] flex items-center justify-center gap-2 cursor-pointer"
            >
              {isMinting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#0A0A0A]" />
                  <span>MINTING ON BASE...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 text-[#0A0A0A]" />
                  <span>MINT INITIAL SURVIVOR ({formattedFee} ETH)</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] font-mono text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>NFT MINTED</span>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('player-profile-badges');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-mono text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>BADGES</span>
              </button>
              <button
                onClick={() => disconnect()}
                className="text-[10px] font-mono text-[#F5F1E8]/50 hover:text-red-400 underline transition-colors px-1"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Transaction hash notice if available */}
      {txHash && (
        <div className="mt-3 pt-3 border-t border-[#0052FF]/30 text-center">
          <p className="text-[11px] font-mono text-[#10B981]">
            ✓ Survivor Mint Confirmed on Base!{' '}
            <a
              href={`https://basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
              className="underline text-[#60A5FA] ml-1"
            >
              View on BaseScan ↗
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

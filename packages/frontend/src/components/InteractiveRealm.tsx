"use client";

import React, { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useWriteContract, useReadContract } from 'wagmi';
import { Shield, Swords, Terminal, Wallet, Sparkles, Check, Flame, Trophy, PartyPopper } from 'lucide-react';
import DynamicDexDashboard from './DynamicDexDashboard';
import GoldConfettiCelebration from './GoldConfettiCelebration';

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

const SURVIVOR_CLASSES = [
  {
    id: 'warrior',
    name: 'WARRIOR',
    role: 'Frontline Dominion',
    desc: 'Brave defenders of truth. Master of physical and spiritual weaponry in the Cycles.',
    perk: '+15% Battle Honor',
    icon: Swords,
  },
  {
    id: 'steward',
    name: 'STEWARD',
    role: 'Kingdom Economy',
    desc: 'Faithful managers of resources and land. Multiplies tithes and protocol yields.',
    perk: '+20% Kingdom Yield',
    icon: Shield,
  },
  {
    id: 'sentinel',
    name: 'SENTINEL',
    role: 'Sanctuary Guard',
    desc: 'Keepers of the Vault and Temple. Shields the community against deception.',
    perk: '+25% Defense Aura',
    icon: Flame,
  },
  {
    id: 'psalmist',
    name: 'PSALMIST',
    role: 'Prophetic Lore',
    desc: 'Worshippers and creators. Unlocks divine insights and creative launchpads.',
    perk: '+30% Vision Resonance',
    icon: Sparkles,
  },
];

export default function InteractiveRealm() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract, isPending, data: hash, error } = useWriteContract();

  const [selectedClass, setSelectedClass] = useState<string>('warrior');
  const [newScoreInput, setNewScoreInput] = useState<string>('100');
  const [celebrationActive, setCelebrationActive] = useState<boolean>(false);
  const [simulatedTxHash, setSimulatedTxHash] = useState<string | null>(null);

  const selectedSurvivorClass = SURVIVOR_CLASSES.find((c) => c.id === selectedClass) || SURVIVOR_CLASSES[0];

  // Auto-trigger celebratory gold confetti shower when transaction hash is confirmed
  useEffect(() => {
    if (hash) {
      setCelebrationActive(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('omega_minted_survivor', 'true');
      }
    }
  }, [hash]);

  const triggerCelebration = (isSimulated = false) => {
    if (isSimulated || !hash) {
      const mockHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      setSimulatedTxHash(mockHash);
    }
    setCelebrationActive(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('omega_minted_survivor', 'true');
    }
  };

  const { data: currentScore, refetch: refetchScore } = useReadContract({
    address: GAME_CONTRACT_ADDRESS,
    abi: GAME_CONTRACT_ABI,
    functionName: 'score',
  });

  const { data: playFee } = useReadContract({
    address: GAME_CONTRACT_ADDRESS,
    abi: GAME_CONTRACT_ABI,
    functionName: 'playFee',
  });

  const handleUpdateScore = () => {
    if (!newScoreInput || !playFee) return;
    try {
      writeContract({
        address: GAME_CONTRACT_ADDRESS,
        abi: GAME_CONTRACT_ABI,
        functionName: 'updateScore',
        args: [BigInt(newScoreInput)],
        value: playFee,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const formattedFee = playFee ? (Number(playFee) / 1e18).toFixed(4) : '0.0001';

  return (
    <section id="play-alpha" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Celebratory Gold Confetti Shower Animation */}
      <GoldConfettiCelebration
        isActive={celebrationActive}
        onClose={() => setCelebrationActive(false)}
        survivorClass={selectedSurvivorClass}
        txHash={hash || simulatedTxHash}
        score={newScoreInput}
      />

      <div className="rounded-3xl bg-[#090D16] border-2 border-[#D4AF37]/50 p-6 sm:p-10 lg:p-12 gold-border-glow space-y-10">
        
        {/* Terminal Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#D4AF37]/20 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>ALPHA REALM TERMINAL • CYCLE 0</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#F5F1E8] uppercase tracking-tight">
              ENTER THE ÒMEGA REALM
            </h2>
            <p className="text-xs sm:text-sm text-[#F5F1E8]/70 font-sans mt-1">
              Select your Survivor class and record your legacy directly on <strong className="text-[#60A5FA]">Base Mainnet</strong>.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-3">
            <button
              type="button"
              onClick={() => triggerCelebration(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD700]/10 hover:from-[#D4AF37]/30 hover:to-[#FFD700]/20 border border-[#D4AF37]/60 text-xs font-mono font-bold text-[#F3E5AB] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              title="Preview celebratory gold shower"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>TEST MINT SHOWER</span>
            </button>
            <div className="px-4 py-2 rounded-xl bg-[#080B12] border border-[#0052FF]/40 text-left">
              <p className="text-[10px] font-mono text-[#F5F1E8]/50 uppercase">NETWORK</p>
              <p className="text-xs font-mono font-bold text-[#60A5FA]">BASE MAINNET</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#080B12] border border-[#D4AF37]/40 text-left">
              <p className="text-[10px] font-mono text-[#F5F1E8]/50 uppercase">PLAY FEE</p>
              <p className="text-xs font-mono font-bold text-[#D4AF37]">{formattedFee} ETH</p>
            </div>
          </div>
        </div>

        {/* Wallet Connection / Alpha Interaction */}
        {!isConnected ? (
          <div className="max-w-xl mx-auto text-center p-8 rounded-2xl bg-[#080B12] border border-[#D4AF37]/30 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mx-auto">
              <Wallet className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#F5F1E8] uppercase">
              CONNECT WALLET TO ENTER
            </h3>
            <p className="text-sm text-[#F5F1E8]/70 font-sans">
              Connect your Web3 wallet to mint your Survivor, participate in Cycle 0, and record your score on Base.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  className="py-3 px-4 rounded-xl bg-[#0052FF] hover:bg-[#0042CC] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Connect {connector.name}</span>
                </button>
              ))}
            </div>

            {/* Instant Test Preview for Mint Celebration */}
            <div className="pt-2 border-t border-[#F5F1E8]/10">
              <button
                type="button"
                onClick={() => triggerCelebration(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37]/20 via-[#FFD700]/15 to-[#D4AF37]/20 hover:from-[#D4AF37]/30 hover:to-[#FFD700]/30 border border-[#D4AF37]/60 text-xs font-mono font-bold text-[#F3E5AB] uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#FFD700]" />
                <span>PREVIEW SURVIVOR MINT (GOLD CONFETTI SHOWER)</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Survivor Class Selector */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-lg font-bold text-[#F5F1E8] uppercase tracking-wide flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#D4AF37]" />
                <span>CHOOSE YOUR SURVIVOR CLASS</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SURVIVOR_CLASSES.map((cls) => {
                  const Icon = cls.icon;
                  const isSelected = selectedClass === cls.id;
                  return (
                    <button
                      key={cls.id}
                      onClick={() => setSelectedClass(cls.id)}
                      className={`p-5 rounded-2xl border text-left transition-all duration-200 relative cursor-pointer ${
                        isSelected
                          ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                          : 'bg-[#080B12] border-[#F5F1E8]/10 hover:border-[#D4AF37]/40'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0A0A0A]">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                      <div className="w-10 h-10 rounded-xl bg-[#090D16] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-3">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-black text-[#F5F1E8] uppercase">{cls.name}</h4>
                      <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider mb-2">{cls.role}</p>
                      <p className="text-xs text-[#F5F1E8]/70 font-sans leading-relaxed">{cls.desc}</p>
                      <div className="mt-3 text-[10px] font-mono font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded inline-block">
                        {cls.perk}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Base Mainnet Contract Interaction Box */}
            <div className="lg:col-span-5 bg-[#080B12] border border-[#D4AF37]/40 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#F5F1E8]/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#F5F1E8]/50 uppercase">CONNECTED SURVIVOR</span>
                    <p className="font-mono text-xs text-[#60A5FA] font-bold truncate max-w-[200px]">
                      {address}
                    </p>
                  </div>
                  <button
                    onClick={() => disconnect()}
                    className="text-[10px] text-red-400 hover:underline uppercase font-mono"
                  >
                    Disconnect
                  </button>
                </div>

                {/* Score Stats */}
                <div className="p-4 rounded-xl bg-[#090D16] border border-[#D4AF37]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">CURRENT LEGACY SCORE</span>
                    <p className="text-3xl font-black text-[#F5F1E8] font-mono">
                      {currentScore ? currentScore.toString() : '0'}
                    </p>
                  </div>
                  <Trophy className="w-8 h-8 text-[#D4AF37]" />
                </div>

                {/* New Score Input / Action */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-mono font-bold text-[#F5F1E8]/80 uppercase block">
                    UPDATE ALPHA SCORE / RECORD BATTLE
                  </label>
                  <input
                    type="number"
                    value={newScoreInput}
                    onChange={(e) => setNewScoreInput(e.target.value)}
                    placeholder="Enter score points"
                    className="w-full bg-[#090D16] border border-[#D4AF37]/40 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                  />

                  <button
                    onClick={handleUpdateScore}
                    disabled={isPending}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#9A7B22] text-[#0A0A0A] font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isPending ? (
                      <span>RECORDING ON BASE...</span>
                    ) : (
                      <span>MINT SURVIVOR / UPDATE SCORE ({formattedFee} ETH)</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerCelebration(true)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#090D16] hover:bg-[#111624] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#F3E5AB] font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>CELEBRATE MINT (GOLD SHOWER)</span>
                  </button>

                  <p className="text-[10px] text-[#F5F1E8]/50 text-center font-sans">
                    Small protocol fee auto-attached on Base Mainnet. 10% auto-funds Kingdom missions.
                  </p>

                  {hash && (
                    <div className="p-3 rounded-lg bg-[#10B981]/10 border border-[#10B981]/40 text-center text-xs font-mono text-[#10B981] space-y-2">
                      <p className="font-bold flex items-center justify-center gap-1 text-[#10B981]">
                        <Check className="w-4 h-4" /> Survivor Sealed on Base Mainnet!
                      </p>
                      <div className="flex items-center justify-center gap-3 flex-wrap">
                        <a
                          href={`https://basescan.org/tx/${hash}`}
                          target="_blank"
                          rel="noreferrer"
                          className="underline text-[#60A5FA] block"
                          onClick={() => {
                            if (typeof window !== 'undefined') {
                              localStorage.setItem('omega_minted_survivor', 'true');
                            }
                          }}
                        >
                          View on BaseScan ↗
                        </a>
                        <button
                          type="button"
                          onClick={() => triggerCelebration(false)}
                          className="px-2.5 py-0.5 rounded bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/50 text-[10px] font-mono font-bold text-[#F3E5AB] uppercase inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3 text-[#FFD700]" />
                          <span>Replay Shower</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-center text-xs font-mono text-red-400">
                      Error: {error.message.slice(0, 80)}...
                    </div>
                  )}
                </div>
              </div>

              {/* On-Chain Contract Info Footer */}
              <div className="pt-4 border-t border-[#F5F1E8]/10 text-[10px] font-mono text-[#F5F1E8]/50 space-y-1">
                <p>CONTRACT: <span className="text-[#D4AF37]">0x8f3C...d460</span></p>
                <p>STATUS: VERIFIED ON BASE MAINNET</p>
              </div>

            </div>

            {/* DynamicDex Dashboard Trait & Rarity Engine */}
            <div className="lg:col-span-12 pt-4">
              <DynamicDexDashboard address={address} selectedClass={selectedClass} />
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Crown, CheckCircle2, Trophy, ExternalLink, X, RotateCcw, Shield, Volume2, VolumeX } from 'lucide-react';

interface GoldConfettiCelebrationProps {
  isActive: boolean;
  onClose: () => void;
  survivorClass?: {
    name: string;
    role: string;
    perk: string;
  };
  txHash?: string | null;
  score?: string | number;
  onPlaySound?: () => void;
  isMuted?: boolean;
  toggleMute?: () => void;
}

interface ConfettiParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  tilt: number;
  tiltAngle: number;
  tiltSpeed: number;
  shape: 'rect' | 'circle' | 'star' | 'strip';
  opacity: number;
  shimmerOffset: number;
}

const GOLD_PALETTE = [
  '#FFD700', // Pure Gold
  '#D4AF37', // Metallic Gold
  '#F3E5AB', // Vanilla Gold / Highlight
  '#AA7C11', // Deep Antique Gold
  '#FFF275', // Bright Shimmer Gold
  '#E5C158', // Byzantine Gold
  '#FFFDF0', // Radiant White-Gold
  '#C5A059', // Vegas Gold
];

export default function GoldConfettiCelebration({
  isActive,
  onClose,
  survivorClass,
  txHash,
  score,
  onPlaySound,
  isMuted = false,
  toggleMute,
}: GoldConfettiCelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Sound trigger invoking the audio hook or fallback
  const triggerAudio = useCallback(() => {
    if (onPlaySound) {
      onPlaySound();
    } else {
      playCelestialFanfare();
    }
  }, [onPlaySound]);

  // Fallback pleasant celestial chord using Web Audio API if no external hook is passed
  const playCelestialFanfare = useCallback(() => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Pentatonic celebratory chime frequencies: E5, G#5, B5, E6, G#6
      const notes = [659.25, 830.61, 987.77, 1318.51, 1661.22];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        // Soft bell-like envelope
        const startTime = ctx.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.08, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.9);
      });
    } catch {
      // Audio autoplay policy or unsupported environment handled gracefully
    }
  }, [isMuted]);

  // Initialize and spawn particles
  const initParticles = useCallback((width: number, height: number) => {
    const particleCount = 180;
    const particles: ConfettiParticle[] = [];

    const shapes: ('rect' | 'circle' | 'star' | 'strip')[] = ['rect', 'rect', 'circle', 'star', 'strip'];

    for (let i = 0; i < particleCount; i++) {
      // Explode from upper middle and shower downwards
      const startX = width * 0.5 + (Math.random() - 0.5) * (width * 0.8);
      const startY = Math.random() * -120 - 20;

      particles.push({
        x: startX,
        y: startY,
        size: Math.random() * 10 + 6,
        color: GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)],
        speedX: (Math.random() - 0.5) * 6,
        speedY: Math.random() * 4 + 2.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        tilt: Math.random() * 10,
        tiltAngle: Math.random() * Math.PI,
        tiltSpeed: Math.random() * 0.08 + 0.03,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        opacity: Math.random() * 0.4 + 0.6,
        shimmerOffset: Math.random() * 10,
      });
    }

    particlesRef.current = particles;
  }, []);

  // Trigger celebration on activation
  useEffect(() => {
    if (!isActive) {
      setShowModal(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    setShowModal(true);
    triggerAudio();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle canvas sizing
    const updateSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    initParticles(canvas.width, canvas.height);

    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle ambient gold aura at top center
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.2,
        20,
        canvas.width * 0.5,
        canvas.height * 0.2,
        canvas.width * 0.6
      );
      gradient.addColorStop(0, 'rgba(212, 175, 55, 0.15)');
      gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update motion
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.tiltAngle) * 1.5;
        p.rotation += p.rotationSpeed;
        p.tiltAngle += p.tiltSpeed;
        p.tilt = Math.sin(p.tiltAngle) * 15;

        // Loop back up if still within active celebration
        if (p.y > canvas.height + 50) {
          if (elapsed < 8) {
            p.y = -30;
            p.x = Math.random() * canvas.width;
            p.speedY = Math.random() * 4 + 2.5;
          }
        }

        // Shimmering brightness
        const shimmer = (Math.sin(elapsed * 4 + p.shimmerOffset) + 1) * 0.2 + 0.8;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.min(1, p.opacity * shimmer);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 8;

        if (p.shape === 'rect') {
          const cosTilt = Math.cos(p.tiltAngle);
          ctx.fillRect(-p.size / 2, (-p.size * cosTilt) / 2, p.size, p.size * cosTilt);
        } else if (p.shape === 'strip') {
          const cosTilt = Math.cos(p.tiltAngle);
          ctx.fillRect(-p.size / 3, (-p.size * 2 * cosTilt) / 2, p.size * 0.7, p.size * 2 * cosTilt);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'star') {
          // 4-point sparkle star
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, initParticles, triggerAudio]);

  const handleReplay = () => {
    if (canvasRef.current) {
      initParticles(canvasRef.current.width, canvasRef.current.height);
      triggerAudio();
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.4))' }}
      />

      {/* Dim overlay with golden ambient vignette */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Celebratory Dialog Card */}
      {showModal && (
        <div 
          className="relative z-10 max-w-lg w-full rounded-3xl bg-gradient-to-b from-[#141A2E] via-[#0A0E1A] to-[#06080F] border-2 border-[#D4AF37] p-6 sm:p-8 shadow-[0_0_80px_rgba(212,175,55,0.45)] text-center space-y-6 animate-in fade-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Audio Mute/Unmute Toggle */}
          {toggleMute && (
            <button
              type="button"
              onClick={toggleMute}
              className={`absolute top-4 right-14 p-2 rounded-full border transition-all cursor-pointer ${
                isMuted
                  ? 'bg-[#080B12] border-[#F5F1E8]/20 text-[#F5F1E8]/40 hover:text-white'
                  : 'bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#F3E5AB] hover:bg-[#D4AF37]/30'
              }`}
              aria-label={isMuted ? "Unmute triumphant fanfare" : "Mute triumphant fanfare"}
              title={isMuted ? "Unmute triumphant fanfare" : "Mute audio"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#FFD700]" />}
            </button>
          )}

          {/* Top Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#080B12] border border-[#D4AF37]/30 text-[#F5F1E8]/70 hover:text-white hover:border-[#D4AF37] transition-all cursor-pointer"
            aria-label="Close celebration"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Crown & Radiant Aura */}
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#FFF0CA] opacity-25 blur-xl animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-[#2A2312] to-[#0A0E1A] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.5)]">
              <Crown className="w-10 h-10 text-[#FFD700] fill-[#D4AF37]/30 stroke-[2.2]" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-[#FFD700] animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[11px] font-mono font-bold text-[#F3E5AB] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              COVENANT SEALED • MINT CONFIRMED
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              SURVIVOR NFT BAPTISM COMPLETE!
            </h2>
            
            <p className="text-xs sm:text-sm text-[#F5F1E8]/80 font-sans max-w-md mx-auto">
              Your sovereign entry is eternally inscribed on <strong className="text-[#60A5FA]">Base Mainnet</strong> under the <strong className="text-[#D4AF37]">VannÐiamond Palladium Standard</strong>.
            </p>
          </div>

          {/* Class & Rarity Showcase Pill */}
          <div className="p-4 rounded-2xl bg-[#080B12] border border-[#D4AF37]/40 space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-[#F5F1E8]/10 pb-2">
              <span className="text-[10px] font-mono text-[#F5F1E8]/50 uppercase">ELECTED ARCHETYPE</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 uppercase">
                ACTIVE ON BASE
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-black text-white uppercase flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                  {survivorClass?.name || 'COVENANT SURVIVOR'}
                </h4>
                <p className="text-xs text-[#D4AF37] font-mono">{survivorClass?.role || 'Kingdom Vanguard'}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-[#F5F1E8]/50 uppercase block">PERK ATTACHED</span>
                <span className="text-xs font-mono font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded inline-block">
                  {survivorClass?.perk || '+20% Battle Honor'}
                </span>
              </div>
            </div>

            {score && (
              <div className="flex items-center justify-between pt-2 border-t border-[#F5F1E8]/10 text-xs font-mono">
                <span className="text-[#F5F1E8]/60 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" /> INITIAL SCORE INSCRIBED:
                </span>
                <span className="font-bold text-[#D4AF37] text-sm">{score} PTS</span>
              </div>
            )}
          </div>

          {/* BaseScan Explorer Link if available */}
          {txHash && (
            <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-[#60A5FA]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
              <span>BaseScan Tx:</span>
              <a 
                href={`https://basescan.org/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-white inline-flex items-center gap-1 truncate max-w-[180px]"
              >
                {txHash.slice(0, 10)}...{txHash.slice(-8)}
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleReplay}
              className="py-3 px-4 rounded-xl bg-[#080B12] hover:bg-[#101626] border border-[#D4AF37]/50 text-[#F3E5AB] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>SHOWER AGAIN</span>
            </button>

            <button
              onClick={onClose}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#0A0A0A] font-mono text-xs font-black uppercase tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#0A0A0A]" />
              <span>ENTER THE REALM</span>
            </button>
          </div>

          {/* Trademark and Council seal */}
          <p className="text-[10px] font-mono text-[#F5F1E8]/50 pt-2 border-t border-[#F5F1E8]/10">
            Protected by Aegis Sanctum • Vann Family Ventures LLC
          </p>
        </div>
      )}
    </div>
  );
}

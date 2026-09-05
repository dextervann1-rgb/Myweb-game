"use client";

import { useRef, useState, useCallback, useEffect } from 'react';

export interface UseTriumphantSoundReturn {
  playTriumphantSound: () => void;
  stopSound: () => void;
  isPlaying: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  volume: number;
}

/**
 * Custom audio hook for InteractiveRealm & GoldConfettiCelebration.
 * Synthesizes a high-fidelity, multi-layered triumphant fanfare
 * (brass herald, sovereign bass impact, and cascading golden chimes)
 * using the Web Audio API with zero external audio assets.
 */
export function useTriumphantSound(): UseTriumphantSoundReturn {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<{ stop: (time?: number) => void }[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('omega_audio_muted') === 'true';
    }
    return false;
  });
  const [volume, setVolumeState] = useState<number>(0.6);

  // Sync mute state to localStorage
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('omega_audio_muted', String(next));
      }
      return next;
    });
  }, []);

  const setVolume = useCallback((vol: number) => {
    setVolumeState(Math.max(0, Math.min(1, vol)));
  }, []);

  const stopSound = useCallback(() => {
    activeNodesRef.current.forEach((node) => {
      try {
        node.stop();
      } catch {
        // Safe disposal
      }
    });
    activeNodesRef.current = [];
    setIsPlaying(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSound();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch {
          // Ignore close errors
        }
      }
    };
  }, [stopSound]);

  const playTriumphantSound = useCallback(() => {
    if (isMuted || volume <= 0) return;

    try {
      // Lazy initialize AudioContext on user interaction
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (!AudioCtxClass) return;

      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtxClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      stopSound();
      setIsPlaying(true);

      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, now);
      masterGain.connect(ctx.destination);

      const nodesToTrack: { stop: (time?: number) => void }[] = [];

      // ==========================================
      // LAYER 1: Sovereign Sub-Bass Impact
      // ==========================================
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(65.41, now); // C2
      subOsc.frequency.exponentialRampToValueAtTime(32.7, now + 1.2);

      subGain.gain.setValueAtTime(0, now);
      subGain.gain.linearRampToValueAtTime(0.45, now + 0.04);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start(now);
      subOsc.stop(now + 1.6);
      nodesToTrack.push(subOsc);

      // ==========================================
      // LAYER 2: Triumphant Brass Fanfare (Herald Horns)
      // Sequence: C4 -> F4 -> G4 -> C5 -> E5 -> G5 -> High C6 Climax
      // ==========================================
      const fanfareNotes = [
        { freq: 261.63, time: 0.00, dur: 0.14 }, // C4
        { freq: 349.23, time: 0.12, dur: 0.14 }, // F4
        { freq: 392.00, time: 0.24, dur: 0.16 }, // G4
        { freq: 523.25, time: 0.38, dur: 0.18 }, // C5
        { freq: 659.25, time: 0.52, dur: 0.20 }, // E5
        { freq: 783.99, time: 0.68, dur: 0.24 }, // G5
        { freq: 1046.50, time: 0.88, dur: 1.60 }, // High C6 sovereign sustained climax
      ];

      fanfareNotes.forEach((note) => {
        const start = now + note.time;
        const stop = start + note.dur;

        // Dual oscillators for rich royal brass detuning
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const noteGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(note.freq, start);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(note.freq * 1.004, start); // subtle chorus detune

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, start);
        filter.frequency.exponentialRampToValueAtTime(3800, start + 0.08); // dynamic brass opening

        // Envelope
        noteGain.gain.setValueAtTime(0.0001, start);
        noteGain.gain.linearRampToValueAtTime(0.28, start + 0.025);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, stop);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(masterGain);

        osc1.start(start);
        osc1.stop(stop);
        osc2.start(start);
        osc2.stop(stop);

        nodesToTrack.push(osc1, osc2);
      });

      // ==========================================
      // LAYER 3: Cascading Golden Confetti Sparkles & Chimes
      // Bell-like high pentatonic glockenspiel burst
      // ==========================================
      const sparkleFreqs = [
        { f: 1318.51, t: 0.45 }, // E6
        { f: 1567.98, t: 0.58 }, // G6
        { f: 2093.00, t: 0.72 }, // C7
        { f: 2637.02, t: 0.88 }, // E7
        { f: 3135.96, t: 1.02 }, // G7
        { f: 4186.01, t: 1.18 }, // C8 Sparkle
      ];

      sparkleFreqs.forEach((sparkle) => {
        const sStart = now + sparkle.t;
        const sStop = sStart + 0.9;

        const sOsc = ctx.createOscillator();
        const sGain = ctx.createGain();

        sOsc.type = 'sine';
        sOsc.frequency.setValueAtTime(sparkle.f, sStart);

        sGain.gain.setValueAtTime(0.0001, sStart);
        sGain.gain.linearRampToValueAtTime(0.09, sStart + 0.015);
        sGain.gain.exponentialRampToValueAtTime(0.0001, sStop);

        sOsc.connect(sGain);
        sGain.connect(masterGain);

        sOsc.start(sStart);
        sOsc.stop(sStop);
        nodesToTrack.push(sOsc);
      });

      activeNodesRef.current = nodesToTrack;

      // Reset isPlaying state after full fanfare completion
      const totalDurationMs = 2600;
      setTimeout(() => {
        setIsPlaying(false);
      }, totalDurationMs);
    } catch (err) {
      console.warn('Triumphant audio playback interrupted or unavailable:', err);
      setIsPlaying(false);
    }
  }, [isMuted, volume, stopSound]);

  return {
    playTriumphantSound,
    stopSound,
    isPlaying,
    isMuted,
    toggleMute,
    setVolume,
    volume,
  };
}

"use client";

import React from 'react';
import { ShieldAlert, Scale, Sun, HeartHandshake, Code, Scroll } from 'lucide-react';

export default function CovenantSection() {
  const covenants = [
    {
      num: "01",
      title: "No Predatory Mechanics",
      desc: "No gambling loot boxes, no addiction loops targeting kids.",
      scripture: "Proverbs 16:11 - Honest scales.",
      icon: ShieldAlert,
    },
    {
      num: "02",
      title: "Stewardship, Not Greed",
      desc: "The economy rewards skill and time, not exploitation. We teach stewardship of assets.",
      scripture: "1 Corinthians 4:2 - Faithful stewards.",
      icon: Scale,
    },
    {
      num: "03",
      title: "Light in the Lore",
      desc: "No demonic glorification. Darkness exists as an enemy to overcome, never as a hero. Light always wins.",
      scripture: "John 1:5 - Light shines in darkness.",
      icon: Sun,
    },
    {
      num: "04",
      title: "Community is Ministry",
      desc: "No toxicity is our policy. Factions are for competition, not hate. We build each other up.",
      scripture: "1 Thessalonians 5:11 - Encourage one another.",
      icon: HeartHandshake,
    },
    {
      num: "05",
      title: "Generosity is Coded",
      desc: "Tithing and giving are built into our smart contracts on BASE. The game funds the mission.",
      scripture: "Malachi 3:10 - Bring the full tithe.",
      icon: Code,
    },
  ];

  return (
    <section id="covenant" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest">
          <Scroll className="w-3.5 h-3.5" />
          <span>OUR SACRED COMMITMENT</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-[#F5F1E8] uppercase tracking-tight">
          HOW WE PLEASE JESUS — OUR COVENANT
        </h2>

        <p className="text-lg sm:text-xl font-serif text-[#D4AF37] max-w-2xl mx-auto font-medium">
          We will not build what grieves the Holy Spirit. This is our covenant:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {covenants.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#090D16] border border-[#D4AF37]/30 hover:border-[#D4AF37] gold-border-glow transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded">
                    COVENANT {item.num}
                  </span>
                  <Icon className="w-5 h-5 text-[#D4AF37]" />
                </div>

                <h3 className="text-xl font-bold text-[#F5F1E8] uppercase tracking-wide">
                  {item.title}
                </h3>

                <p className="text-sm text-[#F5F1E8]/80 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F5F1E8]/10 text-xs font-serif italic text-[#D4AF37]">
                {item.scripture}
              </div>
            </div>
          );
        })}

        {/* Special Covenant Card Summary */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 via-[#090D16] to-[#080B12] border-2 border-[#D4AF37] flex flex-col justify-center items-center text-center space-y-3 gold-border-glow">
          <span className="text-3xl">✝️</span>
          <h3 className="text-lg font-black text-[#F5F1E8] uppercase tracking-wider">
            SEALED ON BASE
          </h3>
          <p className="text-xs text-[#F5F1E8]/90 font-sans">
            Guaranteed by smart contracts and stewarded with unwavering Kingdom integrity.
          </p>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-end pb-16 sm:pb-20 md:pb-24 overflow-hidden bg-[#080808]">
      {/* Background Lifestyle Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/slices/hero_lifestyle.jpg"
          alt="Friends enjoying KOSU cold canned drinks beside a swimming pool at golden hour"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          loading="eager"
        />
        {/* Measured cinematic contrast gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40" />
      </div>

      {/* Floating Graphic Badge: "MEET THE DRINK" (Matches reference) */}
      <div className="absolute top-28 sm:top-36 left-4 sm:left-8 lg:left-12 z-10 hidden sm:block">
        <a
          href="#drinks"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/60 hover:bg-[#F4FF55] text-white hover:text-black border border-white/20 rounded-full text-[11px] font-bold tracking-widest uppercase backdrop-blur-md transition-all duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-[#B8F000]" />
          MEET THE DRINK
        </a>
      </div>

      {/* Right Editorial Field Note (Authentic agency touch from reference) */}
      <div className="absolute top-36 sm:top-48 right-6 sm:right-10 lg:right-16 z-10 max-w-[220px] text-right hidden lg:block">
        <p className="text-[10px] uppercase font-mono tracking-wider text-white/70 leading-relaxed bg-black/40 p-3 rounded-lg border border-white/10 backdrop-blur-sm">
          THREE FRIENDS OUTSIDE, GOLDEN HOUR. ONE HOLDS A CAN MID-CONVERSATION.
          CALM SPACE FOR THE HEADLINE.
        </p>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          {/* Super-Headline */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#F4FF55] font-mono">
              ★ SPONTANEOUS REFRESHMENT
            </span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-display uppercase tracking-tight text-[#F4FF55] leading-[0.88] drop-shadow-lg mb-6">
            NO BIG PLANS.
            <br />
            <span className="text-white">JUST GOOD DRINKS.</span>
          </h1>

          {/* Supporting Prose */}
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-200 max-w-xl mb-8 leading-snug drop-shadow">
            Good drinks. Good people. No complicated plans. Fruit sodas crafted for everyday sunshine and spontaneous moments.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#drinks"
              className="px-8 py-4 bg-[#F4FF55] hover:bg-white text-[#080808] font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-xl flex items-center gap-2"
            >
              EXPLORE OUR DRINKS
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#story"
              className="px-8 py-4 bg-black/50 hover:bg-white/10 text-white font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full border border-white/20 backdrop-blur-md transition-all duration-200"
            >
              OUR STORY
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

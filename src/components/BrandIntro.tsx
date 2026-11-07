import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BrandIntro: React.FC = () => {
  return (
    <section
      id="story"
      className="relative py-20 sm:py-28 md:py-36 bg-[#F58BD4] text-[#080808] overflow-hidden"
    >
      {/* Lime Curved / Concentric Decorative Graphic Geometry */}
      <div
        className="absolute -top-24 -right-24 w-[380px] sm:w-[540px] md:w-[720px] h-[380px] sm:h-[540px] md:h-[720px] rounded-full border-[40px] sm:border-[60px] md:border-[90px] border-[#B8F000]/60 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-4 -right-4 w-[280px] sm:w-[400px] md:w-[520px] h-[280px] sm:h-[400px] md:h-[520px] rounded-full border-[20px] sm:border-[30px] md:border-[45px] border-[#FFF9ED]/40 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Monumental Headline & Brand Prose */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#080808] font-mono">
                [ 01 · OUR PHILOSOPHY ]
              </span>
            </div>

            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-display uppercase tracking-tight text-[#080808] leading-[0.9] mb-8">
              GOOD THINGS HAPPEN
              <br />
              AROUND THE CORNER.
            </h2>

            {/* Asymmetrical Layout Split: Lifestyle Portrait + Prose */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center mt-10">
              {/* Product Lifestyle Image of person enjoying can */}
              <div className="sm:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#080808] shadow-[6px_6px_0px_#080808] transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="/assets/slices/brand_intro_lifestyle.jpg"
                    alt="Enjoying an ice-cold can of KOSU fruit soda outdoors"
                    className="w-full h-auto aspect-[4/5] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#B8F000] text-[#080808] text-[10px] font-bold font-mono px-2 py-0.5 rounded uppercase">
                    COLD SODA / SUNSHINE
                  </div>
                </div>
              </div>

              {/* Editorial Prose */}
              <div className="sm:col-span-7 space-y-4">
                <p className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight text-[#080808] leading-snug">
                  KOSU STARTED WITH A SIMPLE IDEA: A GOOD DRINK MAKES A SMALL MOMENT BETTER.
                </p>
                <p className="text-sm sm:text-base text-[#080808]/85 leading-relaxed font-body">
                  A walk to the corner shop. A cold can passed across the table. A little color, a little flavor, and something worth sharing. From spontaneous afternoons to unexpected adventures, there's always a reason to enjoy something good.
                </p>
                <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#080808]/90 pt-2 font-mono">
                  WE MAKE FRUIT SODAS FOR THE IN-BETWEEN MOMENTS, AND KEEP THE CANS SIMPLE ENOUGH TO SHARE.
                </p>

                <div className="pt-4">
                  <a
                    href="#drinks"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#080808] text-white hover:bg-white hover:text-[#080808] rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-md"
                  >
                    SEE THE DRINKS
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Decorative Brand Badge & Editorial Notes */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full pt-4 lg:pt-16">
            <div className="bg-[#FFF9ED] p-6 sm:p-8 rounded-3xl border-2 border-[#080808] shadow-[8px_8px_0px_#080808] space-y-4">
              <div className="w-10 h-10 bg-[#B8F000] text-[#080808] rounded-xl flex items-center justify-center font-display text-2xl font-black">
                ★
              </div>
              <h3 className="font-display text-3xl uppercase tracking-tight text-[#080808]">
                REAL JUICE. ZERO BULLSHIT.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-body">
                No high-fructose syrups, no synthetic food dyes, and no fake health claims. Just real Asian fruit purees, aromatic botanicals, and sparkling spring water.
              </p>
              <div className="pt-2 flex items-center gap-3 text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-600">
                <span>CAN SIZE: 330ML</span>
                <span>·</span>
                <span>EFFORT: 0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

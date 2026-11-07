import React, { useState } from 'react';
import { ArrowRight, Sparkles, Box, Image as ImageIcon } from 'lucide-react';
import { ProductFlavor, PackType } from '../types';
import { PRODUCTS } from '../data/products';
import { ThreeCanCanvas } from './3d/ThreeCanCanvas';

interface FlavorDiscoveryProps {
  onOpenDetails: (flavor: ProductFlavor) => void;
  onAddToCart: (flavorId: string, packType: PackType, quantity: number) => void;
}

export const FlavorDiscovery: React.FC<FlavorDiscoveryProps> = ({
  onOpenDetails,
  onAddToCart,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'3d' | 'editorial'>('3d');

  const activeFlavor = PRODUCTS[selectedIndex];

  return (
    <section
      id="moments"
      className="py-24 sm:py-32 md:py-40 bg-[#896F66] text-[#FFF9ED] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Headline and Interactive Flavor Selector */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#F4FF55] font-mono mb-3">
              [ 03 · FLAVOR PAIRING & OCCASIONS ]
            </div>

            <h2 className="text-6xl sm:text-8xl md:text-9xl font-display uppercase tracking-tight text-[#F4FF55] leading-[0.88] mb-6">
              EVERY CAN
              <br />
              <span className="text-white">HAS ITS MOMENT.</span>
            </h2>

            <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-300 max-w-lg mb-10 leading-relaxed">
              THE DRINKS GO WHERE PEOPLE GO. THE CORNER SHOP, THE ROOFTOP, THE BUS STOP. SPONTANEOUS SESSIONS AND SUNLIT AFTERNOONS.
            </p>

            {/* Interactive 4-Flavor Selector List */}
            <div className="space-y-3">
              {PRODUCTS.map((flavor, index) => {
                const isActive = index === selectedIndex;
                const num = String(index + 1).padStart(2, '0');

                return (
                  <button
                    key={flavor.id}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isActive
                        ? 'border-[#080808] bg-[#080808] text-white shadow-[8px_8px_0px_rgba(0,0,0,0.35)] scale-[1.01]'
                        : 'border-white/20 bg-black/20 hover:bg-black/35 text-white/90'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Index Circle */}
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                          isActive
                            ? 'bg-[#F4FF55] text-[#080808]'
                            : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {num}
                      </span>

                      {/* Flavor Name */}
                      <span
                        className="text-3xl sm:text-4xl font-display uppercase tracking-tight transition-colors"
                        style={{
                          color: isActive ? flavor.color : '#FFFFFF',
                        }}
                      >
                        {flavor.name}
                      </span>
                    </div>

                    {/* Occasion / Pairing Note */}
                    <div className="text-right sm:text-right pl-12 sm:pl-0">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-400 block">
                        {flavor.pairing}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Flavor Quick Action Strip */}
            <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tracking-widest uppercase text-white/70">
                  ACTIVE FLAVOR:
                </span>
                <span
                  className="px-2.5 py-0.5 text-xs font-bold font-mono uppercase rounded"
                  style={{
                    backgroundColor: activeFlavor.color,
                    color: activeFlavor.deepColor,
                  }}
                >
                  {activeFlavor.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onAddToCart(activeFlavor.id, 'single', 1)}
                  className="px-5 py-2.5 bg-[#F4FF55] hover:bg-white text-[#080808] rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 active:scale-95 shadow"
                >
                  ADD {activeFlavor.name} · $3.20
                </button>
                <button
                  type="button"
                  onClick={() => onOpenDetails(activeFlavor)}
                  className="px-4 py-2.5 bg-black/40 hover:bg-black/60 text-white border border-white/20 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200"
                >
                  FULL SPECS
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic 3D Stage / Editorial Image Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#080808] bg-[#0E0E0E] text-white shadow-[12px_12px_0px_#080808] flex flex-col">
              {/* Top View Toggle Tab (3D Interactive vs Editorial Photography) */}
              <div className="p-3 bg-black/80 border-b border-white/10 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: activeFlavor.color }}
                  />
                  <span className="text-xs font-bold font-mono tracking-widest uppercase text-white/80">
                    {activeFlavor.name} DISPLAY
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-white/10 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setViewMode('3d')}
                    className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md transition-all flex items-center gap-1 ${
                      viewMode === '3d'
                        ? 'bg-[#F4FF55] text-black shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Box className="w-3 h-3" />
                    3D CAN
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('editorial')}
                    className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md transition-all flex items-center gap-1 ${
                      viewMode === 'editorial'
                        ? 'bg-[#F4FF55] text-black shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    CAMPAIGN
                  </button>
                </div>
              </div>

              {/* Central Visual Container */}
              <div
                className="relative h-96 sm:h-[460px] w-full flex items-center justify-center overflow-hidden transition-all duration-700"
                style={{
                  background: `radial-gradient(ellipse at 50% 65%, ${activeFlavor.color} 0%, ${activeFlavor.cardBgColor} 75%, #080808 100%)`,
                }}
              >
                {viewMode === '3d' ? (
                  <div className="w-full h-full relative z-10">
                    <ThreeCanCanvas
                      flavor={activeFlavor}
                      interactive={true}
                      zoomLevel={1.05}
                      autoRotateSpeed={0.009}
                      showCondensation={true}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full relative z-10 animate-in fade-in duration-300">
                    <img
                      src="/assets/slices/moment_lifestyle.jpg"
                      alt="Lifestyle portrait holding multiple chilled cans of KOSU fruit soda"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                )}
              </div>

              {/* Bottom Card Summary */}
              <div className="p-6 bg-[#121212] border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold tracking-wider uppercase text-[#F4FF55]">
                    {activeFlavor.personality}
                  </div>
                  <div className="text-sm font-body text-neutral-300 mt-1 max-w-xs">
                    {activeFlavor.shortDescription}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenDetails(activeFlavor)}
                  className="px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-xl text-xs font-bold tracking-wider uppercase transition-colors"
                >
                  EXPLORE →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

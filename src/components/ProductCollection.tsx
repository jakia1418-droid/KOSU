import React from 'react';
import { Plus, Eye, Sparkles } from 'lucide-react';
import { ProductFlavor, PackType } from '../types';
import { PRODUCTS } from '../data/products';
import { ThreeCanCanvas } from './3d/ThreeCanCanvas';

interface ProductCollectionProps {
  onOpenDetails: (flavor: ProductFlavor) => void;
  onAddToCart: (flavorId: string, packType: PackType, quantity: number) => void;
}

export const ProductCollection: React.FC<ProductCollectionProps> = ({
  onOpenDetails,
  onAddToCart,
}) => {
  return (
    <section id="drinks" className="py-20 sm:py-28 md:py-36 bg-[#FFF9ED] text-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#080808] pb-6 mb-12 sm:mb-16">
          <div>
            <div className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-neutral-500 font-mono mb-2">
              THE DRINKS · 330ML CANS
            </div>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-display uppercase tracking-tight text-[#080808] leading-none">
              PICK YOUR KIND OF GOOD.
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <span className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 bg-[#080808] text-[#F4FF55] rounded-full">
              FOUR CORE FLAVORS
            </span>
          </div>
        </div>

        {/* 2-Column Desktop Grid for Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PRODUCTS.map((product) => {
            return (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between rounded-3xl overflow-hidden border-2 border-[#080808] bg-[#0E0E0E] text-white shadow-[10px_10px_0px_#080808] transition-all duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0px_#080808]"
              >
                {/* Visual Can Display Stage with Flavor Atmosphere */}
                <div
                  className="relative h-80 sm:h-96 w-full flex items-center justify-center overflow-hidden"
                  style={{
                    background: `radial-gradient(ellipse at 50% 65%, ${product.color} 0%, ${product.cardBgColor} 75%, #080808 100%)`,
                  }}
                >
                  {/* Subtle radial shine */}
                  <div
                    className="absolute inset-0 opacity-30 pointer-events-none mix-blend-screen"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, #ffffff 0%, transparent 60%)`,
                    }}
                  />

                  {/* Real-time WebGL 3D Can */}
                  <div className="w-full h-full relative z-10">
                    <ThreeCanCanvas
                      flavor={product}
                      interactive={true}
                      zoomLevel={0.96}
                      autoRotateSpeed={0.007}
                      showCondensation={true}
                      onCanClick={() => onOpenDetails(product)}
                    />
                  </div>

                  {/* Floating quick tag */}
                  <div className="absolute top-4 left-4 z-20">
                    <span
                      className="px-2.5 py-1 text-[10px] font-bold font-mono tracking-wider uppercase rounded-md shadow-sm"
                      style={{
                        backgroundColor: product.color,
                        color: product.deepColor,
                      }}
                    >
                      {product.personality}
                    </span>
                  </div>

                  {/* 360 Hint */}
                  <div className="absolute top-4 right-4 z-20 text-[10px] font-mono tracking-widest uppercase text-white/50 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                    3D VIEW
                  </div>
                </div>

                {/* Card Editorial Info & Actions */}
                <div className="p-6 sm:p-8 bg-[#141414] border-t-2 border-[#080808] flex flex-col justify-between flex-1">
                  <div>
                    {/* Flavor Name & Accent Badge */}
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="text-4xl sm:text-5xl font-display uppercase tracking-tight text-white group-hover:text-[#F4FF55] transition-colors">
                        {product.name}
                      </h3>
                      <span className="text-xs font-mono font-bold tracking-wider text-neutral-400">
                        {product.size}
                      </span>
                    </div>

                    {/* Tagline / Tasting character */}
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#F4FF55] mb-2 font-mono">
                      {product.tagline}
                    </p>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-body mb-6">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Action Buttons: ADD TO BAG & VIEW DETAILS */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onAddToCart(product.id, 'single', 1)}
                      className="flex-1 py-3 px-4 bg-[#F4FF55] hover:bg-white text-[#080808] rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      ADD TO BAG +
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenDetails(product)}
                      className="py-3 px-4 bg-white/5 hover:bg-white/15 text-white border border-white/15 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-neutral-400" />
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

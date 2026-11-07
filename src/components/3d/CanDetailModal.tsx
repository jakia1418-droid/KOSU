import React, { useState } from 'react';
import { X, Plus, Minus, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { ProductFlavor, PackType } from '../../types';
import { ThreeCanCanvas } from './ThreeCanCanvas';

interface CanDetailModalProps {
  flavor: ProductFlavor | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (flavorId: string, packType: PackType, quantity: number) => void;
}

export const CanDetailModal: React.FC<CanDetailModalProps> = ({
  flavor,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedPack, setSelectedPack] = useState<PackType>('fourPack');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !flavor) return null;

  const packPrice = flavor.packOptions[selectedPack];
  const totalPrice = (packPrice * quantity).toFixed(2);

  const handleAdd = () => {
    onAddToCart(flavor.id, selectedPack, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0E0E0E] text-white rounded-2xl border border-white/10 shadow-2xl z-10 flex flex-col md:flex-row overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/20 transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: 3D Studio Stage */}
        <div
          className="w-full md:w-1/2 h-80 sm:h-96 md:h-auto min-h-[380px] relative flex items-center justify-center p-6"
          style={{
            background: `radial-gradient(circle at center, ${flavor.cardBgColor} 0%, #080808 80%)`,
          }}
        >
          {/* Subtle flavor ambient glow */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${flavor.color} 0%, transparent 60%)`,
            }}
          />

          <div className="w-full h-full relative">
            <ThreeCanCanvas
              flavor={flavor}
              interactive={true}
              zoomLevel={0.92}
              autoRotateSpeed={0.005}
              showCondensation={true}
            />
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] tracking-widest uppercase text-white/50 font-mono">
            <span>360° INTERACTIVE 3D</span>
            <span className="flex items-center gap-1.5 text-white/80">
              <Sparkles className="w-3 h-3 text-[#F4FF55]" />
              COLD CONDENSATION
            </span>
          </div>
        </div>

        {/* Right: Flavor Story & Purchase Panel */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-[#121212]">
          <div>
            {/* Header info */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: flavor.color }}
              />
              <span className="text-xs font-semibold tracking-wider uppercase text-white/60">
                {flavor.personality}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display uppercase tracking-tight text-white mb-2">
              {flavor.name}
            </h2>

            <p className="text-sm font-medium tracking-wide uppercase text-[#F4FF55] mb-4">
              {flavor.tagline}
            </p>

            <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-body">
              {flavor.fullDescription}
            </p>

            {/* Tasting Notes */}
            <div className="mb-6">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400 block mb-2.5">
                TASTING NOTES
              </span>
              <div className="flex flex-wrap gap-2">
                {flavor.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-neutral-200"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Food Pairing */}
            <div className="mb-6 p-3.5 bg-white/5 border border-white/5 rounded-xl text-xs text-neutral-300">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#F4FF55] block mb-1">
                PERFECT PAIRING
              </span>
              {flavor.pairing}
            </div>

            {/* Pack Size Selection */}
            <div className="mb-6">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400 block mb-2.5">
                CHOOSE FORMAT
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPack('single')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedPack === 'single'
                      ? 'border-[#F4FF55] bg-[#F4FF55]/10 text-white'
                      : 'border-white/10 hover:border-white/20 text-neutral-400'
                  }`}
                >
                  <div className="text-[10px] font-medium tracking-wider uppercase">SINGLE CAN</div>
                  <div className="text-sm font-bold text-white mt-0.5">$3.20</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">330 ml</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPack('fourPack')}
                  className={`p-2.5 rounded-xl border text-center transition-all relative ${
                    selectedPack === 'fourPack'
                      ? 'border-[#F4FF55] bg-[#F4FF55]/10 text-white'
                      : 'border-white/10 hover:border-white/20 text-neutral-400'
                  }`}
                >
                  <div className="text-[10px] font-medium tracking-wider uppercase">4-PACK</div>
                  <div className="text-sm font-bold text-white mt-0.5">$12.00</div>
                  <div className="text-[10px] text-[#F4FF55] mt-0.5 font-semibold">POPULAR</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPack('twelvePack')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedPack === 'twelvePack'
                      ? 'border-[#F4FF55] bg-[#F4FF55]/10 text-white'
                      : 'border-white/10 hover:border-white/20 text-neutral-400'
                  }`}
                >
                  <div className="text-[10px] font-medium tracking-wider uppercase">12-CASE</div>
                  <div className="text-sm font-bold text-white mt-0.5">$32.00</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">SAVE 17%</div>
                </button>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-white/20 rounded-xl px-2 py-1 bg-black/40">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-semibold tabular-nums text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Bag CTA */}
            <button
              type="button"
              onClick={handleAdd}
              disabled={isAdded}
              className={`flex-1 py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 ${
                isAdded
                  ? 'bg-emerald-500 text-black'
                  : 'bg-[#F4FF55] hover:bg-[#ebf836] text-[#080808] active:scale-[0.98]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  ADDED TO BAG
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  ADD TO BAG · ${totalPrice}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

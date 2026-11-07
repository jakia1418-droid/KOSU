import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { CartItem, PackType } from '../types';
import { PRODUCTS } from '../data/products';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onChangePackType: (itemId: string, newPack: PackType) => void;
  onQuickAddSampler: () => void;
  onCheckout: (subtotal: number, discount: number, total: number) => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onChangePackType,
  onQuickAddSampler,
  onCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  if (!isOpen) return null;

  // Calculate Subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    const product = PRODUCTS.find((p) => p.id === item.flavorId);
    if (!product) return acc;
    const unitPrice = product.packOptions[item.packType];
    return acc + unitPrice * item.quantity;
  }, 0);

  const discount = (subtotal * discountPercent) / 100;
  const freeShippingThreshold = 35.0;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const total = Math.max(0, subtotal - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'KOSU10' || clean === 'DRINKS' || clean === 'SUMMER') {
      setDiscountPercent(10);
      setPromoMessage('10% discount applied!');
    } else {
      setDiscountPercent(0);
      setPromoMessage('Invalid code. Try "KOSU10"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0E0E0E] text-white border-l border-white/15 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#141414]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#F4FF55]" />
              <h2 className="text-xl font-display uppercase tracking-wider text-white">
                YOUR BAG ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="px-6 py-3 bg-[#1A1A1A] border-b border-white/10">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-neutral-400">
                {freeShippingRemaining === 0 ? (
                  <span className="text-[#B8F000] font-bold">★ FREE SHIPPING UNLOCKED</span>
                ) : (
                  `ADD $${freeShippingRemaining.toFixed(2)} FOR FREE SHIPPING`
                )}
              </span>
              <span className="text-white font-bold">${subtotal.toFixed(2)} / $35</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#B8F000] transition-all duration-300"
                style={{
                  width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-white/10">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-neutral-400">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wider text-white">
                  YOUR BAG IS EMPTY
                </h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto mb-6">
                  No cold drinks yet. Pick a flavor or grab our 4-pack sampler box.
                </p>
                <button
                  type="button"
                  onClick={onQuickAddSampler}
                  className="px-6 py-3 bg-[#F4FF55] hover:bg-white text-[#080808] font-bold text-xs tracking-widest uppercase rounded-full transition-all duration-200 active:scale-95"
                >
                  ADD 4-PACK SAMPLER · $12
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.flavorId);
                if (!product) return null;

                const unitPrice = product.packOptions[item.packType];
                const itemTotal = (unitPrice * item.quantity).toFixed(2);

                return (
                  <div key={item.id} className="py-4 flex gap-4 items-start">
                    {/* Flavor Color Swatch Thumbnail */}
                    <div
                      className="w-14 h-16 rounded-xl flex items-center justify-center shrink-0 border border-white/20 relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${product.color} 0%, ${product.cardBgColor} 100%)`,
                      }}
                    >
                      <span className="font-display text-lg font-bold text-white drop-shadow">
                        {product.name.slice(0, 2)}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-display text-lg uppercase tracking-tight text-white leading-tight">
                            {product.name}
                          </h4>
                          {/* Pack Type Selector */}
                          <div className="flex items-center gap-1.5 mt-1">
                            {(['single', 'fourPack', 'twelvePack'] as PackType[]).map((pType) => (
                              <button
                                key={pType}
                                type="button"
                                onClick={() => onChangePackType(item.id, pType)}
                                className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                                  item.packType === pType
                                    ? 'bg-[#F4FF55] text-[#080808] font-bold'
                                    : 'bg-white/5 text-neutral-400 hover:text-white'
                                }`}
                              >
                                {pType === 'single' ? 'Single' : pType === 'fourPack' ? '4-Pack' : '12-Pack'}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-500 hover:text-rose-400 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-white/20 rounded-lg bg-black/40">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 text-neutral-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 text-neutral-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-sm font-bold text-white">
                          ${itemTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#121212] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="PROMO CODE (e.g. KOSU10)"
                    className="w-full px-3 py-2 bg-black border border-white/20 rounded-lg text-xs font-mono uppercase text-white placeholder-neutral-500 focus:outline-none focus:border-[#F4FF55]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-lg text-xs font-mono font-bold uppercase transition-colors"
                >
                  APPLY
                </button>
              </form>
              {promoMessage && (
                <div
                  className={`text-[11px] font-mono ${
                    discountPercent > 0 ? 'text-[#B8F000]' : 'text-rose-400'
                  }`}
                >
                  {promoMessage}
                </div>
              )}

              {/* Subtotals */}
              <div className="space-y-1 text-xs font-mono text-neutral-400 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#B8F000]">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{freeShippingRemaining === 0 ? 'FREE' : '$4.50'}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-[#F4FF55]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => onCheckout(subtotal, discount, total)}
                className="w-full py-4 bg-[#F4FF55] hover:bg-white text-[#080808] font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-200 shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                PROCEED TO CHECKOUT · ${total.toFixed(2)}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

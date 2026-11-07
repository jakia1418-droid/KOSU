import React from 'react';
import { CheckCircle, Package, ArrowRight, X } from 'lucide-react';
import { CartItem } from '../types';
import { PRODUCTS } from '../data/products';

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  onClearCart: () => void;
}

export const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  discount,
  total,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  const handleFinish = () => {
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={handleFinish} />

      <div className="relative w-full max-w-lg bg-[#0E0E0E] text-white rounded-3xl border-2 border-white/20 p-6 sm:p-8 shadow-2xl z-10">
        <button
          onClick={handleFinish}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 transition-colors"
          aria-label="Close receipt"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Confirmation Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#B8F000] text-[#080808] rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#B8F000]">
            ORDER CONFIRMED · #{orderNumber}
          </span>
          <h3 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-white mt-1">
            COLD CANS ON THE WAY.
          </h3>
          <p className="text-xs text-neutral-300 mt-1 font-body">
            We're packing your fruit sodas in cold insulation. Expected delivery in 2 business days.
          </p>
        </div>

        {/* Itemized Receipt */}
        <div className="bg-[#181818] rounded-2xl p-4 border border-white/10 max-h-56 overflow-y-auto mb-6 divide-y divide-white/10">
          {cartItems.map((item) => {
            const product = PRODUCTS.find((p) => p.id === item.flavorId);
            if (!product) return null;

            const packLabel =
              item.packType === 'single'
                ? 'Single 330ml Can'
                : item.packType === 'fourPack'
                ? '4-Pack Box'
                : '12-Pack Case';

            const itemTotal = (product.packOptions[item.packType] * item.quantity).toFixed(2);

            return (
              <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: product.color }}
                  />
                  <div>
                    <div className="font-bold uppercase text-white font-mono">
                      {product.name} × {item.quantity}
                    </div>
                    <div className="text-[10px] text-neutral-400">{packLabel}</div>
                  </div>
                </div>
                <div className="font-mono font-bold text-white">${itemTotal}</div>
              </div>
            );
          })}
        </div>

        {/* Totals Breakdown */}
        <div className="space-y-1.5 text-xs font-mono text-neutral-300 mb-6 border-b border-white/10 pb-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-[#B8F000]">
              <span>Promo Discount (10%)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Cold Pack Shipping</span>
            <span className="text-[#B8F000]">FREE</span>
          </div>
          <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
            <span>Total Paid</span>
            <span className="text-[#F4FF55]">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Complete Button */}
        <button
          type="button"
          onClick={handleFinish}
          className="w-full py-4 bg-[#F4FF55] hover:bg-white text-[#080808] font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-200 shadow-md active:scale-95"
        >
          BACK TO STORE
        </button>
      </div>
    </div>
  );
};

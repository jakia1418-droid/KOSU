import React, { useState, useEffect } from 'react';
import { ProductFlavor, CartItem, PackType } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandIntro } from './components/BrandIntro';
import { ProductCollection } from './components/ProductCollection';
import { LifestyleGallery } from './components/LifestyleGallery';
import { FlavorDiscovery } from './components/FlavorDiscovery';
import { GoodCompanySection } from './components/GoodCompanySection';
import { NewsletterFooter } from './components/NewsletterFooter';
import { BagDrawer } from './components/BagDrawer';
import { CanDetailModal } from './components/3d/CanDetailModal';
import { OrderSummaryModal } from './components/OrderSummaryModal';

export default function App() {
  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kosu_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default starter item for instant gratification
    return [
      {
        id: 'starter-calamansi',
        flavorId: 'calamansi',
        packType: 'fourPack',
        quantity: 1,
        priceAtAddition: 12.0,
      },
    ];
  });

  const [isBagOpen, setIsBagOpen] = useState(false);
  const [selectedModalCan, setSelectedModalCan] = useState<ProductFlavor | null>(null);
  const [orderSummaryState, setOrderSummaryState] = useState<{
    isOpen: boolean;
    subtotal: number;
    discount: number;
    total: number;
  }>({
    isOpen: false,
    subtotal: 0,
    discount: 0,
    total: 0,
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kosu_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (flavorId: string, packType: PackType, quantity: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.flavorId === flavorId && i.packType === packType
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        const product = PRODUCTS.find((p) => p.id === flavorId);
        const price = product ? product.packOptions[packType] : 3.2;
        return [
          ...prev,
          {
            id: `${flavorId}-${packType}-${Date.now()}`,
            flavorId,
            packType,
            quantity,
            priceAtAddition: price,
          },
        ];
      }
    });
    setIsBagOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleChangePackType = (itemId: string, newPack: PackType) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const product = PRODUCTS.find((p) => p.id === item.flavorId);
          const price = product ? product.packOptions[newPack] : item.priceAtAddition;
          return {
            ...item,
            packType: newPack,
            priceAtAddition: price,
          };
        }
        return item;
      })
    );
  };

  const handleQuickAddSampler = () => {
    handleAddToCart('pink-guava', 'fourPack', 1);
  };

  const handleCheckout = (subtotal: number, discount: number, total: number) => {
    setIsBagOpen(false);
    setOrderSummaryState({
      isOpen: true,
      subtotal,
      discount,
      total,
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('kosu_cart');
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#F4FF55] selection:text-[#080808]">
      {/* Top Sticky Header */}
      <Navbar cartCount={totalCartCount} onOpenBag={() => setIsBagOpen(true)} />

      {/* Main Single-Page Experience with all 7 Sections */}
      <main>
        {/* SECTION 01 — HERO */}
        <HeroSection />

        {/* SECTION 02 — BRAND INTRODUCTION */}
        <BrandIntro />

        {/* SECTION 03 — PRODUCT COLLECTION (THE DRINKS) */}
        <ProductCollection
          onOpenDetails={(flavor) => setSelectedModalCan(flavor)}
          onAddToCart={handleAddToCart}
        />

        {/* SECTION 04 — LIFESTYLE / CAMPAIGN GALLERY */}
        <LifestyleGallery />

        {/* SECTION 05 — FLAVOR DISCOVERY */}
        <FlavorDiscovery
          onOpenDetails={(flavor) => setSelectedModalCan(flavor)}
          onAddToCart={handleAddToCart}
        />

        {/* SECTION 06 — GOOD DRINKS, GOOD COMPANY */}
        <GoodCompanySection />
      </main>

      {/* SECTION 07 — NEWSLETTER AND FOOTER */}
      <NewsletterFooter />

      {/* Slide-Over Shopping Bag Drawer */}
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onChangePackType={handleChangePackType}
        onQuickAddSampler={handleQuickAddSampler}
        onCheckout={handleCheckout}
      />

      {/* 360° 3D Can Inspection Modal */}
      <CanDetailModal
        flavor={selectedModalCan}
        isOpen={Boolean(selectedModalCan)}
        onClose={() => setSelectedModalCan(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Order Summary Confirmation Modal */}
      <OrderSummaryModal
        isOpen={orderSummaryState.isOpen}
        onClose={() => setOrderSummaryState((prev) => ({ ...prev, isOpen: false }))}
        cartItems={cartItems}
        subtotal={orderSummaryState.subtotal}
        discount={orderSummaryState.discount}
        total={orderSummaryState.total}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

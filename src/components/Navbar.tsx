import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenBag: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenBag }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'OUR STORY', href: '#story' },
    { label: 'OUR DRINKS', href: '#drinks' },
    { label: 'GOOD MOMENTS', href: '#moments' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/90 backdrop-blur-md py-3 border-b border-white/10 shadow-lg'
            : 'bg-gradient-to-b from-black/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-white group focus:outline-none"
            aria-label="KOSU Brand Home"
          >
            {/* Bold Monogram Icon */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#F4FF55] text-[#080808] flex items-center justify-center font-display text-2xl font-black rounded-sm transition-transform duration-200 group-hover:scale-105">
              K
            </div>
            <span className="font-display text-2xl sm:text-3xl tracking-wider text-white">
              KOSU
            </span>
          </a>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-black/40 border border-white/15 rounded-full backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-5 py-2 text-xs font-bold tracking-widest uppercase text-white/90 hover:text-[#080808] hover:bg-[#F4FF55] rounded-full transition-all duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#drinks"
              className="px-5 py-2 text-xs font-bold tracking-widest uppercase bg-[#F4FF55] text-[#080808] hover:bg-white rounded-full transition-all duration-200 whitespace-nowrap shadow-sm"
            >
              SHOP
            </a>
          </nav>

          {/* Right Action: Shopping Bag & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBag}
              className="flex items-center gap-2 px-4 py-2 bg-[#F4FF55] hover:bg-white text-[#080808] rounded-full text-xs font-bold tracking-wider transition-all duration-200 shadow-sm active:scale-95"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="font-mono font-bold">BAG ({cartCount})</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#F4FF55] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#080808]/95 backdrop-blur-lg pt-24 px-6 md:hidden flex flex-col justify-between pb-12 animate-in fade-in duration-200">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-display uppercase tracking-wider text-white hover:text-[#F4FF55] transition-colors border-b border-white/10 pb-4"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#drinks"
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-display uppercase tracking-wider text-[#F4FF55] hover:text-white transition-colors border-b border-white/10 pb-4"
            >
              SHOP THE DRINKS
            </a>
          </div>

          <div className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
            GOOD DRINKS. GOOD COMPANY.
          </div>
        </div>
      )}
    </>
  );
};

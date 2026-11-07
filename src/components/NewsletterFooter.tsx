import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const NewsletterFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate reliable subscription storage in localStorage
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('kosu_newsletter') || '[]');
        if (!stored.includes(email.trim().toLowerCase())) {
          stored.push(email.trim().toLowerCase());
          localStorage.setItem('kosu_newsletter', JSON.stringify(stored));
        }
        setStatus('success');
      } catch {
        setStatus('success');
      }
    }, 600);
  };

  return (
    <footer className="bg-[#F4FF55] text-[#080808] pt-20 sm:pt-28 md:pt-36 pb-12 border-t-2 border-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 sm:pb-24 border-b-2 border-[#080808]">
          {/* Left: Headline & Shelf Thumbnail */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-[#080808]">
                  [ 05 · NEWSLETTER ]
                </span>
              </div>

              <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-display uppercase tracking-tight text-[#080808] leading-[0.88] mb-4">
                A LITTLE GOOD
                <br />
                IN YOUR INBOX.
              </h2>

              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#080808]/80 max-w-md">
                NEW DRINKS, LITTLE UPDATES, AND WHATEVER WE'RE UP TO NEXT.
              </p>
            </div>

            {/* Shelf Photo Thumbnail */}
            <div className="mt-8 hidden sm:block">
              <div className="inline-block relative rounded-xl overflow-hidden border-2 border-[#080808] shadow-[4px_4px_0px_#080808] bg-black">
                <img
                  src="/assets/slices/shelf_small.jpg"
                  alt="KOSU fruit sodas lined on a corner shop refrigerator shelf"
                  className="w-48 h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-[#080808] text-[#F4FF55] text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase">
                  CORNER SHELF
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form & Navigation Links */}
          <div className="lg:col-span-6 flex flex-col justify-between pt-2">
            {/* Quick Links Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10 text-xs font-bold font-mono tracking-widest uppercase">
              <div className="space-y-2.5">
                <a href="#" className="block hover:underline">HOME</a>
                <a href="#story" className="block hover:underline">OUR STORY</a>
                <a href="#moments" className="block hover:underline">GOOD MOMENTS</a>
              </div>
              <div className="space-y-2.5">
                <a href="#drinks" className="block hover:underline">THE DRINKS</a>
                <a href="#drinks" className="block hover:underline">SHOP CANS</a>
                <a href="#gallery" className="block hover:underline">GALLERY</a>
              </div>
              <div className="space-y-2.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block hover:underline"
                >
                  INSTAGRAM
                </a>
                <a href="#contact" className="block hover:underline">CONTACT</a>
                <a href="#privacy" className="block hover:underline">PRIVACY</a>
              </div>
            </div>

            {/* Newsletter Input Form */}
            <div className="bg-[#FFF9ED] p-6 sm:p-8 rounded-3xl border-2 border-[#080808] shadow-[8px_8px_0px_#080808]">
              {status === 'success' ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold font-mono tracking-wider uppercase">
                      YOU'RE ON THE LIST!
                    </div>
                    <div className="text-xs mt-0.5">
                      Expect occasional good things, flavor drop alerts, and small moments.
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <label htmlFor="newsletter-email" className="block text-xs font-bold font-mono tracking-widest uppercase text-[#080808]">
                    ENTER YOUR EMAIL FOR FLAVOR DROPS
                  </label>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 px-4 py-3 bg-white border-2 border-[#080808] rounded-xl text-sm text-[#080808] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#080808]"
                      required
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="px-6 py-3 bg-[#080808] hover:bg-neutral-800 text-white font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-200 active:scale-95 whitespace-nowrap"
                    >
                      {status === 'loading' ? 'SUBMITTING...' : 'SIGN ME UP'}
                    </button>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errorMessage}
                    </div>
                  )}

                  <p className="text-[10px] text-neutral-600 font-mono tracking-wide">
                    NO SPAM. NO COMPLICATED EMAILS. UNSUBSCRIBE ANYTIME.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section: Monogram Graphic & Manifesto */}
        <div className="pt-16 sm:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Giant Monogram Graphic */}
          <div className="lg:col-span-5 flex items-center gap-4">
            <div className="w-24 sm:w-32 h-auto">
              <img
                src="/assets/slices/footer_monogram.png"
                alt="KOSU Bold Monogram Mark"
                className="w-full h-auto object-contain filter drop-shadow-[4px_4px_0px_#080808]"
              />
            </div>
            <div>
              <div className="font-display text-5xl sm:text-7xl tracking-wider text-[#080808] leading-none">
                KOSU
              </div>
              <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#080808]/70">
                GOOD DRINKS. GOOD COMPANY.
              </div>
            </div>
          </div>

          {/* Brand Manifesto Prose */}
          <div className="lg:col-span-7">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-tight text-[#080808] leading-relaxed max-w-2xl font-mono">
              KOSU IS INSPIRED BY THE LITTLE PLACES THAT BRING PEOPLE TOGETHER. THE FAMILIAR FACES, UNEXPECTED CONVERSATIONS, AND EVERYDAY MOMENTS THAT TURN AN ORDINARY DAY INTO SOMETHING WORTH REMEMBERING. WE CELEBRATE THE SIMPLE JOY OF GOOD DRINKS, GOOD COMPANY, AND TAKING A LITTLE TIME TO ENJOY BOTH, WHEREVER YOU ARE.
            </p>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-16 pt-8 border-t-2 border-[#080808] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono font-bold tracking-widest uppercase text-[#080808]/80 gap-4">
          <div className="flex items-center gap-6">
            <a href="#" className="hover:underline">PRIVACY POLICY</a>
            <a href="#" className="hover:underline">IMPRINT</a>
            <a href="#" className="hover:underline">TERMS</a>
          </div>
          <div>
            KOSU BEVERAGE CO. © 2026 · ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
};

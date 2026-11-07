import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const GoodCompanySection: React.FC = () => {
  const editorialCards = [
    {
      id: 'basket',
      image: '/assets/slices/company_basket.jpg',
      alt: 'Fresh peaches and cold KOSU fruit soda cans packed in a blue market crate',
      caption: 'MARKET RUNS & FRESH PEACHES',
      badge: 'SPONTANEOUS',
    },
    {
      id: 'splash',
      image: '/assets/slices/company_splash.jpg',
      alt: 'Pink Guava KOSU fruit soda pouring into ice cubes with effervescent sparkling splash',
      caption: 'ICE COLD & EFFEFFERVESCENT',
      badge: 'ICED FILL',
    },
    {
      id: 'hand-can',
      image: '/assets/slices/company_hand.jpg',
      alt: 'Sunlit hand holding a chilled gold can of KOSU fruit soda outdoors',
      caption: 'SUN DRENCHED AFTERNOONS',
      badge: 'GOLDEN HOUR',
    },
  ];

  return (
    <section className="py-24 sm:py-32 md:py-40 bg-[#FFF9ED] text-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#080808] pb-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-neutral-500 font-mono mb-2">
              <span>OUT IN THE WORLD</span>
              <span>·</span>
              <span>GOOD COMPANY</span>
            </div>
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-display uppercase tracking-tight text-[#080808] leading-[0.88]">
              GOOD DRINKS.
              <br />
              GOOD COMPANY.
            </h2>
          </div>
          <div className="mt-4 md:mt-0 max-w-sm text-right">
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-body">
              Some moments call for a little something good. Bring your people, pick your flavor, and make the ordinary feel a little more interesting.
            </p>
          </div>
        </div>

        {/* 3 Horizontal Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 sm:mb-20">
          {editorialCards.map((card) => (
            <div
              key={card.id}
              className="group flex flex-col rounded-3xl overflow-hidden border-2 border-[#080808] bg-[#0E0E0E] text-white shadow-[8px_8px_0px_#080808] transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0px_#080808]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider uppercase bg-[#F4FF55] text-[#080808] rounded-md shadow">
                    {card.badge}
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5 bg-[#141414] border-t-2 border-[#080808] flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-300">
                  {card.caption}
                </span>
                <span className="text-neutral-500 group-hover:text-[#F4FF55] transition-colors">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Panoramic Campaign Banner: "A LITTLE GOOD FOR THE FRIDGE" */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#080808] bg-[#E2F0FE] shadow-[12px_12px_0px_#080808]">
          <div className="relative w-full h-80 sm:h-96 md:h-[420px] overflow-hidden">
            <img
              src="/assets/slices/panoramic_fridge_cans.jpg"
              alt="Four KOSU cans (Pink Guava, Calamansi, Pandan, Tamarind) arranged on pastel geometric blocks under clear sunny sky"
              className="w-full h-full object-cover object-bottom"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />
          </div>

          {/* Panoramic Bottom Editorial Strip */}
          <div className="p-6 sm:p-8 md:p-10 bg-[#FFF9ED] border-t-2 border-[#080808] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#FF782B]" />
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-600">
                  THE ESSENTIAL 4-FLAVOR ROTATION
                </span>
              </div>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-tight text-[#080808]">
                A LITTLE GOOD FOR THE FRIDGE.
              </h3>
              <p className="text-xs sm:text-sm font-mono tracking-wider uppercase text-neutral-600 mt-1">
                FOUR FLAVORS. FIND THE ONES YOU'LL WANT TO KEEP CLOSE.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="#drinks"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#080808] hover:bg-[#F4FF55] text-white hover:text-[#080808] rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-md active:scale-95"
              >
                EXPLORE THE DRINKS
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';

export const LifestyleGallery: React.FC = () => {
  const galleryItems = [
    {
      id: 'pass-it-along',
      image: '/assets/slices/gallery_1_yellow_dress.jpg',
      alt: 'Young woman laughing outdoors in yellow dress enjoying a cold green can of KOSU fruit soda',
      title: 'PASS IT ALONG',
      code: 'E2 · SUNSHINE ARCHIVE',
      aspect: 'aspect-[4/5]',
      accent: 'border-[#B8F000]',
    },
    {
      id: 'nowhere-to-be',
      image: '/assets/slices/gallery_2_circle_face.jpg',
      alt: 'Artistic frame of friend looking into a cold yellow KOSU can within graphic concentric yellow circles',
      title: 'NOWHERE TO BE',
      code: 'E2 · AFTERNOONS',
      aspect: 'aspect-[5/4]',
      accent: 'border-[#F4FF55]',
    },
    {
      id: 'cold-hands',
      image: '/assets/slices/gallery_3_pink_hand.jpg',
      alt: 'Close-up of hand holding icy cold Pink Guava KOSU can with sparkling condensation droplets',
      title: 'COLD HANDS, GOOD DAY',
      code: 'E2 · ICED REFRESHMENT',
      aspect: 'aspect-square',
      accent: 'border-[#F58BD4]',
    },
    {
      id: 'just-out-the-door',
      image: '/assets/slices/gallery_4_pool_table.jpg',
      alt: 'Multiple KOSU beverage cans arranged in a pool table triangle rack with neon balls',
      title: 'JUST OUT THE DOOR',
      code: 'E2 · SOCIAL SESSIONS',
      aspect: 'aspect-[3/4]',
      accent: 'border-[#B8F000]',
    },
  ];

  return (
    <section id="gallery" className="py-24 sm:py-32 md:py-40 bg-[#080808] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/15 pb-8 mb-16 sm:mb-20">
          <div>
            <div className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#F4FF55] font-mono mb-2">
              EVERYDAY · CAMPAIGN GALLERY
            </div>
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-display uppercase tracking-tight text-white leading-none">
              NO REASON REQUIRED.
            </h2>
          </div>
          <div className="mt-4 md:mt-0 max-w-xs text-right">
            <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 leading-relaxed">
              A COLD CAN. A FEW FRIENDS. NOTHING TO CELEBRATE, AND THAT IS THE POINT.
            </p>
          </div>
        </div>

        {/* Asymmetrical Editorial Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Item 1: Tall Vertical (Yellow dress portrait) */}
          <div className="md:col-span-5 flex flex-col group">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-neutral-900 shadow-2xl transition-all duration-500 group-hover:border-[#B8F000]">
              <img
                src={galleryItems[0].image}
                alt={galleryItems[0].alt}
                className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex items-center justify-between pt-3 text-[11px] font-mono tracking-widest uppercase text-neutral-400">
              <span className="text-white font-bold group-hover:text-[#F4FF55] transition-colors">
                {galleryItems[0].title}
              </span>
              <span>{galleryItems[0].code}</span>
            </div>
          </div>

          {/* Item 2: Wide Horizontal (Circle face look) */}
          <div className="md:col-span-7 flex flex-col group md:mt-12">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-neutral-900 shadow-2xl transition-all duration-500 group-hover:border-[#F4FF55]">
              <img
                src={galleryItems[1].image}
                alt={galleryItems[1].alt}
                className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex items-center justify-between pt-3 text-[11px] font-mono tracking-widest uppercase text-neutral-400">
              <span className="text-white font-bold group-hover:text-[#F4FF55] transition-colors">
                {galleryItems[1].title}
              </span>
              <span>{galleryItems[1].code}</span>
            </div>
          </div>

          {/* Item 3: Square Macro (Pink can condensation hand) */}
          <div className="md:col-span-6 flex flex-col group md:mt-8">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-neutral-900 shadow-2xl transition-all duration-500 group-hover:border-[#F58BD4]">
              <img
                src={galleryItems[2].image}
                alt={galleryItems[2].alt}
                className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex items-center justify-between pt-3 text-[11px] font-mono tracking-widest uppercase text-neutral-400">
              <span className="text-white font-bold group-hover:text-[#F58BD4] transition-colors">
                {galleryItems[2].title}
              </span>
              <span>{galleryItems[2].code}</span>
            </div>
          </div>

          {/* Item 4: Pool Table Can Rack */}
          <div className="md:col-span-6 flex flex-col group">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-neutral-900 shadow-2xl transition-all duration-500 group-hover:border-[#B8F000]">
              <img
                src={galleryItems[3].image}
                alt={galleryItems[3].alt}
                className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex items-center justify-between pt-3 text-[11px] font-mono tracking-widest uppercase text-neutral-400">
              <span className="text-white font-bold group-hover:text-[#B8F000] transition-colors">
                {galleryItems[3].title}
              </span>
              <span>{galleryItems[3].code}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

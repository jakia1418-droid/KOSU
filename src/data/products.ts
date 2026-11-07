import { ProductFlavor } from '../types';

export const PRODUCTS: ProductFlavor[] = [
  {
    id: 'calamansi',
    name: 'CALAMANSI',
    tagline: 'BRIGHT CITRUS. A LITTLE SALTY AT THE FINISH.',
    color: '#B8F000',          // Electric Lime Green
    deepColor: '#176B17',      // Deep Forest Green
    secondaryColor: '#E4FFA1', // Soft Lime Tint
    cardBgColor: '#0E3911',    // Deep green atmosphere for card base
    textColor: '#080808',
    personality: 'Bright, zesty and refreshing.',
    shortDescription: 'A lively citrus-inspired flavor with a bright, refreshing character.',
    fullDescription: 'Cold-pressed Philippine calamansi fruit meets crisp effervescence and a delicate whisper of sea salt. Designed for scorching afternoons and spontaneous backyard toasts.',
    tastingNotes: ['Tart Calamansi Lime', 'Sea Salt Mineral Finish', 'Mandarin Blossom', 'Crisp Cold Bubbles'],
    pairing: 'Salty snacks, hot afternoons & grilled street skewers',
    size: '330 ML CAN / USD 3.20',
    pricePerCan: 3.20,
    packOptions: {
      single: 3.20,
      fourPack: 12.00,
      twelvePack: 32.00,
    },
    alcVolume: '0.0% VOL',
    calories: '45 CAL',
  },
  {
    id: 'pink-guava',
    name: 'PINK GUAVA',
    tagline: 'JAMMY FRUIT WITH A PEPPERY KICK.',
    color: '#FF74B8',          // Vibrant Hot Pink
    deepColor: '#9E1C60',      // Deep Berry Pink
    secondaryColor: '#FFD3E8', // Soft Rose Pink
    cardBgColor: '#450D2B',    // Deep berry base
    textColor: '#080808',
    personality: 'Juicy, tropical and playful.',
    shortDescription: 'A vibrant tropical-inspired flavor with a juicy, playful personality.',
    fullDescription: 'Sun-ripened pink guava purée folded into sparkling spring water with a subtle cracked white pepper warmth. Juicy, bold, and delightfully unapologetic.',
    tastingNotes: ['Tropical Guava Pulp', 'Cracked White Pepper', 'Pink Grapefruit', 'Velvety Fizz'],
    pairing: 'Poolside chatter, fish tacos & late evening strolls',
    size: '330 ML CAN / USD 3.20',
    pricePerCan: 3.20,
    packOptions: {
      single: 3.20,
      fourPack: 12.00,
      twelvePack: 32.00,
    },
    alcVolume: '0.0% VOL',
    calories: '50 CAL',
  },
  {
    id: 'pandan',
    name: 'PANDAN',
    tagline: 'DISTINCTIVE BOTANICAL WITH CREAMY SWEET NOTES.',
    color: '#19A54A',          // Fresh Botanical Green
    deepColor: '#075A2D',      // Deep Jungle Green
    secondaryColor: '#99F6B4', // Soft Mint
    cardBgColor: '#062B17',    // Rich dark pine
    textColor: '#FFFFFF',
    personality: 'Distinctive, aromatic and tropical.',
    shortDescription: 'A distinctive tropical flavor with an unmistakable green identity.',
    fullDescription: 'Steeped Southeast Asian pandan leaves delivering aromatic vanilla and grassy warmth, elevated by light botanical carbonation.',
    tastingNotes: ['Steeped Pandan Leaves', 'Natural Vanilla Hue', 'Toasted Rice', 'Silky Sparkling Finish'],
    pairing: 'Coconut sticky rice, park hangouts & rooftop listening',
    size: '330 ML CAN / USD 3.20',
    pricePerCan: 3.20,
    packOptions: {
      single: 3.20,
      fourPack: 12.00,
      twelvePack: 32.00,
    },
    alcVolume: '0.0% VOL',
    calories: '40 CAL',
  },
  {
    id: 'tamarind',
    name: 'TAMARIND',
    tagline: 'A COLA-LIKE CHARACTER WITH A SOUR STREAK AND WARM SPICE.',
    color: '#FF782B',          // Tangerine Orange
    deepColor: '#D74313',      // Deep Burnt Terracotta
    secondaryColor: '#FED7AA', // Warm Peach
    cardBgColor: '#3D1505',    // Deep terracotta base
    textColor: '#080808',
    personality: 'Tangy, bold and expressive.',
    shortDescription: 'A bold, tangy-inspired flavor with a rich visual personality.',
    fullDescription: 'Rich, caramelized tamarind paste balanced with cinnamon, allspice, and a punchy sour tang that cuts through heat with irresistible depth.',
    tastingNotes: ['Tangy Sweet Tamarind', 'Warm Cinnamon Bark', 'Dark Brown Sugar', 'Effervescent Cola Bite'],
    pairing: 'Spicy noodles, golden hour records & dusk conversations',
    size: '330 ML CAN / USD 3.20',
    pricePerCan: 3.20,
    packOptions: {
      single: 3.20,
      fourPack: 12.00,
      twelvePack: 32.00,
    },
    alcVolume: '0.0% VOL',
    calories: '55 CAL',
  },
];

export interface PackOptions {
  single: number;     // e.g. 3.20
  fourPack: number;   // e.g. 12.00
  twelvePack: number; // e.g. 32.00
}

export interface ProductFlavor {
  id: string;
  name: string;
  tagline: string;
  color: string;          // Dominant brand color
  deepColor: string;      // Dark accent color
  secondaryColor: string; // Soft highlight / tint
  cardBgColor: string;    // Gradient start or soft tint
  textColor: string;      // Label & button text color
  personality: string;
  shortDescription: string;
  fullDescription: string;
  tastingNotes: string[];
  pairing: string;
  size: string;
  pricePerCan: number;
  packOptions: PackOptions;
  alcVolume: string;
  calories: string;
}

export type PackType = 'single' | 'fourPack' | 'twelvePack';

export interface CartItem {
  id: string;
  flavorId: string;
  packType: PackType;
  quantity: number;
  priceAtAddition: number;
}

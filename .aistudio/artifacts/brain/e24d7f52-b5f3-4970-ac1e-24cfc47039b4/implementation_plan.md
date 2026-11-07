# KOSU 3D Beverage Brand Website — Implementation Plan

A comprehensive, production-grade brand website and 3D product showcase for **KOSU**, a modern canned beverage brand embodying the spirit of spontaneous social moments, bold graphic energy, and everyday refreshment: *"NO BIG PLANS. JUST GOOD DRINKS."*

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following key decisions were confirmed with the user during Phase 1:
>
> - **3D Presentation**: Full WebGL 3D scenes for all product showcases using Three.js with PBR metallic shaders, procedural label wrapping, studio lighting with PMREM reflections, and interactive pointer drag / orbit inspection.
> - **Cart & Store Experience**: Interactive slide-over cart drawer with pack selector (Single Can, 4-Pack Sampler, 12-Pack Case), quantity steppers, free shipping threshold bar, and simulated checkout flow with instant order confirmation receipt.
> - **Brand Identity & Naming**: "KOSU" rendered consistently across all typography, headers, 3D can labels, editorial headlines, and footer branding.

---

## 1. Overview & Core Concept

- **What It Does**: A complete, single-page editorial brand destination and 3D product showcase for KOSU canned fruit sodas. Visitors can explore 4 distinctive flavors (Calamansi, Pink Guava, Pandan, Tamarind), interact with realistic 3D beverage cans in real time, discover flavor pairings and tasting moments, browse editorial lifestyle campaigns, add items to a slide-over bag, and subscribe to brand drops.
- **Target Audience / Persona**: Young adults, design-conscious beverage enthusiasts, and lifestyle tastemakers who appreciate modern packaging, bold Swiss typography, and casual social connection.
- **Key Value**: Delivers the feeling of an international creative agency's flagship campaign site—combining high-impact editorial layouts with tactile, responsive 3D WebGL can models and an integrated commerce flow.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Hero Arrival & Immersion**:
   - Clean 3-zone transparent header with bold KOSU logo mark, navigation links (`OUR STORY`, `OUR DRINKS`, `GOOD MOMENTS`), and `BAG (0)` indicator with active item counter.
   - Hero background featuring a sun-drenched pool / summer golden hour social photograph.
   - Large condensed headline: `NO BIG PLANS. JUST GOOD DRINKS.` with smooth reveal animation, supporting copy, and direct anchor CTAs (`EXPLORE OUR DRINKS`, `OUR STORY`).

2. **Brand Story Introduction**:
   - High-energy Hot Pink (`#F58BD4`) canvas accented by a lime-yellow curved geometric graphic badge.
   - Bold condensed headline: `GOOD THINGS HAPPEN AROUND THE CORNER.`
   - Editorial brand prose describing the philosophy of spontaneous everyday enjoyment alongside a lifestyle portrait of someone enjoying a cold KOSU can.

3. **Product Collection (The Drinks)**:
   - Warm cream canvas (`#FFF9ED`) displaying a 2-column desktop grid with 4 distinct flavor cards:
     - **01 Calamansi** (Lime Green `#B8F000` / Deep Green `#176B17`)
     - **02 Pink Guava** (Bright Pink `#FF74B8` / Soft Pink `#FFC0E0`)
     - **03 Pandan** (Fresh Green `#19A54A` / Deep Green `#075A2D`)
     - **04 Tamarind** (Tangerine Orange `#FF782B` / Deep Orange `#D74313`)
   - Each card features an embedded **interactive Three.js 3D WebGL can** with metallic rim geometry, realistic gloss and lighting, hover rotation, flavor description, size spec (`330 ML CAN`), quick `ADD TO BAG +` trigger, and a `VIEW DETAILS` modal trigger.

4. **Interactive 3D Can Inspection Modal**:
   - Clicking `VIEW DETAILS` opens an unobstructed 360° 3D inspection studio with full orbit rotation, can-spin controls, flavor ingredient profile, pack sizing (Single, 4-Pack, 12-Pack), and direct Add-to-Bag action.

5. **Campaign / Lifestyle Editorial Gallery**:
   - Deep Black (`#080808`) backdrop with headline `NO REASON REQUIRED.`
   - Asymmetrical editorial grid featuring 4 dynamic visual compositions: outdoor social toast, neon-yellow pool can view, condensation macro, and multi-flavor pool table arrangement.
   - Hover parallax, image scale micro-interactions, and editorial uppercase captions.

6. **Interactive Flavor Discovery Stage**:
   - Warm Taupe (`#896F66`) environment with headline `EVERY CAN HAS ITS MOMENT.`
   - Left column: interactive 4-flavor selector (`01 CALAMANSI`, `02 PINK GUAVA`, `03 PANDAN`, `04 TAMARIND`) with matching moment callouts (`SALTY SNACKS AND A HOT AFTERNOON`).
   - Right column: dynamic 3D focal stage that smoothly rotates and updates materials, color atmosphere, and flavor notes when the user switches selections.

7. **Good Drinks, Good Company (Editorial & Panoramic Showcase)**:
   - Clean cream section highlighting social moments with a 3-card horizontal lifestyle carousel.
   - Panoramic architectural campaign banner: `A LITTLE GOOD FOR THE FRIDGE.` featuring all 4 KOSU cans on pastel geometric platforms under an open sky.

8. **Newsletter Drop & Brand Footer**:
   - Electric Yellow (`#F4FF55`) full-width section with headline `A LITTLE GOOD IN YOUR INBOX.`
   - Functional email signup form with validation, loading animation, and clean inline success confirmation.
   - Monumental oversized KOSU monogram graphic, footer navigation links, copyright, and closing brand signoff: `"GOOD DRINKS. GOOD COMPANY."`

9. **Slide-Over Shopping Bag Drawer**:
   - Opens smoothly when clicking `BAG (N)` or `ADD TO BAG +`.
   - Displays itemized cans with flavor badge, pack format selection (Single, 4-Pack, 12-Pack), quantity counter `[-] [+]`, subtotal calculation, free shipping progress bar, and a checkout button leading to a complete order summary receipt modal.

---

### Visual Identity & Theme Tokens

- **Primary Colors**:
  - Deep Black: `#080808`
  - Electric Yellow: `#F4FF55`
  - Hot Pink: `#F58BD4`
  - Soft Cream: `#FFF9ED`
  - Warm Taupe: `#896F66`
- **Flavor Color Palettes**:
  - Calamansi: Lime `#B8F000`, Deep Green `#176B17`, Mint Accent `#D9FFA0`
  - Pink Guava: Vivid Pink `#FF74B8`, Soft Petal `#FFC0E0`, Rose `#D93685`
  - Pandan: Leaf Green `#19A54A`, Deep Botanical `#075A2D`, Lime Tint `#66E088`
  - Tamarind: Tangerine `#FF782B`, Burnt Amber `#D74313`, Sun Gold `#FFAE42`
- **Typography**:
  - Display / Headlines: Condensed geometric uppercase (`Bebas Neue` / `Anton` Google Fonts via `@import`, fallback to `Impact`, `Arial Narrow`, sans-serif) for high-impact editorial presence.
  - Body & UI: `Plus Jakarta Sans` / `DM Sans` for crisp legibility and modern proportions.
  - Data / Metrics: Tabular monospace figures (`font-mono tabular-nums`) for prices, volumes, and cart counts.

---

## 3. Key Product Decisions & Trade-Offs

- **Procedural 3D Beverage Can Geometry in Three.js**:
  - *Chosen Approach*: Construct a composite 5-part procedural can assembly (`THREE.Group`) containing:
    1. Main cylindrical body with extruded aluminum bevels.
    2. Recessed top rim and stamped beverage lid.
    3. Pop-tab pull ring with metallic specular highlights.
    4. Concave bottom chime for physical grounding.
    5. High-resolution procedural 2D Canvas label texture generated in memory with crisp KOSU typography, color gradients, and flavor typography.
  - *Why*: Eliminates 404 image dependencies, ensures razor-sharp label text at any screen resolution, enables 100% real-time interactive rotation, and allows instantaneous flavor color switches with zero network latency.
  - *Alternatives Considered*: Loading external `.glb` files was rejected because external 3D model links can break, suffer CORS issues, or cause large initial download delays.
- **Software WebGL & Headless Fallback Guard**:
  - *Chosen Approach*: Implement software WebGL detection (`isSoftwareGl` probe). On headless or low-power GPUs, use `requestRender()` on-demand pacing, capped pixel ratio, and skip heavy multi-pass effects while preserving identical scene visuals.
  - *Why*: Guarantees rock-solid performance across mobile devices, high-refresh desktop displays, and automated testing environments.
- **Client-Side Cart & Newsletter Persistence**:
  - *Chosen Approach*: Reactive React state synchronized with `localStorage` for cart items, bag counts, and newsletter subscription records.
  - *Why*: Allows instant responsiveness, full persistence across page refreshes, and zero fake backend requirements.

---

## 4. Technical Architecture & Data Strategy

### System Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                                App.tsx                                 │
│  State: cartItems, isBagOpen, selectedModalCan, activeFlavorIndex      │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
       ┌────────────┴─────────────┐    ┌─────────────┴────────────┐
       ▼                          ▼    ▼                          ▼
┌──────────────┐          ┌───────────────┐               ┌───────────────┐
│ Navbar.tsx   │          │ BagDrawer.tsx │               │ CanDetail.tsx │
│ • Wordmark   │          │ • Pack Select │               │ • 360° Studio │
│ • Nav links  │          │ • Qty Stepper │               │ • Flavor Info │
│ • Bag toggle │          │ • Order Flow  │               │ • Quick Add   │
└──────────────┘          └───────────────┘               └───────────────┘
       │
       ├──────────────────────────────────────────────────────┐
       ▼                                                      ▼
┌──────────────────────────────────────┐    ┌──────────────────────────────────┐
│ HeroSection.tsx                      │    │ BrandIntro.tsx                   │
│ • Full-bleed summer photography      │    │ • Hot pink canvas (#F58BD4)      │
│ • Large condensed headline reveal    │    │ • Lime decorative curved badge   │
│ • Parallax & CTA navigation          │    │ • Editorial brand philosophy     │
└──────────────────────────────────────┘    └──────────────────────────────────┘
       │                                                      │
       ├──────────────────────────────────────────────────────┘
       ▼
┌──────────────────────────────────────────────────────────────────────┐
│ ProductCollection.tsx (The Drinks Grid)                              │
│ • 4 Distinct flavor cards (Calamansi, Pink Guava, Pandan, Tamarind) │
│ • Embedded ThreeCanCanvas (Real-time WebGL interactive 3D can)       │
│ • Flavor color fields, specs, Add-to-Bag & View-Details actions      │
└──────────────────┬───────────────────────────────────────────────────┘
                   │
       ┌───────────┴──────────────────────────────────────────┐
       ▼                                                      ▼
┌──────────────────────────────────────┐    ┌──────────────────────────────────┐
│ LifestyleGallery.tsx                 │    │ FlavorDiscovery.tsx              │
│ • Deep black canvas (#080808)        │    │ • Warm taupe backdrop (#896F66)  │
│ • "NO REASON REQUIRED." headline     │    │ • 4-Flavor selector menu         │
│ • Asymmetrical 4-frame editorial     │    │ • Synchronized 3D Can Stage      │
└──────────────────────────────────────┘    └──────────────────────────────────┘
       │                                                      │
       ├──────────────────────────────────────────────────────┘
       ▼
┌──────────────────────────────────────────────────────────────────────┐
│ GoodCompanySection.tsx                                               │
│ • "GOOD DRINKS. GOOD COMPANY." horizontal editorial gallery          │
│ • Panoramic pastel podium 4-can hero: "A LITTLE GOOD FOR THE FRIDGE" │
└──────────────────┬───────────────────────────────────────────────────┘
                   ▼
┌──────────────────────────────────────────────────────────────────────┐
│ NewsletterFooter.tsx                                                 │
│ • Electric yellow (#F4FF55) full-width banner                        │
│ • "A LITTLE GOOD IN YOUR INBOX." newsletter with live validation     │
│ • Giant KOSU typographic monogram & brand links                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

### Data Models

```typescript
export interface ProductFlavor {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  color: string;         // Primary flavor hex
  deepColor: string;     // Contrast accent hex
  secondaryColor: string;// Soft tint hex
  accentText: string;    // Contrast text hex
  personality: string;
  description: string;
  flavorNotes: string[];
  pairing: string;
  size: string;
  pricePerCan: number;   // e.g. 3.20
  packOptions: {
    single: number;      // 3.20
    fourPack: number;    // 12.00
    twelvePack: number;  // 32.00
  };
}

export interface CartItem {
  id: string;
  flavorId: string;
  packType: 'single' | 'four' | 'twelve';
  quantity: number;
}
```

---

### Verification & Quality Assurance Strategy

1. **3D WebGL Rig Testing**: Verify that `ThreeCanCanvas` correctly renders smooth cylindrical geometry, metallic aluminum reflection, clear label texture with "KOSU", and responds fluidly to mouse movement and touch drag.
2. **Responsive Breakpoints**: Test at 1440px desktop, 1024px tablet, and 375px mobile viewports to ensure zero horizontal scroll, legible typography scaling, and natural card wrapping.
3. **Interactive Commerce Flow**: Validate adding items to the bag, updating quantities, opening the drawer, and completing the simulated checkout flow.
4. **Build & Lint Verification**: Run `compile_applet` and `lint_applet` simultaneously to ensure error-free compilation and strict TypeScript compliance.

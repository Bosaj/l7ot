# 🐟 L7OT (الحوت) · Moroccan Fish & Seafood Companion

> **The definitive Moroccan Fish & Seafood encyclopedia, Darija marine terminology, live photography, market freshness inspector, and authentic coastal recipe companion with an intelligent Charmoula Calculator.**

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-Passing-00C7B7?logo=vitest&logoColor=white)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌊 Context & Cultural Heritage

With over **3,500 kilometers of pristine coastline** spanning both the Atlantic Ocean and the Mediterranean Sea, Morocco is one of the world's richest marine ecosystems and the **#1 exporter of canned and fresh sardines globally**.

In Moroccan markets (*souks* and *marchés aux poissons*), fish have vibrant, historic **Darija (Moroccan Arabic)** names that differ markedly from Classical Arabic, French, and English:
- Sardines are **سردين (Serdine)**
- European hake/whiting is **ميرلا (Mirla)**
- Gilthead seabream is **الدوراد / الزريقة (Dorade / Zriqa)**
- Meagre / Atlantic croaker is **القرب (Qorb)**
- White seabream is **الشرغو (Chargho)**
- Swordfish is **الإسبادون / بوسف (Spadon / Bousif)**
- Shrimp is **كروفيت (Krovit)**
- Squid is **كالامار (Kalamar)**
- Octopus is **الأخطبوط / الروكاس (Pwilp / Rokas)**
- Mussels are **بوزروك (Bouzroug)**
- Oysters are **المحار (L-M7ar)**

**L7OT** bridges the gap between coastal fishermen, local shoppers, culinary enthusiasts, and diaspora food lovers by providing instant identification, accurate market pricing in Moroccan Dirhams (MAD), real-time Darija pronunciation, and grandmother-tested authentic Moroccan recipes.

---

## ✨ Features & Architecture

### 1. 🐟 Comprehensive Moroccan Fish Directory (24+ Species)
- **Multi-Name Taxonomy**: Moroccan Darija (Arabic script + phonetic Arabizi), French common name, English commercial name, and Latin scientific binomial.
- **Ecological Data**: Habitat classification (Poisson Bleu, Poisson Blanc, Céphalopodes, Crustacés, Mollusques, Cartilagineux) and coastlines (Atlantic, Mediterranean, or both).
- **Landing Ports**: Exact ports of origin (Dakhla, Safi, Essaouira, Al Hoceima, Tanger, Larache, Agadir, Mehdia, Tan-Tan).
- **Market Price Guides**: Updated average pricing in Moroccan Dirhams (MAD / kg or MAD / piece).
- **High-Definition Live Imagery**: Live photographs with graceful SVG fallback.
- **Darija Audio Pronunciation**: Web Speech API integration that speaks the exact Moroccan name on demand.

### 2. 🍲 Authentic Coastal Moroccan Recipes
1. **Sardines Mchermline Mlasqine**: Double-stuffed sardines with spicy charmoula fried to crispy perfection.
2. **Tagine Kouari dial Sardine bel Maticha**: Sardine kefta meatballs in rich cumin-tomato reduction with cured red olives.
3. **Tagine dial L7ot bel Khodra w Citron Confit**: Royal fish steak tagine over sliced potatoes, carrots, and sweet bell peppers.
4. **Crevettes Pil-Pil à la Marocaine**: Sizzling sweet shrimp in bubbling olive oil infused with copious garlic, sweet paprika, and harissa.
5. **Pastilla dial L7ot Royale**: Moroccan banquet pastilla layered with warqa pastry, shrimp, squid, white fish, vermicelli, and black mushrooms.
6. **Pageot / Dorade Royale au Four**: Whole baked sea bream scored and packed with charmoula over seasoned roasted vegetables.
7. **Friture Mixte de Poissons**: Classic crispy seaside fried platter of whiting, sole, squid rings, and red mullet.
8. **Calamars Farcis au Riz et Crevettes**: Stuffed squid tubes with seasoned rice and shrimp in saffron-tomato coulis.
9. **Chorba dial L7ot**: Traditional coastal seafood chowder brewed from concentrated shrimp shell fumet.
10. **Tagine Bouzroug d’Essaouira**: Wild rock mussels simmered in spicy garlic-tomato sauce.
11. **Brochettes d’Espadon Grillé**: Charcoal-grilled swordfish skewers marinated in grated sweet onion and cumin rub.

### 3. 🧂 "Chef L7ot" · Intelligent Charmoula Calculator
- Custom algorithm (`src/lib/charmoula.ts`) calculating exact herb and spice ratios based on fish species, category oil content, cooking style, and guest count (1 to 12 persons).
- Generates exact measurements for:
  - Grated garlic cloves (*Thoum*)
  - Chopped fresh coriander (*Qasbour*) & parsley (*Maadnous*) in grams and tablespoons
  - Cumin beldi (*Kamoun*)
  - Sweet paprika (*Tahmira*)
  - Moroccan red harissa (*Soudaniya*)
  - Cold-pressed virgin olive oil (*Zit Zitoun*)
  - Fresh lemon juice & preserved lemon (*Citron Confit / Beldi*)
  - Special touches (Taliouine saffron, celery bed, bay leaves, extra-fine semolina).
- Provides recommended marinating times and optimal cooking temperatures.

### 4. ⚓ "Dalil Souk" · Market Freshness & Port Guide
- **5-Sense Sensory Test**: Interactive checklist comparing extra-fresh indicators vs decomposing warnings across:
  1. *Eyes (Clarity & Convexity)*
  2. *Gills (Crimson Red & Moisture)*
  3. *Skin & Scales (Metallic Luster & Firm Adhesion)*
  4. *Flesh (Spring-Back Elasticity)*
  5. *Aroma (Invigorating Ocean Spray vs Ammonia)*
- **Moroccan Ports Explorer**: Map and details on Dakhla, Safi, Essaouira, Al Hoceima, Tanger, Larache, and Agadir.
- **Seasonal Fishery Calendar**: Interactive month-by-month selector highlighting species at their peak fat and flavor.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (tested on Node v24.19.0)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Bosaj/l7ot.git
cd l7ot

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` to explore the app.

### Testing & Quality Assurance

```bash
# Run Vitest test suite
npm test

# Typecheck with TypeScript
npm run typecheck

# Build optimized production bundle with PWA service worker
npm run build
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8 with `@tailwindcss/vite` (Tailwind CSS v4)
- **Icons**: Lucide React
- **PWA**: `vite-plugin-pwa` for offline capability
- **Test Runner**: Vitest + Testing Library + jsdom
- **Localization**: Trilingual engine (Darija / Arabic, French, English)

---

## 📜 License

MIT License © 2026 [Oussama EL HADJI](https://github.com/Bosaj)

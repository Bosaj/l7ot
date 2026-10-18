# L7OT (الحوت) — The Moroccan Fish & Marine Encyclopedia

<div align="center">

[![CI Pipeline](https://github.com/Bosaj/l7ot/actions/workflows/ci.yml/badge.svg)](https://github.com/Bosaj/l7ot/actions/workflows/ci.yml)
[![CodeQL Security](https://github.com/Bosaj/l7ot/actions/workflows/codeql.yml/badge.svg)](https://github.com/Bosaj/l7ot/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-cyan.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Author: Oussama EL HADJI](https://img.shields.io/badge/Author-Oussama_EL_HADJI-d96b27.svg)](https://www.linkedin.com/in/oussama-el-hadji-388a101b7/)

**The definitive Moroccan seafood encyclopedia, Darija & Oriental dialect taxonomy, port auctions, live marine weather, and coastal culinary heritage.**

[🌐 Explore Live App](https://github.com/Bosaj/l7ot) • [📖 Read the Complete Wiki](https://github.com/Bosaj/l7ot/wiki) • [🐛 Report Issue](https://github.com/Bosaj/l7ot/issues/new/choose)

</div>

---

## 🌊 Overview

**L7OT (الحوت)** is an open-source, cultural, culinary, and oceanographic platform documenting the rich marine heritage of Morocco across **3,500 km of coastline** spanning both the Atlantic Ocean and the Mediterranean Sea.

From the artisanal ports of **Nador and Saïdia** in the Oriental, to **Tangier Med** on the Strait, **Safi and Casablanca** along the central shelf, and the deep southern waters of **Agadir and Dakhla**, L7OT provides an exhaustive, bilingual reference for seafood lovers, chefs, researchers, and everyday market shoppers.

---

## ✨ Key Features

### 1. 🐟 32 Documented Marine Species
* **Real Photography & Latin Taxonomy:** Every species features high-definition imagery, official binomial nomenclature, and biological classification.
* **Regional Moroccan Dialects (Including Oriental):** Comprehensive nomenclature cataloged across **4 Moroccan coastal regions**:
  * **Oriental & Rif (الجهة الشرقية):** Nador, Saidia, Ras Kebdana, Marchica lagoon (*Titchoukt*, *Pagel*, *Kamber*, *Lubina*, *Choco*, *Akharouy*).
  * **Chamal (الشمال):** Tangier, Tetouan, Larache, Al Hoceima (*Sardina*, *Pez Espada*, *Lubina*).
  * **Centre (الوسط):** Casablanca, Rabat, Safi, El Jadida (*Serdine*, *Merla*, *Crevette*).
  * **Sud & Souss (الجنوب وسوس):** Agadir, Tan-Tan, Dakhla, Laâyoune (*Tazenkart*, *Azougar*, *Courbine*).
* **Native Audio Pronunciation:** Built-in speech synthesis pronouncing each fish's name in authentic Moroccan Darija.

### 2. 📍 GPS Coastal Port Geolocation & Local Pricing Engine
* Automatically detects the user's nearest Moroccan coastal port hub using **Haversine great-circle distance**.
* Dynamically adapts the fish catalog to highlight the **local dialect name** and calculates **location-adjusted port auction prices** (reflecting supply dynamics from Nador to Dakhla).

### 3. 🌐 Worldwide Free Marine & Oceanographic APIs Hub
Live interactive telemetry connected to the world’s leading open marine APIs:
1. **Open-Meteo Marine API:** Real-time wave heights, swell directions, wave periods, and artisanal fishing safety indices for 8 Moroccan ports.
2. **WoRMS (World Register of Marine Species):** Authoritative global taxonomy and AphiaID verification.
3. **OBIS (Ocean Biodiversity Information System):** UNESCO-IOC marine occurrence records in Moroccan EEZ waters.
4. **FishBase & SeaLifeBase (rOpenSci):** Trophic levels, ecological vulnerability indices, and biological maturity data.
5. **Open Food Facts:** Open database of packaged and canned Moroccan seafood with Nutri-Score and Eco-Score ratings.
6. **FAO Fisheries Data (ASFIS):** Moroccan catch statistics across international statistical areas FAO 34 & 37.

### 4. 🍽️ 16 Authentic Coastal Recipes & Video Filleting Guides
* Traditional tagines (*Tagine Kouari de Sardine*, *Tagine de Congre aux Raisins Secs*, *Pastilla aux Fruits de Mer*).
* YouTube video demonstrations showcasing traditional Moroccan fish cleaning and filleting techniques (**Le Kessal / الكسال**).

### 5. ⚖️ Chef L7ot Charmoula Calculator
* Interactive spice balance engine calculating exact gram-level proportions of garlic, cumin, paprika, fresh coriander, lemon juice, and olive oil tailored to each fish species and cooking method.

### 6. 📱 AI Camera Fish Scanner
* Mobile-optimized camera scanner enabling users to snap or upload a fish photo at the port or market to instantly detect species, market value, and freshness indicators.

### 7. 🛒 Souk Basket & Species Comparator
* Head-to-head nutritional and economic comparator (Protein, Omega-3, spot price, export value).
* Souk basket budget simulator including *Kessal* cleaning fees and one-click clipboard shopping list export.

---

## 🗺️ Moroccan Regional Dialect Reference Matrix

| Species | Central Darija | Oriental (Nador/Saïdia) | Chamal (Tangier) | Souss & South (Agadir) |
|---|---|---|---|---|
| **Sardine** | السردين (Serdine) | **تيتشوكْتْ (Titchoukt)** / الخشبة | سردينة (Sardina) | تازنكارت (Tazenkart) |
| **Pageot Royal** | الباجو الملكي (Pageot) | **باخيل (Pagel / Bajel)** | باجيل الحجرة | الباجو السوسي |
| **Crevette Rose** | الكروفيت (Crevette) | **كامبار (Kamber)** / الغامبا | الغامبا الشمالية | كروفيت طانطان |
| **Poulpe** | الأخطبوط / الروكبا | **بوكْرون (Boukroun)** / أخروي | أخطبوط المضيق | أخطبوط واد الذهب |
| **Loup / Bar** | بوشوك / الدرعي | **لوبينا (Lubina)** / دراك | لوبينا د كاب سبارطيل | الدرعي السوسي |
| **Calamar** | الكالامار (Calamar) | **شوكو (Choco)** / حبار مارشيكا | كالمار القصر الصغير | كالامار الداخلة |
| **Rouget Barbet** | الروجي (Rouget) | **سالمونيتي (Salmonete)** | روجي الحجرة | الحمرية د سوس |
| **Seiche** | السيبيا (Sepia) | **خيبيا (Jibia)** / نوافة | سيبيا طنجة | زايوط د الداخلة |

---

## 🚀 Quick Start & Local Development

### Prerequisites
* **Node.js:** `v20.x` or `v22.x`
* **npm:** `v10.x+`

### Installation
```bash
# 1. Clone repository
git clone https://github.com/Bosaj/l7ot.git
cd l7ot

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Run tests
npm run test

# 5. Production build
npm run build
```

---

## 🏗️ Architecture & Tech Stack

```
l7ot/
├── src/
│   ├── components/         # UI Components (FishCard, FishModal, Header, MarineWeatherAndApis, PriceBadge...)
│   ├── data/               # 32 Species Catalog, 16 Recipes, International Treaties
│   ├── hooks/              # useUserPortLocation (GPS Haversine engine)
│   ├── i18n/               # Tri-lingual localization strings (AR, FR, EN)
│   ├── lib/                # Speech synthesis, Charmoula calculator, Moroccan Port Regions
│   ├── services/           # Real clients for Open-Meteo, WoRMS, OBIS, FishBase, Open Food Facts
│   └── App.tsx             # Main Application Shell
├── .github/
│   ├── workflows/          # CI Pipeline, CodeQL Security, Release Automation
│   └── ISSUE_TEMPLATE/     # Bug Report, Feature Request, Species Proposal
├── CHANGELOG.md            # Semantic version history
├── CONTRIBUTING.md         # Contribution standards
├── CONTRIBUTORS.md         # Author and open data acknowledgements
└── LICENSE                 # MIT License
```

---

## 📜 License & Author

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

Designed, architected and built with passion by:
**[Oussama EL HADJI](https://www.linkedin.com/in/oussama-el-hadji-388a101b7/)** ([@Bosaj](https://github.com/Bosaj))

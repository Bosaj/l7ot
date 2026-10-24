# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.3] - 2026-10-24

### Fixed & Enhanced
- **Universal Button Protection & Single-Line Text Enforcement:**
  - Added universal base CSS rule in `src/index.css` enforcing `white-space: nowrap !important`, `text-wrap: nowrap !important`, and `line-height: 1.25` on all `<button>` elements across the entire website.
  - Eliminated awkward multi-line text wrapping that distorted button shapes, bloated button heights, or squeezed adjacent UI elements.
- **Harmonized 32px Action Bar in FishCard:**
  - Standardized all 4 action buttons (`Scissors` Cleaning Tutorial, `Zap` Quick Nutrition, `ChefHat` Coastal Chef, and `Eye` View Details) to a uniform 32px (`h-8`) height.
  - Streamlined `t.viewDetails` string across all languages (`عرض التفاصيل` / `Voir détails` / `View Details`) so it never wraps.
  - Added responsive collapse on `Scissors` cleaning button text (`تنقية الحوت`) on compact viewports to display the crisp icon while preserving the primary action button.
- **Cross-Component Button Refinement:**
  - Applied `whitespace-nowrap shrink-0` across recipe cards, modal tabs, seasonal calendar filter pills, and tactical map controls.
- **Verification & Testing:**
  - 100% test pass rate across all 17 test suites (71/71 tests passing).
  - Chrome DevTools MCP verification across mobile (375px), tablet (768px), and desktop (1440px) confirming uniform 32px button heights with zero text wrapping.

---

## [2.1.2] - 2026-10-24

### Fixed & Enhanced
- **Two-Tier Desktop & Mobile Navigation Architecture:**
  - Redesigned the header into two distinct, spacious tiers:
    - **Top Tier**: Moroccan Zellige & Brass Brand Crest, site title, live GPS Port location indicator, audio sound effects toggle, and high-visibility language switcher pills (`العربية` · `FR` · `EN`).
    - **Bottom Tier**: Dedicated full-width navigation bar spanning the entire container.
- **100% Discoverable Desktop Navigation (Zero Hidden Scroll):**
  - Completely resolved the issue where desktop users had to scroll horizontally or missed sections 8–12 entirely.
  - Implemented an immaculate 6-column balanced grid on desktop (`lg:grid-cols-6`) and 4-column grid on tablets (`md:grid-cols-4`).
  - All 12 modules (`01 الأسماك` through `12 طقس الموانئ`) are now 100% visible simultaneously on first visit with zero hidden items.
- **Enhanced Mobile Touch Navigation Rail:**
  - Added Prev/Next directional navigation buttons (`<` and `>`) with bidirectional RTL rotation for effortless tab scrolling on phones.
  - Implemented automatic smooth `scrollIntoView` centering whenever the active tab changes.
- **Test Integrity:**
  - Modernized `tests/integrity.test.mjs` to native Vitest format.
  - 100% test pass rate maintained (71 tests across 17 test suites).

---

## [2.1.1] - 2026-10-24

### Fixed & Enhanced
- **Mobile Responsive Layout & Viewport Deep-Dive:**
  - Resolved intrinsic width overflow on Moroccan Port & Dialect select dropdowns on narrow mobile screens (320px–412px) by adding strict `w-full sm:w-auto max-w-full truncate text-ellipsis`.
  - Converted port action buttons into a symmetrical 2-column mobile grid preventing awkward wrapping.
  - Eliminated blank side margins and horizontal viewport scroll by adding strict `overflow-x: hidden; max-width: 100vw; width: 100%` on `html`, `body`, and `#root`.
  - Modernized Open Source Community card and footer actions with responsive touch-friendly button layouts.
  - Synchronized footer release string to `v2.1.0`.
- **Prominent Header Language Switcher:**
  - Relocated language pills (`العربية` · `FR` · `EN`) from the cramped top ticker into the prominent main header beside the Moroccan brand crest, ensuring thumb accessibility on every mobile device.
- **Production Headers & GitHub Integration:**
  - Enforced clean `Permissions-Policy: camera=(self), microphone=(), geolocation=(self)` eliminating browser ad-policy console warnings.
  - Registered official Vercel Production deployment in GitHub Deployments (`https://l7ot.vercel.app`).
  - Configured repository homepage in GitHub About section.
  - Enriched `README.md` with visual UI screenshot gallery from live production.

---

## [2.1.0] - 2026-10-24

### Added
- **Real Interactive Geographic Map (`MoroccanLeafletMap.tsx`):**
  - Integrated full **Leaflet** engine with true geographic bounds covering all 3,500 km of Moroccan coastline (Saïdia to Lagouira).
  - Multi-layer tile engine with one-click toggles:
    - 🛰️ **Esri World Imagery**: Real-world high-resolution satellite photography showing ports, coastlines, and ocean waters.
    - 🗺️ **CartoDB Dark Matter**: Dark nautical maritime tiles matching the application's navy-slate aesthetic.
    - 🌍 **OpenStreetMap (OSM)**: Standard geographic terrain and street mapping.
  - Interactive nautical port pins with real WGS84 coordinates for all 17 Moroccan commercial fishing ports and 4 Marine Protected Areas (AMPs).
  - Live marine telemetry popups showing swell height (m), wind speed (knots), surface sea temperature (°C), and top freshly landed species.
  - Zoom & pan fly-to animations, protective marine sanctuary radii, and instant "Whole Morocco (3,500 km)" reset viewport control.
  - Seamless toggle between **Real Map (Satellite & Nautical)** and **Vector Radar Projection**.

---

## [2.0.0] - 2026-10-24

### Added
- **Full 44-Species Moroccan Halieutic Catalog Alignment:**
  - Integrated all 44 commercial species with biological taxonomy, 4 regional Moroccan dialect names (Chamal, Oriental, Centre, Sud), culinary profiles, and Dahir 1973 statutory sizes.
- **High-Fidelity Studio Neural Voice Pack (132 Recordings in Darija, French & English):**
  - Native Moroccan Arabic (`ar-MA-JamalNeural`), Parisian French (`fr-FR-VivienneMultilingualNeural`), and American English (`en-US-ChristopherNeural`) neural recordings stored in `public/audio/fish/ar/`, `public/audio/fish/fr/`, and `public/audio/fish/en/` with backward-compatible root aliases.
  - Multilingual voice playback in `FishCard.tsx` and `FishModal.tsx` matching active UI language.
- **Bourse Citoyenne (Crowdsourced Souk & Port Price Reporter) (`CommunityPriceReporter.tsx`):**
  - Live crowdsourced price reporting across 17 Moroccan coastal markets (Marché Central Casablanca, Souk El Had Agadir, Bab El Marsa Tanger, Marché de Safi, etc.).
  - Automated ONP wholesale markup barometer detecting fair margins vs. speculative overpricing.
  - Citizen confirmation and upvote system with `localStorage` persistence.
- **Dynamic Social Specimen Share Cards & Schema.org Rich SEO (`SpecimenShareCardModal.tsx`):**
  - High-resolution 1200x630 HTML5 Canvas generator rendering Moroccan maritime crest, fish artwork, Dahir minimum legal size, and spot price.
  - 1-click WhatsApp share link with pre-formatted bilingual Moroccan text and direct link.
  - Schema.org `Product` (`SeafoodProduct`) and `Recipe` JSON-LD structured data dynamically injected for Google Search rich cards.
- **Edge Vision AI Scanner Enhancement (`FishScanner.tsx`):**
  - Real-time animated bounding box, laser sweep, corneal clarity eye reticle, gill coloration contour arc, and Dahir 1973 length calibrator over live camera video feed.
  - Biometric sensory HUD telemetry readouts.

---

## [1.9.0] - 2026-10-24

### Added
- **Full Offline PWA Service Worker Caching ("Mode Pêcheur en Mer"):**
  - Enhanced `vite-plugin-pwa` Workbox engine to precache 112 assets totaling 18.09 MB (`maximumFileSizeToCacheInBytes: 15MB`), including all 44 high-res Moroccan fish specimens in `public/images/fish/`, webfonts, and biological regulatory tables.
  - Guarantees 100% offline functionality when sailing offshore with zero cellular signal (0G / No 4G/5G).
- **High-Seas Marine Navigator & Gyro Compass (`MarineGpsNavigator.tsx`):**
  - Built an offshore nautical bridge dashboard featuring a rotating SVG gyro compass dial with magnetic needle pointing toward refuge ports.
  - Real-time GPS telemetry: Latitude / Longitude in Nautical DMS (`DD°MM'SS" N/W`) and Decimal Degrees, Speed Over Ground (SOG) in Knots, and GPS precision accuracy ($\pm x$ meters).
  - Haversine Proximity Engine computing nautical distance (`NM`), azimuth bearing ($0-359^\circ$), and sailing travel duration at 8 knots across all 17 Moroccan ONP ports.
- **Moroccan Sovereign Maritime Zone Classifier:**
  - Categorizes vessel distance according to Dahir 1-73-211 and UNCLOS: Territorial Waters (0–12 NM), Contiguous Zone (12–24 NM), Moroccan Exclusive Economic Zone (ZEE 200 NM), and International High Seas (> 200 NM).
- **Marine Protected Areas (AMPs) Sanctuary Proximity Alarm:**
  - Real-time safety status monitoring near 5 marine sanctuaries (Al Hoceima National Park, Marchica Lagoon, Sidi Boughaba, Souss-Massa, and Dakhla Bay) with cautionary biological rest warnings per Dahir 1973.
- **VHF Channel 16 & MRCC Emergency Mayday Generator:**
  - Pre-formatted international distress broadcast message (Canal 16 VHF - 156.800 MHz) with 1-click clipboard copy and direct contact numbers for MRCC Rabat (+212 537 62 58 77), Gendarmerie Maritime (177), and Protection Civile (150).
- **Persistent Offshore Status Banner (`OffshoreFishermanBanner.tsx`):**
  - Live online/offline listener with manual high-seas simulation toggle, sonar ping animation, and quick launcher button.

---

## [1.8.0] - 2026-10-24

### Added
- **Interactive 3,500 km Moroccan Coastal GIS Map & Port Species Hotspots (`MoroccanCoastalRadar.tsx`):**
  - Full-scale cartography covering 17 Moroccan ports (Saïdia to Lagouira), 5 Marine Protected Areas, and 3 Pelagic Corridors.
  - Dedicated navigation tab with filter species action.

---

## [1.7.0] - 2026-10-24

### Added
- **Dynamic Language Typography Font Switching (Arabic, French, English):**
  - Classical `Amiri` serif for Arabic headings, `Playfair Display` for French Riviera luxury, and `Cinzel` for Roman imperial English headings.
- **Moroccan Coastal Tide & Lunar Clock Widget:**
  - Astronomical lunar phase calculation (illumination %, synodic day, spring/neap coefficient index 20–120) and semi-diurnal tides for 6 ports.
- **Printable Specimen Passport (Fiche Technique) Export:**
  - Moroccan commercial passport conforming to Dahir 1973 minimum catch sizes, nutrition, and 1-click Markdown copy.

---

## [1.6.0] - 2026-10-24

### Added
- **Royal & Premium Latin Typography Architecture (Cinzel, Playfair Display & Plus Jakarta Sans):**
  - Integrated `Cinzel` inscriptional serif for royal maritime mastheads, giving English and French the grandeur of an imperial halieutic codex.
  - Paired `Playfair Display` and `Fraunces Variable` for editorial taxonomy headings.
  - Replaced techy Space Grotesk with `@fontsource-variable/plus-jakarta-sans` for body copy, badges, and telemetry with razor-sharp geometric precision and optical kerning (`tracking-[-0.012em]`).
  - Integrated `@fontsource-variable/readex-pro` for modern, clean Arabic typography alongside classical `Amiri` Naskh.
- **Interactive 5-Sense Freshness Diagnostic Lab (`MarketGuide.tsx`):**
  - Interactive evaluation tool testing Cornea clarity, Gill redness, Flesh elasticity, Scale sheen, and Sea-spray aroma.
  - Real-time freshness scoring (0–100%) and instant certification (*Grade A+ Criée Directe*, *Frais Standard*, *Douteux / Passé*) with bubble sound effects.
- **Moroccan Fleet Landing Clock & Golden Hours Guide (`Horloge des Débarquements`):**
  - Detailed dock landing schedules for **Pêche Artisanale** (06:00–09:00, hook-caught Pageot, Bar, Merou), **Chalutiers Côtiers** (11:00–14:30, Soles, Merlu, Calmar), and **Sardiniers** (20:30–02:00, pelagic sardines & anchovies).
- **Localized Primary Species Names in Specimen Cards (`FishCard.tsx` & `FishModal.tsx`):**
  - Displays French or English names as the prominent editorial title when browsing in `fr` or `en`, alongside the authentic Darija name.

### Fixed
- **Root Document Locale & Direction Synchronization (`App.tsx`):**
  - Added dynamic synchronization of `document.documentElement.lang` and `document.documentElement.dir` on language switch, ensuring native browser typography and font-fallback compliance.
- **Bulletproof Touch-Action Scroll Locking across all Modals:**
  - Added `touchAction = 'none'` alongside `overflow = 'hidden'` in `FishModal`, `RecipeModal`, and `CleaningTutorialModal` to eliminate iOS Safari background bounce.
- **Full 3-Language Localization in Market Guide:**
  - Eliminated hardcoded Arabic strings in coastal indicators, peak seasonality headings, and landing port maps.

---

## [1.5.0] - 2026-10-24

### Added
- **Moroccan Seasonal Catch & Biological Rest Calendar (`SeasonalCatchCalendar.tsx`):**
  - Interactive 12-month calendar mapping seafood availability peaks and ministerial biological rest periods (*repos biologique*) to prevent overfishing.
  - Category filters, real-time spot pricing indicators, and direct modal inspection links.
- **Interactive Moroccan Coastal Radar (`MoroccanCoastalRadar.tsx`):**
  - Interactive littoral SVG covering 3,500 km across 13 ports (Saïdia, Nador, Al Hoceima, Tanger Med, Larache, Casablanca, Oualidia, Safi, Essaouira, Agadir, Sidi Ifni, Laâyoune, Dakhla).
  - Real-time swell height, wind speed, water temperature, and click-to-sync regional dialect and pricing adaptation.
- **Pure Web Audio API Sound Synthesizer (`soundEffects.ts`):**
  - Native browser synthesizer implementing `playSonar()`, `playBubble()`, `playScanMatch()`, and `playTabClick()` with persistent local storage mute state.
- **100% Species Cleaning Videos in 3 Languages (Darija, French, English):**
  - Injected dedicated `cleaningVideos: { ar, fr, en }` across all 44 marine species with authentic Moroccan fishmonger and culinary YouTube demonstrations.
- **Multi-Cloud Deployment Suite (Netlify, GitHub Pages, Vercel, Docker):**
  - Production Netlify Edge CDN deployment with atomic redirects (`netlify.toml`, `public/_redirects`).
  - Automated GitHub Pages deployment pipeline (`.github/workflows/deploy-pages.yml`).
  - Multi-stage `Dockerfile` and `docker-compose.yml` with Nginx alpine server.
  - Vercel configuration (`vercel.json`) for multi-cloud parity.

### Fixed
- **Subpath Asset Resolution on GitHub Pages:**
  - Created `assetHelper.ts` with `getAssetUrl()` and converted all absolute `/images/...` and `/favicon.svg` paths to relative paths, fixing broken image icons on `https://bosaj.github.io/l7ot/`.
- **GitHub Pages Workflow Automation:**
  - Automated GitHub Pages enablement with `enablement: true` in `actions/configure-pages@v5`.
- **Cleared Failed Workflow History:**
  - Deleted all failed workflow runs from the `Bosaj/l7ot` repository history.

---

## [1.4.0] - 2026-10-18

### Added
- **Expanded Marine Taxonomy (44 Moroccan Species):**
  - Integrated 12 commercial and artisanal species: Mérou brun (*Epinephelus marginatus*), Lotte de mer / Baudroie (*Lophius piscatorius*), Turbot (*Scophthalmus maximus*), Marbré (*Lithognathus mormyrus*), Sar tambour (*Diplodus cervinus*), Liche amie (*Lichia amia*), Rascasse rouge (*Scorpaena scrofa*), Ombrine côtière (*Umbrina cirrosa*), Homard bleu (*Homarus gammarus*), Dorade grise (*Spondyliosoma cantharus*), Cernier commun (*Polyprion americanus*), and Grande vive (*Trachinus draco*).
  - Sourced and verified 12 high-resolution Wikimedia Commons images stored locally in \`public/images/fish/\` with complete attribution metadata in \`CREDITS.json\`.
  - Dialect mappings across Chamal, Oriental (Rif), Centre, and Sud/Souss.
- **Multi-Language Cleaning & Filleting Video Guide:**
  - Integrated localized multi-language video selector (\`🇲🇦 الدارجة / العربية\`, \`🇫🇷 Français\`, \`🇬🇧 English\`) in \`FishModal\` and \`CleaningTutorialModal\`.
  - Embedded dynamic targeted YouTube search queries per species and language to prevent repetitive video playback.

### Fixed
- **Modal Navigation UX & Scrollbar Elimination:** Replaced horizontal overflow scrollbars with an elegant wrapping pill cluster (\`scrollbar-none\`) preventing clumsy scrollbars on mobile and desktop.
- **Modal Background Scroll Locking:** Added \`document.body.style.overflow = 'hidden'\` on modal mount to prevent page background scrolling during modal interactions.
- **Live Ticker Arabic BiDi Typography:** Restructured \`tickerItems\` to separate amount and unit, ensuring Arabic prices render naturally right-to-left (\`55 درهم/كلغ ▼\`) without character sequence flipping.

---

## [1.3.0] - 2026-10-18

### Added
- **Moroccan Maritime Law & Minimum Catch Size Engine:**
  - Added dedicated \`MaritimeLawGuide\` navigation module based on Arrêté ministériel n° 1154-88, detailing commercial minimum catch sizes across pelagic, demersal, cephalopod, and crustacean species.
  - Interactive visual dual-color fish size gauge illustrating sub-legal prohibited catch zones vs authorized mature catch zones.
  - Official biological rest period calendar (Repos biologique) for Dusky Grouper (Mérou) and Common Octopus (Poulpe).
- **Apnea Spearfishing (Chasse sous-marine) Code:**
  - Interactive 6 golden rules checklist conforming to Moroccan maritime authority (DPM): apnea-only requirement, daytime-only operations, mandatory surface marker buoy with International Alpha flag, strict recreational non-commercial mandate, and mandatory administrative licensing.

---

## [1.2.0] - 2026-10-18

### Added
- **Continuous Dual-Track Infinite Marquee Ticker:**
  - Architected a mathematically seamless, gapless infinite ticker utilizing twin identical tracks (`Track A` and `Track B`) animating via `translate3d(-50%, 0, 0)`.
  - Expanded wholesale port auction feeds to **12 authentic Moroccan fishing ports**: Nador/Beni Ansar (Oriental), Tangier Med (Strait), Al Hoceima (Rif), Larache, Casablanca Port, Oualidia, Safi, Essaouira, Agadir, Tan-Tan/Sidi Ifni, Laâyoune, and Dakhla.
  - Added instant hover-to-pause (`group-hover:[animation-play-state:paused]`) allowing users to inspect spot prices comfortably without movement.
  - Implemented soft bilateral gradient fade masks (`bg-gradient-to-r` and `bg-gradient-to-l`) matching editorial theme `#120f0d`.
- **Responsive Navigation Pill Cluster:**
  - Completely eliminated clumsy horizontal scrollbars on desktop, tablet, and mobile displays.
  - Redesigned navigation items into a modern, wrapping pill cluster (`flex flex-wrap gap-1.5`) with custom Lucide icons (`Fish`, `Camera`, `UtensilsCrossed`, `ChefHat`, `ShoppingBag`, `Globe2`, `Waves`).
- **Deterministic Offline Testing Suite:**
  - Mocked all external third-party network APIs (Open-Meteo, WoRMS, OBIS, FishBase, Open Food Facts, GBIF) with `vi.spyOn(globalThis, 'fetch')`.
  - Reduced test execution time from >4s to **7ms**, eliminating flaky network timeouts in GitHub Actions runners.
  - Added full test coverage for both successful telemetry parsing and resilient offline fallback mechanisms (26/26 passing tests).

### Fixed
- **CodeQL CWE-116 Sanitization Alert:** Fixed incomplete multi-character sanitization in `scripts/download-images.mjs` by implementing an iterative tag stripper and bracket neutralizer (`sanitizeHtml`), fully resolving alert #1 on GitHub Security.
- **Empty Void in RTL Marquee:** Fixed layout flaw where Arabic `dir="rtl"` caused the single ticker track to detach from the right boundary upon translation, leaving an empty black void.
- **RTL / LTR Modal Arrows:** Fixed next/previous directional chevron orientation in `FishModal` to naturally follow Arabic right-to-left layout.
- **Casablanca GPS Geolocation Default:** Fixed location detector so inland or central users seamlessly auto-detect Casablanca / Mohammedia port instead of failing silently.

---

## [1.1.0] - 2026-10-18

### Added
- **Oriental Moroccan Regional Dialects:** Added complete Oriental (الجهة الشرقية: Nador, Saidia, Ras Kebdana, Marchica) dialect fish names across all 32 species (e.g., *Titchoukt*, *Pagel*, *Kamber*, *Lubina*, *Choco*, *Akharouy*).
- **GPS Coastal Port Geolocation Engine:** Automatically detects the user's nearest Moroccan coastal port hub (Oriental, Chamal, Centre, Doukkala-Abda, Souss-Massa, Sahara) using Haversine great-circle calculation and adapts spot prices and dialect naming dynamically.
- **Worldwide Free Marine & Fisheries APIs Integration:**
  - Integrated Open-Meteo Marine API with live wave height, period, swell, and fishing safety indices for 8 Moroccan ports.
  - Connected WoRMS (World Register of Marine Species) REST API for official AphiaID and taxonomy validation.
  - Connected OBIS (Ocean Biodiversity Information System) API for UNESCO-IOC occurrences in Moroccan waters.
  - Connected FishBase / SeaLifeBase API for trophic levels and vulnerability indices.
  - Connected Open Food Facts API for canned and packaged Moroccan seafood verification.
- **Live Science Telemetry Tab:** Added an interactive "APIs Scientifiques" tab inside `FishModal` for instant per-species queries.
- **Automated CI/CD & Security Workflows:** Added GitHub Actions for test-and-build, CodeQL security scanning, and automated release packaging.
- **GitHub Community Standards:** Added issue templates, pull request templates, `CONTRIBUTING.md`, `CONTRIBUTORS.md`, `LICENSE`, and `SECURITY.md`.

### Fixed
- **BiDi (RTL/LTR) Currency Inversion:** Created `<PriceBadge />` ensuring that in Arabic mode, numbers and currencies are read naturally right-to-left without flipping (`14 درهم/كلغ` instead of `درهم/كلغ 14` or `14 kg/DH`).
- **Select Button Overflow:** Fixed flex container sizing in `SoukBasketAndComparator` by applying `min-w-0 flex-1 truncate` to select options and `shrink-0` to buttons.
- **Untranslated Dropdown & Footer Labels:** Fully localized all dropdown text, summary footers, and stats banners in Arabic, French, and English.
- **YouTube Tutorials:** Fixed click-to-play filleting guide video players across all species.

---

## [1.0.0] - 2026-10-18

### Added
- Initial release of L7OT (الحوت) — The Encyclopedia of Moroccan Fish & Seafood.
- 32 fully documented Moroccan species with high-definition real photography.
- 16 authentic coastal Moroccan recipes with step-by-step instructions and video guides.
- Chef L7ot Charmoula Spices Calculator.
- 5-senses market freshness audit guide and port landing calendar.
- Moroccan fisheries agreements and international treaties analysis (EU-Morocco, Russia, Japan, UK).
- Interactive Souk Basket and Species Head-to-Head Comparator with Kessal cleaning fee estimation.
- Mobile Camera AI Fish Scanner.

---

## 📜 Complete Git Commit History

| Commit | Type | Description |
|---|---|---|
| `6e2d3c1` | `fix` | resolve CodeQL CWE-116 incomplete multi-character sanitization in download-images.mjs |
| `74e074a` | `docs` | update README and CHANGELOG with v1.2.0 release, dual-track ticker, and complete commit history |
| `4c9669f` | `test` | mock network calls to prevent CI timeouts and ensure deterministic tests |
| `aea4b82` | `fix` | eliminate ticker gap with dual-track infinite marquee and 12 Moroccan ports |
| `218d863` | `fix` | add smooth auto-scrolling ticker with pause on hover and eliminate horizontal scrollbars in navigation |
| `254235c` | `fix` | normalize regional styling, fix RTL/LTR modal arrows, enable Casablanca auto-detection & integrate marine APIs into core features |
| `f09a88f` | `docs` | add GitHub Actions CI/CodeQL/release workflows, issue templates, CHANGELOG, and governance files |
| `8753bca` | `feat` | add Oriental Moroccan regional dialect naming, port geolocation detection, and worldwide free marine APIs integration |
| `107d0fa` | `fix` | resolve RTL/LTR currency inversion, layout overflows, untranslated footer, and add live marine weather and free marine APIs directory |
| `b61e334` | `feat` | complete premium Moroccan seafood portal overhaul |
| `8e602f8` | `feat` | editorial Moroccan Maritime Atlas redesign, 22 fish species with local photos, native Arabic MP3 audio, and 10 fisheries treaties |
| `a33dd71` | `fix` | store authentic fish & recipe photos locally, embed YouTube cleaning tutorials, and unify typography |
| `195c97e` | `docs` | expand README with comprehensive guide to regional taxonomy, price trends, live nutrition calculator, cleaning tutorials, and treaties |
| `183bc44` | `feat` | real biological photos, regional Moroccan names, global/local price trends, live nutrition calculator, and traditional cleaning tutorials |
| `552aa99` | `feat` | add regional Moroccan fish names, global vs local pricing, international fisheries treaties, market tracker, and live 100g/1kg nutritional calculator |
| `5a6f390` | `feat` | initial release of L7OT - Moroccan fish encyclopedia, live images, market freshness guide, and recipes web app |


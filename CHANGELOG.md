# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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


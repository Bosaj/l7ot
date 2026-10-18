# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

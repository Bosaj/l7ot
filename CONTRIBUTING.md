# Contributing to L7OT (الحوت)

We welcome contributions from fishermen, culinary experts, linguists, developers, and marine biologists!

## Code of Conduct

Please be respectful, collaborative, and constructive. We cherish the rich cultural diversity of Moroccan coastal communities from Tangier to Lagouira, and from Saïdia to Dakhla.

## How Can You Contribute?

1. **Add or refine regional dialect names:** Moroccan coastal Darija, Rifian Tarifit, Souss Tachelhit, and Sahrawi Hassaniya terms.
2. **Contribute authentic coastal recipes:** Tagines, Charmoula marinades, friture methods, and local secrets.
3. **Report or fix UI/UX and BiDi issues:** RTL/LTR numeral rendering, mobile responsiveness, and font consistency.
4. **Improve Open Marine APIs integration:** Extend endpoints, optimize caching, or add visualization charts.

## Development Workflow

1. Fork the repository: `https://github.com/Bosaj/l7ot`
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/l7ot.git
   cd l7ot
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Run tests & verification:
   ```bash
   npm run typecheck
   npm run test
   npm run build
   ```
6. Commit your changes following Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`).
7. Submit a Pull Request targeting `main`.

# BITA CLOUD INFO TECH — Company Portfolio Website

Official company portfolio for **BITA CLOUD INFO TECH**, a certified Azure Data & AI Engineering firm.

🌐 **Live Site:** [https://bitacloudinfotech.github.io/About-us/](https://bitacloudinfotech.github.io/About-us/)

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite 8](https://vitejs.dev/) | Build tool & dev server |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |
| Vanilla CSS | Custom design system (dark/light theme) |

---

## Project Structure

```
About-us/
├── public/                     # Static assets served at root
│   ├── Bitacloudinfotechtransparent.png   # Company logo
│   ├── android-chrome-192x192.png         # Favicon
│   ├── assets/
│   │   └── tech/               # Technology stack SVG icons
│   │       ├── azure.svg
│   │       ├── databricks.svg
│   │       ├── dbt.png
│   │       ├── fabric.svg
│   │       ├── openai.svg
│   │       ├── powerbi.svg
│   │       └── sql.svg
│   └── badges/                 # Certification badge SVGs (1.svg – 6.svg)
│
├── src/
│   ├── components/             # All page sections
│   │   ├── Navbar.tsx          # Sticky nav with theme toggle + mobile drawer
│   │   ├── HeroSection.tsx     # Typewriter headline + animated orbs
│   │   ├── StatsBanner.tsx     # Animated count-up metrics
│   │   ├── CertifiedTeamSection.tsx  # 6 certification badge cards
│   │   ├── PlatformGrid.tsx    # 6 service cards + filter tabs + modal
│   │   ├── ProcessSection.tsx  # 5-phase delivery methodology
│   │   ├── PricingSection.tsx  # 3 engagement tiers
│   │   ├── WhyBITASection.tsx  # Differentiators + client switch reasons
│   │   ├── IndustriesSection.tsx   # 6 industry verticals
│   │   ├── TestimonialsPartners.tsx # Tech marquee + testimonials
│   │   ├── AboutSection.tsx    # About + careers card
│   │   ├── FAQSection.tsx      # 8-question accordion
│   │   ├── ContactSection.tsx  # Form + WhatsApp + contact cards
│   │   ├── Footer.tsx          # 4-column footer
│   │   ├── CookieConsent.tsx   # GDPR cookie banner
│   │   ├── StickyContact.tsx   # Floating WhatsApp + scroll-to-top
│   │   └── PrivacyPolicy.tsx   # Legal privacy page
│   ├── App.tsx                 # Root layout + scroll reveal
│   ├── index.css               # BITA design system (CSS variables, tokens)
│   └── main.tsx                # React entry point
│
├── .github/
│   └── workflows/
│       └── static.yml          # GitHub Actions: build + deploy to Pages
│
├── index.html                  # HTML shell with SEO meta + JSON-LD
├── vite.config.ts              # Vite config (base: /About-us/)
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment

The site auto-deploys to GitHub Pages on every push to `main` via GitHub Actions (`.github/workflows/static.yml`).

The workflow:
1. Checks out the code
2. Installs Node 20 + npm dependencies
3. Runs `npm run build` (TypeScript compile + Vite bundle)
4. Uploads the `dist/` folder to GitHub Pages

---

## Pages / Sections

| # | Section | ID |
|---|---|---|
| 1 | Hero | `#hero` |
| 2 | Stats | `#stats` |
| 3 | Certifications | `#certified-teams` |
| 4 | Capabilities | `#services` |
| 5 | Delivery Process | `#process` |
| 6 | Pricing | `#pricing` |
| 7 | Why BITA | `#why-bita` |
| 8 | Industries | `#industries` |
| 9 | Testimonials | — |
| 10 | About | `#about` |
| 11 | FAQ | `#faq` |
| 12 | Contact | `#contact` |

---

## Contact

- 📧 [contact@bitacloudinfo.tech](mailto:contact@bitacloudinfo.tech)
- 💬 [WhatsApp: +91 89822 96014](https://wa.me/918982296014)
- 🔗 [LinkedIn](https://www.linkedin.com/company/bita-cloud-info-tech)

---

© 2026 BITA CLOUD INFO TECH. All rights reserved.
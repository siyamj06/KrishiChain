# Krishi Chain - User Flow Builder

**Krishi Chain** is a comprehensive agricultural blockchain platform designed to enhance transparency, trust, and efficiency across the entire farm-to-retail supply chain. By leveraging blockchain technology and QR-based product tracking, Krishi Chain connects producers, retailers, and consumers in a unified ecosystem. The platform enables farmers to digitize their produce batches, retailers to verify product authenticity and origins, and consumers to make informed purchasing decisions with complete supply chain visibility.

## Features

- **Producers**: Create batches, generate QR codes, track market trends
- **Retailers**: Browse farmers, manage inventory, track costs
- **Consumers**: Scan products, verify authenticity, rate quality

## Quick Start

```bash
# Install dependencies
npm install
cd backend && npm install
cd ../blockchain && npm install

# Run development server
npm run dev

# Backend (separate terminal)
cd backend && npm start

# Build for production
npm run build
```

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, MongoDB
- **Blockchain**: Solidity, Hardhat, Web3.js
- **Languages**: English, Hindi, Kannada, Marathi, Tamil, Telugu

## Project Structure

```
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── DashboardLayout.tsx
│   │   ├── NavLink.tsx
│   │   ├── QRScanner.tsx
│   │   └── ui/              # shadcn/ui components
│   ├── pages/               # Page components
│   │   ├── consumer/        # Consumer role pages
│   │   │   ├── ConsumerHome.tsx
│   │   │   ├── ProduceProfile.tsx
│   │   │   ├── RateQuality.tsx
│   │   │   └── ScanProduct.tsx
│   │   ├── producer/        # Producer role pages
│   │   │   ├── Analytics.tsx
│   │   │   ├── CreateBatch.tsx
│   │   │   ├── FindRetailers.tsx
│   │   │   ├── Glossary.tsx
│   │   │   ├── MarketTrends.tsx
│   │   │   ├── ProducerDashboard.tsx
│   │   │   └── QRCodes.tsx
│   │   ├── retailer/        # Retailer role pages
│   │   │   ├── BrowseFarmers.tsx
│   │   │   ├── Insights.tsx
│   │   │   └── LogCosts.tsx
│   │   ├── Index.tsx
│   │   ├── LandingPage.tsx
│   │   ├── LanguageSelect.tsx
│   │   ├── NotFound.tsx
│   │   └── RoleSelect.tsx
│   ├── context/             # React Context
│   │   └── BatchContext.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── useLanguage.ts
│   ├── locales/             # i18n language files
│   │   ├── en.json
│   │   ├── hi.json
│   │   ├── kn.json
│   │   ├── mr.json
│   │   ├── ta.json
│   │   └── te.json
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── backend/
│   ├── server.js            # Express server entry point
│   ├── package.json
│   ├── controllers/         # Request handlers
│   │   └── batchController.js
│   └── routes/
│       └── api.js
├── blockchain/
│   ├── contracts/           # Solidity smart contracts
│   │   └── AgriTrust.sol
│   ├── scripts/             # Deployment scripts
│   │   └── deploy.js
│   ├── hardhat.config.js
│   └── package.json
├── public/                  # Static assets
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server (localhost:5173)
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## License

Open source project.

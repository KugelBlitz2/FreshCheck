# Yuka Clone - Food Scanner & Analyzer

A mobile-first Progressive Web App that scans food product barcodes and provides detailed nutritional analysis using the Open Food Facts API. Built with Next.js 16 and inspired by the Yuka app design.

## Features

### 🔍 Product Scanning
- **Real-time barcode scanning** using device camera (supports EAN-13, UPC-A, Code-128, and more)
- **Manual barcode entry** for products without camera access
- **Dual scanning engines**: Native BarcodeDetector API (fastest) with ZXing fallback for universal compatibility
- **Camera controls**: Flash toggle and camera on/off

### 📊 Health Analysis
- **0-100 Health Score** based on Nutri-Score and additives
- **Color-coded ratings**: Excellent (Green) to Bad (Red)
- **Nutritional breakdown**: Calories, proteins, carbs, fats, fiber, salt
- **Traffic light system**: Sugar, salt, and saturated fat levels (low/moderate/high)
- **Additive detection**: Lists all E-numbers and food additives with risk warnings
- **Ingredient analysis**: Full ingredient list with processing level indicators

### 🔄 Smart Features
- **Automatic scan history**: Tracks all scanned products locally
- **Healthier alternatives**: Suggests better products from the same category (when available)
- **Product search**: Search by name or brand
- **Offline-ready**: PWA with service worker for offline access

## Installation

### Option 1: Progressive Web App (Quickest)
1. **Deploy** the app (click "Publish" in v0 or deploy to Vercel)
2. **Open** the deployed URL on your mobile device
3. **iOS**: Safari → Share → Add to Home Screen
4. **Android**: Chrome → Menu → Install App

### Option 2: Native Android App (APK)
\`\`\`bash
# Clone/download the project
npm install

# Install Capacitor dependencies
npm install @capacitor/core @capacitor/cli @capacitor/android

# Add Android platform
npx cap add android

# Sync and open in Android Studio
npx cap sync
npx cap open android
\`\`\`

Then build the APK from Android Studio.

## Tech Stack

- **Framework**: Next.js 16 with App Router and React 19
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **API**: Open Food Facts (world's largest open food database)
- **Barcode Scanning**: Web Barcode Detection API + ZXing library
- **Mobile**: Capacitor for native Android/iOS builds
- **State Management**: React hooks with localStorage for persistence

## API Integration

This app uses the [Open Food Facts API](https://world.openfoodfacts.org/data) to fetch product information:

- **Product lookup**: `GET https://world.openfoodfacts.org/api/v2/product/{barcode}`
- **Search products**: `GET https://world.openfoodfacts.org/cgi/search.pl`
- **Alternatives**: Category-based filtering for healthier suggestions

All API calls include proper error handling and fallbacks.

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx                    # Home/search page
│   ├── scan/page.tsx               # Barcode scanner with camera
│   ├── product/[barcode]/page.tsx  # Product details & analysis
│   ├── history/page.tsx            # Scan history
│   └── settings/page.tsx           # App settings & install guide
├── components/
│   ├── layout/bottom-nav.tsx       # Mobile bottom navigation
│   ├── product-list-item.tsx       # Product card component
│   ├── score-gauge.tsx             # 0-100 health score visualization
│   ├── product-analysis.tsx        # Nutritional analysis section
│   ├── product-alternatives.tsx    # Healthier alternatives list
│   └── history-tracker.tsx         # localStorage history manager
├── lib/
│   └── api.ts                      # Open Food Facts API client
├── types/
│   └── product.ts                  # TypeScript interfaces
└── public/
    └── manifest.json               # PWA manifest
\`\`\`

## Usage Guide

### Scanning a Product
1. Tap the **Scan** icon in the bottom navigation
2. Point your camera at a barcode until it detects automatically
3. Or scroll down to enter a barcode manually
4. View detailed analysis, nutritional facts, and alternatives

### Searching for Products
1. Use the **Home** tab search bar
2. Type a product name or brand
3. Tap any result to view full details

### Viewing History
1. Tap the **History** icon to see all scanned products
2. Clear individual items or entire history

## Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## Browser Compatibility

- **Camera scanning**: Chrome, Edge, Safari 14+ (iOS/Android)
- **PWA installation**: All modern browsers
- **Offline mode**: Service worker-enabled browsers

## Contributing

This is a clone/educational project. For the official Yuka app, visit [yuka.io](https://yuka.io).

## Data Source

All product data comes from [Open Food Facts](https://world.openfoodfacts.org/), a free, open, collaborative database of food products from around the world.

## License

MIT - Educational purposes only. Not affiliated with Yuka.

---

**Built with ❤️ using v0 by Vercel**

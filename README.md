# FreshCheck - Food Scanner App

A mobile-first Progressive Web App that scans food product barcodes and provides detailed nutritional analysis using the Open Food Facts API. Built with Next.js 16 and inspired by the Yuka app design.

## Features

### 🔍 Product Scanning
- **Real-time barcode scanning** using device camera (supports EAN-13, UPC-A, Code-128, and more)
- **Manual barcode entry** for products without camera access
- **Dual scanning engines**: Native BarcodeDetector API (fastest) with ZXing fallback for universal compatibility
- **Camera controls**: Flash toggle and camera on/off
- **Automatic scan history**: Tracks all scanned products locally
- **Healthier alternatives**: Suggests better products from the same category (when available)
- **Product search**: Search by name or brand
- **Offline-ready**: PWA with service worker for offline access

### 📊 Health Analysis
- **0-100 Health Score** based on Nutri-Score and additives
- **Color-coded ratings**: Excellent (Green) to Bad (Red)
- **Nutritional breakdown**: Calories, proteins, carbs, fats, fiber, salt
- **Traffic light system**: Sugar, salt, and saturated fat levels (low/moderate/high)
- **Additive detection**: Lists all E-numbers and food additives with risk warnings
- **Ingredient analysis**: Full ingredient list with processing level indicators

### 🔄 Smart Features

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

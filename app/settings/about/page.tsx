import { ChevronLeft, Globe, Mail } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-white p-6 border-b border-gray-100 mb-6 flex items-center gap-4">
        <Link href="/settings">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold">About FreshCheck</h1>
      </div>

      <div className="px-4 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-green-600 rounded-2xl flex items-center justify-center">
            <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C10.34 2 9 3.34 9 5C9 5.68 9.19 6.31 9.5 6.86L5.93 10.43C5.38 10.17 4.71 10 4 10C2.34 10 1 11.34 1 13C1 14.66 2.34 16 4 16C5.66 16 7 14.66 7 13C7 12.32 6.81 11.69 6.5 11.14L10.07 7.57C10.62 7.83 11.29 8 12 8C12.71 8 13.38 7.83 13.93 7.57L17.5 11.14C17.19 11.69 17 12.32 17 13C17 14.66 18.34 16 20 16C21.66 16 23 14.66 23 13C23 11.34 21.66 10 20 10C19.29 10 18.62 10.17 18.07 10.43L14.5 6.86C14.81 6.31 15 5.68 15 5C15 3.34 13.66 2 12 2Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">FreshCheck</h2>
          <p className="text-gray-500 text-sm">Version 1.0.0</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-lg mb-3">About</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            FreshCheck helps you make informed food choices by scanning product barcodes and providing detailed
            nutritional analysis, health scores, and ingredient information.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            All product data is sourced from Open Food Facts, a free, open, and collaborative database of food products
            from around the world.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <a
            href="https://world.openfoodfacts.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
          >
            <Globe className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <div className="font-medium text-gray-700">Open Food Facts</div>
              <div className="text-xs text-gray-400">Data provider</div>
            </div>
          </a>
          <a
            href="mailto:support@freshcheck.app"
            className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
          >
            <Mail className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <div className="font-medium text-gray-700">Contact Support</div>
              <div className="text-xs text-gray-400">support@freshcheck.app</div>
            </div>
          </a>
        </div>

        <div className="text-center text-xs text-gray-400 mt-8">
          Made with care for healthier eating
          <br />© 2025 FreshCheck. All rights reserved.
        </div>
      </div>
    </div>
  )
}

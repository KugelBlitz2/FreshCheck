import { Search } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white p-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Summary</h1>
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-600">JD</span>
          </div>
        </div>

        {/* Search Trigger */}
        <Link
          href="/search"
          className="flex items-center gap-3 w-full bg-gray-100 p-3 rounded-xl text-gray-500 hover:bg-gray-200 transition-colors"
        >
          <Search className="w-5 h-5" />
          <span className="font-medium">Search for a product...</span>
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 pt-2">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <ScanIcon className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-lg font-bold mb-2">Start Scanning</h2>
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">
            Scan a barcode to analyze food products and get simple health scores.
          </p>
          <Link
            href="/scan"
            className="inline-flex items-center justify-center w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition-colors"
          >
            Scan Product
          </Link>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Recent Activity</h3>
          <button className="text-green-600 text-sm font-medium hover:underline">View all</button>
        </div>

        {/* Empty State / Simulation */}
        <div className="space-y-3">
          <DemoProductItem
            title="Nutella"
            brand="Ferrero"
            score={26}
            image="https://images.openfoodfacts.org/images/products/301/762/042/1006/front_fr.594.200.jpg"
          />
          <DemoProductItem
            title="Oats & Honey Granola"
            brand="Nature Valley"
            score={55}
            image="https://images.openfoodfacts.org/images/products/001/600/026/4688/front_en.3.200.jpg"
          />
          <DemoProductItem
            title="Organic Almond Milk"
            brand="Alpro"
            score={78}
            image="https://images.openfoodfacts.org/images/products/541/118/811/5472/front_en.119.200.jpg"
          />
        </div>
      </div>
    </div>
  )
}

function ScanIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    </svg>
  )
}

// Just for the landing page visual
function DemoProductItem({
  title,
  brand,
  score,
  image,
}: { title: string; brand: string; score: number; image: string }) {
  let color = "bg-red-500"
  if (score >= 75) color = "bg-[#2ecc71]"
  else if (score >= 50) color = "bg-[#94d82d]"
  else if (score >= 25) color = "bg-[#ffd43b]"
  else color = "bg-[#ff6b6b]"

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="relative w-14 h-14 bg-gray-50 rounded-lg overflow-hidden shrink-0">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-contain p-1" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 truncate">{title}</h4>
        <p className="text-xs text-gray-500 truncate">{brand}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <span className="text-xs font-medium text-gray-400">{score}/100</span>
      </div>
    </div>
  )
}

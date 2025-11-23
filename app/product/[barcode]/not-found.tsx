import Link from "next/link"
import { Search, Scan, AlertCircle, ExternalLink, Plus } from "lucide-react"

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-red-500" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-3">Product Not Found</h1>

      <p className="text-gray-600 mb-8 max-w-md">
        This product isn't in our database yet. It might be a regional item, store brand, or recently launched product.
      </p>

      <div className="space-y-3 w-full max-w-sm">
        <Link
          href="/search"
          className="flex items-center justify-center gap-3 w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          <Search className="w-5 h-5" />
          Search by Name
        </Link>

        <Link
          href="/scan"
          className="flex items-center justify-center gap-3 w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
        >
          <Scan className="w-5 h-5" />
          Try Another Scan
        </Link>

        <Link
          href="/"
          className="block w-full text-gray-500 py-3 rounded-xl font-medium hover:text-gray-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>

      <div className="mt-8 p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl max-w-md border border-green-100">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Plus className="w-5 h-5 text-green-600" />
          <p className="text-base text-green-900 font-bold">Help Us Grow</p>
        </div>
        <p className="text-sm text-green-800 mb-4">
          You can add this product to Open Food Facts, a free and open database used by FreshCheck and millions of users
          worldwide.
        </p>
        <a
          href="https://world.openfoodfacts.org/cgi/product.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
        >
          Add Product to Database
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-xl max-w-md">
        <p className="text-sm text-blue-900 font-medium mb-2">Why might a product be missing?</p>
        <ul className="text-xs text-blue-700 text-left space-y-1">
          <li>• Regional or local products not yet added</li>
          <li>• Recently launched items</li>
          <li>• Store brands or private labels</li>
          <li>• Products from smaller manufacturers</li>
        </ul>
      </div>
    </div>
  )
}

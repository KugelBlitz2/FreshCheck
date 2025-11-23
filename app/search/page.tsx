"use client"

import type React from "react"

import { useState } from "react"
import { SearchIcon, Loader2, ArrowLeft, X } from "lucide-react"
import Link from "next/link"
import { searchProducts } from "@/lib/api"
import type { Product } from "@/types/product"
import { ProductListItem } from "@/components/product-list-item"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setSearched(true)
    try {
      const products = await searchProducts(query)
      setResults(products)
    } catch (error) {
      console.error(error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10 pt-safe-top">
        <form onSubmit={handleSearch} className="flex gap-3">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-500 shrink-0"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="relative flex-1">
            <input
              type="search"
              placeholder="Search product..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-gray-100 text-gray-900 rounded-xl py-3 pl-10 pr-10 outline-none focus:ring-2 focus:ring-green-500/20 transition-all font-medium"
              autoFocus
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            {/* Added clear button logic */}
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="bg-green-600 text-white px-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Search"}
          </button>
        </form>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full" />
              <div className="h-4 w-48 bg-gray-200 rounded" />
            </div>
          </div>
        ) : results.length > 0 ? (
          <div>
            <div className="px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {results.length} Results
            </div>
            {results.map((product) => (
              <ProductListItem key={product.code} product={product} />
            ))}
          </div>
        ) : searched ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <SearchIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No products found</h3>
            <p className="text-gray-500 text-sm">
              We couldn't find anything matching "{query}". Try a different term or scan a barcode.
            </p>
          </div>
        ) : (
          <div className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {["Nutella", "Coca Cola", "Oreo", "Barilla", "Danone", "Kellogg's"].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term)
                    // Trigger search manually effectively
                    const form = document.querySelector("form")
                    if (form) form.requestSubmit()
                  }}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full text-sm font-medium transition-colors border border-gray-100"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

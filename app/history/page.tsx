"use client"

import { useEffect, useState } from "react"
import { ProductListItem } from "@/components/product-list-item"
import type { Product } from "@/types/product"
import { FileClock, Trash2 } from "lucide-react"

export default function HistoryPage() {
  const [history, setHistory] = useState<Product[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("yuka_history")
    if (stored) {
      setHistory(JSON.parse(stored))
    }
  }, [])

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your scan history?")) {
      localStorage.removeItem("yuka_history")
      setHistory([])
    }
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <h1 className="text-2xl font-bold">History</h1>
        {history.length > 0 && (
          <button onClick={clearHistory} className="text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FileClock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No history yet</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Products you scan or view will appear here. Start by scanning a product!
            </p>
          </div>
        ) : (
          <div>
            {history.map((product) => (
              <ProductListItem key={product.code} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Barcode, Camera, Zap } from "lucide-react"
import Link from "next/link"

export default function ScanPage() {
  const [barcode, setBarcode] = useState("")
  const [isScanning, setIsScanning] = useState(true)
  const router = useRouter()

  // Added effect to simulate scanning activity
  useEffect(() => {
    const timer = setInterval(() => {
      setIsScanning((prev) => !prev)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (barcode.trim()) {
      router.push(`/product/${barcode}`)
    }
  }

  const demoProducts = [
    { code: "3017620422003", name: "Nutella", brand: "Ferrero" },
    { code: "5449000000996", name: "Coca Cola", brand: "Coca Cola" },
    { code: "7622210449283", name: "Lu Petit Écolier", brand: "Lu" },
    { code: "3229820795676", name: "San Pellegrino", brand: "Nestlé" },
  ]

  return (
    <div className="flex flex-col h-full bg-black text-white relative">
      {/* Overlay UI */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent pt-12">
        <Link
          href="/"
          className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/90 hover:bg-black/60 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex gap-4">
          <button className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/90 hover:bg-black/60 transition-colors">
            <Zap className="w-6 h-6" />
          </button>
          <button className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/90 hover:bg-black/60 transition-colors">
            <Camera className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Simulated Camera View */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center"></div>

        {/* Dark overlay with cutout */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>

        {/* Scanning Frame */}
        <div className="relative w-72 h-48 rounded-2xl flex items-center justify-center z-10 overflow-hidden shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
          {/* Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl"></div>

          {/* Laser Line */}
          <div className="w-[120%] h-[2px] bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)] animate-[scan_1.5s_ease-in-out_infinite]"></div>
        </div>

        <p className="absolute bottom-40 z-10 text-white/90 font-medium bg-black/40 px-4 py-1 rounded-full backdrop-blur-sm">
          Scanning for barcode...
        </p>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white text-black rounded-t-3xl p-6 pb-24 -mt-6 relative z-10 min-h-[40vh] shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8"></div>

        <h2 className="text-xl font-bold mb-4">Enter Barcode Manually</h2>

        <form onSubmit={handleManualSubmit} className="flex gap-2 mb-8">
          <div className="relative flex-1">
            <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="E.g. 3017620422003"
              className="w-full bg-gray-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={!barcode}
            className="bg-green-600 text-white p-3 rounded-xl disabled:opacity-50"
          >
            <ArrowLeft className="w-6 h-6 rotate-180" />
          </button>
        </form>

        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Demo Scans</h3>
        <div className="grid grid-cols-2 gap-3">
          {demoProducts.map((p) => (
            <button
              key={p.code}
              onClick={() => router.push(`/product/${p.code}`)}
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors border border-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-xs font-bold text-gray-400">
                {p.name[0]}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm truncate">{p.name}</div>
                <div className="text-xs text-gray-500 truncate">{p.brand}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

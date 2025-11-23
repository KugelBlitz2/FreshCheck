"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Barcode, Camera, Zap } from "lucide-react"
import Link from "next/link"
import { BrowserMultiFormatReader } from "@zxing/library"

export default function ScanPage() {
  const [barcode, setBarcode] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [flashEnabled, setFlashEnabled] = useState(false)
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const codeReader = useRef(new BrowserMultiFormatReader())
  const router = useRouter()

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      setError(null)
      let stream: MediaStream | null = null

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        })
      } catch (err) {
        console.warn("Environment camera not found, trying any video source...")
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        })
      }

      if (stream && videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream

        videoRef.current.onloadedmetadata = () => {
          setCameraEnabled(true)
          setIsScanning(true)
        }
      }
    } catch (err) {
      setError("Camera access denied. Please enable camera permissions or use manual entry.")
      setCameraEnabled(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setCameraEnabled(false)
    setIsScanning(false)
  }

  const toggleFlash = async () => {
    if (streamRef.current) {
      const track = streamRef.current.getVideoTracks()[0]
      const capabilities = track.getCapabilities() as any

      if (capabilities.torch) {
        try {
          await track.applyConstraints({
            // @ts-ignore
            advanced: [{ torch: !flashEnabled }],
          })
          setFlashEnabled(!flashEnabled)
        } catch (err) {
          console.error("[v0] Flash toggle error:", err)
        }
      }
    }
  }

  useEffect(() => {
    if (!isScanning || !videoRef.current || !canvasRef.current) return

    let animationId: number
    const detectBarcode = async () => {
      if (videoRef.current && canvasRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const canvas = canvasRef.current
        const video = videoRef.current
        const ctx = canvas.getContext("2d")

        if (ctx) {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

          if ("BarcodeDetector" in window) {
            try {
              const barcodeDetector = new (window as any).BarcodeDetector({
                formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39"],
              })
              const barcodes = await barcodeDetector.detect(canvas)

              if (barcodes.length > 0) {
                const detectedCode = barcodes[0].rawValue
                setIsScanning(false)
                stopCamera()
                router.push(`/product/${detectedCode}`)
                return
              }
            } catch (err) {}
          }

          try {
            const result = await codeReader.current.decodeFromImage(undefined, canvas.toDataURL())
            if (result) {
              const detectedCode = result.getText()
              setIsScanning(false)
              stopCamera()
              router.push(`/product/${detectedCode}`)
              return
            }
          } catch (err) {}
        }
      }

      animationId = requestAnimationFrame(detectBarcode)
    }

    detectBarcode()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [isScanning, router])

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (barcode.trim()) {
      stopCamera()
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
      <canvas ref={canvasRef} className="hidden" />

      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent pt-12">
        <Link
          href="/"
          className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/90 hover:bg-black/60 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex gap-4">
          <button
            onClick={toggleFlash}
            className={`p-2 backdrop-blur-md rounded-full transition-colors ${
              flashEnabled ? "bg-yellow-500/60 text-white" : "bg-black/40 text-white/90 hover:bg-black/60"
            }`}
          >
            <Zap className="w-6 h-6" />
          </button>
          <button
            onClick={() => (cameraEnabled ? stopCamera() : startCamera())}
            className={`p-2 backdrop-blur-md rounded-full transition-colors ${
              cameraEnabled ? "bg-green-500/60 text-white" : "bg-black/40 text-white/90 hover:bg-black/60"
            }`}
          >
            <Camera className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-gray-900">
        <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />

        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>

        <div className="relative w-72 h-48 rounded-2xl flex items-center justify-center z-10 overflow-hidden shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl"></div>

          {isScanning && (
            <div className="w-[120%] h-[2px] bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)] animate-[scan_1.5s_ease-in-out_infinite]"></div>
          )}
        </div>

        <p className="absolute bottom-40 z-10 text-white/90 font-medium bg-black/40 px-4 py-1 rounded-full backdrop-blur-sm">
          {error ? "Camera unavailable" : cameraEnabled ? "Point at barcode..." : "Starting camera..."}
        </p>

        {error && (
          <div className="absolute top-32 left-4 right-4 z-10 bg-red-500/90 text-white p-4 rounded-xl text-sm">
            {error}
          </div>
        )}
      </div>

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

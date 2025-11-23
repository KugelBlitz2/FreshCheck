import { getProduct, calculateProductScore, getScoreColorHex, getAlternatives } from "@/lib/api"
import { ArrowLeft, Share2, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ScoreGauge } from "@/components/score-gauge"
import { ProductAnalysis } from "@/components/product-analysis"
import { HistoryTracker } from "@/components/history-tracker"
import { ProductAlternatives } from "@/components/product-alternatives"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ barcode: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { barcode } = await params

  console.log(`[v0] Loading product page for barcode: ${barcode}`)
  const product = await getProduct(barcode)

  if (!product) {
    console.log(`[v0] Product ${barcode} not found, showing not-found page`)
    return notFound()
  }

  console.log(`[v0] Product loaded: ${product.product_name}`)

  const { score, status } = calculateProductScore(product)
  const colorHex = getScoreColorHex(score)

  let alternatives = []
  if (score < 75 && product.categories_tags && product.categories_tags.length > 0) {
    const category = product.categories_tags[product.categories_tags.length - 1]
    alternatives = await getAlternatives(category)
  }

  return (
    <div className="bg-white min-h-full pb-20">
      <HistoryTracker product={product} />
      {/* Header Image Section */}
      <div className="relative h-[35vh] bg-gray-50 flex items-center justify-center p-8">
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
          <Link
            href="/"
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm">
            <Share2 className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {product.image_url ? (
          <div className="relative w-full h-full">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.product_name || "Product Image"}
              fill
              className="object-contain mix-blend-multiply"
              priority
            />
          </div>
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <Info className="w-12 h-12 mb-2 opacity-50" />
            <span>No image available</span>
          </div>
        )}
      </div>

      {/* Product Info & Score Card */}
      <div className="relative -mt-8 bg-white rounded-t-3xl px-6 pt-8 pb-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 pr-4">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-1">
              {product.product_name || "Unknown Product"}
            </h1>
            <p className="text-gray-500 font-medium">
              {product.brands || "Unknown Brand"} • {product.quantity || "N/A"}
            </p>
          </div>
          <div className="shrink-0 pt-1">
            {/* Small Nutri-Score badge if available */}
            {product.nutriscore_grade && (
              <div
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-gray-200 text-gray-500`}
              >
                Nutri-Score <span className="text-lg">{product.nutriscore_grade}</span>
              </div>
            )}
          </div>
        </div>

        {/* Big Score Gauge */}
        <div className="flex items-center gap-6 mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <ScoreGauge score={score} color={colorHex} />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Quality</div>
            <div className="text-2xl font-bold" style={{ color: colorHex }}>
              {status}
            </div>
            <div className="text-sm text-gray-500 mt-1">Based on ingredients & additives</div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            Analysis
            <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Computed</span>
          </h3>
          <ProductAnalysis product={product} />
        </div>

        {/* Ingredients Text (Collapsible-ish) */}
        {product.ingredients_text && (
          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold text-gray-900 mb-3">Ingredients</h3>
            <p className="text-sm text-gray-600 leading-relaxed text-balance">{product.ingredients_text}</p>
          </div>
        )}

        {/* Additional Details */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="text-xs text-gray-500 mb-1">Eco-Score</div>
            <div className="text-lg font-bold capitalize text-gray-800">
              {product.ecoscore_grade
                ? product.ecoscore_grade === "not-applicable"
                  ? "N/A"
                  : `Grade ${product.ecoscore_grade.toUpperCase()}`
                : "Unknown"}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="text-xs text-gray-500 mb-1">NOVA Group</div>
            <div className="text-lg font-bold text-gray-800">
              {product.nova_group ? `Group ${product.nova_group}` : "Unknown"}
            </div>
          </div>
        </div>

        <ProductAlternatives alternatives={alternatives} currentProductCode={product.code} />
      </div>
    </div>
  )
}

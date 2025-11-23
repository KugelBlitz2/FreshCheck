import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { type Product, calculateProductScore, getScoreColor } from "@/lib/api"

interface ProductListItemProps {
  product: Product
}

export function ProductListItem({ product }: ProductListItemProps) {
  const { score, status } = calculateProductScore(product)
  const scoreColorClass = getScoreColor(score)

  return (
    <Link
      href={`/product/${product.code}`}
      className="flex items-center gap-4 p-4 bg-white border-b border-gray-50 hover:bg-gray-50 transition-colors"
    >
      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
        {product.image_front_small_url ? (
          <Image
            src={product.image_front_small_url || "/placeholder.svg"}
            alt={product.product_name}
            fill
            className="object-contain p-1"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs text-center p-1">
            No Image
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{product.product_name || "Unknown Product"}</h3>
        <p className="text-sm text-gray-500 truncate">{product.brands || "Unknown Brand"}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className={`w-3 h-3 rounded-full ${scoreColorClass.split(" ")[0]}`} />
          <span className="text-xs text-gray-500 font-medium">{score}/100</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{product.quantity || "N/A"}</span>
        </div>
      </div>

      <ChevronRight className="w-5 h-5 text-gray-300 shrink-0" />
    </Link>
  )
}

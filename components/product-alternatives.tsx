import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { calculateProductScore, getScoreColorHex } from "@/lib/api"
import type { Product } from "@/types/product"

interface ProductAlternativesProps {
  alternatives: Product[]
  currentProductCode: string
}

export function ProductAlternatives({ alternatives, currentProductCode }: ProductAlternativesProps) {
  // Filter out the current product from alternatives
  const validAlternatives = alternatives.filter(
    (p) =>
      p.code !== currentProductCode && p.product_name && (p.nutriscore_grade === "a" || p.nutriscore_grade === "b"),
  )

  if (validAlternatives.length === 0) return null

  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      <h3 className="font-bold text-gray-900 mb-4">Healthier Alternatives</h3>
      <div className="flex flex-col gap-3">
        {validAlternatives.map((product) => {
          const { score } = calculateProductScore(product)
          const color = getScoreColorHex(score)

          return (
            <Link
              key={product.code}
              href={`/product/${product.code}`}
              className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-xl shadow-sm active:scale-[0.98] transition-transform"
            >
              <div className="relative w-12 h-12 shrink-0 bg-gray-50 rounded-lg p-1">
                {product.image_url ? (
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.product_name}
                    fill
                    className="object-contain mix-blend-multiply"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm truncate">{product.product_name}</h4>
                <div className="text-xs text-gray-500 truncate">{product.brands}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-sm font-bold text-gray-700">{score}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

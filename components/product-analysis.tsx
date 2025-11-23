import type { Product } from "@/types/product"
import { Check, X, AlertTriangle, HelpCircle } from "lucide-react"

interface ProductAnalysisProps {
  product: Product
}

export function ProductAnalysis({ product }: ProductAnalysisProps) {
  const items = []

  // Analyze Nutri-Score
  const ns = product.nutriscore_grade?.toLowerCase()
  if (ns === "a") items.push({ type: "good", label: "Excellent nutritional quality", value: "Nutri-Score A" })
  else if (ns === "b") items.push({ type: "good", label: "Good nutritional quality", value: "Nutri-Score B" })
  else if (ns === "c") items.push({ type: "neutral", label: "Average nutritional quality", value: "Nutri-Score C" })
  else if (ns === "d" || ns === "e")
    items.push({ type: "bad", label: "Poor nutritional quality", value: `Nutri-Score ${ns.toUpperCase()}` })
  else if (!ns && product.nutrient_levels) {
    items.push({ type: "info", label: "Nutri-Score unavailable", value: "Using nutrient analysis" })
  }

  const additivesCount = product.additives_n
  const additivesTags = product.additives_tags || []

  if (typeof additivesCount === "number") {
    if (additivesCount === 0) {
      items.push({ type: "good", label: "No additives", value: "Clean label" })
    } else {
      const formattedAdditives = additivesTags
        .map((tag) => {
          const code = tag.split(":")[1]?.toUpperCase()
          return code
        })
        .filter(Boolean)
        .slice(0, 5) // Show max 5
        .join(", ")

      const displayValue = formattedAdditives || "Additives detected"
      const fullValue = additivesCount > 5 ? `${displayValue}... (+${additivesCount - 5} more)` : displayValue

      items.push({
        type: additivesCount > 3 ? "bad" : "neutral",
        label: additivesCount === 1 ? "1 additive" : `${additivesCount} additives`,
        value: fullValue,
      })
    }
  } else {
    // If additives_n is undefined, we don't know the status
    // items.push({ type: "unknown", label: "Additives unknown", value: "Data missing" })
  }

  if (product.nutrient_levels) {
    const levels = product.nutrient_levels
    const nutriments = product.nutriments || {}

    // Sugar
    if (levels.sugars) {
      items.push(mapNutrientLevel("Sugar", levels.sugars, nutriments.sugars_100g, "g"))
    }
    // Saturated Fat
    if (levels["saturated-fat"]) {
      items.push(mapNutrientLevel("Saturated Fat", levels["saturated-fat"], nutriments["saturated-fat_100g"], "g"))
    }
    // Salt
    if (levels.salt) {
      items.push(mapNutrientLevel("Salt", levels.salt, nutriments.salt_100g, "g"))
    }
    // Fat (Total) - sometimes less prioritized but good to have
    if (levels.fat) {
      items.push(mapNutrientLevel("Fat", levels.fat, nutriments.fat_100g, "g"))
    }
  } else {
    // Fallback to old logic if nutrient_levels is missing (though it shouldn't be for most products)
    const sugar = product.nutriments?.sugars_100g
    if (sugar !== undefined) {
      if (sugar < 5) items.push({ type: "good", label: "Low sugar", value: `${sugar}g / 100g` })
      else if (sugar > 20) items.push({ type: "bad", label: "Too sweet", value: `${sugar}g / 100g` })
    }
  }

  // Calories (Neutral info)
  if (product.nutriments?.["energy-kcal_100g"]) {
    items.push({ type: "info", label: "Calories", value: `${product.nutriments["energy-kcal_100g"]} kCal / 100g` })
  }

  if (items.length === 0) {
    return (
      <div className="text-gray-500 italic text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
        Limited product data available. This product may be new or incomplete in the database.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-4 items-start">
          <div className="shrink-0 mt-0.5">
            {item.type === "good" && (
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-3 h-3 text-green-600" />
              </div>
            )}
            {item.type === "neutral" && (
              <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="w-3 h-3 text-orange-600" />
              </div>
            )}
            {item.type === "bad" && (
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-3 h-3 text-red-600" />
              </div>
            )}
            {item.type === "info" && (
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <HelpCircle className="w-3 h-3 text-blue-600" />
              </div>
            )}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">{item.label}</div>
            <div className="text-xs text-gray-500">{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function mapNutrientLevel(name: string, level: "low" | "moderate" | "high", amount?: number, unit = "g") {
  const value = amount !== undefined ? `${amount}${unit} / 100g` : undefined

  if (level === "low") {
    return { type: "good", label: `Low ${name}`, value }
  } else if (level === "moderate") {
    return { type: "neutral", label: `Moderate ${name}`, value }
  } else {
    return { type: "bad", label: `High ${name}`, value }
  }
}

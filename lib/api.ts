const BASE_URL = "https://world.openfoodfacts.org/api/v2"
const SEARCH_URL = "https://world.openfoodfacts.org/cgi/search.pl"

export async function searchProducts(query: string) {
  if (!query) return []

  // Using the CGI search endpoint as it's often more reliable for general text search parameters
  const url = `${SEARCH_URL}?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=20`

  console.log(`[API] Searching for: ${query}`)

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "YukaClone/1.0 (v0-demo-app)",
      },
    })

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()
    console.log(`[API] Found ${data.products?.length || 0} results`)
    return data.products || []
  } catch (error) {
    console.error("Error searching products:", error)
    return []
  }
}

export async function getProduct(barcode: string) {
  const url = `${BASE_URL}/product/${barcode}.json?fields=code,product_name,brands,quantity,image_url,image_front_url,nutriscore_grade,ecoscore_grade,ingredients_text,additives_n,additives_tags,nutrient_levels,nutriments,nova_group,categories_tags,labels_tags,serving_size,packaging`
  console.log(`[v0] Fetching product: ${barcode}`)

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "FreshCheck/1.0 (Mobile-Food-Scanner)",
      },
    })

    if (!response.ok) {
      console.log(`[v0] Product fetch failed with status: ${response.status}`)
      throw new Error("Network response was not ok")
    }

    const data = await response.json()

    if (data.status === 0 || !data.product) {
      console.log(`[v0] Product not found in database: ${barcode}`)
      return null
    }

    console.log(`[v0] Product fetched successfully:`, data.product.product_name)
    return data.product
  } catch (error) {
    console.error("[v0] Error fetching product:", error)
    return null
  }
}

export async function getAlternatives(categoryTag: string) {
  if (!categoryTag) return []

  // Search for products in the same category, sorted by Nutri-Score, ensuring they have an image and product name
  const url = `${SEARCH_URL}?action=process&categories_tags=${encodeURIComponent(categoryTag)}&sort_by=nutriscore_score&page_size=5&json=1&fields=code,product_name,brands,image_url,nutriscore_grade,nova_group`

  console.log(`[API] Fetching alternatives for category: ${categoryTag}`)

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "YukaClone/1.0 (v0-demo-app)",
      },
    })

    if (!response.ok) return []

    const data = await response.json()
    return data.products || []
  } catch (error) {
    console.error("Error fetching alternatives:", error)
    return []
  }
}

// Helper to calculate a "Yuka-like" score (0-100) based on Nutri-Score and additives
// This is a simplified approximation as the real algorithm is complex
export function calculateProductScore(product: any): { score: number; status: "Excellent" | "Good" | "Poor" | "Bad" } {
  if (!product) return { score: 0, status: "Bad" }

  let baseScore = 50
  let hasNutriScore = false

  // Nutri-Score impact (60% of weight usually)
  const nutriScore = product.nutriscore_grade?.toLowerCase()
  if (nutriScore) {
    hasNutriScore = true
    if (nutriScore === "a") baseScore += 45
    else if (nutriScore === "b") baseScore += 25
    else if (nutriScore === "c") baseScore += 5
    else if (nutriScore === "d") baseScore -= 15
    else if (nutriScore === "e") baseScore -= 30
  } else {
    const levels = product.nutrient_levels
    if (levels) {
      let penaltyCount = 0
      if (levels.sugars === "high") penaltyCount++
      if (levels.salt === "high") penaltyCount++
      if (levels["saturated-fat"] === "high") penaltyCount++
      if (levels.fat === "high") penaltyCount++

      baseScore -= penaltyCount * 10
    }
  }

  // Additives impact (30% weight)
  const additiveCount = product.additives_n || 0
  if (additiveCount > 0) {
    baseScore -= Math.min(additiveCount * 5, 25) // Cap at -25 for additives
  }

  // NOVA group penalty (ultra-processed foods)
  if (product.nova_group === 4) {
    baseScore -= 15
  } else if (product.nova_group === 3) {
    baseScore -= 5
  }

  // Organic bonus
  if (product.labels_tags?.includes("en:organic")) {
    baseScore += 10
  }

  // Clamp score
  const finalScore = Math.max(0, Math.min(100, baseScore))

  let status: "Excellent" | "Good" | "Poor" | "Bad" = "Bad"
  if (finalScore >= 75) status = "Excellent"
  else if (finalScore >= 50) status = "Good"
  else if (finalScore >= 25) status = "Poor"

  console.log(
    `[v0] Score calculated: ${finalScore} (${status}) - hasNutriScore: ${hasNutriScore}, additives: ${additiveCount}`,
  )

  return { score: finalScore, status }
}

export function getScoreColor(score: number) {
  if (score >= 75) return "bg-[#2ecc71] text-white" // Dark Green
  if (score >= 50) return "bg-[#94d82d] text-white" // Light Green
  if (score >= 25) return "bg-[#ffd43b] text-black" // Yellow
  return "bg-[#ff6b6b] text-white" // Red
}

export function getScoreColorHex(score: number) {
  if (score >= 75) return "#2ecc71"
  if (score >= 50) return "#94d82d"
  if (score >= 25) return "#ffd43b"
  return "#ff6b6b"
}

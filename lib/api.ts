const BASE_URL = "https://world.openfoodfacts.org/api/v2"
const SEARCH_URL = "https://world.openfoodfacts.org/cgi/search.pl"

export async function searchProducts(query: string) {
  if (!query) return []

  const url = `${SEARCH_URL}?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=20&fields=code,product_name,brands,image_url,image_front_small_url,nutriscore_grade,nova_group`

  console.log(`[API] Searching for: ${query}`)

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "YukaClone/1.0 (v0-demo-app)",
      },
    })

    if (!response.ok) {
      console.error(`[API] Search failed with status ${response.status}`)
      throw new Error("Network response was not ok")
    }

    const data = await response.json()
    console.log(`[API] Found ${data.products?.length || 0} results`)
    return data.products || []
  } catch (error) {
    console.error("[API] Error searching products:", error)
    return []
  }
}

export async function getProduct(barcode: string) {
  const url = `${BASE_URL}/product/${barcode}.json?fields=code,product_name,brands,image_url,image_front_small_url,nutriscore_grade,ecoscore_grade,nova_group,nutrient_levels,nutriments,ingredients_text,additives_n,additives_tags,categories_tags,quantity,labels_tags`
  console.log(`[API] Fetching product: ${barcode}`)

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "YukaClone/1.0 (v0-demo-app)",
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`[API] Product ${barcode} not found in database`)
        return null
      }
      console.error(`[API] Failed to fetch product: ${response.status}`)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.status === 0 || !data.product) {
      console.log(`[API] Product ${barcode} not found (status: ${data.status})`)
      return null
    }

    console.log(`[API] Successfully fetched product: ${data.product.product_name || "Unknown"}`)
    return data.product
  } catch (error) {
    console.error("[API] Error fetching product:", error)
    return null
  }
}

export async function getAlternatives(categoryTag: string) {
  if (!categoryTag) return []

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

export function calculateProductScore(product: any): { score: number; status: "Excellent" | "Good" | "Poor" | "Bad" } {
  if (!product) return { score: 0, status: "Bad" }

  let baseScore = 50

  const nutriScore = product.nutriscore_grade?.toLowerCase()
  if (nutriScore === "a") baseScore += 45
  else if (nutriScore === "b") baseScore += 25
  else if (nutriScore === "c") baseScore += 5
  else if (nutriScore === "d") baseScore -= 15
  else if (nutriScore === "e") baseScore -= 30

  const additiveCount = product.additives_n || 0
  baseScore -= additiveCount * 5

  if (product.labels_tags?.includes("en:organic")) {
    baseScore += 10
  }

  const finalScore = Math.max(0, Math.min(100, baseScore))

  let status: "Excellent" | "Good" | "Poor" | "Bad" = "Bad"
  if (finalScore >= 75) status = "Excellent"
  else if (finalScore >= 50) status = "Good"
  else if (finalScore >= 25) status = "Poor"

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

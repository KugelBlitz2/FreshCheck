const BASE_URL = "https://world.openfoodfacts.org/api/v2"
const SEARCH_URL = "https://world.openfoodfacts.org/cgi/search.pl"

// Regional databases to try as fallbacks
const REGIONAL_DATABASES = [
  "https://world.openfoodfacts.org",
  "https://us.openfoodfacts.org",
  "https://au.openfoodfacts.org",
  "https://uk.openfoodfacts.org",
]

export async function searchProducts(query: string) {
  if (!query) return []

  const url = `${SEARCH_URL}?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=20&fields=code,product_name,brands,image_url,image_front_small_url,nutriscore_grade,nova_group`

  console.log(`[API] Searching for: ${query}`)

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "FreshCheck/1.0 (nutrition-scanner)",
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
  // Clean up barcode - remove spaces and dashes
  const cleanBarcode = barcode.replace(/[\s-]/g, "")

  console.log(`[API] Fetching product: ${cleanBarcode}`)

  // Try primary database first
  let result = await tryFetchProduct(cleanBarcode, BASE_URL)
  if (result) return result

  console.log(`[API] Product not found in primary database, trying regional databases...`)

  // Try regional databases as fallback
  for (const dbUrl of REGIONAL_DATABASES) {
    if (dbUrl === "https://world.openfoodfacts.org") continue // Already tried

    console.log(`[API] Trying ${dbUrl}...`)
    result = await tryFetchProduct(cleanBarcode, `${dbUrl}/api/v2`)
    if (result) {
      console.log(`[API] Product found in ${dbUrl}!`)
      return result
    }
  }

  if (cleanBarcode.length < 13) {
    const paddedBarcode = cleanBarcode.padStart(13, "0")
    console.log(`[API] Trying padded barcode: ${paddedBarcode}`)
    result = await tryFetchProduct(paddedBarcode, BASE_URL)
    if (result) return result
  }

  if (cleanBarcode.startsWith("0") && cleanBarcode.length > 8) {
    const trimmedBarcode = cleanBarcode.replace(/^0+/, "")
    console.log(`[API] Trying trimmed barcode: ${trimmedBarcode}`)
    result = await tryFetchProduct(trimmedBarcode, BASE_URL)
    if (result) return result
  }

  console.log(`[API] Product ${cleanBarcode} not found in any database`)
  return null
}

async function tryFetchProduct(barcode: string, baseUrl: string) {
  const url = `${baseUrl}/product/${barcode}.json?fields=code,product_name,brands,image_url,image_front_small_url,nutriscore_grade,ecoscore_grade,nova_group,nutrient_levels,nutriments,ingredients_text,additives_n,additives_tags,categories_tags,quantity,labels_tags`

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "FreshCheck/1.0 (nutrition-scanner)",
      },
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      console.error(`[API] Failed to fetch from ${baseUrl}: ${response.status}`)
      return null
    }

    const data = await response.json()

    if (data.status === 0 || !data.product) {
      return null
    }

    console.log(`[API] Successfully fetched product: ${data.product.product_name || "Unknown"}`)
    return data.product
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      console.error(`[API] Request timeout for ${baseUrl}`)
    } else {
      console.error(`[API] Error fetching from ${baseUrl}:`, error)
    }
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
        "User-Agent": "FreshCheck/1.0 (nutrition-scanner)",
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

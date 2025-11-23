export interface Product {
  code: string
  product_name: string
  brands?: string
  image_url?: string
  image_front_small_url?: string
  nutriscore_grade?: string // a, b, c, d, e
  ecoscore_grade?: string
  ingredients_text?: string
  additives_n?: number
  additives_tags?: string[]
  nutrient_levels?: {
    fat?: "low" | "moderate" | "high"
    salt?: "low" | "moderate" | "high"
    "saturated-fat"?: "low" | "moderate" | "high"
    sugars?: "low" | "moderate" | "high"
  }
  nutriments?: {
    "energy-kcal_100g"?: number
    fat_100g?: number
    sugars_100g?: number
    salt_100g?: number
    proteins_100g?: number
    fiber_100g?: number
  }
  nova_group?: number // 1-4
  categories_tags?: string[]
  quantity?: string
}

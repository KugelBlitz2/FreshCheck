"use client"

import { useEffect } from "react"
import type { Product } from "@/types/product"

export function HistoryTracker({ product }: { product: Product }) {
  useEffect(() => {
    try {
      const historyItem = {
        code: product.code,
        product_name: product.product_name,
        brands: product.brands,
        image_front_small_url: product.image_front_small_url,
        nutriscore_grade: product.nutriscore_grade,
        additives_n: product.additives_n,
        timestamp: Date.now(),
      }

      const existingHistory = JSON.parse(localStorage.getItem("yuka_history") || "[]")

      // Remove duplicate if exists (to move it to top)
      const filteredHistory = existingHistory.filter((item: any) => item.code !== product.code)

      // Add to beginning
      const newHistory = [historyItem, ...filteredHistory].slice(0, 50) // Limit to 50 items

      localStorage.setItem("yuka_history", JSON.stringify(newHistory))
    } catch (e) {
      console.error("Failed to save history", e)
    }
  }, [product])

  return null
}

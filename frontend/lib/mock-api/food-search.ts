// ============================================================
// NutriTrack AI — Mock API: Food Search
// ============================================================

import { simulateDelay } from '@/lib/utils'
import { MOCK_DELAY_MS } from '@/lib/constants'
import type { ApiResponse, Food, FoodSearchFilters, PaginatedResponse } from '@/types'
import { MOCK_FOODS } from './fixtures/foods'

export async function mockSearchFoods(
  query: string,
  filters?: Partial<FoodSearchFilters>,
  page = 1,
  per_page = 20
): Promise<PaginatedResponse<Food>> {
  await simulateDelay(MOCK_DELAY_MS.normal)

  if (!query.trim()) {
    return {
      success: true,
      data: [],
      error: null,
      meta: { page, per_page, total: 0, total_pages: 0 },
    }
  }

  let results = MOCK_FOODS.filter(
    (food) =>
      food.name.toLowerCase().includes(query.toLowerCase()) ||
      (food.brand && food.brand.toLowerCase().includes(query.toLowerCase()))
  )

  // Apply category filter
  if (filters?.category && filters.category !== 'all') {
    results = results.filter((food) => food.category === filters.category)
  }

  // Apply dietary filter
  if (filters?.dietary && filters.dietary.length > 0) {
    results = results.filter((food) => filters.dietary!.every((d) => food.dietary_tags.includes(d)))
  }

  // Apply allergen exclusion
  if (filters?.exclude_allergens && filters.exclude_allergens.length > 0) {
    results = results.filter(
      (food) => !food.allergens.some((a) => filters.exclude_allergens!.includes(a))
    )
  }

  return {
    success: true,
    data: results,
    error: null,
    meta: {
      page,
      per_page,
      total: results.length,
      total_pages: Math.ceil(results.length / per_page),
    },
  }
}

export async function mockGetFoodById(id: string): Promise<ApiResponse<Food>> {
  await simulateDelay(MOCK_DELAY_MS.fast)
  const food = MOCK_FOODS.find((f) => f.id === id)
  if (!food) {
    return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Food not found' } }
  }
  return { success: true, data: food, error: null }
}

export async function mockGetFoodsByCategory(category: string): Promise<ApiResponse<Food[]>> {
  await simulateDelay(MOCK_DELAY_MS.fast)
  const foods = category === 'all' ? MOCK_FOODS : MOCK_FOODS.filter((f) => f.category === category)
  return { success: true, data: foods, error: null }
}

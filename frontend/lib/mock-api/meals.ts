// ============================================================
// NutriTrack AI — Mock API: Meals
// ============================================================

import { simulateDelay } from '@/lib/utils'
import { MOCK_DELAY_MS } from '@/lib/constants'
import type { ApiResponse, MealEntry } from '@/types'
import { MOCK_MEALS } from './fixtures/meals'

// Keep an in-memory store that persists across queries in the same session
let localMeals: MealEntry[] = [...MOCK_MEALS]

export async function mockGetMeals(date: string): Promise<ApiResponse<MealEntry[]>> {
  await simulateDelay(MOCK_DELAY_MS.normal)
  const filtered = localMeals.filter((meal) => meal.date === date)
  return { success: true, data: filtered, error: null }
}

export async function mockAddMeal(
  meal: Omit<MealEntry, 'id' | 'created_at' | 'updated_at'>
): Promise<ApiResponse<MealEntry>> {
  await simulateDelay(MOCK_DELAY_MS.normal)
  const newMeal: MealEntry = {
    ...meal,
    id: `meal-mock-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  localMeals.push(newMeal)
  return { success: true, data: newMeal, error: null }
}

export async function mockUpdateMeal(
  id: string,
  quantity: number,
  notes?: string
): Promise<ApiResponse<MealEntry>> {
  await simulateDelay(MOCK_DELAY_MS.normal)
  const index = localMeals.findIndex((m) => m.id === id)
  if (index === -1) {
    return {
      success: false,
      data: null,
      error: { code: 'NOT_FOUND', message: 'Meal entry not found' },
    }
  }

  const existing = localMeals[index]!
  const multiplier = quantity / existing.food.serving_size

  const updated: MealEntry = {
    ...existing,
    quantity,
    notes,
    nutrition: {
      calories: Math.round(existing.food.nutrition.calories * multiplier),
      protein_g: Math.round(existing.food.nutrition.protein_g * multiplier * 10) / 10,
      carbs_g: Math.round(existing.food.nutrition.carbs_g * multiplier * 10) / 10,
      fat_g: Math.round(existing.food.nutrition.fat_g * multiplier * 10) / 10,
      fiber_g: Math.round((existing.food.nutrition.fiber_g || 0) * multiplier * 10) / 10,
      sugar_g: Math.round((existing.food.nutrition.sugar_g || 0) * multiplier * 10) / 10,
      sodium_mg: Math.round((existing.food.nutrition.sodium_mg || 0) * multiplier),
    },
    updated_at: new Date().toISOString(),
  }

  localMeals[index] = updated
  return { success: true, data: updated, error: null }
}

export async function mockDeleteMeal(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
  await simulateDelay(MOCK_DELAY_MS.normal)
  localMeals = localMeals.filter((m) => m.id !== id)
  return { success: true, data: { deleted: true }, error: null }
}

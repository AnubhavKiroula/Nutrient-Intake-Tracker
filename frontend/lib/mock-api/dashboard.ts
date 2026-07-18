// ============================================================
// NutriTrack AI — Mock API: Dashboard
// ============================================================

import { simulateDelay, calculatePercentage } from '@/lib/utils'
import { MOCK_DELAY_MS } from '@/lib/constants'
import type { ApiResponse, DailySummary, WaterSummary } from '@/types'
import { MOCK_MEALS } from './fixtures/meals'
import { MOCK_NUTRITION_GOALS } from './fixtures/users'

export async function mockGetDailySummary(date: string): Promise<ApiResponse<DailySummary>> {
  await simulateDelay(MOCK_DELAY_MS.normal)

  const today = new Date().toISOString().split('T')[0] as string
  const meals = date === today ? MOCK_MEALS : []

  // Calculate totals from meals
  const totals = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.nutrition.calories,
      protein_g: acc.protein_g + meal.nutrition.protein_g,
      carbs_g: acc.carbs_g + meal.nutrition.carbs_g,
      fat_g: acc.fat_g + meal.nutrition.fat_g,
      fiber_g: acc.fiber_g + meal.nutrition.fiber_g,
      sugar_g: acc.sugar_g + meal.nutrition.sugar_g,
      sodium_mg: acc.sodium_mg + meal.nutrition.sodium_mg,
    }),
    { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 0 }
  )

  const completionPercentage = calculatePercentage(totals.calories, MOCK_NUTRITION_GOALS.calories)

  return {
    success: true,
    data: {
      date,
      user_id: 'user-001',
      meals,
      totals,
      goals: MOCK_NUTRITION_GOALS,
      completion_percentage: completionPercentage,
      water_intake_ml: 1800, // mock: 1800ml out of 3000ml goal
    },
    error: null,
  }
}

export async function mockGetWaterSummary(date: string): Promise<ApiResponse<WaterSummary>> {
  await simulateDelay(MOCK_DELAY_MS.fast)

  const today = new Date().toISOString().split('T')[0] as string
  const totalMl = date === today ? 1800 : 2600

  return {
    success: true,
    data: {
      date,
      total_ml: totalMl,
      goal_ml: MOCK_NUTRITION_GOALS.water_ml,
      entries: [
        { id: 'w-1', user_id: 'user-001', date, amount_ml: 500, logged_at: `${date}T08:00:00Z` },
        { id: 'w-2', user_id: 'user-001', date, amount_ml: 400, logged_at: `${date}T10:30:00Z` },
        { id: 'w-3', user_id: 'user-001', date, amount_ml: 600, logged_at: `${date}T13:00:00Z` },
        { id: 'w-4', user_id: 'user-001', date, amount_ml: 300, logged_at: `${date}T16:00:00Z` },
      ],
      percentage: calculatePercentage(totalMl, MOCK_NUTRITION_GOALS.water_ml),
    },
    error: null,
  }
}

export async function mockAddWater(date: string, amount_ml: number): Promise<ApiResponse<{ added: boolean; total_ml: number }>> {
  await simulateDelay(MOCK_DELAY_MS.fast)
  return {
    success: true,
    data: { added: true, total_ml: 1800 + amount_ml },
    error: null,
  }
}

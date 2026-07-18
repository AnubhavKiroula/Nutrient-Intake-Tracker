// ============================================================
// NutriTrack AI — Mock Meal Fixtures
// ============================================================

import type { MealEntry } from '@/types'
import { MOCK_FOODS } from './foods'

const today = new Date().toISOString().split('T')[0] as string
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0] as string

export const MOCK_MEALS: MealEntry[] = [
  // Today - Breakfast
  {
    id: 'meal-001',
    user_id: 'user-001',
    food_id: 'food-005',
    food: MOCK_FOODS[4]!,
    meal_type: 'breakfast',
    date: today,
    quantity: 1.5,
    serving_unit: 'g',
    notes: 'With almond milk',
    nutrition: {
      calories: Math.round(150 * 1.5),
      protein_g: Math.round(5 * 1.5 * 10) / 10,
      carbs_g: Math.round(27 * 1.5 * 10) / 10,
      fat_g: Math.round(2.5 * 1.5 * 10) / 10,
      fiber_g: Math.round(4 * 1.5 * 10) / 10,
      sugar_g: Math.round(1 * 1.5 * 10) / 10,
      sodium_mg: 0,
    },
    created_at: `${today}T07:30:00Z`,
    updated_at: `${today}T07:30:00Z`,
  },
  {
    id: 'meal-002',
    user_id: 'user-001',
    food_id: 'food-007',
    food: MOCK_FOODS[6]!,
    meal_type: 'breakfast',
    date: today,
    quantity: 1,
    serving_unit: 'g',
    nutrition: {
      calories: 105,
      protein_g: 1.3,
      carbs_g: 27,
      fat_g: 0.4,
      fiber_g: 3.1,
      sugar_g: 14.4,
      sodium_mg: 1,
    },
    created_at: `${today}T07:35:00Z`,
    updated_at: `${today}T07:35:00Z`,
  },
  // Today - Lunch
  {
    id: 'meal-003',
    user_id: 'user-001',
    food_id: 'food-001',
    food: MOCK_FOODS[0]!,
    meal_type: 'lunch',
    date: today,
    quantity: 1.5,
    serving_unit: 'g',
    nutrition: {
      calories: Math.round(165 * 1.5),
      protein_g: Math.round(31 * 1.5 * 10) / 10,
      carbs_g: 0,
      fat_g: Math.round(3.6 * 1.5 * 10) / 10,
      fiber_g: 0,
      sugar_g: 0,
      sodium_mg: 111,
    },
    created_at: `${today}T12:30:00Z`,
    updated_at: `${today}T12:30:00Z`,
  },
  {
    id: 'meal-004',
    user_id: 'user-001',
    food_id: 'food-002',
    food: MOCK_FOODS[1]!,
    meal_type: 'lunch',
    date: today,
    quantity: 1.5,
    serving_unit: 'g',
    nutrition: {
      calories: Math.round(112 * 1.5),
      protein_g: Math.round(2.6 * 1.5 * 10) / 10,
      carbs_g: Math.round(23.5 * 1.5 * 10) / 10,
      fat_g: Math.round(0.9 * 1.5 * 10) / 10,
      fiber_g: Math.round(1.8 * 1.5 * 10) / 10,
      sugar_g: Math.round(0.4 * 1.5 * 10) / 10,
      sodium_mg: 8,
    },
    created_at: `${today}T12:35:00Z`,
    updated_at: `${today}T12:35:00Z`,
  },
  {
    id: 'meal-005',
    user_id: 'user-001',
    food_id: 'food-009',
    food: MOCK_FOODS[8]!,
    meal_type: 'lunch',
    date: today,
    quantity: 1.5,
    serving_unit: 'g',
    nutrition: {
      calories: Math.round(35 * 1.5),
      protein_g: Math.round(2.4 * 1.5 * 10) / 10,
      carbs_g: Math.round(7.2 * 1.5 * 10) / 10,
      fat_g: Math.round(0.4 * 1.5 * 10) / 10,
      fiber_g: Math.round(2.6 * 1.5 * 10) / 10,
      sugar_g: Math.round(1.7 * 1.5 * 10) / 10,
      sodium_mg: 62,
    },
    created_at: `${today}T12:40:00Z`,
    updated_at: `${today}T12:40:00Z`,
  },
  // Today - Snack
  {
    id: 'meal-006',
    user_id: 'user-001',
    food_id: 'food-003',
    food: MOCK_FOODS[2]!,
    meal_type: 'snack',
    date: today,
    quantity: 1,
    serving_unit: 'g',
    nutrition: {
      calories: 100,
      protein_g: 17,
      carbs_g: 6,
      fat_g: 0,
      fiber_g: 0,
      sugar_g: 6,
      sodium_mg: 65,
    },
    created_at: `${today}T16:00:00Z`,
    updated_at: `${today}T16:00:00Z`,
  },
]

// Yesterday's meals for analytics
export const MOCK_YESTERDAY_MEALS: MealEntry[] = [
  {
    id: 'meal-y-001',
    user_id: 'user-001',
    food_id: 'food-008',
    food: MOCK_FOODS[7]!,
    meal_type: 'breakfast',
    date: yesterday,
    quantity: 3,
    serving_unit: 'g',
    nutrition: {
      calories: 216,
      protein_g: 18.9,
      carbs_g: 1.2,
      fat_g: 14.4,
      fiber_g: 0,
      sugar_g: 0.6,
      sodium_mg: 213,
    },
    created_at: `${yesterday}T08:00:00Z`,
    updated_at: `${yesterday}T08:00:00Z`,
  },
]

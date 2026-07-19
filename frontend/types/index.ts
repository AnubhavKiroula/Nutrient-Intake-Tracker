// ============================================================
// NutriTrack AI — Shared TypeScript Types
// These mirror the backend FastAPI response contracts exactly,
// so Phase 5 API wiring requires zero type changes.
// ============================================================

import type {
  ActivityLevel,
  Allergen,
  DietaryPreference,
  FoodCategory,
  HealthGoal,
  MealType,
  ReportPeriod,
  ServingUnit,
  UnitSystem,
} from '@/lib/constants'
export type {
  ActivityLevel,
  Allergen,
  DietaryPreference,
  FoodCategory,
  HealthGoal,
  MealType,
  ReportPeriod,
  ServingUnit,
  UnitSystem,
}

// ── API Response Envelope ────────────────────────────────────
// All API responses (real and mock) use this shape
export interface ApiResponse<T> {
  success: boolean
  data: T | null
  error: ApiError | null
  meta?: PaginationMeta
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

export interface PaginationMeta {
  page: number
  per_page: number
  total: number
  total_pages: number
}

// Convenience type for paginated list responses
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta
}

// ── User ─────────────────────────────────────────────────────
export interface User {
  id: string
  email: string
  name: string
  avatar_url: string | null
  email_verified: boolean
  created_at: string
  updated_at: string
}

// ── Profile ──────────────────────────────────────────────────
export interface UserProfile {
  user_id: string
  age: number
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say'
  height_cm: number
  weight_kg: number
  goal: HealthGoal
  activity_level: ActivityLevel
  dietary_preference: DietaryPreference
  allergens: Allergen[]
  unit_system: UnitSystem
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

// ── Nutrition ─────────────────────────────────────────────────
export interface NutritionInfo {
  calories: number
  protein_g: number
  carbs_g: number
  fat_g: number
  fiber_g: number
  sugar_g: number
  sodium_mg: number
  // Micronutrients
  vitamin_a_mcg?: number
  vitamin_c_mg?: number
  vitamin_d_mcg?: number
  vitamin_b12_mcg?: number
  iron_mg?: number
  calcium_mg?: number
  potassium_mg?: number
  magnesium_mg?: number
  zinc_mg?: number
}

// ── Food ──────────────────────────────────────────────────────
export interface Food {
  id: string
  name: string
  brand?: string
  category: FoodCategory
  serving_size: number
  serving_unit: ServingUnit
  nutrition: NutritionInfo
  allergens: Allergen[]
  dietary_tags: DietaryPreference[]
  image_url?: string
  verified: boolean
  source: 'usda' | 'openfoodfacts' | 'custom' | 'mock'
  created_at: string
}

// ── Meal Entry ────────────────────────────────────────────────
export interface MealEntry {
  id: string
  user_id: string
  food_id: string
  food: Food
  meal_type: MealType
  date: string // ISO date string YYYY-MM-DD
  quantity: number
  serving_unit: ServingUnit
  notes?: string
  nutrition: NutritionInfo // pre-calculated for this quantity
  created_at: string
  updated_at: string
}

// ── Daily Summary ─────────────────────────────────────────────
export interface DailySummary {
  date: string
  user_id: string
  meals: MealEntry[]
  totals: NutritionInfo
  goals: NutritionGoals
  completion_percentage: number
  water_intake_ml: number
}

// ── Nutrition Goals ───────────────────────────────────────────
export interface NutritionGoals {
  calories: number
  protein_g: number
  carbs_g: number
  fat_g: number
  fiber_g: number
  water_ml: number
  sodium_mg: number
  sugar_g: number
}

// ── Water Intake ──────────────────────────────────────────────
export interface WaterEntry {
  id: string
  user_id: string
  date: string
  amount_ml: number
  logged_at: string
}

export interface WaterSummary {
  date: string
  total_ml: number
  goal_ml: number
  entries: WaterEntry[]
  percentage: number
}

// ── Analytics ─────────────────────────────────────────────────
export interface DailyCalorieData {
  date: string
  calories: number
  goal: number
}

export interface MacroData {
  name: string
  value: number // grams
  percentage: number
  color: string
}

export interface WeeklyAnalytics {
  period_start: string
  period_end: string
  daily_calories: DailyCalorieData[]
  average_calories: number
  average_protein_g: number
  average_carbs_g: number
  average_fat_g: number
  goal_completion_days: number
  top_foods: TopFood[]
  deficiencies: NutrientDeficiency[]
}

export interface MonthlyAnalytics {
  month: string // YYYY-MM
  daily_calories: DailyCalorieData[]
  weekly_averages: { week: string; calories: number }[]
  average_calories: number
  best_day: DailyCalorieData
  worst_day: DailyCalorieData
}

export interface TopFood {
  food: Food
  times_logged: number
  total_calories: number
}

export interface NutrientDeficiency {
  nutrient: string
  unit: string
  current_avg: number
  recommended: number
  percentage: number
  severity: 'low' | 'medium' | 'high'
}

// ── Reports ───────────────────────────────────────────────────
export interface Report {
  id: string
  user_id: string
  period: ReportPeriod
  period_start: string
  period_end: string
  summary: {
    average_calories: number
    total_meals_logged: number
    goal_completion_rate: number
    most_logged_food: string
    water_intake_average_ml: number
  }
  nutrition_totals: NutritionInfo
  daily_breakdown: DailyCalorieData[]
  generated_at: string
}

// ── Settings ──────────────────────────────────────────────────
export interface UserSettings {
  user_id: string
  notifications: {
    meal_reminders: boolean
    goal_completion: boolean
    weekly_reports: boolean
    email_updates: boolean
  }
  display: {
    unit_system: UnitSystem
    theme: 'light' | 'dark' | 'system'
    show_calories_in_nav: boolean
  }
  privacy: {
    profile_public: boolean
    share_progress: boolean
  }
  updated_at: string
}

// ── Onboarding ────────────────────────────────────────────────
export interface OnboardingFormData {
  // Step 1: Personal Info
  name: string
  age: number
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say'
  height_cm: number
  weight_kg: number
  // Step 2: Goals
  goal: HealthGoal
  target_weight_kg?: number
  // Step 3: Activity
  activity_level: ActivityLevel
  // Step 4: Dietary
  dietary_preference: DietaryPreference
  allergens: Allergen[]
  // Step 5: Water
  water_goal_ml: number
  unit_system: UnitSystem
}

// ── Auth ──────────────────────────────────────────────────────
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirm_password: string
}

export interface AuthSession {
  user: User
  access_token: string
  refresh_token: string
  expires_at: string
}

// ── UI State Types ────────────────────────────────────────────
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

// Search filter state
export interface FoodSearchFilters {
  category: FoodCategory
  dietary: DietaryPreference[]
  exclude_allergens: Allergen[]
  min_calories?: number
  max_calories?: number
}

// ============================================================
// NutriTrack AI — Application Constants
// Single source of truth for all repeated string values.
// Never inline these strings in components.
// ============================================================

// ── App Metadata ────────────────────────────────────────────
export const APP_NAME = 'NutriTrack AI' as const
export const APP_DESCRIPTION = 'Premium AI-powered nutrition tracking dashboard' as const
export const APP_VERSION = '1.0.0' as const

// ── Navigation Routes ───────────────────────────────────────
export const ROUTES = {
  HOME: '/',
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  // Onboarding
  SETUP: '/setup',
  // Dashboard
  DASHBOARD: '/dashboard',
  SEARCH: '/search',
  MEALS: '/meals',
  ANALYTICS: '/analytics',
  REPORTS: '/reports',
  SETTINGS: '/settings',
} as const

// ── Meal Types ───────────────────────────────────────────────
export const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'] as const
export type MealType = (typeof MEAL_TYPES)[number]

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
} as const

export const MEAL_TYPE_ICONS: Record<MealType, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
} as const

// ── Nutrition Goals (defaults for new users) ─────────────────
export const DEFAULT_NUTRITION_GOALS = {
  calories: 2000,
  protein: 150,   // grams
  carbs: 250,     // grams
  fat: 65,        // grams
  fiber: 25,      // grams
  water: 2500,    // ml
  sodium: 2300,   // mg
  sugar: 50,      // grams
} as const

// ── Activity Levels ──────────────────────────────────────────
export const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
  { value: 'lightly_active', label: 'Lightly Active', description: 'Light exercise 1–3 days/week' },
  { value: 'moderately_active', label: 'Moderately Active', description: 'Moderate exercise 3–5 days/week' },
  { value: 'very_active', label: 'Very Active', description: 'Hard exercise 6–7 days/week' },
  { value: 'extra_active', label: 'Extra Active', description: 'Very hard exercise or physical job' },
] as const

export type ActivityLevel = (typeof ACTIVITY_LEVELS)[number]['value']

// ── Health Goals ─────────────────────────────────────────────
export const HEALTH_GOALS = [
  { value: 'lose_weight', label: 'Lose Weight', description: 'Reduce body weight with a calorie deficit' },
  { value: 'maintain_weight', label: 'Maintain Weight', description: 'Stay at your current weight' },
  { value: 'gain_muscle', label: 'Gain Muscle', description: 'Build lean muscle with a calorie surplus' },
  { value: 'improve_fitness', label: 'Improve Fitness', description: 'General health and performance improvement' },
  { value: 'eat_healthier', label: 'Eat Healthier', description: 'Improve overall diet quality' },
] as const

export type HealthGoal = (typeof HEALTH_GOALS)[number]['value']

// ── Dietary Preferences ──────────────────────────────────────
export const DIETARY_PREFERENCES = [
  { value: 'none', label: 'No Preference' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'pescatarian', label: 'Pescatarian' },
  { value: 'keto', label: 'Keto' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'gluten_free', label: 'Gluten-Free' },
  { value: 'dairy_free', label: 'Dairy-Free' },
] as const

export type DietaryPreference = (typeof DIETARY_PREFERENCES)[number]['value']

// ── Common Allergens ─────────────────────────────────────────
export const ALLERGENS = [
  { value: 'gluten', label: 'Gluten' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'eggs', label: 'Eggs' },
  { value: 'nuts', label: 'Tree Nuts' },
  { value: 'peanuts', label: 'Peanuts' },
  { value: 'soy', label: 'Soy' },
  { value: 'shellfish', label: 'Shellfish' },
  { value: 'fish', label: 'Fish' },
  { value: 'sesame', label: 'Sesame' },
] as const

export type Allergen = (typeof ALLERGENS)[number]['value']

// ── Units ────────────────────────────────────────────────────
export const UNIT_SYSTEMS = ['metric', 'imperial'] as const
export type UnitSystem = (typeof UNIT_SYSTEMS)[number]

export const SERVING_UNITS = [
  'g', 'ml', 'oz', 'cup', 'tbsp', 'tsp',
  'piece', 'slice', 'serving', 'portion',
] as const

export type ServingUnit = (typeof SERVING_UNITS)[number]

// ── Food Categories ──────────────────────────────────────────
export const FOOD_CATEGORIES = [
  { value: 'all', label: 'All', icon: '🍽️' },
  { value: 'fruits', label: 'Fruits', icon: '🍎' },
  { value: 'vegetables', label: 'Vegetables', icon: '🥦' },
  { value: 'proteins', label: 'Proteins', icon: '🍗' },
  { value: 'grains', label: 'Grains', icon: '🌾' },
  { value: 'dairy', label: 'Dairy', icon: '🥛' },
  { value: 'beverages', label: 'Beverages', icon: '🥤' },
  { value: 'snacks', label: 'Snacks', icon: '🍪' },
  { value: 'fats', label: 'Fats & Oils', icon: '🫒' },
  { value: 'meals', label: 'Prepared Meals', icon: '🍱' },
] as const

export type FoodCategory = (typeof FOOD_CATEGORIES)[number]['value']

// ── Report Periods ───────────────────────────────────────────
export const REPORT_PERIODS = ['daily', 'weekly', 'monthly'] as const
export type ReportPeriod = (typeof REPORT_PERIODS)[number]

// ── Chart Colors — mirrors tailwind.config.ts macro colors ───
export const CHART_COLORS = {
  calories: '#2563EB',   // accent blue
  protein: '#2563EB',    // blue
  carbs: '#22C55E',      // green
  fat: '#F59E0B',        // amber
  fiber: '#64748B',      // slate
  water: '#0EA5E9',      // sky
  sodium: '#F97316',     // orange
} as const

// ── Macro Ratio Defaults (%) ─────────────────────────────────
export const DEFAULT_MACRO_RATIOS = {
  protein: 30,  // 30% of calories
  carbs: 40,    // 40% of calories
  fat: 30,      // 30% of calories
} as const

// ── Pagination ───────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 20

// ── Mock API ─────────────────────────────────────────────────
export const MOCK_API_BASE_URL = '/api' // placeholder, replaced in Phase 5
export const MOCK_DELAY_MS = {
  fast: 200,
  normal: 600,
  slow: 1200,
} as const

// ── Local Storage Keys ───────────────────────────────────────
export const STORAGE_KEYS = {
  THEME: 'nutritrack-theme',
  SIDEBAR_COLLAPSED: 'nutritrack-sidebar-collapsed',
  ONBOARDING_STEP: 'nutritrack-onboarding-step',
  UNIT_SYSTEM: 'nutritrack-unit-system',
} as const

// ── Query Keys — TanStack Query cache keys ───────────────────
export const QUERY_KEYS = {
  USER: ['user'] as const,
  PROFILE: ['profile'] as const,
  DASHBOARD: ['dashboard'] as const,
  MEALS: (date: string) => ['meals', date] as const,
  MEAL_DETAIL: (id: string) => ['meal', id] as const,
  FOOD_SEARCH: (query: string, filters?: object) => ['food-search', query, filters] as const,
  FOOD_DETAIL: (id: string) => ['food', id] as const,
  ANALYTICS: (period: string) => ['analytics', period] as const,
  REPORTS: (period: string, date: string) => ['reports', period, date] as const,
  SETTINGS: ['settings'] as const,
} as const

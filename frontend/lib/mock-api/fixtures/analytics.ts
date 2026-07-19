// ============================================================
// NutriTrack AI — Mock Analytics Fixtures
// Realistic time-series data for charts
// ============================================================

import type {
  DailyCalorieData,
  WeeklyAnalytics,
  MonthlyAnalytics,
  NutrientDeficiency,
  TopFood,
} from '@/types'
import { MOCK_FOODS } from './foods'

// ── Weekly (last 7 days) ─────────────────────────────────────
const WEEKLY_GOAL = 2800

function getDaysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0] as string
}

export const MOCK_WEEKLY_CALORIES: DailyCalorieData[] = [
  { date: getDaysAgo(6), calories: 2650, goal: WEEKLY_GOAL },
  { date: getDaysAgo(5), calories: 2900, goal: WEEKLY_GOAL },
  { date: getDaysAgo(4), calories: 2450, goal: WEEKLY_GOAL },
  { date: getDaysAgo(3), calories: 2780, goal: WEEKLY_GOAL },
  { date: getDaysAgo(2), calories: 3100, goal: WEEKLY_GOAL },
  { date: getDaysAgo(1), calories: 2600, goal: WEEKLY_GOAL },
  { date: getDaysAgo(0), calories: 1850, goal: WEEKLY_GOAL }, // today (in progress)
]

export const MOCK_TOP_FOODS: TopFood[] = [
  { food: MOCK_FOODS[0]!, times_logged: 12, total_calories: 1980 },
  { food: MOCK_FOODS[1]!, times_logged: 10, total_calories: 1120 },
  { food: MOCK_FOODS[4]!, times_logged: 9, total_calories: 1350 },
  { food: MOCK_FOODS[2]!, times_logged: 8, total_calories: 800 },
  { food: MOCK_FOODS[6]!, times_logged: 7, total_calories: 735 },
]

export const MOCK_DEFICIENCIES: NutrientDeficiency[] = [
  {
    nutrient: 'Vitamin D',
    unit: 'mcg',
    current_avg: 4.2,
    recommended: 15,
    percentage: 28,
    severity: 'high',
  },
  {
    nutrient: 'Calcium',
    unit: 'mg',
    current_avg: 720,
    recommended: 1000,
    percentage: 72,
    severity: 'low',
  },
  {
    nutrient: 'Fiber',
    unit: 'g',
    current_avg: 18,
    recommended: 30,
    percentage: 60,
    severity: 'medium',
  },
  {
    nutrient: 'Iron',
    unit: 'mg',
    current_avg: 12,
    recommended: 18,
    percentage: 67,
    severity: 'medium',
  },
  {
    nutrient: 'Vitamin B12',
    unit: 'mcg',
    current_avg: 2.1,
    recommended: 2.4,
    percentage: 88,
    severity: 'low',
  },
]

export const MOCK_WEEKLY_ANALYTICS: WeeklyAnalytics = {
  period_start: getDaysAgo(6),
  period_end: getDaysAgo(0),
  daily_calories: MOCK_WEEKLY_CALORIES,
  average_calories: 2618,
  average_protein_g: 142,
  average_carbs_g: 278,
  average_fat_g: 78,
  goal_completion_days: 4,
  top_foods: MOCK_TOP_FOODS,
  deficiencies: MOCK_DEFICIENCIES,
}

// ── Monthly ──────────────────────────────────────────────────
function getMonthDaysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0] as string
}

export const MOCK_MONTHLY_CALORIES: DailyCalorieData[] = Array.from({ length: 30 }, (_, i) => ({
  date: getMonthDaysAgo(29 - i),
  calories: Math.round(2200 + Math.random() * 900),
  goal: WEEKLY_GOAL,
}))

export const MOCK_MONTHLY_ANALYTICS: MonthlyAnalytics = {
  month: new Date().toISOString().substring(0, 7),
  daily_calories: MOCK_MONTHLY_CALORIES,
  weekly_averages: [
    { week: 'Week 1', calories: 2540 },
    { week: 'Week 2', calories: 2710 },
    { week: 'Week 3', calories: 2620 },
    { week: 'Week 4', calories: 2680 },
  ],
  average_calories: 2637,
  best_day: { date: getMonthDaysAgo(12), calories: 2780, goal: WEEKLY_GOAL },
  worst_day: { date: getMonthDaysAgo(22), calories: 2100, goal: WEEKLY_GOAL },
}

// ── Macro ratio for donut chart ───────────────────────────────
export const MOCK_MACRO_RATIOS = [
  { name: 'Protein', value: 142, percentage: 30, color: '#2563EB' },
  { name: 'Carbs', value: 278, percentage: 42, color: '#22C55E' },
  { name: 'Fat', value: 78, percentage: 28, color: '#F59E0B' },
]

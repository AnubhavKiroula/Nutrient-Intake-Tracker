// ============================================================
// NutriTrack AI — Mock API: Analytics & Reports
// ============================================================

import { simulateDelay } from '@/lib/utils'
import { MOCK_DELAY_MS } from '@/lib/constants'
import type { ApiResponse, WeeklyAnalytics, MonthlyAnalytics, Report } from '@/types'
import { MOCK_WEEKLY_ANALYTICS, MOCK_MONTHLY_ANALYTICS } from './fixtures/analytics'

export async function mockGetWeeklyAnalytics(): Promise<ApiResponse<WeeklyAnalytics>> {
  await simulateDelay(MOCK_DELAY_MS.normal)
  return { success: true, data: MOCK_WEEKLY_ANALYTICS, error: null }
}

export async function mockGetMonthlyAnalytics(): Promise<ApiResponse<MonthlyAnalytics>> {
  await simulateDelay(MOCK_DELAY_MS.normal)
  return { success: true, data: MOCK_MONTHLY_ANALYTICS, error: null }
}

export async function mockGetReport(period: string, date: string): Promise<ApiResponse<Report>> {
  await simulateDelay(MOCK_DELAY_MS.slow)

  const report: Report = {
    id: `report-${period}-${date}`,
    user_id: 'user-001',
    period: period as 'daily' | 'weekly' | 'monthly',
    period_start: date,
    period_end: date,
    summary: {
      average_calories: 2618,
      total_meals_logged: 21,
      goal_completion_rate: 71,
      most_logged_food: 'Chicken Breast (grilled)',
      water_intake_average_ml: 2400,
    },
    nutrition_totals: {
      calories: 18326,
      protein_g: 994,
      carbs_g: 1946,
      fat_g: 546,
      fiber_g: 126,
      sugar_g: 322,
      sodium_mg: 13580,
    },
    daily_breakdown: MOCK_WEEKLY_ANALYTICS.daily_calories,
    generated_at: new Date().toISOString(),
  }

  return { success: true, data: report, error: null }
}

// Mock export — just shows a toast in Phase 1
export async function mockExportReport(
  _period: string,
  _date: string,
  _format: 'pdf' | 'csv'
): Promise<ApiResponse<{ url: string }>> {
  await simulateDelay(MOCK_DELAY_MS.slow)
  // Phase 5: replace with real file generation endpoint
  return {
    success: true,
    data: { url: '#mock-export-url' },
    error: null,
  }
}

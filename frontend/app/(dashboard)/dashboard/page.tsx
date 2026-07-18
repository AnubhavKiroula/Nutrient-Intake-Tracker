'use client'

import { useQuery } from '@tanstack/react-query'
import { mockGetDailySummary, mockGetWaterSummary } from '@/lib/mock-api'
import { QUERY_KEYS } from '@/lib/constants'
import { PageContainer, PageHeader } from '@/components/layout/page-container'
import { CalorieCard } from '@/features/dashboard/CalorieCard'
import { MacroProgress } from '@/features/dashboard/MacroProgress'
import { WaterTracker } from '@/features/dashboard/WaterTracker'
import { RecentMeals } from '@/features/dashboard/RecentMeals'
import { WeeklyTrendChart } from '@/features/dashboard/WeeklyTrendChart'
import { GoalCompletionRing } from '@/features/dashboard/GoalCompletionRing'
import { MicronutrientProgress } from '@/features/dashboard/MicronutrientProgress'
import { SkeletonCard } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/ui/error-state'

const today = new Date().toISOString().split('T')[0] as string

export default function DashboardPage() {
  const {
    data: summaryRes,
    isLoading: summaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD,
    queryFn: () => mockGetDailySummary(today),
  })

  const {
    data: waterRes,
    isLoading: waterLoading,
    refetch: refetchWater,
  } = useQuery({
    queryKey: ['water', today],
    queryFn: () => mockGetWaterSummary(today),
  })

  const summary = summaryRes?.data
  const water = waterRes?.data

  if (summaryError) {
    return (
      <PageContainer>
        <ErrorState
          title="Failed to load dashboard"
          description="We couldn't fetch your nutrition data."
          onRetry={refetchSummary}
        />
      </PageContainer>
    )
  }

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <PageContainer>
      <PageHeader
        title={`${greeting()}, Alex 👋`}
        description={`Here's your nutrition summary for ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`}
      />

      {/* ── Top row: Calories + Goal Ring ────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {summaryLoading ? (
          <>
            <SkeletonCard className="lg:col-span-2" />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : summary ? (
          <>
            <CalorieCard
              consumed={summary.totals.calories}
              goal={summary.goals.calories}
              className="sm:col-span-2 lg:col-span-2"
            />
            <GoalCompletionRing
              percentage={summary.completion_percentage}
              mealsLogged={summary.meals.length}
            />
            <WaterTracker
              current={water?.total_ml ?? 0}
              goal={water?.goal_ml ?? 3000}
              loading={waterLoading}
              onRefetch={refetchWater}
            />
          </>
        ) : null}
      </div>

      {/* ── Macro Progress ────────────────────────────────────── */}
      {summaryLoading ? (
        <SkeletonCard className="mb-4" />
      ) : summary ? (
        <MacroProgress
          protein={{ current: summary.totals.protein_g, goal: summary.goals.protein_g }}
          carbs={{ current: summary.totals.carbs_g, goal: summary.goals.carbs_g }}
          fat={{ current: summary.totals.fat_g, goal: summary.goals.fat_g }}
          fiber={{ current: summary.totals.fiber_g, goal: summary.goals.fiber_g }}
          className="mb-4"
        />
      ) : null}

      {/* ── Bottom row: Recent Meals + Micronutrients + Weekly ─── */}
      <div className="grid gap-4 lg:grid-cols-3">
        {summaryLoading ? (
          <>
            <SkeletonCard className="lg:col-span-2" />
            <SkeletonCard />
          </>
        ) : summary ? (
          <>
            <div className="space-y-4 lg:col-span-2">
              <RecentMeals meals={summary.meals} />
              <WeeklyTrendChart />
            </div>
            <MicronutrientProgress goals={summary.goals} totals={summary.totals} />
          </>
        ) : null}
      </div>
    </PageContainer>
  )
}

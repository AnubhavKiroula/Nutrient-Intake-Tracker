'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { PageContainer, PageHeader } from '@/components/layout/page-container'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { CalorieTrendChart } from '@/features/analytics/calorie-trend-chart'
import { MacroDonut } from '@/features/analytics/macro-donut'
import { TopFoodsChart } from '@/features/analytics/top-foods-chart'
import { DeficienciesList } from '@/features/analytics/deficiencies-list'
import { SkeletonCard } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/ui/error-state'
import { mockGetWeeklyAnalytics, mockGetMonthlyAnalytics } from '@/lib/mock-api/analytics'
import { formatCalories, formatGrams } from '@/lib/utils'

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = React.useState('7days')

  // Queries
  const {
    data: weeklyRes,
    isLoading: isWeeklyLoading,
    isError: isWeeklyError,
    error: weeklyError,
    refetch: refetchWeekly,
  } = useQuery({
    queryKey: ['analytics', 'weekly'],
    queryFn: mockGetWeeklyAnalytics,
  })

  const {
    data: monthlyRes,
    isLoading: isMonthlyLoading,
    isError: isMonthlyError,
    error: monthlyError,
    refetch: refetchMonthly,
  } = useQuery({
    queryKey: ['analytics', 'monthly'],
    queryFn: mockGetMonthlyAnalytics,
  })

  const weekly = weeklyRes?.data
  const monthly = monthlyRes?.data

  const renderStatsSummary = (cal: number, p: number, c: number, f: number) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-card border-border shadow-xs">
        <CardContent className="py-4">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Avg Calories</p>
          <p className="text-xl font-bold text-foreground mt-0.5">{formatCalories(cal)}</p>
        </CardContent>
      </Card>
      <Card className="bg-card border-border shadow-xs">
        <CardContent className="py-4">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-macro-protein">Avg Protein</p>
          <p className="text-xl font-bold text-foreground mt-0.5">{formatGrams(p)}</p>
        </CardContent>
      </Card>
      <Card className="bg-card border-border shadow-xs">
        <CardContent className="py-4">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-macro-carbs">Avg Carbs</p>
          <p className="text-xl font-bold text-foreground mt-0.5">{formatGrams(c)}</p>
        </CardContent>
      </Card>
      <Card className="bg-card border-border shadow-xs">
        <CardContent className="py-4">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-macro-fat">Avg Fat</p>
          <p className="text-xl font-bold text-foreground mt-0.5">{formatGrams(f)}</p>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <PageContainer>
      <PageHeader
        title="Analytics & Trends"
        description="Deep dive into your nutritional compliance, averages and macro distributions."
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-[200px] grid-cols-2">
          <TabsTrigger value="7days">7 Days</TabsTrigger>
          <TabsTrigger value="30days">30 Days</TabsTrigger>
        </TabsList>

        <TabsContent value="7days" className="space-y-6 outline-none">
          {isWeeklyLoading ? (
            <div className="space-y-6" aria-busy="true">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
              <SkeletonCard className="h-64" />
            </div>
          ) : isWeeklyError ? (
            <ErrorState
              title="Failed to load weekly trends"
              description="Check your network settings and try again."
              error={weeklyError}
              onRetry={refetchWeekly}
            />
          ) : weekly ? (
            <>
              {renderStatsSummary(
                weekly.average_calories,
                weekly.average_protein_g,
                weekly.average_carbs_g,
                weekly.average_fat_g
              )}

              <div className="grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  <CalorieTrendChart
                    data={weekly.daily_calories}
                    title="Weekly Calorie Intake"
                    description="Daily logs compared against your goal target"
                  />
                  <TopFoodsChart topFoods={weekly.top_foods} />
                </div>
                <div className="space-y-4">
                  <MacroDonut
                    protein={weekly.average_protein_g}
                    carbs={weekly.average_carbs_g}
                    fat={weekly.average_fat_g}
                  />
                  <DeficienciesList deficiencies={weekly.deficiencies} />
                </div>
              </div>
            </>
          ) : null}
        </TabsContent>

        <TabsContent value="30days" className="space-y-6 outline-none">
          {isMonthlyLoading ? (
            <div className="space-y-6" aria-busy="true">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
              <SkeletonCard className="h-64" />
            </div>
          ) : isMonthlyError ? (
            <ErrorState
              title="Failed to load monthly trends"
              description="Check your connection and try again."
              error={monthlyError}
              onRetry={refetchMonthly}
            />
          ) : monthly ? (
            <>
              {renderStatsSummary(
                monthly.average_calories,
                150, // mock fallback averages for month
                245,
                72
              )}

              <div className="grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  <CalorieTrendChart
                    data={monthly.daily_calories}
                    title="Monthly Calorie Intake"
                    description="Caloric fluctuations across the last 30 days"
                  />
                </div>
                <div className="space-y-4">
                  <MacroDonut protein={150} carbs={245} fat={72} />
                  {weekly && <DeficienciesList deficiencies={weekly.deficiencies} />}
                </div>
              </div>
            </>
          ) : null}
        </TabsContent>
      </Tabs>
    </PageContainer>
  )
}

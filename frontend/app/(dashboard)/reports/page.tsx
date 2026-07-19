'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { PageContainer, PageHeader } from '@/components/layout/page-container'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { FileSpreadsheet, FileText, Loader2 } from 'lucide-react'
import { mockGetReport, mockExportReport } from '@/lib/mock-api/analytics'
import { ErrorState } from '@/components/ui/error-state'
import { SkeletonCard } from '@/components/ui/skeleton'
import { formatCalories, formatGrams, formatNumber } from '@/lib/utils'
import { toast } from '@/hooks/useToast'

export default function ReportsPage() {
  const [period, setPeriod] = React.useState('weekly')
  const [exporting, setExporting] = React.useState<'pdf' | 'csv' | null>(null)
  const today = new Date().toISOString().split('T')[0] as string

  const {
    data: reportRes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['reports', period, today],
    queryFn: () => mockGetReport(period, today),
  })

  const report = reportRes?.data

  const handleExport = async (format: 'pdf' | 'csv') => {
    setExporting(format)
    try {
      const res = await mockExportReport(period, today, format)
      if (res.success) {
        toast.success(
          `${format.toUpperCase()} export complete`,
          `Your report is ready for download. (Mock link: ${res.data?.url})`
        )
      } else {
        toast.error('Export failed', res.error?.message || 'Please retry.')
      }
    } catch (e) {
      toast.error('Export error', e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setExporting(null)
    }
  }

  return (
    <PageContainer>
      <PageHeader
        title="Nutritional Reports"
        description="Generate daily, weekly, or monthly PDF and CSV summaries for print or archiving."
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('csv')}
              disabled={exporting !== null || isLoading}
            >
              {exporting === 'csv' ? (
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              ) : (
                <FileSpreadsheet className="mr-1.5 h-3.5 w-3.5" />
              )}
              Export CSV
            </Button>
            <Button
              size="sm"
              onClick={() => handleExport('pdf')}
              disabled={exporting !== null || isLoading}
            >
              {exporting === 'pdf' ? (
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              ) : (
                <FileText className="mr-1.5 h-3.5 w-3.5" />
              )}
              Export PDF
            </Button>
          </div>
        }
      />

      <Tabs value={period} onValueChange={setPeriod} className="space-y-6">
        <TabsList className="grid w-full max-w-[300px] grid-cols-3">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value={period} className="space-y-6 outline-none">
          {isLoading ? (
            <div className="space-y-6" aria-busy="true">
              <SkeletonCard />
              <div className="grid gap-4 md:grid-cols-2">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>
          ) : isError ? (
            <ErrorState
              title="Failed to generate report"
              description="An error occurred building your report."
              error={error}
              onRetry={refetch}
            />
          ) : report ? (
            <div className="space-y-6">
              {/* Report Header Card */}
              <Card className="border-border bg-card shadow-xs">
                <CardHeader className="pb-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <Badge variant="accent" className="text-[10px] font-semibold uppercase">
                        {report.period} Report
                      </Badge>
                      <CardTitle className="mt-1 text-lg font-bold text-foreground">
                        Report generated on {new Date(report.generated_at).toLocaleDateString()}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-xs">Reference: #{report.id}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 border-t border-border pt-4 text-center md:grid-cols-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Avg Calories
                    </p>
                    <p className="mt-0.5 text-lg font-bold text-foreground">
                      {formatCalories(report.summary.average_calories)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Meals Tracked
                    </p>
                    <p className="mt-0.5 text-lg font-bold text-foreground">
                      {report.summary.total_meals_logged}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Goal Completion
                    </p>
                    <p className="mt-0.5 text-lg font-bold text-foreground">
                      {report.summary.goal_completion_rate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Top Food Item
                    </p>
                    <p
                      className="mt-1 truncate text-sm font-bold text-foreground"
                      title={report.summary.most_logged_food}
                    >
                      {report.summary.most_logged_food.split(' ')[0]}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Nutrient Intake Breakdown */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-border bg-card shadow-xs">
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Macro Totals
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Aggregate macronutrient mass consumed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-2 text-sm">
                      <span className="font-semibold text-macro-protein">Protein</span>
                      <span className="font-bold text-foreground">
                        {formatGrams(report.nutrition_totals.protein_g)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-2 text-sm">
                      <span className="font-semibold text-macro-carbs">Carbohydrates</span>
                      <span className="font-bold text-foreground">
                        {formatGrams(report.nutrition_totals.carbs_g)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-2 text-sm">
                      <span className="font-semibold text-macro-fat">Fat</span>
                      <span className="font-bold text-foreground">
                        {formatGrams(report.nutrition_totals.fat_g)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card shadow-xs">
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Micro Totals & Others
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Aggregate micronutrient mass consumed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-2 text-sm">
                      <span className="font-semibold text-foreground">Fiber</span>
                      <span className="font-bold text-foreground">
                        {formatGrams(report.nutrition_totals.fiber_g)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-2 text-sm">
                      <span className="font-semibold text-foreground">Sugars</span>
                      <span className="font-bold text-foreground">
                        {formatGrams(report.nutrition_totals.sugar_g)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-2 text-sm">
                      <span className="font-semibold text-foreground">Sodium</span>
                      <span className="font-bold text-foreground">
                        {formatNumber(report.nutrition_totals.sodium_mg)} mg
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : null}
        </TabsContent>
      </Tabs>
    </PageContainer>
  )
}

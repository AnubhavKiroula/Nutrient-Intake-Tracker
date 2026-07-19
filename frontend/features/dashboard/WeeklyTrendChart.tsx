'use client'

import { useQuery } from '@tanstack/react-query'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SkeletonChart } from '@/components/ui/skeleton'
import { mockGetWeeklyAnalytics } from '@/lib/mock-api'
import { formatNumber } from '@/lib/utils'

export function WeeklyTrendChart() {
  const { data: res, isLoading } = useQuery({
    queryKey: ['analytics', 'weekly'],
    queryFn: () => mockGetWeeklyAnalytics(),
  })

  const data = res?.data?.daily_calories ?? []
  const goal = res?.data?.daily_calories[0]?.goal ?? 2000

  const chartData = data.map((d) => ({
    day: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
    calories: d.calories,
    goal: d.goal,
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Weekly Calorie Trend</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <SkeletonChart />
        ) : (
          <ResponsiveContainer width="100%" height={160} aria-label="Weekly calorie bar chart">
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(v: any) => [formatNumber(Number(v)) + ' kcal', 'Calories']}
              />
              <ReferenceLine y={goal} stroke="hsl(var(--accent))" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Goal', fill: 'hsl(var(--accent))', fontSize: 10 }} />
              <Bar dataKey="calories" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

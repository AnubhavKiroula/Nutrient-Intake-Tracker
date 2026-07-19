'use client'

import * as React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import type { TopFood } from '@/types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { formatCalories } from '@/lib/utils'

interface TopFoodsChartProps {
  topFoods: TopFood[]
}

export function TopFoodsChart({ topFoods }: TopFoodsChartProps) {
  const chartData = topFoods.map((item) => ({
    name: item.food.name,
    count: item.times_logged,
    calories: item.total_calories,
  })).sort((a, b) => b.count - a.count)

  return (
    <Card className="border-border bg-card shadow-xs">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Top Logged Foods
        </CardTitle>
        <CardDescription className="text-xs">
          Your most frequently consumed items
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[220px]">
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-xs text-muted-foreground">
            No logged items found
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200} aria-label="Top logged foods bar chart">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
                width={120}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '11px',
                }}
                formatter={(value: number, name: string) => [
                  name === 'count' ? `${value} times` : `${formatCalories(value)}`,
                  name === 'count' ? 'Times Logged' : 'Total Calories',
                ]}
              />
              <Bar dataKey="count" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} barSize={12}>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsl(var(--accent) / ${1 - index * 0.15})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

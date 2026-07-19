'use client'

import * as React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { formatCalories, formatNumber } from '@/lib/utils'
import type { DailyCalorieData } from '@/types'

interface CalorieTrendChartProps {
  data: DailyCalorieData[]
  title: string
  description?: string
}

export function CalorieTrendChart({ data, title, description }: CalorieTrendChartProps) {
  const chartData = data.map((item) => ({
    dateStr: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    Calories: item.calories,
    Goal: item.goal,
  }))

  const goal = data[0]?.goal || 2000

  return (
    <Card className="border-border bg-card shadow-xs">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="h-[260px]">
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
            No trend data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="dateStr"
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '11px',
                }}
                formatter={(value: any) => [`${formatNumber(Number(value))} kcal`, 'Intake']}
              />
              <ReferenceLine
                y={goal}
                stroke="hsl(var(--accent))"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: `Goal: ${goal}`,
                  fill: 'hsl(var(--accent))',
                  fontSize: 10,
                  position: 'top',
                }}
              />
              <Area
                type="monotone"
                dataKey="Calories"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

'use client'

import * as React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface MacroDonutProps {
  protein: number
  carbs: number
  fat: number
}

export function MacroDonut({ protein, carbs, fat }: MacroDonutProps) {
  const total = protein + carbs + fat
  const data = [
    { name: 'Protein', value: Math.round(protein), color: 'var(--chart-2)' },
    { name: 'Carbs', value: Math.round(carbs), color: 'var(--chart-3)' },
    { name: 'Fat', value: Math.round(fat), color: 'var(--chart-4)' },
  ]

  const formatPercent = (val: number) => {
    if (!total) return '0%'
    return `${Math.round((val / total) * 100)}%`
  }

  return (
    <Card className="border-border bg-card shadow-xs">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Macro Ratio
        </CardTitle>
        <CardDescription className="text-xs">Caloric contribution breakdown</CardDescription>
      </CardHeader>
      <CardContent className="flex min-h-[220px] flex-col items-center justify-center">
        {total === 0 ? (
          <p className="text-xs text-muted-foreground">No macros tracked for this period</p>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="h-[140px] w-[140px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                    formatter={(value: any) => [`${value}g`, 'Amount']}
                  />
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="w-full space-y-2 text-xs">
              {data.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {item.value}g ({formatPercent(item.value)})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

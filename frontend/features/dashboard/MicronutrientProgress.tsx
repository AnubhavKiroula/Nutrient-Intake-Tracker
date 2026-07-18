'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { formatNumber, calculatePercentage } from '@/lib/utils'
import type { NutritionInfo, NutritionGoals } from '@/types'

interface MicronutrientProgressProps {
  totals: NutritionInfo
  goals: NutritionGoals
  className?: string
}

interface MicroItem {
  label: string
  current: number
  recommended: number
  unit: string
}

export function MicronutrientProgress({ totals, goals, className }: MicronutrientProgressProps) {
  const micros: MicroItem[] = [
    { label: 'Sodium', current: totals.sodium_mg, recommended: goals.sodium_mg, unit: 'mg' },
    { label: 'Sugar', current: totals.sugar_g, recommended: goals.sugar_g, unit: 'g' },
    // Micros from nutrition info (may be undefined in mock)
    { label: 'Vitamin C', current: totals.vitamin_c_mg ?? 0, recommended: 90, unit: 'mg' },
    { label: 'Iron', current: totals.iron_mg ?? 0, recommended: 18, unit: 'mg' },
    { label: 'Calcium', current: totals.calcium_mg ?? 0, recommended: 1000, unit: 'mg' },
  ]

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">Micronutrients</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {micros.map((micro) => {
          const pct = calculatePercentage(micro.current, micro.recommended)
          const isOver = micro.current > micro.recommended
          return (
            <div key={micro.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">{micro.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground">
                    {formatNumber(micro.current, 1)}{micro.unit}
                  </span>
                  {isOver && <Badge variant="warning" className="text-[10px] px-1.5 py-0">Over</Badge>}
                </div>
              </div>
              <Progress
                value={pct}
                color={isOver ? 'warning' : pct >= 80 ? 'success' : 'default'}
                aria-label={`${micro.label}: ${pct}% of recommended daily value`}
              />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

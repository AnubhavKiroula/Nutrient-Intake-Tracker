'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn, formatGrams, calculatePercentage } from '@/lib/utils'

interface MacroItem {
  current: number
  goal: number
}

interface MacroProgressProps {
  protein: MacroItem
  carbs: MacroItem
  fat: MacroItem
  fiber: MacroItem
  className?: string
}

interface MacroRowProps {
  label: string
  current: number
  goal: number
  color: 'protein' | 'carbs' | 'fat' | 'success'
  unit?: string
}

function MacroRow({ label, current, goal, color, unit = 'g' }: MacroRowProps) {
  const percentage = calculatePercentage(current, goal)
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">
          {formatGrams(current)} <span className="text-foreground/60">/ {formatGrams(goal)}</span>
        </span>
      </div>
      <Progress
        value={percentage}
        color={color}
        aria-label={`${label}: ${percentage}% of daily goal`}
      />
      <p className="text-xs text-muted-foreground text-right">{percentage}%</p>
    </div>
  )
}

export function MacroProgress({ protein, carbs, fat, fiber, className }: MacroProgressProps) {
  return (
    <Card className={cn('transition-shadow hover:shadow-card-hover', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">Macronutrients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MacroRow label="Protein" current={protein.current} goal={protein.goal} color="protein" />
          <MacroRow label="Carbohydrates" current={carbs.current} goal={carbs.goal} color="carbs" />
          <MacroRow label="Fat" current={fat.current} goal={fat.goal} color="fat" />
          <MacroRow label="Fiber" current={fiber.current} goal={fiber.goal} color="success" />
        </div>
      </CardContent>
    </Card>
  )
}

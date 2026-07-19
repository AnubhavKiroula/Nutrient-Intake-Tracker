'use client'

import { Flame, TrendingDown, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { formatCalories, formatNumber, calculatePercentage, cn } from '@/lib/utils'

interface CalorieCardProps {
  consumed: number
  goal: number
  className?: string
}

export function CalorieCard({ consumed, goal, className }: CalorieCardProps) {
  const remaining = goal - consumed
  const percentage = calculatePercentage(consumed, goal)
  const isOver = consumed > goal
  const status = isOver ? 'over' : percentage >= 90 ? 'near' : 'on-track'

  return (
    <Card className={cn('transition-shadow hover:shadow-card-hover', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Daily Calories
          </CardTitle>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-subtle">
            <Flame className="h-4 w-4 text-accent" aria-hidden="true" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold tracking-tight text-foreground">
            {formatNumber(consumed)}
          </span>
          <span className="mb-1 text-sm text-muted-foreground">/ {formatNumber(goal)} kcal</span>
          <Badge
            variant={isOver ? 'danger' : status === 'near' ? 'warning' : 'success'}
            className="mb-1 ml-auto"
          >
            {isOver ? (
              <>
                <TrendingUp className="h-3 w-3" />
                {formatNumber(Math.abs(remaining))} over
              </>
            ) : (
              <>
                <TrendingDown className="h-3 w-3" />
                {formatCalories(remaining)} left
              </>
            )}
          </Badge>
        </div>

        <Progress
          value={percentage}
          color={isOver ? 'danger' : status === 'near' ? 'warning' : 'default'}
          className="mt-3"
          aria-label={`${percentage}% of daily calorie goal consumed`}
        />

        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{percentage}% of goal</span>
          <span>Goal: {formatNumber(goal)} kcal</span>
        </div>
      </CardContent>
    </Card>
  )
}

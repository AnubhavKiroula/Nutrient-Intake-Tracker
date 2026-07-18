'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Target, Utensils } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GoalCompletionRingProps {
  percentage: number
  mealsLogged: number
  className?: string
}

export function GoalCompletionRing({ percentage, mealsLogged, className }: GoalCompletionRingProps) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  const isCompleted = percentage >= 100

  const strokeColor = isCompleted ? '#22C55E' : percentage >= 75 ? '#2563EB' : percentage >= 50 ? '#F59E0B' : '#E2E8F0'

  return (
    <Card className={cn('transition-shadow hover:shadow-card-hover', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">Goal Progress</CardTitle>
          {isCompleted && (
            <Badge variant="success">
              <Trophy className="h-3 w-3" />
              Done!
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3">
        {/* SVG donut ring */}
        <div className="relative" aria-label={`${percentage}% of daily goal completed`} role="img">
          <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90" aria-hidden="true">
            {/* Background ring */}
            <circle cx="44" cy="44" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
            {/* Progress ring */}
            <circle
              cx="44" cy="44" r={radius}
              fill="none"
              stroke={strokeColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-foreground">{percentage}%</span>
          </div>
        </div>

        <div className="flex w-full items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Utensils className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{mealsLogged} meals logged</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Target className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Daily goal</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { MEAL_TYPE_ICONS, ROUTES } from '@/lib/constants'
import { cn, formatCalories, formatRelativeTime } from '@/lib/utils'
import type { MealEntry } from '@/types'
import { Utensils, Plus } from 'lucide-react'

interface RecentMealsProps {
  meals: MealEntry[]
  className?: string
}

export function RecentMeals({ meals, className }: RecentMealsProps) {
  const sortedMeals = [...meals].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ).slice(0, 5)

  return (
    <Card className={cn('transition-shadow hover:shadow-card-hover', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">Recent Meals</CardTitle>
          <Link href={ROUTES.MEALS}>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-accent hover:text-accent/80">
              View all
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {sortedMeals.length === 0 ? (
          <EmptyState
            icon={<Utensils className="h-5 w-5" />}
            title="No meals logged yet"
            description="Start tracking your nutrition for today"
            action={{ label: 'Log a meal', onClick: () => { window.location.href = ROUTES.MEALS } }}
            size="sm"
          />
        ) : (
          <ul className="space-y-3" role="list" aria-label="Recent meals">
            {sortedMeals.map((meal) => (
              <li
                key={meal.id}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-base" aria-hidden="true">
                  {MEAL_TYPE_ICONS[meal.meal_type]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{meal.food.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {MEAL_TYPE_ICONS[meal.meal_type]} {meal.meal_type.charAt(0).toUpperCase() + meal.meal_type.slice(1)} · {formatRelativeTime(meal.created_at)}
                  </p>
                </div>
                <Badge variant="secondary" className="shrink-0 text-xs">
                  {formatCalories(meal.nutrition.calories)}
                </Badge>
              </li>
            ))}
          </ul>
        )}

        <Link href={ROUTES.MEALS} className="mt-3 block">
          <Button variant="outline" size="sm" className="w-full">
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Log a meal
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

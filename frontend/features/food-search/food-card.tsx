'use client'

import * as React from 'react'
import type { Food } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import { FOOD_CATEGORIES } from '@/lib/constants'
import { formatCalories } from '@/lib/utils'

interface FoodCardProps {
  food: Food
  onSelect: (food: Food) => void
}

export function FoodCard({ food, onSelect }: FoodCardProps) {
  const categoryIcon = FOOD_CATEGORIES.find((c) => c.value === food.category)?.icon || '🍽️'

  return (
    <Card
      onClick={() => onSelect(food)}
      className="card-interactive flex items-center justify-between p-3.5"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-lg"
          aria-hidden="true"
        >
          {categoryIcon}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-foreground">{food.name}</span>
            {food.verified && (
              <CheckCircle2
                className="h-3.5 w-3.5 shrink-0 text-accent"
                aria-label="Verified food data"
              />
            )}
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {food.brand ? `${food.brand} · ` : ''}
            {food.serving_size} {food.serving_unit}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="shrink-0 text-right">
          <p className="text-sm font-bold text-foreground">
            {formatCalories(food.nutrition.calories)}
          </p>
          <p className="text-[10px] text-muted-foreground">per serving</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      </div>
    </Card>
  )
}

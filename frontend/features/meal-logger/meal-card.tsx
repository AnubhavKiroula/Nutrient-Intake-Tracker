'use client'

import * as React from 'react'
import type { MealEntry } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2, Plus, Sparkles } from 'lucide-react'
import { MEAL_TYPE_LABELS, MEAL_TYPE_ICONS } from '@/lib/constants'
import { formatCalories } from '@/lib/utils'

interface MealCardProps {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  entries: MealEntry[]
  onAddFood: (mealType: string) => void
  onEditEntry: (entry: MealEntry) => void
  onDeleteEntry: (id: string) => void
}

export function MealCard({
  mealType,
  entries,
  onAddFood,
  onEditEntry,
  onDeleteEntry,
}: MealCardProps) {
  const totalCalories = entries.reduce((sum, item) => sum + item.nutrition.calories, 0)
  const totalProtein = entries.reduce((sum, item) => sum + item.nutrition.protein_g, 0)
  const totalCarbs = entries.reduce((sum, item) => sum + item.nutrition.carbs_g, 0)
  const totalFat = entries.reduce((sum, item) => sum + item.nutrition.fat_g, 0)

  return (
    <Card className="transition-all duration-slow hover:shadow-md border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            {MEAL_TYPE_ICONS[mealType]}
          </span>
          <div>
            <CardTitle className="text-base font-bold text-foreground">
              {MEAL_TYPE_LABELS[mealType]}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {entries.length} {entries.length === 1 ? 'item' : 'items'} logged
            </p>
          </div>
        </div>
        <div className="text-right">
          <Badge variant="secondary" className="font-bold text-sm">
            {formatCalories(totalCalories)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center border border-dashed border-border rounded-xl bg-muted/20">
            <p className="text-xs text-muted-foreground">No food logged for this meal</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddFood(mealType)}
              className="mt-2 text-xs text-accent hover:text-accent/80 font-medium"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add food
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* List of items */}
            <ul className="divide-y divide-border" role="list">
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm text-foreground truncate block">
                        {entry.food.name}
                      </span>
                      {entry.food.verified && (
                        <span className="h-2 w-2 rounded-full bg-accent" aria-label="Verified" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {entry.quantity} {entry.serving_unit} · {formatCalories(entry.nutrition.calories)}
                    </p>
                    {entry.notes && (
                      <p className="text-[10px] text-muted-foreground/80 italic mt-0.5">
                        Note: {entry.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onEditEntry(entry)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label={`Edit ${entry.food.name}`}
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onDeleteEntry(entry.id)}
                      className="text-muted-foreground hover:text-danger hover:bg-danger-subtle"
                      aria-label={`Delete ${entry.food.name}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Quick Macro Breakdown */}
            <div className="grid grid-cols-3 gap-1 pt-3 border-t border-border text-center text-[10px] font-medium text-muted-foreground">
              <div className="bg-muted/40 py-1 rounded">
                <span className="text-macro-protein">P:</span> {totalProtein.toFixed(1)}g
              </div>
              <div className="bg-muted/40 py-1 rounded">
                <span className="text-macro-carbs">C:</span> {totalCarbs.toFixed(1)}g
              </div>
              <div className="bg-muted/40 py-1 rounded">
                <span className="text-macro-fat">F:</span> {totalFat.toFixed(1)}g
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => onAddFood(mealType)}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add more food
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

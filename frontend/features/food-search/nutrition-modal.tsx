'use client'

import * as React from 'react'
import type { Food, MealType } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { MEAL_TYPES, MEAL_TYPE_LABELS, MEAL_TYPE_ICONS } from '@/lib/constants'
import { Progress } from '@/components/ui/progress'
import { calculatePercentage, formatNumber, formatGrams, cn } from '@/lib/utils'
import { toast } from '@/hooks/useToast'
import { CheckCircle2, Leaf } from 'lucide-react'

interface NutritionModalProps {
  food: Food | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onLogMeal?: (food: Food, quantity: number, mealType: MealType, notes?: string) => Promise<void>
}

export function NutritionModal({ food, open, onOpenChange, onLogMeal }: NutritionModalProps) {
  const [quantity, setQuantity] = React.useState<number>(1)
  const [mealType, setMealType] = React.useState<MealType>('breakfast')
  const [notes, setNotes] = React.useState('')
  const [logging, setLogging] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setQuantity(1)
      setMealType('breakfast')
      setNotes('')
    }
  }, [open])

  if (!food) return null

  const multiplier = quantity || 1
  const calories = Math.round(food.nutrition.calories * multiplier)
  const protein = food.nutrition.protein_g * multiplier
  const carbs = food.nutrition.carbs_g * multiplier
  const fat = food.nutrition.fat_g * multiplier
  const fiber = food.nutrition.fiber_g * multiplier
  const sugar = food.nutrition.sugar_g * multiplier
  const sodium = food.nutrition.sodium_mg * multiplier

  const totalMacros = protein + carbs + fat
  const proteinPct = calculatePercentage(protein, totalMacros)
  const carbsPct = calculatePercentage(carbs, totalMacros)
  const fatPct = calculatePercentage(fat, totalMacros)

  const handleLog = async () => {
    if (!onLogMeal) return
    setLogging(true)
    try {
      await onLogMeal(food, quantity, mealType, notes)
      toast.success('Meal logged!', `${food.name} added to your ${MEAL_TYPE_LABELS[mealType]}`)
      onOpenChange(false)
    } catch (e: any) {
      toast.error('Logging failed', e.message || 'Please retry.')
    } finally {
      setLogging(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
              {food.name}
            </DialogTitle>
            {food.verified && <CheckCircle2 className="h-4 w-4 text-accent" />}
          </div>
          <DialogDescription>
            {food.brand ? `${food.brand} · ` : ''}
            {food.serving_size} {food.serving_unit} base serving
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="rounded-lg bg-muted p-2">
              <div className="text-xs text-muted-foreground">Calories</div>
              <div className="text-lg font-bold text-foreground">{calories}</div>
              <div className="text-[10px] text-muted-foreground">kcal</div>
            </div>
            <div className="rounded-lg border-b-2 border-macro-protein bg-muted p-2">
              <div className="text-xs text-muted-foreground">Protein</div>
              <div className="text-lg font-bold text-foreground">{formatNumber(protein, 1)}</div>
              <div className="text-[10px] text-muted-foreground">g ({proteinPct}%)</div>
            </div>
            <div className="rounded-lg border-b-2 border-macro-carbs bg-muted p-2">
              <div className="text-xs text-muted-foreground">Carbs</div>
              <div className="text-lg font-bold text-foreground">{formatNumber(carbs, 1)}</div>
              <div className="text-[10px] text-muted-foreground">g ({carbsPct}%)</div>
            </div>
            <div className="rounded-lg border-b-2 border-macro-fat bg-muted p-2">
              <div className="text-xs text-muted-foreground">Fat</div>
              <div className="text-lg font-bold text-foreground">{formatNumber(fat, 1)}</div>
              <div className="text-[10px] text-muted-foreground">g ({fatPct}%)</div>
            </div>
          </div>

          {/* Micro details */}
          <div className="space-y-2 border-t border-border pt-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Nutrient Details
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
              <div className="flex justify-between border-b border-border pb-1">
                <span className="text-muted-foreground">Dietary Fiber</span>
                <span className="font-medium text-foreground">{formatGrams(fiber)}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-1">
                <span className="text-muted-foreground">Sugars</span>
                <span className="font-medium text-foreground">{formatGrams(sugar)}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-1">
                <span className="text-muted-foreground">Sodium</span>
                <span className="font-medium text-foreground">{formatNumber(sodium)} mg</span>
              </div>
              <div className="flex justify-between border-b border-border pb-1">
                <span className="text-muted-foreground">Vitamin C</span>
                <span className="font-medium text-foreground">
                  {food.nutrition.vitamin_c_mg
                    ? `${Math.round(food.nutrition.vitamin_c_mg * multiplier)} mg`
                    : '0 mg'}
                </span>
              </div>
            </div>
          </div>

          {/* Dietary tags */}
          {food.dietary_tags.length > 0 && food.dietary_tags[0] !== 'none' && (
            <div className="flex flex-wrap gap-1">
              {food.dietary_tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-1.5 py-0.5 text-[10px]">
                  {tag.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          )}

          {/* Logging Form Section */}
          {onLogMeal && (
            <div className="-mx-6 space-y-3 border-t border-border bg-muted/40 px-6 py-4 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Log this item
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="log-quantity" className="text-xs">
                    Servings ({food.serving_size} {food.serving_unit})
                  </Label>
                  <Input
                    id="log-quantity"
                    type="number"
                    min="0.1"
                    step="0.1"
                    className="h-9"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <Label htmlFor="log-meal-type" className="text-xs">
                    Meal Type
                  </Label>
                  <div className="flex h-9 overflow-hidden rounded-md border border-input bg-background">
                    {MEAL_TYPES.map((type) => {
                      const isSelected = mealType === type
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setMealType(type)}
                          className={cn(
                            'flex-1 border-r border-border text-center text-xs font-medium transition-colors last:border-r-0',
                            isSelected
                              ? 'bg-accent font-semibold text-accent-foreground'
                              : 'text-muted-foreground hover:bg-muted'
                          )}
                          title={MEAL_TYPE_LABELS[type]}
                        >
                          {MEAL_TYPE_ICONS[type]}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="log-notes" className="text-xs">
                  Notes (optional)
                </Label>
                <Input
                  id="log-notes"
                  placeholder="e.g. extra sauce, workout day snack"
                  className="h-9 text-xs"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t border-border pt-4">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {onLogMeal && (
            <Button size="sm" onClick={handleLog} loading={logging}>
              Add to {MEAL_TYPE_LABELS[mealType]}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

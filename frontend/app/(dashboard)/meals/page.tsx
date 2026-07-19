'use client'

import * as React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { PageContainer, PageHeader } from '@/components/layout/page-container'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MealCard } from '@/features/meal-logger/meal-card'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { ErrorState } from '@/components/ui/error-state'
import { SkeletonCard } from '@/components/ui/skeleton'
import { mockGetMeals, mockUpdateMeal, mockDeleteMeal } from '@/lib/mock-api/meals'
import { ROUTES } from '@/lib/constants'
import { toast } from '@/hooks/useToast'
import type { MealEntry } from '@/types'

export default function MealLoggerPage() {
  const queryClient = useQueryClient()
  const [date, setDate] = React.useState<string>(new Date().toISOString().split('T')[0] as string)

  // Modals state
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  const [editEntry, setEditEntry] = React.useState<MealEntry | null>(null)
  const [editOpen, setEditOpen] = React.useState(false)
  const [editQuantity, setEditQuantity] = React.useState<number>(1)
  const [editNotes, setEditNotes] = React.useState('')

  // Query meals
  const {
    data: mealsRes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['meals', date],
    queryFn: () => mockGetMeals(date),
  })

  const meals = mealsRes?.data || []

  // Mutations
  const updateMutation = useMutation({
    mutationFn: ({ id, quantity, notes }: { id: string; quantity: number; notes?: string }) =>
      mockUpdateMeal(id, quantity, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals', date] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success('Meal updated successfully')
      setEditOpen(false)
    },
    onError: () => {
      toast.error('Failed to update meal')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => mockDeleteMeal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals', date] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success('Meal deleted successfully')
      setDeleteOpen(false)
    },
    onError: () => {
      toast.error('Failed to delete meal')
    },
  })

  // Date handlers
  const changeDate = (days: number) => {
    const d = new Date(date)
    d.setDate(d.getDate() + days)
    setDate(d.toISOString().split('T')[0] as string)
  }

  // Edit / Delete Triggers
  const handleTriggerEdit = (entry: MealEntry) => {
    setEditEntry(entry)
    setEditQuantity(entry.quantity)
    setEditNotes(entry.notes || '')
    setEditOpen(true)
  }

  const handleTriggerDelete = (id: string) => {
    setDeleteId(id)
    setDeleteOpen(true)
  }

  const handleConfirmEdit = () => {
    if (!editEntry) return
    updateMutation.mutate({
      id: editEntry.id,
      quantity: editQuantity,
      notes: editNotes,
    })
  }

  const handleConfirmDelete = () => {
    if (!deleteId) return
    deleteMutation.mutate(deleteId)
  }

  // Quick navigation to search page
  const handleAddFoodRedirect = (mealType: string) => {
    window.location.href = `${ROUTES.SEARCH}?mealType=${mealType}`
  }

  // Filter entries
  const breakfastEntries = meals.filter((m) => m.meal_type === 'breakfast')
  const lunchEntries = meals.filter((m) => m.meal_type === 'lunch')
  const dinnerEntries = meals.filter((m) => m.meal_type === 'dinner')
  const snackEntries = meals.filter((m) => m.meal_type === 'snack')

  // Total daily stats
  const totalCalories = meals.reduce((sum, item) => sum + item.nutrition.calories, 0)
  const totalProtein = meals.reduce((sum, item) => sum + item.nutrition.protein_g, 0)
  const totalCarbs = meals.reduce((sum, item) => sum + item.nutrition.carbs_g, 0)
  const totalFat = meals.reduce((sum, item) => sum + item.nutrition.fat_g, 0)

  return (
    <PageContainer>
      <PageHeader
        title="Meal Log"
        description="Track your daily food intake, view nutritional breakdowns and trends."
        action={
          <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1 shadow-sm">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => changeDate(-1)}
              aria-label="Previous day"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[90px] select-none px-2 text-center text-xs font-semibold text-foreground">
              {new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => changeDate(1)}
              aria-label="Next day"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      {/* Daily Nutritional Summary Bar */}
      <Card className="mb-6 border-border bg-card shadow-xs">
        <CardContent className="grid grid-cols-2 gap-4 py-4 text-center md:grid-cols-4">
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Total Calories
            </p>
            <p className="text-lg font-bold text-foreground">{totalCalories} kcal</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-macro-protein text-muted-foreground">
              Protein
            </p>
            <p className="text-lg font-bold text-foreground">{totalProtein.toFixed(1)}g</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-macro-carbs text-muted-foreground">
              Carbohydrates
            </p>
            <p className="text-lg font-bold text-foreground">{totalCarbs.toFixed(1)}g</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-macro-fat text-muted-foreground">
              Fat
            </p>
            <p className="text-lg font-bold text-foreground">{totalFat.toFixed(1)}g</p>
          </div>
        </CardContent>
      </Card>

      {/* Grid of Meal Types */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2" aria-busy="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : isError ? (
        <ErrorState
          title="Failed to load meal entries"
          description="We couldn't fetch your meals for this date."
          error={error}
          onRetry={refetch}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <MealCard
            mealType="breakfast"
            entries={breakfastEntries}
            onAddFood={handleAddFoodRedirect}
            onEditEntry={handleTriggerEdit}
            onDeleteEntry={handleTriggerDelete}
          />
          <MealCard
            mealType="lunch"
            entries={lunchEntries}
            onAddFood={handleAddFoodRedirect}
            onEditEntry={handleTriggerEdit}
            onDeleteEntry={handleTriggerDelete}
          />
          <MealCard
            mealType="dinner"
            entries={dinnerEntries}
            onAddFood={handleAddFoodRedirect}
            onEditEntry={handleTriggerEdit}
            onDeleteEntry={handleTriggerDelete}
          />
          <MealCard
            mealType="snack"
            entries={snackEntries}
            onAddFood={handleAddFoodRedirect}
            onEditEntry={handleTriggerEdit}
            onDeleteEntry={handleTriggerDelete}
          />
        </div>
      )}

      {/* Edit Log Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Edit Log Entry</DialogTitle>
          </DialogHeader>

          {editEntry && (
            <div className="space-y-4 py-2">
              <div className="space-y-1">
                <Label>Food Item</Label>
                <div className="rounded-lg bg-muted p-2 text-sm font-semibold text-foreground">
                  {editEntry.food.name}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="edit-quantity">
                  Quantity ({editEntry.food.serving_size} {editEntry.food.serving_unit} base)
                </Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(Number(e.target.value))}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="edit-notes">Notes</Label>
                <Input
                  id="edit-notes"
                  placeholder="e.g. sugar-free syrup"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleConfirmEdit} loading={updateMutation.isPending}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Log Entry"
        description="Are you sure you want to remove this food item from your log? This cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        loading={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
      />
    </PageContainer>
  )
}

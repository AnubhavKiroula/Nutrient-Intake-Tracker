'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { PageContainer, PageHeader } from '@/components/layout/page-container'
import { Input } from '@/components/ui/input'
import { Search, SearchX } from 'lucide-react'
import { CategoryChips } from '@/features/food-search/category-chips'
import { FilterPanel } from '@/features/food-search/filter-panel'
import { FoodCard } from '@/features/food-search/food-card'
import { NutritionModal } from '@/features/food-search/nutrition-modal'
import { EmptyState } from '@/components/ui/empty-state'
import { ErrorState } from '@/components/ui/error-state'
import { SkeletonRow } from '@/components/ui/skeleton'
import { mockSearchFoods } from '@/lib/mock-api'
import { useDebounce } from '@/hooks/useDebounce'
import type { Food, MealType, FoodCategory, DietaryPreference, Allergen } from '@/types'

export default function FoodSearchPage() {
  const [query, setQuery] = React.useState('')
  const debouncedQuery = useDebounce(query, 300)
  const [category, setCategory] = React.useState<FoodCategory>('all')
  const [dietary, setDietary] = React.useState<string[]>([])
  const [allergens, setAllergens] = React.useState<string[]>([])

  const [selectedFood, setSelectedFood] = React.useState<Food | null>(null)
  const [modalOpen, setModalOpen] = React.useState(false)

  const {
    data: searchRes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['food-search', debouncedQuery, category, dietary, allergens],
    queryFn: () =>
      mockSearchFoods(debouncedQuery, {
        category,
        dietary: dietary as DietaryPreference[],
        exclude_allergens: allergens as Allergen[],
      }),
    enabled: debouncedQuery.trim().length > 0,
  })

  const results = searchRes?.data || []

  // Reset helper
  const handleClearFilters = () => {
    setDietary([])
    setAllergens([])
    setCategory('all')
  }

  // Mock log meal helper (for Phase 1 UI behavior only)
  const handleLogMeal = async (_food: Food, _quantity: number, _mealType: MealType, _notes?: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))
  }

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food)
    setModalOpen(true)
  }

  return (
    <PageContainer>
      <PageHeader
        title="Food Search"
        description="Search from our verified food base or scan your meals to log automatically."
      />

      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            id="food-search-input"
            type="search"
            placeholder="Search verified foods (e.g. Chicken, Brown Rice, Avocado...)"
            className="pl-10 h-11"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Category horizontal scrolling chips */}
        <CategoryChips selectedCategory={category} onSelectCategory={(cat) => setCategory(cat as FoodCategory)} />

        {/* Filter Panel */}
        <FilterPanel
          selectedDietary={dietary}
          setSelectedDietary={setDietary}
          excludedAllergens={allergens}
          setExcludedAllergens={setAllergens}
          onClear={handleClearFilters}
        />

        {/* Results Area */}
        <div className="pt-2">
          {query.trim().length === 0 ? (
            <EmptyState
              icon={<Search className="h-6 w-6" />}
              title="Search verified food database"
              description="Type above to search from over 100,000 foods and branded ingredients."
              size="md"
            />
          ) : isLoading ? (
            <div className="space-y-3" aria-busy="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : isError ? (
            <ErrorState
              title="Search failed"
              description="We encountered an issue querying the database."
              error={error}
              onRetry={refetch}
            />
          ) : results.length === 0 ? (
            <EmptyState
              icon={<SearchX className="h-6 w-6" />}
              title="No food items found"
              description="Check the spelling or try loosening your filter settings."
              action={{
                label: 'Clear Filters',
                onClick: handleClearFilters,
              }}
              size="md"
            />
          ) : (
            <ul className="space-y-2.5" aria-label="Search results">
              {results.map((food) => (
                <li key={food.id}>
                  <FoodCard food={food} onSelect={handleSelectFood} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Nutrition Preview & Log Modal */}
      <NutritionModal
        food={selectedFood}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onLogMeal={handleLogMeal}
      />
    </PageContainer>
  )
}

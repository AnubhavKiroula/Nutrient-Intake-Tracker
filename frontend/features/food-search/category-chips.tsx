'use client'

import * as React from 'react'
import { FOOD_CATEGORIES } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface CategoryChipsProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function CategoryChips({ selectedCategory, onSelectCategory }: CategoryChipsProps) {
  return (
    <div
      className="no-scrollbar -my-2 w-full overflow-x-auto py-2"
      role="group"
      aria-label="Food categories"
    >
      <div className="flex gap-2">
        {FOOD_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.value
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onSelectCategory(cat.value)}
              className={cn(
                'flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-fast',
                isSelected
                  ? 'border-accent bg-accent text-accent-foreground shadow-sm'
                  : 'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
              aria-pressed={isSelected}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

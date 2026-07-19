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
    <div className="w-full overflow-x-auto no-scrollbar py-2 -my-2" role="group" aria-label="Food categories">
      <div className="flex gap-2">
        {FOOD_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.value
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onSelectCategory(cat.value)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold whitespace-nowrap transition-all duration-fast shrink-0',
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

'use client'

import * as React from 'react'
import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { DIETARY_PREFERENCES, ALLERGENS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface FilterPanelProps {
  selectedDietary: string[]
  setSelectedDietary: React.Dispatch<React.SetStateAction<string[]>>
  excludedAllergens: string[]
  setExcludedAllergens: React.Dispatch<React.SetStateAction<string[]>>
  onClear: () => void
}

export function FilterPanel({
  selectedDietary,
  setSelectedDietary,
  excludedAllergens,
  setExcludedAllergens,
  onClear,
}: FilterPanelProps) {
  const [open, setOpen] = React.useState(false)

  const activeFiltersCount = selectedDietary.length + excludedAllergens.length

  const toggleDietary = (val: string) => {
    setSelectedDietary((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    )
  }

  const toggleAllergen = (val: string) => {
    setExcludedAllergens((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(!open)}
          className={cn(
            'flex items-center gap-2 text-xs font-semibold',
            open && 'border-accent bg-accent-subtle text-accent'
          )}
          aria-expanded={open}
          aria-label="Filter food search"
        >
          <Filter className="h-3.5 w-3.5" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              {activeFiltersCount}
            </span>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-8 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        )}
      </div>

      {open && (
        <div className="animate-fade-in space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm">
          {/* Dietary Prefs */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Dietary Preference (All of these)
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {DIETARY_PREFERENCES.filter((p) => p.value !== 'none').map((p) => {
                const isSelected = selectedDietary.includes(p.value)
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => toggleDietary(p.value)}
                    className={cn(
                      'rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-fast',
                      isSelected
                        ? 'border-accent bg-accent-subtle text-accent'
                        : 'border-border bg-card text-muted-foreground hover:bg-muted'
                    )}
                  >
                    {p.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Excluded Allergens */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Exclude Allergens / Ingredients (None of these)
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {ALLERGENS.map((a) => {
                const isSelected = excludedAllergens.includes(a.value)
                return (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() => toggleAllergen(a.value)}
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-fast',
                      isSelected
                        ? 'border-danger bg-danger-subtle text-danger'
                        : 'border-border bg-card text-muted-foreground hover:bg-muted'
                    )}
                  >
                    <span>{a.label}</span>
                    {isSelected && <X className="h-3 w-3 text-danger" />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { Droplets, Plus, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn, formatVolume, calculatePercentage } from '@/lib/utils'
import { toast } from '@/hooks/useToast'
import { mockAddWater } from '@/lib/mock-api'
import { useState } from 'react'

interface WaterTrackerProps {
  current: number
  goal: number
  loading?: boolean
  onRefetch?: () => void
  className?: string
}

const QUICK_ADD_OPTIONS = [250, 350, 500] as const

export function WaterTracker({ current, goal, loading = false, onRefetch, className }: WaterTrackerProps) {
  const [adding, setAdding] = useState(false)
  const percentage = calculatePercentage(current, goal)
  const today = new Date().toISOString().split('T')[0] as string

  async function handleAddWater(amount: number) {
    setAdding(true)
    const res = await mockAddWater(today, amount)
    setAdding(false)
    if (res.success) {
      toast.success(`+${formatVolume(amount)} added`, `Total: ${formatVolume((res.data?.total_ml) ?? current + amount)}`)
      onRefetch?.()
    }
  }

  return (
    <Card className={cn('transition-shadow hover:shadow-card-hover', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">Water Intake</CardTitle>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30">
            <Droplets className="h-4 w-4 text-blue-500" aria-hidden="true" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold tracking-tight text-foreground">{formatVolume(current)}</span>
          <span className="text-sm text-muted-foreground">/ {formatVolume(goal)}</span>
        </div>

        <Progress
          value={percentage}
          color="default"
          className="mt-2 [&_.h-full]:bg-blue-500"
          aria-label={`${percentage}% of daily water goal`}
        />
        <p className="mt-1 text-xs text-muted-foreground">{percentage}% of daily goal</p>

        {/* Quick add buttons */}
        <div className="mt-3 flex gap-1.5">
          {QUICK_ADD_OPTIONS.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => handleAddWater(amount)}
              disabled={adding || loading}
              aria-label={`Add ${formatVolume(amount)} of water`}
            >
              <Plus className="h-3 w-3" aria-hidden="true" />
              {formatVolume(amount)}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

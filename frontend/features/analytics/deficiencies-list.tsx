'use client'

import * as React from 'react'
import type { NutrientDeficiency } from '@/types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { AlertTriangle, Info } from 'lucide-react'

interface DeficienciesListProps {
  deficiencies: NutrientDeficiency[]
}

export function DeficienciesList({ deficiencies }: DeficienciesListProps) {
  return (
    <Card className="border-border bg-card shadow-xs">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Nutritional Deficiencies
          </CardTitle>
          <Info
            className="h-4 w-4 shrink-0 text-muted-foreground"
            aria-label="Details about nutritional warning calculations"
          />
        </div>
        <CardDescription className="text-xs">
          Nutrients tracked below recommended intake
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {deficiencies.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 py-8 text-center">
            <span className="text-sm font-bold text-success">Excellent!</span>
            <p className="mt-1 text-xs text-muted-foreground">No nutrient deficiencies detected.</p>
          </div>
        ) : (
          <ul className="space-y-3.5" role="list">
            {deficiencies.map((item) => {
              const severityVariant =
                item.severity === 'high'
                  ? 'danger'
                  : item.severity === 'medium'
                    ? 'warning'
                    : 'secondary'

              return (
                <li
                  key={item.nutrient}
                  className="space-y-1.5 rounded-lg p-2 transition-colors hover:bg-muted/40"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      {item.severity === 'high' && (
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0 animate-pulse text-danger" />
                      )}
                      <span className="font-semibold text-foreground">{item.nutrient}</span>
                    </div>
                    <Badge variant={severityVariant} className="px-1.5 py-0 text-[10px]">
                      {item.severity} severity
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>
                      Avg: {item.current_avg} {item.unit}
                    </span>
                    <span>
                      Target: {item.recommended} {item.unit}
                    </span>
                  </div>

                  <Progress
                    value={item.percentage}
                    color={
                      item.severity === 'high'
                        ? 'danger'
                        : item.severity === 'medium'
                          ? 'warning'
                          : 'success'
                    }
                    aria-label={`${item.nutrient} compliance: ${item.percentage}%`}
                  />
                  <p className="text-right text-[10px] text-muted-foreground">
                    {item.percentage}% of goal reached
                  </p>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

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
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Nutritional Deficiencies
          </CardTitle>
          <Info className="h-4 w-4 text-muted-foreground shrink-0" aria-label="Details about nutritional warning calculations" />
        </div>
        <CardDescription className="text-xs">
          Nutrients tracked below recommended intake
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {deficiencies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-muted/20 border border-dashed border-border rounded-xl">
            <span className="text-sm font-bold text-success">Excellent!</span>
            <p className="text-xs text-muted-foreground mt-1">No nutrient deficiencies detected.</p>
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
                <li key={item.nutrient} className="space-y-1.5 p-2 rounded-lg transition-colors hover:bg-muted/40">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      {item.severity === 'high' && (
                        <AlertTriangle className="h-3.5 w-3.5 text-danger shrink-0 animate-pulse" />
                      )}
                      <span className="font-semibold text-foreground">{item.nutrient}</span>
                    </div>
                    <Badge variant={severityVariant} className="text-[10px] py-0 px-1.5">
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
                    color={item.severity === 'high' ? 'danger' : item.severity === 'medium' ? 'warning' : 'success'}
                    aria-label={`${item.nutrient} compliance: ${item.percentage}%`}
                  />
                  <p className="text-[10px] text-muted-foreground text-right">{item.percentage}% of goal reached</p>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

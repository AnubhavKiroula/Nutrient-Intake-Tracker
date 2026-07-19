import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const progressVariants = cva('h-full w-full flex-1 transition-all duration-slow', {
  variants: {
    color: {
      default: 'bg-primary',
      success: 'bg-success',
      warning: 'bg-warning',
      danger: 'bg-danger',
      protein: 'bg-macro-protein',
      carbs: 'bg-macro-carbs',
      fat: 'bg-macro-fat',
    },
  },
  defaultVariants: {
    color: 'default',
  },
})

export interface ProgressProps extends Omit<
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
  'color'
> {
  color?: 'default' | 'success' | 'warning' | 'danger' | 'protein' | 'carbs' | 'fat' | null
  label?: string
  showValue?: boolean
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, color, label, showValue = false, ...props }, ref) => (
    <div className="w-full space-y-1">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs font-medium text-muted-foreground">{label}</span>}
          {showValue && (
            <span className="text-xs font-medium text-foreground">{Math.round(value ?? 0)}%</span>
          )}
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(progressVariants({ color }))}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

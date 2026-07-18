import * as React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface ErrorStateProps {
  title?: string
  description?: string
  error?: Error | string | null
  onRetry?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showDetails?: boolean
}

/**
 * ErrorState — displayed when a data fetch or action fails.
 * Always show an onRetry action so users can recover without a full page reload.
 */
export function ErrorState({
  title = 'Something went wrong',
  description = 'We ran into an unexpected error. Please try again.',
  error,
  onRetry,
  className,
  size = 'md',
  showDetails = false,
}: ErrorStateProps) {
  const sizeClasses = {
    sm: 'py-6 px-4',
    md: 'py-10 px-6',
    lg: 'py-14 px-8',
  }

  const errorMessage = error instanceof Error ? error.message : error

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizeClasses[size],
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-danger-subtle text-danger"
        aria-hidden="true"
      >
        <AlertCircle className="h-6 w-6" />
      </div>

      <h3 className="text-lg font-semibold text-foreground">{title}</h3>

      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>

      {showDetails && errorMessage && (
        <p className="mt-2 max-w-sm rounded-md bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
          {errorMessage}
        </p>
      )}

      {onRetry && (
        <Button className="mt-6" onClick={onRetry} variant="outline" size="sm">
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          Try again
        </Button>
      )}
    </div>
  )
}

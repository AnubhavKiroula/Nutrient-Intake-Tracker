'use client'

import * as React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error | null; reset: () => void }>
}

/**
 * ErrorBoundary — catches unexpected React render errors and displays
 * a graceful fallback UI instead of a blank white screen.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <YourComponent />
 *   </ErrorBoundary>
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // In Phase 6+, replace with a real error reporting service (Sentry, etc.)
    console.error('[ErrorBoundary] Uncaught error:', error, errorInfo)
  }

  reset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback

      if (FallbackComponent) {
        return <FallbackComponent error={this.state.error} reset={this.reset} />
      }

      return (
        <div
          className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8 text-center"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-danger-subtle">
            <svg
              className="h-8 w-8 text-danger"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Something went wrong</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              An unexpected error occurred. Please refresh the page or try again.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <pre className="mt-3 max-w-lg overflow-auto rounded-lg bg-muted px-4 py-3 text-left text-xs text-muted-foreground">
                {this.state.error.message}
              </pre>
            )}
          </div>
          <button
            onClick={this.reset}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

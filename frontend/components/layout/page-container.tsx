import * as React from 'react'
import { cn } from '@/lib/utils'

export interface PageContainerProps {
  children: React.ReactNode
  className?: string
  /**
   * Whether to use a narrow max-width (for settings, auth pages, etc.)
   */
  narrow?: boolean
  /**
   * Additional top padding override
   */
  noPadding?: boolean
}

/**
 * PageContainer — consistent spacing wrapper for all dashboard pages.
 * Apply to every dashboard page's content area.
 */
export function PageContainer({
  children,
  className,
  narrow = false,
  noPadding = false,
}: PageContainerProps) {
  return (
    <main
      className={cn(
        'min-h-full w-full',
        !noPadding && 'px-4 py-6 md:px-6 lg:px-8',
        narrow ? 'mx-auto max-w-3xl' : 'mx-auto max-w-7xl',
        className
      )}
    >
      {children}
    </main>
  )
}

// ── Page Header ───────────────────────────────────────────────
export interface PageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function PageHeader({ title, description, action, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-6 flex items-start justify-between gap-4', className)}>
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────
export interface SectionProps {
  title?: string
  description?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function Section({ title, description, action, children, className }: SectionProps) {
  return (
    <section className={cn('space-y-4', className)}>
      {(title || action) && (
        <div className="flex items-center justify-between">
          <div>
            {title && <h3 className="text-base font-semibold text-foreground">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

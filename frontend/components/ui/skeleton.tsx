import * as React from 'react'
import { cn } from '@/lib/utils'

// ── Skeleton Base ────────────────────────────────────────────
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

function Skeleton({ className, rounded = 'md', ...props }: SkeletonProps) {
  const roundedClass = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }[rounded]

  return (
    <div
      className={cn('skeleton', roundedClass, className)}
      aria-hidden="true"
      role="presentation"
      {...props}
    />
  )
}

// ── Skeleton Text ────────────────────────────────────────────
function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  )
}

// ── Skeleton Card ────────────────────────────────────────────
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn('rounded-xl border border-border bg-card p-6 shadow-card', className)}
      aria-hidden="true"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="h-10 w-10" rounded="lg" />
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-2 w-full" rounded="full" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}

// ── Skeleton Table Row ───────────────────────────────────────
function SkeletonRow({ columns = 4, className }: { columns?: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-4 py-3', className)} aria-hidden="true">
      <Skeleton className="h-10 w-10 shrink-0" rounded="full" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
      {Array.from({ length: columns - 2 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-16 shrink-0" />
      ))}
    </div>
  )
}

// ── Skeleton Chart ───────────────────────────────────────────
function SkeletonChart({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-40 items-end gap-2', className)} aria-hidden="true">
      {[60, 85, 45, 70, 90, 55, 75].map((h, i) => (
        <div key={i} className="flex flex-1 items-end">
          <Skeleton className="w-full" style={{ height: `${h}%` }} rounded="sm" />
        </div>
      ))}
    </div>
  )
}

export { Skeleton, SkeletonText, SkeletonCard, SkeletonRow, SkeletonChart }

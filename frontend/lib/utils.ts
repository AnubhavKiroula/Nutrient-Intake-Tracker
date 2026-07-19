import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes intelligently.
 * Resolves conflicts (e.g., p-4 + p-2 → p-2) using tailwind-merge,
 * and handles conditional classes with clsx.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as a currency string.
 */
export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Format a number with comma separators and optional decimal places.
 */
export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/**
 * Calculate percentage, clamped to [0, 100].
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return Math.min(100, Math.max(0, Math.round((value / total) * 100)))
}

/**
 * Format grams with unit label.
 */
export function formatGrams(value: number): string {
  return `${formatNumber(value, 1)}g`
}

/**
 * Format calories.
 */
export function formatCalories(value: number): string {
  return `${formatNumber(Math.round(value))} kcal`
}

/**
 * Format milliliters as ml or L.
 */
export function formatVolume(ml: number): string {
  if (ml >= 1000) {
    return `${(ml / 1000).toFixed(1)}L`
  }
  return `${Math.round(ml)}ml`
}

/**
 * Format a date as a human-readable string.
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(
    'en-US',
    options ?? { month: 'short', day: 'numeric', year: 'numeric' }
  )
}

/**
 * Format a date as a relative time string (e.g. "2 hours ago").
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(d)
}

/**
 * Simulate a network delay (for mock API responses).
 * Mimics realistic latency so UI loading states are testable.
 */
export function simulateDelay(ms = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Truncate a string to a max length, appending ellipsis if needed.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 3) + '...'
}

/**
 * Generate a deterministic color from a string (for avatars, etc.).
 * Returns a Tailwind-friendly hsl value.
 */
export function stringToColor(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 65%, 50%)`
}

/**
 * Get initials from a full name (up to 2 characters).
 */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/)
  if (words.length === 0) return ''
  if (words.length === 1) return (words[0]?.[0] ?? '').toUpperCase()
  return ((words[0]?.[0] ?? '') + (words[words.length - 1]?.[0] ?? '')).toUpperCase()
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

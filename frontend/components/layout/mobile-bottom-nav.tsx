'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Search, UtensilsCrossed, BarChart3, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants'

// Only show 5 items in bottom nav (most important ones)
const BOTTOM_NAV_ITEMS = [
  { href: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { href: ROUTES.SEARCH, label: 'Search', icon: Search },
  { href: ROUTES.MEALS, label: 'Meals', icon: UtensilsCrossed },
  { href: ROUTES.ANALYTICS, label: 'Analytics', icon: BarChart3 },
  { href: ROUTES.REPORTS, label: 'Reports', icon: FileText },
] as const

/**
 * MobileBottomNav — replaces the sidebar on mobile (< 1024px).
 * Fixed to the bottom of the viewport, tab-bar style.
 * Not shown on desktop (hidden lg:hidden).
 */
export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-topbar border-t border-border bg-background/90 backdrop-blur-md lg:hidden"
      aria-label="Mobile bottom navigation"
    >
      <ul className="flex items-stretch">
        {BOTTOM_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-1 py-2.5',
                  'text-xs font-medium transition-colors duration-fast',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
                  isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  className={cn(
                    'h-5 w-5 transition-colors',
                    isActive ? 'text-accent' : 'text-muted-foreground'
                  )}
                  aria-hidden="true"
                />
                <span>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

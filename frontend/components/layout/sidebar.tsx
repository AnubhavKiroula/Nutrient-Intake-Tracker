'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Search,
  UtensilsCrossed,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { APP_NAME, ROUTES } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/useMediaQuery'

// ── Nav Items ────────────────────────────────────────────────
const NAV_ITEMS = [
  { href: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { href: ROUTES.SEARCH, label: 'Food Search', icon: Search },
  { href: ROUTES.MEALS, label: 'Meal Log', icon: UtensilsCrossed },
  { href: ROUTES.ANALYTICS, label: 'Analytics', icon: BarChart3 },
  { href: ROUTES.REPORTS, label: 'Reports', icon: FileText },
  { href: ROUTES.SETTINGS, label: 'Settings', icon: Settings },
] as const

// ── Sidebar Context ───────────────────────────────────────────
interface SidebarContextValue {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}

export const SidebarContext = React.createContext<SidebarContextValue>({
  collapsed: false,
  setCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
})

export function useSidebar() {
  return React.useContext(SidebarContext)
}

// ── Sidebar Provider ──────────────────────────────────────────
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const isMobile = useIsMobile()

  // Auto-collapse on mobile
  React.useEffect(() => {
    if (isMobile) setCollapsed(false)
  }, [isMobile])

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

// ── Sidebar Component ─────────────────────────────────────────
export function Sidebar() {
  const pathname = usePathname()
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar()
  const isMobile = useIsMobile()

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div
        className={cn(
          'flex h-16 items-center border-b border-sidebar-border px-4',
          collapsed ? 'justify-center' : 'justify-between'
        )}
      >
        <Link href={ROUTES.DASHBOARD} className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
                className="overflow-hidden whitespace-nowrap font-semibold text-sidebar-foreground"
              >
                {APP_NAME}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* Mobile close */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="thin-scrollbar flex-1 overflow-y-auto p-3" aria-label="Main navigation">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => isMobile && setMobileOpen(false)}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
                    'transition-colors duration-fast',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    isActive
                      ? 'bg-accent-subtle text-accent'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                    collapsed && 'justify-center px-2'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  title={collapsed ? label : undefined}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0 transition-colors',
                      isActive
                        ? 'text-accent'
                        : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground'
                    )}
                    aria-hidden="true"
                  />
                  <AnimatePresence initial={false}>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden whitespace-nowrap"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Active indicator */}
                  {isActive && !collapsed && (
                    <motion.div
                      layoutId="sidebar-active-indicator"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Collapse toggle — desktop only */}
      {!isMobile && (
        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'w-full text-sidebar-foreground/60 hover:text-sidebar-foreground',
              collapsed && 'justify-center px-0'
            )}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )

  // Mobile: slide-out drawer with overlay
  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-sidebar bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-sidebar w-64 border-r border-sidebar-border bg-sidebar"
              aria-label="Site navigation"
            >
              {sidebarContent}
            </motion.aside>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Desktop: static sidebar
  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative hidden h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex"
      aria-label="Site navigation"
    >
      {sidebarContent}
    </motion.aside>
  )
}

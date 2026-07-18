'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Bell, Menu, Moon, Sun, Monitor, LogOut, Settings, User, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/layout/sidebar'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { cn, getInitials } from '@/lib/utils'
import { ROUTES } from '@/lib/constants'

// Mock user data — replaced by real user from auth context in Phase 4
const MOCK_USER = {
  name: 'Alex Johnson',
  email: 'alex@nutritrack.ai',
  avatarUrl: null,
}

// ── Theme Toggle Button ───────────────────────────────────────
function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme" disabled>
        <div className="h-4 w-4" />
      </Button>
    )
  }

  const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
  const label = `Switch to ${nextTheme} mode`

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(nextTheme)}
      aria-label={label}
      title={label}
    >
      {theme === 'dark' && <Moon className="h-4 w-4" aria-hidden="true" />}
      {theme === 'light' && <Sun className="h-4 w-4" aria-hidden="true" />}
      {theme === 'system' && <Monitor className="h-4 w-4" aria-hidden="true" />}
    </Button>
  )
}

// ── User Menu ─────────────────────────────────────────────────
function UserMenu() {
  const [open, setOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const initials = getInitials(MOCK_USER.name)

  // Close on outside click
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on Escape
  React.useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 rounded-lg px-2 py-1.5',
          'text-sm font-medium text-foreground transition-colors duration-fast',
          'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          open && 'bg-muted'
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="User menu"
      >
        {/* Avatar */}
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground"
          aria-hidden="true"
        >
          {initials}
        </div>
        <span className="hidden sm:block max-w-[120px] truncate">{MOCK_USER.name.split(' ')[0]}</span>
        <ChevronDown
          className={cn('hidden h-3.5 w-3.5 text-muted-foreground transition-transform sm:block', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={cn(
            'absolute right-0 top-full mt-1.5 w-56 origin-top-right',
            'rounded-xl border border-border bg-popover p-1 shadow-lg',
            'z-dropdown animate-fade-in'
          )}
          role="menu"
          aria-label="User menu options"
        >
          {/* User info */}
          <div className="px-3 py-2 border-b border-border mb-1">
            <p className="text-sm font-medium text-foreground truncate">{MOCK_USER.name}</p>
            <p className="text-xs text-muted-foreground truncate">{MOCK_USER.email}</p>
          </div>

          {/* Menu items */}
          <Link
            href={ROUTES.SETTINGS}
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <User className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            Profile
          </Link>
          <Link
            href={ROUTES.SETTINGS}
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <Settings className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            Settings
          </Link>

          <div className="my-1 border-t border-border" />

          {/* Sign out — mock, no real auth logic */}
          <button
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-danger hover:bg-danger-subtle transition-colors"
            role="menuitem"
            onClick={() => {
              setOpen(false)
              // Phase 4: replace with real logout
              window.location.href = ROUTES.LOGIN
            }}
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

// ── Topbar ────────────────────────────────────────────────────
export interface TopbarProps {
  title?: string
}

export function Topbar({ title }: TopbarProps) {
  const { setMobileOpen } = useSidebar()
  const isMobile = useIsMobile()

  return (
    <header
      className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md"
      aria-label="Top navigation bar"
    >
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
        )}

        {/* Page title */}
        {title && (
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        )}
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-1.5">
        {/* Notifications — UI shell only */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          {/* Unread dot */}
          <span
            className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent"
            aria-label="3 unread notifications"
          />
        </Button>

        <ThemeToggle />

        <div className="ml-1 h-6 w-px bg-border" aria-hidden="true" />

        <UserMenu />
      </div>
    </header>
  )
}

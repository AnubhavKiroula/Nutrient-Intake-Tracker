import type { Metadata } from 'next'
import { SidebarProvider, Sidebar } from '@/components/layout/sidebar'
import { Topbar } from '@/components/layout/topbar'
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav'
import { ErrorBoundary } from '@/components/layout/error-boundary'

export const metadata: Metadata = {
  title: 'Dashboard',
}

/**
 * Dashboard layout — wraps all (dashboard) route group pages.
 * Provides: Sidebar + Topbar + ErrorBoundary + Mobile bottom nav.
 * The main content area grows to fill remaining space.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar — hidden on mobile, visible lg+ */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />

          {/* Scrollable page content */}
          <div className="flex-1 overflow-y-auto thin-scrollbar">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </div>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <MobileBottomNav />
    </SidebarProvider>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { Leaf } from 'lucide-react'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Sign In',
}

/**
 * Auth layout — shared by login, register, forgot-password, reset-password, verify-email.
 * Clean centered layout with logo header.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar with logo */}
      <header
        className="flex h-16 items-center border-b border-border px-6"
        aria-label="Application header"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
          </div>
          <span className="font-semibold text-foreground">{APP_NAME}</span>
        </Link>
      </header>

      {/* Centered content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[440px]">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

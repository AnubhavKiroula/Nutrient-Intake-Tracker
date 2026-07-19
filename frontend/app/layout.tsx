import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { QueryProvider } from '@/components/layout/query-provider'
import { MockAuthProvider } from '@/features/auth/context/MockAuthProvider'
import { AxeA11yProvider } from '@/components/layout/AxeA11yProvider'
import { Toaster } from '@/components/ui/toaster'
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants'

// ── Fonts ─────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// ── Metadata ──────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: ['nutrition', 'tracking', 'calories', 'macros', 'health', 'diet', 'AI'],
  authors: [{ name: 'NutriTrack AI Team' }],
  robots: 'noindex, nofollow', // Phase 8 will configure SEO for production
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

// ── Root Layout ───────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <QueryProvider>
            <MockAuthProvider>
              <AxeA11yProvider>
                {children}
                <Toaster />
              </AxeA11yProvider>
            </MockAuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

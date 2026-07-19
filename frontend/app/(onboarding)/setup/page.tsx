import type { Metadata } from 'next'
import { OnboardingForm } from '@/features/profile/onboarding-form'
import { PageContainer } from '@/components/layout/page-container'
import { Leaf } from 'lucide-react'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Onboarding & Profile Setup',
}

export default function SetupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header with App Logo */}
      <header className="flex h-16 items-center border-b border-border bg-card px-6" aria-label="Onboarding header">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
          </div>
          <span className="font-semibold text-foreground">{APP_NAME}</span>
        </div>
      </header>

      {/* Main Form Area */}
      <main className="flex-1 flex items-center justify-center p-4 py-8 md:py-12">
        <PageContainer narrow noPadding>
          <OnboardingForm />
        </PageContainer>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-6 py-4 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
      </footer>
    </div>
  )
}

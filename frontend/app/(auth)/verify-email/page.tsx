'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockVerifyEmail } from '@/lib/mock-api'
import { ROUTES } from '@/lib/constants'

export default function VerifyEmailPage() {
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    mockVerifyEmail('mock-verification-token').then((res) => {
      setState(res.success ? 'success' : 'error')
    })
  }, [])

  return (
    <Card className="border-border shadow-card">
      <CardContent className="pt-8 pb-8 text-center space-y-4">
        {state === 'loading' && (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-accent" />
            <div>
              <h2 className="text-xl font-semibold">Verifying your email</h2>
              <p className="mt-1 text-sm text-muted-foreground">Just a moment...</p>
            </div>
          </>
        )}
        {state === 'success' && (
          <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-subtle">
              <CheckCircle2 className="h-7 w-7 text-success" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Email verified!</h2>
              <p className="mt-1 text-sm text-muted-foreground">Your email has been confirmed. You&apos;re all set.</p>
            </div>
            <Link href={ROUTES.DASHBOARD}><Button className="w-full">Go to dashboard</Button></Link>
          </>
        )}
        {state === 'error' && (
          <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-danger-subtle">
              <XCircle className="h-7 w-7 text-danger" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Verification failed</h2>
              <p className="mt-1 text-sm text-muted-foreground">This link may have expired. Please request a new one.</p>
            </div>
            <Link href={ROUTES.LOGIN}><Button variant="outline" className="w-full">Back to sign in</Button></Link>
          </>
        )}
      </CardContent>
    </Card>
  )
}

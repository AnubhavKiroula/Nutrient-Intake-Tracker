'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockResetPassword } from '@/lib/mock-api'
import { ROUTES } from '@/lib/constants'

const schema = z.object({
  password: z.string().min(8, 'At least 8 characters').regex(/[A-Z]/, 'One uppercase letter required').regex(/[0-9]/, 'One number required'),
  confirm: z.string(),
}).refine(d => d.password === d.confirm, { message: 'Passwords do not match', path: ['confirm'] })

type FormData = z.infer<typeof schema>

export default function ResetPasswordPage() {
  const [done, setDone] = useState(false)
  const [show, setShow] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    await mockResetPassword('mock-token', data.password)
    setDone(true)
  }

  if (done) {
    return (
      <Card className="border-border shadow-card">
        <CardContent className="pt-6 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-subtle">
            <CheckCircle2 className="h-7 w-7 text-success" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Password reset!</h2>
            <p className="mt-1 text-sm text-muted-foreground">Your password has been updated successfully.</p>
          </div>
          <Link href={ROUTES.LOGIN}><Button className="w-full">Sign in with new password</Button></Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border shadow-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Set new password</CardTitle>
        <CardDescription>Choose a strong password for your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="new-pass">New password</Label>
            <div className="relative">
              <Input id="new-pass" type={show ? 'text' : 'password'} autoComplete="new-password" error={!!errors.password} className="pr-10" {...register('password')} />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label={show ? 'Hide' : 'Show'}>
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-danger" role="alert">{errors.password.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm-pass">Confirm password</Label>
            <Input id="confirm-pass" type="password" autoComplete="new-password" error={!!errors.confirm} {...register('confirm')} />
            {errors.confirm && <p className="text-xs text-danger" role="alert">{errors.confirm.message}</p>}
          </div>
          <Button type="submit" className="w-full" loading={isSubmitting}>Reset password</Button>
        </form>
      </CardContent>
    </Card>
  )
}

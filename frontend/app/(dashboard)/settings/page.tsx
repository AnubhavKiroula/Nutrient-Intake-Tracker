'use client'

import * as React from 'react'
import { PageContainer, PageHeader } from '@/components/layout/page-container'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ConfirmModal } from '@/components/ui/confirm-modal'
import { useAuth } from '@/features/auth/context/MockAuthProvider'
import { useTheme } from 'next-themes'
import { toast } from '@/hooks/useToast'
import { Bell, Monitor, Moon, Shield, Sun, Trash2, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const { settings, updateSettings } = useAuth()
  const { theme, setTheme } = useTheme()
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)

  if (!settings) return null

  const handleToggleNotification = async (key: keyof typeof settings.notifications) => {
    try {
      const updatedNotifications = {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      }
      await updateSettings({
        notifications: updatedNotifications,
      })
      toast.success('Notification settings saved')
    } catch (e: any) {
      toast.error('Failed to save settings')
    }
  }

  const handleTogglePrivacy = async (key: keyof typeof settings.privacy) => {
    try {
      const updatedPrivacy = {
        ...settings.privacy,
        [key]: !settings.privacy[key],
      }
      await updateSettings({
        privacy: updatedPrivacy,
      })
      toast.success('Privacy settings saved')
    } catch (e: any) {
      toast.error('Failed to save settings')
    }
  }

  const handleChangeUnitSystem = async (system: 'metric' | 'imperial') => {
    try {
      await updateSettings({
        display: {
          ...settings.display,
          unit_system: system,
        },
      })
      toast.success(`Unit system switched to ${system}`)
    } catch (e: any) {
      toast.error('Failed to switch unit system')
    }
  }

  const handleDeleteAccount = async () => {
    setDeleting(true)
    // Simulate deletion
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setDeleting(false)
    setDeleteOpen(false)
    toast.success('Account deleted successfully')
    // Redirect to login page
    window.location.href = '/login'
  }

  return (
    <PageContainer narrow>
      <PageHeader
        title="Settings"
        description="Manage your profile, theme, notification triggers, and data privacy."
      />

      <div className="space-y-6">
        {/* Theme Settings */}
        <Card className="border-border bg-card shadow-xs">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Sun className="h-4.5 w-4.5 text-muted-foreground" />
              <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Display Theme
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              Choose your display appearance interface
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-2">
            {[
              { val: 'light', label: 'Light', icon: Sun },
              { val: 'dark', label: 'Dark', icon: Moon },
              { val: 'system', label: 'System', icon: Monitor },
            ].map((t) => {
              const isSelected = theme === t.val
              const IconComp = t.icon
              return (
                <button
                  key={t.val}
                  type="button"
                  onClick={() => setTheme(t.val)}
                  className={cn(
                    'flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold gap-1.5 transition-all duration-fast',
                    isSelected
                      ? 'border-accent bg-accent-subtle text-accent shadow-xs'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted'
                  )}
                >
                  <IconComp className="h-4 w-4" />
                  {t.label}
                </button>
              )
            })}
          </CardContent>
        </Card>

        {/* Unit Settings */}
        <Card className="border-border bg-card shadow-xs">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <User className="h-4.5 w-4.5 text-muted-foreground" />
              <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Measurement Units
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              Choose your default height, weight and volume metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleChangeUnitSystem('metric')}
              className={cn(
                'p-3 rounded-xl border text-xs font-semibold transition-all duration-fast',
                settings.display.unit_system === 'metric'
                  ? 'border-accent bg-accent-subtle text-accent shadow-xs'
                  : 'border-border bg-card text-muted-foreground hover:bg-muted'
              )}
            >
              Metric (cm / kg / ml)
            </button>
            <button
              type="button"
              onClick={() => handleChangeUnitSystem('imperial')}
              className={cn(
                'p-3 rounded-xl border text-xs font-semibold transition-all duration-fast',
                settings.display.unit_system === 'imperial'
                  ? 'border-accent bg-accent-subtle text-accent shadow-xs'
                  : 'border-border bg-card text-muted-foreground hover:bg-muted'
              )}
            >
              Imperial (in / lbs / fl oz)
            </button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-border bg-card shadow-xs">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Bell className="h-4.5 w-4.5 text-muted-foreground" />
              <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Notification Rules
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              Select which notifications you would like to trigger
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                key: 'meal_reminders',
                label: 'Meal reminders',
                desc: 'Get notified if you forget to log breakfast, lunch, or dinner.',
              },
              {
                key: 'goal_completion',
                label: 'Goal achievements',
                desc: 'Get alerts when you reach your daily macronutrient and calorie targets.',
              },
              {
                key: 'weekly_reports',
                label: 'Weekly reports',
                desc: 'Receive a compiled PDF analysis of your nutrition compliance every Monday.',
              },
              {
                key: 'email_updates',
                label: 'Email updates',
                desc: 'Stay informed with features updates, product tips, and newsletter content.',
              },
            ].map((n) => {
              const checked = settings.notifications[n.key as keyof typeof settings.notifications]
              return (
                <div key={n.key} className="flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <Label htmlFor={`notif-${n.key}`} className="text-sm font-semibold cursor-pointer">
                      {n.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <button
                    id={`notif-${n.key}`}
                    type="button"
                    onClick={() => handleToggleNotification(n.key as any)}
                    className={cn(
                      'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      checked ? 'bg-accent' : 'bg-muted'
                    )}
                    role="switch"
                    aria-checked={checked}
                  >
                    <span
                      className={cn(
                        'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-background shadow-xs ring-0 transition-transform duration-fast',
                        checked ? 'translate-x-4' : 'translate-x-0'
                      )}
                    />
                  </button>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="border-border bg-card shadow-xs">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4.5 w-4.5 text-muted-foreground" />
              <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Privacy Options
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              Manage your profile visibility settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                key: 'profile_public',
                label: 'Public Profile Visibility',
                desc: 'Allow search engines or other logged-in users to search for your profile card.',
              },
              {
                key: 'share_progress',
                label: 'Share progress stats',
                desc: 'Allow friends or coaches to view details of your calorie and macro trends.',
              },
            ].map((p) => {
              const checked = settings.privacy[p.key as keyof typeof settings.privacy]
              return (
                <div key={p.key} className="flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <Label htmlFor={`priv-${p.key}`} className="text-sm font-semibold cursor-pointer">
                      {p.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <button
                    id={`priv-${p.key}`}
                    type="button"
                    onClick={() => handleTogglePrivacy(p.key as any)}
                    className={cn(
                      'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      checked ? 'bg-accent' : 'bg-muted'
                    )}
                    role="switch"
                    aria-checked={checked}
                  >
                    <span
                      className={cn(
                        'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-background shadow-xs ring-0 transition-transform duration-fast',
                        checked ? 'translate-x-4' : 'translate-x-0'
                      )}
                    />
                  </button>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Destructive Section */}
        <Card className="border-danger/20 bg-danger-subtle/10 shadow-xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-danger uppercase tracking-wider">
              Danger Zone
            </CardTitle>
            <CardDescription className="text-xs text-danger/80">
              Irreversible destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-sm font-bold text-foreground">Delete Account</span>
              <p className="text-xs text-muted-foreground">
                Permanently delete all food log files, setups and custom foods profile.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteOpen(true)}
              className="w-full sm:w-auto"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Account"
        description="Are you absolutely sure you want to delete your account? All logs, targets and profile configurations will be permanently cleared from our servers. This cannot be undone."
        confirmLabel="Permanently Delete"
        variant="destructive"
        loading={deleting}
        onConfirm={handleDeleteAccount}
      />
    </PageContainer>
  )
}

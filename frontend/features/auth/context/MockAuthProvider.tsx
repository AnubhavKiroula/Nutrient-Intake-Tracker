'use client'

import * as React from 'react'
import type { User, UserProfile, UserSettings } from '@/types'
import { MOCK_USER, MOCK_PROFILE, MOCK_SETTINGS } from '@/lib/mock-api/fixtures/users'
import { ROUTES } from '@/lib/constants'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  settings: UserSettings | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  updateSettings: (updates: Partial<UserSettings>) => Promise<void>
  completeOnboarding: (profileData: Partial<UserProfile>) => Promise<void>
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(MOCK_USER)
  const [profile, setProfile] = React.useState<UserProfile | null>(MOCK_PROFILE)
  const [settings, setSettings] = React.useState<UserSettings | null>(MOCK_SETTINGS)
  const [isLoading, setIsLoading] = React.useState(false)

  const login = async (email: string, _password: string): Promise<boolean> => {
    setIsLoading(true)
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    setUser({
      ...MOCK_USER,
      email,
    })
    setProfile(MOCK_PROFILE)
    setSettings(MOCK_SETTINGS)
    setIsLoading(false)
    return true
  }

  const logout = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setUser(null)
    setProfile(null)
    setSettings(null)
    setIsLoading(false)
    window.location.href = ROUTES.LOGIN
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setProfile((prev) => (prev ? { ...prev, ...updates } : null))
    setIsLoading(false)
  }

  const updateSettings = async (updates: Partial<UserSettings>) => {
    if (!settings) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setSettings((prev) => (prev ? { ...prev, ...updates } : null))
    setIsLoading(false)
  }

  const completeOnboarding = async (profileData: Partial<UserProfile>) => {
    if (!profile) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setProfile((prev) => (prev ? { ...prev, ...profileData, onboarding_completed: true } : null))
    setIsLoading(false)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        settings,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateProfile,
        updateSettings,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a MockAuthProvider')
  }
  return context
}

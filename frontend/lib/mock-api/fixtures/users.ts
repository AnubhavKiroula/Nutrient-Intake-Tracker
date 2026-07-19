// ============================================================
// NutriTrack AI — Mock User & Profile Fixtures
// ============================================================

import type { User, UserProfile, UserSettings, NutritionGoals } from '@/types'

export const MOCK_USER: User = {
  id: 'user-001',
  email: 'alex@nutritrack.ai',
  name: 'Alex Johnson',
  avatar_url: null,
  email_verified: true,
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-07-01T12:00:00Z',
}

export const MOCK_PROFILE: UserProfile = {
  user_id: 'user-001',
  age: 28,
  gender: 'male',
  height_cm: 178,
  weight_kg: 78,
  goal: 'gain_muscle',
  activity_level: 'moderately_active',
  dietary_preference: 'none',
  allergens: ['nuts'],
  unit_system: 'metric',
  onboarding_completed: true,
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-07-01T12:00:00Z',
}

export const MOCK_NUTRITION_GOALS: NutritionGoals = {
  calories: 2800,
  protein_g: 175,
  carbs_g: 310,
  fat_g: 85,
  fiber_g: 30,
  water_ml: 3000,
  sodium_mg: 2300,
  sugar_g: 60,
}

export const MOCK_SETTINGS: UserSettings = {
  user_id: 'user-001',
  notifications: {
    meal_reminders: true,
    goal_completion: true,
    weekly_reports: true,
    email_updates: false,
  },
  display: {
    unit_system: 'metric',
    theme: 'system',
    show_calories_in_nav: true,
  },
  privacy: {
    profile_public: false,
    share_progress: false,
  },
  updated_at: '2024-07-01T12:00:00Z',
}

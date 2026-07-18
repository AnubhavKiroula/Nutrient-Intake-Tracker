// ============================================================
// NutriTrack AI — Mock API: Auth
// Phase 5: Replace these functions with real Axios calls.
// Do NOT change function signatures or return types.
// ============================================================

import { simulateDelay } from '@/lib/utils'
import { MOCK_DELAY_MS } from '@/lib/constants'
import type { ApiResponse, AuthSession, User } from '@/types'
import { MOCK_USER } from './fixtures/users'

// Mock session (simulates a logged-in user for Phase 1 UI)
const MOCK_SESSION: AuthSession = {
  user: MOCK_USER,
  access_token: 'mock-access-token-phase1',
  refresh_token: 'mock-refresh-token-phase1',
  expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
}

export async function mockLogin(
  email: string,
  password: string
): Promise<ApiResponse<AuthSession>> {
  await simulateDelay(MOCK_DELAY_MS.normal)

  // Simulate validation
  if (!email || !password) {
    return { success: false, data: null, error: { code: 'VALIDATION_ERROR', message: 'Email and password are required' } }
  }
  if (password.length < 8) {
    return { success: false, data: null, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } }
  }

  return { success: true, data: MOCK_SESSION, error: null }
}

export async function mockRegister(
  name: string,
  email: string,
  _password: string
): Promise<ApiResponse<User>> {
  await simulateDelay(MOCK_DELAY_MS.normal)

  if (!email.includes('@')) {
    return { success: false, data: null, error: { code: 'VALIDATION_ERROR', message: 'Invalid email address' } }
  }

  return { success: true, data: { ...MOCK_USER, name, email }, error: null }
}

export async function mockForgotPassword(email: string): Promise<ApiResponse<{ sent: boolean }>> {
  await simulateDelay(MOCK_DELAY_MS.normal)
  if (!email.includes('@')) {
    return { success: false, data: null, error: { code: 'VALIDATION_ERROR', message: 'Invalid email address' } }
  }
  return { success: true, data: { sent: true }, error: null }
}

export async function mockResetPassword(_token: string, _password: string): Promise<ApiResponse<{ reset: boolean }>> {
  await simulateDelay(MOCK_DELAY_MS.normal)
  return { success: true, data: { reset: true }, error: null }
}

export async function mockVerifyEmail(_token: string): Promise<ApiResponse<{ verified: boolean }>> {
  await simulateDelay(MOCK_DELAY_MS.fast)
  return { success: true, data: { verified: true }, error: null }
}

export async function mockGetCurrentUser(): Promise<ApiResponse<User>> {
  await simulateDelay(MOCK_DELAY_MS.fast)
  return { success: true, data: MOCK_USER, error: null }
}

export async function mockLogout(): Promise<ApiResponse<{ logged_out: boolean }>> {
  await simulateDelay(MOCK_DELAY_MS.fast)
  return { success: true, data: { logged_out: true }, error: null }
}

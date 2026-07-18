// ============================================================
// NutriTrack AI — Mock API: Index
// Single entry point for all mock API functions.
// Phase 5: Replace these imports with real API client functions.
//
// HOW TO SWAP (Phase 5):
//   1. Create src/lib/api/ with the same function names
//   2. Implement with Axios calls to the FastAPI backend
//   3. Update import paths in TanStack Query hooks from
//      '@/lib/mock-api' to '@/lib/api'
//   4. No component code changes needed — only hook files change
// ============================================================

export * from './auth'
export * from './dashboard'
export * from './food-search'
export * from './analytics'

// Re-export fixtures for testing and Storybook
export * from './fixtures/foods'
export * from './fixtures/users'
export * from './fixtures/meals'
export * from './fixtures/analytics'

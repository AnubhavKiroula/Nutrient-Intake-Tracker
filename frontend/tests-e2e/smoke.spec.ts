import { test, expect } from '@playwright/test'

test.describe('NutriTrack AI Smoke Tests', () => {
  test('should load login page and validate form errors', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('h3')).toContainText('Welcome back')

    // Click submit with empty fields
    await page.click('button[type="submit"]')
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible()
    await expect(page.locator('text=Password must be at least 8 characters')).toBeVisible()
  })

  test('should load register page', async ({ page }) => {
    await page.goto('/register')
    await expect(page.locator('h3')).toContainText('Create your account')
  })

  test('should load onboarding setup page', async ({ page }) => {
    await page.goto('/setup')
    await expect(page.locator('text=Tell us about yourself')).toBeVisible()
  })

  test('should load dashboard and render widgets', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.locator('text=Alex').first()).toBeVisible()
    await expect(page.locator('text=Daily Calories')).toBeVisible()
    await expect(page.locator('text=Water Intake')).toBeVisible()
    await expect(page.locator('text=Macronutrients')).toBeVisible()
  })

  test('should load food search page', async ({ page }) => {
    await page.goto('/search')
    await expect(page.locator('h2')).toContainText('Food Search')
  })

  test('should load meals logger page', async ({ page }) => {
    await page.goto('/meals')
    await expect(page.locator('h2')).toContainText('Meal Log')
  })

  test('should load analytics page', async ({ page }) => {
    await page.goto('/analytics')
    await expect(page.locator('h2')).toContainText('Analytics & Trends')
  })

  test('should load reports page', async ({ page }) => {
    await page.goto('/reports')
    await expect(page.locator('h2')).toContainText('Nutritional Reports')
  })

  test('should load settings page', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.locator('h2')).toContainText('Settings')
  })
})

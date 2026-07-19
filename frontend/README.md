# NutriTrack AI — Frontend

> Premium Next.js 14 SaaS nutrition-tracking dashboard built with TypeScript, Tailwind CSS, shadcn/ui and Recharts.

---

## 🚀 Quick Start

### 1. Install Dependencies

Ensure you have [pnpm](https://pnpm.io) installed globally, then run:

```bash
pnpm install
```

### 2. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🛠️ Folder Structure

```
frontend/
├── .storybook/          # Storybook configurations and theme decorators
├── app/                 # Next.js App Router routes and page entrypoints
│   ├── (auth)/          # Authentication flow screens (login, register, forgot-password...)
│   ├── (onboarding)/    # Profile setup multi-step wizard (setup)
│   └── (dashboard)/     # Main dashboard workspace (dashboard, search, meals, analytics...)
├── components/          # Reusable shared components
│   ├── layout/          # Global layout structure (Sidebar, Topbar, ErrorBoundary...)
│   └── ui/              # shadcn base primitives and stories (.stories.tsx)
├── features/            # Isolated business-domain component layers
│   ├── auth/            # Auth status context (MockAuthProvider)
│   ├── profile/         # Onboarding multi-step form steps
│   ├── dashboard/       # Dashboard calorie and macro card widgets
│   ├── food-search/     # Search input, category chips, details modal
│   ├── meal-logger/     # breakfast/lunch tabs and meal entry cards
│   ├── analytics/       # Recharts weekly, monthly, and macro donut charts
│   └── settings/        # settings tabs and profile toggles
├── hooks/               # Custom hooks (useDebounce, useMediaQuery, useToast)
├── lib/                 # Core utilities and data schemas
│   ├── mock-api/        # In-memory mock API layer + JSON fixtures
│   └── utils.ts         # Numeric multipliers and class-name mergers
├── styles/              # Design Token specifications (tokens.json, globals.css)
└── types/               # TypeScript interfaces mirroring FastAPI contracts
```

---

## 🌿 Verification Commands

Execute the following commands locally to verify code quality:

```bash
# 1. Run ESLint static check
pnpm lint

# 2. Run TypeScript compiler check
pnpm type-check

# 3. Check code formatting
pnpm format:check

# 4. Run Playwright End-to-End smoke tests
pnpm test:e2e
```

---

## 🧪 Mock API & Handoff (Phase 5)

All components request data through TanStack Query hooks, which fetch from the typed mock functions in `lib/mock-api/`.
These mock functions return response envelopes that mirror the future FastAPI contracts:

```typescript
// Example from lib/mock-api/meals.ts
export async function mockGetMeals(date: string): Promise<ApiResponse<MealEntry[]>> {
  await simulateDelay()
  const filtered = localMeals.filter((meal) => meal.date === date)
  return { success: true, data: filtered, error: null }
}
```

### Swapping to Live Backend (Phase 5 Integration)

To connect the real database and FastAPI backend:

1. Create a `lib/api/` folder.
2. Re-implement the mock-api functions (e.g. `getMeals()`, `login()`, `searchFoods()`) with actual Axios calls pointing to the FastAPI baseURL.
3. Update import paths in page components from `@/lib/mock-api` to `@/lib/api`.
4. No component code modifications or props re-wirings are required!

---

## ♿ Accessibility & Quality Assurance

- **axe-core integration:** During local development, accessibility violations are automatically audited and logged directly in the browser developer console.
- **Dark Mode:** Supports full, premium-feel dark theme matching custom color tokens.
- **Keyboard navigation:** All inputs, dialogs, dropdowns, and form submits support focus outline indicators and Tab/Escape keyboard triggers.

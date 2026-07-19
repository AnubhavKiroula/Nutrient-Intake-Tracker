import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    // ─── Container ────────────────────────────────────────────────────────────
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      // ─── Color Tokens ───────────────────────────────────────────────────────
      // All values reference CSS variables defined in globals.css
      // This enables seamless dark/light mode switching
      colors: {
        // Semantic tokens
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Surface layers
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          raised: 'hsl(var(--surface-raised))',
          overlay: 'hsl(var(--surface-overlay))',
        },

        // Brand / Accent (blue-only, 60-30-10 rule)
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          subtle: 'hsl(var(--accent-subtle))',
        },

        // shadcn/ui token names (used by primitives)
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Semantic status colors
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          subtle: 'hsl(var(--success-subtle))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          subtle: 'hsl(var(--warning-subtle))',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          foreground: 'hsl(var(--danger-foreground))',
          subtle: 'hsl(var(--danger-subtle))',
        },

        // Sidebar specific
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          border: 'hsl(var(--sidebar-border))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
        },

        // Chart palette (consistent across light/dark)
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },

        // Macro nutrient colors (consistent, not dependent on theme)
        macro: {
          protein: '#2563EB', // blue — accent
          carbs: '#22C55E', // green — success
          fat: '#F59E0B', // amber — warning
          fiber: '#64748B', // slate — muted
        },
      },

      // ─── Typography ─────────────────────────────────────────────────────────
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // 8px grid-aligned type scale
        xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        base: ['1rem', { lineHeight: '1.5rem' }], // 16px ← design base
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
        '5xl': ['3rem', { lineHeight: '1' }], // 48px
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      // ─── Spacing (8px grid) ─────────────────────────────────────────────────
      spacing: {
        '0': '0px',
        px: '1px',
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px', // 1 grid unit
        '2.5': '10px',
        '3': '12px',
        '3.5': '14px',
        '4': '16px', // 2 grid units
        '5': '20px',
        '6': '24px', // 3 grid units
        '7': '28px',
        '8': '32px', // 4 grid units
        '9': '36px',
        '10': '40px', // 5 grid units
        '11': '44px',
        '12': '48px', // 6 grid units
        '14': '56px',
        '16': '64px', // 8 grid units
        '20': '80px',
        '24': '96px',
        '28': '112px',
        '32': '128px',
        '36': '144px',
        '40': '160px',
        '44': '176px',
        '48': '192px',
        '52': '208px',
        '56': '224px',
        '60': '240px',
        '64': '256px',
        '72': '288px',
        '80': '320px',
        '96': '384px',
      },

      // ─── Border Radius ──────────────────────────────────────────────────────
      borderRadius: {
        none: '0px',
        sm: 'calc(var(--radius) - 4px)', // 4px
        DEFAULT: 'var(--radius)', // 8px
        md: 'calc(var(--radius) + 0px)', // 8px
        lg: 'calc(var(--radius) + 4px)', // 12px
        xl: 'calc(var(--radius) + 8px)', // 16px
        '2xl': 'calc(var(--radius) + 16px)', // 24px
        full: '9999px',
      },

      // ─── Box Shadows ────────────────────────────────────────────────────────
      boxShadow: {
        none: 'none',
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        DEFAULT: '0 2px 8px -1px rgb(0 0 0 / 0.08), 0 1px 3px -1px rgb(0 0 0 / 0.06)',
        md: '0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 6px -2px rgb(0 0 0 / 0.05)',
        lg: '0 8px 24px -4px rgb(0 0 0 / 0.08), 0 4px 12px -4px rgb(0 0 0 / 0.05)',
        xl: '0 16px 40px -8px rgb(0 0 0 / 0.10), 0 8px 20px -6px rgb(0 0 0 / 0.06)',
        card: '0 0 0 1px hsl(var(--border)), 0 2px 8px -2px rgb(0 0 0 / 0.06)',
        'card-hover': '0 0 0 1px hsl(var(--border)), 0 8px 24px -4px rgb(0 0 0 / 0.10)',
        focus: '0 0 0 3px hsl(var(--ring) / 0.4)',
      },

      // ─── Animation ──────────────────────────────────────────────────────────
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out': {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(4px)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.15s ease-out',
        'fade-out': 'fade-out 0.15s ease-in',
        'slide-in-right': 'slide-in-right 0.2s ease-out',
        'slide-out-right': 'slide-out-right 0.2s ease-in',
        shimmer: 'shimmer 1.5s infinite linear',
      },

      // ─── Z-Index Scale ──────────────────────────────────────────────────────
      zIndex: {
        auto: 'auto',
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        sidebar: '40',
        topbar: '30',
        dropdown: '50',
        modal: '60',
        toast: '70',
        tooltip: '80',
      },

      // ─── Transitions ────────────────────────────────────────────────────────
      transitionDuration: {
        fast: '100ms',
        DEFAULT: '150ms',
        slow: '200ms',
        'extra-slow': '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.16, 1, 0.3, 1)', // ease-out-expo
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },

      // ─── Screen Breakpoints ─────────────────────────────────────────────────
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
  },
  plugins: [],
}

export default config

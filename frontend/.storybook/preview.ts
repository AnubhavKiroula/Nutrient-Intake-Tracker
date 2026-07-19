import type { Preview } from '@storybook/react'
import '../app/globals.css' // Import global design system styles

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F8FAFC' },
        { name: 'dark', value: '#0D1221' },
      ],
    },
  },
}

export default preview

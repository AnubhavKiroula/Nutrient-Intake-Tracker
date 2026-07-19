import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from './empty-state'
import { Search } from 'lucide-react'
import * as React from 'react'

const meta: Meta<typeof EmptyState> = {
  title: 'UI/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    icon: <Search className="h-6 w-6" />,
    title: 'No items found',
    description: 'Try adjusting your search filters or browse other categories.',
    action: {
      label: 'Reset Filters',
      onClick: () => alert('Clear clicked'),
    },
  },
}

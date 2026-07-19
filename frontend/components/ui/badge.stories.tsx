import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'warning', 'danger', 'outline', 'accent'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Active',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'On Track',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Near Goal Limit',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Over Calorie Budget',
  },
}

export const Accent: Story = {
  args: {
    variant: 'accent',
    children: 'Weekly Report',
  },
}

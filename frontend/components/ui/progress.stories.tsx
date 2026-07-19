import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './progress'

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'protein', 'carbs', 'fat'],
    },
    value: {
      control: { type: 'number', min: 0, max: 100 },
    },
    showValue: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: {
    color: 'default',
    value: 65,
    label: 'Daily Progress',
    showValue: true,
  },
}

export const Protein: Story = {
  args: {
    color: 'protein',
    value: 80,
    label: 'Protein Intake',
    showValue: true,
  },
}

export const Carbs: Story = {
  args: {
    color: 'carbs',
    value: 45,
    label: 'Carbohydrates Intake',
    showValue: true,
  },
}

export const Fat: Story = {
  args: {
    color: 'fat',
    value: 90,
    label: 'Fats Intake',
    showValue: true,
  },
}
